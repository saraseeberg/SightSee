import Greece from '@/assets/images/carousel/Greece.webp'
import Japan from '@/assets/images/carousel/Japan.webp'
import Maldives from '@/assets/images/carousel/Maldives.webp'
import London from '@/assets/images/carousel/London.webp'

const carouselData = [
  {
    image: Greece,
    title: 'Adventure into the unknown',
    titleReavel: 'Greece?',
  },
  {
    image: Maldives,
    title: 'Discover your next adventure',
    titleReavel: 'Maldives?',
  },
  {
    image: Japan,
    title: 'Who knows what you might discover',
    titleReavel: 'Japan?',
  },
  {
    image: London,
    title: 'Make memories that last a lifetime',
    titleReavel: 'London?',
  },
]

const carouselDataType = typeof carouselData

export { carouselData, carouselDataType }
