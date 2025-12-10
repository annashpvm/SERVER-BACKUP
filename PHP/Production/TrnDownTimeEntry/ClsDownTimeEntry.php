	<?php
	    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	    $task='loadSupervisor';

	    if ( isset($_POST['task'])){
		$task = $_POST['task']; // Get this from Ext
	    }
		mysqli_set_charset($conn, "utf8");

		switch($task){

		       case "loadVarietyList":
			getVarietyList();
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
		       case "loadShiftDownTime":
			getShiftDownTime();
			break;

		       case "loadProdnDataCheck":
			getProdnDataCheck();
			break;
			default:
			    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
			    break;
	    }
	    
    
		function JEncode($arr){
			$data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
			return $data;
		}
		


	 function getVarietyList()
	    {
			
global $conn;
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];

    	$sql = "select var_desc,var_groupcode,prd_seqno from trn_dayprod_roll_details , masprd_variety
where prd_variety = var_groupcode and prd_compcode =  $compcode and prd_fincode = $finid and prd_date = '$edate'  and prd_shift = '$shift' group by var_desc,var_groupcode,prd_seqno";

//echo $sql;

$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		$arr = [];

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
		$arr = [];

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
		$arr = [];

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
		$arr = [];
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



	 function getShiftDownTime()
	    {
			
global $conn;
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift1   = $_POST['shift1'];
		$edate    = $_POST['edate'];
		$arr = [];
    	$sql = "select * , DATE_FORMAT(prds_starttime, '%d-%m-%Y %H:%i:00') as starttime  , DATE_FORMAT(prds_endtime, '%d-%m-%Y %H:%i:00') as endtime  from  trn_dayprod_header,trn_dayprod_downtime , masprd_variety,mas_department, mas_section  where prdh_id = prds_id and prdh_compcode = prds_compcode and prdh_fincode = prds_fincode and prdh_compcode = $compcode and prdh_fincode = $finid  and prdh_date = '$edate' and prdh_shift = '$shift1' and prds_qlycode = var_groupcode and   prds_section = section_code and prds_dept =  department_code order by prds_slno";
		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);

		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



	 function getProdnDataCheck()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];

		global $conn;

    	$sql = "select count(*) as nos from trn_dayprod_header  where prdh_compcode = $compcode and prdh_fincode = $finid and prdh_date = '$edate'  and prdh_shift = '$shift'";

//    	$sql = "select count(*) as nos from  trn_dayprod_header,trn_dayprod_downtime where prdh_id = prds_id and prdh_compcode = prds_compcode and prdh_fincode = prds_fincode  and prdh_compcode = $compcode and prdh_fincode = $finid and prdh_date =  '$edate' and prdh_shift = '$shift' ");

//echo $sql;
$arr = [];
       $r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

	 function getDownDataCheck()
	    {
		$finid    = $_POST['finid'];
		$compcode = $_POST['compcode'];
		$shift    = $_POST['shift1'];
		$edate    = $_POST['edate'];

		global $conn;

//    	$sql = "select count(*) as nos from trn_dayprod_header  where prdh_compcode = $compcode and prdh_fincode = $finid and prdh_date = '$edate'  and prdh_shift = '$shift'");

    	$sql = "select count(*) as nos from  trn_dayprod_header,trn_dayprod_downtime where prdh_id = prds_id and prdh_compcode = prds_compcode and prdh_fincode = prds_fincode  and prdh_compcode = $compcode and prdh_fincode = $finid and prdh_date =  '$edate' and prdh_shift = '$shift' ";

		$r = mysqli_query($conn, $sql);
		$nrow = mysqli_num_rows($r);
		$arr = [];
		while($re = mysqli_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }



	?>
