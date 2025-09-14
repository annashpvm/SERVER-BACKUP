<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='viewcreate';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "viewcreate":
		create_view_vew_sal_rt12stat();
		break;
		case "loadOpeningClosingStock":
		findOpeningClosingStock();
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
    


function create_view_vew_sal_rt12stat()
    {
        mysql_query("SET NAMES utf8");
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
        $query1    = "drop view IF EXISTS vew_sal_rt12stat";
        $result1   = mysql_query($query1);
/*
$query1="create view vew_sal_rt12stat as select '$compcode'     as comp_code,'$finid' as fincode, a.var_code, case when (sum(stk_qty)+sum(sal_qty)- 
sum(prod_qty)-sum(salr_qty)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)  ) <=0 then 0  else (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)) end as opstk,sum(pulp_stk) as pulp_stk,sum(move_to_wip) as move_to_wip,sum(wt_change) as wt_change, sum(stk_nos) as stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos ,sum(wt_change2) as wt_changed2  from  (
  select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,0 as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate' ))) and stk_comp_code in ('$compcode' )  group by stk_var_code
  union all
  select stk_var_code as var_code,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$enddate' ) or  
(stk_deltag = 'T' and stk_deldate > '$enddate' ))) and stk_comp_code in ('$compcode' )  group by stk_var_code
  union all
  select stk_var_code as var_code,  0 as stk_qty, sum(stk_wt)/1000 as prod_qty,0 as sal_qty,0 as pulp_stk,0 as move_to_wip,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2  from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate'    and stk_comp_code in ('$compcode'  )  group by stk_var_code 
  union all
  select b.invt_var as var_code,
0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as stk_transfer_in,0 as salr_qty,0 as pulp_qty,0 as wt_change, 0 as stk_nos ,sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,
sum(invh_igst_amt/invh_totwt*invt_wt) as igst ,0 as wt_change2  from trnsal_invoice_header a, (
select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable ,0 as wt_change2  from trnsal_invoice_trailer a,massal_variety b where a.invt_var=b.var_code group by invt_seqno,invt_var
) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate'  and  (invh_comp_code in ('$compcode'  )  )  group by b.invt_var, cust_taxtag  
Union All  
select distinct(rett_var) as var_code,0 as stk_qty,0 as prod_qty ,0 as sal_qty  ,0 as move_to_wip, sum(rett_wt)/1000 as salr_qty,0 as pulp_stk, 0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,0 as wt_change2  from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code in ('$compcode'  ) and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var,var_unit 
Union All  
select stk_var_code as var_code,0 as stk_qty,0 as prod_qty,0 as sal_qty ,0 as move_to_wip, 0 as salr_qty,sum(stk_wt)/1000 as pulp_stk,0 as wt_change,0  as stk_nos ,0 as sal_val,0 as cgst,0 as sgst,0 as igst ,0 as wt_change2  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and stk_deldate >= '$startdate'  and stk_deldate <= '$enddate'  and stk_deltag = 'T'  and stk_comp_code in ('$compcode'  ) group by stk_var_code 
)a  group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or
sum(sal_qty) >0 or sum(pulp_stk) > 0 or sum(move_to_wip) > 0";


-- (sum(stk_nos)+sum(sal_nos)- sum(prod_nos)-sum(salret_nos)+-sum(wt_chg_nos)+sum(pulp_nos)) as opnos,
*/
$query1="create view vew_sal_rt12stat as select '$compcode' as comp_code,'$finid' as fincode, a.var_code, case when (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)  ) <=0 then 0  else (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum( move_to_wip)-sum(wt_change)+sum(pulp_stk)) end as opstk,
sum(pulp_stk) as pulp_stk,sum(move_to_wip) as move_to_wip,sum(wt_change) as wt_change, sum(stk_nos) as stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos ,sum(wt_change2) as wt_changed2 , 
sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos 
from  (
  select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as move_to_wip,0 as salr_qty,0 as pulp_stk,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2 ,
  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos 
  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag = 'T' and stk_desdt > '$enddate') or  (stk_deltag = 'T' and stk_deldate > '$enddate' ))) and stk_comp_code in ('$compcode' )  group by stk_var_code
  union all
  select stk_var_code as var_code,  0 as stk_qty, sum(stk_wt)/1000 as prod_qty,0 as sal_qty,0 as pulp_stk,0 as move_to_wip,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as wt_change2 ,  count(*) as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos  from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate'    and stk_comp_code in ('$compcode'  )  group by stk_var_code 
  union all
  select b.invt_var as var_code,
