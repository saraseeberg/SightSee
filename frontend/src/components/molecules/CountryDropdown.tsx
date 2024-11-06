import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert' // Assuming shadcn has an Alert component
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton' // Assuming shadcn has a Skeleton component
import { GET_ALL_COUNTRIES } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

type CountryDropdownProps = {
  onSelectCountry: (country: string) => void
  selectedCountry: string
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onSelectCountry, selectedCountry }) => {
  const { data, loading, error } = useQuery(GET_ALL_COUNTRIES)
  const [currentCountry, setCurrentCountry] = React.useState(selectedCountry || 'World')

  const handleSelect = (country: string) => {
    setCurrentCountry(country)
    onSelectCountry(country)
  }

  React.useEffect(() => {
    setCurrentCountry(selectedCountry)
  }, [selectedCountry])

  // Sort countries alphabetically, keeping "World" on top
  const countries: string[] = data ? ['World', ...data.getAllCountries.filter((c) => c !== 'World').sort()] : []

  if (loading) {
    return <Skeleton className="h-10 w-full rounded-lg" />
  }

  if (error) {
    return (
      <Alert className="bg-red-100 border-red-400 " role="alert">
        <Icon icon="akar-icons:alert-circle" className="w-4 h-4 mr-3" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Not able to fetch data 🤕 </AlertDescription>
      </Alert>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background hover:bg-accent-1 hover:text-white hover:border-accent-1">
          {currentCountry} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 space-y-1 shadow-lg max-h-60 overflow-y-auto">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country}
            onSelect={() => handleSelect(country)}
            className={`cursor-pointer p-2 hover:bg-accent-1 hover:text-white ${
              currentCountry === country ? 'bg-accent-1 text-white' : ''
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
