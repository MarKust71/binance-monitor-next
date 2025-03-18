export const formatDateTimeFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp) // Utworzenie daty na podstawie timestamp (w milisekundach)

  return new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Europe/Warsaw',
  })
    .format(date)
    .replace(',', '')
}
