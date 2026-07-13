import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Layers, Navigation, AlertTriangle, Building } from 'lucide-react';

// Bypass Leaflet default icon bug by using custom divIcons
const createAmbulanceIcon = (status) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-[10px] ${
      status === 'Active' ? 'bg-danger animate-pulse-red' : 'bg-primary'
    }">AMB</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const createHospitalIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-xs">H</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const createEmergencyIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-8 h-8 rounded-full bg-danger flex items-center justify-center border-2 border-white shadow-lg text-white font-bold text-[10px] animate-ping">!</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
};

const MapMonitoring = () => {
  const { ambulances, hospitals, emergencies } = useData();
  const [activeTab, setActiveTab] = useState("gis"); // gis or vector
  const [layers, setLayers] = useState({
    ambulances: true,
    hospitals: true,
    emergencies: true,
    greenCorridors: true,
    roadBlocks: true
  });

  const toggleLayer = (layerName) => {
    setLayers(prev => ({
      ...prev,
      [layerName]: !prev[layerName]
    }));
  };

  // Center coordinates of our Smart City (San Francisco center representation)
  const cityCenter = [37.7749, -122.4194];

  // Dummy Road Block locations for map representation
  const roadBlocks = [
    { id: "RB-01", name: "Construction on Van Ness Ave", lat: 37.7812, lng: -122.4215 },
    { id: "RB-02", name: "Accident blocked lane on Lombard St", lat: 37.8015, lng: -122.4168 }
  ];

  return (
    <div className="flex-1 flex flex-col gap-5 h-[calc(100vh-8.5rem)] select-none animate-fade-in">
      
      {/* Header and Controls */}
      <div className="flex justify-between items-center flex-wrap gap-4 flex-shrink-0">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
            Interactive City GIS Map
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Surveillance of all dispatch units, traffic signals, roadblocks, and target medical centers.
          </p>
        </div>

        {/* View togglers */}
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-205 dark:border-slate-805">
          <button
            onClick={() => setActiveTab("gis")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'gis' 
                ? 'bg-white dark:bg-govdark-card text-slate-800 dark:text-slate-105 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            GIS Mapping View
          </button>
          <button
            onClick={() => setActiveTab("vector")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'vector' 
                ? 'bg-white dark:bg-govdark-card text-slate-805 dark:text-slate-105 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Vector Grid View
          </button>
        </div>
      </div>

      {/* Main Map Split Window */}
      <div className="flex-1 flex flex-col lg:flex-row gap-5 min-h-0">
        
        {/* Left Side: Filter Control Panel */}
        <div className="w-full lg:w-64 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4.5 flex-shrink-0">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-primary" /> Map Layers Filter
          </h3>
          
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.ambulances}
                onChange={() => toggleLayer('ambulances')}
                className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Ambulances Fleet</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.hospitals}
                onChange={() => toggleLayer('hospitals')}
                className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Hospitals Registry</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.emergencies}
                onChange={() => toggleLayer('emergencies')}
                className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Active Incidents</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.greenCorridors}
                onChange={() => toggleLayer('greenCorridors')}
                className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Active Corridors</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={layers.roadBlocks}
                onChange={() => toggleLayer('roadBlocks')}
                className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary"
              />
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Traffic Road Blocks</span>
            </label>
          </div>

          <div className="h-px bg-slate-200 dark:bg-slate-800 my-1"></div>

          {/* Map Legend */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest pl-0.5">Legend</span>
            
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-primary rounded-md border border-white dark:border-govdark-border flex items-center justify-center text-white text-[8px] font-bold">A</div>
                <span className="text-slate-650 dark:text-slate-350">Ambulance (Idle)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-danger rounded-md border border-white dark:border-govdark-border flex items-center justify-center text-white text-[8px] font-bold animate-pulse">A</div>
                <span className="text-slate-650 dark:text-slate-350">Ambulance (Emergency)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-secondary rounded-md border border-white dark:border-govdark-border flex items-center justify-center text-white text-[8px] font-bold">H</div>
                <span className="text-slate-650 dark:text-slate-350">Hospital Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 bg-warning rounded-full"></div>
                <span className="text-slate-650 dark:text-slate-350">Traffic Roadblock</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map Render Area */}
        <div className="flex-1 bg-white dark:bg-govdark-card border border-slate-200 dark:border-slate-800 rounded-2xl p-2 shadow-sm min-h-0 relative">
          {activeTab === 'gis' ? (
            <MapContainer
              center={cityCenter}
              zoom={13}
              scrollWheelZoom={true}
              className="h-full w-full rounded-xl z-0"
            >
              {/* Tile Layer (CartoDB Dark Matter) */}
              <TileLayer
                attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />

              {/* Render Hospitals */}
              {layers.hospitals && hospitals.map(h => (
                <Marker
                  key={h.id}
                  position={[h.lat, h.lng]}
                  icon={createHospitalIcon()}
                >
                  <Popup>
                    <div className="text-xs p-1 select-none text-slate-800">
                      <h4 className="font-bold flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {h.name}</h4>
                      <p className="mt-1">Beds: {h.bedsAvailable} | ICU: {h.icuBedsAvailable}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Render Active Emergencies */}
              {layers.emergencies && emergencies.map(e => (
                <Marker
                  key={e.id}
                  position={[e.lat, e.lng]}
                  icon={createEmergencyIcon()}
                >
                  <Popup>
                    <div className="text-xs p-1 select-none text-slate-800">
                      <h4 className="font-bold text-danger flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Incident {e.id}</h4>
                      <p className="mt-1">Patient: {e.patient}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Render Ambulances */}
              {layers.ambulances && ambulances.map(a => {
                // If ambulance is active, we can render it near the active emergency coordinate if available
                const matchedEmerg = emergencies.find(e => e.ambulance === a.id);
                const lat = matchedEmerg ? matchedEmerg.lat - 0.003 : 37.7749 + (parseInt(a.id.slice(-1)) * 0.006) - 0.015;
                const lng = matchedEmerg ? matchedEmerg.lng + 0.003 : -122.4194 + (parseInt(a.id.slice(-1)) * 0.006) - 0.015;
                
                return (
                  <Marker
                    key={a.id}
                    position={[lat, lng]}
                    icon={createAmbulanceIcon(a.currentStatus)}
                  >
                    <Popup>
                      <div className="text-xs p-1 select-none text-slate-800">
                        <h4 className="font-bold flex items-center gap-1"><Navigation className="w-3.5 h-3.5" /> Unit {a.id}</h4>
                        <p className="mt-1">Driver: {a.driver}</p>
                        <p>Status: {a.currentStatus}</p>
                      </div>
                    </Popup>
                  </Marker>
                );
              })}

              {/* Render Road Blocks */}
              {layers.roadBlocks && roadBlocks.map(rb => (
                <Marker
                  key={rb.id}
                  position={[rb.lat, rb.lng]}
                  icon={L.divIcon({
                    className: 'rb-div-icon',
                    html: `<div class="w-6 h-6 rounded-full bg-warning border border-white flex items-center justify-center text-white font-bold text-[10px] shadow-md animate-bounce">!</div>`,
                    iconSize: [24, 24]
                  })}
                >
                  <Popup>
                    <div className="text-xs p-1 select-none text-slate-800">
                      <h4 className="font-bold text-amber-600 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Roadblock</h4>
                      <p className="mt-1">{rb.name}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Glowing Route line preemption */}
              {layers.greenCorridors && emergencies.filter(e => e.corridorType === 'Green Corridor').map(e => (
                <Polyline
                  key={e.id}
                  positions={[
                    [e.lat, e.lng],
                    [e.lat - 0.005, e.lng + 0.005],
                    [37.7749, -122.4194] // Destination Metro Gen
                  ]}
                  color="#16A34A"
                  weight={5}
                  opacity={0.8}
                />
              ))}

            </MapContainer>
          ) : (
            // Tab 2: Vector Command Grid map representation (SVG)
            <div className="w-full h-full bg-slate-950 rounded-xl relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 opacity-10 border border-slate-800 pointer-events-none">
                {Array.from({ length: 96 }).map((_, idx) => (
                  <div key={idx} className="border-t border-l border-white"></div>
                ))}
              </div>

              <svg className="w-full h-full p-10 max-h-[500px]">
                {/* Glowing neon streets representing the city center */}
                <line x1="50" y1="50" x2="650" y2="50" stroke="#1e293b" strokeWidth="6" />
                <line x1="50" y1="200" x2="650" y2="200" stroke="#1e293b" strokeWidth="6" />
                <line x1="50" y1="350" x2="650" y2="350" stroke="#1e293b" strokeWidth="6" />

                <line x1="150" y1="30" x2="150" y2="400" stroke="#1e293b" strokeWidth="6" />
                <line x1="350" y1="30" x2="350" y2="400" stroke="#1e293b" strokeWidth="6" />
                <line x1="550" y1="30" x2="550" y2="400" stroke="#1e293b" strokeWidth="6" />

                {/* Glowing Green preemption route */}
                {layers.greenCorridors && (
                  <polyline
                    points="150,50 350,50 350,200 550,200"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="6"
                    strokeLinecap="round"
                    className="shadow-[0_0_15px_rgba(22,163,74,0.8)] animate-pulse"
                  />
                )}

                {/* Vector Hospitals */}
                {layers.hospitals && (
                  <>
                    <circle cx="150" cy="50" r="14" fill="#16A34A" className="cursor-pointer" />
                    <text x="145" y="54" fill="white" fontSize="11" fontWeight="bold">H</text>

                    <circle cx="550" cy="200" r="14" fill="#16A34A" className="cursor-pointer" />
                    <text x="545" y="204" fill="white" fontSize="11" fontWeight="bold">H</text>
                  </>
                )}

                {/* Vector Ambulances */}
                {layers.ambulances && (
                  <>
                    <circle cx="280" cy="50" r="10" fill="#DC2626" className="animate-ping" />
                    <circle cx="280" cy="50" r="10" fill="#DC2626" />
                    <text x="274" y="54" fill="white" fontSize="9" fontWeight="bold">A1</text>
                    
                    <circle cx="350" cy="140" r="10" fill="#2563EB" />
                    <text x="344" y="144" fill="white" fontSize="9" fontWeight="bold">A2</text>
                  </>
                )}

                {/* Vector Roadblocks */}
                {layers.roadBlocks && (
                  <>
                    <circle cx="350" cy="350" r="8" fill="#F59E0B" className="animate-bounce" />
                    <text x="347" y="354" fill="white" fontSize="9" fontWeight="bold">!</text>
                  </>
                )}
              </svg>

              <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 text-xs">
                <span className="text-[10px] text-slate-400 font-bold block mb-1">COMMAND VECTOR GRID SCANNER</span>
                <span className="text-secondary font-semibold flex items-center gap-1.5 animate-pulse">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span> SCANNING ACTIVE CORRIDORS...
                </span>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default MapMonitoring;
