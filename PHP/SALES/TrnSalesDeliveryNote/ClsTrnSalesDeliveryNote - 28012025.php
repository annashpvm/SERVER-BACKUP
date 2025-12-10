<?php
    require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    $task='loadgriddetails';

    if ( isset($_POST['task'])){
        $task = $_POST['task']; // Get this from Ext
    }
    mysqli_set_charset($conn, "utf8");

    switch($task){
		case "loadDNNo":
		getDNNo();
		break;
		case "loadDNNoedit":
                getDNNoedit();
                break;
		case "EditDNNo":
                getEditDNNo();
                break;
		case "loaddano":
		getDANo();
		break;
		case "loadcustomer":
		getcustomer();
		break;
		case "findTaxCode":
		getTaxCode();
		break;
		case "loadinvtype":
		getinvtype();
		break;
		case "loadcusttype":
		getcusttype();
		break;

		case "loadSOno":
		getSOno();
		break;
		case "loadsize":
		getsize();
		break;
		case "loadqtydet":
		getqtydetails();
		break;
		case "loadfromtobox":
		getloadfromtobox();
		break;

		case "loadgriddetails":
		getloadgriddetails();
		break;

		case "loaditemstockqty":
		getitemstockqty();
		break;



		default:
        	echo "{failure:true}";  // Simple 1-dim JSON array to tell Ext the request failed.
        	break;
    }

    function JEncode($arr){
        $data = json_encode($arr, JSON_UNESCAPED_UNICODE);    //encode the data in json format
        return $data;
    }
    
    function getDNNo()
    {
        global $conn;  
    
        $finid    = intval($_POST['fincode'] ?? 0);
        $compcode = intval($_POST['compcode'] ?? 0);
    
        $stmt = mysqli_prepare($conn, "
            SELECT IFNULL(MAX(dn_no), 0) + 1 AS dnno 
            FROM trn_delivery_note 
            WHERE dn_fincode = ? AND dn_comp_code = ?
        ");
    
        mysqli_stmt_bind_param($stmt, "ii", $finid, $compcode);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);
    
        $arr = [];
        while ($re = mysqli_fetch_assoc($res)) {
            $arr[] = $re;
        }
    
        echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    

    function getDNNoedit()
    {
        global $conn;
    
        $finid    = intval($_POST['fincode'] ?? 0);
        $compcode = intval($_POST['compcode'] ?? 0);
    
        $stmt = mysqli_prepare($conn, "
            SELECT dn_no 
            FROM trn_delivery_note 
            WHERE dn_fincode = ? 
              AND dn_comp_code = ?
            GROUP BY dn_no
            ORDER BY dn_no DESC
        ");
    
        mysqli_stmt_bind_param($stmt, "ii", $finid, $compcode);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    
        if (!$result) {
            echo json_encode(["total" => 0, "results" => [], "error" => mysqli_error($conn)]);
            return;
        }
    
        $arr = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(["total" => count($arr), "results" => $arr]);
    }
    

?>