0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as stk_transfer_in,0 as salr_qty,0 as pulp_qty,0 as wt_change, 0 as stk_nos ,sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,
sum(invh_igst_amt/invh_totwt*invt_wt) as igst ,0 as wt_change2 ,  0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos  from trnsal_invoice_header a, (
select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable ,0 as wt_change2  from trnsal_invoice_trailer a,massal_variety b where a.invt_var=b.var_code group by invt_seqno,invt_var
) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate'  and  (invh_comp_code in ('$compcode'  )  )  group by b.invt_var, cust_taxtag  
Union All  
select distinct(rett_var) as var_code,0 as stk_qty,0 as prod_qty ,0 as sal_qty  ,0 as move_to_wip, sum(rett_wt)/1000 as salr_qty,0 as pulp_stk, 0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,0 as wt_change2  ,  0 as prod_nos,0 as sal_nos,count(*) as salret_nos,0 as wtchg_nos ,0 as pulp_nos  from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code in ('$compcode'  ) and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var,var_unit 
Union All  
select stk_var_code as var_code,0 as stk_qty,0 as prod_qty,0 as sal_qty ,0 as move_to_wip, 0 as salr_qty,sum(stk_wt)/1000 as pulp_stk,0 as wt_change,0  as stk_nos ,0 as sal_val,0 as cgst,0 as sgst,0 as igst ,0 as wt_change2,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*)  as pulp_nos   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and stk_deldate >= '$startdate'  and stk_deldate <= '$enddate'  and stk_deltag = 'T'  and stk_comp_code in ('$compcode'  ) group by stk_var_code 
Union All  
select oldsize as var_code,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as move_to_wip,0 as salr_qty,
0 as pulp_stk,sum(oldweight-newweight)/1000  as wt_change,   0 as stk_nos,max(var_tariffno) as tariffno, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,
0 as wt_change2 from trnsal_reelweight_change a,massal_variety b, trnsal_finish_stock c 
where oldweight > newweight and  stk_sr_no = srno and a.oldsize=b.var_code and comp_code '$compcode'  and fin_code >= '$finid'  and ent_date >= '$startdate'  and ent_date <= '$enddate'   and stk_ent_date < '$startdate'   group by oldsize


)a  group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or
sum(sal_qty) >0 or sum(pulp_stk) > 0 or sum(move_to_wip) > 0";
  $result1= mysql_query($query1);
}
//echo $query1;



function findOpeningClosingStock()
{


        mysql_query("SET NAMES utf8");

	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];


        $lastdate =  date('Y-m-d', strtotime($startdate. " - 1 days"));
        $monthfirtsdate =  date('Y-m-01', strtotime($startdate));

//echo $monthfirtsdate;

        $query1= "
select 
sum(IBitOPStkNos) IBitOPStkNos,
 sum(IFullOPStkNos) IFullOPStkNos, sum(IIBitOPStkNos) IIBitOPStkNos, sum(IIFullOPStkNos) IIFullOPStkNos, 
 sum(IBitOPStkWt) IBitOPStkWt, sum(IFullOPStkWt) IFullOPStkWt, sum(IIBitOPStkWt) IIBitOPStkWt, 
 sum(IIFullOPStkWt) IIFullOPStkWt, sum(IBitCLOStkNos) IBitCLOStkNos, 
 sum(IFullCLOStkNos) IFullCLOStkNos, sum(IIBitCLOStkNos) IIBitCLOStkNos, sum(IIFullCLOStkNos) IIFullCLOStkNos, 
 sum(IBitCLOStkWt) IBitCLOStkWt, sum(IFullCLOStkWt) IFullCLOStkWt, sum(IIBitCLOStkWt) IIBitCLOStkWt, sum(IIFullCLOStkWt) IIFullCLOStkWt, 
 sum(openingstock) openingstock, sum(openingnos) openingnos, sum(closingstock) closingstock , sum(closingnos) closingnos
