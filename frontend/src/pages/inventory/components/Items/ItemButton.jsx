import Button from '@/components/atoms/Button';
import CleanClassnames from '@/utils/functions/CleanClassnames';

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

export default ItemButton;
