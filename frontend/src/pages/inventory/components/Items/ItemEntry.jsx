import Button from '@/components/atoms/Button';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { FaRegTrashAlt } from 'react-icons/fa';
import ItemButton from './ItemButton';

function ItemEntry({ item, onRemoveItem, onSumItem, onSetItemQty }) {
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

export default ItemEntry;
