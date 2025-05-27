import { useEffect, useRef, useState, useCallback } from 'react';
import ReactGlobe from 'react-globe.gl';

interface GlobeProps {
  onCountrySelect: (country: string) => void;
}

interface CountryData {
  name: string;
  lat: number;
  lng: number;
  color: string;
  size: number;
}

export const Globe = ({ onCountrySelect }: GlobeProps) => {
  const globeEl = useRef<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<CountryData[]>([]);

  // Expanded country data with proper coordinates from all continents
  const countryData: CountryData[] = [
    // North America
    { name: 'United States', lat: 39.8283, lng: -98.5795, color: '#ff3333', size: 1 },
    { name: 'Canada', lat: 56.1304, lng: -106.3468, color: '#ff3333', size: 1 },
    { name: 'Mexico', lat: 23.6345, lng: -102.5528, color: '#ff3333', size: 1 },
    
    // South America
    { name: 'Brazil', lat: -14.2350, lng: -51.9253, color: '#ff3333', size: 1 },
    { name: 'Argentina', lat: -38.4161, lng: -63.6167, color: '#ff3333', size: 1 },
    { name: 'Peru', lat: -9.1900, lng: -75.0152, color: '#ff3333', size: 1 },
    { name: 'Colombia', lat: 4.5709, lng: -74.2973, color: '#ff3333', size: 1 },
    { name: 'Chile', lat: -35.6751, lng: -71.5430, color: '#ff3333', size: 1 },
    
    // Europe
    { name: 'France', lat: 46.2276, lng: 2.2137, color: '#ff3333', size: 1 },
    { name: 'Germany', lat: 51.1657, lng: 10.4515, color: '#ff3333', size: 1 },
    { name: 'Italy', lat: 41.8719, lng: 12.5674, color: '#ff3333', size: 1 },
    { name: 'Spain', lat: 40.4637, lng: -3.7492, color: '#ff3333', size: 1 },
    { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, color: '#ff3333', size: 1 },
    { name: 'Greece', lat: 39.0742, lng: 21.8243, color: '#ff3333', size: 1 },
    { name: 'Norway', lat: 60.4720, lng: 8.4689, color: '#ff3333', size: 1 },
    { name: 'Sweden', lat: 60.1282, lng: 18.6435, color: '#ff3333', size: 1 },
    { name: 'Netherlands', lat: 52.1326, lng: 5.2913, color: '#ff3333', size: 1 },
    
    // Asia
    { name: 'China', lat: 35.8617, lng: 104.1954, color: '#ff3333', size: 1 },
    { name: 'India', lat: 20.5937, lng: 78.9629, color: '#ff3333', size: 1 },
    { name: 'Japan', lat: 36.2048, lng: 138.2529, color: '#ff3333', size: 1 },
    { name: 'South Korea', lat: 35.9078, lng: 127.7669, color: '#ff3333', size: 1 },
    { name: 'Thailand', lat: 15.8700, lng: 100.9925, color: '#ff3333', size: 1 },
    { name: 'Vietnam', lat: 14.0583, lng: 108.2772, color: '#ff3333', size: 1 },
    { name: 'Indonesia', lat: -0.7893, lng: 113.9213, color: '#ff3333', size: 1 },
    { name: 'Turkey', lat: 38.9637, lng: 35.2433, color: '#ff3333', size: 1 },
    { name: 'Russia', lat: 61.5240, lng: 105.3188, color: '#ff3333', size: 1 },
    { name: 'Philippines', lat: 12.8797, lng: 121.7740, color: '#ff3333', size: 1 },
    
    // Africa
    { name: 'Egypt', lat: 26.0975, lng: 31.2357, color: '#ff3333', size: 1 },
    { name: 'Kenya', lat: -0.0236, lng: 37.9062, color: '#ff3333', size: 1 },
    { name: 'South Africa', lat: -30.5595, lng: 22.9375, color: '#ff3333', size: 1 },
    { name: 'Morocco', lat: 31.7917, lng: -7.0926, color: '#ff3333', size: 1 },
    { name: 'Nigeria', lat: 9.0820, lng: 8.6753, color: '#ff3333', size: 1 },
    { name: 'Ghana', lat: 7.9465, lng: -1.0232, color: '#ff3333', size: 1 },
    { name: 'Ethiopia', lat: 9.1450, lng: 40.4897, color: '#ff3333', size: 1 },
    
    // Oceania
    { name: 'Australia', lat: -25.2744, lng: 133.7751, color: '#ff3333', size: 1 },
    { name: 'New Zealand', lat: -40.9006, lng: 174.8860, color: '#ff3333', size: 1 },
    
    // Middle East
    { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, color: '#ff3333', size: 1 },
    { name: 'Israel', lat: 31.0461, lng: 34.8516, color: '#ff3333', size: 1 },
    { name: 'Iran', lat: 32.4279, lng: 53.6880, color: '#ff3333', size: 1 }
  ];

  useEffect(() => {
    setCountries(countryData);
    
    // Configure globe once it's ready
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.5;
      
      // Initial camera position
      globeEl.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 }, 1000);
      
      setIsLoading(false);
    }
  }, []);

  const handleCountryClick = useCallback((country: CountryData) => {
    console.log('Clicked country:', country.name);
    
    // Animate to country
    if (globeEl.current) {
      globeEl.current.pointOfView({
        lat: country.lat,
        lng: country.lng,
        altitude: 1.5
      }, 1000);
    }
    
    // Call the parent callback
    onCountrySelect(country.name);
  }, [onCountrySelect]);

  const handleGlobeReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-4xl mx-auto">
        <ReactGlobe
          ref={globeEl}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
          
          // Points data
          pointsData={countries}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.02}
          pointRadius={2}
          
          // Point interactions
          onPointClick={handleCountryClick}
          onPointHover={(country: CountryData | null) => {
            const canvas = globeEl.current?.renderer()?.domElement;
            if (canvas) {
              canvas.style.cursor = country ? 'pointer' : 'grab';
            }
          }}
          pointLabel={(d: any) => `
            <div style="
              color: white; 
              background: rgba(0,0,0,0.8); 
              padding: 8px 12px; 
              border-radius: 6px;
              font-family: Arial, sans-serif;
              font-size: 14px;
              pointer-events: none;
            ">
              🌍 ${d.name}
              <br/>
              <small style="color: #ccc;">Click to explore!</small>
            </div>
          `}
          
          // Atmosphere
          showAtmosphere={true}
          atmosphereColor="#87CEEB"
          atmosphereAltitude={0.15}
          
          // Animation
          animateIn={true}
          
          // Globe ready callback
          onGlobeReady={handleGlobeReady}
          
          // Styling - Made larger
          width={700}
          height={700}
        />
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse bg-black bg-opacity-50 px-4 py-2 rounded">
            Loading Earth...
          </div>
        </div>
      )}
      
      <div className="text-center mt-4 text-gray-600">
        <p className="text-sm">🌍 Click and drag to rotate • Click red dots to explore countries</p>
        <p className="text-xs mt-1 text-gray-500">Hover over markers for country names • {countries.length} countries to discover!</p>
      </div>
    </div>
  );
};
