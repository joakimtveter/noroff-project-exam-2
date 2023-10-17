import { useState } from 'react';
import { Box, ImageList, ImageListItem } from '@mui/material';
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
        <Box>
            <Box>
                <img src={images[currentImage] ?? VenuePlaceholder} />
            </Box>
            {images.length > 1 && (
                <Box>
                    <ImageList
                        // cols={images.length > 4 ? images.length : 4}
                        cols={6}
                        rowHeight={200}
                        // sx={{ width: '100%',  }}
                        variant='quilted'
                        >
                        {images.map((image, index) => (
                            <ImageListItem
                                key={image}
                                sx={{ cursor: 'pointer'}}
                                onClick={() => handleImageClick(index)}>
                                <img src={image} alt='' loading='lazy' style={{ objectFit: 'fill'}} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )}
        </Box>
    );
}
