module.exports = ParseData = (req, res, next) => {
  for (const [key, value] of Object.entries(req.body)) {
    switch (value) {
      case 'undefined':
        req.body[key] = undefined;
        break;
      case 'null':
        req.body[key] = null;
        break;
      case 'true':
        req.body[key] = true;
        break;
      case 'false':
        req.body[key] = false;
        break;
      default:
        break;
    };
  };

  next();
}