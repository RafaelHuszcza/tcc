import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'

import { ResetForm } from '../../_components/reset-form'
export default async function Page({ params }: { params: { token: string } }) {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  const { token } = params
  if (!token) {
    redirect('/auth')
  }
  return <ResetForm token={token} />
}
