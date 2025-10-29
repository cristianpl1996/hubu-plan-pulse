import { Check, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

// Datos de los planes de precios
const pricingPlans = [
  {
    id: "basico",
    name: "Plan básico",
    description: "Empieza a automatizar sin complicaciones.",
    price: "$100",
    period: "USD/mes",
    icon: MessageCircle,
    badge: "Ideal para negocios pequeños",
    channels: "WhatsApp",
    features: [
      { text: "Respuestas automáticas 24/7", included: true },
      { text: "Info de productos y servicios", included: true },
      { text: "Promociones, horarios y ubicación", included: true },
      { text: "Agendamiento", included: false },
      { text: "Recordatorios", included: false },
      { text: "Llamadas", included: false },
    ],
    buttonText: "Activar plan básico",
    buttonVariant: "outline" as const,
    setupCost: "$100 USD (único, sin costos ocultos)",
    animationDelay: "0.2s",
    isHighlighted: false,
  },
  {
    id: "completo",
    name: "Plan completo",
    description: "Tu asistente 24/7 que nunca deja un cliente sin respuesta.",
    price: "$155",
    period: "USD/mes",
    icon: Phone,
    badge: "Ideal para negocios medianos",
    channels: "WhatsApp + Llamadas",
    features: [
      { text: "Agendamiento automático", included: true, highlighted: true },
      { text: "Recordatorios automáticos", included: true, highlighted: true },
      {
        text: "Agente de voz (300 min incluidos)",
        included: true,
        highlighted: true,
      },
      { text: "Integración con tus sistemas", included: true },
      { text: "Soporte prioritario", included: true },
    ],
    buttonText: "Quiero el plan completo",
    buttonVariant: "default" as const,
    setupCost: "$100 USD (único, sin costos ocultos)",
    animationDelay: "0.3s",
    isHighlighted: true,
    isPopular: true,
  },
  {
    id: "avanzado",
    name: "Plan avanzado",
    description: "Haz que tus datos trabajen por ti.",
    price: "$350",
    period: "USD/mes",
    icon: null,
    iconEmoji: "🔮",
    badge: "Ideal para negocios grandes",
    channels: "WhatsApp + Llamadas + Voz + Panel de datos",
    features: [
      {
        text: "Integración de sistemas y clientes",
        included: true,
        emoji: "🔗",
      },
      {
        text: "Limpieza y organización automática de datos",
        included: true,
        emoji: "🧹",
      },
      { text: "Segmentación y predicción con IA", included: true, emoji: "📊" },
      {
        text: "Campañas automáticas y personalizadas",
        included: true,
        emoji: "💬",
      },
      {
        text: "750 min de voz al mes + soporte 1:1",
        included: true,
        emoji: "🎧",
      },
    ],
    buttonText: "Quiero el plan avanzado",
    buttonVariant: "default" as const,
    setupCost: "incluida (valor $100 USD)",
    animationDelay: "0.4s",
    isHighlighted: true,
    isPremium: true,
  },
];

// Componente para renderizar una card de precio individual
const PricingCard = ({
  plan,
  onSelectPlan,
}: {
  plan: (typeof pricingPlans)[0];
  onSelectPlan: (name: string, price: string) => void;
}) => {
  const IconComponent = plan.icon;

  return (
    <div
      className="relative animate-scale-in"
      style={{ animationDelay: plan.animationDelay }}
    >
      {/* Efectos de fondo para planes destacados */}
      {plan.isHighlighted && (
        <div
          className={`absolute -inset-1 rounded-2xl opacity-75 blur-xl ${
            plan.isPopular
              ? "bg-gradient-to-r from-primary to-secondary animate-glow-pulse"
              : "bg-gradient-to-br from-primary via-secondary to-primary opacity-60 blur-2xl"
          }`}
        ></div>
      )}

      <div
        className={`relative h-full bg-card backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${
          plan.isHighlighted
            ? `border-2 border-primary shadow-2xl ${
                plan.isPopular
                  ? "transform lg:scale-105"
                  : "hover:border-primary hover:shadow-2xl"
              }`
            : "border-border"
        }`}
      >
        <div className="mb-5">
          {/* Badge */}
          {plan.badge && (
            <div className="inline-block px-4 py-1 bg-muted rounded-full text-sm text-muted-foreground mb-4">
              {plan.badge}
            </div>
          )}

          {/* Título */}
          <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            {IconComponent ? (
              <IconComponent className="w-6 h-6 text-primary" />
            ) : (
              <span className="text-2xl">{plan.iconEmoji}</span>
            )}
            {plan.name}
          </h3>

          {/* Descripción */}
          <p className="text-sm text-muted-foreground mb-3 italic">
            {plan.description}
          </p>

          {/* Precio */}
          <div className="flex items-baseline gap-2">
            <span
              className={`text-4xl font-bold ${
                plan.isHighlighted
                  ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  : "text-foreground"
              }`}
            >
              {plan.price}
            </span>
            <span className="text-sm text-muted-foreground">{plan.period}</span>
          </div>
        </div>

        {/* Canales */}
        <div
          className={`mb-4 p-3 rounded-xl ${
            plan.isHighlighted
              ? "bg-primary/10 border border-primary/30"
              : "bg-muted/30"
          }`}
        >
          <div
            className={`text-sm font-medium ${
              plan.isHighlighted
                ? "text-foreground font-semibold"
                : "text-muted-foreground"
            }`}
          >
            Canales: {plan.channels}
          </div>
          {plan.isHighlighted && (
            <div className="text-sm text-muted-foreground">
              Todo lo anterior +
            </div>
          )}
        </div>

        {/* Características */}
        <div className="space-y-3 mb-6">
          {plan.features.map((feature, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${
                !feature.included ? "opacity-50" : ""
              }`}
            >
              {feature.included ? (
                feature.emoji ? (
                  <span className="text-base flex-shrink-0">
                    {feature.emoji}
                  </span>
                ) : (
                  <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                )
              ) : null}
              <span
                className={`text-sm ${
                  feature.included
                    ? feature.highlighted
                      ? "text-foreground font-semibold"
                      : "text-foreground"
                    : "text-muted-foreground line-through"
                }`}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Botón y costo de configuración */}
        <div className="space-y-3">
          <Button
            variant={plan.buttonVariant}
            className={`w-full h-12 text-base rounded-xl ${
              plan.isHighlighted
                ? "bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105"
                : "h-11"
            } ${plan.isPremium ? "animate-glow-pulse" : ""}`}
            onClick={() =>
              onSelectPlan(plan.name, `${plan.price} ${plan.period}`)
            }
          >
            {plan.buttonText}
          </Button>
          <div
            className={`text-center text-xs ${
              plan.isPremium
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            💡 Configuración inicial: {plan.setupCost}
          </div>
        </div>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({ name: "", price: "" });

  const openCheckout = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setCheckoutOpen(true);
  };

  const handleDemoClick = () => {
    window.location.href = "https://www.hubu.com.co/?modal=true";
  };

  return (
    <section className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* BLOQUE 1 - INTRODUCCIÓN */}
        <div className="text-center mb-16 animate-fade-in-up">
          <p className="text-sm text-muted-foreground mb-6">
            💡 Ahorra hasta <span className="font-semibold">87% mensual</span>{" "}
            frente a una recepcionista tradicional.
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Elige tu agente inteligente
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Activa el plan que se adapta a tu clínica, petshop o guardería y
            realiza tu pago seguro para comenzar.
          </p>
        </div>

        {/* BLOQUE 3 - PLANES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 max-w-7xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              onSelectPlan={openCheckout}
            />
          ))}
        </div>

        {/* BLOQUE 4 - TESTIMONIO Y REASEGURO */}
        <div
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="text-xl text-foreground font-medium">
                <span className="flex justify-center items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  El 80% de nuestras clínicas eligen el{" "}
                  <strong>plan completo</strong> por su integración total.
                </span>
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
        <div
          className="text-center animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <Button
            size="lg"
            className="h-14 px-12 text-base rounded-2xl bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] transition-all duration-300 hover:scale-105"
            onClick={handleDemoClick}
          >
            AGENDA UNA DEMOSTRACIÓN EN VIVO
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Configuración en menos de 48h.
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
