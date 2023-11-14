import { ReactElement } from 'react'
import { Grid, Typography } from '@mui/material'
import VenueCard from '@/components/venue/venue-card'

import { Venue } from '@/types/venue.ts'

interface VenueListProps {
    venues: Venue[]
    cardHeadingLevel?: 2 | 3 | 4 | 5 | 6
}
export default function VenueList(props: VenueListProps): ReactElement {
    const { venues, cardHeadingLevel = 2 } = props

    return (
        <Grid container component="ul" spacing={2} sx={{ listStyleType: 'none', padding: 0 }}>
            {venues.length > 0 ? (
                venues.map((venue) => (
                    <Grid item key={venue.id} component="li" xs={12} sm={6} md={4}>
                        <VenueCard headingLevel={cardHeadingLevel} {...venue} />
                    </Grid>
                ))
            ) : (
                <Grid component={'li'} item xs={12} sx={{ paddingBlock: 6 }}>
                    <Typography> No results</Typography>
                </Grid>
            )}
        </Grid>
    )
}
