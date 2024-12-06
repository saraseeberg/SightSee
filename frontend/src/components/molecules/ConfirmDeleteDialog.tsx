import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Icon } from '@iconify/react'
import { ReactNode } from 'react'

interface ConfirmDeleteDialogProps {
  onConfirm: () => void
  triggerElement?: ReactNode
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  tooltipText?: string
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  onConfirm,
  triggerElement,
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete your review.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  tooltipText = 'Delete review',
}) => {
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              {triggerElement || (
                <button className="rounded-full p-1 ml-auto" aria-label="Delete review">
                  <Icon
                    icon="material-symbols:delete-outline"
                    aria-label="delete review"
                    className="text-content size-6 hover:text-red-500"
                  />
                </button>
              )}
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="text-primary bg-background shadow-md text-sm px-2 rounded-md">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-primary">{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary-foreground text-primary">{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{confirmText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDeleteDialog
