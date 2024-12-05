import SmallReviewCard from '@/components/atoms/SmallReviewCard'
import SmallSavedDestinationCard from '@/components/atoms/SmallSavedDestinationCard'
import StatisticsCard from '@/components/molecules/StatisticsCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/context/auth-context'
import { Review } from '@Types/__generated__/resolvers-types'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const burgersEaten = localStorage.getItem('eatenBurger') || 0
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <main className="flex flex-col items-center my-2 px-2 md:mx-[10%] gap-10 ">
      <section className="flex items-center gap-10 w-full max-md:flex-col">
        <div className="flex gap-10">
          <Avatar className="size-48 max-sm:size-24">
            <AvatarImage src={user.image as string} />
            <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl">{user.name}</h1>
            <p className="text-grey">{user.username}</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center gap-2"></div>
      </section>
      <section className="md:w-full grid grid-rows-2 grid-cols-2 max-md:grid-rows-4 gap-2 ">
        <StatisticsCard
          title="Reviews"
          description="Number of reviews you have written"
          number={user.reviews?.length || 0}
        />
        <StatisticsCard
          title="Recent reviews"
          description="List of your recent reviews"
          className="row-span-2 max-md:row-start-2 max-md:col-span-2"
        >
          <ul className="flex flex-col gap-2  rounded-md h-48 overflow-y-scroll scroll">
            {user.reviews
              ?.slice()
              .reverse()
              .map((review) => (
                <SmallReviewCard key={review.id} review={review as Review} />
              ))}
          </ul>
        </StatisticsCard>
        <StatisticsCard
          title="Burgers"
          description="Burgers eaten. If you know you know"
          number={burgersEaten as number}
        ></StatisticsCard>
      </section>
      <section className="w-full">
        <StatisticsCard
          title="Saved Destinations"
          description="List of your saved destinations"
          className="row-span-2 max-md:row-start-2 max-md:col-span-2"
        >
          <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-md overflow-y-scroll max-h-72 p-2">
            {user.favorites?.map((destination) => (
              <SmallSavedDestinationCard key={destination.id} destination={destination} />
            ))}
          </ul>
        </StatisticsCard>
      </section>
    </main>
  )
}

export default Profile
