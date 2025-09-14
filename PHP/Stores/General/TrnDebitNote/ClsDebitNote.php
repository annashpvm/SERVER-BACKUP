<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadInvDetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "findPartyType":
		getPartyType();
		break;
		case "LoadDNNumber":
	        getDNNumber();
		break;
		case "LoadDebitNoteVoucherList":
	        getDebitNoteVoucherList();
		break;
		case "LoadDebitNoteVoucherDetail":
	        getDebitNoteVoucherDetail();
		break;

		case "LoadDebitNoteVoucherDetailAccounts":
	        getDebitNoteVoucherDetailAccounts();
		break;

		case "LoadDebitNoteVoucherListAccounts":
	        getDebitNoteVoucherListAccounts();
		break;
		case "loadunit":
		getunit();
		break;


		case "LoadDNDate":
	        getDNDate();
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
    



 function getCGSTledgers()
 {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "O")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'CGST'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "O")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'SGST'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIGSTledgers()

    {
        $ledtype = $_POST['ledtype'];
        $gsttype = $_POST['gsttype'];
        $gstper  = $_POST['gstper'];

        mysql_query("SET NAMES utf8");
        if ($ledtype == "O")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like 'IGST%$gstper%'");
		}  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSearchPartylist()
    {
        mysql_query("SET NAMES utf8");

        $party  = $_POST['party'];

        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 

        $qry = "select * from massal_customer where cust_type <> 'G' and left(cust_name,2) != 'zz' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyType()
    {
        mysql_query("SET NAMES utf8");

        $partydrcr = $_POST['partydrcr'];
        $partycode = $_POST['partycode'];

//        if ($partydrcr == "C")
           $qry = "select cust_state statecode from massal_customer where cust_code = $partycode" ;
//        else
  //         $qry = "select sup_state statecode from massal_customer where sup_code = $partycode" ;
           


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getDNNumber()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];

        if ($ginfinid >=  24)
        {      
        if ($gsttype == 'G')
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
         }
         else
        {      
        if ($gsttype == 'G')
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from tmpacc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select ifnull(max(dbcr_no),0) + 1 as vouno from tmpacc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
         }
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDebitNoteVoucherList()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
        $gsttype =$_POST['gsttype'];
        if ($gsttype == 'G')
		$r=mysql_query("select pur_vouno from str_debit_note where pur_gsttype = 'DNG' and pur_compcode = '$compcode' and  pur_finid = '$finid' group by pur_vouno order by pur_vouno desc");
        else
		$r=mysql_query("select pur_vouno from str_debit_note  where  pur_gsttype = 'DNN' and pur_compcode = '$compcode' and  pur_finid = '$finid' group by pur_vouno order by pur_vouno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDebitNoteVoucherDetail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];
	$dntype   = $_POST['dntype'];

       if  ($dntype   == '')
          $r=mysql_query("select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno'");
       else
          $r=mysql_query("select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_gsttype = '$dntype' and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno'");
  

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getDebitNoteVoucherDetailAccounts()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];
	$vouno    = $_POST['vouno'];

          $r=mysql_query("select * from str_debit_note , massal_customer where pur_partycode = cust_code and pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_vouno = '$vouno' and pur_accseqno = 0");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDebitNoteVoucherListAccounts()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$finid    = $_POST['fincode'];

	$r=mysql_query("select pur_vouno from str_debit_note where  pur_compcode = '$compcode' and  pur_finid = '$finid' and pur_accseqno = 0 group by pur_vouno order by pur_vouno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getunit()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select uom_name,uom_code  from mas_uom where uom_name not like 'ZZ%' and (uom_code <=103 or uom_code >136)order by uom_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDNDate()
    {
        mysql_query("SET NAMES utf8");
        $ginfinid= $_POST['finid'];
        $gincompcode=$_POST['compcode'];
        $gsttype =$_POST['gsttype'];
 
        if ($gsttype == 'G')
	   $r = mysql_query("select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNG' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");
        else
	   $r = mysql_query("select max(dbcr_date) dnmaxdate from acc_dbcrnote_header where dbcr_type = 'DNN' and dbcr_finid = '$ginfinid' and dbcr_comp_code = '$gincompcode';");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
