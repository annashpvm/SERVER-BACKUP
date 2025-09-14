Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

   var AEDFlag = "Add";
var supcode = 0;

 
 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'sup_code', 'sup_name','sup_gstin','sup_state','sup_led_code'
 

      ]),
    });

function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/Purchase/ClsPurRep.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplier.getRawValue(),
		},
        });
}

 var loadSupplierListDataStore = new Ext.data.Store({
      id: 'loadSupplierListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSupBank.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadBankSupplierList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'sup_name', 'sup_bank_bankname', 'sup_bank_branch', 'sup_bank_ifsc', 'sup_bank_bank_acno'
 
      ]),
    });


 var loadSupplierBankDataStore = new Ext.data.Store({
      id: 'loadSupplierBankDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsSupBank.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadPartyBank"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'suppliercode',  'sup_bank_bankname', 'sup_bank_branch', 'sup_bank_ifsc', 'sup_bank_bank_acno'
 
      ]),
    });


function find_bankname()
{
	gridedit = "true";
	editrow = selrow;
	var sm = flxParty.getSelectionModel();
	var selrow = sm.getSelected();
	var chkitem = (selrow.get('sup_code'));
	supcode = selrow.get('sup_code');
	supname = selrow.get('sup_name');
	txtSupplier.setRawValue(selrow.get('sup_name'));
	custstate   = selrow.get('sup_state');
	custledcode= selrow.get('sup_led_code');
	flxParty.hide();
	loadSupplierBankDataStore.removeAll();
	loadSupplierBankDataStore.load({
		url: 'ClsSupBank.php',
		params: {
    			task: 'LoadPartyBank',
                        suppcode : supcode,
     
		},
		callback:function()
		{

                          txtBankName.setRawValue('');
                          txtBankBranch.setRawValue('');
                          txtBankIFSC.setRawValue('');
                          txtBankACNo.setRawValue('');
 
                    var cnt = loadSupplierBankDataStore.getCount();
                    if (cnt >0)
                    {
                          txtBankName.setRawValue(loadSupplierBankDataStore.getAt(0).get('sup_bank_bankname'));
                          txtBankBranch.setRawValue(loadSupplierBankDataStore.getAt(0).get('sup_bank_branch'));
                          txtBankIFSC.setRawValue(loadSupplierBankDataStore.getAt(0).get('sup_bank_ifsc'));
                          txtBankACNo.setRawValue(loadSupplierBankDataStore.getAt(0).get('sup_bank_bank_acno'));
                    } 
                }  
	

	});

}
   
