Ext.onReady(function() {
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinFinstdate = localStorage.getItem('gfinstdate');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');



    var headcode = 0;

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

var accnamedatastore = new Ext.data.Store({
      id: 'accnamedatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "CASH",
			   compcode : GinCompcode}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
       },[
           'led_code','led_name'
      ]),
      sortInfo:{field: 'led_code', direction: "DESC"}
    });


var cmbHeadAccount = new Ext.form.ComboBox({
        id         : 'cmbHeadAccount',
        width      : 200,
        store      : accnamedatastore,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        fieldLabel  : 'Account Name',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Cash Ledger Name',
	allowBlank:false,
        tabIndex:18,
	hidden : false,
        listeners: {
            select: function () {
                headcode = cmbHeadAccount.getValue();
            }, blur: function () {
                headcode = cmbHeadAccount.getValue();
            }
        }  
    });

var fmdate = new Ext.form.DateField({
        name        : 'fmdate',
        id          : 'fmdate',
        fieldLabel  : 'From Date',
        format      : 'd-m-Y',
        value       : GinFinstdate

    });

var todate = new Ext.form.DateField({
        name        : 'todate',
        id          : 'todate',
        fieldLabel  : 'To Date',
        format      : 'd-m-Y',
        value       : new Date()

    });
   
   var fp = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'CASH BOOK',
        width       : 580,
        height      : 360,        bodyStyle:{"background-color":"#ffe6e6"},
        x           : 30,
        y           : 25,
        frame       : false,
        id          : 'fp',
        method      : 'post',
        layout      : 'absolute',
	tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png'                                  
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',  
		    listeners:{
                    click:function(){


			var fdate=Ext.getCmp('fmdate').value;
			var tdate=Ext.getCmp('todate').value;

			var l=Ext.getCmp('cmbHeadAccount').getValue();
			var lednm=Ext.getCmp('cmbHeadAccount').getRawValue();

			var rad=fp.getForm().getValues()['opt'];

			var rep =fp.getForm().getValues()['optrep'];

	//		var d1 =  fdate + " 00:00:00.000";
	//		var d2 =  tdate + " 00:00:00.000";
 

			var fd = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(fmdate.getValue(),"Y-m-d"));
			var td = "&todate=" + encodeURIComponent(Ext.util.Format.date(todate.getValue(),"Y-m-d"));
                        var finstartdate = "&finstartdate="+encodeURIComponent(Ext.util.Format.date(GinFinstdate,"Y-m-d"));


			var led="&ledcode="+encodeURIComponent(l);
var cb = "C"
                    var com="&compcode="+encodeURIComponent(GinCompcode);
                    var fin="&finid="+encodeURIComponent(GinFinid);
    
  
                    var lename="&lename="+encodeURIComponent(lednm);
                    var prtdsp ="&prtdsp="+ encodeURIComponent(cb);
                    var pledcode="&pledcode="+encodeURIComponent(l);


///alert(finstartdate);

			var param = (led + com + fin + fd + td + lename + prtdsp) ;

			if (lednm=="")
			{
                          Ext.MessageBox.alert("Alert","Select the Ledger...");
			}
			else
			{


                  	var param = (led + com + fin + finstartdate+ fd + td + lename + prtdsp + pledcode  ) ;
 if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign' + param, '_blank');
                       /* if (printtype == "PDF") 
                            window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign&__format=pdf&' + param, '_blank');		
                       else
                            window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/RepAccCashBankBook.rptdesign' + param, '_blank');		
 */



}
 }}
                 },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',  
                    listeners:{
                        click: function(){
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


		{ xtype       : 'fieldset',
                title       : '',
                width       : 230,
                x           : 60,
                y           : 170,
                border      : false,
                labelWidth  : 65,
                items: [fmdate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 300,
                x           : 250,
                y           : 170,
                border      : false,
                labelWidth  : 65,
                items: [todate]
                },
/*
{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:100,
                width:350,
                x: 30,
                y:60,
              items: [
            {
                xtype: 'radiogroup',
                border  :  false,
                x       : 100,
                y       : 60,
                columns :  2,
                items: [
                    {boxLabel: 'Datewise', name: 'opt', inputValue: '1', checked: true},
                    {boxLabel: 'Amountwise', name: 'opt', inputValue: '2'}
                ]
            }
        ]
            },
*/
{ 
		xtype       : 'fieldset',
                title       : '',
                width       : 400,
                border      : false,
                labelWidth  : 100,
		x:100,
		y:90,
                items: [cmbHeadAccount]
           },
/*

{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:100,
                width:350,
                x: 30,
                y:190,
              items: [
            {
                xtype: 'radiogroup',
                border  :  false,
                x       : 100,
                y       : 60,
                columns :  2,
                items: [
                    {boxLabel: 'New', name: 'optrep', inputValue: '1', checked: true},
                    {boxLabel: 'Old', name: 'optrep', inputValue: '2'}
                ]
            }
        ]
            },
*/
        ]
    });

var frmwindow = new Ext.Window({
      height      : 400,
      width       : 600,
      bodyStyle   : 'padding: 10px',
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',        bodyStyle:{"background-color":"#3399CC"},
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	title : 'CASH BOOK',
	y:120,
  items : fp,


onEsc:function(){
},
        listeners:
            {
                show:function(){
 accnamedatastore.load({
                      url: '/SHVPM/Accounts/clsAccounts.php',
                       params: {
                           task: 'cmbcashacct',
			   compcode : GinCompcode 
                       },
                     callback : function() {  accnamedatastore.getCount(); 
                     cmbHeadAccount.setValue(2139);
                     }
                    });
                    headcode = '2139';
                }
            }
}).show();
});

