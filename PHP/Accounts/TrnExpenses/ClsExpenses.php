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

	       case "loadSearchLedgerlist":
		getSearchLedgerlist();
		break;
               case "ControlExpNo":
                getControlExpNo();
                break;
               case "LoadTDStype":
                getTDStype();
                break;
               case "LoadPartyTDSType":
                getPartyTDSType();
                break;
               case "LoadTDSPer":
                getTDSPer();
                break;

               case "loadExpNoList":
                getExpNoList();
                break;

               case "LoadExpVouNoDetails":
                getExpVouNoDetails();
                break;

		case "loadServiceList":
		getServiceList();
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

        mysql_query("SET NAMES utf8");
	$taxtype = $_POST['taxtype'];
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];
 	
        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%CGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%CGST%LIA%$gstper%'");
		}  
        }
        else
        {
             	if ($ledtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%%CGST%'");
		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%CGST%%LIA%'");
		}  
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

        mysql_query("SET NAMES utf8");
	$taxtype = $_POST['taxtype'];
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];

        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%SGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%SGST%LIA%$gstper%'");
		}  
        }
/*
        else
        {
             	if ($taxtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%%SGST%'");
		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%SGST%%LIA%'");
		}  
        } 
*/
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

        mysql_query("SET NAMES utf8");
	$ledtype = $_POST['ledtype'];
	$taxtype = $_POST['taxtype'];
 	$gstper  = $_POST['gstper'];
        if ($gstper > 0)
        {
		if ($taxtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%IGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%IGST%LIA%$gstper%'");
		}  
        }
/*
        else
        {
             	if ($taxtype == "I")
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%INPUT%%IGST%'");
		}
		else
		{
		    $r=mysql_query("select * from massal_customer where cust_name like '%IGST%%LIA%'");
		}  
        } 
*/
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


//        $ledname = strtoupper($_POST['ledger']);
//        $qry = "select * from massal_customer where cust_name like '%$ledname%'";


        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
      $qry = "select * from massal_customer where  cust_type != 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


 function getSearchLedgerlist()
    {
        mysql_query("SET NAMES utf8");

        $ledname = strtoupper($_POST['ledger']);
        $ledname = trim(str_replace(" ", "", $ledname)); 
        $ledname = trim(str_replace(".", "", $ledname)); 
      $qry = "select * from massal_customer where cust_type = 'G' and  replace(replace(cust_name,' ','')  ,'.','')  like '%$ledname%' order by cust_name";


        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    } 


    function getControlExpNo() {
        $ginfinid= $_POST['ginfinid'];
        $gincompcode=$_POST['gincompcode'];
        $r = mysql_query("select concat('EXP',ifnull(max(eh_expno),0) + 1) as Vouno from acc_expenses_header where eh_fincode = '$ginfinid' and eh_compcode = '$gincompcode';");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

  function getTDStype()
    {
        mysql_query("SET NAMES utf8");

        $r=mysql_query("select tds_code,tds_name from mas_acc_tds  order by tds_code");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


  function getPartyTDSType()
    {
        mysql_query("SET NAMES utf8");
        $supcode = $_POST['supcode'];

        $r=mysql_query("select * from massal_customer , mas_acc_tds  where cust_tds_type = tds_code and cust_code = $supcode ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

  function getTDSPer()
    {
        mysql_query("SET NAMES utf8");
        $tdscode = $_POST['tdscode'];

        $r=mysql_query("select * from mas_acc_tds  where  tds_code = $tdscode ");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


    function getExpNoList() {
        $ginfinid    = $_POST['fincode'];
        $gincompcode = $_POST['compcode'];
        $r = mysql_query("select eh_expvouno from acc_expenses_header where eh_compcode = $gincompcode and eh_fincode = $ginfinid order by  eh_expno  desc;");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }


    function getExpVouNoDetails() {
        $ginfinid    = $_POST['fincode'];
        $gincompcode = $_POST['compcode'];
        $ginvouno    = $_POST['vouno'];


        $r = " select a.*,b.*,c.* , tax.cust_name tax_ledname 
 , cgst.cust_name cgst_ledname 
 , sgst.cust_name sgst_ledname 
 , igst.cust_name igst_ledname 
 , tds.cust_name tds_ledname 
  from acc_expenses_header  a, acc_expenses_trailer b, massal_customer c
 ,massal_customer tax
 ,massal_customer cgst
 ,massal_customer sgst
 ,massal_customer igst
 ,massal_customer tds
 where 
 et_taxable_code  = tax.cust_code and 
 et_cgst_ledcode  = cgst.cust_code and 
 et_sgst_ledcode  = sgst.cust_code and 
 et_igst_ledcode  = igst.cust_code and 
 et_tdsledcode  = tds.cust_code and  
 eh_partycode = c.cust_code and 
 eh_compcode = et_compcode and eh_fincode = et_fincode and eh_expno = et_expno
 and eh_compcode = $gincompcode and eh_fincode =  $ginfinid and eh_expvouno  =  '$ginvouno'";




        $r = mysql_query(" select a.*,b.*,c.* , tax.cust_name tax_ledname 
 , cgst.cust_name cgst_ledname 
 , sgst.cust_name sgst_ledname 
 , igst.cust_name igst_ledname 
 , tds.cust_name tds_ledname 
  from acc_expenses_header  a, acc_expenses_trailer b, massal_customer c
 ,massal_customer tax
 ,massal_customer cgst
 ,massal_customer sgst
 ,massal_customer igst
 ,massal_customer tds
 where 
 et_taxable_code  = tax.cust_code and 
 et_cgst_ledcode  = cgst.cust_code and 
 et_sgst_ledcode  = sgst.cust_code and 
 et_igst_ledcode  = igst.cust_code and 
 et_tdsledcode  = tds.cust_code and  
 eh_partycode = c.cust_code and 
 eh_compcode = et_compcode and eh_fincode = et_fincode and eh_expno = et_expno
 and eh_compcode = $gincompcode and eh_fincode =  $ginfinid and eh_expvouno  =  '$ginvouno'");

        $nrow = mysql_num_rows($r);
        while ($re = mysql_fetch_array($r)) {
            $arr[] = $re;
        }
        $jsonresult = JEncode($arr);
        echo '({"total":"' . $nrow . '","results":' . $jsonresult . '})';
    }

 function getServiceList()
    {
        mysql_query("SET NAMES utf8");
	$r=mysql_query("select * from mas_tds_servicetype order by tds_service_type_name");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	

?>
