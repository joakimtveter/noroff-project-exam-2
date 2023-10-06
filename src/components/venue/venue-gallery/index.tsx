import { useState } from 'react';
import { Box, ImageList, ImageListItem } from '@mui/material';

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
                <img src={images[currentImage]} />
            </Box>
            {images.length > 1 && (
                <Box>
                    <ImageList
                        // cols={images.length > 4 ? images.length : 4}
                        cols={3}
                        rowHeight={200}
                        gap={1}
                        sx={{ width: '100%', height: 200 }}>
                        {images.map((image, index) => (
                            <ImageListItem
                                sx={{ cursor: 'pointer' }}
                                key={image}
                                onClick={() => handleImageClick(index)}>
                                <img src={image} alt='' loading='lazy' style={{ aspectRatio: '1/1' }} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Box>
            )}
        </Box>
    );
}
