/*Developed by : MAGESHWARI . A
 * ROLL NO : 7054
 * This form is used to create a Bank Master
 */


/* global Ext, Datagridd */
Ext.onReady(function () {
    Ext.QuickTips.init();
  // var loginid = localStorage.getItem("tempuserid");
    var cstatus = 'Y';
    var dgrecord = Ext.data.Record.create([]);
   var loginid = '7055';
    var actionType;


    function handleActivate(tab) {
        var tabnew = tab.id;
        if (tabnew === "tab") {
            btab = 1;
        }
    }
       function handleActivate2(tab) {
        var tabnew2 = tab.id;
        if (tabnew2 === "tab2") {
            btab = 2;
        }
    } 


    function reset()
    {

    }

    function iadd()
    {

        actionType = 'Add';
        Ext.MessageBox.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do u want to save',
            fn: function (btn) {
                if (btn === 'yes') {
		var Datanew = Gridview2.getStore().getRange();
                    var Dataupd = new Array();
                    Ext.each(Datanew, function (record) {
                        Dataupd.push(record.data);
                    });
                    Ext.Ajax.request({
                        url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/ECS/ECS_Master_Save.php',
                        method: 'POST',
                        params:
                                {
					 installmentdetails: Ext.util.JSON.encode(Dataupd),                          
                          		  installmentcnt: Datanew.length,
                                    action: actionType,
                                    bank: cmbbank.getValue(),
                                    description: txtdescription.getRawValue(),
				paytype: type,
                                    amount: txtamount.getRawValue(),
				    dueday: cmbdueon.getValue(),
				    duemonth: cmbeverymonth.getValue(),
					startdate: txtstartdate.getRawValue(),
					lastpaid: txtlastpaid.getRawValue(),
					noinstallments: txtinstallments.getRawValue(),
					tilldate: txttilldate.getValue(),
                                    status: cstatus,
                                    userid: 7055
                                },
                     

			callback: function (options, success, response)
                        {
                            var obj = Ext.decode(response.responseText);
                            if (obj['success'] === "true") {
                                Ext.Msg.alert("Alert", "Added");
                             FormPanel.getForm().reset();
			 	Gridview2.getStore().removeAll();
                                Gridview2.getStore().sync();
                              
                            } else {
                                Ext.Msg.alert("Alert", "Failed");
                              
                            }
                        }
                    });		

                 
                }
            }
        });
    }


    function edit() {
        actionType = 'Edit';
        Ext.MessageBox.show({
            title: 'Confirmation',
            icon: Ext.Msg.QUESTION,
            buttons: Ext.MessageBox.YESNO,
            msg: 'Do u want to edit ',
            fn: function (btn) {
                if (btn === 'yes') {
                    FormPanel.getForm().submit({
                        url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/ECS/ECS_Master_Save.php',
                        method: 'POST',
                        params:
                                {
                                    action: actionType,
                                    id: txtid.getRawValue(),
                                    bank: cmbbank.getValue(),
                                    description: txtdescription.getRawValue(),
                                    amount: txtamount.getRawValue(),
					dueday: cmbdueon.getValue(),
					duemonth: cmbeverymonth.getValue(),
					startdate: txtstartdate.getValue(),
					lastpaid: txtlastpaid.getValue(),
					noinstallments: txtinstallments.getRawValue(),
					tilldate: txttilldate.getValue(),
                                    status: cstatus,
                                    userid: loginid
                                },
                        success: function () {

                            Ext.MessageBox.alert("Alert", "Updated Sucessfully");
                            load();
                            refresh();
                            disable();                         

                        },
                        failure: function () {
                            Ext.MessageBox.alert("Alert", "Failed");
                            Datagridd.getStore().removeAll();
                            load();
                           
                        }
                    });
                }
            }
        });
    }



    function save1()
    {
        if (actionType === "Add")
        {
            iadd();

        } else if (actionType === "Edit")
        {
            edit();
        } else
        {
        }

    }


    var act1 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act1',
        labelSeparator: "",
        labelStyle: 'font-size: 15px;color:red;'
    });

    var txtid = new Ext.form.TextField({
        fieldLabel: '',
        id: 'txtid',
        width: 150,
        name: 'txtid'


    });
   txtid.setVisible(false);

    var lbl = new Ext.form.Label({
        fieldLabel: 'ECS Master',
        id: 'lbl',
        labelSeparator: "",
        labelStyle: 'font-size: 20px; font-weight: bold; color:green;'    });

   var lblmonth = new Ext.form.Label({
        fieldLabel: 'Month',
        id: 'lblmonth',
        labelSeparator: "",
        });
 var bankstore = new Ext.data.Store({
        id: 'bankstore',
        autoLoad: true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
            method: 'POST'
        }),
        baseParams: {task: 'selectbankmaster'},
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['bank_code', 'bank_name'])
 });
