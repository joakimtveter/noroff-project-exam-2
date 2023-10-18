import { useState } from 'react';

import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import VenuePlaceholder from '@/assets/venue-placeholder.svg';

interface VenueGalleryProps {
    images: string[];
}

export default function VenueGallery(props: VenueGalleryProps) {
    const { images } = props;
    const [currentImage, setCurrentImage] = useState<number>(0);

    const handleImageClick = (index: number) => {
        setCurrentImage(index);
    };

    return (
        <Box sx={{padding: 1}}>
            <img src={images[currentImage] ?? VenuePlaceholder} style={{objectFit: 'contain', display: 'block', width: '100%', height: '400px'}}/>
            {images.length > 1 && (
                <Box paddingBlock={1}>
                    <ImageList
                        cols={4}
                        rowHeight={150}
                        variant='quilted'
                        >
                        {images.map((image, index) => (
                            <ImageListItem
                            key={image}
                            sx={{ cursor: 'pointer'}}
                            onClick={() => handleImageClick(index)}>
                                <img src={image} alt='' loading='lazy' style={{ objectFit: 'cover'}} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )}
        </Box>
    );
}
