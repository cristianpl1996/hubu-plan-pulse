import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const handleVolverClick = () => {
    window.location.href = "https://www.hubu.com.co";
  };

  return (
    <header className="w-full bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="container mx-auto max-w-6xl px-4 md:px-6 py-2 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.png" alt="Hubu Logo" className="h-14 w-auto mb-2" />
          </div>

          {/* Botón Volver */}
          <Button
            onClick={handleVolverClick}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 rounded-full transition-all duration-300"
          >
            <ArrowLeft />
            <span className="font-bold" style={{ fontSize: "13px" }}>
              Volver
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
