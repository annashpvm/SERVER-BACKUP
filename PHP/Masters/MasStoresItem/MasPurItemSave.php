<?php

require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();

 $SaveFlag = $_POST['SaveFlag'];
 $itemname=strtoupper($_POST['itemname']);

 $itemname=str_replace("'","",$itemname);


 $itemname2=str_replace(' ','',$itemname);
 $itemname2=str_replace('.','',$itemname2);

 $itemname3=str_replace('"','',$itemname);



 $itemusage=strtoupper($_POST['itemusage']);
 $itemusage=str_replace("'","",$itemusage);


 $unit=$_POST['unit'];
 $qualitychk=$_POST['qualitychk'];
 $indent=$_POST['indent'];
 $itemgrp=$_POST['itemgrp'];
 $hsncode=$_POST['hsncode'];

 $itemchange=$_POST['itemchange'];


 $itemnameNew=$_POST['itemnameNew'];

 $itemnameNew=str_replace("'","",$itemnameNew);



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




//echo '$itemname';
if ($SaveFlag === "Add") {
$query = "select ifnull(max(item_code),0)+1 as item_code from maspur_item_header";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$item_code=$rec['item_code'];

//$qry = "select count(*) as cnt from maspur_item_header where item_name = '$itemname'";
$qry = "select count(*) as cnt from maspur_item_header where replace(replace(item_name,' ','') ,'.','') = '$itemname2'";
//echo $qry;
//echo "<br>";
$resgrp = mysql_query($qry);
$recgrp = mysql_fetch_array($resgrp);
$cnt=$recgrp['cnt']; 

//echo $cnt;
//echo "<br>";

if($cnt==0)
{
  $query1="insert into maspur_item_header values('$item_code','$itemgrp',UPPER('$itemname'),UPPER('$itemusage'), '$unit','$qualitychk','$hsncode','$spec1','$spec2','$spec3','$spec4','$spec5','$spec6','$spec7','$spec8','$spec9','$spec10',0,'N')";
  $result1 = mysql_query($query1);
  
 // $instrailer = mysql_query("call sppur_ins_itemtrailer"); 
}
}
else if ($SaveFlag === "Edit") {
   $item_code =$_POST['item_code'];
    if ($itemchange  == "Y")

	  $query2="Update maspur_item_header set item_name = UPPER('$itemnameNew'),item_usage = UPPER('$itemusage'),item_group_code = '$itemgrp', item_uom = '$unit', item_hsncode = '$hsncode' ,item_spec1 = '$spec1',item_spec2 = '$spec2',item_spec3 = '$spec3',item_spec4 = '$spec4',item_spec5 = '$spec5',item_spec6 = '$spec6',item_spec7 = '$spec7',item_spec8 = '$spec8',item_spec9 = '$spec9',item_spec10 = '$spec10'  where item_code = '$item_code'"; 


    else
	  $query2="Update maspur_item_header set item_usage = UPPER('$itemusage'),item_group_code = '$itemgrp', item_uom = '$unit', item_hsncode = '$hsncode' ,item_spec1 = '$spec1',item_spec2 = '$spec2',item_spec3 = '$spec3',item_spec4 = '$spec4',item_spec5 = '$spec5',item_spec6 = '$spec6',item_spec7 = '$spec7',item_spec8 = '$spec8',item_spec9 = '$spec9',item_spec10 = '$spec10'  where item_code = '$item_code'"; 
  

  $result2 = mysql_query($query2);

//echo $query2;


}

if ($SaveFlag === "Add") {
	if ($result1 && $cnt==0) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $itemname . '"})';
	} 
	else if ($cnt>0) {
	 mysql_query("ROLLBACK");
	    echo '({"success":"false","cnt":"' . $cnt . '"})';
	}
	 else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $itemname . '"})';
	}
}
if ($SaveFlag === "Edit"){
	if ($result2) {
	    mysql_query("COMMIT");
	    echo '({"success":"true","msg":"' . $itemname3 . '"})';
	} 
	 else {
	    mysql_query("ROLLBACK");
	    echo '({"success":"false","msg":"' . $itemname3 . '"})';
	}
}

  
   
?>
