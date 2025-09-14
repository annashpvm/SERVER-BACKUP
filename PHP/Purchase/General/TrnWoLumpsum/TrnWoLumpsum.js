Ext.onReady(function(){
Ext.QuickTips.init();
    var GinFinid =localStorage.getItem('tfinid');
   var Gincompcode = localStorage.getItem('tcompcode');
 
var loadwonoDataStore= new Ext.data.Store({
  id: 'loadwonoDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwono"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'woseqno','wono'
  ])
});

var DEPTDataStore = new Ext.data.Store({
  id: 'DEPTDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaddept"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    {name: 'dept_code', type: 'int', mapping: 'dept_code'},
    {name: 'dept_name', type: 'string', mapping: 'dept_name'}
  ])
});

var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'sup_code','sup_refname'
  ])
});

var WorkorderDataStore = new Ext.data.Store({
  id: 'WorkorderDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadwo"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'wo_no','wo_name'
  ])
});

var PaytermDataStore = new Ext.data.Store({
  id: 'PaytermDataStore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsWo.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadpayterm"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'term_code','term_name'
  ])
});
 
   var payterm_combo = new Ext.form.ComboBox({
        id: 'payterm_combo',
        store: PaytermDataStore,
        displayField: 'term_name',
        valueField: 'term_code',
        hiddenName : 'term_name',
        typeAhead: true,
        mode: 'remote',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Payment Terms',
        editable:false,
        emptyText:'Select Payment Terms',
        blankText:'Select Payment Terms',
        width: 200
 });

	var dept_combo = new Ext.form.ComboBox({
        id: 'dept_combo',
        store: DEPTDataStore,
        displayField: 'dept_name',
        valueField: 'dept_code',
        hiddenName : 'dept_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:false,
        width: 250
      });

 
      
       var woname_combo = new Ext.form.ComboBox({
        id: 'woname_combo',
        store: WorkorderDataStore,
        displayField: 'wo_name',
        valueField: 'wo_no',
        hiddenName : 'wo_name',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'',
        editable:false,
        width: 250
     
      });
      
         var wono_combo = new Ext.form.ComboBox({
        id: 'wono_combo',
       store: loadwonoDataStore,
        displayField: 'wono',
        valueField: 'woseqno',
        hiddenName : 'wono',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'',
        editable:false,
        width: 100
     
      });
      
var partyname = new Ext.form.ComboBox({
        id: 'partyname',
        store: VendorDataStore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'remote',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
//      allowBlank: false,
        editable:false,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 250
           
      });

  var date1 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
    
    
  var date2 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
 
    
 
 
  var date5 = new Ext.form.DateField
    ({
       fieldLabel : 'WO Date',
       name        : 'wodate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
       editable    : false
    });
 

    var fieldset1 = {
        xtype        : 'fieldset',
        title        : '',
        width        :300,
        flex         : 1,
        border       : false,
        labelWidth : 75,
        defaultType : 'field',
        defaults     : {
           

        },
        items : [
        {
            xtype : 'textfield',
            fieldLabel : 'Receipt No',
            name       : 'wrw',
            readOnly   : false,
            width : 80
        },date1
     
        ]
    }

 
 

var fieldset3 = {
        xtype        : 'fieldset',
        title        : '',
        flex         : 1,
        border       : false,
        labelWidth : 90,
        defaultType : 'field',
        defaults     : {
 
        },
        items : [
      partyname,dept_combo,
        {
            xtype : 'textfield',
            fieldLabel : 'Bill No',
            name       : 'txtbill',
            readOnly   : true,
            width : 200
        },date2
         
    
        ]
    }


var fieldsetContainer = {
        xtype         : 'container',
        layout        : 'hbox',
        height        : 165,
        items : [
        fieldset1,
        fieldset3
        ]
    }

 
var cgstamt = new Ext.form.TextField({id : 'cgstamt1' ,x:210, y:42,width:60
});

 var sgstamt = new Ext.form.TextField({id : 'sgstamt1' ,x:210, y:70,width:60
});

 var igstamt = new Ext.form.TextField({id : 'igstamt1' ,x:210, y:95,width:60
});

var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Work Order GRN - LUMPSUM',
        style        : 'margin: 5px ',
        height       : 580,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'myFormPanel',
        layout       : 'absolute',
	reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[
                     {},
                  ]),
        items        : [
        fieldsetContainer,
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 70,
                    labelWidth:65,
                    width: 750,
                    x: 5,
                    y: 90,
                    items: [
                        wono_combo,date5
                    ]
                },
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:70,
                    width: 350,
                    x: 200, 
                    y: 105,
                    items: [
                            woname_combo
                    ]
                },
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:35,
                    width: 205,
                    x: 550, 
                    y: 105,
                    items: [
                           
                    ]
                },
                
            {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 325,
            width: 900,
            x: 10,
            y: 160,
            items: [
           
            {
                xtype: 'panel',
                title: 'Amount Details',
                width: 383,
                height: 200,
                layout: 'absolute',
                items: [
                
                {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 125,
                    labelWidth:130,
                    width: 576,
                    x: 5,
                    y: 5,
                    items: [
                         
                        {
                          xtype: 'textfield',
                          fieldLabel: 'Value of Order',
                          width:100,
                          name: 'txtvalord',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'CGST % & Amount',
                          width:50,
                          name: 'txtcgst3',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'SGST % & Amount',
                          width:50,
                          name: 'txtsgst3',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'IGST % & Amount',
                          width:50,
                          name: 'txtigst3',
                         }
                         
                    ]
                },cgstamt,sgstamt,igstamt,
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 125,
                    labelWidth:130,
                    width: 260,
                    x: 320,
                    y: 5,
                    items: [
                         
                        {
                          xtype: 'textfield',
                          fieldLabel: 'Discount',
                          width:50,
                          name: 'txtdiscnt',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'Other Chargres',
                          width:50,
                          name: 'txtche2',
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'Total Amount',
                          width:100,
                          name: 'txttotamt',
                         }
                        
                    ]
                }
                
                
                
                ]
            },
            {
                xtype: 'panel',
                title: 'Other Terms',
                width: 200,
                height: 300,
                layout: 'absolute',
                items: [
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 250,
                    width: 350,
                    x: 0,  
                    y: 5,
                    items: [
                          {
                    xtype: 'textfield',
                    fieldLabel: 'Price',
                    width:150,
                    name: 'txtprice',
                    
                },payterm_combo,
                  {
                    xtype: 'textfield',
                    fieldLabel: 'Credit Days',
                    width:150,
                    name: 'credidays',
                    
                },
                 {
                    xtype: 'textarea',
                    fieldLabel: 'Remarks',
                    width:150,
                    name: 'wotexzt',
                    
                },
                    ]
                }
                 
                ]
            }
            ]
        }
       
          
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 45,
            items: [
                {
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png'
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png'
                    
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png'
                    
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png'
                    
                }
           ]
        }
    });

var window_form = new Ext.Window({
                         width        : 945,         //1340,
                         height       : 590,
                         items        : myFormPanel,
                         closable:false,
                         resizable:false,
                         draggable:false,
                         x:150,
                         y:35,
			 listeners:
			 {
		        show:function(){
			DEPTDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loaddept'
        	        }
        		    });
			
			VendorDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadsupplier'
        	        }
        		    });

			PaytermDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadpayterm'
        	        }
        		    });

			WorkorderDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadwo'
        	        }
        		    });

			loadwonoDataStore.load({
	                url: 'ClsWo.php',
        	        params: {
        	            task: 'loadwono'
        	        }
        		    });

			}
			}
	});
  window_form.show();
  
});
