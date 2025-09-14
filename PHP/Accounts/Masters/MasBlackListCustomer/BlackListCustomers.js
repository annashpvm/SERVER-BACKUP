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


   function check_password()
   {
      if (txtPassword.getRawValue() == "blackok")
      {
        Ext.getCmp('save').setDisabled(false);
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

 var loadBlackListCustomerListDatastore = new Ext.data.Store({
      id: 'loadBlackListCustomerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsBlackList.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBlackCustomerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'repr_name','cust_code', 'cust_ref','cust_lock'
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
alert("hait");
                   flxchk = 1;
                   flxLedger.hide();
                   btnAdd.foucs;
           
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
                url: 'ClsBlackList.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_name','led_grp_code','led_type'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsBlackList.php',
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
        width: 420,
        id : flxLedger,
        x: 450,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_name',sortable:true,width:330,align:'left'},


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
                                btnAdd.focus();   
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

                                flxLedger.hide(); 
                                btnAdd.focus();
    

			}
		}
 
    
   }
   });



 
   function RefreshData(){

        Ext.getCmp('save').setDisabled(true);
        flxchk = 0;
	txtCustomerName.setValue("");
        saveflag = "Add";
        customercode =0;
        loadBlackListCustomerListDatastore.removeAll();
	loadBlackListCustomerListDatastore.load({
          url:'ClsBlackList.php',
          params:
       	  {
           task:"loadBlackCustomerList"
          }
	});
   };

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        x: 920,
        y: 27,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
 
                var gstInsert = "true";

                if (txtCustomerName.getRawValue() == '') {
                    gstInsert = "false";
                    Ext.MessageBox.alert("", "Select Customer Name");
                }



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
                else    
                {  
                   var RowCnt = flxDetail.getStore().getCount() + 1;
                   flxDetail.getStore().insert(
                     flxDetail.getStore().getCount(),
                     new dgrecord({
                        slno: RowCnt,
                        cust_ref  : txtCustomerName.getRawValue(),
                        cust_code : customercode,
                        cust_lock : 'Y',
                     })
                    );
                   txtCustomerName.setRawValue('');
                    customercode = 0;   
                  }
       }  

      }
    });



    var btnPrint = new Ext.Button({
        style: 'text-align:center;',
        text: "PRINT",
        width: 80,
        x: 1050,
        y: 27,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccMorethan90dayslist.rptdesign&__format=pdf'); 
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
        x: 200,
        y: 120,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Rep Name", dataIndex: 'repr_name',sortable:true,width:200,align:'left'},
		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:500,align:'left'},
		{header: "Black for SO/INV", dataIndex: 'cust_lock',sortable:true,width:150,align:'center'},

        ],
       store:loadBlackListCustomerListDatastore,

       listeners:{
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

                if (cellIndex == 3)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.cust_lock == 'N')
                                    flag = 'N';
                                else                                   
                                    flag = 'Y';
                                             
                               	colname = 'cust_lock';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				} else 
				{
				   selected_rows[i].set(colname, 'N');
				}
                       }   
                }
  
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
                    	url: 'MasBlackListSave.php',
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
                width   : 600,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 300,
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
                        width       : 600,
                        x           : 0,
                        y           : 30,
                        border      : false,
                        items: [txtSearch]
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
     
            btnAdd,flxDetail,flxLedger,btnPrint,
            
        ],
    });
    

    var MasGeneralLedger = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'ACCOUNTS - Black List Customers',
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
