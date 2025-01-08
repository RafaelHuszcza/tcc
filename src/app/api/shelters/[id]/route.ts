import { Prisma } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelterSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const shelterId = params.id
    if (!shelterId) {
      return NextResponse.json(
        { error: 'ID do abrigo não fornecido' },
        { status: 400 },
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

    const shelterDB = await prisma.shelter.findFirst({
      where: { id: shelterId, managerId: session.user?.id },
    })
    if (!shelterDB) {
      return NextResponse.json(
        { error: 'Abrigo não encontrado' },
        { status: 404 },
      )
    }
    const updatedShelter = await prisma.shelter.update({
      where: { id: shelterId },
      data: shelterValidate.data,
    })

    return NextResponse.json(updatedShelter)
  } catch (error) {
    console.error('Erro ao atualizar abrigo:', error)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const shelterId = params.id
    if (!shelterId) {
      return NextResponse.json(
        { error: 'ID do abrigo não fornecido' },
        { status: 400 },
      )
    }

    const shelterDB = await prisma.shelter.findFirst({
      where: { id: shelterId, managerId: session.user?.id },
    })
    if (!shelterDB) {
      return NextResponse.json(
        { error: 'Abrigo não encontrado' },
        { status: 404 },
      )
    }

    await prisma.shelter.delete({
      where: { id: shelterId },
    })

    return NextResponse.json({ message: 'Abrigo deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar abrigo:', error)
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

    const shelterId = params.id
    if (!shelterId) {
      return NextResponse.json(
        { error: 'ID do abrigo não fornecido' },
        { status: 400 },
      )
    }

    const shelter = await prisma.shelter.findFirst({
      where: { id: shelterId, managerId: session.user?.id },
    })

    if (!shelter) {
      return NextResponse.json(
        { error: 'Abrigo não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(shelter)
  } catch (error) {
    console.error('Erro ao buscar abrigo:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
