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
import { useAuth } from '@/lib/context/auth-context'
import { Icon } from '@iconify/react/dist/iconify.js'
import {
  Destination,
  useGetAllDestinationsQuery,
  useGetAvailableCategoriesQuery,
  useGetAvailableCountriesQuery,
  useGetFavoritesByUserIdQuery,
} from '@Types/__generated__/resolvers-types'
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
  const [selectedCard, setSelectedCard] = useState<Partial<Destination> | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedSorting, setSelectedSorting] = useState<string>('Best Rated')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filtersApplied, setFiltersApplied] = useState<boolean>(false)

  const { user } = useAuth()

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
  }, [])

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

  useGetFavoritesByUserIdQuery({
    variables: { id: user?.id || '' },
    skip: !user,
    onCompleted: (data) => {
      const favoriteIds = data?.getFavoritesByUserID?.map((fav) => fav.id) || []
      setFavorites(favoriteIds)
    },
  })

  const paginatedCards = data?.getAllDestinations ? data.getAllDestinations?.destinations : []
  const totalPages = data?.getAllDestinations ? Math.ceil(data.getAllDestinations.totalCount / CARDS_LIMIT) : 0

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategories([location.state.category])
    }
    if (location.state?.country) {
      setSelectedCountries([location.state.country])
    }
  }, [location.state])

  useEffect(() => {
    const pageParam = searchParams.get('page')
    if (pageParam) {
      const pageNumber = parseInt(pageParam, 10)
      if (!isNaN(pageNumber)) {
        setCurrentPage(pageNumber)
      }
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedCategories.length > 0) {
      params.set('categories', selectedCategories.join(','))
    }

    if (selectedCountries && selectedCountries.length > 0 && !selectedCountries.includes('World')) {
      params.set('countries', selectedCountries.join(','))
    }

    if (selectedSorting && selectedSorting !== 'Best Rated') {
      params.set('sorting', selectedSorting)
    }

    if (currentPage && currentPage !== 1) {
      params.set('page', currentPage.toString())
    }

    setSearchParams(params)
  }, [selectedCategories, selectedCountries, selectedSorting, currentPage])

  useEffect(() => {
    const hasFilters = selectedCategories.length > 0 || selectedCountries.length > 0 || selectedSorting !== 'Best Rated'

    setFiltersApplied(hasFilters)
  }, [selectedCategories, selectedCountries, selectedSorting])

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

  const handleCountrySelect = (countries: string[]) => {
    setSelectedCountries(countries)
    setCurrentPage(1)
  }

  const handleCategorySelect = (categories: string[]) => {
    setSelectedCategories(categories)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setSelectedCategories([])
    setSelectedCountries([]) // Clear all selected countries
    setSelectedSorting('Best Rated')
    setCurrentPage(1)
  }

  const handleCardClick = (card: Partial<Destination>) => {
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

  const handleToggleFavorite = (destinationId: string, isSaved: boolean) => {
    setFavorites((prevFavorites) =>
      isSaved ? [...prevFavorites, destinationId] : prevFavorites.filter((id) => id !== destinationId),
    )
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
            <SortingDropdown onSelectedSorting={handleSortingSelect} />
            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background
                ${filtersApplied ? 'cursor-pointer hover:scale-105' : 'opacity-50 cursor-not-allowed'}`}
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
            <Alert className="bg-red-100  border-red-400  w-2/4 text-black" role="alert">
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

      <CardDetailsDialog
        selectedCard={selectedCard}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
      />

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
                onClick={() => handleJumpToPage(index + 1)}
                className={currentPage === index + 1 ? 'font-bold text-xl cursor cursor-pointer' : ''}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={handleNextPage}
              className={currentPage === totalPages || totalPages === 0 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default Browse
