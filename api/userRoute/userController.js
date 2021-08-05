const {
  welcomeUserModel
} = require('./userModel');

class userController {
  welcomeUser(req, res) {
    welcomeUserModel((data, error) => {
      let response = { status: 0, data: null, error: null };

      if (data === false) {
        response.status = 0;
        response.error = error;
      } else {
        response.status = 1;
        response.data = data;
      };

      res.send(response);
    });
  };
};

module.exports = userController;
