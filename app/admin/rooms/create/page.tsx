import CreateRoom from '@/components/admin/CreateRoom';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Create Room Page',
};

const CreateRoomPage = async () => {
  return (
    <div className='grid'>
      <CreateRoom />
    </div>
  );
};

export default CreateRoomPage;
