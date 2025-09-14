<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$sno = 1;
$finid    = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];
$fromdate = $_REQUEST['fromdate'];
$todate   = $_REQUEST['todate'];


               $query0 =  "delete from tmp_gstr2  where g_seqno > 0 ";     
               $result0 = mysql_query($query0);


	 $query1 = "select * from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join acc_ledger_master mas on  tran.acctran_led_code = mas.led_code 
 where  accref_vou_type = 'GJV' and  accref_comp_code = 1 and accref_finid = $finid   and accref_voudate between '$fromdate' and  '$todate' 
 and accref_seqno in (
 select accref_seqno from acc_ref ref  join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno   join acc_ledger_master mas on  tran.acctran_led_code = mas.led_code 
 where  accref_vou_type = 'GJV' and  accref_comp_code = 1 and accref_finid = $finid   and accref_voudate between '$fromdate' and  '$todate ' 
 and led_name like 'INPUT%GST%@%')
 ";  

//echo $query1;


	 $result1 = mysql_query($query1);
	 while ($row = mysql_fetch_assoc($result1)) {
               $seqno   = $row['accref_seqno'];
               $vouno   = $row['accref_vouno'];
               $ledslno   = $row['acctran_serialno'];
               $voudate = $row['accref_voudate'];

               $ledname = $row['led_name'];
               $billno  = $row['accref_payref_no'];
               $billdate = $row['accref_payref_date'];
               $gstin    = $row['led_gst_no'];
               $gstin    = $row['led_gst_no'];
               $ledcode    = $row['acctran_led_code'];
               $billamt    = $row['acctran_totamt'];
               $cramt      = $row['acctran_cramt'];
               $dramt      = $row['acctran_dbamt'];

               $purledger  = $row['acctran_led_code'];
               $ledtype    = $row['led_type'];

               $ledgrpcode    = $row['led_grp_code'];

               $query2   = mysql_query("select count(*) recfound from tmp_gstr2 where g_seqno = $seqno");
               $findrow  = mysql_fetch_row($query2);

               if ($findrow[0]  == 0)
               { 
               $query3 =  "insert into tmp_gstr2 (g_seqno,g_vouno, g_date, g_billamount)  values($seqno,'$vouno','$voudate', '$billamt')";     
// echo $query3;
               $result3 = mysql_query($query3);
               }  


		       if ($ledtype == 'S')                
		       { 
		       $query4 =  "update tmp_gstr2 set g_supplier = '$ledname' , g_billamount  = '$billamt' ,   g_billno =  '$billno' ,   g_billdate = '$billdate' , g_gstin = '$gstin'  where g_seqno = $seqno";
//	 echo $query4;
		       $result4 = mysql_query($query4);
		       } 
                       else
		       if ($ledgrpcode == '46')                
		       { 
           		    switch($ledcode){
	                     	case  ($ledcode == "1667" ||  $ledcode == "1674") :
		      		   $query5 =  "update tmp_gstr2 set g_cgst2_5 = '$billamt' ,  g_sgst2_5 = '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1668" ||  $ledcode == "1675") :
		      		   $query5 =  "update tmp_gstr2 set g_cgst6= '$billamt' ,  g_sgst6 = '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1669" ||  $ledcode == "1676") :
		      		   $query5 =  "update tmp_gstr2 set g_cgst9= '$billamt' ,  g_sgst9 = '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1666" ||  $ledcode == "1673") :
		      		   $query5 =  "update tmp_gstr2 set g_cgst14= '$billamt' ,  g_sgst14 = '$billamt' where g_seqno = $seqno";
//	 echo $query5;
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1672") :
		      		   $query5 =  "update tmp_gstr2 set g_igst5= '$billamt' where g_seqno = $seqno";

		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1671") :
		      		   $query5 =  "update tmp_gstr2 set g_igst18= '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1670") :
		      		   $query5 =  "update tmp_gstr2 set g_igst12= '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "2026") :
		      		   $query5 =  "update tmp_gstr2 set g_cess = '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1757") :
		      		   $query5 =  "update tmp_gstr2 set g_handling= '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1859") :
                                if ($dramt >0)
                                   $query5 =  "update tmp_gstr2 set g_round = '$billamt' where g_seqno = $seqno";
                                else
                                   $query5 =  "update tmp_gstr2 set g_round = '$billamt' * -1 where g_seqno = $seqno";

                                $result5 = mysql_query($query5);
				break;
//IInd updation
                            }

			    switch($ledcode){
				case  ($ledcode == "1666" ||  $ledcode == "1667" ||  $ledcode == "1668" ||  $ledcode == "1669") :
		      		   $query5 =  "update tmp_gstr2 set g_cgst = g_cgst + '$billamt' where g_seqno = $seqno";
                                   $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1673" ||  $ledcode == "1674" ||  $ledcode == "1675" ||  $ledcode == "1676" ) :
		      		   $query5 =  "update tmp_gstr2 set g_sgst = g_sgst + '$billamt'where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				case  ($ledcode == "1670"  ||  $ledcode == "1671"   ||  $ledcode == "1672" ) :
		      		   $query5 =  "update tmp_gstr2 set g_igst= g_igst+ '$billamt' where g_seqno = $seqno";
		       $result5 = mysql_query($query5);
				break;
				
                            }

                       }   
                       else
                       {
		       $query4 =  "update tmp_gstr2 set g_purledger = '$ledcode' , g_purledname =  '$ledname' , g_purvalue  = '$billamt' where g_seqno = $seqno";
	 echo $query4;
		       $result4 = mysql_query($query4);
                       }


        
                  
$sno =  $sno+1;
////       echo $query2;
          } 
          mysql_free_result($result1);
?>
