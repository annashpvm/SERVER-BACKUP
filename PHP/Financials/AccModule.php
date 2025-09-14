<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();
    mysql_query("SET NAMES utf8");

$task='';
  if (isset($_POST['task'])){
    $task = $_POST['task']; 
    // Get this from Ext
    }
        switch($task){
        case "USER":              // Give the entire list
          getUser();
          break;
        case "YEAR":
          getFinyear();
          break;
	case "COMP":
	  getComp();
	  break;
	case "GROUP":
	  getgroup();
	  break;
	case "VEND":
	  getvendor();
	  break;
	case "CASH":
	  getaccname();
	  break;
	case "BANK":
	  getbankaccname();
	  break;
	case "GRP":
	  getgrpname();
	  break;
	case "LED":
	  getledname();
	  break;
	case "CURRENCY":
	  getcurrency();
	  break;
	case "BANKNAME":
	  getbankname();
	  break;
	case "COUNTRY":
	  getcountry();
	  break;
	case "BankDetails":
	  getbankmaster();
	  break;
	case "leddet":
	  getleddet();
	  break;
	case "VOUNO":
	  getvouno();
	  break;
	case "VouDetails":
	 getvoudet();
	 break;
	case "OUTGRP":
	 getoutgrp();
	 break;
	case "CDGRP":
	 getcdgroup();
	 break;
	case "REGGRP":
	 getreggroup();
	 break;
	case "REGACC":
	 getregaccname();
	 break;
	case "REGREFNO":
	 getregrefno();
	 break;
	case "REGREFDET":
	 getregrefdet();
	 break;
	case "LEDCODE":
	 getledcode();
	 break;
	case "ledet":
	 getoutled();
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

function getUser()
{
	$IP="10.0.2.15";
        //$IP = $_SERVER['REMOTE_ADDR'];
	//$result=mysql_query("CALL generalspselusersgroupip('".$IP."')");
	//$nbrows = mysql_num_rows($result);
	//if($nbrows>0)
	//{
	//	$LocalAddress="Y";
	//}
	//else
	//{
		$LocalAddress="N";
	//}
        
        $res=mysql_query("CALL generalspseluseripaddress('".$IP."','".$LocalAddress."')");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}


function getFinyear()
{
	$r=mysql_query("CALL general_sp_mas_finmaster()");
	$nrow = mysql_num_rows($r);
	while($re = mysql_fetch_array($r))
	{
	$arr[]= $re ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nrow.'","results":'.$jsonresult.'})';
}

function getComp()
{
	$res=mysql_query("CALL general_sp_mas_selcompany1()");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}


function getgroup()
{
	$res=mysql_query("select distinct grp_code,grp_name from acc_group_master where grp_comp_code in (1)");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getvendor()
{
	$res=mysql_query("CALL stores_sp_mas_selvendor_master(1)");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getaccname()
{
	$res=mysql_query("select * from acc_ledger_master where led_grp_code =26 and led_comp_code=1");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getbankaccname()
{
	$res=mysql_query("select * from acc_ledger_master where led_grp_code in (20,21,22,23,24,25,91,92,93,94,95,96,102,182) and led_comp_code=1");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getgrpname()
{
	$res=mysql_query("CALL acc_sp_mas_selgroup_master(1)");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getledname()
{
	$res=mysql_query("CALL acc_sp_mas_selledger_master(1)");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getcurrency()
{
	$res=mysql_query("CALL general_sp_mas_selcurrencymaster");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getbankname()
{
	$res=mysql_query("CALL acc_sp_mas_selbank_master");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getcountry()
{
	$res=mysql_query("select country_code,country_name from mas_country");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getbankmaster()
{
	$bankseq=$_POST['ginbank'];
	$res=mysql_query("CALL acc_sp_selbank_master(".$bankseq.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getleddet()
{
	$comp="1";
	$ledname=$_POST['gstled'];
	$res=mysql_query("CALL acc_sp_mas_selledgername_match(".$comp.",".$ledname.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getvouno()
{
	$res=mysql_query("CALL general_sp_mas_selcontrolmaster('AC','2013-2014','EXV','EXPENCE VOUCHER NO',1)");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getvoudet()
{
	$vouseq=$_POST['ginvou'];
	$res=mysql_query("CALL acc_sp_trn_selacc_ref(".$vouseq.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getoutgrp()
{
	$res=mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code in (1) and grp_code in (134,136,137,138,140)");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getcdgroup()
{
	$res=mysql_query("select grp_code,grp_name from acc_group_master where grp_comp_code=1 and grp_name like 'trade%'");
        $nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
	}
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getreggroup()
{
	$comp=1;
	$res=mysql_query("CALL acc_sp_selregiongroup(".$comp.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getregaccname()
{
	$res=mysql_query("select led_code,led_name from acc_ledger_master where led_comp_code=1 and led_duplicate='N' and led_status='Y'");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getregrefno()
{
	$comp=1;
	$fin=20;
	$grp=$_POST['gingrp'];
//	$grp=134;
	$res=mysql_query("CALL acc_sp_selregionalreceiptno(".$grp.",".$fin.",".$comp.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getregrefdet()
{
	$refno=$_POST['ginrefno'];
	$res=mysql_query("CALL acc_sp_selregionalreceiptdetail(".$refno.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getledcode()
{
	$res=mysql_query("CALL general_sp_mas_selcontrolmaster('AC','GENERAL','LMS','ACC_LEDGER_MASTER',1)");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}

function getoutled()
{
	$comp=1;
	$grp=$_POST['grpcode'];
	$dt=$_POST['dt'];
	$ds=$_POST['ds'];
	$res=mysql_query("CALL acc_sp_rep_selreceiptledgerabovegivendays(".$comp.",".$grp.",".$dt.",".$ds.")");
	$nbrow = mysql_num_rows($res);
	while($rec = mysql_fetch_array($res))
	{
	 $arr[]= $rec ;
        }
		$jsonresult = JEncode($arr);
		echo '({"total":"'.$nbrow.'","results":'.$jsonresult.'})';
}
?>



