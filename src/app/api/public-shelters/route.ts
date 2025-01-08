import { NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET() {
  try {
    const shelters = await prisma.shelter.findMany()
    return NextResponse.json(shelters)
  } catch (error) {
    console.error('Erro ao buscar abrigos:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 },
    )
  }
}
