export default function SplashScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#093731] text-white font-jakarta">
      <div className="flex flex-col items-center gap-3">
        {/* Tulisan SiCantik */}
        <h1 className="text-3xl font-bold tracking-wide animate-pulse">
          SiCantik
        </h1>

        {/* Sub text / tagline */}
        <p className="text-sm text-gray-300 tracking-wider">
          Sistem Tanam dan Petik
        </p>

        {/* Progress bar */}
        <div className="mt-4 w-40 h-1 bg-gray-700 rounded-full overflow-hidden">
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
