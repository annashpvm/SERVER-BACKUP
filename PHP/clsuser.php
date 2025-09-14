<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='modurl';
    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }

    mysql_query("SET NAMES utf8");
    	switch($task){
	case "loaduser":
	getuser();
	break;
	case "loadcompany":
	getcompany();
	break;
	case "loadfinyear":
	getfinyear();
	break;
	case "loadmodule":
	getmodules();
	break;
	case "loadmoduleNew":
	getmodulesNew();
	break;
	case "modurl":
	getmodurl();
	break;

	case "findLoginName":
	getLoginName();
	break;

	case "findSubjectPassword":
	getSubjectPassword();
	break;

	case "find_Invoice_Number":
	check_Invoice_Number();
	break;

	case "find_Invoice_Number_Detail":
	check_Invoice_Number_Detail();
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
    
   
 function getuser()
    {
//        $r=mysql_query("select userid,username,userrole from usersmaster where useractive='Y'");

        $r=mysql_query("select usr_code as userid,usr_name as username,usr_type as userrole from mas_users where usr_code  in (3,6,7,13,15,17)");
        $r=mysql_query("select usr_code as userid,usr_name as username,usr_type as userrole from mas_users where usr_code  in (6)");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }
	
	
 function getcompany()
    {
//    $r=mysql_query("select company_code as companycode,company_name as companyname from company_master");
  
      $r=mysql_query("select company_code as companycode,company_name as companyname from mas_company where company_code in (1,90)");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getfinyear()
    {
//        $r=mysql_query("select fin_id,fin_year from fin_master where fin_flag='Y'");
        $r=mysql_query("select fin_code,fin_year from mas_finyear where fin_code >= 22");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getmodules()
    {
        $r=mysql_query("select * from modulelist where modactive='Y'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getmodulesNew()
    {
	$modulelst = $_POST['modulelist'];

        $r=mysql_query("select * from modulelist where modactive='Y' and modseqno in $modulelst");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getmodurl()
    {
	$modulename = $_POST['modulename'];
	$user = $_POST['moduser'];
        $r=mysql_query("select modurl,modflag from modulelist where modname='$modulename'");
        $r=mysql_query("select modurl from modulelist where modname='$modulename'");

	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


 function getLoginName()
    {

	$loginname = $_POST['loginname'];
        $r=mysql_query("select * from userMaster where usr_login = '$loginname'");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function getSubjectPassword()
    {
        mysql_query("SET NAMES utf8");
	$dept     = $_POST['dept'];
	$subject  = $_POST['subject'];

        $r=mysql_query(" select count(*) as nos , pw_password  from mas_password where pw_dept = '$dept' and pw_subject = '$subject'");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function check_Invoice_Number()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$ledcode  = $_POST['ledcode'];
	$billno   = $_POST['billno'];


        $r=mysql_query(" select count(*) as no_of_rec  from acc_ref, acc_trail where acctrail_led_code = $ledcode and acctrail_inv_no = '$billno' and accref_comp_code = $compcode and accref_finid  = $fincode and accref_seqno  = acctrail_accref_seqno  ");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }

 function check_Invoice_Number_Detail()
    {
        mysql_query("SET NAMES utf8");
	$compcode = $_POST['compcode'];
	$fincode  = $_POST['fincode'];
	$ledcode  = $_POST['ledcode'];
	$billno   = $_POST['billno'];


        $r=mysql_query(" select * from acc_ref, acc_trail where acctrail_led_code = $ledcode and acctrail_inv_no = '$billno' and accref_comp_code = $compcode and accref_finid  = $fincode and accref_seqno  = acctrail_accref_seqno  ");



	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
    }


?>
