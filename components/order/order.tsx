import { Order as OrderType } from './order.types'
import { parseOrder } from '@/utils/parse-order'

type OrderProps = {
  order: OrderType
}

export const Order = ({ order }: OrderProps) => {
  return (
    <p style={{ marginBottom: '16px' }}>
      Order: {JSON.stringify(parseOrder(order))}
    </p>
  )
}
