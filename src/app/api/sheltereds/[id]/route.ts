import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelteredSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const shelteredId = params.id
    if (!shelteredId) {
      return NextResponse.json(
        { error: 'ID do abrigado não fornecido' },
        { status: 400 },
      )
    }

    const shelteredData = await request.json()
    const shelteredValidate = shelteredSchema.safeParse(shelteredData)

    if (!shelteredValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: shelteredValidate.error.errors },
        { status: 400 },
      )
    }

    const existingSheltered = await prisma.sheltered.findUnique({
      where: { id: shelteredId },
      include: { shelter: true },
    })

    if (!existingSheltered) {
      return NextResponse.json(
        { error: 'Abrigado não encontrado' },
        { status: 404 },
      )
    }

    if (existingSheltered.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a atualizar este abrigado' },
        { status: 403 },
      )
    }

    const updatedSheltered = await prisma.sheltered.update({
      where: { id: shelteredId },
      data: {
        name: shelteredValidate.data.name,
        age: shelteredValidate.data.age,
        sex: shelteredValidate.data.sex,
        entryDate: shelteredValidate.data.entryDate,
        exitDate: shelteredValidate.data.exitDate,
        shelterId: shelteredValidate.data.shelterId,
      },
    })

    return NextResponse.json(updatedSheltered)
  } catch (error) {
    console.error('Erro ao atualizar abrigado:', error)
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

    const shelteredId = params.id
    if (!shelteredId) {
      return NextResponse.json(
        { error: 'ID do abrigado não fornecido' },
        { status: 400 },
      )
    }

    const existingSheltered = await prisma.sheltered.findUnique({
      where: { id: shelteredId },
      include: { shelter: true },
    })

    if (!existingSheltered) {
      return NextResponse.json(
        { error: 'Abrigado não encontrado' },
        { status: 404 },
      )
    }

    if (existingSheltered.shelter.managerId !== session.user?.id) {
      return NextResponse.json(
        { error: 'Não autorizado a deletar este abrigado' },
        { status: 403 },
      )
    }

    await prisma.sheltered.delete({
      where: { id: shelteredId },
    })

    return NextResponse.json({ message: 'Abrigado deletado com sucesso' })
  } catch (error) {
    console.error('Erro ao deletar abrigado:', error)
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

    const shelteredId = params.id
    if (!shelteredId) {
      return NextResponse.json(
        { error: 'ID do abrigado não fornecido' },
        { status: 400 },
      )
    }

    const sheltered = await prisma.sheltered.findUnique({
      where: { id: shelteredId },
    })

    if (!sheltered) {
      return NextResponse.json(
        { error: 'Abrigado não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(sheltered)
  } catch (error) {
    console.error('Erro ao buscar abrigado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
