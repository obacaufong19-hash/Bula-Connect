'use client';
import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.offline';
import 'leaflet/dist/leaflet.css';

const tourismPoints = [
  { name: "Navala Village", bounds: [[-17.48, 177.72], [-17.38, 177.82]] as [number, number][] },
  { name: "Sawa-i-Lau", bounds: [[-16.88, 177.48], [-16.78, 177.58]] as [number, number][] },
  { name: "Viseisei Village", bounds: [[-17.73, 177.33], [-17.63, 177.43]] as [number, number][] },
];

export default function OfflineMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [-17.35, 177.65],
      zoom: 9,
    });

    const tileLayer = (L.tileLayer as any).offline(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 18 }
    ).addTo(map);

    L.control.savetiles(tileLayer, { position: 'topright' }).addTo(map);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold mb-6">Interactive Fiji Map (Offline Ready)</h2>
      <div ref={mapRef} className="w-full h-[600px] rounded-3xl border shadow-xl" />
      
      <div className="mt-4 text-center">
        <p className={`inline-block px-6 py-3 rounded-full ${isOnline ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {isOnline ? '🟢 Online - Pre-caching available' : '🌴 You are Offline - Using cached map'}
        </p>
      </div>
    </div>
  );
}
