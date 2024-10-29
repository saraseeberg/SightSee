import { Icon } from '@iconify/react/dist/iconify.js'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

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
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSearchQuery('') // Clear the search query to close the dropdown
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md">
      <form className="flex justify-end mr-5">
        <div className="relative w-full">
          <Icon
            icon="ic:baseline-search"
            className="absolute text-muted-foreground left-1.5 top-2 md:left-3 md:top-3 h-4 w-4 md:h-5 md:w-5"
          />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleChange}
            className="flex h-8 md:h-10 w-full pl-8 md:pl-10 pr-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </form>
      {searchQuery && (
        <div
          ref={dropdownRef}
          className="absolute left-0 w-full md:w-64 bg-background shadow-lg rounded-md max-h-80 overflow-scroll z-10 mt-1"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <Link to="/Review" key={index}>
                <div className="px-4 py-2 cursor-pointer bg-background hover:bg-accent hover:text-white">
                  <p className="font-semibold text-sm md:text-base">{result.title}</p>
                  <p className="text-xs md:text-sm">
                    {result.country} {result.region && `, ${result.region}`}
                  </p>
                  <p className="text-xs md:text-sm">{result.description}</p>
                  <p className="text-xs italic">{result.categories.join(', ')}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-2 text-sm md:text-base">No results found 🤕</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
