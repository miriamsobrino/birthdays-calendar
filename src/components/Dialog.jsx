import { FormBirthday } from './FormBirthday';
import { useRef, useEffect } from 'react';

export function Dialog({ saveBirthday, isOpen, toggleDialog }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  const closeDialog = () => {
    toggleDialog();
  };

  return (
    <dialog
      ref={dialogRef}
      className='rounded-lg bg-neutral-900 '
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <FormBirthday saveBirthday={saveBirthday} closeDialog={closeDialog} />
    </dialog>
  );
}
