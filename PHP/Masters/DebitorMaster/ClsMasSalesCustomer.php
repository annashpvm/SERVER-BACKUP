<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadsalcustlist';

	$task = $_POST['task'] ?? 'loadsalcustlist';

	mysqli_set_charset($conn, "utf8");
    switch($task){
		case "loadsalcustlist":
		getsalcustomer();
		break;    
		case "loadCustomerDetails":
		getCustomerDetails();
		break;  

		case "loadCustomerLogs":
		getCustomerLogs();
		break;
  
		case "loadsalledgerlist":
		getsalledger();
		break;
		case "loadsalesstate":
		getsalesstate();
		break;
		case "loadsalescountry":
		getsalescountry();
		break;	
		case "loadsalestax":
		getsalestax();
		break;	
		case "loadsalesagent":
		getsalesagent();
		break;	
		case "loadsalesrepr":
		getsalesrepr();
		break;		
		case "loadsalespartygrp":
		getsalespartygrp();
		break;	
		case "loadsalesagentgrp":
		getsalesagentgrp();
		break;							
		case "loadbatch":
		getbatch();
		break;
		case "LoadItem":
		getitem();
		break;
		case "loadlot":
		getlotdet();
		break;
		case "loadlotitem":
		getlotitemdet();
		break;
		case "loadDealer":
		getDealer();
		break;
		case "findRepCode":
		getRepCode();
		break;
		case "Loadaccountsgroup":
		getaccountsgroup();
		break;
		case "loadAreaList":
		getAreaList();
		break;

	      case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;

		default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
  function getsalcustomer()
    {
		global $conn;  

        $sql = "select * from (select a1.*,b1.cust_ref cust_group   from (select  a.* , c.usr_name ,repr_accgrp , e.* from massal_customer a , userMaster c ,massal_repr d , massal_area e where cust_area =  e.area_code and a.cust_repr = d.repr_code  and   a.createdby = c.usr_code order by a.cust_ref)a1 left join  massal_customer b1 on  b1.cust_type = 'C'  and a1.cust_partygroup = b1.cust_code)aa1 left join acc_group_master on cust_acc_group = grp_code";


		$r = mysqli_query($conn, $sql);

		$arr = [];
		while ($re = mysqli_fetch_assoc($r)) {
			$arr[] = $re;
		}
	
		echo json_encode(["total" => count($arr), "results" => $arr]);

    }

  function getCustomerDetails()
    {
		global $conn;  

	$custcode = $_POST['custcode'];
       $sql= "select  a.* , b.cust_ref cust_group , c.usr_name  from massal_customer a,massal_customer b , userMaster c where a.cust_partygroup = b.cust_code and   a.createdby = c.usr_code and a.cust_code = $custcode";
	   $r = mysqli_query($conn, $sql);
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getCustomerLogs()
    {
		global $conn;  
	   $custcode = $_POST['custcode'];
       $sql= "select  a.* , b.cust_ref cust_group , c.usr_name  from massal_customer_logs a,massal_customer b , userMaster c where a.cust_partygroup = b.cust_code and   a.createdby = c.usr_code and a.cust_code = $custcode";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }


  function getsalledger()
    {
		global $conn;  
	$ledcode = $_POST['ledcode'];
	$cusled = $_POST['cusled'];
	if ($cusled == 'Y') {
		$sql= "select * from massal_customer where cust_code = '$ledcode'";
	}
	else {
	       $sql= "select * from massal_customer";// where led_code = '$ledcode'";
	}	       
	$r = mysqli_query($conn, $sql);       
	$arr = [];
	while ($re = mysqli_fetch_assoc($r)) {
		$arr[] = $re;
	}

	echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
  function getsalesstate()
    {
		global $conn;  

       $sql= "select * from mas_state";

	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
   
   
  function getsalescountry()
    {
		global $conn;  

       $sql= "select * from mas_country";

	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

   
  function getsalestax()
    {
		global $conn;  

       $sql= "select * from massal_tax where tax_code > 2";

	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 

  function getsalesagent()
    {
		global $conn;  

       $sql= "select * from vew_sal_agent";

	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
  function getsalesrepr()
    {
		global $conn;  

       $sql= "select * from massal_repr where repr_active = 'Y'";

	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 
  function getsalespartygrp()
    {
		global $conn;  

       $sql= "select cust_group , cust_partygroup from (
select   b.cust_ref cust_group  , b.cust_partygroup from massal_customer a,massal_customer b where a.cust_type = 'C' and a.cust_partygroup = b.cust_code 
union all
select   cust_ref cust_group  , cust_code cust_partygroup from massal_customer where cust_type = 'C' ) a group by cust_group , cust_partygroup
 order by cust_group";
 $r = mysqli_query($conn, $sql);

 $arr = [];
 while ($re = mysqli_fetch_assoc($r)) {
	 $arr[] = $re;
 }

 echo json_encode(["total" => count($arr), "results" => $arr]);
    }
  
 
  function getsalesagentgrp()
    {
		global $conn;  

       $sql= "select * from massal_customer order by cust_name";
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
	$compcode = $_POST['compcode'];
	$fincode = $_POST['fincode'];
       $sql= "call sprm_sel_item_details_new ('$compcode','$fincode') ";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotitemdet()
    {
		global $conn;  
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
	$lotcode = $_POST['lotcode'];
       $sql= "call sprm_sel_itemlotdetails($compcode,$finid,$itemcode,$lotcode)";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }

function getlotdet()
    {
		global $conn;  
	$compcode = $_POST['compcode'];
	$itemcode = $_POST['itemcode'];
	$finid = $_POST['finid'];
       $sql= "call sprm_sel_itemlotdetails1($compcode,$itemcode)";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getDealer()
    {
		global $conn;  

       $sql= "select * from mas_dealer order by dealer_name" ;
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }
 function getRepCode()
    {
		global $conn;  
	    $repcode = $_POST['repcode'];
       $sql= "select * from massal_repr where repr_code = $repcode";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getAreaList()
    {
		global $conn;  
	$sql= "select area_code,area_name from massal_area where area_code > 0 order by area_name";
    $r = mysqli_query($conn, $sql);

    $arr = [];
    while ($re = mysqli_fetch_assoc($r)) {
        $arr[] = $re;
    }

    echo json_encode(["total" => count($arr), "results" => $arr]);
    }

	
 function getaccountsgroup()
 {
        global $conn;  
       $sql= "select grp_code,grp_name from acc_group_master where grp_parent_code in (24,51) order by grp_name";
	   $r = mysqli_query($conn, $sql);

	   $arr = [];
	   while ($re = mysqli_fetch_assoc($r)) {
		   $arr[] = $re;
	   }
   
	   echo json_encode(["total" => count($arr), "results" => $arr]);
    }

 function getSearchLedgerlist()
    {
		global $conn;  

        $ledgertype = strtoupper($_POST['ledgertype']);

        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 

      if ($ledgertype == 'C')

      $sql = "select * from massal_customer where left(cust_name,2) != 'zz' and  cust_type = 'C' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";
      else
      $sql = "select * from massal_customer where left(cust_name,2) != 'zz' and replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";



        $sql= "select * from (select a1.*,b1.cust_ref cust_group   from (select  a.* , c.usr_name ,repr_accgrp , e.* from massal_customer a , userMaster c ,massal_repr d , massal_area e where cust_area =  e.area_code and a.cust_repr = d.repr_code  and   a.createdby = c.usr_code order by a.cust_ref)a1 left join  massal_customer b1 on  b1.cust_type = 'C'  and a1.cust_partygroup = b1.cust_code)aa1 left join acc_group_master on cust_acc_group = grp_code where cust_type = 'C' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";

//echo $sql;
//echo "<br>";


$r = mysqli_query($conn, $sql);

$arr = [];
while ($re = mysqli_fetch_assoc($r)) {
	$arr[] = $re;
}

echo json_encode(["total" => count($arr), "results" => $arr]);
    } 

?>
