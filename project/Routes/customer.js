let express = require ('express'),
    router  = express.Router(),
    app = express(),
    multer = require ('multer'),
    bodyParser =require ('body-parser'),
    customerService = require('../Services/customer');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
	extended: false
   }))

  
var store=multer.diskStorage({
	destination: function(req,file,cb){
		cb(null, __dirname+'/../upload')
	},
	filename: function(req,file,cb){
		cb(null, file.originalname)
	}
});

 var upload=multer({storage: store});


    /* User SignUp */
    router.post('/signup',upload.any(),function(req,res){
	var image = req.files;
	var pic = image[0].originalname;
	req.body.image=pic;
	customerService.signup(req.body,(data)=>{
		res.send(data);
	})
})


module.exports = router; 