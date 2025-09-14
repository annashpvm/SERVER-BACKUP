<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConndpm.php");

$fabricgriddet = json_decode($_REQUEST['fabricgriddet'],true);
$rowcnt = $_POST['cnt'];   

 //echo"$GroupName";
$query = "select ifnull(max(cnft_hdcode),0)+1 as cnft_hdcode from mas_cnftrailer";
$result = mysql_query($query);
$rec = mysql_fetch_array($result);
$cnft_hdcode=$rec['cnft_hdcode'];

//'slno','cnfname','ContainerLength','ContailerFrom','ContainerTo','WhaftCharges','Trailerhirecharges','movecharges','portlabcharge','contlabcharge',
//'documcharge','processcharge','stuffingcharge','communicationcharge','servicecharge','servicetax','survayinsurance','linerdocharge','othercharge'

for($i=0;$i<$rowcnt;$i++){
$cnft_hdcode = $fabricgriddet[$i]['cnft_hdcode'];
$cnft_seqno =  $fabricgriddet[$i]['cnfname'];
$cnft_cont_len = $fabricgriddet[$i]['ContainerLength'];
$cnft_cont_from = $fabricgriddet[$i]['ContailerFrom'];
$cnft_cont_to = $fabricgriddet[$i]['ContainerTo'];
$cnft_wharfchrg = $fabricgriddet[$i]['WhaftCharges'];
$cnft_tlrhirechrg =  $fabricgriddet[$i]['Trailerhirecharges'];
$cnft_movechrg = $fabricgriddet[$i]['movecharges'];
$cnft_portlabrchrg = $fabricgriddet[$i]['portlabcharge'];
$cnft_contractlabrchrg = $fabricgriddet[$i]['contlabcharge'];
$cnft_docchrg = $fabricgriddet[$i]['documcharge'];
$cnft_procchrg = $fabricgriddet[$i]['processcharge'];
$cnft_stuffchrg = $fabricgriddet[$i]['stuffingcharge'];
$cnft_commchrg = $fabricgriddet[$i]['communicationcharge'];
$cnft_servchrg = $fabricgriddet[$i]['servicecharge'];
$cnft_servtax = $fabricgriddet[$i]['servicetax'];
$cnft_linthcchrg = '0';
$cnft_lindochrg = $fabricgriddet[$i]['linerdocharge'];
$cnft_surveyins = $fabricgriddet[$i]['survayinsurance'];
$cnft_othchrg = $fabricgriddet[$i]['othercharge'];
$cancelflag = "N";

$query1="insert into mas_cnftrailer values('$cnft_hdcode','$cnft_seqno','$cnft_cont_len','$cnft_cont_from','$cnft_cont_to','$cnft_wharfchrg','$cnft_tlrhirechrg',
'$cnft_movechrg','$cnft_portlabrchrg','$cnft_contractlabrchrg','$cnft_docchrg','$cnft_procchrg','$cnft_stuffchrg','$cnft_commchrg','$cnft_servchrg','$cnft_servtax','$cnft_linthcchrg',
'$cnft_lindochrg','$cnft_surveyins','$cnft_othchrg','$cancelflag')";
$result1 = mysql_query($query1);
       }

  if ($result1) {
    //mysql_query("COMMIT");
    echo '({"success":"true","msg"})';
} else {
  //  mysql_query("ROLLBACK");
    echo '({"success":"false","msg"})';
}
  
   
?>
