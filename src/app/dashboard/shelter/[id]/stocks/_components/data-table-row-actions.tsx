'use client'

import { Row } from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { useDeleteStock } from '@/api-uses/stocks'
import { getStocksSchema } from '@/api-uses/stocks/type'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const stock = getStocksSchema.parse(row.original)
  const { id } = useParams()
  const deleteStockFnc = useDeleteStock()
  const deleteStock = async (id: string) => {
    const isConfirmed = window.confirm(
      'Tem certeza de que deseja excluir este item do estoque?',
    )
    if (!isConfirmed) {
      return
    }
    if (id !== undefined) {
      deleteStockFnc.mutateAsync(id)
    }
  }
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() =>
            router.push(`/dashboard/shelter/${id}/stocks/${stock.id}/edit`)
          }
          className="cursor-pointer"
        >
          Editar
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => deleteStock(stock.id)}
        >
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
