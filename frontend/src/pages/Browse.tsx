import CategoryButton, { CategoryButtonProps } from '@/components/atoms/CategoryButton'
import BrowseCard from '@/components/molecules/BrowseCard'
import CardDetailsDialog from '@/components/molecules/CardDetailsDialog'
import CategoryDropdown from '@/components/molecules/CategoryDropdown'
import CountryDropdown from '@/components/molecules/CountryDropdown'
import SortingDropdown from '@/components/molecules/SortingDropdown'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { GET_ALL_DESTINATIONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Destination } from '@types'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

const categoryButtonData: Omit<CategoryButtonProps, 'onClick' | 'isSelected'>[] = [
  { category: 'Activities' },
  { category: 'Entertainment' },
  { category: 'Nightlife' },
  { category: 'Restaurants' },
  { category: 'Shopping' },
  { category: 'Sights' },
]

const CARDS_LIMIT = 12

const Browse = () => {
  const location = useLocation()
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Destination | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('World')
  const [selectedSorting, setSelectedSorting] = useState<string>('Best Rated')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // Initialize state from URL parameters on initial mount
  useEffect(() => {
    const categoriesParam = searchParams.get('categories')
    if (categoriesParam) {
      setSelectedCategories(categoriesParam.split(','))
    }

    const countryParam = searchParams.get('country')
    if (countryParam) {
      setSelectedCountry(countryParam)
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
  }, [])

  const { loading, error, data } = useQuery<{
    getAllDestinations: { destinations: Destination[]; totalCount: number }
  }>(GET_ALL_DESTINATIONS, {
    variables: {
      page: currentPage,
      limit: CARDS_LIMIT,
      categories: selectedCategories.length > 0 ? selectedCategories : null,
      country: selectedCountry === 'World' ? null : selectedCountry,
      sorting: selectedSorting,
    },
  })

  console.log(error)
  console.log(data)

  const paginatedCards = data ? data.getAllDestinations.destinations : []
  const totalPages = data ? Math.ceil(data.getAllDestinations.totalCount / CARDS_LIMIT) : 0

  // Handle location state
  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategories([location.state.category])
    }
    if (location.state?.country) {
      setSelectedCountry(location.state.country)
    }
  }, [location.state])

  // Reset currentPage when filters change, except on initial mount
  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10)
      if (!isNaN(pageNumber)) {
        setCurrentPage(pageNumber)
      }
    }
  }, [])

  // Update URL parameters when state changes
  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','))
    }

    if (selectedCountry && selectedCountry !== 'World') {
      params.set('country', selectedCountry)
    }

    if (selectedSorting && selectedSorting !== 'Best Rated') {
      params.set('sorting', selectedSorting)
    }

    if (currentPage && currentPage !== 1) {
      params.set('page', currentPage.toString())
    }

    setSearchParams(params)
  }, [selectedCategories, selectedCountry, selectedSorting, currentPage])

  const handleCategoryClick = (category: string) => {
    let updatedCategories: string[]
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category)
    } else {
      updatedCategories = [...selectedCategories, category]
    }

    setSelectedCategories(updatedCategories)
    setCurrentPage(1)
    setSearchParams(new URLSearchParams())
  }

  const handleSortingSelect = (sorting: string) => {
    setSelectedSorting(sorting)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
    setCurrentPage(1)
    setSearchParams(new URLSearchParams())
  }

  const handleCategorySelect = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([category])
    }
  }

  const handleCardClick = (card: Destination) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
  }

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
  }

  const handleJumpToPage = (page: number) => {
    setCurrentPage(page)
  }
  const SkeletonCard = () => <Skeleton className="w-[46%] sm:w-1/3 md:w-1/3 lg:w-1/4 h-64" />

  return (
    <>
      <main className="flex flex-col gap-8">
        <section aria-labelledby="category-section" className="flex w-full p-4 justify-center items-center">
          <div className="flex flex-wrap gap-4">
            <div className="hidden md:flex flex-wrap gap-4">
              {categoryButtonData.map((item, index) => (
                <CategoryButton
                  key={index}
                  category={item.category}
                  isSelected={selectedCategories.includes(item.category)}
                  onClick={() => handleCategoryClick(item.category)}
                />
              ))}
            </div>
            <div className="block md:hidden">
              <CategoryDropdown onSelectCategory={handleCategorySelect} />
            </div>
            <CountryDropdown onSelectCountry={handleCountrySelect} selectedCountry={selectedCountry} />
            <SortingDropdown onSelectedSorting={handleSortingSelect} />
          </div>
        </section>

        <section aria-labelledby="browse-section" className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <h2 id="browse-section" className="sr-only">
            Browse Cards
          </h2>

          {loading
            ? Array.from({ length: CARDS_LIMIT }).map((_, index) => <SkeletonCard key={index} />)
            : paginatedCards.map((card, index) => (
                <BrowseCard
                  key={index}
                  onClick={() => handleCardClick(card)}
                  className="w-[46%] sm:w-1/3 md:w-1/3 lg:w-1/4 shrink-0"
                  card={card}
                />
              ))}
        </section>
      </main>
      <CardDetailsDialog selectedCard={selectedCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />

      <Pagination className="my-4">
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={currentPage === 1 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} className="cursorPointer">
              <PaginationLink
                onClick={() => {
                  handleJumpToPage(index + 1)
                }}
                className={currentPage === index + 1 ? 'font-bold text-xl cursor cursor-pointer' : ''}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={currentPage === totalPages || totalPages == 0 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default Browse