from (

select 

case when sotype  = 'I' and  reeltype = 'B' then sum(opnos) else 0 end as IBitOPStkNos, 
case when sotype  = 'I' and  reeltype = 'F' then sum(opnos) else 0 end as IFullOPStkNos, 
case when sotype  = 'II' and  reeltype = 'B' then sum(opnos) else 0 end as IIBitOPStkNos, 
case when sotype  = 'II' and  reeltype = 'F' then sum(opnos) else 0 end as IIFullOPStkNos, 

case when sotype  = 'I' and  reeltype = 'B' then sum(opstk) else 0 end as IBitOPStkWt, 
case when sotype  = 'I' and  reeltype = 'F' then sum(opstk) else 0 end as IFullOPStkWt, 
case when sotype  = 'II' and  reeltype = 'B' then sum(opstk) else 0 end as IIBitOPStkWt, 
case when sotype  = 'II' and  reeltype = 'F' then sum(opstk) else 0 end as IIFullOPStkWt, 

case when sotype  = 'I' and  reeltype = 'B' then sum(stk_nos) else 0 end as IBitCloStkNos, 
case when sotype  = 'I' and  reeltype = 'F' then sum(stk_nos) else 0 end as IFullCloStkNos, 
case when sotype  = 'II' and  reeltype = 'B' then sum(stk_nos) else 0 end as IIBitCloStkNos, 
case when sotype  = 'II' and  reeltype = 'F' then sum(stk_nos) else 0 end as IIFullCloStkNos, 

case when sotype  = 'I' and  reeltype = 'B' then sum(stk_qty) else 0 end as IBitCloStkWt, 
case when sotype  = 'I' and  reeltype = 'F' then sum(stk_qty) else 0 end as IFullCloStkWt, 
case when sotype  = 'II' and  reeltype = 'B' then sum(stk_qty) else 0 end as IIBitCloStkWt, 
case when sotype  = 'II' and  reeltype = 'F' then sum(stk_qty) else 0 end as IIFullCloStkWt, 

sum(opstk) as openingstock ,
sum(opnos) as openingnos,
sum(stk_qty) as closingstock ,
sum(stk_nos) as closingnos
from (

select sono , case when length(sono) = 6 then 'I' else 'II' end as sotype  ,a.var_code itemcode, 
case when ((var_inchcm = 'I' and  var_size2 <=16 ) or  (var_inchcm = 'C' and var_size2 <=41)) then 'B' else 'F' end as reeltype, 
sum(op_qty)  as opstk ,sum(op_nos) as opnos, case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos,
 sum(stk_qty) as stk_qty
 
  from  (


    select stk_sono sono,stk_var_code as var_code,0  as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , count(*)  as op_nos,sum(stk_wt)/1000  as op_qty from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$lastdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$lastdate' ) or  (stk_deltag = 'T' and stk_deldate > '$lastdate'))) and stk_comp_code in (1)  group by stk_sono,stk_var_code



union all

     select stk_sono sono, newsize as var_code , sum(oldweight-newweight)/1000  as stk_qty,0 as prod_qty ,0 as sal_qty  ,
     0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,
     0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos,
     0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0  as op_qty   from trnsal_reelweight_change , 
     trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and
     ent_date >  '$startdate'   and stk_ent_date <= '$startdate' and comp_code = 1  and  fin_code  = $finid group by stk_sono , newsize


union all

     select stk_sono sono, newsize as var_code , sum(oldweight-newweight)/1000*-1  as stk_qty,0 as prod_qty ,0 as sal_qty  ,
     0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,
     0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos,
     0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0  as op_qty   from trnsal_reelweight_change , 
     trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and
     ent_date =  '$startdate'    and comp_code = 1  and  fin_code  = $finid group by stk_sono , newsize


union all

     select stk_sono sono, newsize as var_code , 0  as stk_qty,0 as prod_qty ,0 as sal_qty  ,
     0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,
     0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos,
     0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,sum(oldweight-newweight)/1000  as op_qty   from trnsal_reelweight_change , 
     trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and
     ent_date >=  '$startdate'   and stk_ent_date <= '$startdate' and comp_code = 1  and  fin_code  = $finid
and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))
 group by stk_sono , newsize
     

union all


    select stk_sono sono,stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$startdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$startdate' ) or  (stk_deltag = 'T' and stk_deldate > '$startdate'))) and stk_comp_code in (1)  group by stk_sono,stk_var_code





union all


select r_sono sono,r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_repulp where  r_compcode = 1 and  r_finyear = 24  and  r_date between '$startdate' and '$startdate' group by r_sono,r_sizecode



union all


   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos ,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos , 0 as op_nos,0 as op_qty from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$startdate' and stk_comp_code = 1  and stk_destag = 'B'  group by stk_sono , stk_var_code 



union all

     select stk_sono sono, newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty   from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date > '$startdate'     group by stk_sono , newsize


union all

     select stk_sono sono, newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date >= '$startdate' and ent_date <= '$startdate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by stk_sono, newsize


union all

     select stk_sono sono, newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date > '$startdate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by stk_sono , newsize


	 union all

select  distinct(rett_var) as var_code, '123456' sono,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty    from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = 1 and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = 24  and a.reth_date >= '$startdate'  and a.reth_date <= '$startdate'  group by rett_var

	union  all

	 select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty   from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$startdate'    and stk_comp_code = 1  and length(stk_sono) in (5,7) and stk_destag = 'D'  group by stk_sono, stk_var_code
     

         union all

     
	 select '123456' sono, b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty     from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = 1  and invt_fincode = 24 and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$startdate' and  invh_comp_code  = 1  group by b.invt_var,cust_taxtag  
    


	union all
     
   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     0 as bund_qty,
     0 as bund_nos,
     0 as reel_qty,
     0 as reel_nos,
     sum(stk_wt)/1000  as salvage_recpt_qty,
     count(*)  as salvage_recpt_nos, 
     0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'S'  group by stk_sono , stk_var_code 
  
	union all
     
   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,
     case when var_unit = 2 then count(*) else 0  end as bund_nos,
     case when var_unit = 1 then sum(stk_wt)/1000 else 0  end as reel_qty,
     case when var_unit = 1 then count(*) else 0  end as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos,
      0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'C'  group by stk_sono ,stk_var_code 
  

	union all

     select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     sum(stk_wt)/1000  as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     count(*) as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty, 0  as bund_nos , 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'R'  group by stk_sono,stk_var_code 
     
	union all

select stk_sono sono, oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 
0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty   from 
trnsal_salvage , trnsal_finish_stock    where   stk_comp_code = comp_code and   oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$startdate' and  comp_code = 1 and  fin_code = 24   group by stk_sono , oldreelno,oldsize,oldweight



) a ,  massal_variety b where a.var_code = b.var_code 
	group by sono, a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or  sum(reel_qty) > 0 or sum(salvage_recpt_qty) > 0 or sum(op_qty) > 0 



)AA1  group by sotype ,reeltype 
) cc1";


