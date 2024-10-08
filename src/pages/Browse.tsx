import CategoryButton, { CategoryButtonProps } from "@/components/CategoryButton";
import CountryDropdown from "@/components/CountryDropDown";
import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

type CardDataProps = {
  imagePath: string;
  title: string;
  category: string;
  country: string;
  region: string;
  description: string;
  startRating: number;
};

const categoryButtonData: Omit<
  CategoryButtonProps,
  "onClick" | "isSelected"
>[] = [
  {
    category: "Activities",
  },
  {
    category: "Entertainment",
  },
  {
    category: "Nightlife",
  },
  {
    category: "Restaurants",
  },
  {
    category: "Shopping",
  },
  {
    category: "Sights",
  },
];

const browseCardData: CardDataProps[] = [
  {
    imagePath: "../src/assets/browse/disney.jpg",
    title: "Disneyland",
    category: "Activities",
    country: "United States",
    region: "California",
    description: "A magical place for kids and adults alike",
    startRating: 3.5,
  },
  {
    imagePath: "../src/assets/browse/seven-sis.jpg",
    title: "Seven Sisters Waterfall",
    category: "Sights",
    country: "Norway",
    region: "Geiranger",
    description: "A beautiful mountain range with a stunning waterfall",
    startRating: 4.5,
  },
  {
    imagePath: "../src/assets/browse/omnia-nightclub.jpg",
    title: "Omnia Nightclub",
    category: "Nightlife",
    country: "United States",
    region: "Las Vegas",
    description: "A popular nightclub in Las Vegas",
    startRating: 4.0,
  },
  {
    imagePath: "../src/assets/browse/quattro-passi.jpg",
    title: "Quattro Passi",
    category: "Restaurants",
    country: "Italy",
    region: "Naples",
    description: "A Michelin star restaurant in Naples",
    startRating: 5.0,
  },
  {
    imagePath: "../src/assets/browse/mall-emirates.jpg",
    title: "Mall of the Emirates",
    category: "Shopping",
    country: "United Arab Emirates",
    region: "Dubai",
    description: "A large shopping mall in Dubai",
    startRating: 4.5,
  },
  {
    imagePath: "../src/assets/browse/roskilde.jpg",
    title: "Roskilde Festival",
    category: "Entertainment",
    country: "Denmark",
    region: "Roskilde",
    description: "A large music festival in Denmark",
    startRating: 4.0,
  },
];

const Browse = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("World");

  useEffect(() => {
    const storedCategories = sessionStorage.getItem("selectedCategories");
    if (storedCategories) {
      setSelectedCategories(JSON.parse(storedCategories));
    }
  }, []);

  const handleCategoryClick = (category: string) => {
    let updatedCategories: string[];
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedCategories);
    sessionStorage.setItem(
      "selectedCategories",
      JSON.stringify(updatedCategories)
    );
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const filteredCards = browseCardData.filter((card) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(card.category);
    const matchesCountry =
      selectedCountry === "World" || card.country === selectedCountry;
    return matchesCategory && matchesCountry;
  });

  return (
    <div>
      <Navbar />
      <div className="flex flex-col gap-8">
        <div className="flex w-full p-4 justify-center items-center ">
          <div className="flex flex-wrap gap-4">
            {categoryButtonData.map((item, index) => (
              <CategoryButton
                key={index}
                category={item.category}
                isSelected={selectedCategories.includes(item.category)}
                onClick={() => handleCategoryClick(item.category)}
              />
            ))}
            <CountryDropdown onSelectCountry={handleCountrySelect} />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {filteredCards.map((item, index) => (
            <Card
              key={index}
              className="rounded-lg shadow-lg overflow-hidden w-64 xl:w-80 xl:mb-6 p-0"
            >
              <CardContent className="relative p-0">
                <div className="relative">
                  <img
                    src={item.imagePath}
                    alt={item.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-2 w-full pl-2 pr-2 text-white">
                    <p className=" font-bold text-2xl shadow-2xl">
                      {item.title}
                    </p>
                    <div className="flex w-full justify-between">
                      <p className="font-bold italic text-base">
                        {item.country}, {item.region}
                      </p>
                      <div className="flex pt-0.5">
                        <Icon icon="ic:round-star" className="size-6" />
                        <p className="font-bold text-s">{item.startRating}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
