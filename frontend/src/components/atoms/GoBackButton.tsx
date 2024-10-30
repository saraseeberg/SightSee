import { forwardRef } from 'react'
import { Button, ButtonProps } from '../ui/button'
import { Icon } from '@iconify/react/dist/iconify.js'
import { cn } from '@/lib/utils'

const GoBackButton = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button ref={ref} onClick={() => window.history.back()} className={cn('group', props.className)} {...props}>
      <span className="inline-flex items-center">
        <Icon icon={'tabler:arrow-back-up'} className="group-hover:-translate-x-1 duration-500" />
        Go Back
      </span>
    </Button>
  )
})

export default GoBackButton
