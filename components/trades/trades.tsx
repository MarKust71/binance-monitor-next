import { ParsedTrade } from '@/utils/parse-trade/parse-trade.types'

type TradesProps = {
  trades: ParsedTrade[]
}

export const Trades = ({ trades }: TradesProps) => {
  return (
    <p style={{ marginBottom: '16px' }}>Trades: {JSON.stringify(trades)}</p>
  )
}
