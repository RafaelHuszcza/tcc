'use client'
import { DataTableClient } from './_components/data-table-client'

export default function Page() {
  return (
    <main className="flex max-h-[calc(100vh-5rem)] w-full flex-1 justify-center overflow-auto">
      <DataTableClient />
    </main>
  )
}
