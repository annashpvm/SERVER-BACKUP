<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadrepno';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "loadrepno":
		getrepno();
		break;
		case "loadMonthIndents":
		getMonthIndents();
		break;
		case "loadMonthIndentDetails":
		getMonthIndentDetails();
		break;

		case "loadMonthPOs":
		getMonthPOs();
		break;
		case "loadMonthPODetails":
		getMonthPODetails();
		break;
		case "loadDeptMonthIndents":
		getDeptMonthIndents();
		break;

		case "loadDeptMonthIndentDetails":
		getDeptMonthIndentDetails();
		break;

		case "loadDeptMonthPOs":
		getDeptMonthPOs();
		break;

           	case "loadPartyMonthPOs":
		getPartyMonthPOs();
		break;
		case "loadPartyPODetails":
		getPartyPODetails();
		break;
	        case "loadDeptMonthPODetails":
		getDeptMonthPODetails();
		break;
		case "loadSearchPartylist":
		getSearchPartylist();
		break;
		case "loadSearchGroupList":
		getSearchGroupList();
		break;
		case "loadItemPOPendings":
		getItemPOPendings();
		break;
		case "loadItem_Party_POPendings":
		getItem_Party_POPendings();
		break;
		case "loadSearchItemList":
		getSearchItemList();
		break;

		case "loadIndentItemDetails":
		getIndentItemDetails();
		break;

		case "loadPOItemDetails":
		getPOItemDetails();
		break;

		case "loadGRNItemDetails":
		getGRNItemDetails();
		break;



		case "loadPOHistory":
		getPOHistory();
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
    
 function getIndno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];


        $r=mysql_query("select ind_no from trnpur_indent where ind_comp_code =  '$compcode'  and ind_fin_code = '$finid' group by ind_no order by ind_no desc"); 


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
   

 function getrepno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$repname = $_POST['repname'];
	
	if($repname === "PO") {
		$r=mysql_query("select phd_pono as seqno,phd_pono as repno from trnpur_purchase_header  where phd_fin_code= '$finid' and phd_comp_code = '$compcode' order by phd_pono desc");

	}
	else if ($repname === "Indent") {
         $r=mysql_query("select ind_no as seqno,ind_no as repno from trnpur_indent where ind_comp_code =  '$compcode'  and ind_fin_code = '$finid' group by ind_no order by ind_no desc"); 
	}
	else if ($repname === "Clearing") {
         $r=mysql_query("select t_clr_no  as seqno,t_clr_no as repno from trnpur_trans_clearance where t_clr_company = '$compcode' and t_clr_finyear ='$finid' group by t_clr_no order by t_clr_no desc"); 
}
	else if ($repname === "DCNo") {
		$r=mysql_query("select genh_no as seqno,genh_no as repno from trnpur_general_header where genh_comp_code =  '$compcode'  and genh_fincode = '$finid' AND genh_type = 'D' order by genh_no desc"); 	
	}
	else if ($repname === "WONo") {
		$r=mysql_query("select woh_no as seqno,woh_no as repno from trnpur_workorder_header where woh_comp_code=$compcode and woh_fin_code=$finid order by woh_no desc"); 	
	}
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getMonthIndents()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select rmonth,count(*) as nos,sum(purvalue) purvalue from( select UPPER(monthname(ind_date)) as rmonth ,  ind_no, sum(ind_value) as purvalue from trnpur_indent  where ind_fin_code= '$finid' and ind_comp_code = '$compcode' and ind_date >= '$startdate' and ind_date <= curdate() group by UPPER(monthname(ind_date)),ind_no) a group by rmonth");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDeptMonthIndents()
    {
        mysql_query("SET NAMES utf8");
	$dept     = $_POST['deptcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select rmonth,count(*) as nos,sum(purvalue) purvalue from(select UPPER(monthname(ind_date)) as rmonth ,  ind_no, sum(ind_value) as purvalue from trnpur_indent  where ind_fin_code= '$finid' and ind_comp_code = '$compcode' and ind_date >= '$startdate' and ind_date <= curdate() and ind_dept_code = '$dept' group by UPPER(monthname(ind_date),ind_no) a group by rmonth)");


$r=mysql_query("select rmonth,count(*) as nos,sum(purvalue) purvalue from( select UPPER(monthname(ind_date)) as rmonth ,  ind_no, sum(ind_value) as purvalue from trnpur_indent  where ind_fin_code= '$finid' and ind_comp_code = '$compcode' and ind_date >= '$startdate' and ind_date <= curdate() and ind_dept_code = '$dept' group by UPPER(monthname(ind_date)),ind_no) a group by rmonth");


	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getMonthIndentDetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


$r=mysql_query("select ind_no,ind_date,item_name,ind_qty,ind_value from trnpur_indent ,maspur_item_header  where ind_item_code = item_code and ind_fin_code= '$finid' and ind_comp_code = '$compcode' and ind_date >= '$startdate' and ind_date <= '$enddate' order by ind_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDeptMonthIndentDetails()
    {
        mysql_query("SET NAMES utf8");
	$dept     = $_POST['deptcode'];
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


$r=mysql_query("select ind_no,ind_date,item_code,item_name,ind_qty,ind_value from trnpur_indent ,maspur_item_header  where ind_item_code = item_code and ind_fin_code= '$finid' and ind_comp_code = '$compcode' and ind_date >= '$startdate' and ind_date <= '$enddate'  and ind_dept_code = '$dept'   order by ind_no desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getDeptMonthPOs()
    {
        mysql_query("SET NAMES utf8");
	$dept     = $_POST['deptcode'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select UPPER(monthname(phd_podate)) as rmonth ,  count(*) as nos, sum(phd_total) as purvalue from trnpur_purchase_header  where phd_fin_code= '$finid' and phd_comp_code = '$compcode' and phd_podate >= '$startdate' and phd_podate <= curdate()  and phd_dept = '$dept'  group by UPPER(monthname(phd_podate))
");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getPartyMonthPOs()
    {
        mysql_query("SET NAMES utf8");
	$party     = $_POST['party'];
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];


$r=mysql_query("select UPPER(monthname(phd_podate)) as rmonth ,  count(*) as nos, sum(phd_total) as purvalue from trnpur_purchase_header  where phd_fin_code= '$finid' and phd_comp_code = '$compcode' and phd_podate >= '$startdate' and phd_podate <= curdate()  and phd_sup_code = '$party'  group by UPPER(monthname(phd_podate))
");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPartyPODetails()
    {
        mysql_query("SET NAMES utf8");
	$party     = $_POST['party'];
	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


        $r=mysql_query("select phd_pono,phd_podate,ptr_ind_no,cust_ref,item_name,ptr_ord_qty from trnpur_purchase_header, trnpur_purchase_trailer,massal_customer,maspur_item_header where phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and phd_sup_code = cust_code and ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid and  phd_podate >= '$startdate' and phd_podate <= '$enddate'  and phd_sup_code = '$party' order by phd_pono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getMonthPOs()
    {
        mysql_query("SET NAMES utf8");

	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$startdate = $_POST['startdate'];




$r=mysql_query("select UPPER(monthname(phd_podate)) as rmonth ,  count(*) as nos, sum(phd_total) as purvalue from trnpur_purchase_header  where phd_fin_code= '$finid' and phd_comp_code = '$compcode' and phd_podate >= '$startdate' and phd_podate <= curdate() group by UPPER(monthname(phd_podate))
");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getMonthPODetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];


        $r=mysql_query("select phd_pono,phd_podate,ptr_ind_no,cust_ref,item_name,ptr_ord_qty from trnpur_purchase_header, trnpur_purchase_trailer,massal_customer,maspur_item_header where phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and phd_sup_code = cust_code and ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid and  phd_podate >= '$startdate' and phd_podate <= '$enddate' order by phd_pono desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getDeptMonthPODetails()
    {
        mysql_query("SET NAMES utf8");

	$finid     = $_POST['finid'];
	$compcode  = $_POST['compcode'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$dept     = $_POST['deptcode'];

        $r=mysql_query("select phd_pono,phd_podate,ptr_ind_no,cust_ref,item_name,ptr_ord_qty from trnpur_purchase_header, trnpur_purchase_trailer,massal_customer,maspur_item_header where phd_comp_code = ptr_comp_code and phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and phd_sup_code = cust_code and ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid and  phd_podate >= '$startdate' and phd_podate <= '$enddate'   and phd_dept = '$dept'  order by phd_pono desc");
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
        $party     = $_POST['party'];
        $gststate     = $_POST['gststate'];


        $party = trim(str_replace(" ", "", $party)); 
        $party = trim(str_replace(".", "", $party)); 
      
if ($gststate == "TNOS")
{
        if ($party == '')
        $qry = "select * from massal_customer where cust_state = 24 and cust_type != 'G' order by cust_name";
        else
        $qry = "select * from massal_customer where  cust_state = 24 and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
}
else if ($gststate == "OSOS")
{
        if ($party == '')
        $qry = "select * from massal_customer where  cust_state != 24 and  cust_type != 'G' order by cust_name";
        else
        $qry = "select * from massal_customer where cust_state != 24 and cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
}
else
{
        if ($party == '')
        $qry = "select * from massal_customer where cust_type != 'G' order by cust_name";
        else
        $qry = "select * from massal_customer where cust_type != 'G' and replace(replace(cust_name,' ','')  ,'.','')  like '%$party%' order by cust_name";
}
        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSearchGrouplist()
    {
        mysql_query("SET NAMES utf8");


        $group = $_POST['group'];
        if ($group == '0') 
           $qry   = "select * from maspur_group  order by grp_name";
        else
           $qry   = "select * from maspur_group where grp_name like '%$group%' order by grp_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getItemPOPendings()
    {
        mysql_query("SET NAMES utf8");
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$grpcode   = $_POST['grpcode'];

        $r=mysql_query("select item_code,item_name,uom_short_name,pend_qty,cast(pend_value as decimal(10,2)) pend_value,  cast(pend_value/pend_qty as decimal(10,2) )as rate from (select item_code,item_name,uom_short_name, sum(ptr_ord_qty)-sum(ptr_rec_qty)  as pend_qty, sum(ptr_ord_qty)*ptr_unit_rate as pend_value from trnpur_purchase_header, trnpur_purchase_trailer , maspur_item_header , mas_uom where uom_code =  item_uom and  phd_comp_code = ptr_comp_code and  phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid and ptr_ord_qty - ptr_rec_qty  > 0  and ptr_close_status = '' and item_group_code in (select subgrp_code from maspur_subgroup  where subgrp_grpcode = $grpcode) and phd_podate between '$startdate' and '$enddate' group by item_code,item_name,ptr_unit_rate) a1 order by item_name");

        $r=mysql_query("
select item_code,item_name,uom_short_name,cast(sum(pend_qty) as decimal(10,3))  pend_qty ,
cast(sum(pend_value) as decimal(10,2))  pend_value ,
cast( sum(pend_value)/sum(pend_qty)  as decimal(10,5))  rate  from ( 
  select item_code,item_name,uom_short_name, sum(ptr_ord_qty)-sum(ptr_rec_qty) 
 as pend_qty, sum(ptr_ord_qty)*ptr_unit_rate as pend_value from trnpur_purchase_header, trnpur_purchase_trailer , maspur_item_header ,  mas_uom where uom_code =  item_uom and  phd_comp_code = ptr_comp_code and  phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and  ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid and ptr_ord_qty - ptr_rec_qty  > 0  and ptr_close_status = '' and item_group_code in (select subgrp_code from maspur_subgroup  where subgrp_grpcode = $grpcode)  and phd_podate between '$startdate' and '$enddate'  group by item_code,item_name,uom_short_name ,ptr_unit_rate ) a1 group by item_code,item_name,uom_short_name  order by item_name");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getItem_Party_POPendings()
    {
        mysql_query("SET NAMES utf8");
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];
	$itemcode  = $_POST['itemcode'];

        $r=mysql_query("select * , cast(pend_value/pend_qty as decimal(10,2) )as rate from (select DATE_FORMAT(phd_podate, '%d-%m-%Y') as phd_podate,phd_pono,cust_ref,
item_name,uom_short_name,(ptr_ord_qty - ptr_rec_qty) pend_qty, (ptr_ord_qty-ptr_rec_qty) *ptr_unit_rate as pend_value  from trnpur_purchase_header, trnpur_purchase_trailer , maspur_item_header , mas_uom , massal_customer , mas_dept  where phd_sup_code = cust_code and phd_dept = dept_code and uom_code =  item_uom and  phd_comp_code = ptr_comp_code and  phd_fin_code = ptr_fin_code and phd_pono = ptr_pono and ptr_item_code = item_code and phd_comp_code = $compcode and phd_fin_code = $finid  and ptr_ord_qty - ptr_rec_qty  > 0  and ptr_close_status = '' and ptr_item_code = $itemcode and phd_podate between '$startdate' and '$enddate') a1");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSearchItemlist()
    {
        mysql_query("SET NAMES utf8");


        $group = $_POST['group'];
        if ($group == '0') 
           $qry   = "select * from maspur_item_header  order by item_name";
        else
           $qry   = "select * from maspur_item_header where item_name like '%$group%' order by item_name";



        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getIndentItemDetails()
    {
        mysql_query("SET NAMES utf8");


        $item     = $_POST['item'];
        $compcode = $_POST['compcode'];
        $fincode  = $_POST['fincode'];
        $indno    = $_POST['indno'];


       $qry   = "select * from trnpur_indent  , maspur_item_header where ind_item_code = item_code and ind_comp_code = $compcode and ind_fin_code = $fincode and ind_no = $indno and ind_item_code = $item";

//echo $qry;

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getPOItemDetails()
    {
        mysql_query("SET NAMES utf8");


        $item     = $_POST['item'];
        $compcode = $_POST['compcode'];
        $fincode  = $_POST['fincode'];
        $indno    = $_POST['indno'];


       $qry   = "select * from trnpur_purchase_header ,trnpur_purchase_trailer , maspur_item_header , massal_customer where 
   phd_comp_code = ptr_comp_code and   phd_fin_code  = ptr_fin_code and  phd_pono  = ptr_pono and  phd_comp_code = $compcode and ptr_ind_fin_code = $fincode and ptr_ind_no = $indno and  ptr_item_code = item_code   and  phd_sup_code = cust_code ";

//echo $qry;

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getGRNItemDetails()

    {
        mysql_query("SET NAMES utf8");


        $item     = $_POST['item'];
        $compcode = $_POST['compcode'];
        $fincode  = $_POST['fincode'];
        $indno    = $_POST['indno'];


       $qry   = "select * from trnpur_min_header ,trnpur_min_trailer , maspur_item_header , massal_customer where    minh_comp_code = mint_comp_code and minh_fin_code  = mint_fin_code and minh_minno  = mint_minno and minh_comp_code = $compcode and mint_ind_fin_code = $fincode and mint_ind_no = $indno and mint_item_code = item_code and minh_sup_code = cust_code";

//echo $qry;

        $r=mysql_query($qry);
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getPOHistory()
    {
        mysql_query("SET NAMES utf8");
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$startdate = $_POST['startdate'];
	$enddate   = $_POST['enddate'];

        $r=mysql_query("call sppur_rep_pohistory( $compcode,$finid,'$startdate','$enddate')");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

?>
