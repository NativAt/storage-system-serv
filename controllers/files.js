const util = require('../util/dbCrud');
const helpers = require('../util/helpers');
const httpResponse = require('../util/httpResponse');


// get file
const getFile = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const { fileName } = req.params;
    const { metadata } = req.query;
    const fileMetaData = await util.getFileByName(userId, fileName, metadata);

    if (!fileMetaData) return next(httpResponse.notFound('File not found'));

    // return file metadata
    if (metadata === 'true') {
      return helpers.getFileMetadata(req, res, fileMetaData);
    }

    // download file
    return helpers.downloadFile(req, res, fileMetaData);
  } catch (err) {
    return next(httpResponse.InternalError());
  }
};

// update file
const updateFile = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const { fileName } = req.params;
    const { type: fileType } = req.body;

    const fileMetaData = await util
      .updateFileByName(userId, fileName, { type: fileType });

    if (!fileMetaData) return next(httpResponse.notFound('File not found'));

    return res.status(204).end();
  } catch (err) {
    return next(httpResponse.InternalError());
  }
};

// upload a new file
const uploadFile = async (req, res, next) => {
  try {
    // extract file metadata
    const { userId } = res.locals;
    const { originalname, size, path } = req.file;
    const fileType = req.body.type;

    await util.saveFileMetadata(originalname, size, fileType, path, userId);
    return res.status(204).end();
  } catch (err) {
    return next(httpResponse.InternalError());
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { userId } = res.locals;
    const { fileName } = req.params;
    const fileMetaData = await util.updateFileByName(userId, fileName, { deletedAt: new Date() });

    if (!fileMetaData) return next(httpResponse.notFound('File not found'));

    return res.status(204).end();
  } catch (err) {
    return next(httpResponse.InternalError());
  }
};


module.exports = {
  uploadFile,
  getFile,
  updateFile,
  deleteFile,
};
