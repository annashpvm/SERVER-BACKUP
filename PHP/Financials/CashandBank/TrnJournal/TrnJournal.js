Ext.onReady(function(){
    Ext.QuickTips.init();
    var gstFlag;
    var gstAdjtype='C';
    var ginfinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var gstfincompcode = localStorage.getItem('gincompcode');

   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');


    var powerid=localStorage.getItem('powerid');	
    var gindbtotal;
    var gincrtotal;
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


     function CalcTotalDebitCredit(){
        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
         gindbtotal = 0;
         gincrtotal = 0;
        for (var i=0;i<selrows;i++){
            gindbtotal = Number(gindbtotal)+Number(sel[i].data.dbamt);
            gincrtotal = Number(gincrtotal)+Number(sel[i].data.cramt);
        };
        txtTotaldbamt.setRawValue(gindbtotal.toFixed(2));
        txtTotalcramt.setRawValue(gincrtotal.toFixed(2));
    };

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
              baseParams:{task: "cmbjouledger"}, // this parameter asks for listing
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
        store           : Voucherdatastore,readOnly:true,
        displayField    : 'vou_no',
        valueField      : 'vou_seqno',
        hiddenName      : 'vou_no',
        id              : 'cmbVouno',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        style :{textTransform:"uppercase"},
        listeners:{
            blur: function(field,newValue,oldValue){
                field.setValue(newValue.toUpperCase());
            }
        }
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
//value: '2020-03-31',
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
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        listeners: {
            blur: function(){

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

		txtCredit.setValue("");	
                txtDebit.setValue("");
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.ledseq == cmbAcctname.getValue()){
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0){
                    Ext.MessageBox.alert("Journal","This Ledger Already Entered");
                }
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
        forceSelection  : false,
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
		    txtDebit.setValue("");	
                }else if (this.getValue()==2){
                    txtDebit.disable();
                    txtCredit.enable();
		    txtCredit.setValue("");	
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
			txtDebit.setValue("");
                    }else if (this.getValue()==2){
                        txtCredit.setValue(Ext.util.Format.number((Number(txtAmount.getRawValue())* Number(txtExgrate.getRawValue())),"0.00"));
                        txtDebit.setValue("");
			txtCredit.setValue("");
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
                if (cmbAcctname.getValue()==0||cmbAcctname.getRawValue()==""){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Expenses","Select Ledger");
                }else if (cmbCurrency.getValue()==0){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Journal","Select Currency");
                }else if (cmbCurrency.getRawValue()!="INR"){
                    if (txtAmount.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter the Amount");
                    }
                    if (txtExgrate.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Exchange Rate");
                    }
                }else if (cmbType.getValue()==1){
                    if (txtDebit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Debit Amount");
                    }
                }else if (cmbType.getValue()==2){
                    if (txtCredit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Credit Amount");
                    }
                }
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.ledseq == cmbAcctname.getValue()){
                        cnt = cnt + 1;
                    }
                }
                if (cnt > 0){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Journal","This Ledger Already Entered");
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
                    totamt= Number(txtDebit.getRawValue())+ Number(txtCredit.getRawValue())
                    flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgaccrecord({
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
                            ledtype : ledtype
                        })
                    );
                        Ledgerdatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task:"cmbacctname",
                            compcode:gstfincompcode
                        }
                    });
                    cmbAcctname.focus();
		    cmbAcctname.setRawValue('');
                    CalcTotalDebitCredit();
