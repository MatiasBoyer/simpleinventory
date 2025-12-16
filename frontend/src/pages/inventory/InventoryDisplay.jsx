import Text from '../../components/atoms/Text';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { PiStarFour } from 'react-icons/pi';
import api from '@/utils/api';
import { IoMdAdd } from 'react-icons/io';
import ItemEntry from './components/Items/ItemEntry';
import Header from '@/components/organisms/Header/Header';
import LoadingScreen from '@/components/organisms/LoadingScreen';
import getSession from '@/utils/hooks/getSession';
import RoundedButton from '@/components/molecules/RoundedButton';
import ButtonFooter from '@/components/organisms/ButtonFooter';
import Input from '@/components/atoms/Input';

const updateChangesTimeout = 2000;

function Searchbar() {
  return (
    <div className="w-full p-2 grid grid-cols-[auto_1fr] border-b flex flex-row justify-between items-center">
      <Text className="pr-2">Search</Text>
      <Input />
    </div>
  );
}

function InventoryDisplay() {
  const navigate = useNavigate();

  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isAiEnabled, setAiEnabled] = useState(false);
  const [changeList, setChangeList] = useState([]);
  const [apiData, setApiData] = useState(null);

  const inventoryId = searchParams.get('id');

  // functions
  const refetchItems = async ({ onComplete } = {}) => {
    const result = await api.inventory.getInventory(inventoryId);
    if (!result.success) {
      AddPopup({
        title: 'Failure',
        children: (
          <>
            <Text className="w-full">{result?.message ?? 'Unknown error'}</Text>
          </>
        ),
        onAccept: () => navigate('/inventory/list'),
        showCancel: false,
      });

      return;
    }

    setApiData(result.data);
    onComplete?.();
  };
  const onAddItem = async (label, qty) => {
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

    await refetchItems();
  };
  const onRemoveItem = async (id) => {
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

    await refetchItems();
  };
  const onSetItemQty = async (itemId, qty) => {
    setApiData((p) => ({
      ...p,
      content: p.content.map((m) => {
        if (m.id === itemId) {
          m.quantity = qty;
        }
        return m;
      }),
    }));
    setChangeList((p) => {
      const newList = [
        ...(p ?? []),
        {
          type: 'SET_QUANTITY',
          data: { id: itemId, quantity: qty },
          timestamp: Date.now(),
        },
      ];

      const filtered = Object.values(
        newList.reduce((acc, item) => {
          const key = `${item.type}-${item.data.id}`;

          if (!acc[key] || item.timestamp > acc[key].timestamp) {
            acc[key] = item;
          }

          return acc;
        }, {})
      );

      return filtered;
    });
  };
  const onItemRename = async (itemId, name) => {
    console.info({ itemId, name });

    const result = await api.items.modifyName(inventoryId, itemId, name);

    if (!result.success) {
      return;
    }

    await refetchItems();
  };

  // buttons
  const onAddItemButton = () => {
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
            children: <>Either the name or the quantity are invalid.</>,
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
  };
  const onAIButton = () => {
    navigate(`/ai/inventory/imageanalysis?inventoryId=${inventoryId}`);
  };

  if (!inventoryId) {
    navigate('/inventory/list');
  }

  // effects
  useEffect(() => {
    // fetch session
    (async () => {
      getSession({
        onSession: () => setAiEnabled(true),
        onNoSession: () => setAiEnabled(false),
      });
    })();

    // fetch items
    setIsLoading(true);
    refetchItems({ onComplete: () => setIsLoading(false) });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const fn = async () => {
      setIsLoading(true);

      const set_quantity = changeList
        .filter((x) => x.type === 'SET_QUANTITY')
        .flatMap((m) => m.data);

      await api.inventory.updateItems(inventoryId, set_quantity);

      await refetchItems();

      setIsLoading(false);
    };

    if (changeList.length === 0) return;

    const to = setTimeout(fn, updateChangesTimeout);

    return () => {
      if (to) clearTimeout(to);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeList]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="h-full flex flex-col">
        <Header
          text={apiData?.header?.inventory_name ?? 'Items'}
          onReturn={() => navigate('/inventory/list')}
        />
        <Searchbar />
        <section className="flex-1 min-h-0 overflow-hidden">
          <div className="h-full flex flex-col items-center gap-1 overflow-y-auto px-2 py-2">
            {apiData?.content
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
        </section>
        <ButtonFooter>
          <RoundedButton onClick={onAddItemButton}>
            <IoMdAdd />
          </RoundedButton>
          {isAiEnabled && (
            <RoundedButton onClick={onAIButton}>
              <PiStarFour />
            </RoundedButton>
          )}
        </ButtonFooter>
      </div>
    );
  }
}

export default InventoryDisplay;
