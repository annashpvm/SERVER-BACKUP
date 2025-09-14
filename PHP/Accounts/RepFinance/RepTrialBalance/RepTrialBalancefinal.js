Ext.onReady(function(){
    Ext.QuickTips.init();

   var printtype='PDF';
   
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

 var repopt = 1;    
 var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
//readOnly:true,
        fieldLabel: 'From',
        format     : 'd-m-Y',
        value      : new Date(),
    anchor     : '100%',
    width : 100,

    });

var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To',
        format     : 'd-m-Y',
        value      : new Date(),
    anchor     : '100%',
    width : 100,
	listeners:{
select:function(){
if(FDate.getRawValue()>TDate.getRawValue()){
Ext.Msg.alert("Alert","Date Select Properly");
}
}
}

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

var RepTrialBalanceFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Trial Balance',
        width       : 650,
        height      : 500,
     bodyStyle:{"background-color":"#3399CC"},
        frame       : false,
        id          : 'RepTrialBalanceFormPanel',
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

/*
                    var fdate=Ext.getCmp('FDate').value;
                    var tdate=Ext.getCmp('TDate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";

//                    var d1 =  fdate;
//                    var d2 =  tdate;

                    var p1 = "&fmdate="+encodeURIComponent(d1);
                    var p2 = "&tdate="+encodeURIComponent(d2);

*/
                    var p1 = "&fmdate=" + encodeURIComponent(Ext.util.Format.date(FDate.getValue(),"Y-m-d"));
		    var p2 = "&tdate=" + encodeURIComponent(Ext.util.Format.date(TDate.getValue(),"Y-m-d"));
                    var p3 = "&finid="+encodeURIComponent(ginfinid);
                    var p4 = "&comp="+encodeURIComponent(compcode);
                    var rdchk=RepTrialBalanceFormPanel.getForm().getValues()['chkabs'];
                    var param = (p3+p4+p1+p2) ;
                    if (printtype == "PDF") 
                    {
			if (repopt == 1)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosing.rptdesign&__format=pdf'+param,  '_blank' );
			else if (repopt == 2)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceDetailed.rptdesign&__format=pdf'+param,  '_blank' );
			else if (repopt == 3)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepTrialBalanceOpening.rptdesign&__format=pdf'+param,  '_blank' );
			else if (repopt == 4)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrailBalanceClosingDebit.rptdesign&__format=pdf'+param,  '_blank' );
                        else if (repopt == 5)
 window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrailBalanceClosingCredit.rptdesign&__format=pdf'+param,  '_blank' );
                    }
                    else
                    {
			if (repopt == 1)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceClosing.rptdesign&__format=pdf'+param,  '_blank' );
			else if (repopt == 2)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrialBalaceDetailed.rptdesign'+param,  '_blank' );
			else if (repopt == 3)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepTrialBalanceOpening.rptdesign'+param,  '_blank' );
			else if (repopt == 4)
window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrailBalanceClosingDebit.rptdesign'+param,  '_blank' );
                        else if (repopt == 5)
 window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccTrailBalanceClosingCredit.rptdesign'+param,  '_blank' );
                    }
                   }
}
                 },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            RepTrialBalanceWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                {  xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                border:true,
                height:75,
                width:600,
                layout      : 'absolute',
                x: 30,
                y: 300,
             items:[
                { xtype       : 'fieldset',
                title       : '',
                width       : 200,
                x           : 40,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [FDate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 200,
                x           :230,
                y           : 0,
                border      : false,
                labelWidth  : 50,
                items: [TDate]
                }
                ]
              },


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 220,
			layout  : 'absolute',
			x       : 220,
			y       : 10,
			items:[optprinttype],
		},


            {
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:200,
                width:600,
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
                   {boxLabel: 'Trial Balance - Closing',  name: 'chkabs' , inputValue: 1 ,checked : true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=1;
					}
				}
			}

                   },
                   {boxLabel: 'Trial Balance - Detailed', name: 'chkabs' , inputValue: 2 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=2;
					}
				}
			}
                   },
/*
                   {boxLabel: 'TB-Abstract', name: 'chkabs' , inputValue: 3 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=3;
					}
				}
			}
                   },
*/
                   {boxLabel: 'Debtors TB-Closing', name: 'chkabs' , inputValue: 4 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=4;
					}
				}
			}
                   },

                   {boxLabel: 'Creditors TB-Closing', name: 'chkabs' , inputValue: 5 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=5;
					}
				}
			}
                   },
/*
                   {boxLabel: 'Debtors TB-Detailed', name: 'chkabs' , inputValue: 4 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=6;
					}
				}
			}
                   },

                   {boxLabel: 'Creditors TB-Detailed', name: 'chkabs' , inputValue: 5 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=7;
					}
				}
			}
                   },
*/

                 //  {boxLabel: 'Closing Balance(Det)', name: 'chkabs', inputValue: 2 ,checked : false},
//                   {boxLabel: 'Closing Balance(Abs)', name: 'chkabs', inputValue: 4 ,checked : false},
//                   {boxLabel: 'No Transactions', name: 'chkabs', inputValue: 3 ,checked : false}
			]
	    }
		     ]
	    }
]
               });



     var RepTrialBalanceWindow = new Ext.Window({
        height      : 500,
        width       : 650,
        items       : RepTrialBalanceFormPanel,
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
       RepTrialBalanceWindow.show();
});    

