import { useEffect, useState } from 'react'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from './ui/carousel'
import AutoPlay from 'embla-carousel-autoplay'
import { Link } from 'react-router-dom'

const carouselData = [
  {
    imagePath: 'src/assets/browse/turtle.jpg',
    title: 'Adventure into the unknown',
    titleReavel: 'Greece?',
  },
  {
    imagePath: '../src/assets/greece.jpg',
    title: 'Discover your next adventure',
    titleReavel: 'Maldives?',
  },
  {
    imagePath: 'src/assets/browse/bakery.jpg',
    title: 'Who knows what you might discover',
    titleReavel: 'Japan?',
  },
  {
    imagePath: 'src/assets/browse/greecePink.jpg',
    title: 'Make memories that last a lifetime',
    titleReavel: 'Gonorrhoea?',
  },
]

const CarouselIndicator = ({ api, current, total }: { api: CarouselApi; current: number; total: number }) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          onClick={() => api?.scrollTo(index)}
          className={`w-3 h-3 rounded-full  hover:bg-white/80 transition-all duration-300 ${
            current === index ? 'bg-white' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  )
}

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const autoplay = AutoPlay({ delay: 5000 })

  useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      plugins={[autoplay]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {carouselData.map((item, index) => (
          <CarouselItem key={index} className="relative flex justify-center items-center group rounded-xl">
            <Link to="/browse" className="w-full relative flex justify-center items-center rounded-xl">
              <img
                src={item.imagePath}
                alt={`Image of a destination`}
                className="w-full object-cover h-96 rounded-xl blur-sm lg:min-h-[500px] hover:blur-none duration-300"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl overflow-hidden pointer-events-none"></div>
              <p className="absolute text-white font-bold max-md:text-3xl px-2 text-6xl pointer-events-none transition-all transform duration-100 group-hover:animate-squeeze-x group-hover:delay-1000">
                {item.title}
              </p>
              <p className="hidden absolute text-white font-bold max-md:text-3xl px-2 text-6xl pointer-events-none group-hover:block group-hover:animate-stretch-x group-hover:delay-1000 transition-all duration-100">
                {item.titleReavel}
              </p>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselIndicator api={api} current={current} total={carouselData.length} />
    </Carousel>
  )
}

export default HeroCarousel
