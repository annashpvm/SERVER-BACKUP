Ext.onReady(function(){
Ext.QuickTips.init();

    var Ginfinid =localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');;
    var editrow = 0;
    var gridedit = "false";
    var gstFlag = "Add";
    var returntype = "R";




 var loadDNdatastore = new Ext.data.Store({
      id: 'loadDNdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dnno'
      ]),
    }); 


 var loadDNlistdatastore = new Ext.data.Store({
      id: 'loadDNlistdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnnolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'genh_no'
      ]),
    }); 


 var loadDNNodetaildatastore = new Ext.data.Store({
      id: 'loadDNNodetaildatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddnnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'genh_no'
      ]),
    });
var LoadItemDetDatastore = new Ext.data.Store({
      id: 'LoadItemDetDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'uom_short_name'
      ]),
    }); 


   


 var LoadCarrierDatastore = new Ext.data.Store({
      id: 'LoadCarrierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcarrier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'carr_name','carr_code'
      ]),
    });



 var cmbcarrier = new Ext.form.ComboBox({
        id: 'cmbcarrier',
        store: LoadCarrierDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Carrier',
        editable:true,
        width: 250,
        displayField: 'carr_name',
        valueField: 'carr_code',
        hiddenName : 'carr_code'
     
      });
      


  


 var LoadItemDatastore = new Ext.data.Store({
      id: 'LoadItemDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'item_name','item_code'
      ]),
    }); 
    



 var LoadSupplierDatastore = new Ext.data.Store({
      id: 'LoadSupplierDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'sup_refname','sup_code'
      ]),
    }); 

 var LoadDeptDatastore = new Ext.data.Store({
      id: 'LoadDeptDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsDeliveryNote.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dept_name','dept_code'
      ]),
    }); 

      
var cmbitem = new Ext.form.ComboBox({
        id: 'cmbitem',
        store: LoadItemDatastore,
   	displayField: 'item_name',
        valueField: 'item_code',
        hiddenName : 'item_name'     ,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item',
        editable:false,
        labelWidth:30,
        width: 250,
    	listeners:{
        select:function(){

//alert(cmbitem.getValue());			
			LoadItemDetDatastore.load({
                        url: 'ClsDeliveryNote.php',
                        params:
                            {
                                task:"loaditemdet",
				item:cmbitem.getValue()
                            },
				callback:function(){

				txtuom.setRawValue(LoadItemDetDatastore.getAt(0).get('uom_short_name'));
				
        	        		}
                        });         
        }
          }
    
       
 });


var cmbdept = new Ext.form.ComboBox({
        id: 'cmbdept',
        store: LoadDeptDatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Dept ',
        editable:false,
        width: 300,
        displayField: 'dept_name',
        valueField: 'dept_code',
        hiddenName : 'dept_code'       
      });

 



var cmbparty = new Ext.form.ComboBox({
        id: 'cmbparty',
        store:  LoadSupplierDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_code',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 380,
    	listeners:{
        select:function(){
        }
    }
});


