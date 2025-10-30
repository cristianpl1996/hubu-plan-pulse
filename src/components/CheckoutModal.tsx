import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { TransferModal } from "./TransferModal";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: string;
}

export function CheckoutModal({
  open,
  onOpenChange,
  planName,
  planPrice,
}: CheckoutModalProps) {
  const [showTransferModal, setShowTransferModal] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-[#16161A] border-[#C64EFF]/30">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] bg-clip-text text-transparent">
              Elige cómo deseas pagar
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4 sm:py-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-[#C64EFF] flex-shrink-0" />
              <span className="font-semibold text-white text-sm sm:text-base break-words text-center">
                {planName} · {planPrice}
              </span>
            </div>

            <Button
              className="w-full h-12 sm:h-14 text-sm sm:text-base bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(198,78,255,0.3)]"
              onClick={() => setShowTransferModal(true)}
            >
              <Building2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Pagar por transferencia bancaria</span>
            </Button>

            <Button
              disabled
              variant="outline"
              className="w-full h-12 sm:h-14 text-sm sm:text-base border-[#C64EFF]/50 bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            >
              <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">Pagar con tarjeta o débito (próximamente)</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TransferModal
        open={showTransferModal}
        onOpenChange={setShowTransferModal}
        planName={planName}
        planPrice={planPrice}
      />
    </>
  );
}
