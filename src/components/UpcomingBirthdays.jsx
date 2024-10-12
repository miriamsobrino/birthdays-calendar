import { MONTHS } from '../constants/Constants';
import { BirthdayItem } from './BirthdayItem';
import { motion } from 'framer-motion';

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

  return (
    <div className='flex flex-col gap-2 '>
      {todaysBirthdays.length > 0 && (
        <>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='text-neutral-400 font-bold mb-2 uppercase'
          >
            Hoy
          </motion.h2>
          {todaysBirthdays.map((birthday, index) => (
            <BirthdayItem
              key={birthday.id}
              name={birthday.name}
              month={birthday.month}
              day={birthday.day}
              year={birthday.year}
              phone={birthday.phone}
              id={birthday.id}
              onDelete={onDelete}
              todaysBirthday={true}
              delay={index * 0.2}
            />
          ))}
        </>
      )}

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className='text-neutral-400 font-bold text-base uppercase mt-4'
      >
        Próximos
      </motion.h2>
      {upcomingBirthdays.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className='text-neutral-400'
        >
          No hay cumpleaños próximos
        </motion.p>
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
            todaysBirthday={false}
          />
        );
      })}
    </div>
  );
}
