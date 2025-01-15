import { Trade } from '@/components/trades/trades.types'

type TradesProps = {
  trades: Trade[]
}

export const Trades = ({ trades }: TradesProps) => {
  return <p>Trades: {JSON.stringify(trades)}</p>
}
