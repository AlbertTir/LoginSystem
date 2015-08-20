<?php
	
	/* Function for connecting to the MySQL on MAMP */
	function SQLConnect(){
		$connect = mysqli_connect("localhost", "root", "root", "LoginSystem");
		//mysql_select_db("LoginSystem", $connect);
		if(!$connect){
			//echo "Failed to connect." . mysql_error();
		}else{
			//echo "Connected.";
		}
		return $connect;
	}
	
	/* Function for inserting to database given the proper parameters */
	function insertToSQL($username, $password, $connection){
		$query = "INSERT INTO `Users` (username, password) VALUES ('$username', '$password')";
		$testquery = "INSERT INTO Users (username, password) VALUES ('user7', 'pass7')";
		
		//mysql_select_db($selectDB, $connection); /* need to do this line to select which database the data goes to */
		
		/* parameters for query is the SQL string command, then the connection */
		if(mysqli_query($connection, $query)){
			echo " Successfully added user.";
		}else{
			echo " Failed to query "  . mysqli_error($connection);
		}
		SQLClose($connection);
	}
	
	/* Function to get user data from the tables */
	function getFromSQL($connection){
		//mysql_select_db($selectDB, $connection); /* decided to do this in the SQLConnect instead to make it less repetitive */
		
		$query = "SELECT `username` FROM `Users`";
		
		if($result = mysqli_query($connection, $query)){
			while($dataArray = mysqli_fetch_array($result)){ 
			/* currently the only easy method of grabbing and printing data from the database, works the same way as fgets for text file parsing */
			  echo $dataArray['username'] . "\n";// . " " . $dataArray['password'];
			}
		}else{
			echo " Failed to query. " . mysqli_error();
		}
		SQLClose($connection);
	}
	
	/* Function to update user information on server */
	function updateSQL($username, $password, $connection){
		/* NOT FINISHED YET */
		$query = "UPDATE Users SET `username`=[value-1],`password`=[value-2] WHERE 1";
		
		SQLClose($connection);
	}
	
	/* Function to delete user information on server */
	function deleteFromSQL($usernameToDelete, $connection){
		$query = "DELETE FROM `Users` WHERE username = '$usernameToDelete';";
		$result = mysqli_query($connection, $query);
		
		
		
		
		
		if($result){
			echo "'$usernameToDelete' removed successfully.";
		}else{
			echo "'Failure to delete.'";
		}
		SQLClose($connection);
	}
	
	/* Function for closing the connection */
	function SQLClose($SQLToClose){
		if(mysqli_close($SQLToClose)){
			//echo "Closed successfully.";
		}else{
			echo "Failed to close connection.";
		}
	}
	
	/* Function for login credentials checking, send confirmation back to client side on success/failure */
	function loginCheck($username, $password, $connection){
		/* function to check for correct login */
		$query = "SELECT `password` FROM `Users` WHERE `username` = '$username';";
		$result = mysqli_query($connection, $query);
		
		if($result){
			/* it has to be exactly 1 because otherwise there are duplicate users. 1 means user is found and is unique */
			//echo $result;
			//$dbPassword = mysql_fetch_array($result);
			$dbPassword = mysqli_fetch_array($result);
			/*echo " dbPassword is " . $dbPassword['password'];
			echo " password is " . $password;*/
		}else{
			echo "No username and password specified are found in the database. Please try again.";
			die();
		}
		
		if(strcmp($dbPassword['password'], $password) == 0){
			session_start();
			$_SESSION['valid'] = 1;
			$_SESSION['username'] = $username;
			if(header('location: loginSuccess.php')){ 
			// i had to comment out the echos in SQLConnect and loginCheck because any HTML output before header() makes it fail to redirect
				echo " Redirection success.";
			}else{
				echo " Failed to redirect.";
			}
			exit; 
		}else{
			//echo $dbPassword['password'] . " " . $password;
			echo "Wrong password. Please try again.";
			die();
		}
		SQLClose($connection);	
	}
	
	/* Function for login validation */
	function validateLogin($validCommand){
		
	}
	
	/* Function for retrieving command query sent from JS clientside */
	function getCommand(){
		/* Gets command sent from the javascript */
		$commandData = $_POST['command'];
		return $commandData;
	}

	
	if(strcmp(getCommand(), "insertToSQL") == 0){
		$nameToInsert = $_POST['username'];
		$passToInsert = $_POST['password']; 
		insertToSQL($nameToInsert, $passToInsert, SQLConnect(), "LoginSystem");
	}else if(strcmp(getCommand(), "getFromSQL") == 0){
		getFromSQL(SQLConnect(), "LoginSystem");
	}else if(strcmp(getCommand(), "updateSQL") == 0){
		$nameToUpdate = $_POST['username'];
		$passToUpdate = $_POST['password']; /* needs the new ones too, deal with that later */
		updateSQL($nameToUpdate, $passToUpdate, SQLConnect());
	}else if (strcmp(getCommand(), "loginCheck") == 0){
		$name = $_POST['username'];
		$pass = $_POST['password'];
		loginCheck($name, $pass, SQLConnect());
	}else if (strcmp(getCommand(), "deleteFromSQL") == 0){
		$name = $_POST['username'];
		echo $name;
		deleteFromSQL($name, SQLConnect());
	}else{
		die("Invalid command."); /* die prints a message, in the bracket and exits the script */
	}


	
?>
