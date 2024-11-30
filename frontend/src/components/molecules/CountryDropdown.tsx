import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useGetAllCountriesQuery } from '@Types/__generated__/resolvers-types'
import { Check } from 'lucide-react'
import React, { useState } from 'react'

type CountryDropdownProps = {
  onSelectCountries: (countries: string[]) => void
  selectedCountries: string[]
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onSelectCountries, selectedCountries }) => {
  const { data, loading, error } = useGetAllCountriesQuery()
  const [open, setOpen] = useState(false)
  const countries = data ? data.getAllCountries : []

  const handleToggleCountry = (country: string) => {
    const updatedCountries = selectedCountries.includes(country)
      ? selectedCountries.filter((c) => c !== country)
      : [...selectedCountries, country]

    onSelectCountries(updatedCountries)
  }

  const handleResetCountries = () => {
    onSelectCountries([]) // Reset the selected countries
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1`}
        >
          {selectedCountries.length > 0 ? `Selected (${selectedCountries.length})` : 'Select countries'}
          <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList>
            {loading && <CommandEmpty>Loading...</CommandEmpty>}
            {error && <CommandEmpty>Error loading countries.</CommandEmpty>}
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country}
                  onSelect={() => handleToggleCountry(country)}
                  className={cn(selectedCountries.includes(country) ? 'bg-accent' : 'hover:bg-accent-1 hover:text-white')}
                >
                  {country}
                  {selectedCountries.includes(country) && <Check className="ml-auto opacity-100" />}
                </CommandItem>
              ))}
              <CommandItem onSelect={handleResetCountries} className="text-red-500">
                Reset Filter
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default CountryDropdown
