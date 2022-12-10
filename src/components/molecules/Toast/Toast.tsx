import clsx from 'clsx';
import { useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { StyleVariant } from '../../atoms/Button/Button';

type ToastPropType = {
  id: string;
  message: string;
  onClose: (id: string) => void;
  variant: StyleVariant;
  autoClose?: boolean;
};

const Toast = ({ id, message, onClose, variant = 'dark-1', autoClose = false }: ToastPropType) => {
  //! Dismissing Toast after 6sec, if the boolean is set
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoClose) {
      timer = setTimeout(() => {
        onClose(id);
      }, 6000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div
      onClick={() => {
        onClose(id);
      }}
      className={clsx('p-3 rounded-lg gap-4 flex justify-between items-center', {
        'bg-black text-white': variant === 'dark-1',
        'bg-pink-1 text-white': variant === 'pink-1',
        'bg-blue-1 text-white': variant === 'blue-1',
        'bg-orange-1 text-black': variant === 'yellow-1',
        'bg-yellow-1 text-black': variant === 'yellow-1',
        'bg-error-1 text-white': variant === 'error-1',
      })}
    >
      <p className="text-sm sm:text-base md:text-lg font-josefin font-semibold">{message}</p>
      <IoClose
        className="cursor-pointer grow min-w-[12px]"
        width={24}
        height={24}
        onClick={(e) => {
          e.stopPropagation();
          onClose(id);
        }}
      />
    </div>
  );
};

export default Toast;
