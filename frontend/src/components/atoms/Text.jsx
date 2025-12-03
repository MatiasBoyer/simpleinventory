import CleanClassnames from '@/utils/functions/CleanClassnames';

function Text({ children, className }) {
  return (
    <p
      className={CleanClassnames(
        `antialiased text-shadow-md ${className} select-none`
      )}
    >
      {children}
    </p>
  );
}

export default Text;
