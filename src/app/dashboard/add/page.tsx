import { HeaderSidebar } from '../_components/header-sidebar'
import { ShelterForm } from '../_components/shelter-form'

export default function Dashboard() {
  return (
    <>
      <HeaderSidebar extraText="Criar Abrigo" />
      <main className="flex w-full flex-1 overflow-auto p-4 md:justify-center md:p-0">
        <ShelterForm method="POST" />
      </main>
    </>
  )
}
