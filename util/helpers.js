const sysPath = require('path');

const appDir = sysPath.dirname(require.main.filename);

exports.getFileMetadata = (req, res, fileMetaData) => {
  const { name, size, updatedAt } = fileMetaData;
  return res.json({ name, size, updatedAt });
};

exports.downloadFile = (req, res, fileMetaData) => {
  const { name, path } = fileMetaData;

  // compose file absolute path
  const file = `${appDir}/${path}`;
  return res.download(file, name);
};
