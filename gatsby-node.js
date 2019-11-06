const path = require('path');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node);
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('src/templates/post.jsx');

    resolve(
      graphql(
        `
          query {
            allMdx(sort: { order: ASC, fields: [frontmatter___date] }) {
              edges {
                node {
                  fileAbsolutePath
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          return reject(result.errors);
        }

        const [events, pages] = result.data.allMdx.edges.reduce(
          (a, e) => {
            const path = e.node.fileAbsolutePath;
            if (path.match('/events/')) a[0].push(e);
            if (path.match('/pages/')) a[1].push(e);
            return a;
          },
          [[], []]
        );

        events.forEach(({ node }, index) => {
          const path = node.frontmatter.path;
          const prev = index === 0 ? null : events[index - 1].node;
          const next =
            index === events.length - 1 ? null : events[index + 1].node;
          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path,
              prev,
              next,
            },
          });
        });

        pages.forEach(({ node }) => {
          const path = node.frontmatter.path;
          createPage({
            path,
            component: postTemplate,
            context: {
              pathSlug: path,
              prev: null,
              next: null,
            },
          });
        });
      })
    );
  });
};

/* Allows named imports */
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
