import { useState, useEffect } from "react";
import { Link } from "wouter";

const COOKIE_KEY = "engethermo_cookies_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY);
    if (!accepted) {
      // Pequeno delay para não aparecer imediatamente
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#1a1a1a] border-t border-white/10 shadow-2xl"
      style={{ animation: "slideUpCookie 0.4s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      <style>{`
        @keyframes slideUpCookie {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Texto */}
        <div className="flex items-start gap-3 flex-1">
          <img src="/images/icon-et-cropped_9f642670.png" alt="Engethermo" className="w-8 h-8 object-contain flex-shrink-0 mt-0.5" />
          <p className="text-sm text-gray-300 leading-relaxed">
            Utilizamos cookies para melhorar sua experiência no site, personalizar conteúdo e analisar nosso tráfego.
            Ao continuar navegando, você concorda com nossa{" "}
            <Link href="/privacidade">
              <span className="text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer transition-colors">
                Política de Privacidade
              </span>
            </Link>
            {" "}e{" "}
            <Link href="/termos">
              <span className="text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer transition-colors">
                Termos de Uso
              </span>
            </Link>
            .
          </p>
        </div>

        {/* Botões */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-sm text-gray-400 hover:text-white transition-colors px-4 py-2 rounded border border-white/10 hover:border-white/20 bg-transparent"
          >
            Recusar
          </button>
          <button
            onClick={handleAccept}
            className="text-sm font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors px-5 py-2 rounded shadow-lg"
          >
            Aceitar Cookies
          </button>
        </div>
      </div>
    </div>
  );
}
