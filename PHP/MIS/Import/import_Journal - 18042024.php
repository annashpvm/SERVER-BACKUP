 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$voutype = "GJV";

$drcr = "D";

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}



$ginaccrefseq = 0;

$sno = 0;

$skip = 8;

$chkinv =0 ;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
        $file2 = fopen($filename, "r");
	$cnnt=0;

        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {


             if (++$i > $skip)
             {   

            if ($packData[0] != 'Total:')
             
           {   
   
            if ($packData[0] != '')      
            { 
              $colA = $packData[0];

 
           }
           $colA_Actual = $packData[0];



           $colA =  date('Y-m-d', strtotime($colA));
           $ginvoudate = $colA;

            if ($packData[1] != '')      
            { 
              $colB = $packData[1];
            }

           $colB_Actual = $packData[1];

            $ledgercode = 0;
            if ($colB == 'BHOMIAJI UNIQUE PACKAGING PVT LTD')
              $ledgercode = 1623;
            else
              if ($colB == 'SRI RAM PACKAGING')
                 $ledgercode = 428;
            else
              if ($colB == 'SRI KRISHNA PRINT AND PACK')
                 $ledgercode = 407;           
              else
              if ($colB == 'SHRI RAGA PACKAGE (RAGAS)')
                 $ledgercode = 2259;           
              else
              if ($colB == 'GREEN PRINTS AND PACKS (NEW)')
                 $ledgercode = 2371;  
              else
              if ($colB == 'STANDARD FIRE WORKS  P LTD')
                 $ledgercode = 456;
            else
              if ($colB == 'SKY PACKS (TNVL)')
                 $ledgercode = 2353;
            else
              if ($colB == 'C.S PACKAGING  INDUSTRIES')
                 $ledgercode = 2380;           
              else
              if ($colB == 'A J PACKAGING')
                 $ledgercode = 2187;           
              else
              if ($colB == 'HOUSE OF CARTONS (INDIA) PVT LTD')
                 $ledgercode = 148;           
              else
              if ($colB == 'GIN CARTON CO')
                 $ledgercode = 117;  
              else
              if ($colB == 'SIVAGURU MATCH INDUSTRIES (A UNIT OF SMI PVT)')
                 $ledgercode = 2372;
              else
              if ($colB == 'ST.MARYS RUBBER PVT LTD')
                 $ledgercode = 2181;  
              else
              if ($colB == 'VIDHYA  SHREE PAPER TUBE')
                 $ledgercode = 521;

              if ($colB == 'SHREE & SHREE PACKAGERS')
                 $ledgercode = 1881;  
              else
              if ($colB == 'PUGLIA PACKAGING INDUSTRIES')
                 $ledgercode = 280;

              else
              if ($colB == 'DEPARTMENTAL PRODUCTION CENTER')
                 $ledgercode = 2558;  
              else
              if ($colB == 'ATHIRE PACKAING')
                 $ledgercode = 2040;
              else
              if ($colB == 'LITTLE FLOWER NOTEBOOK & PREPARING CENTER')
                 $ledgercode = 1629;  
              else
              if ($colB == 'SUN SHINE PACK')
                 $ledgercode = 2741; 
              else
              if ($colB == 'S.J PAPERS AND BOARDS')
                 $ledgercode = 2738; 


            $colB = strtoupper(trim($colB));
            $colB = trim(str_replace("'", "", $colB));
            $colB = trim(str_replace(" ", "", $colB));



           if ($packData[9] != '')      // JOUNAL
            { 
              $colJ = $packData[9];
            }

            $colJ_Actual = $packData[9];

           if ($packData[10] != '')      // VOUCHER NUMBER   
            { 
              $colK = $packData[10];
            }

            $colK_Actual = $packData[10];


           $colC = ''; 
           if ($packData[2] != '')      // INVOICE NUMBER   
            { 
              $colC = $packData[2];
            }


           $colE = 0; 
           if ($packData[4] != '')      //  JOURNAL ADJ AMOUNT  
            { 
              $colE = $packData[4];
            }






            $colL = floatval($packData[11]);
            $colM = floatval($packData[12]);

            $totamt = $colL + $colM;
//echo $totamt;
//echo "<br>"; 


            $voutype = "GJV";


            if ($colL > 0)
               $drcr = "D";
            else
               $drcr = "C";



//echo   $colJ;
//echo "<br>"; 
//echo $colB;
//echo $colC;


//		$query1 = "select count(*) as nos from acc_ref where accref_comp_code = $compcode  and accref_finid =23 and accref_vouno = '$colK_Actual'";


$recfound = 0;
  if ($colJ_Actual != '')
  { 
		$query1 = "select count(*) as nos from tmp_import_cndn_purchase where compcode = $compcode  and fincode = 23 and voutype = '$colJ_Actual' and party = '$colB_Actual' and voudate = '$colA' and amount = '$totamt'";

//echo $query1;
//echo "<br>"; 

		$result1  = mysql_query($query1);
		$rec1     = mysql_fetch_array($result1);
		$recfound = $rec1['nos'];

//echo $recfound;
//echo "<br>"; 

   } 
        
        if ($recfound == 0 && $totamt > 0 )     
        { 


//echo  $recfound;
//echo $colJ;
		
        if ($colJ == 'Journal'   && trim($colJ_Actual) == 'Journal'  ) 
        {
                $sno = 0;
		$query1       = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
		$result1      = mysql_query($query1);
		$rec1         = mysql_fetch_array($result1);
		$ginaccrefseq = $rec1['con_value'];

// For voucher Number
                $query2   = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = 'GJV' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
                $result2  = mysql_query($query2);
                $rec2     = mysql_fetch_array($result2);
                $ginvouno = "GJV".$rec2['vou_no'];

 



//echo $ginvouno;
//echo "<br>"; 

	 $insert_ref = $pdo->prepare("insert into acc_ref values ( $ginaccrefseq,'$ginvouno',$compcode,'$finid','$colA', '$voutype','', '', '', '$colA','',0)");

 

		    $insert_ref->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert_ref->execute()) {
			$cnnt=$cnnt+1;
		    }
        } 





		$ginadjseqno   = 0;
		$ginvoudate    = $colA;             
                $ginpayterms   = 0;

//echo $colC;
//echo "<br>"; 

        if ($colC != '' )
        {  
//		$query12       = "select * from acc_trail where acctrail_inv_no = '$colC' ";
		$query12       = "select * from acc_trail , acc_ref where accref_comp_code = $compcode  and accref_finid =23 and accref_seqno = acctrail_accref_seqno and  acctrail_inv_no = '$colC'";


//echo $query12;
//echo "<br>"; 

		$result12      = mysql_query($query12);
		$rec12         = mysql_fetch_array($result12);
		$ginadjseqno   = $rec12['acctrail_accref_seqno'];
		$gininvno      = $rec12['acctrail_inv_no'];
		$gininvdate    = $rec12['acctrail_inv_date'];
		$ginpayterms   = $rec12['acctrail_crdays'];
		$ginadjvouno   = $rec12['accref_vouno'];  
		$ginledcode    = $rec12['acctrail_led_code'];  
  

		$query12       = "update acc_ref set accref_payref_no = '$colC' , accref_payref_date = '$ginvoudate'  where accref_seqno = '$ginaccrefseq' and accref_vouno = '$ginvouno' ";
		$result12      = mysql_query($query12);


		$query13       = "update acc_trail set acctrail_inv_no  = '$colC' , acctrail_inv_date = '$ginvoudate', acctrail_adj_value = acctrail_adj_value + $colE  where acctrail_accref_seqno = '$ginadjseqno'";
//		$result13      = mysql_query($query13);

//echo $query13;
//echo "<br>"; 

       $query = "select ifnull(max(ref_slno),0) as refslno from acc_adjustments";
       $result = mysql_query($query);
       $rec = mysql_fetch_array($result);
       $ginrefslno = $rec['refslno'];

        $ginrefslno = $ginrefslno + 1;
//echo $ginrefslno;
//echo "<br>";

	$querydate = "select datediff('$ginvoudate','$gininvdate') as daysin";
	$resultdate = mysql_query($querydate);
	$recdatenew = mysql_fetch_array($resultdate);
	$adjdays=$recdatenew['daysin'];

//echo $adjdays;
//echo "<br>";
$query10 = "insert into acc_adjustments (ref_slno, ref_compcode, ref_finid, ref_docseqno, ref_docno, ref_docdate, ref_adjseqno, ref_adjvouno, ref_invno, ref_invdate, ref_adjamount, ref_adj_days, ref_adj_by, ref_adjusted_on,ref_paymt_terms,ref_ledcode,ref_adjvoutype) values ('$ginrefslno','$compcode','$finid','$ginaccrefseq','$ginvouno', '$ginvoudate', '$ginadjseqno','$ginadjvouno','$gininvno','$gininvdate','$colE',$adjdays,'JV',curdate(),$ginpayterms,$ginledcode,'$voutype' );";

$result10 = mysql_query($query10);
//echo $query10;
//echo "<br>";


         }   




//echo ' LOOP ' + $totamt;
//echo "<br>"; 
        $ledcode = 0;
        $ledtype = 'G';
        $ledcode = $pdo->query("select ifnull(max(led_code),0) as  led_code  from acc_ledger_master where REPLACE(led_name, ' ','')  =upper('$colB')")->fetchColumn();

        if ($ledcode == 0)   
           $ledcode = $ledgercode ;

       $ledtype = $pdo->query("select led_type  from acc_ledger_master where REPLACE(led_name, ' ','')  =upper('$colB')")->fetchColumn();


//echo $ledtype;
//echo "<br>"; 

if ($totamt > 0)
{

         $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',$ledcode,'$colL','$colM', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnL', $packData[11]);  //NAME
         $insert_tran->bindParam(':columnM', $packData[12]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }


         if ($ledtype == 'S' || $ledtype == 'C' )
         {
	 $insert_trail = $pdo->prepare("insert into acc_trail values ( $ginaccrefseq,$sno,'$ginvouno','$colA','$totamt','$totamt','$ledcode','$drcr','0' ,'0')");

	 $insert_trail->bindParam(':columnA', $packData[0]);  //NAME
	 if ($insert_trail->execute()) {
	    $cnnt=$cnnt+1;
	 }
         }




}
}
}
// end
}
        }   // while end


   fclose($packData);





