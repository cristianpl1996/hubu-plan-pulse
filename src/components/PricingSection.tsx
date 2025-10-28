import { Check, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

const PricingSection = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "" });

  const openCheckout = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setCheckoutOpen(true);
  };
  return (
    <section className="min-h-screen bg-background py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* BLOQUE 1 - INTRODUCCIÓN */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm text-muted-foreground mb-6">
            💡 Ahorra hasta <span className="font-semibold">87% mensual</span> frente a una recepcionista tradicional.
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Elige tu agente inteligente
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Activa el plan que se adapta a tu clínica, petshop o guardería y realiza tu pago seguro para comenzar.
          </p>
        </div>

        {/* BLOQUE 3 - PLANES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
          {/* Plan Básico */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <div className="h-full bg-card backdrop-blur-sm rounded-2xl p-6 border border-border transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
              <div className="mb-5">
                <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-4">
                  Ideal para negocios pequeños
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Plan Básico
                </h3>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Empieza a automatizar sin complicaciones.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">$50</span>
                  <span className="text-sm text-muted-foreground">USD/mes</span>
                </div>
              </div>

              <div className="mb-3 p-3 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground font-medium">Canales: WhatsApp</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Respuestas automáticas 24/7</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Info de productos y servicios</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Promociones, horarios y ubicación</span>
                </div>
                <div className="flex items-start gap-2 opacity-50">
                  <span className="text-sm text-muted-foreground line-through">Agendamiento</span>
                </div>
                <div className="flex items-start gap-2 opacity-50">
                  <span className="text-sm text-muted-foreground line-through">Recordatorios</span>
                </div>
                <div className="flex items-start gap-2 opacity-50">
                  <span className="text-sm text-muted-foreground line-through">Llamadas</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full h-11 text-base rounded-xl"
                  onClick={() => openCheckout("Plan Básico", "$50 USD/mes")}
                >
                  Activar Plan Básico
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  💡 Configuración inicial: $100 USD (único, sin costos ocultos)
                </div>
              </div>
            </div>
          </div>

          {/* Plan Completo - DESTACADO */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl opacity-75 blur-xl animate-glow-pulse"></div>
            <div className="relative h-full bg-card backdrop-blur-sm rounded-2xl p-6 border-2 border-primary shadow-2xl transform lg:scale-105">
...
              <div className="mb-5 mt-4">
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-primary" />
                  Plan Completo
                </h3>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Tu asistente 24/7 que nunca deja un cliente sin respuesta.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">$155</span>
                  <span className="text-sm text-muted-foreground">USD/mes</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-primary/10 rounded-xl border border-primary/30">
                <div className="text-sm text-foreground font-semibold mb-2">Canales: WhatsApp + Llamadas</div>
                <div className="text-sm text-muted-foreground">Todo lo anterior +</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground font-semibold">Agendamiento automático</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground font-semibold">Recordatorios automáticos</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground font-semibold">Agente de voz (300 min incluidos)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Integración con tus sistemas</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">Soporte prioritario</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105"
                  onClick={() => openCheckout("Plan Completo", "$155 USD/mes")}
                >
                  Quiero el Plan Completo ⚡
                </Button>
                <div className="text-center text-xs text-muted-foreground">
                  💡 Configuración inicial: $100 USD (único, sin costos ocultos)
                </div>
              </div>
            </div>
          </div>

          {/* Plan Avanzado - ANCLA PREMIUM */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.4s" }}>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary via-secondary to-primary rounded-2xl opacity-60 blur-2xl"></div>
            <div className="relative h-full bg-card backdrop-blur-sm rounded-2xl p-6 border-2 border-primary/50 shadow-xl transition-all duration-300 hover:border-primary hover:shadow-2xl">
...
              <div className="mb-5 mt-4">
                <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔮</span>
                  Plan Avanzado
                </h3>
                <p className="text-sm text-muted-foreground mb-3 italic">
                  Haz que tus datos trabajen por ti.
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">$350</span>
                  <span className="text-sm text-muted-foreground">USD/mes</span>
                </div>
              </div>

              <div className="mb-4 p-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/40">
                <div className="text-sm text-foreground font-semibold mb-2">Canales: WhatsApp + Llamadas + Voz + Panel de datos</div>
                <div className="text-sm text-muted-foreground">Todo lo anterior +</div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">🔗</span>
                  <span className="text-sm text-foreground font-semibold">Integración de sistemas y clientes</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">🧹</span>
                  <span className="text-sm text-foreground font-semibold">Limpieza y organización automática de datos</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">📊</span>
                  <span className="text-sm text-foreground font-semibold">Segmentación y predicción con IA</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">💬</span>
                  <span className="text-sm text-foreground font-semibold">Campañas automáticas y personalizadas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-base flex-shrink-0">🎧</span>
                  <span className="text-sm text-foreground font-semibold">750 min de voz al mes + soporte 1:1</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105 animate-glow-pulse"
                  onClick={() => openCheckout("Plan Avanzado", "$350 USD/mes")}
                >
                  Quiero el Plan Avanzado 💎
                </Button>
                <div className="text-center text-xs text-primary font-medium">
                  💎 Configuración inicial: incluida (valor $100 USD)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 4 - TESTIMONIO Y REASEGURO */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="text-xl text-foreground font-medium">
                💬 "El 80% de nuestras clínicas eligen el Plan Completo por su integración total."
              </div>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span>✓ Sin permanencia mínima</span>
                <span>·</span>
                <span>✓ Soporte técnico incluido</span>
                <span>·</span>
                <span>✓ Activación en 2-3 semanas</span>
              </div>
            </div>
          </div>
        </div>

        {/* BLOQUE 5 - CTA FINAL */}
        <div className="text-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button 
            size="lg" 
            className="h-14 px-12 text-base rounded-2xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105"
          >
            Agenda una demostración y prueba tu agente en vivo
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
          Sin compromiso. Configuración en menos de 48h.
          </p>
        </div>
      </div>

      <CheckoutModal
        open={checkoutOpen}
        onOpenChange={setCheckoutOpen}
        planName={selectedPlan.name}
        planPrice={selectedPlan.price}
      />
    </section>
  );
};

export default PricingSection;
