import { Dialog } from './Dialog';

export function Footer({ toggleDialog, saveBirthday, isOpen }) {
  return (
    <footer className='md:max-w-lg max-w-80 w-full mx-auto  flex flex-col  justify-center items-start h-auto mt-2'>
      <button
        onClick={() => toggleDialog()}
        className='text-neutral-950 w-full bg-white border-2 mt-4 py-2 rounded-full font-bold  border-none'
      >
        Añadir cumpleaños
      </button>

      <Dialog
        saveBirthday={saveBirthday}
        isOpen={isOpen}
        toggleDialog={toggleDialog}
      />
    </footer>
  );
}
