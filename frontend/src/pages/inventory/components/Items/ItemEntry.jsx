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
  const int_onRemoveItem = () => {
    AddPopup({
      children: <>Are you sure?</>,
      title: 'Confirmation',
      onAccept: () => onRemoveItem(item.id),
    });
  };
  const int_onModifyItemName = () => {
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
    });
  };
  const int_onButtonMinus = () => {
    onSumItem(item.id, item.quantity + -1);
  };
  const int_onButtonInput = () => {
    AddPopup({
      title: 'Modify item quantity',
      children: (
        <>
          <Text className="w-full">New quantity</Text>
          <Input
            id="newQuantity"
            className="w-full"
            maxLength={999}
            type="number"
            defaultValue={item?.quantity ?? 0}
          />
        </>
      ),
      onAccept: (values) => {
        if (values?.newQuantity) onSetItemQty(item.id, values.newQuantity);
      },
    });
  };
  const int_onButtonPlus = () => {
    onSumItem(item.id, item.quantity + 1);
  };

  return (
    <div className="w-[95%] p-2 grid grid-cols-[5%_1fr_20%] border-b flex flex-row justify-between items-center">
      <div className="flex items-center justify-center">
        <Button
          onClick={int_onRemoveItem}
          replaceClassname="border-0 flex items-center w-full h-full cursor-pointer"
        >
          <FaRegTrashAlt />
        </Button>
      </div>
      <div className="w-full flex flex-row justify-between items-center gap-2">
        <div
          className="w-full max-w-[60%] px-2"
          onDoubleClick={int_onModifyItemName}
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
        <ItemButton type="-" onClick={int_onButtonMinus} />
        <ItemButton onClick={int_onButtonInput}>{item.quantity}</ItemButton>
        <ItemButton type="+" onClick={int_onButtonPlus} />
      </div>
    </div>
  );
}

export default ItemEntry;
