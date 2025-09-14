Ext.onReady(function(){
Ext.QuickTips.init();

var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');
var gstyear =localStorage.getItem('gstyear');
var gstFlag = "Add";
var seccode = 0;
var secname;
var editrow = 0;
var gridedit = "false";
var gstStatus = "N";
//var gstGroup;
var viewopt = 0; 
var partycode = 0;
var poyear =0;
var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dept_code', 'dept_name'
      ]),
      sortInfo: {field: 'dept_name', direction: "ASC"}
    }); 


 var loadindentDataStore = new Ext.data.Store({
      id: 'loadindentDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindent"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ind_no','ind_fin_code'
      ]),
    });


 var loadindentDetailDataStore = new Ext.data.Store({
      id: 'loadindentDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindentdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','ind_qty','ind_rate','ind_due_date'
      ]),
    });
    
 var loadPODetailDataStore = new Ext.data.Store({
      id: 'loadPODetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpodet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','sup_refname','phd_pono','phd_podate','ptr_ord_qty','ptr_unit_rate','phd_sup_code','phd_fin_code'
      ]),
    });    



 var loadGRNDetailDataStore = new Ext.data.Store({
      id: 'loadGRNDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGRNdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','sup_refname','minh_minno','minh_mindate','mint_rcvd_qty'
      ]),
    });  


 var loadIssueDetailDataStore = new Ext.data.Store({
      id: 'loadIssueDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFrmRepIndentStatus.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIssuedetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','iss_no','iss_date','iss_qty'
      ]),
    });  

var cmbdept = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width       	 :  200,
        displayField    : 'dept_name', 
        valueField      : 'dept_code',
        hiddenName      : '',
        id              : 'cmbdept',
        typeAhead       : true,
        mode            : 'local',
        store           : LoadDeptDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                        var j=0;   
                        loadindentDataStore.removeAll();
			loadindentDataStore.load({
                        url: 'ClsFrmRepIndentStatus.php',
                        params:
                            {
                                task:"loadindent",
                                compcode:Gincompcode,
				finid:txtindyr.getValue(),
				deptcode:cmbdept.getValue(),
				procurstk: procur_stk 
                            },
				callback:function(){

                                }
                        });         

	}
	}
});

var txtindyr = new Ext.form.NumberField({
        fieldLabel  : 'Year',
        id          : 'txtindyr',
        width       : 40,
        name        : 'txtindyr',
    	disabled    : true,
        enableKeyEvents: true,
});

