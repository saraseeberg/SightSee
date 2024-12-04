import { FC } from 'react'

interface StatisticTextProps {
  number: string
  title: string
  description: string
}

const StatisticText: FC<StatisticTextProps> = ({ number, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 w-64">
      {/* Dynamic Number */}
      <h1 className="text-5xl font-bold text-white">{number}</h1>
      {/* Dynamic Title */}
      <h2 className="text-lg font-semibold text-white/75 mt-2">{title}</h2>
      {/* Dynamic Description */}
      <p className="text-sm text-white/75 mt-2">{description}</p>
    </div>
  )
}

export default StatisticText
