'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

const useDayjs = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [userTimeZone, setUserTimeZone] = useState('');

  useEffect(() => {
    const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = dayjs().tz(currentTimeZone);
    const formattedDate = now.format('DD-MM-YYYY hh:mm:ss');

    setUserTimeZone(currentTimeZone);
    setCurrentDate(formattedDate);
  }, []);

  return { currentDate, userTimeZone };
};

export default useDayjs;
