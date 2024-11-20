import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { useAuth } from '@/lib/context/auth-context'
import { useAddFavoriteToUserMutation, useRemoveFavoriteFromUserMutation, useGetFavoritesByUserIdQuery } from '@types'

type SaveToggleProps = {
  destinationId: string
  onToggle?: (isSaved: boolean) => void
}

const SaveToggle: React.FC<SaveToggleProps> = ({ destinationId, onToggle }) => {
  const { user } = useAuth()
  const [isSaved, setIsSaved] = useState(false)

  const [addFavorite] = useAddFavoriteToUserMutation()
  const [removeFavorite] = useRemoveFavoriteFromUserMutation()
  const { data, loading, error } = useGetFavoritesByUserIdQuery({
    variables: { id: user?.id || '' },
    skip: !user,
  })

  useEffect(() => {
    if (data?.getFavoritesByUserID && !loading) {
      const isDestinationSaved = data.getFavoritesByUserID.some((favorite) => favorite.id === destinationId)
      setIsSaved(isDestinationSaved)
    }
  }, [data, loading, destinationId])

  const handleSaveToggle = async () => {
    if (!user) return

    const newSaveState = !isSaved

    try {
      if (newSaveState) {
        const response = await addFavorite({
          variables: { userID: user.id, destinationID: destinationId },
        })
        if (response.errors) {
          console.error('Error adding favorite:', response.errors)
          return
        }
      } else {
        const response = await removeFavorite({
          variables: { userID: user.id, destinationID: destinationId },
        })
        if (response.errors) {
          console.error('Error removing favorite:', response.errors)
          return
        }
      }

      setIsSaved(newSaveState)
      if (onToggle) {
        onToggle(newSaveState)
      }
    } catch (err) {
      console.error('Error toggling save state:', err)
    }
  }

  if (!user || loading) return null
  if (error) {
    console.error('Error fetching favorites:', error)
    return null
  }

  return (
    <Icon
      icon={isSaved ? 'ic:baseline-bookmark' : 'ic:baseline-bookmark-border'}
      className="text-content size-7 cursor-pointer"
      onClick={handleSaveToggle}
    />
  )
}

export default SaveToggle
