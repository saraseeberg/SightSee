import { Card, CardContent } from "@/components/ui/card"

const Home = () => {
  return (
    <div className="px-6 py-8">
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
              <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">Dinner in Italy?</p>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0">
          <CardContent className="relative p-0">
            <div className="relative">
              <img src="../src/assets/France.jpg" alt="Party in France" className="w-full h-70 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">Party in France?</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="background: #0D7C66"> </footer>
    </div>
  )
}

export default Home
