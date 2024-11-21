import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useAuth } from '@/lib/context/auth-context'
import { useAddFavoriteToUserMutation, useRemoveFavoriteFromUserMutation } from '@types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

type SaveToggleProps = {
  destinationId: string
  onToggle?: (isSaved: boolean) => void
  isInitiallySaved: boolean
  className?: string
}

const SaveToggle: React.FC<SaveToggleProps> = ({ destinationId, isInitiallySaved, onToggle, className }) => {
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(isInitiallySaved)

  const [addFavorite] = useAddFavoriteToUserMutation()
  const [removeFavorite] = useRemoveFavoriteFromUserMutation()

  useEffect(() => {
    setIsSaved(isInitiallySaved)
  }, [isInitiallySaved])

  const handleSaveToggle = async () => {
    if (!user) return

    const newSaveState = !isSaved

    try {
      if (newSaveState) {
        await addFavorite({ variables: { userID: user.id, destinationID: destinationId } })
      } else {
        await removeFavorite({ variables: { userID: user.id, destinationID: destinationId } })
      }

      setIsSaved(newSaveState)
      if (onToggle) onToggle(newSaveState)
    } catch (error) {
      console.error('Error toggling save state:', error)
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Icon
            icon={isSaved ? 'ic:baseline-bookmark' : 'ic:baseline-bookmark-border'}
            className={`cursor-pointer ${className}`}
            onClick={handleSaveToggle}
          />
        </TooltipTrigger>
        <TooltipContent className="text-background bg-content text-sm pl-2 pr-2 rounded-md">
          {isSaved ? 'Remove from saved destinations' : 'Save this destination'}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default SaveToggle
