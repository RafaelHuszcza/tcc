'use client'
import { useRouter } from 'next/navigation'

import { useNeed } from '@/api-uses/needs'
import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { NeedForm } from '../../_components/need-form'
export default function Page({
  params,
}: {
  params: { needId: string; id: string }
}) {
  const { id, needId } = params
  const router = useRouter()
  const { data: shelter, isError, isLoading } = useShelter(id)
  const { data: need, isError: isErrorNeed, isSuccess } = useNeed(needId)
  if (isError || isErrorNeed) {
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
        extraText="Editar Necessidade"
      />
      {isSuccess && <NeedForm method="PUT" defaultValues={need} />}
    </>
  )
}
