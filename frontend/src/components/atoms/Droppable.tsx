import { cn } from '@/lib/utils'
import { Destination } from '@Types/__generated__/resolvers-types'
import { Plus } from 'lucide-react'
import { FC, isValidElement, ReactNode, useState } from 'react'
import { useDrop } from 'react-dnd'

interface DroppableProps {
  defaultValue?: ReactNode | undefined
  getItem?: (item: Destination) => void
}

const Droppable: FC<DroppableProps> = ({ defaultValue, getItem }) => {
  const [val, setVal] = useState<ReactNode | undefined>(defaultValue)
  const [{ isOver }, drop] = useDrop({
    accept: 'draggable',
    drop: (item: ReactNode) => addItem(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  })

  const addItem = (item: ReactNode) => {
    console.log(item)
    setVal(item)

    if (isValidElement(item)) {
      console.log('item:', item)
      const destination = item.props.destination as Destination
      if (getItem) getItem(destination)
    }
  }
  return val ? (
    <span className={cn('flex gap-2 items-center', isOver && 'opacity-30')} ref={drop}>
      <div>{val}</div>
    </span>
  ) : (
    <div
      ref={drop}
      className={cn(
        'bg-muted-foreground/20 rounded-lg w-1/3 h-[100px] flex text-grey justify-center items-center',
        isOver && 'bg-muted-foreground/40',
      )}
    >
      <Plus />
      <p>Drop here</p>
    </div>
  )
}

export default Droppable
