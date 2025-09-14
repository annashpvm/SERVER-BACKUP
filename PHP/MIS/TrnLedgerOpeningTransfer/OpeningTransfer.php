<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
 		
    $compcode  =  $_POST['compcode'];
    $finid     =  $_POST['finid'];
    $nextfinid =  $_POST['nextfinid'];
    $startdate =  $_POST['startdate'];
    $enddate   =  $_POST['enddate'];


    mysql_query("BEGIN");

//    $query1= "select * from acc_ledger_master where led_status <> 'N'";
    $query1= "select * from massal_customer";

    $result11=mysql_query($query1);


    while ($row = mysql_fetch_assoc($result11)) {

           $ledcode  = $row['cust_code'];

//echo $ledcode;




           $query2   = mysql_query("select count(*) recfound from acc_current_balance where curbal_finid = $nextfinid and curbal_led_code =  $ledcode");
           $findrow  = mysql_fetch_row($query2);
//echo $findrow[0];
// echo "</br>";  
           if ($findrow[0]  == 0)
           {
		$query1="select ifnull(max(curbal_seqno),0)+1 as curbal_seqno from acc_current_balance";
		$result1=mysql_query($query1);
		$rec1=mysql_fetch_array($result1);
		$curbalseqno= $rec1['curbal_seqno'];


//echo $curbalseqno;


	        $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$nextfinid','1' );";
                $result1 = mysql_query($query1);

//echo $query1;
	        $curbalseqno = $curbalseqno + 1;





                $query1 = "CALL acc_sp_inscurrent_balance('$curbalseqno','$ledcode','$nextfinid','90' );";
                $result1 = mysql_query($query1);

//echo $query1;

           } 
   
       
      } 



	 $query = "update acc_current_balance set curbal_obdbamt = '0' , curbal_obcramt = '0' where curbal_finid = '$nextfinid' and curbal_comp_code = '$compcode'  and curbal_led_code > 0 ";
         $result = mysql_query($query);

/*
 $query1  = "select maingrp, maingroupname,subgrp, subgroupname,subgrp2,subgrouplevel3,led_name ,led_code,closing , case when closing > 0 then closing else 0 end as debit , case when closing < 0 then -closing else 0 end as credit 
from
(
select maingrp,a2.grp_name maingroupname,subgrp,a3.grp_name subgroupname,subgrp2,a4.grp_name subgrouplevel3,led_name,led_code,sum(Obdebit)-sum(Obcredit)+sum(debit)-sum(credit)  closing 
from

 (

 select  led_code, led_name,led_grp_code as grpcode,curbal_comp_code as accref_comp_code,curbal_finid as accref_finid,

curbal_led_code as acctran_led_code,curbal_obdbamt as Obdebit, curbal_obcramt as Obcredit,

0 as debit,0 as credit ,led_type, d.grp_code as maingrp,  c.grp_code as subgrp ,  b.grp_code as subgrp2

from acc_current_balance cb ,acc_ledger_master a ,acc_group_master  b  ,acc_group_master  c ,acc_group_master  d where 
 a.led_grp_code = b.grp_code 
and b.grp_parent_code = c.grp_code 
and c.grp_parent_code = d.grp_code 
and curbal_finid= $finid  and (curbal_obdbamt+curbal_obcramt)>0 and curbal_led_code = led_code
and curbal_comp_code = $compcode

union all 

 select led_code, led_name,led_grp_code as grpcode,accref_comp_code,accref_finid,acctran_led_code,
acctran_dbamt as Obdebit, acctran_cramt as Obcredit,
0 as debit,0 as credit ,led_type, d.grp_code as maingrp,  c.grp_code as subgrp,  b.grp_code as subgrp2
from acc_ref ar ,acc_tran at ,acc_ledger_master a 
,acc_group_master  b  ,acc_group_master  c ,acc_group_master  d  where 
a.led_grp_code = b.grp_code 
and b.grp_parent_code = c.grp_code 
and c.grp_parent_code = d.grp_code 
and accref_comp_code= $compcode and accref_seqno = acctran_accref_seqno and
accref_finid= $finid  and
accref_voudate > '2022-08-31'  and
accref_voudate < '$startdate' and 
acctran_led_code = led_code   

union all 

 select led_code, led_name,led_grp_code as grpcode,accref_comp_code,accref_finid,acctran_led_code,
0 as Obdebit, 0 as Obcredit,
acctran_dbamt as debit,acctran_cramt as credit ,led_type, d.grp_code as maingrp,  c.grp_code as subgrp,  b.grp_code as subgrp2
from acc_ref ar ,acc_tran at ,acc_ledger_master a 
,acc_group_master  b  ,acc_group_master  c ,acc_group_master  d  where 
a.led_grp_code = b.grp_code 
and b.grp_parent_code = c.grp_code 
and c.grp_parent_code = d.grp_code 
and accref_comp_code= $compcode and accref_seqno = acctran_accref_seqno and
accref_finid= $finid  and
accref_voudate > '2022-08-31'  and
accref_voudate>='$startdate' and accref_voudate<='$enddate' and 
acctran_led_code = led_code  
) tt  ,  acc_group_master a2 , acc_group_master a3  , acc_group_master a4  where tt.maingrp = a2.grp_code and tt.subgrp = a3.grp_code  and tt.subgrp2 = a4.grp_code 
group by maingrp,a2.grp_name,subgrp,a3.grp_name,subgrp2,a4.grp_name,led_name,led_code
having closing <> 0 order by maingrp,a2.grp_name,a3.grp_name,a4.grp_name 
) a1 where maingrp not in (8,9,10,11,12)";


*/
 $query1  = "select maingrp, maingroupname,subgrp, subgroupname,subgrp2,subgrouplevel3,cust_name ,cust_code,closing , case when closing > 0 then closing else 0 end as debit , case when closing < 0 then -closing else 0 end as credit 
