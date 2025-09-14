
Ext.onReady(function() {
    var ginfinid =localStorage.getItem('ginfinid');
   var gstfinyear = localStorage.getItem('gstyear');
   var gstfinuser = localStorage.getItem('ginuser');
   var compcode =localStorage.getItem('gincompcode');

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
        title       : 'Debit Note Register',
        width       : 420,bodyStyle:{"background-color":"#3399CC"},
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
//			var c="1";
			var vt="DN";
			var rad=fp.getForm().getValues()['opt'];
			var d1 =  fdate + " 00:00:00.000";
			var d2 =  tdate + " 00:00:00.000";
			var fd = "&fmdate=" + encodeURIComponent(d1);
			var td = "&tdate=" + encodeURIComponent(d2);
			var cp = "&comp=" + encodeURIComponent(compcode);
			var vu = "&voutype=" + encodeURIComponent(vt);
			var param = (fd + td + cp + vu) ;
			if (rad=="1")
			{
			if (Ext.getCmp('chknew').checked==true)
			{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepDebitNoteRegisterNew.rptdesign' + param, '_blank'); 
			}
			else
			{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepDebitNoteRegister.rptdesign' + param, '_blank'); 
			}
			}
			else if (rad=="2")
			{
window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepDebitNoteRegisterAmountwise.rptdesign' + param, '_blank'); 
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
                    {boxLabel: 'Datewise', name: 'opt', inputValue: '1', checked: true},
                    {boxLabel: 'Amountwise', name: 'opt', inputValue: '2'}
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
                x: 20,
                y:120,
                border      : false,
              items: [
            {
                xtype: 'radiogroup',
border  :  false,
                x       : 20,
                y       : 60,
                columns :  1,
                items: [
			{xtype: 'checkbox',name: 'chknew',id:'chknew', boxLabel: 'New Format',inputValue : 'nf'}
                ]
            }
        ]
            }
        ]
    });

var frmwindow = new Ext.Window({
      height      : 300,
      width       : 450,
      bodyStyle   : 'padding: 10px',bodyStyle:{"background-color":"#3399CC"},
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	title : 'Debit Note Register',
	y:120,
  items : [fp,]
}).show();
});

