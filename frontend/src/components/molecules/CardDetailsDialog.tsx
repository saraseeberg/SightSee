import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import React from 'react'
import { Link } from 'react-router-dom'
import StarRating from './CurrentRating'
import { Button } from '@/components/ui/button'
import { Destination } from '@types'

type CardDetailsDialogProps = {
  selectedCard: Destination | null
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

const CardDetailsDialog: React.FC<CardDetailsDialogProps> = ({ selectedCard, openDialog, setOpenDialog }) => {
  if (!selectedCard) return null

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent>
        <article className="flex">
          <img src={selectedCard.image} alt={selectedCard.title} className="w-48 h-64 object-cover" />
          <div className="flex flex-col gap-2 ml-4">
            <DialogTitle className="text-xl text-content">{selectedCard.title}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedCard.country}, {selectedCard.region}
            </DialogDescription>
            <p className="text-sm text-content mt-2">Rating:</p>
            <StarRating rating={selectedCard.rating} />
            <p className="text-sm text-content">{selectedCard.description}</p>
          </div>
        </article>

        <Link to={`/review/${selectedCard.id}`}>
          <Button className="flex w-full"> Discover more here! </Button>
        </Link>
      </DialogContent>
    </Dialog>
  )
}

export default CardDetailsDialog
