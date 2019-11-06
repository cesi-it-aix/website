const { google } = require('googleapis');
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const crypto = require('crypto');
const path = require('path');
const Bottleneck = require('bottleneck');
require('dotenv').config();

const FOLDER_TYPE = 'application/vnd.google-apps.folder';

const limiter = new Bottleneck({
  minTime: 200,
});

const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/drive'],
});

const gtoken = Buffer.from(process.env.GOOGLE_DRIVE_TOKEN, 'base64').toString(
  'utf-8'
);
auth.jsonContent = JSON.parse(gtoken);

const drive = google.drive({ version: 'v3', auth });

exports.sourceNodes = async ({ actions, createNodeId }) => {
  const { createNode } = actions;

  const imageFolders = await limiter.schedule(() =>
    drive.files.list({
      q: `'1LvAEQCl_d1yJXhjWEqPCoIzH-AB-Xwv9' in parents`,
    })
  );

  await Promise.all(
    imageFolders.data.files.map(async folder => {
      if (folder.mimeType === FOLDER_TYPE) {
        const folderContent = await limiter.schedule(() =>
          drive.files.list({
            q: `'${folder.id}' in parents`,
          })
        );
        const images =
          process.env.NODE_ENV === 'development'
            ? folderContent.data.files.slice(0, 5)
            : folderContent.data.files;

        await Promise.all(
          images.map(async image => {
            if (image.mimeType !== FOLDER_TYPE) {
              const nodeId = createNodeId(`drive-file-${image.id}`);
              const nodeContent = JSON.stringify(image);
              const nodeContentDigest = crypto
                .createHash('md5')
                .update(nodeContent)
                .digest('hex');
              const {
                data: { webContentLink, createdTime },
              } = await limiter.schedule(() =>
                drive.files.get({
                  fileId: image.id,
                  fields: 'webContentLink, createdTime',
                })
              );
              const node = Object.assign({}, image, {
                id: nodeId,
                parent: `__SOURCE__`,
                folder: folder.name,
                children: [],
                url: webContentLink.split('&')[0],
                createdTime,
                internal: {
                  type: `DriveNode`,
                  mediaType: image.mimeType,
                  content: nodeContent,
                  contentDigest: nodeContentDigest,
                },
                name: image.name,
              });
              createNode(node);
            }
          })
        );
      }
    })
  );
};

exports.onCreateNode = async ({
  node,
  actions,
  cache,
  store,
  createNodeId,
}) => {
  const { createNodeField, createNode } = actions;
  if (node.internal.type === `DriveNode`) {
    const { url, name } = node;
    try {
      const fileNode = await createRemoteFileNode({
        url,
        store,
        cache,
        createNode,
        createNodeId,
        ext: path.extname(node.name),
      });
      if (fileNode) {
        node.localFile___NODE = fileNode.id;
        const slug = name
          .slice(name.length - 30, name.length)
          .toLowerCase()
          .replace(/\W+/g, '-');
        createNodeField({
          node,
          name: 'slug',
          value: slug,
        });
      }
    } catch (e) {
      console.log(`Error creating remote file`, e);
    }
  }
};