var cmbbank= new Ext.form.ComboBox({
        fieldLabel: 'Bank',
        labelSeparator: "",
        width: 200,
        name: 'cmbbank',
        forceSelection: true,
        allowBlank: false,
        store: bankstore,
        disabled: true,
        emptyText: 'SelectBank',
        triggerAction: 'all',
        valueField: 'bank_code',
        displayField: 'bank_name',
        mode: 'local',
        typeAhead: 'true',
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {

            }
        }
    });
   
	var txtdescription = new Ext.form.TextArea({
        fieldLabel: 'Description',
 	labelSeparator: "",
        id: 'txtdescription ',
        name: 'txtdescription',
        editable: true,
        allowBlank: false,
        disabled: true,
        anchor: '100%',
        labelSeparator: "",
        width: 170,
        regex: /^[0-9a-zA-Z-. ]+$/,
        style: {
            'text-transform': 'uppercase'
        }
    });
	var type;
 var paytype = new Ext.form.RadioGroup({
        fieldLabel: 'Type',
        id: 'paytype',
        columns: 2,
        width: 150,
        allowBlank: false,
        msgTarget: 'side',
        disabled: true,
        items: [
            {boxLabel: 'EMI', name: 'paytype', inputValue: 1, id: 'xx', checked: 'true',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            type = 'EMI';
				txtamount.enable();
                        }
                    }
                }
            },
            {boxLabel: 'Non EMI', name: 'paytype', inputValue: 2, id: 'yy',
                listeners: {
                    check: function (rb, checked) {
                        if (checked === true) {
                            type = 'NON EMI';
			txtamount.reset();
			txtamount.disable();
                        }
                    }
                }
            }
            
        ]
    });
var txtamount = new Ext.form.NumberField({
 	 fieldLabel: 'Amount',
        id: 'txtamount',
 	labelSeparator: "",
        name: 'Amount',
        width: 100,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 2,
        maxLength: 40,
        disabled: true,
        style: {
            textTransform: "uppercase"
        }
    });

for (var i=1, due=[]; i<=31; i++) { due[i] = [i]; } 

var cmbdueon= new Ext.form.ComboBox({
        fieldLabel: 'Due on',
        labelSeparator: "",
        width: 70,
        name: 'cmbdueon',
        forceSelection: true,
        allowBlank: false,
        store: due,
        disabled: true,
        emptyText: 'Day',
        triggerAction: 'all',
        typeAhead: 'true',
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {

            }
        }
    });
for (var i=1, duemonth=[]; i<=12; i++) { duemonth[i] = [i]; } 
var cmbeverymonth= new Ext.form.ComboBox({
        fieldLabel: 'Every',
        labelSeparator: "",
        width: 70,
        name: 'cmbeverymonth',
        forceSelection: true,
        allowBlank: false,
        store: duemonth,
        disabled: true,
        emptyText: 'Month',
        triggerAction: 'all',            
        typeAhead: 'true',
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {

            }
        }
    });

