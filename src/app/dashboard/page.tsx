'use client'
import { DataTableClient } from './_components/data-table-client'
import { HeaderSidebar } from './_components/header-sidebar'

export default function Dashboard() {
  return (
    <>
      <HeaderSidebar />
      <main className="flex w-full flex-1 overflow-auto px-4 md:justify-center md:p-0">
        <DataTableClient />
      </main>
    </>
  )
}
