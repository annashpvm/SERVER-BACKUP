Ext.onReady(function() {

var accnamedatastore = new Ext.data.Store({
      id: 'accnamedatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "CASH"}, // this parameter asks for listing
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
        mode: 'remote',
        forceSelection: true,
        triggerAction: 'all',
        fieldLabel  : 'Account Name',
        selectOnFocus:true,
        editable: false,
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
        value       : new Date()

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
        title       : 'BANK RECEIPT REGISTER',
        width       : 420,        bodyStyle:{"background-color":"#3399CC"},
        height      : 250,
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
			var c="1";
			var f="22";
//			var l=Ext.getCmp('cmbaccname').getValue();
			var rad=fp.getForm().getValues()['opt'];
			if (rad=="1")
			{
			var b="%";
			}
			else if (rad=="2")
			{
			var b=Ext.getCmp('cmbaccname').getRawValue();
			}
			var d1 =  fdate + " 00:00:00.000";
			var d2 =  tdate + " 00:00:00.000";
			var cp = "&comp=" + encodeURIComponent(c);
			var fn = "&finid=" + encodeURIComponent(f);
			var fd = "&fmdate=" + encodeURIComponent(d1);
			var td = "&todate=" + encodeURIComponent(d2);
			var bk = "&bank=" + encodeURIComponent(b);
			var param = (cp + fn + fd + td + bk) ;
			if (rad=="1")
			{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBankReceiptRegisterDate.rptdesign' + param, '_blank');			
			}
			else if (rad=="2")
			{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepBankReceiptRegister.rptdesign' + param, '_blank'); 
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
                    {boxLabel: 'Bankwise', name: 'opt', inputValue: '2'}
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
           }
        ]
    });

var frmwindow = new Ext.Window({
      height      : 300,
      width       : 450,
      bodyStyle   : 'padding: 10px',
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',        bodyStyle:{"background-color":"#3399CC"},
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	title : 'BANK RECEIPT REGISTER',
	y:120,
  items : fp,
        listeners:
            {
                show:function(){
 accnamedatastore.load({
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'CASH'
                       }
                    });
                }
            }
}).show();
});

