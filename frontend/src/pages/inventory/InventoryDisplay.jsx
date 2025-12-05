import CleanClassnames from '@/utils/functions/CleanClassnames';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { AiOutlineLoading } from 'react-icons/ai';
import api from '@/utils/api';

function ItemButton({ type, onClick }) {
  return (
    <Button
      replaceClassname={CleanClassnames(`
        bg-stone-200
        border-y ${type === '+' ? 'border-r-1 rounded-r-md' : 'border-l-1 rounded-l-md'}
        cursor-pointer
        `)}
      onClick={onClick}
    >
      {type}
    </Button>
  );
}

function Entry({ item, onRemoveItem, onSumItem, onSetItemQty }) {
  return (
    <div className="w-[95%] p-2 grid grid-cols-[5%_auto_20%] border-b flex flex-row justify-between items-center">
      <div className="flex items-center">
        <Button
          onClick={() => {
            AddPopup({
              children: <>Are you sure?</>,
              title: 'Confirmation',
              onAccept: () => onRemoveItem(item.id),
            });
          }}
          replaceClassname="border-0 flex items-center w-full h-full cursor-pointer"
        >
          <FaRegTrashAlt />
        </Button>
      </div>
      <div className="flex items-center">{item.item_text}</div>
      <div className="grid grid-cols-[30%_auto_30%]">
        <ItemButton
          type="-"
          onClick={() => onSumItem(item.id, item.quantity + -1)}
        />
        <input
          value={item.quantity}
          onChange={(e) => {
            const n = parseInt(e.target.value);

            if (Number.isNaN(n)) return;

            onSetItemQty(item.id, n);
          }}
          className={`
            w-full text-center bg-stone-200 border
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
          type="number"
          disabled={true} // MODIFY ME
        />
        <ItemButton
          type="+"
          onClick={() => onSumItem(item.id, item.quantity + 1)}
        />
      </div>
    </div>
  );
}

function InventoryDisplay() {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  const inventoryId = searchParams.get('id');

  if (!inventoryId) {
    navigate('/inventory/list');
  }

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

  useEffect(() => {
    setIsLoading(true);
    refetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isLoading) {
    return (
      <div
        className={CleanClassnames(`
            relative
            flex flex-col w-full h-full items-center
            ${!isLoading ? '' : 'justify-center'}
            `)}
      >
        <div className="w-24 h-24 flex items-center justify-center">
          <AiOutlineLoading className="w-full h-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col items-center gap-1">
        {list.map((item) => (
          <Entry
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onSumItem={onSetItemQty}
            onSetItemQty={onSetItemQty}
          />
        ))}
      </div>
      <div className="flex justify-center items-end absolute bottom-10 left-0 right-0 opacity-50">
        <Button
          replaceClassname="rounded-full bg-stone-300 w-8 h-8 cursor-pointer shadow-lg border"
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
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}

export default InventoryDisplay;
