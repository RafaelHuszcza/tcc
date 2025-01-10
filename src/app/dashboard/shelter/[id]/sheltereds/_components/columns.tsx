'use client'

import { ColumnDef } from '@tanstack/react-table'

import { GetSheltered } from '@/api-uses/sheltereds/type'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { formatDate } from '@/utils/formatDate'

import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<GetSheltered>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'age',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Idade" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('age')}
        </div>
      )
    },
    id: 'age',
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'sex',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gênero" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('sex')}
        </div>
      )
    },
    id: 'sex',
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'entryDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Entrada" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('entryDate')
            ? formatDate(row.getValue('entryDate'))
            : 'Sem data'}
        </div>
      )
    },

    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'exitDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data de Saida" />
    ),
    cell: ({ row }) => {
      return (
        <div className="px-1 text-center font-medium">
          {row.getValue('exitDate')
            ? formatDate(row.getValue('exitDate'))
            : 'Não Saiu'}
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
