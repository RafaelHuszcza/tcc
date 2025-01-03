'use client'

import { ColumnDef } from '@tanstack/react-table'

import { GetShelter } from '@/api-uses/shelters/type'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { formatDate } from '@/utils/formatDate'

import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<GetShelter>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('name')}
        </div>
      )
    },
    id: 'name',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'capacity',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Capacidade" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('capacity')}
        </div>
      )
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'currentOccupancy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Vagas Ocupadas" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('currentOccupancy')}
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
