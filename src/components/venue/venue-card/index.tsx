import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActionArea, CardMedia, Typography, CardActions } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import StarIcon from '@mui/icons-material/Star'
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
    rating: 1 | 2 | 3 | 4 | 5
}

export default function VenueCard(props: VenueCardProps): ReactElement {
    const { id, name, media, headingLevel = 2, price, location, rating } = props

    return (
        <Card sx={{ height: '100%' }}>
            <CardActionArea
                component={Link}
                to={`/venues/${id}`}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
                <CardMedia
                    component="img"
                    sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    image={media[0] ?? VenuePlaceholder}
                    alt={name}
                />
                <CardContent sx={{ flexGrow: 1, paddingBlock: 1 }}>
                    <Typography variant="h6" component={`h${headingLevel}`}>
                        {name}
                    </Typography>
                    <Typography variant="body2" component="p" color="secondary" marginBlockEnd={1}>
                        <PlaceIcon />
                        {location.city}, {location.country}
                    </Typography>
                </CardContent>
                <CardActions sx={{ paddingInline: 2 }}>
                    <StarIcon color="primary" /> {rating}
                    <Typography variant="body2" color="text.secondary" sx={{ marginInlineStart: 'auto' }}>
                        <Typography variant="h5" component="span" color="primary" fontWeight={600}>
                            {formatCurrency(price)}
                        </Typography>
                        {' /night'}
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
