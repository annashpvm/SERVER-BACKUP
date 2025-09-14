Ext.onReady(function() {
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinFinstdate = localStorage.getItem('gfinstdate');
   var reptype = 'A';
var accnamedatastore = new Ext.data.Store({
      id: 'accnamedatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "ledbookNEWlook",gincompcode : GinCompcode}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_name', direction: "ASC"}
    });
    

    var txtledgerName= new Ext.form.TextField({
        fieldLabel  : 'Ledger Name',
        id          : 'txtledgerName',
        name        : 'txtledgerName',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
        enableKeyEvents:true,
        listeners:{
            keyup:function(){
/*
    		if (txtledgerName.getValue() == "") {
		      accnamedatastore.load({
		      url: '/SHVPM/Accounts/clsRepFinancials.php',
		       params: {
		           task: 'ledbookNEWlook',
		           gincompcode : GinCompcode,
		           reptype:reptype
		       }
		    }); 
		} 
	*/	
		Flxledger.getStore().filter('led_name', txtledgerName.getValue());  
 
    			
    		}
        }
    });
    

 var pidno1='';
var pm1 = new Ext.grid.CheckboxSelectionModel({
listeners: {
selectionchange: function(pm1) {
var selected_rows = Flxledger.getSelectionModel().getSelections();
     for(var i=0; i<selected_rows.length; i++){
     pidno1=(selected_rows[i].data.led_code);
}
}
}
});

 var Flxledger = new Ext.grid.EditorGridPanel({
    frame: false,
    id : Flxledger,
    hideHeaders : true,
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    editable : true,
    height: 250,
    width: 500,
    x: 60,
    y: 150,
    selModel: pm1,
    columns: [pm1,
        {header: "ledcode", dataIndex: 'led_code',sortable:true,width:70,align:'left',hidden:true},
        {header: "led Name", dataIndex: 'led_name',sortable:true,width:420,align:'left'}
    ],
    store   : accnamedatastore
}); 
    


var cmbaccname = new Ext.form.ComboBox({
        id         : 'cmbaccname',
        width      : 280,
        store      : accnamedatastore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        fieldLabel  : 'Account Name',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Account Name',
	allowBlank:false,
        tabIndex:18,
	hidden : false  
    });

var fmdate = new Ext.form.DateField({
        name        : 'fmdate',
        id          : 'fmdate',
        fieldLabel  : 'From Date',
        format      : 'd-m-Y',
        value       : GinFinstdate

    });

var todate = new Ext.form.DateField({
        name        : 'todate',
        id          : 'todate',
        fieldLabel  : 'To Date',
        format      : 'd-m-Y',
        value       : new Date()

    });
   
   var fp = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'LEDGER BOOK',
        width       : 620,
        height      : 500,        bodyStyle:{"background-color":"#3399CC"},
        x           : 50,
        y           : 25,
        frame       : false,
        id          : 'fp',
        method      : 'post',
        layout      : 'absolute',
	tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png'                                  
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',  
		    listeners:{
                    click:function(){
			var fdate=Ext.util.Format.date(fmdate.getValue(),"Y-m-d");
			var tdate=Ext.util.Format.date(todate.getValue(),"Y-m-d");
//			var c="1";
//			var f="22";


 			    var ledcode_code = "";
			    var selp = Flxledger.getSelectionModel().getSelections();
			    for (var p=0; p<selp.length; p++)
			    {
				if (ledcode_code === ""){
				      ledcode_code =  selp[p].data.led_code;
				      ledname = selp[p].data.led_name;}
				else
				      ledcode_code = ledcode_code + ","  + selp[p].data.led_code;
			    }
			    if (ledcode_code=="")
			    ledcode_code='%';








alert(ledcode_code);

			var l=Ext.getCmp('cmbaccname').getValue();
			var lednm=Ext.getCmp('cmbaccname').getRawValue();
			var rad=fp.getForm().getValues()['opt'];
			var rdled=fp.getForm().getValues()['optled'];
			var chkled=fp.getForm().getValues()['chkstores'];

			var d1 =  fdate; // + " 00:00:00.000";
			var d2 =  tdate; // + " 00:00:00.000";


			//var led="&ledcode="+encodeURIComponent(l);
                    var com="&compcode="+encodeURIComponent(GinCompcode);
                    var fin="&finid="+encodeURIComponent(GinFinid);
                    var fd = "&fromdate="+encodeURIComponent(d1);
                    var td = "&todate="+encodeURIComponent(d2);

		    var fd = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(fmdate.getValue(),"Y-m-d"));
		    var td = "&todate=" + encodeURIComponent(Ext.util.Format.date(todate.getValue(),"Y-m-d"));

                    var lename="&ledname="+encodeURIComponent(ledname);
                    var led="&ledcode="+encodeURIComponent(ledcode_code);
                    
                    var rep_type="&reptype="+encodeURIComponent(reptype);
                    var selled="&selledcode="+encodeURIComponent(ledcode_code);
                   // alert(selled);
                    
			var param = (led + com + fin + fd + td + lename) ;
			//var paramnew=(com + fd + td + rep_type+ selled) ;
			var paramnew=(com +fin+ fd + td + rep_type+ selled) ;
			//var param = (led + com + fin + fd + td + lename) ;
			if (ledcode_code=="")
                          Ext.MessageBox.alert("Alert","Select the Ledger...");
			else
			{
			if (rad=="2")
			{
//alert("1");
//window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBookPrintingAmountwise.rptdesign' + param, '_blank');

window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');
			} 
			else if (rdled=="2")
			{
				if (chkled=="1")
{
alert("2");
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBookPrintingStoresLedger.rptdesign' + param, '_blank');	
}
				else{
//alert(led);


			var paramnew=(led + com + fin + fd + td + lename) ;
//alert(ledname);

window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + paramnew, '_blank');
}
			}
			else
{
alert("4");
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBookPrintingDatewisenew.rptdesign' + paramnew, '_blank');
}


			}

 }}
                 },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',  
                    listeners:{
                        click: function(){
                            frmwindow.hide();
                        }
                    }
                }
                ]
            },
        items: [
        
        {
                xtype: 'fieldset',
                title: '',
                layout      : 'absolute',
                hidden:false,
                height:50,
                width:400,
                x: 100,
                y:10,
              items: [
		{ xtype       : 'fieldset',
                title       : '',
                width       : 230,
                x           : 10,
                y           : -10,
                border      : false,
                labelWidth  : 65,
                items: [fmdate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 300,
                x           : 190,
                y           : -10,
                border      : false,
                labelWidth  : 65,
                items: [todate]
                }
                ]
                },
{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                hidden:true,
                height:100,
                width:380,
                x: 100,
                y:60,
              items: [
            {
                xtype: 'radiogroup',
border  :  false,
                x       : 100,
                y       : 60,
                hidden:true,
                columns :  2,
                items: [
                    {boxLabel: 'Datewise', name: 'opt', inputValue: '1', checked: true},
                    {boxLabel: 'Amountwise', name: 'opt', inputValue: '2'}
                ]
            }
        ]
            },

{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:40,
                width:400,
                x: 100,
                y:65,
              items: [
            {
                xtype: 'radiogroup',
border  :  false,
                x       : 100,
                y       : 60,
                
                columns :  4,
                items: [
                    {boxLabel: 'All', name: 'optled', inputValue: '1', checked: true,listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		reptype = 'A';
                		txtledgerName.disable();
		               Flxledger.disable();
				      accnamedatastore.load({
				      url: '/SHVPM/Accounts/clsRepFinancials.php',
				       params: {
				           task: 'ledbookNEWlook',
				           gincompcode : GinCompcode,
				           reptype:reptype
				       }
				    });
		         	}
               		}}},
                    {boxLabel: 'Selective', name: 'optled', inputValue: '2',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		
                		reptype = 'S';
                		txtledgerName.setValue('');
                		txtledgerName.enable();
		               Flxledger.enable();
				      accnamedatastore.load({
				      url: '/SHVPM/Accounts/clsRepFinancials.php',
				       params: {
				           task: 'ledbookNEWlook',
				           gincompcode : GinCompcode,
				           reptype:reptype
				       }
				    });
		         	}
               		}}},
               	{boxLabel: 'General Ledger', name: 'optled', inputValue: '2',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		
                		reptype = 'L';
                		txtledgerName.setValue('');
                		txtledgerName.enable();
		               Flxledger.enable();
				      accnamedatastore.load({
				      url: '/SHVPM/Accounts/clsRepFinancials.php',
				       params: {
				           task: 'ledbookNEWlook',
				           gincompcode : GinCompcode,
				           reptype:reptype
				       }
				    });
		         	}
               		}}},
               	{boxLabel: 'Group', name: 'optled', inputValue: '2',listeners:{
               		check:function(rb,checked){
                		if(checked==true){
                		
                		reptype = 'G';
                		txtledgerName.setValue('');
                		txtledgerName.enable();
		               Flxledger.enable();
		              
				      accnamedatastore.load({
				      url: '/SHVPM/Accounts/clsRepFinancials.php',
				       params: {
				           task: 'ledbookNEWlook',
				           gincompcode : GinCompcode,
				           reptype:reptype
				       }
				    });
		         	}
               		}}}
                ]
            }
        ]
            },Flxledger,
            
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 520,
                                	x           : 50,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtledgerName]
                            },            
 		{
            	xtype: 'checkboxgroup',
            	fieldLabel: '',
                columns: 1,
             	vertical: true,
             	hidden:true,
 		x           : 30,
                y           : 240,
             	items: [
             		 { 
			    boxLabel: 'Stores Ledger', 
			    name: 'chkstores', 
			    inputValue: '1' 
			 }
           		]
		}
        ]
    });

var frmwindow = new Ext.Window({
      height      : 550,
      width       : 650,
      bodyStyle   : 'padding: 10px',
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',        bodyStyle:{"background-color":"#3399CC"},
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	title : 'LEDGER BOOK',
	y:55,
  items : fp,
        listeners:
            {
                show:function(){
                Flxledger.disable();
                txtledgerName.disable();
 			accnamedatastore.load({
                      url: '/SHVPM/Accounts/clsRepFinancials.php',
                       params: {
                           task: 'ledbookNEWlook',
                           gincompcode : GinCompcode,
                           reptype:reptype
                       }
                    });
                }
            }
}).show();
});

