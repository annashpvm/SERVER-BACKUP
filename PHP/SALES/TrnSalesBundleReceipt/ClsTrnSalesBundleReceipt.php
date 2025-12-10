<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){

		case "loadRecptNo":
		getRecptNo();
		break;

		case "loadReelRecptNo":
		getReelRecptNo();
		break;

		case "loadDCNoList":
		getDCNoList();
		break;
		case "loadReelDCNoList":
		getReelDCNoList();
		break;

		case "loadDCNosSizeList":
		getDCNoSizeList();
		break;
		case "loadDCNoWeight":
		getDCNOWeight();
		break;
		case "loadRecptNoEdit":
                getRecptNoEdit();
		break;


		case "loadReelRecptNoEdit":
                getReelRecptNoEdit();
		break;


		case "loadRecptNoDetails":
                getRecptNoDetails();
		break;


		case "loadReelRecptNoDetails":
                getReelRecptNoDetails();
		break;

		case "loadConverters":
		getConverters();
		break;

		case "loadCustomer":
		getCustomers();
		break;
		case "loadSONOList":
		getSONOList();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadsizeDetails":
		getsizeDetails();
		break;

		case "CheckNumber_finished":
		getNumber_finished();
		break;

		case "CheckBundleNumber":
		getBundleNumber();
		break;


		case "loadfindBundleNo":
	        getfindBundleNo();
		break;
		case "loadDCReelNoList":
	        getDCReelNoList();
		break;

		case "loadReelSONoList":
		getReelSONoList();
		break;

		case "loadSOsizes":
                getSOSizeDetails();
         	break;

		case "findReelNo":
                checkReelNo();
         	break;

		case "findReelNo2":
                checkReelNo2();
         	break;

		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    

 function getDCNoList()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$cuttercode = $_POST['cuttercode'];

//        $sql = "select dc_no from trn_delivery_challan a,  massal_customer b where  dc_cutter = cust_code and dc_fincode = $finid  and dc_comp_code = $compcode and   dc_cutter = $custcode  group by  dc_no order by dc_no desc";

//        $sql = "select dc_no,dc_seqno from trn_delivery_challan , trn_delivery_challan_sizewise where dc_seqno = dcs_seqno  and dc_cutter = $cuttercode and dc_fincode = $finid  and dc_comp_code = $compcode  group by  dc_no,dc_seqno  order by dc_no desc";

        $sql = "select dc_no,dc_seqno  from trn_delivery_challan , trn_delivery_challan_sizewise where dc_seqno = dcs_seqno  and dc_cutter = $cuttercode and dc_fincode = $finid and dc_comp_code = $compcode and (dcs_weight  - dcs_weight * 0.02) > dcs_receipt group by  dc_no,dc_seqno  order by dc_no desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getReelDCNoList()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$cuttercode = $_POST['cuttercode'];

        //$sql = "select dc_no from trn_delivery_challan a,  massal_customer b where  dc_cutter = cust_code and dc_fincode = $finid  and dc_comp_code = $compcode and   dc_cutter = $custcode  group by  dc_no order by dc_no desc";

        $sql = "select dc_no,dc_seqno from trn_delivery_challan , trn_delivery_challan_sizewise where dc_seqno = dcs_seqno  and dc_cutter = $cuttercode and dc_fincode = $finid  and dc_comp_code = $compcode and dc_type = 'R' group by  dc_no,dc_seqno  order by dc_no desc";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDCNoSizeList()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$cuttercode = $_POST['cuttercode'];
	$dcseqno       = $_POST['dcseqno'];

        $sql = "select dc_custcode,var_name,var_code from trn_delivery_challan , trn_delivery_challan_sizewise , massal_variety where dc_size = var_code and dc_seqno = dcs_seqno and dcs_receipt = 0 and dc_cutter = $cuttercode and dc_fincode = $finid  and dc_comp_code = $compcode  group by   dc_custcode,var_name,var_code order by var_name desc";

       // $sql = "select  dc_custcode,var_name,var_code  from trn_delivery_challan_reellist , trn_delivery_challan_sizewise , massal_variety where dc_size = var_code and dc_seqno = dcs_seqno and dcs_weight > (dcs_receipt + dcs_receipt/10) and dc_cutter = $cuttercode and dc_fincode = $finid  and dc_comp_code =  $compcode and dc_seqno = $dcno  group by   dc_custcode,var_name,var_code order by var_name desc"; 
 	$sql = "select   dc_custcode,var_name,var_code,dc_date  from trn_delivery_challan , trn_delivery_challan_sizewise , massal_variety where  dc_seqno = dcs_seqno and dcs_size = var_code and dc_comp_code = $compcode  and dc_fincode <= $finid  and dc_cutter =  $cuttercode and dcs_seqno = $dcseqno and dcs_Weight > dcs_receipt group by   dc_custcode,var_name,var_code,dc_date order by var_name desc";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getDCNOWeight()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$cuttercode = $_POST['cuttercode'];
	$seqno       = $_POST['seqno'];
	$sizecode   = $_POST['sizecode'];

//        $sql = "select  dc_custcode , sum(dc_wt) weight from trn_delivery_challan a,  massal_customer b where  dc_cutter = cust_code and dc_fincode =  $finid  and dc_comp_code = $compcode and dc_cutter  =  $custcode  and dc_no = $dcno group by dc_custcode";


//        $sql = "select   sum(dcs_weight-dcs_receipt) weight  from trn_delivery_challan_sizewise where dcs_size = $sizecode and dcs_seqno = $seqno  and dcs_weight > (dcs_receipt + dcs_receipt/10) ";

        $sql = "select   sum(dcs_weight-dcs_receipt) weight , ,var_size2   from trn_delivery_challan_sizewise , massal_variety where dcs_size = var_code and  dcs_size = $sizecode and dcs_seqno = $seqno  and dcs_weight > (dcs_receipt + dcs_receipt/10) ";

        $sql = "select   dcs_weight , dcs_receipt , sum(dcs_weight-dcs_receipt) weight ,var_size2   from trn_delivery_challan_sizewise , massal_variety where dcs_size = var_code and  dcs_size = $sizecode and dcs_seqno = $seqno  ";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getRecptNoEdit()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select br_no  from trnsal_bundle_receipt where br_fincode= $finid  and br_comp_code= $compcode  group by br_no  order by br_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getReelRecptNoEdit()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select dcrr_no as br_no  from trn_delivery_challan_reel_receipt where dcrr_fincode= $finid  and dcrr_comp_code= $compcode  group by dcrr_no  order by dcrr_no desc";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getConverters()
    {
        global $conn;  
	$despdt = $_POST['despdt'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$invtype = $_POST['invtype'];
        $entrychk = $_POST['entrychk'];

        $sql = "select cust_code,cust_ref from massal_customer a,trn_delivery_challan b where a.cust_code = b.dc_cutter and b.dc_fincode <= $fincode   and dc_comp_code = $compcode  group by cust_code,cust_ref order by cust_ref";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getCustomers()
    {
        global $conn;  

        $sql = "select cust_code,cust_ref from massal_customer order by cust_ref";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getSONOList()
    {
        global $conn;  

	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$custcode = $_POST['custcode'];
        $sql = "select ordh_sono from trnsal_order_header a, trnsal_order_trailer b,massal_customer c, massal_variety d where  a.ordh_party = c.cust_code and a.ordh_party = $custcode and a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode and  a.ordh_comp_code = b.ordt_comp_code and b.ordt_var_code = d.var_code and a.ordh_fincode <= $fincode  and a.ordh_comp_code = $compcode and var_unit = 2  group by ordh_sono";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsize()
    {
        global $conn;  
	$customer = $_POST['customer'];
	$fincode = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$sono = $_POST['sono'];


        $sql = "select var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate 
from trnsal_order_header a, trnsal_desp_advice b,massal_customer c, massal_variety d where b.da_no = $dano
and b.da_cust = c.cust_code and b.da_cust = $customer and a.ordh_sono = b.da_ackno and a.ordh_fincode <= b.da_fincode and b.da_ackno = $sono and a.ordh_comp_code = b.da_comp_code and b.da_var = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode group by var_code,var_name,da_date,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,da_urate";

        $sql = "select var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate 
from trnsal_order_header a, trnsal_order_trailer b,massal_customer c, massal_variety d where  a.ordh_party = c.cust_code and a.ordh_party = $customer and a.ordh_sono = b.ordt_sono and a.ordh_fincode = b.ordt_fincode and b.ordt_sono = $sono and a.ordh_comp_code = b.ordt_comp_code and b.ordt_var_code = d.var_code and a.ordh_fincode <= $fincode and a.ordh_comp_code = $compcode and var_unit =2 group by  var_code,var_name,ordh_sono,ordh_sodate,ordh_ref,ordh_refdt,cust_ref,ordh_rep,ordt_rate";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getsizeDetails()
    {
        global $conn;  
	$sizecode = $_POST['itemcode'];
        $sql = "select * from massal_variety , masprd_variety where var_grpcode = var_groupcode  and var_code = $sizecode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getRecptNo()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(br_no),0)+1 as recptno from trnsal_bundle_receipt where br_fincode= $finid  and br_comp_code= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getReelRecptNo()
    {
        global $conn;  
	$finid = $_POST['fincode'];
	$compcode = $_POST['compcode'];
        $sql = "select ifnull(max(dcrr_no),0)+1 as recptno from trn_delivery_challan_reel_receipt where dcrr_fincode= $finid  and dcrr_comp_code= $compcode";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getRecptNoDetails()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$recptno  = $_POST['recptno'];

        $sql = "select * from trnsal_bundle_receipt where br_fincode= $finid  and br_comp_code= $compcode and br_no = $recptno";

        $sql = "select * from trnsal_bundle_receipt a, trn_delivery_challan b , massal_variety c  where br_originalsize =  var_code and  br_comp_code = dc_comp_code and br_fincode = dc_fincode and br_comp_code = $compcode and br_fincode = $finid  and dc_seqno = br_dcno  and br_no =  $recptno";

        $sql = "select a.*,b.*,c.* ,d.var_name finishedsize  from trnsal_bundle_receipt a, trn_delivery_challan b , massal_variety c ,  massal_variety d where br_originalsize =  c.var_code and br_finishedsize =  d.var_code and   br_comp_code = dc_comp_code and br_fincode = dc_fincode and br_comp_code = $compcode and br_fincode = $finid  and dc_seqno = br_dcno  and br_no =  $recptno";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }




 function getReelRecptNoDetails()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$recptno  = $_POST['recptno'];

 



        $sql = "select t.*,dcsize.var_name dc_size1,finsize.var_name finsize1,cust.cust_ref from trn_delivery_challan_reel_receipt t, massal_variety dcsize,massal_variety finsize  , massal_customer cust
where t.dccr_dcsize = dcsize.var_code and t.dccr_newsize = finsize.var_code and  t.dcrr_cutter = cust.cust_code and dcrr_fincode= $finid and dcrr_comp_code= $compcode and dcrr_no =$recptno";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getNumber_finished()
    {
        global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];

        $sql = "select count(*) as nos, stk_ent_no,stk_ent_date from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no";


        $sql = "select count(*) as nos, stk_ent_no,stk_ent_date ,stk_sr_no from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_sr_no = $no";

        $sql = "select * from trnsal_finish_stock where stk_comp_code =$compcode and stk_finyear = $finid and stk_ent_no = 1000";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getBundleNumber()
    {
        global $conn;  
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$rbunit   = $_POST['rbunit'];
	$no       = $_POST['rbno'];

        $sql = "select br_sr_no,br_no,br_date from trnsal_bundle_receipt where br_comp_code =$compcode and br_fincode = $finid";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getfindBundleNo()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];

        $sql = "select ifnull(max(br_sr_no),0)+1 as bundleno from trnsal_bundle_receipt where br_fincode= $finid  and br_comp_code= $compcode";

    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getDCReelNoList()
    {
        global $conn;  
	$finid    = $_POST['fincode'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];
	$sizecode = $_POST['sizecode'];


        $sql = "select * from trn_delivery_challan h, trn_delivery_challan_reellist t where h.dc_seqno = t.dc_seqno and dc_comp_code = $compcode  and dc_fincode  = $finid   and h.dc_seqno =  $seqno and dc_size = $sizecode and dc_process ='N' order by dc_sr_no";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getReelSONoList()
    {
        global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$seqno    = $_POST['seqno'];
	$sizecode = $_POST['sizecode'];


        $sql = "select ordh_sono from trnsal_order_header, trnsal_order_trailer,massal_variety,masprd_variety where ordh_comp_code = ordt_comp_code and  ordh_fincode  = ordt_fincode and ordh_sono = ordt_sono and  ordt_var_code = var_code and var_grpcode = var_groupcode and    ordh_comp_code = $compcode  and  ordh_fincode >= $finid  and ordt_clo_stat = ''  group by ordh_sono order by ordh_sono desc";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


   function getSOSizeDetails()
	    {
        global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $sono     = $_POST['sono'];
	


	$sql = "select var_name,var_code from massal_variety ,trnsal_order_trailer where ordt_var_code = var_code and  ordt_comp_code = $compcode and ordt_sono = $sono and ordt_clo_stat = '' order by var_name";


		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }




   function checkReelNo()
	    {
        global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $reelno   = $_POST['reelno'];
	


	$sql = "select  count(*) as nos from  trnsal_finish_stock where stk_comp_code = $compcode and stk_sr_no =$reelno";


		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


   function checkReelNo2()
	    {
        global $conn;  
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $reelno   = $_POST['reelno'];
	


	$sql = "select  count(*) as nos from  trn_delivery_challan_reel_receipt where dcrr_comp_code = $compcode and dccr_newreelno =$reelno";


		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


?>
