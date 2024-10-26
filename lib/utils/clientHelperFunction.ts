'use client';

import dayjs, { yesterday } from './dayjs';
import { AmenitiesType } from '../types/roomTypes';

export const getStrengthColor = (strength: number) => {
  let strengthColor = '';

  if (strength === 0) {
    strengthColor = 'bg-red-500';
  } else if (strength === 1) {
    strengthColor = 'bg-orange-500';
  } else if (strength === 2) {
    strengthColor = 'bg-yellow-500';
  } else if (strength === 3) {
    strengthColor = 'bg-green-500';
  } else {
    strengthColor = 'bg-red-500';
  }
  return strengthColor;
};

export const getAmenities = (data: string[]): Record<string, boolean> => {
  let result: Record<string, boolean> = {
    isInternet: false,
    isBreakfast: false,
    isPets: false,
  };

  data.forEach((item) => {
    if (item === 'isInternet' || item === 'isBreakfast' || item === 'isPets') {
      result[item] = true;
    }
  });

  return result;
};

export const getCellValue = (item: any, columnKey: string | number) => {
  let cellValue = item[columnKey];
  const amenities = item.amenities;

  if (columnKey === 'isInternet') {
    cellValue = amenities.isInternet ? 'Yes' : 'No';
  } else if (columnKey === 'isBreakfast') {
    cellValue = amenities.isBreakfast ? 'Yes' : 'No';
  } else if (columnKey === 'isPets') {
    cellValue = amenities.isPets ? 'Yes' : 'No';
  }
  return cellValue;
};

export const filterAmenities = (amenityObject: AmenitiesType): string[] => {
  if (amenityObject === undefined) return [];

  return Object.entries(amenityObject)
    .filter(([key, value]) => value)
    .map(([key]) => key);
};

export const generateExcludedDates = (dates: Date[]) => {
  let excludedDateIntervals: { start: Date; end: Date }[] = [];

  if (dates.length > 0) {
    const [start, end] = dates;
    excludedDateIntervals = [{ start, end }];
  } else {
    excludedDateIntervals = [
      {
        start: yesterday,
        end: yesterday,
      },
    ];
  }
  return excludedDateIntervals;
};

export const checkIsRoomAvailable = (
  excludedDates: { start: Date; end: Date }[],
  start: Date,
  end: Date
) => {
  return excludedDates.some((interval) => {
    const rangeStart = dayjs(start);
    const rangeEnd = dayjs(end);
    const intervalStart = dayjs(interval.start);
    const intervalEnd = dayjs(interval.end);

    return !(
      rangeStart.isBetween(intervalStart, intervalEnd, 'day', '[]') ||
      rangeEnd.isBetween(intervalStart, intervalEnd, 'day', '[]') ||
      (rangeStart.isBefore(intervalStart) && rangeEnd.isAfter(intervalEnd))
    );
  });
};

export const calculateStayDuration = (startDate: Date, endDate: Date) => {
  const start = dayjs(startDate, 'DD-MM-YYYY HH:mm:ss');
  const end = dayjs(endDate, 'DD-MM-YYYY HH:mm:ss');
  const stayDuration = end.diff(start, 'day');
  return stayDuration;
};

export const isDatesExcluded = (
  startDate: Date,
  dates: { start: Date; end: Date }[]
) => {
  return dates.some((date) =>
    dayjs(startDate).isBetween(dayjs(date.start), dayjs(date.end), 'day', '[]')
  );
};

export const getFirstAvailableDate = (
  startDate: Date,
  isExcluded: (date: Date) => boolean
) => {
  let currentDate = dayjs(startDate);
  while (isExcluded(currentDate.toDate())) {
    currentDate = currentDate.add(1, 'day');
  }
  const firstAvailableDate = currentDate.toDate();
  return firstAvailableDate;
};
