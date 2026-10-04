import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Flame, 
  ShoppingBag, 
  ArrowRight, 
  Lock, 
  Check, 
  Percent, 
  Clock, 
  User, 
  Mail, 
  Phone 
} from 'lucide-react';
import { formatWhatsApp, isValidEmail, isValidWhatsApp } from '../utils/formatters';
import { saveLead } from '../utils/storage';
import heroImage from '../assets/images/shopee_deals_hero_1791038845311.jpg';

interface CapturePageProps {
  onSuccess: (leadName: string) => void;
}

export const CapturePage: React.FC<CapturePageProps> = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [errors, setErrors] = useState<{ 
    firstName?: string; 
    email?: string; 
    whatsapp?: string; 
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsapp(formatted);
    if (errors.whatsapp) {
      setErrors(prev => ({ ...prev, whatsapp: undefined }));
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    if (errors.firstName) {
      setErrors(prev => ({ ...prev, firstName: undefined }));
    }
  };

  const handleSurnameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSurname(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { firstName?: string; email?: string; whatsapp?: string } = {};

    if (!firstName.trim() || firstName.trim().length < 2) {
      newErrors.firstName = 'Por favor, digite seu nome.';
    }

    if (!isValidEmail(email)) {
      newErrors.email = 'Digite um e-mail válido (ex: seuemail@gmail.com).';
    }

    if (!isValidWhatsApp(whatsapp)) {
      newErrors.whatsapp = 'Digite um número de WhatsApp válido com DDD.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${surname.trim()}`.trim();
    saveLead({ name: fullName, email, whatsapp });

    // Submit natively to hidden iframe so systeme.io registers the subscription
    if (formRef.current) {
      try {
        formRef.current.submit();
      } catch (err) {
        console.warn('systeme.io form submission caught:', err);
      }
    }

    // Smooth transition to thank you page
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(firstName.trim());
    }, 450);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-stone-900 flex flex-col justify-between selection:bg-[#EE4D2D] selection:text-white">
      {/* Top promotional bar */}
      <div className="bg-[#EE4D2D] text-white text-xs font-semibold py-2 px-4 text-center tracking-wide shadow-sm flex items-center justify-center gap-2">
        <Flame className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
        <span>Vagas limitadas para o grupo VIP de ofertas e cupons exclusivos da Shopee</span>
      </div>

      {/* Header bar (sem menu de navegação e sem painel de admin) */}
      <header className="w-full max-w-6xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#EE4D2D] flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-xl">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg text-stone-900 tracking-tight">Clube de Ofertas</span>
              <span className="bg-[#EE4D2D] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider">SHOPEE</span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium">Curadoria diária de cupons & achados</p>
          </div>
        </div>
      </header>

      {/* Main hero & form section */}
      <main className="w-full max-w-5xl mx-auto px-4 py-4 md:py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Copy & visual elements */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Live verified tag */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#EE4D2D]">
              <span className="w-2 h-2 rounded-full bg-[#EE4D2D] animate-ping" />
              <span>RADAR DE OFERTAS ATIVO HOJE</span>
              <span className="text-stone-300 font-normal">|</span>
              <span className="text-stone-500 font-normal">Cupons de até 70% OFF</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-stone-900 tracking-tight leading-[1.12]">
              Quer receber ofertas que <span className="text-[#EE4D2D] underline decoration-[#EE4D2D]/30 decoration-wavy underline-offset-4">realmente valem a pena?</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed">
              Cadastre-se gratuitamente e receba acesso às melhores oportunidades, cupons e descontos selecionados.
            </p>

            {/* E-commerce discount vouchers visual showcase */}
            <div className="relative pt-2 pb-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100 shadow-sm p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <div className="w-full sm:w-44 h-36 sm:h-36 shrink-0 rounded-xl overflow-hidden bg-white shadow-inner border border-orange-100/80 relative">
                    <img 
                      src={heroImage} 
                      alt="Ofertas e cupons Shopee em destaque" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 bg-[#EE4D2D] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-sm">
                      VERIFICADO
                    </div>
                  </div>

                  <div className="flex-1 space-y-2.5 w-full">
                    <div className="text-xs font-bold uppercase tracking-wider text-stone-400">
                      O QUE VOCÊ VAI RECEBER
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white/90 px-3 py-2 rounded-lg border border-orange-200/50 shadow-2xs">
                        <Tag className="w-4 h-4 text-[#EE4D2D] shrink-0" />
                        <span>Cupons de Frete Grátis e Descontos Relâmpago</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white/90 px-3 py-2 rounded-lg border border-orange-200/50 shadow-2xs">
                        <Flame className="w-4 h-4 text-[#EE4D2D] shrink-0" />
                        <span>Achadinhos de 50% a 80% mais baratos</span>
                      </div>

                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-white/90 px-3 py-2 rounded-lg border border-orange-200/50 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Apenas produtos de vendedores bem avaliados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust and social proof line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-500 pt-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>100% Gratuito</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Sem SPAM</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Links Seguros e Oficiais</span>
              </div>
            </div>

          </div>

          {/* Right Column: Lead capture form integrated with systeme.io */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-950/5 border border-stone-200/80 relative">
              
              {/* Form header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-50 text-[#EE4D2D] text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ACESSO IMEDIATO</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                  Garanta sua vaga agora
                </h2>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Preencha seus dados para entrar no clube de ofertas
                </p>
              </div>

              {/* Hidden iframe for background systeme.io subscription without leaving the page */}
              <iframe 
                name="hidden_systeme_iframe" 
                id="hidden_systeme_iframe" 
                style={{ display: 'none' }} 
                title="systeme.io Subscribe Target"
              />

              {/* Form integrated with systeme.io endpoint */}
              <form 
                ref={formRef}
                action="https://systeme.io/embedded/45261770/subscription"
                method="post"
                target="hidden_systeme_iframe"
                onSubmit={handleSubmit} 
                className="space-y-4"
              >
                
                {/* Nome & Sobrenome (systeme.io: first_name & surname) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="first_name" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Nome
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        placeholder="Primeiro nome"
                        autoComplete="given-name"
                        disabled={isSubmitting}
                        className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all outline-none ${
                          errors.firstName 
                            ? 'border-red-400 bg-red-50/30 text-stone-900 focus:ring-2 focus:ring-red-400/20' 
                            : 'border-stone-300 bg-stone-50/50 text-stone-900 focus:border-[#EE4D2D] focus:bg-white focus:ring-3 focus:ring-[#EE4D2D]/15'
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-red-500 font-medium mt-1 pl-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="surname" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                      Sobrenome
                    </label>
                    <input
                      id="surname"
                      name="surname"
                      type="text"
                      value={surname}
                      onChange={handleSurnameChange}
                      placeholder="Sobrenome"
                      autoComplete="family-name"
                      disabled={isSubmitting}
                      className="w-full px-3.5 py-3 rounded-xl border border-stone-300 bg-stone-50/50 text-stone-900 text-sm sm:text-base font-medium transition-all outline-none focus:border-[#EE4D2D] focus:bg-white focus:ring-3 focus:ring-[#EE4D2D]/15"
                    />
                  </div>
                </div>

                {/* E-mail Field (systeme.io: email) */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    E-mail
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="seu.email@exemplo.com"
                      autoComplete="email"
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all outline-none ${
                        errors.email 
                          ? 'border-red-400 bg-red-50/30 text-stone-900 focus:ring-2 focus:ring-red-400/20' 
                          : 'border-stone-300 bg-stone-50/50 text-stone-900 focus:border-[#EE4D2D] focus:bg-white focus:ring-3 focus:ring-[#EE4D2D]/15'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 font-medium mt-1 pl-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* WhatsApp Field */}
                <div>
                  <label htmlFor="whatsapp" className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    WhatsApp
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={handlePhoneChange}
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                      autoComplete="tel"
                      disabled={isSubmitting}
                      className={`w-full pl-10 pr-3.5 py-3 rounded-xl border text-sm sm:text-base font-medium transition-all outline-none ${
                        errors.whatsapp 
                          ? 'border-red-400 bg-red-50/30 text-stone-900 focus:ring-2 focus:ring-red-400/20' 
                          : 'border-stone-300 bg-stone-50/50 text-stone-900 focus:border-[#EE4D2D] focus:bg-white focus:ring-3 focus:ring-[#EE4D2D]/15'
                      }`}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p className="text-xs text-red-500 font-medium mt-1 pl-1">
                      {errors.whatsapp}
                    </p>
                  )}
                </div>

                {/* High Contrast CTA Button */}
                <div className="pt-2 f-row">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn w-full py-4 px-6 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg tracking-wide uppercase transition-all shadow-lg shadow-orange-500/30 hover:shadow-orange-500/45 cursor-pointer disabled:opacity-75 disabled:cursor-wait flex items-center justify-center gap-2 group animate-pulse-glow"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>CADASTRANDO...</span>
                      </span>
                    ) : (
                      <>
                        <span>QUERO RECEBER AS OFERTAS</span>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>

                {/* Small message below form */}
                <p className="text-center text-xs text-stone-500 pt-1 font-medium">
                  Cadastro gratuito. Você poderá sair quando quiser.
                </p>

                {/* Security tag */}
                <div className="pt-2 border-t border-stone-100 flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Seus dados estão protegidos e não serão compartilhados.</span>
                </div>

              </form>

            </div>
          </div>

        </div>

        {/* E-commerce deal preview cards: real shopping motivation */}
        <section className="mt-14 pt-8 border-t border-orange-200/50">
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#EE4D2D]">
              EXEMPLOS DE OFERTAS QUE ENVIAMOS
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Descontos reais que nossos membros aproveitam
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Deal card 1 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-100 text-[#EE4D2D]">
                  CUPOM EXCLUSIVO
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> -72% OFF
                </span>
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                Fone Bluetooth TWS Sem Fio Pro
              </h4>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xs text-stone-400 line-through">De R$ 149,90</span>
                <span className="text-lg font-black text-[#EE4D2D]">Por R$ 41,90</span>
              </div>
              <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Esgotou em 42 minutos no grupo</span>
              </div>
            </div>

            {/* Deal card 2 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  FRETE GRÁTIS
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> -58% OFF
                </span>
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                Mini Processador e Triturador Elétrico USB
              </h4>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xs text-stone-400 line-through">De R$ 69,90</span>
                <span className="text-lg font-black text-[#EE4D2D]">Por R$ 28,90</span>
              </div>
              <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Mais de 1.400 compras registradas</span>
              </div>
            </div>

            {/* Deal card 3 */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden sm:col-span-2 md:col-span-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-red-100 text-red-700">
                  ERRO DE PREÇO / RELÂMPAGO
                </span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                  <Percent className="w-3 h-3" /> -81% OFF
                </span>
              </div>
              <h4 className="font-bold text-sm text-stone-900">
                Smartwatch Fit Tracker Pro com Notificações
              </h4>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-xs text-stone-400 line-through">De R$ 199,00</span>
                <span className="text-lg font-black text-[#EE4D2D]">Por R$ 37,80</span>
              </div>
              <div className="mt-2 text-[11px] text-stone-500 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Alerta enviado 15 min antes do término</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet clean footer */}
      <footer className="w-full border-t border-orange-200/60 bg-white/70 py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Clube de Ofertas Shopee. Todos os direitos reservados.</p>
          <p className="text-[11px] text-stone-400 text-center sm:text-right">
            Este site atua como divulgador independente de ofertas e cupons públicos da plataforma Shopee.
          </p>
        </div>
      </footer>
    </div>
  );
};
