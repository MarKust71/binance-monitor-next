import { ParsedOrder } from '@/utils/parse-order/parse-order.types'

export const parseOrder = (
  order: Record<string, string | number>
): ParsedOrder => {
  const time = new Date(order.time)
  const updateTime = new Date(order.updateTime)

  return {
    symbol: order.symbol as string,
    orderId: order.orderId as string,
    price:
      typeof order.price === 'string' ? parseFloat(order.price) : order.price,
    origQty:
      typeof order.origQty === 'string'
        ? parseFloat(order.origQty)
        : order.origQty,
    executedQty:
      typeof order.executedQty === 'string'
        ? parseFloat(order.executedQty)
        : order.executedQty,
    cummulativeQuoteQty:
      typeof order.cummulativeQuoteQty === 'string'
        ? parseFloat(order.cummulativeQuoteQty)
        : order.cummulativeQuoteQty,
    status: order.status as string,
    type: order.type as string,
    side: order.side as string,
    icebergQty:
      typeof order.icebergQty === 'string'
        ? parseFloat(order.icebergQty)
        : order.icebergQty,
    time: time.toLocaleString(),
    updateTime: updateTime.toLocaleString(),
  }
}
