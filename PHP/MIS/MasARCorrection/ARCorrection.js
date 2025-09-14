Ext.onReady(function(){
   Ext.QuickTips.init();
var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var loadInvoiceNoDataStore = new Ext.data.Store({
      id: '`',
     autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsARCorrection.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvoiceno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'accref_payref_no'
      ]),
    });
var loadInvamtDataStore = new Ext.data.Store({
      id: '`',
     autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsARCorrection.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvoiceamt"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'acctrail_inv_value','acctrail_crdays','acctrail_adj_value'
      ]),
    });
 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsARCorrection.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'led_name','led_code'
      ]),
    });


 var cmbinvno = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 150,
        displayField    : 'accref_payref_no',
        valueField      : 'accref_payref_no',
        hiddenName      : '',
        id              : 'cmbinvno',
	style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	
        typeAhead       : true,
	emptyText       : '',
        mode            : 'local',
       store           : loadInvoiceNoDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        listeners : {

        select : function() {
 loadInvamtDataStore.removeAll();
	       // cmbinvno.clearValue();
		loadInvamtDataStore.load({
		 url: 'ClsARCorrection.php',
			params: {
		    	   task: 'loadinvoiceamt',
			   compcode : Gincompcode,
			   finid    : GinFinid,   

            	 cust_code : cmbCustomer.getValue(),

                 acctrail_inv_no : cmbinvno.getValue(),
				},
		callback:function()
		{
	
                      
			txtCreditDays.setRawValue(loadInvamtDataStore.getAt(0).get('acctrail_crdays')); 
txtInvAmt.setRawValue(loadInvamtDataStore.getAt(0).get('acctrail_inv_value'));


txtAdjAmt.setRawValue(loadInvamtDataStore.getAt(0).get('acctrail_adj_value'));

txtBalAmt.setRawValue(loadInvamtDataStore.getAt(0).get('acctrail_inv_value')- loadInvamtDataStore.getAt(0).get('acctrail_adj_value'));

		}
		

  
        })
}
}
   });
   
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350, 	
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true ,
    labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

              loadInvoiceNoDataStore.removeAll();
	        cmbinvno.clearValue();
		loadInvoiceNoDataStore.load({
		 url: 'ClsARCorrection.php',
			params: {
		    	   task: 'loadinvoiceno',
			   compcode : Gincompcode,
			   finid    : GinFinid,   

            	 cust_code : cmbCustomer.getValue(),

          
  
                  
		
         }
	})
}
}
 
});
   
   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  80,
	//readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    }); 


   var txtInvAmt = new Ext.form.NumberField({
        fieldLabel  : 'Invoice Amount',
        id          : 'txtInvAmt',
        name        : 'txtInvAmt',
        width       :  150,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
    }); 



   var txtBalAmt = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amount',
        id          : 'txtBalAmt',
        name        : 'txtBalAmt',
        width       :  150,
