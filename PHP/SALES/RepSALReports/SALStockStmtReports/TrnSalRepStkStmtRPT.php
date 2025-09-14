<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

$compcode = $_POST['compcode'];
$finid = $_POST['finid'];
$fromdate = $_POST['fromdate'];
$todate = $_POST['todate'];
$RPT = $_POST['RPT'];
 mysql_query("BEGIN");
 
 if ($RPT == "GSstkstmt") {
 
	$vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_sal_rt12stat_d");

	$vewdropquery2 = mysql_query("DROP VIEW IF EXISTS vew_sal_rt12stat_v");

	$vewdropquery3 = mysql_query("DROP VIEW IF EXISTS vew_sal_rt12stat");

	mysql_query("COMMIT"); 
	
        
    $compcode = 1;
    $pst_str4 = "(1)";
    $crtvew1 = mysql_query("create view vew_sal_rt12stat_d as
		select '$compcode'  as comp_code,'$finid' as fincode, a.var_code,unit,sum(open_pulp) as open_pulp, case when (sum(stk_qty) + sum(sal_qty) - sum(prod_qty) - sum(salr_qty)-sum(open_pulp)) <=0 then 0 
		else (sum(stk_qty) + sum(sal_qty) - sum(prod_qty) -sum(salr_qty)-sum(open_pulp)) end as opstk, sum(pulp_stk) as pulp_stk,case when sum(stk_nos) <=0 then 0
              else sum(stk_nos) end As stk_nos, sum(bed_val) As bed_val, sum(cess_val) As cess_val, 
              sum(sal_val) As sal_val,sum(stk_qty) As stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)-sum(pulp_nos)-sum(open_pulp) as nos, sum(prod_nos) as prod_nos, sum(sal_nos) as sal_nos,sum(pulp_nos) as pulp_nos,sum(oppulp_nos) as oppulp_nos from 
              (select b.var_code as var_code,b.var_unit as unit,0 as open_pulp,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as pulp_stk,0 as stk_nos, 0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff,0 as bed_val, 
              0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_finish_stock a, massal_variety b  where a.stk_var_code = b.var_code 
              and (stk_ent_date <= '$todate') and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$todate') or  (stk_deltag = 'T' and stk_deldate > '$todate')))
              and a.stk_comp_code in $pst_str4 group by b.var_code,b.var_unit Union All select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as pulp_stk,count(*) as stk_nos, 0 as prod_nos,0 as sal_nos,0 as salr_nos,'' as tariff,0 as bed_val,  0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_finish_stock where stk_destag <> 'T' and stk_deltag <> 'T' and (stk_ent_date <= '$todate') and (stk_desdt > '$todate' or stk_destag <> 'T') and stk_comp_code = '$compcode' group by stk_var_code,stk_units union all 
              select c.var_code as var_code,c.var_unit as unit,0 as open_pulp,0 as stk_qty,sum(sprdt_weight)/1000  as prod_qty, 0 as sal_qty,0 as salr_qty,0 as pulp_stk,0 as stk_nos,count(*) as prod_nos, 0 as sal_nos,0 as salr_nos, max(sprdt_tariffno) as tariff ,
              0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_prod_header a, trnsal_prod_trailer b, 
              massal_variety c  Where b.sprdt_var = c.var_code and a.sprdh_no = b.sprdt_no And 
              a.sprdh_fincode = b.sprdt_fincode and a.sprdh_compcode = b.sprdt_compcode and a.sprdh_compcode in $pst_str4 and a.sprdh_date >= '$fromdate' 
              and  a.sprdh_date <= '$todate' group by c.var_code,c.var_unit  Union All 
              select b.invt_var as var_code,b.var_unit as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,sum(invt_wt)/1000 as sal_qty, 0 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,sum(invt_nos) as sal_nos,0 as salr_nos, invt_hsncode as tariff,0 as bed_val,
              0 as cess_val,sum(invt_taxable) as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_invoice_header a, (select invt_comp_code,invt_no,a.invt_var,b.var_unit,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos,invt_hsncode,sum(invt_taxable) as invt_taxable 
              from trnsal_invoice_trailer a,massal_variety b where a.invt_var=b.var_code group by invt_comp_code,invt_no,invt_var,b.var_unit,invt_hsncode) b  where a.invh_no = b.invt_no
              and a.invh_comp_code = b.invt_comp_code and a.invh_date >= '$fromdate' and a.invh_date <= '$todate' and  invt_comp_code in $pst_str4
              group by b.invt_var,b.var_unit,invt_hsncode union all select distinct(rett_var) as var_code,c.var_unit as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, sum(rett_wt)/1000 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,count(*) as salr_nos,max(rett_tariffno) as tariff,
              0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code in $pst_str4 and a.reth_comp_code = b.rett_comp_code and 
              a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$fromdate' and a.reth_date <= '$todate' group by rett_var,c.var_unit union all
              select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, 0 as salr_qty,sum(stk_wt)/1000 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff, 0 as bed_val,0 as cess_val,0 as sal_val,count(*) as pulp_nos,0 as oppulp_nos from trnsal_finish_stock where stk_deldate >= '$fromdate' and stk_deldate <= '$todate' and stk_deltag = 'T' 
              and stk_comp_code in $pst_str4 group by stk_var_code,stk_units union all  select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, 0 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff, 0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,count(*) as oppulp_nos from trnsal_finish_stock where stk_deldate < '$fromdate' and (stk_desdt > '$fromdate' or stk_destag <> 'T')  and stk_comp_code in $pst_str4 group by stk_var_code,stk_units)a 
               group by a.var_code,unit having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)- sum(open_pulp)) > 0 or sum(prod_qty) > 0 or sum(sal_qty) > 0");
        
        
        
    
    
    $compcode = 3;
    $pst_str4 = "(3)";
    $crtvew2 = mysql_query("create view vew_sal_rt12stat_v as
              select '$compcode'  as comp_code,'$finid' as fincode, a.var_code,unit,sum(open_pulp) as open_pulp, case when (sum(stk_qty) + sum(sal_qty) - sum(prod_qty) - sum(salr_qty)-sum(open_pulp)) <=0 then 0 
              else (sum(stk_qty) + sum(sal_qty) - sum(prod_qty) -sum(salr_qty)-sum(open_pulp)) end as opstk, sum(pulp_stk) as pulp_stk,case when sum(stk_nos) <=0 then 0
              else sum(stk_nos) end As stk_nos, sum(bed_val) As bed_val, sum(cess_val) As cess_val, 
              sum(sal_val) As sal_val,sum(stk_qty) As stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)-sum(pulp_nos)-sum(open_pulp) as nos, sum(prod_nos) as prod_nos, sum(sal_nos) as sal_nos,sum(pulp_nos) as pulp_nos,sum(oppulp_nos) as oppulp_nos from 
              (select b.var_code as var_code,b.var_unit as unit,0 as open_pulp,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as pulp_stk,0 as stk_nos, 0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff,0 as bed_val, 
              0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_finish_stock a, massal_variety b  where a.stk_var_code = b.var_code 
              and (stk_ent_date <= '$todate') and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$todate') or  (stk_deltag = 'T' and stk_deldate > '$todate')))
              and a.stk_comp_code in $pst_str4 group by b.var_code,b.var_unit Union All select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as pulp_stk,count(*) as stk_nos, 0 as prod_nos,0 as sal_nos,0 as salr_nos,'' as tariff,0 as bed_val,  0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_finish_stock where stk_destag <> 'T' and stk_deltag <> 'T' and (stk_ent_date <= '$todate') and (stk_desdt > '$todate' or stk_destag <> 'T') and stk_comp_code = '$compcode' group by stk_var_code,stk_units union all 
              select c.var_code as var_code,c.var_unit as unit,0 as open_pulp,0 as stk_qty,sum(sprdt_weight)/1000  as prod_qty, 0 as sal_qty,0 as salr_qty,0 as pulp_stk,0 as stk_nos,count(*) as prod_nos, 0 as sal_nos,0 as salr_nos, max(sprdt_tariffno) as tariff ,
              0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_prod_header a, trnsal_prod_trailer b, 
              massal_variety c  Where b.sprdt_var = c.var_code and a.sprdh_no = b.sprdt_no And 
              a.sprdh_fincode = b.sprdt_fincode and a.sprdh_compcode = b.sprdt_compcode and a.sprdh_compcode in $pst_str4 and a.sprdh_date >= '$fromdate' 
              and  a.sprdh_date <= '$todate' group by c.var_code,c.var_unit  Union All 
              select b.invt_var as var_code,b.var_unit as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,sum(invt_wt)/1000 as sal_qty, 0 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,sum(invt_nos) as sal_nos,0 as salr_nos, invt_hsncode as tariff,0 as bed_val,
              0 as cess_val,sum(invt_taxable) as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_invoice_header a, (select invt_comp_code,invt_no,a.invt_var,b.var_unit,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos,invt_hsncode,sum(invt_taxable) as invt_taxable 
              from trnsal_invoice_trailer a,massal_variety b where a.invt_var=b.var_code group by invt_comp_code,invt_no,invt_var,b.var_unit,invt_hsncode) b  where a.invh_no = b.invt_no
              and a.invh_comp_code = b.invt_comp_code and a.invh_date >= '$fromdate' and a.invh_date <= '$todate' and  invt_comp_code in $pst_str4
              group by b.invt_var,b.var_unit,invt_hsncode union all select distinct(rett_var) as var_code,c.var_unit as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, sum(rett_wt)/1000 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,count(*) as salr_nos,max(rett_tariffno) as tariff,
              0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,0 as oppulp_nos from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code in $pst_str4 and a.reth_comp_code = b.rett_comp_code and 
              a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$fromdate' and a.reth_date <= '$todate' group by rett_var,c.var_unit union all
              select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, 0 as salr_qty,sum(stk_wt)/1000 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff, 0 as bed_val,0 as cess_val,0 as sal_val,count(*) as pulp_nos,0 as oppulp_nos from trnsal_finish_stock where stk_deldate >= '$fromdate' and stk_deldate <= '$todate' and stk_deltag = 'T' 
              and stk_comp_code in $pst_str4 group by stk_var_code,stk_units union all  select stk_var_code as var_code,stk_units as unit,0 as open_pulp,0 as stk_qty,0 as prod_qty,0 as sal_qty, 0 as salr_qty,0 as pulp_stk,0 as stk_nos,0 as prod_nos,0 as sal_nos,0 as salr_nos,max(stk_tariffno) as tariff, 0 as bed_val,0 as cess_val,0 as sal_val,0 as pulp_nos,count(*) as oppulp_nos from trnsal_finish_stock where stk_deldate < '$fromdate' and (stk_desdt > '$fromdate' or stk_destag <> 'T')  and stk_comp_code in $pst_str4 group by stk_var_code,stk_units)a 
               group by a.var_code,unit having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)- sum(open_pulp)) > 0 or sum(prod_qty) > 0 or sum(sal_qty) > 0");

    
    $crtvew2 = mysql_query("create view vew_sal_rt12stat as select * from vew_sal_rt12stat_dpm union all select * from vew_sal_rt12stat_vjpm");
    
    
    $compcode = 1;	
    

			mysql_query("COMMIT");                        
			
}
else if ($RPT == "stkVarty" || $RPT == "stkVartyGrp") {

	if ($compcode == 1){
	   $m = "(1)";
	   $m2 = "(3)";
	}
	else if ($compcode == 3) {
	   $m = "(3)";
	   $m2 = "(1)";
	}
	else {
	   $m = "(90)";
	   $m2 = "(90)";
	}

	$vewdropquery1 = mysql_query("DROP VIEW IF EXISTS vew_sal_rt12stat");
	
	$crtvew1 = mysql_query("create view vew_sal_rt12stat as
                select '$compcode'   as comp_code,'$finid' as fincode, a.var_code, unit,case when (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty)-sum(stk_transfer_in)+sum(stk_transfer_out)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)  ) <=0 then 0  else (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty)-sum(stk_transfer_in)+sum(stk_transfer_out)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)) end as opstk,sum(pulp_stk) as pulp_stk,sum(stk_transfer_in) as stk_transfer_in,sum(stk_transfer_out) as stk_transfer_out,sum(move_to_wip) as move_to_wip,sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos ,sum(wt_change2) as wt_changed2  from  ( 
                select stk_var_code as var_code,var_unit as unit,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(stk_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$todate') and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$todate') or  (stk_deltag = 'T' and stk_deldate > '$todate'))) and stk_comp_code in $m  group by stk_var_code,var_unit 
                Union All  select stk_var_code as var_code,var_unit as unit,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,count(*) as stk_nos, max(stk_tariffno) as tariffno,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and stk_destag <> 'T' and stk_deltag <> 'T' and (stk_ent_date <= '$todate') and (stk_desdt > '$todate' or stk_destag <> 'T') and stk_comp_code in $m  group by stk_var_code ,var_unit 
                Union All  select stk_var_code as var_code,var_unit as unit, 0 as stk_qty, sum(stk_wt)/1000 as prod_qty,0 as sal_qty           ,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(stk_tariffno) as tariffno,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_ent_date >= '$fromdate'  and stk_ent_date <= '$todate'   and stk_comp_code in $m  group by stk_var_code ,var_unit 
                Union All  select b.invt_var as var_code,b.var_unit as unit,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos ,invt_hsncode as tariffno  , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst , sum(invh_igst_amt/invh_totwt*invt_wt) as igst ,0 as wt_change2  from trnsal_invoice_header a, (select invt_comp_code,invt_no,a.invt_var,b.var_unit,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable ,invt_hsncode  ,0 as wt_change2  from trnsal_invoice_trailer a,massal_variety b where a.invt_var=b.var_code group by invt_hsncode,invt_comp_code,invt_no,invt_var,b.var_unit) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_no = b.invt_no and a.invh_comp_code = b.invt_comp_code 
                and a.invh_date >= '$fromdate' and a.invh_date <= '$todate' and  (invt_comp_code in $m  )  group by b.invt_var,b.var_unit,invt_hsncode,cust_taxtag 
                Union All  select distinct(rett_var) as var_code,var_unit as unit,0 as stk_qty,0 as prod_qty            ,0 as sal_qty  ,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip, sum(rett_wt)/1000 as salr_qty,0 as pulp_stk,0 as wt_change,0 as stk_nos,max(rett_tariffno) as tariffno, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,0 as wt_change2  from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code in $m and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$fromdate' and a.reth_date <= '$todate' group by rett_var,var_unit  
                Union All  select stk_var_code as var_code,var_unit as unit,0 as stk_qty,0 as prod_qty,0 as sal_qty ,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip, 0 as salr_qty,sum(stk_wt)/1000 as pulp_stk,0 as wt_change,0  as stk_nos,max(stk_tariffno) as tariffno, 0 as sal_val,0 as cgst,0 as sgst,0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and stk_deldate >= '$fromdate' and stk_deldate <= '$todate' and stk_deltag = 'T'  and stk_comp_code in $m group by stk_var_code ,var_unit 
                Union All  select tr_varcode as var_code,var_unit as unit,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as stk_transfer_in,0 as stk_transfer_out,sum(tr_wt)/1000 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_whouse_stock_remove , massal_variety where  tr_varcode = var_code and tr_date >= '$fromdate' and tr_date <= '$todate' and tr_compcode in $m group by tr_varcode,var_unit 
                Union All  select tr_varcode as var_code,var_unit as unit,0 as stk_qty, 0 as prod_qty,0 as sal_qty,sum(tr_wt)/1000  as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_mill_transfer a,massal_variety b where  a.tr_varcode=b.var_code and tr_transfer_mill in $m And tr_finyear >= '$finid'   and tr_date >= '$fromdate'  and  tr_date <= '$todate'  group by tr_varcode,var_unit 
                Union All  select tr_varcode as var_code,var_unit as unit,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0  as stk_transfer_in,sum(tr_wt)/1000 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_mill_transfer a,massal_variety b where  a.tr_varcode=b.var_code and tr_compcode  in $m And tr_finyear >= '$finid' and tr_date >= '$fromdate'  and  tr_date <= '$todate'  and (tr_invno = 0 or (tr_invno <> 0 and tr_invdate >'$todate'))  group by tr_varcode,var_unit 
                Union All  select tr_varcode as var_code,var_unit as unit,sum(tr_wt)/1000* -1 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_mill_transfer a,massal_variety b where  a.tr_varcode=b.var_code and tr_transfer_mill in $m And tr_finyear >= '$finid'   and tr_date > '$todate' group by tr_varcode,var_unit 
                Union All  select tr_varcode as var_code,var_unit as unit,sum(tr_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0  as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2   from trnsal_mill_transfer a,massal_variety b where  a.tr_varcode=b.var_code and tr_compcode  in $m And tr_finyear >= '$finid' and tr_date > '$todate'  group by tr_varcode,var_unit 
                Union All 
                select itemcode as var_code,var_unit as unit,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0  as stk_transfer_in,0 as stk_transfer_out,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0  as wt_change,       0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,sum(newweight-oldweight)/1000 as wt_change2 from trn_sal_reelweight_change a,massal_variety b, trnsal_finish_stock c where stk_sr_no = srno and a.itemcode=b.var_code and comp_code in $m And fin_code >= '$finid' and ent_date >= '$fromdate' and ent_date <= '$todate'  and stk_ent_date < '$fromdate'  group by itemcode,var_unit  )a group by a.var_code,unit having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(sal_qty) >0 or sum(stk_transfer_in) > 0  or sum(stk_transfer_out) > 0 or sum(pulp_stk) > 0 or sum(move_to_wip) > 0");

mysql_query("COMMIT");           

}
       
 
?>
