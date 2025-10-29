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
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] bg-clip-text text-transparent">
              Elige cómo deseas pagar
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle className="h-5 w-5 text-[#C64EFF]" />
              <span className="font-semibold text-white">
                {planName} · {planPrice}
              </span>
            </div>

            <Button
              className="w-full h-14 text-base bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(198,78,255,0.3)]"
              onClick={() => setShowTransferModal(true)}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Pagar por transferencia bancaria
            </Button>

            <Button
              disabled
              variant="outline"
              className="w-full h-14 text-base border-[#C64EFF]/50 bg-muted text-muted-foreground cursor-not-allowed opacity-60"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pagar con tarjeta o débito (próximamente)
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
