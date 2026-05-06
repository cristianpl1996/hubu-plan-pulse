import { Check, Sparkles, Phone, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { CheckoutModal } from "./CheckoutModal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tipos para planes cargados dinámicamente desde Supabase
type PricingFeature = {
  text: string;
  included: boolean;
  highlighted?: boolean;
  emoji?: string;
};

const BILLING_PERIODS = ["mensual", "trimestral", "semestral", "anual"] as const;

type BillingPeriod = (typeof BILLING_PERIODS)[number];

const BILLING_PERIOD_LABELS: Record<BillingPeriod, string> = {
  mensual: "MENSUAL",
  trimestral: "TRIMESTRAL",
  semestral: "SEMESTRAL",
  anual: "ANUAL",
};

const PRICE_PERIOD_LABELS: Record<BillingPeriod, string> = {
  mensual: "COP/mes",
  trimestral: "COP/trimestre",
  semestral: "COP/semestre",
  anual: "COP/año",
};

const isBillingPeriod = (value: unknown): value is BillingPeriod =>
  typeof value === "string" && BILLING_PERIODS.includes(value as BillingPeriod);

const normalizeBillingPeriod = (value: unknown): BillingPeriod => {
  if (isBillingPeriod(value)) return value;
  if (typeof value !== "string") return "mensual";

  const normalizedValue = value.trim().toLowerCase();
  if (normalizedValue === "año" || normalizedValue === "ano") return "anual";
  if (isBillingPeriod(normalizedValue)) return normalizedValue;

  return "mensual";
};

const resolveBillingPeriod = (planObj: Record<string, unknown>): BillingPeriod => {
  const candidateKeys = [
    "billingPeriod",
    "billing_period",
    "planPeriod",
    "plan_period",
    "frequency",
    "periodo",
    "period",
  ] as const;

  for (const key of candidateKeys) {
    const candidate = planObj[key];
    const normalized = normalizedBillingCandidate(candidate);
    if (normalized) {
      return normalized;
    }
  }

  return "mensual";
};

const normalizedBillingCandidate = (value: unknown): BillingPeriod | null => {
  if (typeof value !== "string") return null;

  const normalizedValue = value.trim().toLowerCase();
  if (normalizedValue === "año" || normalizedValue === "ano") return "anual";
  if (isBillingPeriod(normalizedValue)) return normalizedValue;

  return null;
};

const resolvePricePeriodLabel = (
  planObj: Record<string, unknown>,
  billingPeriod: BillingPeriod,
): string => {
  const candidateKeys = ["pricePeriodLabel", "periodLabel", "period_text", "periodText"] as const;

  for (const key of candidateKeys) {
    const candidate = planObj[key];
    if (typeof candidate === "string" && candidate.trim() !== "") {
      return candidate;
    }
  }

  const rawPeriod = planObj.period;
  if (typeof rawPeriod === "string" && rawPeriod.trim() !== "" && !normalizedBillingCandidate(rawPeriod)) {
    return rawPeriod;
  }

  return PRICE_PERIOD_LABELS[billingPeriod];
};

type PricingPlan = {
  id: string;
  id_url?: string | number | null;
  name: string;
  description?: string;
  price: string; // El API devuelve texto o número; lo normalizamos a string
  billingPeriod: BillingPeriod;
  pricePeriodLabel: string;
  icon?: ComponentType<{ className?: string }> | null; // opcional; mapeamos si existe
  iconEmoji?: string;
  badge?: string;
  channels?: string;
  features: PricingFeature[];
  buttonText?: string;
  buttonVariant?: "default" | "outline";
  setupCost?: string;
  animationDelay?: string;
  isHighlighted?: boolean;
  isPopular?: boolean;
  isPremium?: boolean;
};

// Componente para renderizar una card de precio individual
const PricingCard = ({
  plan,
  onSelectPlan,
}: {
  plan: PricingPlan;
  onSelectPlan: (name: string, price: string) => void;
}) => {
  const IconComponent = plan.icon;

  return (
    <div
      className="relative animate-scale-in w-full sm:w-[360px] md:w-[380px]"
      style={{ animationDelay: plan.animationDelay }}
    >
      {/* Efectos de fondo para planes destacados */}
      {plan.isHighlighted && (
        <div
          className={`absolute -inset-1 rounded-2xl opacity-75 blur-xl ${plan.isPopular
            ? "bg-gradient-to-r from-primary to-secondary animate-glow-pulse"
            : "bg-gradient-to-br from-primary via-secondary to-primary opacity-60 blur-2xl"
            }`}
        ></div>
      )}

      <div
        className={`relative h-full bg-card backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${plan.isHighlighted
          ? `border-2 border-primary shadow-2xl ${plan.isPopular
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
              className={`text-4xl font-bold ${plan.isHighlighted
                ? "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                : "text-foreground"
                }`}
            >
              {plan.price}
            </span>
            <span className="text-sm text-muted-foreground">{plan.pricePeriodLabel}</span>
          </div>
        </div>

        {/* Canales */}
        <div
          className={`mb-4 p-3 rounded-xl ${plan.isHighlighted
            ? "bg-primary/10 border border-primary/30"
            : "bg-muted/30"
            }`}
        >
          <div
            className={`text-sm font-medium ${plan.isHighlighted
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
              className={`flex items-start gap-2 ${!feature.included ? "opacity-50" : ""
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
                className={`text-sm ${feature.included
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
            className={`w-full h-12 text-base rounded-xl ${plan.isHighlighted
              ? "bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:scale-105"
              : "h-11"
              } ${plan.isPremium ? "animate-glow-pulse" : ""}`}
            onClick={() =>
              onSelectPlan(plan.name, `${plan.price} ${plan.pricePeriodLabel}`)
            }
          >
            {plan.buttonText}
          </Button>
          <div
            className={`text-center text-xs ${plan.isPremium
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
  const [activeUrlId, setActiveUrlId] = useState<string | null>(null);
  const [plans, setPlans] = useState<PricingPlan[] | null>(null);
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState<BillingPeriod>("mensual");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lee el id desde la URL: usa ?id=... o el último segmento de la ruta
  const readIdFromUrl = () => {
    try {
      const url = new URL(window.location.href);
      const queryId = url.searchParams.get("id");
      if (queryId) return queryId.toLowerCase();
      const pathParts = window.location.pathname.split("/").filter(Boolean);
      const lastSegment = pathParts[pathParts.length - 1];
      return lastSegment ? lastSegment.toLowerCase() : null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const applyId = () => setActiveUrlId(readIdFromUrl());
    applyId();
    // Escucha cambios de historial/navegación para actualizar dinámicamente
    window.addEventListener("popstate", applyId);
    window.addEventListener("hashchange", applyId);
    return () => {
      window.removeEventListener("popstate", applyId);
      window.removeEventListener("hashchange", applyId);
    };
  }, []);

  // Carga dinámica desde Supabase REST
  useEffect(() => {
    if (!activeUrlId) {
      // Si no hay id en la URL, mostramos error
      setError("No se encontró un identificador en la URL");
      setLoading(false);
      return () => { }; // función de limpieza vacía
    }

    const controller = new AbortController();
    const fetchPlans = async () => {
      setLoading(true);
      setError(null);
      try {
        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";
        // Construimos la URL con el filtro del id_url
        const url = `https://supabase.bettercode.com.co/rest/v1/pricing_plans?plan->>id_url=eq.${activeUrlId}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            Accept: "application/json",
          },
          signal: controller.signal,
        });
        if (!res.ok) {
          throw new Error(`Error ${res.status}`);
        }
        const data = (await res.json()) as unknown[];
        // Mapeamos defensivamente a nuestro tipo de UI (tabla devuelve un campo plan anidado)
        const mapped: PricingPlan[] = (data as Record<string, unknown>[]).map((row, idx) => {
          const rawPlan = (row as { plan?: unknown }).plan;
          const planObj: Record<string, unknown> =
            typeof rawPlan === "string"
              ? (() => {
                try {
                  const parsed = JSON.parse(rawPlan);
                  return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : {};
                } catch {
                  return {};
                }
              })()
              : (rawPlan as Record<string, unknown>) || {};

          // Iconos
          let icon: ComponentType<{ className?: string }> | undefined = undefined;
          const iconKey = typeof planObj.icon === "string" ? planObj.icon.toLowerCase() : "";
          if (iconKey === "phone") icon = Phone;
          if (iconKey === "message" || iconKey === "whatsapp" || iconKey === "messagecircle") icon = MessageCircle;
          const emojiFromPlan = (planObj as { emoji?: unknown }).emoji;
          const iconEmoji: string | undefined =
            (typeof planObj.iconEmoji === "string" ? (planObj.iconEmoji as string) : undefined) ??
            (icon ? undefined : (typeof emojiFromPlan === "string" ? (emojiFromPlan as string) : undefined));

          // Features
          const rawFeatures = (planObj as { features?: unknown }).features;
          const features: PricingFeature[] = Array.isArray(rawFeatures)
            ? (rawFeatures as PricingFeature[])
            : typeof rawFeatures === "string"
              ? (() => {
                try {
                  const parsed = JSON.parse(rawFeatures);
                  return Array.isArray(parsed) ? parsed : [];
                } catch {
                  return [];
                }
              })()
              : [];

          const priceValue = (planObj as { price?: unknown }).price;
          const price = typeof priceValue === "number" ? `$${priceValue}` : String(priceValue ?? "");
          const billingPeriod = resolveBillingPeriod(planObj);
          const pricePeriodLabel = resolvePricePeriodLabel(planObj, billingPeriod);

          const rawIdUrl = (planObj as { id_url?: unknown }).id_url;
          const id_url: string | number | null =
            typeof rawIdUrl === "string" || typeof rawIdUrl === "number" ? rawIdUrl : null;

          return {
            id: String((planObj as { id?: unknown }).id ?? (row as { id?: unknown }).id ?? idx),
            id_url,
            name: String((planObj as { name?: unknown }).name ?? ""),
            description: (planObj as { description?: unknown }).description as string | undefined,
            price,
            billingPeriod,
            pricePeriodLabel,
            icon,
            iconEmoji,
            badge: (planObj as { badge?: unknown }).badge as string | undefined,
            channels: (planObj as { channels?: unknown }).channels as string | undefined,
            features,
            buttonText: ((planObj as { buttonText?: unknown }).buttonText as string | undefined) ?? "Elegir plan",
            buttonVariant:
              (planObj as { buttonVariant?: unknown }).buttonVariant === "outline" ? "outline" : "default",
            setupCost: (planObj as { setupCost?: unknown }).setupCost as string | undefined,
            animationDelay:
              ((planObj as { animationDelay?: unknown }).animationDelay as string | undefined) ?? `${0.2 + idx * 0.1}s`,
            isHighlighted: Boolean((planObj as { isHighlighted?: unknown }).isHighlighted),
            isPopular: Boolean((planObj as { isPopular?: unknown }).isPopular),
            isPremium: Boolean((planObj as { isPremium?: unknown }).isPremium),
          };
        });
        setPlans(mapped);
        setSelectedBillingPeriod(mapped[0]?.billingPeriod ?? "mensual");
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : "No fue posible cargar los planes";
        setError(message);
        setPlans(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
    return () => controller.abort();
  }, [activeUrlId]);

  const plansToRender = useMemo(() => {
    if (!plans) return null; // datos cargados
    const filteredPlans = plans.filter((plan) => plan.billingPeriod === selectedBillingPeriod);
    if (filteredPlans.length === 0) return null;
    // Ya no necesitamos filtrar porque el endpoint lo hace
    const parsePriceToNumber = (price: string): number => {
      // Extrae dígitos, puntos y comas, luego normaliza a número
      const cleaned = price
        .toString()
        .replace(/[^0-9.,-]/g, "")
        .replace(/,(?=\d{3}(\D|$))/g, "") // elimina separadores de miles con coma
        .replace(/\.(?=\d{3}(\D|$))/g, ""); // elimina separadores de miles con punto
      const normalized = cleaned.replace(",", ".");
      const n = parseFloat(normalized);
      return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY;
    };
    const sorted = [...filteredPlans].sort((a, b) => parsePriceToNumber(a.price) - parsePriceToNumber(b.price));
    return sorted;
  }, [plans, selectedBillingPeriod]);

  const availableBillingPeriods = useMemo(() => {
    if (!plans || plans.length === 0) return [];

    return BILLING_PERIODS.filter((period) => plans.some((plan) => plan.billingPeriod === period));
  }, [plans]);

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
        <div className="text-center mb-12 animate-fade-in-up">
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

        {!loading && !error && availableBillingPeriods.length > 1 && (
          <div className="flex justify-center mb-16 animate-fade-in-up">
            <Tabs
              value={selectedBillingPeriod}
              onValueChange={(value) => setSelectedBillingPeriod(normalizeBillingPeriod(value))}
            >
              <TabsList className="h-auto flex-wrap gap-2 rounded-[20px] border border-primary/15 bg-[#11162A]/85 p-2 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                {availableBillingPeriods.map((period) => (
                  <TabsTrigger
                    key={period}
                    value={period}
                    className="min-w-[138px] rounded-2xl border border-transparent px-5 py-3 text-xs font-semibold tracking-[0.22em] text-white/68 transition-all duration-300 data-[state=active]:border-primary/50 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary/20 data-[state=active]:to-secondary/20 data-[state=active]:text-white data-[state=active]:shadow-[0_0_24px_hsl(var(--primary)/0.22)]"
                  >
                    {BILLING_PERIOD_LABELS[period]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        {/* BLOQUE 3 - PLANES / LOADING / NOT FOUND */}
        {loading ? (
          <div className="mb-20 max-w-3xl mx-auto">
            <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <h3 className="text-2xl font-semibold text-foreground">Cargando planes…</h3>
              </div>
              <p className="text-muted-foreground">Espera un momento mientras obtenemos la información.</p>
            </div>
          </div>
        ) : error ? (
          <div className="mb-20 max-w-3xl mx-auto">
            <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-2">Hubo un problema</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          </div>
        ) : plansToRender ? (
          <div className="flex flex-wrap justify-center gap-8 mb-20 max-w-7xl mx-auto">
            {plansToRender.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                onSelectPlan={openCheckout}
              />
            ))}
          </div>
        ) : (
          <div className="mb-20 max-w-3xl mx-auto">
            <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border text-center">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                404 - No encontramos planes para este enlace
              </h3>
              <p className="text-muted-foreground">
                Asegúrate de usar una URL válida con un identificador.
              </p>
            </div>
          </div>
        )}

        {/* BLOQUE 4 - TESTIMONIO Y REASEGURO */}
        <div
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl p-8 border border-border max-w-4xl mx-auto">
            <div className="text-center space-y-4">
              <div className="text-xl text-foreground font-medium">
                <span className="inline md:flex justify-center items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary hidden md:inline" />
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
            AGENDA UNA DEMOSTRACIÓN <span className="hidden md:inline">EN VIVO</span>
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
