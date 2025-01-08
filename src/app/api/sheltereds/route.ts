import { NextRequest, NextResponse } from 'next/server'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelteredSchema } from './schema'

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

    const sheltereds = await prisma.sheltered.findMany({
      where: { shelterId },
    })
    return NextResponse.json(sheltereds)
  } catch (error) {
    console.error('Erro ao buscar abrigados:', error)
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

    const shelteredData = await request.json()
    const shelteredValidate = shelteredSchema.safeParse(shelteredData)

    if (!shelteredValidate.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: shelteredValidate.error.errors },
        { status: 400 },
      )
    }

    const createdSheltered = await prisma.sheltered.create({
      data: {
        name: shelteredValidate.data.name,
        age: shelteredValidate.data.age,
        sex: shelteredValidate.data.sex,
        entryDate: shelteredValidate.data.entryDate,
        exitDate: shelteredValidate.data.exitDate,
        shelterId: shelteredValidate.data.shelterId,
      },
    })

    return NextResponse.json(createdSheltered, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar abrigado:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
