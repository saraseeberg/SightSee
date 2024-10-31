import BrowseCard from '@/components/molecules/BrowseCard'
import CardDetailsDialog from '@/components/molecules/CardDetailsDialog'
import CategoryButton, { CategoryButtonProps } from '@/components/atoms/CategoryButton'
import CountryDropdown from '@/components/molecules/CountryDropdown'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryDropdown from '@/components/molecules/CategoryDropdown'
import { useQuery } from '@apollo/client'
import { GET_ALL_DESTINATIONS } from '@/graphql/queries'
import { Destination } from '@types'
import SortingDropdown from '@/components/molecules/SortingDropdown'

const categoryButtonData: Omit<CategoryButtonProps, 'onClick' | 'isSelected'>[] = [
  {
    category: 'Activities',
  },
  {
    category: 'Entertainment',
  },
  {
    category: 'Nightlife',
  },
  {
    category: 'Restaurants',
  },
  {
    category: 'Shopping',
  },
  {
    category: 'Sights',
  },
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

  const handleSortingSelect = (sorting: string) => {
    setSelectedSorting(sorting)
  }

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
      console.log('Filtered Cards: ', newFilteredCards)
    }
  }, [data, selectedCategories, selectedCountry, selectedSorting])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

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

  return (
    <>
      <main className="flex flex-col gap-8">
        {/* Section for category buttons */}
        <section aria-labelledby="category-section" className="flex w-full p-4 justify-center items-center">
          <div className="flex flex-wrap gap-4">
            {/* CategoryButton is hidden on mobile screens (below md breakpoint) */}
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

            {/* Show CategoryDropdown on mobile screens (below md breakpoint) */}
            <div className="block md:hidden">
              <CategoryDropdown onSelectCategory={handleCategorySelect} />
            </div>

            {/* CountryDropdown is always visible */}
            <CountryDropdown onSelectCountry={handleCountrySelect} selectedCountry={selectedCountry} />

            <SortingDropdown onSelectedSorting={handleSortingSelect} />
          </div>
        </section>

        {/* Section for listing cards */}
        <section aria-labelledby="browse-section" className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <h2 id="browse-section" className="sr-only">
            Browse Cards
          </h2>
          {filteredCards.map((card: Destination, index: number) => (
            <BrowseCard
              key={index}
              onClick={() => handleCardClick(card)}
              className="w-[46%] sm:w-1/3 md:w-1/3 lg:w-1/4 shrink-0"
              card={card}
            />
          ))}
        </section>
      </main>

      {/* Dialog for Card Details */}
      <CardDetailsDialog selectedCard={selectedCard} openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </>
  )
}

export default Browse
