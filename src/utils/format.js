const locale = 'de-DE';
const currency = 'EUR';

export const formatCurrency = (value) => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency,
  maximumFractionDigits: 2,
}).format(Number(value) || 0);

export const currencySymbol = () => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency,
}).formatToParts(0).find((part) => part.type === 'currency')?.value || '€';

export const formatPercent = (value) => new Intl.NumberFormat(locale, {
  style: 'percent',
  maximumFractionDigits: 2,
}).format(value || 0);
