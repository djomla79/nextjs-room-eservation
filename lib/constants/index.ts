export const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';

export const ROOM_CATEGORIES = [
  'Standard',
  'Deluxe',
  'Suite',
  'Executive Suite',
];

export const ROOM_STATUS = ['Available', 'Occupied', 'Reserved'];

export const AMENITIES = ['isInternet', 'isBreakfast', 'isPets'];

export const ADMIN_ROOM_COLUMNS = [
  { name: 'NAME', uid: 'name' },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'STATUS', uid: 'status' },
  { name: 'ADDRESS', uid: 'address' },
  { name: 'PRICE', uid: 'price' },
  { name: 'CATEGORY', uid: 'category' },
  { name: 'CAPACITY', uid: 'capacity' },
  { name: 'BED CAPACITY', uid: 'bedCapacity' },
  { name: 'OCCUPANCY', uid: 'occupancy' },
  { name: 'CREATION DATE', uid: 'createdAt' },
  { name: 'RATING', uid: 'rating' },
  { name: 'INTERNET', uid: 'isInternet' },
  { name: 'BREAKFAST', uid: 'isBreakfast' },
  { name: 'PETS', uid: 'isPets' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const USER_ROOM_COLUMNS = [
  { name: 'NAME', uid: 'name' },
  { name: 'DESCRIPTION', uid: 'description' },
  { name: 'PRICE', uid: 'price' },
  { name: 'STATUS', uid: 'status' },
  { name: 'CATEGORY', uid: 'category' },
  { name: 'CAPACITY', uid: 'capacity' },
  { name: 'BED CAPACITY', uid: 'bedCapacity' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const ADMIN_RESERVATION_COLUMNS = [
  { name: 'CHECK IN', uid: 'checkIn' },
  { name: 'CHECK OUT', uid: 'checkOut' },
  { name: 'STAY DURATION', uid: 'stayDuration' },
  { name: 'BILL', uid: 'bill' },
  { name: 'BILL PAID', uid: 'isBillPaid' },
  { name: 'BILL PAIMENT DATE', uid: 'billPaidAt' },
  { name: 'CREATION DATE', uid: 'createdAt' },
  { name: 'ACTIONS', uid: 'actions' },
];

export const RESERVATION_COLUMNS = [
  { label: 'CHECK IN', key: 'checkIn' },
  { label: 'CHECK OUT', key: 'checkOut' },
  { label: 'STAY DURATION', key: 'stayDuration' },
  { label: 'BILL', key: 'bill' },
  { label: 'BILL PAID', key: 'isBillPaid' },
  { label: 'BILL PAIMENT DATE', key: 'billPaidAt' },
  { label: 'CREATION DATE', key: 'createdAt' },
];

export const COLUMN_NUMBERS = [
  'PRICE',
  'CAPACITY',
  'BED CAPACITY',
  'OCCUPANCY',
  'RATING',
  'STAY DURATION',
  'BILL',
];
