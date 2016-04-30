
$(document).ready(function(e) {

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
				$(this).dialog('close');

				
			},

			"Cancel" : function () { 
				$(this).dialog('close'); 
			}
		}
	});

	$('#todo-list').on('click', '.done', function() {
		var $taskItem = $(this).parent('li');
		$taskItem.slideUp(250, function() {
		var $this = $(this);
		//remove the selected element from the todo-list but it still exists in the memory
		$this.detach();
		//move the detached element to the completed list
		$('#completed-list').prepend($this);
		$this.slideDown();
		});
	});

	$('.sortlist').sortable({
		connectWith : '.sortlist',//connecting the todo list with the completed list 
		cursor : 'pointer',//change mouse cursor to pointer when item being dragged
		placeholder : 'ui-state-highlight',//highlights the space in the list where a user can drop an item
		cancel : '.delete,.done'//identifies elements on a list item that won’t work as handles for dragging the item
	});

	//Code included inside $( document ).ready() will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute
	$(document).ready(function() {
	    $("#new-delete").dialog({
	      modal: true, autoOpen: false
	    });
  	});

	$('.sortlist').on('click','.delete',function() {

		temp= $(this).parent('li');//store the value into a temporary variable
		
		$('#new-delete').dialog({
			buttons : {
				"Yes" : function(){		
					temp.effect('puff', function() { $(this).remove(); });
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