var cmbindno = new Ext.form.ComboBox({
        fieldLabel      : 'INDENT NO',
        width       	 :  80,
        displayField    : 'ind_no', 
        valueField      : 'ind_no',
        hiddenName      : '',
        id              : 'cmbindno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadindentDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

		//INDENT DETAILS  
               loadindentDetailDataStore.removeAll();
		loadindentDetailDataStore.load({
                url: 'ClsFrmRepIndentStatus.php',
                params:
                    {
                        task:"loadindentdet",
                        compcode:Gincompcode,
			finid:txtindyr.getValue(),
			deptcode:cmbdept.getValue(),
                        indno  : cmbindno.getValue() 
                    },
			callback:function(){
			var a = loadindentDetailDataStore.getCount();
     			var cnt = loadindentDataStore.getCount();
	                flxinddetail.getStore().removeAll();
	        	for(j=0; j<cnt; j++)
			{ 
	                              var RowCnt = flxinddetail.getStore().getCount() + 1;  
	                              flxinddetail.getStore().insert(
	                                  flxinddetail.getStore().getCount(),
	                                  new dgrecord({
	                                    itemdescrip :loadindentDetailDataStore.getAt(j).get('item_name'),
	                                    indqty:loadindentDetailDataStore.getAt(j).get('ind_qty'),
	                               	    indrate:loadindentDetailDataStore.getAt(j).get('ind_rate'),
	                               	    duedate:loadindentDetailDataStore.getAt(j).get('ind_due_date'),

	                                  })
	                              );
                                      flxinddetail.getSelectionModel().clearSelections();	
	                           
		        }
	
	        	}
                });       
		//PO DETAILS                        
               loadPODetailDataStore.removeAll();
		loadPODetailDataStore.load({
                url: 'ClsFrmRepIndentStatus.php',
                params:
                    {
                        task:"loadpodet",
                        compcode:Gincompcode,
			finid:txtindyr.getValue(),
			deptcode:cmbdept.getValue(),
                        indno  : cmbindno.getValue() 
                    },
			callback:function(){
			var a = loadPODetailDataStore.getCount();
     			var cnt = loadPODetailDataStore.getCount();
	                flxpodetail.getStore().removeAll();
                        partycode =  loadPODetailDataStore.getAt(0).get('phd_sup_code');
                        poyear    =  loadPODetailDataStore.getAt(0).get('phd_fin_code');
	        	for(j=0; j<cnt; j++)
			{ 
	                              var RowCnt = flxpodetail.getStore().getCount() + 1;  
	                              flxpodetail.getStore().insert(
	                                  flxpodetail.getStore().getCount(),
	                                  new dgrecord({
	                                    itemdescrip :loadPODetailDataStore.getAt(j).get('item_name'),
	                                    supplier :loadPODetailDataStore.getAt(j).get('sup_refname'),
	                                    po_no :loadPODetailDataStore.getAt(j).get('phd_pono'),
	                                    po_qty:loadPODetailDataStore.getAt(j).get('ptr_ord_qty'),
	                               	    po_rate:loadPODetailDataStore.getAt(j).get('ptr_unit_rate'),
	                               	    po_date:loadPODetailDataStore.getAt(j).get('phd_podate'),
	                                  })
	                              );
                                      flxpodetail.getSelectionModel().clearSelections();	
	                           
		        }
	
	        	}
                });                          
                      

		//Issue DETAILS                        
               loadIssueDetailDataStore.removeAll();
		loadIssueDetailDataStore.load({
                url: 'ClsFrmRepIndentStatus.php',
                params:
                    {
                        task:"loadIssuedetails",
                        compcode : Gincompcode,
			finid    : txtindyr.getValue(),
                        indno    : cmbindno.getValue() 
                    },
			callback:function(){
			var a = loadIssueDetailDataStore.getCount();
     			var cnt = loadIssueDetailDataStore.getCount();
	                flxissuedetail.getStore().removeAll();
                  
	        	for(j=0; j<cnt; j++)
			{ 
	                              var RowCnt = flxissuedetail.getStore().getCount() + 1;  
	                              flxissuedetail.getStore().insert(
	                                  flxissuedetail.getStore().getCount(),
	                                  new dgrecord({
	                                    itemdescrip : loadIssueDetailDataStore.getAt(j).get('item_name'),
	                                    issno       : loadIssueDetailDataStore.getAt(j).get('iss_no'),
	                                    issqty      : loadIssueDetailDataStore.getAt(j).get('iss_qty'),
	                               	    issdate     : loadIssueDetailDataStore.getAt(j).get('iss_date'),
	                                  })
	                              );

	                           
		        }
	


		//GRN DETAILS                        
                loadGRNDetailDataStore.removeAll();
		loadGRNDetailDataStore.load({
                url: 'ClsFrmRepIndentStatus.php',
                params:
                    {
                        task:"loadGRNdetails",
                        compcode : Gincompcode,
			indfinid : txtindyr.getValue(),
			finid    : poyear,
			supcode  : partycode,
                        indno    : cmbindno.getValue() 
                    },
			callback:function(){
			var a = loadGRNDetailDataStore.getCount();
     			var cnt = loadGRNDetailDataStore.getCount();
	                flxgrndetail.getStore().removeAll();
                  
	        	for(j=0; j<cnt; j++)
			{ 
	                              var RowCnt = flxgrndetail.getStore().getCount() + 1;  
	                              flxgrndetail.getStore().insert(
	                                  flxgrndetail.getStore().getCount(),
	                                  new dgrecord({
	                                    itemdescrip : loadGRNDetailDataStore.getAt(j).get('item_name'),
	                                    supplier    : loadGRNDetailDataStore.getAt(j).get('sup_refname'),
	                                    grnno       : loadGRNDetailDataStore.getAt(j).get('minh_minno'),
	                                    grnqty      : loadGRNDetailDataStore.getAt(j).get('mint_rcvd_qty'),
	                               	    grndate     : loadGRNDetailDataStore.getAt(j).get('minh_mindate'),
	                                  })
	                              );

       
		        }
	
	        	}
                });    
	        	}
                });                          



	}
	}
});
var txtindyr = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtindyr',
        width       : 50,
        name        : 'txtindyr',
    
        enableKeyEvents: true,
});

