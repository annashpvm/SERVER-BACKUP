/*Developed by : SASIKALA. T -- Feb,10 2019
 * ROLL NO : 7055
 * This form is used to do Bank Reconciliation.
 */

/* global Ext, Datagridd */
Ext.onReady(function () {
    Ext.QuickTips.init();
 
 
    var dgrecord = Ext.data.Record.create([]);

    
    
    
    var btnautomatch = new Ext.Button({
        style: 'text-align:center; font-size: 18px; color:red;',
        text: "Statement Import",
        height: 35,
        labelStyle: 'font-size: 18px; color:red;',
        icon: '/KgDenim/Pictures/login.ico',
        listeners: {
            click: function () {
		window.open('/DPM/Financials/CashandBank/Bank_Reconciliation/statementdownload/statementdownloadtwo.php','_blank');

        }
	}

    });
  
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 400,
        height: 200,
        // x: 10,
        border: false,
        // y: 10,
        frame: false,
        id: 'FormPanel',
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'black',
            'style': 'Helvetica',
            'font-size': '17px', 'font-weight': 'bold'
        },
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
               
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30, id: 'newview',
                    width: 70,
                    icon: '/KgDenim/Pictures/refresh.ico',
                    listeners: {
                        click: function () {
                            window.location.reload();
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/KgDenim/Pictures/exit.ico',
                    listeners: {
                        click: function () {
                            LOGFormWindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
                        
            {
                xtype: 'fieldset',
                title: '',
                width: 150,
                labelWidth: 10,
                x: 120,
                y: 40,
                border: false,
                allowblank: false,
                items: [btnautomatch]
            }
           


        ]
    });


    

    var LOGFormWindow = new Ext.Window({
        height: 220,
        width: 400,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 60,
        items: [FormPanel],
        title: 'Statement Import',
        layout: 'absolute',
        border: false,
        draggable: true,
	minimizable:true,
	maximizable:true,
        resizable: false,
        listeners: {
            show: function () {
               
            }
        }
    });
    LOGFormWindow.show();
});


