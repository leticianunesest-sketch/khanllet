import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  ExternalLink, 
  Download, 
  Users, 
  Link as LinkIcon, 
  Check, 
  Trash2, 
  RefreshCw,
  Eye
} from 'lucide-react';
import { 
  getWhatsAppGroupLink, 
  saveWhatsAppGroupLink, 
  getAllLeads, 
  exportLeadsToCsv 
} from '../utils/storage';
import { Lead } from '../types';

interface AdminConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTo: (view: 'capture' | 'thankyou') => void;
  currentView: 'capture' | 'thankyou';
}

export const AdminConfigModal: React.FC<AdminConfigModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigateTo,
  currentView 
}) => {
  const [whatsappLink, setWhatsappLink] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activeTab, setActiveTab] = useState<'link' | 'leads'>('link');

  useEffect(() => {
    if (isOpen) {
      setWhatsappLink(getWhatsAppGroupLink());
      setLeads(getAllLeads());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whatsappLink.trim()) return;

    saveWhatsAppGroupLink(whatsappLink);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2500);
  };

  const handleClearLeads = () => {
    if (window.confirm('Tem certeza que deseja apagar os leads salvos localmente neste navegador?')) {
      localStorage.removeItem('shopee_deals_leads');
      localStorage.removeItem('shopee_deals_latest_lead');
      setLeads([]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h3 className="font-bold text-base text-stone-900">
              Painel de Configurações da Campanha
            </h3>
            <p className="text-xs text-stone-500">
              Personalize o link de redirecionamento e gerencie os leads capturados
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 px-5 bg-white">
          <button
            onClick={() => setActiveTab('link')}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'link'
                ? 'border-[#EE4D2D] text-[#EE4D2D]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Link do WhatsApp</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('leads');
              setLeads(getAllLeads());
            }}
            className={`py-3 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'leads'
                ? 'border-[#EE4D2D] text-[#EE4D2D]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Leads Capturados ({leads.length})</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1">
          {activeTab === 'link' ? (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 uppercase tracking-wider">
                  Link de Convite do Grupo do WhatsApp
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={whatsappLink}
                    onChange={(e) => setWhatsappLink(e.target.value)}
                    placeholder="https://chat.whatsapp.com/invite/..."
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm font-medium focus:border-[#EE4D2D] focus:ring-2 focus:ring-[#EE4D2D]/20 outline-none"
                  />
                </div>
                <p className="text-[11px] text-stone-500 mt-1.5">
                  Cole o link gerado no seu WhatsApp (Configurações do Grupo &gt; Convidar via link). Ao clicar no botão da página de obrigado, os usuários serão direcionados para cá.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#EE4D2D] hover:bg-[#D73211] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Link</span>
                </button>

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Testar Link</span>
                </a>

                {savedSuccess && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
                    <Check className="w-4 h-4" />
                    Salvo com sucesso!
                  </span>
                )}
              </div>

              {/* View switcher for quick preview */}
              <div className="mt-6 pt-5 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  Pré-visualizar Páginas:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTo('capture');
                      onClose();
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      currentView === 'capture'
                        ? 'bg-orange-100 text-[#EE4D2D] border border-orange-200'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Página de Captura</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onNavigateTo('thankyou');
                      onClose();
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      currentView === 'thankyou'
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Página de Obrigado</span>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Total de Cadastros: {leads.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLeads(getAllLeads())}
                    className="p-1.5 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
                    title="Recarregar lista"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={exportLeadsToCsv}
                    disabled={leads.length === 0}
                    className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Exportar CSV</span>
                  </button>
                  {leads.length > 0 && (
                    <button
                      onClick={handleClearLeads}
                      className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                      title="Limpar todos os leads"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {leads.length === 0 ? (
                <div className="py-10 text-center text-stone-400 bg-stone-50 rounded-xl border border-dashed border-stone-200">
                  <Users className="w-8 h-8 mx-auto mb-2 text-stone-300" />
                  <p className="text-xs font-medium">Nenhum lead cadastrado ainda.</p>
                  <p className="text-[11px] text-stone-400 mt-1">Preencha o formulário na página de captura para testar.</p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-stone-200 rounded-xl">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 font-semibold uppercase text-[10px]">
                      <tr>
                        <th className="py-2 px-3">Nome</th>
                        <th className="py-2 px-3">E-mail</th>
                        <th className="py-2 px-3">WhatsApp</th>
                        <th className="py-2 px-3">Data</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-stone-50/80">
                          <td className="py-2 px-3 font-semibold text-stone-800">{lead.name}</td>
                          <td className="py-2 px-3 text-stone-600">{lead.email}</td>
                          <td className="py-2 px-3 font-mono text-stone-700">{lead.whatsapp}</td>
                          <td className="py-2 px-3 text-stone-400 text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString('pt-BR')} {new Date(lead.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-stone-200 bg-stone-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
