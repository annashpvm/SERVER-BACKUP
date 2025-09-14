 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$drcr = "D";

$voutype = "BKP";

$ginaccrefseq = 0;

$cashamt = 0;

$multihead = 0;
$accseq = 0;
$byto   = "By";

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


$skip = 10;
$ginaccrefseq = 0;

$sno = 0;

$cnnt=0;

$recptno = 0;

if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

             if (++$i > $skip)
             {   


            if ($packData[0] != '')      
            { 
              $colA = $packData[0];
            }

            $colAO =  $colA;
            $colA =  date('Y-m-d', strtotime($colA));



            if ($packData[1] != '')      
            { 
              $colB = $packData[1];
            }

            $colB_Actual = $packData[1];

            $colC = $packData[2];

  

            $ledgercode = 0;
            if ($colC == 'BHOMIAJI UNIQUE PACKAGING PVT LTD')
              $ledgercode = 1623;
            else
              if ($colC == 'SRI RAM PACKAGING')
                 $ledgercode = 428;
            else
              if ($colC == 'SRI KRISHNA PRINT AND PACK')
                 $ledgercode = 407;           
              else
              if ($colC == 'SHRI RAGA PACKAGE (RAGAS)')
                 $ledgercode = 2259;           
              else
              if ($colC == 'GREEN PRINTS AND PACKS (NEW)')
                 $ledgercode = 2371;  
              else
              if ($colC == 'STANDARD FIRE WORKS  P LTD')
                 $ledgercode = 456;
            else
              if ($colC == 'SKY PACKS (TNVL)')
                 $ledgercode = 2353;
            else
              if ($colC == 'C.S PACKAGING  INDUSTRIES')
                 $ledgercode = 2380;           
              else
              if ($colC == 'A J PACKAGING')
                 $ledgercode = 2187;           
              else
              if ($colC == 'HOUSE OF CARTONS (INDIA) PVT LTD')
                 $ledgercode = 148;           
              else
              if ($colC == 'GIN CARTON CO')
                 $ledgercode = 117;  
              else
              if ($colC == 'SIVAGURU MATCH INDUSTRIES (A UNIT OF SMI PVT)')
                 $ledgercode = 2372;
              else
              if ($colC == 'ST.MARYS RUBBER PVT LTD')
                 $ledgercode = 2181;  
              else
              if ($colC == 'VIDHYA  SHREE PAPER TUBE')
                 $ledgercode = 521;

              if ($colC == 'SHREE & SHREE PACKAGERS')
                 $ledgercode = 1881;  
              else
              if ($colC == 'PUGLIA PACKAGING INDUSTRIES')
                 $ledgercode = 280;

              else
              if ($colC == 'DEPARTMENTAL PRODUCTION CENTER')
                 $ledgercode = 2558;  
              else
              if ($colC == 'ATHIRE PACKAING')
                 $ledgercode = 2040;
              else
              if ($colC == 'LITTLE FLOWER NOTEBOOK & PREPARING CENTER')
                 $ledgercode = 1629; 
              else
              if ($colC == 'SUN SHINE PACK')
                 $ledgercode = 2741; 


            $colC = strtoupper(trim($colC));
            $colC = trim(str_replace("'", "", $colC));
            $colC = trim(str_replace(" ", "", $colC));

            $colF_Actual = $packData[5];

           if ($packData[5] != '')      
            { 
              $colF = $packData[5];
            }

            $colG = (int) $packData[6];

            $slno = $colG;


            $colH = floatval($packData[7]);
            $colI = floatval($packData[8]);

            $totamt = $colH + $colI;


            if ($colI > 0)
               $drcr = "D";
            else
               $drcr = "C";




  if ($totamt > 0)
{

//echo   $colF;
//echo "<br>";

//echo $colB;
//echo $colC;

        if  ((trim($colF) == 'Payment'  && trim($colF_Actual) == 'Payment'  ) || (trim($colF) == 'Contra'  && trim($colF_Actual) == 'Contra'  ))
        {
//echo $totamt;
//echo  "<br>";

                $cashamt = $totamt;
                $voutype = "BKP";

                $sno = 0;
		$query1       = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
		$result1      = mysql_query($query1);
		$rec1         = mysql_fetch_array($result1);
		$ginaccrefseq = $rec1['con_value'];


                $query2   = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
                $result2  = mysql_query($query2);
                $rec2     = mysql_fetch_array($result2);
                $ginvouno = $voutype.$rec2['vou_no'];



	 $insert_ref = $pdo->prepare("insert into acc_ref values ( $ginaccrefseq,'$ginvouno',$compcode,'$finid','$colA', '$voutype','', '', '', '$colA','')");

  

		    $insert_ref->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert_ref->execute()) {
			$cnnt=$cnnt+1;
		    }

              


//echo $packData[6];
//echo "<br>"; 
        $ledtype = 'G';
        $ledcode = $pdo->query("select ifnull(max(led_code),0) as  led_code  from acc_ledger_master where  REPLACE(led_name, ' ','') =upper('$colC')")->fetchColumn();

        if ($ledcode == 0)   
           $ledcode = $ledgercode ;


       $ledtype = $pdo->query("select led_type  from acc_ledger_master where REPLACE(led_name, ' ','')  =upper('$colC')")->fetchColumn();


//echo $colC;
//echo "<br>"; 
    if ($colC == '(ASPERDETAILS)')
    {  


           $multihead = 1;
           $cashamt = $totamt;
           $accseq = $ginaccrefseq; 
           $byto   = $colB;
    }  
    
    

    if ($colC != '(ASPERDETAILS)')
    {  


       if ($multihead == 1 &&   $accseq > 0)
       {
        if (trim($byto) == 'By') 
        {

          $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $accseq,'$sno',1653,'0','$cashamt', '$cashamt','$voutype')");

//         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME
//         $insert_tran->bindParam(':columnI', $packData[8]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }
        }  

        if (trim($byto) == 'To') 
        {
          $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $accseq,'$sno',1653,'$cashamt','0', '$cashamt','$voutype')");

         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME
         $insert_tran->bindParam(':columnI', $packData[8]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }
        }  

           $multihead = 0;
           $accseq = 0; 

       }

       $dr = 0;
       $cr = 0;

     
        if ($colB == 'By')
          $dr = $totamt;
        else
          $cr = $totamt;



         $sno = $sno+1;
//	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',$ledcode,'$colI','$colH', '$totamt','$voutype')");

	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',$ledcode,'$dr','$cr', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME
         $insert_tran->bindParam(':columnI', $packData[8]);  //NAME



	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }

        if (trim($colF_Actual) == 'Payment' || trim($colF_Actual) == 'Contra') 
        {
          $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',1653,'0','$totamt', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME
         $insert_tran->bindParam(':columnI', $packData[8]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }
        }  

        if (trim($colF_Actual) == 'Receipt') 
        {
          $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',1653,'$totamt','0', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME
         $insert_tran->bindParam(':columnI', $packData[8]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }
        }  

         if ($ledtype == 'S' || $ledtype == 'C' )
         {
		 $insert_trail = $pdo->prepare("insert into acc_trail values ( $ginaccrefseq,$sno,'$ginvouno','$colA','$totamt',0,'$ledcode','$drcr','0','0' )");
//echo $packData[0];;
//echo "<br>";
		
		 $insert_trail->bindParam(':columnA', $packData[0]);  //NAME
		 if ($insert_trail->execute()) {
		    $cnnt=$cnnt+1;
	 }
         }

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
						<center><legend> Excel Upload - FOR BANK </legend></center>
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

