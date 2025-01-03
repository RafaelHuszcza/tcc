import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json()
  const session = await auth()
  if (!session || !session.user?.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      {
        status: 401,
      },
    )
  }
  if (!params.id) {
    return new NextResponse(
      JSON.stringify({ message: 'Usuário não encontrado' }),
      {
        status: 404,
      },
    )
  }
  if (session.user.id !== params.id) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não autorizado' }),
      {
        status: 401,
      },
    )
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
  })
  if (!user) {
    return new NextResponse(
      JSON.stringify({ error: 'Usuário não encontrado' }),
      {
        status: 401,
      },
    )
  }

  const userSchema = z
    .object({
      name: z
        .string({ required_error: 'Nome é requerido' })
        .min(3, 'O Nome deve conter mais de 3 caracteres'),
      email: z
        .string({ required_error: 'Email é requerido' })
        .email('Email Inválido'),
      password: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.password === '' || data.password === undefined) {
          return true
        }
        if (!data.password) {
          return true
        }
        return (
          data?.password?.length >= 6 &&
          /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,20}$/.test(data?.password)
        )
      },
      {
        path: ['password'],
        message:
          'A senha precisa ter no mínimo 6 caracteres e conter pelo menos 1 caractere especial e 1 número',
      },
    )
  type FormData = z.infer<typeof userSchema>

  const userValidate: FormData = userSchema.parse(body)

  if (!userValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }
  if (userValidate.password) {
    const hashPassword = await hash(userValidate.password, 12)
    await prisma.user.update({
      where: { id: params.id },
      data: {
        email: body.email,
        name: body.name,
        password: hashPassword,
      },
    })
    return NextResponse.json({ message: 'Usuário atualizado com sucesso' })
  }
  await prisma.user.update({
    where: { id: params.id },
    data: {
      email: userValidate.email,
      name: userValidate.name,
    },
  })

  return NextResponse.json({ message: 'Usuário atualizado com sucesso' })
}
