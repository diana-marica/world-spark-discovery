
interface CultureCardProps {
  country: string;
  onClose: () => void;
}

const countryData: Record<string, any> = {
  "United States": {
    flag: "🇺🇸",
    greeting: "Hello!",
    language: "English",
    foods: ["Hamburgers", "Apple Pie", "BBQ"],
    festivals: ["Independence Day", "Thanksgiving"],
    music: "Jazz, Country, Hip-Hop",
    facts: ["Home to Hollywood", "Has 50 states", "Invented the internet"],
    colors: "from-red-400 to-blue-400"
  },
  "Japan": {
    flag: "🇯🇵",
    greeting: "Konnichiwa! (こんにちは)",
    language: "Japanese",
    foods: ["Sushi", "Ramen", "Tempura"],
    festivals: ["Cherry Blossom Festival", "Golden Week"],
    music: "Traditional Koto, J-Pop",
    facts: ["Land of the Rising Sun", "Has bullet trains", "Invented karaoke"],
    colors: "from-pink-400 to-red-400"
  },
  "Brazil": {
    flag: "🇧🇷",
    greeting: "Olá!",
    language: "Portuguese",
    foods: ["Feijoada", "Açaí", "Pão de Açúcar"],
    festivals: ["Carnival", "Festa Junina"],
    music: "Samba, Bossa Nova",
    facts: ["Largest country in South America", "Amazon rainforest", "Football is life!"],
    colors: "from-green-400 to-yellow-400"
  },
  "India": {
    flag: "🇮🇳",
    greeting: "Namaste! (नमस्ते)",
    language: "Hindi, English + 20 others",
    foods: ["Curry", "Biryani", "Naan"],
    festivals: ["Diwali", "Holi", "Eid"],
    music: "Classical Ragas, Bollywood",
    facts: ["Birthplace of yoga", "Most diverse country", "Home to Taj Mahal"],
    colors: "from-orange-400 to-green-400"
  },
  "China": {
    flag: "🇨🇳",
    greeting: "Nǐ hǎo! (你好)",
    language: "Mandarin Chinese",
    foods: ["Dumplings", "Peking Duck", "Hot Pot"],
    festivals: ["Chinese New Year", "Mid-Autumn Festival"],
    music: "Traditional Guzheng, Opera",
    facts: ["Great Wall of China", "Invented paper", "Panda bears!"],
    colors: "from-red-400 to-yellow-400"
  }
};

export const CultureCard = ({ country, onClose }: CultureCardProps) => {
  const data = countryData[country] || {
    flag: "🌍",
    greeting: "Hello!",
    language: "Local Language",
    foods: ["Local cuisine"],
    festivals: ["Traditional celebrations"],
    music: "Traditional music",
    facts: ["Rich cultural heritage"],
    colors: "from-blue-400 to-purple-400"
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-gradient-to-br ${data.colors} rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto text-white shadow-2xl`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-5xl">{data.flag}</span>
            <h2 className="text-3xl font-bold">{country}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">👋 Say Hello</h3>
              <p className="text-lg">{data.greeting}</p>
              <p className="text-sm opacity-90">Language: {data.language}</p>
            </div>

            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🍽️ Popular Foods</h3>
              <ul className="space-y-1">
                {data.foods.map((food: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>•</span>
                    <span>{food}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🎵 Music</h3>
              <p>{data.music}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">🎉 Festivals</h3>
              <ul className="space-y-1">
                {data.festivals.map((festival: string, index: number) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>•</span>
                    <span>{festival}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">✨ Fun Facts</h3>
              <ul className="space-y-2">
                {data.facts.map((fact: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-yellow-300">★</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Explore More Countries 🌍
          </button>
        </div>
      </div>
    </div>
  );
};
