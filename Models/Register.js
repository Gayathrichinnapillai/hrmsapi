const bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
    const Customer = sequelize.define('hr_registration', {
        Registrationkey: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        Firstname: {
            type: DataTypes.STRING,
            field: 'Firstname'
        },
        Lastname: {
            type: DataTypes.STRING,
            field: 'Lastname'
        },
        Emailid: DataTypes.STRING,
        Phonenumber:DataTypes.INTEGER,
        Createdby:DataTypes.INTEGER,
        Password: DataTypes.STRING
    }, {
        
			hooks : {
				beforeCreate : (Customer , options) => {
					{
						Customer.Password = Customer.Password && Customer.Password != "" ? bcrypt.hashSync(Customer.Password, 10) : "";
					}
				}
			}
    });

    return Customer;
}