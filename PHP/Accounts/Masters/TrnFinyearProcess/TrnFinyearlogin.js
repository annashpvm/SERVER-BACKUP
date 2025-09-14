/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    
    var lblHeading = new Ext.form.Label({
        fieldLabel: 'LOGIN',
        id: 'lblHeading',
        labelStyle: 'font-size: 16px; font-weight: bold;'
    });
    
    var txtUser = new Ext.form.TextField({
        fieldLabel: 'User',
        id: 'txtUser',
        readOnly:true,
        value:'Finyear Process',
        width: 110,
        name: 'txtUser'
    });
    
    var txtpass = new Ext.form.TextField({
        fieldLabel: 'Pass',
        id: 'txtpass',
        inputType: 'password',
        allowBlank: false,
        minLength: 3,
        maxLength: 30,
        width: 110,
        name: 'txtpass'
    });
    
    var LOGFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'WELCOME',
        bodyStyle: {"background-color": "#008B8B"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 500,
        height: 200,
        x: 0,
        y: 0,
        frame: false,
        id: 'LOGFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar', bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'ENTER LOGIN',
                    style: 'text-align:center;',
                    tooltip: 'LOGIN Details...', height: 40, fontSize: 20, width: 50,
                    align: 'right',
                    listeners: {
                        click: function () {
                            if(txtpass.getValue()==="finmis"){
                                 window.location.href = ('/DPM/Financials/General/TrnFinyearProcess/TrnFinyearprocess.php');
                            }else{
                                Ext.Msg.alert("Alert","Log Failed!")
                            }
                        }
                    }
                }
            ]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 174,
                labelWidth: 260,
                x: 24,
                y: 0,
                defaultType: 'Label',
                border: false,
                items: [lblHeading]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 500,
                height: 110,
                x: 0,
                y: 0,
                border: false,
                layout: 'absolute',
                style: 'padding:0px',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 270,
                        x: 0,
                        y: 30,
                        border: false,
                        items: [txtUser]
                    },{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 270,
                        x: 0,
                        y: 60,
                        border: false,
                        items: [txtpass]
                    }
                ]
            }
        ]
    });


    var LOGFormWindow = new Ext.Window({
        height: 170,
        width: 240,
	x: 650,
        y: 150,
        items: LOGFormPanel,
        bodyStyle: {"background-color": "#008B8B"},
        title: 'WELCOME',
        layout: 'absolute',
        border: false,
        draggable: false
    });
    LOGFormWindow.show();
});
