import CategoryButton from '@/components/CategoryButton'
import { useEffect, useState } from 'react'
import { CategoryButtonProps } from '@/components/CategoryButton'
import BrowseCard from '@/components/BrowseCard'
import { CardDataProps } from '@/components/BrowseCard'
import CardDetailsDialog from '@/components/CardDetailsDialog'
import { useLocation } from 'react-router-dom'
import CountryDropdown from '@/components/CountryDropdown'
import CategoryDropdown from '@/components/CategoryDropdown'

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

const browseCardData: CardDataProps[] = [
  {
    imagePath: '../src/assets/browse/disney.jpg',
    title: 'Disneyland',
    category: 'Activities',
    country: 'United States',
    region: 'California',
    description: 'A magical place for kids and adults alike',
    startRating: 3.5,
  },
  {
    imagePath: '../src/assets/browse/seven-sis.jpg',
    title: 'Seven Sisters Waterfall',
    category: 'Sights',
    country: 'Norway',
    region: 'Geiranger',
    description: 'A beautiful mountain range with a stunning waterfall',
    startRating: 4.5,
  },
  {
    imagePath: '../src/assets/browse/omnia-nightclub.jpg',
    title: 'Omnia Nightclub',
    category: 'Nightlife',
    country: 'United States',
    region: 'Las Vegas',
    description: 'A popular nightclub in Las Vegas',
    startRating: 4.0,
  },
  {
    imagePath: '../src/assets/browse/quattro-passi.jpg',
    title: 'Quattro Passi',
    category: 'Restaurants',
    country: 'Italy',
    region: 'Naples',
    description: 'A Michelin star restaurant in Naples',
    startRating: 5.0,
  },
  {
    imagePath: '../src/assets/browse/mall-emirates.jpg',
    title: 'Mall of the Emirates',
    category: 'Shopping',
    country: 'United Arab Emirates',
    region: 'Dubai',
    description: 'A large shopping mall in Dubai',
    startRating: 4.5,
  },
  {
    imagePath: '../src/assets/browse/roskilde.jpg',
    title: 'Roskilde Festival',
    category: 'Entertainment',
    country: 'Denmark',
    region: 'Roskilde',
    description: 'A large music festival in Denmark',
    startRating: 4.0,
  },
]

const Browse = () => {
  const location = useLocation()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('World')
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardDataProps | null>(null)
  const [userRating, setUserRating] = useState<number>(0)

  useEffect(() => {
    const storedCategories = sessionStorage.getItem('selectedCategories')
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories))
    }

    if (location.state?.category) {
      setSelectedCategories([location.state.category])
      sessionStorage.setItem('selectedCategories', JSON.stringify([location.state.category]))
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

  const handleCardClick = (card: CardDataProps) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }

  const handleStarClick = (rating: number) => {
    setUserRating(rating)
  }

  const filteredCards = browseCardData.filter((card) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(card.category)
    const matchesCountry = selectedCountry === 'World' || card.country === selectedCountry
    return matchesCategory && matchesCountry
  })

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
            <CountryDropdown onSelectCountry={handleCountrySelect} />
          </div>
        </section>

        {/* Section for listing cards */}
        <section aria-labelledby="browse-section" className="flex flex-wrap gap-2 sm:gap-4 justify-center">
          <h2 id="browse-section" className="sr-only">
            Browse Cards
          </h2>
          {filteredCards.map((item, index) => (
            <BrowseCard
              key={index}
              imagePath={item.imagePath}
              title={item.title}
              country={item.country}
              region={item.region}
              startRating={item.startRating}
              onClick={() => handleCardClick(item)}
              description={item.description}
              category={item.category}
              className="w-[46%] sm:w-1/3 md:w-1/3 lg:w-1/4 shrink-0"
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
