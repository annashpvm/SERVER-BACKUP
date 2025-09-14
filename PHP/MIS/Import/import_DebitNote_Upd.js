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

   var gstr_type = 'C';

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

var Rpttype="optGSTR1";

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


var btnProcess = new Ext.Button({
border: 1,
style: {

    borderColor: 'blue',
    borderStyle: 'solid',
},
    text    : "Process",
    width   : 80,
    height  : 30,
    x       : 70,
    y       : 200,    
  
   tabindex : 1,
   listeners:{
       click: function(){ 

		      Ext.Ajax.request({
		      url: 'DebitNoteUpdation.php',
		      params :
		      {
                         	compcode  : compcode,
	        		finid   : ginfinid,
		                fromdate: Ext.util.Format.date(Fdate.getValue(), "Y-m-d"),
		                todate: Ext.util.Format.date(Tdate.getValue(), "Y-m-d"),  

		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Processed.."); 
//                         DNUPDATEPanel.getForm().reset();
            //             RefreshData();

		      }
                      }); 

}
}
});
var btnExit = new Ext.Button({
border: 1,
style: {

    borderColor: 'blue',
    borderStyle: 'solid',
},
    text    : "EXIT",
    width   : 80,
    height  : 30,
    x       : 200,
    y       : 200,    
  
   tabindex : 1,
   listeners:{
       click: function(){ 
         DNUPDATEWindow.hide();  
}
}
});

var gstoption="A";
var gstrpttype="D";
var gstseloption="A";
var DNUPDATEPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'DEBIT NOTE UPDATION',
        width       : 500,
        height      : 400,
      bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'DNUPDATEPanel',
        method      : 'post',
        layout      : 'absolute',

         items:[

               {xtype: 'fieldset',
                title: 'Date ',
                layout : 'hbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 80,
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
              },btnProcess,btnExit,

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

    var DNUPDATEWindow = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : DNUPDATEPanel,
        bodyStyle:{"background-color":"#ffe6e6"},
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

                }
            }

    });
       DNUPDATEWindow.show();
});
