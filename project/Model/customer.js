let mongoose= require ('mongoose');
let schema = mongoose.Schema;

/* creating Schema  */
let schem = new schema({
	firstname : {type : String , required : true},
	lastname : {type : String , required : true},

	email: { type: String, required : true, unique : true},
      mobile: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    password : {type : String , match : /^[a-z0-9]+$/i },
 image    : {type : String}
	

	
});
/*
database connectivity 
database name- customer
*/
mongoose.connect ( "mongodb://localhost:27017/customer", function ( err){
            if (err) 
            {
              console.log ( err)
            }
              else
            {
	          console.log ( "connected")
            }
})
/*
modelling mongoose with collection customerInfo 
*/
let model = mongoose.model ( 'customerInfo', schem);
//exporting model
module.exports={
	model : model
}