
  let  fs = require ('fs'),
    userService = require ('../Services/customer'),
    customerModel = require ('../Model/customer');
   var crypto=require('crypto')

let model = customerModel.model;




/* signup for customers */
var signup = (data, callback)=>{

       
/*
function for encryption of password
first it creates cipher using secret key
then it encrypt the password 
*/
   function encrypt(userPassword)
{
    var cypher = crypto.createCipher('aes-256-ctr','password');
    var crypted = cypher.update(userPassword,'utf8','hex');
        crypted += cypher.final('hex');
                   return crypted;
}  
//calling function encrypt()
    var encryptedPassword = encrypt(data.password);


   

   

       
        if(data.email.includes('@gmail.com')!=true){
          console.log("invalid email");
          return;

}
        if(data.mobile.toString().length != 10){
           console.log("invalid mobile number");
           return;
}

else
{
  //variable to store user information
     var customerData ={
         firstname : data.firstname,
         lastname : data.lastname,
         email    : data.email,
         mobile : data.mobile,
         password : encryptedPassword,
         image : data.image
  
}
 
}
 
  

/* save data to database*/
var customerdata = new model ( { firstname : data.firstname, lastname : data.lastname , email : data.email , mobile : data.mobile, password : encryptedPassword , image: data.image})
    customerdata.save( (err)=>{
      if(err)
      {
        callback ( err)
        console.log(err);
        return;
      }
      else
      {
        console.log("registered successfully");
        fs.appendFile('logg.txt', 'registered successfully', function(err){
          if(err)
            throw err
          console.log("saved signup details")
        })
        callback ( customerData)

      }
    })
  
  }

module.exports ={
	signup : signup
}