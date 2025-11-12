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
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center z-50">
      <style>{`
        @keyframes spin-custom {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse-custom {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        
        @keyframes bounce-custom {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        .spin-animation {
          animation: spin-custom 3s linear infinite;
        }
        
        .pulse-animation {
          animation: pulse-custom 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .bounce-animation {
          animation: bounce-custom 1s infinite;
        }
      `}</style>

      {/* Logo Animado */}
      <div className="mb-12 relative">
        <div className="spin-animation w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        
        {/* Glow Effect */}
        <div className="pulse-animation absolute inset-0 w-24 h-24 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 opacity-20 blur-xl" />
      </div>

      {/* Texto */}
      <h2 className="text-2xl font-bold text-white mb-2">DataPay Studio</h2>
      <p className="text-gray-400 text-sm mb-8">Carregando ambiente de simulação...</p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      {/* Percentage */}
      <p className="text-gray-500 text-xs mt-4">{Math.min(Math.floor(progress), 100)}%</p>

      {/* Dots Animation */}
      <div className="flex gap-1 mt-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bounce-animation w-2 h-2 rounded-full bg-purple-600"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    </div>
  );
}

