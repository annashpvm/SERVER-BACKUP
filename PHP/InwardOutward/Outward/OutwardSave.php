<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

$savetype        = $_POST['savetype'];
$io_tag          = $_POST['io_tag'];
$io_entryno      = $_POST['io_entryno'];
$io_date         = $_POST['io_date'];
$io_dept         = $_POST['io_dept'];
$io_fromto       = strtoupper($_POST['io_fromto']);
$io_item         = strtoupper($_POST['io_item']);
$io_letter_type  = strtoupper($_POST['io_letter_type']);
$io_recd_thru    = strtoupper($_POST['io_recd_thru']);
$io_destination  = strtoupper($_POST['io_destination']);
$io_handover     = $_POST['io_handover'];
$io_reference    = $_POST['io_reference'];

if ($savetype == "Add")
{
	$query = "select ifnull(max(io_entryno),0)+1 as entryno from inward_outward where io_tag = '$io_tag'";
	$result = mysql_query($query);
	$rec = mysql_fetch_array($result);
	$io_entryno=$rec['entryno'];

        $query1="insert into inward_outward values('$io_tag','$io_entryno','$io_date','$io_dept','$io_fromto', '$io_item',         '$io_letter_type','$io_recd_thru', '$io_destination', '$io_tracking_no', '$io_handover','$io_reference')";
        $result1 = mysql_query($query1);
}
else
{
//        $query1="update inward_outward set io_date = '$io_date',io_dept = '$io_dept' , io_fromto = '$io_fromto', io_item = '$io_item', 
//io_letter_type =  $io_letter_type , io_recd_thru = $io_recd_thru ,  io_destination = '$io_destination' , io_tracking_no = '$io_tracking_no',  
//io_handover = '$io_handover' where io_tag = '$io_tag' and  io_entryno = '$io_entryno'"; 

        $query1="update inward_outward set io_date = '$io_date',io_dept = '$io_dept', io_fromto = '$io_fromto', io_item = '$io_item' , io_item = '$io_item' , io_letter_type =  '$io_letter_type' , io_recd_thru = '$io_recd_thru' ,  io_destination = '$io_destination' , io_tracking_no = '$io_tracking_no',io_handover = '$io_handover', io_reference = '$io_reference'  where io_tag = '$io_tag' and  io_entryno = '$io_entryno'"; 


  $result1 = mysql_query($query1);


}

  if ($result1) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $entryno . '"})';
} 
  	
else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $entryno . '"})';
}
  
   
?>
