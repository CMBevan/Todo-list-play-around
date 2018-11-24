/*
used to add a task to the server
*/
function addTask(sendData){
	$.post("http:localhost:8080/newTask",
	sendData,
    function(data, status){

    });
}

/*
used to mark a task as completed
*/
function completeTask(taskName){
$.post("http:localhost:8080/complete",
	taskName,
    function(data, status){

    });
}

/*
used to delete a task from the server
*/
function deleteTask(del){
	$.delete("http:localhost:8080/deleteTask",
		del,
		function(data, status){
		});
}

/*
used to process the return for the get all tasks
*/
function process_response(data,status){

	var tasks = JSON.parse(data);
	for(var i = 0;i<tasks.length;i++){
		if(tasks[i]!= undefined){		
		

		var taskName = tasks[i].todo;

		//add to the todo-list
		if(tasks[i].state =="current"){
			var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);
				$newTask.find('.task').text(taskName);

				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
		}
		//add to the completed-list
		else{
			var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);
				$newTask.find('.task').text(taskName);

				$newTask.hide();
				$('#completed-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
}
	}
}
}
