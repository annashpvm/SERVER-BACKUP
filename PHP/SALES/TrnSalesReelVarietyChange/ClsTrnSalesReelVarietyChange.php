<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadentryno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadentryno":
		getentryno();
		break;    
		case "loadSizeDetails":
		getSizeList();
		break;
		case "loadReelNoDetails":
		getReelNoList();
		break;
		case "loadentrynolist":
		getentrynolist();
		break;
		case "loadentrynodetails":
		getentrynodetails();
		break;

		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    


  function getentryno()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
	$sql = "select IFNULL(max(ent_no),0)+1 as no from trn_sal_variety_change where  comp_code ='$compcode' and fin_code ='$finid'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

  function getentrynolist()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

$sql = "select ent_no from trn_sal_variety_change where  comp_code ='$compcode' and fin_code ='$finid' group by ent_no  order by ent_no desc");


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getentrynodetails()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $docno = $_POST['docno'];
	$sql = "select b.var_name as old_name,old_itemcode as old_code,srno as number,c.var_name as new_name ,new_itemcode as new_code,weight,ent_date from trn_sal_variety_change a ,massal_variety b,massal_variety c where comp_code= '$compcode' and fin_code= '$finid'  and a.old_itemcode=b.var_code and a.new_itemcode=c.var_code and ent_no = $docno order by number");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
   
 function getSizeList()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $sql = "select var_name,var_code  from trnsal_finish_stock a, massal_variety b where stk_var_code = var_code and  stk_comp_code = '$compcode'  and stk_finyear ='$finid' and (stk_destag = '' or stk_rettag = 'T') group by var_name,var_code  order by var_name,var_code");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	

 function getReelNoList()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sizecode = $_POST['sizecode'];

        $sql = "select * from trnsal_finish_stock where stk_var_code = '$sizecode' and stk_comp_code = '$compcode' and stk_finyear = '$finid' and (stk_destag <> 'T' or (stk_destag <> 'T'  and stk_rettag = 'T')) and stk_deltag <> 'T'");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }	
 


?>
