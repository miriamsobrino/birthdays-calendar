import { Avatar } from './Avatar';

export function MonthBirthdayResume({
  birthdaysByMonth,
  month,
  onItemSelected,
}) {
  const monthLowerCase = month.toLowerCase();

  const sortBirthdays =
    birthdaysByMonth[monthLowerCase]?.sort((a, b) => a.day - b.day) || [];

  return (
    <div
      className='flex flex-col gap-2 cursor-pointer w-full '
      onClick={() => onItemSelected(monthLowerCase)}
    >
      <h2 className='text-neutral-400 font-bold text-base uppercase'>
        {monthLowerCase.charAt(0).toUpperCase() + monthLowerCase.slice(1, 3)}
      </h2>

      <div className='flex -space-x-4 mb-2 '>
        {sortBirthdays.slice(0, 2).map((birthday) => (
          <Avatar key={birthday.name} seed={birthday.name} size={32} />
        ))}
        <div className='w-full flex'>
          {birthdaysByMonth[monthLowerCase]?.length > 2 && (
            <div className='flex items-center justify-center w-8 h-8 bg-neutral-600 rounded-full'>
              <span className='text-white font-bold'>
                +{birthdaysByMonth[monthLowerCase]?.length - 2}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
