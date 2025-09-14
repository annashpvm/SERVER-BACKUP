Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var GinCompcode = localStorage.getItem('gincompcode');

   var Saveflag = "Add";
var supcode = 0;

var gridedit= "false";
 
   var printtype='PDF';
var bank = 'OTH'
var truckno = '';


new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  MasBankindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);


var dtpstdate = new Ext.form.DateField({
    fieldLabel : 'From',
    id         : 'dtpstdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var dtpeddate = new Ext.form.DateField({
    fieldLabel : 'To',
    id         : 'dtpeddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var cmbReason = new Ext.form.ComboBox({
        fieldLabel      : 'Payment Reason ',
        width           : 250,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbReason',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Waste Paper','Bio Fuel','Transport','Advance','Salary','Diesel'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
});



var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: true,
    width:220,
    height:100,

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});

var repopt = 'CUB';
var optRepOpt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    width:220,
    height:70,

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRepOpt',
        items: [
		{boxLabel: 'CUB', name: 'optRepOpt', id:'prtCUB', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    repopt = 'CUB';

					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optRepOpt', id:'optOTHBand', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
				            repopt = 'OTH';
					}
				}
			}
		},
            
        ],
    }



    ]
});


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clsfundsrequest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

       'sup_name',  'sup_bank_bankname', 'sup_bank_branch', 'sup_bank_ifsc', 'sup_bank_bank_acno','sup_bank'
 

      ]),
    });

function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'Clsfundsrequest.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtSupplier.getRawValue(),
		},
        });
}

