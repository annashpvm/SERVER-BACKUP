/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();
    var ginfinid = localStorage.getItem('accfinid');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinuser = localStorage.getItem('accuserid');
    var compcode = localStorage.getItem('acccompcode');


    var FDate = new Ext.form.DateField({
        name: 'FDate',
        id: 'FDate',
        fieldLabel: 'From Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var TDate = new Ext.form.DateField({
        name: 'TDate',
        id: 'TDate',
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });


    var TDSFormPanel = new Ext.form.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Expense Details',
        width: 950,
        height: 550,
        bodyStyle: {"background-color": "#AAAAFF"},
        frame: false,
        id: 'RepWIPFormPanel',
        method: 'post',
        layout: 'absolute',
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize: 25,
            bodyStyle: {"background-color": "green"},
            items: [
                {
                    text: 'View',
                    style: 'text-align:center;', icon: '/Pictures/refresh.png',
                    tooltip: 'View Details...', height: 40,
                    listeners:
                            {
                                click: function ()
                                {

					    var fdate=Ext.getCmp('FDate').value;
					    var tdate=Ext.getCmp('TDate').value;

					    var d1 =  fdate + " 00:00:00.000";
					    var d2 =  tdate + " 00:00:00.000";

                                    var ginfinidnew = "&finid=" + encodeURIComponent(ginfinid);
                                    var compcodenew = "&compcode=" + encodeURIComponent(compcode);
                                    var p1 = "&frmdate=" + encodeURIComponent(d1);
                                    var p2 = "&todate=" + encodeURIComponent(d2);
                                    
                                    var param=ginfinidnew+compcodenew+p1+p2;
				    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/ExpenseDetails.rptdesign'+param,  '_blank' );

                                }
                            }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;', icon: '/Pictures/view.png',
                    tooltip: 'Refresh Details...', height: 40,
                    listeners: {
                        click:
                                function () {
                                    window.location.reload();
                                }

                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...', height: 40, icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            TDSWindow.hide();
                        }
                    }
                }
            ]

        },
        items: [
            {xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                border: false,
                height: 550,
                width: 900,
                layout: 'absolute',
                        x: 10,
                y: 0,
                items: [
                    {xtype: 'fieldset',
                        title: '',
                        width: 250,
                        x: 10,
                        y: 0,
                        border: false,
                        labelWidth: 78,
                        items: [FDate]
                    },
                    {xtype: 'fieldset',
                        title: '',
                        width: 250,
                        x: 210,
                        y: 0,
                        border: false,
                        labelWidth: 55,
                        items: [TDate]
                    }
                ]
            }
        ]
    });



    var TDSWindow = new Ext.Window({
        height: 200,
        width: 470,
        items: TDSFormPanel,
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        bodyStyle: {"background-color": "#3399CC"},
        y: 100
    });
    TDSWindow.show();
});
