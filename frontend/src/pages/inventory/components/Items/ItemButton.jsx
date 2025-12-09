import Button from '@/components/atoms/Button';
import CleanClassnames from '@/utils/functions/CleanClassnames';

function ItemButton({ children, type, onClick }) {
  const typeClass = {
    '+': 'border-r-1 rounded-r-md',
    '-': 'border-l-1 rounded-l-md',
    ' ': 'border-1',
  };

  return (
    <Button
      replaceClassname={CleanClassnames(`
        bg-stone-200
        border-y ${typeClass[type ?? ' '] ?? typeClass[' ']}
        cursor-pointer
        `)}
      onClick={onClick}
    >
      {children ?? type}
    </Button>
  );
}

export default ItemButton;