//for updating  --  tmp_import_cndn_purchase 
        $i = 0;  

 
        while (($packData2 = fgetcsv($file2, 10000, ",")) !== FALSE) {


             if (++$i > $skip)
             {   

            if ($packData2[0] != 'Total:')
            
           {   
   

            if ($packData2[0] != '')      
            { 
              $colA = $packData2[0];
            }

           $colA_Actual = $packData2[0];

           $colA =  date('Y-m-d', strtotime($colA));
           $ginvoudate = $colA;
            if ($packData2[1] != '')      
            { 
              $colB = $packData2[1];
            }

           if ($packData2[9] != '')      // Journal WORD
            { 
              $colJ = $packData2[9];
            }

            $colJ_Actual = $packData2[9];

           if ($packData2[10] != '')      // VOUCHER NUMBER   
            { 
              $colK = $packData2[10];
            }

            $colK_Actual = $packData2[10];
           $colC = ''; 
           if ($packData2[2] != '')      // INVOICE NUMBER   
            { 
              $colC = $packData2[2];
            }
           $colE = 0; 
           if ($packData2[4] != '')      //  Journal AMOUNT  
            { 
              $colE = $packData2[4];
            }






            $colL = floatval($packData2[11]);
            $colM = floatval($packData2[12]);

            $totamt = $colL + $colM;
//echo $totamt;
//echo "<br>"; 




            if ($colL > 0)
               $drcr = "D";
            else
               $drcr = "C";

//echo $colK_Actual;
//echo "<br>"; 



            if ( $colA_Actual != '')
            {  
		$query1 = "select count(*) as nos from tmp_import_cndn_purchase where compcode = $compcode  and fincode = 23 and voutype = '$colJ' and party = '$colB' and voudate = '$colA' and amount = '$totamt'";
//echo $query1;
//echo "<br>"; 


		$result1  = mysql_query($query1);
		$rec1     = mysql_fetch_array($result1);
		$recfound = $rec1['nos'];
                if ($recfound == 0)     
                { 
	$query123  = "insert into tmp_import_cndn_purchase (compcode, fincode, voutype, vouno, voudate, party, amount) value($compcode,$finid,'$colJ','$colK_Actual','$colA','$colB',$totamt)";
	$result123 = mysql_query($query123);
                } 
             }

       }

       }    


      }



	$vno=$vno+1;

	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';
	}
        else
        {
  	    echo '<script type="text/javascript">
              alert("DATA May be already uploaded");
              </script>';

        }   


    }
}




?>
<html>
    <head>
       	<link rel="stylesheet" type="text/css" href="/DOMAIN/excel/styles1.css" />
    </head>
</html>
<div class="content-wrapper">
    <section class="content container-fluid">
        <div class="container">
		<div class="row">
			<div class="span3 hidden-phone"></div>
			<div class="span6" id="form-login">
				<form class="form-horizontal well"  action="" method="POST" name="upload_excel" enctype="multipart/form-data">
					<fieldset>
						<center><legend>Excel Upload  - JOURNALS </legend></center>
						<div class="control-group">
							<div class="controls">
								<label>CSV File Only:</label><input type="file" name="file" id="file" class="input-large">
							</div>
						</div>
						<br>
						<div class="control-group">
							<div class="controls">
							<button type="submit" id="submit" name="Import" class="btn btn-primary button-loading" data-loading-text="Loading...">Upload </button></br>
							</div>
						</div>
					

					</fieldset>
				</form>
			</div>
		</div>
		
    </section>
</div>

