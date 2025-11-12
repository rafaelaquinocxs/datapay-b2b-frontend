import { Sparkles } from "lucide-react";

interface StudioLoadingAnimationProps {
  isLoading: boolean;
}

export default function StudioLoadingAnimation({ isLoading }: StudioLoadingAnimationProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900" />
      
      {/* Animated Glow Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Wave Element at Bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full h-40"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.95" />
            <stop offset="100%" stopColor="white" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        <path
          d="M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z"
          fill="url(#waveGradient)"
        />
      </svg>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        {/* Logo Container */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer Rotating Ring */}
          <div
            className="absolute inset-0 rounded-full border-3 border-transparent border-t-pink-300 border-r-purple-300"
            style={{
              animation: "spin 3.5s linear infinite",
            }}
          />

          {/* Middle Rotating Ring (Reverse) */}
          <div
            className="absolute inset-4 rounded-full border-2 border-transparent border-b-cyan-300 border-l-pink-300"
            style={{
              animation: "spin 4.5s linear infinite reverse",
            }}
          />

          {/* Inner Glow */}
          <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 blur-xl" />

          {/* Logo Icon */}
          <div className="relative z-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-7 shadow-2xl shadow-purple-500/60">
            <Sparkles className="w-14 h-14 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-3">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-pink-100 to-purple-100 bg-clip-text text-transparent drop-shadow-lg">
            DataPay Studio
          </h1>
          <p className="text-gray-200 text-base font-medium">
            Configurando seu ambiente...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm border border-white/40">
          <div
            className="h-full bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 rounded-full shadow-lg shadow-pink-400/50"
            style={{
              animation: "progress 3.5s ease-in-out forwards",
            }}
          />
        </div>

        {/* Animated Dots */}
        <div className="flex gap-4 mt-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-gradient-to-b from-pink-300 to-purple-300 shadow-lg shadow-pink-400/50"
              style={{
                animation: `bounce 1.6s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Status Text */}
        <p className="text-gray-300 text-sm font-medium mt-6">
          Preparando dados sintéticos e ferramentas de análise...
        </p>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px);
            opacity: 0.6;
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
            opacity: 0.3;
          }
          50% {
            width: 100%;
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

