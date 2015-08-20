/* javascript code goes here */
/* 
function phpConnect(commandToSend){
	var phpServer = "http://localhost:8888/phpThreeLogin/index.php";
	
	$.post(phpServer, {command: commandToSend}, function(data){
		console.log("phpConnect was " + commandToSend + " and phpdata returned is " + data);
	});
};*/
function getFromSQL(){
	/* function to get data from the database */
	var userList = new Array();
	
	$.post(phpLink, {command: "getFromSQL"}, function(data){
		userList = data.split("\n");
		userList.splice(userList.length-1, 1); /* this is just to remove the blank element at the end because of the \n character sent back by the php */
		console.log(userList);
		
		for(i = 0; i < userList.length; i++){
			/* puts the usernames retrieved into a multiple-selection box */
			$('#usersMultiple').append("<option value='" + userList[i] + "'>" + userList[i] + "</option>");
		}
	});
};

function insertToSQL(stringOne, stringTwo){
	/* function to query the php for when a new guest tries to register */
	$.post(phpLink, {command: "insertToSQL", username: stringOne, password: stringTwo}, function(data){
		console.log(data);
		location.reload(); /* same reason here as in deleteFromSQL */
	});
}

function updateSQL(stringOne, stringTwo){
	/* function to update the data in SQL, not yet completed */
	$.post(phpLink, {command: "updateSQL", username: stringOne, password: stringTwo}, function(data){
		console.log(data);
	});
}

function deleteFromSQL(stringOne){
	$.post(phpLink, {command: "deleteFromSQL", username: stringOne}, function(data){
		//console.log(data);
		location.reload(); 
		/* 
			-after deleting the people from the database, reload the page. 
			-I'm doing it here cause i'm lazy and can't find a way to just reload specific elements. Until i do, this will have to do 
		*/
	});
}

function loginCheck(name, pass){
	/* function to attempt to log the user in by comparing data with the database, adjusts the proper variables by calling setLog() */
	$.post(phpLink, {command: "loginCheck", username: name, password: pass}, function(result){
		setLog(result);
		console.log("loggedIn is " + loggedIn + " and result is " + result);
	});	
}

function logoutSession(){
	/* function to log the user out, adjusting the necessary variables */
	if(loggedIn == true){
		$.post(loginSuccessLink, {command: "logoutSession"}, function(result){
			//console.log("from logoutSession " + result);
			loggedIn = false;
		});
	}else{
		console.log("Not logged in.");
	}
}

function checkLogstate(){
	/* function to check the login state of the machine. If a session is currently on, adjust the page accordingly */
	$.post(loginSuccessLink, {command: "checkLogstate"}, function(result){
		if(result == 1){
			loggedIn = true;
			console.log("loggedIn in check is " + loggedIn);
			if(document.getElementById('emptySpace').innerHTML.indexOf("newButton") == -1){
				//if newButton doesn't exist yet, make it
				$('#emptySpace').prepend('<input id="newButton" type="button" value="New">');
			}
			$('.center').show();
		}else{
			console.log("Not logged in");
		}
	});
}

/* Javascript function goes here, along with any other helper functions that's not PHP or SQL related */

function getUsernameReg(){
	return document.getElementById('usernameReg').value;
}

function getPasswordReg(){
	return document.getElementById('passwordReg').value;
}

function getUsername(){
	return document.getElementById('usernameText').value;
}

function getPassword(){
	return document.getElementById('passwordText').value;
}

function adjustPage(newContent){
	//document.body.innerHTML = newContent;
	document.getElementById('center').innerHTML = newContent;
}

function setLog(validation){
	if(validation == true){
		loggedIn = true;
	}else{
		loggedIn = false;
	}
}

function getSelectMultipleUsers(){
	var users = document.getElementById("usersMultiple");
	var userArray = new Array();
	var j = 0;
	var i = 0;
	/* the users here is a DOM element with all the options in it*/ 
	for (i = 0; i < users.options.length; i++){
		/* we then throw it into the for loop to see which ones are selected */
		if(users.options[i].selected == true){
			//console.log(users.options[i].value);
			userArray[j] = users.options[i].value;
			j++; /* have to use a separate counter or else it will place the name values inside the i'th element, which is not what we want! */
	    }
	    
    }
    return userArray;
}

function newButton(){
	console.log("NewButton works");
}