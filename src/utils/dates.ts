/**
 * Format a date range as "dd.mm — dd.mm.yyyy" or "dd.mm.yyyy — dd.mm.yyyy"
 */
export function formatDateRange(startStr: string, endStr: string): string {
  const start = new Date(startStr);
  const end = new Date(endStr);
  const sd = String(start.getDate()).padStart(2, '0');
  const sm = String(start.getMonth() + 1).padStart(2, '0');
  const ed = String(end.getDate()).padStart(2, '0');
  const em = String(end.getMonth() + 1).padStart(2, '0');
  const ey = end.getFullYear();
  if (start.getFullYear() === end.getFullYear()) {
    return `${sd}.${sm} — ${ed}.${em}.${ey}`;
  }
  return `${sd}.${sm}.${start.getFullYear()} — ${ed}.${em}.${ey}`;
}

/**
 * Format a single date as "dd.mm.yyyy"
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.${d.getFullYear()}`;
}

/**
 * Format an exhibition date as "Month YYYY" with French month names.
 */
export function formatExhibitionMonth(dateStr: string): string {
  const d = new Date(dateStr);
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
  ];
  return `${months[d.getMonth()]} ${d.getFullYear()}`;
}
