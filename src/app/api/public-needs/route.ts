import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET() {
  try {
    const needs = await prisma.need.findMany({
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
    return NextResponse.json(needs)
  } catch (error) {
    console.error('Erro ao buscar necessidades:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
