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

    const phoneRegex = /^\d{9}$/;
    const yearRegex = /^\d{4}$/;
    const dayRegex = /^\d+$/;

    if (name && day && month && year && phone) {
      if (
        phoneRegex.test(phone) &&
        yearRegex.test(year) &&
        dayRegex.test(day)
      ) {
        saveBirthday({ name, day, month, year, phone });
        closeDialog();
        resetForm();
      } else {
        if (!phoneRegex.test(phone)) {
          console.error('El número de teléfono debe tener 9 dígitos.');
        }
        if (!yearRegex.test(year)) {
          console.error('El formato del año es incorrecto.');
        }
        if (!dayRegex.test(day)) {
          console.error('El formato del día es incorrecto.');
        }
      }
    } else {
      console.error('Por favor, completa todos los campos.');
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
      className='flex flex-col gap-2 w-80 h-[440px] p-4 pt-10 bg-neutral-900 rounded-lg relative justify-between'
      onSubmit={handleSave}
    >
      <div className='flex flex-col gap-6 mt-2'>
        <input
          required
          placeholder='Nombre'
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4 rounded-lg text-sm border-none '
        />
        <input
          required
          placeholder='Día'
          type='text'
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4 rounded-lg text-sm  border-none'
        />
        <input
          required
          placeholder='Mes'
          type='text'
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm  border-none'
        />
        <input
          required
          placeholder='Año'
          type='text'
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm  border-none'
        />
        <input
          required
          placeholder='Teléfono'
          type='text'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='bg-neutral-900 w-full text-white outline-none focus:bg-neutral-800 py-2 px-4  rounded-lg text-sm  border-none'
        />
      </div>

      <button
        type='submit'
        className='text-neutral-950 bg-white border-2  py-2 px-4 mb-2 rounded-full font-bold  border-none'
      >
        Guardar cumpleaños
      </button>

      <button onClick={closeDialog} className='absolute top-4 right-4 '>
        <CloseIcon />
      </button>
    </form>
  );
}
