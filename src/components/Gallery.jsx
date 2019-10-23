import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
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
            fluid {
              ...GatsbyImageSharpFluid
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
    .map(x => ({
      ...x.node.childImageSharp.original,
      fluid: x.node.childImageSharp.fluid,
    }));

  return (
    <Gallery
      photos={pictures}
      renderImage={({ index, left, top, key, photo }) => (
        <Img key={index} fluid={photo.fluid} />
      )}
    />
  );
};

export default ImageGall;
