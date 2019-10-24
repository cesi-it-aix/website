import React, { useState, useCallback } from 'react';
import { css } from '@emotion/core';
import { graphql, useStaticQuery } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Img from 'gatsby-image';
import Carousel, { Modal, ModalGateway } from 'react-images';

const GET_PICTURES = graphql`
  {
    allFile(filter: { absolutePath: { regex: "/gallery/" } }) {
      edges {
        node {
          absolutePath
          childImageSharp {
            original {
              src
              height
              width
            }
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;

const galleryImgStyle = css`
  cursor: pointer;
  transition: ease 200ms;
  &:hover {
    filter: brightness(0.5);
  }
`;

const carouselImgStyle = css`
  height: auto;
  max-height: 100vh;
  max-width: 100%;
  userselect: none;
`;

const setStyle = style => base => ({ ...base, ...style });

const ImageGall = ({ folder }) => {
  const data = useStaticQuery(GET_PICTURES);
  const pictures = data.allFile.edges
    .filter(x => x.node.absolutePath.includes(`gallery/${folder}`))
    .map(x => ({
      ...x.node.childImageSharp.original,
      fluid: x.node.childImageSharp.fluid,
    }));

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  }, []);

  return (
    <>
      <Gallery
        photos={pictures}
        onClick={openLightbox}
        renderImage={({ key, index, photo, margin, onClick }) => (
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
      <ModalGateway st>
        {viewerIsOpen && (
          <Modal
            onClose={closeLightbox}
            styles={{
              positioner: setStyle({ zIndex: 3000 }),
              blanket: setStyle({ zIndex: 3000 }),
              dialog: setStyle({ flex: 1 }),
            }}
          >
            <Carousel
              currentIndex={currentImage}
              views={pictures.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
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
    </>
  );
};

export default ImageGall;
