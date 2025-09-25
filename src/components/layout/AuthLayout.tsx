interface AuthLayoutProps {
    children: React.ReactNode;
  }
  
  export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 font-jakarta">
        {/* Left Side with Background Image */}
        <div
          className="hidden md:flex flex-col text-white px-16 pt-12 relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/imgAuth.png')" }}
        >
  
          {/* Logo di tengah atas */}
          <div className="relative z-10 w-full flex justify-center mb-14 mt-7">
            <img src="/src/assets/logoTANIMINE.png" alt="Logo" className="h-14 md:h-20 lg:h-24 mb-0" />
          </div>
  
          {/* Konten (Heading + Deskripsi) */}
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">Selamat Datang!</h1>
            <p className="text-ms leading-relaxed text-gray-400 max-w-3/4">
              Anda dapat dengan mudah mengintegrasikan, memantau, dan
              mengoptimalkan pasokan pertanian untuk keberlanjutan bisnis
              yang lebih baik.
            </p>
          </div>
        </div>
  
        {/* Right Side (Form) */}
        <div className="flex justify-center items-center bg-gray-50 p-6">
          {children}
        </div>
      </div>
    );
  }
  