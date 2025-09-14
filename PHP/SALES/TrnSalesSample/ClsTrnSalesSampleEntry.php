<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsalessocno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadentryno":
		getentryno();
		break;   
		case "loadDocNolist":
		getDocNolist();
		break; 
		case "loadDocNodetail":
		getDocNodetail();
		break;  

    		case "loadfinyear":
		getfinyear();
		break;

		case "loadsizedetails":
		getsizedetails();
		break;
		case "loadstockdetails":
		getstockdetails();
		break;
		case "loadsalesdespadno":
		getsalesdespadno();
		break;
		case "loadReelNoList":
		getReelNoList();
		break;
		case "loadReelDetail":
		getReelDetail();
		break;
	    	case "loadRollNo":
                getRollNo();
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

 function getfinyear()
    {
    	mysql_query("SET NAMES utf8");
//        $r=mysql_query("select fin_id,fin_year from fin_master where fin_flag='Y'");
        $r=mysql_query("select fin_code,fin_year from mas_finyear");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    




  function getentryno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $r=mysql_query("select IFNULL(max(rs_entno),0)+1 as no from trnsal_sample where  rs_compcode ='$compcode' and rs_finyear ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



  function getsizedetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select * from massal_customer");

    $r=mysql_query("select var_code,var_name from massal_variety a, trnsal_finish_stock b where a.var_code = b.stk_var_code and b.stk_destag <> 'T' and b.stk_deltag <> 'T' and stk_comp_code =   '$compcode' and stk_finyear = $finid group by var_code,var_name order by var_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function getsaldelslip()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select IFNULL(max(wpckh_no),0)+1 as wpckh_no from trnware_packslip_header where wpckh_comp_code ='$compcode' and wpckh_fincode ='$finid'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 
   
  function getstockdetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sizecode = $_POST['sizecode'];
        $r=mysql_query("select * from trnsal_finish_stock a, massal_variety b  where a.stk_var_code = b.var_code And a.stk_comp_code =$compcode and
 a.stk_finyear =   $finid  and a.stk_destag <> 'T' and a.stk_deltag <> 'T'and a.stk_var_code = $sizecode order by stk_sr_no  ");

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


  function getDocNolist()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$r=mysql_query("select rs_entno ent_no from trnsal_sample where  rs_compcode ='$compcode' and rs_finyear ='$finid' group by rs_entno ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getDocNodetail()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $docno = $_POST['docno'];

	$r=mysql_query("select a.* , b.var_code sizecode ,b.var_name  sizename ,c.* from  trnsal_sample a left join massal_variety b on  a.rs_sizecode = b.var_code left join massal_customer c on rs_customer = cust_code  where  rs_compcode =  $compcode and rs_finyear = '$finid' and rs_entno = '$docno'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
?>
