<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


session_start();
$griddet     = json_decode($_POST['griddet'],true);
$savetype    = $_POST['savetype'];
$rowcnt      = $_POST['cnt'];
$isscompcode = $_POST['isscompcode'];
$issfincode  = $_POST['issfincode'];
$issdate     = $_POST['issdate'];
$isstype     = $_POST['isstype'];
$isshno      = $_POST['isshno'];
$dept        = $_POST['dept'];
$issentdate  = $_POST['issentdate'];



mysql_query("BEGIN");

if ($savetype == "Add") 
{
   $query1 = "select IFNULL(max(iss_no),0)+1 as issh_no from trnpur_item_issues where iss_fin_code = '$issfincode' and iss_comp_code= '$isscompcode' and iss_type = '$isstype'";
   $result1= mysql_query($query1);
   $rec2   = mysql_fetch_array($result1);
   $isshno  =$rec2['issh_no'];
}

else
{
   if ($isstype == "AP")  
   {     
        $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock - iss_qty where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'AP' and iss_no = $isshno ";
	$result2=mysql_query($query2);  
    
   }
   else
   {     
        $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock + iss_qty where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'AM' and iss_no = $isshno";
	$result2=mysql_query($query2);      
   }
        

//echo $query2;   
//echo "<br>";


     
  $query3 = "delete from trnpur_item_issues where iss_comp_code = '$isscompcode' and iss_no = $isshno and iss_fin_code = '$issfincode' and iss_type = '$isstype'";
   $result3= mysql_query($query3);

   $query4 = "delete from trnpur_item_rec_iss where reciss_comp_code = '$isscompcode' and reciss_doc_no = $isshno and reciss_fin_code = '$issfincode' and reciss_type = '$isstype'";
   $result4= mysql_query($query4);

}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

    if ($griddet[$i]['adjqty'] > 0 ) {
	$sno = $i + 1;

	$isscostcode = '1';


	$issitemcode = $griddet[$i]['itemcode'];
	$adjqty      = $griddet[$i]['adjqty'];
	$adjval      = $griddet[$i]['adjval'];

	$issrate     = $griddet[$i]['rate'];
	$isscrstatus = $griddet[$i]['isscrstatus'];
	$isscatcode  = $griddet[$i]['cat'];

	$issslno = $sno;

	$issmachine = $griddet[$i]['machine'];
	$isssection = (int) $griddet[$i]['sectioncode'];
	$issequip   = (int) $griddet[$i]['equipcode'];
	$cancelflag = '0';



	$rev_cap = "R";
	if ($isscrstatus  == "REVENUE")
	{
	 $rev_cap = "R";
	}
	else
	{
	 $rev_cap = "C";
	}


	$query2= "insert into trnpur_item_issues values ('$isscompcode','$issfincode','$isstype','$isshno','$issdate',  '0','$issmachine','$isssection','$issequip','$issslno' , '$issitemcode','$adjqty' ,'$issrate','$adjval',curdate() , '$rev_cap','$vounolist')";


	$result2=mysql_query($query2);   
//echo $query2;   
//echo "<br>";


	$query3= "insert into trnpur_item_rec_iss values('$isscompcode','$issfincode','$isstype','$isshno','$issdate', '$issslno','$issitemcode', '$adjqty', '$issrate',0)";

	 $result3=mysql_query($query3);       

//echo $query3;   
//echo "<br>";


        if ($isstype == "AM")  
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock - $adjqty  , item_liss_date = '$issdate' where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result4=mysql_query($query4);      

//echo $query4;   
//echo "<br>";

        }       
        else
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock + $adjqty   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result4=mysql_query($query4);      

//echo $query4;   
//echo "<br>";
        }       

    } //END IF
  
}




if($result2 && $result3 && $result4)
{
  	mysql_query("COMMIT");                        
  	echo '({"success":"true","IssNo":"'. $isshno . '"})';
}
else
{
	echo '({"success":"false","IssNo":"' . $isshno . '"})';
	mysql_query("ROLLBACK");            
            
}   
        
   
 
?>