function save_click()
{

        if (flxDetail.rows==0)
	    {
		Ext.Msg.alert('Advice','Grid should not be empty..');
		gstSave="false";
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

                           var advData = flxDetail.getStore().getRange();                                        
                           var advupdData = new Array();
                            Ext.each(advData, function (record) {
                                advupdData.push(record.data);
                            });

			Ext.Ajax.request({
                    	url: 'FrmFundsRequestSave.php',
                        params:
			{
                                saveflag  : Saveflag,
                             	griddet	  : Ext.util.JSON.encode(advupdData),  
                                cnt       : advData.length,   
				compcode  : GinCompcode,                                 
                                finid     : GinFinid,
                                entno     : txtEntNo.getValue(),
				entdate   : Ext.util.Format.date(dtpVouDate.getValue(),"Y-m-d"), 


			},
			callback: function (options, success, response)
                	{
                    	var obj = Ext.decode(response.responseText);
			var obj2 = Ext.decode(response.responseText);
                    	if (obj['success'] === "true") 
			{

			Ext.MessageBox.alert("Alert","Saved ");
			    MasBankPanel.getForm().reset();
                               flxDetail.getStore().removeAll();
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

 var loadEntNoListDatastore = new Ext.data.Store({
      id: 'loadEntNoListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clsfundsrequest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'f_frm_no'
      ]),
    });

 var loadEntNoDetailDatastore = new Ext.data.Store({
      id: 'loadEntNoDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clsfundsrequest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEntNoDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'f_frm_no', 'f_frm_date', 'f_sno', 'f_supplier','f_bank', 'f_bankname', 'f_bankbranch', 'f_bankifsc', 'f_bankacno', 'f_amount','sup_name','f_reason'
      ]),
    });


 var loadEntryNumberDataStore = new Ext.data.Store({
      id: 'loadEntryNumberDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'Clsfundsrequest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'f_frm_no',
      ]),
    });



 var loadSupplierListDataStore = new Ext.data.Store({
      id: 'loadSupplierListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'Clsfundsrequest.php',      // File to connect to
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
                url: 'Clsfundsrequest.php',      // File to connect to
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
        txtAmount.focus();
	loadSupplierBankDataStore.removeAll();
	loadSupplierBankDataStore.load({
		url: 'Clsfundsrequest.php',
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
		{header: "", dataIndex: 'sup_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'sup_bank_bankname',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'sup_bank_branch',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'sup_bank_ifsc',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'sup_bank_bank_acno',sortable:true,width:330,align:'left',hidden:true},
		{header: "", dataIndex: 'sup_bank',sortable:true,width:330,align:'left',hidden:true},

        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			txtSupplier.setRawValue(selrow.get('sup_name'));
			txtBankName.setRawValue(selrow.get('sup_bank_bankname'));
			txtBankBranch.setRawValue(selrow.get('sup_bank_branch'));
			txtBankIFSC.setRawValue(selrow.get('sup_bank_ifsc'));
			txtBankACNo.setRawValue(selrow.get('sup_bank_bank_acno'));
                        bank = selrow.get('sup_bank');
                        flxParty.hide();  
                        }
                     });
             },
        'cellclick' : function(flxParty, rowIndex, cellIndex, e){
			var sm = flxParty.getSelectionModel();
			var selrow = sm.getSelected();
			txtSupplier.setRawValue(selrow.get('sup_name'));
			txtBankName.setRawValue(selrow.get('sup_bank_bankname'));
			txtBankBranch.setRawValue(selrow.get('sup_bank_branch'));
			txtBankIFSC.setRawValue(selrow.get('sup_bank_ifsc'));
			txtBankACNo.setRawValue(selrow.get('sup_bank_bank_acno'));
                        bank = selrow.get('sup_bank');
                        flxParty.hide();  


               }
          }

   });




     var cmbEntNo = new Ext.form.ComboBox({
        fieldLabel      : 'Fund Req. No',
        width           : 100,
        displayField    : 'f_frm_no',
        valueField      : 'f_frm_no',
        hiddenName      : 'f_frm_no',
        id              : 'cmbEntNo',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',  
   	store		: loadEntNoListDatastore,     
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

                    txtEntNo.setValue(cmbEntNo.getValue());
                    loadEntNoDetailDatastore.removeAll(); 
                    loadEntNoDetailDatastore.load({
                       url: 'Clsfundsrequest.php',
                       params:
                       {
                          task:"loadEntNoDetail",
                          entno:cmbEntNo.getValue(),
                          finid:GinFinid,
                          compcode:GinCompcode

                       },  
                       callback: function () 
		       {
                         flxDetail.getStore().removeAll();
                         var cnt=loadEntNoDetailDatastore.getCount();
//alert(cnt);
                         if(cnt>0)
		         {  
                          dtpVouDate.setRawValue(Ext.util.Format.date(loadEntNoDetailDatastore.getAt(0).get('f_frm_date'),"d-m-Y"));
                         for(var j=0; j<cnt; j++)
                          { 
                                var RfowCnt = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                 new dgrecord({
                                       slno              : loadEntNoDetailDatastore.getAt(j).get('f_sno'),    
                                       sup_name          : loadEntNoDetailDatastore.getAt(j).get('f_supplier'),      
                                       sup_bank          : loadEntNoDetailDatastore.getAt(j).get('f_bank'),      
                                       sup_bank_bankname : loadEntNoDetailDatastore.getAt(j).get('f_bankname'),
                                       sup_bank_branch   : loadEntNoDetailDatastore.getAt(j).get('f_bankbranch'),  
                                       sup_bank_ifsc     : loadEntNoDetailDatastore.getAt(j).get('f_bankifsc'),  
                                       sup_bank_bank_acno: loadEntNoDetailDatastore.getAt(j).get('f_bankacno'), 
                                       amount            : loadEntNoDetailDatastore.getAt(j).get('f_amount'),
                                       reason            : loadEntNoDetailDatastore.getAt(j).get('f_reason'),


                                   })
                                );

	             	        grid_tot();
                             } // for loop end

                         }  
                         else {  
                            alert("ENTRY Number not found..."); 
                         }  // if end
            
                      }  // call back function end
                   });

               }

	}
   });
   
    var txtEntNo = new Ext.form.TextField({
        fieldLabel: 'Fund Req. No',
        id: 'txtEntNo',
        width: 100,
        name: '',
        readOnly: true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    });

    var dtpVouDate= new Ext.form.DateField({
        fieldLabel: ' Date',
        id: 'dtpVouDate',
        name: '',
        format: 'd-m-Y',
        value: new Date(),
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              NewDateCheck();
           },
           keyup:function(){
              NewDateCheck();
            },
        }  	
        
    });

function grid_tot(){
	fdbl_totalvalue=0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            fdbl_totalvalue=fdbl_totalvalue+Number(sel[i].data.amount);
        }
        txtTotalAmount.setValue(fdbl_totalvalue);
}

