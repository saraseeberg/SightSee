import { Destination } from '@Types/__generated__/resolvers-types'
import { Link } from 'react-router-dom'

const SmallSavedDestinationCard = ({ destination }: { destination: Partial<Destination> }) => {
  return (
    <Link to={`/destination/${destination.id}`} key={destination.id}>
      <li className="flex gap-2 border-2 rounded-lg border-content/10 p-4 shadow-sm hover:shadow-md transition-shadow">
        {destination.image && (
          <img
            src={destination.image}
            alt={destination.title || 'Destination'}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div className="flex flex-col ml-3">
          <span className="font-medium text-lg">{destination.title || 'Untitled Destination'}</span>
          <span className="text-sm text-muted-foreground">{destination.region || 'Unknown Region'}</span>
          <span className="text-sm text-muted-foreground">{destination.country || 'Unknown Country'}</span>
        </div>
      </li>
    </Link>
  )
}

export default SmallSavedDestinationCard
