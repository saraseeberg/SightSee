import { Icon } from '@iconify/react'

type StarRatingProps = {
  rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 !== 0
  const emptyStars = Math.floor(5 - rating)

  return (
    <div className="flex items-center mb-1 mt-0">
      {/* Render full stars */}
      {[...Array(fullStars)].map((_, i) => (
        <Icon key={`full-${i}`} icon="ic:round-star" className="text-yellow-400 w-6 h-6" data-testid="full-star" />
      ))}

      {/* Render half star if necessary */}
      {hasHalfStar && <Icon icon="ic:round-star-half" className="text-yellow-400 w-6 h-6" data-testid="half-star" />}

      {/* Render empty stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <Icon
          key={`empty-${i}`}
          icon="ic:round-star-outline"
          className="text-yellow-400 w-6 h-6"
          data-testid="empty-star"
        />
      ))}
    </div>
  )
}

export default StarRating
