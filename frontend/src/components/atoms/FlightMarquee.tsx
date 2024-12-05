import Marquee from '@/components/ui/marquee'
import { Icon } from '@iconify/react'

const flights = Array.from({ length: 8 }, (_, i) => ({ id: i + 1 }))

export function FlightMarquee() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      <Marquee reverse className="[--duration:15s]">
        {flights.map((flight) => (
          <Icon key={flight.id} icon="fa-solid:plane" className="text-background text-7xl mx-4" />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-accent-1"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-accent-1"></div>
    </div>
  )
}
