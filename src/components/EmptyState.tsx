'use client';

import useFilterStore from '@/hooks/useFilterStore';
import { Card, CardBody, CardHeader, Button } from '@heroui/react';
import { FiRefreshCw } from 'react-icons/fi';

export default function EmptyState() {
  const { resetFilters } = useFilterStore((state) => state);

  return (
    <div className='flex justify-center items-center  mt-12'>
      <Card className='max-w-md w-full mx-4 shadow-lg'>
        <CardHeader className='flex flex-col items-center gap-3 pb-6 pt-8 px-8'>
          <div className='rounded-full bg-default/10 p-4'>
            <FiRefreshCw size={32} className='text-default-500' />
          </div>
          <h2 className='text-2xl font-bold text-default-700'>
            No Results Found
          </h2>
        </CardHeader>

        <CardBody className='text-center px-8 pb-8'>
          <p className='text-default-500 mb-6'>
            We couldn&apos;t find any matches with your current filters. Try
            adjusting your search criteria.
          </p>
          <Button
            color='primary'
            variant='solid'
            size='lg'
            startContent={<FiRefreshCw />}
            className='w-full'
            onClick={resetFilters}
          >
            Reset All Filters
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
