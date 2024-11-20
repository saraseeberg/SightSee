import { Card, CardContent } from '@components/ui/card'
import { Icon } from '@iconify/react'
import { Destination } from '@Types/__generated__/resolvers-types'

export type CardDataProps = {
  className?: string
  card: Partial<Destination>
  onClick?: () => void
}

const BrowseCard: React.FC<CardDataProps> = ({ card, onClick, ...props }) => {
  return (
    <article
      className={`rounded-lg shadow-lg  w-64 xl:w-80 xl:mb-6 cursor-pointer hover:scale-105 transition-all duration-300 ${props.className}`}
      onClick={onClick}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="relative p-0">
          <figure className="relative">
            <img src={card.image || ''} alt={card.alt || 'Image'} className="w-full h-96 object-cover" />
            <figcaption className="sr-only">{card.title}</figcaption>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-2 w-full pl-2 pr-2 text-white">
              <h3 className="font-bold text-2xl shadow-2xl">{card.title}</h3>
              <div className="flex w-full justify-between">
                <address className="font-bold italic text-base">
                  {card.region}
                  {card.country && ','} {card.country}
                </address>
                <div className="flex pt-0.5">
                  <Icon icon="ic:round-star" className="size-6" />
                  <p className="font-bold text-s">{card.rating}</p>
                </div>
              </div>
            </div>
          </figure>
        </CardContent>
      </Card>
    </article>
  )
}

export default BrowseCard
