import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'

import { ForgotPasswordForm } from '../_components/forgot-form'

export default async function Page() {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  return <ForgotPasswordForm />
}
