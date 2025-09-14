<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");


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
$indcompcode = $_POST['indcompcode'];


$isstype2 = "R";
if ($isstype == "IS")
{
 $isstype2 = "I";
}
else
{
 $isstype2 = "R";
}

mysql_query("BEGIN");

if ($savetype == "Add") 
{
   $query1 = "select IFNULL(max(iss_no),0)+1 as issh_no from trnpur_item_issues where iss_fin_code = '$issfincode' and iss_comp_code= '$isscompcode' and iss_type = '$isstype2'";
   $result1= mysql_query($query1);
   $rec2   = mysql_fetch_array($result1);
   $isshno  =$rec2['issh_no'];
}

else
{
    for ($i=0;$i<$rowcnt;$i++)
    {
	$issindfincode = $griddet[$i]['fincode'];
	$issitemcode = $griddet[$i]['itemcode'];
	$issqty      = $griddet[$i]['issqty'];
	$oldqty      = $griddet[$i]['oldqty'];
	$issindno = $griddet[$i]['indent'];

        if ($isstype2 == "I")
        {
        $query2= "update maspur_item_trailer set item_stock = item_stock + $oldqty   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result2=mysql_query($query2);      

        $query3= "update trnpur_indent set ind_iss_qty = ind_iss_qty  -	 $oldqty ,ind_bal_qty = ind_bal_qty +  $oldqty  where Ind_no = $issindno  AND ind_comp_code = $indcompcode and ind_fin_code = $issindfincode and ind_item_code = $issitemcode ";
	$result3=mysql_query($query3);    

        }       
        else
        {
        $query2= "update maspur_item_trailer set item_stock = item_stock - $oldqty   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result2=mysql_query($query2);      

        $query3= "update trnpur_indent set ind_iss_qty = ind_iss_qty  + $oldqty ,ind_bal_qty = ind_bal_qty -  $oldqty  where Ind_no = $issindno  AND ind_comp_code = $indcompcode and ind_fin_code = $issindfincode and ind_item_code = $issitemcode ";
	$result3=mysql_query($query3);    

        }       

   }

   $query3 = "delete from trnpur_item_issues where iss_comp_code = '$isscompcode' and iss_no = $isshno and iss_fin_code = '$issfincode' and iss_type = '$isstype2'";
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

	$issindfincode = $griddet[$i]['fincode'];

	$issitemcode = $griddet[$i]['itemcode'];
	$issqty      = $griddet[$i]['issqty'];
	$issrate     = $griddet[$i]['rate'];
	$isscrstatus = $griddet[$i]['isscrstatus'];
	$isscatcode  = $griddet[$i]['cat'];
	$isscrstatus = $griddet[$i]['crstat'];

	$issslno = $sno;

	$issfor = $griddet[$i]['variety'];
	$issindno = $griddet[$i]['indent'];
	$issunit = $griddet[$i]['others'];


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

	$issvariety = "";
	if ($isscrstatus  == "NP")
	{
	 $issvariety = "N";
	}
	else
	{
	 $issvariety = "O";
	}


	$catcode = "4";
	switch($isscatcode){
		case "Capital":
		     $catcode = "2";
		     break;
		case "Spares":
		     $catcode = "3";
		     break;
		case "CONSUMABLES":
		     $catcode = "4";
		     break;
	}




	$query4= "insert into trnpur_item_issues values('$isscompcode' ,'$isstype2' ,'$isshno' ,'$issdate' ,'$issfincode' ,'$dept' ,'$isscostcode' ,  '$issitemcode' ,'$issqty' ,'$issrate' ,'$catcode' ,'$issunit' ,'$issentdate' ,'$rev_cap' ,'$issslno' ,'$issvariety' ,'$issindno' ,'$isscompcode','$issmachine' ,
'$isssection' ,'$issequip' ,'$cancelflag')";

	$result4=mysql_query($query4);      

	$query5= "insert into trnpur_item_rec_iss values('$isscompcode','$isstype','$isshno','$issdate','$issfincode', '$issitemcode', '$issqty', '$issrate','1','$issentdate','$cancelflag')";

	 $result5=mysql_query($query5);       


        if ($isstype2 == "I")
        {
        $query2= "update maspur_item_trailer set item_stock = item_stock - $issqty  where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result2=mysql_query($query2);      

        $query3= "update trnpur_indent set ind_iss_qty = ind_iss_qty  +	 $issqty ,ind_bal_qty = ind_bal_qty -  $issqty  where Ind_no = $issindno  AND ind_comp_code = $isscompcode and ind_fin_code = $issindfincode and ind_item_code = $issitemcode";
	$result3=mysql_query($query3);    

        }       
        else
        {
        $query2= "update maspur_item_trailer set item_stock = item_stock + $issqty   where item_code = $issitemcode and item_comp_code = $isscompcode  and item_fin_Code =$issfincode";
	$result2=mysql_query($query2);      

        $query3= "update trnpur_indent set ind_iss_qty = ind_iss_qty  - $issqty,ind_bal_qty = ind_bal_qty + $issqty  where Ind_no = $issindno  AND ind_comp_code = $isscompcode and ind_fin_code = $issindfincode and ind_item_code = $issitemcode ";
	$result3=mysql_query($query3);    

        }       

    } //END IF
  
}



if($result4 && $result5)
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
