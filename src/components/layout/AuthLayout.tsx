import Ellipse from "/src/assets/Ellipse 2.png";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  formWidth?: "sm" | "lg";
}

export default function AuthLayout({
  children,
  title,
  formWidth = "sm",
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen font-jakarta bg-gray-50 flex flex-col">
      {/* ✅ Mobile Layout */}
      <div className="md:hidden flex flex-col w-full">
        <div className="relative w-full flex flex-col items-center justify-center pt-12 pb-16 overflow-hidden ">
          <img
            src={Ellipse}
            alt="curve"
            className="absolute bottom-0 left-0 w-full"
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-white">SiCantik</h1>
            <p className="text-sm text-white mt-2">
              Sistem Tanam Dan Petik
            </p>
          </div>
        </div>

        <div className="w-full px-6 mt-6">{children}</div>
      </div>

      {/* ✅ Desktop Split Layout */}
      <div className="hidden md:grid grid-cols-2 min-h-screen">
        {/* Kiri */}
        <div
          className="flex flex-col justify-center items-center text-white px-16 relative h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('/imgAuth.png')" }}
        >
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold mb-2 text-white">
              SiCantik
            </h1>
            <p className="text-xl text-white">
              Sistem Tanam Dan Petik
            </p>
          </div>
        </div>

        {/* Kanan */}
        <div className="flex justify-center items-center bg-gray-50 h-screen">
          <div
            className={`
              w-full bg-white shadow-lg rounded-2xl p-12
              ${formWidth === "lg" ? "max-w-3xl lg:max-w-4xl" : "max-w-md"}
            `}
          >
            {title && (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {title}
                </h2>
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
