import { useState, useEffect } from "react";
import Header from "@/components/Header";

interface Service {
  price: number;
  setup: number;
  name: string;
}

const services: Record<string, Service> = {
  whatsapp: { price: 2400, setup: 200, name: "WhatsApp Auto 24/7" },
  voice: { price: 600, setup: 200, name: "Voz IA (300 min)" },
  data: { price: 2400, setup: 200, name: "Análisis de Datos" },
  content: { price: 2400, setup: 0, name: "Fábrica de Contenido IA" },
};

const DISCOUNT_RATE = 0.2; // 20% de descuento
const TRM = 3744.43;

const Calculator = () => {
  const [whatsappQty, setWhatsappQty] = useState<string>("");
  const [voiceQty, setVoiceQty] = useState<string>("");
  const [dataQty, setDataQty] = useState<string>("");
  const [contentQty, setContentQty] = useState<string>("");
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerCompany, setCustomerCompany] = useState("");
  const [orderSummary, setOrderSummary] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [voiceWarning, setVoiceWarning] = useState(false);
  const [dataWarning, setDataWarning] = useState(false);
  const [contentWarning, setContentWarning] = useState(false);

  const formatUSD = (num: number) =>
    num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const formatCOP = (num: number) =>
    num.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    });

  const validateVoice = () => {
    const whatsapp = parseInt(whatsappQty) || 0;
    const voice = parseInt(voiceQty) || 0;
    setVoiceWarning(voice > whatsapp);
  };

  const validateData = () => {
    const whatsapp = parseInt(whatsappQty) || 0;
    const data = parseInt(dataQty) || 0;
    setDataWarning(data > whatsapp);
  };

  const validateContent = () => {
    const whatsapp = parseInt(whatsappQty) || 0;
    const content = parseInt(contentQty) || 0;
    setContentWarning(content > whatsapp);
  };

  useEffect(() => {
    validateVoice();
  }, [whatsappQty, voiceQty]);

  useEffect(() => {
    validateData();
  }, [whatsappQty, dataQty]);

  useEffect(() => {
    validateContent();
  }, [whatsappQty, contentQty]);

  const calculate = () => {
    const whatsapp = parseInt(whatsappQty) || 0;
    const voice = Math.min(parseInt(voiceQty) || 0, whatsapp);
    const data = Math.min(parseInt(dataQty) || 0, whatsapp);
    const content = Math.min(parseInt(contentQty) || 0, whatsapp);

    let totalRecurringList = 0;
    let totalSetup = 0;
    let breakdownHTML = "";

    if (whatsapp > 0) {
      const subTotal = services.whatsapp.price * whatsapp;
      const subSetup = services.whatsapp.setup * whatsapp;
      totalRecurringList += subTotal;
      totalSetup += subSetup;
      breakdownHTML += `
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 5px; padding: 5px; background: rgba(16, 185, 129, 0.05); border-radius: 4px;">
          <span>📱 ${
            services.whatsapp.name
          }: ${whatsapp} × $${services.whatsapp.price.toLocaleString()} USD</span>
          <span style="float: right; color: white; font-weight: 600;">$${subTotal.toLocaleString()} USD</span>
        </div>
      `;
    }

    if (voice > 0) {
      const subTotal = services.voice.price * voice;
      const subSetup = services.voice.setup * voice;
      totalRecurringList += subTotal;
      totalSetup += subSetup;
      breakdownHTML += `
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 5px;">
          <span>📞 ${
            services.voice.name
          }: ${voice} × $${services.voice.price.toLocaleString()} USD</span>
          <span style="float: right; color: white;">$${subTotal.toLocaleString()} USD</span>
        </div>
      `;
    }

    if (data > 0) {
      const subTotal = services.data.price * data;
      const subSetup = services.data.setup * data;
      totalRecurringList += subTotal;
      totalSetup += subSetup;
      breakdownHTML += `
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 5px;">
          <span>🤖 ${
            services.data.name
          }: ${data} × $${services.data.price.toLocaleString()} USD</span>
          <span style="float: right; color: white;">$${subTotal.toLocaleString()} USD</span>
        </div>
      `;
    }

    if (content > 0) {
      const subTotal = services.content.price * content;
      totalRecurringList += subTotal;
      breakdownHTML += `
        <div style="font-size: 0.75rem; color: #94a3b8; margin-bottom: 5px;">
          <span>✨ ${
            services.content.name
          }: ${content} × $${services.content.price.toLocaleString()} USD</span>
          <span style="float: right; color: white;">$${subTotal.toLocaleString()} USD</span>
        </div>
      `;
    }

    const totalDiscount = totalRecurringList * DISCOUNT_RATE;
    const totalRecurringDiscounted = totalRecurringList - totalDiscount;
    const finalTotal = totalRecurringDiscounted + totalSetup;
    const totalCOP = finalTotal * TRM;

    return {
      subtotalLicenses: formatUSD(totalRecurringDiscounted),
      listPrice: formatUSD(totalRecurringList),
      discountAmount: "-" + formatUSD(totalDiscount),
      setupFee: formatUSD(totalSetup),
      totalPrice: formatUSD(finalTotal),
      totalCOP: formatCOP(totalCOP),
      savingsBadge:
        totalDiscount > 0
          ? `¡Ahorro corporativo: ${formatUSD(totalDiscount)} USD!`
          : "Configura tu paquete",
      breakdownHTML: breakdownHTML
        ? `
          <div style="background: rgba(168, 85, 247, 0.05); padding: 10px; border-radius: 8px; border: 1px solid rgba(168, 85, 247, 0.2);">
            <div style="font-size: 0.7rem; color: #a855f7; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Desglose por Servicio (Precio de Lista)</div>
            ${breakdownHTML}
            <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 0.7rem; color: #94a3b8;">
              <strong>Total de Clínicas:</strong> ${whatsapp} 
              ${
                voice > 0
                  ? `<span style="margin-left: 10px;">• ${voice} con Voz</span>`
                  : ""
              }
              ${
                data > 0
                  ? `<span style="margin-left: 10px;">• ${data} con Datos</span>`
                  : ""
              }
              ${
                content > 0
                  ? `<span style="margin-left: 10px;">• ${content} con Contenido</span>`
                  : ""
              }
            </div>
          </div>
        `
        : `
          <div style="background: rgba(168, 85, 247, 0.05); padding: 15px; border-radius: 8px; border: 1px dashed rgba(168, 85, 247, 0.2); text-align: center;">
            <div style="font-size: 0.85rem; color: #94a3b8;">👆 Configura las cantidades arriba para ver tu presupuesto</div>
          </div>
        `,
      whatsapp,
      voice,
      data,
      content,
    };
  };

  const calculation = calculate();
  const isOrderButtonDisabled = calculation.whatsapp === 0;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isFormValid = customerName.trim() !== "" && customerEmail.trim() !== "" && emailRegex.test(customerEmail);

  const handleSubmitOrder = async () => {
    if (!isFormValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      customer: {
        name: customerName,
        email: customerEmail,
        company: customerCompany || "",
      },
      services: {
        whatsapp: calculation.whatsapp,
        voice: calculation.voice,
        data: calculation.data,
        content: calculation.content,
      },
      totals: {
        listPrice: calculation.listPrice,
        discount: calculation.discountAmount,
        subtotal: calculation.subtotalLicenses,
        setup: calculation.setupFee,
        total: calculation.totalPrice,
        totalCOP: calculation.totalCOP,
      },
      timestamp: new Date().toISOString(),
    };

    try {
      // Enviar datos al webhook
      const response = await fetch(
        "https://n8n.bettercode.com.co/webhook/9a2ac3d7-877f-447b-b2e1-595a7278d320",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al enviar el pedido");
      }

      console.log("Pedido enviado exitosamente:", orderData);

      // Generar resumen HTML
      let summaryHTML =
        '<div class="order-summary"><h4>Resumen de tu Pedido</h4>';
      summaryHTML += `<div class="order-item"><span>Cliente:</span><strong>${customerName}</strong></div>`;
      summaryHTML += `<div class="order-item"><span>Email:</span><strong>${customerEmail}</strong></div>`;
      if (customerCompany.trim()) {
        summaryHTML += `<div class="order-item"><span>Empresa:</span><strong>${customerCompany}</strong></div>`;
      }
      summaryHTML +=
        '<div style="margin: 15px 0; border-top: 1px solid rgba(255,255,255,0.1);"></div>';

      if (calculation.whatsapp > 0)
        summaryHTML += `<div class="order-item"><span>📱 WhatsApp:</span><strong>${calculation.whatsapp} clínicas</strong></div>`;
      if (calculation.voice > 0)
        summaryHTML += `<div class="order-item"><span>📞 Voz IA:</span><strong>${calculation.voice} clínicas</strong></div>`;
      if (calculation.data > 0)
        summaryHTML += `<div class="order-item"><span>🤖 Análisis de Datos:</span><strong>${calculation.data} clínicas</strong></div>`;
      if (calculation.content > 0)
        summaryHTML += `<div class="order-item"><span>✨ Contenido IA:</span><strong>${calculation.content} clínicas</strong></div>`;

      summaryHTML +=
        '<div style="margin: 15px 0; border-top: 1px solid rgba(255,255,255,0.1);"></div>';
      summaryHTML += `<div class="order-item" style="font-size: 1.1rem;"><span>Total:</span><strong style="color: #a855f7;">${orderData.totals.total} USD</strong></div></div>`;

      setOrderSummary(summaryHTML);
      setOrderModalOpen(false);
      setSuccessModalOpen(true);
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
      alert("Hubo un error al enviar tu pedido. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        /* Ocultar spinners de inputs numéricos en Chrome, Safari, Edge */
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        /* Ocultar spinners en Firefox */
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <Header />
      <div className="min-h-screen bg-[#050511] text-white p-5 flex justify-center">
        <div className="max-w-[900px] w-full bg-gradient-to-b from-white/3 to-transparent rounded-3xl p-8 shadow-2xl">
          <header className="text-center mb-8">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
              Simulador de inversión en IA
            </h1>
            <div className="text-slate-400 text-sm mt-8 mb-8">
              💡 Ahorra hasta <span className="font-semibold">87% mensual</span>{" "}
              frente a operaciones tradicionales.
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Controles */}
            <div className="controls">
              <div className="mb-5">
                <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                  Servicios
                </label>

                {/* WhatsApp Card */}
                <div className="bg-[#121226] border border-white/10 rounded-lg mb-3 overflow-hidden transition-all hover:border-purple-500">
                  <div className="p-3">
                    <div className="flex items-center">
                      <div
                        className="w-[18px] h-[18px] bg-green-500 border-green-500 rounded border-2 flex items-center justify-center text-white mr-3"
                        style={{ color: "white" }}
                      >
                        ✓
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold m-0">
                          WhatsApp Auto 24/7{" "}
                          <span className="text-green-500 text-xs">(BASE)</span>
                        </h3>
                        <p className="text-xs text-slate-400 m-1 mt-0">
                          Respuestas automáticas
                        </p>
                        <p className="text-purple-500 font-semibold mt-1 text-xs">
                          $2,400 USD/año · Setup $200 USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-3 flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-normal">
                      Cantidad de clínicas:
                    </label>
                    <input
                      type="number"
                      value={whatsappQty}
                      onChange={(e) => setWhatsappQty(e.target.value)}
                      min="0"
                      placeholder="0"
                      className="w-20 p-2 bg-[#121226] border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Voz IA Card */}
                <div className="bg-[#121226] border border-pink-500/30 rounded-lg mb-3 overflow-hidden transition-all hover:border-purple-500">
                  <div className="p-3">
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold m-0">
                          + Voz IA (300 min)
                        </h3>
                        <p className="text-xs text-slate-400 m-1 mt-0">
                          Llamadas automáticas
                        </p>
                        <p className="text-pink-500 font-semibold mt-1 text-xs">
                          +$600 USD/año · Setup $200 USD
                        </p>
                      </div>
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 rounded text-[10px] font-bold">
                        300 min
                      </span>
                    </div>
                  </div>
                  <div className="px-3 pb-3 flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-normal">
                      Cantidad de clínicas:
                    </label>
                    <input
                      type="number"
                      value={voiceQty}
                      onChange={(e) => {
                        setVoiceQty(e.target.value);
                        validateVoice();
                      }}
                      min="0"
                      max="999"
                      placeholder="0"
                      className={`w-20 p-2 bg-[#121226] border rounded-lg text-white text-sm focus:outline-none ${
                        voiceWarning
                          ? "border-yellow-500"
                          : "border-pink-500/30 focus:border-purple-500"
                      }`}
                    />
                    {voiceWarning && (
                      <span className="text-[10px] text-yellow-500">
                        ⚠️ No puede exceder WhatsApp
                      </span>
                    )}
                  </div>
                </div>

                {/* Análisis de Datos Card */}
                <div className="bg-[#121226] border border-pink-500/30 rounded-lg mb-3 overflow-hidden transition-all hover:border-purple-500">
                  <div className="p-3">
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold m-0">
                          + Análisis de Datos
                        </h3>
                        <p className="text-xs text-slate-400 m-1 mt-0">
                          Predicción IA avanzada
                        </p>
                        <p className="text-pink-500 font-semibold mt-1 text-xs">
                          +$2,400 USD/año · Setup $200 USD
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-3 flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-normal">
                      Cantidad de clínicas:
                    </label>
                    <input
                      type="number"
                      value={dataQty}
                      onChange={(e) => {
                        setDataQty(e.target.value);
                        validateData();
                      }}
                      min="0"
                      max="999"
                      placeholder="0"
                      className={`w-20 p-2 bg-[#121226] border rounded-lg text-white text-sm focus:outline-none ${
                        dataWarning
                          ? "border-yellow-500"
                          : "border-pink-500/30 focus:border-purple-500"
                      }`}
                    />
                    {dataWarning && (
                      <span className="text-[10px] text-yellow-500">
                        ⚠️ No puede exceder WhatsApp
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                  Marketing
                </label>
                <div className="bg-[#121226] border border-white/10 rounded-lg mb-3 overflow-hidden transition-all hover:border-purple-500">
                  <div className="p-3">
                    <div className="flex items-center w-full">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold m-0">
                          Fábrica de Contenido IA
                        </h3>
                        <p className="text-xs text-slate-400 m-1 mt-0">
                          Generación automática
                        </p>
                        <p className="text-purple-500 font-semibold mt-1 text-xs">
                          $2,400 USD/año por clínica
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pb-3 flex items-center gap-2">
                    <label className="text-xs text-slate-400 font-normal">
                      Cantidad de clínicas:
                    </label>
                    <input
                      type="number"
                      value={contentQty}
                      onChange={(e) => {
                        setContentQty(e.target.value);
                        validateContent();
                      }}
                      min="0"
                      max="999"
                      placeholder="0"
                      className={`w-20 p-2 bg-[#121226] border rounded-lg text-white text-sm focus:outline-none ${
                        contentWarning
                          ? "border-yellow-500"
                          : "border-white/10 focus:border-purple-500"
                      }`}
                    />
                    {contentWarning && (
                      <span className="text-[10px] text-yellow-500">
                        ⚠️ No puede exceder WhatsApp
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resultados */}
            <div className="bg-[#0f101a] rounded-2xl p-6 flex flex-col justify-between border border-white/5 relative overflow-hidden mt-6">
              <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ height: "3px" }}
              ></div>
              <div>
                <h3 className="mt-0 text-purple-500 text-lg mb-4">
                  Inversión estimada
                </h3>

                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: calculation.breakdownHTML,
                  }}
                />

                <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-white/10">
                  <span className="text-slate-400 text-sm">
                    Subtotal licencias (anual)
                  </span>
                  <span className="text-base font-medium">
                    {calculation.subtotalLicenses} USD
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-white/10">
                  <span className="text-slate-400 text-sm">
                    Precio de lista (sin descuento)
                  </span>
                  <span className="text-base line-through text-slate-500 text-sm">
                    {calculation.listPrice} USD
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 pb-2 border-b border-white/10">
                  <span className="text-slate-400 text-sm">
                    Ahorro partner (20%)
                  </span>
                  <span className="text-base text-green-500">
                    {calculation.discountAmount} USD
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-2 pb-2 border-b-2 border-white/20">
                  <span className="text-slate-400 text-sm">Setup único</span>
                  <span className="text-base text-yellow-500">
                    {calculation.setupFee} USD
                  </span>
                </div>
              </div>
              <div className="mt-auto text-right">
                <div className="mb-2">
                  <span className="text-slate-400 text-sm block">
                    Total primer año (licencias + setup)
                  </span>
                  <span className="text-4xl font-bold block mt-1 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
                    {calculation.totalPrice} USD
                  </span>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10">
                  <span className="text-slate-400 text-sm block">
                    Equivalente en pesos colombianos
                  </span>
                  <span className="text-xl font-semibold text-slate-400 block mt-1">
                    {calculation.totalCOP}
                  </span>
                  <span className="text-[10px] text-slate-400 opacity-70">
                    TRM: $3,744.43
                  </span>
                </div>
                <div className="inline-block bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs mt-2">
                  {calculation.savingsBadge}
                </div>
                <button
                  onClick={() => setOrderModalOpen(true)}
                  disabled={isOrderButtonDisabled}
                  className="w-full mt-5 p-4 bg-gradient-to-br from-purple-500 to-pink-500 border-none rounded-xl text-white text-lg font-bold cursor-pointer transition-all uppercase tracking-wider hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  Ordenar ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Captura de Datos */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center backdrop-blur-md"
          onClick={() => setOrderModalOpen(false)}
        >
          <div
            className="bg-[#121226] border border-white/20 rounded-3xl pt-0 pb-10 px-10 max-w-[500px] w-[90%] relative shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <h2 className="text-2xl mb-2 mt-10 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Finalizar pedido
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              Completa tus datos para recibir la cotización oficial
            </p>

            <div className="mb-5">
              <label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                Nombre encargado *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Ingresa tu nombre completo"
                required
                className="w-full bg-[#050511] border border-white/10 p-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                Correo electrónico *
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="tu.correo@empresa.com"
                required
                className="w-full bg-[#050511] border border-white/10 p-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                Empresa
              </label>
              <input
                type="text"
                value={customerCompany}
                onChange={(e) => setCustomerCompany(e.target.value)}
                placeholder="Nombre de tu empresa"
                className="w-full bg-[#050511] border border-white/10 p-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setOrderModalOpen(false)}
                className="flex-1 p-3 border-none rounded-lg text-base font-semibold cursor-pointer transition-all bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitOrder}
                disabled={!isFormValid || isSubmitting}
                className={`flex-1 p-3 border-none rounded-lg text-base font-semibold transition-all ${
                  isFormValid && !isSubmitting
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(168,85,247,0.4)]"
                    : "bg-white/5 text-slate-400 border border-white/10 cursor-not-allowed opacity-50"
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar orden"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {successModalOpen && (
        <div className="fixed inset-0 bg-black/85 z-[1000] flex items-center justify-center backdrop-blur-md">
          <div className="bg-[#121226] border border-white/20 rounded-3xl pt-0 pb-10 px-10 max-w-[500px] w-[90%] relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>
            <div className="text-center mt-10">
              <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center text-4xl animate-[successPop_0.5s_ease-out]">
                ✓
              </div>
              <style>{`
                @keyframes successPop {
                  0% { transform: scale(0); }
                  50% { transform: scale(1.1); }
                  100% { transform: scale(1); }
                }
              `}</style>
              <h2 className="text-2xl mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                ¡Pedido Recibido!
              </h2>
              <p className="text-slate-400 text-sm mb-8">
                Gracias por tu orden. Te enviaremos la cotización oficial a tu
                correo.
              </p>

              <style>{`
                .order-item {
                  display: flex;
                  justify-content: space-between;
                  padding: 8px 0;
                  font-size: 0.85rem;
                  color: #94a3b8;
                }
                .order-item strong {
                  color: white;
                }
                .order-summary h4 {
                  color: #a855f7;
                  margin-bottom: 15px;
                  font-size: 0.9rem;
                  text-transform: uppercase;
                  letter-spacing: 1px;
                }
              `}</style>
              <div
                className="bg-white/3 p-5 rounded-lg my-5 border border-white/10 text-left"
                dangerouslySetInnerHTML={{ __html: orderSummary }}
              />

              <button
                onClick={() => {
                  setSuccessModalOpen(false);
                  setCustomerName("");
                  setCustomerEmail("");
                  setCustomerCompany("");
                }}
                className="w-full mt-5 p-3 border-none rounded-lg text-base font-semibold cursor-pointer transition-all bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(168,85,247,0.4)]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Calculator;
