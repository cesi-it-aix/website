import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { graphql, useStaticQuery } from 'gatsby';
import Gallery from 'react-photo-gallery';
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
          }
        }
      }
    }
  }
`;

const ImageGall = ({ folder }) => {
  const data = useStaticQuery(GET_PICTURES);
  const pictures = data.allFile.edges
    .filter(x => x.node.absolutePath.includes(`gallery/${folder}`))
    .map(x => x.node.childImageSharp.original);

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    
    const openLightbox = useCallback((event, { pictures, index }) => {
      setCurrentImage(index);
      setViewerIsOpen(true);
    }, []);
    
    const closeLightbox = () => {
      setCurrentImage(0);
      setViewerIsOpen(false);
    };
  return (
    <div>
      <Gallery photos={pictures} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={pictures.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </div>
  );
};

export default ImageGall;
