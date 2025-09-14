<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='dataload';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysql_query("SET NAMES utf8");

    switch($task){
		case "dataload":
		get_dataload();
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
    


function get_dataload()
    {
        mysql_query("SET NAMES utf8");
	$startdate = $_POST['fromdate'];
	$enddate   = $_POST['todate'];
	$compcode  = $_POST['compcode'];
        $query1    = "delete from tmp_order_desp where sono  > 0";
        $result1   = mysql_query($query1);

        $query2    = "insert into  tmp_order_desp (cust_name, sono, sodate, itemcode, ord_qty) select cust_ref, ordh_sono,ordh_sodate,ordt_var_code ,ordt_qty from trnsal_order_header ,trnsal_order_trailer , massal_customer 
where  ordh_party = cust_code and ordh_comp_code = ordt_comp_code and ordh_fincode = ordt_fincode and ordh_sono = ordt_sono and ordh_comp_code = $compcode and ordh_sodate between  '$startdate' and '$enddate'";
        $result2   = mysql_query($query2);

       $query3    = "select pckh_date, pckt_sono,pckt_size,round(sum(pckt_wt)/1000,3)  desp_qty from trnsal_packslip_header , trnsal_packslip_trailer where pckt_comp_code = pckh_comp_code and pckh_fincode = pckt_fincode and pckh_no = pckt_no and pckh_comp_code = $compcode and pckt_sodate between '$startdate' and '$enddate' group by pckh_date,pckt_sono,pckt_size";
//       echo $query3;
        $result3   = mysql_query($query3);

	 while ($row = mysql_fetch_assoc($result3)) {

            $sodate  = $row['pckh_date'];
            $sono    = $row['pckt_sono'];
            $size    = $row['pckt_size'];
            $despqty = $row['desp_qty'];

	    if ( $despqty > 0)
	    { 
	    $query4  = "select * from tmp_order_desp where sono = $sono  and itemcode = $size";
	    $result4 = mysql_query($query4);
	    $rec1    = mysql_fetch_array($result4);

            if($rec1['desp_date1'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date1 = '$sodate' , desp_qty1  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            } 
            else if($rec1['desp_date2'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date2 = '$sodate' , desp_qty2  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            } 
            else if($rec1['desp_date3'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date3 = '$sodate' , desp_qty3  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }       
            else if($rec1['desp_date4'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date4 = '$sodate' , desp_qty4  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }    
            else if($rec1['desp_date5'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date5 = '$sodate' , desp_qty5  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }    

            else if($rec1['desp_date6'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date6 = '$sodate' , desp_qty6  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }    
            else if($rec1['desp_date7'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date7 = '$sodate' , desp_qty7  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }    
             else if($rec1['desp_date8'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date8 = '$sodate' , desp_qty8  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }      
            else if($rec1['desp_date9'] === NULL)
            { 
                $query5  = "update tmp_order_desp set desp_date9 = '$sodate' , desp_qty9  =  $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }    
            else 
            { 
                $query5  = "update tmp_order_desp set desp_date10 = '$sodate' , desp_qty10  = desp_qty10  + $despqty  where sono = $sono  and itemcode = $size";
//       echo $query5;
	        $result5 = mysql_query($query5);
            }  


            }
          } 
          mysql_free_result($result3);



   }


?>
