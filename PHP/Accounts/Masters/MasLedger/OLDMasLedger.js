Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');


var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');


var GinUserid = localStorage.getItem('ginuserid');
var GinUserType = localStorage.getItem('ginusertype');




    var GroupNameDataStore = new Ext.data.Store({
      id: 'GroupNameDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsLedger.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'subgrpcode','subgrpname'
      ]),
      sortInfo:{field: 'subgrpname', direction: "ASC"}
    });


      var LedCodeLedgerDataStore = new Ext.data.Store({
      id: 'LedCodeLedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "LedCodeLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_code'])
    });
    var LedLedgerNameDataStore = new Ext.data.Store({
      id: 'LedLedgerNameDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "GeneralLedger"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_code','led_name'])
    });

    var LedLedgerDetailDataStore = new Ext.data.Store({
      id: 'LedLedgerDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "LedLedgerDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_prefix','led_code','led_name','led_grp_code','led_status','led_addr1','led_addr2','led_city','led_TinNo','led_gst_no'])
    });

var txtledgerCode= new Ext.form.TextField({
        fieldLabel  : 'Ledger Code',
        id          : 'txtledgerCode',
        name        : 'txtledgerCode',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });
   
    var txtledgerName= new Ext.form.TextField({
        fieldLabel  : 'Ledger Name',
        id          : 'txtledgerName',
        name        : 'txtledgerName',
        width       :  350,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true,
        enableKeyEvents:true,
        listeners:{
            keyup:function(){
                LedLedgerNameDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php',
                    params:{
                        task:'LedLedgerName',
                        compcode:gincompcode,
                        ledname:this.getRawValue()+'%'
                    }
                });
            }
        }
    });
    
