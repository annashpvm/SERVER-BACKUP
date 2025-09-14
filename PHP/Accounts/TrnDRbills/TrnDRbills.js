Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');


var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



   var fm = Ext.form;


    var findLedgerOpeningDataStore = new Ext.data.Store({
      id: 'findLedgerOpeningDataStore',
 //  autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsDRbills.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadLedgerBills"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['acctrail_accref_seqno','acctrail_led_code','acctrail_inv_no' , 'balamt', 'acctrail_inv_date','acctrail_inv_value','acctrail_adj_value', 'acctrail_crdays',  'acctrail_serialno',    'acctrail_amtmode','modify_yn']),

    });


    var GroupNameDataStore = new Ext.data.Store({
      id: 'GroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsDRbills.php',      // File to connect to
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
                url: 'clsDRbills.php',      // File to connect to
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







var txtLedgerClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing Balance',
        id          : 'txtLedgerClosing',
        name        : 'txtLedgerClosing',
        width       :  120,
        tabindex : 2,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
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


function grid_tot(){

        var balance = 0;

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)

        {
	      balance=Number(balance)+Number(sel[i].data.balamt);
         }
        txtLedgerClosing.setRawValue(Ext.util.Format.number(balance,"0.00"));


}


   var adjamt = 0;
   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 380,
        width: 1000,
        x: 0,
        y: 50,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "seqno", dataIndex:'acctrail_accref_seqno',sortable:true,width:60,align:'left'},   
		{header: "ledcode", dataIndex: 'acctrail_led_code',sortable:true,width:80,align:'left'},
		{header: "Inv. No", dataIndex: 'acctrail_inv_no',sortable:true,width:100,align:'left',
                   editor:{
		    xtype:'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
		     	    keyup: function () {
                               var sm = flxDetail.getSelectionModel();
                               var selrow = sm.getSelected();
                //               this.setValue(Number(selrow.get('acctrail_inv_no')));
		            }
                    } 
                    }  
                },
		{header: "Inv.Date", dataIndex: 'acctrail_inv_date',sortable:true,width:100,align:'left',
               editor: {
                    xtype: 'datefield',
                    allowBlank: true,
                    value: new Date(),
                    format: 'Y-m-d',
                    enableKeyEvents: true,
                    listeners: {
                     focus: function () {

                        },
                        blur: function () {


                        },
                        keyup: function () {

                       }

                    }
         } 
                },
		{header: "Inv Amt", dataIndex:'acctrail_inv_value',sortable:true,width:100,align:'center'},  
		{header: "Adj Amt", dataIndex: 'acctrail_adj_value',sortable:true,width:100,align:'center'},
		{header: "Bal Amt", dataIndex: 'balamt',sortable:true,width:100,align:'center',	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
                        focus: function () {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            this.setValue(Number(selrow.get('balamt')));
                            adjamt =  Number(selrow.get('acctrail_inv_value')) - Number(this.getValue());
                            selrow.set('acctrail_adj_value',adjamt);
                        },
             	    keyup: function () {
                  
                      var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
        //                   this.setValue(Number(selrow.get('balamt')));
                            adjamt =  Number(selrow.get('acctrail_inv_value')) - Number(this.getValue());
   //                       if (adjamt > 0)
                            selrow.set('acctrail_adj_value',adjamt);


//                            grid_tot();
//alert(adjamt);

/*
                      var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
                              adjamt =  Number(selected_rows[i].data.acctrail_inv_value)-Number(selected_rows[i].data.balamt)
                           //   alert(adjamt);
                                             
                              colname = 'acctrail_adj_value';
	                       selected_rows[i].set(colname, adjamt);
	               }
*/

                 },
                 blur: function () {
                      grid_tot();
                 } 
}}},
 		{header: "Payment Terms", dataIndex: 'acctrail_crdays',sortable:true,width:120,align:'center',  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () {
	}}}},

 		{header: "Modify", dataIndex: 'modify_yn' ,sortable:true,width:150,align:'center',
		editor: new fm.ComboBox({
		allowBlank: false,
                store     : ['Y','N'],

	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: false,
	    	editable: true,
	    	allowblank: false,
	    	listeners: {
		   select: function () {

		   }
	    	}
		}) 	  	},

        ],
store:findLedgerOpeningDataStore,

       listeners:{
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){

/*

                if (cellIndex == 8)
                {    


                    var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{


				if (selected_rows[i].data.modify_yn == 'Y')
                                    flag = 'N';
                                else                                   
                                    flag = 'Y';

                               	colname = 'modify_yn';
        alert(flag);                                  
				if (flag == 'N')
				{

				   selected_rows[i].set(colname, 'Y');
				} else 
				{
				   selected_rows[i].set(colname, 'N');
				}
                       }   
                }
  */
             }  ,
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
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        listeners:{
            select :function(){



                   findLedgerOpeningDataStore.removeAll();
			findLedgerOpeningDataStore.load({
                        url: 'clsDRbills.php',
                        params:
                            {
                                task:"loadLedgerBills",
                                ledcode:cmbLedgerName.getValue(),  
                                compcode : gincompcode,
                                fincode : ginfinid,
                            },
                            callback:function()
   		            {
   


			      grid_tot();  

			    }
                        });  



          }
       }
    });

   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Opening Entry',
        width       : 1100,
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

                            var SalesData = flxDetail.getStore().getRange();                                        
                            var SalesupData = new Array();
                            Ext.each(SalesData, function (record) {
                                SalesupData.push(record.data);
                            });


                           MasLedgerFormPanel.getForm().submit({
                                   url: 'TrnDRbillsSave.php',
                                     params:
                                      {
					  cnt: SalesData.length,
				          griddet: Ext.util.JSON.encode(SalesupData),  
                                          ledger_code : cmbLedgerName.getValue(),
                                          compcode    : gincompcode,
                                          fincode     : ginfinid,
                                      },
                                  success:function()
                                       {
                                           Ext.MessageBox.alert("ACCOUNTS","Ledger Bills Modified Successfully...");
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
                title: 'Ledger Details',
                layout : 'absolute',
                border:true,
                height:490,
                width:1100,
                x: 10,
                y: 0,
                     items:[

                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 10,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbLedgerName]
                       }, flxDetail,


                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 450,
                        y           : 422,
                        border      : false,
                        labelWidth  : 130,
                        items: [txtLedgerClosing]
                       },
               ]
             }
            ]
         });

    function RefreshData(){
                                          
     flxDetail.getStore().removeAll(); 
     txtLedgerClosing.setRawValue();

    }

     var MasLedgerWindow = new Ext.Window({
        height      : 600,
        width       : 1100,
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




                LedCodeLedgerDataStore.load({
                    url:'loadLedgerDetails',
                    params:{
                        task:'loadLedgerDetails'
                    },
                    callback:function(){

                    }
                });
            }
        }
    });
       MasLedgerWindow.show();
});
