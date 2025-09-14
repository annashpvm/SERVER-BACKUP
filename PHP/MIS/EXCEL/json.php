<?php 
  require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    mysql_query("SET NAMES utf8");

$r=mysqli_real_escape_string("select  replace(newjson ,'}]}"}','}]}}') as jsonnew from  (
select replace(concat(json1,json2,'}') ,'"cur_gt": 0}','"cur_gt": 0,') as newjson from (
select  json_object('gstin',gstin,'fp',fp,'gt',gt,'cur_gt',cur_gt) as json1, replace(jsonnew,'"}]", "','"}], "') as json2 from  (
select  replace(SUBSTRING(jsonnew,2,length(jsonnew)-2),'\\','') as jsonnew from  (

select json_arrayagg(SUBSTRING(newjson,2,length(newjson)-1))  as jsonnew from  (

SELECT SUBSTRING(jsonnew,2,length(jsonnew)-2)  newjson FROM (
select  json_object('b2b',JSON_ARRAYAGG(newjson)) jsonnew from  (
-- Regular Sales
select  json_object( 'ctin',cust_gstin,  'inv',jsonnew) as newjson from (
select cust_gstin , JSON_ARRAYAGG(newjson) jsonnew from  (
select cust_gstin,invh_date, 
 case when invh_igst_amt >0 then 
  json_object( 'inum', invh_invrefno , 'idt' , DATE_FORMAT(invh_date, '%d-%m-%Y')  ,'val',invh_netamt ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(json_object('num',1,'itm_det',  json_object('tx_val', invh_taxableamt , 'rt',invh_igst_per, 'iamt',invh_igst_amt , 'csamt',0))))
 else
 json_object( 'inum', invh_invrefno , 'idt' , DATE_FORMAT(invh_date, '%d-%m-%Y')  ,'val',invh_netamt ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(json_object('num',1,'itm_det',  json_object('tx_val', invh_taxableamt , 'rt',invh_cgst_per+invh_sgst_per, 'camt' , invh_cgst_amt , 'samt' , invh_sgst_amt , 'csamt',0)))) end
  as newjson from trnsal_invoice_header left  join (select 0 cur_gt, 0 gt, '202303' fp, 33 pos, 'N' rchrg , 'R' inv_typ , 'b2b' invoice_type) a1   on invh_no <> pos  , massal_customer  where invh_party = cust_code and  invh_comp_code = 1 and invh_fincode = 22 and invh_netamt > 0 and invh_date between '2023-03-01' and '2023-03-31'
  
)b2br   group by cust_gstin  

)b2br1  
union 
-- Other Sales
select  json_object( 'ctin',sup_gstin,  'inv',jsonnew) as newjson from (
select sup_gstin , JSON_ARRAYAGG(newjson) jsonnew from  (
select sup_gstin,os_date, 
case when iamt >0 then 
  json_object( 'inum', os_invno , 'idt' , DATE_FORMAT(os_date, '%d-%m-%Y')  ,'val',val ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(json_object('num',1,'itm_det',  json_object('tx_val', txval , 'rt',os_igstper, 'iamt',iamt , 'csamt',0))))
 else
 json_object( 'inum', os_invno , 'idt' , DATE_FORMAT(os_date, '%d-%m-%Y')  ,'val',val ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(json_object('num',1,'itm_det',  json_object('tx_val', txval , 'rt',os_sgstper+os_cgstper, 'camt' , camt , 'samt' , samt , 'csamt',0)))) end
 as newjson from
( select  sup_gstin,os_invno,os_date,sum(os_value) val,sum(os_taxable) txval , sum(os_igst) iamt , sum(os_cgst)  camt , sum(os_sgst) samt , 0  'csamt' ,os_cgstper,os_sgstper,os_igstper
 from trn_other_sales join  maspur_supplier_master on os_custcode = sup_code 
 where  os_compcode = 1 and os_fincode = 22 and os_date between '2023-03-01' and '2023-03-31' and sup_gst_type <> 'U'
 group by sup_gstin,os_invno,os_date ,os_cgstper,os_sgstper,os_igstper) fs1
 left  join (select 0 cur_gt, 0 gt, '202303' fp, 33 pos, 'N' rchrg , 'R' inv_typ , 'b2b' invoice_type) a1   on os_invno <> pos  
 )b2bos   group by sup_gstin  
)b2bos1   
-- Debit Note
union

select  json_object( 'ctin',led_gst_no,  'inv', json_array(newjson)) as newjson from (
select  led_gst_no,case when dbcrt_igstvalue >0  then 
 json_object( 'inum', dbcr_vouno , 'idt' , DATE_FORMAT(dbcr_date, '%d-%m-%Y')  ,'val',dbcr_value ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(
 json_object('num',1,'itm_det',  json_object('tx_val', dbcrt_grossvalue , 'rt',dbcrt_igstper, 'iamt',dbcrt_igstvalue , 'csamt',0))))
 else
 json_object( 'inum', dbcr_vouno , 'idt' , DATE_FORMAT(dbcr_date, '%d-%m-%Y')  ,'val',dbcr_value ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'itms',json_array(
 json_object('num',1,'itm_det',  json_object('tx_val', dbcrt_grossvalue , 'rt',dbcrt_cgstper+dbcrt_sgstper ,'camt',dbcrt_cgstvalue ,'samt',dbcrt_sgstvalue , 'csamt',0))))
 end 
as newjson  from acc_dbcrnote_header h left join  acc_dbcrnote_trailer t on h.dbcr_seqno = t.dbcrt_seqno   
left  join (select 0 cur_gt, 0 gt, '202303' fp, '33' pos, 'N' rchrg , 'R' inv_typ , 'b2b' invoice_type) a on a.invoice_type <> t.dbcrt_seqno
left join acc_ledger_master on dbcr_partyledcode = led_code 
where dbcr_comp_code = 1 and dbcr_date between '2023-03-01' and '2023-03-31' and dbcr_type = 'DNG'  and (dbcrt_cgstledcode = 1644 or dbcrt_sgstledcode = 1645 or dbcrt_igstledcode = 1646) 
) b2bdn
) b2b 
) b2bfinal

union 
-- B2CS
SELECT SUBSTRING(b2csjson,2,length(b2csjson)-2)  newjson FROM (
select  json_object( 'b2cs', json_array(b2csjson)) as b2csjson from (
select case when iamt = 0 then 
 json_object( 'rt', rt,'sply_ty' ,sply_ty ,'pos', pos,'typ',  typ, 'txval' ,txval , 'camt' ,camt , 'samt' , samt  , 'csamt', csamt )
else
 json_object( 'rt', rt,'sply_ty' ,sply_ty ,'pos', pos,'typ',  typ, 'txval' ,txval , 'camt' ,camt , 'samt' , samt  , 'csamt', csamt )
 end as b2csjson
 from  (select   sum(os_taxable) txval , sum(os_igst) iamt , sum(os_cgst)  camt , sum(os_sgst) samt , 0  'csamt' 
 from trn_other_sales join  maspur_supplier_master on os_custcode = sup_code 
 where  os_compcode = 1 and os_fincode = 22 and os_date between '2023-03-01' and '2023-03-31' and sup_gst_type = 'U'
) a1
left  join (select 5 rt,'INTRA'  sply_ty , '33' pos, 'OE' typ ) b1 on typ <> txval
)  b2cs
) b2cs1

union
-- credit note

SELECT SUBSTRING(jsonnew,2,length(jsonnew)-2) newjson  FROM (
select  json_object('cdnr',JSON_ARRAYAGG(newjson)) jsonnew from
(
select  json_object( 'ctin',led_gst_no,  'nt', json_array(newjson)) as newjson from (
select  led_gst_no,case when dbcrt_igstvalue =0  then 
 json_object( 'ntty','C','nt_num',dbcr_vouno,'nt_dt', DATE_FORMAT(dbcr_date, '%d-%m-%Y')  ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'val',dbcr_value, 'itms',
 json_array(
 json_object('num',1,'itm_det',json_object('txval', dbcrt_grossvalue , 'rt',dbcrt_igstper+dbcrt_cgstper+dbcrt_sgstper, 'camt',dbcrt_cgstvalue , 'samt',dbcrt_cgstvalue,'csamt',0.00))))
 else
 json_object( 'ntty','C','nt_num',dbcr_vouno,'nt_dt',DATE_FORMAT(dbcr_date, '%d-%m-%Y') ,'pos',pos,'rchrg',rchrg,'inv_typ',inv_typ,'val',dbcr_value, 'itms',
 json_array(
  json_object('num',1,'itm_det', json_object('txval', dbcrt_grossvalue , 'rt',dbcrt_igstper+dbcrt_cgstper+dbcrt_sgstper, 'iamt',dbcrt_igstvalue ,'csamt',0.00))))
 end 
as newjson  from acc_dbcrnote_header h left join  acc_dbcrnote_trailer t on h.dbcr_seqno = t.dbcrt_seqno   
left  join (select 0 cur_gt, 0 gt, '202303' fp, '33' pos, 'N' rchrg , 'R' inv_typ , 'cndr' invoice_type) a on a.invoice_type <> t.dbcrt_seqno
left join acc_ledger_master on dbcr_partyledcode = led_code 
where dbcr_comp_code = 1 and dbcr_date between '2023-03-01' and '2023-03-31' and dbcr_type = 'CNG' and (dbcrt_cgstledcode = 1644 or dbcrt_sgstledcode = 1645 or  dbcrt_igstledcode = 1646) 

) cdnrfinal
) crnote
) crnotefinal

union 
SELECT SUBSTRING(jsonabs,2,length(jsonabs)-2) newjson  FROM (
select   json_object('hsn', json_object('data',JSON_ARRAYAGG(invjson))) jsonabs from  (

	select   json_object( 'num',num,'hsn_sc',hsncode,'desc',descrip,'uqc',uqc,'qty',qty,'rt',rt,'taxval',txval,'iamt',iamt,
	'camt', camt,'samt', samt ,'csamt',csamt) invjson
	  from
	(
	select  1 num,'KraftPaper' descrip , 'MTS' uqc,12 rt, hsncode,round(sum(invh_totwt)/1000,3) qty ,sum(invh_taxableamt) txval , sum(invh_sgst_amt) samt , sum(invh_cgst_amt) camt , sum(invh_igst_amt) iamt , 0 csamt  from trnsal_invoice_header  h, (select invt_compcode,invt_fincode,invt_seqno,max(invt_hsncode) hsncode from trnsal_invoice_trailer where invt_compcode = 1 and invt_fincode = 22 group by invt_compcode,invt_fincode,invt_seqno
	)  t where 
	invh_comp_code = invt_compcode and invh_fincode = invt_fincode and  invh_seqno = invt_seqno and
	invh_comp_code = 1 and invh_fincode = 22 and  invh_date between '2023-03-01' and '2023-03-31' and invh_netamt > 0 group by hsncode
	) hsninv
	union 
	 select  json_object( 'num',num,'hsn_sc',salitem_hsn,'desc',salitem_name,'uqc',uqc,'qty',qty,'rt',rt,'txval',txval,'iamt',iamt,
	'camt', camt,'samt', samt ,'csamt',csamt) invjson from (
	 select  row_number() over(order by salitem_hsn)+1 as num,salitem_hsn,salitem_name,'MTS' uqc,sum(os_cgstper+os_sgstper+os_igstper) rt ,qty,txval,camt,samt,iamt ,0 csamt
	 from
	 (
	 select  salitem_hsn,salitem_name,os_cgstper,os_sgstper,os_igstper,sum(os_qty) as qty,sum(os_taxable) txval,sum(os_cgst) camt,sum(os_sgst) samt,sum(os_igst) iamt
	 from trn_other_sales join  maspur_supplier_master on os_custcode = sup_code 
	 join mas_othersales_item_master on os_item = salitem_code
	 where  os_compcode = 1 and os_fincode = 22 and os_date between '2023-03-01' and '2023-03-31'  
	 group by salitem_hsn,salitem_name,os_cgstper,os_sgstper,os_igstper
	 )a1  group by salitem_hsn,salitem_name,os_cgstper,os_sgstper,os_igstper
	) hsnos
	 union
     	 select  json_object( 'num',num,'hsn_sc',hsn,'desc',descrip,'uqc',uqc,'qty',qty,'rt',rt,'txval',txval,'iamt',iamt,
	'camt', camt,'samt', samt ,'csamt',csamt) invjson from (
select  4 num, '48041900' hsn,'KraftPaper' descrip, 'OTH' uqc, 0 qty, 12 rt, sum(dbcrt_grossvalue) txval, sum(dbcrt_cgstvalue) camt , sum(dbcrt_sgstvalue) samt , sum(dbcrt_igstvalue) iamt , 0 csamt 
 from acc_dbcrnote_header h left join  acc_dbcrnote_trailer t on h.dbcr_seqno = t.dbcrt_seqno   
where dbcr_comp_code = 1 and dbcr_date between '2023-03-01' and '2023-03-31' and dbcr_type = 'CNG' and (dbcrt_cgstledcode = 1644 or dbcrt_sgstledcode = 1645 or  dbcrt_igstledcode = 1646) 
and  dbcrt_cgstvalue + dbcrt_sgstvalue+ dbcrt_igstvalue > 0
) crsum
) hsn1
) hsn11

) fnend 

) aa 
) aa1 left  join (select '33AALCS4958D1Z7' gstin, 0 cur_gt, 0 gt, '202303' fp, 33 pos, 'N' rchrg , 'R' inv_typ , 'b2b' invoice_type) a1   on jsonnew <> pos 
) a11
) a12");

echo $r;
    $result = mysql_query($r);
    $accarray = array();
    while($row =mysql_fetch_assoc($result))
    {
        $accarray[] = $row;
    }

    echo json_encode($accarray);
//display it 
echo $accarray;
//generate json file
//file_put_contents("geeks_data.json", json_encode($emparray));



?>

