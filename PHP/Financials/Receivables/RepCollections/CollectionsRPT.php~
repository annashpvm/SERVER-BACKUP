<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$RPT = $_POST['RPT'];
 mysql_query("BEGIN");
 
 if ($RPT == "BILLWISE") {

	if ($compcode == "%") {
		$compcode = "%";
	}

 
 $vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_acc_finalbillcollection");
 
 $crtvew1 = mysql_query("create view vew_acc_finalbillcollection as 
				select acc_ref.accref_comp_code,recpay_oaccref_seqno, accref_voudate, 
				acc_ref.accref_finid, accref_vou_type, accref_vouno, recpay_oaccref_seqno,
					acc_trail.acctrail_led_code, recpay_amount as adj_amount
				from acc_recpay_tran
					INNER JOIN  acc_ref ON 
						acc_recpay_tran.recpay_aaccref_seqno = acc_ref.accref_seqno and 
						acc_ref.accref_voudate <=  '$todate' and acc_ref.accref_comp_code like '$compcode' and
						acc_ref.accref_finid = '$finid'
					INNER JOIN acc_trail ON 
						acctrail_accref_seqno = acc_ref.accref_seqno
					INNER JOIN acc_ledger_master ON 
						acc_trail.acctrail_led_code = led_code and acc_ledger_master.led_type = 'C'
				where acc_recpay_tran.recpay_amount > 0 and acc_recpay_tran.recpay_ref_no in 
			      			(select acc_recpay_tran.recpay_ref_no from acc_recpay_tran, acc_ref
				  		where acc_ref.accref_comp_code like '$compcode' and acc_ref.accref_finid = '$finid' and 
			      			acc_recpay_tran.recpay_aaccref_seqno = acc_ref.accref_seqno and 
			      			acc_ref.accref_voudate >=  '$fromdate'  and acc_ref.accref_voudate <=  '$todate') and 
		      			acc_recpay_tran.recpay_ref_no not in (select convert(trnsal_salret_header.reth_invno, char(20)) 
		      				from trnsal_salret_header where trnsal_salret_header.reth_comp_code like '$compcode' 
		      				and trnsal_salret_header.reth_fincode = '$finid')
				group by acc_ref.accref_comp_code,acc_ref.accref_finid,acc_ref.accref_vou_type,
				acc_ref.accref_vouno,acc_trail.acctrail_led_code;");
				
	/*$vewdropquery2 = mysql_query("DROP VIEW IF EXISTS vew_acc_invoicetag");
	
	$crtvew2 = mysql_query("CREATE view vew_acc_invoicetag as  select h.invh_comp_code,h.invh_fincode,h.invh_no,
			max(ot.ordt_cashtag) as ordt_cashtag,max(ot.ordt_dealertag) as ordt_dealertag,
			max(ot.ordt_reeltag) as ordt_reeltag,max(ot.ordt_regtag) as ordt_regtag, 
			max(ot.ordt_addnltag) as ordt_addnlltag,max(ordt_cash_dis) as ordt_cash_dis,  
			max(ordt_dealer_dis) as ordt_dealer_dis,max(ordt_reel_dis) as ordt_reel_dis,
			max(ordt_reg_dis) as ordt_reg_dis,max(ordt_addnl_dis) as ordt_addnl_dis 
			from   vew_sal_mergeinvoiceheader h,  trnsal_salret_header ret, 
			(select ordh_comp_code,ordh_fincode,ordh_ackno,ordh_ackdate from trnsal_order_header 
			where ordh_comp_code IN ('$compcode')) oh,  vew_sal_mergeinvoicetrailer t, 
			(select  ordt_comp_code, ordt_fincode,ordt_ackno,ordt_cashtag,ordt_dealertag,
			ordt_reeltag,ordt_regtag,ordt_addnltag  ,ordt_cash_dis,ordt_dealer_dis,
			ordt_reel_dis,ordt_reg_dis,ordt_addnl_dis,ordt_var_code from trnsal_order_trailer 
			where ordt_comp_code IN ('$compcode')) ot where   h.invh_comp_code=oh.ordh_comp_code 
			and h.invh_fincode=oh.ordh_fincode and h.invh_our_ordno=oh.ordh_ackno 
			and  ot.ordt_comp_code=oh.ordh_comp_code and ot.ordt_fincode=oh.ordh_fincode 
			and ot.ordt_ackno=oh.ordh_ackno and  t.invt_comp_code=h.invh_comp_code 
			and t.invt_fincode=h.invh_fincode and  t.invt_no=h.invh_no and t.invt_var=ot.ordt_var_code 
			 and ordh_comp_code IN ('$compcode')  and h.invh_no not in (select reth_invno from trnsal_salret_header
			 where reth_comp_code IN ('$compcode') and reth_fincode = '$finid') 
			 group by h.invh_comp_code,h.invh_fincode,h.invh_no");  
			 
	$vewdropquery3 = mysql_query("DROP VIEW IF EXISTS vew_acc_invoicetag");
	
	$crtvew3 = mysql_query("CREATE view vew_acc_salescommission as  select  ih.invh_comp_code,invh_fincode,invh_no,invt_urate,
			ordt_comm,ordt_cash_dis,ordt_dealer_dis,ordt_reel_dis,ordt_reg_dis,ordt_addnl_dis,
			max(invt_item) as invt_item,sum(invt_wt) as invt_wt from vew_sal_mergeinvoiceheader ih, 
			(  select ordh_comp_code,ordh_fincode,ordh_ackno,ordh_ackdate from trnsal_order_header 
			where ordh_comp_code not in(1,4)  union all  select 1 as ordh_comp_code,ordh_fincode,ordh_ackno,
			ordh_ackdate from trnsal_order_header where ordh_comp_code in (1,4)) oh,  
			vew_sal_mergeinvoicetrailer it,      (  select ordt_comp_code, ordt_fincode,ordt_ackno,ordt_cashtag,
			ordt_dealertag,ordt_reeltag,ordt_regtag,ordt_addnltag ,ordt_cash_dis,ordt_dealer_dis,ordt_reel_dis,
			ordt_reg_dis,ordt_addnl_dis ,ordt_comm,ordt_var_code from trnsal_order_trailer where 
			ordt_comp_code not in(1,4)  union all  select 1 as ordt_comp_code, ordt_fincode,ordt_ackno,
			ordt_cashtag,ordt_dealertag,ordt_reeltag,ordt_regtag,ordt_addnltag ,ordt_cash_dis,ordt_dealer_dis,
			ordt_reel_dis,ordt_reg_dis,ordt_addnl_dis ,ordt_comm,ordt_var_code from trnsal_order_trailer 
			where ordt_comp_code  in(1,4)  ) ot  where  ih.invh_comp_code=oh.ordh_comp_code 
			and ih.invh_fincode=oh.ordh_fincode and ih.invh_our_ordno=oh.ordh_ackno and  
			ot.ordt_comp_code=oh.ordh_comp_code and ot.ordt_fincode=oh.ordh_fincode and 
			ot.ordt_ackno=oh.ordh_ackno and  it.invt_comp_code=ih.invh_comp_code and 
			it.invt_fincode=ih.invh_fincode and   it.invt_no=ih.invh_no and it.invt_var=ot.ordt_var_code  and 
			ordh_comp_code IN ('$compcode')  group by ih.invh_comp_code,invh_fincode,invh_no,invt_urate,ordt_comm,
			ordt_cash_dis,ordt_dealer_dis,ordt_reel_dis,ordt_reg_dis,ordt_addnl_dis ");			 				
 
 }
 
 
 /*
 
	$vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_mis_sales_collections");

    $crtvew1 = mysql_query("create view vew_mis_sales_collections as (
			select a.accref_comp_Code, b.acctran_led_code as ledcode, d.recadjdate as coll_date, 
			a.accref_vouno, a.accref_voudate,
			sum(d.recpay_amount) as collection
			from acc_ref a, acc_tran b, acc_ledger_master c, acc_recpay_tran d
			where b.acctran_accref_seqno = a.accref_seqno  and 
			a.accref_comp_Code in ('$compcode') and a.accref_finid = '$finid' and 
			b.acctran_led_code = c.led_code and c.led_type = 'C' and
			a.accref_seqno = d.recpay_aaccref_seqno and
			d.recadjdate >= '$fromdate' and  d.recadjdate <=  '$todate'  and
			a.accref_vou_type in ('BR') group by a.accref_comp_Code, b.acctran_led_code, d.recadjdate,
			a.accref_vouno, a.accref_voudate   
              Union All 
			select a.accref_comp_Code, b.acctran_led_code as ledcode,a.accref_voudate as coll_date, 'On A/C' as bill_refno, 
			a.accref_voudate as bill_voudate, sum(b.acctran_totamt) as collection from acc_ref a, acc_tran b, acc_ledger_master c 
			where a.accref_vou_type in ('BR') and b.acctran_led_code = c.led_code and c.led_type = 'C' 
			and a.accref_voudate >= '$fromdate' and  a.accref_voudate <= '$todate' 
			and  a.accref_comp_Code = 1 and a.accref_finid = '$finid'   and  accref_seqno not in 
			(select d.recpay_aaccref_seqno from acc_recpay_tran d 
			where d.recadjdate >= '$fromdate' and  d.recadjdate <=  '$todate' 
			group by d.recpay_ref_no) group by a.accref_comp_Code ,b.acctran_led_code,a.accref_voudate 

              Union All 
			select a.accref_comp_Code, b.acctran_led_code as ledcode,a.accref_voudate as coll_date, 'On A/C' as bill_refno, 
			a.accref_voudate as bill_voudate, sum(b.acctran_totamt) as collection from acc_ref a, acc_tran b, acc_ledger_master c 
			where a.accref_vou_type in ('BR') and b.acctran_led_code = c.led_code and c.led_type = 'C' 
			and a.accref_voudate >= '$fromdate' and  a.accref_voudate <= '$todate' 
			and  a.accref_comp_Code = 2 and a.accref_finid = '$finid'   and  accref_seqno not in 
			(select d.recpay_aaccref_seqno from acc_recpay_tran d 
			where d.recadjdate >= '$fromdate' and  d.recadjdate <=  '$todate' 
			group by d.recpay_ref_no) group by a.accref_comp_Code ,b.acctran_led_code,a.accref_voudate 
              Union All 
			select a.accref_comp_Code, b.acctran_led_code as ledcode,a.accref_voudate as coll_date, 'On A/C' as bill_refno, 
			a.accref_voudate as bill_voudate, sum(b.acctran_totamt) as collection from acc_ref a, acc_tran b, acc_ledger_master c 
			where a.accref_vou_type in ('BR') and b.acctran_led_code = c.led_code and c.led_type = 'C' 
			and a.accref_voudate >= '$fromdate' and  a.accref_voudate <= '$todate' 
			and  a.accref_comp_Code = 3 and a.accref_finid = '$finid'   and  accref_seqno not in 
			(select d.recpay_aaccref_seqno from acc_recpay_tran d 
			where d.recadjdate >= '$fromdate' and  d.recadjdate <=  '$todate' 
			group by d.recpay_ref_no) group by a.accref_comp_Code ,b.acctran_led_code,a.accref_voudate )");*/
 

       
 
?>
