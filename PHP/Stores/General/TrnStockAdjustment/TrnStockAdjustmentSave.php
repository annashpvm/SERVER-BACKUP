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




mysqli_begin_transaction($conn);   

if ($savetype == "Add") 
{
   $query1 = "select IFNULL(max(iss_no),0)+1 as issh_no from trnpur_item_issues where iss_fin_code = '$issfincode' and iss_comp_code= '$isscompcode' and iss_type = '$isstype'";
   $result1= mysqli_query($conn, $query1);
   $rec2   = mysqli_fetch_array($result1);
   $isshno  =$rec2['issh_no'];
}

else
{
   if ($isstype == "AP")  
   {     
        $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock - iss_qty  , item_stockvalue = item_stockvalue - iss_value where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'AP' and iss_no = $isshno ";
	$result2=mysqli_query($conn, $query2);  
    
   }
   else
   {     
        $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock + iss_qty , item_stockvalue = item_stockvalue + iss_value  where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'AM' and iss_no = $isshno";
	$result2=mysqli_query($conn, $query2);      
   }
        

//echo $query2;   
//echo "<br>";


     
  $query3 = "delete from trnpur_item_issues where iss_comp_code = '$isscompcode' and iss_no = $isshno and iss_fin_code = '$issfincode' and iss_type = '$isstype'";
   $result3= mysqli_query($conn, $query3);

   $query4 = "delete from trnpur_item_rec_iss where reciss_comp_code = '$isscompcode' and reciss_doc_no = $isshno and reciss_fin_code = '$issfincode' and reciss_type = '$isstype'";
   $result4= mysqli_query($conn, $query4);

}

$inscnt = 0;
for ($i=0;$i<$rowcnt;$i++)
{

    if ($griddet[$i]['adjqty'] > 0 ) {
	$sno = $i + 1;

	$isscostcode = '1';


	$issitemcode = $griddet[$i]['itemcode'];
	$adjqty      = (float) $griddet[$i]['adjqty'];
	$adjval      = (float) $griddet[$i]['adjval'];

	$issrate     = (float) $griddet[$i]['rate'];
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


	$result2=mysqli_query($conn, $query2);   
//echo $query2;   
//echo "<br>";


	$query3= "insert into trnpur_item_rec_iss values('$isscompcode','$issfincode','$isstype','$isshno','$issdate', '$issslno','$issitemcode', '$adjqty', '$issrate',0)";

	 $result3=mysqli_query($conn, $query3);       

//echo $query3;   
//echo "<br>";


        if ($isstype == "AM")  
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock - $adjqty , item_stockvalue = item_stockvalue - $adjval  where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result4=mysqli_query($conn, $query4);      

//echo $query4;   
//echo "<br>";

        }       
        else
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock + $adjqty , item_stockvalue = item_stockvalue + $adjval   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result4=mysqli_query($conn, $query4);      

//echo $query4;   
//echo "<br>";
        }       


		$query12= "update   maspur_item_trailer  set  item_avg_rate =  CASE  WHEN item_stock > 0 and item_stockvalue > 0 THEN ROUND(item_stockvalue / item_stock, 5)  ELSE 0  END  where  item_code = $issitemcode and  item_comp_code = $isscompcode and item_fin_code = $issfincode ";	
		$result12=mysqli_query($conn, $query12);      
	 
    } //END IF
  
}




if($result2 && $result3 && $result4)
{
	mysqli_commit($conn);                               
  	echo '({"success":"true","IssNo":"'. $isshno . '"})';
}
else
{
	echo '({"success":"false","IssNo":"' . $isshno . '"})';
	mysqli_rollback($conn);

            
            
}   
        
   
 
?>
