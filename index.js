var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // to support JSON­ encoded bodies
app.use(bodyParser.urlencoded({ // to support URL­ encoded bodies
extended: true
}));
var eng = require('consolidate');
//setting path for static files
app.use(express.static(__dirname ));


var pg = require('pg').native;
var connectionString = "postgres://chendifu:1234.@depot:5432/chendifu_nodejs";
/*var connectionString = process.env.DATABASE_URL
	,client
	,query;*/
var client = new pg.Client(connectionString);
client.connect();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


//setting path for view files and engine to for viewing e.g. html 
app.set('views', __dirname +'/views');
app.engine('html', eng.swig);
app.set('view engine','html');

//Accessible at localhost:8080/
app.get('/', function (req, res) {
	res.render('index.html');
});

//Accessible at localhost:8080/get/tasks/
app.get('/get/tasks', function (req, res) {
	//SQL Query select Data
	var query = client.query("select * from todo");
	var results=[];
	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
	});

	//After all data is returned, close connection and return results
	query.on('end',function(){
		res.json(results);
	});
});

//accessibble at ipaddress:8080/put/tasks
app.put('/put/task', function(req, res){
	var itemID = req.body.id;
	var nItem = req.body.item;
	
	//query for inserting items
	var query = client.query("insert into todo (item,complete) values (\'"+nItem+"\','false') RETURNING id,item,complete");
	var results =[];
	//creating a new item to insert

	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
		//console.log(results);
	});

	//after all the data is returned close connection and return result
	query.on('end',function(){
		res.json(results);
	});
});


//accessible at ipAddress:8080/post/task
app.post('/post/task', function(req, res){
	//getting data from page
	var itemId = req.body.id;
	var nItem = req.body.item;
	var completed = req.body.complete;

	var query = client.query("update todo set complete = "+completed+" where id = \'"+itemId+"\'RETURNING id,item,complete");
	var results =[];

	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
		//console.log(results);
	});

	//after all the data is returned close connection and return result
	query.on('end',function(){
		res.json(results);
	});
});



app.delete('/delete/task', function(req, res){
	var delItem = req.body.item;
	var completed =req.body.complete;
	var itemID = req.body.id;

	var query = client.query("delete from todo where id = "+itemID+"RETURNING id,item,complete");
	//var query = client.query("delete from todo where item = \'"+delItem+"\' and complete = \'"+completed+"\'");
	var results =[];
	//var deleteItem = {"item":delItem, "complete": completed};
	//var deleteItem = {"id":item};

	//After all data is returned, close connection and return results
	/*query.on('end',function(){	
		res.send(deleteItem);
	});*/

	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
		//console.log(results);
	});

	//after all the data is returned close connection and return result
	query.on('end',function(){
		res.json(results);
	});
});



app.listen(port, function () {
	console.log("Todo-List app listening on port: "+port+"!");
});


