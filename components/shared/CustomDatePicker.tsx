'use client';

import DatePicker from 'react-datepicker';
import { useState, useEffect, useCallback } from 'react';
import { CalendarDaysIcon } from '@heroicons/react/20/solid';
import {
  getFirstAvailableDate,
  isDatesExcluded,
} from '@/lib/utils/clientHelperFunction';

import 'react-datepicker/dist/react-datepicker.css';

type CustomDatePickerProps = {
  startDefault: Date | undefined;
  endDefault: Date | undefined;
  dateFormat: string;
  excludedDates: { start: Date; end: Date }[];
  onChangeHandler: (start: Date, end: Date) => void;
};

const CustomDatePicker = ({
  startDefault,
  endDefault,
  dateFormat,
  excludedDates,
  onChangeHandler,
}: CustomDatePickerProps) => {
  const [startDate, setStartDate] = useState(
    startDefault ? startDefault : new Date()
  );
  const [endDate, setEndDate] = useState(endDefault ? endDefault : new Date());
  const [selected, setSelected] = useState(startDate);

  const isExcluded = useCallback(
    (startDate: Date) => {
      return isDatesExcluded(startDate, excludedDates);
    },
    [excludedDates]
  );

  const findFirstAvailableDate = useCallback(
    (startDate: Date) => {
      return getFirstAvailableDate(startDate, isExcluded);
    },
    [isExcluded]
  );

  // functionality for setting first available date to selected date
  // in case when reserved/disabled dates are already present
  useEffect(() => {
    if (startDate && isExcluded(startDate)) {
      const firstAvailableDate = findFirstAvailableDate(startDate);
      setSelected(firstAvailableDate);
    }
  }, [startDate, isExcluded, findFirstAvailableDate]);

  const onChange = (dates: [Date, Date]) => {
    const [start, end] = dates;

    setStartDate(start);
    setEndDate(end);
    setSelected(start);

    if (start && end) {
      onChangeHandler(start, end);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <DatePicker
        className='ml-1 w-full rounded-xl bg-white border-default border-medium outline-none'
        popperClassName='customPopper'
        selected={selected}
        onChange={onChange}
        isClearable
        showIcon
        selectsRange
        inline
        startDate={startDate}
        endDate={endDate}
        excludeDateIntervals={excludedDates}
        minDate={new Date()}
        calendarIconClassname='ml-1 mt-1'
        icon={<CalendarDaysIcon className='w-5' />}
        dateFormat={dateFormat}
        placeholderText='Select Date'
        popperPlacement='bottom-start'
        showTimeSelect
        timeFormat='HH:mm'
        timeIntervals={15}
        timeCaption='time'
      />
    </div>
  );
};

export default CustomDatePicker;
