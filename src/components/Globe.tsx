
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

  // Country data with proper coordinates
  const countryData: CountryData[] = [
    { name: 'United States', lat: 39.8283, lng: -98.5795, color: '#ff3333', size: 1 },
    { name: 'Brazil', lat: -14.2350, lng: -51.9253, color: '#ff3333', size: 1 },
    { name: 'China', lat: 35.8617, lng: 104.1954, color: '#ff3333', size: 1 },
    { name: 'India', lat: 20.5937, lng: 78.9629, color: '#ff3333', size: 1 },
    { name: 'Egypt', lat: 26.0975, lng: 31.2357, color: '#ff3333', size: 1 },
    { name: 'Japan', lat: 36.2048, lng: 138.2529, color: '#ff3333', size: 1 },
    { name: 'Kenya', lat: -0.0236, lng: 37.9062, color: '#ff3333', size: 1 },
    { name: 'Australia', lat: -25.2744, lng: 133.7751, color: '#ff3333', size: 1 },
    { name: 'France', lat: 46.2276, lng: 2.2137, color: '#ff3333', size: 1 },
    { name: 'Germany', lat: 51.1657, lng: 10.4515, color: '#ff3333', size: 1 },
    { name: 'Russia', lat: 61.5240, lng: 105.3188, color: '#ff3333', size: 1 },
    { name: 'Canada', lat: 56.1304, lng: -106.3468, color: '#ff3333', size: 1 },
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
    <div className="relative">
      <div className="w-full max-w-lg mx-auto aspect-square">
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
          pointRadius={1.2}
          
          // Point interactions
          onPointClick={handleCountryClick}
          onPointHover={(country: CountryData | null) => {
            // Access the canvas element through the renderer
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
          
          // Styling
          width={500}
          height={500}
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
        <p className="text-xs mt-1 text-gray-500">Hover over markers for country names</p>
      </div>
    </div>
  );
};
