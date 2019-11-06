import { graphql, useStaticQuery } from 'gatsby';

const GET_PICTURES = graphql`
  {
    allDriveNode {
      nodes {
        folder
        localFile {
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
  return data.allDriveNode.nodes
    .filter(x => x.folder === folder)
    .map(x => ({
      ...x.localFile.childImageSharp.original,
      fluid: x.localFile.childImageSharp.fluid,
    }));
}
