import { Spinner } from '@heroui/react';
import React from 'react';
export default function Loading() {
  return (
    <div className='h-full w-full flex justify-center items-center vertical-center place-content-center'>
      <Spinner label='Loading...' color='default' />
    </div>
  );
}
