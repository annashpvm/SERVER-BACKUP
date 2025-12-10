<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsalessocno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysqli_set_charset($conn, "utf8");
    switch($task){
    		case "loadfinyear":
		getfinyear();
		break;
		case "loadentryno":
		getentryno();
		break;    
		case "loadsizedetails":
		getsizedetails();
		break;
		case "loadstockdetails":
		getstockdetails();
		break;
		case "loadentrynolist":
		getentrynolist();
		break;
		case "loadeditentryno":
		geteditentryno();
		break;
		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }

 function getfinyear()
    {
    	mysqli_set_charset($conn, "utf8");
//        $sql = "select fin_id,fin_year from fin_master where fin_flag='Y'");
        $sql = "select fin_code,fin_year from mas_finyear");
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    




  function getentryno()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sql = "select IFNULL(max(tr_entno),0)+1 as tr_entno from trnsal_whouse_stock_remove where  tr_compcode ='$compcode' and tr_finyear ='$finid'");	
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



  function getsizedetails()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];

        $sql = "select * from massal_customer");

    $sql = "select var_code,var_name from massal_variety a, trnsal_finish_stock b where a.var_code = b.stk_var_code and b.stk_destag <> 'T' and b.stk_deltag <> 'T' and stk_comp_code =   '$compcode' and stk_finyear = $finid group by var_code,var_name order by var_name");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

  function geteditentryno()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid    = $_POST['finid'];
        $docno    = $_POST['docno'];

        $sql = "select * from trnsal_whouse_stock_remove a,massal_variety b where a.tr_varcode=b.var_code and tr_compcode = $compcode 
and tr_finyear =  $finid  and tr_entno = $docno");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
  function getstockdetails()
    {
        mysqli_set_charset($conn, "utf8");
        $compcode = $_POST['compcode'];
        $finid = $_POST['finid'];
        $sizecode = $_POST['sizecode'];
        $sql = "select * from trnsal_finish_stock a, massal_variety b  where a.stk_var_code = b.var_code And a.stk_comp_code =$compcode and
 a.stk_finyear =   $finid  and a.stk_destag <> 'T' and a.stk_deltag <> 'T'and a.stk_var_code = $sizecode order by stk_sr_no  ");

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
        $finid    = $_POST['finid'];

        $sql = "select tr_entno from trnsal_whouse_stock_remove where  tr_compcode = $compcode and tr_finyear =  $finid group by tr_entno order by tr_entno desc");

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
   

?>
