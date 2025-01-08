'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'
import { useStock } from '@/api-uses/stocks'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { StockForm } from '../../_components/stock-form'
export default function Page({
  params,
}: {
  params: { stockId: string; id: string }
}) {
  const { id, stockId } = params
  const router = useRouter()
  const { data: shelter, isError, isLoading } = useShelter(id)
  const { data: need, isError: isErrorNeed, isSuccess } = useStock(stockId)
  if (isError || isErrorNeed) {
    router.push('/dashboard/')
  }
  return (
    <>
      <HeaderSidebar
        page={{
          href: `/dashboard/shelter/${shelter?.id}/needs`,
          text: 'Estoque do Abrigo',
        }}
        shelterName={isLoading ? 'Carregando...' : shelter?.name}
        extraText="Editar Item do Estoque"
      />
      {isSuccess && <StockForm method="PUT" defaultValues={need} />}
    </>
  )
}
