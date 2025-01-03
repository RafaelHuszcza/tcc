import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelterSchema } from '../schema'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const shelterId = params.id
  if (!shelterId) {
    return new NextResponse(
      JSON.stringify({ error: 'Abrigo não encontrada' }),
      {
        status: 404,
      },
    )
  }
  const shelter = await request.json()
  const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const shelterDB = await prisma.shelter.findFirst({
    where: { id: shelterId, managerId: session.user?.id },
  })
  if (!shelterDB) {
    return new NextResponse(
      JSON.stringify({ error: 'Abrigo não encontrada' }),
      { status: 404 },
    )
  }

  type FormData = z.infer<typeof shelterSchema>

  const shelterValidate: FormData = shelterSchema.parse(shelter)
  if (!shelterValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }
  await prisma.shelter.update({
    where: { id: shelterId },
    data: {
      name: shelter.name,
      lat: shelter.lat,
      lng: shelter.lng,
      capacity: shelter.capacity,
      currentOccupancy: shelter.currentOccupancy,
      address: shelter.address,
      phone: shelter.phone,
      serviceHours: shelter.serviceHours,
      description: shelter.description,
      status: shelter.status,
      whatsApp: shelter.whatsApp,
    },
  })
  return NextResponse.json({ message: 'Abrigo atualizado com sucesso' })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const shelterId = params.id
  if (!shelterId) {
    return new NextResponse(
      JSON.stringify({ error: 'Localização não encontrada' }),
      {
        status: 404,
      },
    )
  }

  const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  await prisma.shelter.delete({
    where: { id: shelterId, managerId: session.user?.id },
  })

  return NextResponse.json({ message: 'Localização deletado com sucesso' })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const shelterId = params.id
  if (!shelterId) {
    return new NextResponse(
      JSON.stringify({ error: 'Abrigo não encontrada' }),
      {
        status: 404,
      },
    )
  }

  const shelter = await prisma.shelter.findFirst({
    where: { id: shelterId, managerId: session.user?.id },
  })

  if (!shelter) {
    return new NextResponse(
      JSON.stringify({ error: 'Abrigo não encontrada' }),
      { status: 404 },
    )
  }

  return NextResponse.json(shelter)
}
