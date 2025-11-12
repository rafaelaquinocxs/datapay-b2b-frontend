import { useEffect } from "react";
import { useLocation } from "wouter";

export default function StudioLoading() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redireciona para /studio após 2.5 segundos
    const timer = setTimeout(() => {
      setLocation("/studio");
    }, 2500);

    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center overflow-hidden">
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo Container */}
        <div className="flex flex-col items-center gap-6">
          {/* Animated Logo */}
          <div className="relative w-24 h-24">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-purple-500 border-r-pink-500 animate-spin" />
            
            {/* Middle rotating ring */}
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-500 border-l-purple-500 animate-spin" style={{ animationDirection: "reverse" }} />
            
            {/* Inner logo */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/50">
              <span className="text-white font-bold text-xl">DS</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              DataPay Studio
            </h1>
            <p className="text-gray-400 text-lg">Carregando seu ambiente...</p>
          </div>
        </div>

        {/* Loading Bar */}
        <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 animate-pulse rounded-full" />
        </div>

        {/* Dots Animation */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Status Text */}
        <p className="text-gray-500 text-sm mt-4">
          Preparando dados sintéticos e ferramentas de análise...
        </p>
      </div>
    </div>
  );
}
