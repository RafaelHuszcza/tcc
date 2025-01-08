import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { stockSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const stockId = params.id
    if (!stockId) {
      return NextResponse.json(
        { error: 'ID do estoque não fornecido' },
        { status: 400 },
      )
    }

    const stockData = await request.json()
    const stockValidate = stockSchema.safeParse(stockData)

    if (!stockValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: stockValidate.error.errors },
        { status: 400 },
      )
    }

    const existingStock = await prisma.stock.findUnique({
      where: { id: stockId },
      include: { shelter: true },
    })

    if (!existingStock) {
      return NextResponse.json(
        { error: 'Estoque não encontrado' },
        { status: 404 },
      )
    }

    if (existingStock.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a atualizar este estoque' },
        { status: 403 },
      )
    }

    const updatedStock = await prisma.stock.update({
      where: { id: stockId },
      data: {
        quantity: stockValidate.data.quantity,
        itemId: stockValidate.data.itemId,
        shelterId: stockValidate.data.shelterId,
        expirationDate: stockValidate.data.expirationDate,
      },
    })

    return NextResponse.json(updatedStock)
  } catch (error) {
    console.error('Erro ao atualizar estoque:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const stockId = params.id
    if (!stockId) {
      return NextResponse.json(
        { error: 'ID do estoque não fornecido' },
        { status: 400 },
      )
    }

    const existingStock = await prisma.stock.findUnique({
      where: { id: stockId },
      include: { shelter: true },
    })

    if (!existingStock) {
      return NextResponse.json(
        { error: 'Estoque não encontrado' },
        { status: 404 },
      )
    }

    if (existingStock.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a deletar este estoque' },
        { status: 403 },
      )
    }

    await prisma.stock.delete({
      where: { id: stockId },
    })

    return NextResponse.json({ message: 'Estoque deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar estoque:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const stockId = params.id
    if (!stockId) {
      return NextResponse.json(
        { error: 'ID do estoque não fornecido' },
        { status: 400 },
      )
    }

    const stock = await prisma.stock.findUnique({
      where: { id: stockId },
      include: {
        item: {
          select: {
            name: true,
            description: true,
          },
        },
      },
    })

    if (!stock) {
      return NextResponse.json(
        { error: 'Estoque não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(stock)
  } catch (error) {
    console.error('Erro ao buscar estoque:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
