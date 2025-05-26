
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
    scene.background = new THREE.Color(0x000011);
    
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    
    const container = mountRef.current;
    const size = Math.min(container.clientWidth, 500);
    renderer.setSize(size, size);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Point light for rim lighting
    const pointLight = new THREE.PointLight(0x4a90e2, 0.8, 100);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // Create Earth with texture
    const earthGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Create a simple procedural Earth-like texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    // Create gradient for ocean
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#4682B4');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add simple land masses (continents approximation)
    ctx.fillStyle = '#228B22';
    // North America
    ctx.fillRect(150, 180, 200, 150);
    // South America
    ctx.fillRect(200, 330, 120, 180);
    // Europe/Asia
    ctx.fillRect(450, 150, 400, 200);
    // Africa
    ctx.fillRect(480, 250, 150, 200);
    // Australia
    ctx.fillRect(750, 380, 100, 80);
    
    // Add some texture variation
    ctx.fillStyle = '#32CD32';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const size = Math.random() * 30 + 10;
      ctx.fillRect(x, y, size, size);
    }
    
    const earthTexture = new THREE.CanvasTexture(canvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.RepeatWrapping;
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 100,
      specular: 0x111111,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    // Enhanced atmosphere with multiple layers
    const atmosphereGeometry = new THREE.SphereGeometry(2.1, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Outer glow
    const glowGeometry = new THREE.SphereGeometry(2.2, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Enhanced country markers with better positioning
    const countries = [
      { name: 'United States', lat: 39.8283, lon: -98.5795 },
      { name: 'Brazil', lat: -14.2350, lon: -51.9253 },
      { name: 'China', lat: 35.8617, lon: 104.1954 },
      { name: 'India', lat: 20.5937, lon: 78.9629 },
      { name: 'Egypt', lat: 26.0975, lon: 31.2357 },
      { name: 'Japan', lat: 36.2048, lon: 138.2529 },
      { name: 'Kenya', lat: -0.0236, lon: 37.9062 },
      { name: 'Australia', lat: -25.2744, lon: 133.7751 },
      { name: 'France', lat: 46.2276, lon: 2.2137 },
      { name: 'Germany', lat: 51.1657, lon: 10.4515 },
      { name: 'Russia', lat: 61.5240, lon: 105.3188 },
      { name: 'Canada', lat: 56.1304, lon: -106.3468 },
    ];

    // Convert lat/lon to 3D coordinates
    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    const markerGroup = new THREE.Group();
    const markers: THREE.Mesh[] = [];
    
    countries.forEach((country, index) => {
      const position = latLonToVector3(country.lat, country.lon, 2.05);
      
      // Create marker with glow effect
      const markerGeometry = new THREE.SphereGeometry(0.04, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff4444,
        transparent: true,
        opacity: 0.9,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      marker.userData = { name: country.name, index };
      
      // Add pulsing glow
      const glowGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6666,
        transparent: true,
        opacity: 0.3,
      });
      const markerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      markerGlow.position.copy(position);
      
      markerGroup.add(marker);
      markerGroup.add(markerGlow);
      markers.push(marker);
    });
    
    earth.add(markerGroup);
    camera.position.z = 5;

    // Enhanced mouse interaction
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let dragStartTime = 0;
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Mouse controls with momentum
    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      dragStartTime = Date.now();
      previousMouse = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouse.x;
        const deltaY = event.clientY - previousMouse.y;
        
        earth.rotation.y += deltaX * 0.008;
        earth.rotation.x += deltaY * 0.008;
        
        // Limit vertical rotation
        earth.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, earth.rotation.x));
        
        previousMouse = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseClick = (event: MouseEvent) => {
      const dragDuration = Date.now() - dragStartTime;
      if (isDragging || dragDuration > 200) return; // Ignore if was dragging
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(markers);
      
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        if (selectedObject.userData.name) {
          // Add click feedback
          const originalScale = selectedObject.scale.clone();
          selectedObject.scale.multiplyScalar(1.5);
          setTimeout(() => {
            selectedObject.scale.copy(originalScale);
          }, 200);
          
          onCountrySelect(selectedObject.userData.name);
        }
      }
    };

    // Touch support for mobile
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        const touch = event.touches[0];
        onMouseDown({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        const touch = event.touches[0];
        onMouseMove({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };

    const onTouchEnd = () => {
      onMouseUp();
    };

    // Event listeners
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onMouseClick);
    renderer.domElement.addEventListener('touchstart', onTouchStart);
    renderer.domElement.addEventListener('touchmove', onTouchMove);
    renderer.domElement.addEventListener('touchend', onTouchEnd);

    // Auto-rotation and marker animation
    let autoRotateSpeed = 0.005;
    let time = 0;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      if (!isDragging) {
        earth.rotation.y += autoRotateSpeed;
      }
      
      // Animate marker glow
      markerGroup.children.forEach((child, index) => {
        if (index % 2 === 1) { // Only glow elements
          const material = (child as THREE.Mesh).material as THREE.MeshBasicMaterial;
          material.opacity = 0.2 + 0.3 * Math.sin(time * 2 + index);
        }
      });
      
      // Animate atmosphere
      atmosphere.rotation.y += 0.002;
      glow.rotation.y -= 0.001;
      
      renderer.render(scene, camera);
    };
    
    setIsLoading(false);
    animate();

    // Handle window resize
    const handleResize = () => {
      const newSize = Math.min(container.clientWidth, 500);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(newSize, newSize);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('click', onMouseClick);
      renderer.domElement.removeEventListener('touchstart', onTouchStart);
      renderer.domElement.removeEventListener('touchmove', onTouchMove);
      renderer.domElement.removeEventListener('touchend', onTouchEnd);
      
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
        className="w-full max-w-lg mx-auto aspect-square rounded-full shadow-2xl overflow-hidden"
        style={{
          background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg">Loading Earth...</div>
        </div>
      )}
      <div className="text-center mt-4 text-gray-600">
        <p className="text-sm">🌍 Click and drag to rotate • Click red markers to explore countries</p>
        <p className="text-xs mt-1 text-gray-500">Touch and swipe on mobile devices</p>
      </div>
    </div>
  );
};
