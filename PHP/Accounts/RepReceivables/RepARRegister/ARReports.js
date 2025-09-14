Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');






    var fmdate = new Ext.form.DateField({
        name: 'fmdate',
        id: 'fmdate',
        fieldLabel: 'As On Date',
        format: 'Y-m-d',
        value: new Date()

    });

   var printtype='PDF';

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


    var todate = new Ext.form.DateField({
        name: 'todate',
        id: 'todate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });


 var Rpttype="AR - Register";

var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:500,
    height:150,
    x:20,
    y:80,
    border: true,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'AR - Register', name: 'optRpttype', id:'optARregister', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AR - Register";

					}
				}
			}
		},
		{boxLabel: 'AR - Agewise Analysis', name: 'optRpttype', id:'optARageanalysis', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AR - Agewise Analysis";

					}
				}
			}
		}
            
        ],
    }



    ]
});
 

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: '', bodyStyle: {"background-color": "WHITE"},
        width: 660,
        height: 500,
        x: 25,
        y: 25,
        frame: false,
        id: 'fp',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', id: 'viewid1',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            
                                var p3 = "&compcode="+encodeURIComponent(GinCompcode);
                                var p5 = "&fromdate="+encodeURIComponent(fdate);

                                var param = (p3+p5);
if (Rpttype == "AR - Register")
{    
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign' + param, '_blank');
    
       /*  if (printtype == "PDF")                             
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=pdf&' + param,  '_blank' );                            
         else
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign' + param,  '_blank' );  */                          
}
else
{
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivables.rptdesign' + param, '_blank');
    
       /*  if (printtype == "PDF")                             
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivablesAgewise.rptdesign&__format=pdf&' + param,  '_blank' );                            
         else
        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccReceivablesAgewise.rptdesign' + param,  '_blank' );*/                            
  
}

                        }
                    }
                }, '-',
                {
                 //   text: 'Note:Debit Note/Credit Note/Bank Payment/Bank Receipt/All Voucher wise Report Combine Input Result',
                    style: 'text-align:center;',
                     height: 40,
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 170,
			y       : 10,
			items:[optprinttype],
		},


optRpttype,
            {xtype: 'fieldset',
                title: '',
                width: 500,
                x: 150,
                y: 300,
                border: false,
                labelWidth: 100,
                items: [fmdate]
            },
            {xtype: 'fieldset',
                title: '',
                width: 300,
                x: 320,
                y: 10,
                border: false,
                labelWidth: 65,
               // items: [todate]
            },

        ]
    });

    var frmwindow = new Ext.Window({
        height: 500,
        width: 660,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 70,
        items: fp,


onEsc:function(){
},
        listeners:
                {
                    show: function () {

                        
                    }
                }
    }).show();
});

