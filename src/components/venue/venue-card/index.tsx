import { Link, useNavigate } from 'react-router-dom';

import { visuallyHidden } from '@mui/utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import VenuePlaceholder from '@/assets/venue-placeholder.svg';

interface VenueCardProps {
    id: string;
    name: string;
    description: string;
    media: string[];
    headingLevel: 2 | 3 | 4 | 5 | 6;
}

export default function VenueCard(props: VenueCardProps) {
    const { id, name, description, media, headingLevel = 2 } = props;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/venues/${id}`);
    };
    return (
        <Grid item component='li'>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleClick}>
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
                        <Typography variant='body2' color='text.secondary' sx={{minHeight: '60px'}}>
                            {description.slice(0, 117)}{ description.length > 117 ? '...' : ''}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button component={Link} to={`/venues/${id}`} size='small' sx={{ color: 'text.green' }}>
                        View
                        <Box component={'span'} style={visuallyHidden}>
                            {' ' + name}
                        </Box>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
