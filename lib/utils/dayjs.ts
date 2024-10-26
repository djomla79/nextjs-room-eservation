import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

const timeZoneNow = dayjs().tz(
  Intl.DateTimeFormat().resolvedOptions().timeZone
);

export const todayFormatted = timeZoneNow.format('DD-MM-YYYY HH:mm:ss');
export const yesterday = timeZoneNow.subtract(1, 'day').toDate();

export const formatString = (date: string) => {
  const dateFormatted = dayjs(date).format('DD-MM-YYYY HH:mm:ss');
  return dateFormatted;
};

export const formatStringToDate = (stringDate: string) => {
  return dayjs(stringDate).toDate();
};

export const formatDate = (date: Date | undefined) => {
  const timeZone = 'Europe/Berlin';
  const utcDate = dayjs(date).utc();
  return utcDate.tz(timeZone).format('DD-MM-YYYY HH:mm:ss');
};

export const parseStringToDate = (dateString: string) => {
  let parsedDate = new Date();

  if (dateString !== undefined && dateString !== '') {
    const [datePart, timePart] = dateString.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart
      ? timePart.split(':').map(Number)
      : [0, 0, 0];

    parsedDate = new Date(year, month - 1, day, hours, minutes, seconds);
  }

  return parsedDate;
};

export default dayjs;
