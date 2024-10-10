import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const categories = ['All', 'Activities', 'Entertainment', 'Nightlife', 'Restaurants', 'Shopping', 'Sights']

type CategoryDropdownProps = {
  onSelectCategory: (category: string) => void
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({ onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('All')

  const handleSelect = (category: string) => {
    setSelectedCategory(category)
    onSelectCategory(category)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1">
          {selectedCategory} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 space-y-1 shadow-lg">
        {categories.map((category) => (
          <DropdownMenuItem
            key={category}
            onSelect={() => handleSelect(category)}
            className={`cursor-pointer p-2 hover:bg-accent-1 hover:text-white ${
              selectedCategory === category ? 'bg-accent-1 text-white' : ''
            }`}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CategoryDropdown
