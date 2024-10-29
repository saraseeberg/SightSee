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
        <div
          ref={dropdownRef}
          className="absolute left-0 w-56 bg-background shadow-lg rounded-md max-h-80 overflow-scroll z-10 mt-0.5"
        >
          {filteredResults.length > 0 ? (
            filteredResults.map((result, index) => (
              <Link to="/Review" key={index}>
                <div className="px-4 py-2 cursor-pointer bg-background hover:bg-accent-1 hover:text-white">
                  <p className="font-semibold">{result.title}</p>
                  <p className="text-sm">
                    {result.country} {result.region && `, ${result.region}`}
                  </p>
                  <p className="text-xs">{result.description}</p>
                  <p className="text-xs italic">{result.categories.join(', ')}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-4 bg-background text-sm">No results found 🤕</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
