Ext.onReady(function(){
Ext.QuickTips.init();
   	var gstFlag;
	var gstday= "D";
var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('stfinid');

var SubGpDataStore = new Ext.data.Store({
      id: 'SubGpDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/StoresPurchase/clsRepStoresPurchase.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbgroup",gincompcode:GinCompcode}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'grp_code', type: 'int', mapping: 'grp_code'},
        {name: 'grp_name', type: 'string', mapping: 'grp_name'}
      ])
    });

var LedgerDataStore = new Ext.data.Store({
      id: 'LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/StoresPurchase/clsRepStoresPurchase.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbledger",gingrpcode:0,gincompcode:GinCompcode}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ])
    });

var cmbledname = new Ext.form.ComboBox({
        id         : 'cmbledname',
        width      : 180,
        store      : LedgerDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Ledger name',
	allowBlank:false,
        tabIndex:18,
	hidden : true  
    });

var cmbgroup = new Ext.form.ComboBox({
        id         : 'cmbgroup',
        width      : 210,
        store      : SubGpDataStore,
        displayField:'grp_name',
        valueField:'grp_code',
        hiddenName:'grp_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Ledger',
	allowBlank:false,
        tabIndex:18,
	hidden : false,
        listeners:{
        select:function(){
	 cmbledname.setRawValue("");
//	 var test = Ext.getCmp('cmbgroup').getValue();
	// var test = this.getValue()	;
	// Ext.Msg.alert(test);
         LedgerDataStore.load({
                      url: '/StoresPurchase/clsRepStoresPurchase.php',
                       params: {
                           task: 'cmbledger',
                           gingrpcode:this.getValue(),
			   gincompcode : GinCompcode
                       }
             });
       }
       }
   });

var asondate = new Ext.form.DateField({
        name        : 'asondate',
        id          : 'asondate',
        fieldLabel  : 'As on Date',
        format      : 'Y-m-d',
        value       : new Date()

    });

   var txtbelow1 = new Ext.form.TextField({
        fieldLabel  : 'Below',
        id          : 'txtbelow1',
        width       : 50,
        name        : 'txtbelow1'
   });

   var txtbelow2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtbelow2',
        width       : 50,
        name        : 'txtbelow2'
   });

   var txtbelow3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtbelow3',
        width       : 50,
        name        : 'txtbelow3'
   });

   var txtbelow4 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtbelow4',
        width       : 50,
        name        : 'txtbelow4'
   });

   var txtabove1 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtabove1',
        width       : 50,
        name        : 'txtabove1'
   });

   var txtabove2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtabove2',
        width       : 50,
        name        : 'txtabove2'
   });

   var txtabove3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtabove3',
        width       : 50,
        name        : 'txtabove3'
   });

   var txtabove4 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtabove4',
        width       : 50,
        name        : 'txtabove4'
   });

