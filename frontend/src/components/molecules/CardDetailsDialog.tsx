import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Destination } from '@Types/__generated__/resolvers-types'
import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './StarRating'

type CardDetailsDialogProps = {
  selectedCard: Partial<Destination> | null
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}
const CardDetailsDialog: React.FC<CardDetailsDialogProps> = ({ selectedCard, openDialog, setOpenDialog }) => {
  if (!selectedCard) return null
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="border-none">
        <article className="flex">
          <img src={selectedCard.image} alt={selectedCard.title} className="w-48 h-64 object-cover" />
          <div className="flex flex-col gap-2 ml-4">
            <div className="flex flex-row gap-1">
              <DialogTitle className="text-xl text-content">{selectedCard.title}</DialogTitle>
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
          <Button className="flex w-full">Read more</Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

export default CardDetailsDialog
