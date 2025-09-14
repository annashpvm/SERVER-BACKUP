<?php

require($_SERVER["DOCUMENT_ROOT"] . "/SHVPM/Financials/FundsManagement/Bank_Reconciliation/Conn.php");


$action = $_POST['action'];
$idd = $_POST['id'];
$bank = $_POST['bank'];
$description = $_POST['description'];
$paymenttype = $_POST['paytype'];
$amount = $_POST['amount'];
$dueday = $_POST['dueday'];
$duemonth = $_POST['duemonth'];
$startdate = $_POST['startdate'];
$lastpaid = $_POST['lastpaid'];
$noinstallments = $_POST['noinstallments'];
$tilldate = $_POST['tilldate'];
$status = $_POST['status'];
$userid = $_POST['userid'];

mysql_query("BEGIN");
 
$query = "select ifnull(max(seqno),0)+1  as seq from ecs_master";
$res = mysql_query($query);
$rec = mysql_fetch_array($res);
$seqno = $rec['seq'];


if ($action == "Add") {
    $query1 = ("call ecs_master_insert('$seqno','$bank','$description','$paymenttype','$amount','$dueday','$duemonth','$startdate','$lastpaid','$noinstallments','$tilldate','$userid' )" );
    $result1 = mysql_query($query1); 

 

    $installmentdetails = json_decode($_REQUEST['installmentdetails'], true);
    $rowcnt = $_REQUEST['installmentcnt'];
    $intcnt = 0;
    for ($i = 0; $i < $rowcnt; $i++) {


	$query = "select ifnull(max(seqno),0)+1  as seq from ecs_monthly_installments";
	$res = mysql_query($query);
	$rec = mysql_fetch_array($res);
	$sno = $rec['seq'];
       
        $ddate = $installmentdetails[$i]['due_date'];
        $damount = $installmentdetails[$i]['due_amount'];        

          $query2 = "insert into ecs_monthly_installments(seqno,ecsmaster_seqno,due_date,due_amount,active_status,created_by,created_date) values('$sno','$seqno','$ddate','$damount','Y','$userid',now())";
          $result2 = mysql_query($query2);
           

    
    }


}

/*

if ($action == "Edit") {

$query2 = ("call ecs_master_update('$idd','$bank','$description','$amount','$dueday','$duemonth','$startdate','$lastpaid','$noinstallments','$tilldate','$status','$userid')" );
    $result2 = mysql_query($query2);
}
*/
if($paymenttype=='EMI')
{

if ($result1 || $result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $num . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $num . '"})';
}
}
else{
if ($result1 && $result2) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $num . '"})';
} else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $num . '"})';
}

}
