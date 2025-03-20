'use client'

import { ColumnDef } from '@tanstack/react-table'
import { formatDateTimeFromUtc } from '@/utils/format-date-time'
import { formatNumber } from '@/utils/format-number'
import {
  DbSide,
  DbTrade,
  DbTradeStatus,
} from '@/stores/db-trades-store/db.trades.store.types'
import { numberColor } from '@/utils/number-color'

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
      return <div>{formatDateTimeFromUtc(date)}</div>
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
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 4)
      }

      return null
    },
  },
  {
    accessorKey: 'atr',
    header: 'ATR',
    cell: (row) => formatNumber(row.getValue() as number),
  },
  {
    accessorKey: 'stop_loss',
    header: () => (
      <div className={'flex flex-col justify-start items-start'}>
        <div>{'S/L'}</div>
        <div className={`text-xs/[1]`}>{'profit on S/L'}</div>
      </div>
    ),
    cell: (row) => {
      const value = row.getValue() as number
      const price = row.row.getValue('price') as number
      const side = row.row.getValue('side') as DbSide
      const rest = row.row.getValue('rest_quantity') as number
      const profit = row.row.getValue('profit') as number
      const isOpen = (row.row.getValue('status') as DbTradeStatus) != 'closed'
      const factor = side === 'buy' ? 1 : -1
      const marginProfit =
        Math.round((value - price) * rest * factor * 100) / 100 + profit

      return (
        <div className={'flex flex-col justify-start items-center'}>
          <div className={!isOpen ? 'text-gray-400' : ''}>
            {formatNumber(value)}
          </div>
          {isOpen && (
            <div className={`text-xs/[1] ${numberColor(marginProfit)}`}>
              {formatNumber(marginProfit, undefined, true)}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'take_profit_partial',
    header: 'T/P Part',
    cell: (row) => {
      const value = row.getValue() as number
      const take_profit_partial_price = row.row.getValue(
        'take_profit_partial_price'
      ) as number
      const isClosed =
        (row.row.getValue('status') as DbTradeStatus) === 'closed'
      return (
        <span
          className={
            !!take_profit_partial_price || isClosed ? 'text-gray-400' : ''
          }
        >
          {formatNumber(value, 2)}
        </span>
      )
    },
  },
  {
    accessorKey: 'take_profit_safe',
    header: 'T/P Safe',
    cell: (row) => {
      const value = row.getValue() as number
      const take_profit_safe_price = row.row.getValue(
        'take_profit_safe_price'
      ) as number
      const isClosed =
        (row.row.getValue('status') as DbTradeStatus) === 'closed'
      return (
        <span
          className={
            !!take_profit_safe_price || isClosed ? 'text-gray-400' : ''
          }
        >
          {formatNumber(value, 2)}
        </span>
      )
    },
  },
  {
    accessorKey: 'take_profit',
    header: 'T/P',
    cell: (row) => {
      const value = row.getValue() as number
      const isClosed =
        (row.row.getValue('status') as DbTradeStatus) === 'closed'
      return (
        <span className={isClosed ? 'text-gray-400' : ''}>
          {formatNumber(value, 2)}
        </span>
      )
    },
  },
  {
    accessorKey: 'take_profit_partial_price',
    header: 'T/P Part Price',
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 2)
      }

      return null
    },
    meta: { className: 'bg-yellow-50' },
  },
  {
    accessorKey: 'take_profit_partial_quantity',
    header: 'T/P Part Qty',
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 4)
      }

      return null
    },
    meta: { className: 'bg-yellow-50' },
  },
  {
    accessorKey: 'take_profit_partial_date_time',
    header: 'T/P Part Time',
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTimeFromUtc(date)}</div>
    },
    meta: { className: 'bg-yellow-50' },
  },
  {
    accessorKey: 'take_profit_safe_price',
    header: 'T/P Safe Price',
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 2)
      }

      return null
    },
    meta: { className: 'bg-blue-50' },
  },
  {
    accessorKey: 'take_profit_safe_quantity',
    header: 'T/P Safe Qty',
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 4)
      }

      return null
    },
    meta: { className: 'bg-blue-50' },
  },
  {
    accessorKey: 'take_profit_safe_date_time',
    header: 'T/P Safe Time',
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTimeFromUtc(date)}</div>
    },
    meta: { className: 'bg-blue-50' },
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'close_price',
    header: () => <div className={'text-left'}>{'Close Price'}</div>,
    cell: (row) => {
      const value = row.getValue() as number

      if (value) {
        return formatNumber(value, 2)
      }

      return null
    },
  },
  {
    accessorKey: 'close_date_time',
    header: () => <div className={'text-left'}>{'Close Time'}</div>,
    cell: (row) => {
      const date = row.getValue() as string
      return <div>{formatDateTimeFromUtc(date)}</div>
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
          {formatNumber(value)}
        </div>
      )
    },
  },
]
