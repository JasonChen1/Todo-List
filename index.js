
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
var connectionString = "postgres://chendifu:sadfsdf.@depot:5432/chendifu_nodejs";
/*var connectionString = process.env.DATABASE_URL
	,client
	,query;*/
var client = new pg.Client(connectionString);
client.connect();

//query = client.query('create table todo (id serial primary key, item varchar(255))');
/*query = client.query('select * from todo');
query.on('end',function(result){client.end();});*/


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

app.put('/put/task', function(req, res){
	var item = req.body.item;
	var query = client.query("insert into todo (item,complete) values (\'"+item+"\','false')");

	var newItem = {"item": item};
	res.send(newItem);
});



app.post('/post/task', function(req, res){
	var item = req.body.item;
	var completed = req.body.complete;
	var query = client.query("update chendifu_nodejs set complete = "+completed+" where item = \'"+item+"\'");

	var newItem ={"item":item, "complete":completed};

	res.send(newItem);
});


/*

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


