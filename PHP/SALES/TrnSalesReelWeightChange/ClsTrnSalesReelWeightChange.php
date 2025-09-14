<?php

    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadReelNoList';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadentryno":
		getentryno();
		break;    
		case "loadReelNoList":
		getReelNoList();
		break;
		case "loadReelDetail":
		getReelDetail();
		break;
		case "loadsalesdespadno":
		getsalesdespadno();
		break;
		case "loadAllVariety":
		    getAllVariety();
		    break;
		case "loadSONoList":
		getSONoList();
		break;
		case "loadSOsizes":
		    getSOSizeDetails();
         	break;

	    	case "loadRollNo":
                getRollNo();
		 break;	
		case "loadEditReelNos":
		    getReelNumbers_ofthe_Roll();
         	break;

		case "loadFinYear":
		    getFinYear();
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
    
  function getentryno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(ent_no),0)+1 as no from trnsal_reelweight_change where  comp_code ='$compcode' and fin_code ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getReelNoList()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $rollno   = (int)$_POST['rollno'];
        $month    = (int)$_POST['mon'];
        $yr    = (int)$_POST['yr'];
        if ($month > 0)
        {
        $r=mysql_query("select stk_sr_no , stk_finyear from trnsal_finish_stock WHERE   stk_comp_code = $compcode and stk_finyear = $finid and  length(stk_sr_no) = 10 and  SUBSTR(stk_sr_no,6,3)  = $rollno and  SUBSTR(stk_sr_no,3,2)  =  $month and  SUBSTR(stk_sr_no,1,2)  = '$yr' and stk_destag = ''  order by stk_sr_no");
//        $r=mysql_query("select  stk_sr_no , stk_finyear from trnsal_finish_stock WHERE   stk_comp_code = $compcode and stk_finyear = $finid and  length(stk_sr_no) = 10 and  SUBSTR(stk_sr_no,6,3)  = $rollno and  SUBSTR(stk_sr_no,3,2)  =  $month ");
         }   
        else
         {
        $r=mysql_query("select  stk_sr_no , stk_finyear from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear <= '$finid' and stk_destag = ''  order by stk_sr_no");
         }

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




  function getReelDetail()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $reelno   = $_POST['reelno'];

	$r=mysql_query("select * from trnsal_finish_stock a ,massal_variety b,masprd_variety c where stk_comp_code = $compcode and stk_destag = ''  and stk_sr_no = $reelno and stk_var_code = b.var_code and b.var_grpcode = c.var_groupcode");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
  function getsalessocno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $custno = $_POST['custno'];
        $r=mysql_query("select da_ackno from trnsal_desp_advice a , massal_customer b where da_cust = b.cust_code and da_fincode = '$finid' and (da_desqty - da_slipqty) > 0  and da_close <> 'Y' and da_comp_code = '$compcode' and cust_code = '$custno' group by  da_ackno  ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
  function getsalesdespadno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $custno = $_POST['custno'];
        $socno = $_POST['socno'];
        $r=mysql_query("select da_no,da_date from trnsal_desp_advice a , massal_customer b where da_cust = b.cust_code and da_fincode = '$finid' and (da_desqty - da_slipqty) > 0  and da_close <> 'Y' and da_comp_code = '$compcode' and cust_code = '$custno' and da_ackno = '$socno' group by da_no,da_date ");
        
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

 function getSONoList()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $varietycode = $_POST['varty'];


        $r=mysql_query("select ordh_sono from trnsal_order_header where ordh_fincode = $finid  and ordh_comp_code= $compcode group by ordh_sono  order by ordh_sono desc");
      $r=mysql_query("select ordh_sono from trnsal_order_header, trnsal_order_trailer,massal_variety,masprd_variety where ordh_comp_code = ordt_comp_code and  ordh_fincode  = ordt_fincode and ordh_sono = ordt_sono and  ordt_var_code = var_code and var_grpcode = var_groupcode and    ordh_comp_code = $compcode  and  ordh_fincode <= $finid and var_grpcode = $varietycode group by ordh_sono order by ordh_sono desc");
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

	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'NS' then 'NAT' when var_shade = 'GY' then 'GYT' when var_shade = 'DP' then 'DP' when var_shade = 'SY' then 'SHYS' when var_shade = 'GB' then 'GB' when var_shade = 'VV' then 'SHVV++' when var_shade = 'BB' then 'BB' else 'OTH' end) ) as sizecode from massal_variety ,trnsal_order_trailer , masprd_variety where  var_grpcode = var_groupcode and var_grpcode = $varietycode and ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono order by sizecode");


//	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end) ) as sizecode from massal_variety ,trnsal_order_trailer , masprd_variety where  var_grpcode = var_groupcode and var_grpcode = $varietycode and ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono order by sizecode");
	

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


   function getFinYear()
	    {
        mysql_query("SET NAMES utf8");
	
        $r=mysql_query("select * from mas_finyear order by fin_code desc");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

?>

