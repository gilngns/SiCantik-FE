interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export default function Card({ children, className = "" }: CardProps) {
    return (
      <div className={`bg-white shadow-md rounded-xl p-8 ${className}`}>
        {children}
      </div>
    );
  }
  