import { NextRequest, NextResponse } from 'next/server'

import { NeedStatus } from '@/api-uses/needs/type'
import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { needSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const needId = params.id
    if (!needId) {
      return NextResponse.json(
        { error: 'ID da necessidade não fornecido' },
        { status: 400 },
      )
    }

    const needData = await request.json()
    const needValidate = needSchema.safeParse(needData)

    if (!needValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: needValidate.error.errors },
        { status: 400 },
      )
    }

    const existingNeed = await prisma.need.findUnique({
      where: { id: needId },
      include: { shelter: true },
    })

    if (!existingNeed) {
      return NextResponse.json(
        { error: 'Necessidade não encontrada' },
        { status: 404 },
      )
    }

    if (existingNeed.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a atualizar esta necessidade' },
        { status: 403 },
      )
    }

    const updatedNeed = await prisma.need.update({
      where: { id: needId },
      data: {
        description: needValidate.data.description,
        quantity: needValidate.data.quantity,
        itemId: needValidate.data.itemId,
        status: needValidate.data.status as NeedStatus,
        shelterId: needValidate.data.shelterId,
      },
    })

    return NextResponse.json(updatedNeed)
  } catch (error) {
    console.error('Erro ao atualizar necessidade:', error)
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

    const needId = params.id
    if (!needId) {
      return NextResponse.json(
        { error: 'ID da necessidade não fornecido' },
        { status: 400 },
      )
    }

    const existingNeed = await prisma.need.findUnique({
      where: { id: needId },
      include: { shelter: true },
    })

    if (!existingNeed) {
      return NextResponse.json(
        { error: 'Necessidade não encontrada' },
        { status: 404 },
      )
    }

    if (existingNeed.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a deletar esta necessidade' },
        { status: 403 },
      )
    }

    await prisma.need.delete({
      where: { id: needId },
    })

    return NextResponse.json({ message: 'Necessidade deletada com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar necessidade:', error)
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

    const needId = params.id
    if (!needId) {
      return NextResponse.json(
        { error: 'ID da necessidade não fornecido' },
        { status: 400 },
      )
    }

    const need = await prisma.need.findUnique({
      where: { id: needId },
      include: {
        item: {
          select: {
            name: true,
            description: true,
          },
        },
        shelter: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!need) {
      return NextResponse.json(
        { error: 'Necessidade não encontrada' },
        { status: 404 },
      )
    }

    return NextResponse.json(need)
  } catch (error) {
    console.error('Erro ao buscar necessidade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
