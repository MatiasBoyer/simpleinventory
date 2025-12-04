import Text from '@/components/atoms/Text';

function NotFound() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-5">
      <Text className="text-5xl">404</Text>
      <Text className="text-xl">Not found</Text>
    </div>
  );
}

export default NotFound;
