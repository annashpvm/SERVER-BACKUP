<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $item_code = $_POST['item_code'];
 $item_name = $_POST['item_name'];
 $spec1     = strtoupper($_POST['spec1']);
 $spec2     = strtoupper($_POST['spec2']);
 $spec3     = strtoupper($_POST['spec3']);
 $spec4     = strtoupper($_POST['spec4']);
 $spec5     = strtoupper($_POST['spec5']);
 $spec6     = strtoupper($_POST['spec6']);
 $spec7     = strtoupper($_POST['spec7']);
 $spec8     = strtoupper($_POST['spec8']);
 $spec9     = strtoupper($_POST['spec9']);
 $spec10    = strtoupper($_POST['spec10']);
 

 $spec1=str_replace("'","",$spec1);
 $spec2=str_replace("'","",$spec2);
 $spec3=str_replace("'","",$spec3);
 $spec4=str_replace("'","",$spec4);
 $spec5=str_replace("'","",$spec5);
 $spec6=str_replace("'","",$spec6); 
 $spec7=str_replace("'","",$spec7);
 $spec8=str_replace("'","",$spec8);
 $spec9=str_replace("'","",$spec9);
 $spec10=str_replace("'","",$spec10);


  $query1="Update maspur_item_header set item_spec1 = '$spec1',item_spec2 = '$spec2',item_spec3 = '$spec3',item_spec4 = '$spec4',item_spec5 = '$spec5',item_spec6 = '$spec6',item_spec7 = '$spec7',item_spec8 = '$spec8',item_spec9 = '$spec9',item_spec10 = '$spec10'  where item_code = '$item_code'"; 
  $result1 = mysql_query($query1);


  if ($result1 ) {
    mysql_query("COMMIT");
    echo '({"success":"true","msg":"' . $item_name . '"})';
} 
 else {
    mysql_query("ROLLBACK");
    echo '({"success":"false","msg":"' . $item_name . '"})';
}


  
   
?>
