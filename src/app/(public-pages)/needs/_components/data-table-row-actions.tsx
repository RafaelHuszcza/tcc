import { Row } from '@tanstack/react-table'
import Link from 'next/link'


import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Ellipsis } from 'lucide-react'
import { ROUTES } from '@/utils/constants'
import { publicNeedSchema } from '@/api-uses/public-needs/type'

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const need = publicNeedSchema.parse(row.original)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis  className="h-4 w-4" />
          <span className="sr-only">Abrir Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>
            <Link href={`${ROUTES.PUBLIC_NEEDS}/${need.id}`} className="h-full w-full">
            Mais detalhes
            </Link>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
