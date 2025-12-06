import { useEffect, useRef, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import { WebCamera } from '@shivantra/react-web-camera';
import Button from '@/components/atoms/Button';
import CleanClassnames from '@/utils/functions/CleanClassnames';
import { CiCamera } from 'react-icons/ci';
import { AiOutlineLoading } from 'react-icons/ai';
import { FaArrowRight } from 'react-icons/fa';
import ItemEntry from '../inventory/components/Items/ItemEntry';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import Text from '@/components/atoms/Text';
import api from '@/utils/api';
import { useNavigate, useSearchParams } from 'react-router';
import { generateRandomDigitString } from '@/utils/random';

function CameraCapturer({ isLoading, canCapture, onImage, onNext }) {
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraHandler = useRef(null);

  const captureImage = async () => {
    setIsCapturing(true);
    const file = await cameraHandler.current?.capture();

    const onComplete = (base64 = null) => {
      setIsCapturing(false);

      if (base64) {
        onImage?.(base64);
      }
    };

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const result = e.target.result;
        onComplete(result);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        onComplete(null);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute backdrop-blur-sm w-full h-full z-999 flex items-center justify-center">
          <AiOutlineLoading className="w-[25%] h-[25%] animate-spin" />
        </div>
      )}
      <WebCamera
        className="w-full h-full"
        captureMode="back"
        captureQuality={0.7}
        facingMode="user"
        ref={cameraHandler}
      />
      <div className="absolute w-full h-[15%] bottom-0 left-0 right-0 flex items-start justify-center gap-3">
        <Button
          replaceClassname={CleanClassnames(
            `
            relative rounded-full w-16 h-16 shadow-md
            transition-all duration-100
            bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-700 disabled:bg-neutral-600
            flex items-center justify-center
            `
          )}
          onClick={captureImage}
          disabled={(isCapturing && !isLoading) || !canCapture}
        >
          <CiCamera className="w-[75%] h-[75%]" />
        </Button>
        <Button
          replaceClassname={CleanClassnames(
            `
            relative rounded-full w-16 h-16 shadow-md
            transition-all duration-100
            bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-700 disabled:bg-neutral-600
            flex items-center justify-center
            `
          )}
          onClick={onNext}
          disabled={isCapturing && !isLoading}
        >
          <GoArrowRight className="w-[75%] h-[75%]" />
        </Button>
      </div>
    </div>
  );
}

