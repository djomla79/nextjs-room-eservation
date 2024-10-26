'use client';

import CustomList from '../shared/CustomList';
import { RESERVATION_COLUMNS } from '@/lib/constants';

type ReservationListProps = {
  data: any[];
};

const ReservationList = ({ data }: ReservationListProps) => {
  return (
    <div>
      <CustomList data={data} columns={RESERVATION_COLUMNS} />
    </div>
  );
};

export default ReservationList;