var sidno='';
	var sm = new Ext.grid.CheckboxSelectionModel({
	   listeners: {
	       selectionchange: function(sm) {
	       var selected_rows = lstType.getSelectionModel().getSelections();
		     for(var i=0; i<selected_rows.length; i++){
		     sidno=(selected_rows[i].data.id);
		}
		}
	    }
	});

	var fm = Ext.form;
	var lstType = new Ext.grid.EditorGridPanel({
	    frame: false,
	    id : lstType,
	    hideHeaders : true,
	    autoShow: true,
	    stripeRows : true,
	    scrollable: true,
	    editable : true,
	    height: 150,
	    width: 330,
	    x: 240,
	    y: 210,
	    selModel: sm,
	    columns: [sm,
		{header: "id", dataIndex: 'grp_code',sortable:true,width:200,align:'left',hidden : true},
		{header: "Type", dataIndex: 'grp_name',sortable:true,width:320,align:'left',
		editor: new fm.TextField({allowBlank: false})}
	    ],
	    store   : SubGpDataStore
	}); 

   var ReceiptAgeingFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ageing Details',
        header      : false,
        width       : 827,bodyStyle:{"background-color":"#3399CC"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'ReceiptAgeingFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
			var rdreptype=ReceiptAgeingFormPanel.getForm().getValues()['chkreptype'];
			var rdled=ReceiptAgeingFormPanel.getForm().getValues()['optled'];
			if (rdled==="1")
			{
			var v1="%";
			}
			else if (rdled==="2")
			{
			var v1=Ext.getCmp('cmbledname').getValue();
			}
			var v2=Ext.getCmp('cmbgroup').getValue();
			if (GinCompcode==1)
			    var v3 = "KG DENIM LIMITED [VM] - Ageing Analysis";
			else
			    var v3 = "KG DENIM LIMITED [SBM] - Ageing Analysis";
			var v4 = Ext.getCmp('cmbgroup').getRawValue();
			if (gstday==="D")
			{
			var v5 = 30;
			var v6 = 60;
			var v7 = 90;
			var v8 =180;
			}
			else
			{
			var v5 = Ext.getCmp('txtabove1').getRawValue();
			var v6 = Ext.getCmp('txtabove2').getRawValue();
			var v7 = Ext.getCmp('txtabove3').getRawValue();
			var v8 = Ext.getCmp('txtabove4').getRawValue();
			}
			var v9=GinCompcode;
			var v10=GinFinid;

			var d1=Ext.getCmp('asondate').value;			
			var v11 =  d1 + " 00:00:00.000";
			var v12 = Ext.getCmp('cmbledname').getRawValue();

			var p1 = "&group=" + encodeURIComponent(v2);
			var p2 = "&ledger=" + encodeURIComponent(v1);
			var p3 = "&title=" + encodeURIComponent(v3);
			var p4 = "&groupname=" + encodeURIComponent(v4);
			var p5 = "&day1=" + encodeURIComponent(v5);
			var p6 = "&day2=" + encodeURIComponent(v6);
			var p7 = "&day3=" + encodeURIComponent(v7);
			var p8 = "&day4=" + encodeURIComponent(v8);
			var p9 = "&compcode=" + encodeURIComponent(v9);
			var p10 = "&finid=" + encodeURIComponent(v10);
			var p11 = "&asondate=" + encodeURIComponent(v11);
			var p12 = "&voudate=" + encodeURIComponent(v11);
			var p13= "&ledname="+ encodeURIComponent(v12)
			if (rdreptype=="3")
			{
			var parm = (p3+p4+p5+p6+p7+p8+p9+p10+p2+p11+p12+p13);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=stores_purchase/AccRepPurchaseAgeingNewAbs.rptdesign' + parm, '_blank');
			}
			else if (rdreptype=="2")
			{
			var parm = (p1+p2+p3+p4+p9+p10+p2+p11);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=stores_purchase/StoresRepPurchaseAgeingNew.rptdesign' + parm, '_blank');
			}
			else
			{
			var parm = (p3+p4+p5+p6+p7+p8+p9+p10+p2+p11+p12+p13);
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=stores_purchase/AccRepPurchaseAgeingNew.rptdesign' + parm, '_blank');
			}
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
                            ReceiptAgeingWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {
                xtype	: 'fieldset',
                title	: '',
                layout 	: 'hbox',
                height	:50,
                width	:250,
                x	: 20,
                y	:30,
              items: [
            {
                xtype	: 'radiogroup',
		border  :  false,
                x       : 0,
                y       : 20,
 	        labelWidth  : 20,
                columns :  3,
                items: [
                    {boxLabel: 'All', name: 'optacctype', inputValue: 1, checked: true},
                    {boxLabel: 'Debit', name: 'optacctype', inputValue: 2},
                    {boxLabel: 'Credit', name: 'optacctype', inputValue: 3}
 		    ]
            }
        ]
            },
{
                xtype	: 'fieldset',
                title	: 'Ledger Name',
                layout 	: 'hbox',
                height	:60,
                width	:370,
                x	: 20,
                y	:90,
              items: [
            {
                xtype	: 'radiogroup',
		border  :  false,
                x       : 50,
                y       : 150,
 	        labelWidth  : 20,
                columns :  5,
                items: [
                    {boxLabel: 'All', name: 'optled', inputValue: 1, checked: true,listeners: {
                change: function (cb, nv, ov) {
                    if (nv) Ext.getCmp('cmbledname').setVisible(false);
                }
            }},
                    {boxLabel: 'Selective', name: 'optled', inputValue: 2,listeners: {
                change: function (cb, nv, ov) {
                    if (nv) Ext.getCmp('cmbledname').setVisible(true);
                }
            }}
		    
 		    ]
            }
 	

	 ]
            },
{ 
		xtype       : 'fieldset',
                title       : '',
                width       :220,
                border      : false,
                labelWidth  : 10,
		x:180,
		y:100,
                items: [cmbledname]
           },

 {
                xtype	: 'fieldset',
                title	: 'Days Option',
                layout 	: 'hbox',
                height	:60,
                width	:200,
                x	: 400,
                y	: 90,
              items: [
            {
                xtype	: 'radiogroup',
		border  :  false,
                x       : 0,
                y       : 20,
 	        labelWidth  : 20,
                columns :  2,
                items: [
                    {boxLabel: 'Default', name: 'optdaytype', inputValue: 1, checked: true,
                listeners:{
                'check':function(rb,checked){
                 if(checked==true){
                   gstday="D";
                   //  TypeDataStore.removeAll();
                    
                 }
                }
                }},
                    {boxLabel: 'Selected', name: 'optdaytype', inputValue: 2,
                listeners:{
                'check':function(rb,checked){
                 if(checked==true){
                   gstday="S";
                   //  TypeDataStore.removeAll();
                    
                 }
                }
                }}
 		    ]
            }
        ]
            },
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 20,
                y           : 160,
                border      : false,
                labelWidth  : 60,
                items: [asondate]
                
            	},
 {
                xtype	: 'fieldset',
                title	: '',
                layout 	: 'hbox',
                height	:50,
                width	:340,
                x	: 280,
                y	:30,
              items: [
            {
                xtype	: 'checkboxgroup',
		border  :  false,
                x       : 0,
                y       : 20,
 	        labelWidth  : 20,
                columns :  3,
                items: [
                    {boxLabel: 'First in First Out', name: 'chkreptype', inputValue: 1, checked: true},
                    {boxLabel: 'Statement', name: 'chkreptype', inputValue: 2},
                    {boxLabel: 'Abstract', name: 'chkreptype', inputValue: 3}
 		    ]
            }
        ]
            },
	    {
                xtype	: 'fieldset',
                title	: '',
                layout 	: 'hbox',
                height	:220,
                width	:370,
                x	: 230,
                y	:160,
              items: [
            {
                xtype	: 'radiogroup',
		border  :  false,
		width   : 300,
                x       : 0,
                y       : 20,
 	        labelWidth  : 20,
                columns :  2,
                items: [
                    {boxLabel: 'Single Selection', name: 'optseltype', inputValue: 1, checked: true,
                 listeners:{
                'check':function(rb,checked){
                 if(checked==true){
			cmbgroup.show();
			lstType.hide();
			// var gintype="S";
                   SubGpDataStore.load({
                       url: '/StoresPurchase/clsRepStoresPurchase.php',
                       params: {
                           task: "cmbgroup",
			    gincompcode:GinCompcode
                       }
                    });
                  
                 }
                }
                }},
                    {boxLabel: 'Multi Selection', name: 'optseltype', inputValue: 2,
                 listeners:{
                'check':function(rb,checked){
                 if(checked==true){
			cmbgroup.hide();
			lstType.show();
			// var gintype="S";
                   SubGpDataStore.load({
                       url: '/StoresPurchase/clsRepStoresPurchase.php',
                       params: {
                           task: "cmbgroup",
			   gincompcode: GinCompcode
                       }
                    });
                  
                 }
                }
                }}
 		    ]
            }
        ]
            },
	{ 
		xtype       : 'fieldset',
                title       : '',
                width       :350,
                border      : false,
                labelWidth  : 10,
		x:220,
		y:190,
                items: [cmbgroup]
           },lstType,
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 20,
                y           : 200,
                border      : false,
                labelWidth  : 40,
		hidden	    : true,
                items: [txtbelow1]
                
            	},
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 20,
                y           : 230,
                border      : false,
                labelWidth  : 40,
		hidden	    : true,
                items: [txtbelow2]
                
            	},
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 20,
                y           : 260,
                border      : false,
                labelWidth  : 40,
		hidden	    : true,
                items: [txtbelow3]
                
            	},
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 20,
                y           : 290,
                border      : false,
                labelWidth  : 40,
		hidden	    : true,
                items: [txtbelow4]
                
            	},
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 30,
                y           : 200,
                border      : false,
                items: [txtabove1]
                },
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 30,
                y           : 230,
                border      : false,
                items: [txtabove2]
                },
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 30,
                y           : 260,
                border      : false,
                items: [txtabove3]
                },
{
               xtype     : 'fieldset',
                title       : '',
                width       : 200,
                x           : 30,
                y           : 290,
                border      : false,
                items: [txtabove4]
                }
        ]
    });
    
    function RefreshData(){
        gstFlag = "Add";
    };
    
    var ReceiptAgeingWindow = new Ext.Window({
	height      : 480,
bodyStyle:{"background-color":"#3399CC"},
        width       : 640,
        y           : 90,
        title       : 'Ageing Details',
        items       : ReceiptAgeingFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners:
            {
		show:function(){
SubGpDataStore.load({
                      url: '/StoresPurchase/clsRepStoresPurchase.php',
                       params: {
                           task: 'cmbgroup'
                       }
                    });

         LedgerDataStore.load({
                      url: '/StoresPurchase/clsRepStoresPurchase.php',
                       params: {
                           task: 'cmbledger',
                           gingrpcode:cmbgroup.getValue(),
			   gincompcode : GinCompcode
                       }
             });
		cmbgroup.show();
		lstType.hide();
	   }
}
    });
    ReceiptAgeingWindow.show();  
});