var grpcode;
var cmbGroupName = new Ext.form.ComboBox({
        id         : 'cmbGroupName',
        name	   : 'GroupName',
        fieldLabel : 'Group Name',
        store:GroupNameDataStore,
        width      : 350,
        displayField:'subgrpname',
        valueField:'subgrpcode',
        hiddenName:'subgrpname',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){
//             grpcode=this.getValue()
          }
       }
    });


    var txtPrefix= new Ext.form.TextField({
        fieldLabel  : 'Prefix',
        id          : 'txtPrefix',
        name        : 'txtPrefix',
        width       :  80,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

var Status;
   var chkStatus= new Ext.form.Checkbox({
        name    : 'Status',
        boxLabel: 'Active / Inactive',
        id      : 'chkStatus',
        checked : false,
        width   : 130,
        x:200,
        y:100,
        listeners:{
            check:function(rb,checked){
                if(checked==true){
                    Status="Y";
                }else{
                     Status="N";
                }
            }
        }
   });

       var txtAdd1= new Ext.form.TextField({
        fieldLabel  : 'Address1',
        id          : 'txtAdd1',
        name        : 'txtAdd1',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

        var txtAdd2= new Ext.form.TextField({
        fieldLabel  : 'Address2',
        id          : 'txtAdd2',
        name        : 'txtAdd2',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

        var txtCity= new Ext.form.TextField({
        fieldLabel  : 'City',
        id          : 'txtCity',
        name        : 'txtCity',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

        var txtTinno= new Ext.form.TextField({
        fieldLabel  : 'TIN NO',
        id          : 'txtTinno',
        name        : 'txtTinno',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

     var txtPanno= new Ext.form.TextField({
        fieldLabel  : 'PAN NO',
        id          : 'txtPanno',
        name        : 'txtPanno',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

   var txtGSTno= new Ext.form.TextField({
        fieldLabel  : 'GST NO',
        id          : 'txtGSTno',
        name        : 'txtGSTno',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  true
    });

    var dgrecord = Ext.data.Record.create([]);
    var ledname;
    var flxLedger = new Ext.grid.EditorGridPanel({
        frame: true,
        store:LedLedgerNameDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        backgroundColor:"#FFCCFF",
        autoShow: true,
        scrollable: true,
        menuDisabled: true,
        hideHeaders:true,
	stripeRows: true,
	columnLines: true,
        height: 400,
        width: 450,
        border:true,
        x: 500,
        y: 20,
        columns: [
            {header: "", dataIndex: 'led_code',width:110,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,hidden:true},
            {header: "", dataIndex: 'led_name',width:270,align:'left', sortable: false,defaultSortable: false,menuDisabled: true}  ],
           listeners:{
            click:function(){
                  var sel= flxLedger.getSelectionModel().getSelections();
                for(var i=0; i<sel.length; i++){
                    SeqnoLoad=sel[i].data.led_code;
                    ledname=sel[i].data.led_name;
                }
                LedLedgerDetailDataStore.removeAll();
                         LedLedgerDetailDataStore.load({
                          url:'/SHVPM/Accounts/clsAccounts.php',
                            params:{
                                task:'LedLedgerDetail',
                                compcode:gincompcode,
                                ledname:ledname
                            },
                            callback:function(){
                                var cnt=LedLedgerDetailDataStore.getCount();
                                if(cnt>0){
                                    txtledgerCode.setRawValue("L"+LedLedgerDetailDataStore.getAt(0).get('led_code'));
                                    txtledgerName.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_name'));
                                    txtledgerName.disable();
                                    cmbGroupName.setValue(LedLedgerDetailDataStore.getAt(0).get('led_grp_code'));
                                    cmbGroupName.disable();
                                    txtPrefix.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_prefix'));
                                    txtPrefix.disable();
                                    txtAdd1.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_addr1'));
                                    txtAdd2.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_addr2'));
                                    txtCity.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_city'));
                                    txtTinno.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_TinNo'));
				    txtGSTno.setRawValue(LedLedgerDetailDataStore.getAt(0).get('led_gst_no'));
                                    var led_status=LedLedgerDetailDataStore.getAt(0).get('led_status');

                                    if(led_status=="Y"){
                                            Ext.getCmp('chkStatus').setValue(true);
                                    }
                                }
                            }
                    });
            }
        }
    });

   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Ledger Master',
        width       : 700,
        height      : 500,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'MasLedgerFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png'
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                           if (txtledgerCode.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Ledger Code should not be empty...!");
                             }
                           else if (txtledgerName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Ledger Name should not be empty...!.");
                             }
        /*
                           else if (txtPanno.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "PAN Number should not be empty...!.");
                             }
                           else if (cmbGroupName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Group name should not be empty...!");
                             }
                   else if ((gincurfinid - ginfinid)>1){
                                Ext.MessageBox.alert("ACCOUNTS", "Not allowed to create ledger in this finyear");
                             }*/else {
                                MasLedgerFormPanel.getForm().submit({
                                   url: '/SHVPM/Accounts/Masters/MasLedger/MasLedgerSave.php',
                                     params:
                                      {
                                          compcode:gincompcode,
                                          ledgername:txtledgerName.getRawValue(),
                                          ledger_addr1:txtAdd1.getRawValue(),
                                          ledger_addr2:txtAdd2.getRawValue(),
                                          ledger_city:txtCity.getRawValue(),
                                          led_grpcode:cmbGroupName.getValue(),
                                          led_prefix:txtPrefix.getRawValue(),
                                          finyear:ginfinid,
                                          ledger_panno:txtPanno.getRawValue(),
                                          ledger_gstno:txtGSTno.getRawValue(),
                                          ledger_tinno:txtTinno.getRawValue(),
                                          usercode    : GinUserid,  
                                        
                                      },
                                  success:function()
                                       {
                                           Ext.MessageBox.alert("ACCOUNTS","Ledger Created Successfully...");
                                           RefreshData();
                                       },
                                    failure:function()
                                       {
                                        Ext.MessageBox.alert("ACCOUNTS","Not Saved");
                                      }
                              });
                          }
                          }
                        }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function(){
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasLedgerWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{
                 xtype: 'fieldset',
                title: 'Ledger Details',
                layout : 'absolute',
                border:true,
                height:340,
                width:930,
                x: 10,
                y: 0,
                     items:[
                        {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 0,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtledgerCode]
                       },
                         {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 30,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtledgerName]
                       },
                        {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 500,
                        x           : 0,
                        y           : 60,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbGroupName]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 90,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtPrefix]
                       },chkStatus,
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 120,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtAdd1]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 150,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtAdd2]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 180,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtCity]
                       },
                        {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 210,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtTinno]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 240,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtPanno]
                       },
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 450,
                        x           : 0,
                        y           : 270,
                        border      : false,
                        labelWidth  : 100,
                        items: [txtGSTno]
                       },
                       flxLedger
               ]
             }
            ]
         });

    function RefreshData(){
        LedCodeLedgerDataStore.load({
            url:'/SHVPM/Accounts/clsAccounts.php',
            params:{
                task:'LedCodeLedger'
            },
            callback:function(){
                var ledcode=LedCodeLedgerDataStore.getAt(0).get('led_code');
                txtledgerCode.setRawValue(ledcode);
            }
        });
        txtledgerName.enable();
        cmbGroupName.enable();
        txtPrefix.enable();
        MasLedgerFormPanel.getForm().reset();
        LedLedgerNameDataStore.removeAll();
    }

     var MasLedgerWindow = new Ext.Window({
        height      : 480,
        width       : 1000,
        items       : MasLedgerFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 90,
onEsc:function(){
},
        listeners:{
            show:function(){
                //Ext.MessageBox.alert("ACCOUNTS",gincurfinid);
//		alert(gincompcode);
//		alert(ginfinid);
                GroupNameDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php', 
                    params:{
                        task:'GroupName',
                        compcode:gincompcode
                    }
                });

                LedCodeLedgerDataStore.load({
                    url:'/SHVPM/Accounts/clsAccounts.php',
                    params:{
                        task:'LedCodeLedger'
                    },
                    callback:function(){
                        var ledcode=LedCodeLedgerDataStore.getAt(0).get('led_code');
                        txtledgerCode.setRawValue(ledcode);
                    }
                });
            }
        }
    });
       MasLedgerWindow.show();
});
