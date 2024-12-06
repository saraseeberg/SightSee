import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  selected?: Date | null
  onChange?: (date: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, selected }) => {
  const [date, setDate] = React.useState<Date | undefined>(selected || undefined)

  const handleDateChange = (date: Date) => {
    setDate(date)
    if (onChange) {
      onChange(date)
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground')}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => {
            handleDateChange(date || new Date())
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
