<?php
   require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadStoresgrnno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadStoresgrnno":
		getStoresgrnno();
		break;

		case "loadosno":
		getosno();
		break;

		case "loadsalenoteno":
		getsalenoteno();
		break;


		case "loadWPLgrnno":
		getWPLgrnno();
		break;
		case "loadFuelgrnno":
		getFuelgrnno();
		break;
		case "loadWPL_Ledgers":
		getWPL_Ledgers();
		break;
		case "loadWOgrnno":
		getWOgrnno();
		break;
		case "loadTDStype":
		getTDStype();
		break;

		case "ViewTDSDetails":
		getTDSDetails();
		break;

		case "ViewStoresGrnDetails":
		getStoresgrnDetails();
		break;

		case "ViewothersalesDetails":
		getothersalesDetails();
		break;


		case "ViewWPLGrnDetails":
		getWPLgrnDetails();
		break;


		case "ViewWOGrnDetails":
		getWOgrnDetails();
		break;

		case "ViewFuelGrnDetails":
		getFuelgrnDetails();
		break;

		case "ViewFuelGrnAllDetails":
		getFuelgrnAllDetails();
		break;

		case "ViewSaleNoteDetails":
		getSaleNoteDetails();
		break;


		case "loadgstledger":
		getGSTDetails();
		break;
		case "loadledgers":
		getledgers();
		break;
		case "loadGLledgers":
		getGLledgers();
		break;


		case "loadCGSTledgers":
		getCGSTledgers();
		break;
		case "loadSGSTledgers":
		getSGSTledgers();
		break;
		case "loadIGSTledgers":
		getIGSTledgers();
		break;
		case "loadCGSTledgerswo":
		getCGSTledgerswo();
		break;
		case "loadSGSTledgerswo":
		getSGSTledgerswo();
		break;
		case "loadIGSTledgerswo":
		getIGSTledgers();


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


	
 function getWPLgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select  rech_no as rech_grnno from trnrm_receipt_header where rech_compcode = $compcode and rech_fincode = $finid and rech_vouno = '' and  rech_acctflag = 'Y' order by rech_no");
