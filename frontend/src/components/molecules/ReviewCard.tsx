import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Review } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import StarRating from './StarRating'

type ReviewCardProps = Pick<Review, 'username' | 'rating' | 'text' | 'title'>

const ReviewCard: FC<ReviewCardProps> = ({ username, title, text, rating }) => {
  return (
    <Card className="p-4">
      <CardTitle className="flex justify-between gap-2">
        <div className="flex items-center space-x-3">
          <p className="font-semibold text-sm text-muted-foreground text-center">{username || 'Anonymous'}</p>
        </div>

        <StarRating rating={rating} />
      </CardTitle>
      <CardContent className="flex flex-col gap-2 p-0 aspect-square">
        <h2 className="text-xl font-semibold">{title}</h2>

        <ScrollArea className="h-[100px] w-full">
          <p>{text}</p>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default ReviewCard
