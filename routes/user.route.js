
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller.js');
const authenticate=require('../middlewares/authentication')
router.post('/signup', userController.signup);
 
router.post('/login', userController.login);

router.get('/user/:userId' ,userController.getUser);
 
router.get('/users',  userController.getUsers);
 
router.put('/user/',authenticate,  userController.updateUser);
 
router.delete('/user/:id',authenticate, userController.deleteUser);
 
module.exports = router;