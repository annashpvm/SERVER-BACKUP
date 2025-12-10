	<?php
	    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	    $task='loadSupervisor';

	    if ( isset($_POST['task'])){
		$task = $_POST['task']; // Get this from Ext
	    }
		
		mysqli_set_charset($conn, "utf8");
	    switch($task){
			case "loadSupervisor":
			getSupervisor();
			break;
			case "loadShiftIncharge":
			getShiftIncharge();
			break;
			case "loadPPNo":
			getPPNo();
			break;
			case "loadPPVariety":
			getPPVariety();
			break;
			case "loadPPQuantity":
			getPPQuantity();
			break;
			case "loadPPVarietyQty":
			getPPVarietyQty();
			break;
			case "loadDepartment":
                        getDepartment();
			break;
			case "loadSection":
                        getSection();
			break;
			case "loadEquipment":
                        getEquipment();
			break;
			case "loadVariety":
			getVariety();
			break;
			case "loadProdVariety":
			getProdVariety();
			break;
			case "loadShiftDetails_1":
			getShiftDetails_1();
			break;
		       case "loadShiftDetails_2":
			getShiftDetails_2();
			break;
		       case "loadShiftDownTime":
			getShiftDownTime();
			break;
		       case "loadDataCheck":
			getDataCheck();
			break;
		       case "loadDAYUptoPreviousShiftData":
			getDAYUptoPreviousShiftData();
			break;
		       case "loadMONUptoPreviousShiftData":
			getMONUptoPreviousShiftData();
			break;
		case "loadShade":
		getShades();
		break;

			default:
			    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
			    break;
	    }
	    
    
		function JEncode($arr){
			$data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
			return $data;
		}
		
	   
	 function getSupervisor()
	    {
		
global $conn;
		$sql = "select * from mas_supervisor where spvr_type = 'S' order by spvr_name";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }    
	
	 function getShiftIncharge()
	    {
		
global $conn;
		$sql = "select * from mas_supervisor where spvr_type = 'M' order by spvr_name";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }    
	   
	 function getPPNo()
	    {
		
global $conn;
		$compcode = $_POST['compcode'];
		$finid = $_POST['finid'];
		$sql = "select pp_advno from trn_prodplan_header where pp_comp_code = '$compcode' and pp_fincode = '$finid' and pp_qty > pp_rwprodn group by pp_advno";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	 function getPPVariety()
	    {
		
global $conn;
		$compcode = $_POST['compcode'];
		$finid = $_POST['finid'];
		$ppno  = $_POST['ppno'];
	$sql = "select var_desc,var_groupcode from trn_prodplan_trailer_varietywise a, masprd_variety b where pih_variety = var_groupcode and pih_comp_code = '$compcode ' and pih_fincode <=  '$finid' and pih_mcprodn < (pih_qty + (pih_qty*(pih_tolarance/100)))  and  pih_ppno = '$ppno'  group by var_desc,var_groupcode order by var_desc";
	$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	 function getPPVarietyQty()
	    {
		
global $conn;
		$compcode = $_POST['compcode'];
		$finid    = $_POST['finid'];
		$ppno     = $_POST['ppno'];
		$variety  = $_POST['variety'];
	$sql = "select pih_qty,pih_qty-pih_mcprodn as balqty  from trn_prodplan_trailer_varietywise where  pih_comp_code = '$compcode' and pih_fincode <=  '$finid'  and  pih_ppno = '$ppno' and pih_variety = '$variety'";
	$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	   
	 function getDepartment()
	    {
		
global $conn;

		$sql = "select department_code,department_name from mas_department  where department_code in (1,2,3,4,17,7,16,10) order by department_name";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
	
	 function getSection()
	    {
		
global $conn;

		$sql = "select * from mas_section order by section_name";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
	 function getEquipment()
	    {
		
global $conn;

		$sql = "select *  from mas_equipment  order by equip_name";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

	 function getVariety()
	    {
		
global $conn;
    	$sql = "select var_desc,var_groupcode from  masprd_variety  group by var_desc,var_groupcode order by var_desc";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



	 function getProdVariety()
	    {
		$variety  = $_POST['varcodes'];

		
global $conn;
    	$sql = "select var_desc,var_groupcode from  masprd_variety  where var_groupcode in $variety group by var_desc,var_groupcode order by var_desc";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


	 function getShiftDetails_1()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift1   = $_POST['shift1'];
		$edate    = $_POST['edate'];

		
global $conn;
    	$sql = "select * from trn_dayprod_header a, trn_dayprod_roll_details b , masprd_variety c where prd_variety = var_groupcode and prdh_compcode =  prd_compcode  and prdh_fincode =  prd_fincode  and prdh_id = prd_seqno and  prdh_compcode = '$compcode' and prdh_fincode = '$finid' and prdh_Date = '$edate' and prd_shift = '$shift1' order by   prd_rollno";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


	 function getShiftDetails_2()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift1   = $_POST['shift1'];
		$edate    = $_POST['edate'];
		
global $conn;
    	$sql = "select * from trn_dayprod_header a, trn_dayprod_roll_variety_details b , masprd_variety c where prdh_id = prdv_seqno and prdv_varty = var_groupcode and prdh_compcode = '$compcode'  and prdh_fincode = '$finid' and prdh_Date = '$edate' and prdh_shift = '$shift1' order by prdv_rollno";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


	 function getShiftDownTime()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift1   = $_POST['shift1'];
		$edate    = $_POST['edate'];
		
global $conn;
    	$sql = "select * from  trn_dayprod_header,trn_dayprod_downtime , masprd_variety,mas_department, mas_section , mas_equipment where prdh_id = prds_id and prdh_compcode = $compcode and prdh_fincode = $finid  and prdh_Date = '$edate' and prdh_shift = '$shift1' and prds_qlycode = var_groupcode and   prds_section = section_code and prds_equipment = equip_code and prds_dept =  department_code";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }




	 function getDataCheck()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];
		
global $conn;

    	$sql = "select count(*) as nos from trn_dayprod_header  where prdh_compcode = $compcode and prdh_fincode = $finid and prdh_date = '$edate'  and prdh_shift = '$shift'";

		$r = mysqli_query($conn, $sql);

		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


	 function getDAYUptoPreviousShiftData()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];
		
global $conn;

                if ($shift == 'A')
                   $sql = "select sum(prd_rollwt) mcprod, sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid  and prd_date = '$edate'  and prd_shift = 'ABC'";
                else if ($shift == 'B')
                   $sql = "select sum(prd_rollwt) mcprod,sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid  and prd_date = '$edate'  and prd_shift = 'A'";
                else if ($shift == 'C')
                   $sql = "select sum(prd_rollwt) mcprod,sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid  and prd_date = '$edate'  and prd_shift  in('A','B')";

				   $r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

	 function getMONUptoPreviousShiftData()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];
		$sdate    = $_POST['sdate'];

		
global $conn;

                if ($shift == 'A')
                   $sql = "select sum(prd_rollwt) mcprod, sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid  and prd_date >= '$sdate' and prd_date < '$edate'";
                else if ($shift == 'B')
                   $sql = "select sum(prd_rollwt) mcprod,sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid   and prd_date >= '$sdate' and prd_date < '$edate' or (prd_date = '$edate'  and  prd_shift = 'A') ";
                else if ($shift == 'C')
                   $sql = "select sum(prd_rollwt) mcprod,sum(prd_runmins) runmins , sum(prd_breaks) breaks , sum(prd_breakmins) breakmins from trn_dayprod_roll_details  where prd_compcode = $compcode and prd_fincode = $finid  and prd_date >= '$sdate' and prd_date < '$edate'  or (prd_date = '$edate'  and  prd_shift  in ('A','B')) ";
         
				   $r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }


 function getShades()
    {
        
global $conn;
        $sql = "select  * from massal_shade order by shade_code";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);

    }

	?>
