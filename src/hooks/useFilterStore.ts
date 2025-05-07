import { UserFilters } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type FilterState = {
  filters: UserFilters;
  setFilters: <K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K]
  ) => void;
  resetFilters: () => void;
};

const defaultFilters = {
  ageRange: [18, 100],
  gender: ['male', 'female'],
  orderBy: 'updated',
  withPhoto: true,
};

const useFilterStore = create<FilterState>()(
  devtools((set) => ({
    filters: defaultFilters,
    setFilters: (filterName, value) =>
      set((state) => {
        return {
          filters: { ...state.filters, [filterName]: value },
        };
      }),
    resetFilters: () => set({ filters: defaultFilters }),
  }))
);

export default useFilterStore;
