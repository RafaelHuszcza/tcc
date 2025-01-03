'use client '

import { useShelters } from '@/api-uses/shelters'

import { columns } from './columns'
import { DataTable } from './data-table'
import { TableSkeleton } from '@/components/data-table/data-table-skeleton'
import { ErrorTable } from '@/components/data-table/data-table-error'

export function DataTableClient() {
  const { data, isLoading, isSuccess,isError } = useShelters()

  return (
    <div className="container h-full min-w-[32rem] py-10">
       {isLoading && <TableSkeleton />}
      {isSuccess && (
        <DataTable columns={columns} data={data} />
      )}
      {isError && <ErrorTable />}
    </div>
  )
}
