import { ParsedTrade } from '@/utils'

export const parseTrade = (
  trade: Record<string, string | number>
): ParsedTrade => {
  const time = new Date(trade.time)

  return {
    symbol: trade.symbol as string,
    id: trade.id as number,
    orderId: trade.orderId as number,
    price:
      typeof trade.price === 'string' ? parseFloat(trade.price) : trade.price,
    qty: typeof trade.qty === 'string' ? parseFloat(trade.qty) : trade.qty,
    commission: (typeof trade.commission === 'string'
      ? parseFloat(trade.commission)
      : trade) as number,
    commissionAsset: trade.commissionAsset as string,
    time: time.toLocaleString(),
    quoteQty:
      typeof trade.quoteQty === 'string'
        ? parseFloat(trade.quoteQty)
        : trade.quoteQty,
  }
}
