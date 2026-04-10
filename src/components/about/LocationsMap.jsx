import { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';

// Generates SVG points string for a 5-pointed star centered at 0,0
function starPoints(outerR, innerR, numPoints = 5) {
  const coords = [];
  for (let i = 0; i < numPoints * 2; i++) {
    const angle = (i * Math.PI) / numPoints - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    coords.push(`${r * Math.cos(angle)},${r * Math.sin(angle)}`);
  }
  return coords.join(' ');
}

const US_GEO_URL    = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';
const WORLD_GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const INDIA_NUMERIC_ID = '356'; // ISO 3166-1 numeric for India

const US_LOCATIONS = [
  { name: 'Newburyport, MA',  coordinates: [-70.877, 42.812],  hq: true  },
  { name: 'Newbury, NH',      coordinates: [-71.997, 43.336],  hq: false },
  { name: 'Bridgewater, NJ',  coordinates: [-74.604, 40.593],  hq: false },
  { name: 'Louisville, KY',   coordinates: [-85.758, 38.252],  hq: false },
  { name: 'Evansville, IN',   coordinates: [-87.555, 37.974],  hq: false },
  { name: 'Ashland, OR',      coordinates: [-122.709, 42.194], hq: false },
];

const INDIA_LOCATIONS = [
  { name: 'Hyderabad, Telangana', coordinates: [78.477, 17.406] },
];

const INDIA_CARD = {
  entity: 'MessinaTech Solutions PVT LTD',
  offices: [
    {
      city: 'Hyderabad',
      lines: [
        'WeWork Rajapushpa Summit',
        'SY 130P & 115/1P, Nanakramguda Rd',
        'Rangareddy District, Telangana 500032',
      ],
    },
  ],
  email: 'vivek@messinatechsolutions.com',
  phone: '+91 96861 21958',
};

export default function LocationsMap() {
  const [tooltip, setTooltip] = useState(null);

  return (
    <section className="w-full py-20" style={{ background: '#050d1a' }}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent/70 mb-3 block">
            / Global Footprint
          </span>
          <h2
            className="font-heading font-extrabold text-white uppercase leading-none"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
          >
            Where We Work
          </h2>
          <p className="text-white/50 font-body mt-3 max-w-lg text-sm leading-relaxed">
            Onshore talent across six U.S. locations, with our sister company MessinaTech Solutions operating in Hyderabad, India.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Map panel */}
          <div
            className="w-full lg:flex-1 rounded-[2rem] overflow-hidden relative"
            style={{
              background: 'linear-gradient(135deg, #0a1628 0%, #0c1e3a 100%)',
              border: '1px solid rgba(30,196,247,0.10)',
            }}
          >
            <style>{`
              @keyframes ping-dot {
                0%   { transform: scale(1);   opacity: 0.8; }
                70%  { transform: scale(2.8); opacity: 0;   }
                100% { transform: scale(1);   opacity: 0;   }
              }
              .dot-ping    { animation: ping-dot 2.4s ease-out infinite; }
              .dot-ping-hq { animation: ping-dot 1.9s ease-out infinite; }
              .dot-ping-in { animation: ping-dot 2.8s ease-out infinite; }
            `}</style>

            {/* Hover tooltip */}
            {tooltip && (
              <div
                className="absolute top-5 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full font-mono text-xs text-white whitespace-nowrap pointer-events-none"
                style={{
                  background: 'rgba(30,196,247,0.15)',
                  border: '1px solid rgba(30,196,247,0.35)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {tooltip}
              </div>
            )}

            {/* US Map */}
            <ComposableMap
              projection="geoAlbersUsa"
              style={{ width: '100%', height: 'auto' }}
              projectionConfig={{ scale: 900 }}
            >
              <ZoomableGroup zoom={1} center={[-97, 38]} disablePanning>
                <Geographies geography={US_GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#0e2040"
                        stroke="#1a3060"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover:   { outline: 'none', fill: '#0e2040' },
                          pressed: { outline: 'none' },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {US_LOCATIONS.map((loc) => (
                  <Marker
                    key={loc.name}
                    coordinates={loc.coordinates}
                    onMouseEnter={() => setTooltip(loc.name)}
                    onMouseLeave={() => setTooltip(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    {loc.hq ? (
                      <>
                        {/* Ping ring behind star */}
                        <circle r={11} fill="rgba(30,196,247,0.15)" className="dot-ping-hq" />
                        <polygon
                          points={starPoints(8, 3.5)}
                          fill="#1EC4F7"
                          style={{
                            filter: 'drop-shadow(0 0 7px rgba(30,196,247,1)) drop-shadow(0 0 16px rgba(30,196,247,0.6))',
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <circle r={8} fill="rgba(30,196,247,0.18)" className="dot-ping" />
                        <circle
                          r={4.5}
                          fill="#7dd8f0"
                          style={{ filter: 'drop-shadow(0 0 5px rgba(30,196,247,0.75))' }}
                        />
                      </>
                    )}
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>

            {/* India Inset — bottom-right edge */}
            <div
              className="absolute bottom-0 right-0 rounded-tl-[1.5rem] overflow-hidden"
              style={{
                width: 280,
                background: 'rgba(6,14,32,0.92)',
                border: '1px solid rgba(30,196,247,0.18)',
                borderBottom: 'none',
                borderRight: 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="px-3 pt-2 pb-0 flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: '#1EC4F7', boxShadow: '0 0 5px rgba(30,196,247,0.9)' }}
                />
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-accent/70">
                  India Operations
                </span>
              </div>

                <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 1400 }}
                style={{ width: '100%', height: 'auto', cursor: 'grab' }}
              >
                <ZoomableGroup center={[80, 22]} zoom={1} minZoom={0.5} maxZoom={8}>
                  <Geographies geography={WORLD_GEO_URL}>
                    {({ geographies }) =>
                      geographies.map((geo) => {
                        const isIndia = geo.id === INDIA_NUMERIC_ID;
                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={isIndia ? '#0e2a5a' : '#080f20'}
                            stroke={isIndia ? '#1a3a7a' : '#0c1628'}
                            strokeWidth={0.4}
                            style={{
                              default: { outline: 'none' },
                              hover:   { outline: 'none' },
                              pressed: { outline: 'none' },
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>

                  {INDIA_LOCATIONS.map((loc) => (
                    <Marker key={loc.name} coordinates={loc.coordinates}>
                      <circle r={20} fill="rgba(30,196,247,0.10)" className="dot-ping-in" />
                      <polygon
                        points={starPoints(14, 5.5)}
                        fill="#1EC4F7"
                        style={{
                          filter: 'drop-shadow(0 0 10px rgba(30,196,247,1)) drop-shadow(0 0 24px rgba(30,196,247,0.7))',
                        }}
                      />
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Legend */}
            <div className="absolute bottom-5 left-6 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-accent" style={{ boxShadow: '0 0 8px rgba(30,196,247,0.9)' }} />
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">HQ</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-accent/55" style={{ boxShadow: '0 0 5px rgba(30,196,247,0.55)' }} />
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Team Member</span>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full lg:w-80 flex flex-col gap-4">

            {/* Onshore list card */}
            <div
              className="rounded-[2rem] p-7"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #0c1e3a 100%)',
                border: '1px solid rgba(30,196,247,0.12)',
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                / U.S. Locations
              </span>
              <div className="mt-4 space-y-2.5">
                {US_LOCATIONS.map((loc) => (
                  <div key={loc.name} className="flex items-center gap-2.5">
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: loc.hq ? '#1EC4F7' : 'rgba(30,196,247,0.45)',
                        boxShadow: loc.hq ? '0 0 5px rgba(30,196,247,0.8)' : 'none',
                      }}
                    />
                    <span className="font-body text-sm text-white/50">
                      {loc.name}
                      {loc.hq && (
                        <span className="ml-2 font-mono text-[9px] text-accent/60 uppercase tracking-widest">HQ</span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sister company card */}
            <div
              className="rounded-[2rem] p-7 flex flex-col gap-5"
              style={{
                background: 'linear-gradient(135deg, #0a1628 0%, #0c1e3a 100%)',
                border: '1px solid rgba(30,196,247,0.12)',
              }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                / India Location
              </span>

              <div>
                <h3 className="font-heading font-bold text-white text-base leading-tight mb-1">
                  MessinaTech Solutions PVT LTD
                </h3>
                <p className="font-body text-xs text-white/35 mb-4">Sister Company</p>
                <div className="w-8 h-[2px] bg-accent/40 mb-5" />

                <div className="space-y-5">
                  {INDIA_CARD.offices.map((office) => (
                    <div key={office.city}>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-accent/60 mb-1.5">
                        {office.city}
                      </p>
                      <address className="not-italic font-body text-xs text-white/45 leading-relaxed">
                        {office.lines.map((line, i) => <p key={i}>{line}</p>)}
                      </address>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
