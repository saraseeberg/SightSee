import { Icon } from '@iconify/react'
import StarRating from './molecules/CurrentRating'

type ReviewProps = {
  userRating: number
  handleStarClick: (rating: number) => void
}

const StarReview: React.FC<ReviewProps> = ({ userRating, handleStarClick }) => {
  return (
    <>
      {/* User can rate */}
      <section aria-labelledby="rate-this-place">
        <StarRating rating={userRating} />
        <h2 id="rate-this-place" className="font-semibold text-content">
          Rate this place:
        </h2>
        <div className="flex items-start mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Icon
              key={star}
              icon={star <= userRating ? 'ic:round-star' : 'ic:round-star-outline'}
              onClick={() => handleStarClick(star)}
              className="text-yellow-400 cursor-pointer w-10 h-10 mr-1"
              aria-label={`Rate ${star} star`}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default StarReview
