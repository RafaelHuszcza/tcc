import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const shelterId = params.id
    if (!shelterId) {
      return NextResponse.json(
        { error: 'ID do abrigo não fornecido' },
        { status: 400 },
      )
    }

    const shelter = await prisma.shelter.findFirst({
      where: { id: shelterId },
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
