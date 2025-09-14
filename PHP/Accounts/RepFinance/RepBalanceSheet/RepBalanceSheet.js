Ext.onReady(function(){
    Ext.QuickTips.init();
   
   var compcode = localStorage.getItem('gincompcode');
   var ginfinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var gstfinyear = localStorage.getItem('gstyear');
   var fineddate = localStorage.getItem('gfineddate');   

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

 var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
//readOnly:true,
        fieldLabel: 'From',
        format     : 'd-m-Y',
        value      : new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",

    });

var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To',
        format     : 'd-m-Y',
        value      : new Date(),
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	listeners:{
select:function(){
if(FDate.getRawValue()>TDate.getRawValue()){
Ext.Msg.alert("Alert","Date Select Properly");

}
}
}

    });

var RepBalanceSheetFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Balance Sheet',
        width       : 530,
        height      : 600,
     bodyStyle:{"background-color":"#ffecb3"},
        frame       : false,
        id          : 'RepBalanceSheetFormPanel',
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

		    var fdate=Ext.util.Format.date(FDate.getValue(),"Y-m-d");
		    var tdate=Ext.util.Format.date(TDate.getValue(),"Y-m-d");

//                    var d1 =  fdate + " 00:00:00.000";
//                    var d2 =  tdate + " 00:00:00.000";

                    var d1 =  fdate;
                    var d2 =  tdate;

                    var p1 = "&fromdate="+encodeURIComponent(d1);
                    var p2 = "&todate="+encodeURIComponent(d2);
                    var p3 = "&fincode="+encodeURIComponent(ginfinid);
                    var p4 = "&compcode="+encodeURIComponent(compcode);
		        var rdchk=RepBalanceSheetFormPanel.getForm().getValues()['chkabs'];
		        var rdchk1=RepBalanceSheetFormPanel.getForm().getValues()['chkabs1'];
                    var param = (p1+p2+p3+p4) ;

if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet_Detailed.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet_Detailed.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet_Detailed.rptdesign' + param, '_blank');


                 /*   if (printtype == "PDF") 
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet_Detailed.rptdesign&__format=pdf&'+param,  '_blank' );
                    else
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet_Detailed.rptdesign'+param,  '_blank' );*/





/*			if (rdchk=="1" && rdchk1=="2")
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheetAbs.rptdesign'+param,  '_blank' );
			else if (rdchk1=="2")
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheet.rptdesign'+param,  '_blank' );
			else if (rdchk=="1")
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheetAbsWoProvision.rptdesign'+param,  '_blank' );
			else
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepBalanceSheetWoProvision.rptdesign'+param,  '_blank' );
*/


                    }
                   
                   }

                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            RepBalanceSheetWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 150,
			y       : 10,
			items:[optprinttype],
		},

            {
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:160,
                width:450,
                x: 30,
                y: 70,
              items: [
            {
                xtype: 'radiogroup',
		border  :  false,
                x       : 0,
                y       : 0,
                columns :  1,
                items: [
                   {boxLabel: 'Balance Sheet - Detailed',  name: 'chkabs' , inputValue: 1 ,checked : true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=1;
					}
				}
			}

                   },
                   {boxLabel: 'Balance Sheet - Groupwise', name: 'chkabs' , inputValue: 2 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=2;
					}
				}
			}
                   },

                   {boxLabel: 'Balance Sheet - Abstract', name: 'chkabs' , inputValue: 4 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=3;
					}
				}
			}
                   },

                 //  {boxLabel: 'Closing Balance(Det)', name: 'chkabs', inputValue: 2 ,checked : false},
//                   {boxLabel: 'Closing Balance(Abs)', name: 'chkabs', inputValue: 4 ,checked : false},
//                   {boxLabel: 'No Transactions', name: 'chkabs', inputValue: 3 ,checked : false}
			]
	    }
		     ]
	    },

                {  xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                border:true,
                height:75,
                width:450,
                layout      : 'absolute',
                x: 30,
                y: 250,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           : 40,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [FDate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 250,
                x           :230,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [TDate]
                }
                ]
              },
/*
{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:40,
                width:300,
                x: 30,
                y:100,
              items: [
            {
                xtype: 'checkboxgroup',
		border  :  false,
                x       : 0,
                y       : 0,
                columns :  2,
                items: [
                   {boxLabel: 'Abstract', name: 'chkabs', inputValue: 1 ,checked : false},
                   {boxLabel: 'With Provision', name: 'chkabs1', inputValue: 2 ,checked : false}
			]
	    }
		     ]
	    }
*/
]
               });



     var RepBalanceSheetWindow = new Ext.Window({
        height      : 450,
        width       : 530,
        items       : RepBalanceSheetFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#3399CC"},

       
        y      : 80,


onEsc:function(){
},
listeners:{
show:function(){

			  FDate.setValue(finstdate);
}
}


    });
       RepBalanceSheetWindow.show();
});    
    
