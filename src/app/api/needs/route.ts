import { NextRequest, NextResponse } from 'next/server'

import { NeedStatus } from '@/api-uses/needs/type'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { needSchema } from './schema'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const shelterId = searchParams.get('shelterId')
    if (!shelterId) {
      return NextResponse.json(
        { error: 'shelterId é obrigatório' },
        { status: 400 },
      )
    }

    const needs = await prisma.need.findMany({
      where: { shelterId },
      include: {
        item: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    })
    return NextResponse.json(needs)
  } catch (error) {
    console.error('Erro ao buscar necessidades:', error)
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

    const needData = await request.json()
    const needValidate = needSchema.safeParse(needData)

    if (!needValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: needValidate.error.errors },
        { status: 400 },
      )
    }

    const createdNeed = await prisma.need.create({
      data: {
        description: needValidate.data.description,
        quantity: needValidate.data.quantity,
        itemId: needValidate.data.itemId,
        status: NeedStatus.PENDING,
        shelterId: needValidate.data.shelterId,
      },
    })

    return NextResponse.json(createdNeed, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar necessidade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
