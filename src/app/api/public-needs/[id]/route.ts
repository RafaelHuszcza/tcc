import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
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
            address: true,
            phone: true,
            description: true,
            serviceHours: true,
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
