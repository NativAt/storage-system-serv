const util = require('../util/dbCrud');
const httpResponse = require('../util/httpResponse');

const validateUserToken = async (req, res, next) => {
  if (!req.headers['x-auth']) return next(httpResponse.unauthorized());

  const token = req.headers['x-auth'];
  const user = await util.getUserByToken(token);

  if (!user) return next(httpResponse.unauthorized());

  const { id: userId } = user;
  res.locals.userId = userId;

  return next();
};


module.exports = validateUserToken;
