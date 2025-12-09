import CleanClassnames from '@/utils/functions/CleanClassnames';
import { AiOutlineLoading } from 'react-icons/ai';

function LoadingScreen({ className }) {
  return (
    <div
      className={CleanClassnames(`
                relative w-full h-full
                flex flex-col items-center justify-center
                ${className}
                z-999
                `)}
    >
      <div className="w-24 h-24 flex items-center justify-center">
        <AiOutlineLoading className="w-full h-full animate-spin" />
      </div>
    </div>
  );
}

export default LoadingScreen;
