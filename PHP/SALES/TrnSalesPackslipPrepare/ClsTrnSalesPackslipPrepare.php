
<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task="loadreelno";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadsalcustomer":
		getsalcustomer();
		break;    
		case "loadsaldelslip":
		getsaldelslip();
		break;
		case "loadsalessocno":
		getsalessocno();
		break;
		case "loadsalesdespadno":
		getsalesdespadno();
		break;
		case "loadsocdetails":
		getsocdetails();
		break;
		case "loadreelno":
		getreelno();
		break;
		case "loadsaladvice":
		getsaladvice();
		break;
		case "loadsaldata":
		getsaldata();
		break;		
		case "loadwarehousepackslipreelno":
		getwarehousepackslipreelno();
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
    
  function getsaladvice()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $reelno = $_POST['reelno'];
        $sizecode = $_POST['sizecode'];        


        $r=mysql_query("select * from trnsal_finish_stock , massal_variety  where stk_var_code = 43 and stk_var_code = var_code and  stk_sr_no = 21072630913201  and stk_comp_code = 1 ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
  function getsalcustomer()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $r=mysql_query("select * from massal_customer");
        $r=mysql_query("select cust_ref,cust_code from trnsal_desp_advice a , massal_customer b where da_cust = b.cust_code and da_fincode = $finid and (da_desqty - da_slipqty) > 0  and da_close <> 'Y' and da_comp_code = $compcode  group by cust_ref,cust_code order by cust_ref,cust_code");

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
   
  function getsocdetails()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $custno = $_POST['custno'];
        $socno = $_POST['socno'];
        $r=mysql_query("select ordh_dest,ordh_ackdate,var_name,d.var_code,var_desc,var_gsm,var_unit,var_size1,var_size2,da_desqty,da_slipqty from trnsal_order_header  a , trnsal_order_trailer b , trnsal_desp_advice c , massal_variety d , masprd_variety e where ordh_comp_code = ordt_comp_code and ordh_fincode   = ordt_fincode   and ordh_ackno     = ordt_ackno  and ordh_comp_code =  da_comp_code and ordh_fincode = da_fincode   and ordh_ackno =  da_ackno  and ordt_var_code  =  d.var_code and d.var_grpcode  =  e.var_code and ordt_var_code  =  c.da_var and ordh_comp_code = $compcode   and ordh_fincode = $finid  and ordh_ackno = $socno");
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


  function getreelno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $reelno = json_decode($_POST['reelno']); 
        $newreel = implode(",",$reelno);
       
      $dwldlen = count($reelno);

        for($i = 0; $i < $dwldlen; $i++) {
        
        if ( strlen($reelno[$i]) > 0) {
        //substr($reelno[$i],0,33);
        
        $reelstr = $reelstr . "'" . substr($reelno[$i],0,33) . "'" . ",";	
        }
        }
        
        $reelstr = substr($reelstr,0,-1);
//echo $reelstr;


        
	//$jk = "select stk_sr_no, stk_refno , stk_destag ,stk_var_code, stk_finyear from trnsal_finish_stock where stk_comp_code = 90 and stk_refno in ($reelstr)  and   stk_refno <> ''";
	
	//echo $jk;
        

        $r=mysql_query("select stk_sr_no, stk_refno , stk_destag ,stk_var_code , stk_finyear from trnsal_finish_stock where stk_comp_code = $compcode and left(stk_refno,33) in ($reelstr)  and   stk_refno <> ''");
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

function getwarehousepackslipreelno()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $reelno = $_POST['reelno'];
        $rb = $_POST['rb'];

        $r=mysql_query("");


        $r=mysql_query("select wpckt_fincode, wpckt_var, wpckt_sr_no,wpckt_wt,wpckt_srno_fincode from trnware_packslip_trailer where wpckt_fincode <= 21 and wpckt_comp_code = 1 and wpckt_sr_no in ($reelno)");

        
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

function getsaldata()
    {
        mysql_query("SET NAMES utf8");
        $compcode = $_POST['compcode'];
        $sizecode = $_POST['sizecode'];
        $stno = $_POST['stno'];
	$stnoqry = $_POST['stnoqry'];
	$itemcode = $_POST['itemcode'];
	$stfyr = $_POST['stfyr'];
	$edno = $_POST['edno'];
	$ssrno = $_POST['ssrno'];
	
	if ($stnoqry === "chk1") {

        $r=mysql_query("select * from trnsal_finish_stock where stk_destag <> 'T' and stk_deltag <> 'T'
                  	and stk_sr_no = $stno and stk_var_code = $itemcode
                  	and stk_units = 1
                  	and stk_comp_code = $compcode ");

        }
        else if ($stnoqry === "chk2") {
        
        $r=mysql_query("select var_name,stk_var_code,stk_units,var_desc,stk_sr_no,stk_wt,c.var_code from 
                   trnsal_finish_stock a, massal_variety b ,masprd_variety c
                   where a.stk_var_code = b.var_code And c.var_code = b.var_grpcode
                   and a.stk_var_code = $itemcode 
                   and a.stk_sr_no = $stno 
                   and a.stk_units = 1 
                   and a.stk_finyear = '$stfyr' 
                   and a.stk_comp_code = $compcode 
                   and a.stk_destag <> 'T' and a.stk_deltag <> 'T' group by stk_var_code,var_desc,stk_sr_no,stk_wt,var_name,stk_units,c.var_code order by stk_sr_no");        
        }
        else if ($stnoqry === "chk3") {
	$r=mysql_query("select stk_finyear,var_name,stk_var_code,var_desc,var_unit,stk_sr_no,stk_wt,c.var_code,stk_units from 
                 trnsal_finish_stock a, massal_variety b ,masprd_variety c
                 where a.stk_var_code = b.var_code And c.var_code = b.var_grpcode
                 and a.stk_var_code = $itemcode
                 and a.stk_sr_no in ($ssrno)
                 and a.stk_sr_no >= $stno
                 and a.stk_sr_no <= $edno
                 and a.stk_destag <> 'T' and a.stk_deltag <> 'T'
                 and a.stk_units = 1
                 and a.stk_comp_code = $compcode
                 group by stk_finyear,var_name,stk_var_code,var_desc,stk_sr_no,stk_wt,var_unit,c.var_code,stk_units order by stk_sr_no");

        }
        
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 

?>
