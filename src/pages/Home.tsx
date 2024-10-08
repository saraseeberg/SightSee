import Navbar from '../components/Navbar'

import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { useNavigate } from 'react-router-dom'

type CarouselData = {
  imagePath: string
}
type CardData = {
  imagePath: string
  title: string
  category: string
}

const carouselData: CarouselData[] = [
  {
    imagePath: '../src/assets/Italy.jpg',
  },
  {
    imagePath: '../src/assets/France.jpg',
  },
  {
    imagePath: '../src/assets/greece.jpg',
  },
]
const cardData: CardData[] = [
  {
    imagePath: '../src/assets/Mallorca.jpg',
    title: 'Swim in Spain?',
    category: 'Activities',
  },
  {
    imagePath: '../src/assets/Italy.jpg',
    title: 'Dinner in Italy?',
    category: 'Restaurants',
  },
  {
    imagePath: '../src/assets/France.jpg',
    title: 'Party in France?',
    category: 'Nightlife',
  },
  {
    imagePath: '../src/assets/alpene.jpg',
    title: 'Ski in the alps?',
    category: 'Sights',
  },
]

const Home = () => {
  const navigate = useNavigate()

  const suggestionClick = (category: string) => {
    navigate('/browse', { state: { category } })
  }

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8 my-14">
        <div className="flex w-full p-16 justify-center items-center ">
          <Carousel
            orientation="horizontal"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {carouselData.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="relative flex justify-center items-center rounded-xl overflow-hidden"
                >
                  <img
                    src={item.imagePath}
                    alt={`Image of a destination`}
                    className="w-full h-96 object-cover rounded-xl m-0 lg:min-h-[500px] "
                  />
                  <div className="absolute inset-0 bg-black/20 z-10 rounded-xl overflow-hidden ml-4"></div>
                  <p className="text-white text-lg absolute font-bold md:text-2xl lg:text-6xl z-20">
                    Discover your travels
                  </p>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="px-6 pb-8 mt-14">
          <p className=" flex text-gray-500 mb-1  ml-10 md:font-bold max-sm: items-center sm: justify-start">
            Discover your next destination
          </p>

          <h1 className="flex font-extrabold ml-10 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#000000] via-[#0D7C66] to-[#4FB38C] max-sm:text-4xl max-md:text-6xl md:text-7xl ">
            Where to next?
          </h1>

          <div className="flex justify-center flex-wrap items-center gap-3 max-sm:flex-col xl: mb-4">
            {cardData.map((item, index) => (
              <Card
                key={index}
                className="cursor-pointer rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0 transform transition-transform duration-300 hover:scale-105"
                onClick={() => suggestionClick(item.category)}
              >
                <CardContent className="relative p-0">
                  <div className="relative">
                    <img src={item.imagePath} alt={item.title} className="w-full h-96 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">
                      {item.title}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <footer className="background: #0D7C66"> </footer>
        </div>
      </div>
    </div>
  )
}

export default Home
