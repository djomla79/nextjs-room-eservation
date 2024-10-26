import { getRoomById } from '@/server/actions/adminActions';
import RoomDetails from '@/components/room/RoomDetails';

type RoomDetailsPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    isEdit: boolean;
  };
};

export const generateMetadata = async ({
  params: { id },
}: RoomDetailsPageProps) => {
  const room = await getRoomById(id);

  return {
    title: room.name,
  };
};

const RoomDetailsPage = async ({
  params: { id },
  searchParams: { isEdit },
}: RoomDetailsPageProps) => {
  const room = await getRoomById(id);

  return (
    <div className='flex justify-center items-center flex-col'>
      <RoomDetails room={room} isEdit={isEdit} isAdmin />
    </div>
  );
};

export default RoomDetailsPage;
