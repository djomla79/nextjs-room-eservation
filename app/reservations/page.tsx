import { BASE_URL } from '@/lib/constants';
import ReservationList from '@/components/reservation/ReservationList';

export const metadata = {
  title: 'Reservation Page',
};

const getAllReservations = async () => {
  const result = await fetch(`${BASE_URL}/api/reservations`, {
    cache: 'no-store',
  });
  return await result.json();
};

const ReservationPage = async () => {
  const data = await getAllReservations();
  return (
    <div className='flex flex-col'>
      <div className='p-3 ml-3'>Reservations</div>
      <ReservationList data={data} />
    </div>
  );
};

export default ReservationPage;
