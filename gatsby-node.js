const path = require('path');

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
                  frontmatter {
                    path
                    title
                    hidden
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

        const [posts, hiddenPosts] = result.data.allMdx.edges.reduce(
          (a, e) => {
            if (e.node.frontmatter.hidden === true) {
              a[1].push(e);
            } else {
              a[0].push(e);
            }
            return a;
          },
          [[], []]
        );

        //create posts
        posts.forEach(({ node }, index) => {
          const path = node.frontmatter.path;
          const prev = index === 0 ? null : posts[index - 1].node;
          const next =
            index === posts.length - 1 ? null : posts[index + 1].node;
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

        hiddenPosts.forEach(({ node }) => {
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
