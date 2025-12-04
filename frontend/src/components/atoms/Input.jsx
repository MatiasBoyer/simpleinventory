import CleanClassnames from '@/utils/functions/CleanClassnames';
import { useEffect, useState } from 'react';

import { forwardRef, useImperativeHandle } from 'react';

const Input = forwardRef(
  (
    {
      placeholder,
      defaultValue,
      onValueChange,
      disabled = false,
      type = 'text',
      minLength = 0,
      maxLength = null,
    },
    ref
  ) => {
    const [value, setValue] = useState(defaultValue ?? '');

    useEffect(() => {
      onValueChange?.(value);
    }, [onValueChange, value]);

    useImperativeHandle(ref, () => ({
      setValue,
      value,
    }));

    const onChange = (e) => {
      let v = e.target.value;

      switch (type) {
        case 'number':
          v = parseInt(v);
          break;
        default:
          break;
      }

      setValue(v);
    };

    return (
      <input
        className={CleanClassnames(`
            border p-1 w-full
            ${disabled ? 'cursor-not-allowed bg-stone-300' : ''}
        `)}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
    );
  }
);

export default Input;
