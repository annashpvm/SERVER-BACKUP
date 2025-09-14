<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
 		
    $compcode  =  $_POST['compcode'];
    $finid =  $_POST['finid'];
    $startdate =  $_POST['startdate'];
    $enddate   =  $_POST['enddate'];


    mysql_query("BEGIN");

    $query1= "select       
itmh_type,itmh_name,itemcode,sum(opstk) as opstk,sum(opval) as opval,
sum(recpt_qty) as recpt_qty,sum(recpt_val) as recpt_val,sum(iss_qty) as iss_qty,
sum(iss_val) as iss_val,sum(sal_qty) as sal_qty,sum(sal_val) as sal_val,
sum(ret_qty) as ret_qty, sum(ret_val) as ret_val,  
(sum(opval)+sum(recpt_val)+sum(iss_val)+sum(sal_val)+sum(ret_val)) as tot,
(sum(opstk)+sum(recpt_qty)+sum(iss_qty)+sum(sal_qty)+sum(ret_qty)) as clo_qty,
(sum(opval)+sum(recpt_val)+sum(iss_val)+sum(sal_val)+sum(ret_val)) as clo_val          
from      
(select itmt_compcode as compcode,itmt_hdcode as itemcode,itmt_opqty as opstk,itmt_opvalue as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val from masrm_item_trailer where itmt_compcode in 
  ($compcode) and itmt_fincode = $finid   and itmt_opqty >0      
union all      
select rech_compcode as compcode,rect_item_code as itemcode, sum(rect_grnqty) as opstk,sum(rect_costvalue) as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val  from vew_rm_receiptheadermerge h,vew_rm_receipttrailermerge  t  where h.type=t.type and rech_seqno = rect_hdseqno and  rech_compcode in ($compcode) and rech_fincode = $finid   and rech_date < '$startdate'  group by rech_compcode,rech_fincode,rect_item_code    
  
union all      
select rech_compcode as compcode,rect_item_code as itemcode, 0 as opstk,0 as opval,sum(rect_grnqty) as recpt_qty,sum(rect_costvalue) as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val  from vew_rm_receiptheadermerge h,vew_rm_receipttrailermerge  t  where h.type=t.type and rech_seqno = rect_hdseqno and  rech_compcode in ($compcode) and rech_fincode = $finid   and rech_date >= '$startdate'  and rech_date <= '$enddate'  group by rech_compcode,rech_fincode,rect_item_code      
union all      
select rerh_compcode as compcode,rert_itemcode as itemcode, sum(rert_qty)*-1 as opstk,sum(rert_totitemvalue)* -1 as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val, 0 as ret_qty,0 as ret_val  from vew_rm_receiptret_headermerge h,vew_rm_receiptret_trailermerge  t  where h.type=t.type and rerh_seqno = rert_hdseqno and rerh_compcode in ($compcode)  and rerh_fincode = $finid   and rerh_date < '$startdate'   group by rerh_compcode,rerh_fincode,rert_itemcode       
union all      
select rerh_compcode as compcode, rert_itemcode as itemcode, 0 as opstk,0 as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val, sum(rert_qty) as ret_qty,sum(rert_totitemvalue) as ret_val  from vew_rm_receiptret_headermerge h,vew_rm_receiptret_trailermerge  t  where h.type=t.type and rerh_seqno = rert_hdseqno and rerh_compcode in ($compcode) and rerh_fincode = $finid   and rerh_date >= '$startdate'  and rerh_date <= '$enddate'  group by rerh_compcode,rerh_fincode,rert_itemcode       
union all      
select issh_compcode as compcode , isst_itmcode as itemcode ,sum(isst_qty)*-1 as opstk,sum(isst_qty * isst_rate)*-1 as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val  from trnrm_issue_header ,trnrm_issue_trailer where issh_seqno = isst_hdseqno and issh_compcode in ($compcode) and  issh_fincode = $finid   and issh_date < '$startdate'  group by issh_compcode ,isst_itmcode      
union all      
select issh_compcode as compcode , isst_itmcode as itemcode ,0 as opstk,0 as opval,0 as recpt_qty,0 as recpt_val,sum(isst_qty) as iss_qty,sum(isst_qty * isst_rate) as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val  from trnrm_issue_header ,trnrm_issue_trailer where issh_seqno = isst_hdseqno and issh_compcode in ($compcode) and  issh_fincode = $finid   and issh_date >= '$startdate'  and issh_date <= '$enddate'  group by issh_compcode ,isst_itmcode      
union all      
select isrh_compcode as compcode,isrt_itemcode as itemcode ,sum(isrt_qty) as opstk,sum(isrt_values) as op_value,   0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val from trnrm_issret_header ,trnrm_issret_trailer   where isrh_seqno = isrt_hdseqno and isrh_compcode in ($compcode) and isrh_fincode = $finid   and isrh_date < '$startdate'  group by isrh_compcode ,isrt_itemcode      
union all      
select isrh_compcode as compcode,isrt_itemcode as itemcode ,0 as opstk,0 as op_value,   0 as recpt_qty,0 as recpt_val,sum(isrt_qty)*-1 as iss_qty,sum(isrt_values)*-1 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val from trnrm_issret_header ,trnrm_issret_trailer   where isrh_seqno = isrt_hdseqno and isrh_compcode in ($compcode) and isrh_fincode = $finid   and isrh_date >= '$startdate'  and isrh_date <= '$enddate' group by isrh_compcode ,isrt_itemcode      
union all      
select salh_compcode as compcode, salt_itemcode as itemcode,sum(salt_qty) *-1 as opstk,sum(salt_value)*-1 as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,0 as sal_qty,0 as sal_val,0 as ret_qty,0 as ret_val from trnrm_salenote_header, trnrm_salenote_trailer  where salh_seqno = salt_hdseqno and salh_compcode in ($compcode) and salh_fincode = $finid   and salh_date < '$startdate'  group by salh_compcode,salt_itemcode       
union all      
select salh_compcode as compcode, salt_itemcode as itemcode, 0 as opstk,0 as opval,0 as recpt_qty,0 as recpt_val,0 as iss_qty,0 as iss_val,sum(salt_qty)  as sal_qty,sum(salt_value) as sal_val,0 as ret_qty,0 as ret_val from trnrm_salenote_header, trnrm_salenote_trailer  where salh_seqno = salt_hdseqno and salh_compcode in ($compcode) and salh_fincode = $finid   and salh_date >= '$startdate' and salh_date  <= '$enddate' group by salh_compcode,salt_itemcode      
) as aa inner join masrm_item_header b on aa.itemcode = b.itmh_code group by itmh_type,itmh_name,itemcode order by itmh_name;";

    $result11=mysql_query($query1);


//echo $query1;
//echo "<br>";

    while ($row = mysql_fetch_assoc($result11)) {


           $itemcode = $row['itemcode'];
           $cloqty   = $row['clo_qty'];
           $cloval   = $row['clo_val'];
           if ($cloqty > 0 && $cloval > 0)
              $itemRate = $cloval / $cloqty;
           else
              $itemRate = 0;
   


           $query2   = "update masrm_item_trailer set itmt_clqty  = $cloqty, itmt_clvalue = $cloval , itmt_avgrate = $itemRate where itmt_compcode = $compcode and itmt_fincode = $finid and itmt_hdcode = $itemcode";
           $result2=mysql_query($query2);   


//echo $query2;
//echo "<br>";
       
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
