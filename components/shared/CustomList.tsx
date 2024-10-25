'use client';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from '@nextui-org/react';

type CustomListProps = {
  data: any[];
  columns: { key: string; label: string }[];
};

const CustomList = ({ data, columns }: CustomListProps) => {
  return (
    <Table aria-label='Table'>
      <TableHeader columns={columns}>
        {({ key, label }) => <TableColumn key={key}>{label}</TableColumn>}
      </TableHeader>
      {data.length > 0 ? (
        <TableBody items={data}>
          {(item) => (
            <TableRow key={`${item.checkIn}${item.checkOut}`}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      ) : (
        <TableBody emptyContent={'No items at the moment.'}>{[]}</TableBody>
      )}
    </Table>
  );
};

export default CustomList;
