<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadFinyear';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
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
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
 function getFinyear()
    {
        mysqli_set_charset($conn, "utf8");

	
	$sql = "select * from mas_finyear");
	
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }  

	 function getVariety()
	    {
		mysqli_set_charset($conn, "utf8");
    	$sql = "select var_desc,var_groupcode from  masprd_variety  group by var_desc,var_groupcode order by var_desc");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



   function getSizeofVariety()
	    {
        mysqli_set_charset($conn, "utf8");
	$varty    = $_POST['varty'];
/* 	

	$sql = "select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,var_inchcm ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty'");
	$sql = "select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'N' then 'NAT' when var_shade = 'G' then 'GYT' when var_shade = 'D' then 'DP' when var_shade = 'Y' then 'SHYS' when var_shade = 'B' then 'GB'   else 'OTH' end) ) as sizecode from massal_variety ,masprd_variety where var_grpcode = var_groupcode and var_grpcode = '$varty' order by sizecode");
*/
	$sql = "select var_code, concat(cast(var_size2 as CHAR) ,space(2) ,(case when var_inchcm = 'I' then 'Inch' else 'CM' end),space(2) ,(case when var_shade = 'N' then 'NAT' when var_shade = 'G' then 'GYT' when var_shade = 'D' then 'DP' when var_shade = 'Y' then 'SHYS' when var_shade = 'B' then 'GB'   else 'OTH' end) ) as sizecode from trnsal_finish_stock , massal_variety where  stk_destag = '' and stk_var_code = var_code and  var_grpcode = '$varty'   group  by var_code, sizecode  order by sizecode");

		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getReelNos()
	    {
        mysqli_set_charset($conn, "utf8");
	$size     = $_POST['size'];
	$fincode  = $_POST['fincode']; 	
	$compcode = $_POST['compcode'];
	$stkopt   = $_POST['stkopt'];
        
        if ($stkopt == 1)
        {
	$sql = "select * from trnsal_finish_stock where stk_comp_code = $compcode  and stk_finyear <= $fincode  and stk_var_code = $size");
        }
        else
        {
	$sql = "select * from trnsal_finish_stock where stk_destag = '' and stk_comp_code = $compcode  and stk_finyear <= $fincode  and stk_var_code = $size");
        }
  
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNODetail()
	    {
        mysqli_set_charset($conn, "utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$sql = "select * from trnsal_finish_stock , trnsal_order_header ,massal_customer ,massal_variety   where   stk_var_code = var_code and stk_sono = ordh_sono and ordh_party = cust_code and stk_comp_code = $compcode and stk_finyear <= $fincode and  stk_sr_no = $reelno");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

   function getReelNODetail2()
	    {
        mysqli_set_charset($conn, "utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$sql = "select * from trnsal_finish_stock , trnsal_order_header ,massal_customer , trnsal_packslip_header  where pckh_comp_code = stk_comp_code and pckh_fincode   = stk_finyear and  pckh_no = stk_slipno and  stk_sono = ordh_sono and ordh_party = cust_code and stk_comp_code = $compcode and stk_finyear <= $fincode and  stk_sr_no = $reelno");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function getReelNODetail3()
	    {
        mysqli_set_charset($conn, "utf8");
	$reelno   = $_POST['reelno'];
        $compcode   = $_POST['compcode'];
	$fincode  = $_POST['fincode']; 	
	$sql = "select * from trnsal_finish_stock , trn_delivery_note ,massal_customer   where dn_comp_code = stk_comp_code and dn_fincode   = stk_finyear and  dn_no = stk_slipno and  dn_custcode = cust_code and stk_comp_code =  $compcode  and stk_finyear <= $fincode and  stk_sr_no = dn_sr_no and  stk_sr_no = $reelno");
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


?>
