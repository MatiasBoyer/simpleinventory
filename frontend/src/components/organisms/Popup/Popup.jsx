import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import CleanClassnames from '@/utils/functions/CleanClassnames';
import { useState } from 'react';

export default function Popup({
  children,
  title,
  onAccept,
  onCancel,
  showCancel,
}) {
  const [hasInteractedWithButtons, setHasInteractedWithButtons] =
    useState(false);

  return (
    <div
      className={CleanClassnames(`
        w-[90%] min-h-[25%] rounded-md overflow-hidden border
        grid ${title ? 'grid-rows-[20%_1fr_20%]' : 'grid-rows-[1fr_20%]'}
    `)}
    >
      {title && (
        <div className="flex items-center justify-center border-b bg-neutral-200">
          <Text className="text-xl font-bold">{title}</Text>
        </div>
      )}
      <div className="flex flex-col items-center justify-center bg-neutral-100">
        {children}
      </div>
      <div className="flex items-center justify-center gap-2 border-t bg-neutral-200">
        <Button
          onClick={() => {
            setHasInteractedWithButtons(true);
            onAccept?.();
          }}
          disabled={hasInteractedWithButtons}
        >
          OK
        </Button>
        {onCancel && showCancel && (
          <Button
            onClick={() => {
              setHasInteractedWithButtons(true);
              onCancel?.();
            }}
            disabled={hasInteractedWithButtons}
          >
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
