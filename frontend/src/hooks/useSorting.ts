import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const DEFAULT_SORTING = 'Best Rated'

export const useSorting = () => {
  const [selectedSorting, setSelectedSorting] = useState<string>(DEFAULT_SORTING)
  const [searchParams, setSearchParams] = useSearchParams()

  // Initialize sorting from the URL parameters
  useEffect(() => {
    const sortingParam = searchParams.get('sorting')
    if (sortingParam) {
      setSelectedSorting(sortingParam)
    }
  }, [searchParams])

  // Update URL parameters when the sorting changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (selectedSorting && selectedSorting !== DEFAULT_SORTING) {
      params.set('sorting', selectedSorting)
    } else {
      params.delete('sorting')
    }
    setSearchParams(params)
  }, [selectedSorting, searchParams, setSearchParams])

  const handleSortingSelect = (sorting: string) => {
    setSelectedSorting(sorting)
  }

  return {
    selectedSorting,
    handleSortingSelect,
  }
}
