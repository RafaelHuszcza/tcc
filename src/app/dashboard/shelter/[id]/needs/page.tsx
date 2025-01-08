'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { DataTableClient } from './_components/data-table-client'
export default function ShelterDashboardPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const { data: shelter, isError, isLoading } = useShelter(params.id)

  if (isError) {
    router.push('/dashboard/')
  }
  return (
    <>
      <HeaderSidebar
        page={{
          href: `/dashboard/shelter/${shelter?.id}/needs`,
          text: 'Necessidade do Abrigo',
        }}
        shelterName={isLoading ? 'Carregando...' : shelter?.name}
      />
      <main className="flex w-full items-center justify-center">
        <DataTableClient />
      </main>
    </>
  )
}
