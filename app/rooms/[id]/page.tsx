import { findRoomById } from '@/server/actions/roomActions';
import RoomDetails from '@/components/room/RoomDetails';

type RoomDetailsPageProps = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({
  params: { id },
}: RoomDetailsPageProps) => {
  const room = await findRoomById(id);

  return {
    title: room.name,
  };
};

const RoomDetailsPage = async ({ params: { id } }: RoomDetailsPageProps) => {
  const room = await findRoomById(id);

  return (
    <div className='flex justify-center items-center flex-col'>
      <RoomDetails room={room} />
    </div>
  );
};

export default RoomDetailsPage;
