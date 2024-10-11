import { useState } from 'react';
import { CloseIcon } from '../assets/icons/CloseIcon';

export function FormBirthday({ saveBirthday, closeDialog }) {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [phone, setPhone] = useState('');

  const handleSave = (event) => {
    event.preventDefault();
    if (name && day && month) {
      saveBirthday({ name, day, month, year, phone });
      closeDialog();
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setDay('');
    setMonth('');
    setYear('');
    setPhone('');
  };
  return (
    <form
      className='flex flex-col gap-2 w-80 h-[380px] p-4 pt-10 bg-neutral-900 rounded-lg relative justify-between'
      onSubmit={handleSave}
    >
      <div className='flex flex-col gap-4 mt-2'>
        <input
          required
          placeholder='Nombre'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4 rounded-lg text-sm '
        />
        <input
          required
          placeholder='Día'
          type='text'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4 rounded-lg text-sm'
        />
        <input
          required
          placeholder='Mes'
          type='text'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm'
        />
        <input
          placeholder='Año'
          type='text'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm'
        />
        <input
          placeholder='Teléfono'
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm'
        />
      </div>

      <button
        type='submit'
        className='text-neutral-950 bg-white border-2  py-2 px-4 mb-2 rounded-full font-bold'
      >
        Guardar cumpleaños
      </button>

      <button onClick={closeDialog} className='absolute top-4 right-4 '>
        <CloseIcon />
      </button>
    </form>
  );
}
