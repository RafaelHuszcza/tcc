'use client'

import 'leaflet/dist/leaflet.css'
import L, { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import { usePublicShelters } from '@/api-uses/public-shelters'
import { ShelterPopup } from './shelter-popup'
const Map = () => {
  const {data: shelters } = usePublicShelters()
  const coord : LatLngExpression = [-32.0453936, -52.1160472]

  function getIcon(color: string) {
    return new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' +
        color +
        '.png',
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
  }
  const ShelterIcon = getIcon('blue')

  return (
    <>
      <MapContainer className="z-10 h-full w-full" center={coord} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          maxZoom={19}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shelters?.map((shelter) => {
          return (
            <Marker
            icon={ShelterIcon}
            key={shelter.id}
            position={[shelter.lat, shelter.lng]}
          >
             <Popup >
                <ShelterPopup shelter={shelter} />
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </>
  )
}

export default Map
