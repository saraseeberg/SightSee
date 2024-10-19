import Greece from '@/assets/images/carousel/Greece.jpg'
import Japan from '@/assets/images/carousel/Japan.jpg'
import Maldives from '@/assets/images/carousel/Maldives.jpg'
import London from '@/assets/images/carousel/London.jpg'

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
