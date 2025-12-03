import CleanClassnames from '@/utils/functions/CleanClassnames';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import { useInventoryStore } from '@/utils/stores/useInventoryStore';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import { FaRegTrashAlt } from 'react-icons/fa';

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

function Entry({ item, store }) {
  return (
    <div className="grid grid-cols-[5%_auto_20%] bg-neutral-300 hover:bg-neutral-400 p-2">
      <div className="flex items-center">
        <Button
          onClick={() => {
            AddPopup({
              children: <>Are you sure?</>,
              title: 'Confirmation',
              onAccept: () => store.removeItem(item.id),
            });
          }}
          replaceClassname="border-0 flex items-center w-full h-full cursor-pointer"
        >
          <FaRegTrashAlt />
        </Button>
      </div>
      <div className="flex items-center">{item.label}</div>
      <div className="grid grid-cols-[30%_auto_30%]">
        <ItemButton
          type="-"
          onClick={() => {
            store.sumItem(item.id, -1);
          }}
        />
        <input
          value={item.qty}
          onChange={(e) => {
            const n = parseInt(e.target.value);

            if (Number.isNaN(n)) return;

            store.setItemQty(item.id, n);
            console.info(n);
          }}
          className={`
            w-full text-center bg-stone-200 border
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          `}
          type="number"
        />
        <ItemButton
          type="+"
          onClick={() => {
            store.sumItem(item.id, 1);
          }}
        />
      </div>
    </div>
  );
}

function Inventory() {
  const store = useInventoryStore();

  return (
    <div className="h-full bg-blue-100">
      <div className="flex flex-col gap-1">
        {store.items.map((item) => (
          <Entry item={item} store={store} key={item.id} />
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

                store.addItem(itemName, itemQty);
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

export default Inventory;
