const express = require('express');
const passport = require('passport');
const router = express.Router();
const {addUserService} = require('../services/auth_service.js');
const { handleErrors } = require('../utils/error_handler.js');


router.post('/register',async(req, res) => {
    try{
        const user = await addUserService(req);
        res.header('Location', `/users/${user.insertId}`);
        res.status(201).send();
    }catch(err){
        console.log(err);
        await handleErrors(res,err);
    }
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: info.message || 'Authentication failed' });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        return res.status(200).json();
      });
    })(req, res, next);
  });

  router.post('/logout', (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  });
  
  
module.exports = router;