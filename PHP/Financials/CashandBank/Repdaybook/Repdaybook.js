Ext.onReady(function() {
   var GinCompcode = localStorage.getItem('acccompcode');
   var GinFinid = localStorage.getItem('accfinid');
	var GinFinstdate = localStorage.getItem('gfinstdate');

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
        title       : 'DAY BOOK',
        width       : 420,
        height      : 250,        bodyStyle:{"background-color":"#3399CC"},
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
			var d1 =  fdate + " 00:00:00.000";
			var d2 =  tdate + " 00:00:00.000";

                        var com="&comp="+encodeURIComponent(GinCompcode);
                        var fd = "&fmdate="+encodeURIComponent(d1);
                        var td = "&tdate="+encodeURIComponent(d2);
			var param = (com + fd + td ) ;

			window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/daybook.rptdesign' + param, '_blank');		
			window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/daybook2.rptdesign' + param, '_blank');		
			
		 }
		}
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
                }
        ]
    });

var frmwindow = new Ext.Window({
      height      : 150,
      width       : 420,
      bodyStyle   : 'padding: 10px',
      layout      : 'form',
      labelWidth  : 70,
      defaultType : 'field',        
	bodyStyle:{"background-color":"#3399CC"},
	region: 'left',
	closable : false,
	draggable : false,
	resizable:false,
	y:120,
  	items : fp,
        listeners:
            {
                show:function(){
                }
            }
});
frmwindow.show();
});


