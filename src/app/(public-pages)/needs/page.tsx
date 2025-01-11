'use client'
import { DataTableClient } from './_components/data-table-client'

export default function Page() {
  return (
    <main className="flex max-h-[calc(100vh-5rem)] w-full flex-1 overflow-auto px-4 md:justify-center md:p-0">
      <DataTableClient />
    </main>
  )
}
