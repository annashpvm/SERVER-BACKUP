Ext.onReady(function(){
   Ext.QuickTips.init();
   	var gstFlag;
	var gstday= "D";
var GinCompcode = localStorage.getItem('acccompcode');
var GinFinid = localStorage.getItem('accfinid');
var vouno;
var voudate;
var invno;
var invdate;
var debit;
var credit;
var refseq;
var  ledcode=" ";
var ledgercode="";

function Left(str, n){
        if (n <= 0)
            return "";
        else if (n > String(str).length)
            return str;
        else
            return String(str).substring(0,n);
    }

var GroupDataStore = new Ext.data.Store({
      id: 'GroupDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "recagegrp",gincompcode:GinCompcode}, // this parameter asks for listing
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
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "cmbsalregledname",grpcode:0,compcode:GinCompcode}, // this parameter asks for listing
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

var ReceiptAgeingDataStore = new Ext.data.Store({
      id: 'ReceiptAgeingDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "recagedet",flag:'D'}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['accref_vouno','accref_voudate','acctrail_inv_no','acctrail_inv_date','acctran_dbamt','acctran_cramt','accref_seqno'])
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
        store      : GroupDataStore,
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
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'cmbsalregledname',
                           grpcode:this.getValue(),
			   compcode : GinCompcode
                       },
			callback: function(){
		           var cnt=LedgerDataStore.getCount();
			ledcode = "";
//			ledcode=LedgerDataStore.getAt(0).get('led_code');
			//Ext.Msg.alert(ledcode);
                    	if(cnt>0){
			for(var i=0;i<cnt;i++)
			{
		            ledcode=ledcode+','+LedgerDataStore.getAt(i).get('led_code');
		        }
			ledgercode = Ext.util.Format.substr(ledcode,1);
                    }
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
        submitFormat: 'Y-m-d',
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
	    store   : GroupDataStore
	}); 

   var PurchaseAgeingFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ageing',
        header      : false,
        width       : 827,bodyStyle:{"background-color":"#3399CC"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'PurchaseAgeingFormPanel',
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
			var rdled=PurchaseAgeingFormPanel.getForm().getValues()['optled'];
			if (rdled =="1")
			var v1='%';
			else
			var v1=Ext.getCmp('cmbledname').getRawValue();
 			var dt = Ext.getCmp('asondate').value;
		     	var v2 =  dt + " 00:00:00.000";
			var v3=Ext.getCmp('cmbgroup').getRawValue();
			var v4=Ext.getCmp('cmbgroup').getValue();
			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&ledcode=" + encodeURIComponent(v1);
			var p4 = "&voudate=" + encodeURIComponent(v2);
			var p5= "&grpname="+ encodeURIComponent(v3)
			var p6= "&grpcode="+ encodeURIComponent(v4)
			var parm = (p1+p2+p3+p4+p5+p6);
			var rdtype=PurchaseAgeingFormPanel.getForm().getValues()['chkreptype'];
			if (rdtype=="2")
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptAgeingAbs.rptdesign' + parm, '_blank');
			else
window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/AccRepReceiptAgeingVm.rptdesign' + parm, '_blank');
			
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
                            PurchaseAgeingWindow.hide();
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
                y	:20,
              items: [
            {
                xtype	: 'checkboxgroup',
		border  :  false,
                x       : 0,
                y       : 20,
 	        labelWidth  : 20,
                columns :  2,
                items: [
                    {boxLabel: 'First in First Out', name: 'chkreptype', inputValue: 1, checked: true},
                    {boxLabel: 'Abstract', name: 'chkreptype', inputValue: 2}
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
                   GroupDataStore.load({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: "recagegrp",
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
                   GroupDataStore.load({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: "recagegrp",
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
    
    var PurchaseAgeingWindow = new Ext.Window({
	height      : 480,
bodyStyle:{"background-color":"#3399CC"},
        width       : 640,
        y           : 90,
        title       : 'Ageing',
        items       : PurchaseAgeingFormPanel,
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
		GroupDataStore.load
                      ({
                       url: '/SHVPM/Financials/clsRepFinancials.php',
                       params:
                          {
                             task:"recagegrp",
			     gincompcode:GinCompcode
                           }
                     });

         LedgerDataStore.load({
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'cmbsalregledname',
                           grpcode:cmbgroup.getValue(),
			   compcode : GinCompcode
                       }
             });
		cmbgroup.show();
		lstType.hide();
	   }
}
    });
    PurchaseAgeingWindow.show();  
});
