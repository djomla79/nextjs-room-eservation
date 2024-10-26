'use client';

import { useCallback, useState } from 'react';
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
  useDisclosure,
} from '@nextui-org/react';
import { toast } from 'react-toastify';
import {
  EyeIcon,
  TrashIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid';
import ReservationModal from '../reservation/ReservationModal';
import usePagination from '@/lib/hooks/usePagination';
import { getCellValue } from '@/lib/utils/clientHelperFunction';
import { COLUMN_NUMBERS } from '@/lib/constants';

type RoomDynamicListProps = {
  data: any[];
  columns: { name: string; uid: string }[];
  url: string;
  isAdmin: boolean;
  deleteItem?: (itemId: string) => void;
};

const RoomDynamicList = ({
  data,
  columns,
  url,
  deleteItem,
  isAdmin,
}: RoomDynamicListProps) => {
  const [itemId, setItemId] = useState('');
  const [itemPrice, setItemPrice] = useState(0);
  const { page, pages, setPage, items } = usePagination({ data });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const deleteItemHandler = useCallback(
    (itemId: string) => {
      deleteItem && deleteItem(itemId);
      toast.success('Item successfully deleted.');
      router.refresh();
    },
    [deleteItem, router]
  );

  const onMakeReservationHandler = useCallback(
    (id: string, price: number) => {
      setItemId(id);
      setItemPrice(price);
      onOpen && onOpen();
    },
    [onOpen]
  );

  const renderCell = useCallback(
    (item: any, columnKey: string | number) => {
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
              <Tooltip content='Details'>
                <Link
                  href={`${url}/${item._id}`}
                  className='text-lg text-default-400 cursor-pointer active:opacity-50'
                >
                  <EyeIcon className='w-5' />
                </Link>
              </Tooltip>
              {!isAdmin && (
                <Tooltip content='Make Reservation'>
                  <Link
                    onClick={() =>
                      onMakeReservationHandler(item._id, item.price)
                    }
                    className='text-lg text-default-400 cursor-pointer active:opacity-50'
                  >
                    <PlusCircleIcon className='w-5' />
                  </Link>
                </Tooltip>
              )}
              {isAdmin && (
                <>
                  <Tooltip content='Edit'>
                    <Link
                      href={`${url}/${item._id}?isEdit=true`}
                      className='text-lg text-default-400 cursor-pointer active:opacity-50'
                    >
                      <PencilSquareIcon className='w-5' />
                    </Link>
                  </Tooltip>
                  <Tooltip color='danger' content='Delete'>
                    <span
                      onClick={() => deleteItemHandler(item._id)}
                      className='text-lg text-danger cursor-pointer active:opacity-50'
                    >
                      <TrashIcon className='w-5' />
                    </span>
                  </Tooltip>
                </>
              )}
            </div>
          );
        default:
          return cellValue;
      }
    },
    [url, deleteItemHandler, isAdmin, onMakeReservationHandler]
  );

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
          <TableBody emptyContent={`No rooms at the moment.`}>{[]}</TableBody>
        )}
      </Table>
      {!isAdmin && (
        <ReservationModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          roomId={itemId}
          roomPrice={itemPrice}
        />
      )}
    </>
  );
};

export default RoomDynamicList;