/*

      var cmbmachine = new Ext.form.ComboBox({
        fieldLabel      : 'Machine',
        width           : 130,
        displayField    : 'machine',
        valueField      : 'machine',
        hiddenName      : 'machine',
        id              : 'cmbmachine',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
	store		: ['DIP','PM1','PM2','PM3','COGEN','VJPM','GENERAL','A4'],
        listeners:{
        select:function(){
        }
    }
});



    var cmbsection = new Ext.form.ComboBox({
        fieldLabel      : 'Group / Seciton',
        width           : 300,
        id              : 'cmbsection',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
        displayField    : 'section_name',
        valueField      : 'section_code',
        hiddenName      : 'section_name',
	store		: sectionDataStore,
    listeners:{
        select:function(){

        }
    }
});


  
     var cmbequipment = new Ext.form.ComboBox({
        fieldLabel      : 'Equipment',
        width           : 300,
        id              : 'cmbequipment',
        typeAhead       : true,
	displayField    : 'equip_name',
        valueField      : 'equip_code',
        hiddenName      : 'equip_name',
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
	store		: EquipmentDatastore ,
        listeners:{
        select: function(){

       }
    } 

   });
*/

var opt_year = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Ind Year',
    fieldLabel: '',
    layout : 'vbox',
    defaultType : 'textfield',
    width:250,
    height:80,
    x:-10,
    y:0,
    border: true,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  true,
                	
                	columns :  2,
                        id      : 'opt_year',
                	items: [
                    	{boxLabel: 'Cur.Yr', name: 'opt_year',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                          	       	txtindyr.setValue(GinFinid);
                          	       	Ext.getCmp('txtindyr').setDisabled(true);
                      		}
                        }
                        }},
                        {boxLabel: 'Pre.Yr', name: 'opt_year', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  txtindyr.setValue(GinFinid-1);
                                  Ext.getCmp('txtindyr').setDisabled(false);

			         }
                            }
                         }}, 
                        ],
                  },{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 10,
			width       : 100,
			x           : 0,
			y           : -10,
			border      : false,
			items: [txtindyr]
		}, 
           ]

});


var opt_ind_all_pend = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Indent Pending or All',
    fieldLabel: '',
    layout : 'vbox',
    defaultType : 'textfield',
    width:250,
    height:60,
    x:700,
    y:0,
    border: true,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  true,
                	x       : 100,          
                	y       : -30,
                       // border: true,
			//layout : 'hbox',
                	columns :  3,
                        id      : 'opt_ind_all_pend',
                	items: [
                    	{boxLabel: 'Pendings', name: 'opt_ind_all_pend',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                          	       	
                      		}
                        }
                        }},
                        {boxLabel: 'Period', name: 'opt_ind_all_pend', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  

			         }
                            }
                         }},
                        {boxLabel: 'All', name: 'opt_ind_all_pend', inputValue: '3',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                                  
			         }
                            }
                         }},
                        ],
                  }
           ]

});

