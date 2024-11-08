import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useGetAllCountriesQuery } from '@types'
import React from 'react'

type CountryDropdownProps = {
  onSelectCountry: (country: string) => void
  selectedCountry: string
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onSelectCountry, selectedCountry }) => {
  const { data, loading, error } = useGetAllCountriesQuery()
  const [currentCountry, setCurrentCountry] = React.useState(selectedCountry || 'World')

  const handleSelect = (country: string) => {
    setCurrentCountry(country)
    onSelectCountry(country)
  }

  React.useEffect(() => {
    setCurrentCountry(selectedCountry)
  }, [selectedCountry])

  const countries: string[] = data ? ['World', ...data.getAllCountries.filter((c: string) => c !== 'World').sort()] : []

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1">
          {currentCountry} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 space-y-1 shadow-lg max-h-60 overflow-y-auto">
        {loading ? (
          <Skeleton className="h-10 w-full rounded-lg" />
        ) : error ? (
          <Alert className=" w-full border-none" role="alert">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Not able to fetch data 🤕</AlertDescription>
          </Alert>
        ) : (
          countries.map((country) => (
            <DropdownMenuItem
              key={country}
              onSelect={() => handleSelect(country)}
              className={`cursor-pointer p-2 hover:bg-accent-1 hover:text-white ${
                currentCountry === country ? 'bg-accent-1 text-white' : ''
              }`}
            >
              {country}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CountryDropdown