var cmbfreight = new Ext.form.ComboBox({
        id: 'cmbfreight',
        store:  ['NIL','TO PAY','PAID'],
        displayField: 'NIL',
        valueField: '1',
        hiddenName : '',      
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
 
        editable:true,
        fieldLabel:'Freight Type',
        width: 100
});
 
 
   var txtdnno = new Ext.form.NumberField({
        fieldLabel  : 'Del.Note No.',
        id          : 'txtdnno',
        width       : 75,
        name        : 'txtdnno'
   });



  var txtdnqty = new Ext.form.NumberField({
        fieldLabel  : 'Qty',
        id          : 'txtdnqty',
        width       : 40,
        name        : 'txtdnqty'
   });

  var txtpurpose = new Ext.form.TextField({
        fieldLabel  : 'Purpose',
        id          : 'txtpurpose',
        width       : 200,
        name        : 'txtpurpose'
   });

  var txtremarks = new Ext.form.TextField({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        width       : 500,
        name        : 'txtremarks'
   });

  var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Frt Amount',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight'
   });


  var txtreturndays = new Ext.form.NumberField({
        fieldLabel  : 'Ex.Return.Days',
        id          : 'txtreturndays',
        width       : 50,
        name        : 'txtreturndays'
   });



  var txttruckno = new Ext.form.TextField({
        fieldLabel  : 'Truck ',
        id          : 'txttruckno',
        width       : 300,
        name        : 'txttruckno'
   });

  var txtuom = new Ext.form.TextField({
        fieldLabel  : 'UOM ',
        id          : 'txtuom',
        width       : 70,
        readOnly    : true,
        name        : 'txtuom'
   });

  var dtdnote = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtdnote',
       id          : 'dtdnote',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
    
  var dtref = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'dtref',
       id          : 'dtref',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });

   var txtrefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No.',
        id          : 'txtrefno',
        width       : 170,
        name        : 'txtrefno'
   });


 var cmbdnno = new Ext.form.ComboBox({
        id: 'cmbdnno',
        store:  loadDNlistdatastore,
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'',
        editable:true,
        displayField: 'genh_no',
        valueField: 'genh_no',
        hiddenName : 'genh_no',
        width: 75,

        listeners:{
                select: function () {
			flxDetail.getStore().removeAll();
			loadDNNodetaildatastore.removeAll();
			loadDNNodetaildatastore.load({
		                url: 'ClsOthSales.php',
		                params: {
		                    task: 'loadothsalenodetail',
					finid:GinFinid,
					compcode:Gincompcode,
                                	docno:cmbsalno.getValue()
		                },
				scope: this,
                                callback:function()
                                {   
                                   //flxDetail.getStore().removeAll();
                                   var cnt = loadDNNodetaildatastore.getCount();

                                   if(cnt>0)
                  		    {  
                                           txtsalenoteno.setValue(cmbsalno.getValue());

		                           cmbcustomer.setValue(loadDNNodetaildatastore.getAt(0).get('os_custcode')); 
                                           dtsales.setRawValue(Ext.util.Format.date(loadDNNodetaildatastore.getAt(0).get('os_date'),"d-m-Y"));	
                                           cmbpayment.setValue(loadDNNodetaildatastore.getAt(0).get('os_paymode'));
					   cmbtransport.setValue(loadDNNodetaildatastore.getAt(0).get('os_transport'));
					   txtcarrier.setValue(loadDNNodetaildatastore.getAt(0).get('os_vehno'));
					   txtremark.setValue(loadDNNodetaildatastore.getAt(0).get('os_remarks'));
					   txtourref.setValue(loadDNNodetaildatastore.getAt(0).get('os_ourref'));
					   txtpartyref.setValue(loadDNNodetaildatastore.getAt(0).get('os_partyref'));

		            	           for(var j=0; j<cnt; j++)
				           { 


		                              var itemname1     = loadDNNodetaildatastore.getAt(j).get('salitem_name');
		                              var itemcode1     = loadDNNodetaildatastore.getAt(j).get('salitem_code');
		                              var uom1          = loadDNNodetaildatastore.getAt(j).get('uom_short_name');
		                              var unitrate1     = loadDNNodetaildatastore.getAt(j).get('os_rate');
		                              var qty1          = loadDNNodetaildatastore.getAt(j).get('os_qty');
		                              var amount1       = loadDNNodetaildatastore.getAt(j).get('os_value');
		                              var others1       = loadDNNodetaildatastore.getAt(j).get('os_others');
		                              var taxablevalue1 = loadDNNodetaildatastore.getAt(j).get('os_taxable');
		                              var cgstper1      = loadDNNodetaildatastore.getAt(j).get('os_cgstper');
		                              var cgstval1      = loadDNNodetaildatastore.getAt(j).get('os_cgst');
		                              var sgstper1      = loadDNNodetaildatastore.getAt(j).get('os_sgstper');
		                              var sgstval1      = loadDNNodetaildatastore.getAt(j).get('os_sgst');
		                              var igstper1      = loadDNNodetaildatastore.getAt(j).get('os_igstper');
		                              var igstval1      = loadDNNodetaildatastore.getAt(j).get('os_igst');
                                              var totamt1       = loadDNNodetaildatastore.getAt(j).get('os_netamt');


		                              var RowCnt = flxDetail.getStore().getCount() + 1;  
		                              flxDetail.getStore().insert(
		                                  flxDetail.getStore().getCount(),
		                                  new dgrecord({
                                                  itemname    :loadDNNodetaildatastore.getAt(j).get('salitem_name'), //itemname1,
						  itemcode    :itemcode1, //itemcode1,
					          uom         :uom1,
						  unitrate    :unitrate1,
						  qty         :qty1,
						  amount      :amount1,
						  others      :others1,
						  taxablevalue:taxablevalue1,
						  cgstper     :cgstper1,
						  cgstval     :cgstval1,
						  sgstper     :sgstper1,
						  sgstval     :sgstval1,
						  igstper     :igstper1,
						  igstval     :igstval1,
						  totamt      :totamt1,
		                                  })
		                              );
                                              grid_tot();
		                           }

                                    }

                                }

			  });
          } }




    });



