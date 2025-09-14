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
$vounolist   = $_POST['vounolist'];



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
   if ($isstype == "IS")  
   {     
//        $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock + iss_qty where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'IS' and iss_no = $isshno ";

        $query2= "update maspur_item_trailer , (select iss_comp_code, iss_fin_code , iss_item_code , sum(iss_qty) as iss_qty from  trnpur_item_issues where iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'IS' and iss_no = $isshno  group by iss_comp_code, iss_fin_code , iss_item_code ) a1 set item_stock = item_stock + iss_qty  where  iss_comp_code = item_comp_code and  iss_fin_code = item_fin_code and iss_item_code = item_code";

	$result2=mysql_query($query2);  
    
   }
   else
   {     
  //      $query2= "update trnpur_item_issues , maspur_item_trailer set item_stock = item_stock - iss_qty where iss_comp_code = item_comp_code and  iss_fin_code = item_fin_Code and iss_item_code = item_code and iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'IR' and iss_no = $isshno";

        $query2= "update maspur_item_trailer , (select iss_comp_code, iss_fin_code , iss_item_code , sum(iss_qty) as iss_qty from  trnpur_item_issues where iss_comp_code = $isscompcode and iss_fin_code = $issfincode and iss_type = 'IR' and iss_no = $isshno  group by iss_comp_code, iss_fin_code , iss_item_code ) a1 set item_stock = item_stock - iss_qty  where  iss_comp_code = item_comp_code and  iss_fin_code = item_fin_code and iss_item_code = item_code";

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

    if ($griddet[$i]['issqty'] > 0 ) {
	$sno = $i + 1;

	$isscostcode = '1';


	$issitemcode = $griddet[$i]['itemcode'];
	$issqty      = $griddet[$i]['issqty'];
	$issval      = $griddet[$i]['issval'];

	$issrate     = $griddet[$i]['rate'];
	$isscrstatus = $griddet[$i]['isscrstatus'];
	$isscatcode  = $griddet[$i]['cat'];

	$issslno = $sno;

	$issmachine = $griddet[$i]['machine'];
	$isssection = $griddet[$i]['sectioncode'];
	$issequip   = $griddet[$i]['equipcode'];
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


	$query2= "insert into trnpur_item_issues values ('$isscompcode','$issfincode','$isstype','$isshno','$issdate',  '$dept','$issmachine','$isssection','$issequip','$issslno' , '$issitemcode','$issqty' ,'$issrate','$issval',curdate() , '$rev_cap','$vounolist')";


	$result2=mysql_query($query2);   
//echo $query2;   
//echo "<br>";


	$query3= "insert into trnpur_item_rec_iss values('$isscompcode','$issfincode','$isstype','$isshno','$issdate', '$issslno','$issitemcode', '$issqty', '$issrate',0)";

	 $result3=mysql_query($query3);       

//echo $query3;   
//echo "<br>";


        if ($isstype == "IS")
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock - $issqty  , item_liss_date = '$issdate' where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_code =$issfincode";
	$result4=mysql_query($query4);      

//echo $query2;   
//echo "<br>";

        }       
        else
        {
        $query4= "update maspur_item_trailer set item_stock = item_stock + $issqty   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_code =$issfincode";
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
