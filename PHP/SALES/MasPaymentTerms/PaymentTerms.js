Ext.onReady(function(){
   Ext.QuickTips.init();

var ginFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');
    var gincompcode = localStorage.getItem('gincompcode');

 var saveflag = "Add";
 var customercode =0;

 var ledgertype = "";
 var grppltype = "";

 var flxchk = 0;






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
                  MasGeneralLedger.hide();

            }
        }]);


;

 var loadPaymentTermsDatastore = new Ext.data.Store({
      id: 'loadPaymentTermsDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPaymtTerms.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGraceDaysCutomerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'repr_name','cust_code', 'cust_ref','cust_cr_days' , 'cust_grace_days'
      ]),
    });

 var loadSearchListDatastore = new Ext.data.Store({
      id: 'loadSearchListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasCreditor.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name'
 

      ]),
    });


var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
               flxDetail.getStore().filter('cust_ref', txtSearch.getValue());  
            }
         }  
    });


   var txtPaymentTerms = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPaymentTerms',
        name        : 'txtPaymentTerms',
        width       :  50,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtGraceDays.foucs;
           
             }
          }    
        }
});  

   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  50,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
	tabindex : 2,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                  add_btn_click();
           
             }
          }    
        }
});  


   var txtCustomerName = new Ext.form.TextField({
        fieldLabel  : 'Customer  Name',
        id          : 'txtCustomerName',
        name        : 'txtCustomerName',
        width       :  400,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

                   flxchk = 1;
                   flxLedger.hide();
                   txtPaymentTerms.foucs;
           
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {

                if (flxchk == 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtCustomerName.getRawValue() != '')
		             LedgerSearch();
                }
            }

	}
    });

   



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsPaymtTerms.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','led_grp_code','led_type','cust_cr_days' , 'cust_grace_days'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsPaymtTerms.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtCustomerName.getRawValue(),
		},
        });
}



   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 450,
        id : flxLedger,
        x: 450,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},
		{header: "Pay Terms", dataIndex: 'cust_cr_days',sortable:true,width:50,align:'left'},
		{header: "GR Days", dataIndex: 'cust_grace_days',sortable:true,width:50,align:'left'},

        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				customercode = selrow.get('cust_code');

                                saveflag = "Edit";
				txtCustomerName.setValue(selrow.get('cust_name'));


			        txtPaymentTerms.setValue(selrow.get('cust_cr_days'));
          			txtGraceDays.setValue(selrow.get('cust_grace_days'));

                                txtGraceDays.focus();   
                                flxLedger.hide();
                   
    

			}
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				customercode = selrow.get('cust_code');

                                saveflag = "Edit";
				txtCustomerName.setValue(selrow.get('cust_name'));


			        txtPaymentTerms.setValue(selrow.get('cust_cr_days'));
          			txtGraceDays.setValue(selrow.get('cust_grace_days'));

                                flxLedger.hide(); 
                                txtGraceDays.focus();
    

			}
		}
 
    
   }
   });



 
   function RefreshData(){

     //   Ext.getCmp('save').setDisabled(true);
        flxchk = 0;
	txtCustomerName.setValue("");
        saveflag = "Add";
        customercode =0;
        loadPaymentTermsDatastore.removeAll();
	loadPaymentTermsDatastore.load({
          url:'ClsPaymtTerms.php',
          params:
       	  {
           task:"loadGraceDaysCutomerList"
          }
	});
   };


