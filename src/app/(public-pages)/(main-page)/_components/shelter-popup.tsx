import { Clock, MapPin, Navigation, PhoneCall } from 'lucide-react'

import { Shelter } from '@/api-uses/public-shelters/type'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CardContent, CardTitle } from '@/components/ui/card'
import { LogosWhatsappIcon } from '@/components/wppIcon'
import { formatDate } from '@/utils/formatDate'
import { formatPhoneNumber } from '@/utils/formatNumber'
interface ShelterPopupProps {
  shelter: Shelter
}
export function ShelterPopup({ shelter }: ShelterPopupProps) {
  const availableVacancies = shelter.capacity - shelter.currentOccupancy
  const occupancyPercentage =
    shelter.currentOccupancy > 0
      ? Math.round((shelter.currentOccupancy / shelter.capacity) * 100)
      : 100
  const updatedAt = shelter.updatedAt.toLocaleString()
  console.log(updatedAt)
  return (
    <>
      <CardTitle className="truncate text-center text-base font-semibold">
        {shelter.name}
      </CardTitle>
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-start">
            <MapPin className="mr-2 h-5 w-5 text-gray-500" />
            <p className="!m-0 text-sm text-gray-600">{shelter.address}</p>
          </div>
          {shelter.phone && (
            <div className="flex items-center justify-start">
              <PhoneCall className="mr-2 h-5 w-5 text-gray-500" />
              <a href={`tel:${formatPhoneNumber(shelter.phone)}`}>
                {formatPhoneNumber(shelter.phone)}
              </a>
            </div>
          )}
          {shelter.serviceHours && (
            <div className="flex items-center justify-start">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <p>{shelter.serviceHours}</p>
            </div>
          )}
          {shelter.description && (
            <div className="rounded-md bg-secondary/50 p-2">
              <div className="flex flex-col">
                Descrição: <span>{shelter.description}</span>
              </div>
            </div>
          )}
          <div className="rounded-md bg-secondary/50 p-2">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium">Ocupação</span>
              <Badge
                variant={occupancyPercentage < 90 ? 'outline' : 'destructive'}
                className="h-5 text-xs"
              >
                {occupancyPercentage}%
              </Badge>
            </div>
            <div className="mb-2 h-1.5 w-full rounded-full bg-secondary">
              <div
                className="h-1.5 rounded-full bg-primary"
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <div className="flex flex-col">
                Capacidade Máxima: <span>{shelter.capacity}</span>
              </div>
              <div className="flex flex-col">
                Pessoas abrigadas: <span>{shelter.currentOccupancy}</span>
              </div>
              <div className="flex flex-col">
                Vagas Disponíveis: <span>{availableVacancies}</span>
              </div>
            </div>
          </div>
          <div className="flex h-20 flex-col gap-2">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-8 flex-1 text-xs"
            >
              <a
                target="_blank"
                href={`https://www.google.com/maps/dir//${shelter.lat},${shelter.lng}/@${shelter.lat},${shelter.lng},15z`}
              >
                <Navigation className="mr-1 h-3 w-3" />
                Como Chegar
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 flex-1 bg-green-500 text-xs hover:bg-green-600 dark:text-foreground"
              asChild
            >
              <a
                target="_blank"
                href={`https://wa.me/${shelter.phone}`}
                className="text-background dark:text-foreground"
              >
                <LogosWhatsappIcon className="h-3 w-3" />
                WhatsApp
              </a>
            </Button>
          </div>
          {shelter.updatedAt && (
            <span className="text-xs text-gray-400">
              Última atualização: {formatDate(shelter.updatedAt)}
            </span>
          )}
        </div>
      </CardContent>
    </>
  )
}
