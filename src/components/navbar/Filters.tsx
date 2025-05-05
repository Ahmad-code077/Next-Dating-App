import React from 'react';
import {
  Button,
  Select,
  SelectItem,
  Slider,
  Spinner,
  Switch,
} from '@heroui/react';
import { useFilters } from '@/hooks/useFilters';

export default function Filters() {
  const {
    orderByList,
    genderList,
    selectAge,
    selectGender,
    selectOrder,
    selectWithPhoto,
    filters,
    totalCount,
    isPending,
  } = useFilters();

  const { gender, ageRange, orderBy } = filters;

  return (
    <div className='shadow-md py-2 px-4'>
      <div className='flex flex-col gap-4 md:flex-row md:justify-around md:items-center'>
        {/* Results Counter */}
        <div className='flex gap-2 items-center justify-center md:justify-start'>
          <div className=' font-semibold text-xl'>
            Results:{' '}
            <span className='text-primary'>
              {isPending ? <Spinner size='sm' color='default' /> : totalCount}
            </span>{' '}
          </div>
        </div>

        {/* Gender Filter */}
        <div className='flex gap-2 items-center justify-center md:justify-start'>
          <div>Gender:</div>
          {genderList.map(({ icon: Icon, value }) => (
            <Button
              key={value}
              size='sm'
              isIconOnly
              color='default'
              variant={gender.includes(value) ? 'solid' : 'light'}
              onClick={() => selectGender(value)}
            >
              <Icon size={24} />
            </Button>
          ))}
        </div>

        {/* Age Range Slider */}
        <div className='flex flex-row items-center gap-2 w-full md:w-1/4'>
          <Slider
            label='Age range'
            size='sm'
            minValue={18}
            maxValue={100}
            defaultValue={ageRange}
            aria-label='Age range slider'
            color='foreground'
            onChangeEnd={(value) => selectAge(value as number[])}
          />
        </div>

        {/* Photo Switch */}
        <div className='flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0'>
          <p className='text-sm'>With photo</p>
          <Switch
            color='default'
            defaultSelected
            size='sm'
            onChange={(checked) => selectWithPhoto(checked)}
          />
        </div>

        {/* Order By Select */}
        <div className='w-full md:w-1/4'>
          <Select
            size='sm'
            fullWidth
            label='Order by'
            variant='bordered'
            color='default'
            aria-label='Order by selector'
            selectedKeys={new Set([orderBy])}
            onSelectionChange={selectOrder}
          >
            {orderByList.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
}
