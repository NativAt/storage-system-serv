const { users, files } = require('../models/models');


exports.getUserByToken = (token) => {
  try {
    return users.findOne({ token });
  } catch (err) {
    throw err;
  }
};

exports.saveFileMetadata = async (name, size, type, path, userId) => {
  try {
    const File = files;
    const newFile = new File({
      name, size, type, path, userId,
    });
    return newFile.save();
  } catch (err) {
    throw err;
  }
};

exports.getFileByName = async (userId, name, metadata) => {
  try {
    /*
    try to get file by `name` field if public
    else try to get by `privateName` field
    */
    const query =
    {
      $and: [
        {
          $or: [
            { $and: [{ name }, { type: 'public' }] },
            { $and: [{ userId }, { privateName: name }, { type: 'private' }] },
          ],
        }],
    };
    if (metadata !== 'true') query.$and.push({ deletedAt: { $exists: false } });
    return files.findOne(query);
  } catch (err) {
    throw err;
  }
};

exports.updateFileByName = async (userId, name, fieldToUpdate) => {
  try {
    return files.findOneAndUpdate(
      {
        $and: [
          { userId },
          { deletedAt: { $exists: false } },
          {
            $or: [
              { $and: [{ name }, { type: 'public' }] },
              { $and: [{ privateName: name }, { type: 'private' }] },
            ],
          }],
      },
      { $set: fieldToUpdate },
      { new: true },
    );
  } catch (err) {
    throw err;
  }
};
