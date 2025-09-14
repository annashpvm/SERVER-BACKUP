Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
//var gstGroup;
//OUT SIDE

var dtproddate = new Ext.form.DateField({
    fieldLabel : 'Production DATE',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    width : 100,
});

var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbshift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });

var loadSupervisorDatastore = new Ext.data.Store({
      id: 'loadSupervisorDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSupervisor"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'spvr_code', 'spvr_name', 'spvr_type'
      ]),
    });

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 150,
        displayField    : 'spvr_name', 
        valueField      : 'spvr_code',
        hiddenName      : '',
        id              : 'cmbsupervisor',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSupervisorDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });

  

var cmboperator = new Ext.form.ComboBox({
        fieldLabel      : 'M/C Operator',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmboperator',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Rajesh'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
	listeners:{
        select: function(){
	}
	}
   });
 
var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 40,
    x       : 825,
    y       : 190,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){ 
        }, 
       },            
});


var lblRawmaterial = new Ext.form.Label({
	fieldLabel  : 'Rawmaterial Name',
	id          : 'lblRawmaterial',
	name        : 'lblRawmaterial',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblChemical = new Ext.form.Label({
	fieldLabel  : 'Chemical Name',
	id          : 'lblChemical',
	name        : 'lblChemical',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblRMIssueQty = new Ext.form.Label({
	fieldLabel  : 'Issue Qty(T)',
	id          : 'lblRMIssueQty',
	name        : 'lblRMIssueQty',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblRMReturnQty = new Ext.form.Label({
	fieldLabel  : 'Return Qty(T)',
	id          : 'lblRMReturnQty',
	name        : 'lblRMReturnQty',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblCDIssueQty = new Ext.form.Label({
	fieldLabel  : 'Issue Qty(T)',
	id          : 'lblCDIssueQty',
	name        : 'lblCDIssueQty',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var lblCDReturnQty = new Ext.form.Label({
	fieldLabel  : 'Return Qty(T)',
	id          : 'lblCDReturnQty',
	name        : 'lblCDReturnQty',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});


var cmbRawMaterial = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbRawMaterial',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
   
   
   
   var cmbChemical = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbChemical',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
var loadRawmaterialDatastore = new Ext.data.Store({
      id: 'loadRawmaterialDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRawmaterial"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'itmh_code','itmh_name'

      ]),
    });
var dgrecord = Ext.data.Record.create([]);
var flxrawmtdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:20,
    y:60,
    height: 280,
    hidden:false,
    width: 500,
    columns:
    [
	{header: "ITEM CODE", dataIndex: 'itmh_code',sortable:true,width:100,align:'left'},
        {header: "ITEM NAME", dataIndex: 'itmh_name',sortable:true,width:250,align:'left'},
        {header: "ISSUE Qty", dataIndex: 'issueqty',sortable:true,width:100,align:'left'},//0
        {header: "Rtn Qty", dataIndex: 'rtnqty',sortable:true,width:100,align:'left'},//1

    ],
	store :loadRawmaterialDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'Rawmaterial Consumption',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxrawmtdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}
				else if (selrow.get('mcseq') == "4")
				{
					macname = 'PM3';
				}
				else if (selrow.get('mcseq') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });
				
				
flxrawmtdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxrawmtdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxrawmtdetail.getStore().remove(selrow);
			flxrawmtdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});
var loadChemicalDatastore = new Ext.data.Store({
      id: 'loadChemicalDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsConsumptionEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadChemical"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_code','item_name'

      ]),
    });
var dgrecord = Ext.data.Record.create([]);
var flxcheconsdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:190,
    y:80,
    height: 200,
    hidden:false,
    width: 460,
    columns:
    [
	{header: "CHEMICAL CODE", dataIndex: 'item_code',sortable:true,width:100,align:'left'},
        {header: "CHEMICAL NAME", dataIndex: 'item_name',sortable:true,width:250,align:'left'},
        {header: "ISSUE Qty", dataIndex: 'issueqty',sortable:true,width:100,align:'left'},//0
        {header: "Rtn Qty", dataIndex: 'rtnqty',sortable:true,width:100,align:'left'},//1


    ],
	store : loadChemicalDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'Chemical Consumption',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxcheconsdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;

				if (selrow.get('mcseq') == "1")
				{
					macname = 'DIP';
				}
				else if (selrow.get('mcseq') == "2")
				{
					macname = 'PM1';
				}
				else if (selrow.get('mcseq') == "3")
				{
					macname = 'PM2';
				}
				else if (selrow.get('mcseq') == "4")
				{
					macname = 'PM3';
				}
				else if (selrow.get('mcseq') == "5")
				{
					macname = 'VJPM';
				}
				cmbmachine.setValue(selrow.get('mcseq'));
				cmbmachine.setRawValue(macname);

				cmbitem.setValue(selrow.get('itemseq'));
				
				cmblotno.setValue(selrow.get('lotseq'));
				cmblotno.setRawValue(selrow.get('lotno'));
				cmbbatch.setValue(selrow.get('batseq'));
				cmbvariety.setValue(selrow.get('varseq'));
				//cmbmachine.setValue(selrow.get('mcseq'));
				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				txtcostrate.setValue(selrow.get('avgrate'));
				txtnoofbags.setValue(selrow.get('issbags'));
           LotItemDataStore.removeAll();
            LotItemDataStore.load({
                url: 'ClsIssue.php',
                params:
                {
                    task:"loadlotitem",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : cmbitem.getValue(),
		    lotcode : cmblotno.getValue()
                },
		callback:function()
		{

			txtcostrate.setValue(LotItemDataStore.getAt(0).get('itmt_avgrate'));
			
			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) > 0 ){
				tbistk = LotItemDataStore.getAt(0).get('stock_bags');
			}
			else { tbistk = 0; }

			if (Number(LotItemDataStore.getAt(0).get('stock_bags')) < 3 ){

				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stock'));
			}
			else { 
				txtstock.setValue(LotItemDataStore.getAt(0).get('stock'));
				actstk = (LotItemDataStore.getAt(0).get('stk_billqty'));
			}
			var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
			txtissval.setValue(issval);			

		}
            });
				
				
flxcheconsdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxcheconsdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxcheconsdetail.getStore().remove(selrow);
			flxcheconsdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});
var tabConsumption = new Ext.TabPanel({
    id          : 'Consumption',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#eaeded"},
    activeTab   : 0,
    height      : 400,
    width       : 860,
    x           : 10,
    y           : 40,
    items       : [
        {
            xtype: 'panel',
            title: 'Rawmaterial ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
			
			
		flxrawmtdetail,    
		]
        },


        {
            xtype: 'panel',
            title: 'Chemical ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
		{
		},flxcheconsdetail,
            ]
        }
      ,
        {
            xtype: 'panel',
            title: 'Water & Others ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
			
            ]
        }
 
     ]
});


       
var TrnProdnFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'CONSUMPTION ENTRY',
        header      : false,
        width       : 700,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 500,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnProdnFormpanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
		{
		    text: ' Add',
		    style  : 'text-align:center;',
		    tooltip: 'Add Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		    align : 'right',
		    icon: '/Pictures/Add.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Add";
				TrnIssueFormpanel.getForm().reset();
				RefreshData();
			
		        }
		    }
		},'-',
		{
		    text: 'Edit',
		    style  : 'text-align:center;',
		    tooltip: 'Modify Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
	//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
	                }
	            } 
	        },'-',                
	        {
	            text: 'Refresh',
	            style  : 'text-align:center;',
	            tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/refresh.png',
	            listeners:{
	                click: function () {
	                   RefreshData();
	                }
	            }
	        },'-',
	        {
	            text: 'Exit',
	            style  : 'text-align:center;',
	            tooltip: 'Close...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				TrnProdnEntry.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [

		    { xtype   : 'fieldset',
		        title   : 'CONSUMPTION ENTRY',
		        layout  : 'hbox',
		        border  : true,
		        height  : 480,
		        width   : 925,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 
//INSIDE
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 120,
                                	width       : 400,
                                	x           : 80,
                                	y           : -10,
                                    	border      : false,
                                	items: [dtproddate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 400,
                                	x           : 620,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbshift]
                                 },
                                { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 300,
                                	x           : 370,
                                	y           : -10,
                                    	border      : false,
                                	items: [cmbsupervisor]
                                  },tabConsumption ,
                      ], 
                     },	
                       
                 ],
        
    });

   
    var TrnProdnEntry = new Ext.Window({
	height      : 570,
        width       : 960,
        y           : 35,
        title       : 'CONSUMPTON ENTRY',
        items       : TrnProdnFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){


	   	
	   	}

		}
    });
    TrnProdnEntry.show();  
});
