const express = require('express');
const authControllers = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

router.get('/',authControllers.getLogin);

router.post('/login',authControllers.postLogin);

router.post('/logout',authControllers.postLogout);
router.get('/signup',authControllers.getSignup);


router.post('/signup',authControllers.postSignup);



// router.get('/reset',authControllers.getReset);
// router.post('/reset',authControllers.postReset);
// router.get('/reset/:token',authControllers.getNewPassword);
// router.post('/new-password',authControllers.postNewPassword);





module.exports = router;