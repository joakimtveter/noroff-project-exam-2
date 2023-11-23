import { ReactElement, useRef, useEffect } from 'react'
import { useTheme } from '@mui/material'
import mapbox from 'mapbox-gl'

mapbox.accessToken = import.meta.env.VITE_MAPBOX_TOKEN

interface VenueMapProps {
    lat: number
    lng: number
}

export default function VenueMap(props: VenueMapProps): ReactElement {
    const { lat, lng } = props
    const mapContainer = useRef<HTMLDivElement>(null)
    const map = useRef<mapbox.Map | null>(null)
    const theme = useTheme()

    useEffect(() => {
        if (map.current) return
        map.current = new mapbox.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/light-v11',
            center: [lng, lat],
            zoom: 10,
        })
        const primaryColor = theme.palette.primary.main
        new mapbox.Marker({ color: primaryColor }).setLngLat([lng, lat]).addTo(map.current)
    })

    return <div ref={mapContainer} className="map-container" />
}
