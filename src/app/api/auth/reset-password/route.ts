import { hash } from 'bcryptjs'
import { createHash } from 'crypto'
import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function POST(request: Request) {
  try {
    const { password } = await request.json()
    let token = request.headers.get('Authorization')
    if (!token) {
      return NextResponse.json(
        {
          message: 'Token not found',
        },
        { status: 401 },
      )
    }
    if (!password) {
      return NextResponse.json(
        {
          message: 'New password not found',
        },
        { status: 400 },
      )
    }
    token = token.replace('Bearer ', '')
    const hashedToken = createHash('sha256').update(token).digest('hex')

    const user = await prisma.user.findFirst({
      where: { resetToken: hashedToken, resetTokenExpiry: { gte: new Date() } },
    })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 400 },
      )
    }
    user.password = await hash(password, 12)
    user.resetToken = null
    user.resetTokenExpiry = null
    await prisma.user.update({
      where: { id: user.id },
      data: user,
    })
    return NextResponse.json({ message: 'Password changed successfully ' })
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Server Error' }, { status: 500 })
  }
}
