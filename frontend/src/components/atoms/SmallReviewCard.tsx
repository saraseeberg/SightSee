import { Review } from '@Types/__generated__/resolvers-types'
import { Link } from 'react-router-dom'
import StarRating from '../molecules/StarRating'

const SmallReviewCard = ({ review }: { review: Partial<Review> }) => {
  return (
    <Link to={`/destination/${review.destinationid || review.destinationid}#reviews`} key={review.id}>
      <li className="flex gap-2 border-2 rounded-lg border-content/10 p-4">
        <div className="flex flex-col justify-center items-center">
          <StarRating rating={review.rating || 0} />
        </div>
        <div className="flex flex-col gap-2 ml-3">
          <span className="font-bold">{review.title}</span>
          <span className="text-sm text-muted-foreground">Destination: {review.destinationname}</span>
        </div>
      </li>
    </Link>
  )
}

export default SmallReviewCard
