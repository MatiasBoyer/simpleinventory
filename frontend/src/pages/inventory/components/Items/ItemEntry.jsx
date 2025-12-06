import Button from '@/components/atoms/Button';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { FaArrowDown, FaArrowUp, FaRegTrashAlt } from 'react-icons/fa';
import ItemButton from './ItemButton';
import Text from '@/components/atoms/Text';
import Input from '@/components/atoms/Input';

function ItemEntry({
  item,
  onRemoveItem,
  onSumItem,
  onSetItemQty,
  onItemRename,
  difference = null,
}) {
  return (
    <div className="w-[95%] p-2 grid grid-cols-[5%_1fr_20%] border-b flex flex-row justify-between items-center">
      <div className="flex items-center justify-center">
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
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <div
          className="w-full max-w-[60%] px-2"
          onDoubleClick={() =>
            AddPopup({
              title: 'Modify item name',
              children: (
                <>
                  <Text className="w-full">New name</Text>
                  <Input id="newName" maxLength={20} />
                </>
              ),
              onAccept: (values) => {
                if (values?.newName) onItemRename?.(values.newName);
              },
            })
          }
        >
          <Text className="w-full">{item.item_text}</Text>
        </div>
        {item?.confidence && (
          <Text className="px-2 text-center">
            Confidence {item?.confidence * 100}%
          </Text>
        )}
        {difference != null && (
          <div className="flex flex-row items-center justify-center px-2">
            {difference >= 0 ? (
              <FaArrowUp className="h-[50%] w-[50%]" />
            ) : (
              <FaArrowDown className="h-[50%] w-[50%]" />
            )}
            <Text>{difference}</Text>
          </div>
        )}
      </div>
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
