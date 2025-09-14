	<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");



    $task='loadRollNo';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
        mysql_query("SET NAMES utf8");
    switch($task){
		
	    	case "loadRollNo":
                getRollNo();
		 break;	
	    	case "loadReelNo":
		    getReelNo();
         	break;
                case "loadReelNo_WeightChange":
		    getReelNo_WeightChange();
         	break;
 		case "loadWeight":
		    getReelWeight();
         	break;
	        default:
        	    echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	    break;
    }
    
    function JEncode($arr){
        if (version_compare(PHP_VERSION,"5.2","<"))
        {    
            require_once("./JSON.php");   //if php<5.2 need JSON class
            $json = new Services_JSON();  //instantiate new json object
            $data=$json->encode($arr);    //encode the data in json format
        } else
        {
            $data = json_encode($arr);    //encode the data in json format
        }
        return $data;
    }
    
   


 function getRollNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
         $rdate    = $_POST['rdate'];
        $stk_rollno      = $_POST['stk_rollno']; 
        $yr       = $_POST['yr']; 


    $r=mysql_query("select stk_rollno from trnsal_finish_stock where stk_ent_date='$rdate' and stk_destag='' group by  stk_rollno order by  stk_rollno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   

function getReelNo()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];
        $rollno      = $_POST['rollno']; 
        $yr       = $_POST['yr']; 


	$r=mysql_query("select stk_sr_no as reelno from trnsal_finish_stock where stk_ent_date= '$rdate' and stk_destag='' and stk_rollno = $rollno order by reelno ");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   

function getReelNo_WeightChange()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];
    // $newwt  =$_POST['newwt'];
        $yr       = $_POST['yr']; 


	//$r=mysql_query("select stk_sr_no as reelno from trnsal_reelweight_change where ent_date= '$rdate' and stk_destag=''  order by reelno ");
$r=mysql_query("select srno as reelno from trnsal_reelweight_change where ent_date= '$rdate' order by reelno desc");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   

function getReelWeight()
    {
        mysql_query("SET NAMES utf8");
	$finid    = $_POST['finid'];
	$compcode = $_POST['compcode'];
        $rdate    = $_POST['rdate'];       
        $reelno   = $_POST['reelno']; 
        $r= mysql_query("select  srno ,newweight from trnsal_reelweight_change where ent_date= '$rdate' and srno = $reelno");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }   


 


 



?>

