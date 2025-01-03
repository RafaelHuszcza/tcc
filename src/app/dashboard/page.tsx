'use client'
import { DataTableClient } from './_components/data-table-client'
import { HeaderSidebar } from './_components/header-sidebar'

export default function Dashboard() {
  return (
    <>
      <HeaderSidebar />
      <main className="flex w-full items-center justify-center">
        <DataTableClient />
      </main>
    </>
  )
}
