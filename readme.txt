To run it locally 

First open konsole and cd into the Todo-List directory. 
Then use the folloing command to get the ip address:

%hostname -i

Then open the todo.js in directory "public/js/todo.js" and change the "ipAddress" to following:

var ipAddress = "http://<your ip address>:8080";   
e.g. var ipAddress = "http://130.195.4.167:8080";


Then you can execute the code. To execute the code use the following command:

%node index.js

When "Todo-List app listening on port: 8080!" show up
Then open a web browser type in "http://localhost:8080/"


If you want to test the REST interface you can use the test command from the "tests.txt" file
(The test result is in the "test result.pdf" file).

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

GET: 		if fail to get the data from database there will be Error message 												showing in the console of the webpage.

PUT: 		if fail to add item, ajax call failed it will output an error message 											"Error: fail to add new task: item".

POST: 		if fail to move item, ajax call failed it will ouput an error message											"Error: fail to move task: item"

DELETE: 	if fail to delete item, ajax call failed it will ouput an error message											"Error: fail to delete task: item"