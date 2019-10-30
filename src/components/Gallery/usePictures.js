import { graphql, useStaticQuery } from 'gatsby';

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

export function usePictures(folder) {
  const data = useStaticQuery(GET_PICTURES);
  return data.allFile.edges
    .filter(x => x.node.absolutePath.includes(`gallery/${folder}`))
    .map(x => ({
      ...x.node.childImageSharp.original,
      fluid: x.node.childImageSharp.fluid,
    }));
}
