import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { itemSchema } from './schema'

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const items = await prisma.item.findMany()
    return NextResponse.json(items)
  } catch (error) {
    console.error('Erro ao buscar itens:', error)
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

    const itemData = await request.json()
    const itemValidate = itemSchema.safeParse(itemData)

    if (!itemValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: itemValidate.error.errors },
        { status: 400 },
      )
    }

    const createdItem = await prisma.item.create({
      data: {
        description: itemValidate.data.description,
        name: itemValidate.data.name,
      },
    })

    return NextResponse.json(createdItem, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Nome já utilizado' },
          { status: 409 },
        )
      }
    }

    console.error('Erro ao criar item:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
