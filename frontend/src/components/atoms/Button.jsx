import CleanClassnames from '@utils/functions/CleanClassnames';

function Button({ children, onClick, className, replaceClassname }) {
  return (
    <button
      className={
        replaceClassname
          ? replaceClassname
          : CleanClassnames(
              `
        border p-1 rounded-sm shadow-md ${className}
        bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-500
        cursor-pointer
        `
            )
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
