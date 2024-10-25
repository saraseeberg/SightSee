import BrowseCard from '@/components/BrowseCard'
import CardDetailsDialog from '@/components/CardDetailsDialog'
import CategoryButton, { CategoryButtonProps } from '@/components/CategoryButton'
import CountryDropdown from '@/components/CountryDropdown'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryDropdown from '@/components/CategoryDropdown'
import LocationsData from '@/lib/data/locationsData'
import { Location } from '@/lib/types/Location'
import { useQuery } from '@apollo/client'
import { GET_ALL_DESTINATIONS } from '@/graphql/queries'

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
  const {loading, error, data} = useQuery<{ locations : Location[] }>(GET_ALL_DESTINATIONS);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('World')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Location | null>(null)
  const [userRating, setUserRating] = useState<number>(0)

  useEffect(() => {
    if (error) {
      console.error('Apollo Client Error:', error);
    }
  }, [error]);

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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  if (!data) return <p>No data</p>

  console.log(data)

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

  const handleCardClick = (card: Location) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }

  const handleStarClick = (rating: number) => {
    setUserRating(rating)
  }

  const filteredCards: Location[] = data?.locations ? data.locations.filter((card: Location) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.some((category) => card.categories.includes(category))
    const matchesCountry = selectedCountry === 'World' || card.country === selectedCountry
    return matchesCategory && matchesCountry
  }) : []

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
          </div>
        </section>

        {/* Section for listing cards */}
        <section aria-labelledby="browse-section" className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <h2 id="browse-section" className="sr-only">
            Browse Cards
          </h2>
          {filteredCards.map((card: Location, index: number) => (
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
      <CardDetailsDialog
        selectedCard={selectedCard}
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        userRating={userRating}
        handleStarClick={handleStarClick}
      />
    </>
  )
}

export default Browse
