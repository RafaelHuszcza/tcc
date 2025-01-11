'use client'

import { ColumnDef } from '@tanstack/react-table'
import { BadgeCheck, ClockAlert } from 'lucide-react'

import { PublicNeed } from '@/api-uses/public-needs/type'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { cn } from '@/lib/utils'
import { formatDate } from '@/utils/formatDate'

import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<PublicNeed>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('Descrição')
            ? row.getValue('Descrição')
            : 'Sem descrição'}
        </div>
      )
    },
    id: 'Descrição',
    enableSorting: false,
    enableHiding: true,
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
    accessorKey: 'item.description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição do Item" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('descrição do item')
            ? row.getValue('descrição do item')
            : 'Sem descrição'}
        </div>
      )
    },
    id: 'descrição do item',
    enableSorting: false,
    enableHiding: true,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const StatusIcon =
        row.getValue('status') === 'PENDING' ? ClockAlert : BadgeCheck

      return (
        <div className="flex justify-center font-medium">
          <StatusIcon
            className={cn(
              'h-4 w-4',
              row.getValue('status') === 'FULFILLED'
                ? 'text-green-500'
                : 'text-destructive',
            )}
          />
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'shelter.name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Abrigo" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('shelter.name')}
        </div>
      )
    },
    id: 'shelter.name',
    enableSorting: false,
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
