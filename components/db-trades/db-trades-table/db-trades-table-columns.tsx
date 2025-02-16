'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatDateTime } from '@/utils/format-date-time'
import { formatNumber } from '@/utils/format-number'
import { DbSide, DbTrade } from '@/stores/db-trades-store/db.trades.store.types'

export const dbTradesTableColumns: ColumnDef<DbTrade>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'date_time',
    header: 'Open Time',
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTime(date)}</div>
    },
  },
  {
    accessorKey: 'side',
    header: 'Side',
    cell: (row) => {
      const side = row.getValue() as DbSide
      return <div className={'font-bold'}>{side}</div>
    },
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'price',
    header: () => <div className={'text-left'}>{'Price'}</div>,
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    cell: (row) => formatNumber(row.getValue() as number, 4),
  },
  {
    accessorKey: 'rest_quantity',
    header: 'Rest',
    cell: (row) => formatNumber((row.getValue() as number) || 0, 4),
  },
  {
    accessorKey: 'atr',
    header: 'ATR',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'stop_loss',
    header: 'S/L',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'take_profit',
    header: 'T/P',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'take_profit_partial',
    header: 'T/P Part',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'take_profit_partial_price',
    header: 'T/P Part Price',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'take_profit_partial_quantity',
    header: 'T/P Part Qty',
    cell: (row) => formatNumber(row.getValue() as number, 4),
  },
  {
    accessorKey: 'take_profit_partial_date_time',
    header: 'T/P Part Time',
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTime(date)}</div>
    },
  },
  // {
  //   accessorKey: 'is_closed',
  //   header: 'Is Closed',
  //   cell: (row) => {
  //     const isClosed = row.getValue() as boolean
  //     return <div>{isClosed ? 'Yes' : 'No'}</div>
  //   },
  // },
  {
    accessorKey: 'status',
    header: 'Status',
    // cell: (row) => {
    //   const isClosed = row.getValue() as boolean
    //   return <div>{isClosed ? 'Yes' : 'No'}</div>
    // },
  },
  {
    accessorKey: 'close_price',
    header: () => <div className={'text-left'}>{'Close Price'}</div>,
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'close_date_time',
    header: () => <div className={'text-left'}>{'Close Time'}</div>,
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTime(date)}</div>
    },
  },
  {
    accessorKey: 'profit',
    header: () => <div className={'text-right'}>{'Profit'}</div>,
    cell: (row) => {
      const value = row.getValue() as number
      const isNegative = value < 0
      return (
        <div
          className={`font-bold text-right ${isNegative ? 'text-red-500' : 'text-green-600'}`}
        >
          {value}
        </div>
      )
    },
  },
  {
    id: 'relativeProfit',
    header: () => <div className={'text-right'}>{'Profit %'}</div>,
    cell: ({ row }) => {
      const profit = row.getValue('profit') as number
      const price = row.getValue('price') as number
      const value = ((profit / price) * 100).toFixed(2)
      const isNegative = profit < 0
      return (
        <div
          className={`font-bold text-right ${isNegative ? 'text-red-500' : 'text-green-600'}`}
        >
          {value}
        </div>
      )
    },
  },
]
