import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const countries = ['World', 'Denmark', 'Italy', 'Norway', 'United Arab Emirates', 'United States']

type CountryDropdownProps = {
  onSelectCountry: (country: string) => void
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = React.useState('World')

  const handleSelect = (country: string) => {
    setSelectedCountry(country)
    onSelectCountry(country)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1">
          {selectedCountry} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 space-y-1 shadow-lg">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country}
            onSelect={() => handleSelect(country)}
            className={`cursor-pointer p-2 hover:bg-accent-1 hover:text-white ${
              selectedCountry === country ? 'bg-accent-1 text-white' : ''
            }`}
          >
            {country}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CountryDropdown
