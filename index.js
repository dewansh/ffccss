var Sequelize = require('sequelize');
var validator = require('validator');
var sequelize = new Sequelize('test','root','noobiedoobie',{
	dialect: 'mysql'
});
var User = sequelize.define ('User',
    {
        aadhar: {
            type: Sequelize.STRING,
            unique: true,
            isAlphanumeric: true,
            validate: {
                len: {
                    args: [8,8],
                    msg: "adhar must be 8 digit number"
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
            	is: {args:["^[a-z]+$",'i'],
            	msg:"only alphabets allowed"},
                len: {
                    args: [3,15],
                    msg: "Name must be atleast 3 characters in length"
                }
            }
        },
        email: {
            type: Sequelize.STRING,
            primaryKey: true,
            validate: {
                len: {
                    args: [6, 128],
                    msg: "Email address must be between 6 and 128 characters in length"
                },
                isEmail: {
                    msg: "Email address must be valid"
                }
            }
        },
        Role: {
            type: Sequelize.STRING,
            allowNull: false,
            isIn: [['RegularUser', 'Merchent','RegularEmploye','SysAdmin','SysManager']]
            
        }
    },{freezeTableName: true});
///////////////

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    name: 'John',
    aadhar: 11111111,
    email:'aa@gmail.com',
    Role:'asd'
  });
});

//////////////////////////////
var BankAccount = sequelize.define ('BankAccount',
    {
    	email:{
    		references: {
     		// This is a reference to another model
    		 model: User,

		     // This is the column name of the referenced model
		     key: 'email' 
   			}
    	}
        AccountNumber: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            validate: {
                len: {
                    args: [8,8],
                    msg: "account number must be 8 digit"
                }
            }
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
            	is: {args:["^[a-z]+$",'i'],
            	msg:"only alphabets allowed"},
                len: {
                    args: [3,15],
                    msg: "Name must be atleast 3 characters in length"
                }
            }
        },
        address: {
            type: Sequelize.STRING,
            validate: {
                len: {
                    args: [6, 128],
                    msg: "address must be between 6 and 128 characters in length"
                },
                isAlphanumeric: true
            }
        },
        contact: {
            type: Sequelize.STRING,
            allowNull: false,

            validate: {
            	isNumeric: true,
                len: {
                    args: [10,10],
                    msg: "Contact must contain 10 digit"
                }
            }
            
        },
        balance: {
            type: Sequelize.BIGINT,
            allowNull: false,
            defaultValue: 0,
            validate: {
            	is:["^[1-9][0-9]*$"]
             	msg:'amount cant be negative'
              }

    }});
BankAccount.sync({force: true}).then(() => {
  // Table created
  return BankAccount.create({
    AccountNumber: 19823123,
    name: 'qweasd',
    email:'aa@gmail.com',
    balance:2311,
    contact:'9716172909'
  });
});


/////////////////////////
var Transactions = sequelize.define ('Transactions',
    {
        TransactionId: {
            type: Sequelize.BIGINT,
            unique: true,
            allowNull:false,
            primaryKey:true
            
        },
        SenderId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
     		// This is a reference to another model
    		 model: BankAccount,

		     // This is the column name of the referenced model
		     key: 'AccountNumber' 
   			}
            
        },RecvId: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
     		// This is a reference to another model
    		 model: BankAccount,

		     // This is the column name of the referenced model
		     key: 'AccountNumber' 
   			}
     
        }
        ,
        Amt: {
            type: Sequelize.BIGINT,
            validate: {
             	is:["^[1-9][0-9]*$"]
             	msg:'amount cant be negative'
            }
        },
        TransactionType: {
            type: Sequelize.STRING,
            validate: {
              isIn: [['debit', 'credit']]
            }

        },
        Remarks: {
            type: Sequelize.STRING,
            validate:{
            	isAlphanumeric:true
            }
            
        }
    },{freezeTableName: true});
///////////////

// force: true will drop the table if it already exists
Transactions.sync({force: true}).then(() => {
  // Table created
  return Transactions.create({
    TransactionId: 1,
    SenderId: 'asd@gmail.com',
    RecvId:'aa@gmail.com',
    Amt:123,
    TransactionType:'debit',
    remarks:''
  });
});
///////////////////////
var Request = sequelize.define ('Request',
    {
        User: {
            type: Sequelize.STRING,
            references: {
     		// This is a reference to another model
    		 model: User,

		     // This is the column name of the referenced model
		     key: 'email' 
   			}
            
            }
        },
        Employee: {
            type: Sequelize.STRING,
            allowNull: false,
            references: {
     		// This is a reference to another model
    		 model: User,

		     // This is the column name of the referenced model
		     key: 'email' 
   			}
            
        },
        Authorised: {
            type: Sequelize.BOOLEAN,
            defaultValue:false,
        },
        Remark: {
            type: Sequelize.STRING,
            allowNull: false,
            
        }
    },{freezeTableName: true});