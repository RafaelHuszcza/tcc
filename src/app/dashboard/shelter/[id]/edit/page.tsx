"use client"
import { useShelter } from '@/api-uses/shelters'
import { useRouter } from 'next/navigation'
import { HeaderSidebar } from '../../../_components/header-sidebar'
import { ShelterForm } from '../../../_components/shelter-form'
export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { data: shelter,  isLoading, isSuccess, isError } = useShelter(id)
  if (isLoading || !isSuccess) {
    return <div>Carregando...</div>
  }
  if (isError) {
    router.push('/dashboard/')
  }
  return (
    <>
    <HeaderSidebar  pageName='Dados do Abrigo' shelterName={shelter.name} />
    <ShelterForm method="PUT" defaultValues={shelter} />
    </>
  )
}