//	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
  	enableKeyEvents: true,
        listeners:{
		    keyup:function(){
//                     txtBalAmt.setValue( Number(txtInvAmt.getValue())-Number(txtAdjAmt.getValue())); 
                     txtAdjAmt.setValue( Number(txtInvAmt.getValue())-Number(txtBalAmt.getValue())); 

            },      
  	}
    }); 

    var btnCreditor = new Ext.Button({
        style: 'text-align:center;',
        text: "Supplier Update",
        width: 150,
        id : 'btnCreditor',
        x: 700,
        y: 50,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                    var gstSave;
                    gstSave="true";

                          Ext.Ajax.request({
                          url: 'FrmSupplierUpdate.php',
                          params :
                             {

                             },
                         callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Supplier Lists  are updated...");
                                  }else{
      Ext.MessageBox.alert("Supplier Lists are Not  updated..Pls.Check!") ;                                                  
                                    }
                                }
                           });         
   

        }
       }  
    });


    var btnSales = new Ext.Button({
        style: 'text-align:center;',
        text: "Update Sales Ledgers",
        width: 150,
        id : 'btnSales',
        x: 700,
        y: 100,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                    var gstSave;
                    gstSave="true";

                          Ext.Ajax.request({
                          url: 'FrmSALESLedgerUpdate.php',
                          params :
                             {

                             },
                         callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Sales Ledgers are updated...");
                                  }else{
                             Ext.MessageBox.alert("Sales Ledger are Not Update. Please check !");                                     }
                                }
                           });         
   

        }
       }  
    });



    var btnPurchases = new Ext.Button({
        style: 'text-align:center;',
        text: "Update Purchase Ledgers",
        width: 150,
        id : 'btnPurchases',
        x: 700,
        y: 150,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                    var gstSave;
                    gstSave="true";

                          Ext.Ajax.request({
                          url: 'FrmPURCHASELedgerUpdate.php',
                          params :
                             {

                             },
                         callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Purchase Ledgers are updated...");
                                  }else{
Ext.MessageBox.alert("Purchase Ledgers are NOT updated.. Pls.Check!") ;                                                  
                                    }
                                }
                           });         
   

        }
       }  
    });



    var btnMergeDuplicate = new Ext.Button({
        style: 'text-align:center;',
        text: "Merge Duplicates",
        width: 150,
        id : 'btnMergeDuplicate',
        x: 700,
        y: 200,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                    var gstSave;
                    gstSave="true";

                          Ext.Ajax.request({
                          url: 'FrmPURCHASELedgerChangeNew.php',
                          params :
                             {

                             },
                         callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Ledger Merging work was completed...");
                                  }else{
Ext.MessageBox.alert("Ledger Merging work Not Completed .. Pls.Check!") ;                                                  
                                    }
                                }
                           });         
   

        }
       }  
    });




   var txtAdjAmt = new Ext.form.NumberField({
        fieldLabel  : 'Adjusted Amount',
        id          : 'txtAdjAmt',
        name        : 'txtAdjAmt',
        width       :  150,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
  	enableKeyEvents: true,
        style : "font-size:14px;font-weight:bold",

    }); 
 var ARPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 500,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'ARPanel',
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
            fontSize:25,
            items: [

	    {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            id:'save',
            listeners:{
                click:function()
                {
//save
/*
                    var gstSave;
                    gstSave="true";

                          Ext.Ajax.request({
                          url: 'FrmARCorrectionSave.php',
                          params :
                             {
			        compcode : Gincompcode,
			        finid    : GinFinid,   

            		       cust_code : cmbCustomer.getValue(),

                               acctrail_inv_no : cmbinvno.getValue(),
			       acctrail_adj_value: txtAdjAmt.getValue(),
                               acctrail_crdays :txtCreditDays.getValue(),
		
                               

                             },
                         callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Invoice No -" + obj['acctrail_inv_no'] + " Saved Sucessfully");
                                   txtCreditDays.setValue('') ;
				   txtAdjAmt.setValue('') ;
			           txtBalAmt.setValue('') ;
				   txtInvAmt.setValue('') ;
                                  }else{
                                  Ext.MessageBox.alert("Invoice No  Not Completed! Pls Check!- " + obj['acctrail_inv_no']);                                                  
                                    }
                                }
                           });         
   
*/
                          }

             } 	
        },'-',
  


                   
               {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                   
                },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    
        },]
},
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
{ 
		           xtype       : 'fieldset',
			   title       : '',
			   labelWidth  : 150,
			   width       : 600,
			   x           : 0,
			   y           : -10,
			   border      : false,
			   items: [cmbCustomer]
		     },
		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:400,
	    		x	:0,
	    		y	:50,
	    		border	:false,
	    		items:[cmbinvno]
	    		},
			 
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 350,
                            x           : 0,
                            y           : 100,
                            border      : false,
                            items: [txtCreditDays]
                         },
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 150,
                            border      : false,
                            items: [txtInvAmt]
                         },
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 200,
                            border      : false,
                            items: [txtBalAmt]
                         },
			{ 
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 150,
                            width       : 450,
                            x           : 0,
                            y           : 250,
                            border      : false,
                            items: [txtAdjAmt]
                         }
                 
]
}, btnCreditor,btnSales,btnPurchases,btnMergeDuplicate
]
});
 var ARWindow = new Ext.Window({
	height      : 540,
        width       : 900,
        y           : 30,
        title       :'AR REGISTER',
        items       : 'ARPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,

 	listeners:{
               show:function(){
              // RefreshData();

//btnCreditor.setDisabled(true);   
btnSales.setDisabled(true);
btnPurchases.setDisabled(true);
             }
             }
            });
             
            ARWindow.show();  
        });      
   
