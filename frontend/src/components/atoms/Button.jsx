import CleanClassnames from '@utils/functions/CleanClassnames';

function Button({ children, onClick, className }) {
  return (
    <button
      className={CleanClassnames(
        `border bg-neutral-300 p-1 rounded-sm shadow-md ${className}`
      )}
      onClick={onClick?.()}
    >
      {children}
    </button>
  );
}

export default Button;
