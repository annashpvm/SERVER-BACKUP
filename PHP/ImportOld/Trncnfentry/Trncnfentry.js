Ext.onReady(function(){
   Ext.QuickTips.init();

 var GinFinid = 27 ;
var gstStatus = "N";
var itemgrpcode = 0;
 var Gincompcode = 1;


	var txtcontainerlength = new Ext.form.TextField({
        fieldLabel  : 'Container Length',
        id          : 'txtcontainerlength',
        name        : 'txtcontainerlength',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

	var txtwharfage = new Ext.form.TextField({
        fieldLabel  : 'Wharfage Charges',
        id          : 'txtwharfage',
        name        : 'txtwharfage',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

	var txtcontainerfrom = new Ext.form.TextField({
        fieldLabel  : 'Container From',
        id          : 'txtcontainerfrom',
        name        : 'txtcontainerfrom',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

	var txtcontainerto = new Ext.form.TextField({
        fieldLabel  : 'Container To',
        id          : 'txtcontainerto',
        name        : 'txtcontainerto',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

	var txttrailerhirecharges = new Ext.form.TextField({
        fieldLabel  : 'Trailer Hire Charges',
        id          : 'txttrailerhirecharges',
        name        : 'txttrailerhirecharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

	var txtmovementcharges = new Ext.form.TextField({
        fieldLabel  : 'Movement Charges',
        id          : 'txtmovementcharges',
        name        : 'txtmovementcharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtportlabercharge = new Ext.form.TextField({
        fieldLabel  : 'Portlabor Charges',
        id          : 'txtportlabercharge',
        name        : 'txtportlabercharge',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtcontractlaborcharge = new Ext.form.TextField({
        fieldLabel  : 'Controct Labor Charges',
        id          : 'txtcontractlaborcharge',
        name        : 'txtcontractlaborcharge',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtdocumentcharges = new Ext.form.TextField({
        fieldLabel  : 'Document Charges',
        id          : 'txtdocumentcharges',
        name        : 'txtdocumentcharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtprocessingcharges = new Ext.form.TextField({
        fieldLabel  : 'Processing Charges',
        id          : 'txtprocessingcharges',
        name        : 'txtprocessingcharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtstuffingcharges = new Ext.form.TextField({
        fieldLabel  : 'Stuffing Charges',
        id          : 'txtstuffingcharges',
        name        : 'txtstuffingcharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtcommunicationcharges = new Ext.form.TextField({
        fieldLabel  : 'Communication Charges',
        id          : 'txtcommunicationcharges',
        name        : 'txtcommunicationcharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtservicecharges = new Ext.form.TextField({
        fieldLabel  : 'Service charges',
        id          : 'txtservicecharges',
        name        : 'txtservicecharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtservicetax = new Ext.form.TextField({
        fieldLabel  : 'Service Tax',
        id          : 'txtservicetax',
        name        : 'txtservicetax',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtsurveyinsurance = new Ext.form.TextField({
        fieldLabel  : 'Survey Insurance',
        id          : 'txtsurveyinsurance',
        name        : 'txtsurveyinsurance',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtlinnerdocharges = new Ext.form.TextField({
        fieldLabel  : 'Liner D.O Charges',
        id          : 'txtlinnerdocharges',
        name        : 'txtlinnerdocharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });

var txtothercharges = new Ext.form.TextField({
        fieldLabel  : 'Other Charges',
        id          : 'txtothercharges',
        name        : 'txtothercharges',
        width       :  130,
        style       :  {textTransform: "uppercase"},
	tabindex : 2
    });


var cmbcnfname = new Ext.form.ComboBox({
        fieldLabel      : 'CNF Name',
        width           : 460,
        displayField    : 'pono', 
        valueField      : 'poseqno',
        hiddenName      : '',
        id              : 'cmbcnfname',
        typeAhead       : true,
        mode            : 'local',
       // store           : ['FUEL','GENERAL STORES','OTHERS','WASTE PAPER'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
	tabIndex	: 0,
        allowblank      : false
   });

var Flxcnfchargrsentry = new Ext.data.Store({
        
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'Flxcnfchargrsentry'
        },[
           'slno','cnfname','ContainerLength','ContailerFrom','ContainerTo','WhaftCharges','Trailerhirecharges','movecharges','portlabcharge','contlabcharge',
'documcharge','processcharge','stuffingcharge','communicationcharge','servicecharge','servicetax','survayinsurance','linerdocharge','othercharge'
        ])
    });

var dgrecord = Ext.data.Record.create([]);
var flxitem = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:0,
    store:Flxcnfchargrsentry,
    height: 220,
    hidden:false,
    width:970,
    //store: [],
    columns:
    [
        {header: "Sl No", dataIndex: 'slno',sortable:true,width:150,align:'left'},
	{header: "CNF Name", dataIndex: 'cnfname',sortable:true,width:150,align:'left'},
        {header: "Container Length", dataIndex: 'ContainerLength',sortable:true,width:150,align:'left'},
        {header: "Container From", dataIndex: 'ContailerFrom',sortable:true,width:150,align:'left'},
        {header: "Container To", dataIndex: 'ContainerTo',sortable:true,width:150,align:'left'},
        {header: "Wheft Charges", dataIndex:'WhaftCharges',sortable:true,width:150,align:'left'},
	{header: "Trailer Hire Charge", dataIndex:'Trailerhirecharges',sortable:true,width:150,align:'left'},
	{header: "Movment Charges", dataIndex:'movecharges',sortable:true,width:150,align:'left'},
	{header: "Port Lab Charges", dataIndex:'portlabcharge',sortable:true,width:100,align:'left'},
	{header: "Contract Lab Charges", dataIndex:'contlabcharge',sortable:true,width:100,align:'left'},
	{header: "Document Charges", dataIndex:'documcharge',sortable:true,width:100,align:'left'},
	{header: "Process Charges", dataIndex:'processcharge',sortable:true,width:100,align:'left'},
	{header: "Stuffing Charges", dataIndex:'stuffingcharge',sortable:true,width:100,align:'left'},
	{header: "Communication Charges", dataIndex:'communicationcharge',sortable:true,width:100,align:'left'},
	{header: "Service Charges", dataIndex:'servicecharge',sortable:true,width:100,align:'left'},
	{header: "Survay Insurance Char", dataIndex:'survayinsurance',sortable:true,width:100,align:'left'},
	{header: "Linear Doc Charges", dataIndex:'linerdocharge',sortable:true,width:100,align:'left'},
	{header: "Other Charges", dataIndex:'othercharge',sortable:true,width:100,align:'left'}

    ]
    

});

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 50,
    height  : 30,
    x       : 945,
    y       : 190,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){    
			   


 			    var RowCnt = flxitem.getStore().getCount() + 1;
	                    flxitem.getStore().insert(
	                    flxitem.getStore().getCount(),
	                    new dgrecord({
                                slno:RowCnt,
                                cnfname:cmbcnfname.getRawValue(),
                                ContainerLength:txtcontainerlength.getRawValue(),
				ContailerFrom:txtcontainerfrom.getRawValue(),
				ContainerTo:txtcontainerto.getRawValue(),
				WhaftCharges:txtwharfage.getRawValue(),
				Trailerhirecharges:txttrailerhirecharges.getRawValue(),
				movecharges:txtmovementcharges.getValue(),
				portlabcharge:txtportlabercharge.getRawValue(),
				contlabcharge:txtcontractlaborcharge.getRawValue(),
				documcharge:txtdocumentcharges.getRawValue(),
				processcharge:txtprocessingcharges.getRawValue(),
				stuffingcharge:txtstuffingcharges.getRawValue(),
				communicationcharge:txtcommunicationcharges.getRawValue(),
				servicecharge:txtservicecharges.getRawValue(),
				servicetax:txtservicetax.getRawValue(),
				survayinsurance:txtsurveyinsurance.getRawValue(),
				linerdocharge:txtlinnerdocharges.getRawValue(),
				othercharge:txtothercharges.getRawValue()

			
                            })
                          );

            }
}
});



   var TrnCNFentryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'CNF ENTRY',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnCNFentryFormPanel',
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
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

			     Ext.MessageBox.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do u want to save',
                            fn: function(btn){
                            if (btn == 'yes')
				{
                     	   	var flxitemdetail = flxitem.getStore().getRange();
                    		var flxupitem = new Array();
                    		Ext.each(flxitemdetail, function (record){
                    		flxupitem.push(record.data);
                    		});
				
				Ext.Ajax.request({
                            	url: 'TrncnfentrySave.php',
                       	        params:
                        	{
 				 fabricgriddet:Ext.util.JSON.encode(flxupitem),
				 cnt:flxitemdetail.length,
			        
                            	 
                         	},
				success:function()
                             		{
                              			Ext.MessageBox.alert("Alert","Saved ");
                              			TrnCNFentryFormPanel.getForm().reset();
	                      			flxitem.getStore().removeAll();
									
                             		},
                        	failure:function()
                             		{
                              			Ext.MessageBox.alert("Alert","Not Saved");
                             		}
			        });
			    }
		         }
 		    });
				
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
                            TrnCNFEntryWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'CNF ENTRY',
                layout  : 'hbox',
                border  : true,
                height  : 510,
                width   : 1020,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 700,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbcnfname]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtcontainerlength]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 330,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtcontainerfrom]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 660,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtcontainerto]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtwharfage]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 330,
                                	y           : 60,
                                    	border      : false,
                                	items: [txttrailerhirecharges]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 660,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtmovementcharges]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 0,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtportlabercharge]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 330,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtcontractlaborcharge]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 660,
                                	y           : 90,
                                    	border      : false,
                                	items: [txtdocumentcharges]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 0,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtprocessingcharges]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 330,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtstuffingcharges]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 660,
                                	y           : 120,
                                    	border      : false,
                                	items: [txtcommunicationcharges]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 0,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtservicecharges]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 360,
                                	x           : 330,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtservicetax]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 660,
                                	y           : 150,
                                    	border      : false,
                                	items: [txtsurveyinsurance]
                            },

{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 0,
                                	y           : 180,
                                    	border      : false,
                                	items: [txtlinnerdocharges]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 150,
                                	width       : 350,
                                	x           : 330,
                                	y           : 180,
                                    	border      : false,
                                	items: [txtothercharges]
                            },btnSubmit,

 { xtype   : 'fieldset',
                title   : 'Grid Details',
                layout  : 'hbox',
                border  : true,
                height  : 255,
                width   : 997,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 0,
                y       : 220,
                items:[flxitem]
}






                ]

            }
            
        ],
    });
    
   
    var TrnCNFEntryWindow = new Ext.Window({
	height      : 600,
        width       : 1050,
        y           : 35,
        title       : 'CNF ENTRY',
        items       : TrnCNFentryFormPanel,
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
    TrnCNFEntryWindow.show();  
});
