'use client'
import { AlertCircle, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { usePublicNeed } from '@/api-uses/public-needs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDate } from '@/utils/formatDate'
import { formatPhoneNumber } from '@/utils/formatNumber'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: publicNeed, isLoading, isError } = usePublicNeed(id)

  if (isLoading) {
    return (
      <div className="flex w-full flex-col p-4">
        <Link href="/needs">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Necessidades
          </Button>
        </Link>
        <div className="mx-auto flex w-full max-w-3xl items-center">
          <LoadingSkeleton />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex w-full flex-col p-4">
        <Link href="/needs">
          <Button variant="outline" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Necessidades
          </Button>
        </Link>
        <div className="mx-auto flex w-full max-w-3xl items-center">
          <ErrorAlert />
        </div>
      </div>
    )
  }
  return (
    <div className="flex w-full flex-col p-4">
      <Link href="/needs">
        <Button variant="outline" size="sm" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Necessidades
        </Button>
      </Link>
      <div className="mx-auto flex w-full max-w-3xl items-center">
        {publicNeed ? (
          <Card className="mx-auto w-full max-w-3xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Detalhes da Necessidade
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Informações Gerais</h3>
                  <p>
                    <span className="font-medium">Descrição:</span>{' '}
                    {publicNeed.description}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    <Badge
                      variant={
                        publicNeed.status === 'PENDING'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {publicNeed.status === 'PENDING'
                        ? 'Pendente'
                        : 'Atendido'}
                    </Badge>
                  </p>
                  <p>
                    <span className="font-medium">Quantidade:</span>{' '}
                    {publicNeed.quantity}
                  </p>
                  <p>
                    <span className="font-medium">Criado em:</span>{' '}
                    {formatDate(publicNeed.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Atualizado em:</span>{' '}
                    {formatDate(publicNeed.updatedAt)}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold">Item</h3>
                  <p>
                    <span className="font-medium">Nome:</span>{' '}
                    {publicNeed.item.name}
                  </p>
                  <p>
                    <span className="font-medium">Descrição:</span>{' '}
                    {publicNeed.item.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold">Abrigo</h3>
                  <p>
                    <span className="font-medium">Nome:</span>{' '}
                    {publicNeed.shelter.name}
                  </p>
                  <p>
                    <span className="font-medium">Endereço:</span>{' '}
                    {publicNeed.shelter.address}
                  </p>
                  <p>
                    <span className="font-medium">Telefone:</span>{' '}
                    {formatPhoneNumber(publicNeed.shelter.phone)}
                  </p>
                  <p>
                    <span className="font-medium">Descrição:</span>{' '}
                    {publicNeed.shelter.description}
                  </p>
                  <p>
                    <span className="font-medium">Horário de Atendimento:</span>{' '}
                    {publicNeed.shelter.serviceHours}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              Não foi possível encontrar os detalhes desta necessidade.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  )
}
function LoadingSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}

function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Erro</AlertTitle>
      <AlertDescription>
        Ocorreu um erro ao carregar os detalhes da necessidade. Por favor, tente
        novamente mais tarde.
      </AlertDescription>
    </Alert>
  )
}