function  add_btn_click()
{
          	var addok;
	              addok ="true";
/*
        	      if ( txtBankName.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Advice','Enter Bank Name.....');
        	                addok="false";
        	         }
      	                 else if (txtBankBranch.getRawValue()=="")
             	         {
        	                Ext.Msg.alert('Advice','Enter Branch Name..');
        	                addok="false";
        	         }
      	                 else if (txtBankIFSC.getRawValue()=="")
             	         {
        	                Ext.Msg.alert('Advice','Enter IFSC Code..');
                                cmbPurpose.focus();
        	                addok="false";
        	         }
		        else

                        if(txtBankIFSC.getValue().length != 11)
			{
				alert("Error in  IFSC Please check");
				txtBankIFSC.setFocus();
			}   
      	                 else
*/
                         if (txtBankACNo.getRawValue()=="")
             	         {
        	                Ext.Msg.alert('Advice','Enter Account Number..');
                                cmbPurpose.focus();
        	                addok="false";
        	         }
         	         else if (txtAmount.getValue()==0 || txtAmount.getRawValue()=="")
        	         {
        	                Ext.Msg.alert('Advice','Enter Amount..');
        	                addok="false";
        	         }
      
        
                         else 
                         {

		           flxDetail.getSelectionModel().selectAll();
		           var selrows = flxDetail.getSelectionModel().getCount();
		           var sel = flxDetail.getSelectionModel().getSelections();
			   var cnt = 0;

                           if (gridedit == "false")
                           { 
		                   for (var i=0;i<selrows;i++)
		                   {
		                      if (sel[i].data.sup_name == txtSupplier.getRawValue())
			              {
		                        cnt = cnt + 1;
		                      }
		                   }
                           }
                           if(gridedit === "true")

                           {
             			gridedit = "false";
                        	var idx = flxDetail.getStore().indexOf(editrow);
 
		        	sel[idx].set('sup_name'      , txtSupplier.getRawValue());
          			sel[idx].set('sup_bank', bank);
          			sel[idx].set('sup_bank_bankname', txtBankName.getRawValue());
	         		sel[idx].set('sup_bank_branch'  , txtBankBranch.getRawValue());
             			sel[idx].set('sup_bank_ifsc'     , txtBankIFSC.getRawValue());
				sel[idx].set('sup_bank_bank_acno', txtBankACNo.getRawValue());
				sel[idx].set('amount'            , txtAmount.getValue());
				sel[idx].set('reason'            , cmbReason.getValue());
              			flxDetail.getSelectionModel().clearSelections();
                              

		            }//if(gridedit === "true")

                            else
                            if (cnt ==0)
                            { 
                               var RowCnt = flxDetail.getStore().getCount() + 1;
                               flxDetail.getStore().insert(
                                 flxDetail.getStore().getCount(),
                                 new dgrecord({
                                   slno:RowCnt,
                                   sup_name:txtSupplier.getRawValue(),
                                   sup_bank : bank,
			    	   sup_bank_bankname:txtBankName.getRawValue(),
			           sup_bank_branch:txtBankBranch.getRawValue(),
				   sup_bank_ifsc:txtBankIFSC.getRawValue(),
				   sup_bank_bank_acno:txtBankACNo.getRawValue(),
				   amount:txtAmount.getValue(),
				   reason :cmbReason.getValue(),
 

                                 }) 
                               );

		            }
                            else
                            {
	                 	alert("Same Supplier Already Entered.. ");
                            } 
                               grid_tot();
	          	       refresh();

            }
}

var btnAdd = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 70,
        height  : 40, 
        text    : "ADD  ",
        x       : 450,
        y       : 45,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
              add_btn_click();
         }
        }
});

