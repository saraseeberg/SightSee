import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Review } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardTitle } from '../ui/card'
import StarRating from './StarRating'

type ReviewCardProps = Partial<Review>

const ReviewCard: FC<ReviewCardProps> = ({ username, user_avatar, title, text, rating }) => {
  return (
    <Card className="p-4 flex flex-col gap-4">
      <CardTitle className="flex flex-col justify-between gap-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user_avatar ?? undefined} />
            <AvatarFallback>{username?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <p className="font-semibold text-sm text-muted-foreground text-center">{username || 'Anonymous'}</p>
        </div>
        <div className="mt-2">
          <StarRating rating={rating ?? 0} />
        </div>
      </CardTitle>
      <CardContent className="flex flex-col gap-2 p-0 aspect-square">
        <h2 className="text-xl font-semibold">{title}</h2>

        <ScrollArea className="h-[100px] w-full">
          <p className="text-muted-foreground">{text}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
