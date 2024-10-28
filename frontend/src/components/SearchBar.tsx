import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState } from 'react'

interface Locations {
  title: string
  categories: string[]
  country: string
  description: string
  region?: string
}

interface SearchBarProps {
  data: Locations[]
}

const SearchBar: React.FC<SearchBarProps> = ({ data }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredResults, setFilteredResults] = useState<Locations[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (value) {
      const results = data.filter((item) =>
        Object.values(item).some((field) => field?.toString().toLowerCase().includes(value.toLowerCase())),
      )
      setFilteredResults(results)
    } else {
      setFilteredResults([])
    }
  }

  return (
    <div className="relative">
      <form className="flex justify-end mr-5">
        <div className="relative">
          <Icon icon="ic:baseline-search" className="absolute text-muted-foreground left-2.5 top-2.5 h-4 w-4 m-1" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
            className="flex h-10 pl-8 pr-2 w-full rounded-md border bg-background focus-visible:outline-none"
          />
        </div>
      </form>
      {searchQuery && (
        <div className="absolute  left-0 w-56 bg-background shadow-lg rounded-md max-h-80 overflow-scroll z-10 mt-0.5">
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer bg-background hover:bg-accent-1  hover:text-white hover:border-accent-1"
              >
                <p className="font-semibold">{result.title}</p>
                <p className="text-sm hover:text-white hover:border-accent-1">
                  {result.country} {result.region && `, ${result.region}`}
                </p>
                <p className="text-xs hover:text-white hover:border-accent-1">{result.description}</p>
                <p className='text-xs italic'>{result.categories} </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-sm hover:text-white hover:border-accent-1">No results found 🤕</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
