'use client'
import { useRouter } from 'next/navigation'

import { useSheltered } from '@/api-uses/sheltereds'
import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { ShelteredForm } from '../../_components/sheltered-form'
export default function Page({
  params,
}: {
  params: { shelteredId: string; id: string }
}) {
  const { id, shelteredId } = params
  const router = useRouter()
  const { data: shelter, isError, isLoading } = useShelter(id)
  const {
    data: sheltered,
    isError: isErrorNeed,
    isSuccess,
  } = useSheltered(shelteredId)
  if (isError || isErrorNeed) {
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
        extraText="Editar Abrigado"
      />
      <main className="flex w-full flex-1 overflow-auto p-4 md:justify-center md:p-0">
        {isSuccess && <ShelteredForm method="PUT" defaultValues={sheltered} />}
      </main>
    </>
  )
}
