const db = require('../dbconnection');
const Customer = db.Customer;
express=require('express');  
var router=express.Router();
const config = require('../config/config.json'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const verifytoken=require('../controller/Verifytoken');
const CF=require('../Controller/Commonfunction');
var tokencheck=require('../Config/tokenChecker');
router.post('/',function(req,res,next){ 	
  Customer.findOne({
    where: {
      Emailid: req.body.Emailid
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        response_code:"400",response_message:"User already exist."
      });
      return;
    }
  });
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
    const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
    const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
	  res.status(200).send({
      respnse_code:200,
      response_message:"Login success",
		id: Customer.Registrationkey,
    accessToken: token,
    refreshToken:refreshToken
	  });
});
});	
  
// router.get('/test', function (req, res) {
// CF.getAll()
// .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
//         .catch(err => next(err));
	
//    });
   router.post('/token',tokencheck, (req,res) => {
    console.log("testing");
            const user = {
                "email": req.body.email,
                "name": req.body.name
            }
            const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
            const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
            const response = {
                "status": "Logged in",
                "token": token,
                "refreshToken": refreshToken,
            }
            // update the token in the list
            res.status(200).json(response);       
        
    })
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