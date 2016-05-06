Running it on the service:

http://infinite-ravine-93444.herokuapp.com/


Running it locally:

First open konsole and cd into the Todo-List directory. 
Then use the folloing command to get the ip address:

%hostname -i

Then open the todo.js in directory "public/js/todo.js" and change the "ipAddress" to following:

var ipAddress = "http://<your ip address>:8080";   
e.g. var ipAddress = "http://130.195.4.167:8080";

Then open index.js file and commend out the following line:
	"var connectionString = process.env.DATABASE_URL;"
and un comment the following line:
	"//var connectionString = "postgres://chendifu:1234.@depot:5432/chendifu_nodejs";"

Then you can execute the code. To execute the code use the following command:

%node index.js

When "Todo-List app listening on port: 8080!" show up
Then open a web browser type in "http://localhost:8080/"

=============================================
To test the REST interface

open konsole and input the following command:

Test GET:
%curl http://infinite-ravine-93444.herokuapp.com/get/tasks

Test PUT:
 %curl -i -H "Accept: application/json" -X PUT -d 'item=test&complete=false' http://infinite-ravine-93444.herokuapp.com/put/task

Test POST:
%curl -i -H "Accept: application/json" -X POST -d 'id=6&item=test&complete=true' http://infinite-ravine-93444.herokuapp.com/post/task

Test DELETE:
%curl -i -H "Accept: application/json" -X delete -d 'id=6' http://infinite-ravine-93444.herokuapp.com/delete/task

test result is showing in the "test result.pdf".

=============================================


=============================================
Files: 
index.js  						-contains all the REST interface
	app.get('/') 				-gets the index.html and display it 
	app.get('/get/tasks') 		-gets all the items from the database 
	app.put('/put/task')		-insert new item to the database
	app.post('/post/task')		-update item from the database (moving item from todo-list to complete-list									 vice versa).
	app.delete('/delete/task')	-delete item from database

public/js/todo.js				-contains all the ajax call
views/index.html				-webpage

==============================================

Error handling:

Service Side:

GET: 		if fail to get the data from database there will be Error message 												showing in the console of the webpage.

PUT: 		if fail to add item, ajax call failed it will output an error message 											"Error: fail to add new task: item".

POST: 		if fail to move item, ajax call failed it will ouput an error message											"Error: fail to move task: item"

DELETE: 	if fail to delete item, ajax call failed it will ouput an error message	
				"Error: fail to delete task: item"


Client side:

GET: 		if fail to get the data from database it will output an Error message 												"res.status(500).send('Error, fail to get item: '+nItem);".

PUT: 		if fail to add item, ajax call failed it will output an error message 											"res.status(500).send('Error, fail to put item: '+nItem);".

POST: 		if fail to move item, ajax call failed it will ouput an error message											"res.status(500).send('Error, fail to update item: '+nItem+'complete: '+completed);".

DELETE: 	if fail to delete item, ajax call failed it will ouput an error message	
			"res.status(500).send('Error, fail to delete id:'+itemID +'item: '+nItem+'complete: '+completed);".