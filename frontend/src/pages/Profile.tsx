import StatisticsCard from '@/components/molecules/StatisticsCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Profile = () => {
  const burgersEaten = localStorage.getItem('eatenBurger') || 0
  const user = {
    name: 'Lotte',
    username: 'LotteTotten27',
    image: 'https://github.com/shadcn.png',
    reviews: [
      {
        title: 'Review 1',
        rating: 5,
      },
      {
        title: 'Review 1',
        rating: 5,
      },
    ],
  } // Change this to api call when ready
  return (
    <main className="flex flex-col items-center my-2 px-2 md:mx-[10%] gap-10 ">
      <section className="flex justify-center gap-10">
        <Avatar className="w-48 h-auto max-sm:w-24 ">
          <AvatarImage src={user.image} />
          <AvatarFallback>{user.username.slice(0, 2)}</AvatarFallback>
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
          number={user.reviews.length}
        ></StatisticsCard>
        <StatisticsCard
          title="Recent reviews"
          description="List of yout recent reviews"
          className="row-span-2 max-md:row-start-2 max-md:col-span-2"
        >
          <ul className="flex flex-col gap-2 border border-border rounded-md h-48 overflow-y-scroll scroll">
            {user.reviews.map((review) => (
              // Change with a ReviewCard component
              <li key={review.title} className="flex gap-2 border-2 border-red-500">
                <span>{review.title}</span>
                <span>{review.rating}</span>
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
