
<?php
   $CompCode=1;
  require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

    $task='cmbBank';
    if ( isset($_POST['task'])){
    $task = $_POST['task'];   // Get this from Ext
    }
    switch($task){
        case "cmbCompany":              // Give the entire list
          getCompany();
          break;
         case "cmbCountry":              // Give the entire list
          getCountry();
          break;
         case "CompanyDetails":              // Give the entire list
          getCompanyDetails();
          break;
         case "cmbGroup":              // Give the entire list
          getGroup();
          break;
         case "cmbSelGroup":              // Give the entire list
          getSelGroup();
          break;
        case "GroupCode":              // Give the entire list
          getGroupCode();
          break;
        case "cmbTradeGroup":              // Give the entire list
          getTradeGroup();
          break;
        case "cmbSelGroupCust":              // Give the entire list
          getSelGroupCustomer();
          break;
        case "CmbMill":
          getselMill();
          break;
        case "cmbCottonParty":
          getselCottonParty();
          break;
        case "PartyAddress":
            getPartyAddress();
            break;
        case "cmbFinyear":
            getFinYear();
            break;
        case "cmbVarity":
            getVarity();
            break;
        case"chkCottonInv":
            getCottonInv();
            break;
        case"cmbPendingMinCustomer":
            getPendingMinCust();
            break;
        case"cmbCreditGroup":
            getCreditorsGroup();
            break;
        case"cmbBank":
            getBank();
            break;
        case"cmbVoucherNo":
            getVoucherNo();
            break;
        case"cmbVoucherLedDetails":
            getVoucherLedgerDetails();
            break;
        case"cmbLedger":
            	getLedger();
            break;
        case"cmbCurrency":
            getCurrency();
            break;
        case"cmbBillRealInv":
             getBillRealInvno();
            break;
        case"cmbBillRealInvDetails":
             getBillRealInvDetails();
            break;
        case "cmbBillRealVouNo":
             getBillRealVouNo();
             break;
        case "cmbcontraVouNo":
             getContraVouNo();
             break;
        case "UpdContraNo":
             UpdateContraNo();
             break;
        case"getPartyBillNo":
            GetPartyBillNo();
            break;
        case "getPaymentVouDt";
             GetPaymentVouDt();
             break;
        case "getPaymentVouDetails";
             GetPaymentVouDetails();
             break;
        default:
          echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
          break;
    }

   function getCompany()
   {
        $query = "select comp_code,comp_name,comp_password from acc_company_master where comp_code in(1)";
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
   function getCountry()
   {
        $query = "select country_code,country_name from country_master order by country_name";
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

   function getCompanyDetails()
   {
        $company=$_POST['gstcompany'];
        $company=1;
        $query = "select comp_name,
                comp_addr1,
                comp_addr2,
                comp_addr3,
                comp_city,
                comp_state,
                comp_pincode,
                comp_country_code,
                comp_phone,
                comp_fax,
                comp_email,
                comp_website from acc_company_master where comp_code=$company";
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
   function getGroup()
   {
        $CompCode =1;
        $query = "select grp_code,grp_name from  acc_group_master where  grp_comp_code = '$CompCode'";
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
   function getSelGroup()
   {
        $CompCode =1;
        $Group=$_POST['gstGroup'];
        $query = "select grp_code,grp_name from acc_group_master where grp_comp_code ='$CompCode'and grp_name like'$Group%'";
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
   function getGroupCode()
   {

        $query = "select CONCAT('G',con_Value) as con_value from control_master where con_module='AC' and con_finyear='GENERAL'and con_prefix='GRP'and con_desc='GROUP MASTER'";
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
   function getTradeGroup()
   {
        $company=1;
        $query = "select grp_code,grp_name from  acc_group_master where (grp_name like 'trade%' or (grp_code = 4 or grp_parent_code=4)) and
                grp_comp_code         =         '$company'
        order by grp_name";
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
   function getSelGroupCustomer()
   {
        $company=1;
        $GroupCode=$_POST['Groupcode'];
        $query = "select led_code,led_name from acc_ledger_master
        where         led_grp_code   =   '$GroupCode'       and
                led_comp_code        =   '$company'
        order by         led_name";
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
   function getselMill()
   {
        $query = "select g_milid,mil_name from cot_mill_master";
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
   function getselCottonParty()
   {
        $query = "select g_parid,par_name from party_master where par_type in ('SS','SC','SB','AA','CC') and g_parid not in (1615) order by par_type,par_name";
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
   function getPartyAddress()
   {
        $Partyid=$_POST['gstparty'];

        $query = "select par_add1,par_add2,par_add3 from party_master
        where  g_parid='$Partyid'";
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
   function getFinYear()
    {


	$query = "call general_sp_mas_finmaster_new";

        $result = mysql_query($query);
        $nbrows = mysql_num_rows($result);
	if($nbrows>0){
		while($rec = mysql_fetch_array($result)){
			$arr[] = $rec;
                        //$IndSeqno=$rec['ind_seqno'];
                        //echo"$IndSeqno";
		}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrows.'","results":'.$jsonresult.'})';
	} else {
		echo '({"total":"0", "results":""})';
	}
    }
   function getVarity()
   {
        $query = "select g_varid,g_varprefix from variety_master";
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
   function getCottonInv()
   {
        $finyear='2013-2014';
        $partyid=$_POST['partyid'];
        $invno=$_POST['invno'];
        $query = "select par_add1,par_add2,par_add3 from party_master
        where  g_parid='$partyid'";
        $result = mysql_query($query);
        $rec = mysql_fetch_array($result); 

        $par_add1=$rec['par_add1'];
        $par_add2=$rec['par_add2'];
        $par_add3=$rec['par_add3'];

        $query1 = "select '$par_add1' AS par_add1,'$par_add2' AS par_add2,'$par_add3' AS par_add3,pur_parinvno from purinv_header where g_parid='$partyid' and g_finyear='$finyear'and pur_parinvno='$invno'";
	$sql = $query1;
        $arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query1);
            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
            $arr[] = $obj;
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';
	}
   }
   function getPendingMinCust()
   {
        $company=1;
        if($company=1)
        {
        $query = "select vendor_code as PartyCode,vendor_name as PartyName from stores_vendor_master where vendor_company_code ='$company'";
        }
      elseif($company=4) {
         $query = "select fab_sup_code as PartyCode,fab_supname as PartyName from dfd..fab_supplier_master where fab_sup_compcode ='$company'";
        }
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
    function getCreditorsGroup()
   {
        $company=1;
        $query = "select grp_code,grp_name from  acc_group_master where (grp_name like 'credit%' or (grp_code = 4 or grp_parent_code=4)) and
                grp_comp_code         =    '$company'
        order by grp_name";
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
    function getBank()
   {
        $query = "select led_code,led_name from acc_ledger_master where led_grp_code in(20,23,22)";
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
     function getVoucherNo()
   {
       $Account=$_POST['Account'];
       $Finid=24;
       $CompCode=1;
        $query = "select accref_seqno,accref_vouno
    from
        acc_ref     aref,
        acc_tran     atrn
    where
        atrn.acctran_led_code     =    '$Account'        and
        aref.accref_seqno         =     atrn.acctran_accref_seqno and
        aref.accref_vou_type      in ('BP','CP')             and
        aref.accref_comp_code     =    '$CompCode'         and
        aref.accref_finid         =     '$Finid'           and
        atrn.acctran_cramt         >     0  ";
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
   function getVoucherLedgerDetails()
   {
        $Account=$_POST['Account'];
        $VoucherId=$_POST['VoucherId'];
        $VoucherNo=$_POST['VoucherNo'];
        $CompanyCode=1;
        $query = "call proc acc_sp_rep_selleddetails_vouprint(".$VoucherId.",'".$VoucherNo."',".$Account.",".$CompanyCode.")";
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
   function getLedger()
   {
mysql_query("SET NAMES utf8"); 
        $CompCode =1;
        $query = "select led_code,led_name from  acc_ledger_master where  led_comp_code = '$CompCode'";
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
    function getCurrency()
   {
        $query = "select currency_code,currency_symbol from currency_master";
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
    function getBillRealInvno()
   {
        $CompCode =1;
       // $LedCode=$_POST['20730'];
        $LedCode=22548;
        $Type="E";
        if ($CompCode=1)
        {
        $query = "select * from acc_ref,acc_tran,acc_trail
          where accref_seqno         =  acctran_accref_seqno and
                accref_seqno         =  acctrail_accref_seqno and
                accref_vou_type      =  'SE' and
                acctrail_adj_value   > acctrail_inv_value and
                acctran_dbamt        >  0 and
                acctran_led_code     =  '$LedCode'";
        }
        else if($CompCode=4)
        {
        $query = "select * from acc_ref,acc_tran,acc_trail
          where accref_seqno         =  acctran_accref_seqno and
                accref_seqno         =  acctrail_accref_seqno and
                accref_vou_type      =  'SB' and
                acctrail_adj_value   <  acctrail_inv_value and
                acctran_dbamt        >  0 and
                acctran_led_code     =  '$LedCode'";
        }
	$InvNo = mysql_query($query);
        $rec1 = mysql_fetch_array($InvNo);

        $Seqno=$rec1['accref_seqno'];
       // echo"$Seqno";
        if($Type='E')
        {
         $query1 = "select cinv_seqno,cinv_no from expo_cinv_header
        where
                cinv_accref_seqno = '$Seqno' and
                cinv_seqno not in( select real_cinv_seqno from expo_realised_details)
        group by
                cinv_seqno,
                cinv_no";
        }
        $result = mysql_query($query1);
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
   function getBillRealInvDetails()
   {
        $CompCode =1;
       // $LedCode=$_POST['20730'];
        $LedCode=22548;
        $Type="E";

        if ($CompCode=1)
        {
        $query = "select * from acc_ref,acc_tran,acc_trail
          where accref_seqno         =  acctran_accref_seqno and
                accref_seqno         =  acctrail_accref_seqno and
                accref_vou_type      =  'SE' and
                acctrail_adj_value   > acctrail_inv_value and
                acctran_dbamt        >  0 and
                acctran_led_code     =  '$LedCode'";
        }
        else if($CompCode=4)
        {
        $query = "select * from acc_ref,acc_tran,acc_trail
          where accref_seqno         =  acctran_accref_seqno and
                accref_seqno         =  acctrail_accref_seqno and
                accref_vou_type      =  'SB' and
                acctrail_adj_value   <  acctrail_inv_value and
                acctran_dbamt        >  0 and
                acctran_led_code     =  '$LedCode'";
        }
	$InvNo = mysql_query($query);
        $rec1 = mysql_fetch_array($InvNo);

        $Seqno=$rec1['accref_seqno'];
       // echo"$Seqno";
        if($Type='E')
        {
         $query1 = "select cinv_date,sum(cinv_total_invamt + cinv_commission) as cinv_total_invamt
        from
                expo_cinv_header
        where
                cinv_accref_seqno = '$Seqno' and
                cinv_seqno not in( select real_cinv_seqno from expo_realised_details)
        group by
                
                cinv_date";
        }
        $sql = $query1;
        $arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query1);
            $results = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
            $arr[] = $obj;
            }
            Echo '{success:true,results:'.$results.',
            rows:'.json_encode($arr).'}';
	}
   }
   function getBillRealVouNo()
   {

        $CompCode =1;
        $LedCode=$_POST['ledcode'];
        $Finid=24;
        $query = "call acc_sp_trn_selvoucher_no_bill_realisation(".$LedCode.",".$CompCode.",".$Finid.")";
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
   function getContraVouNo()
   {

        $companycode =1;
	$finid =22;

        $query = "select concat('CT',ifnull(max(CAST(substring(accref_vouno,3,8) as decimal)),0) + 1) as con_value  from 			acc_ref where  accref_comp_code = '$companycode' and accref_finid = '$finid' and accref_vouno like 'CT%'";
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
    function UpdateContraNo()
   {

        $CompCode =1;

        $query3="update control_master set con_value=con_value+1 where con_module='AC' and con_finyear='2013-2014' and con_prefix='ACT'and
          con_desc='ACC. CONTRA VOUCHER NO.' and con_company_code='$CompCode'";

        $result3 = mysql_query($query3);

        $query4="update control_master set con_value=con_value+1 where con_module='AC' and con_finyear='GENERAL' and con_prefix='ARS'and
          con_desc='ACC_REF_SEQNO' and con_company_code='$CompCode'";

        $result4 = mysql_query($query4);

   }
   function GetPartyBillNo()
   {
       // $ledcode=$_POST['ledcode'];
        //$compCode=1;
        //$finid=20;
        $query = "
                    select  ob_seqno as seqno,
                            'OB' as vou_type,
                            ob_vou_no as vou_no,
                            ob_vou_date as vou_date,
                            ob_comp_code as comp_code,
                            ob_fin_id as finid,
                            ob_ref_no as inv_no,
                            ob_ref_date as inv_date,
                            ob_totamt as inv_value,
                            ob_adjamt as adj_value,
                            ob_cramt as creditamt,
                            ob_dbamt as debitamt,
                            0 as dncn,
                            '' as balance,
                            '' as disocunt,
                            '' as adjst
                    from
                            acc_ob_billdetails
                    where
                            ob_comp_code       =         1 and
                            ob_fin_id         >=11 and
                            ob_adjamt         <         ob_totamt  and
                            ob_led_code        =        21010
               union
                select
                        acc_ref.accref_seqno as seqno,
                        acc_ref.accref_vou_type as vou_type,
                        acc_ref.accref_vouno as vou_no,
                        acc_ref.accref_voudate as vou_date,
                        acc_ref.accref_comp_code as comp_code,
                        acc_ref.accref_finid as finid,
                        acc_trail.acctrail_inv_no as inv_no,
                        acc_trail.acctrail_inv_date as inv_date,
                        acc_trail.acctrail_inv_value as inv_value,
                        acc_trail.acctrail_adj_value as adj_value,
                        acc_tran.acctran_cramt as creditamt,
                        acc_tran.acctran_dbamt as debitamt,
                        0 as dncn,
                        '' as balance,
                        '' as disocunt,
                        '' as adjst
                from
                        acc_trail,
                        acc_tran,
                        acc_ref
                where
                        acc_ref.accref_voudate           >         '2005-02-28'                                       and
                        acc_ref.accref_seqno             =         acc_tran.acctran_accref_seqno                 and
                        acc_tran.acctran_accref_seqno    =         acc_trail.acctrail_accref_seqno         and
                        acc_trail.acctrail_accref_seqno  =         acc_ref.accref_seqno                         and
                        acc_ref.accref_comp_code         =         1                                and
                        acc_ref.accref_finid            >=         20                                and
                        acc_ref.accref_vou_type         in         ('CN')                                         and
                        acc_tran.acctran_led_code        =         acc_trail.acctrail_led_code                 and
                        acc_tran.acctran_led_code        =         21010
               union

                select
                        acc_ref.accref_seqno as seqno,
                        acc_ref.accref_vou_type as vou_type,
                        acc_ref.accref_vouno as vou_no,
                        acc_ref.accref_voudate as vou_date,
                        acc_ref.accref_comp_code as comp_code,
                        acc_ref.accref_finid as finid,
                        acc_trail.acctrail_inv_no as inv_no,
                        acc_trail.acctrail_inv_date as inv_date,
                        acc_trail.acctrail_inv_value as inv_value,
                        acc_trail.acctrail_adj_value as adj_value,
                        acc_tran.acctran_cramt as creditamt,
                        acc_tran.acctran_dbamt as debitamt,
                        0 as dncn,
                        '' as balance,
                        '' as disocunt,
                        '' as adjst
                from
                        acc_trail,
                        acc_tran,
                        acc_ref
                where
                        acc_ref.accref_voudate             >        '2005-02-28'                          and
                        acc_ref.accref_seqno               =         acc_tran.acctran_accref_seqno         and
                        acc_tran.acctran_accref_seqno      =         acc_trail.acctrail_accref_seqno and
                        acc_trail.acctrail_accref_seqno    =         acc_ref.accref_seqno                 and
                        acc_ref.accref_comp_code           =         1                         and
                        acc_ref.accref_finid              >=         20                        and
                        acc_ref.accref_vou_type         not in ('BR','CR')                         and
                        acc_trail.acctrail_adj_value       <         acc_trail.acctrail_inv_value         and
                        acc_tran.acctran_led_code         =         acc_trail.acctrail_led_code         and
                        acc_tran.acctran_dbamt            >         0                                 and
                        acc_tran.acctran_led_code         =         21010
               ";

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
  function GetPaymentVouDt()
   {
        $company=1;
        $query = "Delete from acc_purchase_ageing";
        $result = mysql_query($query);
   }
   function GetPaymentVouDetails()
   {

        $Compcode=1;
        $ginfinid=24;
        $LedCode=$_POST['LedCode'];
        $AsonDate="2014-04-22";
        //$query = "CALL acc_sp_rep_selpayableageingdetails_new1(".$Compcode.",".$ginfinid.",".$LedCode.",'".$AsonDate."')";
        $query = "
        select ob_seqno as accref_seqno, ob_vou_no as accref_vouno, ob_fin_id as accref_finid, ob_vou_date as accref_voudate, 'OB' as accref_vou_type,
	ob_led_code as acctran_led_code, ob_totamt - ob_adjamt as acctran_dbamt, 0 as acctran_cramt, ob_totamt as acctran_totamt, ob_ref_no as acctrail_inv_no,
	ob_ref_date as acctrail_inv_date, ob_totamt as acctrail_inv_value, ob_adjamt as acctrail_adj_value, 'Bills' as acctype
	from acc_ob_billdetails
	where ob_fin_id >= 11 and ob_comp_code = '$Compcode' and ob_led_code = '$LedCode' and ob_totamt - ob_adjamt > 0 and ob_cramt > 0
	union all
	select ob_seqno as accref_seqno, ob_vou_no as accref_vouno, ob_fin_id as accref_finid, ob_vou_date as accref_voudate, 'OB' as accref_vou_type,
	ob_led_code as acctran_led_code, 0 as acctran_dbamt, ob_totamt - ob_adjamt as acctran_cramt, ob_totamt as acctran_totamt, ob_ref_no as acctrail_inv_no,
	ob_ref_date as acctrail_inv_date, ob_totamt as acctrail_inv_value, ob_adjamt as acctrail_adj_value, 'Adv' as acctype
	from acc_ob_billdetails
	where ob_fin_id >= 11 and ob_comp_code = '$Compcode' and ob_led_code = '$LedCode' and ob_totamt - ob_adjamt > 0 and ob_dbamt > 0
	union all
	select accref_seqno, accref_vouno, accref_finid, accref_voudate, accref_vou_type, acctran_led_code,
	acctrail_inv_value - acctrail_adj_value as acctran_dbamt, 0 as acctran_cramt, acctran_totamt,
	acctrail_inv_no, acctrail_inv_date, acctrail_inv_value, acctrail_adj_value, 'Bills' as acctype
	from acc_ref, acc_tran, acc_trail
	where accref_comp_code = '$Compcode'
	and accref_finid >= 11
	and accref_seqno = acctran_accref_seqno and acctran_accref_seqno = acctrail_accref_seqno
	and acctran_led_code = acctrail_led_code and acctran_led_code = '$LedCode' and acctrail_inv_value - acctrail_adj_value > 0 and acctran_cramt > 0
	and accref_vou_type not in ('OB','UB','BA','PP','PR','PT')
        and accref_voudate	<= '$AsonDate'
	union all
	select accref_seqno, accref_vouno, accref_finid, accref_voudate, accref_vou_type, acctran_led_code, 0 as acctran_dbamt,
	acctrail_inv_value - acctrail_adj_value as acctran_cramt,acctran_totamt,
	acctrail_inv_no, acctrail_inv_date, acctrail_inv_value, acctrail_adj_value, 'Adv' as acctype
	from acc_ref, acc_tran, acc_trail
	where accref_comp_code = '$Compcode'
	and accref_finid >= 11
	and accref_seqno = acctran_accref_seqno and acctran_accref_seqno = acctrail_accref_seqno
	and acctran_led_code = acctrail_led_code and acctran_led_code = '$LedCode' and acctrail_inv_value - acctrail_adj_value > 0 and acctran_dbamt > 0
	and accref_vou_type not in ('OB','UB','BA','PP','PR','PT')
        and accref_voudate	<= '$AsonDate'
        ";
	$sql = $query;
        $arr = array();
        If (!$rs = mysql_query($sql)) {
            Echo '{success:false}';
        }else{
            $rs_count = mysql_query($query);
            $results1 = mysql_num_rows($rs_count);
            while($obj = mysql_fetch_object($rs)){
            $arr[] = $obj;
            }
            Echo '{success:true,results:'.$results1.',
            rows:'.json_encode($arr).'}';
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
