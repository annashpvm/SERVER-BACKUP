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

var vtype = 'PUR'
var gstr_type = 'P'
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

/*
    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 80,
        x: 330,
        y: 165,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
						Ext.Ajax.request({
		                            	url: 'Gstr2upd.php',

                                                });
        }
       }  
    });
*/


var Rpttype="optGSTR1";

var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:95,

    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 5,
        id: 'optRpttype',
        items: [
		{boxLabel: 'GSTR-2 (All Purchases)', name: 'optRpttype', id:'optGSTR1', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR1";
                                                vtype = "PUR";

					}
				}
			}
		},
		{boxLabel: 'GSTR-2 (Other than Purchase)', name: 'optRpttype', id:'optGSTR2', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR2";
                                                vtype = "DN/CN";

					}
				}
			}
		},

		{boxLabel: 'GSTR-2 (Journal Entries)', name: 'optRpttype', id:'optGSTR3', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSTR3";
                                                vtype = "JV";

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
  //      submitFormat: 'Y-m-d',
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
var RepGSTR2FormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GSRT -2   PURCHASE ',
        width       : 500,
        height      : 400,
      bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'RepGSTR2FormPanel',
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

if (Rpttype == "optGSTR3")
{

				Ext.Ajax.request({
                            	url: 'Gstr2upd_jv.php',
                                params: {
		                        finid: ginfinid,
		                        compcode: compcode,
		                        fromdate: Ext.util.Format.date(Fdate.getValue(), "Y-m-d"),
		                        todate: Ext.util.Format.date(Tdate.getValue(), "Y-m-d"),
                                },
                         	callback: function(){
                    var form = RepGSTR2FormPanel.getForm();
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



                    var gstrtype = "&gstrtype="+encodeURIComponent(gstr_type);
                    voutype = "&voutype="+encodeURIComponent(vtype);
                    var param = (comp+fin+fd+td+gstrtype+voutype) ;
                    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign' + param, '_blank');

                      /* if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign'+param,'_blank' );*/
                    }
 

                                }

                                });}
else
{

				Ext.Ajax.request({
                            	url: 'Gstr2upd.php',
                                params: {
		                        finid: ginfinid,
		                        compcode: compcode,
		                        fromdate: Ext.util.Format.date(Fdate.getValue(), "Y-m-d"),
		                        todate: Ext.util.Format.date(Tdate.getValue(), "Y-m-d"),
                                },
                         	callback: function(){
                    var form = RepGSTR2FormPanel.getForm();
                    if (form.isValid()) {

                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
                    var d1 =  fdate ;
                    var d2 =  tdate ;


                    var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(Fdate.getValue(),"Y-m-d"));
                    var td = "&todate="+encodeURIComponent(Ext.util.Format.date(Tdate.getValue(),"Y-m-d"));
                    var comp = "&compcode="+encodeURIComponent(compcode);
                    var fin = "&fincode="+encodeURIComponent(ginfinid);
                    
                    voutype = "&voutype="+encodeURIComponent(vtype);
                    var param = (comp+fin+fd+td+voutype) ;
                    if (Rpttype == "optGSTR1")
                    { 
		    if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign' + param, '_blank');
    
                  /*     if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR2.rptdesign'+param,  '_blank' );*/
                    } 
                    else if (Rpttype == "optGSTR2")
                    {
                    var gstrtype = "&gstrtype="+encodeURIComponent(gstr_type);
                    var param = (comp+fin+fd+td+gstrtype) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign' + param, '_blank');
    

                   /*    if (printtype == "PDF") 
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign&__format=pdf&'+param,'_blank' );
                       else
                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_otherthan_sales.rptdesign'+param,'_blank' );*/
                    }
 
                    }
                                }

                                });
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
                height:200,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 10,
             items:[
/*
    		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 100,
			width   : 220,
			x       : 300,
			y       : 60,
			items:[btnAdd],
		},   
*/
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
			height  : 100,
			width   : 220,
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
                y: 220,
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

              ]
               });

    var RepGSTR2Window = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : RepGSTR2FormPanel,
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
       RepGSTR2Window.show();
});
