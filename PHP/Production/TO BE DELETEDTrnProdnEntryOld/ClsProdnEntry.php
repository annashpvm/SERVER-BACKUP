	<?php
	    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

	    $task='loadSupervisor';

	    if ( isset($_POST['task'])){
		$task = $_POST['task']; // Get this from Ext
	    }
		mysql_query("SET NAMES utf8");
	    switch($task){
			case "loadSupervisor":
			getSupervisor();
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
	   
	 function getSupervisor()
	    {
		mysql_query("SET NAMES utf8");
		$r=mysql_query("select * from mas_supervisor order by spvr_name");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }    
	   
	 function getPPNo()
	    {
		mysql_query("SET NAMES utf8");
		$compcode = $_POST['compcode'];
		$finid = $_POST['finid'];
		$r=mysql_query("select pp_advno from trn_prodplan_header where pp_comp_code = '$compcode' and pp_fincode = '$finid' and pp_qty > pp_rwprodn group by pp_advno
	");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	 function getPPVariety()
	    {
		mysql_query("SET NAMES utf8");
		$compcode = $_POST['compcode'];
		$finid = $_POST['finid'];
		$ppno  = $_POST['ppno'];
	$r=mysql_query("select var_desc,var_groupcode from trn_prodplan_trailer_varietywise a, masprd_variety b where pih_variety = var_groupcode and pih_comp_code = '$compcode ' and pih_fincode <=  '$finid' and pih_mcprodn < (pih_qty + (pih_qty*(pih_tolarance/100)))  and  pih_ppno = '$ppno'  group by var_desc,var_groupcode order by var_desc");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	 function getPPVarietyQty()
	    {
		mysql_query("SET NAMES utf8");
		$compcode = $_POST['compcode'];
		$finid    = $_POST['finid'];
		$ppno     = $_POST['ppno'];
		$variety  = $_POST['variety'];
	$r=mysql_query("select pih_qty,pih_qty-pih_mcprodn as balqty  from trn_prodplan_trailer_varietywise where  pih_comp_code = '$compcode' and pih_fincode <=  '$finid'  and  pih_ppno = '$ppno' and pih_variety = '$variety'");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }  

	   
	 function getDepartment()
	    {
		mysql_query("SET NAMES utf8");

		$r=mysql_query("select department_code,department_name from mas_department order by department_name");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
	
	 function getSection()
	    {
		mysql_query("SET NAMES utf8");

		$r=mysql_query("select * from mas_section order by section_name");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }
	 function getEquipment()
	    {
		mysql_query("SET NAMES utf8");

		$r=mysql_query("select *  from mas_equipment  order by equip_name");
		$nrow = mysql_num_rows($r);
		while($re = mysql_fetch_array($r))
		{
		$arr[]= $re ;
		}
			$jsonresult = JEncode($arr);
			echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
	    }

	?>