var btnView = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 70,
        height  : 40, 
        text    : "VIEW  ",
        x       : 50,
        y       : 45,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
           
				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var finid = "&finid=" + encodeURIComponent(GinFinid);
				var vouno = "&vouno=" + encodeURIComponent(0);
				var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
				var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );
				var bank = "&bank=" + encodeURIComponent(repopt);
				var param =(compcode+finid+vouno+fromdate+todate+bank);


                if (repopt  == "CUB")
                {
                if (printtype == "PDF")
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_CUB.rptdesign&__format=pdf&' + param, '_blank'); 
	        else if (printtype == "XLS") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_CUB.rptdesign&__format=XLS&' + param, '_blank'); 
	        else
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_CUB.rptdesign&' + param, '_blank');   
                 }
                 else
                {
                if (printtype == "PDF")
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_OTH.rptdesign&__format=pdf&' + param, '_blank'); 
                else if (printtype == "XLS") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_OTH.rptdesign&__format=XLS&' + param, '_blank'); 
                else
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMDatewise_OTH.rptdesign&' + param, '_blank');   
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
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtAmount.focus();
             }
             
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
            },
	    keyup: function () {
         	flxParty.getEl().setStyle('z-index','10000');
                flxParty.show();
                loadSearchPartyListDatastore.removeAll();
                  if (txtSupplier.getRawValue() != '')
                     PartySearch();
 //flxParty.hide();
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
        enableKeyEvents: true,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'20'},
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

  var txtAmount = new Ext.form.NumberField({
        fieldLabel  : 'Amount.',
        id          : 'txtAmount',
        name        : 'txtAmount',
        width       :  120,
        allowBlank  :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{
		specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
		          btnAdd.focus();
		     }
		 },
            keyup:function(){
               
            }  
        } 

    });

  var txtTotalAmount = new Ext.form.NumberField({
        fieldLabel  : 'Total Amount.',
        id          : 'txtTotalAmount',
        name        : 'txtTotalAmount',
        width       :  120,
        allowBlank  :  true,
        readOnly    : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        listeners:{
            keyup:function(){

            }  
        } 

    });

   function RefreshData(){
	txtBankName.setRawValue("");
	txtBankBranch.setRawValue("");
        txtBankACNo.setRawValue("");
         cmbEntNo.hide();
         Saveflag = "Add";
         flxParty.hide();  
	loadSupplierListDataStore.load({
		url: 'Clsfundsrequest.php',
		params: {
    			task: 'LoadBankSupplierList'
		}
	});
        loadEntryNumberDataStore.load({
        url:'Clsfundsrequest.php',
        params:
        {
        task:"LoadEntryNo",
	compcode : GinCompcode,
	finid:GinFinid
        },
	callback:function()
	{
	txtEntNo.setValue(loadEntryNumberDataStore.getAt(0).get('f_frm_no'));
	}
	});



      



};


   function refresh(){
        txtAmount.setValue('');
        txtSupplier.setValue('');
	txtSupplier.focus();
        txtBankName.setRawValue('');
        txtBankBranch.setRawValue('');
        txtBankIFSC.setRawValue('');
        txtBankACNo.setRawValue('');


};

   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1100,
        x: 0,
        y: 0,
        columns: [   
            {header: "S No.", dataIndex: 'slno',sortable:true,width:50,align:'left'}, 
            {header: "Sup. Name", dataIndex: 'sup_name',sortable:true,width:200,align:'left'},
            {header: "Bank", dataIndex: 'sup_bank',sortable:true,width:50,align:'left'},
            {header: "Bank Name ", dataIndex: 'sup_bank_bankname',sortable:true,width:200,align:'left'}, 
            {header: "Branch", dataIndex: 'sup_bank_branch',sortable:true,width:200,align:'left'}, 
            {header: "IFSC", dataIndex: 'sup_bank_ifsc',sortable:true,width:150,align:'left'}, 
            {header: "Account No.", dataIndex: 'sup_bank_bank_acno',sortable:true,width:150,align:'left'},
            {header: "AMOUNT", dataIndex: 'amount',sortable:true,width:100,align:'right'},
            {header: "REASON", dataIndex: 'reason',sortable:true,width:120,align:'left'},


        ],
        store:[],

    listeners:{	

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
        
         Ext.Msg.show({
             title: 'Purchase GST Master',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,

		msg: 'Press YES to Modify',
		fn: function(btn){
		if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('tax_code'));
				gridedit = "true";
				editrow = selrow;
				supcode = selrow.get('suppliercode');				
				txtSupplier.setRawValue(selrow.get('sup_name'));
				txtBankName.setValue(selrow.get('sup_bank_bankname'));
				txtBankBranch.setValue(selrow.get('sup_bank_branch'));
				txtBankIFSC.setValue(selrow.get('sup_bank_ifsc'));
				txtBankACNo.setValue(selrow.get('sup_bank_bank_acno'));
				txtAmount.setValue(selrow.get('amount'));
				cmbReason.setValue(selrow.get('reason'));
				
                                bank = selrow.get('sup_bank');
				flxDetail.getSelectionModel().clearSelections();

		}
		else if (btn === 'no'){


		}
		}

     });   
     
    }    
   }

   });


