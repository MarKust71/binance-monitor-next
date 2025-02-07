export const formatNumber = (value: number, fraction: number = 2): string =>
  new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
    useGrouping: true,
  }).format(value)
