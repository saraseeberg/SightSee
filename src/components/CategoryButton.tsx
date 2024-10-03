import { Button } from "@/components/ui/button";

type CategoryButtonProps = {
  category: string;
};

const CategoryButton: React.FC<CategoryButtonProps> = ({ category }) => {
  return (
    <Button
      className="border border-black text-black font-bold rounded-full px-4 py-2 shadow-md bg-white
    hover:bg-lightmodeGreen hover:text-white hover:border-lightmodeGreen
    active:bg-black active:text-white active:border-black"
    >
      {category}
    </Button>
  );
};

export default CategoryButton;