function AnalyzedList({ inventoryId, aiResult, navigate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [finalResult, setFinalResult] = useState(aiResult);

  const onRemoveItem = (index) => {
    setFinalResult((p) => p.filter((entry, idx) => index !== idx));
  };
  const onSetItemQty = (index, quantity) => {
    setFinalResult((p) =>
      p.map((entry, idx) => {
        if (idx === index && quantity >= 0) entry.quantity = quantity;

        return entry;
      })
    );
  };
  const onItemRename = (index, newName) => {
    setFinalResult((p) =>
      p.map((entry, idx) => {
        if (idx === index) entry.item_text = newName;

        return entry;
      })
    );
  };
  const onComplete = () => {
    AddPopup({
      title: 'Confirm',
      children: (
        <>
          <Text>Are you sure?</Text>
        </>
      ),
      onAccept: async () => {
        setIsLoading(true);

        const result = await api.inventory.updateItems(
          inventoryId,
          finalResult
        );

        console.info('update result', result);

        const redirect = () => navigate(`/inventory/display?id=${inventoryId}`);

        if (result.success) {
          redirect();
        } else {
          AddPopup({
            children: (
              <>
                <Text className="w-full">Please retry later</Text>
              </>
            ),
            title: 'Failure',
            showCancel: false,
            onAccept: redirect,
          });
        }
      },
    });
  };

  return (
    <div className="relative w-full h-full">
      <div
        className={CleanClassnames(
          `
          absolute w-full h-full z-999 backdrop-blur-sm 
          flex items-center justify-center 
          transition-opacity duration-100
          ${!isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}
          `
        )}
      >
        <div className="flex items-center justify-center w-16 h-16">
          <AiOutlineLoading className="w-full h-full animate-spin" />
        </div>
      </div>
      <div className="flex justify-center items-end absolute bottom-10 left-0 right-0 opacity-50 gap-3">
        <Button
          replaceClassname={CleanClassnames(
            `
              rounded-full w-8 h-8 cursor-pointer shadow-lg border flex items-center justify-center
              transition-all opacity-100
              bg-stone-100 hover:bg-stone-200 active:bg-stone-400 disabled:bg-stone-500
              `
          )}
          onClick={onComplete}
        >
          <FaArrowRight />
        </Button>
      </div>
      <div className="w-full h-full overflow-y-auto">
        <div className="flex flex-col items-center justify-start">
          {finalResult.map((item, index) => (
            <ItemEntry
              item={item}
              onSumItem={(_, quantity) => onSetItemQty(index, quantity)}
              onRemoveItem={() => onRemoveItem(index)}
              onSetItemQty={(_, quantity) => onSetItemQty(index, quantity)}
              onItemRename={(newName) => onItemRename(index, newName)}
              /*difference={(() => {
                const found = aiResult.find((x) =>
                  x.fakeId ? x.fakeId === item.fakeId : undefined
                );

                if (found) {
                  return found.quantity - item.quantity;
                }

                return item.quantity;
              })()}*/
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InventoryImageAnalysis() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [canCapture, setCanCapture] = useState(true);
  const [images, setImages] = useState([]);
  const [aiResult, setAiResult] = useState(null);
  const imagesRef = useRef(null);

  const inventoryId = searchParams.get('inventoryId');
  const maxImages = 3;

  useEffect(() => {
    if (imagesRef.current) {
      imagesRef.current.scrollLeft = imagesRef.current.scrollWidth;
    }
  }, [images]);

  if (!inventoryId) {
    setTimeout(() => {
      AddPopup({
        children: (
          <>
            <Text>No inventory id specified</Text>
          </>
        ),
        onAccept: () => navigate('/inventory/list'),
        showCancel: false,
      });
    }, 1000);

    return <div className="w-full h-full"></div>;
  }

  const refreshCanCapture = (imagesLength) => {
    setCanCapture(imagesLength < maxImages);
  };

  const onImageAdd = (base64) => {
    setImages((p) => {
      const n = [...p, base64];

      refreshCanCapture(n.length);

      return n;
    });
  };

  const onImageRemove = (index) => {
    setImages((p) => {
      const n = p.filter((_, idx) => idx !== index);

      refreshCanCapture(n.length);

      return n;
    });
  };

  const onAnalyze = async () => {
    setIsLoading(true);

    const result = await api.ai.analyzeImage(images, inventoryId);

    console.info('result from AI:', { result, data: result.data[0] });

    if (result.success && result?.data) {
      result.data =
        result.data?.map((m) => ({
          ...m,
          item_text: m.item_name ?? m.item_text,
          quantity: m.qty ?? m.quantity,
          fakeId: (m.fakeId = generateRandomDigitString(10)),
        })) ?? [];

      setAiResult(result.data);
    } else {
      AddPopup({
        children: (
          <>
            <Text className="w-full">Failed to analyze</Text>
            <Text className="w-full">Please retry</Text>
          </>
        ),
        title: 'Failure',
        showCancel: false,
      });
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 flex items-center justify-center">
          <AiOutlineLoading className="w-full h-full animate-spin" />
        </div>
      </div>
    );
  }

  if (aiResult) {
    return (
      <AnalyzedList
        inventoryId={inventoryId}
        aiResult={aiResult}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute w-full h-fit z-10 overflow-x-auto"
        ref={imagesRef}
      >
        <div className="w-fit h-fit flex flex-row items-start justify-center gap-2 p-2">
          {images.map((src, idx) => (
            <div
              className="relative w-32 h-32 border border-neutral-100"
              key={idx}
            >
              <Button
                className="absolute w-8 h-8 text-neutral-100 right-0"
                onClick={() => onImageRemove(idx)}
              >
                X
              </Button>
              <img src={src} key={idx} className="w-full h-full" />
            </div>
          ))}
        </div>
      </div>
      <CameraCapturer
        isLoading={isLoading}
        canCapture={canCapture}
        onImage={onImageAdd}
        onNext={onAnalyze}
      />
    </div>
  );
}

export default InventoryImageAnalysis;
