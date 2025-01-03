import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/services/database'


export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const shelterID = params.id
  if (!shelterID) {
    return new NextResponse(
      JSON.stringify({ error: 'Shelter Not Found' }),
      {
        status: 404,
      },
    )
  }

  const shelter = await prisma.shelter.findFirst({
    where: { id: shelterID },
  })

  if (!shelter) {
    return new NextResponse(
      JSON.stringify({ error: 'Shelter Not Found' }),
      { status: 404 },
    )
  }
  
  return NextResponse.json(shelter)
}
