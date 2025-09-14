
Ext.onReady(function() {
var GinCompcode = localStorage.getItem('acccompcode');

var vendordatastore = new Ext.data.Store({
      id: 'vendordatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsRepFinancials.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "VEND"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
        {name: 'vendor_code', type: 'int', mapping: 'vendor_code'},
        {name: 'vendor_name', type: 'string', mapping: 'vendor_name'}
      ]),
      sortInfo:{field: 'vendor_code', direction: "DESC"}
    });


var cmbvendor = new Ext.form.ComboBox({
        id         : 'cmbvendor',
        width      : 250,
        store      : vendordatastore,
        displayField:'vendor_name',
        valueField:'vendor_code',
        hiddenName:'vendor_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        emptyText:'Select Vendor',
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
        title       : 'Stores Purchases',
        width       : 420,bodyStyle:{"background-color":"#3399CC"},
        height      : 300,
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
			var rad=fp.getForm().getValues()['optvendor'];
			var d1 =  fdate + " 00:00:00.000";
			var d2 =  tdate + " 00:00:00.000";
			var fd = "&fmdate=" + encodeURIComponent(d1);
			var td = "&tdate=" + encodeURIComponent(d2);
			var cd = "&compcode=" + encodeURIComponent(GinCompcode);
			if (rad=="1")
			{
			var vt = "%";
			var vd = "&vendor=" + encodeURIComponent(vt);
			var param = (vd+fd+td+cd);
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepStoresPurchase.rptdesign' + param, '_blank'); 
			}
			else if (rad=="2")
			{
			var vt = Ext.getCmp("cmbvendor").getRawValue();
			var vd = "&vendor=" + encodeURIComponent(vt);
			var param = (vd+fd+td+cd);
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepStoresPurchase.rptdesign' + param, '_blank'); 
			}
			else if (rad=="3")
			{
			var vt = "%";
			var vd = "&vendor=" + encodeURIComponent(vt);
			var param = (vd+fd+td+cd);
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepStoresPurchaseAbs.rptdesign' + param, '_blank'); 
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
                height:50,
                width:300,
                x: 20,
                y:60,
              items: [
            {
                xtype: 'radiogroup',
border  :  false,
                x       : 100,
                y       : 60,
                columns :  2,
                items: [
                    {boxLabel: 'Minwise', name: 'opt', inputValue: '1', checked: true},
                    {boxLabel: 'Invoicewise', name: 'opt', inputValue: '2'}
                ]
            }
        ]
            },
{
                xtype: 'fieldset',
                title: 'Vendor',
                layout : 'hbox',
                height:60,
                width:380,
                x: 20,
                y:120,
                border      : false,
              items: [
            {
                xtype: 'radiogroup',
border  :  false,
                x       : 20,
                y       : 60,
                columns :  3,
                items: [
                    {boxLabel: 'All', name: 'optvendor', inputValue: '1', checked: true},
                    {boxLabel: 'Selective', name: 'optvendor', inputValue: '2'},
                    {boxLabel: 'Overall Abstract', name: 'optvendor', inputValue: '3'}
                ]
            }
        ]
            },
{
                xtype: 'fieldset',
                title: '',
                layout : 'hbox',
                height:60,
                width:380,
                x: 40,
                y:180,
                border      : false,
              items: [
            cmbvendor
        ]
            }
        ]
    });

var frmwindow = new Ext.Window({
      height      : 350,
      width       : 450,
      bodyStyle   : 'padding: 10px',bodyStyle:{"background-color":"#3399CC"},
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	title : 'Stores Purchases',
	y:120,
  items : fp,
        listeners:
            {
                show:function(){
 vendordatastore.load({
                      url: '/SHVPM/Financials/clsRepFinancials.php',
                       params: {
                           task: 'VEND'
                       }
                    });
                }
            }
}).show();
});
