import { useState, useRef, useEffect } from 'react';
import { MonthBirthdayResume } from './components/MonthBirthdayResume';
import { FormBirthday } from './components/FormBirthday';
import { UpcomingBirthdays } from './components/UpcomingBirthdays';
import { BirthdayMonth } from './components/BirthdayMonth';
import { MONTHS } from './constants/Constants';
import './App.css';

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showMonth, setShowMonth] = useState(false);
  const savedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

  useEffect(() => {
    setBirthdays(savedBirthdays);
  }, []);

  const dialogRef = useRef(null);

  const birthdaysByMonth = birthdays.reduce(
    (groupedBirthdays, currentBirthday) => {
      const monthLowerCase = currentBirthday.month.toLowerCase();
      if (!groupedBirthdays[monthLowerCase]) {
        groupedBirthdays[monthLowerCase] = [];
      }
      groupedBirthdays[monthLowerCase].push(currentBirthday);
      return groupedBirthdays;
    },
    {}
  );

  const saveBirthday = ({ name, day, month, year, phone }) => {
    const newBirthday = {
      id: crypto.randomUUID(),
      name,
      day,
      month: month.toLowerCase(),
      year,
      phone,
    };

    setBirthdays((prevBirthdays) => {
      const updatedBirthdays = [...prevBirthdays, newBirthday];
      localStorage.setItem('birthdays', JSON.stringify(updatedBirthdays));
      return updatedBirthdays;
    });
    dialogRef.current.close();
  };

  const toggleDialog = () => {
    if (!dialogRef.current) {
      return;
    }

    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const closeDialog = () => {
    return dialogRef.current.close();
  };

  const deleteBirthday = (id) => {
    const filteredBirthdays = birthdays.filter(
      (birthday) => birthday.id !== id
    );
    setBirthdays(filteredBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(filteredBirthdays));
  };

  const showBirthdaysMonth = (selectedMonth) => {
    setSelectedMonth(selectedMonth);
    setShowMonth(true);
  };

  return (
    <div className='w-full bg-neutral-950 min-h-screen flex flex-col justify-center items-center '>
      <div className='md:min-w-96 md:max-w-lg max-w-80 mx-auto  flex flex-col justify-center items-start h-auto gap-4'>
        <h1 className='text-white font-bold text-2xl'>Cumpleaños</h1>
        {savedBirthdays.length === 0 && (
          <p className='text-neutral-400 font-bold text-base'>
            Aún no has añadido ningún cumpleaños
          </p>
        )}
        {savedBirthdays.length > 0 && (
          <div className='w-full  '>
            <div className='flex gap-6 w-full py-2 scroll-container'>
              {MONTHS.map((month, index) => (
                <div key={index} className='scroll-item'>
                  <MonthBirthdayResume
                    birthdaysByMonth={birthdaysByMonth}
                    month={month}
                    onItemSelected={() => showBirthdaysMonth(month)}
                  />
                </div>
              ))}
            </div>

            {!showMonth && (
              <UpcomingBirthdays
                birthdaysByMonth={birthdaysByMonth}
                onDelete={deleteBirthday}
              />
            )}
            {showMonth && (
              <BirthdayMonth
                birthdaysByMonth={birthdaysByMonth}
                month={selectedMonth}
                onDelete={deleteBirthday}
              />
            )}
          </div>
        )}
        <button
          onClick={() => toggleDialog()}
          className='text-neutral-950 bg-white border-2 mt-4 py-2  rounded-full font-bold w-full'
        >
          Añadir cumpleaños
        </button>
      </div>

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
    </div>
  );
}

export default App;