function edit_click()
{
                          Saveflag = "Edit";
                           viewopt = 1;
                           cmbEntNo.show();
                           loadEntNoListDatastore.removeAll();
                           loadEntNoListDatastore.load({
			     url: 'clsIndent.php',
			     params:
				    {
				        task: "loadEntNoList",
				        finid: GinFinid,
				        compcode:GinCompcode,

				    }
        		     });
}
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
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                            save_click();
                        }
                    }
                },'-',                
 //EDIT
                {
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/icons/edit.png',
                    listeners:{
                       click: function () {
                            edit_click();
                           }
                    }
                    
                },'-',      
//VIEW
                {
                    text: 'View',
                    id: 'view',
                    style: 'text-align:center;',
                    tooltip: 'View Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
				var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
				var finid = "&finid=" + encodeURIComponent(GinFinid);
				var vouno = "&vouno=" + encodeURIComponent(txtEntNo.getRawValue());
				var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") );
				var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") );
				var bank = "&bank=" + encodeURIComponent(repopt);
				var param =(compcode+finid+vouno+fromdate+todate+bank);
                if (printtype == "PDF")
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMVoucher.rptdesign&__format=pdf&' + param, '_blank'); 
                else if (printtype == "XLS") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMVoucher.rptdesign&__format=XLS&' + param, '_blank'); 
                else
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFRMVoucher.rptdesign&' + param, '_blank');   

                        }
                    }
                }, '-',
                            
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

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 550,
                             x           : 0,
                             y           : 30,
                             border      : false,
                             items: [txtEntNo]   	
                           },
                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 550,
                             x           : 0,
                             y           : 30,
                             border      : false,
                             items: [cmbEntNo]   	
                           },
                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 550,
                             x           : 0,
                             y           : 60,
                             border      : false,
                             items: [dtpVouDate]   	
                           },
                       { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 0,
			     y       : 100,
                             items: [optprinttype]
                        },


            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 240,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,	
                items:[

                          { 
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 550,
                             x           : 0,
                             y           : -5,
                             border      : false,
                             items: [txtSupplier]   	
                           },

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 35,
                              border      : false,
                              items: [txtBankName]
                            },


                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 65,
                              border      : false,
                              items: [txtBankBranch]
                            } ,   
		

                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 550,
                              x           : 0,
                              y           : 95,
                              border      : false,
                              items: [txtBankIFSC]
                            },





                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 500,
                              x           : 0,
                              y           : 125,
                              border      : false,
                              items: [txtBankACNo]
                            },
                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 500,
                              x           : 0,
                              y           : 155,
                              border      : false,
                              items: [txtAmount]
                            } ,
                     { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 500,
                              x           : 0,
                              y           : 185,
                              border      : false,
                              items: [cmbReason]
                            } ,


                  {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 100,
                        x           : 400,
                        y           : 140,                        
                        border      : false,
                        items: [btnAdd]
                    }

                            , flxParty, 

                ]
            },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 220,
                width   : 300,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 980,
                y       : 10,	
                items:[
                       optRepOpt,

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 10,
					y           : 140,
					border      : false,
					items: [dtpstdate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 10,
					y           : 165,
					border      : false,
					items: [dtpeddate]
				},


                  {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 100,
                        x           : 200,
                        y           : 140,                        
                        border      : false,
                        items: [btnView]
                    }
                ]
            },
            { xtype   : 'fieldset',
                title   : 'DETAILS',
                layout  : 'hbox',
                border  : true,
                height  : 270,
                width   : 1150,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 70,
                y       : 250,
                items:[flxDetail,
                            { 
                              xtype       : 'fieldset',
                              title       : '',
                              labelWidth  : 130,
                              width       : 500,
                              x           : 750,
                              y           : 195,
                              border      : false,
                              items: [txtTotalAmount]
                            } 
               ]
            },  

        ],
    });
    
   
    var MasBankindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'FUNDS REQUEST ENTRY',
        items       : MasBankPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
	flxParty.hide();
        txtBankName.focus();
},
	listeners:{
               show:function(){
                      RefreshData();
		}
        } 
    });
    MasBankindow.show();  
});
