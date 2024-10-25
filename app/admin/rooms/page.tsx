import { BASE_URL } from '@/lib/constants';
import AdminRoomList from '@/components/admin/AdminRoomList';

export const metadata = {
  title: 'Admin Room Page',
};

const getAllRooms = async () => {
  const result = await fetch(`${BASE_URL}/api/admin/rooms`, {
    cache: 'no-store',
  });
  return await result.json();
};

const deleteRoom = async (id: string) => {
  'use server';
  await fetch(`${BASE_URL}/api/admin/rooms`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    cache: 'no-store',
  });
};

const AdminRoomPage = async () => {
  const data = await getAllRooms();
  return (
    <div className='flex flex-col'>
      <div className='p-3 ml-3'>Admin Rooms</div>
      <AdminRoomList data={data} deleteRoom={deleteRoom} />
    </div>
  );
};

export default AdminRoomPage;
