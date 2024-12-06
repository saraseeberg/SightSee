import CategoryButton, { CategoryButtonProps } from '@/components/atoms/CategoryButton'
import BrowseCard from '@/components/molecules/BrowseCard'
import CardDetailsDialog from '@/components/molecules/CardDetailsDialog'
import CategoryDropdown from '@/components/molecules/CategoryDropdown'
import CountryDropdown from '@/components/molecules/CountryDropdown'
import SortingDropdown from '@/components/molecules/SortingDropdown'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilters } from '@/hooks/useFilters'
import {
  Destination,
  useGetAllDestinationsQuery,
  useGetAvailableCategoriesQuery,
  useGetAvailableCountriesQuery,
} from '@Types/__generated__/resolvers-types'
import { useState } from 'react'

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
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Partial<Destination> | null>(null)

  const {
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
  } = useFilters()

  const { data, loading } = useGetAllDestinationsQuery({
    variables: {
      page: currentPage,
      limit: CARDS_LIMIT,
      categories: selectedCategories.length > 0 ? selectedCategories : null,
      countries: selectedCountries.length > 0 ? selectedCountries : null,
      sorting: selectedSorting,
    },
  })

  // Fetch available categories and countries
  const { data: availableCategoriesData } = useGetAvailableCategoriesQuery({
    variables: { countries: selectedCountries.length > 0 ? selectedCountries : null },
  })

  const { data: availableCountriesData } = useGetAvailableCountriesQuery({
    variables: { categories: selectedCategories.length > 0 ? selectedCategories : null },
  })

  const availableCategories = new Set(availableCategoriesData?.getAvailableCategories || [])
  const availableCountries = new Set(availableCountriesData?.getAvailableCountries || [])

  // Card click handler
  const handleCardClick = (card: Partial<Destination>) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }
  //  Pagination logic
  const totalPages = data?.getAllDestinations ? Math.ceil(data.getAllDestinations.totalCount / CARDS_LIMIT) : 0
  const paginatedCards = data?.getAllDestinations ? data.getAllDestinations?.destinations : []

  // Pagination controls
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  // Skeleton card
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
                  disabled={!availableCategories.has(item.category)}
                />
              ))}
            </div>
            <div className="block md:hidden">
              <CategoryDropdown
                onSelectCategories={handleCategorySelect}
                selectedCategories={selectedCategories}
                availableCategories={availableCategories}
              />
            </div>
            <CountryDropdown
              onSelectCountries={handleCountrySelect}
              selectedCountries={selectedCountries}
              availableCountries={availableCountries}
            />
            <SortingDropdown selectedSorting={selectedSorting} onSelectedSorting={handleSortingSelect} />
            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background ${
                filtersApplied ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!filtersApplied}
            >
              Deselect all
            </Button>
          </div>
        </section>
        <section className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          {loading ? (
            Array.from({ length: CARDS_LIMIT }).map((_, index) => <SkeletonCard key={index} />)
          ) : paginatedCards.length > 0 ? (
            paginatedCards.map((card, index) => (
              <BrowseCard
                key={index}
                onClick={() => handleCardClick(card)}
                className="w-[46%] sm:w-1/3 md:w-1/3 lg:w-1/4 shrink-0"
                card={card}
              />
            ))
          ) : (
            <Alert className="bg-red-100 border-red-400 w-2/4 text-black" role="alert">
              <AlertTitle>No results found</AlertTitle>
              <AlertDescription>Try adjusting your filters.</AlertDescription>
            </Alert>
          )}
        </section>
      </main>

      <CardDetailsDialog selectedCard={selectedCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />

      {/* Pagination logic that gives the user feedback when there is no  */}
      {totalPages > 1 && (
        <Pagination className="my-4">
          <PaginationContent className="cursor-pointer">
            <PaginationPrevious
              onClick={() => !isFirstPage && handlePreviousPage()}
              className={`cursor-pointer ${isFirstPage ? 'cursor-not-allowed opacity-50' : ''}`}
            />
            <PaginationItem>
              <PaginationLink
                onClick={() => handleJumpToPage(1)}
                className={`${1 === currentPage ? 'bg-primary text-white font-bold' : 'text-black'}`}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {currentPage > 4 && <PaginationEllipsis />}

            {Array.from({ length: 5 }, (_, index) => {
              const page = currentPage - 2 + index
              if (page > 1 && page < totalPages) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handleJumpToPage(page)}
                      className={`${page === currentPage ? 'bg-primary text-white font-bold' : 'text-black'}`}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              }
              return null
            })}
            {currentPage < totalPages - 3 && <PaginationEllipsis />}
            <PaginationItem>
              <PaginationLink
                onClick={() => handleJumpToPage(totalPages)}
                className={`${totalPages === currentPage ? 'bg-primary text-white font-bold' : 'text-black'}`}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
            <PaginationNext
              onClick={() => !isLastPage && handleNextPage(totalPages)}
              className={`cursor-pointer ${isLastPage ? 'cursor-not-allowed opacity-50' : ''}`}
            />
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

export default Browse
