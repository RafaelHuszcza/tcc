import { Clock, MapPin, Navigation,  PhoneCall } from 'lucide-react'
import {  CardContent, CardTitle } from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shelter } from '@/api-uses/public-shelters/type'
import { LogosWhatsappIcon } from '@/components/wppIcon'
import { formatPhoneNumber } from '@/utils/formatNumber'
import { formatDate } from '@/utils/formatDate'
interface ShelterPopupProps {
  shelter: Shelter
}
export function ShelterPopup({ shelter }: ShelterPopupProps) {
  const availableVacancies = shelter.capacity - shelter.currentOccupancy
  const occupancyPercentage = shelter.currentOccupancy > 0 
  ? Math.round((shelter.currentOccupancy / shelter.capacity) * 100)
  : 100;
  const updatedAt = shelter.updatedAt.toLocaleString()
  console.log(updatedAt)
  return (
      <>
      <CardTitle className="text-base text-center font-semibold truncate">{shelter.name}</CardTitle>
      <CardContent className="p-3">
        <div className="flex flex-col gap-2">
        <div className="flex items-center justify-start"> 
        <MapPin className="h-5 w-5 text-gray-500 mr-2" /> 
        <p className="text-sm !m-0 text-gray-600">{shelter.address}</p>
        </div>
        {shelter.phone && (
        <div className="flex items-center justify-start"> 
        <PhoneCall className="h-5 w-5 text-gray-500 mr-2" />
        <a href={`tel:${formatPhoneNumber(shelter.phone)}`}>
        {formatPhoneNumber(shelter.phone)}
        </a>
        </div>
        )}
        {shelter.serviceHours && (
         <div className="flex items-center justify-start"> 
        <Clock className="h-5 w-5 text-gray-500 mr-2" />
        <p >
        {shelter.serviceHours}
        </p>
        </div>
        )}
        {shelter.description && (
        <div className="bg-secondary/50 p-2 rounded-md">
              <div className='flex flex-col'>Descrição: <span>{shelter.description}</span></div>
          </div>
        )}
          <div className="bg-secondary/50 p-2 rounded-md">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium">Ocupação</span>
              <Badge variant={occupancyPercentage < 90 ? "outline" : "destructive"} className="text-xs h-5">
                {occupancyPercentage}%
              </Badge>
            </div>
            <div className="w-full bg-secondary h-1.5 rounded-full mb-2">
              <div 
                className="bg-primary h-1.5 rounded-full" 
                style={{ width: `${occupancyPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <div className='flex flex-col'>Capacidade Máxima: <span>{shelter.capacity}</span></div>
              <div className='flex flex-col'>Pessoas abrigadas: <span>{shelter.currentOccupancy}</span></div>
              <div className='flex flex-col'>Vagas Disponíveis: <span>{availableVacancies}</span></div>
            </div>
          </div>
          <div className="flex flex-col gap-2 h-20">
          <Button asChild variant="outline" size="sm" className="flex-1 h-8 text-xs">
              <a
                target="_blank"
                href={`https://www.google.com/maps/dir//${shelter.lat},${shelter.lng}/@${shelter.lat},${shelter.lng},15z`}
              >
                <Navigation className="h-3 w-3 mr-1" />
                Como Chegar
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs bg-green-500 hover:bg-green-600 dark:text-foreground"
              asChild
            >
             
              <a
                target="_blank"
                href={`https://wa.me/${shelter.phone}`}
                className="text-background dark:text-foreground"
              >
                 <LogosWhatsappIcon className="h-3 w-3"/>
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
