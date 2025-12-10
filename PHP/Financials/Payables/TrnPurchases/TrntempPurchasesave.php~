<?php
require($_SERVER["DOCUMENT_ROOT"] . "/dbConn.php");

$griddet = json_decode($_REQUEST['griddet'], true);
$rowcnt = $_REQUEST['cnt'];
$flag=$_REQUEST['flag'];
$comp=$_REQUEST['comp'];

if($flag=="S"){
if($comp==1){
$query = "delete from tempstore";
$result = mysql_query($query);
}else if($comp==4){
$query = "delete from tempstoresbm";
$result = mysql_query($query);
}else if($comp==11){
$query = "delete from tempstoreagro";
$result = mysql_query($query);
}
} else if($flag=="Q"){
if($comp==1){
$query = "delete from tempstore";
$result = mysql_query($query);
}else if($comp==4){
$query = "delete from tempstoresbm";
$result = mysql_query($query);
}else if($comp==11){
$query = "delete from tempstoreagro";
$result = mysql_query($query);
}
} else if($flag=="M"){
$query = "delete from tempifdstore";
$result = mysql_query($query);
}else if($flag=="W"){
if($comp==4){
$query = "delete from tempworkoder";
$result = mysql_query($query);
}else if($comp==1){
$query = "delete from tempworkodervm";
$result = mysql_query($query);
}else if($comp==11){
$query = "delete from tempworkoderagro";
$result = mysql_query($query);
}
}else if($flag=="CT"){
$query = "delete from tempcotton";
$result = mysql_query($query);
}else if($flag=="Y"){
if($comp==1){
$query = "delete from tempyarn";
$result = mysql_query($query);
}else if($comp==4){
$query = "delete from tempyarnsbm";
$result = mysql_query($query);
}
}else if($flag=="A"){
$query = "delete from tempmadeups";
$result = mysql_query($query);
}else if($flag=="IY"){
$query = "delete from tempimportyarn";
$result = mysql_query($query);
}else if($flag=="IM"){
$query = "delete from tempworkorderifd";
$result = mysql_query($query);
}else if($flag=="K"){
$query = "delete from tempfibre";
$result = mysql_query($query);
}else if($flag=="T"){
$query = "delete from tempaccterry";
$result = mysql_query($query);
}

$inscnt = 0;
for ($i = 0; $i < $rowcnt; $i++) {
    $Sno = $i + 1;
    $itemname = mysql_real_escape_string($griddet[$i]['itemname']);
    $itemsubgroupname = $griddet[$i]['itemsubgroupname'];
    $Value = $griddet[$i]['Value'];
    $DebitAmtt = $griddet[$i]['DebitAmtt'];
    $ValueDef = $griddet[$i]['ValueDef'];
if($flag=="S"){
if($comp==1){
    $query2 = "insert into tempstore
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==4){
    $query2 = "insert into tempstoresbm
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==11){
    $query2 = "insert into tempstoreagro
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}
} else if($flag=="Q"){
if($comp==1){
    $query2 = "insert into tempstore
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==4){
    $query2 = "insert into tempstoresbm
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==11){
    $query2 = "insert into tempstoreagro
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}
} else if($flag=="M"){
    $query2 = "insert into tempifdstore
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
} else if($flag=="W"){
if($comp==4){
    $query2 = "insert into tempworkoder
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==1){
    $query2 = "insert into tempworkodervm
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($comp==11){
    $query2 = "insert into tempworkoderagro
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}
}else if($flag=="A"){
    $query2 = "insert into kgdl.tempmadeups
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($flag=="CT"){
    $query2 = "insert into tempcotton
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($flag=="Y"){
   if($comp==1){
    $query2 = "insert into tempyarn
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
} else if($comp==4){
    $query2 = "insert into tempyarnsbm
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}
}else if($flag=="IY"){
    $query2 = "insert into tempimportyarn
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($flag=="IM"){
    $query2 = "insert into tempworkorderifd
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($flag=="K"){
    $query2 = "insert into tempfibre
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}else if($flag=="T"){
    $query2 = "insert into tempaccterry
	    (
		sno,
		itemname,
		itemsubgroupname,
		Value,
		DebitAmtt,
		ValueDef
	    )values
	    (
		'$Sno',
		'$itemname',
		'$itemsubgroupname',
		'$Value',
		'$DebitAmtt',
		'$ValueDef'
	    )";
    $result2 = mysql_query($query2);
}
    if ($result2) {
        $inscnt = $inscnt + 1;
    }
}

if ($result2 && ($inscnt == $rowcnt))
    {
    echo '({"success":"true","msg":"' . $accref_vouno . '"})';
}
else
  {

    echo '({"success":"false","msg":"' . $accref_vouno . '"})';
}
?>

