import { useState, useEffect } from 'react';
import { MONTHS } from '../constants/Constants';
import { MonthBirthdayResume } from './MonthBirthdayResume';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function Header({ setBirthdays, birthdaysByMonth, setSelectedMonth }) {
  const savedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  const navigate = useNavigate();
  useEffect(() => {
    setBirthdays(savedBirthdays);
  }, []);

  const showBirthdaysMonth = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
    navigate(`/${selectedMonth}`);
  };
  return (
    <header className=' md:max-w-lg max-w-80 mx-auto  flex flex-col justify-center items-start h-auto mb-4'>
      <Link to='/' className='text-white font-bold text-2xl'>
        Cumpleaños
      </Link>
      {savedBirthdays.length === 0 && (
        <p className='text-neutral-400 font-bold text-base'>
          Aún no has añadido ningún cumpleaños
        </p>
      )}
      {savedBirthdays.length > 0 && (
        <div className='flex flex-1 gap-10 md:gap-6 w-full py-2 scroll-container'>
          {MONTHS.map((month, index) => (
            <MonthBirthdayResume
              key={index}
              birthdaysByMonth={birthdaysByMonth}
              month={month}
              onItemSelected={() => showBirthdaysMonth(month)}
            />
          ))}
        </div>
      )}
    </header>
  );
}
