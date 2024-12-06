import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

const DEFAULT_SORTING = 'Best Rated'

export const useFilters = () => {
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedSorting, setSelectedSorting] = useState<string>(DEFAULT_SORTING)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false)

  // Initialize filters from URL parameters
  useEffect(() => {
    const categoriesParam = searchParams.get('categories')
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(','))
    }

    const countriesParam = searchParams.get('countries')
    if (countriesParam) {
      setSelectedCountries(countriesParam.split(','))
    }

    const sortingParam = searchParams.get('sorting')
    if (sortingParam) {
      setSelectedSorting(sortingParam)
    }

    const pageParam = searchParams.get('page')
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10)
      if (!isNaN(pageNumber)) {
        setCurrentPage(pageNumber)
      }
    }
  }, [searchParams])

  // Update URL parameters when filters or page change
  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','))
    }
    if (selectedCountries.length > 0) {
      params.set('countries', selectedCountries.join(','))
    }
    if (selectedSorting && selectedSorting !== DEFAULT_SORTING) {
      params.set('sorting', selectedSorting)
    }
    if (currentPage > 1) {
      params.set('page', currentPage.toString())
    }
    setSearchParams(params)
  }, [selectedCategories, selectedCountries, selectedSorting, currentPage, setSearchParams])

  // Handle filters from location.state (e.g., when navigating from another page)
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategories([location.state.category])
    }
    if (location.state?.country) {
      setSelectedCountries([location.state.country])
    }
  }, [location.state])

  // Update filtersApplied when filters change
  useEffect(() => {
    const hasFilters =
      selectedCategories.length > 0 || selectedCountries.length > 0 || selectedSorting !== DEFAULT_SORTING
    setFiltersApplied(hasFilters)
  }, [selectedCategories, selectedCountries, selectedSorting])

  // Handlers
  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updatedCategories)
    setCurrentPage(1) // Reset to page 1 when filters change
  }

  const handleCountrySelect = (countries: string[]) => {
    setSelectedCountries(countries)
    setCurrentPage(1) // Reset to page 1 when filters change
  }

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories)
    setCurrentPage(1) // Reset to page 1 when filters change
  }

  const handleSortingSelect = (sorting: string) => {
    setSelectedSorting(sorting)
    setCurrentPage(1) // Reset to page 1 when sorting changes
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSelectedCountries([])
    setSelectedSorting(DEFAULT_SORTING)
    setCurrentPage(1)
  }

  const handleNextPage = (totalPages: number) => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleJumpToPage = (page: number) => {
    setCurrentPage(page)
  }

  return {
    selectedCategories,
    selectedCountries,
    selectedSorting,
    currentPage,
    filtersApplied,
    handleCategoryClick,
    handleCountrySelect,
    handleCategorySelect,
    handleSortingSelect,
    handleResetFilters,
    handleNextPage,
    handlePreviousPage,
    handleJumpToPage,
  }
}
