import { Button } from '@/components/ui/button'

export type CategoryButtonProps = {
  category: string
  onClick: () => void
  isSelected: boolean
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick, isSelected }) => {
  return (
    <Button
      variant={'ghost'}
      onClick={onClick}
      className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background cursor-pointer
        hover:scale-105 duration-300 transition-all
        active:bg-content active:text-background active:border-content ${
          isSelected ? 'bg-accent-1 text-white border-accent-1' : ''
        }`}
    >
      {category}
    </Button>
  )
}

export default CategoryButton
