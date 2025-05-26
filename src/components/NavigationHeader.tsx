
import { Search, Globe, BookOpen, Music } from "lucide-react";

export const NavigationHeader = () => {
  return (
    <header className="bg-white shadow-lg border-b-4 border-blue-400">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">World Whiz</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
              <Search className="h-5 w-5 text-blue-500" />
              <span className="text-gray-700">Explore</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
              <BookOpen className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Learn</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              <Music className="h-5 w-5 text-purple-500" />
              <span className="text-gray-700">Culture</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
