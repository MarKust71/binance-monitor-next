import { Order as OrderType } from './order.types'

type OrderProps = {
  order: OrderType
}

export const Order = ({ order }: OrderProps) => {
  return <p>Order: {JSON.stringify(order)}</p>
}