//                    txtTotNetamt.setRawValue(totamt);
                    BillAdjustingDetail();
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
        id:'AccountDetDataStore'
        },['ledname','currency','amount','exgrate','type','dbamt','cramt','ledseq','curseq','totamt'])
    });
    
    var dgaccrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 90,
        width: 760,
        x: 10,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname',sortable:true,width:270,align:'left'},
            {header: "Currency", dataIndex: 'currency',sortable:true,width:70,align:'left'},
            {header: "Cur. Amount", dataIndex: 'amount',sortable:true,width:80,align:'left'},
            {header: "Ex. Rate", dataIndex: 'exgrate',sortable:true,width:60,align:'left'},
            {header: "Type", dataIndex: 'type',sortable:true,width:50,align:'left'},
            {header: "Debit", dataIndex: 'dbamt',sortable:true,width:80,align:'left'},
            {header: "Credit", dataIndex: 'cramt',sortable:true,width:80,align:'left'},
            {header: "Ledseqno", dataIndex: 'ledseq',sortable:true,width:40,align:'left',hidden:false},
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
//value: '2020-03-31',
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
    
    var JournalEntryFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Journal Entry',
        header      : false,
        width       : 438,

                        bodyStyle: {"background-color": "#344F8C"},
                        style: {
                            'color': 'white',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
        height      : 280,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'JournalEntryFormPanel',
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
                        /*var gstRefno;
                        if(txtRefno.getRawValue()==""){
                            gstRefno = cmbVouno.getRawValue();
                        }else{
                            gstRefno = txtRefno.getRawValue();
                        }*/
                        fromdate = "04/01/"+gstfinyear.substring(0,4);
                        todate = "03/31/"+gstfinyear.substring(5,9);
                        if(Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Voucher Date not in current finyear");
                        }else if(rcnt<=0){
                            Ext.MessageBox.alert("Journal","Transactions Details Not Avaliable ..");
                        }else if(Number(txtTotaldbamt.getRawValue())!=Number(txtTotalcramt.getRawValue())){
                            Ext.MessageBox.alert("Journal","The Transactions Debit and Credit Amount are not  Equal");
                        }else {
                            Ext.Msg.show({
                                title: 'Journal Voucher',
                                icon: Ext.Msg.QUESTION,
                                buttons: Ext.MessageBox.YESNO,
                                msg: 'Save This Record?',
                                fn: function(btn){
                                    if (btn == 'yes'){
                                        var accData = flxDetail.getStore().getRange();
                                        var accupdData = new Array();
                                        Ext.each(accData, function (record) {
                                            accupdData.push(record.data);
                                        });
                                        Ext.Ajax.request({
                                            url: 'FrmTrnJournalSave.php',
                                            params:{
                                                griddet: Ext.util.JSON.encode(accupdData),
                                                finid: ginfinid,
                                                finyear: gstfinyear,
                                                compcode: gstfincompcode,
                                                accrefseq: 0,
                                                vouno: cmbVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d"),
                                                bankname: "",
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "JV",
                                                paymode: "",
                                                payno: "",
                                                paydate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
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
                    style  : 'text-align:center;',hidden:true,
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                          window.location.reload();
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
                            JournalEntryWindow.hide();
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
                        x           : 180,
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
                height      : 200,
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
                        defaultType : 'NumberField',
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
                        defaultType : 'NumberField',
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
                        defaultType : 'NumberField',
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
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtCredit]
                    }, btnSubmit, btnRemove, flxDetail,
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 110,
                        x           : 565,
                        y           : 145,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotaldbamt]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 110,
                        x           : 650,
                        y           : 145,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotalcramt]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 785,
                height      : 110,
                x           : 2,
                y           : 270,
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
                        x           : 200,
                        y           : 0,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpRefdate]
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
                task:"cmbjouledger"
            }
        });
        Voucherdatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task: "cmbvoucher",
                finid: ginfinid,
                voutype: 'JV'
            }
        });
        VouNodatastore.load({
            url: '/SHVPM/Financials/clsFinancials.php',
            params:
            {
                task: "getJournalvouno",
                finyear: ginfinid,
                compcode: gstfincompcode
            },
            callback: function(){
                cmbVouno.setValue("JV"+VouNodatastore.getAt(0).get('con_value'));
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
    }
    
    var JournalEntryWindow = new Ext.Window({
	height      : 460,
        width       : 805,
        y           : 70,
        title       : 'Journal Entry',
        items       : JournalEntryFormPanel,
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
		     if(gstfinyear.substring(5,9)==='2019'){
			dtpVoudate.setRawValue('31-'+'03-'+gstfinyear.substring(5,9));
		     }

               if (GinUser === 'Accounts-HO')
               {
                  voupoint = 'H';
               }
               else
               {
                  voupoint= 'M';
               }

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
                            task:"cmbacctname",
                            compcode:gstfincompcode
                        }
                    });
                    Voucherdatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "cmbvoucher",
                            finid: ginfinid,
                            voutype: 'JV'
                        }
                    });
                    VouNodatastore.load({
                        url: '/SHVPM/Financials/clsFinancials.php',
                        params:
                        {
                            task: "getJournalvouno",
                            finyear: ginfinid,
                            compcode: gstfincompcode
                        },
                        callback: function(){
                            cmbVouno.setValue("JV"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });
                    txtDebit.enable();
                    txtCredit.disable();
                    txtAmount.disable();
                    txtExgrate.disable();
                    cmbType.setValue(1);
                    cmbType.setRawValue('Dr');
                    cmbCurrency.setValue(1);
                    cmbCurrency.setRawValue('INR');
		    if(ginfinid<27 && powerid==='capitalacc'){
			    JournalEntryWindow.show();
		    }else if(ginfinid>26 && powerid==='capital'){
			    JournalEntryWindow.show();
		    }else if(ginfinid<27 && powerid==='capital'){
			    JournalEntryWindow.hide();
		    }	
                }
            }
    });
    JournalEntryWindow.show();  
});


