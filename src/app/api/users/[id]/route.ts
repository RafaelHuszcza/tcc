import { Prisma } from '@prisma/client'
import { hash } from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }
    const userId = params.id
    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: 'Id do Usuário não encontrado' }),
        {
          status: 400,
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

    const userData = await request.json()
    const userValidate = userSchema.safeParse(userData)

    if (!userValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: userValidate.error.errors },
        { status: 400 },
      )
    }

    if (userValidate.data.password !== undefined) {
      const hashPassword = await hash(userValidate.data.password, 12)
      await prisma.user.update({
        where: { id: params.id },
        data: {
          email: userValidate.data.email,
          name: userValidate.data.name,
          password: hashPassword,
        },
      })
      return NextResponse.json({ message: 'Usuário atualizado com sucesso' })
    }
    await prisma.user.update({
      where: { id: params.id },
      data: {
        email: userValidate.data.email,
        name: userValidate.data.name,
      },
    })

    return NextResponse.json({ message: 'Usuário atualizado com sucesso' })
  } catch (error) {
    console.error('Erro ao atualizar abrigo:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Email já utilizado' },
          { status: 409 },
        )
      }
    }
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