function add_btn_click()
{
                var gstInsert = "true";

                if (txtCustomerName.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("", "Select Customer Name");
                }



                if (txtGraceDays.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("", "Enter Grace Days");
                    txtGraceDays.focus();            
                }

/*
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i = 0; i < selrows; i++) {
                    if (sel[i].data.cust_code == customercode) {
                        cnt = cnt + 1;
                    }
                }
	        if (cnt > 0){
	            gstInsert = "false";
	            Ext.MessageBox.alert("","This Customer Already Entered");
                    gstInsert == "false";
	        }
*/
                else    
                {  
                   if (gstInsert == "true")
                   { 
                   var RowCnt = flxDetail.getStore().getCount() + 1;
                   flxDetail.getStore().insert(
                     flxDetail.getStore().getCount(),
                     new dgrecord({
                        slno: RowCnt,
                        cust_ref  : txtCustomerName.getRawValue(),
                        cust_code : customercode,
                        cust_cr_days : txtPaymentTerms.getRawValue(),
                        cust_grace_days : txtGraceDays.getRawValue(),

                     })
                    );
                   txtCustomerName.setRawValue('');
                   customercode = 0;   
	           txtPaymentTerms.setValue('');
		   txtGraceDays.setValue('');
                   txtCustomerName.focus();
                   } 
                  }

}

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        x: 1150,
        y: 27,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
             add_btn_click();

       }  

      }
    });


    var btnPrint = new Ext.Button({
        style: 'text-align:center;',
        text: "PRINT",
        width: 80,
        x: 1150,
        y: 70,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGraceDays.rptdesign&__format=pdf'); 
       }  

      }
    });

   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 1000,
        x: 100,
        y: 120,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Rep Name", dataIndex: 'repr_name',sortable:true,width:200,align:'left'},
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:500,align:'left'},
		{header: "Payment Terms", dataIndex: 'cust_cr_days',sortable:true,width:120,align:'center'},
		{header: "Grace Days", dataIndex: 'cust_grace_days',sortable:true,width:120,align:'center'},
        ],
       store:loadPaymentTermsDatastore,

       listeners:{
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

 
  
             }  ,
	
/*
        'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){

         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Press YES to Delete -  NO to Exit',
             fn: function(btn){
        	if (btn === 'yes'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();;

		}

             }
        });;
			}
*/
                   //CalculatePOVal();
   }

   });

  function save_click()
{

        var rcnt = flxDetail.getStore().getCount();
        if (rcnt <= 0) {
              Ext.MessageBox.alert("", "Transactions Details Not Available ..");
	}
	else
	{
		Ext.MessageBox.show({
                title: 'Confirmation',
                icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
    		msg: 'Do u want to save',
    		fn: function(btn)
		{
		if (btn == 'yes')
                { 
		        var accData = flxDetail.getStore().getRange();
		        var accupdData = new Array();
		        Ext.each(accData, function (record) {
                        accupdData.push(record.data);
		        });

			Ext.Ajax.request({
                    	url: 'MasPayTermsSave.php',
	       	        params:
			{
                              griddet: Ext.util.JSON.encode(accupdData),
                              cnt: accData.length,

			},
			callback: function (options, success, response)
                	{
		            	var obj = Ext.decode(response.responseText);
		            	if (obj['success'] === "true") 
				{
		             
		                    Ext.MessageBox.alert("Alert","Saved ");
				    MasGeneralLedgerPanel.getForm().reset();
				    RefreshData();
		
		                }
		             	else 
				{
		             
					if(obj['cnt']>0)
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

   var MasGeneralLedgerPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'LEDGER MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasGeneralLedgerPanel',
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
                    id: 'save',

                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                               save_click();

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
                            MasGeneralLedger.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ENTER CUSTOMER NAME',
                layout  : 'hbox',
                border  : true,
                height  : 100,
                width   : 1000,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 100,
                y       : 10,
                items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 600,
				x           : 0,
				y           : 0,
			    	border      : false,
				items: [txtCustomerName]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 230,
				x           : 600,
				y           : 0,
			    	border      : false,
				items: [txtPaymentTerms]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 85,
				width       : 230,
				x           : 800,
				y           : 0,
			    	border      : false,
				items: [txtGraceDays]
			},
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 130,
                        width       : 600,
                        x           : 0,
                        y           : 30,
                        border      : false,
                        items: [txtSearch]
                       },



	
                ]

            },

     
            btnAdd,flxDetail,flxLedger,btnPrint
            
        ],
    });
    

    var MasGeneralLedger = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'PAYMENT & GRACE DAYS ENTRY',
        items       : MasGeneralLedgerPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){
                    txtCustomerName.focus();
  		    flxLedger.hide(); 
                    flxchk = 0;
                    RefreshData();
		}
        } 
    });
    MasGeneralLedger.show();  
});
