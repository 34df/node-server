const { } = require('./outerModel');

class outerController {
  welcome(req, res) {
    res.sendFile('welcome.html', { root: `${ROOT_DIR}/public` });
  };
};

module.exports = outerController;
