
<?php


require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$servernameMain = "10.0.0.251";
$databaseMain = "shvpm";

$servernameSub = "10.0.0.150";
$databaseSub = "shvpmb";

$username = "root";
$password = "P@ssw0rD";


$dbMain = mysqli_connect($servernameMain, $username, $password, $databaseMain)
    or die("Main DB connect failure: " . mysqli_connect_error());

$dbSub = mysqli_connect($servernameSub, $username, $password, $databaseSub)
    or die("Sub DB connect failure: " . mysqli_connect_error());


    mysqli_set_charset($dbMain, "utf8");
    mysqli_set_charset($dbSub, "utf8");

    
mysqli_select_db($dbMain, $databaseMain);

//echo $dbsub;

if($dbSub)
{
  mysqli_select_db($dbSub, $databaseSub);

    session_start();

 $query1 = "select * from mas_wb_party";


 $result1 = mysqli_query($dbMain, $query1);

 while ($row = mysqli_fetch_assoc($result1)) {

    $code          = $row['party_code'];
    $name          = $row['party_name'];
    $partytype     = $row['party_type'];



    $queryfind = "select count(*) as nos from mas_wb_party where party_code = '$code'";
    $resultfind = mysqli_query($dbSub, $queryfind);
    $rec1 = mysqli_fetch_array($resultfind);
    $seqno=$rec1['nos'];




      
    if ($seqno == 0)
    {
    $query2 = "insert into mas_wb_party (party_code, party_name, party_type) values ($code , '$name',$partytype)";
    $result2 = mysqli_query($dbSub, $query2);


//echo $query2;
//echo "<br>";
    }





//echo $query2;
//echo "<br>";
  } 
  mysqli_free_result($result1);


// Master

 $query1 = "select * from massal_customer";


 $result1 = mysqli_query($dbMain, $query1);

 while ($row = mysqli_fetch_assoc($result1)) {

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




    $queryfind = "select count(*) as nos from massal_customer where cust_code = '$code'";

    $resultfind = mysqli_query($dbSub, $queryfind);

    $rec1 = mysqli_fetch_array($resultfind);
    $newno=$rec1['nos'];



    $queryfind = "select count(*) as nos from massal_customer where left(cust_ref,2) = 'ZZ' and  cust_code = '$code'";

  $resultfind = mysqli_query($dbSub, $queryfind);

    $rec1 = mysqli_fetch_array($resultfind);
    $oldno=$rec1['nos'];

      
    if ($newno == 0)
    {
    $query2 = "insert into massal_customer ( cust_code, cust_ref, cust_name, cust_add1, cust_add2, cust_add3, cust_city,
 cust_state, cust_country, cust_zip, cust_gstin,cust_repr,cust_acc_group) values ($code , '$refname','$partyname','$cust_add1','$cust_add2',  '$cust_add3','$cust_city','$cust_state', '$cust_country', '$cust_zip', '$cust_gstin' , '$cust_repr','$cust_acc_group')";


    $result2 = mysqli_query($dbSub, $query2);


//echo $query2;
//echo "<br>";
    }
    
    if ($oldno == 0)
    {
 $query2 = "update massal_customer set cust_ref = upper('$refname'),cust_name = upper('$partyname'),cust_add1 = upper('$cust_add1') ,cust_add2 = upper('$cust_add2'),cust_add3 = upper('$cust_add3'),cust_city = upper('$cust_city'),cust_state = '$cust_state',cust_country = '$cust_country',cust_zip = '$cust_zip',cust_gstin = upper('$cust_gstin')  ,
cust_repr = '$cust_repr',cust_acc_group = $cust_acc_group
  where cust_code = '$code'"; 

    $result2 = mysqli_query($dbSub, $query2);
    }   




//echo $query2;
//echo "<br>";
  } 
  mysqli_free_result($result1);

  }

?>
