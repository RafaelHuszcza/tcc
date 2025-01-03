import { NextResponse } from 'next/server'
import { z } from 'zod'

import { auth } from '@/services/auth'
import { prisma } from '@/services/database'

import { shelterSchema } from './schema'

export async function GET() {
  const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  try {
    const shelters = await prisma.shelter.findMany({
      where: { managerId: session.user?.id },
    })
    return NextResponse.json(shelters)
  } catch (e) {
    console.log({ e })
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }
  const shelter = await request.json()
  type FormData = z.infer<typeof shelterSchema>
  const shelterValidate: FormData = shelterSchema.parse(shelter)
  if (!shelterValidate) {
    return new NextResponse(JSON.stringify({ error: 'Dados inválidos' }), {
      status: 400,
    })
  }
  const { user } = session
  if (!user || !user.id) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    })
  }

  const createdShelter = await prisma.shelter.create({
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
      managerId: user.id,
    },
  })

  return NextResponse.json(createdShelter)
}
