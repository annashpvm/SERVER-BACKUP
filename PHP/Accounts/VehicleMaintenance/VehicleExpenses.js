Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




var btnSubmit = new Ext.Button({
 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 60,
    height  : 35,
    x       : 200,
    y       : 200,

 listeners:{
        click: function(){       
            add_btn_click();
 
       }
     }
});


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:0,
    height: 200,
    hidden:false,
    width: 1100,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "S.No"    , dataIndex: 'sno',sortable:false,width:40,align:'left', menuDisabled: true},	
        {header: "Truck No" , dataIndex: 'truck',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Fuel  "  , dataIndex: 'fuel',sortable:false,width:90,align:'center', menuDisabled: true},
        {header: "Spares"  , dataIndex: 'spares',sortable:false,width:90,align:'center', menuDisabled: true},
        {header: "Service" , dataIndex: 'service',sortable:false,width:90,align:'center', menuDisabled: true},
        {header: "Others"   , dataIndex: 'others',sortable:false,width:90,align:'center', menuDisabled: true},
        {header: "Remarks"  , dataIndex: 'remarks',sortable:false,width:200,align:'left', menuDisabled: true,
   	editor:{
		    xtype:'textfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { grid_tot();
	}}}},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	



            'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {

             Ext.Msg.show({
             title: 'VEHICAL MAINTENANCE',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();

		                cmbvarietylist.setRawValue(selrow.get('varname'));
		                cmbvarietylist.setValue(selrow.get('varcode'));
			        cmbShade.setRawValue(selrow.get('shade'));


                                txtBF.setValue(selrow.get('bf'));
				txtGSM.setValue(selrow.get('gsm'));



			        cmbSizetype.setRawValue(selrow.get('sizein'));

                                fwt = selrow.get('finwt');
                                iwt = selrow.get('invwt');

                                getsizes();

///alert(selrow.get('rate'));
				cmbSizeList.setValue(selrow.get('sizecode'));
			        cmbSizeList.setRawValue(selrow.get('size'));
				txtNoofReels.setValue(selrow.get('reels'));

                                txtBF.setValue(selrow.get('bf'));
				txtqty.setValue(selrow.get('qty'));
			        dptDespdate.setValue(Ext.util.Format.date(selrow.get('despdate'),"Y-m-d"));
				txtrate.setValue(selrow.get('rate'));

                                if (fwt > 0)
                                {
				        cmbvarietylist.setDisabled(true);   
					cmbShade.setDisabled(true);   
		                        txtBF.setDisabled(true);   
					txtGSM.setDisabled(true);   
		                        cmbRB.setDisabled(true);   
					cmbSizetype.setDisabled(true);   
					cmbSizeList.setDisabled(true);   
                                }       
                                else
                                {
				        cmbvarietylist.setDisabled(false);   
					cmbShade.setDisabled(false);   
		                        txtBF.setDisabled(false);   
					txtGSM.setDisabled(false);   
		                        cmbRB.setDisabled(false);   
					cmbSizetype.setDisabled(false);   
					cmbSizeList.setDisabled(false);   
                                }            
	              }
		      else if (btn === 'no')
                      {
		                if (viewopt == 0)
		                { 
		                    var sm = flxDetail.getSelectionModel();
		                    var selrow = sm.getSelected();
                                    fwt = selrow.get('finwt');
                                    iwt = selrow.get('invwt');
                                    if (fwt > 0) 
                                    {
                                       alert("Finished Entries are Made aginst this SO. You can't Delete");
                                    }
                                    else
                                    {
                                       flxDetail.getStore().remove(selrow);
		                       flxDetail.getSelectionModel().selectAll();
                                    }
		                }  
		                else
		                {
		                    alert("In GRN EDIT option - you cannot delete the Row..");
		                }   
		     
		      }
                     grid_tot();

             } 
        });
   }
   }

});


  var LoadTruckListDataStore = new Ext.data.Store({
   id: 'LoadTruckListDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsVehicleExpenses.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadVehicleList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['truck_code','truck_no'])
    });


 var dptEntryNo= new Ext.form.DateField({
        fieldLabel: 'Entry Date',
        id: 'dptEntryNo',
        name: 'Date',
        format: 'd-m-Y',
        width       :  120,
//        readOnly : true,
        value: new Date(),
         	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
       	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

//		          cmbPO.focus();
		     }
		  },

        }  

 });

   var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No',
        id          : 'txtEntryNo',
        name        : 'ordno',
        width       :  100,
	readOnly : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'7'},
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
			const input = document.getElementById('dptEntryNo');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
		     }
		  }  
        }  

    });



   var txtFuel = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFuel',
        name        : 'txtFuel',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

			txtSpares.focus();
		     }
		  }  
        }  

    });


   var txtSpares = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSpares',
        name        : 'txtSpares',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

			txtService.focus();
		     }
		  }  
        }  

    });


   var txtService = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtService',
        name        : 'txtService',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

			txtOthers.focus();
		     }
		  }  
        }  

    });

   var txtOthers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthers',
        name        : 'txtOthers',
        width       :  100,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

			txtRemarks.focus();
		     }
		  }  
        }  
    });

   var txtRemarks = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRemarks',
        name        : 'txtRemarks',
        width       :  200,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {

			txtRemarks.focus();
		     }
		  }  
        }  
    });
