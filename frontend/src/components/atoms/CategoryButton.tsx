import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

export type CategoryButtonProps = {
  category: string
  onClick: () => void
  isSelected: boolean
  disabled?: boolean
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick, isSelected, disabled }) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background cursor-pointer hover:scale-105 duration-300 transition-all',
        isSelected
          ? 'bg-accent-1 text-white border-accent-1'
          : 'hover:bg-accent-1 hover:text-white hover:border-accent-1',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
    >
      {category}
    </Button>
  )
}

export default CategoryButton
