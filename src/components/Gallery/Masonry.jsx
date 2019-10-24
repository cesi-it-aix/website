import React from 'react';
import { css } from '@emotion/core';
import Gallery from 'react-photo-gallery';
import Img from 'gatsby-image';
import { useLoadMore } from '../../hooks';

const galleryImgStyle = css`
  cursor: pointer;
  transition: ease 200ms;
  &:hover {
    filter: brightness(0.5);
  }
`;

const Masonry = ({ pictures, onClick }) => {
  const displayedPictures = useLoadMore(pictures, 5);

  return (
    <Gallery
      photos={displayedPictures}
      renderImage={({ key, index, photo, margin }) => (
        <Img
          key={key}
          fluid={photo.fluid}
          onClick={event => onClick(event, { index })}
          css={galleryImgStyle}
          style={{
            width: photo.width,
            margin,
          }}
        />
      )}
    />
  );
};

export default Masonry;
