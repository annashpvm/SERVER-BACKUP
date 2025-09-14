4/*global Ext*/
Ext.onReady(function () {
    var GinCompcode = localStorage.getItem('acccompcode');

    var grpdatastore = new Ext.data.Store({
        id: 'grpdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsRepFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "GROUP"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'grp_code', type: 'int', mapping: 'grp_code'},
            {name: 'grp_name', type: 'string', mapping: 'grp_name'}
        ]),
        sortInfo: {field: 'grp_code', direction: "DESC"}
    });


    var cmbgrp = new Ext.form.ComboBox({
        id: 'cmbgrp',
        width: 150,
        store: grpdatastore,
        displayField: 'grp_name',
        valueField: 'grp_code',
        hiddenName: 'grp_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        emptyText: 'Select Group',
        allowBlank: false,
        tabIndex: 18,
        hidden: false
    });

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
        title: 'Purchase Register', bodyStyle: {"background-color": "#3399CC"},
        width: 420,
        height: 510,
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
                            var fdate = Ext.getCmp('fmdate').value;
                            var tdate = Ext.getCmp('todate').value;
                            var rad = fp.getForm().getValues()['options'];
                            if (rad === "1")
                            {
                                var v = "PS%";
                            } else if (rad === "2")
                            {
                                var v = "PY%";
                            } else if (rad === "3")
                            {
                                var v = "PC%";
                            } else if (rad === "4")
                            {
                                var v = "PB%";
                            } else if (rad === "5")
                            {
                                var v = "PM%";
                            } else if (rad === "6")
                            {
                                var v = "%";
                            } else if (rad === "7")
                            {
                                var v = "%";
                            } else if (rad === "10")
                            {
                                var v = "PP%";
                            }
                            else if (rad === "11")
                            {
                                var v = "PP%";
                            }

                            if (Ext.getCmp('cmbgrp').getValue() < "1")
                            {
                                var g = "%";
                            } else
                            {
                                var g = Ext.getCmp('cmbgrp').getValue();
                            }
                            var d1 = fdate + " 00:00:00.000";
                            var d2 = tdate + " 00:00:00.000";
                            var fd = "&fmdate=" + encodeURIComponent(d1);
                            var td = "&tdate=" + encodeURIComponent(d2);
                            var cp = "&comp=" + encodeURIComponent(GinCompcode);
                            var vu = "&vou=" + encodeURIComponent(v);
                            var gp = "&grp=" + encodeURIComponent(g);
                            var param = (fd + td + cp + vu + gp);
                            var rdrep = fp.getForm().getValues()['repopt'];
                            var rddet = fp.getForm().getValues()['reptype'];
                            
                            if (Ext.getCmp('chknew').checked === true)
                            {
                                if (rad === "1")
                                {
                                    f = "S";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign' + param, '_blank');
				
//window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign'+test,  '_blank' );
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                } else if (rad === "2")
                                {
                                    f = "Y";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
					if(GinCompcode==1){

                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterYarnNowise.rptdesign' + param, '_blank');
					}else{
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterYarnNowisehome.rptdesign' + param, '_blank');
					}
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterYarnGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterYarnPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterYarnAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                } else if (rad === "3")
                                {
                                    f = "C";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterCotton.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterCottonGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterCottonPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterCottonPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                } else if (rad === "5")
                                {
                                    f = "S";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                } else if (rad === "4")
                                {
                                    f = "B";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                } else if (rad === "7")
                                {
                                    f = "R";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepFibrePurchaseRegister.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepFibrePurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepFibrePurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                    }
                                }else if (rad === "8")
                                {
                                    var f = "F";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepFabricPurchaseRegister.rptdesign' + param, '_blank');
                                    }
                                }else if (rad === "9")
                                {
                                    var f = "P";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepFabricPurchaseRegisterreg.rptdesign' + param, '_blank');
                                    }
                                }else if (rad === "10")
                                {
                                    f = "S";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                }else if (rad === "11")
                                {
                                    f = "A";
                                    var fg = "&flag=" + encodeURIComponent(f);
                                    var param = (fd + td + cp + fg);
                                    if (rdrep === "1")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterNew.rptdesign' + param, '_blank');
                                    } else if (rdrep === "2")
                                    {
                                        window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterGrpwise.rptdesign' + param, '_blank');
                                    } else if (rdrep === "3")
                                    {
                                        if (rddet === "1")
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywise.rptdesign' + param, '_blank');
                                        } else
                                        {
                                            window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterPartywiseAbs.rptdesign' + param, '_blank');
                                        }
                                    }
                                }
                               
                            } else if (Ext.getCmp('chkvou').checked === true)
                            {
                                window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisterVouNo.rptdesign' + param, '_blank');
                            } else
                            {
                                var rd = fp.getForm().getValues()['opt'];
                                if (rd === "2")
                                {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepConsPurchaseRegister.rptdesign' + param, '_blank');
                                } else
                                {
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegister.rptdesign' + param, '_blank');
                                    window.open('http://192.168.11.14:8080/birt/frameset?__report=accounts/AccRepPurchaseRegisternewmin.rptdesign' + param, '_blank');
                                }
                            }
                        }}
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
                height: 50,
                width: 380,
                x: 20,
                y: 60,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 3,
                        items: [
                            {boxLabel: 'Detailed', name: 'opt', inputValue: '1', checked: true},
                            {boxLabel: 'Consolidated', name: 'opt', inputValue: '2'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 120,
                width: 380,
                x: 20,
                y: 120,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 3,
                        items: [
                            {boxLabel: 'Common Stores', name: 'options', inputValue: '1',id: 'idstores',checked: true},
                            {boxLabel: 'Yarn', name: 'options', inputValue: '2',id: 'idyarn'},
                            {boxLabel: 'Cotton', name: 'options', inputValue: '3',id: 'idcotton'},
                            {boxLabel: 'Bonded WH', name: 'options', inputValue: '4',id: 'idbw'},
                            {boxLabel: 'IFD Stores', name: 'options', inputValue: '5',id: 'idifdstores'},
                            {boxLabel: 'All', name: 'options', inputValue: '6',id: 'idall'},
                            {boxLabel: 'Fibre', name: 'options', inputValue: '7',id: 'idfibre'},
                            {boxLabel: 'Hometex Fabric', name: 'options', inputValue: '8',id: 'idhomefabric'},
                            {boxLabel: 'Regular Fabric', name: 'options', inputValue: '9',id: 'idregfabric'},
                            {boxLabel: 'Power Plant II', name: 'options', inputValue: '10',id: 'idpowerplant'},
                            {boxLabel: 'Coal Purchase', name: 'options', inputValue: '11',id: 'idfuelpur'},
                            {boxLabel: 'Boiler Fuel Purchase', name: 'options', inputValue: '12',id: 'idboilerpur'},
                            {boxLabel: 'Agro Fuel Purchase', name: 'options', inputValue: '12',id: 'idagropur'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 50,
                width: 380,
                x: 20,
                y: 250,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 4,
                        items: [
                            {boxLabel: 'Nowise', name: 'repopt', inputValue: '1', checked: true},
                            {boxLabel: 'Groupwise', name: 'repopt', inputValue: '2'},
                            {boxLabel: 'Partywise', name: 'repopt', inputValue: '3'},
                            {boxLabel: 'Datewise', name: 'repopt', inputValue: '4'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 60,
                width: 380,
                x: 20,
                y: 310,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 100,
                        y: 60,
                        columns: 3,
                        items: [
                            {boxLabel: 'Detailed', name: 'reptype', inputValue: '1', checked: true},
                            {boxLabel: 'Abstract', name: 'reptype', inputValue: '2'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                layout: 'hbox',
                height: 60,
                width: 380,
                x: 20,
                y: 380,
                items: [
                    {
                        xtype: 'radiogroup',
                        border: false,
                        x: 20,
                        y: 60,
                        columns: 2,
                        items: [
                            {xtype: 'checkbox', name: 'chkrep', id: 'chkvou', boxLabel: 'Vou No', inputValue: 'vn'},
                            {xtype: 'checkbox', name: 'chkrep', id: 'chknew', boxLabel: 'New', inputValue: 'nw'}
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 250,
                border: false,
                labelWidth: 70,
                x: 160,
                y: 315,
                items: [cmbgrp]
            }
        ]
    });

    var frmwindow = new Ext.Window({
        height: 550,
        width: 450,
        bodyStyle: {"background-color": "#3399CC"},
        layout: 'form',
        labelWidth: 70,
        defaultType: 'field',
        region: 'left',
        closable: false,
        draggable: false,
        resizable: false,
        title: 'Purchase Register',
        y: 70,
        items: fp,
        listeners:
                {
             show: function () 
                {
                        grpdatastore.load({
                            url: '/SHVPM/Financials/clsRepFinancials.php',
                            params: {
                                task: 'GROUP'
                            }
                        });
                if (localStorage.getItem('acccompcode') == 1)
                {
                    
                    Ext.getCmp('idstores').setVisible(true);
                    Ext.getCmp('idyarn').setVisible(true);
                    Ext.getCmp('idcotton').setVisible(true);
                    Ext.getCmp('idbw').setVisible(true);
                    Ext.getCmp('idifdstores').setVisible(true);
                    Ext.getCmp('idall').setVisible(true);
                    Ext.getCmp('idfibre').setVisible(true);
                    Ext.getCmp('idhomefabric').setVisible(true);
                    Ext.getCmp('idregfabric').setVisible(true);
                    Ext.getCmp('idpowerplant').setVisible(false);
                    Ext.getCmp('idfuelpur').setVisible(false);
                    Ext.getCmp('idboilerpur').setVisible(false);
                    Ext.getCmp('idagropur').setVisible(false);
                    
                } else if (localStorage.getItem('acccompcode') == 8)
                {
                    
                    Ext.getCmp('idstores').setVisible(false);
                    Ext.getCmp('idyarn').setVisible(false);
                    Ext.getCmp('idcotton').setVisible(false);
                    Ext.getCmp('idbw').setVisible(false);
                    Ext.getCmp('idifdstores').setVisible(false);
                    Ext.getCmp('idall').setVisible(false);
                    Ext.getCmp('idfibre').setVisible(false);
                    Ext.getCmp('idhomefabric').setVisible(false);
                    Ext.getCmp('idregfabric').setVisible(false);
                    Ext.getCmp('idpowerplant').setVisible(true);
                    Ext.getCmp('idfuelpur').setVisible(true);
                    Ext.getCmp('idboilerpur').setVisible(true);
                    Ext.getCmp('idagropur').setVisible(true);
                }
                else 
                {
                    
                    Ext.getCmp('idstores').setVisible(true);
                    Ext.getCmp('idyarn').setVisible(true);
                    Ext.getCmp('idcotton').setVisible(true);
                    Ext.getCmp('idbw').setVisible(true);
                    Ext.getCmp('idifdstores').setVisible(true);
                    Ext.getCmp('idall').setVisible(true);
                    Ext.getCmp('idfibre').setVisible(true);
                    Ext.getCmp('idhomefabric').setVisible(true);
                    Ext.getCmp('idregfabric').setVisible(true);
                    Ext.getCmp('idpowerplant').setVisible(false);
                    Ext.getCmp('idfuelpur').setVisible(false);
                    Ext.getCmp('idboilerpur').setVisible(false);
                    Ext.getCmp('idagropur').setVisible(false);
                }
                         
     

                  }
                }
    }).show();
});

