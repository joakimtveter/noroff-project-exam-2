import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import VenuePlaceholder from '@/assets/venue-placeholder.svg';

interface VenueCardProps {
    id: string;
    name: string;
    description: string;
    media: string[];
}

export default function VenueCard(props: VenueCardProps) {
    const { id, name, description, media } = props;
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/venues/${id}`);
    };
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={handleClick}>
                <CardMedia
                    component='img'
                    sx={{ aspectRatio: '1/1', objectFit: 'cover' }}
                    image={media[0] ?? VenuePlaceholder}
                    alt={name}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {description}
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
    );
}
