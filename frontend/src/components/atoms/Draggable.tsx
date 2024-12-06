import { cn } from '@/lib/utils'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'

interface DraggableProps {
  className?: string
  children: React.ReactNode
}

export const Draggable: FC<DraggableProps> = ({ children, className }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'draggable',
    item: children,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))
  return (
    <div ref={drag} className={cn('z-20', isDragging && 'opacity-50', className)}>
      {children}
    </div>
  )
}
