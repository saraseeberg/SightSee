import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

const countries = [
  "World",
  "United States",
  "France",
  "Greece",
  "Italy",
  "Spain",
  "United Kingdom",
  "United Arab Emirates",
  "Denmark",
];

type CountryDropdownProps = {
  onSelectCountry: (country: string) => void;
};

const CountryDropdown: React.FC<CountryDropdownProps> = ({ onSelectCountry }) => {
  const [selectedCountry, setSelectedCountry] = React.useState("World");

  const handleSelect = (country: string) => {
    setSelectedCountry(country);
    onSelectCountry(country);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border border-black text-black font-bold rounded-full px-4 py-2 shadow-md bg-white hover:bg-lightmodeGreen hover:text-white hover:border-lightmodeGreen"
        >
          {selectedCountry} <Icon icon="iconamoon:arrow-down-2-light" width="24" height="24" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="rounded-lg border p-2 shadow-lg">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country}
            onSelect={() => handleSelect(country)}
            className={`cursor-pointer p-2 hover:bg-lightmodeGreen hover:text-white ${
              selectedCountry === country ? "bg-lightmodeGreen text-white" : ""
            }`}
          >
            {country}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CountryDropdown;
