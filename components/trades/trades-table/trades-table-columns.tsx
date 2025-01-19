'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ParsedTrade } from '@/utils'

export const tradesTableColumns: ColumnDef<ParsedTrade>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'orderId',
    header: 'Order ID',
  },
  {
    accessorKey: 'time',
    header: 'Time',
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
  },
  {
    accessorKey: 'price',
    header: () => <div className={'text-center'}>{'Price'}</div>,
    cell: (row) => (row.getValue() as number).toFixed(2),
  },
  {
    accessorKey: 'qty',
    header: 'Quantity',
  },
  {
    accessorKey: 'side',
    header: 'Side',
    cell: (row) => {
      const side = row.getValue() as string
      return <div className={'font-bold'}>{side}</div>
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
    accessorKey: 'commission',
    header: 'Commission',
  },
  {
    accessorKey: 'commissionAsset',
    header: 'Commission Asset',
  },
]
