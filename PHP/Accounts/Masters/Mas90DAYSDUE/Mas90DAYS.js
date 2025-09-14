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



 var loadPassword = new Ext.data.Store({
      id: 'loadPassword',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos', 'pw_password'
      ]),
    });

 var loadCustomerListDatastore = new Ext.data.Store({
      id: 'loadCustomerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBlackCustomerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'repr_name','cust_code', 'cust_ref','so_seqdate','so_upto_allowed'
      ]),
    });



   var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 280,
        width: 1000,
        x: 120,
        y: 200,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Rep Name", dataIndex: 'repr_name',sortable:true,width:200,align:'left'},
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:500,align:'left'},
		{header: "Entry Date", dataIndex: 'so_seqdate',sortable:true,width:120,align:'left'},
		{header: "Allowed UPTO Date", dataIndex: 'so_upto_allowed',sortable:true,width:130,align:'left'},

        ],
       store:loadCustomerListDatastore,

       listeners:{
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

  
             }  ,

   }

   });




   var LoadEntryNodatastore = new Ext.data.Store({
      id: 'LoadEntryNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'so_seqno'
      ]),
    });


 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','led_grp_code','led_type','cust_ref'
      ]),
    });

/*
   function check_password()
   {
      if (txtPassword.getRawValue() == "allow90days1")
      {
        Ext.getCmp('save').setDisabled(false);
        Ext.getCmp('save').focus(false, 200);


      }
      else
      {
        Ext.getCmp('save').setDisabled(true);
      }    

   }   

   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
        //    console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 
    });
*/



    var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType: 'password',
        width       :  120,
        border      : false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: '/SHVPM/clsuser.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'SALES',
		       subject  : 'OVERDUE ALLOW',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
	                      Ext.getCmp('save').setDisabled(false);
                              Ext.getCmp('save').focus(false, 200);
                          }
                          else     
                          {   
	                      Ext.getCmp('save').setDisabled(true);
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                      }           

                    }

                });   


                    }           

             }
          },

        } 
    });

   var txtEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtEntryNo',
        name        : 'txtEntryNo',
        width       :  100,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2 /* ,
        listeners:{
                  select:function(){
                         url: MasSalesRate.php',
                         callback: function () 
		           {
                                txtApprovalNo.setValue(ItemDetailsDataStore.getAt(0).get('rateseq'));
                            }
                         };         
        }  */
    });


    var dtpEntry = new Ext.form.DateField({
        fieldLabel: 'Entry Date',
        id: 'dtpEntry',
        name: 'dtpEntry',
        format: 'd-m-Y',
	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });

    var dtpAllowedDate = new Ext.form.DateField({
        fieldLabel: 'Allow Upto Date',
        id: 'dtpAllowedDate',
        name: 'dtpAllowedDate',
        format: 'd-m-Y',
	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });


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

   var dgrecord = Ext.data.Record.create([]);
   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        id : flxLedger,
        x: 450,
        y: 140,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},


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
                                txtPassword.focus();
    
				txtCustomerName.setValue(selrow.get('cust_ref'));

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
                                txtPassword.focus();

				txtCustomerName.setValue(selrow.get('cust_ref'));

                                flxLedger.hide(); 

    

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
                   txtPassword.focus();
   //     Ext.getCmp('save').focus(false, 200);

           
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

   function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsLedger.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtCustomerName.getRawValue(),
		},
        });
}



 
   function RefreshData(){

        Ext.getCmp('save').setDisabled(true);
        flxchk = 0;
	txtCustomerName.setValue("");
        saveflag = "Add";
        customercode =0;


        loadCustomerListDatastore.removeAll();
	loadCustomerListDatastore.load({
          url:'ClsLedger.php',
          params:
       	  {
           task:"loadBlackCustomerList"
          }
	});


	LoadEntryNodatastore.removeAll();
	LoadEntryNodatastore.load({
	 url: 'ClsLedger.php',
		params: {
	    	   task: 'findEntryNo',
		 },
		 callback:function()
		   {
		       txtEntryNo.setValue(LoadEntryNodatastore.getAt(0).get('so_seqno'));
                       txtCustomerName.focus();
		   } 
         });

   };



  function save_click()
{


       if(txtCustomerName.getRawValue()=="" || customercode ==0)
	{
		alert("Select Customer Name..");
		txtCustomerName.setFocus();
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



			Ext.Ajax.request({
                    	url: 'Mas90DAYSSave.php',
	       	        params:
			{
                              saveflag    : saveflag,
                              custcode    : customercode, 
                              entryno     : txtEntryNo.getValue(),                                        
                              entrydate   : Ext.util.Format.date(dtpEntry.getValue(),"Y-m-d"),
 	                      uptodate    : Ext.util.Format.date(dtpAllowedDate.getValue(),"Y-m-d"),

			},
			callback: function (options, success, response)
                	{
		            	var obj = Ext.decode(response.responseText);
		            	if (obj['success'] === "true") 
				{
		             
		                    alert("Recode Saved");
//				    MasGeneralLedgerPanel.getForm().reset();
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
                height  : 200,
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 145,
                                	width       : 600,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtEntryNo]
                          },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 145,
                                	width       : 600,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [dtpEntry]
                          },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 145,
                                	width       : 600,
                                	x           : 0,
                                	y           : 80,
                                    	border      : false,
                                	items: [txtCustomerName]
                          },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 145,
                                	width       : 600,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [dtpAllowedDate]
                          },


	
                ]

            },
       			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 600,
                                	x           : 900,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtPassword]
                            },
     
            flxLedger , flxDetail
            
        ],
    });
    

    var MasGeneralLedger = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'ACCOUNTS - MORE THAN 90 DAYS OUTSTANDING ',
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
