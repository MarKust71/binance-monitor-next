declare module '@binance/futures-connector'
declare module '@binance/connector'

import '@tanstack/react-table'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string
  }
}
