'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'

import { HeaderSidebar } from '../../../_components/header-sidebar'
import { ShelterForm } from '../../../_components/shelter-form'
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { data: shelter, isError, isLoading, isSuccess } = useShelter(id)
  if (isError) {
    router.push('/dashboard/')
  }
  return (
    <>
      <HeaderSidebar
        page={{
          href: `/dashboard/shelter/${shelter?.id}/edit`,
          text: 'Dados do Abrigo',
        }}
        shelterName={isLoading ? 'Carregando...' : shelter?.name}
      />
      {isSuccess && <ShelterForm method="PUT" defaultValues={shelter} />}
    </>
  )
}
