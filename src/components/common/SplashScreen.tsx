export default function SplashScreen() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#093731] text-white font-jakarta">
        <div className="flex flex-col items-center gap-6">
          {/* Logo dengan animasi scale + fade */}
          <img
            src="/src/assets/logoTANIMINE.png"
            alt="Logo"
            className="h-20 object-contain animate-pulse"
          />
  
          {/* Progress bar */}
          <div className="w-40 h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-1 bg-emerald-400 animate-[progress_2s_ease-in-out_infinite]" />
          </div>
        </div>
  
        {/* Animasi custom progress bar */}
        <style>
          {`
            @keyframes progress {
              0% { transform: translateX(-100%); }
              50% { transform: translateX(0); }
              100% { transform: translateX(100%); }
            }
          `}
        </style>
      </div>
    );
  }
  