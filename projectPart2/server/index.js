var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var pg = require("pg");
var http = require("http");
const db = require('pg');

/** 
var config = {
	user: 'admin',
	database: 'book_db',
	password: 'secret',
	host: 'localhost',
	port: 5432,
	max: 10,
	idleTimeoutMillis: 30000,
};

const pool = new pg.Pool(config);

pool.on('error', function(err, client){
	console.error('idle client error', err.message, err.stack);
});

module.exports.query = function (text, values, callback){
	console.log('query:', text, values);	
};

module.exports.connect = function (callback){
	return pool.connect(callback);
}
//'postgres://admin:secret@localhost:5432/accounts_db'
*/
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()); // for parsing application/json

// Add headers
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*')
	// // Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow ,
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	// Pass to next layer of middleware
	next();
});

var tasks = []; //used to store the currently saved tasks, both todo and completed


/*
used to get all the current tasks

app.get('/', function (req,res){
res.send(..2/website/project1/index.html);
});
*/
app.get('/getTasks', function(req, res){
	console.log("sent all tasks");
	res.send(JSON.stringify(tasks)); 
});

/*
used to add a new task to the server
*/
app.post('/newTask',function(req, res){
	console.log("test")
	console.log("adding new task: '"+req.body.todo+"'");
	tasks.push(req.body);//add to our array of tasks
	res.send("sucessfully added: '"+req.body.todo +"' to the server");

});

/*
used to delete a current task
*/
app.delete('/deleteTask',function(req, res){
	console.log("deleting: '"+req.body.todo+"'");
	for(var i = 0; i<tasks.length;i++){
			if(tasks[i] != undefined){
				if(tasks[i].todo == req.body.todo){
					delete tasks[i];
					res.send("sucessfully deleted: '"+req.body.todo +"'");
					break;//so only one of this type is deleted
				}
					}//end if
		}//end loop

});
/*
used to mark a current task as completed
*/
app.post('/complete', function(req, res){
	console.log("marking: '"+req.body.todo+"' as complete'");
	tasks.push(req.body);
	for(var i = 0; i<tasks.length;i++){
		if(tasks[i] != undefined){
			if(tasks[i].todo == req.body.todo && 
			tasks[i].state == "current"){
				delete tasks[i];
					res.send("sucessfully completed: '"+req.body.todo +"'");
				break;//so only one of this type is deleted
			}
				}//end iff
	}//end loop

});




app.listen(port, function () {
console.log('Example app listening on port 8080!');
});
