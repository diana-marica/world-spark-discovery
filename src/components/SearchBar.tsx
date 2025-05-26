
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onCountrySelect: (country: string) => void;
}

const countries = [
  'United States', 'Brazil', 'China', 'India', 'Egypt', 'Japan', 'Kenya', 'Australia',
  'France', 'Germany', 'Italy', 'Spain', 'Mexico', 'Canada', 'Russia', 'Thailand',
  'South Korea', 'Nigeria', 'Argentina', 'Peru', 'Morocco', 'Turkey', 'Greece', 'Norway'
];

export const SearchBar = ({ value, onChange, onCountrySelect }: SearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.trim()) {
      const filtered = countries.filter(country =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredCountries([]);
      setIsOpen(false);
    }
  }, [value]);

  const handleCountrySelect = (country: string) => {
    onChange(country);
    onCountrySelect(country);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  return (
    <div className="relative max-w-md mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for a country or culture..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(filteredCountries.length > 0)}
          className="w-full pl-10 pr-4 py-3 text-lg border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all duration-200"
        />
      </div>
      
      {isOpen && filteredCountries.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
          {filteredCountries.map((country, index) => (
            <button
              key={index}
              onClick={() => handleCountrySelect(country)}
              className="w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="text-gray-800 font-medium">{country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
