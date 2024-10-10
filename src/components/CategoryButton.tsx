import { Button } from '@/components/ui/button'

export type CategoryButtonProps = {
  category: string
  onClick: () => void
  isSelected: boolean
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick, isSelected }) => {
  return (
    <Button
      onClick={onClick}
      className={`border border-content text-content font-bold rounded-full px-4 py-2 shadow-md bg-background
        hover:bg-accent-1 hover:text-white hover:border-accent-1
        active:bg-content active:text-background active:border-content ${
          isSelected ? 'bg-content text-background border-content' : ''
        }`}
    >
      {category}
    </Button>
  )
}

export default CategoryButton
