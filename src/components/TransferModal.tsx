import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Copy,
  CheckCircle,
  Clock,
  Shield,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

interface TransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: string;
}

export function TransferModal({
  open,
  onOpenChange,
  planName,
  planPrice,
}: TransferModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const whatsappMessage = `Hola, ya realicé la transferencia para el ${planName} de Hubu. Adjunto mi comprobante.`;
  const whatsappLink = `https://wa.me/573102523739?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error("Error copying to clipboard:", err);
    }
  };

  const bankInfo = {
    bank: "Bancolombia",
    accountType: "Cuenta de ahorros",
    accountNumber: "270-000012-12",
    holder: "CRISTIAN PATIÑO - OSYVA SAS",
    nit: "1.088.334.538",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-gradient-to-br from-[#16161A] to-[#1a1a1f] border-[#C64EFF]/30">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] bg-clip-text text-transparent mb-2">
            Pago por transferencia bancaria
          </DialogTitle>
          <p className="text-center text-muted-foreground text-xs sm:text-sm">
            Transfiere de forma segura y rápida desde tu banco
          </p>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-220px)] custom-scrollbar">
          {/* Información del plan */}
          <div className="bg-gradient-to-r from-[#C64EFF]/10 to-[#9b87f5]/10 rounded-xl p-3 sm:p-4 border border-[#C64EFF]/20">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#C64EFF] flex-shrink-0" />
              <span className="font-semibold text-white text-sm sm:text-base break-words text-center">
                {planName} · {planPrice}
              </span>
            </div>
          </div>

          {/* Logo de Bancolombia y datos bancarios */}
          <div className="bg-gradient-to-br from-[#0E0E10] to-[#1a1a1f] rounded-2xl p-3 sm:p-4 border border-[#C64EFF]/20 shadow-2xl">
            {/* Datos bancarios con botones de copiar */}
            <div className="space-y-2 sm:space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-[#1a1a1f] rounded-lg p-3 sm:p-4 border border-[#C64EFF]/10">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Banco
                      </p>
                      <p className="text-white font-semibold text-sm sm:text-base break-words">
                        {bankInfo.bank}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                      onClick={() => copyToClipboard(bankInfo.bank, "bank")}
                    >
                      {copiedField === "bank" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-[#1a1a1f] rounded-lg p-3 sm:p-4 border border-[#C64EFF]/10">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Tipo de Cuenta
                      </p>
                      <p className="text-white font-semibold text-sm sm:text-base break-words">
                        {bankInfo.accountType}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                      onClick={() =>
                        copyToClipboard(bankInfo.accountType, "type")
                      }
                    >
                      {copiedField === "type" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Número de cuenta destacado */}
              <div className="bg-[#1a1a1f] rounded-lg p-3 sm:p-4 border border-[#C64EFF]/10">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Número de Cuenta
                    </p>
                    <p className="text-white font-semibold text-sm sm:text-base break-words">
                      {bankInfo.accountNumber}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 sm:h-10 sm:w-10 p-0 hover:bg-[#C64EFF]/30 flex-shrink-0"
                    onClick={() =>
                      copyToClipboard(bankInfo.accountNumber, "account")
                    }
                  >
                    {copiedField === "account" ? (
                      <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                    ) : (
                      <Copy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <div className="bg-[#1a1a1f] rounded-lg p-3 sm:p-4 border border-[#C64EFF]/10">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Titular
                      </p>
                      <p className="text-white font-semibold text-sm sm:text-base break-words">
                        {bankInfo.holder}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                      onClick={() => copyToClipboard(bankInfo.holder, "holder")}
                    >
                      {copiedField === "holder" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-[#1a1a1f] rounded-lg p-3 sm:p-4 border border-[#C64EFF]/10">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1 pr-2">
                      <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        NIT
                      </p>
                      <p className="text-white font-mono font-semibold text-sm sm:text-base break-words">
                        {bankInfo.nit}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                      onClick={() => copyToClipboard(bankInfo.nit, "nit")}
                    >
                      {copiedField === "nit" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instrucciones mejoradas */}
          <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-xl p-4 sm:p-6 border border-[#25D366]/30">
            <div className="flex items-start gap-2 sm:gap-3">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-[#25D366] mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">
                  ¿Qué hacer después de transferir?
                </h4>
                <ol className="text-xs sm:text-sm text-muted-foreground space-y-1">
                  <li>
                    1. Realiza la transferencia desde tu banco usando los datos
                    de arriba
                  </li>
                  <li>2. Toma una captura del comprobante de transferencia</li>
                  <li>
                    3. Envía el comprobante por WhatsApp con el botón de abajo
                  </li>
                </ol>
              </div>
            </div>
          </div>

          {/* Botón de WhatsApp mejorado */}
          <Button
            className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]"
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Enviar comprobante por WhatsApp</span>
            </div>
          </Button>

          {/* Garantías de seguridad */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
              <span>Transferencia Segura</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
              <span>Activación en 24h</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 flex-shrink-0" />
              <span>Soporte Incluido</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
