import { Review } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Card, CardContent, CardTitle, CardDescription } from '../ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import StarRating from './StarRating'

const ReviewCard: FC<Partial<Review>> = ({ username, title, text, rating }) => {
  return (
    <div className="flex items-center justify-center">
      <Card className="max-w-xs h-80 w-full pt-2 overflow-y-auto rounded-lg shadow-lg flex flex-col pl-6 space-y-2">
        {/* Profile Picture and Username */}
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://github.com/shadcn.png" alt={`${username}'s profile picture`} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm text-center">{username || 'Anonymous'}</p>
        </div>

        {/* Rating */}
        <CardContent className="flex flex-col space-y-3">
          <StarRating rating={rating ?? 0} />

          {/* Review Title and Text */}
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription className="text-gray-600">{text}</CardDescription>
        </CardContent>
      </Card>
    </div>
  )
}

export default ReviewCard
