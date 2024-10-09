import { Card, CardContent } from '@components/ui/card'
import { Icon } from '@iconify/react'

export type CardDataProps = {
  imagePath: string
  title: string
  category: string
  country: string
  region: string
  description: string
  startRating: number
  onClick?: () => void
}

const BrowseCard: React.FC<CardDataProps> = ({ imagePath, title, country, region, startRating, onClick }) => {
  return (
    <article className="rounded-lg shadow-lg  w-64 xl:w-80 xl:mb-6" onClick={onClick}>
      <Card className="overflow-hidden p-0">
        <CardContent className="relative p-0">
          <figure className="relative">
            <img src={imagePath} alt={title} className="w-full h-96 object-cover" />
            <figcaption className="sr-only">{title}</figcaption>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
            <div className="absolute bottom-2 w-full pl-2 pr-2 text-white">
              <h3 className="font-bold text-2xl shadow-2xl">{title}</h3>
              <div className="flex w-full justify-between">
                <address className="font-bold italic text-base">
                  {country}, {region}
                </address>
                <div className="flex pt-0.5">
                  <Icon icon="ic:round-star" className="size-6" />
                  <p className="font-bold text-s">{startRating}</p>
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
