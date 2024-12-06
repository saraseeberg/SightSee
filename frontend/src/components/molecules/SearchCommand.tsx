import { Command, CommandEmpty, CommandInput, CommandList } from '@/components/ui/command'
import { cn } from '@/lib/utils'
import { FC, useEffect, useState } from 'react'

interface SearchCommandProps {
  className?: string
  placeholder?: string
  children?: React.ReactNode
  value?: string
  defaultValue?: string
}

const SearchCommand: FC<SearchCommandProps> = ({ ...props }) => {
  const [hide, setHide] = useState<boolean>(props.defaultValue ? true : true)
  const [value, setValue] = useState<string | undefined>(props.defaultValue)

  useEffect(() => {
    setValue(props.defaultValue)
    setHide(true)
  }, [props.defaultValue])
  return (
    <Command className={cn('rounded-lg border shadow-md md:min-w-[450px]', props.className)}>
      <CommandInput
        onClick={() => {
          setHide(false)
          setValue(undefined)
        }}
        onValueChange={(val) => {
          setValue(val)
        }}
        placeholder={props.placeholder}
        value={value}
      />
      <CommandList className={cn(hide && 'hidden')}>
        <CommandEmpty>No results found.</CommandEmpty>
        {props.children}
      </CommandList>
    </Command>
  )
}

export default SearchCommand
