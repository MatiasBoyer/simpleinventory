import CleanClassnames from '@/utils/functions/CleanClassnames';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import { PiStarFour } from 'react-icons/pi';
import api from '@/utils/api';
import { IoMdAdd } from 'react-icons/io';
import ItemEntry from './components/Items/ItemEntry';
import { authClient } from '@/utils/auth';
import Header from '@/components/organisms/Header/Header';
import LoadingScreen from '@/components/organisms/LoadingScreen';

function InventoryDisplay() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [isAiEnabled, setAiEnabled] = useState(false);

  const inventoryId = searchParams.get('id');
  const label = searchParams.get('label');

  // functions
  const refetchItems = async () => {
    const items = await api.items.getList(inventoryId);
    console.info({ items });
    if (!items.success) {
      AddPopup({
        title: 'Failure',
        children: (
          <>
            <Text className="w-full">{items.message}</Text>
          </>
        ),
        onAccept: () => navigate('/inventory/list'),
        showCancel: false,
      });

      return;
    }

    setList(items.data);
    setIsLoading(false);
  };
  const onAddItem = async (label, qty) => {
    setIsLoading(true);

    const result = await api.items.addItem(inventoryId, label, qty);

    if (!result.success) {
      AddPopup({
        title: 'Failure',
        children: (
          <>
            <Text className="w-full">{result.message}</Text>
          </>
        ),
        showCancel: false,
      });
      return;
    }

    refetchItems();
  };
  const onRemoveItem = async (id) => {
    setIsLoading(true);

    const result = await api.items.removeItem(inventoryId, id);

    if (!result.success) {
      AddPopup({
        title: 'Failure',
        children: (
          <>
            <Text className="w-full">{result.message}</Text>
          </>
        ),
        showCancel: false,
      });
      return;
    }

    refetchItems();
  };
  const onSetItemQty = async (itemId, qty) => {
    if (qty < 0) return;

    const result = await api.items.modifyQuantity(inventoryId, itemId, qty);

    if (!result.success) {
      AddPopup({
        title: 'Failure',
        children: (
          <>
            <Text className="w-full">{result.message}</Text>
          </>
        ),
        showCancel: false,
      });
      return;
    }

    setList(result.data);
  };
  const onItemRename = async (itemId, name) => {
    console.info({ itemId, name });

    const result = await api.items.modifyName(inventoryId, itemId, name);

    if (!result.success) {
      return;
    }

    refetchItems();
  };

  if (!inventoryId) {
    navigate('/inventory/list');
  }

  // effects
  useEffect(() => {
    setIsLoading(true);
    refetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    (async () => {
      const session = await authClient.getSession();

      console.info(session);

      if (!session?.data?.user) {
        navigate('/');
        return;
      }

      setAiEnabled(Number(session.data.user.ai_uses) > 0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="h-full">
        <Header text={label ?? 'Items'} inventoryId={null} />
        <div className="flex flex-col items-center gap-1">
          {list
            .sort((a, b) => a.id - b.id)
            .map((item) => (
              <ItemEntry
                item={item}
                key={item.id}
                onRemoveItem={onRemoveItem}
                onSumItem={onSetItemQty}
                onSetItemQty={onSetItemQty}
                onItemRename={(newName) => onItemRename(item.id, newName)}
              />
            ))}
        </div>
        <div className="flex justify-center items-end absolute bottom-10 left-0 right-0 opacity-50 gap-3">
          <Button
            replaceClassname="rounded-full bg-stone-300 w-8 h-8 cursor-pointer shadow-lg border flex items-center justify-center"
            onClick={() => {
              AddPopup({
                children: (
                  <>
                    <Text>Name</Text>
                    <input
                      tabIndex={1}
                      className="border text-center"
                      id="newItem-name"
                    />

                    <Text>Initial quantity</Text>
                    <input
                      tabIndex={2}
                      className="border text-center"
                      id="newItem-qty"
                      defaultValue={0}
                      pattern="\d*"
                    />
                  </>
                ),
                title: 'Add new item',
                onAccept: (values) => {
                  const itemName = values['newItem-name'].trim();
                  const itemQty = parseInt(values['newItem-qty']);

                  const displayErrorPopup = () => {
                    AddPopup({
                      children: (
                        <>Either the name or the quantity are invalid.</>
                      ),
                      showCancel: false,
                    });
                  };

                  if (itemName.length === 0) {
                    displayErrorPopup();
                    return;
                  }

                  if (isNaN(itemQty)) {
                    displayErrorPopup();
                    return;
                  }

                  onAddItem(itemName, itemQty);
                },
              });
            }}
          >
            <IoMdAdd />
          </Button>
          {isAiEnabled && (
            <Button
              replaceClassname={CleanClassnames(
                `rounded-full bg-stone-300 w-8 h-8 cursor-pointer shadow-lg border flex items-center justify-center`
              )}
              onClick={() => {
                navigate(
                  `/ai/inventory/imageanalysis?inventoryId=${inventoryId}`
                );
              }}
            >
              <PiStarFour />
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default InventoryDisplay;