var txtstartdate = new Ext.form.DateField({
        fieldLabel: 'Start Date',
        id: 'txtstartdate ',
        name: 'txtstartdate',
        editable: true,
        disabled: true,
        allowBlank: false,
        anchor: '100%',
        format: 'Y-m-d',
        labelSeparator: "",
        width: 150,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                var start = txtdop.getValue().format('Y-m-d');
               // txtdoe.setMinValue(start);
            }
        }

    });


var txtlastpaid = new Ext.form.DateField({
        fieldLabel: 'Last Paid',
        id: 'txtlastpaid ',
        name: 'txtlastpaid',
        editable: true,
        disabled: true,
        allowBlank: false,
        anchor: '100%',
        format: 'Y-m-d',
        labelSeparator: "",
        width: 150,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                var start = txtdop.getValue().format('Y-m-d');
               // txtdoe.setMinValue(start);
            }
        }

    });
    var txtinstallments = new Ext.form.NumberField({
 	 fieldLabel: 'No of Installments',
        id: 'txtinstallments',
 	labelSeparator: "",
        name: 'txtinstallments',
        width: 50,
        allowBlank: false,
        msgTarget: 'side',
        minLength: 2,
        maxLength: 40,
        disabled: true,
        style: {
            textTransform: "uppercase"
        }
    });

var txttilldate = new Ext.form.DateField({
        fieldLabel: 'Till Date',
        id: 'txttilldate ',
        name: 'txttilldate',
        editable: true,
        disabled: true,
        allowBlank: false,
        anchor: '100%',
        format: 'Y-m-d',
        labelSeparator: "",
        width: 150,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                var start = txtdop.getValue().format('Y-m-d');
               // txtdoe.setMinValue(start);
            }
        }

    });
    var act2 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act2',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    });   


    
    var act3 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act3',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 

  var act4 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act4',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 
  var act5 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act5',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 
  var act6 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act6',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 
  var act7 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act7',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 

  var act8 = new Ext.form.Label({
        fieldLabel: '*',
        id: 'act8',
        labelSeparator: "",
        labelStyle: 'font-size: 15px; color:red;'
    }); 
    var chstatus = new Ext.form.Checkbox({
	fieldLabel: 'Active',
        name: 'chstatus',
        boxLabel: '',
        labelSeparator: "",
        id: 'chstatus',
        checked: true,
        width: 100,
        disabled: true,
        listeners: {
            check: function (rb, checked) {
                if (checked === true) {
                    cstatus = 'Y';
                } else {
                    cstatus = 'N';
                }

            }
        }

    });

    var lblact = new Ext.form.Label({
        fieldLabel: '* fields are mandatory.',
        id: 'lblact',
        labelSeparator: "",
        labelStyle: 'font-size: 15px;color:red;'
    });



    var tab1 = [
        {
            xtype: 'container',
            title:'Plan Details',
            html: '<img src=/Pictures/test.jpg>',
            id: 'tab1',
            layout: 'absolute',
            style: 'padding:5px 5px 0',
            listeners: {
                activate: handleActivate
            },
            items: [
                {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 170,
                y: 2,
                width: 25,
                border: false,
                items: [act1]
            },            
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                // height:300,
                width: 300,
                x: 180,
                y: 10,
                border: false,
                items: [cmbbank]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                // height:300,
                width: 300,
                x: 180,
                y: 50,
                border: false,
                items: [txtdescription]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 170,
                y: 42,
                width: 25,
                border: false,
                items: [act2]
            },

		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                // height:300,
                width: 300,
                x: 180,
                y: 120,
                border: false,
                items: [paytype]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 170,
                y: 112,
                width: 25,
                border: false,
                items: [act3]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                // height:300,
                width: 200,
                x: 180,
                y: 160,
                border: false,
                items: [txtamount]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 25,
                x: 170,
                y: 152,
                border: false,
                items: [act4]
            },        
            {
                xtype: 'fieldset',
                title: '',
                labelWidth:70,
                // height:300,
                width: 170,
                x: 180,
                y: 200,
                border: false,
                items: [cmbdueon]
            },
 		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 25,
                x: 170,
                y: 192,
                border: false,
                items: [act5]
            },  
             {
                xtype: 'fieldset',
                title: '',
                labelWidth:40,
                // height:300,
                width: 200,
                x: 340,
                y: 200,
                border: false,
                items: [cmbeverymonth]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth:50,
                // height:300,
                width: 200,
                x: 470,
                y: 200,
                border: false,
                items: [lblmonth]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth:70,
                // height:300,
                width: 190,
                x: 180,
                y: 240,
                border: false,
                items: [txtstartdate]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 25,
                x: 170,
                y: 232,
                border: false,
                items: [act6]
            },  
	{
                xtype: 'fieldset',
                title: '',
                labelWidth:70,
                // height:300,
                width: 190,
                x: 180,
                y: 280,
                border: false,
                items: [txtlastpaid]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 25,
                x: 170,
                y: 272,
                border: false,
                items: [act7]
            }, 
	{
                xtype: 'fieldset',
                title: '',
                labelWidth:70,
                // height:300,
                width: 150,
                x: 180,
                y: 320,
                border: false,
                items: [txtinstallments]
            },
	{
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 25,
                x: 170,
                y: 312,
                border: false,
                items: [act8]
            }, 
	{
                xtype: 'fieldset',
                title: '',
                labelWidth:70,
                // height:300,
                width: 190,
                x: 180,
                y: 360,
                border: false,
                items: [txttilldate]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 40,
                width: 150,
                x: 180,
                y: 400,
                border: false,
                items: [chstatus]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 450,
                width: 450,
                x: 250,
                y: 440,
                border: false,
                items: [lblact]
            }

            ]

        }
    ];


