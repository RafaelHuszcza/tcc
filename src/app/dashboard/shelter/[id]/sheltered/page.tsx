'use client'
import { useShelter } from '@/api-uses/shelters'
import { HeaderSidebar } from '@/app/dashboard/_components/header-sidebar'
export default function ShelterDashboardPage({
  params,
}: {
  params: { id: string }
}) {
  const { data: shelter } = useShelter(params.id)

  return (
    <>
      <HeaderSidebar pageName="Abrigados" shelterName={shelter?.name} />
    </>
  )
}
