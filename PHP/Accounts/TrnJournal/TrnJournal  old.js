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

    var ledtype ="G";
    var seqno = 0;
    var editrow = 0;   
    var gridedit = "false";


new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  JournalEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsJournal.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'led_code', 'led_name'
      ]),
    });

function itemSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsJournal.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtSearch.getRawValue(),
		},
        });
}



var txtSearch = new Ext.form.TextField({
        fieldLabel  : 'Search Ledger',
        id          : 'txtSearch',
        name        : 'txtSearch',
        width       :  250,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
	    keyup: function () {
                loadSearchLedgerListDatastore.removeAll();
                  if (txtSearch.getRawValue() != '')
                     itemSearch();
            }
         }  
    });


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 370,
        width: 420,
        x: 0,
        y: 35,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'led_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "Led Name", dataIndex: 'led_name',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('led_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('led_code');
				cmbAcctname.setValue(selrow.get('led_code'));
                                  
	     

			}
		}
 
    
   }
   });




function add_btn_click()
{
                var gstInsert = "true";
                if (cmbAcctname.getValue()==0||cmbAcctname.getRawValue()==""){
                    gstInsert = "false";
                    Ext.MessageBox.alert("Journal","Select Ledger");
                }else if (cmbType.getRawValue()== 'Dr'){
                    if (txtDebit.getRawValue()==""){
                        gstInsert = "false";
                        Ext.MessageBox.alert("Journal","Enter Debit Amount");
                    }
                }else if (cmbType.getRawValue()== 'Cr'){
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



                if (gstInsert == "true")
                {
                if (gridedit === "false")
                { 

		        if (cnt > 0){
		            gstInsert = "false";
		            Ext.MessageBox.alert("Journal","This Ledger Already Entered");
		        }
                }
                if (gridedit === "true")
                {

			gridedit = "false";
			var idx = flxDetail.getStore().indexOf(editrow);
               		sel[idx].set('ledname' , cmbAcctname.getRawValue());
			sel[idx].set('type'    , cmbType.getRawValue());
			sel[idx].set('dbamt'   , Number(txtDebit.getRawValue()));
	 		sel[idx].set('cramt'   , Number(txtCredit.getRawValue()));
			sel[idx].set('ledseq'  , cmbAcctname.getValue());
			sel[idx].set('totamt'  , Number(txtDebit.getRawValue()) + Number(txtCredit.getRawValue()));
			sel[idx].set('ledtype' , ledtype);
			flxDetail.getSelectionModel().clearSelections();
                        CalcTotalDebitCredit();
		}//if(gridedit === "true")
                else
                if  (cnt ==0){
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
                        new dgrecord({
                            ledname : cmbAcctname.getRawValue(),   
                            type    : cmbType.getRawValue(),
                            dbamt   : Number(txtDebit.getRawValue()),
                            cramt   : Number(txtCredit.getRawValue()),
                            ledseq  : cmbAcctname.getValue(),
                            totamt  : totamt,
                            ledtype : ledtype
                        })
                    );

/*
                        Ledgerdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"cmbacctname",
                            compcode:gstfincompcode
                        }
                    });
*/

                    cmbAcctname.focus();
		    cmbAcctname.setRawValue('');
                    CalcTotalDebitCredit();
//                    txtTotNetamt.setRawValue(totamt);
//                    BillAdjustingDetail();
//                    RefreshGridData();
                }
            }
                   txtDebit.setRawValue('');
                   txtCredit.setRawValue('');

}



    var findLedgerdatastore = new Ext.data.Store({
        id: 'findLedgerdatastore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
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

    
    var Ledgerdatastore = new Ext.data.Store({
        id: 'Ledgerdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
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
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
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
    //    sortInfo:{field: 'vou_seqno', direction: "ASC"}
    });
    
    var VouNodatastore = new Ext.data.Store({
        id: 'VouNodatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadLastVouNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['con_value'])
    });

    var LoadVouNoDetailsdatastore = new Ext.data.Store({
        id: 'LoadVouNoDetailsdatastore',
        proxy: new Ext.data.HttpProxy({
                  url: '/SHVPM/Accounts/clsAccounts.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task: "LoadVoucherDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_vou_type', 'accref_bank_name', 'accref_paymode', 'accref_payref_no',
'accref_payref_date', 'accref_narration', 'accref_chq_status', 'accref_reverse_status', 'acctran_accref_seqno', 
'acctran_serialno', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_totamt', 'acctran_paytype',
'led_name', 'led_addr1', 'led_addr2','led_type', 'led_custcode'])
    });



    var txtVouno = new Ext.form.TextField({
        fieldLabel  : 'Vou No',
        id          : 'txtVouno',
        width       : 90,
        name        : 'txtVouno',
        readOnly    : 'true',
    })

    
    var cmbVouno = new Ext.form.ComboBox({
        fieldLabel      : 'Vou No',
        width           : 90,
        store           : Voucherdatastore, //readOnly:true,
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
           select: function(){
                      flxDetail.getStore().removeAll();
     	               LoadVouNoDetailsdatastore.load({
                           url: '/SHVPM/Accounts/clsAccounts.php',
	                   params: {
			        task: 'LoadVoucherDetails',
			        fincode : ginfinid,
			        compcode: gstfincompcode,
                                vouno   : cmbVouno.getRawValue(),
	                  },
		          callback: function () {
                              var cnt=LoadVouNoDetailsdatastore.getCount();
                              if (cnt>0)
                              {
                                  for(var j=0; j<cnt; j++) 
                                  {


                                      seqno =  LoadVouNoDetailsdatastore.getAt(j).get('accref_seqno');
                                      txtVouno.setRawValue(cmbVouno.getRawValue());
                                      dtpVoudate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_voudate'),"d-m-Y"));  
                                      txtRefno.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_no'));
                                      dtpRefdate.setRawValue(Ext.util.Format.date(LoadVouNoDetailsdatastore.getAt(j).get('accref_payref_date'),"d-m-Y")); 
                                      txtNarration.setRawValue(LoadVouNoDetailsdatastore.getAt(j).get('accref_narration'));
                                      var drcr = ''; 
                                      if (LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt') > 0)
                                         drcr = 'Dr';
                                      else
                                         drcr = 'Cr';
                                      flxDetail.getStore().insert(
	                                 flxDetail.getStore().getCount(),
                                         new dgrecord({
					     ledname : LoadVouNoDetailsdatastore.getAt(j).get('led_name'),                          				                     type    : drcr,
	                                     dbamt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'),
					     cramt   : LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt'),  
                                             totamt  : Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_dbamt'))+ Number(LoadVouNoDetailsdatastore.getAt(j).get('acctran_cramt')),
                                             ledseq  : LoadVouNoDetailsdatastore.getAt(j).get('acctran_led_code'), 
                                             ledtype : LoadVouNoDetailsdatastore.getAt(j).get('led_type'),
	                                  })
                                      );
                                  }
                CalcTotalDebitCredit();
                              }  
                          }
                      });  
            }    
        }
    });
    
    var dateon;
    var getdate;

    var DateCheckingDataStore = new Ext.data.Store({
        id: 'DateCheckingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/datechk.php', // File to connect to
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
                    url: '/SHVPM/Accounts/datechk.php',
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
                    url: '/SHVPM/Accounts/datechk.php',
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
        width           : 370,
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
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                Ext.getCmp('cmbType').focus(true, 1);          
             }
          },

            blur: function(){



                findLedgerdatastore.removeAll();
		findLedgerdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
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
    

    




    var lblType = new Ext.form.Label({
        fieldLabel  : 'Type',
        id          : 'lblType',
        width       : 50
    });
    
   function cmbtypechange()
   {

        if (cmbType.getValue()==1){
            txtDebit.enable();
            Ext.getCmp('txtDebit').focus(true, 1);
            txtCredit.disable();
            txtCredit.setValue("");
	    txtDebit.setValue("");	
        }else if (cmbType.getValue()==2){
            txtDebit.disable();
            txtCredit.enable();
            Ext.getCmp('txtCredit').focus(true, 1);
	    txtCredit.setValue("");	
            txtDebit.setValue("");
        }else{
            txtDebit.disable();
            txtCredit.disable();
            txtDebit.setValue("");
            txtCredit.setValue("");
        }

   }


    var cmbType = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
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
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
            Ext.getCmp('txtDebit').focus(true, 1);
             }
          },

            blur: function(){
                   cmbtypechange();
            },
            change: function(){
                   cmbtypechange();
            },
            select : function(){
                   cmbtypechange();
            }
        }
    });
    
    var lblDebit = new Ext.form.Label({
        fieldLabel  : 'Debit',
        id          : 'lblDebit',
        width       : 70,
  
    });
    
    var txtDebit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDebit',
        width       : 90,
        name        : 'debit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
             }
          }
        } 
    });
    
    var lblCredit = new Ext.form.Label({
        fieldLabel  : 'Credit',
        id          : 'lblCredit',
        width       : 70,

    });
    
    var txtCredit = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCredit',
        width       : 90,
        name        : 'credit',
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             { 
                 btnSubmit.focus();
             }
          }
        } 
    });
    

