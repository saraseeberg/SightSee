import StatisticsCard from '@/components/molecules/StatisticsCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/context/auth-context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetReviewsByUserIdQuery } from '@types'

const Profile = () => {
  const navigate = useNavigate()
  const burgersEaten = localStorage.getItem('eatenBurger') || 0
  const { user } = useAuth()
  const { data } = useGetReviewsByUserIdQuery({
    variables: { id: user?.id as string },
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) return null

  return (
    <main className="flex flex-col items-center my-2 px-2 md:mx-[10%] gap-10 ">
      <section className="flex justify-center gap-10">
        <Avatar className="size-48 max-sm:size-24 ">
          <AvatarImage src={'This'} />
          <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col justify-center ">
          <h1 className="text-3xl">{user.name}</h1>
          <p className="text-grey">{user.username}</p>
        </div>
      </section>
      <section className="md:w-full grid grid-rows-2 grid-cols-2 max-md:grid-rows-4 gap-2 ">
        <StatisticsCard
          title="Reviews"
          description="Number of reviews you have written"
          number={user.reviews?.length || 0}
        />
        <StatisticsCard
          title="Recent reviews"
          description="List of yout recent reviews"
          className="row-span-2 max-md:row-start-2 max-md:col-span-2"
        >
          <ul className="flex flex-col gap-2 border border-border rounded-md h-48 overflow-y-scroll scroll">
            {data?.getReviewsByUserID?.map((review) => (
              // Change with a ReviewCard component
              <li key={review.title} className="flex gap-2 border-2 border-red-500">
                <span>{review.title}</span>
                <span>{review.rating}</span>
                <span>{review.text}</span>
              </li>
            ))}
          </ul>
        </StatisticsCard>
        <StatisticsCard
          title="Burgers"
          description="Burgers eaten. If you know you know"
          number={burgersEaten as number}
        ></StatisticsCard>
      </section>
    </main>
  )
}

export default Profile
