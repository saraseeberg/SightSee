import React, { FC } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import NumberTicker from '@/components/ui/number-ticker'

interface StatisticsCardProps {
  title: string
  description?: string
  number?: number
  children?: React.ReactNode
  className?: string
}

const StatisticsCard: FC<StatisticsCardProps> = ({ title, description, number, children, ...props }) => {
  const isZero = number === 0
  return (
    <Card className={cn((number || isZero) && 'flex max-md:flex-col items-center', props.className)}>
      <CardHeader className="md:flex-1 ">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {number || isZero ? (
        <div className={'flex-1 flex justify-center items-center text-5xl font-bold max-md:mb-3 md:mr-2'}>
          {number > 0 ? <NumberTicker value={number} /> : <p className="text-5xl font-bold">0</p>}
        </div>
      ) : (
        <CardContent>{children}</CardContent>
      )}
    </Card>
  )
}

export default StatisticsCard
