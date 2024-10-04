import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

type CarouselData = {
  label: string
  imagePath: string
}

const carouselData: CarouselData[] = [
  {
    label: "Discover your travels",
    imagePath: "../src/assets/Italy.jpg",
  },
  {
    label: "Discover your travels",
    imagePath: "../src/assets/France.jpg",
  },
  {
    label: "Discover your travels",
    imagePath: "../src/assets/greece.jpg",
  },
]

const Home = () => {
  return (
    <div className="flex flex-col gap-8 my-12">
      <div className="flex w-full p-16 justify-center items-center">
        <Carousel
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {carouselData.map((item, index) => (
              <CarouselItem key={index}>
                <img src={item.imagePath} alt={item.label} className="w-full h-96 object-cover rounded-md shadow-md" />
                <p className="text-white text-4xl font-bold absolute bottom-4 left-4">{item.label}</p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="px-6 pb-8 mt-14">
        <p className=" flex text-gray-500 mb-1 md:font-bold max-sm: items-center sm: justify-start">
          Discover your next destination
        </p>

        <h1 className="flex font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#000000] via-[#0D7C66] to-[#4FB38C] max-sm:text-4xl mb-6 md:text-7xl ">
          Where to next?
        </h1>

        <div className="flex justify-center items-center gap-3 max-sm:flex-col xl:space-x-10 xl:flex-wrap mb-4">
          <Card className="rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0">
            <CardContent className="relative p-0">
              <div className="relative">
                <img src="../src/assets/Mallorca.jpg" alt="Swim in Spain" className="w-full h-70 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">Swim in Spain?</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0">
            <CardContent className="relative p-0">
              <div className="relative">
                <img src="../src/assets/Italy.jpg" alt="Dinner in Italy" className="w-full h-70 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">
                  Dinner in Italy?
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0">
            <CardContent className="relative p-0">
              <div className="relative">
                <img src="../src/assets/France.jpg" alt="Party in France" className="w-full h-70 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">
                  Party in France?
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <footer className="background: #0D7C66"> </footer>
      </div>
    </div>
  )
}

export default Home
