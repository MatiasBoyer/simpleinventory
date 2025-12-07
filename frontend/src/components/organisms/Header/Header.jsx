import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from 'react-router';

function Header({ inventoryId, text }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-row items-center justify-center border-b">
      {inventoryId && (
        <div className="flex-1/4 h-full">
          <Button
            replaceClassname="border-r px-2 w-full h-full flex flex-row items-center justify-center hover:cursor-pointer"
            onClick={() => navigate(`/inventory/display?id=${inventoryId}`)}
          >
            <RiArrowGoBackFill />
          </Button>
        </div>
      )}
      <Text className="flex-3/4 text-center text-xl font-bold">{text}</Text>
    </div>
  );
}

export default Header;
