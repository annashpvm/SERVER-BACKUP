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
 var ledgercode =0;

 var ledgertype = "";
 var grppltype = "";

 var flxchk = 0;


var partycode = 0;

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
                  MasPartyMaster.hide();

            }
        }]);



  function check_password()
   {
      if (txtPassword.getRawValue() == "party")
      {
        txtPartyType.setValue("1");
      }
      else
      {
        txtPartyType.setValue("0");
      }    

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  100,
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


 var loadPartyListDatastore = new Ext.data.Store({
      id: 'loadPartyListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWBParty.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadWBPartyList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	
	'party_code', 'party_name', 'party_status', 'party_type'
      ]),
    });


   var txtPartyType = new Ext.form.NumberField({
        fieldLabel  : 'Party Type',
        id          : 'txtPartyType',
        name        : 'txtPartyType',
        width       :  30,
        value       : 0,
        readOnly    : true,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	enableKeyEvents: true,
	listeners:{
        }
  });


   var txtPartyName = new Ext.form.TextField({
        fieldLabel  : 'Party Name',
        id          : 'txtPartyName',
        name        : 'txtPartyName',
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
                   flxWBParty.hide();


             }
          },
	    keyup: function () {

                if (flxchk == 0)
                { 
		        flxWBParty.getEl().setStyle('z-index','10000');
		        flxWBParty.show();
		        loadSearchPartyListDatastore.removeAll();
		          if (txtPartyName.getRawValue() != '')
		             PartyNameSearch();
                }
            }

	}
    });


        



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsWBParty.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartyList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'party_code', 'party_name', 'party_type'
      ]),
    });

function PartyNameSearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsWBParty.php',
		params:
		{
			task:"loadSearchPartyList",
			iname : txtPartyName.getRawValue(),
		},
        });
}



   var flxWBParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        id : flxWBParty,
        x: 450,
        y: 70,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Party Code", dataIndex: 'party_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Party Name", dataIndex: 'party_name',sortable:true,width:330,align:'left'},
		{header: "Party Type", dataIndex:'party_type', sortable:true,width:60, align:'left' ,hidden:true},  

        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxWBParty.getSelectionModel();
			var selrow = sm.getSelected();
                        ledgertype = "";
			var chkitem = (selrow.get('led_code'));
			if ((selrow != null)){

				partycode = selrow.get('party_code');
                                saveflag = "Edit";
				txtPartyName.setValue(selrow.get('party_name'));
				txtPartyType.setValue(selrow.get('party_type'));                                   

                                flxWBParty.hide();   
    

			}
		}
 
    
   }
   });



 
   function RefreshData(){
      partycode = 0;

        flxchk = 0;
	txtPartyName.setValue("");
        saveflag = "Add";
        ledgercode =0;
        loadPartyListDatastore.removeAll();
	loadPartyListDatastore.load({
          url:'ClsWBParty.php',
          params:
       	  {
           task:"loadWBPartyList"
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
        height: 330,
        width: 400,
        x: 400,
        y: 180,
       id: 'my-grid',  
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;",  
        columns: [   
		{header: "Party Code", dataIndex: 'party_code',sortable:true,width:90,align:'left', hidden: true},   
		{header: "Party Name", dataIndex: 'party_name',sortable:true,width:350,align:'left'},
		{header: "Party type", dataIndex: 'party_type',sortable:true,width:90,align:'left', hidden: true},   


        ],
       store:loadPartyListDatastore,

       listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;	
                        saveflag = "Edit";
                        flxWBParty.hide();   
			partycode = selrow.get('party_code');
			txtPartyName.setRawValue(selrow.get('party_name'));

			flxDetail.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }

   });

  function save_click()
{
				if(txtPartyName.getRawValue()=="" || txtPartyName.getRawValue()==0)
				{
					alert("Enter ITEM  Name");
					txtPartyName.focus();
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
		                            	url: 'MasWBPartySave.php',
                		       	        params:
						{
                                                        savetype    : saveflag,
                                                        partycode   : partycode,   
						        partyname   : txtPartyName.getRawValue(),
						        partytype   : txtPartyType.getValue(),

						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                             
                                                    Ext.MessageBox.alert("Alert","Saved ");
						    WBPartyMasterPanel.getForm().reset();
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

   var WBPartyMasterPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WB ITEM MASTER',
        header      : false,
        width       : 1260,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'WBPartyMasterPanel',
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
                            MasPartyMaster.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 140,
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
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtPartyName]
                            },

			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 0,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtPartyType]
                            },
	
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 300,
                                	x           : 200,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtPassword]
                            },

                ]

            },flxDetail,flxWBParty,
            
        ],
    });
    

    var MasPartyMaster = new Ext.Window({
	height      : 600,
        width       : 1280,
        y           : 35,
        title       : 'Weigh Bridge Party Master ',
        items       : WBPartyMasterPanel,
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
                    txtPartyName.focus();
  		    flxWBParty.hide(); 
                    flxchk = 0;
		}
        } 
    });
    MasPartyMaster.show();  
});
