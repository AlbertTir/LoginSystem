<?php
	session_start();
	
	if(strcmp($_POST['command'], "logoutSession") == 0){
		//echo "session validity is " . $_SESSION['valid'];
		session_destroy();
		/*echo "Session destroyed, now logged out.";
		echo "session validity is now " . $_SESSION['valid'];*/
		exit;
	}else if(strcmp($_POST['command'], "checkLogstate") == 0){
		echo $_SESSION['valid'];
		exit;
	}
	
	if(!isset($_SESSION['valid'])){
		/* if we're not actually logged in, send it back to the login page */
		header('location: http://localhost:8888/7.phpLogin/login.html');
		die();
	}else{
		echo $_SESSION['valid'];
	}
	
	
	/*echo "<body>
		<div class=" . "center" . ">
			Login Success!
			<input id=" . '"logoutButton"' . " " .  "type='button' value='Logout'>
		</div>
	</body>";*/
	/*
	<p>Login Success</p>
	<input id="logoutButton" type="button" value="Logout">
	*/
?>