function save_click()
{


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
                                                accrefseq: seqno,
                                                vouno: txtVouno.getRawValue(),
                                                voudate: Ext.util.Format.date(dtpVoudate.getValue(),"Y-m-d"),
                                                bankname: "",
                                                refno: txtRefno.getRawValue(),
                                                refdate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                narration: txtNarration.getRawValue(),
                                                paytype: "GJV",
                                                paymode: "",
                                                payno: "",
                                                paydate: Ext.util.Format.date(dtpRefdate.getValue(),"Y-m-d"),
                                                flagtype: gstFlag,
                                                cnt: accData.length,
            
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



function edit_click()
{

            gstFlag = "Edit";
            cmbVouno.show();
            txtVouno.hide();
		Voucherdatastore.load({
		    url: '/SHVPM/Accounts/clsAccounts.php',
		    params:
		    {
			task: "cmbvoucher",
			finid: ginfinid,
			voutype: 'GJV',
			compcode: gstfincompcode
		    }
		});


}
    var btnSubmit = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Submit",
        width   : 60,
        x       : 715,
        y       : 30,
        listeners: {
            click: function(){
                  add_btn_click();     

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
                url: '/SHVPM/Accounts/clsAccounts.php'
            }),
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'AccountDetDataStore'
        },['ledname','currency','amount','exgrate','type','dbamt','cramt','ledseq','curseq','totamt'])
    });
    

    var dgrecord = Ext.data.Record.create([]);
    var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: AccountDetDataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 180,
        width: 760,
        x: 20,
        y: 60,
        columns: [         
            {header: "Account Name", dataIndex: 'ledname',sortable:true,width:270,align:'left'},
            {header: "Type", dataIndex: 'type',sortable:true,width:50,align:'left'},
            {header: "Debit", dataIndex: 'dbamt',sortable:true,width:80,align:'left'},
            {header: "Credit", dataIndex: 'cramt',sortable:true,width:80,align:'left'},
            {header: "Ledseqno", dataIndex: 'ledseq',sortable:true,width:60,align:'left',hidden:false},
            {header: "totamt", dataIndex: 'totamt',sortable:true,width:80,align:'left',hidden:false},
            {header: "ledtype", dataIndex: 'ledtype',sortable:true,width:60,align:'left',hidden:false},
        ],
        store:[],

    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'JOURNAL ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){
                    var sm = flxDetail.getSelectionModel();
		    var selrow = sm.getSelected();
                    gridedit = "true";
		    editrow  = selrow;
                    cmbAcctname.setRawValue(selrow.get('ledname'));
                    cmbAcctname.setValue(selrow.get('ledseq'));
                    txtDebit.setValue(selrow.get('dbamt'));
                    txtCredit.setValue(selrow.get('cramt'));
                    cmbType.setRawValue(selrow.get('type'));
                    flxDetail.getSelectionModel().clearSelections();
                    if (selrow.get('type') == 'Dr')
                    {
                        txtDebit.enable();
                        txtCredit.disable();
                    }  
                    else 
                    {
                        txtDebit.disable();
                        txtCredit.enable();
                    }
		}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
         CalcTotalDebitCredit();
             }
        });         
    }
   }




    });



    
    var txtTotaldbamt = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtTotaldbamt',readOnly:true,
        width       :  100,
        name        : 'totaldbamt'
    });
    
    var txtTotalcramt = new Ext.form.NumberField({
        fieldLabel  : 'Total Crdit',
        id          : 'txtTotalcramt',readOnly:true,
        width       : 100,
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

                        bodyStyle: {"background-color": "#fff0ff"},
                        style: {
                            'color': 'blue',
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
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '/Pictures/Add.png',
                    listeners:{
                        click: function () {
                            gstFlag = "Add";
                            RefreshData();
                        }
                    }
                },'-',
                {
//edit
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '/Pictures/edit.png',
                    listeners:{
                      click: function () {
                             edit_click();

                        }
                    }
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                    handler: function(){
                            save_click();
                    }


                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
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
                width       : 800,
                height      : 60,
                x           : 40,
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
                        y           : 7,
                        border      : false,
                        items: [cmbVouno]
                    },

                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 180,
                        x           : 10,
                        y           : 7,
                        border      : false,
                        items: [txtVouno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 190,
                        x           : 250,
                        y           : 7,
                        labelWidth  : 60,
                        border      : false,
                        items : [dtpVoudate]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 800,
                height      : 280,
                x           : 40	,
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
                        width       : 450,
                        x           : 0,
                        y           : 20,
                        border      : false,
                        items: [cmbAcctname]
                    },



                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 80,
                        x           : 405,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 100,
                        x           : 400,
                        y           : 20,
                        border      : false,
                        items: [cmbType]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 100,
                        x           : 500,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 495,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtDebit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 120,
                        x           : 605,
                        y           : 0,
                        defaultType : 'Label',
                        border      : false,
                        items: [lblCredit]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 1,
                        width       : 120,
                        x           : 600,
                        y           : 20,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtCredit]
                    }, btnSubmit,  flxDetail,
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 375,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotaldbamt]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 80,
                        width       : 300,
                        x           : 570,
                        y           : 235,
                        defaultType : 'NumberField',
                        border      : false,
                        items: [txtTotalcramt]
                    }
                ]
            },
            {   xtype       : 'fieldset',
                title       : '',
                width       : 800,
                height      : 110,
                x           : 40,
                y           : 350,
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
            },
                    {
                        xtype: 'fieldset',
                        title: '',
                        bodyStyle: {"background-color": "#ffffdb"},
                        style: {
                            'color': 'blue',
                            'style': 'Helvetica',
                            'font-size': '15px', 'font-weight': 'bold'
                        },
                        width: 460,
                        height: 455,
                        x: 850,
                        y: 5,
                        border: true,
                        layout: 'absolute',
                        items: [

                   { 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 120,
                        	width       : 520,
                        	x           : 10,
                        	y           : -10,
                            	border      : false,
                        	items: [txtSearch]
                    },flxLedger,


                        ]  
                    },
        ]
    });
    
    function RefreshData(){
        gstFlag = "Add";

        cmbVouno.hide();
        txtVouno.show();

        Ledgerdatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task:"cmbjouledger"
            }
        });

        VouNodatastore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params:
            {
                task: "LoadJournalvouno",
                finyear: ginfinid,
                compcode: gstfincompcode
            },
            callback: function(){
                txtVouno.setValue("GJV"+VouNodatastore.getAt(0).get('con_value'));
            }
        });
                    txtDebit.enable();
        txtCredit.disable();


        txtTotalcramt.setValue("");
        txtTotaldbamt.setValue("");

        txtCredit.setValue("");
        txtDebit.setValue("");

        txtNarration.setValue("");
        txtRefno.setValue("");
        cmbType.setValue(1);
        cmbType.setRawValue("Dr");

        cmbAcctname.setValue("");
        flxDetail.getStore().removeAll();
    };
    
    function RefreshGridData(){
        txtDebit.setValue("");
        txtCredit.setValue("");

        cmbType.setValue(1);
        cmbType.setRawValue('Dr');

        cmbAcctname.setValue("");
        seqno = 0;   
        cmbVouno.hide();
        gstFlag = "Add";

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
	height      : 550,
        width       : 1300,
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
       
                    seqno = 0;   

                    cmbVouno.hide();

                    gstFlag = "Add";

                    Ledgerdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task:"LoadAllLedgerList",
                            compcode:gstfincompcode
                        }
                    });
                    Voucherdatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "cmbvoucher",
                            finid: ginfinid,
                            compcode: gstfincompcode,
                            voutype: 'GJV'
                        }
                    });
                    VouNodatastore.load({
                        url: '/SHVPM/Accounts/clsAccounts.php',
                        params:
                        {
                            task: "LoadLastVouNo",
                            finyear: ginfinid,
                            compcode: gstfincompcode,
                            voutype : 'GJV'
                        },
                        callback: function(){
                            txtVouno.setValue("GJV"+VouNodatastore.getAt(0).get('con_value'));
                        }
                    });
                    txtDebit.enable();
                    txtCredit.disable();


                    cmbType.setValue(1);
                    cmbType.setRawValue('Dr');

                }
            }
    });
    JournalEntryWindow.show();  
});


