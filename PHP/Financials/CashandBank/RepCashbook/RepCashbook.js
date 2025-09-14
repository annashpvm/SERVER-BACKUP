Ext.onReady(function() {
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinFinstdate = localStorage.getItem('gfinstdate');

var accnamedatastore = new Ext.data.Store({
      id: 'accnamedatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
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
        {name: 'led_code', type: 'int', mapping: 'led_code'},
        {name: 'led_name', type: 'string', mapping: 'led_name'}
      ]),
      sortInfo:{field: 'led_code', direction: "DESC"}
    });


var cmbaccname = new Ext.form.ComboBox({
        id         : 'cmbaccname',
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
        emptyText:'Select Account Name',
	allowBlank:false,
        tabIndex:18,
	hidden : false  
    });

var fmdate = new Ext.form.DateField({
        name        : 'fmdate',
        id          : 'fmdate',
        fieldLabel  : 'From Date',
        format      : 'Y-m-d',
        value       : GinFinstdate

    });

var todate = new Ext.form.DateField({
        name        : 'todate',
        id          : 'todate',
        fieldLabel  : 'To Date',
        format      : 'Y-m-d',
        value       : new Date()

    });
   
   var fp = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'CASH BOOK',
        width       : 420,
        height      : 300,        bodyStyle:{"background-color":"#3399CC"},
        x           : 25,
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
//			var c="1";
//			var f="22";
			var l=Ext.getCmp('cmbaccname').getValue();
			var lednm=Ext.getCmp('cmbaccname').getRawValue();

			var rad=fp.getForm().getValues()['opt'];

			var rep =fp.getForm().getValues()['optrep'];

			var d1 =  fdate + " 00:00:00.000";
			var d2 =  tdate + " 00:00:00.000";


			var led="&ledcode="+encodeURIComponent(l);
var cb = "C"
                    var com="&compcode="+encodeURIComponent(GinCompcode);
                    var fin="&finid="+encodeURIComponent(GinFinid);
                    var fd = "&fromdate="+encodeURIComponent(d1);
                    var td = "&todate="+encodeURIComponent(d2);
                    var finstartdate = "&finstartdate="+encodeURIComponent(GinFinstdate);
                    var lename="&lename="+encodeURIComponent(lednm);
                    var prtdsp ="&prtdsp="+ encodeURIComponent(cb);


///alert(finstartdate);

			var param = (led + com + fin + fd + td + lename + prtdsp) ;
			if (lednm=="")
			{
                          Ext.MessageBox.alert("Alert","Select the Ledger...");
			}
			else
			{

                        if (rep == "1")
                        {
                  	var param = (led + com + fin + finstartdate+ fd + td + lename + prtdsp ) ;
				if (rad=="1")
				{
        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepCashBankBook.rptdesign' + param, '_blank');		
				}
				else if (rad=="2")
				{
	window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBookPrintingAmountwise.rptdesign' + param, '_blank'); 
				}
                        }
                        else
                        {
				if (rad=="1")
				{
	
        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBookPrintingDatewise.rptdesign' + param, '_blank');			
				}
				else if (rad=="2")
				{
	window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBookPrintingAmountwise.rptdesign' + param, '_blank'); 
				}
                        }

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
		{ xtype       : 'fieldset',
                title       : '',
                width       : 230,
                x           : 10,
                y           : 10,
                border      : false,
                labelWidth  : 65,
                items: [fmdate]
                },
                { xtype       : 'fieldset',
                title       : '',
                width       : 300,
                x           : 200,
                y           : 10,
                border      : false,
                labelWidth  : 65,
                items: [todate]
                },
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

{ 
		xtype       : 'fieldset',
                title       : '',
                width       :300,
                border      : false,
                labelWidth  : 70,
		x:40,
		y:100,
                items: [cmbaccname]
           },

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

        ]
    });

var frmwindow = new Ext.Window({
      height      : 400,
      width       : 450,
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
        listeners:
            {
                show:function(){
 accnamedatastore.load({
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'CASH',
			   compcode : GinCompcode 
                       }
                    });
                }
            }
}).show();
});

