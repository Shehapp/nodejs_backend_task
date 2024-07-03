const passport = require('passport');
const {addUserService} = require('../services/auth_service.js');
const { handleErrors } = require('../utils/error_handler.js');


const register = async (req, res) => {
    try{
        const user = await addUserService(req);
        res.header('Location', `/users/${user.insertId}`);
        res.status(201).send();
    }catch(err){
        await handleErrors(res,err);
    }
}

const login = async (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
          res.status(401).send({ message: 'Authentication failed' });
          return next(err);
        }
        if (!user) {
          return res.status(401).send({ message: info.message || 'Authentication failed' });
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          return res.status(200).send();
        });
      })(req, res, next);
  }

const logout = async (req, res, next) => {
    req.logout((err) => {
        if (err) {
          res.status(500).send({ message: 'Logout failed' });
          return next(err);
        }
        res.status(200).send({ message: 'Logout successful' });
      });
  }


  module.exports = {
    login,
    register,
    logout
  }