Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('gincompcode');
    var gstfinyear = localStorage.getItem('gstyear');
    var ginfinid = localStorage.getItem('ginfinid');
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
        title: '', bodyStyle: {"background-color": "WHITE"},
        width: 660,
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
                                var v = "PS";
                            } else if (rad === "2")
                            {
                                var v = "PY";
                            } else if (rad === "3")
                            {
                                var v = "PC";
                            } else if (rad === "4")
                            {
                                var v = "PF";
                            } else if (rad === "5")
                            {
                                var v = "ES";
                            } else if (rad === "6")
                            {
                                var v = "EX";
                            } else if (rad === "7")
                            {
                                var v = "DN";
                            } else if (rad === "8")
                            {
                                var v = "PM";
                            } else if (rad === "9")
                            {
                                var v = "CN";
                            } else if (rad === "10")
                            {
                                var v = "CT";
                            } else if (rad === "11")
                            {
                                var v = "JV";
                            } else if (rad === "12")
                            {
                                var v = "BP";
                            } else if (rad === "13")
                            {
                                var v = "BR";
                            } else if (rad === "14")
                            {
                                var v = "PA";
                            } else if (rad === "15")
                            {
                                var v = "PPS";
                            } else if (rad === "16")
                            {
                                var v = "PPW";
                            }

                            var d1 = fdate + " 00:00:00.000";
                            var d2 = tdate + " 00:00:00.000";
                            var fd = "&frmdate=" + encodeURIComponent(d1);
                            var td = "&todate=" + encodeURIComponent(d2);
                            var cp = "&company=" + encodeURIComponent(GinCompcode);
                            var cpnew = "&companycode=" + encodeURIComponent(GinCompcode);
                            var vu = "&voucher=" + encodeURIComponent(v);
                            var compcodenew = "&compcode=" + encodeURIComponent(GinCompcode);

			    var igstled=0;	
			    var cgstled=0;
			    var sgstled=0;

			    if(GinCompcode==1){
				igstled=33200;
				cgstled=33201;
				sgstled=33202;
			    }else if(GinCompcode==4){
				igstled=33203;
				cgstled=33204;
				sgstled=33205;
			    }else if(GinCompcode==8){
				igstled=34975;
				cgstled=34977;
				sgstled=34979;
			    }else if(GinCompcode==11){
				igstled=34194;
				cgstled=34192;
				sgstled=34193;
			    }		

                            var igstin = "&igstin=" + encodeURIComponent(igstled);
                            var cgstin = "&cgstin=" + encodeURIComponent(cgstled);
                            var sgstin = "&sgstin=" + encodeURIComponent(sgstled);

                            var paramnew = (fd + td);

                            if (rad === "18") {
                                var paramnewex = (fd + td);
  				//window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallgstexp.rptdesign' + paramnewex, '_blank');
                                if (GinCompcode == 1) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/allexp.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 4) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallhomegst.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 8) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallppgst.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 11) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallagrogst.rptdesign' + paramnew, '_blank');
                                }
                            } else if (rad === "19") {
                                var paramnewex = (fd + td + compcodenew + igstin + cgstin + sgstin);
  				
                                if (GinCompcode == 1) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallvmgst1.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 4) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallhomegst1.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 8) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallppgst1.rptdesign' + paramnew, '_blank');
                                } else if (GinCompcode == 11) {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/overallagrogst1.rptdesign' + paramnew, '_blank');
                                }
                            }else if (rad === "20") {
                                var paramnewex = (fd + td);

                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/all.rptdesign' + paramnewex, '_blank');
                                
                            } else {
                                if (rad !== '7' && rad !== '9') {
                                    if (rad !== '15' && rad !== '16') {
                                        var param = (vu + fd + td + cp);
                                        if (GinCompcode === "1") {
                                            if (rad === '1' || rad === '2' || rad === '3' || rad === '4' || rad === '5' || rad === '8') {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GST.rptdesign' + param, '_blank');
                                            } else {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTNEWexp.rptdesign' + param, '_blank');
                                            }
                                        } else if (GinCompcode === "4") {
                                            if (rad === '1' || rad === '2' || rad === '3' || rad === '4' || rad === '5' || rad === '8' || rad === '14') {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTSBM.rptdesign' + param, '_blank');
                                            } else {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTSBMNEW.rptdesign' + param, '_blank');
                                            }
                                        } else if (GinCompcode === "8") {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTpp.rptdesign' + param, '_blank');
                                        } else if (GinCompcode === "11") {
                                            if (rad === '1' || rad === '2' || rad === '3' || rad === '4' || rad === '5' || rad === '8') {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTAGRO.rptdesign' + param, '_blank');
                                            } else {
                                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTAGRONEW.rptdesign' + param, '_blank');
                                            }
                                        }
                                    } else {
                                        var param = (vu + fd + td);
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/GSTPPS.rptdesign' + param, '_blank');
                                    }
                                } else {
                                    var paramdbcr = (vu + fd + td + cpnew);
                                    if (rad === '7') {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/gstdebitnote.rptdesign' + paramdbcr, '_blank');
                                    } else if (rad === '9') {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/gstcreditnote.rptdesign' + paramdbcr, '_blank');
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/gstcreditnoteout.rptdesign' + paramdbcr, '_blank');
                                    } 
                                }
                            }
                        }
                    }
                }, '-',
                {
                 //   text: 'Note:Debit Note/Credit Note/Bank Payment/Bank Receipt/All Voucher wise Report Combine Input Result',
                    style: 'text-align:center;',
                     height: 40,
                    listeners: {
                        click: function () {
                            frmwindow.hide();
                        }
                    }
                },
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
                x: 85,
                y: 10,
                border: false,
                labelWidth: 65,
                items: [fmdate]
            },
            {xtype: 'fieldset',
                title: '',
                width: 300,
                x: 320,
                y: 10,
                border: false,
                labelWidth: 65,
                items: [todate]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 230,
                width: 500,
                x: 130, border: false,
                y: 65,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 2,
                        items: [
                            {boxLabel: 'Common Stores', name: 'options', inputValue: '1',  id: 'comstore'},
                            {boxLabel: 'Yarn', name: 'options', inputValue: '2', id: 'yarnpur'},
                            {boxLabel: 'Cotton', name: 'options', inputValue: '3', id: 'cott'},
                            {boxLabel: 'Fabric', name: 'options', inputValue: '4', id: 'fabri'},
                            {boxLabel: 'WorkOrder', name: 'options', inputValue: '5', id: 'worder'},
                            {boxLabel: 'Expense', name: 'options', inputValue: '6', hidden: true, id: 'expen',hidden:true},
                            {boxLabel: 'DebitNote', name: 'options', inputValue: '7', id: 'dbnote'},
                            {boxLabel: 'Store Machinary', name: 'options', inputValue: '8', id: 'ifd'},
                            {boxLabel: 'CreditNote Input/Output', name: 'options', inputValue: '9', id: 'crnotr'},
                            {boxLabel: 'Contra', name: 'options', inputValue: '10', id: 'contra'},
                            {boxLabel: 'Journal', name: 'options', inputValue: '11', id: 'Journal'},
                            {boxLabel: 'BankPayment', name: 'options', inputValue: '12', id: 'bpay'},
                            {boxLabel: 'BankReceipt', name: 'options', inputValue: '13', id: 'brep'},
                            {boxLabel: 'Madeups', name: 'options', inputValue: '14', id: 'idMadeups'},
                            {boxLabel: 'POWERPLANT STORES', name: 'options', inputValue: '15', id: 'idPPS'},
                            {boxLabel: 'POWERPLANT WORKORDER', name: 'options', inputValue: '16', id: 'idPPW'},
                            {boxLabel: 'HOMETEX FABRIC', name: 'options', inputValue: '17', id: 'idhfab'},
                            {boxLabel: 'ALL Vou Datewise', name: 'options', inputValue: '18', id: 'idall',checked: true,hidden:true},
                            {boxLabel: 'ALL Inv Datewise', name: 'options', inputValue: '19', id: 'idadatell',hidden:true},
                            {boxLabel: 'ALL Company', name: 'options', inputValue: '20', id: 'idnoall',hidden:true}
                        ]
                    }
                ]
            }
        ]
    });

    var frmwindow = new Ext.Window({
        height: 150,
        width: 660,
        bodyStyle: 'padding: 10px',
        bodyStyle:{"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        y: 70,
        items: fp,
        listeners:
                {
                    show: function () {
                        if (gstfinyear.substring(5, 9) === '2018') {
                            fmdate.setRawValue(gstfinyear.substring(5, 9) - 1 + '-07' + '-01');
                            todate.setRawValue(gstfinyear.substring(5, 9) + '-03' + '-31');
                        }
                            Ext.getCmp('comstore').setVisible(false);
                            Ext.getCmp('yarnpur').setVisible(false);
                            Ext.getCmp('cott').setVisible(false);
                            Ext.getCmp('fabri').setVisible(false);
                            Ext.getCmp('worder').setVisible(false);
                            Ext.getCmp('expen').setVisible(false);
                            Ext.getCmp('dbnote').setVisible(false);
                            Ext.getCmp('ifd').setVisible(false);
                            Ext.getCmp('crnotr').setVisible(false);
                            Ext.getCmp('contra').setVisible(false);
                            Ext.getCmp('Journal').setVisible(false);
                            Ext.getCmp('bpay').setVisible(false);
                            Ext.getCmp('brep').setVisible(false);
                            Ext.getCmp('idMadeups').setVisible(false);
                            Ext.getCmp('idPPS').setVisible(false);
                            Ext.getCmp('idPPW').setVisible(false);
                            Ext.getCmp('idhfab').setVisible(false);
                            Ext.getCmp('idnoall').setVisible(false);
                        
                    }
                }
    }).show();
});

