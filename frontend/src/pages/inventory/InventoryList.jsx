import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import Text from '@/components/atoms/Text';
import { AddPopup } from '@/components/organisms/Popup/PopupContainer';
import api from '@/utils/api';
import CleanClassnames from '@/utils/functions/CleanClassnames';
import { useEffect, useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import { AiOutlineLoading } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';
import { useNavigate } from 'react-router';
import { generateRandomDigitString } from '@/utils/random.js';

function Entry({ label, id, onDelete }) {
  const navigate = useNavigate();

  const onModify = () => {
    navigate(`/inventory/display?id=${id}`);
  };

  return (
    <div className="w-[95%] p-2 border-b flex flex-row justify-between items-center">
      <div className="">
        <Text>{label ?? 'unknown'}</Text>
      </div>
      <div className="w-[20%] flex flex-row gap-1">
        <Button
          className="w-3/4 flex items-center justify-center"
          onClick={onModify}
        >
          <FaPencilAlt />
        </Button>
        <Button
          className="w-1/4 flex items-center justify-center"
          onClick={onDelete}
        >
          <FaTrashAlt />
        </Button>
      </div>
    </div>
  );
}

function InventoryList() {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (isLoading) {
      (async () => {
        const result = await api.inventory.getList();
        if (result.success) {
          setIsLoading(false);
          setList(result.data);
        }
      })();
    }
  }, [isLoading]);

  const onCreate = () => {
    AddPopup({
      title: 'Create new inventory',
      children: (
        <>
          <Text className="w-full">Enter inventory name</Text>
          <Input id="invname" />
        </>
      ),
      onAccept: async (data) => {
        const result = await api.inventory.create(data.invname);

        if (!result.success) {
          AddPopup({
            title: 'Failed',
            children: (
              <>
                <Text className="w-full">Failed to create inventory</Text>
              </>
            ),
            showCancel: false,
          });
          return;
        }

        AddPopup({
          title: 'Success',
          children: (
            <>
              <Text className="w-full">
                Created inventory with id {result.data.id}
              </Text>
            </>
          ),
          onAccept: () => setIsLoading(true),
          showCancel: false,
        });
      },
    });
  };

  const onDelete = (id) => {
    const pass = generateRandomDigitString(7);

    AddPopup({
      title: 'Confirm',
      children: (
        <>
          <Text className="w-full">
            Are you sure you want to delete this inventory?
          </Text>
          <Text className="w-full">Type '{pass}' to confirm</Text>
          <Input id="passkey">asd</Input>
        </>
      ),
      onAccept: (data) => {
        if (pass === data.passkey) {
          (async () => {
            const result = await api.inventory.delete(id);

            if (result.success) {
              AddPopup({
                title: 'Completed',
                children: (
                  <>
                    <Text className="w-full">Inventory has been deleted</Text>
                  </>
                ),
                showCancel: false,
              });
            } else {
              AddPopup({
                title: 'Failed',
                children: (
                  <>
                    <Text className="w-full">Inventory deletion failed</Text>
                    <Text className="w-full">{result.message}</Text>
                  </>
                ),
                showCancel: false,
              });
            }
          })();
        } else {
          AddPopup({
            title: 'Failed',
            children: (
              <>
                <Text className="w-full">Incorrect password</Text>
              </>
            ),
            showCancel: false,
          });
        }
      },
    });
  };

  return (
    <>
      <div
        className={CleanClassnames(`
        relative
        flex flex-col w-full h-full items-center
        ${!isLoading ? '' : 'justify-center'}
        `)}
      >
        {isLoading && (
          <div className="w-24 h-24 flex items-center justify-center">
            <AiOutlineLoading className="w-full h-full animate-spin" />
          </div>
        )}
        {list.map((item) => (
          <Entry
            id={item.id}
            key={item.id}
            label={item.label}
            onDelete={() => onDelete(item.id)}
          />
        ))}
      </div>
      <Button
        replaceClassname={CleanClassnames(
          `
          absolute
          bg-stone-100 shadow-sm opacity-60
          bottom-10 left-1/2 -translate-x-1/2
          border w-8 h-8 rounded-full cursor-pointer
          flex items-center justify-center
          `
        )}
        onClick={onCreate}
      >
        <IoMdAdd />
      </Button>
    </>
  );
}

export default InventoryList;
