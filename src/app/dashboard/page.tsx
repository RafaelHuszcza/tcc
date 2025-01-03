"use client"
import { DataTableClient } from "./_components/data-table-client"
import { HeaderSidebar } from "./_components/header-sidebar"

export default function Dashboard() {
  return (
    <>
      <HeaderSidebar  />
      <main className="w-full flex items-center justify-center">
      <DataTableClient />
      </main>
    </>  
  )
}

