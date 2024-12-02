import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react';

const sortingOptions = ['Best Rated', 'Worst Rated', 'A - Z', 'Z - A'];

type SortingDropdownProps = {
  selectedSorting: string; 
  onSelectedSorting: (sorting: string) => void; 
};

const SortingDropdown: React.FC<SortingDropdownProps> = ({ selectedSorting, onSelectedSorting }) => {
  const handleSelect = (sorting: string) => {
    onSelectedSorting(sorting); 
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1">
          {selectedSorting} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 space-y-1 shadow-lg">
        {sortingOptions.map((sorting) => (
          <DropdownMenuItem
            key={sorting}
            onSelect={() => handleSelect(sorting)}
            className={`cursor-pointer p-2 hover:bg-accent-1 hover:text-white ${
              selectedSorting === sorting ? 'bg-accent-1 text-white' : ''
            }`}
          >
            {sorting}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortingDropdown;
