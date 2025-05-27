
import { useState } from "react";
import { Globe } from "../components/Globe";
import { SearchBar } from "../components/SearchBar";
import { CultureCard } from "../components/CultureCard";
import { RandomFactCard } from "../components/RandomFactCard";
import { NavigationHeader } from "../components/NavigationHeader";

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <NavigationHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🌍 World Whiz
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Explore Cultures Around the World
          </p>
          <p className="text-lg text-gray-500">
            Click and drag to spin the globe • Search for countries • Discover amazing cultures!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column - Random Facts */}
          <div className="w-full lg:w-1/3">
            <RandomFactCard />
          </div>

          {/* Right Column - Globe and Search */}
          <div className="w-full lg:w-2/3 flex flex-col items-center">
            <div className="w-full max-w-md mb-6">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                onCountrySelect={setSelectedCountry}
              />
            </div>
            
            <div className="flex justify-center">
              <Globe onCountrySelect={setSelectedCountry} />
            </div>
          </div>
        </div>

        {/* Culture Card Modal/Panel */}
        {selectedCountry && (
          <CultureCard 
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
