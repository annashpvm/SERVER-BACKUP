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
        rows : 6,
        id: 'optRpttype',
        items: [
		{boxLabel: 'GSTR-1 Abstract', name: 'optRpttype', id:'optGSTR1', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR1";
                                                gstr_type = 'A';

					}
				}
			}
		},

		{boxLabel: 'GSTR-1 - B2B Invoices', name: 'optRpttype', id:'optGSTR2', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR2";
                                                gstr_type = 'R';

					}
				}
			}
		},
		{boxLabel: 'GSTR-1 - B2CS (UnRegistered Sales)', name: 'optRpttype', id:'optGSTR3', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR3";
                                                gstr_type = 'U';

					}
				}
			}
		},
		{boxLabel: 'GSTR-1 - Debit Notes', name: 'optRpttype', id:'optGSTR4', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR4";
                                                gstr_type = 'D';
					}
				}
			}
		},

		{boxLabel: 'GSTR-1 - Credit Notes', name: 'optRpttype', id:'optGSTR5', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR5";
                                                gstr_type = 'C';
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



var gstoption="A";
var gstrpttype="D";
var gstseloption="A";
var RepGSTR1FormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GSTR - 1 SALES',
        width       : 500,
        height      : 450,
      bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'RepGSTR1FormPanel',
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

                    var form = RepGSTR1FormPanel.getForm();
                    if (form.isValid()) {

                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
                    var d1 =  fdate ;
                    var d2 =  tdate ;


                    var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(Fdate.getValue(),"Y-m-d"));
                    var td = "&todate="+encodeURIComponent(Ext.util.Format.date(Tdate.getValue(),"Y-m-d"));
                    var comp = "&compcode="+encodeURIComponent(compcode);
                    var fin = "&fincode="+encodeURIComponent(ginfinid);
                    var param = (comp+fin+fd+td) ;

                    if (Rpttype == "optGSTR1")
                    {

if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign' + param, '_blank');
               

                      /* if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign'+param,'_blank' );*/
                    }
 

                    else if (Rpttype == "optGSTR2"  )
                    { 

                    var gsttype = "&gsttype="+encodeURIComponent(gstr_type);
                    var param = (comp+fin+fd+td+gsttype) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign' + param, '_blank');
       

                     /*  if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign'+param,  '_blank' );*/
                    } 
                    else if (Rpttype == "optGSTR3"  )
                    { 
                    var gsttype = "&gsttype="+encodeURIComponent(gstr_type);
                    var param = (comp+fin+fd+td+gsttype) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign' + param, '_blank');
      
                      /* if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1.rptdesign'+param,  '_blank' );*/
                    } 
                    else if (Rpttype == "optGSTR4")
                    {
                    var gstrtype = "&gstrtype="+encodeURIComponent(gstr_type);
                    var param = (comp+fin+fd+td+gstrtype) ;

if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_DebitNotes.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_DebitNotes.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_DebitNotes.rptdesign' + param, '_blank');
      
                    }
                    else if (Rpttype == "optGSTR5")
                    {
                    var gstrtype = "&gstrtype="+encodeURIComponent(gstr_type);
                    var param = (comp+fin+fd+td+gstrtype) ;

if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign' + param, '_blank');
      
                    }

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
                height:250,
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
			width   : 220,
			layout  : 'absolute',
			x       : 100,
			y       : 0,
			items:[optprinttype],
		},

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 160,
			width   : 350,
			layout  : 'absolute',
			x       : 10,
			y       : 60,
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
                y: 280,
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

    var RepGSTR1Window = new Ext.Window({
        height      : 500,
        width       : 500,
        items       : RepGSTR1FormPanel,
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
       RepGSTR1Window.show();
});
