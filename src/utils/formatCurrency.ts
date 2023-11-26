/**
 * Formats price to localized price and currency string
 * @param amount - Price
 * @returns - Formatted price
 */

export default function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',
        currencyDisplay: 'narrowSymbol',
        // @ts-expect-error property does exist om Intl class
        trailingZeroDisplay: 'stripIfInteger',
    }).format(amount)
}