//echo $query1;

  $r= mysql_query($query1);

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

/*

function findOpeningClosingStock()
{


        mysql_query("SET NAMES utf8");

	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];

        $query1= "
select 
sum(IBitOPStkNos) IBitOPStkNos,
 sum(IFullOPStkNos) IFullOPStkNos, sum(IIBitOPStkNos) IIBitOPStkNos, sum(IIFullOPStkNos) IIFullOPStkNos, 
 sum(IBitOPStkWt) IBitOPStkWt, sum(IFullOPStkWt) IFullOPStkWt, sum(IIBitOPStkWt) IIBitOPStkWt, 
 sum(IIFullOPStkWt) IIFullOPStkWt, sum(IBitCLOStkNos) IBitCLOStkNos, 
 sum(IFullCLOStkNos) IFullCLOStkNos, sum(IIBitCLOStkNos) IIBitCLOStkNos, sum(IIFullCLOStkNos) IIFullCLOStkNos, 
 sum(IBitCLOStkWt) IBitCLOStkWt, sum(IFullCLOStkWt) IFullCLOStkWt, sum(IIBitCLOStkWt) IIBitCLOStkWt, sum(IIFullCLOStkWt) IIFullCLOStkWt, 
 sum(openingstock) openingstock, sum(openingnos) openingnos, sum(closingstock) closingstock , sum(closingnos) closingnos
from (

select 

case when sotype  = 'I' and  reeltype = 'B' then sum(opnos) else 0 end as IBitOPStkNos, 
case when sotype  = 'I' and  reeltype = 'F' then sum(opnos) else 0 end as IFullOPStkNos, 
case when sotype  = 'II' and  reeltype = 'B' then sum(opnos) else 0 end as IIBitOPStkNos, 
case when sotype  = 'II' and  reeltype = 'F' then sum(opnos) else 0 end as IIFullOPStkNos, 

case when sotype  = 'I' and  reeltype = 'B' then sum(opstk) else 0 end as IBitOPStkWt, 
case when sotype  = 'I' and  reeltype = 'F' then sum(opstk) else 0 end as IFullOPStkWt, 
case when sotype  = 'II' and  reeltype = 'B' then sum(opstk) else 0 end as IIBitOPStkWt, 
case when sotype  = 'II' and  reeltype = 'F' then sum(opstk) else 0 end as IIFullOPStkWt, 

case when sotype  = 'I' and  reeltype = 'B' then sum(stk_nos) else 0 end as IBitCloStkNos, 
case when sotype  = 'I' and  reeltype = 'F' then sum(stk_nos) else 0 end as IFullCloStkNos, 
case when sotype  = 'II' and  reeltype = 'B' then sum(stk_nos) else 0 end as IIBitCloStkNos, 
case when sotype  = 'II' and  reeltype = 'F' then sum(stk_nos) else 0 end as IIFullCloStkNos, 

case when sotype  = 'I' and  reeltype = 'B' then sum(stk_qty) else 0 end as IBitCloStkWt, 
case when sotype  = 'I' and  reeltype = 'F' then sum(stk_qty) else 0 end as IFullCloStkWt, 
case when sotype  = 'II' and  reeltype = 'B' then sum(stk_qty) else 0 end as IIBitCloStkWt, 
case when sotype  = 'II' and  reeltype = 'F' then sum(stk_qty) else 0 end as IIFullCloStkWt, 

sum(opstk) as openingstock ,
sum(opnos) as openingnos,
sum(stk_qty) as closingstock ,
sum(stk_nos) as closingnos
from (

select sono , case when length(sono) = 6 then 'I' else 'II' end as sotype  ,a.var_code itemcode, 
case when ((var_inchcm = 'I' and  var_size2 <=16 ) or  (var_inchcm = 'C' and var_size2 <=41)) then 'B' else 'F' end as reeltype, 
sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty) +sum(salvage_stk) +sum(pulp_stk) +sum(wt_change) +  sum(conv_qty) - sum(bund_qty)   as opstk ,
 (sum(stk_nos)+sum(sal_nos)- sum(prod_nos)-sum(salret_nos)+sum(pulp_nos) +sum(salvage_nos)  +  sum(conv_nos) - sum(bund_nos) - sum(reel_nos) - sum(salvage_recpt_nos) ) as opnos,
 case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos,
 sum(stk_qty) as stk_qty
 
  from  (



    select stk_sono sono,stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$startdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$startdate' ) or  (stk_deltag = 'T' and stk_deldate > '$startdate'))) and stk_comp_code in (1)  group by stk_sono,stk_var_code





union all


select r_sono sono,r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos  from trnsal_repulp where  r_compcode = 1 and  r_finyear = 24  and  r_date between '$startdate' and '$startdate' group by r_sono,r_sizecode



union all


   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos ,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$startdate' and stk_comp_code = 1  and stk_destag = 'B'  group by stk_sono , stk_var_code 



union all

     select stk_sono sono, newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date > '$startdate'     group by stk_sono , newsize


union all

     select stk_sono sono, newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date >= '$startdate' and ent_date <= '$startdate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by stk_sono, newsize


union all

     select stk_sono sono, newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$startdate' and comp_code = 1 and  fin_code  =  24 and  ent_date > '$startdate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by stk_sono , newsize


	 union all

select  distinct(rett_var) as var_code, '123456' sono,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos   from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = 1 and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = 24  and a.reth_date >= '$startdate'  and a.reth_date <= '$startdate'  group by rett_var

	union  all

	 select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$startdate'    and stk_comp_code = 1  and length(stk_sono) in (5,7) and stk_destag = 'D'  group by stk_sono, stk_var_code
     

         union all

     
	 select '123456' sono, b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos   from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos  from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = 1  and invt_fincode = 24 and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$startdate' and  invh_comp_code  = 1  group by b.invt_var,cust_taxtag  
    


	union all
     
   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     0 as bund_qty,
     0 as bund_nos,
     0 as reel_qty,
     0 as reel_nos,
     sum(stk_wt)/1000  as salvage_recpt_qty,
     count(*)  as salvage_recpt_nos,
     0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'S'  group by stk_sono , stk_var_code 
  
	union all
     
   select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,
     case when var_unit = 2 then count(*) else 0  end as bund_nos,
     case when var_unit = 1 then sum(stk_wt)/1000 else 0  end as reel_qty,
     case when var_unit = 1 then count(*) else 0  end as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos,
      0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'C'  group by stk_sono ,stk_var_code 
  

	union all

     select stk_sono sono, stk_var_code as var_code,  0 as stk_qty, 
     sum(stk_wt)/1000  as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     count(*) as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty, 0  as bund_nos , 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$startdate' and stk_comp_code = 1 and stk_source = 'R'  group by stk_sono,stk_var_code 
     
	union all

select stk_sono sono, oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 
0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos  from 
trnsal_salvage , trnsal_finish_stock    where   stk_comp_code = comp_code and   oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$startdate' and  comp_code = 1 and  fin_code = 24   group by stk_sono , oldreelno,oldsize,oldweight



) a ,  massal_variety b where a.var_code = b.var_code 
	group by sono, a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or  sum(reel_qty) > 0 or sum(salvage_recpt_qty) > 0 



)AA1  group by sotype ,reeltype 
) cc1";



  $r= mysql_query($query1);

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

*/
?>
