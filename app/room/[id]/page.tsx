import { BASE_URL } from '@/lib/constants';
import RoomDetails from '@/components/room/RoomDetails';

type RoomDetailsPageProps = {
  params: {
    id: string;
  };
};

const fetchRoomById = async (id: string) => {
  const result = await fetch(`${BASE_URL}/api/room/${id}`, {
    cache: 'no-store',
  });
  return await result.json();
};

export const generateMetadata = async ({
  params: { id },
}: RoomDetailsPageProps) => {
  const room = await fetchRoomById(id);

  return {
    title: room.name,
  };
};

const RoomDetailsPage = async ({ params: { id } }: RoomDetailsPageProps) => {
  const room = await fetchRoomById(id);

  return (
    <div className='flex justify-center items-center flex-col'>
      <RoomDetails room={room} isAdmin />
    </div>
  );
};

export default RoomDetailsPage;
