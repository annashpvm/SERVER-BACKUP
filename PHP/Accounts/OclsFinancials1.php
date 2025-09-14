
<?php

require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

    $task='yarncust';
    if ( isset($_POST['task'])){
    $task = $_POST['task'];   // Get this from Ext
    }
    switch($task){
       case "cmbfinyear":              // Give the entire list
          getFinyear();
          break;
        case "company":
            getcompany();
          break;
        case "currency":
            getcurrency();
          break;
      case "currentdate":              // Give the entire list
          getCurrentdate();
          break;
      case "dnload":
            getDNNO();
            break;
      case "cnload":
            getcn();
            break;
      case "cnno":
            getCNNO();
            break;
      case "ledger":
            getledger();
            break;
      case "cmbFinYear":              // Give the entire list
          getFinYear();
          break;
      case "cmbvou":              // Give the entire list
          getvoucher();
          break;
      case "acdetails":              // Give the entire list
          getLedgerDetails();
          break;
      case "drgroup":              // Give the entire list
          getDrgroup();
          break;
      case "paytrnacdetails":              // Give the entire list
          getPaymenttranDetails();
          break;
        case "bank":              // Give the entire list
          getbank();
          break;
       case "month":              // Give the entire list
          getmonth();
          break;
       case "yarncust":              // Give the entire list
          getyarncust();
          break;
       case "yarninvno":              // Give the entire list
          getyarninvno();
          break;     
      

        default:
          echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
          break;
    }




   function getyarncust()
    {
     $query = "select yarn_cust_code,yarn_cust_name from yarn_customer_master ";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }

     function getmonth()
    {
//        $query = "SELECT led_code,led_name  from acc_ledger_mater where led_comp_code = 1 and led_code in(26835, 26836,17194,18150)";
     $query = "SELECT month_code,month_name  from month_master ";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }


 function getbank()
    {
//        $query = "SELECT led_code,led_name  from acc_ledger_mater where led_comp_code = 1 and led_code in(26835, 26836,17194,18150)";
     $query = "SELECT bank_seqno,bank_name  from acc_bank_master ";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }


 function getyarninvno()
    {
 $query = "select yarn_sales_no,fin_year, 'GY' 'sale_type' from  
yarn_sales_header, fin_master where
fin_id = Yarn_Sales_finid 
and  Yarn_Sales_finid= '$finid' and Yarn_Sales_Accref_Seqno = 0
and Yarn_Sales_Cust_Code = '$custcode'
union
select yarn_rewind_sales_no, fin_year, 'RY' 'sale_type' From
yarn_rewind_sales_header yrsh, fin_master Where
fin_id = yarn_rewind_sales_finid 
and yarn_rewind_sales_finid = '$finid' and yarn_rewind_sales_accref_seqno = 0
and yarn_rewind_sales_cust_code = '$custcode'
union
select yarn_waste_sales_no,fin_year, 'WY' 'sale_type' from  
yarn_waste_sales_header ywsh, fin_master Where fin_id = yarn_waste_sales_finid 
and yarn_waste_sales_finid = '$finid' and yarn_waste_sales_accref_seqno = 0 
and yarn_waste_sales_cust_code = '$custcode'";    
       $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }

 function getledger()
    {
        $query = "SELECT led_code,led_name  from acc_ledger_master where led_comp_code = 1 and led_code in(26835, 26836,17194,18150)";
    // $query = "SELECT led_code,led_name  from acc_ledger_master where led_comp_code = 1";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }



  function getDrgroup()
    {
        $query = "select grp_code,grp_name from acc_group_master where grp_code in (61,133,134,135,136,137,138,140,141,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,150,151,152,153,44,45,61,62,63,148,181,185,191,210,211,212,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,133,134,135,136,137,138,140,141,150,151,152,153,183) and grp_comp_code = 1 order by grp_name ";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }



      function getLedgerDetails()
    {
       $acrefseqno =   896072;
    //$acrefseqno = $_POST['refseqno'];
	$query = "select
                        acctran_accref_seqno as refno,
                        acctran_serialno as sno,
                        acctran_led_code as ledcode,
                        acctran_dbamt as db,
                        acctran_cramt as cr,
                        acctran_totamt as tamt,
                        acctran_cur_code as curcode,
                        acctran_cur_amt as curamt,
                        acctran_exch_rate as exrate,
                        acctran_pass_no as pass,
                        acctran_paytype as ptype,
                        led_name as ledname
        from     acc_ref,acc_tran,
                acc_ledger_master
    where    accref_seqno        =    acctran_accref_seqno and
        acctran_accref_seqno     = " . $acrefseqno . " and
        acctran_led_code     =     acc_ledger_master.led_code and
        accref_comp_code    =               acc_ledger_master.led_comp_code
    order by  acctran_serialno";
        $sql = $query;
	$arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query);
            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
            $arr[] = $obj;
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';
        }
    }

 


   function getPaymenttranDetails()
    {

    //$acrefseqno = $_POST['refseqno'];
	$query = "  select     distinct acc_recpay_tran.*,
        acc_tran.acctran_led_code,
        acc_tran.acctran_dbamt,
        acc_tran.acctran_cramt,
        acc_tran.acctran_totamt,
        acc_ref.accref_vou_type,
        acc_ref.accref_vouno,
        acc_trail.acctrail_inv_value,
        acc_trail.acctrail_adj_value,
        accref_seqno
    from     acc_ref,
        acc_tran,
        acc_trail,
        acc_recpay_tran
    where     acc_ref.accref_seqno             =     acc_tran.acctran_accref_seqno and
        acc_tran.acctran_accref_seqno         =     acc_recpay_tran.recpay_oaccref_seqno and
        acc_ref.accref_seqno             =     acc_trail.acctrail_accref_seqno and
        acc_tran.acctran_accref_seqno        =    acc_trail.acctrail_accref_seqno and
        acc_tran.acctran_led_code        =    acc_trail.acctrail_led_code and
        acc_trail.acctrail_inv_no         =     acc_recpay_tran.recpay_ref_no and
        acc_recpay_tran.recpay_aaccref_seqno     =     896072 and
        acc_tran.acctran_led_code         =     18150";
        $sql = $query;
	$arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query);
            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
            $arr[] = $obj;
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';
        }
    }










 
 $compcode = 1;
 $finid =24;
 $opdate = '2002-04-01';
 $accstatus = 'N';
 function getvoucher()
    {
     $ledcode = $_POST['Pledcode'];
        $query = "		select    distinct
			accref_seqno,
			accref_vouno
		from
			acc_ref,
			acc_tran,
			acc_trail
		where
			accref_seqno   			=	acctran_accref_seqno 		and
			accref_seqno  			= 	acctrail_accref_seqno 		and
			acctran_accref_seqno 	= 	acctrail_accref_seqno 		and
			acctran_led_code 		= 	acctrail_led_code 			and
			accref_vou_type 		in 	('BR','CR','CT','JV','CN','DN','EX','PU') and
			acctran_led_code  		=  "	. $ledcode .
		" and	accref_comp_code  		=  	1 					and
			accref_finid   			=  	24 						and
			accref_voudate 			> 	'2005-02-28' 				and
			acctran_cramt   		>  	0
		group by accref_seqno, accref_vouno
		having sum(acctrail_inv_value) - sum(acctrail_adj_value) > 0 ";
        $result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
 }



  function getDNNO()
    {
      $ginfinid = 24;
      $gincompcode =1;
    $query = "select ifnull(max(dbcr_no),0) + 1 as con_value from acc_dbcrnote_header where dbcr_type = 'DN' and
    dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode'";

        $sql = $query;
        $arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query);

            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
                $arr[] = $obj;
            // $WtNo= $rs['WtNo'];
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';

        }

 }






 function getCNNO()

    {


        $query = "SELECT max(con_value) as con_value FROM control_master WHERE con_desc = 'SALES_CREDITNOTE_NO_DENIM' AND con_finyear = '2013-2014'";

        $sql = $query;
        $arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query);

            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
                $arr[] = $obj;
            // $WtNo= $rs['WtNo'];
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';

        }

 }







       function getFinyear()
    {
	$query = "call plan_sp_trn_selfinyear";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
    }


    function getCurrentdate()
    {
	$query = "select curdate() as curdate;";
	$result = mysql_query($query);
	$nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
    }



    function codeDate ($date) {
	$tab = explode ("-", $date);
	$r = $tab[1]."/".$tab[2]."/".$tab[0];
	return $r;
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
?>
