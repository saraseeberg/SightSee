import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'
import { Button } from '@/components/ui/button'
import { Destination } from '@Types/__generated__/resolvers-types'
import SaveToggle from '@/components/atoms/SaveToggle'
import { useAuth } from '@/lib/context/auth-context'

type CardDetailsDialogProps = {
  selectedCard: Partial<Destination> | null
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
  favorites: string[]
  onToggleFavorite: (destinationId: string, isSaved: boolean) => void
}
const CardDetailsDialog: React.FC<CardDetailsDialogProps> = ({
  selectedCard,
  openDialog,
  setOpenDialog,
  favorites,
  onToggleFavorite,
}) => {
  const { user } = useAuth()
  if (!selectedCard) return null

  const isFavorite = favorites.includes(selectedCard.id || '')
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <article className="flex">
          <img src={selectedCard.image} alt={selectedCard.title} className="w-48 h-64 object-cover" />
          <div className="flex flex-col gap-2 ml-4">
            <div className="flex flex-row gap-1">
              <DialogTitle className="text-xl text-content">{selectedCard.title}</DialogTitle>

              {user && selectedCard.id && (
                <SaveToggle
                  destinationId={selectedCard.id}
                  isInitiallySaved={isFavorite}
                  onToggle={(isSaved) => onToggleFavorite(selectedCard.id as string, isSaved)}
                  className="text-content size-7 hover:scale-105"
                />
              )}
            </div>
            <DialogDescription className="text-base">
              {selectedCard.region}, {selectedCard.country}
            </DialogDescription>
            <p className="text-sm text-content mt-2">Rating:</p>
            <StarRating rating={selectedCard?.rating || 0} />
            <p className="text-sm text-content">{selectedCard.description}</p>
          </div>
        </article>

        <Link to={`/destination/${selectedCard.id}`}>
          <Button className="flex w-full"> Discover more here! </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

export default CardDetailsDialog
