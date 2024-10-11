import { Avatar } from './Avatar';
import { GiftIcon } from '../assets/icons/GiftIcon';
import { CloseIcon } from '../assets/icons/CloseIcon';

export function BirthdayItem({
  name,
  month,
  day,
  year,
  id,
  phone,
  onDelete,
  todaysBirthday,
}) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  const sendWhatsAppMessage = (name, phone, age) => {
    const message = `¡Felices ${age}, ${name}! 🎉`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <div className='flex gap-2 px-2 py-1 rounded-full items-center justify-between bg-neutral-800'>
      <div className='flex justify-start gap-2'>
        <Avatar seed={name} size={40} />
        <div className='flex flex-col'>
          <span className='text-white font-bold text-base'>
            {capitalizeFirstLetter(name)}
          </span>
          <small className='text-neutral-400 font-bold text-sm'>
            {capitalizeFirstLetter(month)}, {day}
          </small>
        </div>
      </div>
      <div className='flex gap-4'>
        <span className='text-white font-semibold'>{age} años</span>
        {todaysBirthday && (
          <button onClick={() => sendWhatsAppMessage(name, phone, age)}>
            <GiftIcon />
          </button>
        )}

        <button onClick={() => onDelete(id)}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
