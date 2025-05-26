
import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";

const culturalFacts = [
  {
    country: "Japan",
    flag: "🇯🇵",
    fact: "In Japan, it's considered good luck if a sumo wrestler makes your baby cry!",
    category: "Tradition"
  },
  {
    country: "India",
    flag: "🇮🇳",
    fact: "India has over 1,600 spoken languages and 22 official languages!",
    category: "Language"
  },
  {
    country: "Brazil",
    flag: "🇧🇷",
    fact: "Brazil's Carnival in Rio is the world's largest party with over 2 million people celebrating!",
    category: "Festival"
  },
  {
    country: "Kenya",
    flag: "🇰🇪",
    fact: "Kenyan runners are so fast that they hold most of the world marathon records!",
    category: "Sports"
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    fact: "Ancient Egyptians used to mummify animals too - even crocodiles and cats!",
    category: "History"
  },
  {
    country: "Norway",
    flag: "🇳🇴",
    fact: "Norway invented skiing over 4,000 years ago and has snow for 5 months a year!",
    category: "Sports"
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    fact: "In Thailand, touching someone's head is considered very rude - even children!",
    category: "Etiquette"
  },
  {
    country: "Peru",
    flag: "🇵🇪",
    fact: "Peru has over 3,000 varieties of potatoes - that's a lot of french fries!",
    category: "Food"
  }
];

export const RandomFactCard = () => {
  const [currentFact, setCurrentFact] = useState(culturalFacts[0]);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * culturalFacts.length);
    setCurrentFact(culturalFacts[randomIndex]);
  };

  useEffect(() => {
    getRandomFact();
  }, []);

  return (
    <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl p-6 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Did You Know? 🤔</h3>
        <button
          onClick={getRandomFact}
          className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          title="Get new fact"
        >
          <Shuffle className="h-5 w-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{currentFact.flag}</span>
          <div>
            <h4 className="font-bold text-lg">{currentFact.country}</h4>
            <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
              {currentFact.category}
            </span>
          </div>
        </div>
        
        <p className="text-white/95 leading-relaxed text-lg">
          {currentFact.fact}
        </p>
      </div>
    </div>
  );
};