var txtpaymentdate = new Ext.form.DateField({
        fieldLabel: 'Due Date',
        id: 'txtpaymentdate ',
        name: 'txtpaymentdate',
        editable: true,
        disabled: true,
       // allowBlank: false,
        anchor: '100%',
        format: 'Y-m-d',
        labelSeparator: "",
        width: 150,
        style: {
            'text-transform': 'uppercase'
        },
        listeners: {
            select: function ()
            {
                
            }
        }

    });

var txtdueamount = new Ext.form.NumberField({
 	 fieldLabel: 'Amount',
        id: 'txtdueamount',
 	labelSeparator: "",
        name: 'txtdueamount',
        width: 130,
      //  allowBlank: false,
        msgTarget: 'side',
        minLength: 2,
        maxLength: 40,
        disabled: true,
        style: {
            textTransform: "uppercase"
        }
    });

   

 var btnadd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        icon: '/Pictures/login.ico',
        listeners: {
            click: function () {
                var RowCnt = Gridview2.getStore().getCount() + 1;
                Gridview2.getStore().insert(
                        Gridview2.getStore().getCount(),
                        new dgrecord2({
                            seqno: -1,                         
                            due_date: txtpaymentdate.getValue().format('Y-m-d'),
                            due_amount: txtdueamount.getRawValue()
                        })
                        );

              
                txtpaymentdate.reset();
                txtdueamount.reset();
            }
        }
    });

	var dgrecord2 = Ext.data.Record.create([]);
    var Gridview2 = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 355,
        width: 350,
        columns: [
            {header: "#", dataIndex: 'seqno', sortable: true, width: 45, align: 'left', hidden: 'true'},     
            {header: "Date", dataIndex: 'due_date', sortable: true, width: 110, align: 'left'},
            {header: "Amount", dataIndex: 'due_amount', sortable: true, width: 110, align: 'left'}
        ],
     	 store: [],
        clicksToEdit: 1,
        listeners: {
            'cellClick': function (Gridview2, rowIndex, cellIndex, e) {
                 Ext.Msg.show({
                 title: 'Issue',
                 icon: Ext.Msg.QUESTION,
                 buttons: Ext.MessageBox.YESNO,
                 msg: 'Do You Want To Remove This Record!',
                 fn: function (btn) {
                 if (btn === 'yes') {
                 var sm = Gridview2.getSelectionModel();
                 var selrow = sm.getSelected();
                 Gridview2.getStore().remove(selrow);
                 Gridview2.getSelectionModel().selectAll();
                 }
                 }
                 });
                 
                
            }
        }
    });
