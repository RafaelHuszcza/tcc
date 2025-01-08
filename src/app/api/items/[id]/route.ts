import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { itemSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const itemId = params.id
    if (!itemId) {
      return NextResponse.json(
        { error: 'ID do item não fornecido' },
        { status: 400 },
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

    const itemDB = await prisma.item.findUnique({
      where: { id: itemId },
    })

    if (!itemDB) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 },
      )
    }

    const updatedItem = await prisma.item.update({
      where: { id: itemId },
      data: {
        name: itemValidate.data.name,
        description: itemValidate.data.description,
      },
    })

    return NextResponse.json(updatedItem)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json(
          { error: 'Nome já está em uso' },
          { status: 409 },
        )
      }
    }

    console.error('Erro ao atualizar item:', error)
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

    const itemId = params.id
    if (!itemId) {
      return NextResponse.json(
        { error: 'ID do item não fornecido' },
        { status: 400 },
      )
    }

    const existingItem = await prisma.item.findUnique({
      where: { id: itemId },
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 },
      )
    }

    await prisma.item.delete({
      where: { id: itemId },
    })

    return NextResponse.json({ message: 'Item deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar item:', error)
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

    const itemId = params.id
    if (!itemId) {
      return NextResponse.json(
        { error: 'ID do item não fornecido' },
        { status: 400 },
      )
    }

    const item = await prisma.item.findUnique({
      where: { id: itemId },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Erro ao buscar item:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
