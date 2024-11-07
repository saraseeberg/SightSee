import HeroCarousel from '@/components/molecules/HeroCarousel'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetFeaturedDestinationsQuery } from '@types'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const suggestionClick = (category: string, country: string) => {
    navigate('/browse', { state: { category, country } })
  }

  const { data, loading, error } = useGetFeaturedDestinationsQuery()
  const destinations = data?.getFeaturedDestinations ?? []

  return (
    <>
      <main className="flex flex-col gap-8 my-6">
        <section className="flex w-full px-2 justify-center items-center ">
          <HeroCarousel />
        </section>

        <section className="px-6 pb-8 mt-14">
          <p className=" flex text-grey mb-1 md:font-bold max-sm: items-center sm: justify-start">
            Discover your next destination
          </p>

          <h1 className="flex font-extrabold  mb-6 bg-clip-text text-transparent bg-gradient-to-r from-content via-[#0D7C66] to-accent-1 max-sm:text-4xl max-md:text-6xl md:text-7xl ">
            Where to next?
          </h1>

          <div className="flex justify-center flex-wrap items-center gap-3 max-sm:flex-col xl: mb-4">
            {loading ? (
              error ? (
                <Skeleton className="w-64 h-96" />
              ) : (
                <p>Error fetching destinations</p>
              )
            ) : (
              destinations.map((item, index) => (
                <Card
                  key={index}
                  className="cursor-pointer rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0 transform transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    const category = item?.categories[0] ?? null
                    if (!category || !item?.country) {
                      return
                    }

                    suggestionClick(category, item.country)
                  }}
                >
                  <CardContent className="relative p-0">
                    <div className="relative">
                      <img src={item?.image} alt={item?.alt} className="w-full h-96 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                      <p className="absolute bottom-4 left-4 ml-2 text-white font-bold text-lg shadow-2xl">
                        {item?.titlequestion}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home
