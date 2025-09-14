/* global Ext */

Ext.onReady(function () {
    Ext.QuickTips.init();

    var c_all = '';
    var c_gender;
    var c_staytype;
    var c_pf;

    var deptstore = new Ext.data.Store({
        id: 'deptstore',
        proxy: new Ext.data.HttpProxy({
            url: '/hr_class.php',
            method: 'POST'
        }),
        baseParams: {task: "cmbdeptt"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['dept_code', 'dept_name'])
    });

    var empselect = new Ext.data.Store({
        id: 'empselect',
        proxy: new Ext.data.HttpProxy({
            url: '/hr_class.php',
            method: 'POST'
        }),
        baseParams: {task: "selectEmp"},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['employee_roll_no', 'employee_name'])
    });
    var lbl = new Ext.form.Label({
        fieldLabel: 'Employee Details',
        id: 'lbl',
        labelSeparator: "",
        labelStyle: 'font-size: 17px; font-weight: bold; color:green;'
    });

    var reporttype = 'Detailed';
    var reportradios = new Ext.form.RadioGroup({
        //fieldLabel: 'Favorite Framework',
        disabled: false,
        border: true,
        allowBlank: false,
        columns: 2, //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'Detailed', name: 'reportradios', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Detailed';

                            empradios.enable();
                            emptype.enable();
                            empname.enable();
                            cmbempname.enable();
                            // chkall.reset();
                            chkall.enable();
                        }
                    }
                }
            },
            {boxLabel: 'Abstract', name: 'reportradios', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            reporttype = 'Abstract';

                            empradios.disable();
                            emptype.disable();
                            empname.disable();
                            cmbempname.disable();
                            chkall.reset();
                            chkall.disable();

                        }
                    }
                }
            }
        ]
    });

    var divisiontype = 'All';
    var divisionradios = new Ext.form.RadioGroup({
        columns: 2,
        allowBlank: false,
        //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'All', name: 'divisionradios', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            divisiontype = 'All';
                            division.hide();
                            division.reset();
                            deptstore.removeAll();
                            deptstore.load({
                                url: '/hr_class.php',
                                params: {
                                    task: 'cmbdeptt',
                                    unitcode: '%'
                                },
                                callback: function () {
                                    //var cnt = empselect.getCount();
                                    //Ext.Msg.alert(cnt);
                                }
                            });

                        }
                    }
                }
            },
            {boxLabel: 'Selective', name: 'divisionradios', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            divisiontype = 'Selective';
                            division.show();
                        }
                    }
                }
            }
        ]
    });
    var Unitstore = new Ext.data.Store({
        id: 'Unitstore',
        proxy: new Ext.data.HttpProxy({
            url: '/hr_class.php',
            method: 'POST'
        }),
        baseParams: {task: "unitShow"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['unit_code', 'unit_name'])
    });

    var division = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 190,
        labelSeparator: "",
        name: 'cmbshift',
        allowBlank: false,
        forceSelection: true,
        store: Unitstore,
        emptyText: '',
        triggerAction: 'all',
        editable: false,
        valueField: 'unit_code',
        displayField: 'unit_name',
        queryMode: 'local',
        typeAhead: 'true',
        disabled: false,
        hidden: true,
        style: {
            'text-transform': 'uppercase'
        },
        listeners:
                {
                    select: function ()
                    {
                        deptstore.removeAll();
                        deptstore.load({
                            url: '/hr_class.php',
                            params: {
                                task: 'cmbdeptt',
                                unitcode: division.getValue()
                            },
                            callback: function () {
                                //var cnt = empselect.getCount();
                                //Ext.Msg.alert(cnt);
                            }
                        });

                    }
                }
    });
    var depttype = 'All';
    var radios = new Ext.form.RadioGroup({
        columns: 2,
        allowBlank: false,
        //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'All', name: 'radios', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            depttype = 'All';
                            department.hide();
                            department.reset();
                        }
                    }
                }
            },
            {boxLabel: 'Selective', name: 'radios', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            depttype = 'Selective';
                            department.show();
                        }
                    }
                }
            }
        ]
    });
    var department = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 190,
        allowBlank: false,
        labelSeparator: "",
        name: 'department',
        forceSelection: true,
        store: deptstore,
        emptyText: 'Select Department',
        triggerAction: 'all',
        editable: false,
        valueField: 'dept_code',
        displayField: 'dept_name',
        mode: 'local',
        typeAhead: 'true',
        disabled: false,
        hidden: true,
        style: {
            'text-transform': 'uppercase'
        },
        listeners:
                {
                }
    });
    var emptypes = 'All';
    var empradios = new Ext.form.RadioGroup({
        //fieldLabel: 'Favorite Framework',
        disabled: false,
        border: true,
        allowBlank: false,
        columns: 2, //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'All', name: 'empradios', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            emptypes = 'All';

                            emptype.hide();
                            emptype.reset();

                            if (divisiontype === 'All')
                            {
                                var p1 = '%';
                            } else
                            {
                                var p1 = division.getValue();
                            }
                            if (depttype === 'All')
                            {
                                var p2 = '%';
                            } else
                            {
                                var p2 = department.getValue();
                            }

                            if (emptypes === 'All')
                            {
                                var p3 = '%';
                            } else
                            {
                                var p3 = emptype.getValue();
                            }


                            cmbempname.setRawValue('');
                            empselect.removeAll();
                            empselect.load({
                                url: '/hr_class.php',
                                params: {
                                    task: 'selectEmp',
                                    unitcode: p1,
                                    deptcode: p2,
                                    emp: p3
                                },
                                callback: function () {
                                    var cnt = empselect.getCount();
                                    // Ext.Msg.alert(cnt);
                                }
                            });
                        }
                    }
                }
            },
            {boxLabel: 'Selective', name: 'empradios', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            emptypes = 'Selective';
                            emptype.show();
                        }
                    }
                }
            }
        ]
    });
    var etype = ['WORKER', 'CONTRACT WORKER','TT'];
    var emptype = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 190,
        labelSeparator: "",
        name: 'emptype',
        allowBlank: false,
        forceSelection: true,
        store: etype,
        emptyText: '',
        triggerAction: 'all',
        editable: false,
        // valueField: 'shift_code',
        // displayField: 'shift_description',
        queryMode: 'local',
        typeAhead: 'true',
        disabled: false,
        hidden: true,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {

                if (divisiontype === 'All')
                {
                    var p1 = '%';
                } else
                {
                    var p1 = division.getValue();
                }
                if (depttype === 'All')
                {
                    var p2 = '%';
                } else
                {
                    var p2 = department.getValue();
                }

                if (emptypes === 'All')
                {
                    var p3 = '%';
                } else
                {
                    var p3 = emptype.getValue();
                }


                empselect.removeAll();
                empselect.load({
                    url: '/hr_class.php',
                    params: {
                        task: 'selectEmp',
                        unitcode: p1,
                        deptcode: p2,
                        emp: p3
                    },
                    callback: function () {
                        var cnt = empselect.getCount();
                        //   Ext.Msg.alert(cnt);
                    }
                });
            }
        }
    });

    var empnames = 'All';
    var empname = new Ext.form.RadioGroup({
        //fieldLabel: 'Favorite Framework',
        disabled: false,
        allowBlank: false,
        border: true,
        columns: 2, //display the radiobuttons in two columns 
        items: [
            {boxLabel: 'All', name: 'empname', inputValue: '1', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            empnames = 'All';
                            cmbempname.hide();
                            cmbempname.reset();
                        }
                    }
                }
            },
            {boxLabel: 'Selective', name: 'empname', inputValue: '2',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            empnames = 'Selective';
                            cmbempname.show();
                        }
                    }
                }
            }
        ]
    });
    var cmbempname = new Ext.form.ComboBox({
        fieldLabel: '',
        width: 190,
        labelSeparator: "",
        allowBlank: false,
        name: 'cmbempname',
	id:'cmbempname',
        forceSelection: true,
        store: empselect,
        emptyText: '',
        triggerAction: 'all',
        editable: false,
        valueField: 'employee_roll_no',
        displayField: 'employee_name',
        mode: 'local',
        typeAhead: 'true',
        disabled: false,
        hidden: true,
        style: {
            'text-transform': 'uppercase'
        }
    });
    var chkall = new Ext.form.Checkbox({
        name: 'chkall',
        boxLabel: '',
        labelSeparator: "",
        fieldLabel: 'All',
        checked: true,
        id: 'chkall',
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_all = 'ALL';
                    chkmale.disable();
                    chkfemale.disable();
                    chkhosteler.disable();
                    chknonhosteler.disable();
                    chkpf.disable();
                    chknonpf.disable();
                } else
                {
 			c_all = '';
                    chkmale.enable();
                    chkfemale.enable();
                    chkhosteler.enable();
                    chknonhosteler.enable();
                    chkpf.enable();
                    chknonpf.enable();
                }
            }
        }
    });

    var chkmale = new Ext.form.Checkbox({
        name: 'chkmale',
        boxLabel: '',
        labelSeparator: "",
        fieldLabel: 'Male',
        id: 'chkmale',
        disabled: true,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_gender = 'MALE';
                    chkfemale.disable();
                    chkfemale.reset();
                } else
                {
                    c_gender = 'FEMALE';
                    chkfemale.enable();
                    chkfemale.reset();
                }
            }
        }
    });

    var chkfemale = new Ext.form.Checkbox({
        name: 'chkfemale',
        boxLabel: '',
        fieldLabel: 'Female',
        labelSeparator: "",
        id: 'chkfemale',
        disabled: true,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_gender = 'FEMALE';
                    chkmale.disable();
                    chkmale.reset();
                } else
                {
                    c_gender = 'MALE';
                    chkmale.enable();
                    chkmale.reset();
                }
            }
        }
    });

    var chkhosteler = new Ext.form.Checkbox({
        name: 'chkhosteler',
        boxLabel: '',
        fieldLabel: 'Hosteler',
        id: 'chkhosteler',
        disabled: true,
        labelSeparator: "",
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_staytype = 'HOSTELER';
                    chknonhosteler.disable();
                    chknonhosteler.reset();
                } else
                {
                    c_staytype = 'NON HOSTELER';
                    chknonhosteler.enable();
                    chknonhosteler.reset();
                }
            }
        }
    });

    var chknonhosteler = new Ext.form.Checkbox({
        name: 'chknonhosteler',
        boxLabel: '',
        fieldLabel: 'Non Hosteler',
        id: 'chknonhosteler',
        labelSeparator: "",
        disabled: true,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_staytype = 'NON HOSTELER';
                    chkhosteler.disable();
                    chkhosteler.reset();
                } else
                {
                    c_staytype = 'HOSTELER';
                    chkhosteler.enable();
                    chkhosteler.reset();
                }
            }
        }
    });

    var chkpf = new Ext.form.Checkbox({
        name: 'chkpf',
        boxLabel: '',
        fieldLabel: 'PF',
        id: 'chkpf',
        labelSeparator: "",
        disabled: true,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_pf = 'YES';
                    chknonpf.disable();
                    chknonpf.reset();
                } else
                {
                    c_pf = 'NO';
                    chknonpf.enable();
                    chknonpf.reset();
                }
            }
        }
    });

    var chknonpf = new Ext.form.Checkbox({
        name: 'chknonpf',
        boxLabel: '',
        fieldLabel: 'NON PF',
        id: 'chknonpf',
        labelSeparator: "",
        disabled: true,
        width: 100,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    c_pf = 'NO';
                    chkpf.disable();
                    chkpf.reset();
                } else
                {
                    c_pf = 'YES';
                    chkpf.enable();
                    chkpf.reset();
                }
            }
        }
    });

    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 600,
        border: false,
        frame: false,
        id: 'FormPanel',
        html: '<img src=/Pictures/test.jpg>',
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
                    text: 'View',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save1.ico',
                    listeners: {
                        click: function () {

                            if (divisiontype === 'All')
                            {
                                var p1 = '%';
                            } else
                            {
                                var p1 = division.getValue();
                            }

                            if (depttype === 'All')
                            {
                                var p2 = '%';
                            } else
                            {
                                var p2 = department.getValue();
                            }

                            if (emptypes === 'All')
                            {
                                var p3 = '%';
                            } else
                            {
                                var p3 = emptype.getRawValue();
                            }

                            if (empnames === 'All')
                            {
                                var p4 = '%';
                            } else
                            {
                                var p4 = cmbempname.getValue();
                            }

                            if (c_all === 'ALL')
                            {
                                var p5 = '%';
                                var p6 = '%';
                                var p7 = '%';
                                var p8 = '%';
                            } else {
                                if (c_gender === 'MALE') {
                                    p5 = 'MALE';
                                } else if (c_gender === 'FEMALE') {
                                    p5 = 'FEMALE';
                                } else
                                {
                                    p5 = '%';
                                }

                                if (c_staytype === 'HOSTELER') {
                                    p6 = 'HOSTELER';
                                } else if (c_staytype === 'NON HOSTELER') {
                                    p6 = 'NON HOSTELER';
                                } else
                                {
                                    p6 = '%';
                                }


                                if (c_pf === 'YES') {
                                    p7 = 'YES';
                                } else if (c_pf === 'NO') {
                                    p7 = 'NO';
                                } else
                                {
                                    p7 = '%';
                                }

                                p8 = '%';
                            }

                            var divisioncode = "&divisioncode=" + encodeURIComponent(p1);
                            var deptcode = "&deptcode=" + encodeURIComponent(p2);
                            var emptypee = "&emptype=" + encodeURIComponent(p3);
                            var empname = "&empname=" + encodeURIComponent(p4);
                            var gender = "&gender=" + encodeURIComponent(p5);
                            var staytype = "&staytype=" + encodeURIComponent(p6);
                            var pf = "&pf=" + encodeURIComponent(p7);
                            var experiance = "&experiance=" + encodeURIComponent(p8);

                            if (reporttype === 'Detailed')
                            {
                                var param = divisioncode + deptcode + emptypee + empname + gender + pf + staytype + experiance;
                                window.open('http://hr.kgdenim.in:8080/birt-viewer/frameset?__report=Employee_master_report.rptdesign' + param, '_blank');
                            } else if (reporttype === 'Abstract')
                            {
                                var param = divisioncode + deptcode;
                                window.open('http://hr.kgdenim.in:8080/birt-viewer/frameset?__report=employee_abstract_report.rptdesign' + param, '_blank');
                            }

                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30, id: 'newview',
                    width: 70,
                    icon: '/Pictures/refresh.ico',
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
                    icon: '/Pictures/exit.ico',
                    listeners: {
                        click: function () {
                            open(location, '_self').close();
                        }
                    }
                }
            ]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 320,
                width: 320,
                x: 145,
                y: -5,
                border: false,
                items: [lbl]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 350,
                x: 15,
                y: 50,
                border: false,
                items: [reportradios]
            },
            {
                xtype: 'fieldset',
                title: 'Division Selection',
                layout: 'absolute',
                x: 25,
                y: 110,
                width: 400,
                height: 60,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        height: 300,
                        width: 200,
                        x: -10,
                        y: -10,
                        border: false,
                        items: [divisionradios]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        x: 120,
                        y: -10,
                        border: false,
                        width: 280,
                        items: [division]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Department Selection',
                layout: 'absolute',
                x: 25,
                y: 170,
                width: 400,
                height: 60,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        height: 300,
                        width: 200,
                        x: -10,
                        y: -10,
                        border: false,
                        items: [radios]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        x: 120,
                        y: -10,
                        border: false,
                        width: 280,
                        items: [department]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Employee Type',
                layout: 'absolute',
                x: 25,
                y: 240,
                width: 400,
                height: 60,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        height: 300,
                        width: 200,
                        x: -10,
                        y: -10,
                        border: false,
                        items: [empradios]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        x: 120,
                        y: -10,
                        border: false,
                        width: 280,
                        items: [emptype]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Employee Name',
                layout: 'absolute',
                x: 25,
                y: 300,
                width: 400,
                height: 60,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 1,
                        height: 300,
                        width: 200,
                        x: -10,
                        y: -10,
                        border: false,
                        items: [empname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 50,
                        x: 120,
                        y: -10,
                        border: false,
                        width: 280,
                        items: [cmbempname]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 2,
                width: 400,
                layout: 'absolute',
                height: 150,
                x: 25,
                y: 370,
                border: true,
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        height: 300,
                        width: 150,
                        x: -10,
                        y: -10,
                        border: false,
                        items: [chkall]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 2,
                        width: 377,
                        layout: 'absolute',
                        height: 100,
                        x: 0,
                        y: 25,
                        border: true,
                        items: [
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 40,
                                height: 300,
                                width: 150,
                                x: -10,
                                y: -10,
                                border: false,
                                items: [chkmale]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 45,
                                x: 70,
                                y: -10,
                                border: false,
                                height: 300,
                                width: 150,
                                items: [chkfemale]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 50,
                                x: 160,
                                y: -10,
                                border: false,
                                height: 300,
                                width: 150,
                                items: [chkhosteler]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 75,
                                x: 250,
                                y: -10,
                                border: false,
                                height: 300,
                                width: 150,
                                items: [chknonhosteler]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 30,
                                x: -10,
                                y: 30,
                                border: false,
                                height: 300,
                                width: 150,
                                items: [chkpf]
                            },
                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 50,
                                x: 70,
                                y: 30,
                                border: false,
                                height: 300,
                                width: 150,
                                items: [chknonpf]
                            }
                        ]
                    }

                ]
            }
        ]
    });
    var repWindow = new Ext.Window({
        height: 600,
        width: 460,
        html: '<img src=/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 20,
        items: [FormPanel],
        title: 'HRD',
        layout: 'absolute',
        border: false,
        draggable: false,
        resizable: false,
        listeners: {
            show: function () {

            }
        }
    });
    repWindow.show();
});
