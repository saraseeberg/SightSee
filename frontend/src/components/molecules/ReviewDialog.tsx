import { Dialog, DialogContent } from '@/components/ui/dialog'
import ReviewCard from './ReviewCard' 

type ReviewDialogProps = {
  open: boolean
  onClose: () => void
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 rounded-lg shadow-lg">
        <ReviewCard />
      </DialogContent>
    </Dialog>
  )
}

export default ReviewDialog
