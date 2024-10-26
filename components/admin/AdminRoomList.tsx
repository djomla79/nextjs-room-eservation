'use client';

import Link from 'next/link';
import { Button } from '@nextui-org/react';
import { UserPlusIcon } from '@heroicons/react/20/solid';
import RoomDynamicList from '../room/RoomDynamicList';
import { ADMIN_ROOM_COLUMNS } from '@/lib/constants';

type AdminRoomListProps = {
  data: any[];
  deleteRoom: (roomId: string) => void;
};

const AdminRoomList = ({ data, deleteRoom }: AdminRoomListProps) => {
  return (
    <div>
      <RoomDynamicList
        data={data}
        columns={ADMIN_ROOM_COLUMNS}
        url='/admin/rooms'
        deleteItem={deleteRoom}
        isAdmin
      />
      <div className='flex justify-start flex-row'>
        <Button as={Link} href='/admin/rooms/create'>
          Add Room
        </Button>
        <UserPlusIcon className='w-5 ml-2' />
      </div>
    </div>
  );
};

export default AdminRoomList;
