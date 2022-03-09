const db=require('../db/models/index')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = async (req, res, next) => {
 try {
     console.log("###",req.body)
  const {name, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.User.create({name,email,password:hashedPassword},{returning:true})
  const accessToken = jwt.sign({ id: newUser.id,name, email,role:newUser.role }, 'secret', {
   expiresIn: "1d"
  });
  newUser.accessToken = accessToken;
  res.json({
   data: newUser,
   accessToken
  })
 } catch (error) {
  next(error)
 }
}

exports.login = async (req, res, next) => {
 try {
  const { email, password } = req.body;
  const user = await db.User.findOne({ where:{email} });
  if (!user) return next(new Error('Email does not exist'));
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) return next(new Error('Password is not correct'))
  const accessToken = jwt.sign({ id: user.id,email,role:user.role }, 'secret', {
   expiresIn: "1d"
  });
  res.status(200).json({
   data: { email: user.email, role: user.role },
   accessToken
  })
 } catch (error) {
  next(error);
 }
}

exports.getUsers = async (req, res, next) => {
    console.log("####")
 const users = await db.User.findAll({})
 res.status(200).json({
  data: users
 });
}
 
exports.getUser = async (req, res, next) => {
 try {
     console.log(req.user)
  const userId = req.params.userId;
  const user = await db.User.findOne({where:{id:userId},});
  if (!user) throw 'User does not exist';
   res.status(200).json({
   data: user
  });
 } catch (error) {
  next(error)
 }
}
 
exports.updateUser = async (req, res, next) => {
 try {
  const update = req.body
  const userId = req.user.id;
  console.log("##",update)
  const user =await db.User.update(update,{where:{id:userId},returning:true});
  res.status(200).json({
   data: user,
   message: 'User has been updated'
  });
 } catch (error) {
  next(error)
 }
}
 
exports.deleteUser = async (req, res, next) => {
 try {
  const userId = req.params.id;
  await db.User.destroy({where:{id:userId}});
  res.status(200).json({
   data: null,
   message: 'User has been deleted'
  });
 } catch (error) {
  next(error)
 }
}


