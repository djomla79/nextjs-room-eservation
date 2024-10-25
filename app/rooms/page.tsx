import { BASE_URL } from '@/lib/constants';
import RoomList from '@/components/room/RoomList';

export const metadata = {
  title: 'Rooms Page',
};

const getAllRooms = async () => {
  const result = await fetch(`${BASE_URL}/api/rooms`, {
    cache: 'no-store',
  });
  return await result.json();
};

const RoomsPage = async () => {
  const data = await getAllRooms();
  return (
    <div className='flex flex-col'>
      <div className='p-3 ml-3'>Rooms</div>
      <RoomList data={data} />
    </div>
  );
};

export default RoomsPage;
