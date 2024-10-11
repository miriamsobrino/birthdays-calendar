import { useEffect } from 'react';
import { MONTHS } from '../constants/Constants';
import { BirthdayItem } from './BirthdayItem';

export function UpcomingBirthdays({ birthdaysByMonth, onDelete }) {
  const currentMonthIndex = new Date().getMonth();
  const currentDay = new Date().getDate();

  const currentMonth = MONTHS[currentMonthIndex].toLowerCase();

  const upcomingBirthdays =
    birthdaysByMonth[currentMonth]
      ?.filter((birthday) => birthday.day > currentDay)
      .sort((a, b) => a.day - b.day) || [];

  const todaysBirthdays =
    birthdaysByMonth[currentMonth]?.filter(
      (birthday) => birthday.day === currentDay.toString()
    ) || [];

  useEffect(() => {
    console.log('Todays Birthdays:', todaysBirthdays);
    console.log('Birthdays By Month:', birthdaysByMonth);
    console.log(currentMonth);
    console.log(currentDay);
  }, [todaysBirthdays, birthdaysByMonth]);
  return (
    <div className='flex flex-col gap-2 '>
      <p className='text-neutral-400 font-bold mb-2 uppercase '>Hoy</p>
      {todaysBirthdays.map((birthday) => (
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

      <h2 className='text-neutral-400 font-bold text-base uppercase mt-4'>
        Próximos
      </h2>
      {upcomingBirthdays.length === 0 && todaysBirthdays.length === 0 && (
        <p className='text-neutral-400'>No hay cumpleaños próximos</p>
      )}

      {upcomingBirthdays.map((birthday) => {
        return (
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
        );
      })}
    </div>
  );
}
