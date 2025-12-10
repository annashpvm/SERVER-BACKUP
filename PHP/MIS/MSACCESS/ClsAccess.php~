
<?php

$bits = 8 * PHP_INT_SIZE;
echo "(Info: This script is running as $bits-bit.)\r\n\r\n";

$connStr = 'odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};','Dbq=D:\att2000.mdb';

$mdbFilename = "D:\att2000.mdb";

$connStr = odbc_connect("Driver={Microsoft Access Driver (*.mdb)};Dbq=$mdbFilename");

$dbh = new PDO($connStr);
$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT Name FROM USERINFO";
$sth = $dbh->prepare($sql);

//// query parameter value(s)
//$params = array(
//        5,
//        'Homer'
//        );

//$sth->execute($params);

while ($row = $sth->fetch()) {
    echo $row['Name'] . "\r\n";
}

/*
$mdbFilename = "D:\att2000.mdb";
//$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=".$mdbFilename.";Uid=; Pwd=;");
$db = new PDO("odbc:Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=".$mdbFilename.";Uid=; Pwd=;");
$db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );

		
		if ($db)
		echo "<br>PDO connection success\n";
		else 
		echo "<br>pdo connection failed\n";


<?php
$dbName = "D:\att2000.mdb";
if (!file_exists($dbName)) {
    die("Could not find database file.");
}
$db = new PDO("odbc:DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=$dbName; Uid=; Pwd=;")
*/

?>
