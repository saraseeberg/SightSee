import { useLazyQuery } from '@apollo/client'
import { Icon } from '@iconify/react/dist/iconify.js'
import { Destination } from '@types'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_DESTINATIONS_BY_TEXT_SIMILARITY } from '../graphql/queries'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Skeleton } from './ui/skeleton'

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const [getDestinationsByTextSimilarity, { data, loading, error }] = useLazyQuery<{
    getDestinationsByTextSimilarity: Destination[]
  }>(GET_DESTINATIONS_BY_TEXT_SIMILARITY)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (value) {
        getDestinationsByTextSimilarity({ variables: { searchText: value } })
      }
    }, 400)
  }

  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSearchQuery('')
      }
    }

    document.addEventListener('pointerdown', handleClickOutside, { passive: true })

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside)
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
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
          className="absolute left-0 w-full md:w-64 bg-background shadow-lg rounded-md max-h-[348px] overflow-y-scroll z-10 mt-1"
        >
          {loading && !data && (
            <div className="flex flex-col gap-2">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="w-full left-0 h-12" />
              ))}
            </div>
          )}

          {error && !loading && !data && (
            <Alert>
              <Icon icon="ic:round-terminal" className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription> An error occurred. Please try again later.</AlertDescription>
            </Alert>
          )}

          {data?.getDestinationsByTextSimilarity && data.getDestinationsByTextSimilarity.length > 0 ? (
            data.getDestinationsByTextSimilarity.map((result) => (
              <Link to={`/review/${result.id}`} key={result.id}>
                <div className="px-4 py-2 cursor-pointer bg-background hover:bg-accent-1 hover:text-white">
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
            <Alert>
              <Icon icon="ic:round-error-outline" className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription> No results found 🤕 </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
