import React, { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface StudioLoadingAnimationProps {
  isLoading: boolean;
  onLoadingComplete?: () => void;
}

export default function StudioLoadingAnimation({
  isLoading,
  onLoadingComplete,
}: StudioLoadingAnimationProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onLoadingComplete?.();
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-950 via-purple-900 to-gray-900 flex flex-col items-center justify-center z-50 overflow-hidden">
      <style>{`
        @keyframes spin-smooth {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.1;
            box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            opacity: 0.3;
            box-shadow: 0 0 40px rgba(168, 85, 247, 0.6), 0 0 60px rgba(236, 72, 153, 0.4);
          }
        }
        
        @keyframes bounce-dots {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-12px);
            opacity: 0.6;
          }
        }
        
        @keyframes slide-bar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
        
        @keyframes fade-in-text {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .spin-smooth {
          animation: spin-smooth 3s linear infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .bounce-dots {
          animation: bounce-dots 1.2s ease-in-out infinite;
        }
        
        .fade-in-text {
          animation: fade-in-text 0.8s ease-out forwards;
        }
        
        .progress-bar-fill {
          animation: slide-bar 2.5s ease-out forwards;
        }
      `}</style>

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Animado */}
        <div className="mb-16 relative">
          {/* Outer Glow Circle */}
          <div className="pulse-glow absolute inset-0 w-32 h-32 rounded-3xl" />
          
          {/* Main Logo */}
          <div className="spin-smooth relative w-32 h-32 rounded-3xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 flex items-center justify-center shadow-2xl">
            <Sparkles className="w-16 h-16 text-white drop-shadow-lg" />
          </div>
        </div>

        {/* Texto Principal */}
        <h2 className="fade-in-text text-4xl font-bold text-white mb-3 text-center tracking-tight">
          DataPay Studio
        </h2>
        
        {/* Subtítulo */}
        <p className="fade-in-text text-gray-300 text-base mb-12 text-center max-w-xs" style={{ animationDelay: "0.2s" }}>
          Configurando seu ambiente de simulação...
        </p>

        {/* Progress Bar Container */}
        <div className="w-80 mb-6">
          <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden backdrop-blur-sm border border-gray-600/30">
            <div
              className="progress-bar-fill h-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-full shadow-lg shadow-pink-600/50"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Percentage Text */}
        <p className="text-gray-400 text-sm font-semibold mb-8">
          {Math.min(Math.floor(progress), 100)}%
        </p>

        {/* Animated Dots */}
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bounce-dots w-3 h-3 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg shadow-pink-600/50"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
      </div>
    </div>
  );
}

