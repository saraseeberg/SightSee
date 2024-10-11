import React from 'react'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Icon } from '@iconify/react'
import { Location } from '@/lib/types/Location'

type CardDetailsDialogProps = {
  selectedCard: Location | null
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  userRating: number
  handleStarClick: (rating: number) => void
}

const CardDetailsDialog: React.FC<CardDetailsDialogProps> = ({
  selectedCard,
  openDialog,
  setOpenDialog,
  userRating,
  handleStarClick,
}) => {
  if (!selectedCard) return null

  const renderStarRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = Math.floor(5 - rating)

    return (
      <div className="flex items-center">
        {/* Render full stars */}
        {[...Array(fullStars)].map((_, i) => (
          <Icon key={`full-${i}`} icon="ic:round-star" className="text-yellow-400 size-6" />
        ))}

        {/* Render half star if necessary */}
        {hasHalfStar && <Icon icon="ic:round-star-half" className="text-yellow-400 size-6" />}

        {/* Render remaining empty stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon key={`empty-${i}`} icon="ic:round-star-outline" className="text-yellow-400 w-6 h-6" />
        ))}
      </div>
    )
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <article className="flex">
          {/* Image on the left */}
          <img src={selectedCard.image} alt={selectedCard.title} className="w-48 h-64 object-cover" />

          {/* Rating and description on the right */}
          <div className="flex flex-col gap-2 ml-4">
            <div>
              <DialogTitle className="text-xl text-content">{selectedCard.title}</DialogTitle>
              <DialogDescription className="text-base">
                {selectedCard.country}, {selectedCard.region}
              </DialogDescription>

              {/* Display current rating (with fractional stars) */}
              <p className="text-sm text-content mt-1">Current rating:</p>
              {renderStarRating(selectedCard.rating)}
            </div>

            {/* Description */}
            <p className="text-sm text-content">{selectedCard.description}</p>
          </div>
        </article>

        {/* User can rate */}
        <section aria-labelledby="rate-this-place" className="mt-4">
          <h2 id="rate-this-place" className="font-semibold text-content">
            Rate this place:
          </h2>
          <div className="flex items-center mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Icon
                key={star}
                icon={star <= userRating ? 'ic:round-star' : 'ic:round-star-outline'}
                onClick={() => handleStarClick(star)}
                className="text-yellow-400 cursor-pointer w-8 h-8 mr-1"
                aria-label={`Rate ${star} star`}
              />
            ))}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}

export default CardDetailsDialog
