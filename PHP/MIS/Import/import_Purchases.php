 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");


$compcode = 1;
$finid = 23;

$ledcode = 0;
$ledtype = 'G';

$drcr = "D";

$voutype = "PUR";

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



$ginaccrefseq = 0;

$sno = 0;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
            if ($packData[0] != '')      
            { 
              $colA = $packData[0];
            }

           $colA =  date('Y-m-d', strtotime($colA));

            if ($packData[1] != '')      // ledger Name 
            { 
              $colB = $packData[1];
            }
            
            $colB = strtoupper(trim($colB));
            $colB = trim(str_replace("'", "", $colB));
            $colB = trim(str_replace(" ", "", $colB));

    


            $colE_Actual = $packData[4];

           if ($packData[4] != '')      
            { 
              $colE = $packData[4];
            }

      //      $colF_Actual = $packData[5];

           if ($packData[5] != '')      
            { 
              $colF = $packData[5];
            }

         
//            $colF = substr($packData[6],0,19);
            $colF = substr($colF,0,19);
            $colG = floatval($packData[6]);
            $colH = floatval($packData[7]);

            $totamt = $colG + $colH;


            if ($colG > 0)
               $drcr = "D";
            else
               $drcr = "C";

//echo   $colB;
//echo "<br>";

//echo $colB;
//echo $colC;

        if  (trim($colE) == 'Purchase'  && trim($colE_Actual) == 'Purchase' ) 
        {

                $cashamt = $totamt;
 

                $sno = 0;
		$query1       = "select ifnull(max(accref_seqno),0) + 1 as con_value from acc_ref;";
		$result1      = mysql_query($query1);
		$rec1         = mysql_fetch_array($result1);
		$ginaccrefseq = $rec1['con_value'];


                $query2   = "select ifnull(max(convert(substring(accref_vouno,4),signed)),0) +1 as vou_no from acc_ref where accref_vou_type = '$voutype' and accref_finid = '$finid' and accref_comp_code = '$compcode';";
                $result2  = mysql_query($query2);
                $rec2     = mysql_fetch_array($result2);
                $ginvouno = $voutype.$rec2['vou_no'];



	 $insert_ref = $pdo->prepare("insert into acc_ref values ( $ginaccrefseq,'$ginvouno',$compcode,'$finid','$colA', '$voutype','', '', '$colF', '$colA','',0)");

  

		    $insert_ref->bindParam(':columnA', $packData[0]);  //NAME
		    if ($insert_ref->execute()) {
			$cnnt=$cnnt+1;
		    }
        } 
              

//echo $packData[6];
//echo "<br>"; 
        $ledcode = 0;
        $ledtype = 'G';
        $ledcode = $pdo->query("select ifnull(max(cust_code),0) as  led_code  from massal_customer where REPLACE(cust_name, ' ','')  =upper('$colB')")->fetchColumn();

       $ledtype = $pdo->query("select cust_type  from massal_customer where REPLACE(cust_name, ' ','')  =upper('$colB')")->fetchColumn();


//echo $ledtype;
//echo "<br>"; 



         $sno = $sno+1;
	 $insert_tran = $pdo->prepare("insert into acc_tran values ( $ginaccrefseq,'$sno',$ledcode,'$colG','$colH', '$totamt','$voutype')");

         $insert_tran->bindParam(':columnG', $packData[6]);  //NAME
         $insert_tran->bindParam(':columnH', $packData[7]);  //NAME

	 if ($insert_tran->execute()) {
	     $cnnt=$cnnt+1;
         }


         if ($ledtype == 'S' || $ledtype == 'C' )
         {
	 $insert_trail = $pdo->prepare("insert into acc_trail values ( $ginaccrefseq,$sno,'$colF','$colA','$totamt',0,'$ledcode','$drcr','0','0' )");

	 $insert_trail->bindParam(':columnA', $packData[0]);  //NAME
	 if ($insert_trail->execute()) {
	    $cnnt=$cnnt+1;
	 }
         }

        } 

	$vno=$vno+1;

	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("PURCHASE RECORDS - successfully uploaded");
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
						<center><legend> Excel Upload - FOR ALL PURCHASE </legend></center>
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

