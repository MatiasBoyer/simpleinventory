import CleanClassnames from '@/utils/functions/CleanClassnames';
import Button from '../atoms/Button';

function RoundedButton({ onClick, children, disabled }) {
  return (
    <Button
      replaceClassname={CleanClassnames(
        `
        rounded-full
        w-16 h-16
        shadow-lg border
        flex items-center justify-center
        ${!disabled ? 'cursor-pointer bg-stone-300' : 'cursor-not-allowed bg-stone-500'}
        `
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export default RoundedButton;
