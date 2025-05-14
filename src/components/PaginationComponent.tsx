'use client';

import { Pagination } from '@heroui/react';
import React, { useEffect } from 'react';
import usePaginationStore from '@/hooks/usePaginationStore';

export default function PaginationComponent({
  totalCount,
}: {
  totalCount: number;
}) {
  const setPage = usePaginationStore((state) => state.setPage);
  const setPageSize = usePaginationStore((state) => state.setPageSize);
  const setPagination = usePaginationStore((state) => state.setPagination);
  const pagination = usePaginationStore((state) => state.pagination);

  const { pageNumber, pageSize, totalPages } = pagination;

  useEffect(() => {
    setPagination(totalCount);
  }, [setPagination, totalCount]);

  const start = (pageNumber - 1) * pageSize + 1;
  const end = Math.min(pageNumber * pageSize, totalCount);
  const resultText = `Showing ${start}-${end} of ${totalCount} results`;

  return (
    <div className='border-t-2 w-full mt-5'>
      <div className='flex  flex-col gap-4 sm:gap-0  sm:flex-row justify-between items-center py-5'>
        <div>{resultText}</div>
        <Pagination
          total={totalPages}
          color='default'
          page={pageNumber}
          variant='bordered'
          onChange={setPage}
        />
        <div className='flex flex-row gap-1 items-center'>
          Page size:
          {[3, 6, 12].map((size) => (
            <div
              key={size}
              onClick={() => setPageSize(size)}
              className={'page-size-box'}
            >
              {size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
