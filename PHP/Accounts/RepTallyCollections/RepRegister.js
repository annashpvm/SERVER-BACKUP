Ext.onReady(function() {
Ext.QuickTips.init();
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');




   var printtype='PDF';

var colltype = 'I';    
var VoucherTypeDatastore = new Ext.data.Store({
        id: 'VoucherTypeDatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "VoucherType"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'vchtype'
        ])
    });


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
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
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
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


var Rpttype="Collections";

var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:400,
    height:135,

    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRpttype',
        items: [
		{boxLabel: 'Collections', name: 'optRpttype', id:'optColl', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Collections";
                                                colltype = 'I'
					}
				}
			}
		},

		{boxLabel: 'Credit Note', name: 'optRpttype', id:'optCN', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Credit Note";
                                                colltype = 'C'

					}
				}
			}
		},
            
        ],
    }



    ]
});
 
var Fdate = new Ext.form.DateField(
    {
        name: 'Fdate',
        id: 'Fdate',
        format     : 'd-m-Y',
        value      : new Date(),
        fieldLabel: 'From',
        submitFormat: 'Y-m-d',
        allowBlank: false,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    }
);

var Tdate = new Ext.form.DateField({
        name: 'Tdate',
        id: 'Tdate',
        format     : 'd-m-Y',
        value      : new Date(),
        fieldLabel: 'To',
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",

    });

 var gstabs = "N";
    var chkNew = new Ext.form.Checkbox({
        id         : 'chkNew',
        xtype      : 'checkbox',
        fieldLabel : '',
        boxLabel   : 'NewFormat',
        inputValue : 'NewFormat',
        listeners:{
            'check': function(rb,checked){
                if(checked === true){
                    gstabs = "Y";
                } else {
                    gstabs = "N";
                }
            }
        }
    });

 var cmbvchtype = new Ext.form.ComboBox({
        fieldLabel: 'Voucher Type',
        width: 100,
        store: VoucherTypeDatastore,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        displayField: 'vchtype',
        valueField: 'vchtype',
        hiddenName: 'vchtype',
        id: 'cmbvchtype',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
              
            }, blur: function () {
                
            }
        }
    });

var gstoption="A";
var gstrpttype="D";
var gstseloption="A";
var JournalRegiterFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Collection Report',
        width       : 500,
        height      : 400,
      bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'JournalRegiterFormPanel',
        method      : 'post',
        layout      : 'absolute',
       
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',icon: '/Pictures/refresh.png',
                    tooltip: 'Refresh Details...', height: 40
                },'-',

                {
                    text: 'View',
                    style  : 'text-align:center;',icon: '/Pictures/view.png',
                    tooltip: 'View Details...', height: 40,
                   listeners:{
                        click:
                          function () {
		 
                    var form = JournalRegiterFormPanel.getForm();
                    if (form.isValid()) {


                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
        

                    var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(Fdate.getValue(),"Y-m-d"));
                    var td = "&todate="+encodeURIComponent(Ext.util.Format.date(Tdate.getValue(),"Y-m-d"));
                    ctype = "&ctype="+encodeURIComponent(colltype);

                    var param = (fd+td+ctype) ;
//alert(param); 	
             
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccCollection.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccCollection.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign' + param, '_blank');	
                   /* else
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVoucherRegister.rptdesign'+param,  '_blank' );*/
 
                    }
                    }

                   }


                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',icon: '/Pictures/exit.png',
                    tooltip: 'Close...', height: 40,
                    listeners:{
                        click: function(){
                            JournalRegiterWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:190,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 100,
			y       : 0,
			items:[optprinttype ],
		},

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 80,
			width   : 250,
			layout  : 'absolute',
			x       : 10,
			y       : 50,
			items:[optRpttype],
		},

                
                ]
              },
               {xtype: 'fieldset',
                title: 'Date ',
                layout : 'hbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 210,
               items:[
                { xtype       : 'fieldset',
                title       : '',
                x           : 0,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [Fdate]
                },
                { xtype       : 'fieldset',
                title       : '',
                x           : 220,
                y           : 0,
                border      : false,
                labelWidth  : 70,
                items: [Tdate]
                }
                ]
              },
/*
               {xtype: 'fieldset',
                title: 'Option',
                layout : 'vbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 150,
             items:[
                    {
                    xtype   : 'radiogroup',
                    border  :  false,
                    x       : 0,
                    y       : 0,
                    columns : 2,
                    items: [
                        {boxLabel: 'DateWise', name: 'OptRptType', id:'optDetailed',inputValue: 1,checked: true,
                        listeners:{
                        'check':function(rb,checked){
                         if(checked==true){
                          gstrpttype="D";
                         }
                        }
                        }
                        },
                        {boxLabel: 'AmountWise', name: 'OptRptType',id:'optConsolidated', inputValue: 2,
                         listeners:{
                        'check':function(rb,checked){
                         if(checked==true){
                          gstrpttype="A";
                         }
                        }
                        }
                        }
                       ]
                    }
                 ]},

                { xtype     : 'fieldset',
                title       : '',
                x           : 220,
                y           : 230,
                border      : false,
                labelWidth  : 70,
                items: [chkNew]
                }
              
*/
              ]
               });

    var JournalRegisterWindow = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : JournalRegiterFormPanel,bodyStyle:{"background-color":"#ffe6e6"},
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        y      : 120,


onEsc:function(){
},
        listeners:
            {
                show:function(){
 			VoucherTypeDatastore.load({
                      url: '/SHVPM/Accounts/clsAccounts.php',
                       params: {
                           task: 'VoucherType'
                       }
                    });
                }
            }

    });
       JournalRegisterWindow.show();
});
