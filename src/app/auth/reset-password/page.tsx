import { redirect } from 'next/navigation'

import { auth } from '@/services/auth'

export default async function Page() {
  const session = await auth()
  if (session) {
    redirect('/dashboard')
  }
  redirect('/auth')
}
