<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


$savetype       = $_POST['savetype'];
$taxname        = $_POST['taxname'];
$taxshortname   = $_POST['taxshortname'];
$taxsalled_code = (int)$_POST['taxsalled_code'];
$taxsgst_ledcode= (int)$_POST['taxsgst_ledcode'];
$taxcgst_ledcode= (int)$_POST['taxcgst_ledcode'];
$taxigst_ledcode= (int)$_POST['taxigst_ledcode'];
$taxsgst        = (float)$_POST['taxsgst'];
$taxcgst        = (float)$_POST['taxcgst'];
$taxigst        = (float)$_POST['taxigst'];
$taxtype        = (int)$_POST['taxtype'];
$taxseq         = (int)$_POST['taxcode'];


mysqli_begin_transaction($conn);
if ($savetype == "Add")
{
    $query  = "select ifnull(max(tax_code),0)+1 as taxseq from massal_tax";
    $result = mysqli_query($conn, $query);
    $rec    = mysqli_fetch_array($result);
    $taxseq = $rec['taxseq'];


    $qry = "select count(*) as cnt from massal_tax where tax_name = '$taxname'";
    $res  = mysqli_query($conn, $qry);
    $recvar = mysqli_fetch_array($res);
    $cnt=$recvar['cnt'];

    if($cnt==0)
    {
      $query1="insert into massal_tax values($taxseq,upper('$taxname'),upper('$taxshortname'),'$taxsalled_code','$taxsgst_ledcode','$taxcgst_ledcode', '$taxigst_ledcode','$taxsgst','$taxcgst','$taxigst','$taxtype')"; 

  //    echo $query1;

      $result1 = mysqli_query($conn, $query1);
    }

    if ($result1 && $cnt==0) {
      mysqli_commit($conn);
      echo '({"success":"true","msg":"' . $taxname . '"})';
  } 
    else if ($cnt>0) {
      mysqli_rollback($conn);


      echo '({"success":"false","cnt":"' . $cnt . '"})';
    
  }else {
      mysqli_rollback($conn);


      echo '({"success":"false","msg":"' . $taxname . '"})';
  }
}
else
{

  $query1=" update massal_tax set tax_name = upper('$taxname'),  tax_shortname = upper('$taxshortname') , tax_sal_led_code = '$taxsalled_code' , tax_sgst_ledcode = '$taxsgst_ledcode' , tax_cgst_ledcode = '$taxcgst_ledcode', tax_igst_ledcode = '$taxigst_ledcode', tax_sgst = '$taxsgst', tax_cgst = '$taxcgst', tax_igst = '$taxigst', tax_type = '$taxtype' where tax_code =  $taxseq";  
  $result1 = mysqli_query($conn, $query1);
   
  if ($result1) {
      mysqli_commit($conn);
      echo '({"success":"true","msg":"' . $taxname . '"})';
  } 
  else {
      mysqli_rollback($conn);


      echo '({"success":"false","msg":"' . $taxname . '"})';
  }
} 
   
?>
