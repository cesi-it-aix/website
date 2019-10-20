import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import {graphql, useStaticQuery} from "gatsby"
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "../Image/photos";


const getQuery = folder => `
 {
    allFile(filter: {relativeDirectory: {eq: ${folder}}}) {
        edges {
            node {
                childImageSharp {
                    sizes(maxHeight: 10, maxWidth: 10) {
                        src
                        presentationWidth
                        presentationHeight
                    }
                }
            }
        }
    }
}
`

const ImageGall = ({folder}) => {
    const pictures = useStaticQuery(graphql(getQuery(folder)));
    return <Gallery photos={pictures} />
};

export default ImageGall;

