'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { NeedForm } from '../_components/need-form'

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { data: shelter, isLoading, isError } = useShelter(params.id)

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
        extraText="Adicionar Necessidade"
      />
      <NeedForm method="POST" />
    </>
  )
}
