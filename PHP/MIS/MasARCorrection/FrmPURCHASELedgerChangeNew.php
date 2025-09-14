<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

session_start();

 mysql_query("BEGIN");
/*

// trn_weight_card
 $query1 = "update trn_weight_card  set wc_sup_code = 1638   where wc_sup_code =  2914 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 116   where wc_sup_code =  2094 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 27   where wc_sup_code =  1888 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 2253   where wc_sup_code =  2713 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 63   where wc_sup_code =  2194 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 2747   where wc_sup_code =  2957 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);




 $query1 = "update trn_weight_card  set wc_sup_code = 117   where wc_sup_code =  2562 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 184   where wc_sup_code =  2092 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 172   where wc_sup_code =  2119 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);





 $query1 = "update trn_weight_card  set wc_sup_code = 2159   where wc_sup_code =  2230 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 1619   where wc_sup_code =  1330 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 324   where wc_sup_code =  2088 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);




 $query1 = "update trn_weight_card  set wc_sup_code = 371   where wc_sup_code =  2091 and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 1615   where wc_sup_code =  1372  and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


 $query1 = "update trn_weight_card  set wc_sup_code = 2180   where wc_sup_code =  1973   and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);



 $query1 = "update trn_weight_card  set wc_sup_code = 1616   where wc_sup_code =  1415   and wc_compcode >= 1 and wc_fincode >= 21 and wc_sup_code > 0 and wc_ticketno >= 0";
 $result1 = mysql_query($query1);


// --



//-- STORES

 $query2 = "update trnpur_min_header set minh_sup_code = 1638 where minh_sup_code = 2914  and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 116  where minh_sup_code = 2094   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 27    where minh_sup_code = 1888 	  and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 2253    where minh_sup_code = 2713   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 63 where minh_sup_code = 2194   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 2747    where minh_sup_code = 2957   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 117    where minh_sup_code = 2562   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);


 $query2 = "update trnpur_min_header set minh_sup_code = 184    where minh_sup_code = 2092   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 172       where minh_sup_code = 2119    and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);


 $query2 = "update trnpur_min_header set minh_sup_code = 2159    where minh_sup_code = 2230   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 1619    where minh_sup_code = 1330   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 1638 where minh_sup_code = 2914  and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 324    where minh_sup_code = 2088   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 371    where minh_sup_code = 2091   and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 1615    where minh_sup_code = 1372    and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 2180    where minh_sup_code = 1973     and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

 $query2 = "update trnpur_min_header set minh_sup_code = 1616       where minh_sup_code = 1415        and minh_comp_code >= 1  and minh_fin_code >= 21  and minh_minno >= 0";
 $result2 = mysql_query($query2);

//---- 



//-- DEBIT NOTE 
 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 1638 where dbcr_partycode = 2914   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);


 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 116    where dbcr_partycode = 2094    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 27 where dbcr_partycode = 1888    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 2253 where dbcr_partycode = 2713    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 63 where dbcr_partycode = 2194   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 2747    where dbcr_partycode = 2957    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);



 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 117      where dbcr_partycode = 2562    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 1638 where dbcr_partycode = 2914   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 184    where dbcr_partycode = 2092    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 172    where dbcr_partycode = 2119    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 2159    where dbcr_partycode = 2230    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 1619    where dbcr_partycode = 1330    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);


 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 324    where dbcr_partycode = 2088    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 371    where dbcr_partycode = 2091    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 1615    where dbcr_partycode = 1372     and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 2180    where dbcr_partycode = 1973      and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update tmpacc_dbcrnote_header set dbcr_partycode = 1616    where dbcr_partycode = 1415      and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);
//--

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1638 where dbcr_partycode = 2914   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);


 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 116    where dbcr_partycode = 2094    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 27 where dbcr_partycode = 1888    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 2253 where dbcr_partycode = 2713    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 63 where dbcr_partycode = 2194   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 2747    where dbcr_partycode = 2957    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);



 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1638 where dbcr_partycode = 2914   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);


 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 117      where dbcr_partycode = 2562    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1638 where dbcr_partycode = 2914   and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 184    where dbcr_partycode = 2092    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 172    where dbcr_partycode = 2119    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 2159    where dbcr_partycode = 2230    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1619    where dbcr_partycode = 1330    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);


 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 324    where dbcr_partycode = 2088    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 371    where dbcr_partycode = 2091    and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1615    where dbcr_partycode = 1372     and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 2180    where dbcr_partycode = 1973      and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);

 $query4 = "update acc_dbcrnote_header set dbcr_partycode = 1616    where dbcr_partycode = 1415      and dbcr_comp_code >= 1  and dbcr_finid >= 21  and dbcr_seqno >= 0";
 $result4 = mysql_query($query4);




//----



// -- RAWMATERIAL

 $query9 = "update trnrm_receipt_header set rech_sup_code = 116 where rech_sup_code = 2094    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 1638 where rech_sup_code = 2914   and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 27    where rech_sup_code = 1888    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 2253    where rech_sup_code = 2713    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 63  where rech_sup_code = 2194    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 2747    where rech_sup_code = 2957    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 117    where rech_sup_code = 2562    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 184    where rech_sup_code = 2092    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);
 $query9 = "update trnrm_receipt_header set rech_sup_code = 172    where rech_sup_code = 2119    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 2159    where rech_sup_code = 2230    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 1619    where rech_sup_code = 1330    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 324    where rech_sup_code = 2088    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);




 $query9 = "update trnrm_receipt_header set rech_sup_code = 371       where rech_sup_code = 2091     and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 1615       where rech_sup_code = 1372      and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnrm_receipt_header set rech_sup_code = 2180       where rech_sup_code = 1973       and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);



 $query9 = "update trnrm_receipt_header set rech_sup_code = 1616          where rech_sup_code = 1415          and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);



//---


//--- FUEL
 $query9 = "update trnfu_receipt_header set rech_sup_code = 116 where rech_sup_code = 2094    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 1638 where rech_sup_code = 2914   and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 27    where rech_sup_code = 1888    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 2253    where rech_sup_code = 2713    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 63  where rech_sup_code = 2194    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 2747    where rech_sup_code = 2957    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 117    where rech_sup_code = 2562    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 184    where rech_sup_code = 2092    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);
 $query9 = "update trnfu_receipt_header set rech_sup_code = 172    where rech_sup_code = 2119    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 2159    where rech_sup_code = 2230    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 1619    where rech_sup_code = 1330    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 324    where rech_sup_code = 2088    and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);




 $query9 = "update trnfu_receipt_header set rech_sup_code = 371       where rech_sup_code = 2091     and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 1615       where rech_sup_code = 1372      and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);

 $query9 = "update trnfu_receipt_header set rech_sup_code = 2180       where rech_sup_code = 1973       and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);



 $query9 = "update trnfu_receipt_header set rech_sup_code = 1616          where rech_sup_code = 1415          and rech_compcode >= 1  and rech_fincode >= 21  and rech_seqno >= 0";
 $result9 = mysql_query($query9);




//---


//--- RM QC
 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 1638      where qc_rm_supcode = 2914    and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 116      where qc_rm_supcode = 2094     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 27      where qc_rm_supcode = 1888     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 2253      where qc_rm_supcode = 2713     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 2747         where qc_rm_supcode = 2957      and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 117         where qc_rm_supcode = 2562     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 184         where qc_rm_supcode = 2092     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 172         where qc_rm_supcode = 2119     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 2159         where qc_rm_supcode = 2230     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 1619         where qc_rm_supcode = 1330     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 324      where qc_rm_supcode = 2088     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 371         where qc_rm_supcode = 2091     and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 1615         where qc_rm_supcode = 1372      and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 1638      where qc_rm_supcode = 2914    and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 2180         where qc_rm_supcode = 1973       and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_rm_inspection set qc_rm_supcode = 1616         where qc_rm_supcode = 1415       and qc_rm_compcode >= 1  and qc_rm_fincode >= 21  and qc_rm_entryno >= 0";
 $result11 = mysql_query($query11);






//---


//--- FUEL QC
 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 1638      where qc_fuel_supcode = 2914    and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 116      where qc_fuel_supcode = 2094     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 27      where qc_fuel_supcode = 1888     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 2253      where qc_fuel_supcode = 2713     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 2747         where qc_fuel_supcode = 2957      and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 117         where qc_fuel_supcode = 2562     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 184         where qc_fuel_supcode = 2092     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 172         where qc_fuel_supcode = 2119     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 2159         where qc_fuel_supcode = 2230     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 1619         where qc_fuel_supcode = 1330     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 324      where qc_fuel_supcode = 2088     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 371         where qc_fuel_supcode = 2091     and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 1615         where qc_fuel_supcode = 1372      and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 1638      where qc_fuel_supcode = 2914    and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 2180         where qc_fuel_supcode = 1973       and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trn_qc_fuel_inspection set qc_fuel_supcode = 1616         where qc_fuel_supcode = 1415       and qc_fuel_compcode >= 1  and qc_fuel_fincode >= 21  and qc_fuel_entryno >= 0";
 $result11 = mysql_query($query11);





//-- 




//--- RM PURCHASE ORDER
 $query11 = "update trnrm_order_header set ordh_sup_code = 1638      where ordh_sup_code = 2914    and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trnrm_order_header set ordh_sup_code = 116      where ordh_sup_code = 2094     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 27      where ordh_sup_code = 1888     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 2253      where ordh_sup_code = 2713     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trnrm_order_header set ordh_sup_code = 2747         where ordh_sup_code = 2957      and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 117         where ordh_sup_code = 2562     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trnrm_order_header set ordh_sup_code = 184         where ordh_sup_code = 2092     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trnrm_order_header set ordh_sup_code = 172         where ordh_sup_code = 2119     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 2159         where ordh_sup_code = 2230     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trnrm_order_header set ordh_sup_code = 1619         where ordh_sup_code = 1330     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trnrm_order_header set ordh_sup_code = 324      where ordh_sup_code = 2088     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 371         where ordh_sup_code = 2091     and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);
 $query11 = "update trnrm_order_header set ordh_sup_code = 1615         where ordh_sup_code = 1372      and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);


 $query11 = "update trnrm_order_header set ordh_sup_code = 1638      where ordh_sup_code = 2914    and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 2180         where ordh_sup_code = 1973       and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);

 $query11 = "update trnrm_order_header set ordh_sup_code = 1616         where ordh_sup_code = 1415       and ordh_compcode >= 1  and ordh_fincode >= 21  and ordh_no >= 0";
 $result11 = mysql_query($query11);



// ACCOUNTS


 $query11 = "update acc_tran  set acctran_led_code  = 1638      where acctran_led_code  = 2914    and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_tran  set acctran_led_code  = 116      where acctran_led_code  = 2094     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 27      where acctran_led_code  = 1888     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 2253      where acctran_led_code  = 2713     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_tran  set acctran_led_code  = 2747         where acctran_led_code  = 2957      and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 117         where acctran_led_code  = 2562     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_tran  set acctran_led_code  = 184         where acctran_led_code  = 2092     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_tran  set acctran_led_code  = 172         where acctran_led_code  = 2119     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 2159         where acctran_led_code  = 2230     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_tran  set acctran_led_code  = 1619         where acctran_led_code  = 1330     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_tran  set acctran_led_code  = 324      where acctran_led_code  = 2088     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 371         where acctran_led_code  = 2091     and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_tran  set acctran_led_code  = 1615         where acctran_led_code  = 1372      and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_tran  set acctran_led_code  = 1638      where acctran_led_code  = 2914    and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 2180         where acctran_led_code  = 1973       and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_tran  set acctran_led_code  = 1616         where acctran_led_code  = 1415       and acctran_accref_seqno > 0";
 $result11 = mysql_query($query11);






 $query11 = "update acc_current_balance  set curbal_led_code  = 1638      where curbal_led_code  = 2914    and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_current_balance  set curbal_led_code  = 116      where curbal_led_code  = 2094     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 27      where curbal_led_code  = 1888     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 2253      where curbal_led_code  = 2713     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_current_balance  set curbal_led_code  = 2747         where curbal_led_code  = 2957      and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 117         where curbal_led_code  = 2562     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_current_balance  set curbal_led_code  = 184         where curbal_led_code  = 2092     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_current_balance  set curbal_led_code  = 172         where curbal_led_code  = 2119     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 2159         where curbal_led_code  = 2230     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_current_balance  set curbal_led_code  = 1619         where curbal_led_code  = 1330     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_current_balance  set curbal_led_code  = 324      where curbal_led_code  = 2088     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 371         where curbal_led_code  = 2091     and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_current_balance  set curbal_led_code  = 1615         where curbal_led_code  = 1372      and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_current_balance  set curbal_led_code  = 1638      where curbal_led_code  = 2914    and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 2180         where curbal_led_code  = 1973       and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_current_balance  set curbal_led_code  = 1616         where curbal_led_code  = 1415       and curbal_comp_code = 1 and curbal_finid >22  and curbal_seqno > 0";
 $result11 = mysql_query($query11);
*/

 $query11 = "update acc_trail  set acctrail_led_code  = 1638      where acctrail_led_code  = 2914    and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_trail  set acctrail_led_code  = 116      where acctrail_led_code  = 2094     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 27      where acctrail_led_code  = 1888     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 2253      where acctrail_led_code  = 2713     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_trail  set acctrail_led_code  = 2747         where acctrail_led_code  = 2957      and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 117         where acctrail_led_code  = 2562     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_trail  set acctrail_led_code  = 184         where acctrail_led_code  = 2092     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_trail  set acctrail_led_code  = 172         where acctrail_led_code  = 2119     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 2159         where acctrail_led_code  = 2230     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_trail  set acctrail_led_code  = 1619         where acctrail_led_code  = 1330     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_trail  set acctrail_led_code  = 324      where acctrail_led_code  = 2088     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 371         where acctrail_led_code  = 2091     and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);
 $query11 = "update acc_trail  set acctrail_led_code  = 1615         where acctrail_led_code  = 1372      and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


 $query11 = "update acc_trail  set acctrail_led_code  = 1638      where acctrail_led_code  = 2914    and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 2180         where acctrail_led_code  = 1973       and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);

 $query11 = "update acc_trail  set acctrail_led_code  = 1616         where acctrail_led_code  = 1415       and acctrail_accref_seqno > 0";
 $result11 = mysql_query($query11);


if( $result11)


       {
            mysql_query("COMMIT");                        
            echo '({"success":"true"})';
        }
        else
        {
            mysql_query("ROLLBACK");            
          
	    echo '({"success":"false"})';
        }   
        

       
 
?>
