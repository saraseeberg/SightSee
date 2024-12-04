import { Review } from '@Types/__generated__/resolvers-types'
import { Link } from 'react-router-dom'
import StarRating from '../molecules/StarRating'

const SmallReviewCard = ({ review }: { review: Partial<Review> }) => {
  return (
    <Link to={`/destination/${review.destinationid || review.destinationid}`} key={review.id}>
      <li className="flex gap-2 border-2 rounded-lg border-gray-100 p-4">
        <div className="flex flex-col justify-center items-center">
          <StarRating rating={review.rating || 0} />
        </div>
        <div className="flex flex-col ml-3">
          <span className="font-bold">{review.title}</span>
          <span className="text-sm text-gray-500">Destination: {review.destinationname}</span>
        </div>
      </li>
    </Link>
  )
}

export default SmallReviewCard
