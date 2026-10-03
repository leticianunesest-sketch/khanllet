export function formatWhatsApp(value: string): string {
  // Remove non-digit characters
  const digits = value.replace(/\D/g, '');

  // Limit to 11 digits (DDD + 9 digits)
  const trimmed = digits.slice(0, 11);

  if (trimmed.length <= 2) {
    return trimmed.length > 0 ? `(${trimmed}` : '';
  }
  if (trimmed.length <= 6) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2)}`;
  }
  if (trimmed.length <= 10) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 6)}-${trimmed.slice(6)}`;
  }
  return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 7)}-${trimmed.slice(7, 11)}`;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidWhatsApp(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}
