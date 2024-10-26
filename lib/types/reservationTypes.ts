export type ReservationType = {
  checkIn: string;
  checkOut: string;
  stayDuration: number;
  bill: number;
  isBillPaid: boolean;
  billPaidAt: string;
  user: string;
  room: string;
};

export type ReservationInputType = {
  checkIn: string;
  checkOut: string;
  stayDuration: number;
  bill: number;
  billPaidAt: string;
};

export type ReservationDetailsType = {
  checkIn: string;
  checkOut: string;
  stayDuration: number;
  bill: number;
  billPaidAt: string;
};
