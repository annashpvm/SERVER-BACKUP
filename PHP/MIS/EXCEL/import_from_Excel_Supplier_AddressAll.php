 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


$today = date("Y-m-d H:i:s");  

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {

            $colA = $packData[0];  // NAME
            $colB = $packData[1];  // ADDRE 1
            $colC = $packData[2];  // ADDRE 2
            $colD = $packData[3]; // ADDRE 3
            $colE = $packData[4];    // ADDRE 4
            $colF = $packData[5];    // EMAIL - 1
            $colG = $packData[6];    // STATE
            $colH = $packData[7];    // PIN
            $colI = $packData[8];    // PAN
            $colJ = $packData[9];    // GST
            $colK = $packData[10];    // COUNTRY 
            $colL = $packData[11];    // PHONE 1
            $colM = $packData[12];    // CONTACT
            $colN = $packData[13];    // PHONE 1


            $colA1 =  substr($colA,0,10);

            $colA_Actual = $colA;  
            $colB_Actual = $colB;  

            $colA = trim(str_replace(" ", "", $colA));

            $colA = trim(str_replace("'", "", $colA));
            $colB = trim(str_replace("'", "", $colB));
            $colC = trim(str_replace("'", "", $colC));
            $colD = trim(str_replace("'", "", $colD));
            $colE = trim(str_replace("'", "", $colE));

            $colG = trim(str_replace(" ", "", $colG));



            $name = trim(strtoupper($colA));
            $addr1 = trim(strtoupper( $colB));
            $addr2 = trim(strtoupper($colC));
            $addr3 = trim(strtoupper($colD));
            $addr4 = trim(strtoupper($colE));

            $state = trim(strtoupper($colG));

            $pin  = trim(strtoupper($colH));
            $panno = trim(strtoupper($colI));
            $gst = trim(strtoupper($colJ));

            $email = trim(strtoupper($colF));
            $country = trim(strtoupper($colK));
            $phone = trim(strtoupper($colL));
            $contact = trim(strtoupper($colM));
            $phone2 = trim(strtoupper($colN));



           if ($phone == '')
           {
              $phone = $phone2;
           }

           $countrycode = 2;



            $grp =0;
//echo $colA;

           if ($name != '')
           {
           $supcode    = 0;
           $ledcode    = 0;

           $statecode  = 0;
           $suptype    = 1;  


      $statecode = $pdo->query("select  state_code from mas_state where REPLACE(state_name, ' ','') = '$state'")->fetchColumn();


           if ($statecode == 24)
           {    
               $suptype    = 1;  
           }      
           else
           {
               $suptype    = 2;
           }   
  
//echo $country; 
           if ($country == 'INDIA')
           {
              $countrycode = 1;
           }
           else
           {
               $suptype  = 3;
               $statecode  = 0;
           }     
           if ($statecode == 0)
               $statecode  = 0;
 

           $supcode  = $pdo->query("select ifnull(max(convert(cust_code,signed)),0) +0 as cust_code  from massal_customer where  length(cust_add1) < 6 and cust_type = 'S' and REPLACE(cust_name, ' ','')   = '$name'")->fetchColumn();

//           $qry  = ("select ifnull(max(convert(cust_code,signed)),0) +0 as cust_code  from massal_customer where  length(cust_add1) < 6 and cust_type = 'S' and REPLACE(cust_name, ' ','')   = '$name'");



        if ($supcode > 0)
        {
/*
$qry  = "update massal_customer set
cust_add1 = '$addr1',cust_add2 = '$addr2',cust_add3 = '$addr3', cust_city_city = '$addr4',cust_zip =  '$pin',cust_phone =  '$phone',cust_email =  '$email',cust_panno =  '$panno',cust_country =  '$countrycode', cust_gstin = '$gst',cust_state = $statecode   where cust_code = $supcode";

echo $qry;
echo "<br>";
*/
        $insert = $pdo->prepare("update massal_customer set
cust_add1 = '$addr1',cust_add2 = '$addr2',cust_add3 = '$addr3', cust_city = '$addr4',cust_zip =  '$pin',cust_phone =  '$phone',cust_email =  '$email',cust_panno =  '$panno',cust_country =  '$countrycode', cust_gstin = '$gst',cust_state = $statecode   where cust_code = $supcode");
            $insert->bindParam(':columnA', $packData[0]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }
         }



            }  
        }
        } 


	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';
	}
        else
        {
   	    echo '<script type="text/javascript">
              alert("Data Alreaday Available");
              </script>';
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
						<center><legend>Excel Upload</legend></center>
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

