export const formatDateTimeFromUtc = (utcString: string): string => {
  if (!utcString) return ''

  const date = new Date(utcString.endsWith('Z') ? utcString : `${utcString}Z`)

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
