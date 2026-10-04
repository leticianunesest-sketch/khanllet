import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  ShieldCheck, 
  ChevronLeft
} from 'lucide-react';
import { getWhatsAppGroupLink } from '../utils/storage';

interface ThankYouPageProps {
  leadName?: string;
  onBackToHome: () => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({ 
  leadName, 
  onBackToHome 
}) => {
  const [copied, setCopied] = useState(false);
  const whatsappLink = getWhatsAppGroupLink();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(whatsappLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-stone-900 flex flex-col justify-between selection:bg-[#25D366] selection:text-white">
      {/* Top micro bar */}
      <div className="bg-emerald-600 text-white text-xs font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-200" />
        <span>Etapa 1 concluída com sucesso! Falta o último passo.</span>
      </div>

      {/* Header bar */}
      <header className="w-full max-w-4xl mx-auto px-4 pt-4 pb-2 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="text-stone-500 hover:text-stone-900 text-xs font-medium flex items-center gap-1 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar ao início</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="w-full max-w-2xl mx-auto px-4 py-6 md:py-10 flex-1 flex flex-col items-center">
        
        {/* Main Card */}
        <div className="w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-orange-950/5 border border-stone-200/80 text-center relative overflow-hidden">
          
          {/* Subtle top decoration badge */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-emerald-50 border-4 border-emerald-100 flex items-center justify-center mb-5 shadow-sm">
            <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-emerald-600" />
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight leading-tight">
            Cadastro confirmado! 🎉
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-stone-600 font-normal mt-3 max-w-lg mx-auto leading-relaxed">
            {leadName ? `${leadName}, você já está quase lá.` : 'Você já está quase lá.'} Falta apenas um passo para começar a receber as ofertas.
          </p>

          {/* Destaque: 87% progress callout */}
          <div className="mt-8 mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-200/70 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-amber-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                Falta 87% para completar seu cadastro.
              </span>
              <span className="text-xs font-bold text-amber-800">Passo 1 de 2</span>
            </div>

            {/* Progress bar container */}
            <div className="w-full h-3 bg-amber-200/60 rounded-full overflow-hidden p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-[#EE4D2D] rounded-full transition-all duration-1000 ease-out"
                style={{ width: '13%' }}
              />
            </div>
            
            <p className="text-xs text-amber-800/90 mt-2 font-medium">
              Para liberar os links dos cupons e achadinhos, você precisa entrar no nosso grupo oficial do WhatsApp.
            </p>
          </div>

          {/* Primary Action Button */}
          <div className="w-full space-y-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.99] text-white font-black text-base sm:text-lg tracking-wide uppercase transition-all shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer flex items-center justify-center gap-3 group animate-pulse-glow"
            >
              <MessageSquare className="w-6 h-6 fill-white" />
              <span>ENTRAR NO GRUPO DO WHATSAPP</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>

            {/* Exact required copy below button */}
            <p className="text-sm text-stone-600 font-medium pt-1">
              Entre no grupo para receber ofertas, cupons e oportunidades selecionadas.
            </p>
          </div>

          {/* Quick instructions of what happens next */}
          <div className="mt-8 pt-6 border-t border-stone-100 text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3 text-center sm:text-left">
              O que você vai encontrar no grupo:
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/60 text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs mb-2 mx-auto sm:mx-0">
                  1
                </div>
                <h5 className="font-bold text-xs text-stone-900">Grupo Silencioso</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">Apenas administradores enviam mensagens. Zero conversas paralelas.</p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/60 text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs mb-2 mx-auto sm:mx-0">
                  2
                </div>
                <h5 className="font-bold text-xs text-stone-900">Cupons Instantâneos</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">Alertas de cupons antes que esgotem no app da Shopee.</p>
              </div>

              <div className="bg-stone-50 rounded-xl p-3 border border-stone-200/60 text-center sm:text-left">
                <div className="w-7 h-7 rounded-lg bg-orange-100 text-[#EE4D2D] flex items-center justify-center font-bold text-xs mb-2 mx-auto sm:mx-0">
                  3
                </div>
                <h5 className="font-bold text-xs text-stone-900">Links Confiáveis</h5>
                <p className="text-[11px] text-stone-500 mt-0.5">Sem pegadinhas. Somente produtos com nota 4.8+ e frete grátis.</p>
              </div>
            </div>
          </div>

          {/* Fallback copy link button */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
            <span className="truncate max-w-xs text-stone-500 font-mono text-[11px]">
              {whatsappLink}
            </span>
            <button
              onClick={handleCopyLink}
              className="text-stone-600 hover:text-stone-900 font-semibold px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 transition-colors shrink-0"
            >
              {copied ? '✓ Link copiado!' : 'Copiar link do grupo'}
            </button>
          </div>

        </div>

      </main>

      {/* Quiet footer */}
      <footer className="w-full border-t border-orange-200/60 bg-white/70 py-4 mt-6">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 text-center">
          <p>© {new Date().getFullYear()} Clube de Ofertas Shopee. Cadastro verificado com sucesso.</p>
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ambiente 100% Seguro</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
