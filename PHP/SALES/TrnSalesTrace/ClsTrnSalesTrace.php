<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadpackslipdet';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadpackslipdet":
		getpackslipdetail();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "loadnodetail":
		getnodetail();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadsrno":
		getstartno();
		break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getpackslipdetail()
    {
        mysqli_set_charset($conn, "utf8");

	mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$no = $_POST['no'];
        $slipno = $_POST['slip'];

$sql = "select * from trnsal_packslip_header a ,trnsal_packslip_trailer b , massal_customer c where pckh_comp_code = pckt_comp_code and pckh_fincode = pckt_fincode and pckh_no = pckt_no and pckh_party = cust_code and pckh_comp_code = $compcode and pckh_fincode = $fincode and pckt_sr_no = $slipno");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getcustomer()
    {
        mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sql = "select cust_ref,cust_code,invh_paytag from trnsal_invoice_header a,massal_customer b, trnsal_packslip_header c, trnsal_packslip_trailer d where a.invh_party = b.cust_code and a.invh_paytag <> 'T' and a.invh_fincode = $fincode and a.invh_no = c.pckh_invno And a.invh_date = c.pckh_invdt and c.pckh_no = d.pckt_no and c.pckh_fincode =  d.pckt_fincode and d.pckt_rettag <> 'T' and a.invh_comp_code = d.pckt_comp_code and a.invh_comp_code = $compcode group by cust_code,cust_ref,invh_paytag");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getnodetail()
	{
	mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$no = $_POST['no'];
        $rbunit = $_POST['rbunit'];
        $sql = "select var_desc,var_name,var_unit,var_size1,var_size2,stk_var_code,stk_sr_no,stk_wt,stk_ent_no,stk_ent_date,stk_slipno,stk_desdt,stk_destag , stk_retno,stk_retdt,stk_rettag,stk_deltag,stk_deldate from trnsal_finish_stock a, massal_variety b, masprd_variety c where b.var_grpcode = c.var_code and  stk_var_code =  b.var_code and stk_finyear =  $fincode  and stk_comp_code = $compcode  and stk_units =$rbunit and stk_sr_no =  $no");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsize()
{
mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$stkopt = $_POST['stkopt'];

       if ($stkopt == "ALL")
       {
            $sql = "select var_code,var_name from massal_variety a, trnsal_finish_stock b where a.var_code = b.stk_var_code and stk_comp_code =$compcode  and stk_finyear = $fincode group by var_code,var_name order by var_name");
       }
       else
       {
            $sql = "select var_code,var_name from massal_variety a, trnsal_finish_stock b where a.var_code = b.stk_var_code and stk_comp_code = $compcode and stk_finyear = $fincode and (stk_destag <> 'T') and stk_deltag <> 'T' group by var_code,var_name order by var_name");
       } 
       $nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getstartno()
{
mysqli_set_charset($conn, "utf8");
	$fincode = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$stkopt = $_POST['stkopt'];
	$stksize = $_POST['stksize'];
        $size  = $_POST['size']; 

       if ($stkopt == "ALL") 
       {
               if ($stksize == "ALL")
               {
                    $sql = "select stk_units,case when stk_units  = 1 then stk_sr_no  end  as reelno , case when stk_units  = 2 then stk_sr_no  end  as bundleno   from trnsal_finish_stock where stk_comp_code =$compcode  and stk_finyear = $fincode ");
               }
               else
               {
                    $sql = "select stk_units, case when stk_units  = 1 then stk_sr_no  end  as reelno , case when stk_units  = 2 then stk_sr_no  end  as bundleno   from trnsal_finish_stock where stk_comp_code =$compcode  and stk_finyear = $fincode and stk_var_code
 = $size");
               }
      }
      else
      {
            if ($stksize == "ALL")
            {
                 $sql = "select stk_units, case when stk_units  = 1 then stk_sr_no  end  as reelno , case when stk_units  = 2 then stk_sr_no  end  as bundleno   from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $fincode and (stk_destag <> 'T') and stk_deltag <> 'T' ");
            }
            else
            {
                 $sql = "select stk_units, case when stk_units  = 1 then stk_sr_no  end  as reelno , case when stk_units  = 2 then stk_sr_no  end  as bundleno   from trnsal_finish_stock where stk_comp_code = $compcode and stk_finyear = $fincode and (stk_destag <> 'T') and stk_deltag <> 'T'  and stk_var_code = $size");
            }
 
       } 

     
$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}




?>
