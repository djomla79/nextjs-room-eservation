'use client';

import { useState, useMemo } from 'react';

type Props = {
  data: any[];
};

const usePagination = ({ data }: Props) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return { page, pages, setPage, items };
};

export default usePagination;
