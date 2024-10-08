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
      className={`border border-black text-black font-bold rounded-full px-4 py-2 shadow-md bg-white
        hover:bg-lightmodeGreen hover:text-white hover:border-lightmodeGreen
        active:bg-black active:text-white active:border-black ${
          isSelected ? 'bg-lightmodeGreen text-white border-lightmodeGreen' : ''
        }`}
    >
      {category}
    </Button>
  )
}

export default CategoryButton
