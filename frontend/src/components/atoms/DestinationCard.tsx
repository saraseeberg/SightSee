// DestinationCard.tsx
import React from 'react'

interface Destination {
  image: string
  title: string
  description: string
}

const DestinationCard: React.FC<{ destination: Destination }> = ({ destination }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md">
      <img src={destination.image} alt={destination.title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{destination.title}</h3>
        <p className="text-sm text-muted-foreground">{destination.description}</p>
      </div>
    </div>
  )
}

export default DestinationCard
