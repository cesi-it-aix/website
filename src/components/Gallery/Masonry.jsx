import React from 'react';
import { css } from '@emotion/core';
import Gallery from 'react-photo-gallery';
import Img from 'gatsby-image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLoadMore } from '../../hooks';

const galleryImgStyle = css`
  cursor: pointer;
  transition: ease 200ms;
  &:hover {
    filter: brightness(0.5);
  }
`;

const Masonry = ({ pictures, onClick }) => {
  const [displayedPictures, displayMorePictures] = useLoadMore(pictures, 10);
  const hasMorePictures = displayedPictures.length < pictures.length;
  
  return (
    <InfiniteScroll
      dataLength={displayedPictures.length}
      next={displayMorePictures}
      hasMore={hasMorePictures}
      loader={<h4 style={{ textAlign: 'center' }}>loading...</h4>}
    >
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
    </InfiniteScroll>
  );
};

export default Masonry;
