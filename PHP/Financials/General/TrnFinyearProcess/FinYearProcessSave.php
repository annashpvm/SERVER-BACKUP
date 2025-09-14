<?php
//require($_SERVER["DOCUMENT_ROOT"] . "/dbDfdConn.php");
mysql_connect("192.168.3.7","root","mysql") or die("Connect : Failure" . mysql_error());
mysql_select_db("kgdl");
session_start();

 $finid=$_POST['finid'];
 $compcode=$_POST['compcode']; 
 $fmdate=$_POST['d1'];
 $todate=$_POST['d2'];

if($finid!='' && $compcode !='' && $fmdate != '' && $todate!= '' )
 {  

mysql_query("BEGIN");

$query2 = "call PrcAccFinyearProcess('$finid','$compcode','$fmdate','$todate')";
$result2 = mysql_query($query2);

 if($result2)
        {
            mysql_query("COMMIT");                        
             Echo '{success:true,results:1}';
        }
        else
        {
            mysql_query("ROLLBACK");            
            Echo '{success:false,results:1}';
        } 
}
?>

