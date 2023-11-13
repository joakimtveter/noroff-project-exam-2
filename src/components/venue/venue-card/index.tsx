import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActionArea, CardMedia, Typography } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import VenuePlaceholder from '@/assets/venue-placeholder.svg'
import formatCurrency from '@/utils/formatCurrency.ts'
import { VenueLocation } from '@/types/venue.ts'

interface VenueCardProps {
    id: string
    name: string
    media: string[]
    price: number
    location: VenueLocation
    headingLevel?: 2 | 3 | 4 | 5 | 6
}

export default function VenueCard(props: VenueCardProps): ReactElement {
    const { id, name, media, headingLevel = 2, price, location } = props

    return (
        <Card>
            <CardActionArea component={Link} to={`/venues/${id}`}>
                <CardMedia
                    component="img"
                    sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    image={media[0] ?? VenuePlaceholder}
                    alt={name}
                />
                <CardContent>
                    <Typography variant="h5" component={`h${headingLevel}`}>
                        {name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        <PlaceIcon />
                        {location.city}, {location.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'end' }}>
                        <Typography variant="h5" component="span" color="primary" sx={{ minHeight: '60px' }}>
                            {formatCurrency(price)}
                        </Typography>
                        {' /night'}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
