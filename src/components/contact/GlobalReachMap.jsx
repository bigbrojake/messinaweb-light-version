export default function GlobalReachMap() {
  return (
    <section className="py-24 w-full bg-textDark relative overflow-hidden -mt-24 pt-48">
      <div className="max-w-7xl mx-auto px-6 text-center mb-16 relative z-10">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">
          Global Reach. Local Precision.
        </h2>
        <p className="text-gray-400 font-body max-w-2xl mx-auto">
          Delivering onshore and offshore capabilities spanning North America and India.
        </p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto aspect-[21/9] flex items-center justify-center opacity-80">
        {/* Abstract stylized world map SVG */}
        <svg
          viewBox="0 0 1000 400"
          className="w-full h-full drop-shadow-2xl opacity-40 mix-blend-screen"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* North America */}
          <path
            d="M150 100 Q180 80 200 120 T250 150 T280 200 T220 250 T180 220 T150 180 Z"
            fill="#333333"
            stroke="#555555"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* South America */}
          <path
            d="M260 220 Q290 250 300 300 T280 380 T240 330 Z"
            fill="#222222"
            stroke="#444444"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Europe / Asia */}
          <path
            d="M450 80 Q500 50 600 80 T750 120 T800 200 T650 250 T550 180 T480 150 Z"
            fill="#333333"
            stroke="#555555"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Africa */}
          <path
            d="M480 180 Q520 200 550 250 T530 350 T450 300 Z"
            fill="#222222"
            stroke="#444444"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Connection arc */}
          <path
            d="M220 140 Q400 50 720 180"
            stroke="#1EC4F7"
            strokeWidth="1"
            strokeDasharray="5 5"
            className="animate-pulse"
          />
        </svg>

        {/* Newburyport HQ beacon */}
        <div className="absolute top-[35%] left-[22%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="absolute w-24 h-24 bg-accent/20 rounded-full animate-ping" />
          <div className="absolute w-12 h-12 bg-accent/40 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-accent rounded-full border-2 border-white relative z-10 shadow-[0_0_15px_#1EC4F7]" />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm border border-gray-800 px-3 py-1.5 rounded-md mt-2">
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              Newburyport HQ
            </span>
          </div>
        </div>

        {/* India hub beacon */}
        <div className="absolute top-[45%] left-[72%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div
            className="absolute w-16 h-16 bg-primary/30 rounded-full animate-ping"
            style={{ animationDelay: '1s' }}
          />
          <div className="w-2.5 h-2.5 bg-primary rounded-full border border-white relative z-10 shadow-[0_0_10px_#0A348A]" />

          <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-sm border border-gray-800 px-3 py-1.5 rounded-md mt-2">
            <span className="font-mono text-xs text-gray-300 uppercase tracking-widest font-bold">
              Offshore Hub
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
