<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$griddet = json_decode($_REQUEST['griddet'],true);
$rowcnt = $_POST['cnt'];

$savetype   = $_POST['savetype'];
$compcode   = $_POST['compcode'];
$finid	    = $_POST['finid'];
$indno      = $_POST['indno'];
$inddate    = $_POST['inddate'];
$entdate    = $_POST['entdate'];
$indtype    = $_POST['indtype'];
$dept	    = $_POST['dept'];
$preparedby = $_POST['preparedby'];
$approvedby = $_POST['approvedby'];
$userid     = $_POST['userid'];


mysqli_begin_transaction($conn);

for ($i=0;$i<$rowcnt;$i++)
{

$slno		=$griddet[$i]['slno'];
$itemcode	=$griddet[$i]['itemcode'];
$indtype	=$griddet[$i]['indtype'];
$indqty		=$griddet[$i]['qty'];

$rate		=$griddet[$i]['value']/$griddet[$i]['qty'];  //              $griddet[$i]['rate'];
$value		=$griddet[$i]['value'];
$remarks        = str_replace("'","",$griddet[$i]['remarks']);
$duedate        = $griddet[$i]['duedate'];
$appsts         ='1';  //    $griddet[$i]['appsts'];
$sts            = $griddet[$i]['status'];
$equip          = $griddet[$i]['equipcode'];
$machine        = $griddet[$i]['machine'];
$section        = $griddet[$i]['sectioncode']; 
$poqty          = $griddet[$i]['ordqty']; 
$recqty         = $griddet[$i]['recqty']; 
$issqty         = $griddet[$i]['issqty'];
$hodauth        = $griddet[$i]['hodauth'];
$purauth        = $griddet[$i]['purauth'];
$approval	= $griddet[$i]['approval'];
$purpose        = str_replace("'","",$griddet[$i]['purpose']);
$stock          = (float) $griddet[$i]['stock'];
$StdLifeTime    = $griddet[$i]['StdLifeTime'];
$ActLifeTime    = $griddet[$i]['ActLifeTime'];
$Reason         = str_replace("'","",$griddet[$i]['Reason']);



$query = "select count(*) as nos from trnpur_indent where ind_fin_code='$finid' and ind_comp_code='$compcode'  and ind_no = $indno and ind_slno = $slno;";
$result = mysqli_query($conn, $query);
$rec = mysqli_fetch_array($result);
$records=$rec['nos'];



if ($records == 0)
   $query1 = "insert into trnpur_indent values('$compcode','$finid','$indno','$inddate','$indtype','$dept','$machine','$section','$equip',
$slno,'$itemcode','$indqty','$rate','$value','$poqty','$recqty','$issqty','$indqty','$duedate','$remarks' , '$approval','$sts','','$preparedby','$hodauth','$purauth','$purpose','$stock' ,'$StdLifeTime' , '$ActLifeTime' , '$Reason' )";

else
   $query1 = "update trnpur_indent set ind_item_code = $itemcode  , ind_remarks = '$remarks', ind_purpose = '$purpose',ind_std_lifetime = '$StdLifeTime' , ind_act_lifetime = '$ActLifeTime' where ind_comp_code = $compcode and ind_fin_code = $finid  and ind_no = $indno and ind_slno = $slno;";





   $result1 = mysqli_query($conn, $query1);



//echo $query1;

}



if($result1) 
{
    mysqli_commit($conn);

    echo '({"success":"true","msg":"' . $indno . '"})';
} 
else {
    mysqli_rollback($conn);


    echo '({"success":"false","msg":"' . $indno . '"})';
}
  
   
?>
