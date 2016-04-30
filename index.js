var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON­encoded bodies
app.use(bodyParser.urlencoded({ // to support URL­encoded bodies
extended: true
}));
var eng = require('consolidate');
 
/*
var pg = require('pg').native;
//var connectionString = "postgres://chendifu:asfads.@depot:5432/chendifu_nodejs";
var connectionString = process.env.DATABASE_URL
	,client
	,query;
var client = new pg.Client(connectionString);
client.connect();

query = client.query('create table todo (id serial primary key, item varchar(255))');
query.on('end',function(result){client.end();});
*/

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

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname +'/views');
app.engine('html', eng.swig);
app.set('view engine','html');

//Accessible at localhost:8080/
app.get('/', function (req, res) {
	//res.send('Hello World!');
	res.render('index');
});

//Accessible at localhost:8080/get/tasks/
app.get('/get/tasks/', function (req, res) {
	res.send('This is a task.');
	// Extend this later to return tasks from the database.
});

/*

//console.log("Registering endpoint: /");
//Accessible at localhost:8080/
app.get('/', function (req, res) {
	res.send('Hello World!');
	query = client.query('select * from todo');

	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
	});

	//After all data is returned, close connection and return results
	query.on('end',function(){
		response.json(results);
	});
});

//Accessible at localhost:8080/get/tasks/
app.get('/get/tasks/', function (req, res) {
	res.send('This is a task.');
	// Extend this later to return tasks from the database.
});

app.get('/database',function(req,res){
	//SQL Query select Data
	var query = client.query("select * from todo");
	var results=[]
	//stream results back one row at a time
	query.on('row',function(row){
		results.push(row);
	});

	//After all data is returned, close connection and return results
	query.on('end',function(){
		response.json(results);
	});
});


// Define an error log that will print error messages to the console.
var ERROR_LOG = console.error.bind(console);
// A GET request. If successful, this passesdata to the ‘redraw()’ function
function get_task(){
	console.log("Get task.")
	$ajax({
		url: "http://localhost:8080/get/tasks/"
	}).then(redraw, ERROR_LOG);

	// Redraw the two lists
	function redraw(data) {
		console.log('redrawing', data);
	}
}

app.post('/', function(req, res){
	res.send('post request');
});

function complete_task(task){
	$ajax({
		method:'POST',
		url: 'http://localhost:8080/complete/task',
		data: JSON.stringify({
			task: task.find('.task').html()
		}),
		contentType:"application/json",
		dataType:"json"
	}).then(
		function success_func(data){
			//Function that handles successes
			console.log('posted data.',data);
		},
		ERROR_LOG
	);
}


app.delete('/', function(req, res){
	res.send('delete request');
});


app.put('/', function(req, res){
	res.send('put request');
});
*/


app.listen(port, function () {
	console.log('Todo-List app listening on port 8080!');
});


