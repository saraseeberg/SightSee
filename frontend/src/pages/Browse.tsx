import BrowseCard from '@/components/BrowseCard'
import CategoryButton, { CategoryButtonProps } from '@/components/CategoryButton'
import CountryDropdown from '@/components/CountryDropdown'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CategoryDropdown from '@/components/CategoryDropdown'
import { Location } from '@/lib/types/Location'
import { useQuery } from '@apollo/client'
import { GET_ALL_DESTINATIONS } from '@/graphql/queries'
import * as Dialog from '@radix-ui/react-dialog'

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
  const { loading, error, data } = useQuery<{ getAllDestinations: Location[] }>(GET_ALL_DESTINATIONS)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('World')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<Location | null>(null)
  const [filteredCards, setFilteredCards] = useState<Location[]>([])

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
      const newFilteredCards = data.getAllDestinations.filter((card: Location) => {
        const matchesCategory =
          selectedCategories.length === 0 || selectedCategories.some((category) => card.categories.includes(category))
        const matchesCountry = selectedCountry === 'World' || card.country === selectedCountry
        return matchesCategory && matchesCountry
      })
      setFilteredCards(newFilteredCards)
      console.log('Filtered Cards: ', newFilteredCards)
    }
  }, [data, selectedCategories, selectedCountry])

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

  const handleCardClick = (card: Location) => {
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
      <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-md">
              <Dialog.Title>{selectedCard?.title}</Dialog.Title>
              <p>{selectedCard?.description}</p>
              {/* You can add more details or a star rating component here */}
              <button onClick={() => setOpenDialog(false)}>Close</button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

export default Browse
