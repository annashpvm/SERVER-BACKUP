Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');





    var dtpClosingDate = new Ext.form.DateField({
        fieldLabel: ' Date',
        id: 'dtpClosingDate',
        name: 'dtpClosingDate',
        format: 'd-m-Y',
        value: new Date(),
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        anchor: '100%',
        listeners: {
        }
    });



    var loadClosingValueDataStore = new Ext.data.Store({
      id: 'loadClosingValueDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsLedgerOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadClosingValue"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'clodate','closing'
      ]),
    });


    var GroupNameDataStore = new Ext.data.Store({
      id: 'GroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsLedgerOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'subgrpcode','subgrpname'
      ]),
      sortInfo:{field: 'subgrpname', direction: "ASC"}
    });



    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: loadClosingValueDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 760,

        columns: [         
            {header: "Date", dataIndex: 'clodate',sortable:true,width:150,align:'left'},
            {header: "Stock Value", dataIndex: 'closing',sortable:true,width:150,align:'left'},

        ],
        listeners:{	
            'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
		    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
		    txtClosingStock.setValue(selrow.get('closing'));
		    dtpClosingDate.setValue(selrow.get('clodate'));               

               }  
               }
        });         


   

var txtClosingStock = new Ext.form.NumberField({
        fieldLabel  : 'Closing Stock Value ',
        id          : 'txtClosingStock',
        name        : 'txtClosingStock',
        width       :  150,
        tabindex : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",

style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
});



   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Clsinging Entry',
        width       : 700,
        height      : 500,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'MasLedgerFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png'
                },'-',
               {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){


//                         if (txtClosingStock.getValue()=="0"){
//                                Ext.MessageBox.alert("ACCOUNTS", "Enter Value in Closing Stock...!");
//                           }
     
//                            else {

                           MasLedgerFormPanel.getForm().submit({
                                   url: '/SHVPM/Accounts/TrnOpening/TrnStockClosingSave.php',
                                     params:
                                      {

                                          closing  : Number(txtClosingStock.getValue()),
                                          compcode : gincompcode,
                                          fincode  : ginfinid,
                                          clodate  : Ext.util.Format.date(dtpClosingDate.getValue(),"Y-m-d"),
                                      },
                                  success:function()
                                       {
                                           Ext.MessageBox.alert("ACCOUNTS","Clsoing Value Modified ...");
                                           RefreshData();
                                       },
                                    failure:function()
                                       {
                                        Ext.MessageBox.alert("ACCOUNTS","Not Saved");
                                      }
                              });
    //                         }
                          }
                        }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function(){
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasLedgerWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[

 
		{
                 xtype: 'fieldset',
                title: 'Closing Stock',
                border:true,
                height:140,
                width:500,
                x: 50,
                y: 80,
                     items:[



		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 150, 
		         x           : 0,
		         y           : 10,
		         border      : false,
		         items:[txtClosingStock],
		     },


		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 150, 
		         x           : 0,
		         y           : 50,
		         border      : false,
		         items:[dtpClosingDate],
		     },


               ],


             },


		{
                 xtype: 'fieldset',

                border:true,
                height:200,
                width:500,
                x: 50,
                y: 220,
                     items:[
		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 150, 
		         x           : 10,
		         y           : 10,
		         border      : false,
		         items:[flxDetail],
		     },
                  ]
                }    
            ],
         });

    function RefreshData(){
            txtClosingStock.setValue('');

                 
                loadClosingValueDataStore.load({
                    url:'clsLedgerOpening.php',
                    params:{
                        task:'loadClosingValue',
                        compcode : gincompcode,
                        fincode : ginfinid,

                    },
                    callback:function(){
                    var cnt=loadClosingValueDataStore.getCount();
    //                if (cnt > 0)
    //        txtClosingStock.setValue(loadClosingValueDataStore.getAt(0).get('closing') );
                   }
                });








    }

     var MasLedgerWindow = new Ext.Window({
        height      : 600,
        width       : 1200,
        items       : MasLedgerFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 30,
onEsc:function(){
},
        listeners:{
            show:function(){
                RefreshData();


            }
        }
    });
       MasLedgerWindow.show();
});
