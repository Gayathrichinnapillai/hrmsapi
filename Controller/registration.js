const db = require('../dbconnection');
const Customer = db.Customer;
express=require('express');  
var router=express.Router();
const config = require('../config/config.json'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const verifytoken=require('../controller/Verifytoken');

router.post('/',function(req,res,next){ 	
	const userreg=new Customer(req.body)
    {  
        userreg.save()
        .then(data => {
            res.status(200).send({
               response_code:"200",response_message:"success."
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the product."
            });
        });
    }
});

router.post('/login', async (req, res) => {
	Customer.findOne({
		where: {
		  Emailid: req.body.Emailid
		}
	  })
		.then(Customer => {
		  if (!Customer) {
			return res.status(404).send({ response_code:"404",response_message: "User Not found." });
		  }
    var passwordIsValid =bcrypt.compareSync(
        req.body.Password,
        Customer.Password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          response_code:"401",
          message: "Invalid Password!"
        });
      }
const token = jwt.sign({ sub:Customer.Registrationkey}, config.secretKey,{expiresIn: '5m'});
	res.status(200).send({
		id: Customer.Registrationkey,
		firstname: Customer.Firstname,
		email: Customer.Emailid,
		accessToken: token
	  });
});
});	
  
router.get('/',verifytoken, function (req, res) {
	Customer.findAll().then(Customers => {
		// Send all customers to Client
		res.send(Customers);
	  });
   });

// // FETCH all Customers
// exports.findAll = (req, res) => {
// 	Customer.findAll().then(customers => {
// 	  // Send all customers to Client
// 	  res.send(customers);
// 	});
// };

// // Find a Customer by Id
// exports.findById = (req, res) => {	
// 	Customer.findById(req.params.customerId).then(customer => {
// 		res.send(customer);
// 	})
// };
 
// // Update a Customer
// exports.update = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.update( { firstname: req.body.firstname, lastname: req.body.lastname, age: req.body.age }, 
// 					 { where: {id: req.params.customerId} }
// 				   ).then(() => {
// 					 res.status(200).send("updated successfully a customer with id = " + id);
// 				   });
// };
 
// // Delete a Customer by Id
// exports.delete = (req, res) => {
// 	const id = req.params.customerId;
// 	Customer.destroy({
// 	  where: { id: id }
// 	}).then(() => {
// 	  res.status(200).send('deleted successfully a customer with id = ' + id);
// 	});
// };

module.exports=router;