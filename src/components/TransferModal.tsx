import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

interface TransferModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
}

export function TransferModal({ open, onOpenChange, planName }: TransferModalProps) {
  const whatsappMessage = `Hola, ya realicé la transferencia para el ${planName} de Hubu. Adjunto mi comprobante.`;
  const whatsappLink = `https://wa.me/573102523739?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-[#16161A] border-[#C64EFF]/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] bg-clip-text text-transparent">
            Pago por transferencia bancaria
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-6">
          <div className="bg-[#0E0E10] rounded-xl p-6 border border-[#C64EFF]/20">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-[#C64EFF]" />
              <h3 className="text-lg font-semibold text-white">Cuenta Bancaria Hubu</h3>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Banco:</span>
                <span className="text-white font-medium">Bancolombia</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo de cuenta:</span>
                <span className="text-white font-medium">Corriente</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Número:</span>
                <span className="text-white font-mono font-semibold">123 456 789-01</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Titular:</span>
                <span className="text-white font-medium">OSYVA SAS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">NIT:</span>
                <span className="text-white font-mono font-medium">901.000.111-2</span>
              </div>
            </div>
          </div>

          <div className="bg-[#C64EFF]/10 rounded-lg p-4 border border-[#C64EFF]/30">
            <p className="text-sm text-muted-foreground text-center">
              Una vez realices el pago, envía el comprobante a WhatsApp{" "}
              <span className="text-[#C64EFF] font-semibold">+57 310 252 3739</span>{" "}
              indicando el plan elegido y nombre de tu clínica.
            </p>
          </div>

          <Button
            className="w-full h-14 text-base bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:opacity-90 transition-all duration-300"
            onClick={() => window.open(whatsappLink, '_blank')}
          >
            Abrir WhatsApp para enviar comprobante
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            🔒 Confirmaremos tu activación en menos de 24 h tras recibir el soporte.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
