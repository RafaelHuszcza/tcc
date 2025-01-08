'use client'

import { ColumnDef } from '@tanstack/react-table'

import { GetStock } from '@/api-uses/stocks/type'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { formatDate } from '@/utils/formatDate'

import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<GetStock>[] = [
  {
    accessorKey: 'item.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome do Item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('item.name')}
        </div>
      )
    },
    id: 'item.name',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'quantity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantidade" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('quantity')}
        </div>
      )
    },
    id: 'quantity',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'expirationDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de validade" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('updatedAt')
            ? formatDate(row.getValue('updatedAt'))
            : 'Sem data'}
        </div>
      )
    },

    enableSorting: true,
    enableHiding: false,
  },

  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última atualização" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('updatedAt')
            ? formatDate(row.getValue('updatedAt'))
            : 'Sem data'}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: 'Ações',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
