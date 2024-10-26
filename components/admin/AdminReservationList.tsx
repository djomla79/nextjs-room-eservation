'use client';

import ReservationDynamicList from '../reservation/ReservationDynamicList';
import { ADMIN_RESERVATION_COLUMNS } from '@/lib/constants';

type AdminReservationListProps = {
  data: any[];
};

const AdminReservationList = ({ data }: AdminReservationListProps) => {
  return (
    <div>
      <ReservationDynamicList data={data} columns={ADMIN_RESERVATION_COLUMNS} />
    </div>
  );
};

export default AdminReservationList;
