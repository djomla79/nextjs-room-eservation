'use client';

import RoomDynamicList from './RoomDynamicList';
import { USER_ROOM_COLUMNS } from '@/lib/constants';

type RoomListProps = {
  data: any[];
};

const RoomList = ({ data }: RoomListProps) => {
  return (
    <div>
      <RoomDynamicList
        data={data}
        columns={USER_ROOM_COLUMNS}
        url='/rooms'
        isAdmin={false}
      />
    </div>
  );
};

export default RoomList;
