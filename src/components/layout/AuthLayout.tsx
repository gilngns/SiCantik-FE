import Ellipse from "/src/assets/Ellipse 2.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  showLogo?: boolean;
  title?: string;
  formWidth?: "sm" | "lg";
}

export default function AuthLayout({
  children,
  showLogo = true,
  title,
  formWidth = "sm",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen font-jakarta bg-gray-50 flex flex-col">
      {/* ✅ Mobile Layout */}
      <div className="md:hidden flex flex-col w-full">
        {/* Header Hijau */}
        <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-16 overflow-hidden ">
          <img
            src={Ellipse}
            alt="curve"
            className="absolute bottom-0 left-0 w-full"
          />

          <div className="relative z-10 flex flex-col items-center">
            {showLogo && (
              <img
                src="/src/assets/logoTANIMINE.png"
                alt="Logo"
                className="h-28 mb-4"
              />
            )}
            {title && <h1 className="text-2xl font-bold text-white">{title}</h1>}
          </div>
        </div>

        {/* Form langsung */}
        <div className="w-full px-6 mt-6">{children}</div>
      </div>

      {/* ✅ Desktop Split Layout */}
      <div className="hidden md:grid grid-cols-2 min-h-screen">
        {/* Kiri: background statis */}
        <div
          className="flex flex-col text-white px-16 pt-12 relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/imgAuth.png')" }}
        >
          {/* Logo + Text fix di sini */}
          <div className="relative z-10 w-full flex justify-center mb-14 mt-7">
            <img
              src="/src/assets/logoTANIMINE.png"
              alt="Logo"
              className="h-14 md:h-20 lg:h-24 mb-0"
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-6">Selamat Datang!</h1>
            <p className="text-xl leading-relaxed text-gray-400 max-w-xl">
              Anda dapat dengan mudah mengintegrasikan, memantau, dan
              mengoptimalkan pasokan pertanian untuk keberlanjutan bisnis
              yang lebih baik.
            </p>
          </div>
        </div>

        {/* Kanan: form */}
        <div className="flex justify-center items-center bg-gray-50 h-screen">
          <div
            className={`
              w-full bg-white shadow-lg rounded-2xl p-12
              ${formWidth === "lg" ? "max-w-3xl lg:max-w-4xl" : "max-w-md"}
            `}
          >
            {title && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
                {formWidth === "lg" && (
                  <p className="text-gray-500 text-sm">
                    Lengkapi data di bawah untuk membuat akun baru
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
