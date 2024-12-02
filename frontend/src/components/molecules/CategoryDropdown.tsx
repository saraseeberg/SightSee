import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

type CategoryDropdownProps = {
  onSelectCategories: (categories: string[]) => void
  selectedCategories: string[]
}

const categories = ['Activities', 'Entertainment', 'Nightlife', 'Restaurants', 'Shopping', 'Sights']

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onSelectCategories, selectedCategories }) => {
  const [open, setOpen] = useState(false)

  const handleToggleCategory = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    onSelectCategories(updatedCategories)
  }

  const handleResetCategories = () => {
    onSelectCategories([]) // Reset selected categories
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1`}
        >
          {selectedCategories.length > 0 ? `Selected (${selectedCategories.length})` : 'Select categories'}
          <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." />
          <CommandList>
            {categories.length === 0 && <CommandEmpty>No categories found.</CommandEmpty>}
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category}
                  onSelect={() => handleToggleCategory(category)}
                  className={cn(
                    selectedCategories.includes(category) ? 'bg-accent' : 'hover:bg-accent-1 hover:text-white',
                  )}
                >
                  {category}
                  {selectedCategories.includes(category) && <Check className="ml-auto opacity-100" />}
                </CommandItem>
              ))}
              <CommandItem onSelect={handleResetCategories} className="text-red-500">
                Reset Filter
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CategoryDropdown
