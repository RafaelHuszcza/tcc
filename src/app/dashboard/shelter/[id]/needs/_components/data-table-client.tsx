'use client '

import { useParams } from 'next/navigation'

import { useNeeds } from '@/api-uses/needs'
import { ErrorTable } from '@/components/data-table/data-table-error'
import { TableSkeleton } from '@/components/data-table/data-table-skeleton'

import { columns } from './columns'
import { DataTable } from './data-table'

export function DataTableClient() {
  const { id } = useParams()
  const { data, isLoading, isSuccess, isError } = useNeeds(id)

  return (
    <div className="container h-full min-w-[32rem] py-10">
      {isLoading && <TableSkeleton />}
      {isSuccess && <DataTable columns={columns} data={data} />}
      {isError && <ErrorTable />}
    </div>
  )
}
