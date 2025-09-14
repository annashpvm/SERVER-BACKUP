

<?php


        require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
/*

    function JEncode($arr){
        $data = json_encode($arr);    //encode the data in json format
        echo $data;
    }
    


        mysql_query("SET NAMES utf8");
        $r=mysql_query("select  tr_entno,tr_date,var_name as varname,var_code as sizecode,tr_srno as stksrno,tr_wt as stkwt,fc.cust_ref as OldPartyName,fc.cust_code as OldPartyCode, tr_so_from as oldsono,tc.cust_ref as NewPartyName,tc.cust_code as NewPartyCode, tr_so_to as newsono from trnsal_stock_transfer a , massal_customer fc, massal_customer tc, massal_variety where tr_party_from = fc.cust_code and tr_party_to =  tc.cust_code and tr_sizecode = var_code  and tr_finyear= 22  and tr_compcode= 90 and tr_entno = 2");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
           echo $re['tr_entno'];  
           echo "<br />";
           echo $re['sizecode'];  
           echo "<br />";
        }
        $data = json_encode($arr);    //encode the data in json format
        echo $data;

//		$jsonresult = JEncode($arr);
//		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';




//$myObj->name = "John";
//$myObj->age = 30;
//$myObj->city = "New York";

//$myJSON = json_encode($myObj);

//echo $myJSON;

*/
$myfile = fopen("D:/query1.txt", "a") or die("Unable to open location for log file !");
$txt = "Log details goes here ...";
fwrite($myfile, $txt);
fclose($myfile);
?>
