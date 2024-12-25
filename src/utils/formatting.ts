export function formattedValueTable(
  value: string | number | undefined,
  formatType: string,
): string {
  if (value == null) {
    // Handle null or undefined
    return '-';
  }

  switch (formatType) {
    case 'date': {
      if (typeof value === 'string') {
        const date = new Date(value);
        return isNaN(date.getTime())
          ? '-'
          : date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            });
      }
      return '-';
    }
    case 'currency': {
      if (typeof value === 'number') {
        return Intl.NumberFormat('en-EN', {
          style: 'currency',
          currency: 'EUR',
          currencyDisplay: 'narrowSymbol',
        })
          .format(value)
          .replace('€', '€\u00A0');
      }
      return '-';
    }
    case 'percentage': {
      if (typeof value === 'number') {
        return `${(value * 100).toFixed(2)}%`;
      }
      return '-';
    }
    default:
      return typeof value === 'string' || typeof value === 'number' ? value.toString() : '-';
  }
}
