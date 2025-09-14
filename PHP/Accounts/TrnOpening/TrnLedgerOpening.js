Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtTotaldbamt',readOnly:true,
        width       :  100,
        name        : 'totaldbamt'
    });
    
    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel  : 'Total Crdit',
        id          : 'txtTotalcramt',readOnly:true,
        width       : 100,
        name        : 'totalcramt'
    });
    




    var LedgerOpeningListDataStore = new Ext.data.Store({
      id: 'LedgerOpeningListDataStore',
//   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsLedgerOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerOpeningList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['cust_code', 'cust_name', 'curbal_obdbamt', 'curbal_obcramt']),

    });




    var findLedgerOpeningDataStore = new Ext.data.Store({
      id: 'findLedgerOpeningDataStore',
//   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsLedgerOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerOpening"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['curbal_obdbamt' , 'curbal_obcramt' , 'curbal_dbamt' , 'curbal_cramt']),

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


      var LedCodeLedgerDataStore = new Ext.data.Store({
      id: 'LedCodeLedgerDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsLedgerOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['cust_code','cust_name'])
    });







    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: LedgerOpeningListDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 760,
        x: 20,
        y: 20,
        columns: [         
            {header: "Ledcode", dataIndex: 'cust_code',sortable:true,width:40,align:'left',hidden:false},
            {header: "Account Name", dataIndex: 'cust_name',sortable:true,width:270,align:'left'},
            {header: "Debit", dataIndex: 'curbal_obdbamt',sortable:true,width:100,align:'left'},
            {header: "Credit", dataIndex: 'curbal_obcramt',sortable:true,width:100,align:'left'},

        ],
        listeners:{	
            'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
		    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
		    cmbLedgerName.setValue(selrow.get('cust_code'));
		    if (selrow.get('curbal_obdbamt') > 0 )   
                    { cmbDebitCredit.setRawValue('Dr'); }
		    else                       
                    { cmbDebitCredit.setRawValue('Cr'); }

		    txtLedgerOpening .setValue( Number(selrow.get('curbal_obdbamt')) + Number(selrow.get('curbal_obcramt')) );
               }  
               }
        });         


var txtLedger = new Ext.form.TextField({
        fieldLabel  : 'Search Ledger',
        id          : 'txtLedger',
        name        : 'txtLedger',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                    flxDetail.getStore().filter('cust_name', txtLedger.getValue());    
            }
         }  
    });



var txtLedgerOpening = new Ext.form.NumberField({
        fieldLabel  : 'Opening Balance',
        id          : 'txtLedgerOpening',
        name        : 'txtLedgerOpening',
        width       :  120,
        tabindex : 2
});


var cmbDebitCredit = new Ext.form.ComboBox({
        id         : 'cmbDebitCredit',
        name	   : 'cmbDebitCredit',
        fieldLabel : 'Debit / Credit',
        store      : ['Dr','Cr'],
        width      : 80,
        displayField:'',
        valueField:'',
        hiddenName:'cust_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: false,
        listeners:{
            select :function(){
 

          }
       }
    });



var cmbLedgerName = new Ext.form.ComboBox({
        id         : 'cmbLedgerName',
        name	   : 'cmbLedgerName',
        fieldLabel : 'Ledger Name ',
        store:LedCodeLedgerDataStore,
        width      : 350,
        displayField:'cust_name',
        valueField:'cust_code',
        hiddenName:'cust_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){



                   findLedgerOpeningDataStore.removeAll();
			findLedgerOpeningDataStore.load({
                        url: 'clsLedgerOpening.php',
                        params:
                            {
                                task:"loadLedgerOpening",
                                ledcode:cmbLedgerName.getValue(),  
                                compcode : gincompcode,
                                fincode : ginfinid,
                            },
                            callback:function()
   		            {
                                      txtLedgerOpening.setValue(0);

                                 if (findLedgerOpeningDataStore.getAt(0).get('curbal_obdbamt') > 0)
                                 {
                                      txtLedgerOpening.setValue(findLedgerOpeningDataStore.getAt(0).get('curbal_obdbamt'));
                                      cmbDebitCredit.setRawValue("Dr");
                                 } 
                                 else
                                 {
                                      txtLedgerOpening.setValue(findLedgerOpeningDataStore.getAt(0).get('curbal_obcramt'));
                                      cmbDebitCredit.setRawValue("Cr");
                                 } 
   
			    
			    }
                        });  



          }
       }
    });

function grid_tot(){

        var dr = 0;	
        var cr = 0;	

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              dr=dr+Number(sel[i].data.curbal_obdbamt);
              cr=cr+Number(sel[i].data.curbal_obcramt);
         }
         txtTotaldbamt.setValue(Ext.util.Format.number(dr,'0.00'));
         txtTotalcramt.setValue(Ext.util.Format.number(cr,'0.00'));
}


   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Opening Entry',
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
                           if (cmbLedgerName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Ledger Code should not be empty...!");
                             }
     
                            else {

                           MasLedgerFormPanel.getForm().submit({
                                   url: '/SHVPM/Accounts/TrnOpening/TrnLedgerOpeningSave.php',
                                     params:
                                      {

                                          ledger_code : cmbLedgerName.getValue(),
                                          drcr        : cmbDebitCredit.getRawValue(),
                                          opening     : Number(txtLedgerOpening.getValue()),
                                          compcode    : gincompcode,
                                          fincode     : ginfinid,
                                      },
                                  success:function()
                                       {
                                           Ext.MessageBox.alert("ACCOUNTS","Ledger Opening Modified Successfully...");
                                           RefreshData();
                                       },
                                    failure:function()
                                       {
                                        Ext.MessageBox.alert("ACCOUNTS","Not Saved");
                                      }
                              });
                             }
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
		        title: 'Opening Details',
		        layout : 'absolute',
		        border:true,
		        height:500,
		        width:600,
		        x: 10,
		        y: 0,
		        items:[
		           { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 120,
		                width       : 500,
		                x           : 10,
		                y           : -15,
		                defaultType : 'NumberField',
		                border      : false,
		                items: [txtLedger]
		            },

                         flxDetail,
		           { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 80,
		                width       : 300,
		                x           : 180,
		                y           : 425,
		                defaultType : 'NumberField',
		                border      : false,
		                items: [txtTotaldbamt]
		            },
		            { 
		                xtype       : 'fieldset',
		                title       : '',
		                labelWidth  : 80,
		                width       : 300,
		                x           : 375,
		                y           : 425,
		                defaultType : 'NumberField',
		                border      : false,
		                items: [txtTotalcramt]
		            }
                        ]  
                },  
 
		{
                 xtype: 'fieldset',
                title: 'Ledger Details',
                layout : 'absolute',
                border:true,
                height:500,
                width:500,
                x: 650,
                y: 0,
                     items:[

                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 30,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbLedgerName]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 250,
                        x           : 0,
                        y           : 90,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbDebitCredit]
                       },

		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 400,
                         labelWidth  : 100, 
		         x           : 0,
		         y           : 150,
		         border      : false,
		         items:[txtLedgerOpening],
		     },


               ]
             }
            ]
         });

    function RefreshData(){
            txtLedgerOpening.setValue('');



                LedCodeLedgerDataStore.load({
                    url:'clsLedgerOpening.php',
                    params:{
                        task:'loadLedgerDetails'
                    },
                    callback:function(){

                    }
                });



                LedgerOpeningListDataStore.load({
                    url:'clsLedgerOpening.php',
                    params:{
                        task:'loadLedgerOpeningList',
                                compcode : gincompcode,
                                fincode : ginfinid,

                    },
                    callback:function(){
                         grid_tot();
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
