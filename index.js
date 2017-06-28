var express = require ( 'express');
var app = express ();
var nodemailer = require ('nodemailer')
var bodyParser = require ('body-parser')
var multer = require ('multer');
var mongoose = require ('mongoose');
app.use ( bodyParser.json());
app.use ( bodyParser.urlencoded ( {extended:false}));
//app.use ('/',express.static(__dirname+ '/images'))
var schema = mongoose.Schema;
var schem = new schema(
  {
	     username : {type: String, required: true},
	     mobile   : {type: Number,  required: true},
	     email    : {type: String, required: true},
	     password : {type: String, required: true},
	     image    : {data: Buffer, type:String}
	   
  },{collection:'User'});

var storage=multer.diskStorage({destination : function(req,file,cb){
	cb(null,'./uploads/')},
filename : function(req,file,cb){
	cb(null,file.originalname)}
});

var upload = multer(
                        {
                        storage: storage
                               });

var model = mongoose.model ( 'User',schem)
            mongoose.connect ( "mongodb://localhost/test11", function ( err){
            if ( err) 
            {
              console.log ( "error")
            }
              else
            {
	          console.log ( "connected")
            }
})
var transporter = nodemailer.createTransport (
{
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:
        {
	    user:'arijitbardhan1991@gmail.com',
	    pass:'penelopecruz04'
        }

});
app.get('/signup', function (req, res, next)
{

   res.sendFile  (__dirname + '/registration.html');
   app.post('/signup', upload.any(), function(req, res, next){
   Username = req.body.username;
   Mobile   = req.body.mobile;
   Email    = req.body.email;
   Password = req.body.password;
   Image    = req.body.image;
   var otp  = (Math.random()*10000).toString().split(".")[0];
   console.log(Image)
var data = new model ({username : Username, mobile : Mobile, email : Email, password : Password, image :Image});
    data.save ( function(err)
    {
 	       if (err)
 	{
 	       res.send(err)
 	}
 	       else
 	{
          res.send("registered successfuly");
    }
    })
var  mailOption = {
	from : '"Hii"<arijitbardhan1991@gmail.com>',
	to:Email,
	subject : 'OTP',
	text : otp
	
};
transporter.sendMail ( mailOption, function ( error,info){
	 if ( error){
     return console.log(error);
}
	 console.log ( "sent"+info.response)
});


})


})
app.get('/login',function(req,res){
	res.sendFile(__dirname+ '/login.html')
})
app.post('/login',function(req,res){
	var email = req.body.email;
	var password = req.body.password;
    var otp = req.body.otp;
 model.findOne({"email":email,"password":password,"otp":otp},function(err,data){
			 if(err)
				res.send(err);
			 if(data==null) {
               model.findOne({"email":email},function(err,data){ 
                    if(data==null)
				res.send("user does not exist");
			        else
			    res.send("password does not match");    	
          }); 
         }      
               else
			  res.send(data);
		  })       
           });











app.listen(8080)
           

