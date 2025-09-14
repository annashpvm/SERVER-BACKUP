 <?php
 require($_SERVER["DOCUMENT_ROOT"]."/dbConn.php");

try{
   $pdo = new PDO('mysql:host=10.0.0.251;dbname=shvpm','root','P@ssw0rD');

}catch(PDOException $error){

    echo $error->getmessage();
}


//$supcount = $pdo->query("select max(sup_code)+1 as recount from maspur_supplier_master")->fetchColumn();
//$ledcount = $pdo->query("select max(led_code)+1 as recount from acc_ledger_master")->fetchColumn();
$supcount = $pdo->query("select max(cust_code)+1 as recount from massal_customer")->fetchColumn();

echo $supcount;
echo "<br>";

$today = date("Y-m-d H:i:s");  

$i =0;
$skip = 7;

$cnnt=0;
if (isset($_POST["Import"])) {

 $filename=$_FILES["file"]["tmp_name"];

    if ($_FILES["file"]["size"] > 0) {




        $file = fopen($filename, "r");
	$cnnt=0;
        while (($packData = fgetcsv($file, 10000, ",")) !== FALSE) {
             if (++$i > $skip)
             {   

            $colB = $packData[1];
            $colC = $packData[2];


            $colB = trim(strtoupper(str_replace("'", "", $colB)));
            $colC = trim(strtoupper(str_replace("'", "", $colC)));

            $colB1 =  substr($colB,0,10);

            $colB_Actual = $colB;  
            $colC_Actual = $colC;  


            $colB = trim(str_replace(" ", "", $colB));
            $colC = trim(str_replace(" ", "", $colC));

            $grp =0;
//echo $colA;

           if ($colB != '')
           {
           $count = $pdo->query("select count(*) as nos from maspur_supplier_master where REPLACE(sup_name, ' ','')   = '$colB'")->fetchColumn();




           $grp = $pdo->query("select grp_code from acc_group_master where REPLACE(grp_name, ' ','')   = '$colC'")->fetchColumn();


//           $count = $pdo->query("select count(*) as nos from maspur_supplier_master where left(sup_name,10) = '$colA1'   trim(sup_name) = '$colA' ")->fetchColumn();

            if ($count == 0) 
            {
//echo $colA;
//echo "<br>";

        $insert = $pdo->prepare("insert into maspur_supplier_master (sup_code, sup_led_code, sup_name, sup_refname, sup_addr1, sup_addr2, sup_addr3,sup_acc_group,createdby, createddate, seqno) values ( $supcount,$supcount,'$colB_Actual','$colB_Actual','1','1','1','$grp',0,'$today',1)");
            $insert->bindParam(':columnB', $packData[1]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
             $supcount =  (int)$supcount + 1;
             $ledcount =  (int)$ledcount + 1;
            }

/*
        $insert = $pdo->prepare("insert into acc_ledger_master (
led_code, led_comp_code, led_name, led_addr1, led_addr2, led_addr3, led_city, led_state, led_pin, led_grp_code, led_status, led_gst_no, led_pan_no, led_type, led_custcode, createdby, createddate, seqno ) values ( $ledcount,'1', UPPER(:columnB), '1','1','1', '3', 24, '0', $grp, 'Y', '', '', 'S', $supcount, 0,'$today', 1)");
            $insert->bindParam(':columnB', $packData[1]);  //NAME
            if ($insert->execute()) {
		$cnnt=$cnnt+1;
            }
*/






            }  
        }
        } 
    }

	if($cnnt>0){
  	    echo '<script type="text/javascript">
              alert("successfully uploaded");
              </script>';
	}
        else
        {
   	    echo '<script type="text/javascript">
              alert("Data Alreaday Available");
              </script>';
        } 

  }
}
?>
<html>
    <head>
       	<link rel="stylesheet" type="text/css" href="/DOMAIN/excel/styles1.css" />


<script type="text/javascript">


Ext.onReady(function() {
    Ext.QuickTips.init();

    var cmbMonth = new Ext.form.ComboBox({
        id         : 'cmbMonth',
        fieldLabel : 'Month',
        width      : 250,
	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        store : ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY',
                    'AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
        displayField:'month_name',
        valueField:'month_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners:{
            select :function(){
            //    MonthClick();
            }
        }
    });



    var ImportPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Bank Receipt Entry',
        bodyStyle: {"background-color": "#f7fffe"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 1500,
        height: 600,
        x: 10,
        y: 10,
        frame: false,
        id: 'ImportPanel',
        method: 'POST',
        layout: 'absolute',

        items  : [
		{
		    xtype       : 'fieldset',
		    x           : 15,
		    y           : 10,
		    border      : false,
		    width       :500,
		    items : [cmbMonth]
		},
        ]   
});

var myWin = new Ext.Window({
    id     : 'myWin',
    height : 620,
    width  : 1340,
    bodyStyle: {"background-color": "#ffffdb"},
    x:10,
    y:20,
    maximized:false,
    items: ImportPanel,

onEsc:function(){
},
    listeners:{
      
        show:function(){
             
            txtFinYear.setRawValue(yearfin);
	    Ext.getCmp('lblcompany').setText(millname);

         if (Ext.util.Format.date(monthenddate.getValue(), "Y-m-d") > Ext.util.Format.date(finenddate, "Y-m-d"))
            monthenddate.setValue(finenddate);
            Refreshdata();


        }
    }
});
myWin.show();

    });

    </head>

</html>
<div class="content-wrapper">
    <section class="content container-fluid">
        <div class="container">
		<div class="row">
			<div class="span3 hidden-phone"></div>
			<div class="span6" id="form-login">
				<form class="form-horizontal well"  action="" method="POST" name="upload_excel" enctype="multipart/form-data">
					<fieldset>
						<center><legend>Excel Upload</legend></center>
						<div class="control-group">
							<div class="controls">
								<label>CSV File Only:</label><input type="file" name="file" id="file" class="input-large">
							</div>
						</div>
						<br>
						<div class="control-group">
							<div class="controls">
							<button type="submit" id="submit" name="Import" class="btn btn-primary button-loading" data-loading-text="Loading...">Upload </button></br>
							</div>
						</div>
					

					</fieldset>
				</form>
			</div>
		</div>
		
    </section>
</div>

