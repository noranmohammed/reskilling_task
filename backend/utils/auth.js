const {sign, verify } =require('jsonwebtoken');
const {compare}=require('bcryptjs')
require('dotenv').config()
const {NotAuthError}=require('./errors')

const key=process.env.key

const generateToken=(user)=>{
    const token=sign({
        id:user.id,
        email:user.email,
        role:user.role
    },key,{expiresIn:'24h'})
    return token
}
const verifyToken=(token)=>{
        const decoded=verify(token,key)
        return decoded
}
const comparePassword=async (password,hash)=>{
        const isMatch=await compare(password,hash)
        return isMatch
    
}
function checkAuthMiddleware(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
    if (!req.headers.authorization) {
      console.log('NOT AUTH. AUTH HEADER MISSING.');
      return next(new NotAuthError('Not authenticated.'));
    }
    const authFragments = req.headers.authorization.split(' ');
  
    if (authFragments.length !== 2) {
      console.log('NOT AUTH. AUTH HEADER INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    const authToken = authFragments[1];
    try {
      const validatedToken = verifyToken(authToken);
      req.token = validatedToken;
    } catch (error) {
      console.log('NOT AUTH. TOKEN INVALID.');
      return next(new NotAuthError('Not authenticated.'));
    }
    next();
  }
exports.generateToken=generateToken;
exports.comparePassword=comparePassword;
exports.checkAuth=checkAuthMiddleware;
exports.verifyToken=verifyToken;
