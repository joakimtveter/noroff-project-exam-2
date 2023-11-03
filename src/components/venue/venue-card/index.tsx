import type { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import {
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Typography
} from '@mui/material'

import VenuePlaceholder from '@/assets/venue-placeholder.svg'

interface VenueCardProps {
  id: string
  name: string
  description: string
  media: string[]
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

export default function VenueCard (props: VenueCardProps): ReactElement {
  const { id, name, description, media, headingLevel = 2 } = props

  return (
        <Card>
            <CardActionArea component={Link} to={`/venues/${id}`}>
                <CardMedia
                    component='img'
                    sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    image={media[0] ?? VenuePlaceholder}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component={`h${headingLevel}`}>
                        {name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary' sx={{ minHeight: '60px' }}>
                        {description.slice(0, 117)}{ description.length > 117 ? '...' : ''}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
  )
}
