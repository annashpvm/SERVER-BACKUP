Ext.onReady(function(){
Ext.QuickTips.init();

 

        var addbtn = new Ext.Button({
                text: '',
                width: 30,
                tooltip:'Click To Update',
                icon:'../icons/download.gif',
             
        })
 
 
var store = new Ext.data.Store({
     
    });

 
    
    var payterm_combo = new Ext.form.ComboBox({
        id: 'paytermCombo',
        store: store,
 
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

var store3 = new Ext.data.Store({
      
    });
    
    

var dept_combo = new Ext.form.ComboBox({
        id: 'dept',
        store: store3,
 
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:false,
        width: 140
       
      });

 var carrier_combo = new Ext.form.ComboBox({
        id: 'carriCombo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Carrier',
        editable:false,
        width: 150
     
      });
      
       var woname_combo = new Ext.form.ComboBox({
        id: 'wonameCombo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'WO Name',
        editable:false,
        width: 250
     
      });
      
         var wono_combo = new Ext.form.ComboBox({
        id: 'wonoCombo',
        store: store3,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'WO No',
        editable:false,
        width: 100
     
      });
      


      
       var item_combo = new Ext.form.ComboBox({
        id: 'itemCombo',
        store: store3,
   
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item',
        editable:false,
        labelWidth:30,
        width: 200
       
      });

 

 


var store6 = new Ext.data.Store({
       
    });

var partyname = new Ext.form.ComboBox({
        id: 'taxvalueCombo',
        store: store6,
      
        typeAhead: true,
        mode: 'remote',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
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
       name        : 'billdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
   var date3 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dcdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
 
 
  var date5 = new Ext.form.DateField
    ({
       
       name        : 'gatedate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       x:200,
       y:185,
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
      partyname,
        {
            xtype : 'textfield',
            fieldLabel : 'Bill No',
            name       : 'txtbill',
            readOnly   : true,
            width : 70
        },
           {
            xtype : 'textfield',
            fieldLabel : 'DC No',
            name       : 'txtdc',
            readOnly   : true,
            width : 70
        },dept_combo
         
    
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

    var gridstore2 = new Ext.data.JsonStore({
       
    });

    

var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})
/*-------------------- Second grid panel ---------------------- */
      var grid2 = new Ext.grid.EditorGridPanel({
        ddGroup          : 'firstGridDDGroup',
        store            : gridstore2,
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm               : sm,

        tbar:{ xtype: 'toolbar',
                width: 500,
                height: 25,
                item:[

        ]},
        columns: [
        {
            id:'sno',
            header: "S.No",
            width: 40,
            align: 'center',
            sortable: true,
            hidden: false
            
        },
        {
            id:'wono',
            header: "WO No.",
            width: 285,
            align: 'center',
            sortable: true
            
        },
        {
            id:'itemdes',
            header: "Item Description",
            width: 100,
            align: 'center',
            sortable: true
            
        },
        {
            id:'itemcode',
            header: "Item Code",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'qty',
            header: "Qty",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'rate',
            header: "Rate",
            width: 100,
            align: 'center',
            sortable: true
            
        },
        {
            id:'val1',
            header: "Value",
            width: 60,
            align: 'center',
            sortable: true
            
        }
        ],
        stripeRows: true,
        height:160,
        width:720
     });

 
 var cgstamt = new Ext.form.NumberField({id : 'cgstamt1' ,x:200, y:42,width:60
})
 var sgstamt = new Ext.form.NumberField({id : 'sgstamt1' ,x:200, y:68,width:60
})
 var igstamt = new Ext.form.NumberField({id : 'igstamt1' ,x:200, y:94,width:60
})

 var transamt = new Ext.form.NumberField({id : 'tranamt1' ,x:210, y:120,width:80
})

var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Work Order General',
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
                    height: 68,
                    labelWidth:45,
                    width: 160,
                    x: 475,
                    y: 26,
                    items: [
                        date2,date3
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
                title: 'WO & QTY Detail',
                width: 200,
                height: 200,
                layout: 'absolute',
                items: [

                {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 90,
                    width: 820,
                    x: 0,
                    y: 5,
                    labelWidth:45,
                    items: [
                       wono_combo// 
                    ]
                }
                ,
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:30,
                    width: 280,
                    x: 160,
                    y: 5,
                    items: [
                         item_combo
                       
                    ]
                },
                  {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:50,
                    width: 145,
                    x: 410,
                    y: 5,
                    items: [
                         {
                            xtype: 'textfield',
                            fieldLabel: 'WO Qty',
                            width:65,
                            name: 'woqty',
                         }
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:25,
                    width: 125,
                    x: 690,
                    y: 5,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'Rate',
                    width:65,
                    name: 'Wo_rate',
                    }
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:60,
                    width: 145,
                    x: 550,
                    y: 5,
                    
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'GRN Qty',
                    width:45,
                    name: 'qty_grn',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:40,
                    width: 110,
                    x: 0,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'Dis % ',
                    width:40,
                    name: 'disper',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 100,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'CGST % ',
                    width:55,
                    name: 'cgstper',
                    }
                    ]
                },
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 240,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'SGST % ',
                    width:55,
                    name: 'sgstper',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 140,
                    x: 370,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'IGST % ',
                    width:55,
                    name: 'istper',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:40,
                    width: 125,
                    x: 500,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'Others',
                    width:55,
                    name: 'txtother',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:25,
                    width: 155,
                    x: 615,
                    y: 45,
                    items: [
                         {
                    xtype: 'textfield',
                    fieldLabel: 'HSN',
                    width:100,
                    name: 'txthsn',
                    }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 60,
                    labelWidth:25,
                    width: 70,
                    x: 770,
                    y: 35,
                    items: [
                   addbtn
                       
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 185,
                    width: 750,
                    x: 1,  
                    y: 95,
                    items: [
                     grid2
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    labelWidth:55,
                    width: 200,
                    x: 530,
                    y: 260,
                    items: [
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Total Qty',
                    width:100,
                    name: 'txtqty',
                    }
                    ]
                },
                ]
            },
            {
                xtype: 'panel',
                title: 'Value Detail',
                width: 383,
                height: 200,
                layout: 'absolute',
                items: [
               
                {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 190,
                    labelWidth:130,
                    width: 310,
                    x: 0,
                    y: 5,
                    items: [
                        
                        {
                          xtype: 'textfield',
                          fieldLabel: 'Value',
                          width:100,
                          name: 'txtlabch',
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
                         },
                         {
                          xtype: 'textfield',
                          fieldLabel: 'Transport / Unit & Amount',
                          width:60,
                          name: 'txttotal3',
                         }
                    ]
                },cgstamt,sgstamt,igstamt,transamt,
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 190,
                    labelWidth:100,
                    width: 240,
                    x: 308,
                    y: 5,
                    items: [
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Discount',
                    width:100,
                    name: 'numdis1',
                    },
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Labour Charges',
                    width:100,
                    name: 'numlab1',
                    },
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Other Amount',
                    width:100,
                    name: 'numothamt',
                    },
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Discount /Scrap Exchange',
                    width:100,
                    name: 'numdisscr',
                    },
                         {
                    xtype: 'numberfield',
                    fieldLabel: 'Total Amount',
                    width:100,
                    name: 'numtotamt',
                    }
                    
                    ]
                }
                ]
            },
            {
                xtype: 'panel',
                title: 'Other Detail',
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
                    items: [carrier_combo,
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
                 {
                    xtype: 'textfield',
                    fieldLabel: 'Gate Entry no',
                    width:80,
                    name: 'gtentry',
                    
                },
                    ]
                },date5
                 
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
                         y:35
	});
  window_form.show();
  
});
