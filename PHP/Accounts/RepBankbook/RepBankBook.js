Ext.onReady(function() {
Ext.QuickTips.init();
var gstoption="D";
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');
   var GinFinstdate = localStorage.getItem('gfinstdate');   

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



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
})

 var BankDataStore = new Ext.data.Store({
      id: 'BankDataStore',
      proxy: new Ext.data.HttpProxy({
               url: '/SHVPM/Accounts/clsAccounts.php',
                method: 'POST'
            }),
            baseParams:{task: "BANK"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_code', direction: "DESC"}
    });

 

 var gstledcode;
 var gstaccname;
  var cmbBank = new Ext.form.ComboBox({
        id         : 'cmbBank',
        fieldLabel : 'Bank Name',
        width      : 320,
        store      : BankDataStore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Bank Name',
        listeners:{
            select :function(){
            gstledcode=this.getValue();
            gstaccname=this.getRawValue();
    }
    }

    });


var Fdate = new Ext.form.DateField(
    {
        name: 'Fdate',
        id: 'Fdate',
        format     : 'd-m-Y',
        value      : GinFinstdate,
        fieldLabel: 'From',
        submitFormat: 'd-m-Y',
        allowBlank: false
    }
);

var Tdate = new Ext.form.DateField({
        name: 'Tdate',
        id: 'Tdate',
        format     : 'd-m-Y',
        value      : new Date(),
        fieldLabel: 'To'

    });



//var gstoption="D";
//var gstaccname='%';

var BankBookFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bank Book',
        width       : 520,
        height      : 350,
              bodyStyle:{"background-color":"#ffe6e6"},
        frame       : false,
        id          : 'BankBookFormPanel',
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
                    var form = BankBookFormPanel.getForm();
                    if (form.isValid()) {

                    var fdate=Ext.getCmp('Fdate').value;
                    var tdate=Ext.getCmp('Tdate').value;
        //            var d1 =  fdate + " 00:00:00.000";
//                    var d2 =  tdate + " 00:00:00.000";
                    var comcode=compcode;
                    var finid=ginfinid;

                    var led="&ledcode="+encodeURIComponent(gstledcode);
                    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finid="+encodeURIComponent(finid);
//                    var fd = "&fromdate="+encodeURIComponent(d1);
//                    var td = "&todate="+encodeURIComponent(d2);
                    var lename="&lename="+encodeURIComponent(gstaccname);
                  
		    var fd = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(Fdate.getValue(),"Y-m-d"));
		    var td = "&todate=" + encodeURIComponent(Ext.util.Format.date(Tdate.getValue(),"Y-m-d"));
                    var finstartdate = "&finstartdate="+encodeURIComponent(Ext.util.Format.date(GinFinstdate,"Y-m-d"));
  
			
		    var cb = "B";
//			 var finstartdate = "&finstartdate="+encodeURIComponent(GinFinstdate);

                    var prtdsp ="&prtdsp="+ encodeURIComponent(cb);                    

                    var test = (led+com+fin+finstartdate+fd+td+lename + prtdsp) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=pdf&'+test,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=XLS' + test, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign' + test, '_blank');
          
              /*     if (printtype == "PDF") 
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=pdf&' + test, '_blank');	
                    else
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign' + test, '_blank');*/	


  
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
                            BankBookWindow.hide();
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

                {xtype: 'fieldset',
                title: '',
                layout : 'vbox',
                border:true,
                height:70,
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
                labelWidth  : 85,
                items: [cmbBank]
                },
      
                ]
              },
               {xtype: 'fieldset',
                title: 'Period',
                layout : 'hbox',
                border:true,
                height:80,
                width:450,
                layout      : 'absolute',
                x: 10,
                y: 160,
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
              }
              
              ]
               });



     var BankBookWindow = new Ext.Window({
        height      : 400,
        width       : 500,
        items       : BankBookFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
              bodyStyle:{"background-color":"#3399CC"},
        y      : 120,


onEsc:function(){
},
	listeners:{
        show:function(){
        BankDataStore.load({
                      url: '/SHVPM/Accounts/clsAccounts.php',
                       params: {
                        task: "cmbbankacct",
                        compcode: compcode,
                        finid : ginfinid
                       }
                    });
	 
 	
}}


    });
       BankBookWindow.show();
});
