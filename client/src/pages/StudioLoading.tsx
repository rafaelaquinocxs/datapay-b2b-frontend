import { useEffect } from "react";
import { useLocation } from "wouter";
import StudioLoadingAnimation from "@/components/StudioLoadingAnimation";

export default function StudioLoading() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Redirecionar para /studio após 3.5 segundos
    const timer = setTimeout(() => {
      navigate("/studio");
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return <StudioLoadingAnimation isLoading={true} />;
}
