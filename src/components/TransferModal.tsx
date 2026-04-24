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
  Download,
  ChevronDown,
  RotateCw,
  KeyRound,
  QrCode,
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
  const [stepsOpen, setStepsOpen] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);

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
    accountType: "Cuenta Corriente",
    accountNumber: "11500004967",
    holder: "OSYVA INC SAS",
    nit: "901.400.277",
    brebKey: "0054864939",
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

        <div className="space-y-3 py-4 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-220px)] custom-scrollbar">
          {/* Información del plan */}
          <div className="bg-gradient-to-r from-[#C64EFF]/10 to-[#9b87f5]/10 rounded-xl p-3 sm:p-4 border border-[#C64EFF]/20">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#C64EFF] flex-shrink-0" />
              <span className="font-semibold text-white text-sm sm:text-base break-words text-center">
                {planName} · {planPrice}
              </span>
            </div>
          </div>

          {/* Flip Card — Datos bancarios / Imagen */}
          <div className="relative mt-10" style={{ perspective: '1000px' }}>
            {/* Botón girar tarjeta — badge sobre el borde superior */}
            <button
              type="button"
              className="absolute left-1/2 -translate-x-1/2 -top-4 z-10 flex items-center gap-2 px-5 py-2 rounded-full bg-[#16161A] border border-[#C64EFF]/50 text-xs sm:text-sm text-white/70 hover:text-[#C64EFF] hover:border-[#C64EFF] transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(198,78,255,0.15)]"

              onClick={() => setCardFlipped(!cardFlipped)}
            >
              {cardFlipped ? (
                <RotateCw className={`h-4 w-4 transition-transform duration-700 rotate-[360deg]`} />
              ) : (
                <QrCode className="h-4 w-4" />
              )}
              <span className="whitespace-nowrap font-medium">{cardFlipped ? 'Ver datos de la cuenta' : 'Ver QR Bre-B'}</span>
            </button>

            <div
              className="relative w-full transition-transform duration-700 ease-in-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: cardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                marginTop: "30px"
              }}
            >
              {/* FRONT — Datos bancarios */}
              <div
                className="bg-gradient-to-br from-[#0E0E10] to-[#1a1a1f] rounded-2xl p-3 sm:p-4 border border-[#C64EFF]/20 shadow-2xl"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="space-y-2 sm:space-y-3" style={{ marginTop: "20px" }}>
                  {/* Número de cuenta — DESTACADO */}
                  <div className="bg-gradient-to-r from-[#C64EFF]/5 to-[#9b87f5]/5 rounded-xl p-3 sm:p-4 border border-[#C64EFF]/30">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-[10px] sm:text-xs text-[#C64EFF] uppercase tracking-widest font-medium mb-1">
                          Número de Cuenta
                        </p>
                        <p className="text-white font-bold text-lg sm:text-xl font-mono tracking-wider">
                          {bankInfo.accountNumber}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-[#C64EFF]/20 border border-[#C64EFF]/20 rounded-lg flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(bankInfo.accountNumber, "account")
                        }
                      >
                        {copiedField === "account" ? (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 sm:h-5 sm:w-5 text-[#C64EFF]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Llave Bre-B — DESTACADA (mismo estilo que Número de Cuenta) */}
                  <div className="bg-gradient-to-r from-[#C64EFF]/5 to-[#9b87f5]/5 rounded-xl p-3 sm:p-4 border border-[#C64EFF]/30">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-[10px] sm:text-xs text-[#C64EFF] uppercase tracking-widest font-medium mb-1 flex items-center gap-1.5">
                          <KeyRound className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                          Llave Bre-B
                        </p>
                        <p className="text-white font-bold text-lg sm:text-xl font-mono tracking-wider">
                          {bankInfo.brebKey}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-9 w-9 sm:h-10 sm:w-10 p-0 hover:bg-[#C64EFF]/20 border border-[#C64EFF]/20 rounded-lg flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(bankInfo.brebKey, "brebKey")
                        }
                      >
                        {copiedField === "brebKey" ? (
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 sm:h-5 sm:w-5 text-[#C64EFF]" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Banco + Tipo de cuenta */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-[#1a1a1f] rounded-lg p-3 border border-[#C64EFF]/10">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-1">
                          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                            Banco
                          </p>
                          <p className="text-white font-semibold text-sm break-words">
                            {bankInfo.bank}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                          onClick={() => copyToClipboard(bankInfo.bank, "bank")}
                        >
                          {copiedField === "bank" ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1f] rounded-lg p-3 border border-[#C64EFF]/10">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-1">
                          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                            Tipo de Cuenta
                          </p>
                          <p className="text-white font-semibold text-sm break-words">
                            {bankInfo.accountType}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                          onClick={() =>
                            copyToClipboard(bankInfo.accountType, "type")
                          }
                        >
                          {copiedField === "type" ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Titular + NIT */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="bg-[#1a1a1f] rounded-lg p-3 border border-[#C64EFF]/10">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-1">
                          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                            Titular
                          </p>
                          <p className="text-white font-semibold text-sm break-words">
                            {bankInfo.holder}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                          onClick={() => copyToClipboard(bankInfo.holder, "holder")}
                        >
                          {copiedField === "holder" ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-[#1a1a1f] rounded-lg p-3 border border-[#C64EFF]/10">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1 pr-1">
                          <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">
                            NIT
                          </p>
                          <p className="text-white font-mono font-semibold text-sm break-words">
                            {bankInfo.nit}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 w-7 p-0 hover:bg-[#C64EFF]/20 flex-shrink-0"
                          onClick={() => copyToClipboard(bankInfo.nit, "nit")}
                        >
                          {copiedField === "nit" ? (
                            <CheckCircle className="h-3.5 w-3.5 text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BACK — QR Bre-B */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-[#0E0E10] to-[#1a1a1f] rounded-2xl border border-[#C64EFF]/20 shadow-2xl overflow-hidden flex flex-col items-center justify-center"
                style={{
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <div className="flex flex-col items-center gap-3 p-4 sm:p-5" style={{ marginTop: "20px" }}>
                  <div className="flex items-center gap-2">
                    <QrCode className="h-5 w-5 text-[#C64EFF]" />
                    <h3 className="text-sm sm:text-base font-bold text-white">QR Bre-B Bancolombia</h3>
                  </div>
                  <img
                    src="https://api.foneia.com/media/resources/images/bank_details.png"
                    alt="QR Bre-B Bancolombia"
                    className="w-full max-h-[280px] object-contain rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Documentos de soporte */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full h-10 text-[10px] sm:text-xs font-medium border-[#C64EFF]/30 bg-[#C64EFF]/5 hover:bg-[#C64EFF]/15 text-white transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://api.foneia.com/media/resources/images/Certificado_Cuenta_Corriente_Osyva_SAS.pdf",
                  "_blank"
                )
              }
            >
              <div className="flex items-center gap-1.5">
                <Download className="h-3 w-3 text-[#C64EFF] flex-shrink-0" />
                <span className="truncate text-[14px]">Certificado Bancario</span>
              </div>
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 text-[14px] sm:text-xs font-medium border-[#C64EFF]/30 bg-[#C64EFF]/5 hover:bg-[#C64EFF]/15 text-white transition-all duration-300"
              onClick={() =>
                window.open(
                  "https://api.foneia.com/media/resources/images/Bre-B_Cuenta_Corriente_Osyva_SAS.pdf",
                  "_blank"
                )
              }
            >
              <div className="flex items-center gap-1.5">
                <Download className="h-3 w-3 text-[#C64EFF] flex-shrink-0" />
                <span className="truncate text-[14px]">Certificado Bre-B</span>
              </div>
            </Button>
          </div>

          {/* Instrucciones desplegables */}
          <div className="bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 rounded-xl border border-[#25D366]/30 overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 p-3 sm:px-5 cursor-pointer hover:bg-[#25D366]/5 transition-colors duration-200"
              onClick={() => setStepsOpen(!stepsOpen)}
            >
              <Clock className="h-4 w-4 text-[#25D366] flex-shrink-0" />
              <h4 className="font-semibold text-white text-xs sm:text-sm">
                ¿Qué hacer después de transferir?
              </h4>
              <ChevronDown
                className={`h-4 w-4 text-[#25D366] flex-shrink-0 transition-transform duration-300 ${stepsOpen ? "rotate-180" : ""
                  }`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${stepsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
            >
              <div className="overflow-hidden">
                <ol className="text-xs text-muted-foreground space-y-1.5 px-3 pb-3 sm:px-5 sm:pb-4 pt-0">
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

          {/* Botón de WhatsApp — CTA Principal */}
          <Button
            className="w-full h-12 sm:h-13 text-sm sm:text-base font-semibold bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.4)]"
            onClick={() => window.open(whatsappLink, "_blank")}
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Enviar comprobante por WhatsApp</span>
            </div>
          </Button>

          {/* Garantías de seguridad */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[10px] sm:text-xs text-muted-foreground pt-1">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3 text-green-400 flex-shrink-0" />
              <span>Transferencia Segura</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-400 flex-shrink-0" />
              <span>Activación en 24h</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-purple-400 flex-shrink-0" />
              <span>Soporte Incluido</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
