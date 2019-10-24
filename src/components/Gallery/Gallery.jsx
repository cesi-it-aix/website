import React, { useState, useCallback } from 'react';
import { usePictures } from './usePictures';
import Carousel from './Carousel';
import Masonry from './Masonry';

const ImageGall = ({ folder }) => {
  const pictures = usePictures(folder);

  const [pictureIndex, setPictureIndex] = useState(0);
  const [carouselIsOpen, setCarouselIsOpen] = useState(false);

  const openCarousel = useCallback((event, { index }) => {
    setPictureIndex(index);
    setCarouselIsOpen(true);
  }, []);

  const closeCarousel = useCallback(() => {
    setPictureIndex(0);
    setCarouselIsOpen(false);
  }, []);

  return (
    <>
      <Masonry pictures={pictures} onClick={openCarousel} />
      <Carousel
        pictures={pictures}
        index={pictureIndex}
        isOpen={carouselIsOpen}
        onClose={closeCarousel}
      />
    </>
  );
};

export default ImageGall;
