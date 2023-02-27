"use strict";

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  return res.status(404).send({
    code: 404,
    message: `Server Error: ${err.message || err}`,
  });
};
