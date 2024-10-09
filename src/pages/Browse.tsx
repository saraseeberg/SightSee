import Navbar from '../components/Navbar'
import CategoryButton from '@/components/CategoryButton'
import { useEffect, useState } from 'react'
import { CategoryButtonProps } from '@/components/CategoryButton'
import BrowseCard from '@/components/BrowseCard'
import { CardDataProps } from '@/components/BrowseCard'
import CardDetailsDialog from '@/components/CardDetailsDialog'

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
    country: 'USA',
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
    country: 'USA',
    region: 'Las Vegas',
    description:
      'A popular nightclub in Las Vegas. Known for its celebrity appearances and performances. A popular nightclub in Las Vegas. Known for its celebrity appearances and performances',
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
    country: 'UAE',
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedCard, setSelectedCard] = useState<CardDataProps | null>(null)
  const [userRating, setUserRating] = useState<number>(0)

  useEffect(() => {
    const storedCategories = sessionStorage.getItem('selectedCategories')
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories))
    }
  }, [])

  const handleCategoryClick = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(updatedCategories)
    sessionStorage.setItem('selectedCategories', JSON.stringify(updatedCategories))
  }

  const handleCardClick = (card: CardDataProps) => {
    setSelectedCard(card)
    setOpenDialog(true)
  }

  const handleStarClick = (rating: number) => {
    setUserRating(rating)
  }

  const filteredCards = selectedCategories.length
    ? browseCardData.filter((card) => selectedCategories.includes(card.category))
    : browseCardData

  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-8">
        {/* Section for category buttons */}
        <section aria-labelledby="category-section" className="flex w-full p-4 justify-center items-center">
          <h2 id="category-section" className="sr-only">
            Category Filter
          </h2>
          <div className="flex flex-wrap gap-4">
            {categoryButtonData.map((item, index) => (
              <CategoryButton
                key={index}
                category={item.category}
                isSelected={selectedCategories.includes(item.category)}
                onClick={() => handleCategoryClick(item.category)}
              />
            ))}
          </div>
        </section>

        {/* Section for listing cards */}
        <section aria-labelledby="browse-section" className="flex flex-wrap gap-4 justify-center">
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
