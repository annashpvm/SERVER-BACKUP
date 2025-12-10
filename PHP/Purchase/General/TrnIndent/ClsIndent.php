<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task="loadindno";

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");


    switch($task){
		case "loaddept":
		getdept();
		break;
		case "loadItemStock":
		getItemStock();
		break;
		case "loaditem":
		getitem();
		break;
		case "loadappno":
		getappno();
		break;
		case "loadsection":
		getsection();
		break;
		case "loadequipment":
		getequipment();
		break;
		case "loadindno":
		getindno();
		break;
		case "loadIndentBalAmt":
		getindBalAmt();
               	break;
		case "loadindentdetails":
		getindentdetails();
               	break;
		case "loadSearchitemlist":
		getSearchitemlist();
		break;
		case "loadIndNoList":
		getIndNolist();
		break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
   
 function getdept()
    {
        global $conn;  
        $sql = "call sp_sel_dept_new()";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getItemStock()
    {
        global $conn;  
	$item = $_POST['itemcode'];
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];



        $sql = "select a.item_code,item_avg_rate,uom_short_name,b.item_stock  from maspur_item_header a, maspur_item_trailer b, mas_uom c where uom_code = a.item_uom and a.item_code = b.item_code and  b.item_comp_code =$compcode and b.item_fin_code =$finid  and  a.item_code = $item";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }
	
	
 function getitem()
    {
        global $conn;  

	$finid = $_POST['finid'];


//        $sql = "select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_stock > 0 and item_comp_code in (1,3,5,8) and item_fin_Code = '$finid'  group by item_name,a.item_Code order by item_name";
//        $sql = "select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_stock > 0 and item_comp_code in (1,3,5,8) and item_fin_Code = '$finid'  group by item_name,a.item_Code order by item_name";

        $sql = "select item_name,a.item_code from maspur_item_header a, maspur_item_trailer b where a.item_code = b.item_code and item_comp_code in (1,3,5,8) and b.item_fin_Code = $finid AND a.item_code <> 5443 group by item_name,a.item_Code order by item_name";

        $sql = "select item_name,item_code from maspur_item_header group by item_name,item_Code order by item_name";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


 function getappno()
    {
        global $conn;  
        $sql = "select app_code,app_name from maspur_approval where app_name >= 'A' order by app_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getsection()
    {
        global $conn;  

//	$compcode = $_POST['compcode'];
//	$finid = $_POST['finid'];
//	$dept = $_POST['dept'];
//
//      $machine =  $_POST['machine'];

        $sql = "select section_name,section_code from trn_expenses_budget , mas_bud_section , mas_department WHERE te_compcode = $compcode and te_fincode = $finid and te_section = section_code  and te_dept = department_code and department_linkcode = '$dept'  and te_machine = '$machine' group by section_name,section_code order by section_name,section_code";

        $sql = "select section_name,section_code from mas_section group by section_name,section_code  order by section_name";



    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getequipment()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$machine = $_POST['machine'];
	$section = $_POST['section'];
	$dept = $_POST['dept'];


        $sql = "select equip_name,equip_code from mas_department a,mas_dept b , trn_expenses_budget c ,mas_equipment d where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section = '$section'  and te_equip = equip_code and te_compcode = '$compcode' and te_fincode =  $finid and te_approved = 'Y' and te_machine = '$machine' group by equip_name,equip_code";


        $sql = "select equip_name,equip_code from  mas_equipment where equip_section = '$section' order by equip_name,equip_code";

        $sql = "select equip_name,equip_code from  mas_equipment order by equip_name,equip_code";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


function getindBalAmt()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$machine = $_POST['machine'];
	$section = $_POST['section'];
	$dept = $_POST['dept'];
	$equip = $_POST['equip'];
 
           
//      $sql = "select sum(te_amount) as budamt  from mas_department a,mas_dept b , trn_expenses_budget c where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section =  '$section'  and te_equip = '$equip' and te_compcode = 1 and te_fincode = 20  and te_machine = '$machine'";


      $sql = "select bud - ind_amt as budamt from (select sum(te_amount)*100000 as bud  from mas_department a,mas_dept b , trn_expenses_budget c where a.department_linkcode = b.dept_code and a.department_Code  = c.te_dept and  a.department_linkcode =  b.dept_Code and a.department_linkcode = '$dept' and te_section =  '$section'  and te_equip = '$equip' and te_compcode = $compcode and te_fincode =$finid  and te_machine = '$machine') a , ( select  COALESCE(sum(ind_value),0) as  ind_amt from mas_department a,mas_dept b , trnpur_indent c where a.department_linkcode = b.dept_code and b.dept_Code  = c.ind_dept_code and b.dept_code  = '$dept' and ind_projgrp = '$section'  and ind_equip = '$equip'  and ind_comp_code =$compcode and ind_fin_code = $finid and ind_cancel_status = '' and ind_purtype = 'G' and ind_plant = '$machine') b";


	$nrow = mysqli_num_rows($r);
	while($re = mysqli_fetch_array($r))
	{
	$arr[]= $re ;
        }
        $jsonresult = JEncode($arr);
	echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



function getindno()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
        $sql = "select ifnull(max(ind_no),0)+1 as ind_no from trnpur_indent where ind_comp_code= '$compcode' and ind_fin_code= '$finid'";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 


function getindentdetails()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$indno = $_POST['indno'];

        $sql = "call sppur_sel_indent_details ($compcode,$finid,$indno)";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }



 function getSearchitemlist()
    {
        global $conn;  

	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $item     = $_POST['item'];


        $item = trim(str_replace(" ", "", $item)); 
        $item = trim(str_replace(".", "", $item));


        if ($item == '')   
           $sql = "select * from maspur_item_header  order by item_name";
        else
           $sql = "select * from maspur_item_header where replace(replace(item_name,' ','')  ,'.','') like '%$item%' order by item_name";         
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getIndNolist()
    {
        global $conn;  
	$compcode = $_POST['compcode'];
	$finid = $_POST['finid'];
	$dept =  (int) $_POST['dept'];
        if ($dept == 0)
        $sql = "select ind_no from trnpur_indent where ind_fin_code = '$finid' and ind_comp_code = '$compcode'   group by ind_no  order by ind_no desc";
        else
        $sql = "select ind_no from trnpur_indent where ind_dept_code = $dept and ind_fin_code = '$finid' and ind_comp_code = '$compcode'   group by ind_no  order by ind_no desc";


    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

?>
