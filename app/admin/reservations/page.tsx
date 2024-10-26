import { BASE_URL } from '@/lib/constants';
import AdminReservationList from '@/components/admin/AdminReservationList';

export const metadata = {
  title: 'Admin Reservation Page',
};

const getAllReservations = async () => {
  const result = await fetch(`${BASE_URL}/api/admin/reservations`, {
    cache: 'no-store',
  });
  return await result.json();
};

const AdminReservationPage = async () => {
  const data = await getAllReservations();
  return (
    <div className='flex flex-col'>
      <div className='ml-3 p-3'>Reservations</div>
      <AdminReservationList data={data} />
    </div>
  );
};

export default AdminReservationPage;
