import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'

import { AuthForm } from './_components/auth-form'

export default async function Page() {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  return <AuthForm />
}
