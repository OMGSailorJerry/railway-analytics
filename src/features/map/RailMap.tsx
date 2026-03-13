import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useAppStore } from '@/store/app.store'
import type { Station } from '@/api/types'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

interface RailMapProps {
  stations: Station[]
}

/**
 * Component to handle map center updates
 */
function MapController() {
  const map = useMap()
  const mapCenter = useAppStore((state) => state.mapCenter)
  const mapZoom = useAppStore((state) => state.mapZoom)

  useEffect(() => {
    map.setView([mapCenter.lat, mapCenter.lng], mapZoom)
  }, [mapCenter, mapZoom, map])

  return null
}

export function RailMap({ stations }: RailMapProps) {
  const mapCenter = useAppStore((state) => state.mapCenter)
  const mapZoom = useAppStore((state) => state.mapZoom)
  const setSelectedStation = useAppStore((state) => state.setSelectedStation)

  // Filter stations with valid coordinates
  const validStations = stations.filter((station) => station.coordinates !== null)

  return (
    <div className="h-full w-full">
      <MapContainer
        center={[mapCenter.lat, mapCenter.lng]}
        zoom={mapZoom}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapController />
        {validStations.map((station) => {
          if (!station.coordinates) return null

          return (
            <Marker
              key={station.id}
              position={[station.coordinates.lat, station.coordinates.lng]}
              eventHandlers={{
                click: () => {
                  setSelectedStation(station)
                },
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold">{station.name}</h3>
                    {station.coordinates && (
                    <p className="text-xs text-gray-500">
                        {station.coordinates.lat?.toFixed(4)},{' '}
                        {station.coordinates.lng?.toFixed(4)}
                    </p>
                    )}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
