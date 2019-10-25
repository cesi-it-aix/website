import React from 'react';
import { css } from '@emotion/core';
import Img from 'gatsby-image';
import ModalCarousel, { Modal, ModalGateway } from 'react-images';

const carouselImgStyle = css`
  height: auto;
  max-height: 100vh;
  max-width: 100%;
  userselect: none;
`;

const setStyle = style => base => ({ ...base, ...style });

const Carousel = ({ pictures, index, isOpen, onClose }) => (
  <ModalGateway st>
    {isOpen && (
      <Modal
        onClose={onClose}
        styles={{
          positioner: setStyle({ zIndex: 3000 }),
          blanket: setStyle({ zIndex: 3000 }),
          dialog: setStyle({ flex: 1 }),
        }}
      >
        <ModalCarousel
          currentIndex={index}
          views={pictures}
          components={{
            View: ({ index, data }) => (
              <Img
                key={index}
                fluid={data.fluid}
                imgStyle={{ objectFit: 'contain' }}
                css={carouselImgStyle}
              />
            ),
          }}
        />
      </Modal>
    )}
  </ModalGateway>
);

export default Carousel;
