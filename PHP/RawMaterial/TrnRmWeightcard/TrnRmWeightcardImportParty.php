<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$servernameMain = "10.0.0.251";
$databaseMain = "shvpb";

$servernameSub = "10.0.0.150";
$databasesub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";


$dbMain =  mysql_connect($servernameMain,$username,$password) or die("connect : failure" . mysql_error());
$dbSub  =  mysql_connect($servernameSub,$username,$password); // or die("connect : failure" . mysql_error());

mysql_select_db($databaseMain,$dbMain);

//echo $dbsub;

if($dbSub)
{
    mysql_select_db($databasesub,$dbSub);
    session_start();

 $query1 = "select * from mas_wb_party";


 $result1 = mysql_query($query1,$dbMain);

 while ($row = mysql_fetch_assoc($result1)) {

    $code          = $row['party_code'];
    $name          = $row['party_name'];
    $partytype     = $row['party_type'];



    $queryfind = "select count(*) as nos from mas_wb_party where party_code = $code";
    $resultfind = mysql_query($queryfind,$dbSub);
    $rec1 = mysql_fetch_array($resultfind);
    $seqno=$rec1['nos'];




      
    if ($seqno == 0)
    {
    $query2 = "insert into mas_wb_party (party_code, party_name, party_type) values ($code , '$name',$partytype)";
    $result2 = mysql_query($query2,$dbSub);


//echo $query2;
//echo "<br>";
    }





//echo $query2;
//echo "<br>";
  } 
  mysql_free_result($result1);


// Master

 $query1 = "select * from massal_customer";


 $result1 = mysql_query($query1,$dbMain);

 while ($row = mysql_fetch_assoc($result1)) {

    $code          = $row['cust_code'];
    $refname       = $row['cust_ref'];
    $partyname     = $row['cust_name'];

    $cust_add1     = $row['cust_add1'];
    $cust_add2     = $row['cust_add2'];
    $cust_add3     = $row['cust_add3'];

    $cust_city     = $row['cust_city'];
    $cust_state    = $row['cust_state'];
    $cust_country  = $row['cust_country'];

    $cust_zip      = $row['cust_zip'];
    $cust_gstin    = $row['cust_gstin'];

    $cust_repr      = $row['cust_repr'];
    $cust_acc_group    = $row['cust_acc_group'];




    $queryfind = "select count(*) as nos from massal_customer where cust_code = $code";
    $resultfind = mysql_query($queryfind,$dbSub);
    $rec1 = mysql_fetch_array($resultfind);
    $newno=$rec1['nos'];



    $queryfind = "select count(*) as nos from massal_customer where left(cust_ref,2) = 'ZZ' and  cust_code = $code";
    $resultfind = mysql_query($queryfind,$dbSub);
    $rec1 = mysql_fetch_array($resultfind);
    $oldno=$rec1['nos'];

      
    if ($newno == 0)
    {
    $query2 = "insert into massal_customer ( cust_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city,
 cust_state, cust_country, cust_zip, cust_gstin,cust_repr,cust_acc_group) values ($code , '$refname','$partyname','$cust_add1','$cust_add2',  '$cust_add3','$cust_city','$cust_state', '$cust_country', '$cust_zip', '$cust_gstin' , '$cust_repr','$cust_acc_group')";


    $result2 = mysql_query($query2,$dbSub);


//echo $query2;
//echo "<br>";
    }
    
    if ($oldno == 0)
    {
 $query2 = "update massal_customer set cust_ref = upper('$refname'),cust_name = upper('$partyname'),cust_add1 = upper('$cust_add1') ,cust_add2 = upper('$cust_add2'),cust_add3 = upper('$cust_add3'),cust_city = upper('$cust_city'),cust_state = '$cust_state',cust_country = '$cust_country',cust_zip = '$cust_zip',cust_gstin = upper('$cust_gstin')  ,
cust_repr = '$cust_repr',cust_acc_group = $cust_acc_group
  where cust_code = '$code'"; 

    $result2 = mysql_query($query2,$dbSub);
    }   




//echo $query2;
//echo "<br>";
  } 
  mysql_free_result($result1);

  }

?>
