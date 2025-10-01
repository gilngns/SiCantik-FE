interface InfoCardProps {
    icon: string; 
    text: string;
  }
  
  export default function InfoCard({ icon, text }: InfoCardProps) {
    return (
      <div className="relative bg-[#11493F] rounded-xl px-6 py-10 text-center shadow-md">
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
          <img src={icon} alt="icon" className="w-16 h-16" />
        </div>
  
        <p className="text-white text-sm leading-relaxed">
          {text}
        </p>
      </div>
    );
  }
  