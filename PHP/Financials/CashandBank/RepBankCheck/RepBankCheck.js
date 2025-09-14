Ext.onReady(function () {
    Ext.QuickTips.init();
    var GinCompcode = localStorage.getItem('acccompcode');
    var GinFinid = localStorage.getItem('accfinid');
    var serflag = "B";
    var serflagnew = 'V';

    var optSERnew = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        fieldLabel: '', labelStyle: 'font-size: 15px; font-weight: normal;color:black;',
        layout: 'vbox',
        width: 800,
        height: 75,
        x: 50,
        y: 0,
        border: false,
        items: [
            {
                xtype: 'radiogroup',
                columns: 4,
                rows: 1,
                id: 'optSERnew',
                items: [
                    {boxLabel: 'As On Voucher Date', name: 'optSERnew', id: 'optnew', inputValue: 2, checked: true,
                        listeners: {
                            'check': function (rb, checked) {
                                if (checked === true) {
                                    serflagnew = "V";
                                }
                            }
                        }
                    }, {boxLabel: 'As On Current Date', name: 'optSERnew', id: 'optnew2', inputValue: 1,
                        listeners: {
                            'check': function (rb, checked) {
                                if (checked === true) {
                                    serflagnew = "C";
                                }
                            }
                        }
                    }
                ]
            }
        ]
    });

    var optSE2new = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        fieldLabel: '', labelStyle: 'font-size: 15px; font-weight: normal;color:black;',
        layout: 'vbox',
        width: 460,
        height: 75,
        x: 120,
        y: 40,
        border: false,
        items: [
            {
                xtype: 'radiogroup',
                columns: 4,
                rows: 1,
                id: 'optSE2new',
                items: [
                    {boxLabel: 'Bank Wise', name: 'optSE2new', id: 'optSl', inputValue: 2, checked: true,
                        listeners: {
                            'check': function (rb, checked) {
                                if (checked === true) {
                                    serflag = "B";
                                }
                            }
                        }
                    }, {boxLabel: 'Party wise', name: 'optSE2new', id: 'optSln', inputValue: 1,
                        listeners: {
                            'check': function (rb, checked) {
                                if (checked === true) {
                                    serflag = "P";
                                }
                            }
                        }
                    }
                ]
            }
        ]
    });


    var Fdate = new Ext.form.DateField(
            {
                name: 'Fdate',
                id: 'Fdate',
                format: 'Y-m-d',
                value: new Date(),
                fieldLabel: 'From',
                submitFormat: 'Y-m-d',
                allowBlank: false
            }
    );

    var Tdate = new Ext.form.DateField({
        name: 'Tdate',
        id: 'Tdate',
        format: 'Y-m-d',
        value: new Date(),
        fieldLabel: 'To'

    });

    var RepAbstractsalestaxFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Future Checks',
        width: 500,
        height: 350,
        bodyStyle: {"background-color": "#3399CC"},
        frame: false,
        id: 'RepAbstractsalestaxFormPanel',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'Refresh', icon: '/Pictures/refresh.png',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40
                }, '-',
                {
                    text: 'View',
                    style: 'text-align:center;', icon: '/Pictures/view.png',
                    tooltip: 'View Details...', height: 40,
                    listeners: {
                        click:
                                function () {
                                    var fdate = Ext.getCmp('Fdate').value;
                                    var tdate = Ext.getCmp('Tdate').value;
                                    var d1 = fdate + " 00:00:00.000";
                                    var d2 = tdate + " 00:00:00.000";
                                    var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
                                    var p2 = "&finid=" + encodeURIComponent(GinFinid);
                                    var p3 = "&frmdate=" + encodeURIComponent(d1);
                                    var p4 = "&todate=" + encodeURIComponent(d2);
                                    var test = (p2 + p1 + p3 + p4);
                                    if (serflagnew === "V") {
					if(serflag==="B"){
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/bankwise.rptdesign' + test, '_blank');
					}else{
					window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/party.rptdesign' + test, '_blank');
					}
                                    } else {
					if(serflag==="B"){
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/bankwise2.rptdesign' + test, '_blank');
					}else{
					window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/party2.rptdesign' + test, '_blank');
					}
                                    }
                                }
                    }
                }, '-',
                {
                    text: 'Exit', icon: '/Pictures/exit.png',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    listeners: {
                        click: function () {
                            RepAbstractsalestaxWindow.hide();
                        }
                    }
                }
            ]

        },
        items: [
            
            optSERnew,optSE2new,{xtype: 'fieldset',
                title: '',
                x: 0,
                y: 80,
                border: false,
                labelWidth: 70,
                items: [Fdate]
            },
            {xtype: 'fieldset',
                title: '',
                x: 220,
                y: 80,
                border: false,
                labelWidth: 70,
                items: [Tdate]
            },
        ]

    });
    var RepAbstractsalestaxWindow = new Ext.Window({
        height: 250,
        width: 500,
        items: RepAbstractsalestaxFormPanel,
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        bodyStyle: {"background-color": "#3399CC"},
        y: 90,
        listeners: {
            show: function () {
                gstoption = "L";
            }
        }
    });
    RepAbstractsalestaxWindow.show();
});