from
(
select maingrp,a2.grp_name maingroupname,subgrp,a3.grp_name subgroupname,subgrp2,a4.grp_name subgrouplevel3,cust_name,cust_code,sum(Obdebit)-sum(Obcredit)+sum(debit)-sum(credit)  closing 
from

 (

 select  cust_code, cust_name,cust_acc_group as grpcode,curbal_comp_code as accref_comp_code,curbal_finid as accref_finid,

curbal_led_code as acctran_led_code,curbal_obdbamt as Obdebit, curbal_obcramt as Obcredit,

0 as debit,0 as credit ,cust_type, d.grp_code as maingrp,  c.grp_code as subgrp ,  b.grp_code as subgrp2

from acc_current_balance cb ,massal_customer a ,acc_group_master  b  ,acc_group_master  c ,acc_group_master  d where 
 a.cust_acc_group = b.grp_code 
and b.grp_parent_code = c.grp_code 
and c.grp_parent_code = d.grp_code 
and curbal_finid= $finid   and (curbal_obdbamt+curbal_obcramt)>0 and curbal_led_code = cust_code
and curbal_comp_code = $compcode

union all 


 select cust_code, cust_name,cust_acc_group as grpcode,accref_comp_code,accref_finid,acctran_led_code,
0 as Obdebit, 0 as Obcredit,
acctran_dbamt as debit,acctran_cramt as credit ,cust_type, d.grp_code as maingrp,  c.grp_code as subgrp,  b.grp_code as subgrp2
from acc_ref ar ,acc_tran at ,massal_customer a 
,acc_group_master  b  ,acc_group_master  c ,acc_group_master  d  where 
a.cust_acc_group = b.grp_code 
and b.grp_parent_code = c.grp_code 
and c.grp_parent_code = d.grp_code 
and accref_comp_code= $compcode and accref_seqno = acctran_accref_seqno and
accref_finid= $finid   and
accref_voudate>= '$startdate' and accref_voudate<= '$enddate' and 
acctran_led_code = cust_code  
) tt  ,  acc_group_master a2 , acc_group_master a3  , acc_group_master a4  where tt.maingrp = a2.grp_code and tt.subgrp = a3.grp_code  and tt.subgrp2 = a4.grp_code 
group by maingrp,a2.grp_name,subgrp,a3.grp_name,subgrp2,a4.grp_name,cust_name,cust_code
having closing <> 0 order by maingrp,a2.grp_name,a3.grp_name,a4.grp_name 
) a1 where maingrp not in (8,9,10,11,12)";


//echo $query1;


    $result12=mysql_query($query1);

    while ($row = mysql_fetch_assoc($result12)) {
           $ledcode  = $row['cust_code'];
           $debit    = (float)$row['debit'];
           $credit   = (float)$row['credit'];

 //echo $ledcode;
 //echo "</br>"; 

	   if ($debit > 0)
           { 
   $queryupd = "update acc_current_balance set curbal_obdbamt = $debit , curbal_obcramt = 0 where curbal_finid = $nextfinid and curbal_comp_code = $compcode  and curbal_led_code = $ledcode";
         $resultupd =mysql_query($queryupd);
           }     
	   else
           {  
	 $queryupd = "update acc_current_balance set curbal_obdbamt = '0' , curbal_obcramt = '$credit' where curbal_finid = '$nextfinid' and curbal_comp_code = '$compcode'  and curbal_led_code = '$ledcode' and curbal_seqno > 0";
         $resultupd = mysql_query($queryupd);
          }    

//  echo $queryupd;
// echo "</br>"; 

//break;

       
    } 

mysql_free_result($result12);


     if ($resultupd)
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
