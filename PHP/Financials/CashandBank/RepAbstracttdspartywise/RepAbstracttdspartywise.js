Ext.onReady(function(){
   Ext.QuickTips.init();
var dtpFromdate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpFromdate',
        name       : 'pack_date',
        format     : 'Y-m-d',
        value      : new Date()
   });

   var dtpTodate = new Ext.form.DateField({
        fieldLabel : '',
        id         : 'dtpTodate',
        name       : 'bl_date',
        format     : 'Y-m-d',
        value      : new Date()
   });   
   
   
   
   var TDSpartywiseDetailFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'TDS Party wise Detail',
        header      : false,
        width       : 438,
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TDSpartywiseDetailFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                  //  icon: '/ERP/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                            var form = TDSpartywiseDetailFormPanel.getForm();
                            /* if (cmbCount.getValue()==0 & rpCount=="CS"){
                                Ext.MessageBox.alert("Alert","Select Count Name...");
                            }
                            else */{
                            if (form.isValid())  {
                                var finid=22; 
                                var compcode=1;

                                var fdate=Ext.getCmp('dtpFromdate').value;
                                var tdate=Ext.getCmp('dtpTodate').value;
                                var d1 =  fdate + " 00:00:00.000";
                                var d2 =  tdate + " 23:59:59.000";
                                var d0 = 65;

                                var p1 = "&grpcode="+encodeURIComponent(d0);
                                var p2 = "&compcode="+encodeURIComponent(compcode);
                                var p3 = "&finid="+encodeURIComponent(finid);
                                var p4 = "&fromdt="+encodeURIComponent(d1);
                                var p5 = "&todt="+encodeURIComponent(d2);
                                
                                var test = (p1+p2+p3+p4+p5);
                                
                                window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/acc_tds_partywiseabstract.rptdesign' + test,  '_blank' );
                            }
                            }
                         }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/ERP/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            TDSpartywiseDetailWindow.hide();
                        }
                    }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'Date',
                layout  : 'hbox',
                border  : true,
                height  : 80,
                width   : 420,
                layout  : 'absolute',
                x       : 10,
                y       : 0,

                items:[
                { xtype     : 'fieldset',
                  title     : 'From',
                  x         : 0,
                  y         : 0,
                  border    : false,
                  labelWidth: 30,
                  items     : [dtpFromdate]
                },
                { xtype     : 'fieldset',
                  title     : 'To',
                  x         : 200,
                  y         : 0,
                  border    : false,
                  labelWidth: 30,
                  items     : [dtpTodate]
                }
                ]
              }
            
        ]
    });
    
        
    var TDSpartywiseDetailWindow = new Ext.Window({
	height      : 300,
        width       : 450,
        y           : 180,
        title       : 'TDS Party wise Detail',
        items       : TDSpartywiseDetailFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false
    });
    TDSpartywiseDetailWindow.show();  
});
