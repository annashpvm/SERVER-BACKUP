<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$usr_code   = $_POST['usercode'];
$department = $_POST['department'];
$username   = strtoupper($_POST['username']);
$loginname  = strtolower($_POST['loginname']);
$pw         = $_POST['pw'];
$usrtype    = $_POST['usrtype'];

$entrydays  = (int) $_POST['entrydays'];
$alterdays  = (int) $_POST['alterdays'];


if ($savetype === "Add")
{

	$query   = "select ifnull(max(usr_code),0)+1 as usrcode from userMaster";
	$result  = mysql_query($query);
	$rec     = mysql_fetch_array($result);
	$usr_code = $rec['usrcode'];

	$qry = "select count(*) as cnt from userMaster where usr_name = '$username'";
	$resag = mysql_query($qry);
	$recvar = mysql_fetch_array($resag);
	$cnt=$recvar['cnt'];

	$qry1 = "select count(*) as cnt2 from userMaster where usr_login = '$loginname'";
	$resag1 = mysql_query($qry1);
	$recvar1 = mysql_fetch_array($resag1);
	$cnt2=$recvar1['cnt2'];



	if($cnt==0 &&  $cnt2==0 )
	{
//	  $query1="insert into userMaster values('$usr_code','$department','$username','$loginname', '$pw', '$usrtype','$accounts','$sales','$production','$purchase','$stores','$rawmaterial','$fuel','$imports','$payroll','Y')";

	  $query1="insert into userMaster values('$usr_code','$department','$username','$loginname', '$pw', '$usrtype',$entrydays,$alterdays,'NO', 'NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y')";
	  $result1 = mysql_query($query1);

//          echo $query1;


          
         for ($i=0;$i<$rowcnt;$i++)
         {
		$seqno  = $griddet[$i]['modseqno'];
		$flag   = $griddet[$i]['rights'];
                if ($seqno == 1)
                {   
                   $query2 = "update  userMaster set usr_accounts = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                if ($seqno == 2)
                {
                   $query2 = "update  userMaster set usr_sales = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 3)
                {
                   $query2 = "update  userMaster set usr_stores = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
 
                if ($seqno == 4)
                {
                   $query2 = "update  userMaster set usr_rawmaterial = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 5)
                {
                   $query2 = "update  userMaster set usr_purchase = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 7)
                {
                   $query2 = "update  userMaster set usr_fuel = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 8)
                {
                   $query2 = "update  userMaster set usr_production = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                if ($seqno == 9)
                {
                   $query2 = "update  userMaster set usr_payroll = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 10)
                {
                   $query2 = "update  userMaster set usr_indent = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
 
                if ($seqno == 11)
                {
                   $query2 = "update  userMaster set usr_import = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 12)
                {
                   $query2 = "update  userMaster set usr_inward = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 17)
                {
                   $query2 = "update  userMaster set usr_qc = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }



         }       




	}


	  if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $username . '"})';
	} 
	  else if ($cnt>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	
	}
	  else if ($cnt2>0) {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt2":"' . $cnt2 . '"})';
	
	}
       else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $username . '"})';
	}
 }
# Save After Edit
     else
     {



         $query1 = "update  userMaster set usr_login = '$loginname', usr_pw  = '$pw', usr_type   = '$usrtype', usr_entrydays  = '$entrydays', usr_alterdays = '$alterdays'  where usr_code = $usr_code";
         $result1 = mysql_query($query1); 
//echo $query1;
         for ($i=0;$i<$rowcnt;$i++)
         {
		$seqno  = $griddet[$i]['modseqno'];
		$flag   = $griddet[$i]['rights'];
                if ($seqno == 1)
                {   
                   $query2 = "update  userMaster set usr_accounts = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                if ($seqno == 2)
                {
                   $query2 = "update  userMaster set usr_sales = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 3)
                {
                   $query2 = "update  userMaster set usr_stores = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
 
                if ($seqno == 4)
                {
                   $query2 = "update  userMaster set usr_rawmaterial = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 5)
                {
                   $query2 = "update  userMaster set usr_purchase = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 7)
                {
                   $query2 = "update  userMaster set usr_fuel = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 8)
                {
                   $query2 = "update  userMaster set usr_production = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                if ($seqno == 9)
                {
                   $query2 = "update  userMaster set usr_payroll = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 10)
                {
                   $query2 = "update  userMaster set usr_indent = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
 
                if ($seqno == 11)
                {
                   $query2 = "update  userMaster set usr_import = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 12)
                {
                   $query2 = "update  userMaster set usr_inward = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }
                 if ($seqno == 17)
                {
                   $query2 = "update  userMaster set usr_qc = '$flag' where usr_code = $usr_code";
                   $result2 = mysql_query($query2); 
                }

         }       




	  if ($result2) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $username . '"})';
	  } 
	
	  else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $username . '"})';
	   }
     } 
   
?>
