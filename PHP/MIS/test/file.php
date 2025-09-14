 <?php
$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = "John Doe\n";
fwrite($myfile, $txt);
$txt = "Jane Doe\n";
fwrite($myfile, $txt);
$txt = "ANNADURAI\n";
fwrite($myfile, $txt);
$txt = "SRI HARI VENKATESWARA\n";
fwrite($myfile, $txt);
fclose($myfile);
?> 
?> 
