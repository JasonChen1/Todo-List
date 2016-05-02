var ipAddress = "http://130.195.4.177:8080";

//getting items from databse
var ERROR_LOG = console.error.bind(console);

function get_task(){
	//console.log("Get task.")
	$.ajax({
		method:'GET',
		url: ipAddress+'/get/tasks',
	}).then(redraw,ERROR_LOG);
}
//add the item to the two lists
function redraw(data){

	for(i = 0; i<data.length; i++){
		add_To_Web(data[i].item,data[i].complete);
	}
	//console.log('redrawing',data);
}

//add new item to the web
function add_To_Web(data,list){
	if (data === '') { return false; } 
	var taskHTML = '<li><span class="done">%</span>';
	taskHTML += '<span class="delete">x</span>';
	taskHTML += '<span class="task"></span></li>';
	var $newTask = $(taskHTML);
	$newTask.find('.task').text(data);

	//close dialog box once a new task is added
	$newTask.hide();

	if(list == false){
		$('#todo-list').prepend($newTask);
	}else{
		$('#completed-list').prepend($newTask);
	}

	$newTask.show('clip',250).effect('highlight',1000);
}


$(document).ready(function(e) {

	get_task();

	$('#add-todo').button({ icons: { primary: "ui-icon-circle-plus" } }).click(
		function() {
		$('#new-todo').dialog('open');
		//reset textbox after dialog box close
		$('#task').val('');
	});

	$('#new-todo').dialog({
		modal : true, autoOpen : false,
		buttons : {
			"Add task" : function () { 				
				//check to make sure the taskName variable doesn't contain an empty string
				var taskName = $('#task').val();
				//posting new items using ajax
				$.ajax({
					method:'PUT',
					url:ipAddress+'/put/task',
					dataType:'json',
					data:{"item":taskName,"complete":false},

					success: function(){
						if (taskName === '') { return false; } 
						var taskHTML = '<li><span class="done">%</span>';
						taskHTML += '<span class="delete">x</span>';
						taskHTML += '<span class="task"></span></li>';
						var $newTask = $(taskHTML);
						$newTask.find('.task').text(taskName);
						//close dialog box once a new task is added
						$newTask.hide();
						$('#todo-list').prepend($newTask);
						$newTask.show('clip',250).effect('highlight',1000);
					},
					error: function(){
						console.log("Error: fail to add new task");
					}

				});
				
				$(this).dialog('close');
			},

			"Cancel" : function () { 
				$(this).dialog('close'); 
			}
		}
	});


	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		//items name 
		var compItem = $(this).parent('li').find('.task').text();
		//console.log(compItem);
		$.ajax({
			method:'POST',
			url:ipAddress+'/post/task',
			dataType:'json',
			data:{"item":compItem,"complete":true},

			success: function(){
				$taskItem.slideUp(250, function() {
					var $this = $(this);
					//remove the selected element from the todo-list but it still exists in the memory
					$this.detach();
					//move the detached element to the completed list
					add_To_Web(compItem,true);
					$this.slideDown();
				});
			},
			error: function(){
				console.log("Error: fail to move task");
			}
		});
		
	});

	$('.sortlist').sortable({
		connectWith : '.sortlist',//connecting the todo list with the completed list 
		cursor : 'pointer',//change mouse cursor to pointer when item being dragged
		placeholder : 'ui-state-highlight',//highlights the space in the list where a user can drop an item
		cancel : '.delete,.done',//identifies elements on a list item that won’t work as handles for dragging the item
		update: function(event, ui){
			/*alert(ui.item.attr('id'));
			var id = ui.item.attr('id');
			var prevId = ui.item.prev().attr('id');*/

			//console.log(ui.item.text());
			//console.log(ui.item.attr('task'));
			//console.log($(ui.item).prev().attr('id'));
			
			//updateDB(id,prevId);
		}
		
	});

	/*function updateDB(id){
		//console.log(id);
		$.ajax({
			method:'POST',
			url:ipAddress+'/post/task',
			dataType:'json',
			data:{"item":compItem,"complete":true},

			success: function(){
				$taskItem.slideUp(250, function() {
					var $this = $(this);
					//remove the selected element from the todo-list but it still exists in the memory
					$this.detach();
					//move the detached element to the completed list
					add_To_Web(compItem,true);
					$this.slideDown();
				});
			},
			error: function(){
				console.log("Error: fail to move task");
			}
		});
	}*/

	//Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
	$(document).ready(function() {
	    $("#new-delete").dialog({
	      modal: true, autoOpen: false
	    });
  	});

	$('.sortlist').on('click','.delete',function() {

		temp= $(this).parent('li');//store the value into a temporary variable
		var tempItem = $(this).parent('li').find('.task').text();

		//console.log($(this).parent('li').find('.task').text());

		$('#new-delete').dialog({
			buttons : {
				"Yes" : function(){	
					
					$.ajax({
						method:'DELETE',
						url:ipAddress+'/delete/task',
						dataType:'json',
						data:{"item":tempItem,"complete":false},
						//data:{"item":tempItem,"complete":true},

						success: function(){							
							temp.effect('puff', function() { $(this).remove(); });
						},
						error: function(){
							console.log("Error: fail to remove task");
						}
					});

					$(this).dialog('close');
				},
				
				"No" : function(){
					$(this).dialog('close');
				}
			}
		});

		$('#new-delete').dialog('open');	
	});

}); // end ready
