$(document).ready(function(){
	checkLogstate(); //checks if the user is still logged in or not, and decides whether to show guest page or member's page 
	$('.registration').hide();
	$('.center').hide();

	//sendCommand("getFromSQL");
	getFromSQL();
	
	$('#registerButton').click(function(){
		$('.registration').toggle();
	});
	
	$('#registerRegButton').click(function(){
		console.log("Register button pressed.");
		//insertToSQL("Kim", "1111");
		if(getUsernameReg() == "" || getPasswordReg() == ""){
			$('#errorMessageRegDiv').replaceWith('<div id="errorMessageRegDiv"><b>Please fill in the required text fields!</b></div>');
		}else{
			insertToSQL(getUsernameReg(), getPasswordReg());
			$('#usernameReg').val("");
			$('#passwordReg').val("");
			$('#errorMessageRegDiv').replaceWith('<div id="errorMessageRegDiv"><b>Registration Successful!</b></div>');
		}
	});
	
	$('#submitButton').mousedown(function(){
		//console.log("Submit button pressed, logging in.");
		if(getUsername() == "" || getPassword() == ""){
			console.log("Please fill in the fields!");
		}else{
			loginCheck(getUsername(), getPassword());
		}
	}).mouseup(function(){ 
		/* 
		this is separated into a mousedown and up chain because of the way $.POST works, by the time loggedIn gets here, it's still false 
		so by doing this, mouseDown is to change the value of loggedIn variable, the check is done when the mouse clicks up when loggedIn has its proper value
		*/
		$('#usernameText').val("");
		$('#passwordText').val("");
		if(loggedIn == true){
			checkLogstate();
		}else{
			//console.log("Wrong pass!");
		}
	});

	$('#logoutButton').click(function(){
		logoutSession();
		$('.center').hide();
	});
	
	$('#deleteUserButton').click(function(){
		//var nameToDelete = $('#').val();
		var usersToDelete = getSelectMultipleUsers();
		
		for(i = 0; i < usersToDelete.length; i++){
			console.log(i + " " + usersToDelete[i]);
			deleteFromSQL(usersToDelete[i]);
		}
		
	});

	$('#newButton').on("click", function(){
		console.log("New button works");
	});
	
	$('#checkButton').click(function(){
		//$('.userListDiv').append("<p>Hello</p>");
		console.log(getSelectMultipleUsers());
	});

	$('#spawnButton').click(function(){
		insertToSQL('user1', 'pass1');
		insertToSQL('user2', 'pass2');
		insertToSQL('user3', 'pass3');
		insertToSQL('user4', 'pass4');
		insertToSQL('user5', 'pass5');
	});

});

/* 
	progress made, but at the same time a lot of bugs
	
		-LAST UPDATED JULY 20, 2013, FINISHED DELETEFROMSQL TO BAN PEOPLE FROM DATABASE
*/