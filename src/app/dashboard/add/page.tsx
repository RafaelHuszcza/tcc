import { HeaderSidebar } from '../_components/header-sidebar'
import { ShelterForm } from '../_components/shelter-form'

export default function Dashboard() {
  return (
    <>
      <HeaderSidebar pageName="Criar Abrigo" />
      <ShelterForm method="POST" />
    </>
  )
}
