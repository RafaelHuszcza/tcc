'use client'

import { Table } from '@tanstack/react-table'
import { PlusCircle, X } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { filters } from '../_data/data'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const { id } = useParams()
  const [filter, setFilter] = useState<string>(filters[0].value)

  return (
    <div className="flex items-center justify-between space-x-2">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Digite o filtro"
          value={(table.getColumn(filter)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(filter)?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] bg-background lg:w-[250px]"
        />
        <Select
          defaultValue={filter}
          onValueChange={(e: string) => setFilter(e)}
        >
          <SelectTrigger className="h-8 w-48 bg-background">
            <SelectValue placeholder="Selecione o filtro" />
          </SelectTrigger>
          <SelectContent>
            {filters.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {isFiltered && (
          <Button
            variant="destructive"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpar Filtros
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <Button asChild>
        <Link
          className="flex gap-2"
          href={`/dashboard/shelter/${id}/sheltereds/add`}
        >
          Adicionar Abrigado
          <span>
            <PlusCircle />
          </span>
        </Link>
      </Button>
    </div>
  )
}