var procur_stk = "P";
var opt_procur_stk = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'INDENT TYPE',
    fieldLabel: '',
    layout : 'vbox',
    defaultType : 'textfield',
    width:200,
    height:90,
    x:980,
    y:120,
    border: true,
    items: [

                  {
                        xtype	: 'radiogroup',
			border  :  true,
                	x       : 50,          
                	y       : -30,
                       // border: true,
			//layout : 'hbox',
                	columns :  1,
                        id      : 'opt_procur_stk',
                	items: [
                    	{boxLabel: 'PROCUREMENT', name: 'opt_procur_stk',inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
                             	procur_stk ="P";
                        loadindentDataStore.removeAll();
			loadindentDataStore.load({
                        url: 'ClsFrmRepIndentStatus.php',
                        params:
                            {
                                task:"loadindent",
                                compcode:Gincompcode,
				finid:txtindyr.getValue(),
				deptcode:cmbdept.getValue(),
				procurstk: procur_stk 
                            },
				callback:function(){

                                }
                        });                              	
                          	       	//txtindyr.setValue(GinFinid);
                      		}
                        }
                        }},
                        {boxLabel: 'STOCK', name: 'opt_procur_stk', inputValue: '2',checked : false , listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
                              	procur_stk ="S";
                        loadindentDataStore.removeAll();
			loadindentDataStore.load({
                        url: 'ClsFrmRepIndentStatus.php',
                        params:
                            {
                                task:"loadindent",
                                compcode:Gincompcode,
				finid:txtindyr.getValue(),
				deptcode:cmbdept.getValue(),
				procurstk: procur_stk 
                            },
				callback:function(){

                                }
                        });                               	
                                  //txtindyr.setValue(GinFinid-1);

			         }
                            }
                         }},
                        ],
                  }
           ]

});

var fmdate = new Ext.form.DateField({
        name        : 'fmdate',
        id          : 'fmdate',
        fieldLabel  : 'From Date',
        format      : 'Y-m-d',
        value       : new Date()

    });

var todate = new Ext.form.DateField({
        name        : 'todate',
        id          : 'todate',
        fieldLabel  : 'To Date',
        format      : 'Y-m-d',
        value       : new Date()

    });

var dgrecord = Ext.data.Record.create([]);
var flxinddetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 860,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Item Description", dataIndex: 'itemdescrip',sortable:true,width:350,align:'left'}, //hidden:'true'},      
            {header: "Ind Qty", dataIndex: 'indqty',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "Ind Rate", dataIndex: 'indrate',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "Due Date", dataIndex: 'duedate',sortable:true,width:100,align:'left'}, //hidden:'true'},   

        ],
store:[''], //loadsalledgerlistdatastore,

    

   });    

var dgrecord = Ext.data.Record.create([]);
var flxpodetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 75,
        width: 860,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Item Description", dataIndex: 'itemdescrip',sortable:true,width:350,align:'left'}, //hidden:'true'},      
            {header: "Supplier", dataIndex: 'supplier',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "PO NO", dataIndex: 'po_no',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "PO Date", dataIndex: 'po_date',sortable:true,width:100,align:'left'}, //hidden:'true'},   
            {header: "PO Qty", dataIndex: 'po_qty',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "PO Rate", dataIndex: 'po_rate',sortable:true,width:100,align:'left'}, //hidden:'true'},
        ],
store:[''], //loadsalledgerlistdatastore,

    

   });
   
var dgrecord = Ext.data.Record.create([]);
var flxgrndetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 75,
        width: 860,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Item Description", dataIndex: 'itemdescrip',sortable:true,width:350,align:'left'}, //hidden:'true'},      
            {header: "Supplier", dataIndex: 'supplier',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "GRN No", dataIndex: 'grnno',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "GRN Date", dataIndex: 'grndate',sortable:true,width:100,align:'left'}, //hidden:'true'},   
            {header: "GRN qty", dataIndex: 'grnqty',sortable:true,width:100,align:'left'}, //hidden:'true'},  
        ],
store:[''], //loadsalledgerlistdatastore,

    

   });   
   
var dgrecord = Ext.data.Record.create([]);
var flxissuedetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 75,
        width: 860,
        x: 0,
        y: 0,        
        columns: [   
            {header: "Item Description", dataIndex: 'itemdescrip',sortable:true,width:350,align:'left'}, //hidden:'true'},      
            {header: "Iss No", dataIndex: 'issno',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "Iss Date", dataIndex: 'issdate',sortable:true,width:100,align:'left'}, //hidden:'true'},      
            {header: "Iss Qty", dataIndex: 'issqty',sortable:true,width:100,align:'left'}, //hidden:'true'},   

        ],
