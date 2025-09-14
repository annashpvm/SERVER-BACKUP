<?php
ini_set("display_errors", true);
ini_set("html_errors", true);

class TreeNode {
	
	public $text = "";
	public $id = "";
	public $iconCls = "";
	public $leaf = true;
	public $draggable = false;
	public $href = "#";
	public $hrefTarget = "";

	function  __construct($id,$text,$iconCls,$leaf,$draggable,$href,$hrefTarget) {
	
		$this->id = $id;
		$this->text = $text;
		$this->iconCls = $iconCls;
		$this->leaf = $leaf;
		$this->draggable = $draggable;
		$this->href = $href;
		$this->hrefTarget = $hrefTarget;	
	}	
}

class TreeNodes {
	
	protected $nodes = array();
	
	function add($id,$text,$iconCls,$leaf,$draggable,$href,$hrefTarget) {
	
		$n = new TreeNode($id,$text,$iconCls,$leaf,$draggable,$href,$hrefTarget);
		
		$this->nodes[] = $n;
	}
	
	function toJson() {
		return json_encode($this->nodes);
	}
}

/*
$n1 = new TreeNode("datasources","Datasources","data",true,false,"","");
$n2 = new TreeNode("datasets","Datasets","dataset",true,false,"","");
$n3 = new TreeNode("reports","Reports","report",true,false,"","");

$nodes = array($n1,$n2,$n3);

echo (json_encode($nodes));
*/


$treeNodes = new TreeNodes();

$treeNodes->add("datasources","Datasources","data",true,false,"","");
$treeNodes->add("datasets","Datasets","dataset",true,false,"","");
$treeNodes->add("reports","Reports","report",true,false,"","");

echo $treeNodes->toJson();

?>