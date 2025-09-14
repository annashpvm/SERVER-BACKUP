<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$curdate = $_POST['curdate'];
$RPT = $_POST['RPT'];
 mysql_query("BEGIN");
 
 if ($RPT == "1") {
 
	$vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_sales_stock");

	mysql_query("COMMIT"); 
	
	$crtvew1 = mysql_query("create view vew_sales_stock as select var_name,sum(stock)/1000 as stock from (select var_name,0 as stock from massal_Variety union all select var_name,sum(stk_wt) as stock from trnsal_finish_stock a, massal_variety b where  stk_var_code = var_code and stk_comp_code = '$compcode'  and stk_finyear <= '$finid'  and stk_destag = '' and stk_deltag  ='' group by var_name) a group by var_name ");
	
	mysql_query("COMMIT");  
	
	$vewdropquery2 = mysql_query("DROP VIEW IF EXISTS vew_sal_new_order");

	mysql_query("COMMIT"); 
	
	$crtvew2 = mysql_query(" create view vew_sal_new_order as 
             select  compcode,  fincode,  ord_no, ord_date, agent, party, rate, varcode,case when sum(opqty- op_despqty) > 0.300 then sum(opqty- op_despqty) else 0 end as opqty ,sum(ord_qty) as ord_qty ,sum(desp_qty) as desp_qty  from ( 
             select ordh_comp_code as compcode, ordh_fincode as fincode, ordh_ackno as ord_no,ordh_ackdate as ord_date,ordh_agent as agent,ordh_party as party,ordh_dest as destination,ordt_rate as rate,ordt_var_code as varcode,ordt_qty as opqty,0 as op_despqty,0 as ord_qty,0 as desp_qty  from trnsal_order_header a, trnsal_order_trailer b where ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordh_ackno = ordt_ackno and ordh_comp_code = '$compcode' and ordh_fincode = '$finid' and ordh_ackdate >= '$curdate' and ordh_ackdate < '$fromdate' and ordt_clo_stat = '' 
             Union All 
             select ordh_comp_code as compcode, ordh_fincode as fincode, ordh_ackno as ord_no,ordh_ackdate as ord_date,ordh_agent as agent,ordh_party as party,ordh_dest as destination,ordt_rate as rate,ordt_var_code as varcode,0 as opqty,0 as op_despqty,ordt_qty as ord_qty,0 as desp_qty  from trnsal_order_header a, trnsal_order_trailer b where ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordh_ackno = ordt_ackno and ordh_comp_code = '$compcode'   and ordh_fincode = '$finid' and ordh_ackdate >= '$fromdate' and ordh_ackdate <= '$todate' and ordt_clo_stat = '' 
             Union All 
             select invh_comp_code as compcode, invh_fincode as fincode, invh_our_ordno as ord_no,invh_our_orddt as ord_date,invh_agent as agent,invh_party as party,invh_dest as destination,invt_urate as rate,invt_var as varcode,0 as opqty,0 as op_despqty,invt_wt/1000  as ord_qty,0 as desp_qty from trnsal_invoice_header a, trnsal_invoice_trailer b , trnsal_order_header c, trnsal_order_trailer d  where invh_comp_code = invh_comp_code and invh_fincode = invt_fincode and invh_no = invt_no and invh_comp_code = '$compcode'   and invh_fincode = '$finid' and ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordh_ackno = ordt_ackno and ordh_comp_code = invh_comp_code and ordh_fincode = invh_fincode  and ordh_ackdate >= '$fromdate' and ordh_ackdate <= '$todate' and invh_our_ordno = ordh_ackno and ordt_var_code = invt_var and ordt_clo_stat = 'T' and invh_party <> 2317 
             Union All 
             select invh_comp_code as compcode, invh_fincode as fincode, invh_our_ordno as ord_no,invh_our_orddt as ord_date,invh_agent as agent,invh_party as party,invh_dest as destination,invt_urate as rate,invt_var as varcode,invt_wt/1000 as opqty,0 as op_despqty,0  as ord_qty,0 as desp_qty from trnsal_invoice_header a, trnsal_invoice_trailer b , trnsal_order_header c, trnsal_order_trailer d  where invh_comp_code = invh_comp_code and invh_fincode = invt_fincode and invh_no = invt_no and invh_comp_code = '$compcode'   and invh_fincode = '$finid' and ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordh_ackno = ordt_ackno and ordh_comp_code = invh_comp_code and ordh_fincode = invh_fincode  and ordh_ackdate >= '$curdate' and ordh_ackdate < '$fromdate' and invh_our_ordno = ordh_ackno and ordt_var_code = invt_var and ordt_clo_stat = 'T' and invh_party <> 2317 
             Union All 
             select invh_comp_code as compcode, invh_fincode as fincode, invh_our_ordno as ord_no,invh_our_orddt as ord_date,invh_agent as agent,invh_party as party,invh_dest as destination,invt_urate as rate,invt_var as varcode,0 as opqty,0 as op_despqty,0  as ord_qty,invt_wt/1000 as desp_qty   from trnsal_invoice_header a, trnsal_invoice_trailer b where invh_comp_code = invh_comp_code and invh_fincode = invt_fincode and invh_no = invt_no and invh_comp_code = '$compcode'   and invh_fincode = '$finid' and invh_date >= '$fromdate' and invh_date <= '$todate' and invh_party <> 2317 
             Union All 
             select invh_comp_code as compcode, invh_fincode as fincode, invh_our_ordno as ord_no,invh_our_orddt as ord_date,invh_agent as agent,invh_party as party,invh_dest as destination,invt_urate as rate,invt_var as varcode,0 as opqty,invt_wt/1000 as op_despqty,0  as ord_qty,0 as desp_qty   from trnsal_invoice_header a, trnsal_invoice_trailer b where invh_comp_code = invh_comp_code and invh_fincode = invt_fincode and invh_no = invt_no and invh_comp_code = '$compcode'  and invh_fincode = '$finid' and invh_date >= '$curdate' and invh_date < '$fromdate' and invh_our_orddt >= '$curdate' and invh_party <> 2317 
             ) a  group by compcode,  fincode,  ord_no, ord_date, agent, party, rate, varcode having sum(opqty - op_despqty) + sum(ord_qty) + sum(desp_qty) >= 0 ");
	
	mysql_query("COMMIT");  	
	



       
 
?>
