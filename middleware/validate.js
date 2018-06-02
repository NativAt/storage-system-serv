const Joi = require('joi');
const httpResponse = require('../util/httpResponse');

// validation schema
const vaidateRequest = (req, res, next) => {
  const schema = {
    type: Joi.string().valid('public', 'private').required(),
  };

  const { error, value } = Joi.validate({ type: req.body.type }, schema);
  if (!error) return next();

  return next(httpResponse.badRequest('type parameter is Required'));
};


module.exports = vaidateRequest;

