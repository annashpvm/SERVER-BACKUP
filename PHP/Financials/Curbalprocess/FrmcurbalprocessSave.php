<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

    session_start();
    
    $griddet = json_decode($_REQUEST['griddet'],true);
    $rowcnt = $_REQUEST['cnt'];
    $inscnt = 0;

        for ($i=0;$i<$rowcnt;$i++){
            $Process_SeqNo=$griddet[$i]['Process_SeqNo'];
            $Meters=$griddet[$i]['mtrs'];
            $status=$griddet[$i]['Process_Prod_Status'];

            if($status=="R"){
            $query = "update process_trailer
                    set Process_Prod_Status   =   'R'
                where
                    Process_SeqNo		=	'$Process_SeqNo'  and
                    Process_Finish_Barcode  <> ''";
            $result = mysql_query($query);
            }else  if($status=="Y"){
            $query = "   update process_trailer
	set Process_Insp_Mtrs   =   Process_Insp_Mtrs+'$Meters'
	where
		Process_SeqNo		=	'$Process_SeqNo'  and
		Process_Finish_Barcode  <> ''";
            $result = mysql_query($query);
            }else  if($status=="N"){
              $query = "update process_trailer
	set Process_Prod_Status   =   ''
	where
		Process_Insp_Mtrs  >=  (Process_Processed_Mtrs - (Process_Processed_Mtrs*.05)) and
		Process_SeqNo		=	'$Process_SeqNo'  and
		Process_Finish_Barcode  <> ''";
            $result = mysql_query($query);
            }
            if ($result){
                $inscnt = $inscnt + 1;
            }
        }

      if ($result&($rowcnt==$inscnt))
        {
            mysql_query("COMMIT");
            Echo '{success:true}';
        }
        else
        {
            mysql_query("ROLLBACK");
            Echo '{failure:true}';
        }
?>

