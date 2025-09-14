Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');

var saveflag = "New";
var bankcode = 0;
  var loadbankdatastore = new Ext.data.Store({
      id: 'loadbankdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasBankDetails.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadbank"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['bank_code', 'bank_name', 'bank_branch', 'bank_ifsc','bank_acno'
      ]),
    });



var txtbank = new Ext.form.TextField({
	fieldLabel  : 'BANK NAME',
	id          : 'txtbank',
	name        : 'txtbank',
	width       :  300,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtbranch = new Ext.form.TextField({
	fieldLabel  : 'BRANCH',
	id          : 'txtbranch',
	name        : 'txtbranch',
	width       :  300,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtifsc = new Ext.form.TextField({
	fieldLabel  : 'IFSC',
	id          : 'txtifsc',
	name        : 'txtifsc',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtacno = new Ext.form.TextField({
	fieldLabel  : 'A/C No',
	id          : 'txtacno',
	name        : 'txtacno',
	width       :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);

var flxData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 650,
        x: 5,
        y: 170,        
        columns: [   
            {header: "Bank Code", dataIndex: 'bank_code',sortable:true,width:50,align:'left'}, //hidden:'true'},       
            {header: "Bank Name", dataIndex: 'bank_name',sortable:true,width:220,align:'left'}, //hidden:'true'},       
            {header: "Branch", dataIndex: 'bank_branch',sortable:true,width:150,align:'left'},  //hidden:'true'},
            {header: "IFSC", dataIndex: 'bank_ifsc',sortable:true,width:120,align:'left'},
            {header: "A/C No", dataIndex: 'bank_acno',sortable:true,width:150,align:'left'}, //hidden:'true'},          
        ],
        store:loadbankdatastore,

        listeners:{	
        'cellclick' : function(flxData, rowIndex, cellIndex, e){        
            Ext.Msg.show({
                title: 'Bank Master',
                icon: Ext.Msg.QUESTION,
                buttons: Ext.MessageBox.YESNO,
  
		msg: 'Press YES to Modify',
  		fn: function(btn){
                   if (btn === 'yes'){
		        saveflag = "Edit";
			var sm = flxData.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('bank_code'));
			if ((selrow != null)){
				gridedit = "true";
				editrow = selrow;
				bankcode = selrow.get('bank_code');				
				txtbank.setRawValue(selrow.get('bank_name'));
				txtbranch.setRawValue(selrow.get('bank_branch'));
				txtifsc.setRawValue(selrow.get('bank_ifsc'));
				txtacno.setRawValue(selrow.get('bank_acno'));
				flxData.getSelectionModel().clearSelections();
		        }
		   }
                   else if (btn === 'no'){
                   }
		}
            });
          }
          }
        });
          

   var MasBankDetailsPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasBankDetailsPanel',
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
		    text: ' Add',
		    style  : 'text-align:center;',
		    tooltip: 'Add Details...',
		    height: 40,
		    fontSize:20,
		    width:50,
		    align : 'right',
		    icon: '/Pictures/Add.png',
		    listeners:{
		        click: function () {

				RefreshData();
			
		        }
		    }
		},'-',                
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                          	if(txtbank.getValue()=="" || txtbank.getValue()==0)
				{
					alert("Enter Bank Name ");
					txtbank.setFocus();
				}
                         	else if(txtbranch.getRawValue()=="" || txtbranch.getValue()==0)
				{
					alert("Enter Branch Name..");
					txtbranch.setFocus();
				}
                         	else if(txtifsc.getRawValue()=="" || txtifsc.getValue()==0)
				{
					alert("Enter IFSC..");
					txtifsc.setFocus();
				}
                         	else if(txtacno.getRawValue()=="" || txtacno.getValue()==0)
				{
					alert("Enter Account Number..");
					txtacno.setFocus();
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
		                            	url: 'FrmMasBankDetailsSave.php',
		                                params:
						{
                                                        savetype   : saveflag,
                                                        bankcode   : bankcode, 
		                                        bankname   : txtbank.getRawValue(), 
		                                        bankbranch : txtbranch.getRawValue(), 
		                                        bankifsc   : txtifsc.getRawValue(), 
		                                        bankacno   : txtacno.getRawValue(), 
						},
					        callback: function(options, success, response)
					        {
					           var obj = Ext.decode(response.responseText);
					           if (obj['success']==="true")
                                                   {                                
					               Ext.MessageBox.alert("Bank Master -" + obj['msg']);
					               flxData.getStore().removeAll();
					               RefreshData();
					           }
					           else{
                                  Ext.MessageBox.alert("Bank Master Not Saved! Pls Check!- " + obj['msg']);                                                  
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
                            MasBankDetailsWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 400,
                width   : 700,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
			
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 400,
                        x           : 10,
                        y           : -10,
                        border      : false,
                        items: [txtbank]
                       },                       
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 400,
                        x           : 10,
                        y           : 30,
                        border      : false,
                        items: [txtbranch]
                       },                       
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 320,
                        x           : 10,
                        y           : 70,
                        border      : false,
                        items: [txtifsc]
                       },                       
                      {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 320,
                        x           : 10,
                        y           : 110,
                        border      : false,
                        items: [txtacno]
                       },flxData,
                ]
            }
        ],
    });
    
   function RefreshData(){
        txtbank.setRawValue("");
	txtbranch.setRawValue("");
	txtifsc.setRawValue("");
	txtacno.setRawValue("");
        saveflag = "New";
        loadbankdatastore.removeAll();
        loadbankdatastore.load({
		url: 'loadbankdatastore.php',
		params:
		{
			task:"loadbank",

		},
        });    
};
   
    var MasBankDetailsWindow = new Ext.Window({
	height      : 500,
        width       : 800,
        y           : 35,
        title       : 'BANK DETAILS MASTER',
        items       : MasBankDetailsPanel,
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
			txtbank.focus();
	                      }
			
		}
    });
    MasBankDetailsWindow.show();  
});