//        $r=mysql_query("select  rech_grnno from trnrm_receipt_handling where rech_compcode = $compcode and rech_fincode = $finid and rech_acctflag = ''  group by rech_grnno order by rech_grnno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];

        $r=mysql_query("select  rech_grnno from trnfu_receipt_handling where rech_compcode = $compcode and rech_fincode = $finid  and rech_accupd = 'N' group by rech_grnno order by rech_grnno desc");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
    
   
	
 function getStoresgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select minh_minno as grnno from trnpur_min_header where minh_fin_code=$finid and minh_comp_code= $compcode and minh_accupd = 'N' order by minh_minno asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getWOgrnno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select wogh_no as grnno from trnpur_wogrn_header where wogh_comp_code = $compcode  and wogh_fin_code =  $finid and wogh_accupd ='N' group by wogh_no order by wogh_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getosno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $r=mysql_query("select os_docno from trnpur_other_sales where os_compcode = $compcode and os_fincode = $finid and os_accupd = 'N' group by os_docno  order by os_docno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getsalenoteno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$voutype  = $_POST['voutype'];
        if ($voutype  == "FS" )
        {    
        $r=mysql_query("select salh_no from trnfu_salenote_header where salh_compcode = $compcode and salh_fincode = $finid and salh_vouno = '' group by salh_no order by salh_no desc");
        }

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getledgers()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from acc_ledger_master");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGLledgers()
    {
        mysql_query("SET NAMES utf8");
        $r=mysql_query("select * from acc_ledger_master where led_type = 'G'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getCGSTledgers()

    {

        mysql_query("SET NAMES utf8");
	$ledtype = $_POST['ledtype'];
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];
 	
        if ($gsttype == "CS")
        {
           $gstper = ($gstper/2);
        }

        if ($gstper > 0)
        {
		if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%CGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%CGST%LIA%$gstper%'");
		}  
        }
        else
        {
             	if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%%CGST%'");
		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%CGST%%LIA%'");
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
	$ledtype = $_POST['ledtype'];
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];
        if ($gsttype == "CS")
        {
           $gstper = ($gstper/2);
        }

        if ($gstper > 0)
        {
		if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%SGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%SGST%LIA%$gstper%'");
		}  
        }
        else
        {
             	if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%%SGST%'");
		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%SGST%%LIA%'");
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


 function getIGSTledgers()

    {

        mysql_query("SET NAMES utf8");
	$ledtype = $_POST['ledtype'];
	$gsttype = $_POST['gsttype'];
 	$gstper  = $_POST['gstper'];
        if ($gsttype == "CS")
        {
           $gstper = ($gstper/2);
        }

        if ($gstper > 0)
        {
		if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%IGST%$gstper%'");

		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%IGST%LIA%$gstper%'");
		}  
        }
        else
        {
             	if ($ledtype == "I")
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%%IGST%'");
		}
		else
		{
		    $r=mysql_query("select * from acc_ledger_master where led_name like '%IGST%%LIA%'");
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



 function getStoresgrnDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $grnno    = $_POST['grnno'];


        $r=mysql_query("select * from trnpur_min_header ,  trnpur_min_trailer , maspur_supplier_master , maspur_item_header where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code  and minh_minno = mint_minno and minh_sup_code = sup_code and mint_item_code = item_code and  minh_comp_code = $compcode and minh_fin_code = $finid and minh_minno =  $grnno");

        $r=mysql_query("select a.*,b.*,c.*,d.* ,e.sup_refname as frtparty1,e.sup_led_code as frtledcode1,f.sup_refname as frtparty2,f.sup_led_code as frtledcode2,h.* from trnpur_min_header a ,  trnpur_min_trailer b , maspur_supplier_master c, maspur_item_header d , maspur_supplier_master e , maspur_supplier_master f , maspur_group h  where minh_comp_code = mint_comp_code and minh_fin_code = mint_fin_code  and minh_minno = mint_minno and minh_sup_code = c.sup_code and mint_clr1_transport = e.sup_code and mint_clr2_transport = f.sup_code and item_group_code = grp_code and mint_item_code = item_code and  minh_comp_code = $compcode and minh_fin_code = $finid and minh_minno =  $grnno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getothersalesDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];


        $r=mysql_query("select * from trnpur_other_sales,  mas_othersales_item_master , mas_uom , maspur_supplier_master where os_custcode = sup_code and  os_item = salitem_code and salitem_uom = uom_code and os_compcode = $compcode and os_fincode = $finid and os_docno =  $docno");

       $r=mysql_query("select a.*,b.*,c.*,d.*,e.led_code as salledcode,e.led_name as salledname,f.led_code as cgstledcode,f.led_name as cgstledname,g.led_code as sgstledcode,g.led_name as sgstledname,h.led_code as igstledcode,h.led_name as igstledname
 from trnpur_other_sales a,  mas_othersales_item_master b, mas_uom c, maspur_supplier_master d,acc_ledger_master e,acc_ledger_master f,acc_ledger_master g,acc_ledger_master h where salitem_salesledcode = e.led_code and salitem_cgstledcode  = f.led_code and salitem_sgstledcode  = g.led_code and salitem_igstledcode  = h.led_code and os_custcode = sup_code and  os_item = salitem_code and salitem_uom = uom_code and os_compcode = $compcode and os_fincode = $finid and os_docno = $docno");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSaleNoteDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];
        $voutype  = $_POST['voutype'];

        if ($voutype == "FS")
        {
         $r=mysql_query("select * from trnfu_salenote_header , trnfu_salenote_trailer , maspur_supplier_master,masfu_item_header  where salh_seqno = salt_hdseqno 
and salh_party_code = sup_code and itmh_code = salt_itemcode and salh_compcode = $compcode and salh_fincode = $finid   and  salh_no = $docno ");
        }   

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getWPLgrnDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];

        $r=mysql_query("select  * from trnrm_receipt_header a, trnrm_receipt_trailer b , masrm_item_header c , acc_ledger_master d , maspur_supplier_master e where 
rech_seqno = rect_hdseqno  and rect_item_code = itmh_code and itmh_ledcode = led_code  and rech_sup_code = sup_code  and  rech_compcode = $compcode and rech_fincode = $finid and rech_no = $docno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getFuelgrnDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];

 

        $r=mysql_query("select rech_ledtype,rech_ledcode,led_name,sum(rech_amount) as amount  from trnfu_receipt_handling a, acc_ledger_master b where rech_ledcode = led_code and rech_compcode =$compcode and rech_fincode = $finid  and rech_grnno = $docno group by rech_ledtype,rech_ledcode,led_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getFuelgrnAllDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];

/*
        $r=mysql_query("select  * from trnfu_receipt_header a, trnfu_receipt_trailer b , masfu_item_header c , acc_ledger_master d, maspur_supplier_master e where rech_sup_code = sup_code and rech_seqno = rect_hdseqno  and rect_item_code = itmh_code and itmh_ledcode = led_code  and  rech_compcode = $compcode and rech_fincode = $finid and rech_no = $docno");
*/

$r=mysql_query("select  a.*, b.*, c.*, d.* , e.led_name as purledname,e.led_code as  purledcode, f.led_name as cgstledname,f.led_code as  tax_cgst_ledcode,
 g.led_name as sgstledname,g.led_code as  tax_sgst_ledcode, h.led_name as igstledname,h.led_code as  tax_igst_ledcode from trnfu_receipt_header a, trnfu_receipt_trailer b , masfu_item_header c , maspur_supplier_master d,
 acc_ledger_master e, acc_ledger_master f, acc_ledger_master g, acc_ledger_master h where rech_sup_code = sup_code and rech_seqno = rect_hdseqno  and rect_item_code = itmh_code and itmh_ledcode = e.led_code  and itmh_cgstledcode = f.led_code  and itmh_sgstledcode = g.led_code  and itmh_igstledcode = h.led_code  
and  rech_compcode = $compcode and rech_fincode = $finid and rech_no = $docno");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getWOgrnDetails()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $docno    = $_POST['grnno'];


//        $r=mysql_query("select * from trnpur_wogrn_header , trnpur_wogrn_trailer , maspur_supplier_master ,mas_dept  where   wogh_dept = dept_code and wogh_sup_code = sup_code and wogh_comp_code = wogt_comp_code and wogh_fin_code = wogt_fin_code and wogh_no = wogt_no  and wogh_comp_code = $compcode and wogh_fin_code = $finid and wogh_no = $docno");

        $r=mysql_query("select a.*,b.*,c.*,d.*,e.tax_ledger as cgstcode,e.tax_name as cgstname , f.tax_ledger as sgstcode,f.tax_name as sgstname ,g.tax_ledger as igstcode,g.tax_name as igstname from trnpur_wogrn_header a, trnpur_wogrn_trailer b, maspur_supplier_master c,mas_dept  d ,
mas_purchasetax e  , mas_purchasetax f  , mas_purchasetax g  where  ( e.tax_per= b.wogt_cgst_per and e.tax_gst = 'C'  )  and   ( f.tax_per= b.wogt_sgst_per and f.tax_gst = 'S' )  and   ( g.tax_per= b.wogt_igst_per and g.tax_gst = 'I' )  and  wogh_dept = dept_code and wogh_sup_code = sup_code and wogh_comp_code = wogt_comp_code and wogh_fin_code = wogt_fin_code and wogh_no = wogt_no  and wogh_comp_code = $compcode and wogh_fin_code =  $finid  and wogh_no = $docno");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getGSTDetails()
    {
        mysql_query("SET NAMES utf8");
	$gstper    = $_POST['gstper'];

//        $r=mysql_query("select * from maspur_gsttax where tax_gst_per = $gstper");
//        $r=mysql_query("select * from maspur_gsttax");
$r=mysql_query("select a.* , b.led_name as cgst_ledname , c.led_name as sgst_ledname , d.led_name as igst_ledname from maspur_gsttax a, acc_ledger_master b, acc_ledger_master c ,  acc_ledger_master d  where a.tax_gst_cgst_ledcode = b.led_code  and  a.tax_gst_sgst_ledcode = c.led_code and  a.tax_gst_igst_ledcode = d.led_code");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getWPL_Ledgers()
    {
        mysql_query("SET NAMES utf8");
	$custcode   = $_POST['custcode'];

        $r=mysql_query("select b.* from maspur_supplier_master  a, mas_tax b where a.sup_taxcode = b.tax_code and  sup_led_code =$custcode");

$r=mysql_query("select tax_name,tax_ledcode purledcode,b.led_name purledname,tax_cgst_per, tax_sgst_per, tax_igst_per, tax_cgst_ledcode, tax_sgst_ledcode, tax_igst_ledcode,c.led_name cgstledname,d.led_name sgstledname,e.led_name igstledname from mas_tax a, acc_ledger_master b ,acc_ledger_master c, acc_ledger_master d, 
acc_ledger_master e,maspur_supplier_master f where f.sup_taxcode = a.tax_code and a.tax_ledcode = b.led_code and   a.tax_cgst_ledcode = c.led_code
and a.tax_sgst_ledcode = d.led_code and   a.tax_igst_ledcode = e.led_code and   f.sup_code = $custcode");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getTDStype()
    {
        mysql_query("SET NAMES utf8");


        $r=mysql_query("select * from mas_acc_it_rate");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

function getTDSDetails()
    {
        mysql_query("SET NAMES utf8");
	$tdstype   = $_POST['tdstype'];
        $r=mysql_query("select * from mas_acc_it_rate,acc_ledger_master where it_ledcode = led_code and it_type = '$tdstype'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




 function getCGSTledgerswo()

    {

        mysql_query("SET NAMES utf8");
 	$gstper  = $_POST['gstper'];
        $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%CGST%$gstper%'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getSGSTledgerswo()

    {

        mysql_query("SET NAMES utf8");
 	$gstper  = $_POST['gstper'];
        $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%SGST%$gstper%'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getIGSTledgerswo()

    {

        mysql_query("SET NAMES utf8");
 	$gstper  = $_POST['gstper'];
        $r=mysql_query("select * from acc_ledger_master where led_name like '%INPUT%IGST%$gstper%'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }




?>
