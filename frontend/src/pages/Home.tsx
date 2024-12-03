import HeroCarousel from '@/components/molecules/HeroCarousel'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useGetFeaturedDestinationsQuery } from '@Types/__generated__/resolvers-types'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const suggestionClick = (category: string, country: string) => {
    window.scrollTo(0, 0)
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
              // Render four skeleton cards while loading
              Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} className="w-64 h-96" />)
            ) : error ? (
              // Display ShadCN alert for error message
              <Alert className=" w-2/4 mt-5 bg-red-100  border-red-400 text-black">
                <Icon
                  icon={'ic:baseline-sentiment-very-dissatisfied'}
                  className="w-4 h-4 pt-0"
                  style={{ color: 'black' }}
                />
                <AlertTitle className=" pt-1">Error fetching data..! </AlertTitle>
                <AlertDescription>Not able to fetch data 🤕 </AlertDescription>
              </Alert>
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
