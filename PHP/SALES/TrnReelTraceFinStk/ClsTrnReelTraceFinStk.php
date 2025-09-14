<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinyear';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
    		case "loadFinyear":
		getFinyear();
		break;
    		case "loadVariety":
		getVariety();
		break;
		case "loadSizeofVariety":
		    getSizeofVariety();
		    break;
		case "loadReelNos":
		    getReelNos();
		    break;
		case "loadReelNODetail":
		    getReelNODetail();
		    break;
		case "loadReelNODetail2":
		    getReelNODetail2();
		    break;
		case "loadReelNODetail3":
		    getReelNODetail3();
		    break;
		case "loadReelNODetail4":
		    getReelNODetail4();
		    break;
		case "loadSalesReturn":
		    getSalesReturn();
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
    
 function getFinyear()
    {
        mysql_query("SET NAMES utf8");

	
	$r=mysql_query("select * from mas_finyear");
	
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
    	$r=mysql_query("select var_desc,var_groupcode from  masprd_variety  group by var_desc,var_groupcode order by var_desc");
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
/* 	

	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,var_inchcm ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty'");
	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'N' then 'NAT' when var_shade = 'G' then 'GYT' when var_shade = 'D' then 'DP' when var_shade = 'Y' then 'SHYS' when var_shade = 'B' then 'GB'   else 'OTH' end) ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty' order by sizecode");
*/
	$r=mysql_query("select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'NS' then 'NAT' when var_shade = 'GY' then 'GYT' when var_shade = 'DP' then 'DP' when var_shade = 'SY' then 'SHYS' when var_shade = 'GB' then 'GB' when var_shade = 'BB' then 'BB' when var_shade = 'VV' then 'SHVV+'   else 'OTH' end) ) as sizecode from trnsal_finish_stock , massal_variety where  stk_destag = '' and stk_var_code = var_code and  var_grpcode = '$varty'   group  by var_code, sizecode  order by sizecode");

		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getReelNos()
	    {
        mysql_query("SET NAMES utf8");
	$size     = $_POST['size'];
	$fincode  = $_POST['fincode']; 	
	$compcode = $_POST['compcode'];
	$stkopt   = $_POST['stkopt'];
	$findwt   = $_POST['fweight'];
        
        if ($stkopt == 1)
        {
	$r=mysql_query("select * from trnsal_finish_stock where stk_comp_code = $compcode  and stk_finyear <= $fincode  and stk_var_code = $size");
        }
        else if ($stkopt == 2)
        {
	$r=mysql_query("select * from trnsal_finish_stock where stk_destag = '' and stk_comp_code = $compcode  and stk_finyear <= $fincode  and stk_var_code = $size");
        }
        else
        {
	$r=mysql_query("select * from trnsal_finish_stock where stk_destag = '' and stk_comp_code = $compcode  and stk_finyear <= $fincode  and stk_wt = $findwt");
        }

  
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNODetail()
	    {
        mysql_query("SET NAMES utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$r=mysql_query("select * from trnsal_finish_stock , trnsal_order_header ,massal_customer ,massal_variety   where   stk_var_code = var_code and stk_sono = ordh_sono and ordh_party = cust_code and stk_comp_code = $compcode and stk_finyear <= $fincode and  stk_sr_no = $reelno");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getReelNODetail2()
	    {
        mysql_query("SET NAMES utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$r=mysql_query("select * from trnsal_finish_stock , trnsal_order_header ,massal_customer , trnsal_packslip_header  where pckh_comp_code = stk_comp_code and pckh_fincode   = stk_finyear and  pckh_no = stk_slipno and  stk_sono = ordh_sono and ordh_party = cust_code and stk_comp_code = $compcode and stk_finyear <= $fincode and  stk_sr_no = $reelno");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNODetail3()
	    {
        mysql_query("SET NAMES utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$r=mysql_query("select * from trnsal_finish_stock , trn_delivery_note ,massal_customer   where dn_comp_code = stk_comp_code and dn_date   = stk_desdt and  dn_no = stk_slipno and  dn_custcode = cust_code and stk_comp_code =  $compcode  and stk_finyear <= $fincode and  stk_sr_no = dn_sr_no and  stk_sr_no = $reelno");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNODetail4()
	    {
        mysql_query("SET NAMES utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$r=mysql_query("select a.*,b.*,d.* from trnsal_finish_stock a, trn_delivery_challan b,trn_delivery_challan_reellist c,massal_customer d  where b.dc_seqno = c.dc_seqno and dc_comp_code = stk_comp_code and dc_fincode   = stk_finyear and  dc_no = stk_slipno and  dc_custcode = cust_code and stk_comp_code = $compcode and stk_finyear <= $fincode  and  stk_sr_no = dc_sr_no and  stk_sr_no = $reelno");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getSalesReturn()
	    {
        mysql_query("SET NAMES utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	

        $r = mysql_query("select * from trnsal_salret_header , trnsal_salret_trailer where reth_comp_code = rett_comp_code and reth_fincode =  rett_fincode and reth_no = rett_no and reth_comp_code = $compcode and reth_fincode =  $fincode and rett_sr_no = $reelno");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

?>
