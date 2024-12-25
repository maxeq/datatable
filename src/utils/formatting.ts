export function formattedValue(key: string, value: string | number): string {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return '';
  }

  if (['created_at', 'due_date', 'pay_date', 'dueDate', 'earlyPayDate'].includes(key)) {
    const date = new Date(value as string);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  if (key === 'amount' || key === 'early_pay') {
    return Intl.NumberFormat('en-EN', {
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'narrowSymbol',
    })
      .format(value as number)
      .replace('€', '€\u00A0');
  }

  if (key === 'pay_discount') {
    return `${((value as number) * 100).toFixed(2)}%`;
  }

  return value.toString();
}