var btnsubmit = new Ext.Button({
        text: 'ADD',
        width: 60,
        tooltip:'Click To Update',
        icon:'../GRN/icons/download.gif',
	listeners:{ 
            click: function(){

                      var gstadd="true";
                      if (Number(txtdnqty .getValue())===0){
                          Ext.MessageBox.alert("Delivery Note ", "Enter quantity..");
                          txtsaleqty.focus();
                          gstadd="false";
                       }

                      if (Number(txtpurpose.getValue())===0){
                          Ext.MessageBox.alert("Delivery Note ", "Enter Rate..");
                          txtunitrate.focus();
                          gstadd="false";
                       }

                       if(gstadd=="true")
                       {
                           flxDetail.getSelectionModel().selectAll();
                           var selrows = flxDetail.getSelectionModel().getCount();
                           var sel = flxDetail.getSelectionModel().getSelections();
                           var cnt = 0;
                           for (var i=0;i<selrows;i++)
	                   {
                              if (sel[i].data.itemname == cmbitem.getRawValue())
	                      {
                                   cnt = cnt + 1;
                              }
                           }
                           if(gridedit === "true")
              	           {
		           	gridedit = "false";
                               	var idx = flxDetail.getStore().indexOf(editrow);
                                var tamt = 0;
            	          	sel[idx].set('itemname'    , cmbitem.getRawValue());
        	          	sel[idx].set('itemcode'    , cmbitem.getValue());
        	          	sel[idx].set('qty'         , txtdnqty.getValue());
        	          	sel[idx].set('uom'         , txtuom.getRawValue());
        	          	sel[idx].set('purpose'     , txtpurpose.getValue());
                           	flxDetail.getSelectionModel().clearSelections();
                
                            }
             	            else if (cnt > 0) 
                            {
                               Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                            } 
                            else
                            {
		               var RowCnt = flxDetail.getStore().getCount() + 1;
		               flxDetail.getStore().insert(
		                flxDetail.getStore().getCount(),
		                new dgrecord({
				   itemname  : cmbitem.getRawValue(),
				   itemcode  : cmbitem.getValue(),
				   uom       : txtuom.getRawValue(),
				   qty       : txtdnqty.getValue(),
				   purpose   : txtpurpose.getValue(),
		                })
		               );
		               grid_tot();
			       txtuom.setValue('');
			       txtdnqty.setValue('');
			       txtpurpose.setValue('');
                        }
      }
	 	
		  }
      }
})

var optselect = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    //defaultType : 'textfield',
    width:130,
//    height:100,
//    x:30,
//    y:40,
    border: false,
    items: [
                  {
                        xtype	: 'radiogroup',
			//border  :  false,
//                	x       : 80,          
//                	y       : -10,
                       // border: true,
			//layout : 'hbox',
                	columns :  1,
                        id      : 'optselect',
                	items: [

                        {boxLabel: 'Returnable', name: 'optselect', inputValue: '2',checked : true, listeners: {
			    check: function (rb,checked) {
                              	if(checked===true){
					returntype = "R";
			         }
                            }
                         }},
                    	{boxLabel: 'Non Returnable', name: 'optselect',inputValue: '1',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					returntype = "N";
                      		}
                        }
                        }},
                        ]
                  }
           ]
})


var dgrecord = Ext.data.Record.create([]);

      var flxDetail = new Ext.grid.EditorGridPanel({
        store            : [],
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm: new Ext.grid.RowSelectionModel(),
        columns: [
        
 		{dataIndex:'itemname',header: "Item Name",width: 250,align: 'left',sortable: true},
		{dataIndex:'itemcode',header: "Item Code",width: 60,align: 'left',sortable: true},
 		{dataIndex:'uom',header: "UOM",width: 100, align: 'left',sortable: true},
        	{dataIndex:'qty',header: "Quantity", width: 60,align: 'left', sortable: true},
        	{dataIndex:'purpose',header: "Purpose", width: 300,align: 'left', sortable: true},
        ],
        stripeRows: true,
        height:120,
        width:1000,


       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'OTHER SALES ENTRY',
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
			cmbitem.setValue(selrow.get('itemcode'));
			txtuom.setRawValue(selrow.get('uom'));
			txtdnqty.setValue(selrow.get('qty'));
			txtpurpose.setValue(selrow.get('purpose'));
	                flxDetail.getSelectionModel().clearSelections();
	            }
                 else if (btn === 'no')
                       {
                            var sm = flxDetail.getSelectionModel();
                            var selrow = sm.getSelected();
                            flxDetail.getStore().remove(selrow);
                            flxDetail.getSelectionModel().selectAll();
                        }  
             
             }
