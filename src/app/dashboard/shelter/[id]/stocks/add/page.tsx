'use client'
import { useRouter } from 'next/navigation'

import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'

import { StockForm } from '../_components/stock-form'

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
          href: `/dashboard/shelter/${shelter?.id}/stocks`,
          text: 'Estoque do Abrigo',
        }}
        shelterName={isLoading ? 'Carregando...' : shelter?.name}
        extraText="Adicionar Item ao Estoque"
      />
      <StockForm method="POST" />
    </>
  )
}
