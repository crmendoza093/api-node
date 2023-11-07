function logErrors (err, req, res, next) {
  console.log(err);
  next(err);
}

function errorHandler (err, req, res, next) {
  res.json({
    mensaje: err.message,
    code: err
  });
}

module.exports = { logErrors, errorHandler };
