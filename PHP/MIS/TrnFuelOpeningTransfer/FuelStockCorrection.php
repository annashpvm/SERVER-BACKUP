<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
 		
    $compcode  =  $_POST['compcode'];
    $finid =  $_POST['finid'];
    $startdate =  $_POST['startdate'];
    $enddate   =  $_POST['enddate'];


    mysql_query("BEGIN");

    $query1= "

select * from (
select company_name,itmh_name,itmh_code, itmt_opqty,itmt_opvalue,ifnull(opre.op_rect_qty,0) as op_rect_qty,
ifnull(opre.op_rect_val,0) as op_rect_val,  
ifnull(oprr.op_recret_qty,0) as op_recret_qty,ifnull(oprr.op_recret_val,0) as op_recret_val,
ifnull(opis.op_is_qty,0) as op_is_qty,ifnull(opis.op_is_value,0) as op_is_value,  
ifnull(opir.op_ir_qty,0) as op_ir_qty,ifnull(opir.op_ir_value,0) as op_ir_value,
ifnull(opsale.op_sale_qty,0) as op_sale_qty,ifnull(opsale.op_sale_value,0) as op_sale_value,  
ifnull(re.rect_qty,0) as rect_qty,ifnull(re.rect_val,0) as rect_val,
ifnull(rr.recret_qty,0) as recret_qty,ifnull(rr.recret_val,0) as recret_val,
ifnull(iss.is_qty,0) as is_qty,  
ifnull(iss.is_value,0) as is_value,ifnull(isr.ir_qty,0) as ir_qty,ifnull(isr.ir_value,0) as ir_value ,ifnull(sale.sale_qty,0) as sale_qty,ifnull(sale.sale_value,0) as sale_value from  
masfu_item_trailer d
left outer join   
(select rech_compcode,rect_item_code,ifnull(sum(rect_grnqty),0) as op_rect_qty ,
ifnull(sum(rect_costvalue),0) as op_rect_val   
from trnfu_receipt_header,trnfu_receipt_trailer   
where rech_seqno = rect_hdseqno and rech_compcode = $compcode and rech_fincode = $finid and rech_date >= '$startdate' and rech_date < '$startdate'  
group by rech_compcode,rech_fincode,rect_item_code) opre on
d.itmt_hdcode = opre.rect_item_code
left outer join   
(select rerh_compcode,rert_itemcode,ifnull(sum(rert_qty),0) as op_recret_qty,
ifnull(sum(rert_totitemvalue),0) as op_recret_val  
from trnfu_receiptret_header,trnfu_receiptret_trailer   
where rerh_seqno = rert_hdseqno and rerh_compcode = $compcode and rerh_fincode = $finid and rerh_date >= '$startdate' and rerh_date < '$startdate'  
group by rerh_compcode,rerh_fincode,rert_itemcode) oprr on
d.itmt_hdcode = oprr.rert_itemcode
left outer join
(select issh_compcode,isst_itmcode ,ifnull(sum(isst_qty),0) as op_is_qty,
ifnull(sum(isst_values),0) as op_is_value   
from trnfu_issue_header ,trnfu_issue_trailer   
where issh_seqno = isst_hdseqno and issh_compcode = $compcode and issh_fincode = $finid and issh_date >= '$startdate' and issh_date < '$startdate'  
group by issh_compcode,isst_itmcode) opis on  
d.itmt_hdcode = opis.isst_itmcode
left outer join
(select isrh_compcode,isrt_itemcode ,ifnull(sum(isrt_qty),0) as op_ir_qty,
ifnull(sum(isrt_values),0) as op_ir_value   
from trnfu_issret_header ,trnfu_issret_trailer   
where isrh_seqno = isrt_hdseqno and isrh_compcode = $compcode and isrh_fincode = $finid and isrh_date >= '$startdate' and isrh_date < '$startdate'  
group by isrh_compcode,isrt_itemcode) opir on  
d.itmt_hdcode = opir.isrt_itemcode
left outer join
(select salh_compcode,salt_itemcode,ifnull(sum(salt_qty),0) as op_sale_qty,
ifnull(sum(salt_value),0) as op_sale_value  
from trnfu_salenote_header, trnfu_salenote_trailer  
where salh_seqno = salt_hdseqno and salh_compcode = $compcode and salh_fincode = $finid and salh_date >= '$startdate' and salh_date < '$startdate'  
group by salh_compcode,salt_itemcode) opsale on 
d.itmt_hdcode = opsale.salt_itemcode
left outer join
(select rech_compcode,rect_item_code,ifnull(sum(rect_grnqty),0) as rect_qty ,
ifnull(sum(rect_itemvalue),0) as rect_val   
from trnfu_receipt_header,trnfu_receipt_trailer   
where rech_seqno = rect_hdseqno and rech_compcode = $compcode and rech_fincode = $finid and rech_date >= '$startdate' and rech_date <= '$enddate'  
group by rech_compcode,rech_fincode,rect_item_code) re on  
d.itmt_hdcode = re.rect_item_code
left outer join
(select rerh_compcode,rert_itemcode,ifnull(sum(rert_qty),0) as recret_qty,
ifnull(sum(rert_totitemvalue),0) as recret_val  
from trnfu_receiptret_header,trnfu_receiptret_trailer   
where rerh_seqno = rert_hdseqno and rerh_compcode = $compcode and rerh_fincode = $finid and rerh_date >= '$startdate' and rerh_date <= '$enddate'  
group by rerh_compcode,rerh_fincode,rert_itemcode) rr on  
d.itmt_hdcode = rr.rert_itemcode
left outer join
(select issh_compcode,isst_itmcode ,ifnull(sum(isst_qty),0) as is_qty,
ifnull(sum(isst_values),0) as is_value   
from trnfu_issue_header ,trnfu_issue_trailer   
where issh_seqno = isst_hdseqno and issh_compcode = $compcode and issh_fincode = $finid and issh_date >= '$startdate' and issh_date <= '$enddate'  
group by issh_compcode,isst_itmcode) iss  on
d.itmt_hdcode = iss.isst_itmcode
left outer join
(select isrh_compcode,isrt_itemcode ,ifnull(sum(isrt_qty),0) as ir_qty,
ifnull(sum(isrt_values),0) as ir_value   
from trnfu_issret_header ,trnfu_issret_trailer   
where isrh_seqno = isrt_hdseqno and isrh_compcode = $compcode and isrh_fincode = $finid and isrh_date >= '$startdate' and isrh_date <= '$enddate'  
group by isrh_compcode,isrt_itemcode) isr  on
d.itmt_hdcode = isr.isrt_itemcode
left outer join
(select salh_compcode,salt_itemcode,ifnull(sum(salt_qty),0) as sale_qty,
ifnull(sum(salt_value),0) as sale_value  
from trnfu_salenote_header, trnfu_salenote_trailer  
where salh_seqno = salt_hdseqno and salh_compcode = $compcode and salh_fincode = $finid and salh_date >= '$startdate' and salh_date <= '$enddate'  
group by salh_compcode,salt_itemcode) sale on  
d.itmt_hdcode = sale.salt_itemcode
inner join masfu_item_header c on c.itmh_code = d.itmt_hdcode
inner join mas_company e  on e.company_code = $compcode
where   
d.itmt_compcode = $compcode and  
d.itmt_fincode = $finid
) a1 where itmt_opqty + op_rect_qty + op_is_qty+rect_qty +is_qty > 0 order by itmh_name; 
";

    $result11=mysql_query($query1);




    while ($row = mysql_fetch_assoc($result11)) {


           $itemcode = $row['itmh_code'];




           $opening_qty = $row['itmt_opqty'] + $row['op_rect_qty']-  $row['op_recret_qty'] -  $row['op_is_qty'] +  $row['op_ir_qty'] -  $row['op_sale_qty'];



           $opening_value = $row['itmt_opvalue'] + $row['op_rect_val']-  $row['op_recret_val'] -  $row['op_is_value'] +  $row['op_ir_value'] -  $row['op_sale_value'];




           $opening_rate = 0;
           if ($opening_value > 0 &&  $opening_qty > 0)
              $opening_rate = $opening_value / $opening_qty;




          $receipt_qty   =   $row['rect_qty'] - $row['recret_qty'];

          $receipt_value =   $row['rect_val'] - $row['recret_val'];

          $receipt_rate = 0;
          if ( $receipt_value > 0 &&  $receipt_qty  > 0)
              $receipt_rate = $receipt_value/ $receipt_qty;


          $issue_qty   =   $row['is_qty'] - $row['ir_qty'];
          $issue_value =   $row['is_value'] - $row['ir_value'];
  
          $issue_rate = 0;
          if ( $issue_value > 0 &&  $issue_qty  > 0)
              $issue_rate = $issue_value/ $issue_qty;


          $closing_qty   =   $opening_qty + $receipt_qty  -  $issue_qty;
          $closing_value =   $opening_value + $receipt_value - $issue_value;
  
          $closing_rate = 0;
          if ( $closing_value > 0 &&  $closing_qty  > 0)
              $closing_rate =  $closing_value/ $closing_qty;


           $query2   = "update masfu_item_trailer set itmt_clqty  = $closing_qty, itmt_clvalue = $closing_value , itmt_avgrate = $closing_rate where itmt_compcode = $compcode and itmt_fincode = $finid and itmt_hdcode = $itemcode";
           $result2=mysql_query($query2);   


       
    } 





     if ($result2)
     {
          mysql_query("COMMIT");
          echo '({"success":"true","msg":"' . $compcode . '"})';
     }
     else
     {
         mysql_query("ROLLBACK");
         echo '({"success":"false","msg":"' . $compcode . '"})';
     }

 
?>