//                   calculateItemValue();
  //                 grid_tot()();
        });         
    }
 }

     });

 

var store = new Ext.data.Store({
     
    });


var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Delivery Note',
        style        : 'margin: 5px ',
        height       : 580,
        frame        : false,
        bodyStyle    : 'background: url(../icons/img1.jpg)',
        id           : 'myFormPanel',
        layout       : 'absolute',
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
                    icon: '../icons/edit.png',

		    listeners:
	            {
                     	click: function(){
//EDIT
                           Ext.getCmp('cmbdnno').show();
                           gstFlag = "Edit";
                           loadDNlistdatastore.removeAll();
                           loadDNlistdatastore.load({
      		              url: 'ClsDeliveryNote',
                              params: {
			          task: 'loaddnnolist',
			          finid: Ginfinid,
			          compcode:Gincompcode,
                              },
                              callback:function()
                              { 
//			          alert(loadDNlistdatastore.getCount());	
                              }
                           });

                        }
                    }
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
                    listeners:{
                    click:function() {

alert(Ginfinid);

                            if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Delivery Note','Grid should not be empty..');
        	                gstSave="false";
	                    }
                            else if (cmbparty.getRawValue() == "" || cmbparty.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Party  Name is Empty.....');
                            }
                            else if (cmbdept.getRawValue() == "" || cmbdept.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Department Name is Empty.....');
                            }
 
                            else if (cmbcarrier.getRawValue() == "" || cmbcarrier.getValue() == 0  )
                            {
                                  Ext.Msg.alert('Delivery Note','Carrier Name cannot be Empty.....');
                            }
                            else if (txtremarks.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Note','Remarks Line is empty .....');
                            }
                            else if (txtrefno.getRawValue() == "")
                            {
                                  Ext.Msg.alert('Delivery Note','Reference	 Line is empty .....');
                            }
                            else if (Number(txtreturndays .getRawValue()) == 0)
                            {
                                  Ext.Msg.alert('Delivery Note','Expected Return Days is empty');
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
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnDeliveryNoteSave.php',
				               params:
						{
						griddet: Ext.util.JSON.encode(finupdData),       
 						cnt: finData.length,
                                                savetype     : gstFlag,

						genhcompcode  : Gincompcode,
						genhfincode   : Ginfinid,
						genhno        : txtdnno.getValue(),
						genhdate      : Ext.util.Format.date(dtdnote.getValue(),"Y-m-d"),
						genhparty     : cmbparty.getValue(),
						genhtag       : "S",   
						genhtype      : "D",
						genhdept      : cmbdept.getValue(),
						genhretype    : returntype,
						genhtotqty    : 0,  
						genhtotval    : 0,
						genhcarrier   : cmbcarrier.getValue(),
						genhfreight   : cmbfreight.getRawValue(),
						genhdays      : txtreturndays.getValue(), 
						genhremarks   : txtremarks.getValue(), 
						genhrefno     : txtrefno.getValue(), 
						genhrefdate   : Ext.util.Format.date(dtref.getValue(),"Y-m-d"),
						genhfrtamt    : 0,
						genhvalue     : 0,
						genhdiscount  : 0,
						genhsertaxper : 0,
						genhsertaxamt : 0,
						genheduper : 0,
						genheduamt : 0,
						genhsheper : 0,
						genhsheamt : 0,
						genhtransunitrate : 0,
						genhtransamt : 0,
						genhotheramt : 0,
						genhlabouramt : 0,
						genhcgstper : 0,
						genhcgstamt : 0,
						genhsgstper : 0,
						genhsgstamt : 0,
						genhigstper : 0,
						genhigstamt : 0,
						genhlessamt : 0,
						genhinwardfrt : 0,
						genhoutwardfrt : 0,
						genhbillno   : 0,
						genhbilldate : 0, 
						genhgateeno : '',
						genhgateedate :Ext.util.Format.date(dtdnote.getValue(),"Y-m-d"),
						genhtruckno  : txttruckno.getValue(), 
						genhaccupd  : 'N',
						genhaccvouno : 'N',
						genhaccvoudate : 0,
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);

						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Delivery Note Saved -" + obj['dnno']);
	                                    myFormPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Delivery Note Not Saved!- " + obj['dnno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 

                    
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
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
                    icon: '../icons/view.png'
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png',
		    listeners:
	            {
                     	click: function(){
                            window_form.hide();
                        }
                    }
                    
                },
           ],

          },
          items: [ 
                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 90,
                       width: 250,
                       layout : 'absolute', 
                       labelWidth:80,
                       x: 10,  
                       y : 10,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      txtdnno
                                  ]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      cmbdnno
                                  ]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [
                                      dtdnote
                                  ]
                               },
                       ]
                    },

                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 90,
                       width: 150,
                       layout : 'absolute', 
                       labelWidth:1,
                       x: 260,  
                       y : 10,
                       items: [optselect]
                    },

                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height: 90,
                       width: 500,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  410,  
                       y : 10,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 0,
                                  items: [
                                      cmbparty
                                  ]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:80,
                                  x: 0,  
                                  y: 30,
                                  items: [
                                      cmbdept
                                  ]
                               },
                       ]
                    },

                   {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:200,
                       width: 900,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 110,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 350,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 0,
                                  items: [cmbitem]
                                },
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:40,
                                  x: 310,  
                                  y: 0,
                                  items: [txtuom]
                                },


                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 240,
                                  labelWidth:40,
                                  x: 430,  
                                  y: 0,
                                  items: [txtdnqty]
                               },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:60,
                                  x: 530,  
                                  y: 0,
                                  items: [txtpurpose]
                               }, 
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 500,
                                  labelWidth:60,
                                  x: 800,  
                                  y: 0,
                                  items: [btnsubmit]
                               }, 

                               {
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  height: 190,
                                  width: 850,
                                  labelWidth:75,
                                  x:10,  
                                  y:30,
                                  items: [flxDetail]
                              },

                       ]
                    },

                    {
                       xtype: 'fieldset',
                       title: '',
                       border: true,
                       height:170,
                       width: 900,
                       layout : 'absolute', 
                       labelWidth:80,
                       x:  10,  
                       y : 320,
                       items: [
                               { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 400,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 0,
                                  items: [cmbcarrier]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:50,
                                  x: 400,  
                                  y: 0,
                                  items: [txttruckno]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 600,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 30,
                                  items: [txtremarks]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 60,
                                  items: [cmbfreight]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 240,  
                                  y: 60,
                                  items: [txtfreight]
                                },

                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 300,
                                  labelWidth:50,
                                  x: 0,  
                                  y: 90,
                                  items: [txtrefno]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:80,
                                  x: 240,  
                                  y: 90,
                                  items: [dtref]
                                },
                                { 
                                  xtype: 'fieldset',
                                  title: '',
                                  border: false,
                                  width: 200,
                                  labelWidth:90,
                                  x: 440,  
                                  y: 90,
                                  items: [txtreturndays]
                                },

                      ]
                  },  


          ]     



    });


