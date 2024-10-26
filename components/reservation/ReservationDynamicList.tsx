'use client';

import { useCallback } from 'react';
import { Link } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
} from '@nextui-org/react';
import {
  UserCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/20/solid';
import usePagination from '@/lib/hooks/usePagination';
import { getCellValue } from '@/lib/utils/clientHelperFunction';
import { COLUMN_NUMBERS } from '@/lib/constants';

type ReservationDynamicListProps = {
  data: any[];
  columns: { name: string; uid: string }[];
};

const ReservationDynamicList = ({
  data,
  columns,
}: ReservationDynamicListProps) => {
  const { page, pages, setPage, items } = usePagination({ data });
  const router = useRouter();

  const renderCell = useCallback((item: any, columnKey: string | number) => {
    const cellValue = getCellValue(item, columnKey);
    const caseValue = columnKey === 'actions' ? '' : columnKey;

    switch (columnKey) {
      case `${caseValue}`:
        return (
          <div className='flex flex-col'>
            <p
              className={`text-bold text-sm ${
                typeof cellValue === 'number' ? 'text-center' : ''
              }`}
            >
              {cellValue}
            </p>
          </div>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='See user details'>
              <Link
                href={`/user/${item.user}`}
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
              >
                <UserCircleIcon className='w-5' />
              </Link>
            </Tooltip>
            <Tooltip content='See room details'>
              <Link
                href={`/room/${item.room}`}
                className='text-lg text-default-400 cursor-pointer active:opacity-50'
              >
                <InformationCircleIcon className='w-5' />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <Table
        aria-label='Table'
        bottomContent={
          <div className='flex w-full justify-center'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='default'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {({ uid, name }) => (
            <TableColumn
              className={`${
                COLUMN_NUMBERS.includes(name) ? 'text-center' : ''
              }`}
              key={uid}
              align={uid === 'actions' ? 'center' : 'start'}
            >
              {name}
            </TableColumn>
          )}
        </TableHeader>
        {items.length > 0 ? (
          <TableBody items={items}>
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        ) : (
          <TableBody emptyContent={`No reservations at the moment.`}>
            {[]}
          </TableBody>
        )}
      </Table>
    </>
  );
};

export default ReservationDynamicList;
