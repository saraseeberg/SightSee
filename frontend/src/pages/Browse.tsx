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
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useFilters } from '@/hooks/useFilters'
import { Icon } from '@iconify/react/dist/iconify.js'
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

  const { data: availableCategoriesData } = useGetAvailableCategoriesQuery({
    variables: { countries: selectedCountries.length > 0 ? selectedCountries : null },
  })

  const { data: availableCountriesData } = useGetAvailableCountriesQuery({
    variables: { categories: selectedCategories.length > 0 ? selectedCategories : null },
  })

  const availableCategories = new Set(availableCategoriesData?.getAvailableCategories || [])
  const availableCountries = new Set(availableCountriesData?.getAvailableCountries || [])

  const paginatedCards = data?.getAllDestinations ? data.getAllDestinations?.destinations : []
  const totalPages = data?.getAllDestinations ? Math.ceil(data.getAllDestinations.totalCount / CARDS_LIMIT) : 0

  const handleCardClick = (card: Partial<Destination>) => {
    setSelectedCard(card)
    setOpenDialog(true)
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
        <section aria-labelledby="browse-section" className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <h2 id="browse-section" className="sr-only">
            Browse Cards
          </h2>

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
              <Icon
                icon="ic:baseline-sentiment-very-dissatisfied"
                className="w-4 h-4 pt-0"
                style={{ color: 'black' }}
              />
              <AlertTitle className="pt-1"> Hmmm... </AlertTitle>
              <AlertDescription> No results found for your selected filters. 🤕 </AlertDescription>
            </Alert>
          )}
        </section>
      </main>

      <CardDetailsDialog selectedCard={selectedCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />

      <Pagination className="my-4">
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => handlePreviousPage()}
              className={currentPage === 1 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index} className="cursorPointer">
              <PaginationLink
                onClick={() => handleJumpToPage(index + 1)}
                className={currentPage === index + 1 ? 'font-bold text-xl cursor-pointer' : ''}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => handleNextPage(totalPages)}
              className={currentPage === totalPages || totalPages === 0 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default Browse
