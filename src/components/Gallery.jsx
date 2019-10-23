import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import { graphql, useStaticQuery } from 'gatsby';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from '../Image/photos';

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
    .filter(x => x.node.absolutePath.includes(`Gallery/${folder}`))
    .map(x => x.node.childImageSharp.original);

  return <Gallery photos={pictures} />;
};

export default ImageGall;
