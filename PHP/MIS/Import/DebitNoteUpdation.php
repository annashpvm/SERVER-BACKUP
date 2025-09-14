<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
$sno = 1;
$finid    = $_REQUEST['finid'];
$compcode = $_REQUEST['compcode'];
$fromdate = $_REQUEST['fromdate'];
$todate   = $_REQUEST['todate'];
$eno = 1;
$eno2 = '';
//$curmonth = date("m");  
//$curdate = date("d");  
//$vdate = $curmonth . $curdate;

$vdate = date("m");  




    //           $query0 =  "delete from tmp_dncn  where g_seqno > 0 ";     
//               $result0 = mysql_query($query0);




	 $query1 = "select * from acc_ref ref  left outer join acc_tran tran on  tran.acctran_accref_seqno = ref.accref_seqno  left join acc_ledger_master mas on  tran.acctran_led_code = mas.led_code  where  accref_vou_type  in ('DNG','DNN') and  accref_comp_code = '$compcode' and accref_finid = '$finid'  and accref_voudate between '$fromdate' and  '$todate' and accref_seqno  > 45631";  

// echo $query1;


	 $result1 = mysql_query($query1);
	 while ($row = mysql_fetch_assoc($result1)) {
               $seqno   = $row['accref_seqno'];
               $vouno   = $row['accref_vouno'];
               $voutype = $row['accref_vou_type'];


               $ledslno   = $row['acctran_serialno'];
               $voudate = $row['accref_voudate'];
               $voudate2 = strtotime($row['accref_voudate']);
               $ledname = $row['led_name'];
               $billno  = $row['accref_payref_no'];
               $billdate = $row['accref_payref_date'];
               $gstin    = $row['led_gst_no'];
               $eno2 = '0'.$eno;
               $eno2  =  $eno2.substr(-2);  

               $vdate = date('m',$voudate2).date('d',$voudate2).$eno2 ;



               if ($voutype == "CNG" || $voutype == "CNN")
               {  
		       if (substr($row['accref_vouno'],0,1) == "G")
		          $entno    = substr($row['accref_vouno'],2,4);
		       else
		          $entno    = $row['accref_vouno'];
               }
               else
               {
// echo substr($row['accref_vouno'],0,3);
//echo substr($row['accref_vouno'],3,4);
//echo $vdate;
//echo "<br>";
		       if (substr($row['accref_vouno'],0,4) == "DB/G" || substr($row['accref_vouno'],0,4) == "DB/S" ||  substr($row['accref_vouno'],0,3) == "SDN" ||  substr($row['accref_vouno'],0,3) == "DB/")
		          $entno    = $vdate.substr($row['accref_vouno'],4,4);
		       else
		          $entno    = $vdate.substr($row['accref_vouno'],3,4);



               }     


               $entno      = (int) $entno;
echo $entno;

               $ledcode    = trim($row['acctran_led_code']);
               $billamt    = $row['acctran_totamt'];
               $cramt      = $row['acctran_cramt'];
               $dramt      = $row['acctran_dbamt'];

               $purledger  = $row['acctran_led_code'];
               $partycode  = $row['led_custcode'];
               $ledtype    = $row['led_type'];

               if ($partycode === NULL || $partycode === '')
                  $partycode  = 0;

               if ($ledcode === NULL || $ledcode === '')
                  $ledcode  = 0;


               if ($billamt === NULL || $billamt === '')
                  $billamt  = 0;




               $qry2   = "select count(*) recfound from acc_dbcrnote_header where dbcr_accseqno = $seqno";
     
               $query2   = mysql_query("select count(*) recfound from acc_dbcrnote_header where dbcr_accseqno = $seqno");

echo      $qry2;
echo "<br>";
               $findrow  = mysql_fetch_row($query2);

//               $qry   = "select count(*) recfound from acc_dbcrnote_header where dbcr_accseqno = $seqno";


               if ($findrow[0]  == 0)
               { 


	$query3 = "select ifnull(max(dbcr_seqno),0) + 1 as con_value from acc_dbcrnote_header;";
	$result3 = mysql_query($query3);
	$rec3 = mysql_fetch_array($result3);
	$gindbcrseq = $rec3['con_value'];


               $query3 =  "insert into acc_dbcrnote_header (dbcr_seqno, dbcr_comp_code, dbcr_finid, dbcr_type, dbcr_no, dbcr_vouno, dbcr_date, dbcr_partycode, dbcr_partyledcode, dbcr_ledcode, dbcr_value, dbcr_narration, dbcr_party_type, dbcr_output, dbcr_accseqno)  values($gindbcrseq,$compcode , $finid, '$voutype','$entno','$vouno','$voudate',$partycode,$ledcode,0,'$billamt','','$ledtype','N','$seqno')";     

 echo $query3;

               $result3 = mysql_query($query3);



//echo "<br>";

               $query4 =  "insert into acc_dbcrnote_trailer (dbcrt_seqno, dbcrt_inv_no, dbcrt_inv_date, dbcrt_value,dbcrt_tcsvalue)  values($gindbcrseq,'$billno' , '$billdate','$billamt',0)";     
// echo $query4;
               $result4 = mysql_query($query4);
///echo "<br>";

               } 
 
               else
               {
		       if ($ledslno ==2)                
		       { 
		       $query4 =  "update acc_dbcrnote_header set dbcr_ledcode = '$ledcode' where dbcr_accseqno = $seqno";
//	 echo $query4;
		       $result4 = mysql_query($query4);

		       $query4 =  "update acc_dbcrnote_trailer set dbcrt_grossvalue = '$billamt' , dbcrt_taxable = '$billamt' where dbcrt_seqno  = $gindbcrseq";
//	 echo $query4;
		       $result4 = mysql_query($query4);



		       } 


                       else
                       {

 


			   switch($ledcode){
			   case  ($ledcode == "1644" || $ledcode == "1668"    ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_cgstvalue = '$billamt' ,  dbcrt_cgstper = '6' , dbcrt_cgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;

			   case  ($ledcode == "1667"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_cgstvalue = '$billamt' ,  dbcrt_cgstper = '2.5' , dbcrt_cgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;


			   case  ($ledcode == "1674"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_sgstvalue = '$billamt' ,  dbcrt_sgstper = '2.5' , dbcrt_sgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;


			   case  ($ledcode == "1672"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_isgstvalue = '$billamt' ,  dbcrt_igstper = '5' , dbcrt_igstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;


			   case  ($ledcode == "1669"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_cgstvalue = '$billamt' ,  dbcrt_cgstper = '9' , dbcrt_cgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;

			   case  ($ledcode == "1676"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_sgstvalue = '$billamt' ,  dbcrt_sgstper = '9' , dbcrt_sgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;


			   case  ($ledcode == "1671"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_igstvalue = '$billamt' ,  dbcrt_igstper = '18' , dbcrt_igstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;

			   case  ($ledcode == "1666"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_cgstvalue = '$billamt' ,  dbcrt_cgstper = '14' , dbcrt_cgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;

			   case  ($ledcode == "1673"  ) :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_sgstvalue = '$billamt' ,  dbcrt_sgstper = '14' , dbcrt_sgstledcode = $ledcode where dbcrt_seqno = $gindbcrseq";
		               $result5 = mysql_query($query5);
			       break;


			     case  ($ledcode == "1645" ||  $ledcode == "1675") :
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_sgstvalue = '$billamt' ,  dbcrt_sgstper = '6'  , dbcrt_sgstledcode = $ledcode  where dbcrt_seqno = $gindbcrseq";
//echo $query5;
		                $result5 = mysql_query($query5);
				break;

			     case  ($ledcode == "1646"  ||  $ledcode == "1670" ) :
//echo  "loop";  
		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_igstvalue = '$billamt' ,  dbcrt_igstper = '12' , dbcrt_igstledcode = $ledcode  where dbcrt_seqno = $gindbcrseq";
              		       $result5 = mysql_query($query5);
				break;


			     case  ($ledcode == "1859" ) :
echo  "loop";  

		      	       $query5 =  "update acc_dbcrnote_trailer set dbcrt_rounding = '$billamt' where dbcrt_seqno = $gindbcrseq";



		       $result5 = mysql_query($query5);
				break;


                            }



                       }   
                


               }
        
                  
$sno =  $sno+1;
$eno =  $eno+1;
////       echo $query2;
          } 
          mysql_free_result($result1);
?>
