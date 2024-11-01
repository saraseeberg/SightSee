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
import { GET_ALL_DESTINATIONS } from '@/graphql/queries'
import { useQuery } from '@apollo/client'
import { Destination } from '@types'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const categoryButtonData: Omit<CategoryButtonProps, 'onClick' | 'isSelected'>[] = [
  { category: 'Activities' },
  { category: 'Entertainment' },
  { category: 'Nightlife' },
  { category: 'Restaurants' },
  { category: 'Shopping' },
  { category: 'Sights' },
]

const Browse = () => {
  const location = useLocation()
  const { loading, error, data } = useQuery<{ getAllDestinations: Destination[] }>(GET_ALL_DESTINATIONS)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('World')
  const [selectedSorting, setSelectedSorting] = useState<string>('Best Rated')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Destination | null>(null)
  const [filteredCards, setFilteredCards] = useState<Destination[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 12
  const paginatedCards = filteredCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)

  useEffect(() => {
    const storedCategories = sessionStorage.getItem('selectedCategories')
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories))
    }
    if (location.state?.category) {
      setSelectedCategories([location.state.category])
      sessionStorage.setItem('selectedCategories', JSON.stringify([location.state.category]))
    }
    if (location.state?.country) {
      setSelectedCountry(location.state.country)
      sessionStorage.setItem('selectedCountry', location.state.country)
    }
  }, [location.state])

  useEffect(() => {
    if (data?.getAllDestinations) {
      const newFilteredCards = data.getAllDestinations.filter((card: Destination) => {
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.some((category) => card.categories.includes(category))
        const matchesCountry = selectedCountry === 'World' || card.country === selectedCountry
        return matchesCategory && matchesCountry
      })
      if (selectedSorting === 'Best Rated') {
        newFilteredCards.sort((a, b) => b.rating - a.rating)
      } else if (selectedSorting === 'Worst Rated') {
        newFilteredCards.sort((a, b) => a.rating - b.rating)
      } else if (selectedSorting === 'A - Z') {
        newFilteredCards.sort((a, b) => a.title.localeCompare(b.title))
      } else if (selectedSorting === 'Z - A') {
        newFilteredCards.sort((a, b) => b.title.localeCompare(a.title))
      }

      setFilteredCards(newFilteredCards)
      setCurrentPage(1) // Reset to the first page when filters change
    }
  }, [data, selectedCategories, selectedCountry, selectedSorting])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const handleCategoryClick = (category: string) => {
    let updatedCategories: string[]
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category)
    } else {
      updatedCategories = [...selectedCategories, category]
    }

    setSelectedCategories(updatedCategories)
    sessionStorage.setItem('selectedCategories', JSON.stringify(updatedCategories))
  }
  const handleSortingSelect = (sorting: string) => {
    setSelectedSorting(sorting)
  }

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country)
  }

  const handleCategorySelect = (category: string) => {
    if (category === 'All') {
      setSelectedCategories([])
    } else {
      setSelectedCategories([category])
    }
    sessionStorage.setItem('selectedCategories', JSON.stringify(category === 'All' ? [] : [category]))
  }

  const handleCardClick = (card: Destination) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredCards.length / cardsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  const handleJumpToPage = (page: number) => {
    if (page >= 1 && page <= Math.ceil(filteredCards.length / cardsPerPage)) {
      setCurrentPage(page)
    }
  }

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
          {paginatedCards.map((card: Destination, index: number) => (
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

      <Pagination className="my-3">
        <PaginationContent className="cursor-pointer">
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePreviousPage}
              className={currentPage === 1 ? 'cursor-default opacity-0' : ''}
            />
          </PaginationItem>

          {[...Array(Math.ceil(filteredCards.length / cardsPerPage))].map((_, index) => (
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
              className={
                currentPage === Math.ceil(filteredCards.length / cardsPerPage) ? 'cursor-default opacity-0' : ''
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default Browse
