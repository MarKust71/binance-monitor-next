import { ParsedTrade } from '@/utils'
import { MyTrade } from '@/actions/spot/get-my-trade.types'

export const parseTrade = (trade: MyTrade): ParsedTrade => {
  const time = new Date(trade.time)

  return {
    symbol: trade.symbol as string,
    id: trade.id as number,
    orderId: trade.orderId as number,
    price: parseFloat(trade.price),
    qty: parseFloat(trade.qty),
    commission: parseFloat(trade.commission) as number,
    commissionAsset: trade.commissionAsset as string,
    time: time.toLocaleString(),
    quoteQty: parseFloat(trade.quoteQty),
  }
}
