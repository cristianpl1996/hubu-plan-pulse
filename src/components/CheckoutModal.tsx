import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Building2 } from "lucide-react";
import { useState } from "react";
import { TransferModal } from "./TransferModal";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planName: string;
  planPrice: string;
}

export function CheckoutModal({ open, onOpenChange, planName, planPrice }: CheckoutModalProps) {
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
            <p className="text-center text-muted-foreground mb-6">
              {planName} · {planPrice}
            </p>

            <Button
              className="w-full h-14 text-base bg-gradient-to-r from-[#C64EFF] to-[#9b87f5] hover:opacity-90 transition-all duration-300 shadow-[0_0_30px_rgba(198,78,255,0.3)]"
              onClick={() => {
                // TODO: Integrate with Stripe or payment gateway
                window.open('https://stripe.com', '_blank');
              }}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Pagar con tarjeta o débito
            </Button>

            <Button
              variant="outline"
              className="w-full h-14 text-base border-[#C64EFF]/50 hover:bg-[#C64EFF]/10 hover:border-[#C64EFF] transition-all duration-300"
              onClick={() => setShowTransferModal(true)}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Pagar por transferencia bancaria
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <TransferModal
        open={showTransferModal}
        onOpenChange={setShowTransferModal}
        planName={planName}
      />
    </>
  );
}
