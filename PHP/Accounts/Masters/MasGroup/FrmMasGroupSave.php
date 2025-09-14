<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
 //$CompCode=1;
 $CompCode=$_POST['CompCode'];
 $GroupName=strtoupper($_POST['GroupName']);
 $ParentGroup=$_POST['ParentGroup'];
 $Status=strtoupper($_POST['Status']);

 //echo"$GroupName";
 $query = "select ifnull(max(grp_code),0)+1 as con_value from acc_group_master where grp_comp_code = '$CompCode'";

 $result = mysql_query($query);

        $rec = mysql_fetch_array($result);
	$fin_groupcode=$rec['con_value'];


  $query1="call acc_sp_insgroupmaster('$fin_groupcode','$CompCode','$GroupName','$ParentGroup','$Status')";
  $result1 = mysql_query($query1);

  

      if ((!$result1))
      {
           Echo '{success:false,results:1,rows:[{"Group":"$GroupName"}]}';

      }

     else
             {
              Echo '{success:true,results:1,rows:[{"Group":"$GroupName"}]}';
             }
  
   
?>