store:[''], //loadsalledgerlistdatastore,

   });  

   var FrmRepIndentStatusFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : -10,
        frame       : false,
        id          : 'FrmRepIndentStatusFormpanel',
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
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
//EDIT
                       click: function () {
                           gstFlag = "Edit";
                           Ext.getCmp('txtissno').setReadOnly(false);
                           txtissno.setValue();   
                           viewopt = 1;
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
                    handler: function(){	
                           FrmRepIndentStatusWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : false,
                height  : 600,
                width   : 1200,
		//style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[

		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 400,
			x           : 420,
			y           : -10,
			border      : false,
			items: [opt_year	        
				/*{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 10,
					width       : 100,
					x           : 0,
					y           : -25,
					border      : false,
					items: [txtindyr]
				}, */
	       	 ]
		},opt_ind_all_pend,opt_procur_stk, 
	        { 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 320,
			x           : 10,
			y           : 0,
			border      : false,
			items: [cmbdept]
	        }, 
	        { 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 200,
			x           : 10,
			y           : 40,
			border      : false,
			items: [cmbindno]
	        },
	        { 
			xtype   : 'fieldset',
			title   : 'DATE',
//			layout  : 'hbox',
			border  : true,
			height  : 100,
			width   : 200,
			layout  : 'absolute',
			x       : 980,
			y       : 0,
			items:[

		{ 
			xtype       : 'fieldset',
			title       : '',
			width       : 230,
			x           : -10,
			y           : -10,
			border      : false,
			labelWidth  : 65,
			items: [fmdate]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			width       : 300,
			x           : -10,
			y           : 30,
			border      : false,
			labelWidth  : 65,
			items: [todate]
		},

			]
		},		
		{ 
			xtype   : 'fieldset',
			title   : 'INDENT DETAILS',
			layout  : 'hbox',
			border  : false,
			height  : 120,
			width   : 885,
			//style:{ border:'1px solid red',color:' #581845 '},
			layout  : 'absolute',
			x       : 15,
			y       : 80 ,
			items:[
				flxinddetail,
			]
		},		
		{ 
			xtype   : 'fieldset',
			title   : 'PO DETAILS',
			layout  : 'hbox',
			border  : false,
			height  : 110,
			width   : 885,
			//style:{ border:'1px solid red',color:' #581845 '},
			layout  : 'absolute',
			x       : 15,
			y       : 200,
			items:[
				flxpodetail,
			]
		},		
		{ 
			xtype   : 'fieldset',
			title   : 'GRN DETAILS',
			layout  : 'hbox',
			border  : false,
			height  : 110,
			width   : 885,
			//style:{ border:'1px solid red',color:' #581845 '},
			layout  : 'absolute',
			x       : 15,
			y       : 320,
			items:[
				flxgrndetail,
			]
		},		
		{ 
			xtype   : 'fieldset',
			title   : 'ISSUE DETAILS',
			layout  : 'hbox',
			border  : false,
			height  : 110,
			width   : 885,
			//style:{ border:'1px solid red',color:' #581845 '},
			layout  : 'absolute',
			x       : 15,
			y       : 420,
			items:[
				flxissuedetail,
			]
		},
			
		]

		}
            
        ]
    });
    
function RefreshData() {
       txtindyr.setValue(GinFinid);
	LoadDeptDatastore.load({
	url: 'ClsFrmRepIndentStatus.php',
	params: {
	    task: 'loaddept'
	}
    	});
}
   
    var FrmRepIndentStatusWindow = new Ext.Window({
	height      : 615,
        width       : 1300,
        y           : 30,
        title       : 'INDENT STATUS VIEW',
        items       : FrmRepIndentStatusFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":" #b3ffd7"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
	   	RefreshData();
	   	Ext.getCmp('txtindyr').setDisabled(true);
	   	 	 },
			
		}
   });
    FrmRepIndentStatusWindow.show();  
});
