import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export const useBirthday = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const savedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    setBirthdays(savedBirthdays);
  }, []);

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
    toast.success('Cumpleaños añadido!');
    setIsDialogOpen(false);
  };

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  const deleteBirthday = (id) => {
    const filteredBirthdays = birthdays.filter(
      (birthday) => birthday.id !== id
    );
    setBirthdays(filteredBirthdays);
    localStorage.setItem('birthdays', JSON.stringify(filteredBirthdays));
  };

  return {
    birthdays,
    isDialogOpen,
    setBirthdays,
    saveBirthday,
    toggleDialog,
    deleteBirthday,
  };
};
