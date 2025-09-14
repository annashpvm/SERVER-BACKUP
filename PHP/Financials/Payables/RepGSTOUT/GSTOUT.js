Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('acccompcode');
    var gstfinyear = localStorage.getItem('accfinyear');

    var fmdate = new Ext.form.DateField({
        name: 'fmdate',
        id: 'fmdate',
        fieldLabel: 'From Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var todate = new Ext.form.DateField({
        name: 'todate',
        id: 'todate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'GST', bodyStyle: {"background-color": "#3399CC"},
        width: 500,
        height: 500,
        x: 25,
        y: 25,
        frame: false,
        id: 'fp',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', id: 'viewid1',
                    tooltip: 'View Details...', height: 40,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                            var fdate = fmdate.getRawValue();
                            var tdate = todate.getRawValue();
                            var rad = fp.getForm().getValues()['options'];
                            if (rad === "1")
                            {
                                var v = "W";
                            } else if (rad === "2")
                            {
                                var v = "Y";
                            }else if (rad === "3")
                            {
                                var v = "S";
                            }

                            var d1 = fdate + " 00:00:00.000";
                            var d2 = tdate + " 00:00:00.000";
                            var fd = "&frmdate=" + encodeURIComponent(d1);
                            var td = "&todate=" + encodeURIComponent(d2);
                            var vu = "&voucher=" + encodeURIComponent(v);

                            var paramdbcr = (vu + fd + td);
                            window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/OUTGST.rptdesign' + paramdbcr, '_blank');
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                }
            ]
        },
        items: [
            {xtype: 'fieldset',
                title: '',
                width: 230,
                x: 10,
                y: 10,
                border: false,
                labelWidth: 65,
                items: [fmdate]
            },
            {xtype: 'fieldset',
                title: '',
                width: 300,
                x: 200,
                y: 10,
                border: false,
                labelWidth: 65,
                items: [todate]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 190,
                width: 500,
                x: 20, border: false,
                y: 65,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 2,
                        items: [
                            {boxLabel: 'Waste', name: 'options', inputValue: '1', checked: true, id: 'comstore'},
                            {boxLabel: 'Yarn', name: 'options', inputValue: '2', id: 'yarnpur'},
                            {boxLabel: 'Fabric', name: 'options', inputValue: '3', id: 'fab'}
                        ]
                    }
                ]
            }
        ]
    });

    var frmwindow = new Ext.Window({
        height: 360,
        width: 476,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        title: 'GST CHECKING',
        y: 70,
        items: fp,
        listeners:
                {
                    show: function () {
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                    }
                }
    }).show();
});

