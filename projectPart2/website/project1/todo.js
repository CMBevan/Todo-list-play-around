

$(document).ready(function(e) {
	var removeItem; //used to store the deleted item to be shared between functions
	$.get('http://localhost:8080/getTasks',process_response);
$('#add-todo').button({
	icons: { primary: "ui-icon-circle-plus" }}).click(
		function() {
			$('#new-todo').dialog('open');
	});//end #add-todo'
	
	
$('#new-todo').dialog({
	modal : true, autoOpen : false,
	buttons : {
			"Add task" : function() {
				var taskName= $('#task').val();
				if(taskName ===""){
					return false;
					} 
				var taskHTML = '<li><span class="done">%</span>';
				taskHTML += '<span class="delete">x</span>';
				taskHTML += '<span class="task"></span></li>';
				var $newTask = $(taskHTML);
				$newTask.find('.task').text(taskName);
				//send to server
				var sendTask = {todo: taskName, state: "current"};
				addTask(sendTask); 
				//send to server				
				$newTask.hide();
				$('#todo-list').prepend($newTask);
				$newTask.show('clip',250).effect('highlight',1000);
				$('#task').val("");//clear the text field
				$(this).dialog('close');
			},
			"cancel" : function (){
				$('#task').val(""); //clear the text field
				$(this).dialog('close');	
			}
	}
	
	});// end #new-todo
	
$('#todo-list').on('click', '.done', function(){
	//send to server	
	var f = $(this).next().next().text();
	var sendTask = {todo: f, state: "completed"};
	completeTask(sendTask);
	//send to server
	
	var $taskItem = $(this).parent('li');
	$taskItem.slideUp(250, function(){
	var $this = $(this);
	$this.detach(); 
	$('#completed-list').prepend($this);
	$this.slideDown();
	
	});
});	

$('.sortlist').sortable({
	connectWith : '.sortlist',
	cursor : 'pointer',
	placeholder : 'ui-state-highlight',
	cancel  : '.delete,.done'
});

/*on click for delete */
$('.sortlist').on('click','.delete',function(){ 
	
	removeItem = $(this); //stores the item to remove
	$('#remove-todo').dialog('open'); //opens the remove confirmation modal


});

/*the remove confirmation modal */
$('#remove-todo').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Delete Task" : function(){
			//send to server
			var f = removeItem.next().text();
			var delTask = {todo: f};
			deleteTask(delTask);
			//send to server

			removeItem.parent('li').effect('puff',function(){removeItem.remove();}); //removes the item selected from the delete on()
			$(this).dialog('close');
			},
			"Cancel" : function (){
				deleteBool = 2;
				$(this).dialog('close');
				}
		}
	});
	
	
}); // end ready
