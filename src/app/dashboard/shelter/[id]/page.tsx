import { redirect } from 'next/navigation'
export default function Page({ params }: { params: { id: string } }) {
  if (params.id) {
    redirect(`/dashboard/shelter/${params.id}/edit`)
  } else {
    redirect(`/dashboard/`)
  }
}
