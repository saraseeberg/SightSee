import { FC } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import NumberTicker from '../ui/number-ticker'

interface StatisticsCardProps {
  title: string
  description?: string
  number?: number
  children?: React.ReactNode
  className?: string
}

const StatisticsCard: FC<StatisticsCardProps> = ({ title, description, number, children, ...props }) => {
  return (
    <Card className={cn('', number && 'flex max-md:flex-col items-center', props.className)}>
      <CardHeader className="md:flex-1 ">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {number ? (
        <div className={cn(number && 'flex-1 flex justify-center items-center text-5xl font-bold max-md:mb-3 md:mr-2')}>
          <NumberTicker value={number} />
        </div>
      ) : (
        <CardContent>{children}</CardContent>
      )}
    </Card>
  )
}

export default StatisticsCard
