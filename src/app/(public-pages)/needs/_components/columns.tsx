'use client'

import { ColumnDef } from '@tanstack/react-table'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'

import { DataTableRowActions } from './data-table-row-actions'
import { cn } from '@/lib/utils'
import { BadgeCheck, ClockAlert } from 'lucide-react'
import { PublicNeed } from '@/api-uses/public-needs/type'

export const columns: ColumnDef<PublicNeed>[] = [
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
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Descrição" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('Descrição')}
        </div>
      )
    },
    id: 'Descrição',
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
              'h-4 w-4 ',
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
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de criação" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt')).toLocaleDateString()
      return (
        <div className="px-1 text-center font-medium">
          {date}
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
