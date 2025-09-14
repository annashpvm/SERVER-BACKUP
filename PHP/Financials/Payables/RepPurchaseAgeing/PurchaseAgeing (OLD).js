Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('acccompcode');
    var gstfinyear = localStorage.getItem('accfinyear');
    var gstfinid = localStorage.getItem('accfinid');

    var fmdate = new Ext.form.DateField({
        name: 'As On Date',
        id: 'fmdate',
        fieldLabel: 'From Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var todate = new Ext.form.DateField({
        name: 'todate',
        id: 'todate',hidden:true,
        fieldLabel: 'To Date',
        format: 'Y-m-d',
        value: new Date()

    });

    var fp = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'PURCHASE', bodyStyle: {"background-color": "#3399CC"},
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
                    style: 'text-align:center;',
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
                            }else if (rad === "4")
                            {
                                var v = "PF";
                            }else if (rad === "5")
                            {
                                var v = "ES";
                            }else if (rad === "6")
                            {
                                var v = "EX";
                            }else if (rad === "7")
                            {
                                var v = "DN";
                            }else if (rad === "8")
                            {
                                var v = "PM";
                            }else if (rad === "9")
                            {
                                var v = "CN";
                            }else if (rad === "10")
                            {
                                var v = "CT";
                            }else if (rad === "11")
                            {
                                var v = "JV";
                            }else if (rad === "12")
                            {
                                var v = "BP";
                            }else if (rad === "13")
                            {
                                var v = "BR";
                            }else if (rad === "14")
                            {
                                var v = "PA";
                            }else if (rad === "15")
                            {
                                var v = "PPS";
                            }else if (rad === "16")
                            {
                                var v = "PPW";
                            }else if (rad === "17")
                            {
                                var v = "ALL";
                            }
                            var d1 = fdate + " 00:00:00.000";
                            var fd = "&finnew=" + encodeURIComponent(gstfinid);
                            var cp = "&compnew=" + encodeURIComponent(GinCompcode);
                            var vu = "&vouchernew=" + encodeURIComponent(v);
                            var asdate = "&asondate=" + encodeURIComponent(d1);
			  


			    if(v!=="ALL"){
                            var param = (fd + cp + vu +asdate);	
                            window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/Purchaseageing.rptdesign' + param, '_blank');
			   }else{
                            var cp = "&company=" + encodeURIComponent(GinCompcode);
                            var asdate = "&fromdate=" + encodeURIComponent(d1);
                            var param = (cp +asdate);
 				window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/payaging.rptdesign' + param, '_blank');
			  }	
                        
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
                x: 20,border:false,
                y: 50,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 2,
                        items: [
                            {boxLabel: 'Common Stores', name: 'options', inputValue: '1', checked: true,id:'comstore'},
                            {boxLabel: 'All', name: 'options', inputValue: '17', checked: true,id:'allid'},
                            {boxLabel: 'Yarn', name: 'options', inputValue: '2',id:'yarnpur'},
                            {boxLabel: 'Cotton', name: 'options', inputValue: '3',id:'cott'},
                            {boxLabel: 'Fabric', name: 'options', inputValue: '4',id:'fabri'},
                            {boxLabel: 'WorkOrder', name: 'options', inputValue: '5',id:'worder'},
                            {boxLabel: 'Expense', name: 'options', inputValue: '6',hidden:true,id:'expen'},
                            {boxLabel: 'DebitNote', name: 'options', inputValue: '7',id:'dbnote'},
                            {boxLabel: 'Store Machinary', name: 'options', inputValue: '8',id:'ifd'},
                            {boxLabel: 'CreditNote', name: 'options', inputValue: '9',id:'crnotr'},
                            {boxLabel: 'Contra', name: 'options', inputValue: '10',id:'contra'},
                            {boxLabel: 'Journal', name: 'options', inputValue: '11',id:'Journal'},
                            {boxLabel: 'BankPayment', name: 'options', inputValue: '12',id:'bpay'},
                            {boxLabel: 'BankReceipt', name: 'options', inputValue: '13',id:'brep'},
                            {boxLabel: 'Madeups', name: 'options', inputValue: '14',id:'idMadeups'},
                            {boxLabel: 'POWERPLANT STORES', name: 'options', inputValue: '15',id:'idPPS'},
                            {boxLabel: 'POWERPLANT WORKORDER', name: 'options', inputValue: '16',id:'idPPW'}
                        ]
                    }
                ]
            }
        ]
    });

    var frmwindow = new Ext.Window({
        height: 225,
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
        title: 'PURCHASE',
        y: 70,
        items: fp,
        listeners:
                {
                    show: function () {
                                if (gstfinyear.substring(5, 9) === '2018') {
				    fmdate.setRawValue(gstfinyear.substring(5, 9)-1 + '-07' +'-01');
				    todate.setRawValue(gstfinyear.substring(5, 9) + '-03' +'-31');	
				}
			if(GinCompcode==1){
                        Ext.getCmp('comstore').setVisible(true);
                        Ext.getCmp('yarnpur').setVisible(true);
                        Ext.getCmp('cott').setVisible(true);
                        Ext.getCmp('fabri').setVisible(false);
                        Ext.getCmp('worder').setVisible(true);
                        Ext.getCmp('expen').setVisible(false);
                        Ext.getCmp('dbnote').setVisible(false);
                        Ext.getCmp('ifd').setVisible(true);
                        Ext.getCmp('crnotr').setVisible(false);
			Ext.getCmp('contra').setVisible(false);
                        Ext.getCmp('Journal').setVisible(false);
                        Ext.getCmp('bpay').setVisible(false);
                        Ext.getCmp('brep').setVisible(false);
	                Ext.getCmp('idMadeups').setVisible(false);
	                Ext.getCmp('idPPS').setVisible(false);
	                Ext.getCmp('idPPW').setVisible(false);
			}else if(GinCompcode==11){
                        Ext.getCmp('comstore').setVisible(true);
                        Ext.getCmp('yarnpur').setVisible(false);
                        Ext.getCmp('cott').setVisible(false);
                        Ext.getCmp('fabri').setVisible(false);
                        Ext.getCmp('worder').setVisible(true);
                        Ext.getCmp('expen').setVisible(false);
                        Ext.getCmp('dbnote').setVisible(false);
                        Ext.getCmp('ifd').setVisible(true);
                        Ext.getCmp('crnotr').setVisible(false);
			Ext.getCmp('contra').setVisible(false);
                        Ext.getCmp('Journal').setVisible(false);
                        Ext.getCmp('bpay').setVisible(false);
                        Ext.getCmp('brep').setVisible(false);
	                Ext.getCmp('idMadeups').setVisible(false);
	                Ext.getCmp('idPPS').setVisible(false);
	                Ext.getCmp('idPPW').setVisible(false);
			}else if(GinCompcode==4){
                        Ext.getCmp('comstore').setVisible(true);
                        Ext.getCmp('yarnpur').setVisible(false);
                        Ext.getCmp('cott').setVisible(false);
                        Ext.getCmp('fabri').setVisible(true);
                        Ext.getCmp('worder').setVisible(true);
                        Ext.getCmp('expen').setVisible(false);
                        Ext.getCmp('dbnote').setVisible(false);
                        Ext.getCmp('ifd').setVisible(false);
                        Ext.getCmp('crnotr').setVisible(false);
                        Ext.getCmp('contra').setVisible(false);
                        Ext.getCmp('Journal').setVisible(true);
                        Ext.getCmp('bpay').setVisible(false);
                        Ext.getCmp('brep').setVisible(false);
	                Ext.getCmp('idMadeups').setVisible(false);
	                Ext.getCmp('idPPS').setVisible(false);
	                Ext.getCmp('idPPW').setVisible(false);
			}else if(GinCompcode==8){
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
	                Ext.getCmp('idPPS').setVisible(true);
	                Ext.getCmp('idPPW').setVisible(true);
			}
                    }
                }
    }).show();
});

