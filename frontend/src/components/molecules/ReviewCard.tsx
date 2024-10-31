import { Review } from '@types'
import { FC } from 'react'
import { Card } from '../ui/card'

const ReviewCard: FC<Partial<Review>> = ({ username, title, text, rating }) => {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{text}</p>
      <p>Rating: {rating}</p>
      <p>By: {username}</p>
    </Card>
  )
}

export default ReviewCard
