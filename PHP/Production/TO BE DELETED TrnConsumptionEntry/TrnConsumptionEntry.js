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
    fieldLabel : 'Production DATE	',
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

var cmbsupervisor = new Ext.form.ComboBox({
        fieldLabel      : 'Supervisor',
        width           : 150,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbsupervisor',
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

var txtoppulp = new Ext.form.TextField({
	fieldLabel  : 'Pulp Opening (MT)',
	id          : 'txtoppulp',
	name        : 'txtoppulp',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});  
var txtclspulp = new Ext.form.TextField({
	fieldLabel  : 'Pulp Closing (MT)',
	id          : 'txtclspulp',
	name        : 'txtclspulp',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtbrokeop = new Ext.form.TextField({
	fieldLabel  : 'Broke Opening',
	id          : 'txtbrokeop',
	name        : 'txtbrokeop',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtbrokecls = new Ext.form.TextField({
	fieldLabel  : 'Broke Closing ',
	id          : 'txtbrokecls',
	name        : 'txtbrokecls',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtcogenpwr = new Ext.form.TextField({
	fieldLabel  : 'CoGen Power',
	id          : 'txtcogenpwr',
	name        : 'txtcogenpwr',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtsteam = new Ext.form.TextField({
	fieldLabel  : 'Steam',
	id          : 'txtsteam',
	name        : 'txtsteam',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

}); 
var txtebpwr = new Ext.form.TextField({
	fieldLabel  : 'EB Power',
	id          : 'txtebpwr',
	name        : 'txtebpwr',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

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
var optrawmttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:700,
    height:50,
    x:80,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optisstype',
        items: [
            {boxLabel: 'DIP PULP', name: 'optrawmttype', id:'optdipcons', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            
               }
              }
             }
            },
            {boxLabel: 'OWN PULP', name: 'optrawmttype', id:'optowncons', inputValue: 2,hidden:false,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            
               }
              }
             }},
            {boxLabel: 'OWN + DIP PULP', name: 'optrawmttype', id:'optdipowncons', inputValue: 3,hidden:false,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            
               }
              }
             }}
        ]
    }
    ]
});
var dgrecord = Ext.data.Record.create([]);
var flxrawmtdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:190,
    y:190,
    height: 150,
    hidden:false,
    width: 460,
    columns:
    [
        {header: "ITEM NAME", dataIndex: 'itemname',sortable:true,width:250,align:'left'},
        {header: "ISSUE Qty", dataIndex: 'issueqty',sortable:true,width:100,align:'left'},//0
        {header: "Rtn Qty", dataIndex: 'rtnqty',sortable:true,width:100,align:'left'},//1

    ],
	store : [],
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
        {header: "CHEMICAL NAME", dataIndex: 'itemname',sortable:true,width:250,align:'left'},
        {header: "ISSUE Qty", dataIndex: 'issueqty',sortable:true,width:100,align:'left'},//0
        {header: "Rtn Qty", dataIndex: 'rtnqty',sortable:true,width:100,align:'left'},//1


    ],
	store : [],
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
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 50,
	        	y           : 50,
	            	border      : false,
	        	items: [txtoppulp]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 300,
	        	y           : 50,
	            	border      : false,
	        	items: [txtclspulp]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 50,
	        	y           : 80,
	            	border      : false,
	        	items: [txtbrokeop]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 300,
	        	y           : 80,
	            	border      : false,
	        	items: [txtbrokecls]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 50,
	        	y           : 110,
	            	border      : false,
	        	items: [txtcogenpwr]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 300,
	        	y           : 110,
	            	border      : false,
	        	items: [txtsteam]
	           },
	          { 
	        	xtype       : 'fieldset',
	        	title       : '',
	        	labelWidth  : 110,
	        	width       : 220,
	        	x           : 500,
	        	y           : 110,
	            	border      : false,
	        	items: [txtebpwr]
	           },optrawmttype,flxrawmtdetail,    
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
                                  },tabConsumption	 ,
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
	listeners:{
               show:function(){

	   	
	   	}

		}
    });
    TrnProdnEntry.show();  
});
