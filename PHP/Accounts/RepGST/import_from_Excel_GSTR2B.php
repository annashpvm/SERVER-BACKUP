 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

$rmon = $_POST['repmonth'];
$ryr  = $_POST['repyear'];


    if ($rmon == 1 ||  $rmon == 3 || $rmon == 5 || $rmon == 7 || $rmon == 8 || $rmon == 10 || $rmon == 12)
    {   
        $mdays = 31;
    }
    else 
    {
       if ($rmon ==  4 || $rmon == 6 || $rmon == 9 || $rmon == 11 )
       { 
           $mdays = 30;
       }
       else
       { 
          if ($rmon == 2 && $ryr%4 == 0)
          {
              $mdays = 29;
          } 
          else
          {   
              $mdays = 28;
          } 
       }
    } 

$rmonth = substr(("0".$rmon),-2);



$fromdate1 = $ryr.'-'.$rmonth.'-'.'01';
$todate1   = $ryr.'-'.$rmonth.'-'.$mdays;

$date = new DateTime($fromdate1);
$startdate = $date->format('Y-m-d');

$date = new DateTime($todate1);
$enddate = $date->format('Y-m-d');





try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}



$today = date("Y-m-d H:i:s");  

$i =0;
$skip = 6;

$cnnt=0;



 $result0 = mysql_query("call spacc_GSTR_2B($rmonth,$ryr,1,'$startdate','$enddate')");


        $query1 = "delete from GSTR_2B_Excess where gst_2b_month = '$rmon' and gst_2b_year = '$ryr';";
        $result1 = mysql_query($query1);


if (isset($_POST["Import"])) {



  echo $filename=$_FILES["file"]["tmp_name"];


    if ($_FILES["file"]["size"] > 0) {

        $file = fopen($filename, "r");

	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
             if (++$i > $skip)
             {   

            $GstNo = trim($packData[0]);
            $party = $packData[1];
            $invno = $packData[2];

            $invdate = $packData[4];

            $day = substr($packData[4],0,2);
            $mon = substr($packData[4],3,2);
            $yr  = substr($packData[4],6,4);

            $time = $mon.'/'.$day.'/'.$yr;

//$time = strtotime($mon.'/'.$day.'/'.$yr);

$time = strtotime($time );

$newDate = date('Y-m-d',$time);


            $original_invno = $packData[2];

            $billvalue = (float) $packData[5];
            $taxvalue  = (float) $packData[8];

            $igst = (float) $packData[9];
            $cgst = (float) $packData[10];
            $sgst = (float) $packData[11];
            $cess = (float) $packData[12];

            $party = trim(strtoupper(str_replace("'", "", $party)));

/*
            $invno = trim(strtoupper(str_replace("'", "", $invno)));
            $invno = trim(strtoupper(str_replace("-", "", $invno)));
            $invno = trim(strtoupper(str_replace("/", "", $invno)));
            $invno = trim(strtoupper(str_replace(".", "", $invno)));
*/

//        $qry  = "update GSTR_2B set gst_2b_invamt = $billvalue, gst_2b_taxable = $taxvalue , gst_2b_cgstamt = $cgst ,  gst_2b_sgstamt = $sgst , gst_2b_igstamt = $igst, gst_2b_cessamt = $cess where gst_2b_month  = 2 and gst_2b_year = 2025 and cust_gstin = '$GstNo' and billno = '$invno'";

 //          $qry = "select count(*) as nos from GSTR_2B where gst_2b_month  = '$rmon' and gst_2b_year = '$ryr' and cust_gstin = '$GstNo' and  replace(replace(replace(replace(billno,' ','')  ,'.',''),'/','') ,'-','')   = '$invno'";



//echo $qry;
//echo "<br>";


           $count = $pdo->query("select count(*) as nos from GSTR_2B where gst_2b_month  = '$rmon' and gst_2b_year = '$ryr' and cust_gstin = '$GstNo' and  replace(replace(replace(replace(billno,' ','')  ,'.',''),'/','') ,'-','')   = '$invno'")->fetchColumn();



            if ($count == 0) 
            {


           $count2 = $pdo->query("select count(*) as nos from GSTR_2B_Excess where gst_2b_month  = '$rmon' and gst_2b_year = '$ryr' and cust_gstin = '$GstNo' and replace(replace(replace(replace(billno,' ','')  ,'.',''),'/','') ,'-','') = '$invno'")->fetchColumn();

            if ($count2 == 0) 
            {

        $insert = $pdo->prepare("insert into  GSTR_2B_Excess (
gst_2b_month, gst_2b_year, cust_ref, cust_gstin, billno, billdate, gst_2b_invamt, gst_2b_taxable, gst_2b_cgstamt, gst_2b_sgstamt, gst_2b_igstamt, gst_2b_cessamt ) values ('$rmon','$ryr' , '$party','$GstNo','$invno','$newDate',$billvalue, '$taxvalue' ,'$cgst' , '$sgst' , '$igst','$cess')");
		    $insert->bindParam(':columnF', $packData[5]);  //NAME
		    if ($insert->execute()) {
			$cnnt=$cnnt+1;
		    }
             }  


            }  



            {
        $update = $pdo->prepare("update GSTR_2B set gst_2b_invamt = $billvalue, 
gst_2b_taxable = $taxvalue , gst_2b_cgstamt = $cgst ,  gst_2b_sgstamt = $sgst , gst_2b_igstamt = $igst, gst_2b_cessamt = $cess where gst_2b_month  = '$rmon' and gst_2b_year = '$ryr'  and cust_gstin = '$GstNo' and
replace(replace(replace(replace(billno,' ','')  ,'.',''),'/','') ,'-','')   = '$invno'");
		    $update->bindParam(':columnF', $packData[5]);  //NAME
		    if ($update->execute()) {
			$cnnt=$cnnt+1;
		    }
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

?>
