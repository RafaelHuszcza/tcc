'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { DataTableClient } from './_components/data-table-client'
export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: shelter, isError, isLoading } = useShelter(params.id)

  if (isError) {
    router.push('/dashboard/')
  }
  return (
    <>
      <HeaderSidebar
        page={{
          href: `/dashboard/shelter/${shelter?.id}/sheltereds`,
          text: 'Abrigados',
        }}
        shelterName={isLoading ? 'Carregando...' : shelter?.name}
      />
      <main className="flex w-full flex-1 overflow-auto p-4 md:justify-center md:p-0">
        <DataTableClient />
      </main>
    </>
  )
}
