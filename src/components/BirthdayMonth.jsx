import { BirthdayItem } from './BirthdayItem';
import { BackIcon } from '../assets/icons/BackIcon';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

export function BirthdayMonth({ birthdaysByMonth, onDelete }) {
  const { month } = useParams();
  const monthLowerCase = month.toLowerCase();

  const sortBirthdays =
    birthdaysByMonth[monthLowerCase]?.sort((a, b) => a.day - b.day) || [];

  return (
    <div className='flex flex-col gap-2 w text-neutral-400 '>
      <div className='flex gap-2 items-center '>
        <Link to='/'>
          <BackIcon />
        </Link>
        <h2 className='text-neutral-400 font-bold text-base uppercase mt-4'>
          {month}
        </h2>
      </div>
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
