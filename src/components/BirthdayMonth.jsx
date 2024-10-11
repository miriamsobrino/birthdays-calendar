import { BirthdayItem } from './BirthdayItem';

export function BirthdayMonth({ birthdaysByMonth, month, onDelete }) {
  const monthLowerCase = month.toLowerCase();

  const sortBirthdays =
    birthdaysByMonth[monthLowerCase]?.sort((a, b) => a.day - b.day) || [];

  return (
    <div className='flex flex-col gap-2 w'>
      <h2 className='text-neutral-400 font-bold text-base uppercase mt-4'>
        {month}
      </h2>
      {sortBirthdays.length === 0 && (
        <p className='text-neutral-400'>No hay cumpleaños en este mes</p>
      )}
      {sortBirthdays.map((birthday) => (
        <BirthdayItem
          key={birthday.id}
          name={birthday.name}
          month={birthday.month}
          day={birthday.day}
          year={birthday.year}
          phone={birthday.phone}
          id={birthday.id}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
