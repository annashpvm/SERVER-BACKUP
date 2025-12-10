<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $savetype    = $_REQUEST['savetype'];
 $compcode    = $_POST['compcode'];
 $finyear     = $_POST['finyear'];
 $ledgercode  = $_POST['ledgercode'];
 $ledgername  = trim(strtoupper($_POST['ledgername']));
 $led_grpcode = $_POST['ledgrpcode'];
 $usercode    = $_POST['usercode'];
 $reccount    = 1;
 $today       = date("Y-m-d H:i:s");  




#Begin Transaction
mysqli_query($conn, "BEGIN");

$query1="select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
$result1=mysqli_query($conn, $query1);
$rec1=mysqli_fetch_array($result1);
$curbalseqno= $rec1['curbal_seqno'];


if ($savetype == "Add")
{
	$query="select ifnull(max(cust_code),0)+1 as cust_code from massal_customer";
	$result=mysqli_query($conn, $query);
	$rec=mysqli_fetch_array($result);
	$ledgercode= $rec['cust_code'];


        $query= "insert into massal_customer 
(cust_code, cust_ref, cust_name,cust_acc_group,cust_type, createdby, createddate, seqno)
values('$ledgercode','$ledgername','$ledgername','$led_grpcode','G','$usercode','$today',$reccount)";

	 $result = mysqli_query($conn, $query);

//	echo $query;




	 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','1' );";
	 $result1 = mysqli_query($conn, $query1);


	$curbalseqno = $curbalseqno + 1;

//	echo $query1;

	 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','90' );";
	 $result1 = mysqli_query($conn, $query1);

	//echo $query1;
}
else
{

//        $query2 = "insert into massal_customer_logs select * from massal_customer where cust_code = '$ledgercode'"; 
//        $result2=mysqli_query($conn, $query2);


	$cquery1 = "select ifnull(max(seqno),0) + 1 as reccount  from massal_customer where cust_code = '$ledgercode'";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$reccount = $crec1['reccount'];


	$query  = "update massal_customer set cust_ref = '$ledgername' , cust_name = '$ledgername' ,cust_acc_group= '$led_grpcode' ,createdby  = '$usercode', createddate = '$today' , seqno = $reccount where   cust_code = '$ledgercode'";
	 $result = mysqli_query($conn, $query);   

 
//	echo $query;


	$cquery1 = "select count(*) as nos from acc_current_balance where curbal_comp_code = $compcode and curbal_finid = '$finyear' and curbal_led_code = '$ledgercode'";
	$cresult1 = mysqli_query($conn, $cquery1);
	$crec1 = mysqli_fetch_array($cresult1);
	$reccount = $crec1['nos'];

//echo $reccount;
//echo $cquery1;
        if ($reccount == 0)
        {
	 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','1' );";
	 $result1 = mysqli_query($conn, $query1);

         $curbalseqno = $curbalseqno + 1;


	 $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledgercode','$finyear','90' );";
	 $result1 = mysqli_query($conn, $query1);
        }   

}

      if (($result ))
      {
          mysqli_begin_transaction($conn);
          echo '({"success":"true","msg":"' . $ledgername . '"})';
      }
     else
     {
         mysqli_rollback($conn);


         echo '({"success":"false","msg":"' . $ledgername . '"})';

     }
?>
