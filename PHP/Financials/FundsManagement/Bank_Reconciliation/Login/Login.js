/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var useridd = 0;
    var useridnewdata = 0;

    var Loginstore = new Ext.data.Store({
        id: 'Loginstore',
        proxy: new Ext.data.HttpProxy({
            url: '/Bank_Reconciliation/classfile.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoginCheck"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['employee_roll_no', 'login_name', 'paswd', 'role_name'])
    });

    var txtlogin = new Ext.form.TextField({
        fieldLabel: 'Login Name',
        labelSeparator: "",
        id: 'txtlogin',
        width: 200,
        name: 'txtlogin'
    });

    var txtpwd = new Ext.form.TextField({
        fieldLabel: 'Password',
        labelSeparator: "",
        id: 'txtpwd',
        inputType: 'password',
        allowBlank: false,
        minLength: 6,
        maxLength: 12,
        width: 200,
        name: 'txtpwd'
    });

   

    var btnEnter = new Ext.Button({
        style: 'text-align:center;',
        text: "Login",
        icon: '/Bank_Reconciliation/Pictures/login.ico',
        listeners: {
            click: function () {

                if (txtpwd.getRawValue() !== "" && txtlogin.getRawValue() !== "") {
                    Loginstore.removeAll();
                    Loginstore.load({
                        url: '/Bank_Reconciliation/classfile.php',
                        method: 'POST',
                        params: {
                            task: 'LoginCheck',
                            login: txtlogin.getRawValue(),
                            pass: txtpwd.getRawValue()
                        },
                        callback: function () {
                            var cnt = Loginstore.getCount();
                           // localStorage.removeItem("userid");
                            if (cnt > 0) {
                                var loginname = Loginstore.getAt(0).get('login_name');
                                useridd = Loginstore.getAt(0).get('employee_roll_no');
                                var rolename = Loginstore.getAt(0).get('role_name');
                              //  localStorage.setItem("userid", useridd);
                               // localStorage.setItem('roletype', rolename);
                              //  localStorage.setItem("empname", loginname);
                                var len = rolename.length;
                                var cyear = new Date().format('Y');
                                var cmonth = new Date().format('m');
                                var cdate = new Date().format('d');
                                var logvalue = len * (cyear * cdate / cmonth);
                               
                                window.location.href = ('/Bank_Reconciliation/Dynamic_menu/Dynamic_menu.php/?d57g04a9hko=' + logvalue + "&nfg=" + useridd);
                                

                            } else {
                                Ext.Msg.alert("Alert", "Wrong User Or Password!");
                            }
                        }
                    });
                }
            }
        }
    });

    var MyWindow = new Ext.Window({
        height: 160,
        width: 320,
        html: '<img src="/Bank_Reconciliation/Pictures/roundblue.jpg" />',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        x: 680,
        y: 230,
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 500,
                height: 120,
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
                        width: 250,
                        x: 30,
                        y: 10,
                        border: false,
                        items: [txtlogin]
                    }, {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 250,
                        x: 30,
                        y: 50,
                        border: false,
                        items: [txtpwd]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        width: 270,
                        x: 110,
                        y: 90,
                        border: false,
                        items: [btnEnter]
                    }
                ]
            }
        ],
        title: 'WELCOME USER',
        layout: 'absolute',
        border: false,
        draggable: false
    });
    MyWindow.show();
});