var tab2 = [
        {
            xtype: 'container',
            title: 'Monthly installments',
            html: '<img src=/Pictures/test.jpg>',
            id: 'tab2',
            layout: 'absolute',
            style: 'padding:5px 5px 0',
            listeners: {
                activate: handleActivate2
            },
            items: [
			{
                xtype: 'fieldset',
                title: '',
                labelWidth: 60,
                // height:300,
                width: 180,
                x: 40,
                y: 30,
                border: false,
                items: [txtpaymentdate]
            },
		{
                xtype: 'fieldset',
                title: '',
                labelWidth: 60,
                // height:300,
                width: 230,
                x: 240,
                y: 30,
                border: false,
                items: [txtdueamount]
            },
		{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 10,
                        x: 460,
                        y: 30,
                        width: 200,
                        border: false,
                        items: [btnadd]
                    },
                
		{
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 90,
                        x: 30,
                        y: 70,
                        border: false,
                        items: [Gridview2]
                    },
            ]
        }
    ];



var tabPanel = {
        xtype: 'tabpanel',
        activeTab: 0,
        deferredRender: false,
        layoutOnTabChange: true,
        border: false,
        flex: 2,
        height: 1000,
        width: 1300,
        html: '<img src=/Pictures/test.jpg>',
        x: 0,
        y: 5,
        plain: true,
        items: [tab1,tab2]
    };
    var FormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Test',
        header: false,
        width: 1300,
        height: 600,
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
                    text: 'New',
                    style: 'text-align:center;',
                    icon: '/KgDenim/Pictures/add.ico',
                    height: 40, id: 'newstart',
                    fontSize: 30,
                    width: 70,
                    listeners: {
                        click: function () {
                            actionType = "Add";
                            //refresh();
                            cmbbank.enable();
                            txtdescription.enable();
                            txtamount.enable();
				paytype.enable();
				cmbdueon.enable();
				cmbeverymonth.enable();
				txtstartdate.enable();
				txtlastpaid.enable();
				txtinstallments.enable();
				txttilldate.enable();
				txtpaymentdate.enable();
				txtdueamount.enable();

                            	chstatus.disable();

                        }
                    }



                }, '-',
                {
                    text: 'Save',
                    style: 'text-align:center;',
                    height: 40, id: 'newsave',
                    fontSize: 30,
                    width: 70,
                    icon: '/KgDenim/Pictures/save1.ico',
                    listeners: {
                        click: function () {
                            save1();
                        }
                    }

                }, '-',
                
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
                            //  refresh();
                            //disable();

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
        items: [tabPanel,
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                x: 300,
                y: 10,
                border: false,
                items: [txtid]

            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 322,
                width: 320,
                x: 250,
                y: -10,
                border: false,
                items: [lbl]
            },
            
        ]

    });


    function refresh()
    {
        cmbbank.reset();
        txtbranch.reset();
        txtaccno.reset();
        chstatus.reset();
    }


    function disable()
    {
        cmbbank.disable();
        txtbranch.disable();
        txtaccno.disable();
        chstatus.disable();
    }



    function load() {
        gridView.load({
            url: '/call.php',
            params: {
                task: 'SSave'
            }            
        });
    }


    var LOGFormWindow = new Ext.Window({
        height: 540,
        width: 730,
        html: '<img src=/KgDenim/Pictures/test.jpg>',
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '20px', 'font-weight': 'bold'
        },
        y: 60,
        items: [FormPanel],
        title: 'ECS',
        layout: 'absolute',
        border: false,
        draggable: false,
        resizable: false,
        listeners: {
            show: function () {
		bankstore.load({
            url: '/SHVPM/Financials/FundsManagement/Bank_Reconciliation/classfile.php',
            params: {
                task: 'selectbankmaster'
            }
        });
                load();
            }
        }
    });
    LOGFormWindow.show();
});


