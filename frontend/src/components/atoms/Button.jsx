import CleanClassnames from '@utils/functions/CleanClassnames';

function Button({
  children,
  onClick,
  className,
  replaceClassname = null,
  disabled = false,
}) {
  return (
    <button
      className={
        replaceClassname
          ? replaceClassname
          : CleanClassnames(
              `
        border p-1 ${className}
        ${
          disabled
            ? 'cursor-not-allowed bg-stone-300'
            : 'cursor-pointer hover:bg-neutral-100 active:bg-neutral-300'
        }
        `
            )
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
