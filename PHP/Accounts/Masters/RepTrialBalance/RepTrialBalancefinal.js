
Ext.onReady(function(){
    Ext.QuickTips.init();

   
   var compcode = localStorage.getItem('gincompcode');
   var ginfinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
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
        format     : 'Y-m-d',
        value      : new Date(),

    });

var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To',
        format     : 'Y-m-d',
        value      : new Date(),
	listeners:{
select:function(){
if(FDate.getRawValue()>TDate.getRawValue()){
Ext.Msg.alert("Alert","Date Select Properly");
}
}
}

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
                    var fdate=Ext.getCmp('FDate').value;
                    var tdate=Ext.getCmp('TDate').value;
                    var d1 =  fdate + " 00:00:00.000";
                    var d2 =  tdate + " 00:00:00.000";

//                    var d1 =  fdate;
//                    var d2 =  tdate;

                    var p1 = "&fmdate="+encodeURIComponent(d1);
                    var p2 = "&tdate="+encodeURIComponent(d2);
                    var p3 = "&finid="+encodeURIComponent(ginfinid);
                    var p4 = "&comp="+encodeURIComponent(compcode);
                    var rdchk=RepTrialBalanceFormPanel.getForm().getValues()['chkabs'];
                    var test = (p3+p4+p1+p2) ;


			if (repopt == 1)
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceClsbal.rptdesign'+test,  '_blank' );

			else if (repopt == 2)
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalance.rptdesign'+test,  '_blank' );

//			else if (rdchk=="2")				
//window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceAbs.rptdesign'+test,  '_blank' );
			else if (repopt == 3)
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceOpening.rptdesign'+test,  '_blank' );
			else if (repopt == 4)
//window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalanceClsbal_2.rptdesign'+test,  '_blank' );
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccTrailBalanceClosingDebit.rptdesign'+test,  '_blank' );
else if (repopt == 5)
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/RepAccTrailBalanceClosingCredit.rptdesign'+test,  '_blank' );

//
//			else
			
//window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepTrialBalance.rptdesign'+test,  '_blank' );
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
                y: 130,
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
            {
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:100,
                width:600,
                x: 30,
                y: 20,
              items: [
            {
                xtype: 'radiogroup',
		border  :  false,
                x       : 0,
                y       : 0,
                columns :  3,
                items: [
                   {boxLabel: 'TB-Closing',  name: 'chkabs' , inputValue: 1 ,checked : true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=1;
					}
				}
			}

                   },
                   {boxLabel: 'TB-Detailed', name: 'chkabs' , inputValue: 2 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=2;
					}
				}
			}
                   },
                   {boxLabel: 'TB-Abstract', name: 'chkabs' , inputValue: 3 ,checked : false,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						repopt=3;
					}
				}
			}
                   },
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
        height      : 350,
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
listeners:{
show:function(){

			 FDate.setValue(finstdate);
}
}


    });
       RepTrialBalanceWindow.show();
});    

