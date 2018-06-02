module.exports = {
  badRequest: (message) => {
    const response = {
      statusCode: 400,
      error: 'Bad Request',
      message,
    };
    return response;
  },

  notFound: (message) => {
    const response = {
      statusCode: 404,
      error: 'Not Found',
      message,
    };
    return response;
  },

  unauthorized: () => {
    const response = {
      statusCode: 401,
      error: 'Unauthorized',
      message: 'Access is denied due to invalid credentials',
    };
    return response;
  },

  InternalError: () => {
    const response = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'Internal server error has occurred',
    };
    return response;
  },
};
