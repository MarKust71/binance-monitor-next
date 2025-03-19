export const formatNumber = (
  value: number,
  fraction: number = 2,
  sign: boolean = false
): string =>
  new Intl.NumberFormat('pl-PL', {
    style: 'decimal',
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
    useGrouping: true,
    signDisplay: sign ? 'exceptZero' : 'negative',
  }).format(value)
