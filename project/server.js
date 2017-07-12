let app = require ('express')();
let bodyParser = require ('body-parser');
let customerRoutes = require('./Routes/customer');

app.use (bodyParser.urlencoded({
	extended : false
}));

app.use (bodyParser.json());
/* middleware for customer routes */
app.use('/customer', customerRoutes);

/*first API to check if server is running*/
app.get ('/', function (req, res){
	res.send("server is running")
});

app.listen (8080);

