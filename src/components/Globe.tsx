
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
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 3, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x4a90e2, 0.8, 100);
    pointLight.position.set(-5, 0, 5);
    scene.add(pointLight);

    // Create realistic Earth texture
    const earthGeometry = new THREE.SphereGeometry(2, 128, 128);
    
    const canvas = document.createElement('canvas');
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    
    // Ocean background with depth
    const oceanGradient = ctx.createRadialGradient(1024, 512, 0, 1024, 512, 1024);
    oceanGradient.addColorStop(0, '#1e3a8a');
    oceanGradient.addColorStop(0.5, '#1e40af');
    oceanGradient.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 2048, 1024);

    // More accurate continent shapes
    ctx.fillStyle = '#22c55e';
    
    // North America
    ctx.beginPath();
    ctx.moveTo(150, 200);
    ctx.quadraticCurveTo(200, 180, 280, 200);
    ctx.quadraticCurveTo(350, 220, 380, 280);
    ctx.quadraticCurveTo(300, 320, 250, 300);
    ctx.quadraticCurveTo(180, 290, 150, 250);
    ctx.closePath();
    ctx.fill();

    // Greenland
    ctx.fillRect(280, 120, 60, 40);

    // South America
    ctx.beginPath();
    ctx.moveTo(280, 350);
    ctx.quadraticCurveTo(320, 340, 340, 380);
    ctx.quadraticCurveTo(350, 450, 330, 520);
    ctx.quadraticCurveTo(310, 480, 290, 460);
    ctx.quadraticCurveTo(270, 420, 270, 380);
    ctx.closePath();
    ctx.fill();

    // Europe
    ctx.fillRect(480, 180, 120, 80);
    ctx.fillRect(520, 160, 60, 40);

    // Asia
    ctx.fillRect(600, 160, 300, 140);
    ctx.fillRect(750, 200, 200, 100);
    ctx.fillRect(900, 180, 150, 120);

    // Africa
    ctx.beginPath();
    ctx.moveTo(480, 280);
    ctx.quadraticCurveTo(520, 270, 560, 290);
    ctx.quadraticCurveTo(580, 350, 570, 420);
    ctx.quadraticCurveTo(540, 480, 500, 470);
    ctx.quadraticCurveTo(470, 430, 460, 380);
    ctx.quadraticCurveTo(470, 320, 480, 280);
    ctx.closePath();
    ctx.fill();

    // Australia
    ctx.fillRect(850, 450, 120, 60);

    // Antarctica (bottom)
    ctx.fillRect(0, 480, 2048, 80);

    // Add mountain ranges and islands
    ctx.fillStyle = '#16a34a';
    
    // Andes mountains
    ctx.fillRect(270, 350, 15, 170);
    
    // Himalayas
    ctx.fillRect(700, 220, 100, 20);
    
    // Various islands
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 2048;
      const y = Math.random() * 1024;
      const size = Math.random() * 15 + 5;
      ctx.fillRect(x, y, size, size/2);
    }

    // Add ice caps
    ctx.fillStyle = '#f0f9ff';
    ctx.fillRect(0, 0, 2048, 40); // North pole
    ctx.fillRect(0, 480, 2048, 40); // Antarctica detail

    const earthTexture = new THREE.CanvasTexture(canvas);
    earthTexture.wrapS = THREE.RepeatWrapping;
    earthTexture.wrapT = THREE.RepeatWrapping;
    
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 30,
      specular: 0x222222,
    });
    
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);

    // Atmosphere layers
    const atmosphereGeometry = new THREE.SphereGeometry(2.08, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x87CEEB,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    const glowGeometry = new THREE.SphereGeometry(2.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // Enhanced country markers
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

    const latLonToVector3 = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -(radius * Math.sin(phi) * Math.cos(theta));
      const z = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Create marker group that's separate from earth for better selection
    const markerGroup = new THREE.Group();
    const markers: THREE.Mesh[] = [];
    const markerGlows: THREE.Mesh[] = [];
    
    countries.forEach((country, index) => {
      const position = latLonToVector3(country.lat, country.lon, 2.1);
      
      // Main marker
      const markerGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const markerMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff3333,
        transparent: true,
        opacity: 1,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.copy(position);
      marker.userData = { name: country.name, index, type: 'marker' };
      
      // Glow effect
      const glowGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6666,
        transparent: true,
        opacity: 0.4,
      });
      const markerGlow = new THREE.Mesh(glowGeometry, glowMaterial);
      markerGlow.position.copy(position);
      markerGlow.userData = { name: country.name, index, type: 'glow' };
      
      // Ring effect
      const ringGeometry = new THREE.RingGeometry(0.06, 0.1, 16);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xff4444,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.copy(position);
      ring.lookAt(0, 0, 0);
      ring.userData = { name: country.name, index, type: 'ring' };
      
      scene.add(marker);
      scene.add(markerGlow);
      scene.add(ring);
      
      markers.push(marker);
      markerGlows.push(markerGlow);
    });

    camera.position.z = 5;

    // Enhanced interaction
    let isDragging = false;
    let previousMouse = { x: 0, y: 0 };
    let dragStartTime = 0;
    let totalDragDistance = 0;
    
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseDown = (event: MouseEvent) => {
      isDragging = true;
      dragStartTime = Date.now();
      totalDragDistance = 0;
      previousMouse = { x: event.clientX, y: event.clientY };
    };

    const onMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouse.x;
        const deltaY = event.clientY - previousMouse.y;
        
        totalDragDistance += Math.abs(deltaX) + Math.abs(deltaY);
        
        earth.rotation.y += deltaX * 0.008;
        earth.rotation.x += deltaY * 0.008;
        
        earth.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, earth.rotation.x));
        
        previousMouse = { x: event.clientX, y: event.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseClick = (event: MouseEvent) => {
      const dragDuration = Date.now() - dragStartTime;
      
      // Only register click if minimal dragging occurred
      if (totalDragDistance > 10 || dragDuration > 300) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      // Check all scene objects that could be markers
      const allObjects = scene.children.filter(child => 
        child.userData.type === 'marker' || 
        child.userData.type === 'glow' || 
        child.userData.type === 'ring'
      );
      
      const intersects = raycaster.intersectObjects(allObjects);
      
      if (intersects.length > 0) {
        const selectedObject = intersects[0].object;
        if (selectedObject.userData.name) {
          console.log('Clicked country:', selectedObject.userData.name);
          
          // Visual feedback
          const originalScale = selectedObject.scale.clone();
          selectedObject.scale.multiplyScalar(1.5);
          setTimeout(() => {
            selectedObject.scale.copy(originalScale);
          }, 300);
          
          onCountrySelect(selectedObject.userData.name);
        }
      }
    };

    // Touch support
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

    let autoRotateSpeed = 0.003;
    let time = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      if (!isDragging) {
        earth.rotation.y += autoRotateSpeed;
      }
      
      // Animate markers
      markers.forEach((marker, index) => {
        // Pulsing effect
        const scale = 1 + 0.2 * Math.sin(time * 3 + index);
        marker.scale.setScalar(scale);
      });
      
      markerGlows.forEach((glow, index) => {
        const material = glow.material as THREE.MeshBasicMaterial;
        material.opacity = 0.3 + 0.3 * Math.sin(time * 2 + index);
      });
      
      // Atmosphere animation
      atmosphere.rotation.y += 0.001;
      glow.rotation.y -= 0.0005;
      
      renderer.render(scene, camera);
    };
    
    setIsLoading(false);
    animate();

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
        className="w-full max-w-lg mx-auto aspect-square rounded-full shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          background: 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)'
        }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg animate-pulse">Loading Earth...</div>
        </div>
      )}
      <div className="text-center mt-4 text-gray-600">
        <p className="text-sm">🌍 Click and drag to rotate • Click red dots to explore countries</p>
        <p className="text-xs mt-1 text-gray-500">Touch and swipe on mobile devices</p>
      </div>
    </div>
  );
};
