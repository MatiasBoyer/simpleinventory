import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import CleanClassnames from '@/utils/functions/CleanClassnames';

export default function Popup({ children, title, onAccept, onCancel }) {
  return (
    <div
      className={CleanClassnames(`
        w-[90%] min-h-[25%] bg-stone-300 rounded-md overflow-hidden
        grid ${title ? 'grid-rows-[20%_1fr_20%]' : 'grid-rows-[1fr_20%]'}
    `)}
    >
      {title && (
        <div className="flex items-center justify-center bg-stone-400">
          <Text>{title}</Text>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="flex items-center justify-center gap-2 bg-stone-400">
        <Button
          onClick={() => {
            onAccept?.();
          }}
        >
          OK
        </Button>
        {onCancel && (
          <Button
            onClick={() => {
              onCancel?.();
            }}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
