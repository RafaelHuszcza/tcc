import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { stockSchema } from './schema'

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

    const stocks = await prisma.stock.findMany({
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
    return NextResponse.json(stocks)
  } catch (error) {
    console.error('Erro ao buscar estoque:', error)
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

    const stockData = await request.json()
    const stockValidate = stockSchema.safeParse(stockData)

    if (!stockValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: stockValidate.error.errors },
        { status: 400 },
      )
    }

    const createdStock = await prisma.stock.create({
      data: {
        quantity: stockValidate.data.quantity,
        itemId: stockValidate.data.itemId,
        shelterId: stockValidate.data.shelterId,
        expirationDate: stockValidate.data.expirationDate,
      },
    })

    return NextResponse.json(createdStock, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar estoque:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