var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 350,
        width: 400,
        x : 100,
        y : 50,


    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Sup Code", dataIndex: 'sup_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'sup_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'sup_gstin',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'sup_state',sortable:true,width:330,align:'left',hidden:true},
		{header: "ledcode", dataIndex: 'sup_led_code',sortable:true,width:330,align:'left',hidden:true},


        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           find_bankname();
                        }
                     });
             },
        'cellclick' : function(flxParty, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('sup_code'));
                        custcode = 0;
			if ((selrow != null)){
                              find_bankname(); 
			}
               }
          }

   });






 var txtSupplier = new Ext.form.TextField({
        fieldLabel  : 'Supplier Name ',
        id          : 'txtSupplier',
        name        : 'txtSupplier',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
    enableKeyEvents: true,
    listeners:{

	    keyup: function () {
                   flxDetail.getStore().filter('sup_name', txtSupplier.getValue());    
            }

}

  });


   var txtBankName = new Ext.form.TextField({
        fieldLabel  : 'Bank Name',
        id          : 'txtBankName',
        name        : 'txtBankName',
        width       :  350,
        enableKeyEvents: true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
            keyup:function(){

            }  
        } 
        
    });
	
  var txtBankBranch = new Ext.form.TextField({
        fieldLabel  : 'Bank Branch ',
        id          : 'txtBankBranch',
        name        : 'txtBankBranch',
        width       :  350,
        allowBlank  :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
        enableKeyEvents: true,
        listeners:{
            keyup:function(){

            }  
        } 
    });
  var txtBankACNo = new Ext.form.TextField({
        fieldLabel  : 'Bank A/C No.',
        id          : 'txtBankACNo',
        name        : 'txtBankACNo',
        width       :  200,
        allowBlank  :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'20'},
        enableKeyEvents: true,
        listeners:{
            keyup:function(){

            }  
        } 

    });

  var txtBankIFSC = new Ext.form.TextField({
        fieldLabel  : 'Bank IFSC.',
        id          : 'txtBankIFSC',
        name        : 'txtBankIFSC',
        width       :  200,
        allowBlank  :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'11'},
        enableKeyEvents: true,
        listeners:{
            keyup:function(){

            }  
        } 

    });




   function RefreshData(){
	txtBankName.setRawValue("");
	txtBankBranch.setRawValue("");
        txtBankACNo.setRawValue("");
         AEDFlag = "Add";
         flxParty.hide();  
	loadSupplierListDataStore.load({
		url: 'ClsSupBank.php',
		params: {
    			task: 'LoadBankSupplierList'
		}
	});



};



   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 920,
        x: 0,
        y: 0,
        columns: [   

//            {header: "Sup Code", dataIndex: 'suppliercode',sortable:true,width:50,align:'left',hidden : true},
            {header: "Sup. Name", dataIndex: 'sup_name',sortable:true,width:200,align:'left'},
            {header: "Bank Name ", dataIndex: 'sup_bank_bankname',sortable:true,width:200,align:'left'}, 
            {header: "Branch", dataIndex: 'sup_bank_branch',sortable:true,width:200,align:'left'}, 
            {header: "IFSC", dataIndex: 'sup_bank_ifsc',sortable:true,width:150,align:'left'}, 
            {header: "Account No.", dataIndex: 'sup_bank_bank_acno',sortable:true,width:150,align:'left'},


        ],
        store:loadSupplierListDataStore,

    listeners:{	

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
         Ext.Msg.show({
             title: 'Purchase GST Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){
		AEDFlag = "Edit";
			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('tax_code'));
                                AEDFlag = "Edit";
				gridedit = "true";
				editrow = selrow;
//				supcode = selrow.get('suppliercode');				
				txtSupplier.setRawValue(selrow.get('sup_name'));
				txtBankName.setValue(selrow.get('sup_bank_bankname'));
				txtBankBranch.setValue(selrow.get('sup_bank_branch'));
				txtBankIFSC.setValue(selrow.get('sup_bank_ifsc'));
				txtBankACNo.setValue(selrow.get('sup_bank_bank_acno'));
				
				
				flxDetail.getSelectionModel().clearSelections();

		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
   }

   });

   var MasBankPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasBankPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                                if(txtSupplier.getRawValue()=="" || txtSupplier.getValue()==0)
				{
					alert("Enter Supplier Name..");
					txtSupplier.setFocus();
				}
                                else if(txtBankIFSC.getValue().length != 11)
				{
					alert("Error in  IFSC Please check");
					txtBankIFSC.setFocus();
				}                          
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You Want to save the Record',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmSupBankSave.php',
		                                params:
						{
                                                        saveflag   : AEDFlag,
							supname    : txtSupplier.getRawValue(), 
							supcode    : supcode, 
							bankname   : txtBankName.getValue(), 
							bankbranch : txtBankBranch.getValue(),  
							bankifsc   : txtBankIFSC.getValue(), 
							bankacno   : txtBankACNo.getValue(), 
       
 	
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Saved ");
						    MasBankPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     
                                            	}
                                      
					 	}   
			        		});
			    	
	         		}
                                }
 		    	});
				}
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
                            MasBankindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 150,
                y       : 10,	
                items:[

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 550,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [txtSupplier]   	
                           },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 40,
                              border      : false,
                              items: [txtBankName]
                            },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 70,
                              border      : false,
                              items: [txtBankBranch]
                            } ,   
		

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 100,
                              border      : false,
                              items: [txtBankIFSC]
                            },





                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 500,
                              x           : 0,
                              y           : 130,
                              border      : false,
                              items: [txtBankACNo]
                            } , flxParty, 



                ]
            },
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 250,
                width   : 950,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 250,
                items:[flxDetail]
            },  

        ],
    });
    
   
    var MasBankindow = new Ext.Window({
	height      : 600,
        width       : 1000,
        y           : 35,
        title       : 'SUPPLIER BANK MASTER',
        items       : MasBankPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                      RefreshData();
		}
        } 
    });
    MasBankindow.show();  
});
