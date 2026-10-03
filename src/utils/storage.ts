import { Lead } from '../types';

const STORAGE_KEYS = {
  WHATSAPP_LINK: 'shopee_deals_whatsapp_link',
  LEADS: 'shopee_deals_leads',
  LATEST_LEAD: 'shopee_deals_latest_lead',
};

const DEFAULT_WHATSAPP_LINK = 'https://chat.whatsapp.com/invite/ShopeeOfertasVip2025';

export function getWhatsAppGroupLink(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.WHATSAPP_LINK);
    if (saved && saved.trim()) {
      return saved.trim();
    }
  } catch (err) {
    console.error('Failed reading whatsapp link from localStorage', err);
  }
  return DEFAULT_WHATSAPP_LINK;
}

export function saveWhatsAppGroupLink(link: string): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WHATSAPP_LINK, link.trim());
  } catch (err) {
    console.error('Failed saving whatsapp link to localStorage', err);
  }
}

export function saveLead(leadData: Omit<Lead, 'id' | 'createdAt'>): Lead {
  const newLead: Lead = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    name: leadData.name.trim(),
    email: leadData.email.trim().toLowerCase(),
    whatsapp: leadData.whatsapp.trim(),
    createdAt: new Date().toISOString(),
  };

  try {
    const existingRaw = localStorage.getItem(STORAGE_KEYS.LEADS);
    const leads: Lead[] = existingRaw ? JSON.parse(existingRaw) : [];
    leads.unshift(newLead);
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
    localStorage.setItem(STORAGE_KEYS.LATEST_LEAD, JSON.stringify(newLead));
  } catch (err) {
    console.error('Failed saving lead to localStorage', err);
  }

  return newLead;
}

export function getLatestLead(): Lead | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LATEST_LEAD);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getAllLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function exportLeadsToCsv(): void {
  const leads = getAllLeads();
  if (leads.length === 0) return;

  const headers = ['ID', 'Nome', 'E-mail', 'WhatsApp', 'Data de Cadastro'];
  const rows = leads.map(l => [
    l.id,
    `"${l.name.replace(/"/g, '""')}"`,
    `"${l.email.replace(/"/g, '""')}"`,
    `"${l.whatsapp.replace(/"/g, '""')}"`,
    new Date(l.createdAt).toLocaleString('pt-BR'),
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `leads_shopee_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
