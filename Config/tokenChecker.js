var express = require('express');
 var router = express.Router();
 var jwt = require('jsonwebtoken');

 const config = require('../config/config.json'); 
 
 router.use(function (req, res, next) {
 var refreshToken =req.body.refreshToken;
 console.log(refreshToken);
 if (refreshToken) {
 jwt.verify(refreshToken,config.refreshTokenSecret,
//  {
//  algorithm: global.config.algorithm
//  }, 

function (err, decoded) {

 if (err) {
 let errordata = {
 message: err.message,
 expiredAt: err.expiredAt
 };
 console.log(errordata);
 return res.status(401).json({
 message: 'Token expired'
 });
 }
 req.decoded = decoded;
 console.log(decoded);
 next();
 });
 } else {
 return res.status(403).json({
 message: 'Forbidden Access'
 });
 }
 });
 
 module.exports = router;