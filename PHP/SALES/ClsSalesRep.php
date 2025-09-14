<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadpackinginvoice';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		case "viewcreate":
		create_view_vew_salesstock();
		break;
		case "loadinvoiceno":
		getinvoiceno();
		break;
		case "loadSONOlist":
		getSONOlist();
		break;
		case "loadinvoiceproforma":
		getinvoiceproforma();
		break;		
		case "loadpackinginvoice": 
		getpackinginvoice();
		break;	
		case "loadpackslipBundle": 
		getpackslipBundle();
		break;	
	
		case "loadgatepass": 
		getgatepass();
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
    
   



 function getinvoiceno()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$invstate = $_POST['invstate'];
        if ($invstate == 'A')
       {        
	$r=mysql_query("select invh_invrefno,invh_seqno from trnsal_invoice_header  where invh_fincode= '$finid' and invh_comp_code = '$compcode'  order by invh_seqno desc");
        }
        else
        {  
	$r=mysql_query("select invh_invrefno,invh_seqno from trnsal_invoice_header  where invh_fincode= '$finid' and invh_comp_code = '$compcode' and invh_saltype =  '$invstate'  order by invh_seqno desc");
        }
  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getSONOlist()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	
	$r=mysql_query("select ordh_sono from trnsal_order_header where ordh_comp_code = $compcode and ordh_fincode = $finid group by ordh_sono  order  by ordh_sono  desc");
  
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }



 function getgatepass()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$gpdt = $_POST['gpdt'];
		$r=mysql_query("select gp_no as invh_no from trnsal_gate_pass  where gp_fincode= '$finid' and gp_compcode = '$compcode' And gp_date = '$gpdt' order by gp_no asc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getpackinginvoice()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$stinvno = $_POST['stinvno'];
	$edinvno = $_POST['edinvno'];
	$delopt = $_POST['delopt'];
	
	
	$r=mysql_query("delete from tmp_sal_packingslip");
	
	$r=mysql_query("select * from trnsal_invoice_header a, trnsal_packslip_header  bh, trnsal_packslip_trailer bt, 
	trnsal_finish_stock c ,massal_customer d where  a.invh_party = d.cust_code and  a.invh_no = bh.pckh_invno 
	and a.invh_comp_code = bh.pckh_comp_code and  a.invh_fincode = bh.pckh_fincode  and a.invh_comp_code = c.stk_comp_code  
	and bh.pckh_no = c.stk_slipno and a.invh_comp_code = '$compcode' and  a.invh_fincode = '$finid' and a.invh_no >= '$stinvno' 
	and a.invh_no <= '$edinvno' and bh.pckh_no = bt.pckt_no and bh.pckh_comp_code = bt.pckt_comp_code  
	and bh.pckh_fincode  = bt.pckt_fincode  and bt.pckt_sr_no = c.stk_sr_no order by stk_slipno,stk_var_code,
	stk_sr_no");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getpackslipBundle()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$stinvno = $_POST['stinvno'];
	$edinvno = $_POST['edinvno'];
	$delopt = $_POST['delopt'];
	
	
	$r=mysql_query("delete from tmp_inv_srno");
	

$r=mysql_query("select * from trnsal_packslip_header , trnsal_packslip_trailer where pckh_comp_code = pckt_comp_code  and pckh_fincode = pckt_fincode  and pckh_no = pckt_no  and pckh_comp_code = '$compcode' and pckh_fincode = '$finid' and pckh_invno >= '$stinvno'   and pckh_invno <= '$edinvno'  order by pckh_invno,pckt_var,pckt_sr_no");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
 function getinvoiceproforma()
    {
        mysql_query("SET NAMES utf8");
	$finid = $_POST['finid'];
	$compcode = $_POST['compcode'];
	$r=mysql_query("select invh_no from trnsal_proforma_invoice where invh_comp_code = '$compcode' and invh_fincode = '$finid' group by invh_no order by invh_no");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
   

function create_view_vew_salesstock()
    {
        mysql_query("SET NAMES utf8");
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$stkopt    = $_POST['stkopt'];

        $query1="DROP VIEW IF EXISTS vew_sal_rt12stat";
        $result1= mysql_query($query1);

        $lastdate =  date('Y-m-d', strtotime($startdate. " - 1 days"));


// case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,

if ($stkopt  == 1) 
{

	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code, 
sum(op_qty) as opstk, 
sum(op_nos) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos,sum(reel_qty) as reel_qty, sum(reel_nos)  as reel_nos , sum(salvage_recpt_qty) as salvage_recpt_qty, sum(salvage_recpt_nos)  as salvage_recpt_nos, sum(sample_stk) as sample_stk, sum(sample_nos)  as sample_nos
  from  (


    select stk_var_code as var_code,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , count(*) as op_nos,sum(stk_wt)/1000 as op_qty  ,0 as sample_nos, 0 as sample_stk   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$lastdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$lastdate' ) or  (stk_deltag = 'T' and stk_deldate > '$lastdate'))) and stk_comp_code in ('$compcode')  group by stk_var_code

	union all

    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode')  group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     sum(stk_wt)/1000  as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     count(*) as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty, 0  as bund_nos , 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'R'  group by stk_var_code 

	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,
     case when var_unit = 2 then count(*) else 0  end as bund_nos,
     case when var_unit = 1 then sum(stk_wt)/1000 else 0  end as reel_qty,
     case when var_unit = 1 then count(*) else 0  end as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos,
      0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'C'  group by stk_var_code 
  
	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
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
     0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'S'  group by stk_var_code 
  
         union all

     
	 select b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos  from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = $compcode  and invt_fincode = $finid and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate' and  invh_comp_code  = $compcode  group by b.invt_var,cust_taxtag  
    

    
	union  all

	 select stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate'    and stk_comp_code = '$compcode'  and length(stk_sono) in (5,7) and stk_destag = 'D'  group by stk_var_code
     
     
	 union all

select distinct(rett_var) as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = '$compcode' and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var




union all

     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk   from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all

     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'     group by newsize




union all

select oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk  from  (select oldreelno,oldsize,oldweight from trnsal_salvage , trnsal_finish_stock    where   stk_comp_code = comp_code and  fin_code >= stk_finyear  and oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$enddate' and  comp_code = $compcode and  fin_code = $finid   group by oldreelno,oldsize,oldweight) a1 group by oldsize

union all


select r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_repulp where  r_compcode = $compcode and  r_finyear = $finid  and  r_date between '$startdate' and '$enddate' group by r_sizecode



union all


   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos ,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos , 0 as op_nos,0 as op_qty ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate' and stk_comp_code = '$compcode'  and stk_destag = 'B'  group by stk_var_code 
     

union all

select rs_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,
0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,
0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,
0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty ,count(*) as sample_nos, 
sum(rs_wt/1000) as sample_stk
from trnsal_sample where  rs_compcode = '$compcode' and  
 rs_date between '$startdate' and '$enddate' group by rs_sizecode



	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 or sum(reel_qty) > 0 or sum(salvage_recpt_qty) > 0  or sum(op_qty) > 0";

	$result1= mysql_query($query1);



}
else if ($stkopt  == 2) 
{

	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code,
sum(op_qty) as opstk, 
sum(op_nos) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos,sum(reel_qty) as reel_qty, sum(reel_nos)  as reel_nos , sum(salvage_recpt_qty) as salvage_recpt_qty, sum(salvage_recpt_nos)  as salvage_recpt_nos,0 as sample_nos, 0 as sample_stk 
  from  (


    select stk_var_code as var_code,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , count(*) as op_nos,sum(stk_wt)/1000 as op_qty   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$lastdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$lastdate' ) or  (stk_deltag = 'T' and stk_deldate > '$lastdate'))) and stk_comp_code in ('$compcode') and length(stk_sono) = 6  group by stk_var_code

	union all

    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode') and length(stk_sono) = 6   group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     sum(stk_wt)/1000  as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     count(*) as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty, 0  as bund_nos , 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'R' and length(stk_sono) = 6   group by stk_var_code 

	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,
     case when var_unit = 2 then count(*) else 0  end as bund_nos,
     case when var_unit = 1 then sum(stk_wt)/1000 else 0  end as reel_qty,
     case when var_unit = 1 then count(*) else 0  end as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos,
      0 as conv_qty,0 as conv_nos, 0 as op_nos,0 as op_qty  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'C' and length(stk_sono) = 6  group by stk_var_code 
  
	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
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
     0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'S' and length(stk_sono) = 6  group by stk_var_code 
  
         union all

     
	 select b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as op_nos,0 as op_qty  from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = $compcode  and invt_fincode = $finid and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate' and  invh_comp_code  = $compcode  group by b.invt_var,cust_taxtag  
    

   
	 union all

select distinct(rett_var) as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty    from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = '$compcode' and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var




union all

     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and length(stk_sono) = 6 and  ent_date > '$enddate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all

     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as op_qty  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate' and length(stk_sono) = 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate' and length(stk_sono) = 6  group by newsize




union all

select oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty   from  (select oldreelno,oldsize,oldweight from trnsal_salvage , trnsal_finish_stock    where   stk_comp_code = comp_code and  fin_code >= stk_finyear  and oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$enddate' and  comp_code = $compcode and  fin_code = $finid and length(stk_sono) = 6  group by oldreelno,oldsize,oldweight) a1 group by oldsize

union all


select r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_repulp where  r_compcode = $compcode and  r_finyear = $finid  and  r_date between '$startdate' and '$enddate' group by r_sizecode



union all


   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos ,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos , 0 as op_nos,0 as op_qty  from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate' and stk_comp_code = '$compcode'  and stk_destag = 'B' and length(stk_sono) = 6  group by stk_var_code 
     



	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 or sum(reel_qty) > 0 or sum(salvage_recpt_qty) > 0  or sum(op_qty) > 0";


	$result1= mysql_query($query1);

}

else if ($stkopt  == 3) 
{

	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code,
sum(op_qty) as opstk, 
sum(op_nos) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos,sum(reel_qty) as reel_qty, sum(reel_nos)  as reel_nos , sum(salvage_recpt_qty) as salvage_recpt_qty, sum(salvage_recpt_nos)  as salvage_recpt_nos, sum(sample_stk) as sample_stk, sum(sample_nos)  as sample_nos
  from  (

    select stk_var_code as var_code,0 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , count(*) as op_nos,sum(stk_wt)/1000 as op_qty  ,0 as sample_nos, 0 as sample_stk   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$lastdate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$lastdate' ) or  (stk_deltag = 'T' and stk_deldate > '$lastdate'))) and stk_comp_code in ('$compcode') and length(stk_sono) != 6  group by stk_var_code

	union all


    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode') and length(stk_sono) != 6 group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     sum(stk_wt)/1000  as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     count(*) as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty, 0  as bund_nos , 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'R'  and length(stk_sono) != 6  group by stk_var_code 

	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos, 0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,
     case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,
     case when var_unit = 2 then count(*) else 0  end as bund_nos,
     case when var_unit = 1 then sum(stk_wt)/1000 else 0  end as reel_qty,
     case when var_unit = 1 then count(*) else 0  end as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos,
      0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'C'  and length(stk_sono) != 6  group by stk_var_code 
  
	union all
     
   select stk_var_code as var_code,  0 as stk_qty, 
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
     0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode' and stk_source = 'S'  and length(stk_sono) != 6  group by stk_var_code 
  
         union all

     

	 select stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate'    and stk_comp_code = '$compcode'   and length(stk_sono) != 6  and stk_destag = 'D'  group by stk_var_code
     
     
	 union all



     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos, 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) != 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all
//annadurai
     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate'  and length(stk_sono) != 6 and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos , 0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty  ,0 as sample_nos, 0 as sample_stk from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) != 6     group by newsize




union all




   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos ,  0 as reel_qty, 0  as reel_nos , 0 as salvage_recpt_qty,0 as salvage_recpt_nos,sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos , 0 as op_nos,0 as op_qty ,0 as sample_nos, 0 as sample_stk from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate' and stk_comp_code = '$compcode'  and stk_destag = 'B'  and length(stk_sono) != 6  group by stk_var_code 
     


union all

select rs_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,
0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,
0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos,  0 as reel_qty, 0  as reel_nos, 0 as salvage_recpt_qty,0 as salvage_recpt_nos ,
0 as conv_qty,0 as conv_nos , 0 as op_nos,0 as op_qty ,count(*) as sample_nos, 
sum(rs_wt/1000) as sample_stk
from trnsal_sample where  rs_compcode = '$compcode' and  
 rs_date between '$startdate' and '$enddate' group by rs_sizecode




	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 or sum(reel_qty) > 0 or sum(salvage_recpt_qty) > 0   or sum(op_qty) > 0 ";



	$result1= mysql_query($query1);


} 

/*    
function create_view_vew_salesstock()
    {
        mysql_query("SET NAMES utf8");
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
	$finid     = $_POST['finid'];
	$stkopt    = $_POST['stkopt'];

        $query1="DROP VIEW IF EXISTS vew_sal_rt12stat";
        $result1= mysql_query($query1);




if ($stkopt  == 1) 
{

	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code, case when (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty) +sum(salvage_stk) 
+sum(pulp_stk) +sum(wt_change) +  sum(conv_qty) - sum(bund_qty)  ) <=0 then 0  else (sum(stk_qty) +sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum(pulp_stk) +sum(salvage_stk)+ sum(wt_change) +  sum(conv_qty) - sum(bund_qty) ) end as opstk, 
(sum(stk_nos)+sum(sal_nos)- sum(prod_nos)-sum(salret_nos)+sum(pulp_nos) +sum(salvage_nos)  +  sum(conv_nos) - sum(bund_nos) ) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos
  from  (
	
    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode')  group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     case when var_unit = 1 then sum(stk_wt)/1000 else 0 end as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     case when var_unit = 1 then  count(*)  else 0 end as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,  case when var_unit = 2 then  count(*)  else 0 end as bund_nos , 0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode'   group by stk_var_code 
     


         union all

     
	 select b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos  from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = $compcode  and invt_fincode = $finid and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate' and  invh_comp_code  = $compcode  group by b.invt_var,cust_taxtag  
    

    
	union  all

	 select stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate'    and stk_comp_code = '$compcode'  and length(stk_sono) in (5,7) and stk_destag = 'D'  group by stk_var_code
     
     
	 union all

select distinct(rett_var) as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = '$compcode' and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var




union all

     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all

     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate' and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate' and stk_rettag = 'T' and stk_retdt > '$enddate'    group by newsize




union all

select oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from  (select oldreelno,oldsize,oldweight from trnsal_salvage , trnsal_finish_stock    where   comp_code = stk_comp_code and  fin_code = stk_finyear  and oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$enddate'  and  comp_code = $compcode and  fin_code = $finid   group by oldreelno,oldsize,oldweight) a1 group by oldsize
union all


select r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_repulp where  r_compcode = $compcode and  r_finyear = $finid  and  r_date between '$startdate' and '$enddate' group by r_sizecode


union all



select stk_var_code as varcode,sum(stk_wt/1000)*-1  as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,count(*)*-1 as stk_nos, 0 as sal_val,0 as cgst,
0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_finish_stock where stk_comp_code =  $compcode  and   stk_ent_date <= '$enddate'  and   stk_retdt > '$enddate'  group by stk_var_code

union all


   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos , sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate' and stk_comp_code = '$compcode'  and stk_destag = 'B'  group by stk_var_code 
     



	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 ";

	$result1= mysql_query($query1);



}
else if ($stkopt  == 2) 
{
	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code, case when (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty) +sum(salvage_stk) 
+sum(pulp_stk) +sum(wt_change) +  sum(conv_qty) - sum(bund_qty)  ) <=0 then 0  else (sum(stk_qty) +sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum(pulp_stk) +sum(salvage_stk)+ sum(wt_change) +  sum(conv_qty) - sum(bund_qty) ) end as opstk, 
(sum(stk_nos)+sum(sal_nos)- sum(prod_nos)-sum(salret_nos)+sum(pulp_nos) +sum(salvage_nos)  +  sum(conv_nos)  ) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos
  from  (
	
    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode') and length(stk_sono) = 6 group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     case when var_unit = 1 then sum(stk_wt)/1000 else 0 end as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     case when var_unit = 1 then  count(*)  else 0 end as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,  case when var_unit = 2 then  count(*)  else 0 end as bund_nos , 0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode'  and length(stk_sono) = 6   group by stk_var_code 
     


         union all

     
	 select b.invt_var as var_code,  0 as stk_qty,  0 as prod_qty,sum(invt_wt)/1000 as sal_qty,0 as salr_qty,0 as wt_change,    0 as stk_nos , sum(taxable) as sal_val, sum(invh_cgst_amt/invh_totwt*invt_wt) as cgst , sum(invh_sgst_amt/invh_totwt*invt_wt) as sgst ,sum(invh_igst_amt/invh_totwt*invt_wt) as igst, 0 as prod_no,sum(invt_nos) as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_invoice_header a, (select invt_seqno,a.invt_var,sum(invt_wt) as invt_wt,sum(invt_nos) as invt_nos ,sum(invt_taxable) as taxable , 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos  from trnsal_invoice_trailer a,massal_variety b where  invt_compcode = $compcode  and invt_fincode = $finid and  a.invt_var=b.var_code group by invt_seqno,invt_var) b , massal_customer c   where a.invh_party = c.cust_code and  a.invh_seqno = b.invt_seqno and a.invh_date >= '$startdate'  and a.invh_date <= '$enddate' and  invh_comp_code  = $compcode  group by b.invt_var,cust_taxtag  
    

  

     
	 union all

select distinct(rett_var) as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = '$compcode' and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var




union all

     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) = 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all

     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate'  and length(stk_sono) = 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) = 6  and stk_rettag = 'T' and stk_retdt > '$enddate'    group by newsize




union all

select oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from  (select oldreelno,oldsize,oldweight from trnsal_salvage , trnsal_finish_stock    where   comp_code = stk_comp_code and  fin_code = stk_finyear  and oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$enddate'  and  comp_code = $compcode and  fin_code = $finid   and length(stk_sono) = 6  group by oldreelno,oldsize,oldweight) a1 group by oldsize
union all


select r_sizecode as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,count(*) as pulp_nos, sum(r_wt/1000) as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_repulp where  r_compcode = $compcode and  r_finyear = $finid  and  r_date between '$startdate' and '$enddate' group by r_sizecode


union all



select stk_var_code as varcode,sum(stk_wt/1000)*-1  as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,count(*)*-1 as stk_nos, 0 as sal_val,0 as cgst,
0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_finish_stock where stk_comp_code =  $compcode  and   stk_ent_date <= '$enddate'  and   stk_retdt > '$enddate'   and length(stk_sono) = 6  group by stk_var_code

union all

   select stk_var_code as var_code,  0 as stk_qty, 
     0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     0 as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  0 as bund_qty,  0 as bund_nos , sum(stk_wt)/1000  as conv_qty,count(*) as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate' and stk_comp_code = '$compcode'  and stk_destag = 'B'  and length(stk_sono) = 6   group by stk_var_code 
     



	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 ";

	$result1= mysql_query($query1);


}

else if ($stkopt  == 3) 
{
	   $query1="create view vew_sal_rt12stat as select '$compcode'    as comp_code,'$finid' as fincode, a.var_code, case when (sum(stk_qty)+sum(sal_qty)- sum(prod_qty)-sum(salr_qty) +sum(salvage_stk) 
+sum(pulp_stk) +sum(wt_change) +  sum(conv_qty) - sum(bund_qty)  ) <=0 then 0  else (sum(stk_qty) +sum(sal_qty)- sum(prod_qty)-sum(salr_qty)+sum(pulp_stk) +sum(salvage_stk)+ sum(wt_change) +  sum(conv_qty) - sum(bund_qty) ) end as opstk, 
(sum(stk_nos)+sum(sal_nos)- sum(prod_nos)-sum(salret_nos)+sum(pulp_nos) +sum(salvage_nos)  +  sum(conv_nos)  ) as opnos,
sum(wt_change) as wt_change,case when sum(stk_nos) <=0 then 0 else sum(stk_nos) end As stk_nos, sum(sal_val) As sal_val, sum(cgst) As cgst,  sum(sgst) As sgst,sum(stk_qty) as stk_qty, sum(prod_qty) As prod_qty,  sum(sal_qty) As sal_qty,sum(salr_qty) as salr_qty,sum(stk_nos)as nos  , sum(prod_nos) as prod_nos,sum(sal_nos) as sal_nos,sum(salret_nos) as salret_nos,sum(wtchg_nos) as wtchg_nos,sum(pulp_nos) as pulp_nos,sum(pulp_stk) as pulp_stk,sum(salvage_stk) as salvage_stk,sum(salvage_nos) as salvage_nos,sum(conv_qty) as conv_qty, sum(conv_nos) as conv_nos,sum(bund_qty) as bund_qty,sum(bund_nos) as bund_nos
  from  (
	
    select stk_var_code as var_code,sum(stk_wt)/1000 as stk_qty, 0 as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,count(*) as stk_nos, 0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,   0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock , massal_variety where stk_var_code = var_code and (stk_ent_date <= '$enddate' ) and ((stk_destag = '' and stk_deltag  ='') or (( stk_destag != '' and stk_desdt > '$enddate' ) or  (stk_deltag = 'T' and stk_deldate > '$enddate'))) and stk_comp_code in ('$compcode') and length(stk_sono) <> 6 group by stk_var_code

	union all

     select stk_var_code as var_code,  0 as stk_qty, 
     case when var_unit = 1 then sum(stk_wt)/1000 else 0 end as prod_qty,0 as sal_qty,0 as salr_qty,0 as wt_change,
     0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst, 
     case when var_unit = 1 then  count(*)  else 0 end as prod_nos,     0 as sal_nos,0 as salret_nos,0 as wtchg_nos ,
     0 as pulp_nos,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos,  case when var_unit = 2 then sum(stk_wt)/1000 else 0  end as bund_qty,  case when var_unit = 2 then  count(*)  else 0 end as bund_nos , 0 as conv_qty,0 as conv_nos from trnsal_finish_stock, massal_variety where  stk_var_code = var_code and  stk_ent_date >= '$startdate'  and stk_ent_date <= '$enddate' and stk_comp_code = '$compcode'  and length(stk_sono) <> 6   group by stk_var_code 
     


         union all

     
	 select stk_var_code as var_code,  0 as stk_qty, 0 as prod_qty,sum(stk_wt)/1000  as sal_qty,0 as salr_qty,0 as wt_change, 0 as stk_nos,0 as sal_val ,0 as cgst,  0 as sgst, 0 as igst ,0 as prod_nos,count(*)  as sal_nos,0 as salret_nos,0 as wtchg_nos ,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos, 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_finish_stock, massal_variety where stk_var_code = var_code and  stk_desdt >= '$startdate'  and stk_desdt <= '$enddate'    and stk_comp_code = '$compcode'  and length(stk_sono) in (5,7) and stk_destag = 'D'  group by stk_var_code
     
     	 union all

select distinct(rett_var) as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , sum(rett_return_wt)/1000 as salr_qty,0 as wt_change,0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,count(*)  as salret_nos,0 as wtchg_nos,0 as pulp_nos ,0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos   from trnsal_salret_header a,  trnsal_salret_trailer b, massal_variety c where b.rett_var = c.var_code and a.reth_no = b.rett_no and a.reth_comp_code = '$compcode' and a.reth_comp_code = b.rett_comp_code and  a.reth_fincode = b.rett_fincode and a.reth_fincode = '$finid'  and a.reth_date >= '$startdate'  and a.reth_date <= '$enddate'  group by rett_var




union all

     select newsize as var_code ,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) <> 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize


union all

     select newsize as var_code ,0 stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty,case when  sum(oldweight-newweight)/1000 > 0 then sum(oldweight-newweight)/1000  else sum(oldweight-newweight)/1000 end  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date >= '$startdate' and ent_date <= '$enddate'  and length(stk_sono) <> 6  and concat(year(ent_date)-2000, right(concat('0',month(ent_date)),2)) <> concat(year(stk_ent_date)-2000, right(concat('0',month(stk_ent_date)),2))  group by newsize



union all

     select newsize as var_code , sum(oldweight-newweight)/1000 * -1   as stk_qty,0 as prod_qty ,0 as sal_qty  ,  0 as salr_qty, 0  wt_change, 0 as stk_nos, 0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos, 0 as salret_nos,0 as wtchg_nos,0 as pulp_nos,  0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_reelweight_change , trnsal_finish_stock  where oldweight <> newweight and   comp_code = stk_comp_code and  fin_code >= stk_finyear and srno = stk_sr_no  and  ent_date >=  '2022-11-01'   and stk_ent_date <= '$enddate' and comp_code = $compcode and  fin_code  =  $finid and  ent_date > '$enddate'  and length(stk_sono) <> 6  and stk_rettag = 'T' and stk_retdt > '$enddate'    group by newsize




union all

select oldsize as var_code ,0 as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,0 as stk_nos,0 as sal_val,0 as cgst,0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,sum(oldweight)/1000  as salvage_stk,count(*)  as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from  (select oldreelno,oldsize,oldweight from trnsal_salvage , trnsal_finish_stock    where   comp_code = stk_comp_code and  fin_code = stk_finyear  and oldreelno = stk_sr_no  and ent_date >= '$startdate' and ent_date <= '$enddate'  and  comp_code = $compcode and  fin_code = $finid   and length(stk_sono) <> 6  group by oldreelno,oldsize,oldweight) a1 group by oldsize

union all


select stk_var_code as varcode,sum(stk_wt/1000)*-1  as stk_qty,0 as prod_qty ,0 as sal_qty  , 0 as salr_qty,0 as wt_change,count(*)*-1 as stk_nos, 0 as sal_val,0 as cgst,
0 as sgst,0 as igst,  0 as prod_nos,0 as sal_nos,0 as salret_nos,0 as wtchg_nos,0 as pulp_nos, 0 as pulp_stk,0 as salvage_stk,0 as salvage_nos , 0 as bund_qty,0 as bund_nos, 0 as conv_qty,0 as conv_nos  from trnsal_finish_stock where stk_comp_code =  $compcode  and   stk_ent_date <= '$enddate'  and   stk_retdt > '$enddate'   and length(stk_sono) <> 6  group by stk_var_code




	) a 
	group by a.var_code having (sum(stk_qty) + sum(sal_qty) - sum(prod_qty)) > 0 or sum(prod_qty) > 0 or sum(conv_qty) > 0 or sum(sal_qty) >0 or  sum(wt_change) >0  or  sum(pulp_stk) >0 or sum(salvage_stk) >0 or salr_qty > 0 ";

	$result1= mysql_query($query1);

}
*/



}



?>
