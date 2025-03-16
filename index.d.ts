import '@tanstack/react-table'

declare module '@binance/futures-connector'
declare module '@binance/connector'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string
  }
}
