export const numberColor = (value: number): string =>
  ({
    '-1': 'text-red-500',
    '1': 'text-green-600',
  })[Math.sign(value)] || 'text-gray-500'
