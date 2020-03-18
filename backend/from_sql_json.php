<?php
         	  $host="localhost"; //replace with your hostname
         	  $username="kolegi"; //replace with your username
         	  $password="6I7z3I6k"; //replace with your password 
         	  $db_name="pov"; //replace with your database
         	  $con=mysql_connect("$host", "$username", "$password")or die("cannot connect"); 
               mysql_select_db("$db_name")or die("cannot select DB");
               $query="ф-86-32"
               $sql = "SELECT * FROM `TABLE 28` WHERE `COL 1` LIKE '%$query%'";
         	//   $sql = "select * from emp_info"; //replace emp_info with your table name
         	  $result = mysql_query($sql);
         	  $json = array();
         	  if(mysql_num_rows($result)){
         	  while($row=mysql_fetch_row($result)){
         	  $json['emp_info'][]=$row;
         	  }
         	  }
         	  mysql_close($db_name);
         	  echo json_encode($json);
         	  // please refer to our PHP JSON encode function tutorial for learning json_encode function in detail 
         	  ?>