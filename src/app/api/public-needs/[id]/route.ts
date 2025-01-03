import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/services/database'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const needId = params.id
  if (!needId) {
    return new NextResponse(JSON.stringify({ error: 'Need Not Found' }), {
      status: 404,
    })
  }

  const need = await prisma.need.findFirst({
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
    return new NextResponse(JSON.stringify({ error: 'Need Not Found' }), {
      status: 404,
    })
  }

  return NextResponse.json(need)
}
