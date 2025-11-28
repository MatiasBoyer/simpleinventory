import CleanClassnames from '@utils/functions/CleanClassnames';

function Button({ children, onClick, className }) {
  return (
    <button
      className={CleanClassnames(
        `
        border p-1 rounded-sm shadow-md ${className}
        bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-500
        cursor-pointer
        `
      )}
      onClick={onClick?.()}
    >
      {children}
    </button>
  );
}

export default Button;
