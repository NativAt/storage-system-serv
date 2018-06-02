const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;
const { ObjectId } = Schema;


const UserSchema = new Schema({
  username: String,
  token: String,
}, { versionKey: false, timestamps: true });


const FileSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  privateName: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(10).toString('hex'),
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['private', 'public'],
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  deletedAt: Date,
}, { versionKey: false, timestamps: true });


module.exports.users = mongoose.model('Users', UserSchema, 'users');
module.exports.files = mongoose.model('Files', FileSchema, 'files');
