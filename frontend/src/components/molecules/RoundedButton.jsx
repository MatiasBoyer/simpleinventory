import Button from '../atoms/Button';

function RoundedButton({ onClick, children }) {
  return (
    <Button
      replaceClassname="rounded-full bg-stone-300 w-8 h-8 cursor-pointer shadow-lg border flex items-center justify-center"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default RoundedButton;
