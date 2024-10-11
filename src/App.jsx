import { useState } from 'react';
import { UpcomingBirthdays } from './components/UpcomingBirthdays';
import { BirthdayMonth } from './components/BirthdayMonth';
import { Header } from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { useBirthday } from './hooks/useBirthdays';
import { Toaster } from 'sonner';
import './App.css';

function App() {
  const {
    birthdays,
    isDialogOpen,
    setBirthdays,
    saveBirthday,
    toggleDialog,
    deleteBirthday,
  } = useBirthday();
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

  return (
    <Router>
      <div className='w-full bg-neutral-950 min-h-screen flex flex-col overflow-x-hidden justify-center items-center '>
        <Toaster position='top-center' />
        <Header
          setBirthdays={setBirthdays}
          birthdaysByMonth={birthdaysByMonth}
          setSelectedMonth={setSelectedMonth}
        />

        <div className='w-full md:min-w-96 md:max-w-lg max-w-80  mx-auto'>
          <Routes>
            <Route
              path='/'
              element={
                <UpcomingBirthdays
                  birthdaysByMonth={birthdaysByMonth}
                  onDelete={deleteBirthday}
                />
              }
            />
            <Route
              path='/:month'
              element={
                <BirthdayMonth
                  birthdaysByMonth={birthdaysByMonth}
                  month={selectedMonth}
                  onDelete={deleteBirthday}
                />
              }
            />
          </Routes>
        </div>

        <Footer
          toggleDialog={toggleDialog}
          saveBirthday={saveBirthday}
          isOpen={isDialogOpen}
        />
      </div>
    </Router>
  );
}

export default App;
