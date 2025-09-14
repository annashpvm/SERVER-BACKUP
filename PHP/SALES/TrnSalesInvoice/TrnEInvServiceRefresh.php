<?php
require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");
session_start();


//$username = 'root';
//$password = 'P@ssw0rD';
//$node = '10.0.0.251';
//shell_exec('sudo systemctl EInvoiceIntegration.service'.$username.' '.$node.' '.$password.' 2>&1',$output,$status);
//shell_exec('systemctl start EInvoiceIntegration.service');
//$outPut = shell_exec("echo $password | sudo -S systemctl start EInvoiceIntegration.service");
//echo "<pre>$outPut</pre>";
//echo shell_exec('sh monitor.sh EInvoiceIntegration');
      $message=shell_exec("sh monitor.sh EInvoiceIntegration 2>&1");
//      $message=shell_exec("monitor.sh EInvoiceIntegration.service 2>/dev/null >/dev/null &");
      print_r($message)
?>


