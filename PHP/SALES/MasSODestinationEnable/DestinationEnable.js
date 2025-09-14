Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
   var GinFinid = localStorage.getItem('tfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


 var saveflag = "Add";
 var accgrpcode =0;

 var loadDestinationCustomerListDatastore = new Ext.data.Store({
      id: 'loadDestinationCustomerListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsDestinationEnable.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDestinationEnableCustomerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'cust_code','cust_ref','cust_destination_enable_yn'

      ]),
    });


  var loadledgerdatastore = new Ext.data.Store({
      id: 'loadledgerdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'clsDestinationEnable.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadledger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });


 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
	autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });

 

var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350, 	
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
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

                        var RowCnt = flxDetail.getStore().getCount() + 1;
                        flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
		                   cust_code  : cmbCustomer.getValue(),
		                   cust_ref   : cmbCustomer.getRawValue(),
                                   cust_destination_enable_yn  : 'Y'
			           
                               }) 
                               );
		
         }
	}
 
});


   function RefreshData(){

        saveflag = "Add";

        loadDestinationCustomerListDatastore.removeAll();
	loadDestinationCustomerListDatastore.load({
          url:'clsDestinationEnable.php',
          params:
       	  {
           task:"loadDestinationEnableCustomerList"
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
        height: 350,
        width: 600,
        x: 300,
        y: 140,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   

		{header: "Cust Code", dataIndex: 'cust_code',sortable:true,width:90,align:'left',hidden :'true'},   
		{header: "Customer Name", dataIndex: 'cust_ref',sortable:true,width:470,align:'left'},
		{header: "Enable Destination ", dataIndex: 'cust_destination_enable_yn',sortable:true,width:100,align:'left'},

        ],
       store:loadDestinationCustomerListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

                if (cellIndex == 2)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.cust_destination_enable_yn == 'N')
                                    flag = 'N';
                                else                                   
                                    flag = 'Y';
                                             
                               	colname = 'cust_destination_enable_yn';
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


                   //CalculatePOVal();
   }

   });


   var MasSODestinationPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SIDE EDGE PROTECTOR CUSTOMER LIST',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSODestinationPanel',
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
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
/*	
				if(cmbCustomer.getRawValue()=="" || cmbCustomer.getRawValue()==0)
				{
					alert("Select Customer Name");
					}

		
				else
				{
*/
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{

					    var SalesData = flxDetail.getStore().getRange();                                        
					    var SalesupData = new Array();
					    Ext.each(SalesData, function (record) {
						SalesupData.push(record.data);
					    });

						Ext.Ajax.request({
		                            	url: 'DestinationEnableSave.php',
                		       	        params:
						{
							cnt: SalesData.length,
						       	griddet: Ext.util.JSON.encode(SalesupData),    
		

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    MasSODestinationPanel.getForm().reset();
							RefreshData();
						
                                                }
                                             	else 
						{
                                                     Ext.MessageBox.alert("Alert","Not Saved.. ");
	                                             
                                            	}
                                      
					 	}   
			        		});
			    	
		         		}
                                }
 		    	});
//				}
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
                            MasSODestinationCustomerWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'SO DESTINATION ENABLE CUSTOMER LIST',
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
                                	labelWidth  : 100,
                                	width       : 600,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbCustomer]
                            },


	
                ]

            },flxDetail,
            
        ],
    });
    

    var MasSODestinationCustomerWindow = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'SO DESTINATION ENABLE CUSTOMER LIST',
        items       : MasSODestinationPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
	

		}
        }  
    });
    MasSODestinationCustomerWindow.show();  
});
