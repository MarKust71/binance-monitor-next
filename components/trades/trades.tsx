import { Trade } from '@/components/trades/trades.types'

type TradesProps = {
  trades: Trade[]
}

export const Trades = ({ trades }: TradesProps) => {
  return (
    <p style={{ marginBottom: '16px' }}>Trades: {JSON.stringify(trades)}</p>
  )
}
