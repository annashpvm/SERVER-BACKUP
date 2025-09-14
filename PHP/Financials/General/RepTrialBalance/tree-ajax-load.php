 <?php
ini_set("display_errors", true);
ini_set("html_errors", true);


$node = "";
$out = "";

if (isset($_REQUEST["node"])) {
    $node = $_REQUEST["node"];
}

switch ($node) {

    case "project":
        $out = GetProjectTree();
        break;
    case "datasources":
        $out = GetDataSources();
        break;
    

}
echo utf8_encode($out);


function GetProjectTree() {
    
    $tree = "[{\"text\":\"Data Sources\",\"id\":\"datasources\",\"iconCls\":\"folder\",\"draggable\":false}]";
    
    return $tree; 
}

function GetDataSources() {
    
    $datasrc = "[{\"text\":\"Time and Billing System\",\"id\":\"timeandbilling\",\"leaf\":true,\"iconCls\":\"datasource\"},";
    $datasrc .= "{\"text\":\"Employee Management System\",\"id\":\"emplmanagement\",\"leaf\":true,\"iconCls\":\"datasource\"}]";    
    
    return $datasrc; 
}


?> 