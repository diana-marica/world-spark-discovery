
import { useState, useEffect } from "react";
import { Shuffle } from "lucide-react";

const culturalFacts = [
  // Asian Countries
  {
    country: "Japan",
    flag: "🇯🇵",
    fact: "In Japan, it's considered good luck if a sumo wrestler makes your baby cry! They also have a festival called 'Crying Baby Festival' where babies are blessed by sumo wrestlers.",
    category: "Tradition"
  },
  {
    country: "India",
    flag: "🇮🇳",
    fact: "India has over 1,600 spoken languages and 22 official languages! The country also invented chess, buttons, shampoo, and the number zero.",
    category: "Language"
  },
  {
    country: "China",
    flag: "🇨🇳",
    fact: "China has a social credit system and also invented ice cream, toilet paper, and fireworks! The Great Wall took over 2,000 years to build and is NOT visible from space.",
    category: "History"
  },
  {
    country: "South Korea",
    flag: "🇰🇷",
    fact: "In South Korea, people add a year to their age on New Year's Day, not their birthday! They also have the fastest internet in the world.",
    category: "Culture"
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    fact: "In Thailand, touching someone's head is considered very rude - even children! The country also has a festival where monkeys are invited to eat at a buffet.",
    category: "Etiquette"
  },
  {
    country: "Vietnam",
    flag: "🇻🇳",
    fact: "Vietnam is the world's largest producer of cashew nuts and black pepper! They also have a unique coffee made from beans eaten and excreted by weasels.",
    category: "Food"
  },
  {
    country: "Indonesia",
    flag: "🇮🇩",
    fact: "Indonesia is made up of over 17,000 islands and has more than 300 ethnic groups! It's also home to the world's largest flower, which can grow up to 3 feet across.",
    category: "Geography"
  },
  {
    country: "Philippines",
    flag: "🇵🇭",
    fact: "The Philippines has over 7,000 islands and Filipinos invented the karaoke machine! They also text more than any other country in the world.",
    category: "Technology"
  },

  // European Countries
  {
    country: "France",
    flag: "🇫🇷",
    fact: "France has more time zones than any other country (12 total)! They also made it illegal to throw away food, and the Eiffel Tower grows 6 inches taller in summer.",
    category: "Geography"
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    fact: "Germany has over 1,500 breweries and 5,000 types of beer! They also invented the printing press, automobile, and MP3 format.",
    category: "Innovation"
  },
  {
    country: "Italy",
    flag: "🇮🇹",
    fact: "Italy has more UNESCO World Heritage sites than any other country (58 total)! They also invented pizza, gelato, and the piano.",
    category: "Culture"
  },
  {
    country: "Spain",
    flag: "🇪🇸",
    fact: "Spain has a tomato-throwing festival called La Tomatina where people throw 150,000 tomatoes at each other! They also invented the mop and the lollipop.",
    category: "Festival"
  },
  {
    country: "Greece",
    flag: "🇬🇷",
    fact: "Greece has more archaeological museums than any other country! They invented democracy, the Olympics, and theater as we know it today.",
    category: "History"
  },
  {
    country: "Norway",
    flag: "🇳🇴",
    fact: "Norway invented skiing over 4,000 years ago and has snow for 5 months a year! They also have midnight sun in summer and invented the cheese slicer.",
    category: "Sports"
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    fact: "The UK has no official national language! They also invented the World Wide Web, television, and the sandwich. Big Ben actually refers to the bell, not the clock tower.",
    category: "Innovation"
  },
  {
    country: "Netherlands",
    flag: "🇳🇱",
    fact: "The Netherlands has more bikes than residents and is the flattest country in Europe! They also invented WiFi, Bluetooth, and the stock market.",
    category: "Technology"
  },
  {
    country: "Sweden",
    flag: "🇸🇪",
    fact: "Sweden recycles so well that they import garbage from other countries to power their energy plants! They also invented the zipper, GPS, and Skype.",
    category: "Environment"
  },

  // American Countries
  {
    country: "Brazil",
    flag: "🇧🇷",
    fact: "Brazil's Carnival in Rio is the world's largest party with over 2 million people celebrating! The country also has more animal species than any other country.",
    category: "Festival"
  },
  {
    country: "United States",
    flag: "🇺🇸",
    fact: "The US has no official national language and Alaska has more coastline than all other US states combined! They also invented the internet, airplane, and light bulb.",
    category: "Geography"
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    fact: "Canada has more lakes than the rest of the world combined and produces 77% of the world's maple syrup! They also invented basketball and the telephone.",
    category: "Geography"
  },
  {
    country: "Mexico",
    flag: "🇲🇽",
    fact: "Mexico gave the world chocolate, vanilla, and chili peppers! They also have 68 indigenous languages and invented color television.",
    category: "Food"
  },
  {
    country: "Argentina",
    flag: "🇦🇷",
    fact: "Argentina has the highest consumption of red meat per person in the world! They also invented the ballpoint pen and have the widest avenue in the world.",
    category: "Food"
  },
  {
    country: "Peru",
    flag: "🇵🇪",
    fact: "Peru has over 3,000 varieties of potatoes - that's a lot of french fries! They also gave the world quinoa and have floating islands made of reeds.",
    category: "Food"
  },
  {
    country: "Chile",
    flag: "🇨🇱",
    fact: "Chile is 4,300 km long but only 180 km wide on average! They also have the world's driest desert and produce 38% of the world's copper.",
    category: "Geography"
  },
  {
    country: "Colombia",
    flag: "🇨🇴",
    fact: "Colombia is the world's leading producer of emeralds and has more bird species than any other country! They also gave the world coffee culture.",
    category: "Nature"
  },

  // African Countries
  {
    country: "Kenya",
    flag: "🇰🇪",
    fact: "Kenyan runners are so fast that they hold most of the world marathon records! The country is also home to the Great Migration, one of nature's greatest spectacles.",
    category: "Sports"
  },
  {
    country: "Egypt",
    flag: "🇪🇬",
    fact: "Ancient Egyptians used to mummify animals too - even crocodiles and cats! They also invented paper, the 365-day calendar, and toothpaste.",
    category: "History"
  },
  {
    country: "South Africa",
    flag: "🇿🇦",
    fact: "South Africa has 11 official languages and is the only country to voluntarily dismantle its nuclear weapons program! They also have the deepest hand-dug hole on Earth.",
    category: "Language"
  },
  {
    country: "Morocco",
    flag: "🇲🇦",
    fact: "Morocco has the world's oldest university (founded in 859 AD) and leather goods have been made there for over 1,000 years! The country also grows 40% of the world's argan oil.",
    category: "Education"
  },
  {
    country: "Nigeria",
    flag: "🇳🇬",
    fact: "Nigeria has more than 250 ethnic groups and is Africa's most populous country! They also have the largest film industry in Africa, called Nollywood.",
    category: "Culture"
  },
  {
    country: "Ghana",
    flag: "🇬🇭",
    fact: "Ghana was the first African country to gain independence and is the world's second-largest producer of cocoa! They also have a lake that was entirely man-made.",
    category: "History"
  },
  {
    country: "Ethiopia",
    flag: "🇪🇹",
    fact: "Ethiopia follows a 13-month calendar and is 7 years behind the rest of the world! They also never used foreign currency and are the birthplace of coffee.",
    category: "Time"
  },

  // Oceanian Countries
  {
    country: "Australia",
    flag: "🇦🇺",
    fact: "Australia is the only country that's also a continent and has more deadly animals per square mile than anywhere else! They also invented the boomerang and WiFi technology.",
    category: "Geography"
  },
  {
    country: "New Zealand",
    flag: "🇳🇿",
    fact: "New Zealand has more sheep than people (5 to 1 ratio) and was the first country to give women the right to vote! They also filmed all the Lord of the Rings movies there.",
    category: "Rights"
  },

  // Middle Eastern Countries
  {
    country: "Turkey",
    flag: "🇹🇷",
    fact: "Turkey straddles two continents (Europe and Asia) and gave the world tulips, coffee culture, and Turkish baths! They also have an underground city that housed 20,000 people.",
    category: "Geography"
  },
  {
    country: "Saudi Arabia",
    flag: "🇸🇦",
    fact: "Saudi Arabia has no rivers and imports sand despite being mostly desert! They also have the world's largest continuous sand desert and recently allowed women to drive.",
    category: "Geography"
  },
  {
    country: "Israel",
    flag: "🇮🇱",
    fact: "Israel has more museums per capita than any other country and made the desert bloom with innovative irrigation! They also invented the USB flash drive.",
    category: "Innovation"
  },
  {
    country: "Iran",
    flag: "🇮🇷",
    fact: "Iran invented ice cream, windmills, and chess! The country also has the world's largest hand-woven carpet and is home to one of the oldest civilizations on Earth.",
    category: "History"
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
        
        <p className="text-white/95 leading-relaxed text-base">
          {currentFact.fact}
        </p>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-white/70">
          {culturalFacts.length} amazing facts to discover!
        </p>
      </div>
    </div>
  );
};