var lblTruck = new Ext.form.Label({
    fieldLabel  : 'Truck List',
    id          : 'lblTruck',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblFuel = new Ext.form.Label({
    fieldLabel  :'Fuel',
    id          : 'lblFuel',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblSpares = new Ext.form.Label({
    fieldLabel  :'Spares',
    id          : 'lblSpares',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblService = new Ext.form.Label({
    fieldLabel  :'Service',
    id          : 'lblService',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblOthers = new Ext.form.Label({
    fieldLabel  : 'Others',
    id          : 'lblOthers',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblRemarks = new Ext.form.Label({
    fieldLabel  : 'Remarks',
    id          : 'lblRemarks',
    width       : 200,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var cmbTruckList = new Ext.form.ComboBox({
        id         : 'cmbTruckList',
        name	   : 'cmbTruckList',
        fieldLabel : '',
        store:LoadTruckListDataStore,
        width      : 150,
        displayField:'truck_no',
        valueField:'truck_code',
        hiddenName:'truck_no',
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
                                ledcode:cmbTruckList.getValue(),  
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


   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Vehicle Expenes Entry',
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


//                         if (txtFuel.getValue()=="0"){
//                                Ext.MessageBox.alert("ACCOUNTS", "Enter Value in Closing Stock...!");
//                           }
     
//                            else {

                           MasLedgerFormPanel.getForm().submit({
                                   url: '/SHVPM/Accounts/TrnOpening/TrnStockClosingSave.php',
                                     params:
                                      {

                                          closing     : Number(txtFuel.getValue()),
                                          compcode    : gincompcode,
                                          fincode     : ginfinid,
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
                title: '',
                layout : 'absolute',
                border:true,
                height:110,
                width:1000,
                x: 5,
                y: 10,
                     items:[


		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 900,
                         labelWidth  : 150, 
		         x           : 0,
		         y           : 00	,
		         border      : false,
		         items:[txtEntryNo],
		     },

		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 900,
                         labelWidth  : 150, 
		         x           : 0,
		         y           : 40	,
		         border      : false,
		         items:[dptEntryNo],
		     },

               ]
             },

              {
                 xtype: 'fieldset',
                title: '',
                layout : 'absolute',
                border:true,
                height:	350,
                width:1000,
                x: 5,
                y: 130,
                items:[

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 10,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblTruck]
				        },

	
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 190,
				            labelWidth  : 100,
				            x           : 200,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblFuel]
				        },
				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 1,
				            x           : 320,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblSpares]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 1,
				            x           : 420,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblService]
				        },

				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 100,
				            labelWidth  : 80,
				            x           : 550,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblOthers]
				        },


				        {
				            xtype       : 'fieldset',
				            title       : '',
				            width       : 300,
				            labelWidth  : 100,
				            x           : 650,
				            y           : 10,
				            defaultType : 'Label',
				            border      : false,
				            items: [lblRemarks]
				        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 5,
                                             y           : 30,
                                             border      : false,
                                             items: [cmbTruckList]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 180,
                                             y           : 30,
                                             border      : false,
                                             items: [txtFuel]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 290,
                                             y           : 30,
                                             border      : false,
                                             items: [txtSpares]
                                        },

					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 400,
                                             y           : 30,
                                             border      : false,
                                             items: [txtService]
                                        },


		

				       { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 290,
                                             x           : 510,
                                             y           : 30,
                                             border      : false,
                                             items: [txtOthers]
                                        },
				        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 1,
                                             width       : 350,
                                             x           : 620,
                                             y           : 30,
                                             border      : false,
                                             items: [txtRemarks]
                                        },
				    { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 100,
                                             x           : 880,
                                             y           : 30,
                                             border      : false,
                                             items: [btnSubmit]
                                        },


				    { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 900,
                                             x           : 10,
                                             y           : 70,
                                             border      : false,
                                             items: [flxDetail]
                                        },





                ]
               },


              {
                 xtype: 'fieldset',
                title: '',
                layout : 'absolute',
                border:true,
                height:	470,
                width:290,
                x: 1020,
                y: 10,
                items:[
                ]
               }   


            ]
         });

    function RefreshData(){
            txtFuel.setValue('');










    }

     var MasLedgerWindow = new Ext.Window({
        height      : 600,
        width       : 1340,
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