function RefreshData(){
        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbdnno').hide();

 	loadDNdatastore.removeAll();
	loadDNdatastore.load({
        url: 'ClsDeliveryNote.php',
        params: {
                    task: 'loaddnno',
                    compcode:Gincompcode,
                    finid:Ginfinid  
                },
		callback:function()
      		{
//    alert(loadDNdatastore.getAt(0).get('dnno'));
                    txtdnno.setValue(loadDNdatastore.getAt(0).get('dnno'));
               }
	  });

   };


var window_form = new Ext.Window({
      width        : 945,         //1340,
      height       : 590,
      items        : myFormPanel,
      closable:false,
      resizable:false,
      draggable:false,
      x:150,
      y:35,
      listeners:{
	   show:function()
	   {
		 RefreshData();
                 LoadSupplierDatastore.load({
 		    url: 'ClsDeliveryNote.php',
                    params: {
		       task: 'loadsupplier'
		      	}
                 });

             	LoadDeptDatastore.load({
		    url: 'ClsDeliveryNote.php',
                    params: {
		         task: 'loaddept'
	         	}
               	});                                   					
             	LoadItemDatastore.load({
		    url: 'ClsDeliveryNote.php',
                    params: {
		         task: 'loaditemlist'
	         	}
               	});                                   					

             	LoadCarrierDatastore.load({
		    url: 'ClsDeliveryNote.php',
                    params: {
		         task: 'loadcarrier'
	         	}
               	});        
                           					

	  }

        }  
  
});
  window_form.show();
  
});
