Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
    var voupoint;

    var ledtype ="G";

    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/clsFinancials.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadledger_type_name"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'led_code'},
            {name: 'led_name', type: 'string', mapping: 'led_name'},
            {name: 'led_type', type: 'string', mapping: 'led_type'},
        ]),
        sortInfo: {field: 'led_name', direction: "ASC"}
    });



    var Currencydatastore = new Ext.data.Store({
        id: 'Currencydatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbcurrency"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'cur_code', type: 'int', mapping: 'currency_code'},
          {name: 'cur_name', type: 'string', mapping: 'currency_symbol'}
        ]),
        sortInfo:{field: 'cur_code', direction: "ASC"}
    });
    
    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbacctnamenew"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'led_code', type: 'int', mapping: 'led_code'},
          {name: 'led_name', type: 'string', mapping: 'led_name'}
        ]),
        sortInfo:{field: 'led_name', direction: "ASC"}
    });
    
    var Voucherdatastore = new Ext.data.Store({
        id: 'Voucherdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "cmbvoucher"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
          {name: 'vou_seqno', type: 'int', mapping: 'accref_seqno'},
          {name: 'vou_no', type: 'string', mapping: 'accref_vouno'}
        ]),
        sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Financials/clsFinancials.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "getvouno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });
    
    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel      : 'Vou No',
        width           : 90,
        store           : Voucherdatastore,
        displayField    : 'vou_no',readOnly:true,
        valueField      : 'vou_seqno',
        hiddenName      : 'vou_no',
        id              : 'cmbVouno',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false
    });
    
    var dateon;
    var getdate;

    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Financials/datechk.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DATECHECKING"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['date'])
    });

    var dtpVoudate = new Ext.form.DateField({
        fieldLabel : 'Vou Date',
        id         : 'dtpVoudate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
        anchor     : '100%' ,
        listeners: {
            select: function () {
                dateon = 0;
                getdate=this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
			datechk:getdate
                    },
                    callback: function () {
                            dateon = DateCheckingDataStore.getAt(0).get('date');
                            if(dateon>0){
                                Ext.Msg.alert('Alert','Invalid Date');
                                dtpVoudate.setRawValue(new Date().format('d-m-Y'));
                            }
                    }
                });
            },           
	    blur: function () {
                dateon = 0;
                getdate=this.getValue().format('Y-m-d');
                DateCheckingDataStore.removeAll();
                DateCheckingDataStore.load({
                    url: '/SHVPM/Financials/datechk.php',
                    params: {
                        task: 'DATECHECKING',
			datechk:getdate
                    },
                    callback: function () {
                            dateon = DateCheckingDataStore.getAt(0).get('date');
                            if(dateon>0){
                                Ext.Msg.alert('Alert','Invalid Date');
                                dtpVoudate.setRawValue(new Date().format('d-m-Y'));
                            }
                    }
                });
            }
        }
    });
    
    var lblAcctname = new Ext.form.Label({
        fieldLabel  : 'Account Name',
        id          : 'lblAcctname',
        width       : 70
    });
   
    var cmbAcctname = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 270,
        store           : Ledgerdatastore,
        displayField    : 'led_name',
        valueField      : 'led_code',
        hiddenName      : 'led_name',
        id              : 'cmbAcctname',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        listeners: {
            select: function () {
                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Financials/clsFinancials.php',
		    params:
		            {
		                task: "loadledger_type_name",
		                ledcode: cmbAcctname.getValue(),
		            },
                    callback: function () {
                            ledtype =  findLedgerdatastore.getAt(0).get('led_type');
                      }
		});
            }
       }
    });
    
    var lblCurrency = new Ext.form.Label({
        fieldLabel  : 'Currency',
        id          : 'lblCurrency',
        width       : 70
    });
    
    var cmbCurrency = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        store           : Currencydatastore,
        displayField    : 'cur_name',
        valueField      : 'cur_code',
        hiddenName      : 'cur_name',
        id              : 'cmbCurrency',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        listeners: {
            select: function(){
                if (cmbCurrency.getRawValue()=="INR"){
                    txtAmount.disable();
                    txtExgrate.disable();
                    txtAmount.setValue("");
                    txtExgrate.setValue("");
                }else{
                    txtAmount.enable();
                    txtExgrate.enable();
                }
            }
        }
    });
    
    var lblAmount = new Ext.form.Label({
        fieldLabel  : 'Amount',
        id          : 'lblAmount',
        width       : 70
    });
    
    var txtAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAmount',
        width       : 70,
        name        : 'amount'
    });
    
    var lblExgrate = new Ext.form.Label({
        fieldLabel  : 'Exg Rate',
        id          : 'lblExgrate',
        width       : 60
    });
    
    var txtExgrate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtExgrate',
        width       : 60,
        name        : 'exgrate'
    });
    
    var lblType = new Ext.form.Label({
        fieldLabel  : 'Type',
        id          : 'lblType',
        width       : 50
    });
    
    var cmbType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : 'type_name',
        valueField      : 'type_code',
        hiddenName      : 'type_name',
        id              : 'cmbType',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        store           : [['1','Dr'],['2','Cr']],
        listeners: {
            blur: function(){
                if (this.getValue()==1){
                    txtDebit.enable();
                    txtCredit.disable();
                    txtCredit.setValue("");
                }else if (this.getValue()==2){
                    txtDebit.disable();
                    txtCredit.enable();
                    txtDebit.setValue("");
                }else{
                    txtDebit.disable();
                    txtCredit.disable();
                    txtDebit.setValue("");
                    txtCredit.setValue("");
                }
                if (cmbCurrency.getRawValue()!="INR"){
                    if (this.getValue()==1){
                        txtDebit.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue())* Number(txtExgrate.getRawValue())),"0.00"));
                        txtCredit.setValue("");
                    }else if (this.getValue()==2){
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue())* Number(txtExgrate.getRawValue())),"0.00"));
                        txtDebit.setValue("");
                    }
                }
            }
        }
    });
    
    var lblDebit = new Ext.form.Label({
        fieldLabel  : 'Debit',
        id          : 'lblDebit',
        width       : 70
    });
    
    var txtDebit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDebit',
        width       : 70,
        name        : 'debit'
    });
    
    var lblCredit = new Ext.form.Label({
        fieldLabel  : 'Credit',
        id          : 'lblCredit',
        width       : 70
    });
    
    var txtCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCredit',
        width       : 70,
        name        : 'credit'
    });
    
    var btnSubmit = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Submit",
        width   : 60,
        x       : 715,
        y       : 0,
        listeners: {
            click: function(){
                var gstInsert = "true";
                if (cmbAcctname.getValue()==0){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Contra","Select Ledger");
                }else if (cmbCurrency.getValue()==0){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Contra","Select Currency");
                }else if (cmbCurrency.getRawValue()!="INR"){
                    if (txtAmount.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Contra","Enter the Amount");
                    }
                    if (txtExgrate.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Contra","Enter Exchange Rate");
                    }
                }else if (cmbType.getValue()==1){
                    if (txtDebit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Contra","Enter Debit Amount");
                    }
                }else if (cmbType.getValue()==2){
                    if (txtCredit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Contra","Enter Credit Amount");
                    }
                }
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                //Ext.MessageBox.alert("Grid",selrows);
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    //var selrow = flxProdindDet.getSelectionModel().selectRow(i);
                    //Ext.MessageBox.alert("Grid",sel[i].data.slno);
                    if (sel[i].data.ledseq == cmbAcctname.getValue()){
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Contra","This Ledger Already Entered");
                }

                if (gstInsert=="true"){
                    var totamt;
/*
                    if (cmbType.getValue()==1){
                        totamt=Number(txtDebit.getRawValue())
                    }else if (cmbType.getValue()==2){
                        totamt=Number(txtCredit.getRawValue())
                    }
*/
                    totamt=Number(txtDebit.getRawValue())+Number(txtCredit.getRawValue());

                    var RowCnt = flxDetail.getStore().getCount() + 1;
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgaccrecord({
                            slno: RowCnt,
                            ledname: cmbAcctname.getRawValue(),
                            currency: cmbCurrency.getRawValue(),
                            amount: Number(txtAmount.getRawValue()),
                            exgrate: Number(txtExgrate.getRawValue()),
                            type: cmbType.getRawValue(),
                            dbamt: Number(txtDebit.getRawValue()),
                            cramt: Number(txtCredit.getRawValue()),
                            ledseq: cmbAcctname.getValue(),
                            curseq: cmbCurrency.getValue(),
                            totamt: totamt,
                            ledtype : ledtype,
                        })
                    );
                    CalcTotalDebitCredit();
                    RefreshGridData();
                }
            }
        }
    });
    
    var btnRemove = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Remove",
        width   : 60,
        x       : 715,
        y       : 30,
        handler: function(){
            var sm = flxDetail.getSelectionModel();
            var selrow = sm.getSelected();
            
            flxDetail.getStore().remove(selrow);
            CalcTotalDebitCredit();
        }
    });
    
    var AccountDetDataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials.php'
            }),
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'InvoiceDetDataStore'
        },['slno','ledname','currency','amount','exgrate','type','dbamt','cramt','ledseq','curseq'])
    });
    
    var dgaccrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 110,
        width: 760,
        x: 10,
        y: 60,
        columns: [         
            {header: "Sl No", dataIndex: 'slno',sortable:true,width:40,align:'left'},
            {header: "Account Name", dataIndex: 'ledname',sortable:true,width:270,align:'left'},
            {header: "Currency", dataIndex: 'currency',sortable:true,width:70,align:'left'},
            {header: "Cur. Amount", dataIndex: 'amount',sortable:true,width:80,align:'left'},
            {header: "Ex. Rate", dataIndex: 'exgrate',sortable:true,width:60,align:'left'},
            {header: "Type", dataIndex: 'type',sortable:true,width:50,align:'left'},
            {header: "Debit", dataIndex: 'dbamt',sortable:true,width:80,align:'left'},
            {header: "Credit", dataIndex: 'cramt',sortable:true,width:80,align:'left'},
            {header: "Ledseqno", dataIndex: 'ledseq',sortable:true,width:40,align:'left',hidden:true},
            {header: "Curseqno", dataIndex: 'curseq',sortable:true,width:40,align:'left',hidden:true},
            {header: "totamt", dataIndex: 'totamt',sortable:true,width:60,align:'left',hidden:false},
            {header: "ledtype", dataIndex: 'ledtype',sortable:true,width:60,align:'left',hidden:false},

        ]
    });
    
    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotaldbamt',readOnly:true,
        width       : 80,
        name        : 'totaldbamt'
    });
    
    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotalcramt',readOnly:true,
        width       : 80,
        name        : 'totalcramt'
    });
    
    var txtRefno = new Ext.form.TextField({
        fieldLabel  : 'Ref No',
        id          : 'txtRefno',
        width       : 80,
        name        : 'refno',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });
    
    var dtpRefdate = new Ext.form.DateField({
        fieldLabel : 'Ref Date',
        id         : 'dtpRefdate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
        anchor     : '100%' 
    });
    
    var cmbPaymode= new Ext.form.ComboBox({
        fieldLabel      : 'Payment Mode',
        width           : 60,
        store:['CQ','DD','MT','TT'],
        displayField    : 'Paymode_id',
        valueField      : 'Paymode_code',
        hiddenName      : 'Paymode_id',
        id              : 'cmbPaymode',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
         editable        : true,
        allowblank      : false
    });

    var txtmodeNo = new Ext.form.NumberField({
        fieldLabel  : 'No',
        id          : 'txtmodeNo',
        width       : 60,
        name        : 'No'
    });

    var dtpmodeDate = new Ext.form.DateField({
        fieldLabel : 'Date',
        id         : 'dtpmodeDate',
        name       : 'Date',
        format     : 'd-m-Y',
        value      : new Date(),
        anchor     : '100%'
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtNarration',
        width       : 675,
        height      : 50,
        name        : 'narration',
        style :{textTransform:"uppercase"},
        listeners:{
            change: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
    });
    
    var ContraEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Contra Entry',
        header      : false,
        width       : 438,
        height      : 280,
        x           : 0,
                        bodyStyle: {"background-color": "#344F8C"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        y           : 0,
        frame       : false,
        id          : 'ContraEntryFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: ' Add',
                    style  : 'text-align:center;',hidden:true,
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '/Pictures/Add.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Add";
                        }
                    }
                },'-',
                {
                    text: 'Edit',
                    fontSize :18,hidden:true,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/Pictures/edit.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                        var rcnt = flxDetail.getStore().getCount();
                        var fromdate;
                        var todate;
                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
                        if(Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(rcnt<=0){
                            Ext.MessageBox.alert("Contra","Transactions Details Not Avaliable ..");
                        }else if(Number(txtTotaldbamt.getRawValue())!=Number(txtTotalcramt.getRawValue())){
                            Ext.MessageBox.alert("Contra","The Transactions Debit and Credit Amount are not  Equal");
                        }else {
                            Ext.Msg.show({
                                title: 'Contra Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Are You Sure to Add This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnContraSave.php',
                                            params:{
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: 0,
                                                vouno: cmbVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d"),
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "CT",
                                                paymode: cmbPaymode.getRawValue(),
                                                payno: txtmodeNo.getRawValue(),
                                                paydate: Ext.util.Format.date(dtpmodeDate.getValue(),"Y-m-d"),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
                                                entrypoint : voupoint,
                                            },
                                            callback: function(options, success, response)
                                            {
                                                var obj = Ext.decode(response.responseText);
                                                if (obj['success']=="true"){
                                                        Ext.Msg.show({
                                                        title: 'Saved',
                                                        icon: Ext.Msg.QUESTION,
                                                        buttons: Ext.MessageBox.YESNO,
                                                        msg: 'Record saved with Voucher No -'+ obj['vouno'],
                                                        fn: function(btn){
                                                            if (btn == 'yes'){
                                                                window.location.reload();
                                                            }else{
                                                                window.location.reload();
                                                            }
                                                        }
                                                        });
                                                }else{
                                                    Ext.MessageBox.alert("Alert","Record not saved - " + obj['vouno']);
                                                }
                                            }
                                       });
                                    }
                                }
                            });
                        }
                    }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'View',
                    style  : 'text-align:center;',hidden:true,
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            ContraEntryWindow.hide();
                        }
                    }
                }]
        },
        items: [
            {   xtype       : 'fieldset',
                title       : '',
                width       : 785,
                height      : 60,
                x           : 2,
                y           : 2,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 0,
                        border      : false,
                        items: [cmbVouno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 200,
                        y           : 0,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpVoudate]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 785,
                height      : 220,
                x           : 2,
                y           : 65,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 5,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblAcctname]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 300,
                        x           : 0,
                        y           : 20,
                        border      : false,
                        items: [cmbAcctname]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 280,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCurrency]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 275,
                        y           : 20,
                        border      : false,
                        items: [cmbCurrency]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 355,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblAmount]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 350,
                        y           : 20,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtAmount]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 90,
                        x           : 430,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblExgrate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 90,
                        x           : 425,
                        y           : 20,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtExgrate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 80,
                        x           : 495,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 80,
                        x           : 490,
                        y           : 20,
                        border      : false,
                        items: [cmbType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 550,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 545,
                        y           : 20,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 625,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCredit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 620,
                        y           : 20,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtCredit]
                    }, btnSubmit, btnRemove, flxDetail,
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 110,
                        x           : 565,
                        y           : 165,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtTotaldbamt]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 110,
                        x           : 650,
                        y           : 165,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtTotalcramt]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 785,
                height      : 140,
                x           : 2,
                y           : 285,
                border      : true,
                layout      : 'absolute',
                style       : 'padding:0px',
                items: [
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 180,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtRefno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 170,
                        y           : 0,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpRefdate]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 100,
                        width       : 250,
                        x           : 380,
                        y           : 0,
                        border      : false,
                        items: [cmbPaymode]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 20,
                        width       : 250,
                        x           : 560,
                        y           : 0,
                        border      : false,
                        items: [txtmodeNo]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 30,
                        width       : 135,
                        x           : 650,
                        y           : 0,
                        border      : false,
                        items: [dtpmodeDate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 70,
                        width       : 775,
                        x           : 0,
                        y           : 30,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtNarration]
                    }
                ]
            }
        ]
    });
    
    function RefreshData(){
        gstFlag = "Add";
        Currencydatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task:"cmbcurrency"
            }
        });
        Ledgerdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task:"cmbacctnamenew"
            }
        });
        Voucherdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task: "cmbvoucher",
                finid: ginfinid,
                voutype: 'EX'
            }
        });
        VouNodatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task: "getCtvouno",
                finyear: ginfinid,
                compcode: gstfincompcode
            },
            callback: function(){
                cmbVouno.setValue("CT"+VouNodatastore.getAt(0).get('con_value'));
            }
        });
        txtDebit.enable();
        txtCredit.disable();
        txtAmount.disable();
        txtExgrate.disable();
        txtTotalcramt.setValue("");
        txtTotaldbamt.setValue("");
        txtAmount.setValue("");
        txtCredit.setValue("");
        txtDebit.setValue("");
        txtExgrate.setValue("");
        txtNarration.setValue("");
        txtRefno.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue("Dr");
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbAcctname.setValue("");
        cmbPaymode.setValue("");
        txtmodeNo.setValue("");
        flxDetail.getStore().removeAll();
    };
    
    function RefreshGridData(){
        txtDebit.setValue("");
        txtCredit.setValue("");
        txtAmount.setValue("");
        txtExgrate.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue('Dr');
        cmbCurrency.setValue(1);
        cmbCurrency.setRawValue('INR');
        cmbAcctname.setValue("");
    };
    
    function CalcTotalDebitCredit(){
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
        var gindbtotal = 0;
        var gincrtotal = 0;
        for (var i=0;i<selrows;i++){
            gindbtotal = gindbtotal + Number(sel[i].data.dbamt);
            gincrtotal = gincrtotal + Number(sel[i].data.cramt);
        }
        txtTotaldbamt.setValue(gindbtotal);
        txtTotalcramt.setValue(gincrtotal);
    };
    
    function CheckDate(){
        var fromdate;
        var todate;
        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);
        if(dtpVoudate.getRawValue() < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }else if(dtpVoudate.getRawValue() > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
        }
    };
    
    var ContraEntryWindow = new Ext.Window({
	height      : 450,
        width       : 805,
        y           : 65,
        title       : 'Contra Entry',
        items       : ContraEntryFormPanel,
        layout      : 'fit',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        listeners:
            {
                show:function(){
                    gstFlag = "Add";


               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }


 		     if(gstfinyear.substring(5,9)==='2018'){
			dtpVoudate.setRawValue('31-'+'03-'+gstfinyear.substring(5,9));
		     }
                    Currencydatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task:"cmbcurrency"
                        }
                    });
                    Ledgerdatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task:"cmbacctnamenew",
                            compcode: gstfincompcode
                        }
                    });
                    Voucherdatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "cmbvoucher",
                            finid: ginfinid,
                            voutype: 'EX'
                        }
                    });
                    VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "getCtvouno",
                            finyear: ginfinid,
                            compcode: gstfincompcode
                        },
                        callback: function(){
                            cmbVouno.setValue("CT"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });
                    txtDebit.enable();
                    txtCredit.disable();
                    txtAmount.disable();
                    txtExgrate.disable();
                    cmbType.setValue(1);
                    cmbCurrency.setValue(1);
                    cmbCurrency.setRawValue('INR');
                }
            }
    });
    ContraEntryWindow.show();  
});

