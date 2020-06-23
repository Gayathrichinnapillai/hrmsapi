const db = require('../dbconnection');
const Customer = db.Customer;
express=require('express');  

module.exports={
    getAll
};
 function getAll() {
     console.log("test123");
    return  Customer.findAll();
}