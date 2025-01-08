import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelterSchema } from './schema'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const shelters = await prisma.shelter.findMany({
      where: { managerId: session.user?.id },
    })
    return NextResponse.json(shelters)
  } catch (error) {
    console.error('Erro ao buscar abrigos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const { user } = session
    if (!user || !user.id) {
      return NextResponse.json(
        { error: 'Usuário não identificado' },
        { status: 401 },
      )
    }

    const shelterData = await request.json()
    const shelterValidate = shelterSchema.safeParse(shelterData)

    if (!shelterValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: shelterValidate.error.errors },
        { status: 400 },
      )
    }

    const createdShelter = await prisma.shelter.create({
      data: {
        ...shelterValidate.data,
        managerId: user.id,
      },
    })
    return NextResponse.json(createdShelter, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar abrigo:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Nome já utilizado' },
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
