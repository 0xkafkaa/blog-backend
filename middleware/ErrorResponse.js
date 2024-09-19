module.exports = function (err, req, res, next) {
  console.log(err);
  return res.json({
    success: false,
    err,
  });
};
