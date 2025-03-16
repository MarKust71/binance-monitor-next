export const formatDateTimeFromUtc = (utcString: string): string => {
  const date = new Date(utcString) // Parsowanie daty UTC
  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Europe/Warsaw', // Konwersja na czas polski (CET/CEST)
  })
    .format(date)
    .replace(',', '') // Usunięcie przecinka
}
