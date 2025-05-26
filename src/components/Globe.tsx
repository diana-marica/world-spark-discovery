
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface GlobeProps {
  onCountrySelect: (country: string) => void;
}

export const Globe = ({ onCountrySelect }: GlobeProps) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    const container = mountRef.current;
    const size = Math.min(container.clientWidth, 500);
    renderer.setSize(size, size);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2E8B57,
      shininess: 30,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.3,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Create country markers (simplified dots for now)
    const countries = [
      { name: 'United States', position: new THREE.Vector3(1.5, 0.8, 1.2) },
      { name: 'Brazil', position: new THREE.Vector3(1.2, -0.5, 1.8) },
      { name: 'China', position: new THREE.Vector3(-1.2, 0.6, 1.5) },
      { name: 'India', position: new THREE.Vector3(-1.0, 0.2, 1.7) },
      { name: 'Egypt', position: new THREE.Vector3(-0.3, 0.4, 1.9) },
      { name: 'Japan', position: new THREE.Vector3(-1.8, 0.7, 0.8) },
      { name: 'Kenya', position: new THREE.Vector3(-0.5, -0.1, 1.9) },
      { name: 'Australia', position: new THREE.Vector3(-1.2, -1.2, 1.2) },
    ];

    const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff6b6b });
    
    countries.forEach(country => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(country.position);
      marker.userData = { name: country.name };
      earth.add(marker);
    });

    camera.position.z = 5;

    // Mouse interaction
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse controls
    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMouse = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouse.x;
        const deltaY = event.clientY - previousMouse.y;
        
        earth.rotation.y += deltaX * 0.01;
        earth.rotation.x += deltaY * 0.01;
        
        previousMouse = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseClick = (event: MouseEvent) => {
      if (isDragging) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(earth.children);
      
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        if (selectedObject.userData.name) {
          onCountrySelect(selectedObject.userData.name);
        }
      }
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onMouseClick);

    // Auto-rotation when not interacting
    let autoRotateSpeed = 0.01;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (!isDragging) {
        earth.rotation.y += autoRotateSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    setIsLoading(false);
    animate();

    // Cleanup
    return () => {
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('click', onMouseClick);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onCountrySelect]);

  return (
    <div className="relative">
      <div 
        ref={mountRef} 
        className="w-full max-w-lg mx-auto aspect-square rounded-full shadow-2xl overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600"
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">Loading Globe...</div>
        </div>
      )}
      <div className="text-center mt-4 text-gray-600">
        <p className="text-sm">🖱️ Click and drag to rotate • Click red dots to explore countries</p>
      </div>
    </div>
  );
};
