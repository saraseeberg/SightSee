import { cn } from '@/lib/utils'
import { Destination } from '@Types/__generated__/resolvers-types'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '../ui/badge'

interface SmallDestinationCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  destination: Partial<Destination> | null
  className?: string
}

const SmallDestinationCard: FC<SmallDestinationCardProps> = ({ destination, className, ...props }) => {
  if (!destination) return null
  return (
    <Link to={`/destination/${destination.id}`} key={destination.id} className={className} {...props}>
      <li key={destination.title} className="flex items-center gap-4 p-4 border rounded-md shadow-sm">
        <img
          src={destination.image}
          alt={destination.title}
          className={cn('w-24 aspect-square object-cover rounded-md', props.draggable && 'pointer-events-none')}
        />
        <div>
          <h4 className="font-medium text-lg text-primary">{destination.title}</h4>
          <p className="text-muted-foreground mb-2">
            {destination.region}, {destination.country}
          </p>
          <div className="flex items-center gap-1">
            {destination.categories?.map((category, index) => <Badge key={index}>{category}</Badge>)}
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SmallDestinationCard
