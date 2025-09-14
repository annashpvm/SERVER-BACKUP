	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadReelWeight';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadReelWeight":
		getReelWeight();
		break;
		case "loadSONoList":
		getSONoList();
		break;
		case "loadSOCustomer":
		getSOCustomer();
		break;
		case "loadReelNumberDetail":
		getReelNumberDetail();
		break;
		case "loadAllCustomer":
		getAllCustomer();
		break;
	    	case "loadRollNo":
                getRollNo();
		 break;	
	    	case "loadRollNo_Edit":
                getRollNo_Edit();
		 break;	
		case "loadVariety":
		    getVariety();
		    break;
		case "loadVarietyDetails":
		    getVarietyDetails();
		    break;
		case "loadSizeofVariety":
		    getSizeofVariety();
		    break;
		case "loadTempReelNo":
		    getTempReelNo();
         	break;
		case "loadEditReelNos":
		    getReelNumbers_ofthe_Roll();
         	break;
		case "loadFinishedDetails":
		    getFinishedDetails();
         	break;
		case "loadSOsizes":
		    getSOSizeDetails();
         	break;
		case "loadAllVariety":
		    getAllVariety();
		    break;
		case "loadChangedVarietyDetails":
		    getChangedVarietyDetails();
		    break;
		case "loadSizeDetails":
		    getSizeDetails();
		    break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   
 function getReelWeight()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select r_reelno from trn_dayprod_rewinder order by r_reelno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
 function getSONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $varietycode = $_POST['varty'];


        $r=mysql_query("select ordh_sono from trnsal_order_header where ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
      $r=mysql_query("select ordh_sono from trnsal_order_header, trnsal_order_trailer,massal_variety,masprd_variety where ordh_comp_code = ordt_comp_code and  ordh_fincode  = ordt_fincode and ordh_sono = ordt_sono and  ordt_var_code = var_code and var_grpcode = var_groupcode and    ordh_comp_code = $compcode  and  ordh_fincode = $finid and var_grpcode = $varietycode group by ordh_sono order by ordh_sono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getSOCustomer()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
        $r=mysql_query("select cust_ref,cust_code from trnsal_order_header , massal_customer where ordh_party = cust_code and ordh_fincode = $finid   and ordh_comp_code= $compcode  and ordh_sono =  $sono ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

    function getAllCustomer()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select cust_ref,cust_code from massal_customer order by cust_ref ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getReelNumberDetail()
    {

	$reelno    = $_POST['reelno'];

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];

        mysql_query("SET NAMES utf8");


        $r=mysql_query("select * , concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ,space(2) ,(case when var_shade = 'N' then 'NAT' when var_shade = 'G' then 'GYT' when var_shade = 'D' then 'DP' when var_shade = 'Y' then 'SHYS' when var_shade = 'B' then 'GB'   else 'OTH' end)  ) as sizecode from trnsal_finish_stock , massal_variety ,trnsal_order_header,massal_customer where   stk_comp_code = $compcode and stk_finyear = $finid and stk_comp_code = ordh_comp_code and stk_finyear = ordh_fincode and stk_sono = ordh_sono and  ordh_party = cust_code and stk_var_code  = var_code and stk_sr_no = '$reelno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }	




 function getRollNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
	
$r=mysql_query("select prd_rollno  from trn_dayprod_roll_details where prd_compcode = '$compcode' and prd_fincode = '$finid'  and month(prd_date) = '$mon' and year(prd_date)= '$yr' and prd_roll_status = 'A'  group by prd_rollno  order by prd_rollno desc");


//	$r=mysql_query("select prd_rollno from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode = '$compcode' and prd_fincode = '$finid'  and prd_date = '$rdate' and prd_roll_status = 'A' group by prd_rollno  order by prd_rollno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   


 function getRollNo_Edit()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
	
$r=mysql_query("select prd_rollno  from trn_dayprod_roll_details where prd_compcode = '$compcode' and prd_fincode = '$finid'  and month(prd_date) = '$mon' and year(prd_date)= '$yr' and prd_roll_status = 'P'  group by prd_rollno  order by prd_rollno desc");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   

   function getVariety()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
        $opt      = $_POST['opt']; 
if ($opt  == 1)
{
$r=mysql_query("select prd_date ,prd_shift,prd_seqno,var_desc,var_groupcode,prd_rollwt,prd_finprod,prd_rollno from trn_dayprod_roll_details, masprd_variety where prd_compcode = '$compcode' and prd_fincode = '$finid'  and prd_rollno = $rollno and prd_variety = var_groupcode  and month(prd_date) = '$mon' and year(prd_date)= '$yr' group by prd_date,prd_shift,prd_seqno,var_desc,var_groupcode,prd_rollwt,prd_finprod,prd_rollno order by var_desc,var_groupcode");
}	
else
{
$r=mysql_query("select var_desc,var_groupcode from masprd_variety order by var_desc,var_groupcode");
}

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getAllVariety()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
        $opt      = $_POST['opt']; 
        $r=mysql_query("select var_desc,var_groupcode from masprd_variety order by var_desc,var_groupcode");


		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



   function getVarietyDetails()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
	$varty    = $_POST['varty'];
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 


//	$r=mysql_query("select var_bf,var_gsm,prd_deckle,prd_breaks,prd_roll_dia,prdv_qty,prdv_sets , prd_seqno from trn_dayprod_roll_details a, trn_dayprod_roll_variety_details , masprd_variety where prd_seqno = prdv_seqno and prd_rollno = prdv_rollno and prd_compcode ='$compcode' and prd_fincode =  '$finid' and prd_rollno = $rollno and prd_date = ' $rdate' and prd_roll_status = 'A' and prdv_varty = var_groupcode  and prdv_varty = '$varty' ");


	$r=mysql_query("select var_bf,var_gsm,prd_deckle,prd_breaks,prd_roll_dia,prd_rollwt,prd_set , prd_seqno from trn_dayprod_roll_details , masprd_variety where   prd_compcode = '$compcode' and prd_fincode ='$finid' and prd_rollno = '$rollno'  and month(prd_date) = '$mon' and year (prd_date)= '$yr'  and prd_roll_status = 'A' and prd_variety = var_groupcode  and prd_variety = '$varty'");

	$r=mysql_query("select var_bf,var_gsm,prd_deckle,prd_breaks,prd_roll_dia,prd_rollwt,prd_set , prd_seqno from trn_dayprod_roll_details , masprd_variety where   prd_compcode = '$compcode' and prd_fincode ='$finid' and prd_rollno = '$rollno'  and month(prd_date) = '$mon' and year (prd_date)= '$yr'  and prd_variety = var_groupcode  and prd_variety = '$varty'");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getSizeofVariety()
	    {
        mysql_query("SET NAMES utf8");
	$varty    = $_POST['varty'];

 	
//	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,var_inchcm ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty'");

	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty' order by sizecode ");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getTempReelNo()
	    {
        mysql_query("SET NAMES utf8");
	$fno    = $_POST['fno'];
	$sno    = $_POST['sno'];
        $i = $fno;
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];



    $query1   = "delete from tmp_reelno";
    $result=mysql_query($query1); 


for ($i ; $i < $sno+1; $i++)
{
    $query1   = "insert into tmp_reelno values($i)";
    $result=mysql_query($query1); 
}
 	
	$r=mysql_query("select * from tmp_reelno where reelno not in (select stk_sr_no from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $finid)");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNumbers_ofthe_Roll()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
	
        $r=mysql_query("select stk_sr_no as reelno from trnsal_finish_stock WHERE  stk_comp_code = $compcode and stk_finyear = $finid and  length(stk_sr_no) = 10 and  SUBSTR(stk_sr_no,6,3)  = $rollno and month(stk_ent_date) = '$mon' and year (stk_ent_date)= '$yr' ");

	
        $r=mysql_query("select stk_sr_no as reelno from trnsal_finish_stock WHERE   stk_comp_code = $compcode and stk_finyear = $finid and  length(stk_sr_no) = 10 and  SUBSTR(stk_sr_no,6,3)  = $rollno and  SUBSTR(stk_sr_no,3,2)  = '$mon' and  SUBSTR(stk_sr_no,1,2)  = '$yr' ");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getFinishedDetails()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rollno   = $_POST['rollno']; 
        $mon      = $_POST['mon']; 
        $yr       = $_POST['yr']; 
	
	$r=mysql_query("select  var_grpcode,sum(stk_wt)/1000 as wt from trnsal_finish_stock , massal_variety where stk_comp_code = $compcode and stk_finyear = $finid and stk_var_code = var_code and SUBSTR(stk_sr_no,6,3)  = '$rollno' and SUBSTR(stk_sr_no,1,2)  = '$yr' and  SUBSTR(stk_sr_no,3,2) = '$mon' group by var_grpcode");

	

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
	

   function getSOSizeDetails()
	    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
        $varietycode     = $_POST['varietycode'];
	
	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ) as sizecode from massal_variety ,trnsal_order_trailer where  var_grpcode = $varietycode and var_code = ordt_var_code and ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono order by sizecode");

	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'N' then 'NAT' when var_shade = 'G' then 'GYT' when var_shade = 'D' then 'DP' when var_shade = 'Y' then 'SHYS' when var_shade = 'B' then 'GB'   else 'OTH' end) ) as sizecode from massal_variety ,trnsal_order_trailer , masprd_variety where  var_grpcode = var_groupcode and var_grpcode = $varietycode and ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono order by sizecode");


//	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ) as sizecode from massal_variety ,trnsal_order_trailer , masprd_variety where  var_grpcode = var_groupcode and var_grpcode = $varietycode and ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono order by sizecode");
	

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getChangedVarietyDetails()
	    {
        mysql_query("SET NAMES utf8");
	$varty    = $_POST['varty'];

	$r=mysql_query("select var_bf,var_gsm from masprd_variety where var_groupcode = '$varty'");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getSizeDetails()
	    {
        mysql_query("SET NAMES utf8");
	$size    = $_POST['size'];
	$r=mysql_query("select * from massal_variety where var_code = '$size'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



?>
