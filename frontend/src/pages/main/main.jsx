import { useNavigate } from 'react-router';
import Button from '../../components/atoms/Button';
import Text from '../../components/atoms/Text';
import { FaGithub } from 'react-icons/fa';

function Main() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-rows-[auto_1fr_auto] w-full h-full">
      <div>
        <Text className="text-xl text-center font-bold">simple inventory</Text>
      </div>
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        <Text>manage all your household inventories in one place</Text>
        <div>
          <Text>features include:</Text>
          <div className="grid gap-1">
            <Text>• create and organize multiple inventories</Text>
            <Text>• update and manage inventory details</Text>
            <Text>• add, edit, or remove items effortlessly</Text>
            <Text>• generate items quickly with ai assistance</Text>
          </div>
        </div>
        <Button onClick={() => navigate('/auth')}>go to login page</Button>
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <Text className="flex flex-row items-center justify-center gap-2">
          created by Matías Boyer{' '}
          <a
            href="https://www.github.com/MatiasBoyer/simpleinventory"
            className="w-fit"
          >
            <FaGithub />
          </a>
        </Text>
      </div>
    </div>
  );
}

export default Main;
