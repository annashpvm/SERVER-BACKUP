Ext.onReady(function() {
    Ext.QuickTips.init();
   var ledcode;
   var compcode =localStorage.getItem('gincompcode');
   var finid    =localStorage.getItem('ginfinid');
   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');

   var finstdate = localStorage.getItem('gfinstdate');   
   var fineddate = localStorage.getItem('gfineddate');    


   var millname =localStorage.getItem('gstcompany');

   var yearfin  = localStorage.getItem('gstyear'); 

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  

   var grid = null;
   var store = null;
   var allData = [];
   var voutype = '';
   var vouseqno = 0;

   var mailheader = '';
   var mailtrailer = '';
   var mailmessage = '';    
  var email = '';
  var SubLedgerName  = '';
   var printtype='PDF';
   var yearfinid=0;
   var totdb,totcr;
   var ledname="";
   var ledcode=0;
   var custcode = 0;
   var ledgercode=0;
   var vouamt = 0;
   var vouamt2 = 0;
   var dbcr = "db";
   var acctran_led_code;
   var accrefvouno,clsbal; 
   var b='';
   var pvr_cramt,pvr_dbamt;
   var monthcode;
   var typevou;
   var accref_vouno;
   var accref_voudate;
   var accref_payref_no;
   var acctrail_inv_no;
   var acctradbamt;
   var acctrancramt;
   var accref_vou_type;
   var curbal_obcramt,curbal_obdbamt,monthtype;
   var fvr_opbal,fst_dbcr, balmon;
   var dgrecord = Ext.data.Record.create([]);
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);
   var dgrecord3 = Ext.data.Record.create([]);
   var flagtypenw;
   var ledtype = ''; 
   var suptype = "G";
   var ledger_debit = 0;   
   var ledger_credit = 0;
   var voutype = '';

   var vouseqno = 0;
 var alldueoption = 1;


function columnWrap(val){
    return '<div style="white-space:normal !important;">'+ val +'</div>';
}


const formatter = new Intl.NumberFormat('en-IN', {
    //  style: 'currency',
      currency: 'inr',
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }); 

    

var lblLedgerName = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblLedgerName',
    name        : 'lblLedgerName',
style: {
        'color':'#ff0000',readOnly:true,
        'style': 'Helvetica',
        'font-size': '15px','font-weight':'bold'
    },
    width       : 550
});


     var loadAddressDatastore = new Ext.data.Store({
        id: 'loadAddressDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"find_Address"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cust_ref','cust_add1','cust_add2','cust_add3','cust_city','state_name','cust_zip','cust_contact','cust_phone','cust_email'

])
    });



     var AccInvNoDataStore = new Ext.data.Store({
        id: 'AccInvNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"AccInvNo"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctrail_inv_no','acctrail_inv_date'])
    });


  var LoadCollectionDetailsDataStore = new Ext.data.Store({
        id: 'LoadCollectionDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/RepReceivables/RepPaymentPerformance/ClsPaymentPerformance.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadCollectionDocumentList"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno', 'accref_vouno', 'accref_voudate', 'accref_paymode', 'accref_payref_no', 'accref_payref_date', 'acctrail_inv_value', 'refpartyinvno', 'refpartyinvdate', 'refpurchaseno', 'refamount', 'acctrail_crdays', 'cust_code', 'cust_ref' ,'noofdays','daysfromduedate' ])
    });


var LoadBalanceDueDataStore = new Ext.data.Store({
        id: 'LoadBalanceDueDataStore',
        proxy: new Ext.data.HttpProxy({
url: '/SHVPM/Accounts/RepReceivables/RepPaymentPerformance/ClsPaymentPerformance.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadBalanceDue"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctran_led_code', 'opdr', 'opcr', 'trn_opdr', 'trn_opcr', 'trn_dr', 'trn_cr', 'trn_sales' ])
    });


 var loadBillsCollectionDetailsDatastore = new Ext.data.Store({
        id: 'loadBillsCollectionDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_RepParty_Bills_Collection"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_vouno', 'accref_voudate', 'acctran_cramt', 'refpartyinvno', 'refpartyinvdate', 'refamount'])
    });





 var loadBillsDetailsDatastore = new Ext.data.Store({
        id: 'loadBillsDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_Bills_Details"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cust_ref', ,'accref_vouno','acctrail_led_code','accref_voudate', 'acctrail_inv_no','acctrail_inv_date', 'acctrail_inv_value', 'acctrail_adj_value', 'acctrail_crdays', 'duedate', 'oddays','acctrail_amtmode' ,'adjamt' ])
    });




var fields = [];
var columns = [];


store = new Ext.data.JsonStore({
    fields:fields,
    data:[]
});

    function loadData(){
        var grid = Ext.getCmp('columnGrid');
    
        // Clear existing data
        if(grid && grid.getStore()){
            grid.getStore().removeAll();
        }
    
    Ext.Ajax.request({
    
        url:'/SHVPM/ColumnData.php',
        method:'POST',
    
        params:{
            ledcode: ledcode,
            fromdate: Ext.util.Format.date(monthstartdate3.getValue(),"Y-m-d"),
            todate: Ext.util.Format.date(monthenddate3.getValue(),"Y-m-d"),
            millcode:compcode,
            fincode:finid
        },
    
        success:function(resp){
    
            var obj = Ext.decode(resp.responseText);
            var data = obj.data || [];
    
            if(data.length==0){
                Ext.Msg.alert('Info','No data found');
                return;
            }
    
            var fields=[{name:'__isTotal'}];   // IMPORTANT FIX
            var columns=[];
            var totals={};
    
            Ext.iterate(data[0],function(key,value){
    
                fields.push({name:key});
    
                var keyUpper = key.toUpperCase();
    
                var keyUpper = key.toUpperCase();
    
                var nonAmount =
                keyUpper.indexOf('UOM')!=-1 ||
                keyUpper.indexOf('NO')!=-1 ||
                keyUpper.indexOf('DATE')!=-1 ||
                keyUpper.indexOf('GSTIN')!=-1 ||
                keyUpper.indexOf('SEQ')!=-1;
    
                var numericValue =
                value!==null &&
                value!=='' &&
                !isNaN(value);
    
                var isAmount = numericValue && !nonAmount;
                columns.push({
    
    
                    header:keyUpper.replace(/_/g,' '),
                    dataIndex:key,
                    width:120,
                    //align:isAmount?'right':'left',
                    align:(isAmount || keyUpper.indexOf('CREDIT')!=-1)?'right':'left',
                    isAmount:isAmount,
                    hidden:(keyUpper=='ACCREF_SEQNO' || keyUpper=='ACCREF_VOU_TYPE'),
                    renderer:function(v){
    
                        if(v===null || v===''){
                            return '&nbsp;';
                        }
                        if(isAmount){

                            var num = parseFloat(v);
                
                            if(key.toUpperCase().indexOf('QTY')!=-1){
                
                                return new Intl.NumberFormat('en-IN',{
                                    minimumFractionDigits:3,
                                    maximumFractionDigits:3
                                }).format(num);
                
                            }else{
                
                                return new Intl.NumberFormat('en-IN',{
                                    minimumFractionDigits:2,
                                    maximumFractionDigits:2
                                }).format(num);
                
                            }
                        }                
                
                        return v;
    
                    }
    
                });
    
                if((isAmount && keyUpper.indexOf('RATE')==-1) || keyUpper.indexOf('CREDIT')!=-1){
                    totals[key]=0;
                }
    
            });
    
            /* CALCULATE TOTAL */
    
            Ext.each(data,function(row){
    
                Ext.iterate(totals,function(key){
    
                    var v=parseFloat(row[key]);
    
                    if(!isNaN(v)){
                        totals[key]+=v;
                    }
    
                });
    
            });
    
            /* CREATE TOTAL ROW */
    
            var totalRow={};
            var labelPlaced=false;
    
            Ext.each(columns,function(col){
    
                if(col.hidden){
                   return;
                }
    
                if(col.dataIndex=='Voucher_No'){
                   totalRow[col.dataIndex]='GRAND TOTAL';
                }
                else if(totals[col.dataIndex]!==undefined){
    
    
                var name = col.dataIndex.toUpperCase();
                if(name.indexOf('QTY')!=-1){
                    totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(3);
                }
                else{
                    totalRow[col.dataIndex]=totals[col.dataIndex].toFixed(2);
                }
    
                }
                else{
    
                    totalRow[col.dataIndex]='';
    
                }
    
            });
    
            totalRow['__isTotal']=true;
    
            data.push(totalRow);
    
            var newStore = new Ext.data.JsonStore({
                fields:fields,
                data:data
            });
    
            var grid = Ext.getCmp('columnGrid');
    
            grid.reconfigure(newStore,new Ext.grid.ColumnModel(columns));
    
            grid.getView().refresh();
    
        }
    
    });
    
    }
    
    
    var columnGrid = new Ext.grid.GridPanel({
    
    id:'columnGrid',
    store:store,
    colModel:new Ext.grid.ColumnModel([]), 
    x:20,
    y:80,
    width:1250,
    height:470,
    
    autoScroll:true,
    stripeRows:true,
    viewConfig:{
        getRowClass:function(record){
            if(record.get('__isTotal')===true){
                return 'grid-grand-total';
            }
        }
    },
    listeners:{
            rowdblclick:function(grid,rowIndex,e){
    
                var rec = grid.getStore().getAt(rowIndex);
    
                // Prevent action for GRAND TOTAL row
                if(rec.get('__isTotal') === true){
                    return;
                }
    
                var data = rec.data;
                var voucherno = data.Voucher_No;
    //            alert(voucherno);
                vouseqno = data.accref_seqno;
      //          alert(vouseqno);
                voutype = data.accref_vou_type;
    //            alert(voutype);
                cmbvoc.setValue(voucherno);
                cmbvoc.setRawValue(voucherno);
      
                VoucherClick();
                var tabPanel = Ext.getCmp('tabOverall');
                tabPanel.setActiveTab('tab3'); 
            }
        },

    tbar:[
    
        {
            text:'Export Excel',
            iconCls:'icon-excel',
            cls:'report-btn',
            scale:'medium',
            handler:function(){
                exportColumnGrid('excel','A4');
            }
        },
    
        '-',
 
        {
            text:'Export PDF',
            iconCls:'icon-pdf',
            cls:'report-btn',
            scale:'medium',
            handler:function(){
    
                Ext.Msg.show({
    
                    title:'Paper Size',
                    msg:'Select Paper Size',
    
                    buttons:{
                        ok:'A4',
                        yes:'LEGAL'
                    },
    
                    fn:function(btn){
    
                        var paper = (btn=='yes') ? 'LEGAL' : 'A4';
    
                        exportColumnGrid('pdf',paper);
    
                    }
    
                });
    
            }
        }
 
/*
        {
            text:'Export PDF',
            iconCls:'icon-pdf',
            handler:function(){
        
                new Ext.Window({
                    title:'Select Paper Size',
                    width:280,
                    height:130,
                    modal:true,
                    layout:'fit',
                    bodyStyle:'padding:15px;text-align:center;',
                    html:'Select Paper Size',
                    buttons:[
                        {
                            text:'A4',
                            handler:function(btn){
                                btn.ownerCt.ownerCt.close();
                                exportColumnGrid('pdf','A4');
                            }
                        },
                        {
                            text:'LEGAL',
                            handler:function(btn){
                                btn.ownerCt.ownerCt.close();
                                exportColumnGrid('pdf','LEGAL');
                            }
                        },
                        {
                            text:'A3',
                            handler:function(btn){
                                btn.ownerCt.ownerCt.close();
                                exportColumnGrid('pdf','A3');
                            }
                        }
                    ]
                }).show();
        
            }
                
        }
        */
    ]
    
    });
    
    
    function exportColumnGrid(type,paper){

    

    var millname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";

    var heading="COLUMNAR FOR LEDGER : "+txtAccountName.getRawValue() ;
    
    var fromdate=Ext.util.Format.date(monthstartdate3.getValue(),"d-m-Y");
    
    var todate=Ext.util.Format.date(monthenddate3.getValue(),"d-m-Y");        

    var grid = Ext.getCmp('columnGrid');
    
    var store = grid.getStore();
    
    var cm = grid.getColumnModel();
    
    var columns=[];
    var data=[];
    
    /* ===== GET VISIBLE COLUMNS ===== */
    
    for(var i=0;i<cm.getColumnCount();i++){
    
        if(!cm.isHidden(i)){
    
            var c=cm.getColumnAt(i);
    
            columns.push({
    
                header:c.header,
                dataIndex:c.dataIndex,
                align:c.align||'left'
    
            });
    
        }
    
    }
    
    /* ===== GET GRID DATA ===== */
    
    store.each(function(rec){
    
        data.push(rec.data);
    
    });
    
    /* ===== CREATE FORM ===== */
    
    var form=document.createElement("form");
    
    form.method="POST";
    
    form.action="/SHVPM/export_"+type+".php";
    
    if(type=='pdf'){
        form.setAttribute("target","_blank");
    }
    
    
    function addField(name,value){
    
        var input=document.createElement("input");
    
        input.type="hidden";
    
        input.name=name;
    
        input.value=value;
    
        form.appendChild(input);
    
    }
    
    addField("columns",Ext.encode(columns));
    addField("data",Ext.encode(data));
    addField("fname","columnar_report");
    addField("paper",paper||'A4');
    addField("millname",millname);
    addField("heading",heading);
    addField("fromdate",fromdate);
    addField("todate",todate);

    
    document.body.appendChild(form);
    
    form.submit();
    
    document.body.removeChild(form);
    
    }
    
    
    function exportColumnGrid(type,paper){

    

    var millname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";

    var heading="COLUMNAR FOR LEDGER : "+txtAccountName.getRawValue() ;
    
    var fromdate=Ext.util.Format.date(monthstartdate3.getValue(),"d-m-Y");
    
    var todate=Ext.util.Format.date(monthenddate3.getValue(),"d-m-Y");        

    var grid = Ext.getCmp('columnGrid');
    
    var store = grid.getStore();
    
    var cm = grid.getColumnModel();
    
    var columns=[];
    var data=[];
    
    /* ===== GET VISIBLE COLUMNS ===== */
    
    for(var i=0;i<cm.getColumnCount();i++){
    
        if(!cm.isHidden(i)){
    
            var c=cm.getColumnAt(i);
    
            columns.push({
    
                header:c.header,
                dataIndex:c.dataIndex,
                align:c.align||'left'
    
            });
    
        }
    
    }
    
    /* ===== GET GRID DATA ===== */
    
    store.each(function(rec){
    
        data.push(rec.data);
    
    });
    
    /* ===== CREATE FORM ===== */
    
    var form=document.createElement("form");
    
    form.method="POST";
    
    form.action="/SHVPM/export_"+type+".php";
    
    if(type=='pdf'){
        form.setAttribute("target","_blank");
    }
    
    
    function addField(name,value){
    
        var input=document.createElement("input");
    
        input.type="hidden";
    
        input.name=name;
    
        input.value=value;
    
        form.appendChild(input);
    
    }
    
    addField("columns",Ext.encode(columns));
    addField("data",Ext.encode(data));
    addField("fname","columnar_report");
    addField("paper",paper||'A4');
    addField("millname",millname);
    addField("heading",heading);
    addField("fromdate",fromdate);
    addField("todate",todate);

    
    document.body.appendChild(form);
    
    form.submit();
    
    document.body.removeChild(form);
    
    }
    
        
    function exportColumnGrid2(type,paper){

    

        var millname="SRI HARI VENKATESWARA PAPER MILLS (P) LTD";
    
        var heading="LEDGER : "+txtAccountName.getRawValue() ;
        
        var fromdate=Ext.util.Format.date(monthstartdate3.getValue(),"d-m-Y");
        
        var todate=Ext.util.Format.date(monthenddate3.getValue(),"d-m-Y");        
    
        var grid = Ext.getCmp('my-grid2');
        
        var store = grid.getStore();
        
        var cm = grid.getColumnModel();
        
        var columns=[];
        var data=[];
        
        /* ===== GET VISIBLE COLUMNS ===== */
        
        for(var i=0;i<cm.getColumnCount();i++){
        
            if(!cm.isHidden(i)){
        
                var c=cm.getColumnAt(i);
        
                columns.push({
        
                    header:c.header,
                    dataIndex:c.dataIndex,
                    align:c.align||'left'
        
                });
        
            }
        
        }
        
        /* ===== GET GRID DATA ===== */
        
        store.each(function(rec){
        
            data.push(rec.data);
        
        });
        
        /* ===== CREATE FORM ===== */
        
        var form=document.createElement("form");
        
        form.method="POST";
        
        form.action="/SHVPM/export_"+type+".php";
        
        if(type=='pdf'){
            form.setAttribute("target","_blank");
        }
        
        
        function addField(name,value){
        
            var input=document.createElement("input");
        
            input.type="hidden";
        
            input.name=name;
        
            input.value=value;
        
            form.appendChild(input);
        
        }
        
        addField("columns",Ext.encode(columns));
        addField("data",Ext.encode(data));
        addField("fname","columnar_report");
        addField("paper",paper||'A4');
        addField("millname",millname);
        addField("heading",heading);
        addField("fromdate",fromdate);
        addField("todate",todate);
    
        
        document.body.appendChild(form);
        
        form.submit();
        
        document.body.removeChild(form);
        
        }
        
        
var repopt ='All Outstanding';
var optRepOpt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optRepOpt',
        items: [
		{boxLabel: 'All Outstanding', name: 'optRepOpt', id:'optAllDue', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    repopt ='All Outstanding';
                                            alldueoption = 1;
                                            ProcessPartyBillsData();
					}
				}
			}
		},
		{boxLabel: 'Over Due Bills Oustanding', name: 'optRepOpt', id:'optOverDue', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
                                          repopt ='Over Due Bills Oustanding';
                                          alldueoption = 0;
                                          ProcessPartyBillsData();

					}
				}
			}
		},
            
        ],
    }



    ]
});




   var txttotCollection = new Ext.form.NumberField({
        fieldLabel  : 'Total Collections',
        id          : 'txttotCollection',
        name        : 'txttotCollection',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 0,
    });




   var txtTotalDebitAmount = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit Amount',
        id          : 'txtTotalDebitAmount',
        name        : 'txtTotalDebitAmount',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotalCreditAmount = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit Amount',
        id          : 'txtTotalCreditAmount',
        name        : 'txtTotalCreditAmount',
        width       :  140,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotalBalAmt = new Ext.form.NumberField({
	fieldLabel  : 'Total Bal Amount',
	id          : 'txtTotalBalAmt',
	name        : 'txtTotalBalAmt',
	width       :  140,
	readOnly : true,
	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	style : "font-size:14px;font-weight:bold",
	decimalPrecision: 2,
    });



   var txtTotalBalAmt2 = new Ext.form.NumberField({
	fieldLabel  : 'Total Bal Amount',
	id          : 'txtTotalBalAmt2',
	name        : 'txtTotalBalAmt2',
	width       :  140,
	readOnly : true,
	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	style : "font-size:14px;font-weight:bold",
	decimalPrecision: 2,
    });


  var AdjustmentDetailsDataStore = new Ext.data.Store({
        id: 'AdjustmentDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"AdjNoClick"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'ref_slno', 'ref_docseqno', 'ref_docno', 'ref_docdate', 'ref_adjseqno', 'ref_adjvouno', 'ref_invno', 'ref_invdate', 'ref_adjamount', 'ref_paymt_terms', 'ref_adj_days', 'ref_adj_by', 'ref_adjusted_on', 'ref_ledcode', 'ref_adjvoutype','adjdate','voudate'
        ])
    });




    
    var btnLedgerPrintNew = new Ext.Button({
        text: "Ledger Print",
        width: 100,
        id: 'btnLedgerPrintNew',
        border: 1,
        style: {
            borderColor: 'blue',
            borderStyle: 'solid'
        },        
        listeners: {
            click: function () {
        
                var win = new Ext.Window({
                    title: 'Ledger Print Options',
                    width: 320,
                    height: 180,
                    modal: true,
                    resizable: false,
                    layout: 'fit',
        
                    items: [{
                        xtype: 'form',
                        bodyStyle: 'padding:10px',
                        labelWidth: 10,
                        items: [
                            {
                                xtype: 'checkbox',
                                boxLabel: '<b style="color:blue;">With Narration</b>',
                                id: 'chkWithNarrationWin',
                                checked: true
                            },
                            {
                                xtype: 'checkbox',
                                boxLabel: '<b style="color:blue;">With Bill Adjustments</b>',
                                id: 'chkWithBillAdjWin',
                                checked: true
                            },

                            
                        ]
                    }],
        
                    buttons: [
                        {
                            text: 'Print',
                            handler: function () {
        
                                var withRemakrs   = Ext.getCmp('chkWithNarrationWin').getValue() ? 'Y' : 'N';
                                var withBillAdj   = Ext.getCmp('chkWithBillAdjWin').getValue() ? 'Y' : 'N';
        
                                var emailpdf = 'Y';   
                                var p1 = "&ledcode=" + encodeURIComponent(ledcode);
                                var p2 = "&compcode=" + encodeURIComponent(compcode);
                                var p3 = "&finid=" + encodeURIComponent(finid);
                                var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(), "Y-m-d"));
                                var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(), "Y-m-d"));
                                var p6 = "&ledname=" + encodeURIComponent(txtAccountName.getRawValue());
                                var p7 = "&ledtype=" + encodeURIComponent(ledtype);
                                var p8 = "&withNarration=" + withRemakrs;
                                var p9 = "&withBillAdjustment=" + withBillAdj;
                                var p10 = "&EMailpdf=" + emailpdf;
                                var param = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9+p10;

                                if (printtype == "PDF") {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign&__format=pdf' + param, '_blank');                                    
                                } else if (printtype == "XLS") {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign&__format=XLS' + param, '_blank');
                                } else {
                                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedgerWithAdjustments.rptdesign' + param, '_blank');
                                }
        
                                win.close();
                            }
                        },
                        {
                            text: 'SEND EMAIL',
                            handler: function () {
                        
                                loadAddressDatastore.removeAll();
                        
                                loadAddressDatastore.load({
                                    url: 'ClsViewStatements.php',
                                    params: {
                                        task: 'find_Address',
                                        ledcode: ledcode
                                    },
                                    scope: this,
                        
                                    callback: function () {
                        
                                        if (loadAddressDatastore.getCount() == 0) {
                                            Ext.Msg.alert('Error', 'Customer details not found');
                                            return;
                                        }
                        
                                        var rec = loadAddressDatastore.getAt(0);
                        
                                        var custemail = rec.get('cust_email') || '';
                        
                                        // ✅ EMAIL CONFIRM WINDOW
                                        var emailWin = new Ext.Window({
                                            title: 'Confirm Email',
                                            width: 350,
                                            height: 150,
                                            modal: true,
                                            layout: 'fit',
                        
                                            items: [{
                                                xtype: 'form',
                                                bodyStyle: 'padding:10px',
                        
                                                items: [{
                                                    xtype: 'textfield',
                                                    fieldLabel: 'Email ID',
                                                    id: 'txtConfirmEmail',
                                                    value: custemail,
                                                    width: 220,
                                                    allowBlank: false
                                                }]
                                            }],
                        
                                            buttons: [
                                                {
                                                    text: 'OK',
                                                    handler: function (btn) {
                                                        btn.setDisabled(true);
                                                        var email = Ext.getCmp('txtConfirmEmail').getValue();
                        
                                                        if (!email) {
                                                            Ext.Msg.alert('Error', 'Please enter email');
                                                            return;
                                                        }
                        
                                                        // ✅ PARAMETERS
                                                        var withRemakrs = Ext.getCmp('chkWithNarrationWin').getValue() ? 'Y' : 'N';
                                                        var withBillAdj = Ext.getCmp('chkWithBillAdjWin').getValue() ? 'Y' : 'N';
                        
                                                        // ✅ CALL PHP (SEND EMAIL)
                                                        Ext.Ajax.request({
                                                            url: 'TrnLedgerEmailPDF.php',
                                                            method: 'POST',
                        
                                                            params: {
                                                                ledcode: ledcode,
                                                                compcode: compcode,
                                                                finid: finid,
                                                                fromdate: Ext.util.Format.date(monthstartdate.getValue(), "Y-m-d"),
                                                                todate: Ext.util.Format.date(monthenddate.getValue(), "Y-m-d"),
                                                                ledname: txtAccountName.getRawValue(),
                                                                ledtype: ledtype,
                                                                withNarration: withRemakrs,
                                                                withBillAdjustment: withBillAdj,
                        
                                                                idemail: email,
                                                                mailmessage: 'Please find attached Ledger Report'
                                                            },
                        
                                                            success: function () {
                                                                Ext.Msg.alert('Success', 'Email Sent Successfully');
                                                                emailWin.close();
                                                            },
                                                            failure: function () {
                                                                Ext.getBody().unmask();
                                                                Ext.Msg.alert('Error', 'Email Sending Failed');
                                                
                                                                // 🔴 Enable again only on failure
                                                                btn.setDisabled(false);
                                                            }
                                                        });
                                                    }
                                                },
                                                {
                                                    text: 'Cancel',
                                                    handler: function () {
                                                        emailWin.close();
                                                    }
                                                }
                                            ]
                                        });
                        
                                        emailWin.show();
                                    }
                                });
                            }
                        },                      
                        {
                            text: 'Cancel',
                            handler: function () {
                                win.close();
                            }
                        }
                    ]
                });
        
                win.show();
            }
        }
    });

    var btnLedgerPrint = new Ext.Button({
        text: "Ledger Print",
        width: 100,
        id: 'btnLedgerPrint',
        border: 1,
        style: {
            borderColor: 'blue',
            borderStyle: 'solid'
        },
        listeners: {
            click: function () {
    
                Ext.Msg.confirm('Confirmation', 'Print with Narration?', function (btn) {
    
                    var withNarration = (btn === 'yes') ? 'Y' : 'N';
    
                    var p1 = "&ledcode=" + encodeURIComponent(ledcode);                
                    var p2 = "&compcode=" + encodeURIComponent(compcode);      
                    var p3 = "&finid=" + encodeURIComponent(finid);
                    var p4 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(), "Y-m-d"));	
                    var p5 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(), "Y-m-d"));
                    var p6 = "&ledname=" + encodeURIComponent(txtAccountName.getRawValue());
                    var p7 = "&ledtype=" + encodeURIComponent(ledtype);
                    var p8 = "&withnarration=" + withNarration;   // <-- NEW PARAM
    
                    var param = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8;
    
                    if (printtype == "PDF") {
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=pdf' + param, '_blank');
                    } else if (printtype == "XLS") {
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign&__format=XLS' + param, '_blank');
                    } else {
                        window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepLedger.rptdesign' + param, '_blank');
                    }
    
                });
            }
        }
    });   
    
    

/*

    var btnColumnPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Columnar",
        width: 60,
        id: 'btnColumnPrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


		    var p1 = "&compcode="+encodeURIComponent(compcode);      
		    var p2 = "&finid=" + encodeURIComponent(finid);

	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p5 = "&ledcode="+encodeURIComponent(ledcode);                
		    var p6 = "&ledname="+encodeURIComponent(txtAccountName.getRawValue());
 		    var param = (p1+p2+p3+p4+p5+p6) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Column.rptdesign'+ param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Column.rptdesign'+ param , '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_Column.rptdesign'+ param , '_blank');


                }
            }
    });

*/
  
    var btnColumnSelect = new Ext.Button({
        style: 'text-align:center;',
        text: " Columnar",
        width: 60,
        id: 'btnColumnSelect',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {

            click: function () {
                    
                var tabPanel = Ext.getCmp('tabOverall');

                tabPanel.unhideTabStripItem(6)
                var tab = tabPanel.getComponent('ColumnAr');
                tabPanel.setActiveTab(tab);
                tab.setTitle('COLUMNAR Report For : - ' + SubLedgerName);

                lblLedgerName.setText("Details for : " + SubLedgerName);
                loadData();
                }
            }
    });

    var DateFind = new Ext.form.DateField({
	fieldLabel: '',
        id: 'DateFind',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   
    });


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate',
	    format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date(),
        listeners: {
            blur: function () 
            {
                Process_Month_Ledger_Data();
            },
            change: function ()  
            {
                Process_Month_Ledger_Data();
            },
            keyup: function ()  
            {
                Process_Month_Ledger_Data();
            },
        }
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	    format: 'd-m-Y',
        value: new Date(),   
        listeners: {
            blur: function () 
            {
                Process_Month_Ledger_Data();
            },
            change: function ()  
            {
                Process_Month_Ledger_Data();
            },
            keyup: function ()  
            {
                Process_Month_Ledger_Data();
            },
        }
    });

    var monthstartdate2 = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate2',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   ,
        readOnly : true,
    });
    var monthenddate2 = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate2',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });
    var monthstartdate3 = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate3',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   

    });

    var monthenddate3 = new Ext.form.DateField({
        fieldLabel: 'To Date',
            id: 'monthenddate3',
            labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
            format: 'd-m-Y',
            value: new Date()  ,
            enableKeyEvents: true,
            listeners:{
                 specialkey:function(f,e){
                 if (e.getKey() == e.ENTER)
                 {
                    loadData();
                  }
                },
               blur:function(){
                  loadData();
               },
            }        
        });  


    var monthstartdate4 = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthstartdate4',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()   

    });
    var monthenddate4 = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate4',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date()   
    });


  var txtOpening_Debit = new Ext.form.NumberField({
        fieldLabel  : 'Opening(Db)',
        id          : 'txtOpening_Debit',
        name        : 'txtOpening_Debit',
        width       :  120,
	    readOnly : true,
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        disabled    : true,  
//        style : "font-size:14px;font-weight:bold;text-align: 'right';",
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtOpening_Credit = new Ext.form.NumberField({
        fieldLabel  : 'Opening(Cr)',
        id          : 'txtOpening_Credit',
        name        : 'txtOpening_Credit',
        width       :  120,
	readOnly : true,
    disabled    : true,  
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txtClosing_Debit = new Ext.form.NumberField({
        fieldLabel  : 'Closing(Db)',
        id          : 'txtClosing_Debit',
        name        : 'txtClosing_Debit',
        width       :  120,
	readOnly : true,
    disabled    : true,  
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtClosing_Credit = new Ext.form.NumberField({
        fieldLabel  : 'Closing(Cr)',
        id          : 'txtClosing_Credit',
        name        : 'txtClosing_Credit',
        width       :  120,
	readOnly : true,
    disabled    : true,  
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txtLedgerDebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtLedgerDebit',
        name        : 'txtLedgerDebit',
        width       :  120,
	readOnly : true,
    disabled    : true,  
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtLedgerCredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtLedgerCredit',
        name        : 'txtLedgerCredit',
        width       :  120,
	     readOnly : true,
         disabled    : true,  
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


    var dgrecord = Ext.data.Record.create([]);
    var flxDetailsPayment = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
 //   id: 'my-grid-font', 
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 400,
        width: 720,
        border:false,

        enableKeyEvents: true,
        columns: [
            {header: "Date of Bill", dataIndex: 'refpartyinvdate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,             },
            {header: "Invoice No.", dataIndex: 'refpartyinvno',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,
		renderer : function(value, meta ,record) {
		    var vou=record.get('refpartyinvno');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "Invoice Amt.", dataIndex: 'acctran_totamt',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false, },
            {header: "Receipt Date", dataIndex: 'accref_voudate',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'},
            {header: "Receipt Amt.", dataIndex: 'refamount',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'},

            {header: "Paymt Terms", dataIndex: 'acctrail_crdays',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,},
            {header: "No of Days", dataIndex: 'noofdays',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,},

            {header: "No of Days fr Duedate", dataIndex: 'daysfromduedate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,},
         ],
         listeners :{


            'rowDblClick' : function(flxDetailsPayment,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);
                var selerow =flxDetailsPayment.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },'cellclick': function (flxDetailsPayment, rowIndex, cellIndex, e) {
                 var selected_rows =flxDetailsPayment.getSelectionModel().getSelections();
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.accref_vouno;
		         }
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
                                     }
                                }
                            });
	   },
            'rowselect' : function(flxDetailsPayment,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =flxDetailsPayment.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('accref_vouno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

        }
    });


    var txtClosing = new Ext.form.NumberField({
        fieldLabel  : 'Closing Balance',
        id          : 'txtClosing',
        name        : 'txtClosing',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txtSales = new Ext.form.NumberField({
        fieldLabel  : 'Total Sales',
        id          : 'txtSales',
        name        : 'txtSales',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtAvg_NoofDays = new Ext.form.NumberField({
        fieldLabel  : 'Average No. of Days',
        id          : 'txtAvg_NoofDays',
        name        : 'txtAvg_NoofDays',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtAvg_NoofDays_Duedate = new Ext.form.NumberField({
        fieldLabel  : 'Average No.of Days from Due Date',
        id          : 'txtAvg_NoofDays_Duedate',
        name        : 'txtAvg_NoofDays_Duedate',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#000099",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var btnViewPayment = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnViewPayment',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate4.getValue(),"Y-m-  d"));	
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate4.getValue(),"Y-m-d"));
                    var p4 = "&ledcode=" + encodeURIComponent(ledcode);
                    var p5 = "&closing=" + encodeURIComponent(txtClosing.getValue());
                    var p6 = "&salesamount=" + encodeURIComponent(txtSales.getValue());

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPaymentPerformance.rptdesign&__format=pdf&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPaymentPerformance.rptdesign' + param, '_blank');	



	    }
	}
	});

var tabPerf = new Ext.TabPanel({
    id          : 'tabPerf',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 420,
    width       : 750,	
    x           : 470,
    y           : 65,
    items       : [
           {
             xtype: 'panel',
             title: ' DETAILS',bodyStyle:{"background-color":"#ebebdf"},
             layout: 'absolute',
             items: [
		    {xtype: 'fieldset',
		        title: '',
		        width: 900,
		        height: 400,
		        x: 10,
		        y: 0,
		        border: false,
		        style: 'padding:0px',
		        items: [flxDetailsPayment]
		     }, 
             ]
           }
     ]
 });           





var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


					}
				}
			}
		},
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});



 var loadSearchLedgerListDatastore = new Ext.data.Store({
      id: 'loadSearchLedgerListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchLedgerlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'cust_code', 'cust_ref','cust_type'
      ]),
    });

function LedgerSearch()
{

        loadSearchLedgerListDatastore.removeAll();
        loadSearchLedgerListDatastore.load({
		url: 'ClsViewStatements.php',
		params:
		{
			task:"loadSearchLedgerlist",
			ledger : txtAccountName.getRawValue(),
		},
        });
}

function LedgerChangeRefresh()
{
	txtob.setRawValue('0.00');
	txtcb.setRawValue('0.00');
	txttotdebit.setRawValue('0.00');
	txttotcredit.setRawValue('0.00');

        txttotAjusted2.setRawValue('');
        txtVoucherAmount2.setRawValue('');
        txtBalanceAmount2.setRawValue('');

        txttotAjusted.setRawValue('');
        txtVoucherAmount.setRawValue('');
        txtBalanceAmount.setRawValue('');

        txtOpening_Debit.setValue(0);
        txtOpening_Credit.setValue(0);
        txtClosing_Debit.setValue(0);
        txtClosing_Credit.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);

        txtTotalDebitAmount.setValue(0);
        txtTotalCreditAmount.setValue(0);
        txtTotalBalAmt.setValue(0);
        txtTotalBalAmt2.setValue(0);
        txttotdebit2.setValue(0);
        txttotcredit2.setValue(0);
        txtLtotdebit.setValue(0);
        txtLtotcredit.setValue(0);

}



    var flxCollections = new Ext.grid.EditorGridPanel({
        frame: true,
        store: [],
	id:'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
        menuDisabled: false,
	stripeRows: true,
	style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 400,
        width: 950,
        border:false,
  
        columns: [
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:100,align:'center', menuDisabled: false},
        {header: "Vou No" , dataIndex: 'accref_vouno',sortable:false,width:100,align:'center', menuDisabled: false,
},
        {header: "Collection Amount" , dataIndex: 'acctran_cramt',sortable:false,width:150,align:'right', menuDisabled: false},
        {header: "Inv. No"  , dataIndex: 'refpartyinvno',sortable:false,width:130,align:'right', menuDisabled: false},
        {header: "Inv.Date"    , dataIndex: 'refpartyinvdate',sortable:false,width:130,align:'right', menuDisabled: false},
        {header: "Adjusted"   , dataIndex: 'refamount',sortable:false,width:100,align:'right', menuDisabled: false,
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },
        {header: "Advance "   , dataIndex: 'advance',sortable:false,width:80,align:'right', menuDisabled: false,
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },

        ]  

    });





    function ProcessPartyCollectionData()
    {


        flxCollections.getStore().removeAll();
	loadBillsCollectionDetailsDatastore.removeAll();
	loadBillsCollectionDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task      : 'load_RepParty_Bills_Collection',
                compcode  : compcode,
                finid     : finid,
                startdate : Ext.util.Format.date(monthstartdate3.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate3.getValue(),"Y-m-d"), 
                custcode  : ledcode,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadBillsCollectionDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                     for(var j=0; j<cnt; j++)
 	             { 

//alert(loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_inv_date'));
  //                     balamt = loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_inv_value')-loadBillsCollectionDetailsDatastore.getAt(j).get('acctrail_adj_value');
                       flxCollections.getStore().insert(
                       flxCollections.getStore().getCount(),
                       new dgrecord({

                           accref_voudate  : Ext.util.Format.date(loadBillsCollectionDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
			   accref_vouno : loadBillsCollectionDetailsDatastore.getAt(j).get('accref_vouno'),
 	                   acctran_cramt : loadBillsCollectionDetailsDatastore.getAt(j).get('acctran_cramt'),
 			   refpartyinvno  : loadBillsCollectionDetailsDatastore.getAt(j).get('refpartyinvno'),
                           refpartyinvdate  : Ext.util.Format.date(loadBillsCollectionDetailsDatastore.getAt(j).get('refpartyinvdate'),"d-m-Y"),
                           refamount : loadBillsCollectionDetailsDatastore.getAt(j).get('refamount'),
	

                        })
                       );
                    }   
                   } 
                   grid_tot4();  

 
                   


                }         
	  });

        var m1 = 0;
       
    }


   var flxLedger = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        x: 10,
        y: 100,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Led Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:450,align:'left'},
		{header: "", dataIndex: 'cust_type',sortable:true,width:0,align:'left'},
        ],
        store:loadSearchLedgerListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('cust_code'));
			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('cust_code');
				custcode = selrow.get('cust_code');
				ledtype  = selrow.get('cust_type');
                suptype  = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_ref'));   
                                SubLedgerName = selrow.get('cust_ref');   

//alert(SubLedgerName);                                
                                flxLedger.hide();   

                                if (ledtype == "C")
                                {
                                   flxBillsDetails.getColumnModel().setHidden(0, true);
                                   flxBillsDetails.getColumnModel().setHidden(1, true);
                                }           
                                else
                                {
                                   flxBillsDetails.getColumnModel().setHidden(0, false);
                                   flxBillsDetails.getColumnModel().setHidden(1, false);
                                }           


                                lblParty1.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty2.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty3.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty4.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty5.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty6.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty7.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty8.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty9.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty10.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty11.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty12.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty13.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty14.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty15.setText("Report For "+ selrow.get('cust_ref'));

		                grpcodetds = 0;
                                LedgerChangeRefresh();
          		        LedgerClick(); 
                                ProcessPartyBillsData();
                                ProcessPartyCollectionData();
                                ProcessPaymentPerformance();

			}
                        }
                     });
             },

        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
			var sm = flxLedger.getSelectionModel();
			var selrow = sm.getSelected();

			var chkitem = (selrow.get('cust_code'));

			if ((selrow != null)){

				gridedit = "true";
				editrow  = selrow;
				ledcode  = selrow.get('cust_code');
				custcode = selrow.get('cust_code');
				ledtype    = selrow.get('cust_type');
                                txtAccountName.setRawValue(selrow.get('cust_ref'));  

                                lblParty1.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty2.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty3.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty4.setText("Report For "+ selrow.get('cust_ref'));
                                lblParty5.setText("Report For "+ selrow.get('cust_ref'));
 
                                flxLedger.hide();
                                LedgerChangeRefresh();
          		        LedgerClick(); 
                                ProcessPartyBillsData();
                                ProcessPartyCollectionData();
                                ProcessPaymentPerformance();
		        grpcodetds = 0;
			}
		}
 
    
   }
   });



   var flxAdjustments = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
	//id:'my-grid3',
        width: 600,
        height: 250,
    	labelStyle :"font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Inv/Doc No.", dataIndex: 'ref_invno',width:130,align:'left'},   
		{header: "Date", dataIndex: 'voudate',width:100,align:'left'},   
		{header: "Pay.Terms", dataIndex: 'ref_paymt_terms',width:90,align:'center'},   
		{header: "Adj. Amount", dataIndex: 'ref_adjamount',width:120,align:'right',
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },   
		{header: "Adj. Days", dataIndex: 'ref_adj_days',width:90,align:'center'},   
        ],
        store:[],
        listeners:{	
        }    
});

   var flxAdjustments2 = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
	id:'my-grid3',
        width: 600,
        height: 250,
    	labelStyle :"font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Inv/Doc No.", dataIndex: 'ref_invno',width:120,align:'left'},   
		{header: "Date", dataIndex: 'voudate',width:110,align:'left'},   
		{header: "Pay.Terms", dataIndex: 'ref_paymt_terms',width:90,align:'center'},   
		{header: "Adj. Amount", dataIndex: 'ref_adjamount',width:120,align:'right',
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },   
		{header: "Adj. Days", dataIndex: 'ref_adj_days',width:90,align:'center'},   
        ],
        store:[],
        listeners:{	
        }    
});



    var btnAllVoucherPrint = new Ext.Button({
        style: 'text-align:center;',
        text: "All Outstanding Print",
        width: 150,
        id: 'Print',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

            if (ledtype == 'C')
            { 

		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	 var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(ledcode);
		    var p5 = "&allopt="+encodeURIComponent(1);
  		    var p6 = "&ledname="+encodeURIComponent(txtAccountName.getRawValue());     
	            var p7 = "&grpcode="+encodeURIComponent(0);


            var p8 = "&dueopt="+encodeURIComponent(due_option);
            var param = (p1+p2+p3+p4+p5+p6+p7+p8) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign&__format=pdf&' + param, '_blank');

                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign&__format=XLS&' + param, '_blank');
        
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign' + param, '_blank');	
             }
            if (ledtype == 'S')
            { 

		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(ledcode);
		    var p5 = "&allopt="+encodeURIComponent('P');
  		    var p6 = "&ledname="+encodeURIComponent(txtAccountName.getRawValue());     

       		    var p7 = "&days1="+encodeURIComponent(0);
       		    var p8 = "&days2="+encodeURIComponent(0);
       		    var p9 = "&days3="+encodeURIComponent(0);
       		    var p10 = "&days4="+encodeURIComponent(0);
                   var p11 = "&drcropt=" + encodeURIComponent('A');

                   var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign' + param, '_blank');
            } 

            }
            }

    });



    var btnOnlyBillsPrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Bills Outstanding Print",
        width: 150,
        id: 'btnOnlyBillsPrint ',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {


            if (ledtype == 'C')
            { 
		    var due_option = 0;    
		    if (repopt =='All Outstanding')
		       due_option = 1;

		    var p1 ="&compcode="+encodeURIComponent(compcode);      
		  var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"));	   
		    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(ledcode);	
		    var p5 = "&allopt="+encodeURIComponent(due_option);
	  	    var p6 = "&ledname="+encodeURIComponent(txtAccountName.getRawValue());     
		    var p7 = "&grpcode="+encodeURIComponent(0);
		    var p8 = "&dueopt="+encodeURIComponent('PT');
		    var param = (p1+p2+p3+p4+p5+p6+p7+p8) ;


         //   alert(param)
		    if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign&__format=pdf&' + param, '_blank');
		    else if (printtype == "XLS") 
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign&__format=xls&' + param, '_blank');
		    else
			    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepARBillwiseDue.rptdesign' + param, '_blank');

	     }
            if (ledtype == 'S')
            { 
		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(ledcode);
		    var p5 = "&allopt="+encodeURIComponent('P');
        	    var p6 = "&ledname="+encodeURIComponent(txtAccountName.getRawValue());


       		    var p7 = "&days1="+encodeURIComponent(0);
       		    var p8 = "&days2="+encodeURIComponent(0);
       		    var p9 = "&days3="+encodeURIComponent(0);
       		    var p10 = "&days4="+encodeURIComponent(0);
                var p11 = "&drcropt=" + encodeURIComponent('A');
                var param = (p1+p2+p3+p4+p5+p6+p7+p8+p9+p10+p11);

                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepAPBillwiseDue.rptdesign' + param, '_blank');
            }

          }


            }

    });

function myFunction() {
    window.print();
}

 /*  var yearchangeDataStore = new Ext.data.Store({
      id: 'yearchangeDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/Modules/UserLogin.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "YEARFIN"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_id', type: 'int', mapping: 'fin_id'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_id', direction: "DESC"}
    });*/

  function LedgerClick(){
	
	

                flxAdjustments.getStore().removeAll();
                flxDetails.getStore().removeAll();
                flxld.getStore().removeAll();
                flxLedger.getStore().removeAll();
                flxMonth.getStore().removeAll();
		LedgerClickLoadDataStore.removeAll();
		LedgerClickLoad2DataStore.removeAll();
		lblCrDr.setText("");
		fst_dbcr='';
		monthtype='';
		flagtypenw='';
                flxMonth.getStore().removeAll();
                 LedgerClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledname:ledcode
                    },
                    callback:function(){

                        var cnt=LedgerClickLoadDataStore.getCount();

			        fst_dbcr="DR";
                        if(cnt>0) { 

                            curbal_obcramt=0;
                            curbal_obdbamt=0;
                            ledcode=LedgerClickLoadDataStore.getAt(0).get('curbal_led_code');
                            curbal_obcramt=LedgerClickLoadDataStore.getAt(0).get('curbal_obcramt');
                            curbal_obdbamt=LedgerClickLoadDataStore.getAt(0).get('curbal_obdbamt');
                            if(curbal_obcramt>0){
                                curbal_obcramt=LedgerClickLoadDataStore.getAt(0).get('curbal_obcramt');
                                txtob.setRawValue(curbal_obcramt);
                                fst_dbcr="CR";
                                lblCrDr.setText(fst_dbcr);
                            }else if(curbal_obdbamt>0){
                                curbal_obdbamt=LedgerClickLoadDataStore.getAt(0).get('curbal_obdbamt');
                                txtob.setRawValue(curbal_obdbamt);
                                fst_dbcr="DR";
                                lblCrDr.setText(fst_dbcr);
                            }else{
                                txtob.setRawValue("0");
				fst_dbcr="CR";
				lblCrDr.setText(fst_dbcr);
                            }
                } 
                txttotdebit.setValue("0");
                txttotcredit.setValue("0");
//load start
		 LedgerClickLoad2DataStore.removeAll();
                 LedgerClickLoad2DataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'LedgerClickLoad2',
                        fcompcode:compcode,
                        ffinid:finid,
                        ledcod:ledcode
                    },
                    callback:function(){
                        var cnt=LedgerClickLoad2DataStore.getCount();
//alert(cnt);
// if start			
                        if(cnt>0){
                          fvr_opbal=txtob.getRawValue();
                          var debit=LedgerClickLoad2DataStore.getAt(0).get('debit');
                          var credit=LedgerClickLoad2DataStore.getAt(0).get('credit');
                          var month=0;
			  month=LedgerClickLoad2DataStore.getAt(0).get('month');


//for loop start
                          for(var i=0;i<cnt;i++){
                          debit=LedgerClickLoad2DataStore.getAt(i).get('debit');
                          credit=LedgerClickLoad2DataStore.getAt(i).get('credit');
                          month=LedgerClickLoad2DataStore.getAt(i).get('month');
                          if(month=="1"){
                              monthtype="JANUARY";
                          }else if(month=="2"){
                              monthtype="FEBRUARY";
                          }else if(month=="3"){
                              monthtype="MARCH";
                          }else if(month=="4"){
                              monthtype="APRIL";
                          }else if(month=="5"){
                              monthtype="MAY";
                          }else if(month=="6"){
                              monthtype="JUNE";
                          }else if(month=="7"){
                              monthtype="JULY";
                          }else if(month=="8"){
                              monthtype="AUGUST";
                          }else if(month=="9"){
                              monthtype="SEPTEMBER";
                          }else if(month=="10"){
                              monthtype="OCTOBER";
                          }else if(month=="11"){
                              monthtype="NOVEMBER";
                          }else if(month=="12"){
                              monthtype="DECEMBER";
                          }


                           var balm;
			   flagtypenw='';
                           if(fst_dbcr=="DR"){
                           if(i==0){

                              balm=((Number(fvr_opbal)+Number(debit))-Number(credit));

                              var new1=balm;
			     if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==1){
                              balm=((Number(new1)+Number(debit))-Number(credit));

                               var new2=balm;
			      if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==2){
                              balm=((Number(new2)+Number(debit))-Number(credit));
                               var new3=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==3){
                              balm=((Number(new3)+Number(debit))-Number(credit));
                               var new4=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==4){
                              balm=((Number(new4)+Number(debit))-Number(credit));

                               var new5=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==5){
                              balm=((Number(new5)+Number(debit))-Number(credit));

                              var new6=balm;
                             if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==6){
                              balm=((Number(new6)+Number(debit))-Number(credit));
                               var new7=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==7){
                              balm=((Number(new7)+Number(debit))-Number(credit));
                               var new8=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==8){
                              balm=((Number(new8)+Number(debit))-Number(credit));
                               var new9=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==9){
                              balm=((Number(new9)+Number(debit))-Number(credit));
                               var new10=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==10){
                              balm=((Number(new10)+Number(debit))-Number(credit));
                               var new11=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
                                if(Number(balm) < 0)
                                  flagtypenw='CR';
                                else
                                  flagtypenw='';

			     }
                          }if(i==11){
                              balm=((Number(new11)+Number(debit))-Number(credit));

                              var new12=balm;
				if(Number(balm)>0){
				flagtypenw='DR';
			      }else{
                                if(Number(balm) < 0)
                                  flagtypenw='CR';
                                else
                                  flagtypenw='';

			     }
                          }
                           } else if(fst_dbcr=="CR"){
			   flagtypenw='';	
                           if(i==0){
                              balm=((Number(fvr_opbal)-Number(debit))+Number(credit));

                               new1=balm;
 			     if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==1){
                              balm=((Number(new1)-Number(debit))+Number(credit));
                               new2=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==2){
                              balm=((Number(new2)-Number(debit))+Number(credit));
                                new3=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==3){
                              balm=((Number(new3)-Number(debit))+Number(credit));
                               new4=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==4){
                              balm=((Number(new4)-Number(debit))+Number(credit));
                               new5=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==5){
                              balm=((Number(new5)-Number(debit))+Number(credit));
                               new6=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==6){
                              balm=((Number(new6)-Number(debit))+Number(credit));
                               new7=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==7){
                              balm=((Number(new7)-Number(debit))+Number(credit));
                               new8=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==8){
                              balm=((Number(new8)-Number(debit))+Number(credit));
                               new9=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==9){
                              balm=((Number(new9)-Number(debit))+Number(credit));
                               new10=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==10){
                              balm=((Number(new10)-Number(debit))+Number(credit));
                               new11=balm;
				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
				flagtypenw='CR';
			     }
                          }if(i==11){
                              balm=((Number(new11)-Number(debit))+Number(credit));
                              new12=balm;


				if(Number(balm)<0){
				flagtypenw='DR';
			      }else{
		                 if(Number(balm) < 0)
                                  flagtypenw='CR';
                                else
                                  flagtypenw='';

			     }
                            }
                           }
			      lblCrDrcl.setText(flagtypenw);

                                balm = Ext.util.Format.number(balm,"0.00")
		               if (balm<0)
		                {
		                    balm = Math.abs(balm);
		                }
                                var bamt = '';

                                if (Number(balm) !=0)
                                    bamt = Ext.util.Format.number(balm,"0.00");
                                else
                                { 
                                    bamt = '0';
                                   flagtypenw = '';
                                }   
                                flxMonth.getStore().insert(
                                flxMonth.getStore().getCount(),                       
                                new dgrecord1({
                                    month:monthtype,
                                    debit:debit,
                                    credit:credit,
                                    balance:bamt,
				    type:flagtypenw
                                })
                                );
                                    grid_tot();
                                    grid_closebal();
									//myFunction();
                            var RowCnt = flxMonth.getStore().getCount();
                            flxMonth.getSelectionModel().selectAll();
                            var sel1 = flxMonth.getSelectionModel().getSelections();
                            for (var j=0;j<RowCnt;j++)
                            {
                              if(i>1){
                                    fvr_opbal=Number(fvr_opbal)+Number(sel1[j].data.balance);
                                }
                            }
                           }
// for loop end

                          }
//if end
                          else{

			    var cnnt=flxMonth.getStore().getCount();
			     if(cnnt==0){
				if(fst_dbcr==="CR"){		
				  lblCrDrcl.setText('CR');
				}else {
				  lblCrDrcl.setText('DR');
				}
			     }
                              txtcb.setRawValue(txtob.getRawValue());
                            }
                           }
                         });
//load end



//                        }


                    }
                });

  }

var chqno ='';
var invno = '';
  function MonthClick(){
                flxAdjustments.getStore().removeAll();
                flxDetails.getStore().removeAll();
                flxld.getStore().removeAll();


		MonthClickVocDataStore.removeAll();
		monthcode=0;
                if(cmbMonth.getRawValue()=="JANUARY"){
                    monthcode=1;
                }else  if(cmbMonth.getRawValue()=="FEBRUARY"){
                    monthcode=2;
                }else  if(cmbMonth.getRawValue()=="MARCH"){
                    monthcode=3;
                }else  if(cmbMonth.getRawValue()=="APRIL"){
                    monthcode=4;
                }else  if(cmbMonth.getRawValue()=="MAY"){
                    monthcode=5;
                }else  if(cmbMonth.getRawValue()=="JUNE"){
                    monthcode=6;
                }else  if(cmbMonth.getRawValue()=="JULY"){
                    monthcode=7;
                }else  if(cmbMonth.getRawValue()=="AUGUST"){
                    monthcode=8;
                }else  if(cmbMonth.getRawValue()=="SEPTEMBER"){
                    monthcode=9;
                }else  if(cmbMonth.getRawValue()=="OCTOBER"){
                    monthcode=10;
                }else  if(cmbMonth.getRawValue()=="NOVEMBER"){
                    monthcode=11;
                }else  if(cmbMonth.getRawValue()=="DECEMBER"){
                    monthcode=12;
                }

                find_dates(monthcode);     



  }

    var btnCollectionPrint = new Ext.Button({
        style: 'text-align:center;',
        text: " Print",
	width   : 90,
	height  : 35,
        id: 'btnCollectionPrint',

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(compcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&ledcode="+encodeURIComponent(custcode);
//		    var p5 = "&ledname="+encodeURIComponent(ledname);
       

 		    var param = (p1+p2+p3+p4) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPartyDatewise_Collection.rptdesign&__format=pdf&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepPartyDatewise_Collection.rptdesign' + param, '_blank');	
                }
            }

    });



  function VoucherClick(){


txtVoucherAmount.setValue('');
txttotAjusted.setValue('');
txtBalanceAmount.setValue('');




	       VouNoClickLoadDataStore.removeAll();
	       VouNoClickDetailsDataStore.removeAll();
	       AccInvNoDataStore.removeAll();
               flxld.getStore().removeAll();
	       txtVouDate.setRawValue('');
	       txtvouref.setRawValue("");
	       txtRefDate.setRawValue("");
	       txtmode.setRawValue('');
               txtno.setRawValue('');
               txtdate.setRawValue('');
               txtnarration.setRawValue('');
               txtnarration.setRawValue('');
                VouNoClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'VouNoClickLoad',
                        fcompcode:compcode,
                        ffinid:finid,
                        vouno:cmbvoc.getRawValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){


                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));

//                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'),"d-m-Y"));
//                                txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_payref_date'),"d-m-Y"));

                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_date'));


                                txtnarration.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));

                                for(var i=0;i<cnt;i++){
                                var lednam=VouNoClickLoadDataStore.getAt(i).get('cust_name');
                                var acctdbamt=VouNoClickLoadDataStore.getAt(i).get('acctran_dbamt');
                                var acctcramt=VouNoClickLoadDataStore.getAt(i).get('acctran_cramt');
                                flxld.getStore().insert(
                                flxld.getStore().getCount(),
                                new dgrecord2({
                                    ledger:lednam,
                                    debit:acctdbamt,
                                    credit:acctcramt,
                                    ledtype : VouNoClickLoadDataStore.getAt(i).get('cust_type'), 
                                })
                                );
                              grid_tot_trans();
                          }
                           VouNoClickDetailsDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetails',
                                    fcompcode:compcode,
                                    ffinid:finid,
                                    vouno:cmbvoc.getRawValue()                                     
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsDataStore.getCount();
                                    if(cnt>0){
//                                        txtmode.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_paymode'));
//                                        txtvouref.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_no'));
//                                        txtRefDate.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_payref_date'));
//                                        txtnarration.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
                                        //txtnarration.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
//					txtvouref.setRawValue("");
					//txtRefDate.setRawValue("");
                                        AccInvNoDataStore.load({
                                            url: '/SHVPM/Accounts/clsRepFinancials.php',
                                            params:{
                                                task:'AccInvNo',
                                                fcompcode:compcode,
                                                ffinid:finid,
                                                vouno:b
                                            },
                                            callback:function(){
//                                                txtvouref.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_no'));
//                                                txtRefDate.setRawValue(AccInvNoDataStore.getAt(0).get('acctrail_inv_date1'));
                                            }
                                         });
                                    }
                                }
                            });

			   AdjustmentDetailsDataStore.removeAll();
                           AdjustmentDetailsDataStore.load({
                                url: 'ClsViewStatements.php',
                                params:{
                                    task:'AdjNoClick',
                                    compcode:compcode,
                                    finid:finid,
                                    vouno:cmbvoc.getRawValue(),
                                    db_cr : dbcr,
                                    ledcode : ledcode
                                },
                                callback:function(){
                                    

txttotAjusted.setValue(''); 
txtBalanceAmount.setValue(''); 
                                    flxAdjustments.getStore().removeAll();  
                                    var cnt=AdjustmentDetailsDataStore.getCount();
                                    if(cnt>0){

		                        for(var i=0;i<cnt;i++){
//		                          if (dbcr  == "cr")
		                          //{
		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_invno');
                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('voudate');
//		                          } 
//                                          else
		                          //{
//		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_docno');
//                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('adjdate');
		                          //} 



                                           var paymt =AdjustmentDetailsDataStore.getAt(i).get('ref_paymt_terms');
                                           var adjamt =AdjustmentDetailsDataStore.getAt(i).get('ref_adjamount');
                                           var adjdays =AdjustmentDetailsDataStore.getAt(i).get('ref_adj_days');

				 
				                flxAdjustments.getStore().insert(
				                flxAdjustments.getStore().getCount(),
				                new dgrecord2({
				                    ref_invno : docno,
				                    voudate   : docdt,
				                    ref_paymt_terms:paymt,
				                    ref_adjamount  :adjamt,
				                    ref_adj_days   :adjdays,
				                })
				                );
//grid_tot_trans();
                                          }




                                    }
grid_tot_trans();
                                }


                            });
                        }
                    }

                });
  }

  function grid_tot(){
	totdb="";
        totcr="";
        var Row1= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sele=flxMonth.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            totdb=Number(totdb)+Number(sele[i].data.debit);
            totcr=Number(totcr)+Number(sele[i].data.credit);
        }
        txttotdebit.setRawValue(Ext.util.Format.number(totdb,"0.00"));
        txttotcredit.setRawValue(Ext.util.Format.number(totcr,"0.00"));
}




  function grid_tot2(){
	totdb="";
        totcr="";
        var Row1= flxDetails.getStore().getCount();
        ledger_debit = 0;
        ledger_credit = 0;

        flxDetails.getSelectionModel().selectAll();
        var sele=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            if (sele[i].data.row_type == 'DATA')
            {    
            totdb=Number(totdb)+Number(sele[i].data.acctran_dbamt);
            totcr=Number(totcr)+Number(sele[i].data.acctran_cramt);
            }
        }

        ledger_debit = totdb;
        ledger_credit = totcr;
        var Dr2 = formatter.format(totdb);
        var Cr2 = formatter.format(totcr);
        txtLedgerDebit.setRawValue(Dr2);
        txtLedgerCredit.setRawValue(Cr2)
}


  function grid_tot3(){


        var inv = 0;
        var col = 0;
        var bal = 0;
        var drbal = 0;
        var crbal = 0;

        var Row1= flxBillsDetails.getStore().getCount();

        flxBillsDetails.getSelectionModel().selectAll();
        var sel=flxBillsDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
//	      inv=Number(inv)+Number(sel[i].data.acctrail_inv_value);
//	      col=Number(col)+Number(sel[i].data.acctrail_adj_value);
//	      bal=Number(bal)+Number(sel[i].data.invbalamt);
              if (sel[i].data.acctrail_amtmode == 'D')
                 drbal = Number(drbal)+Number(sel[i].data.invbalamt);     
              else
                 crbal = Number(crbal)+Number(sel[i].data.invbalamt);     
        }
        txtTotalDebitAmount.setValue(Ext.util.Format.number(drbal,"0.00"));
        txtTotalCreditAmount.setValue(Ext.util.Format.number(crbal,"0.00"));
        txtTotalBalAmt.setValue(Ext.util.Format.number(drbal-crbal,"0.00"));

}



  function grid_tot4(){



        var invcoll = 0;

        var Row1= flxCollections.getStore().getCount();

        flxCollections.getSelectionModel().selectAll();
        var sel=flxCollections.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
	      invcoll=Number(invcoll)+Number(sel[i].data.refamount);
        }

        txttotCollection.setValue(Ext.util.Format.number(invcoll,"0.00"));


}

     function grid_tot_Payment(){
        flxDetailsPayment.getSelectionModel().selectAll();
        var selrows = flxDetailsPayment.getSelectionModel().getCount();
        var sel = flxDetailsPayment.getSelectionModel().getSelections();
        no1  = 0;
        no2 = 0;
        var reccnt = 0;
        for (var i=0;i<selrows;i++){
            reccnt = reccnt + 1;    
            no1 = Number(no1)+Number(sel[i].data.noofdays);
            no2 = Number(no2)+Number(sel[i].data.daysfromduedate);
        };
        txtAvg_NoofDays.setValue(no1/reccnt);
        txtAvg_NoofDays_Duedate.setValue(no2/reccnt);

    };



  function grid_tot_trans2(){

txtVoucherAmount.setRawValue('');
txttotAjusted.setRawValue('');
txtBalanceAmount.setRawValue('');


	pvr_dbamt=0;
        flxAdjustments2.getSelectionModel().clearSelections();
        Row= flxAdjustments2.getStore().getCount();

        flxAdjustments2.getSelectionModel().selectAll();
        var sel=flxAdjustments2.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.ref_adjamount);
        }

        txttotAjusted2.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtVoucherAmount2.setRawValue(Ext.util.Format.number(vouamt2,"0.00"));
        txtBalanceAmount2.setRawValue(Ext.util.Format.number(vouamt2-pvr_dbamt,"0.00"));


}

  function grid_closebal(){
	clsbal="";
        var Row1= flxMonth.getStore().getCount();
        flxMonth.getSelectionModel().selectAll();
        var sele=flxMonth.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {
            clsbal=sele[i].data.balance;
        }
        txtcb.setRawValue(Ext.util.Format.number(clsbal,"0.00"));
}

  function grid_tot_trans(){

        txttotAjusted.setValue('');
        txtVoucherAmount.setValue('');
        txtBalanceAmount.setValue('');

        vouamt = 0;

	pvr_dbamt=0;
        pvr_cramt=0;
        var Row= flxld.getStore().getCount();
        flxld.getSelectionModel().selectAll();
        var sel=flxld.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.debit);
            pvr_cramt=Number(pvr_cramt)+Number(sel[i].data.credit);

            if (sel[i].data.ledtype != "G")
               vouamt = Number(sel[i].get('debit'))  + Number(sel[i].get('credit')); 

        }

        txtLtotdebit.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtLtotcredit.setRawValue(Ext.util.Format.number(pvr_cramt,"0.00"));


	pvr_dbamt=0;
        Row= flxAdjustments.getStore().getCount();

        flxAdjustments.getSelectionModel().selectAll();
        var sel=flxAdjustments.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.ref_adjamount);
        }

        txttotAjusted.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtVoucherAmount.setRawValue(Ext.util.Format.number(vouamt,"0.00"));
        txtBalanceAmount.setRawValue(Ext.util.Format.number(vouamt-pvr_dbamt,"0.00"));






}



  var VouNoClickDetailsNewDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsNewDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"VouNoClickDetailsNew"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
         'accref_narration','accref_payref_no','accref_payref_date'
        ])
    });


    var TdsLedgergetDataStore = new Ext.data.Store({
        id: 'TdsLedgergetDataStore',
        proxy: new Ext.data.HttpProxy({
            url:'/SHVPM/Financials/datechk.php',
            method: 'POST'
        }),
        baseParams: {task: "TdsLedgerget"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_grp_code'
        ])
    });

  var Ledger2DataStore = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
                url: 'clsFinancials.php'
            }),
             baseParams:{task:"loadgrid"},
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'Ledger2DataStore'
        },[
           'invno','pdate','invval','atype'
          ])
    });

  var ledgerDataStore = new Ext.data.Store({
        id: 'ledgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{
            task:"ledgerNameNEW"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[
        {name: 'cust_code', type: 'int', mapping: 'cust_code'},
        {name: 'cust_ref', type: 'string',mapping: 'cust_ref'}
        ])
    });

 var LedgerClickLoadDataStore = new Ext.data.Store({
        id: 'LedgerClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerClickLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['curbal_led_code','curbal_obcramt','curbal_obdbamt'])
    });

    var LedgerClickLoad2DataStore = new Ext.data.Store({
        id: 'LedgerClickLoad2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerClickLoad2"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['debit','credit','month','balance'])
    });


  var MonthClickVocDataStore = new Ext.data.Store({
        id: 'MonthClickVocDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_Ledger_Details"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[

'curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_vou_type', 'accref_voudate', 'accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgercode', 'ledgername', 'partyledger', 'cust_code', 'accref_narration','cust_name','cust_type','row_type'

        ])
    });


    var MonthClickVocDataStoreEmail = new Ext.data.Store({
        id: 'MonthClickVocDataStoreEmail',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsViewStatements.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"load_Ledger_DetailsEmail"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },[

'curbal_led_code', 'curbal_obdbamt', 'curbal_obcramt', 'acctran_led_code', 'trn_opdr', 'trn_opcr', 'accref_seqno', 'accref_vouno', 'accref_vou_type', 'accref_voudate', 'accref_payref_no', 'accref_payref_date', 'accref_narration', 'acctran_led_code', 'acctran_dbamt', 'acctran_cramt', 'acctran_accref_seqno', 'acctran_serialno', 'ledgercode', 'ledgername', 'partyledger', 'cust_code', 'accref_narration','cust_name','cust_type','row_type'

        ])
    });



     var LedgerCodeCrDataStore = new Ext.data.Store({
        id: 'LedgerCodeCrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerCodeCr"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['acctran_led_code','acctran_cramt'])
    });

     var LedgerSelDataStore = new Ext.data.Store({
        id: 'LedgerSelDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"LedgerSel"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cust_ref'])
    });

      var VouNoClickLoadDataStore = new Ext.data.Store({
        id: 'VouNoClickLoadDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickLoad"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date','accref_narration','cust_type'])
    });

    var VouNoClickDetailsDataStore = new Ext.data.Store({
        id: 'VouNoClickDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsRepFinancials.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"VouNoClickDetails"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_paymode','accref_payref_no','accref_payref_date','accref_narration'])
    });

   /*var cmbcompany = new Ext.form.ComboBox({
        fieldLabel      : 'Year',
        width           : 135,
        store      : yearchangeDataStore,
        displayField:'fin_year',
        valueField:'fin_id',
        hiddenName:'fin_year',
	style: {
            'color':'#0C5DA9',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        id:'cmbcompany',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
	emptyText: 'Select Year',
        editable: true,
        allowblank:false,
         listeners:{
                select:function(){
                    	yearfinid=Ext.getCmp('cmbcompany').getValue();
			if(yearfinid>0){	
			btnview.show();
			txtob.setRawValue('0.00');
			txtcb.setRawValue('0.00');
			txttotdebit.setRawValue('0.00');
			txttotcredit.setRawValue('0.00');
		        LedgerClick();
		        grpcodetds = 0;
		        TdsLedgergetDataStore.removeAll();
		        TdsLedgergetDataStore.load({
		            url: '/SHVPM/Financials/datechk.php',
		            params: {
		                task: 'TdsLedgerget',
				ledger:ledcod
		            },
		            callback: function () {
		             grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
			     if(grpcodetds==='65'){
				btnview.show();
			     }else{
				btnview.show();
			     }
		            }
			  });	
		     }
                }               
         }
   });*/

    var cmbvoc = new Ext.form.ComboBox({
        id         : 'cmbvoc',
        fieldLabel : 'Voucher No',
        width      : 140,
 	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        store:MonthClickVocDataStore,
        displayField:'accref_vouno',
        valueField:'accref_vouno',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        tabIndex:1,
        selectOnFocus:false,
        editable: false,
          listeners:{
            select :function(){
                VoucherClick();
            }
          }
    });


var btnProcessBills = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS Bills",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
                  ProcessPartyBillsData();
             }
          }

});

var btnProcessCollections = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS Collections",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
                  ProcessPartyCollectionData();
             }
          }

});



var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  

           Process_Month_Ledger_Data();
/*
	flxDetails.getStore().removeAll();     
	MonthClickVocDataStore.removeAll();

	MonthClickVocDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadDocumentList',
                compcode:compcode,
                finid:finid,
                ledcode:ledcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
                { 
                     var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){
			    acctradbamt=0;
			    acctrail_inv_no='';	
			    acctrancramt=0;	
			    accrefvouno='';	
			    accref_vou_type='';
			    accref_payref_no='';
			    ledname='';	
                            for(var i=0;i<cnt;i++){
                               party =MonthClickVocDataStore.getAt(i).get('partyledger');
                               accrefvouno=MonthClickVocDataStore.getAt(i).get('accref_vouno');
                               accref_voudate=MonthClickVocDataStore.getAt(i).get('accref_voudate');
                               accref_payref_no=MonthClickVocDataStore.getAt(i).get('accref_payref_no');
                               acctrail_inv_no=MonthClickVocDataStore.getAt(i).get('acctrail_inv_no');
                               ledname=MonthClickVocDataStore.getAt(i).get('cust_ref');
                               acctradbamt=MonthClickVocDataStore.getAt(i).get('acctran_dbamt');
                               acctrancramt=MonthClickVocDataStore.getAt(i).get('acctran_cramt');
                               accref_vou_type=MonthClickVocDataStore.getAt(i).get('accref_vou_type');
                               if(accref_vou_type=="BR"){
                                   typevou="BANK RECEIPT";
                               }else  if(accref_vou_type=="BP"){
                                   typevou="BANK PAYMENT";
                               }else  if(accref_vou_type=="CR"){
                                   typevou="CASH RECEIPT";
                               }else  if(accref_vou_type=="CP"){
                                   typevou="CASH PAYMENT";
                               }else  if(accref_vou_type=="WA"){
                                   typevou="SALE MISLLANEOUS STORES";
                               }else  if(accref_vou_type=="WS"){
                                   typevou="SALE MISLLANEOUS ACCOUNTS";
                               }else{
                                   typevou="GENERAL";
                               }
                               flxDetails.getStore().insert(
                                flxDetails.getStore().getCount(),
                                new dgrecord({
                                    month:i+1,
                                    accountledger : party,
                                    accref_vouno:accrefvouno,
                                    accref_voudate:accref_voudate,
                                    accref_payref_no:acctrail_inv_no,
                                    Chequeno:accref_payref_no,
                                    Account:ledname,
                                    Debit:acctradbamt,
                                    Credit:acctrancramt,
                                    Vouctype:typevou
                                })
                                );
                             grid_tot2();
                            }
                        }
                }

	    });

                 grid_tot2();
*/
       	 }
        }   
});





function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    

    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 



//    mdays = Ext.util.Format.date(new Date(),"d");

 mdays2 = Ext.util.Format.date(new Date(),"d");

//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);



   DateFind.setValue(yr+"-"+rmon+"-"+mdays);




   var startDate = yr+"-"+rmon+"-01";
   var endDate = yr+"-"+rmon+"-"+mdays;

   // Current Date
   var today = new Date();
   var todayStr = today.getFullYear()+"-"+("0"+(today.getMonth()+1)).slice(-2)+"-"+("0"+today.getDate()).slice(-2);

   // If endDate > today then use today
   if(new Date(endDate) > today){
       endDate = todayStr;
   }
   monthstartdate.setValue(startDate);
   monthenddate.setValue(endDate);
   monthstartdate2.setValue(startDate);
   monthenddate2.setValue(endDate);
   monthstartdate3.setValue(startDate);
   monthenddate3.setValue(endDate);
   monthstartdate4.setValue(startDate);
   monthenddate4.setValue(endDate);
/*
    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);


    monthstartdate2.setValue(finstdate);
    monthenddate2.setValue(yr+"-"+rmon+"-"+mdays);


    monthstartdate3.setValue(finstdate);
    monthenddate3.setValue(yr+"-"+rmon+"-"+mdays);

    monthstartdate4.setValue(finstdate);
    monthenddate4.setValue(yr+"-"+rmon+"-"+mdays);



    var dt_today = new Date();
    var dtvou = DateFind.getValue();

m1 = Ext.util.Format.date(monthenddate.getValue(),"m");
m2 = Ext.util.Format.date(DateFind.getValue(),"m");
alert(m1);
alert(m2);
*/



    Process_Month_Ledger_Data();
    ProcessPartyBillsData();
  
}
 var opamt = 0;
    var cloamt = 0;

    function Process_Month_Ledger_Data()
    {

                   txtOpening_Debit.setValue(0);
                   txtOpening_Credit.setValue(0);
                   txtClosing_Debit.setValue(0);
                   txtClosing_Credit.setValue(0);
        txtLedgerDebit.setValue(0);
        txtLedgerCredit.setValue(0);

        var tmpledname = '';
        var ltype = '';

        flxDetails.getStore().removeAll();
        if (ledtype == 'G')
           ltype = '';
        else
           ltype = ledtype;       

	MonthClickVocDataStore.removeAll();
	MonthClickVocDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Ledger_Details',
                compcode  : compcode,
                finid     : finid,
                startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                ledcode   : ledcode,
                ledgertype   : ledtype,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=MonthClickVocDataStore.getCount();
                   if(cnt>0)
                   {

                    /*
                    opamt =  Number(MonthClickVocDataStore.getAt(0).get('curbal_obdbamt'))+Number(MonthClickVocDataStore.getAt(0).get('trn_opdr')) - Number(MonthClickVocDataStore.getAt(0).get('curbal_obcramt')) - Number(MonthClickVocDataStore.getAt(0).get('trn_opcr')) ;
 
                   var opamt2 = formatter.format(Math.abs(opamt));


                    if (opamt > 0)      
                       txtOpening_Debit.setRawValue(opamt2);
                    else
                       txtOpening_Credit.setRawValue(opamt2);
 
*/
                   for(var j=0; j<cnt; j++)
 		           { 

/*                  
                        var displedname = '';
                       if (MonthClickVocDataStore.getAt(j).get('ledgername') == null)
                            displedname = MonthClickVocDataStore.getAt(j).get('partyledger');
                       else
                            displedname = MonthClickVocDataStore.getAt(j).get('ledgername');
  */
                      if (MonthClickVocDataStore.getAt(j).get('cust_name') == "OPENING BALANCE")
                      {  
                           if (MonthClickVocDataStore.getAt(j).get('acctran_dbamt') > 0)      
                                txtOpening_Debit.setRawValue(formatter.format(MonthClickVocDataStore.getAt(j).get('acctran_dbamt')));
                           else
                               txtOpening_Credit.setRawValue(formatter.format(MonthClickVocDataStore.getAt(j).get('acctran_cramt')));
                      } 

                      if (MonthClickVocDataStore.getAt(j).get('cust_name') == "CLOSING BALANCE")
                        {  
                             if (MonthClickVocDataStore.getAt(j).get('acctran_dbamt') > 0)      
                                txtClosing_Debit.setRawValue(formatter.format(MonthClickVocDataStore.getAt(j).get('acctran_dbamt')));
                             else
                                 txtClosing_Credit.setRawValue(formatter.format(MonthClickVocDataStore.getAt(j).get('acctran_cramt')));
                        } 
  

                        


  
                       flxDetails.getStore().insert(
                       flxDetails.getStore().getCount(),
                       new dgrecord({
                           sno          : j+1,	
// 			   voudate  : MonthClickVocDataStore.getAt(j).get('accref_voudate'),
                            voudate  : Ext.util.Format.date(MonthClickVocDataStore.getAt(j).get('accref_voudate'),"d-m-Y"),
                            cust_name : MonthClickVocDataStore.getAt(j).get('cust_name'),
                            acctran_dbamt : MonthClickVocDataStore.getAt(j).get('acctran_dbamt'),
                            acctran_cramt  : MonthClickVocDataStore.getAt(j).get('acctran_cramt'),
                            accref_payref_no : MonthClickVocDataStore.getAt(j).get('accref_payref_no'),
                            accref_vouno  : MonthClickVocDataStore.getAt(j).get('accref_vouno'),
                            accref_vou_type : MonthClickVocDataStore.getAt(j).get('accref_vou_type'),
                            accref_seqno : MonthClickVocDataStore.getAt(j).get('accref_seqno'),
                            led_code : MonthClickVocDataStore.getAt(j).get('acctran_led_code'),
                            accref_narration : MonthClickVocDataStore.getAt(j).get('accref_narration'),
                            row_type : MonthClickVocDataStore.getAt(j).get('row_type'),

                        })
                       );
        
                   }   
                   } 
                   grid_tot2();  

/*
                  cloamt = opamt + ledger_debit - ledger_credit ;


                  var cloamt2 = formatter.format(Math.abs(cloamt));
                    if (cloamt > 0) 
                    {         
                       txtClosing_Debit.setRawValue(cloamt2);
                    } 
                    else
                    {
                       txtClosing_Credit.setRawValue(cloamt2);

                    }   
*/                   


                }         
	  });

        var m1 = 0;
       
    }  

var balamt = 0;

    function ProcessPartyBillsData()
    {


     if ( ledcode > 0)
     {
        flxAdjustments2.getStore().removeAll();
        flxBillsDetails.getStore().removeAll();
	loadBillsDetailsDatastore.removeAll();
	loadBillsDetailsDatastore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'load_Bills_Details',
                compcode  : compcode,
                finid     : finid,
                startdate : Ext.util.Format.date(monthstartdate2.getValue(),"Y-m-d"), 
                enddate   : Ext.util.Format.date(monthenddate2.getValue(),"Y-m-d"), 
                ledcode   : ledcode,
                alldueopt : 'N',
                dueopt    : "PT",  
                ledtype   : ledtype,
		},
		scope:this,
		callback:function()
       		{
                   var cnt=loadBillsDetailsDatastore.getCount();
//alert(cnt);
                  
 
                   if(cnt>0)
                   {

                     for(var j=0; j<cnt; j++)
 	             { 

//alert(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_date'));
            


                     if (suptype == "C")
                     {   
                         balamt = Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value')) -Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value'))+ Number(loadBillsDetailsDatastore.getAt(j).get('adjamt'));
                         adjamt = Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value')) - Number(loadBillsDetailsDatastore.getAt(j).get('adjamt'));                     
                     } 
                     else   
                     {
                         balamt = Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value')) -Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value'));
                         adjamt = Number(loadBillsDetailsDatastore.getAt(j).get('acctrail_adj_value')) ;
                     }

                       balamt =  Ext.util.Format.number(balamt,"0.00")








                       adjamt =  Ext.util.Format.number(adjamt,"0.00")

                       flxBillsDetails.getStore().insert(
                       flxBillsDetails.getStore().getCount(),
                       new dgrecord({
			                accref_vouno  : loadBillsDetailsDatastore.getAt(j).get('accref_vouno'),
                            accref_voudate  : Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('accref_voudate'),"d-m-Y"),
                            acctrail_inv_date  : Ext.util.Format.date(loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_date'),"d-m-Y"),
			                acctrail_inv_no : loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_no'),
 	                        acctrail_inv_value : loadBillsDetailsDatastore.getAt(j).get('acctrail_inv_value'),
 			                acctrail_adj_value  : adjamt,
                            invbalamt : balamt,
 			                acctrail_crdays  : loadBillsDetailsDatastore.getAt(j).get('acctrail_crdays'),
                            duedate : loadBillsDetailsDatastore.getAt(j).get('duedate'),
			                oddays : loadBillsDetailsDatastore.getAt(j).get('oddays'),
			                acctrail_amtmode  : loadBillsDetailsDatastore.getAt(j).get('acctrail_amtmode'),

                        })
                       );
                        grid_tot3();     
                   }   
                   } 
                   grid_tot3();  

 
                   


                }         
	  });
        }
        else
        {
          alert("Select Leder Name and Continue ...");
        }  
        var m1 = 0;
        
    }


    var cmbMonth = new Ext.form.ComboBox({
        id         : 'cmbMonth',
        fieldLabel : 'Month',
        width      : 250,
	style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
        store : ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY',
                    'AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'],
        displayField:'month_name',
        valueField:'month_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:false,
        editable: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners:{
            select :function(){
                MonthClick();
            }
        }
    });

    var txttotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Debit',
        id          : 'txtdbt',
        name        : 'txtdbt',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Credit',
        id          : 'txtcredit',
        name        : 'txtcredit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtVoucherAmount = new Ext.form.NumberField({
        fieldLabel  : 'Voucher Amount' ,
        id          : 'txtVoucherAmount',
        name        : 'txtVoucherAmount',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotAjusted = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted' ,
        id          : 'txttotAjusted',
        name        : 'txttotAjusted',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtBalanceAmount = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amount' ,
        id          : 'txtBalanceAmount',
        name        : 'txtBalanceAmount',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtVoucherAmount2 = new Ext.form.NumberField({
        fieldLabel  : 'Voucher Amount' ,
        id          : 'txtVoucherAmount2',
        name        : 'txtVoucherAmount2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotAjusted2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted' ,
        id          : 'txttotAjusted2',
        name        : 'txttotAjusted2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtVoucherAmount2 = new Ext.form.NumberField({
        fieldLabel  : 'Voucher Amount' ,
        id          : 'txtVoucherAmount2',
        name        : 'txtVoucherAmount2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotAjusted2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Adjusted' ,
        id          : 'txttotAjusted2',
        name        : 'txttotAjusted2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtBalanceAmount2 = new Ext.form.NumberField({
        fieldLabel  : 'Balance Amount' ,
        id          : 'txtBalanceAmount2',
        name        : 'txtBalanceAmount2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txttotdebit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit' ,
        id          : 'txttotdebit2',
        name        : 'txttotdebit2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txttotcredit2 = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txttotcredit2',
        name        : 'txttotcredit2',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });



    var txtFinYear = new Ext.form.NumberField({
        fieldLabel  : 'Finance Year',
        id          : 'txtFinYear',
        name        : 'txtFinYear',
        width       : 80,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });


    var txtLtotdebit = new Ext.form.NumberField({
        fieldLabel  : 'Total Debit',
        id          : 'txtLtotdebit',
        name        : 'txtLtotdebit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtLtotcredit = new Ext.form.NumberField({
        fieldLabel  : 'Total Credit',
        id          : 'txtLtotcredit',
        name        : 'txtLtotcredit',
        width       : 100,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtob = new Ext.form.NumberField({
        fieldLabel  : 'Opening Balance',
        id          : 'txtob',
        name        : 'txtob',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var txtcb = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcb',
        name        : 'txtcb',
        width       : 140,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        enableKeyEvents: true,
        allowBlank: true
    });

    var lblob = new Ext.form.Label({
        fieldLabel  : 'Opening Balance',
        id          : 'lblob',
        name        : 'acob',
        width       : 80,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var lblcb = new Ext.form.Label({
        fieldLabel  : 'Closing Balance',
        id          : 'lblcb',
        name        : 'lblcb',
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 120,
        hidden:true
    });

var lblCrDrcl = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDrcl',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblCrDr = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblCrDr',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'CrDr',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });



var lblParty1 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty1',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty1',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty2',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty2',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty3 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty3',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty3',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty4 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty4',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty4',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty5 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty5',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty5',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });



var lblParty6 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty6',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty6',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });



var lblParty7 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty7',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty7',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });



var lblParty8 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty8',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty8',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblParty9 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty9',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty9',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblParty10 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty10',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty10',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblParty11 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty11',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty11',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblParty12 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty12',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty12',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty13 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty13',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty13',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });

var lblParty14 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty14',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty14',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblParty15 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty15',
style: {
            'color':'#7133ff',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'lblParty15',
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#7133ff",
    });


var lblcompany = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblcompany',
        name        : 'lblcompany',
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 550
    });

    var lbltot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lbltot',
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        labelStyle      : "font-size:13px;font-weight:bold;color:#0080ff",
        name        : 'actot',
        width       : 80
    });

    var lblTtot = new Ext.form.Label({
        fieldLabel  : 'Total',
        id          : 'lblTtot',
        name        : 'actTot',
        width       : 80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var grpcodetds=0;
/*
    var cmbledger = new Ext.form.ComboBox({
        id         : 'cmbledger',
        fieldLabel : 'Ledger',
        width      : 300,
	style: {
            'color':'#0C5DA9',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold',textTransform:'uppercase'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        store      : ledgerDataStore,
        displayField:'cust_ref',
        valueField:'cust_code',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus:false,
	emptyText: 'Type Ledger Name',
        editable: true,
        listeners:{
            select :function(){
		flxld.getStore().removeAll();
		flxMonth.getStore().removeAll();
		flxDetails.getStore().removeAll();
                ledname=cmbledger.getRawValue();
                ledcode=cmbledger.getValue();
		txtob.setRawValue('0.00');
		txtcb.setRawValue('0.00');
		txttotdebit.setRawValue('0.00');
		txttotcredit.setRawValue('0.00');
			if(finid>0){	
			//btnview.show();
			txtob.setRawValue('0.00');
			txtcb.setRawValue('0.00');
			txttotdebit.setRawValue('0.00');
			txttotcredit.setRawValue('0.00');
		        LedgerClick();
		        grpcodetds = 0;

		     }
            }	
        }
    });
*/
var txtAccountName = new Ext.form.TextField({
        fieldLabel  : 'Ledger',
        id          : 'txtAccountName',
        name        : 'txtAccountName',
        width       :  330,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxLedger.hide();
            //       cmbType.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxLedger.getSelectionModel().selectRow(0)
             flxLedger.focus;
             flxLedger.getView().focusRow(0);
             }
          },
	    keyup: function () {
//                Ext.WindowManager.bringToFront('flxLedger');
                if (txtAccountName.getRawValue().length > 0)
                { 
		        flxLedger.getEl().setStyle('z-index','10000');
		        flxLedger.show();
		        loadSearchLedgerListDatastore.removeAll();
		          if (txtAccountName.getRawValue() != '')
		             LedgerSearch();
                }
            }
         }  
    });

    var flxMonth = new Ext.grid.EditorGridPanel({
        frame: true,
        store: [],
	id:'my-grid',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
        menuDisabled: false,
	stripeRows: true,
	style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 300,
        width: 850,
        border:false,
        x: 370,
        y: 70,
        columns: [
            {header: "Month", dataIndex: 'month',width:260,align:'left', sortable: false,defaultSortable: false,menuDisabled: false,
		renderer : function(value, meta ,record) {
		    var monthcolor=record.get('month');
		    if(monthcolor=='JANUARY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='FEBRUARY') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MARCH') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='APRIL') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='MAY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='JUNE') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='JULY') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='AUGUST') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='SEPTEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='OCTOBER') {
			meta.style = "background-color:#FFFFE0;";
		    }else if(monthcolor=='NOVEMBER') {
			meta.style = "background-color:#FFDEAD;";
		    }else if(monthcolor=='DECEMBER') {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	    },
            {header: "Debit", dataIndex: 'debit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
            },
            {header: "Credit", dataIndex: 'credit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    }  
            },
            {header: "Balance", dataIndex: 'balance',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r) {
                    if (val == null || val === '') return '';
            
                    // Convert and format with Indian locale & 2 decimal places
                    var formattedVal = parseFloat(val).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    });
            
                    // Add color & bold style
                    return '<span style="color:#f5276c; font-weight:600;">' + formattedVal + '</span>';
                }
        },
	    {header: "Type", dataIndex: 'type',width:80,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'}
        ],
         listeners :{
            'rowDblClick' : function(flxMonth,rowIndex,cellIndex,e){



                tabOverall.setActiveTab(1);
                var selerow =flxMonth.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                    var a =selerow[i].get('month');
                }

                cmbMonth.setRawValue(a);
txtVoucherAmount.setValue('');
txttotAjusted.setValue('');
txtBalanceAmount.setValue('');
                flxAdjustments.getStore().removeAll();
                flxDetails.getStore().removeAll();
                flxld.getStore().removeAll();
                MonthClick();
            }
        }
    });


function find_voucher_details()
{


        vouamt = 0
        dbcr = "db";
        tabOverall.setActiveTab(2);
        var selerow =flxDetails.getSelectionModel().getSelections();
        for(var i=0; i<selerow.length; i++)
        {
             b =selerow[i].get('accref_vouno');
             vouamt = Number(selerow[i].get('acctran_dbamt'))  + Number(selerow[i].get('acctran_cramt')); 
             if ( selerow[i].get('acctran_dbamt') >0)
                dbcr = "db";               
             else
                dbcr = "cr";
             voutype = selerow[i].get('accref_vou_type');
             vouseqno = selerow[i].get('accref_seqno');
        }

 

        cmbvoc.setRawValue(b);
        VoucherClick();
}


    var flxDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
	id:'my-grid2',
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 440,
        width: 1100,
        border:false,
        x: 370,
        y: 40,
        viewConfig: {
            getRowClass: function(record) {
                var type = record.get('row_type');
    
                if (type === 'OPENING') {
                    return 'row-opening';
                }
                if (type === 'TRANSACTION TOTAL') {
                    return 'row-total';
                }
                if (type === 'CLOSING') {
                    return 'row-closing';
                }
            }
        },        
    tbar: [
        {
            text:'Export Excel',
            iconCls:'icon-excel',
            cls:'report-btn',
            scale:'medium',
            handler:function(){
                exportColumnGrid2('excel','A4');
            }
        },
        '-',
        {
            text:'Export PDF',
            iconCls:'icon-pdf',
            cls:'report-btn',
            scale:'medium',
            handler:function(){

                Ext.Msg.show({
                    title:'Paper Size',
                    msg:'Select Paper Size',
                    buttons:{
                        ok:'A4',
                        yes:'LEGAL'
                    },
                    fn:function(btn){
                        var paper = (btn=='yes') ? 'LEGAL' : 'A4';
                        exportColumnGrid2('pdf',paper);
                    }
                });

            }
        }
    ],        
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'left', sortable: false,defaultSortable: false,menuDisabled: false,},
            {header: "Date ", dataIndex: 'voudate',width:110,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,},
            {header: "Description", dataIndex: 'cust_name',width:300,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,
		renderer : function(value, meta ,record) {
		    var vou=record.get('cust_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
          {header: "Voucher Type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center',hidden : true},
            {header: "Vou. No.", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'},
            {header: "Doc. No.", dataIndex: 'accref_payref_no',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'center'},

            {header: "Debit", dataIndex: 'acctran_dbamt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    }  
            },
            {header: "Credit", dataIndex: 'acctran_cramt',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    }  
            },
            
            {header: "Narration", dataIndex: 'accref_narration',width:250,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'left',hidden : 'true'},
            {header: "Inv type", dataIndex: 'accref_vou_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "Seq. No.", dataIndex: 'accref_seqno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "Led Code", dataIndex: 'cust_code',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'true'},
            {header: "row type", dataIndex: 'row_type',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : 'false'},            
        ],
        
         listeners :{
            'rowDblClick' : function(flxDetails,rowIndex,cellIndex,e){

                 find_voucher_details();
            },
        }
    });


    var flxld = new Ext.grid.EditorGridPanel({
        frame: false,
        store: Ledger2DataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
	id:'my-grid3',
        scrollable: true,
        menuDisabled: false,
	stripeRows: true,
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 220,
        width: 650,
        border:false,
        x: 370,
        y: 40,
        columns: [
            {header: "Ledger Name", dataIndex: 'ledger',width:340,align:'left', sortable: false,defaultSortable: false,menuDisabled: false,
            renderer : function(value, meta ,record) {
		    var deb=record.get('debit');
		    var cre=record.get('credit');
		    if(deb>0) {
			meta.style = "background-color:#FFDEAD;";
		    }else if(cre>0) {
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
	   },
            {header: "Debit", dataIndex: 'debit',width:130,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    }  
	    },
            {header: "Credit", dataIndex: 'credit',width:130,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',
                renderer: function (val, metaData, r){
                    if (val > 0) 
                    { 
                    return  parseFloat(val).toLocaleString('en-In', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                //         style: 'currency',
                        currency: 'INR',
                        });
                    }
                    }  
            },
            {header: "ledtype", dataIndex: 'ledtype',width:30,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'left'}
        ]
    });
    
    var txtnarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtnar',
        name        : 'txtnar',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        width       : 700
    });

    var txtnarration = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtnarration',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'txtnarration',
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 550
    });

    var txtmode = new Ext.form.TextField({
        fieldLabel  : 'Mode',
        id          : 'txtmode',
        name        : 'txtmode',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 100
    });

    var txtno = new Ext.form.TextField({
        fieldLabel  : 'No',
        id          : 'txtno',
        name        : 'txtno',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 100
    });

    var txtdate = new Ext.form.TextField({
        fieldLabel  : 'Date',
        id          : 'txtdate',
        name        : 'txtdate',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        readOnly: true,
        width       : 100,
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
    });

    var txtVouDate = new Ext.form.TextField({
        fieldLabel  : 'Voucher Date',
        id          : 'txtVouDate',
        name        : 'txtVouDate',
        readOnly: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 100
    });

    var txtvouref = new Ext.form.TextField({
        fieldLabel  : 'Reference No',
        id          : 'txtvouref',
        name        : 'txtvoref',
       labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });

    var txtRefDate = new Ext.form.TextField({
        fieldLabel  : 'Ref Date',
        id          : 'txtvdate',
        name        : 'txtvdate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        readOnly: true,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        width       : 120
    });
    

    
   var btnview = new Ext.Button({
        style   : 'text-align:center;',
        text    : " VIEW DOCUMENT",
        width   : 100,id:'btnview',
        x       : 10,
        y       : 10,
        border: 1,
        style: {
        borderColor: 'blue',
        borderStyle: 'solid',
        },
        listeners: {
            click: function(){

                var voutype2 = cmbvoc.getRawValue().substring(0,2);     
                var invno = txtvouref.getValue();
                var p1 = "&compcode=" + encodeURIComponent(compcode);
                var p2 = "&fincode=" + encodeURIComponent(finid);
                var p3 = "&invno=" + encodeURIComponent(invno);

                i1 = "ORIGINAL FOR BUYER";
                var p4 = "&displayword=" + encodeURIComponent(i1);

                var p5 = "&vouno="+encodeURIComponent(cmbvoc.getRawValue());

                var p6 = "&seqno="+encodeURIComponent(vouseqno);

                var param = (p1 + p2 + p3 + p4 ); 

                var param2 = (p1 + p2 + p5 ); 
                var param3 = (p1 + p2 + p6 ); 
  


                   if (voutype  == "GSI") 
                   {
                    if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param);
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=xlsx&' + param, '_blank'); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign' + param); 
                   }
                   else if  (voutype  == "OSI") 
                   {
                   if (printtype == "PDF") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else if (printtype == "XLS") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=xlsx&'+ param); 

                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign' + param); 
                   } 
                   else if (voutype == "GJV")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign&__format=xlsx&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintJV.rptdesign' + param2, '_blank');
                    }     
                    else if (voutype == "CHR" || voutype == "BKR")
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=pdf&' + param3, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign&__format=xlsx&' + param3, '_blank');
                    else
		    window.open('param3://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintRecpt.rptdesign' + param2, '_blank');
                    }       
                    else if (voutype == "CHP"  || voutype == "BKP" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=pdf&' + param3, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign&__format=xlsx&' + param3, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintPaymt.rptdesign' + param3, '_blank');
                    }   
                    else if (voutype == "CNN"  || voutype == "CNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign&__format=xlsx&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintCreditNote.rptdesign' + param2, '_blank');
                    }  
                    else if (voutype == "DNN"  || voutype == "DNG" )
                    {  
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=pdf&' + param2, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign&__format=xlsx&' + param2, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepVouPrintDebitNote.rptdesign' + param2, '_blank');
                    }  

                    else if (voutype2 == "WP" )
                    {  



		 	var p1 = "&compcode=" + encodeURIComponent(compcode);
			var p2 = "&finid=" + encodeURIComponent(finid);
			var p3 = "&grnno=" + encodeURIComponent(cmbvoc.getRawValue());
			var param = (p1+p2+p3) ; 

                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=xlsx&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param, '_blank');
                    }  
                    else if (voutype2 == "FU" )
                    {  
		 	var p1 = "&compcode=" + encodeURIComponent(compcode);
			var p2 = "&finid=" + encodeURIComponent(finid);
			var p3 = "&grnno=" + encodeURIComponent(cmbvoc.getRawValue());
			var param = (p1+p2+p3) ; 

                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=xlsx&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param, '_blank');
                    }  






	    }
	}
	});


    /*var btnview = new Ext.Button({
        style   : 'text-align:center;',
        text    : " TDS",
        width   : 60,id:'btnview',
        x       : 10,
        y       : 200,
        listeners: {
            click: function(){
                   
		    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finid="+encodeURIComponent(yearfinid);
                    var ledcode="&lednew="+encodeURIComponent(ledcod);

		    var param = (fin + com +ledcode) ;

		    window.open('http://denimsoft.kgdenim.com:8080/birt-viewer/frameset?__report=accounts/accountstdreport.rptdesign' + param, '_blank');	
	    }
	}
	});*/

   /* var btnview2 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "OverAll",
        width   : 60,id:'btnview2',
        x       : 400,
        y       : 255,
        listeners: {
            click: function(){
                    var com="&compcode="+encodeURIComponent(compcode);
                    var fin="&finyear="+encodeURIComponent(yearfinid);
                    var ledcode="&ledger="+encodeURIComponent(ledcod);

		    var param = (fin + com + ledcode) ;

	
	    }
	}
	});		

    var btnview3 = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Ledger",
        width   : 60,id:'btnview3',
        x       : 400,
        y       : 255,
        listeners: {
            click: function(){
	
	    }
	}
	});*/

    var btnPrint = new Ext.Button({
        style   : 'text-align:center;',
        text    : " Abstract Print ",
        width   : 60,id:'btnPrint',
        x       : 10,
        y       : 200,
        listeners: {
            click: function(){
             //      ledcode = cmbledger.getValue();

// alert("Hello");



		    var com="&compcode="+encodeURIComponent(compcode);
                    var fin = "&fincode=" + encodeURIComponent(finid);
                    var ledcode="&ledgercode="+encodeURIComponent(custcode);
                    var opening_debit="&opening_debit="+encodeURIComponent(curbal_obdbamt);
                    var opening_credit="&opening_credit="+encodeURIComponent(curbal_obcramt);


// alert(fin);

		    var param = (com + fin + ledcode +opening_debit +opening_credit  ) ;
//alert(param);

                if (printtype == "PDF") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger_montwise.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger_montwise.rptdesign&__format=xlsx&' + param, '_blank');
                else
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger_montwise.rptdesign' + param, '_blank');
	
	    }
	}
	});

    var btnviewlast = new Ext.Button({
        style: 'text-align:center;',
        text: " Report",
        width: 60, id: 'btnviewlast',
        x: 10,
        y: 200,
        listeners: {
            click: function () {
                var com = "&compcode=" + encodeURIComponent(compcode);
                var fin = "&fincode=" + encodeURIComponent(finid);
                var lcode = "&ledgercode=" + encodeURIComponent(ledcode);
                var rmonth = "&repmonth=" + encodeURIComponent(monthcode);
                var rmonthname = "&repmonthname=" + encodeURIComponent(cmbMonth.getRawValue());

                var param = ( com + fin  + lcode + rmonth + rmonthname );

		if(monthcode>0 && ledcode >0){

                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/rpt_view_ledger.rptdesign' + param, '_blank');
	
                }
            }
        }
    });



var flxBillsDetails  = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:350,
    y:100,
    height: 420,
    hidden:false,
    width: 890,

 //    id: 'my-grid1', 
//     id: 'my-grid-font', 

style: {
            'font-size': '12px','font-weight':'bold'
        },

	columnLines: true,
    columns:
    [ 	 	
        {header: "Vouno" , dataIndex: 'accref_vouno',sortable:false,width:80,align:'left', menuDisabled: false,hidden:false},
        {header: "Vou Date" , dataIndex: 'accref_voudate',sortable:false,width:80,align:'left', menuDisabled: false,hidden:false},

        {header: "Inv Date" , dataIndex: 'acctrail_inv_date',sortable:false,width:80,align:'left', menuDisabled: false},
        {header: "Inv No" , dataIndex: 'acctrail_inv_no',sortable:false,width:100,align:'left', menuDisabled: false,
},
        {header: "Vou Amount" , dataIndex: 'acctrail_inv_value',sortable:false,width:90,align:'right', menuDisabled: false,
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },
        {header: "Adjusted"  , dataIndex: 'acctrail_adj_value',sortable:false,width:90,align:'right', menuDisabled: false,
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },
        {header: "Balance"    , dataIndex: 'invbalamt',sortable:false,width:90,align:'right', menuDisabled: false,
            renderer: function (val, metaData, r){
                if (val > 0) 
                { 
                return  parseFloat(val).toLocaleString('en-In', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
            //         style: 'currency',
                    currency: 'INR',
                    });
                }
                }  
        },
        {header: "DB/CR"   , dataIndex: 'acctrail_amtmode',sortable:false,width:50,align:'right', menuDisabled: false},        
        {header: "Paymnt Terms", dataIndex: 'acctrail_crdays',sortable:false,width:70,align:'right', menuDisabled: false},
        {header: "Due Date"   , dataIndex: 'duedate',sortable:false,width:80,align:'right', menuDisabled: false},
        {header: "OD Days"   , dataIndex: 'oddays',sortable:false,width:80,align:'right', menuDisabled: false},



    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellDblclick': function (flxBillsDetails, rowIndex, cellIndex, e) {


txtVoucherAmount2.setValue('');
txttotAjusted2.setValue('');
txtBalanceAmount2.setValue('');
                               


		var sm = flxBillsDetails.getSelectionModel();
		var selrow = sm.getSelected();

                var vno  = selrow.get('accref_vouno')
                vouamt2  = selrow.get('acctrail_inv_value')



                if (selrow.get('acctrail_amtmode') == "D")
                   dbcr = "db";               
                else
                   dbcr = "cr";
        //        lblSubGroup2.setText("Details for : " + selrow.get('grpname'));
       //         ProcessLedgerData();

  		   AdjustmentDetailsDataStore.removeAll();

                           AdjustmentDetailsDataStore.load({
                                url: 'ClsViewStatements.php',
                                params:{
                                    task:'AdjNoClick',
                                    compcode:compcode,
                                    finid:finid,
                                    vouno:vno,
                                    db_cr : dbcr,
                                    ledcode : ledcode
                                },
                                callback:function(){


     
                                    flxAdjustments2.getStore().removeAll();  
                                    var cnt=AdjustmentDetailsDataStore.getCount();
                                    if(cnt>0){

		                        for(var i=0;i<cnt;i++){
//		                          if (dbcr  == "cr")
		                          //{
		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_invno');
                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('voudate');
//		                          } 
//                                          else
		                          //{
//		                           var docno =AdjustmentDetailsDataStore.getAt(i).get('ref_docno');
//                                           var docdt =AdjustmentDetailsDataStore.getAt(i).get('adjdate');
	                          //} 
                                           var paymt =AdjustmentDetailsDataStore.getAt(i).get('ref_paymt_terms');
                                           var adjamt =AdjustmentDetailsDataStore.getAt(i).get('ref_adjamount');
                                           var adjdays =AdjustmentDetailsDataStore.getAt(i).get('ref_adj_days');

 
				                flxAdjustments2.getStore().insert(
				                flxAdjustments2.getStore().getCount(),
				                new dgrecord3({
				                    ref_invno : docno,
				                    voudate   : docdt,
				                    ref_paymt_terms:paymt,
				                    ref_adjamount  :adjamt,
				                    ref_adj_days   :adjdays,
				                })
				                );

grid_tot_trans2();
                                          }


                                    }


                                }
                            });
                                }
     

	
   }
});


function ProcessPaymentPerformance()
{
//txtClosing.label.update(‘Display Name’);

//txtClosing.setText('Voucher Already Make Adjust!');

// Ext.getCmp('txtClosing').setText('Voucher Already Make Adjust!');

//        fp.getForm().findField('txtClosing').setText('HELLO');

		flxDetailsPayment.getStore().removeAll();     
		LoadCollectionDetailsDataStore.removeAll();

		LoadCollectionDetailsDataStore.load({
		 url: 'ClsPaymentPerformance.php',
		        params: {
		    	task: 'loadCollectionDocumentList',
		        compcode:compcode,
	//	        finid:finid,
		        ledcode:ledcode,
		        startdate: Ext.util.Format.date(monthstartdate4.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate4.getValue(),"Y-m-d"), 

			},
                        scope:this,
                        callback:function(){
                        var cnt=LoadCollectionDetailsDataStore.getCount();
                        if(cnt>0){
                            for(var i=0;i<cnt;i++){


                               invdate  = LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvdate');
                               colldate = LoadCollectionDetailsDataStore.getAt(i).get('accref_voudate');

    

                               flxDetailsPayment.getStore().insert(
                                flxDetailsPayment.getStore().getCount(),
                                new dgrecord({
                                    refpartyinvdate :Ext.util.Format.date(LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvdate'),"d-m-Y"), 
                                    refpartyinvno   : LoadCollectionDetailsDataStore.getAt(i).get('refpartyinvno'),
                                    acctran_totamt  : LoadCollectionDetailsDataStore.getAt(i).get('acctrail_inv_value'),
                                    accref_voudate  : Ext.util.Format.date(LoadCollectionDetailsDataStore.getAt(i).get('accref_voudate'),"d-m-Y"), 
                                    refamount       : LoadCollectionDetailsDataStore.getAt(i).get('refamount'),
                                    acctrail_crdays : LoadCollectionDetailsDataStore.getAt(i).get('acctrail_crdays'),
                                    noofdays : LoadCollectionDetailsDataStore.getAt(i).get('noofdays'),
                                    daysfromduedate : LoadCollectionDetailsDataStore.getAt(i).get('daysfromduedate'),

                                })
                                );
      
                            }
                          grid_tot_Payment();
                        }
                    }
		 });



                var closing =0;
		LoadBalanceDueDataStore.removeAll();

		LoadBalanceDueDataStore.load({
		 url: 'ClsPaymentPerformance.php',
		        params: {
		    	task: 'loadBalanceDue',
		        compcode:compcode,
		        fincode:finid,
		        ledcode:ledcode,
		        startdate: Ext.util.Format.date(monthstartdate4.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate4.getValue(),"Y-m-d"), 
			},
                        scope:this,
                        callback:function(){
                        var cnt=LoadBalanceDueDataStore.getCount();
                        if(cnt>0){
                                 closing =  Number(LoadBalanceDueDataStore.getAt(0).get('opdr')) - Number(LoadBalanceDueDataStore.getAt(0).get('opcr')) + Number(LoadBalanceDueDataStore.getAt(0).get('trn_opdr')) - Number(LoadBalanceDueDataStore.getAt(0).get('trn_opcr')) + Number(LoadBalanceDueDataStore.getAt(0).get('trn_dr')) - Number(LoadBalanceDueDataStore.getAt(0).get('trn_cr'));                      
                                 txtClosing.setValue(closing);
                                 txtSales.setValue(Number(LoadBalanceDueDataStore.getAt(0).get('trn_sales')) );
 

                            }
                        }
		 });
                   grid_tot_Payment();
}


var btnProcessPayment = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  
              ProcessPaymentPerformance();

             }
          }

});


    var btnConfirmationBalance = new Ext.Button({
        style: 'text-align:center;',
        text: " Confirmation of Accounts",
        width: 100, id: 'btnviewlast',
        x: 10,
        y: 200,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
        listeners: {
            click: function () {
                var p1 = "&compcode=" + encodeURIComponent(compcode);
                var p2 = "&fincode=" + encodeURIComponent(finid);
                var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	        var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p5 = "&ledcode="+encodeURIComponent(ledcode);

                var param = (p1+p2+p3+p4+p5);
                if (printtype == "PDF") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalanceNew.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalanceNew.rptdesign&__format=xlsx&' + param, '_blank');
                else
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepConfirmationBalance.rptdesign' + param, '_blank');
            }
        }
    });



    var btnLedgerEmail = new Ext.Button({
        style: 'text-align:center;',
        text: "SEND EMAIL",
        width: 100, id: 'btnLedgerEmail',
        x: 10,
        y: 200,
        style: {
        borderColor: 'blue',
        borderStyle: 'solid',
        fontSize  : '14px',

        },
        listeners: {
        click: function () {
            loadAddressDatastore.removeAll();
            loadAddressDatastore.load({
            url: 'ClsViewStatements.php',
            params: {
            task: 'find_Address',
            ledcode   : ledcode,
            },
            scope:this,
            callback:function()
            {
            custname   =  loadAddressDatastore.getAt(0).get('cust_ref');
            custadd1   =  loadAddressDatastore.getAt(0).get('cust_add1');
            custadd2   =  loadAddressDatastore.getAt(0).get('cust_add2');
            custadd3   =  loadAddressDatastore.getAt(0).get('cust_add3');
            custcity   =  loadAddressDatastore.getAt(0).get('cust_city');
            statename  =  loadAddressDatastore.getAt(0).get('state_name');
            custemail  =  loadAddressDatastore.getAt(0).get('cust_email');

            custzip    =  "Pin : " + loadAddressDatastore.getAt(0).get('cust_zip');
            custcontact=  "Contact Person : Mr." + loadAddressDatastore.getAt(0).get('cust_contact');
            custphone  =  "Phone          : " + loadAddressDatastore.getAt(0).get('cust_phone');

            repperiod  = "Preiod from : " + Ext.util.Format.date(monthstartdate.getValue(),"d-m-Y") + " to " +  Ext.util.Format.date(monthenddate.getValue(),"d-m-Y") 


            MonthClickVocDataStoreEmail.removeAll();
            MonthClickVocDataStoreEmail.load({
            url: 'ClsViewStatements.php',
            params: {
            task: 'load_Ledger_DetailsEmail',
            compcode  : compcode,
            finid     : finid,
            startdate : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
            enddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
            ledcode   : ledcode,
            ledgertype   : ledtype,
            },
            scope:this,
            callback:function()
            {
            var cnt=MonthClickVocDataStoreEmail.getCount();
            if(cnt>0)
            {
            
            ledgerNameDisplay = txtAccountName.getRawValue();
            email  = MonthClickVocDataStoreEmail.getAt(0).get('email');
            opamt =  Number(MonthClickVocDataStoreEmail.getAt(0).get('curbal_obdbamt'))+Number(MonthClickVocDataStoreEmail.getAt(0).get('trn_opdr')) - Number(MonthClickVocDataStoreEmail.getAt(0).get('curbal_obcramt')) - Number(MonthClickVocDataStoreEmail.getAt(0).get('trn_opcr')) ;
            

            var openingdebit = 0;
            var openingcredit = 0;
           
            if (opamt > 0)
            {  
            opdbamt =   formatter.format(opamt);
            opcramt = "";
            openingdebit = opamt;
            } 
            else
            { 
            opdbamt = "";
            opcramt = formatter.format(Math.abs(opamt));
            openingcredit = Math.abs(opamt);
            }              
            

                            
            var sumtotdebit = 0;
            var sumtotcredit = 0;
            
            
            //   mailtrailer =  '<tr>' + '<td align="center"  colspan="3"> <b> ' + 'OPENING BALANCE'  + ' </b> </td>' + '<td align="right">   <b> '+ opdbamt + ' </b> </td>' + '<td align="right"   width =150px>  <b> '  + opcramt + ' </b> </td>' + '</tr> <br>'; 
            
            mailtrailer = '<tr>' +
            '<td align="center" colspan="3" style="border:1px solid black;"><b>OPENING BALANCE</b></td>' +
            '<td align="right" style="border:1px solid black;"><b>'+ opdbamt +'</b></td>' +
            '<td align="right" style="border:1px solid black;"><b>'+ opcramt +'</b></td>' +
            '</tr>';
            
            
            
            for(var j=0; j<cnt; j++)
            { 
            
            voudate  =  Ext.util.Format.date(MonthClickVocDataStoreEmail.getAt(j).get('accref_voudate'),"d-m-Y");
            ledname  =  MonthClickVocDataStoreEmail.getAt(j).get('ledgername');
            dbamt    =  MonthClickVocDataStoreEmail.getAt(j).get('acctran_dbamt');
            cramt    =  MonthClickVocDataStoreEmail.getAt(j).get('acctran_cramt');
            vouno    =  MonthClickVocDataStoreEmail.getAt(j).get('accref_vouno');
            
            sumtotdebit = Number(sumtotdebit) + Number(MonthClickVocDataStoreEmail.getAt(j).get('acctran_dbamt'));
            sumtotcredit = Number(sumtotcredit) + Number(MonthClickVocDataStoreEmail.getAt(j).get('acctran_cramt'));
            
            if (dbamt > 0)
                dbamt        =  formatter.format(dbamt);
            else
                dbamt        = "";
            
            if (cramt > 0)
                cramt        =  formatter.format(cramt);
            else
                cramt        =  "";
            
            
            if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "GSI" || MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type').substring(0,1) == "P")
                billno   =  MonthClickVocDataStoreEmail.getAt(j).get('accref_payref_no');
            else
                billno   =  MonthClickVocDataStoreEmail.getAt(j).get('accref_vouno');
            
            
            if (billno == '')
                invno = vouno;
            else
                invno = billno;
            
            
                if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type').substring(0,3) == "GSI")
                    voutype  =  "Sales";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type').substring(0,1) == "P")
                    voutype  =  "Purchase";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "CNG" || MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "CNN" )
                    voutype  =  "Credit Note";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "DNG" || MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "DNN" )
                    voutype  =  "Debit Note";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "BKR")
                    voutype  =  "Bank Receipt";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "BKP")
                    voutype  =  "Bank Payment";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "CHR")
                    voutype  =  "Cash Receipt";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "CHP")
                    voutype  =  "Cash Payment";
                else if (MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type')  == "EXP")
                    voutype  =  "Expenses Voucher";
                else
                    voutype  = MonthClickVocDataStoreEmail.getAt(j).get('accref_vou_type');
            
            
            
                accref_seqno =  MonthClickVocDataStoreEmail.getAt(j).get('accref_seqno');
            
            
                mailtrailer = mailtrailer + '<tr>' + '<td align="center" width =100px >' + voudate + '</td>' +
                '<td align="center"  width =120px>' + invno + '</td>' +  
                '<td align="left"   width =120px>'  + voutype + '</td>' +  
                '<td align="right"   width =150px>'  + dbamt + '</td>' +  
                '<td align="right"   width =150px>'  + cramt + '</td>' + '</tr>'; 
            
            
            
            } 
            
            var closing =  opamt + sumtotdebit - sumtotcredit;
            
            /*
            if (closing > 0)
            {  
            clodbamt =   formatter.format(closing);
            clocramt = "";
            } 
            else
            { 
            clodbamt = "";
            clocramt = formatter.format(Math.abs(closing));
            }   
            */ 
                       
            if (closing > 0)
                {  
                clodbamt = "";
                clocramt = formatter.format(closing);
                } 
                else
                { 
                clodbamt = formatter.format(Math.abs(closing));
                clocramt = "";
                }   
            
     
                           
            if (sumtotdebit > 0)
            sumtotdebit  =  formatter.format(Number(sumtotdebit)+Number(openingdebit));
            else
            sumtotdebit  =  "";
            
            if (sumtotcredit > 0)
            sumtotcredit  =  formatter.format(Number(sumtotcredit)+Number(openingcredit));
            else
            sumtotcredit  =  "";
            
            


            
            mailtrailer = mailtrailer + '<tr>' + '<td align="center" width =100px > <b> ' + 'TOTAL'  + '  </b>  </td>' +
            '<td align="center"  width =120px > </td>' +  
            '<td align="left"   width =120px>  </td>' +  
            '<td align="right"   width =150px> <b> '  + sumtotdebit + ' </b>  </td>' +  
            '<td align="right"   width =150px> <b> '  + sumtotcredit + ' </b> </td>' + '</tr>'; 
            
            mailtrailer = mailtrailer +  '<tr>' + '<td align="center"  colspan="3"> <b> ' + 'CLOSING BALANCE'  + ' </b> </td>' + '<td align="right">   <b> '+ clodbamt + ' </b> </td>' + '<td align="right"   width =150px>  <b> '  + clocramt + ' </b> </td>' + '</tr>'; 
            
            mailheader = Ext.util.Format.trim('<table border = "1" , height = 70px ><tr>' +'<th bgcolor= "yellow">' + 'Doc Date' + '</th>' + '<th bgcolor= "yellow">' + 'Doc No.' + '</th>' +  '<th bgcolor= "yellow">' + 'Transaction' + '</th>' + '<th bgcolor= "yellow">' + 'Debit' + '</th>' + '<th bgcolor= "yellow">' + 'Creidt' + '</th>' + '\n' + mailtrailer) +'</table>' +  '\n' +'<br>';
            
            mailmessage = "<style> body {height: 842px; width: 700px;  margin-left:0 auto;} </style> <h2> SRI HARI VENKATESWARA PAPER MILLS (P) LTD </h2> ";
            
            
            // mailmessage =  mailmessage + "<td align='center'> 2/151, Keelanmarai Nadu Village, A.Lakshmiapuram-Post, Sivakasi - 626127 </td><br> <hr> <br> <br>";
            mailmessage = mailmessage +
            "<div style='width:100%; margin:0; padding:0;'>"+
            "<div style='text-align:center;'>2/151, Keelanmarai Nadu Village, A.Lakshmiapuram-Post, Sivakasi - 626127</div>"+
            "<hr>"+
            "</div>";
            
            mailmessage =  mailmessage +  "To :  <br>  <br>  <b>  "+ custname + '  </b> &nbsp;&nbsp;&nbsp;' + custcontact +'  <br> ' + custadd1 + ' <br> ' +  custadd2 + ' <br>  ' +  custadd3 + ' <br>   ' +  statename + ' <br> ' +  custzip + ' <br> <br>   Dear Sir / Madam, <br> <br>   <h3 align="center"> <b> Sub :- Confirmation of Accounts </b> </h3>      <h3 align="center"> <b> ' + repperiod +  ' </b> </h3>   <br> Given below is the details of your Accounts as standing in my/our Books of Accounts for the the mentioned period. <br> Kindly return 3 copies stating your I.T. Permanent A/c No., duly signed and sealed, in confirmation of the same. <br> Please note that if no reply is received from you within a fortnight, it will be assumed that you have accepted the balance shown below.<br> <br>'+ mailheader+ "<br> <br> <br>  <hr> <br> I / We hereby Confirm the above "
            

    Ext.Msg.prompt(
        'Confirm Email',
        'Please confirm or change Email ID:',
        function(btn, text){
    
            if(btn == 'ok'){
    
                var emailid = text;   // <-- use entered value
    
                if(!emailid){
                    Ext.Msg.alert("Validation","Email id cannot be empty");
                    return;
                }
    
                Ext.Ajax.request({
                    url: 'TrnLedgerEmail.php',
                    method:'POST',
                    params :
                    {
                        mailmessage : mailmessage,
                        idemail     : emailid
                    },
                    callback: function(options, success, response)
                    {
                        if(success){
                            Ext.Msg.alert("Success","EMAIL Sent Successfully to " + txtAccountName.getRawValue() );
                        }else{
                            Ext.Msg.alert("Error","Email Sending Failed");
                        }
                    }
                });
    
            }
    
        },
        this,
        false,
        custemail   // default value shown in textbox
    );
/*
    Ext.Ajax.request({
    url: 'TrnLedgerEmail.php',
    params :
    {
        mailmessage : mailmessage,
        idemail     : custemail,

    },
    callback: function(options, success, response)
    {
    Ext.MessageBox.alert("EMAIL Send to Customers - "); 
    //                                         mailcount = 1;
    }
    }); 
*/




    grid_tot2();  


    cloamt = opamt + ledger_debit - ledger_credit ;


    var cloamt2 = formatter.format(Math.abs(cloamt));
    if (cloamt > 0) 
    {         
    txtClosing_Debit.setRawValue(cloamt2);
    } 
    else
    {
    txtClosing_Credit.setRawValue(cloamt2);

    }   

    }

    }         
    });

    }         
    });


    }

    }
    });


   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,


listeners: {

     'tabchange': function(tabPanel, tab) {
                    var activeTab = tabOverall.getActiveTab();
                   if (activeTab.id == 'tab4')
                   {   
        //               alert("The active tab in the panel is " + activeTab.id);
                         ProcessPartyBillsData();
                   }   

                   if (activeTab.id == 'tab6')
                   {   
        //               alert("The active tab in the panel is " + activeTab.id);
                       //  btnProcessPayment ();
ProcessPaymentPerformance();
                   }   
        }
},


    items       : [
    {
//Panel 0
        xtype: 'panel',
        title: 'Monthly Balance',
        id   : 'tab1', 
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 250,
			layout  : 'absolute',
			x       : 950,
			y       : 10,
			items:[optprinttype],
	},


	{
            xtype       : 'fieldset',
            x           : 15,
            y           : 10,
            border      : false,
            width       :500,
            items : [lblcompany]
        },

	{
            xtype       : 'fieldset',
            x           : 400,
            y           : 10,
            border      : false,
            width       :500,
            items : [txtFinYear]
        },


        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 70,
            height      : 100,
            width:500, 		 
            labelWidth  : 80,
            border      : false,
            items : [txtAccountName]
        },    

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 430,
            y           : 70,
            width       :400,
            labelWidth  : 200,
            border      : false,
            items : [lblob]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 70,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txtob]
        },{
            xtype       : 'fieldset',
            x           : 730,
            y           : 70,
            border      : false,
            width       :250,
            items : [lblCrDr]
        },{
            xtype       : 'fieldset',
            x           : 780,
            y           : 65,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [btnPrint]
        },
	{
            xtype       : 'fieldset',
            x           : 730,
            y           : 450,
            border      : false,
            width       :250,
            items : [lblCrDrcl]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 250,
            y           : 450,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lbltot]
        },
        {
            xtype       : 'fieldset',
            x           : 320,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 450,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :250,
            items : [txttotcredit]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1100,
            height :     350,
            x           : 10,
            y           : 120,
            border      : false,
            items : [flxMonth]
        },
        {
            xtype       : 'fieldset',
            x           : 560,
            y           : 450,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [txtcb]
        }, flxLedger,





/*{
            xtype       : 'fieldset',
            x           : 940,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview2]
        },{
            xtype       : 'fieldset',
            x           : 10,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview]
        },*/

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 400,
            y           : 430,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lblcb]
        },
       /*{
            xtype       : 'fieldset',
            x           : 150,
            y           : 320,
            layout:'hbox',
            border      : false,
            width       :400,
            items : [btnview3]
        },*/



        ]
    },

    {
//Panel 1
        xtype: 'panel',
        title: 'Transactions',
        id   : 'tab2', 
        bodyStyle: {"background-color": "#f9f2ec"},
        layout: 'absolute',
        items: [
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            width       : 450,
            labelWidth  : 80,
            border      : false,
            items : [cmbMonth]
        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 40,
                             items: [lblParty1]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             width       : 200,
                             border  : false,
		             x       : 400,
			     y       : 10,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             width       : 200,
                             labelWidth  : 70,
                             border  : false,
		             x       : 600,
			     y       : 10,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 800,
			     y       : 10,
                             items: [btnProcess]
                        },

			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 1100,
			    height      : 1300,
			    x           : 10,
			    y           : 70,
			    border      : false,
			    items : [flxDetails]
			},



			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 50,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtOpening_Debit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 90,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtOpening_Credit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 130,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtLedgerDebit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 170,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtLedgerCredit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 210,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtClosing_Debit]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 250,
			    border      : false,
			    width       : 300,
		            labelWidth  : 86,
			    items : [txtClosing_Credit]
			},

		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 330,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnLedgerPrint]
		},
        {
            xtype       : 'fieldset',
            x           : 1150,
            y           : 300,
            border      : false,
            width       : 300,
                labelWidth  : 1,
            items : [btnLedgerPrintNew]
        },


		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 380,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnColumnSelect]
		},


		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 420,
		    border      : false,
		    width       :250,
                    labelWidth  : 50,
		    items : [btnConfirmationBalance]
		},

		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 460,
		    border      : false,
		    width       :250,
                    labelWidth  : 50,
		    items : [btnLedgerEmail]
		},

/*
        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 350,
            y           : 480,
            border      : false,
            anchor: '100%',
            items : [txttotdebit2]
        },


        {
            xtype       : 'fieldset',
            width       : 800,
            height      : 100,
            labelWidth  : 100,
            x           : 600,
            y           : 480,
            border      : false,
            anchor: '100%',
            items : [txttotcredit2]
        },


        {
            xtype       : 'fieldset',
            width       : 800,
            height : 100,
            labelWidth  : 100,
            x           : 0,
            y           : 400,
            border      : false,
            anchor: '100%',
            items : [txtnarration]
        },
*/
      {
                        xtype: 'fieldset',
                        width: 800,
                        height: 100,
                        labelWidth: 0,
                        x: 1100,
                        y: 10,
                        border: false,
                        anchor: '100%',
       //                 items: [btnviewlast]
                    },
        ]
    }, {
//Panel 2
        xtype: 'panel',
        title: 'Voucher',
        id   : 'tab3', 
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 700,
			     y       : 30,
                             items: [lblParty2]
                        },


        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [cmbvoc]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 10,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtVouDate]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtvouref]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 300,
            y           : 50,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [txtRefDate]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 1200,
            height      : 235,
            x           : 10,
            y           : 80,
            border      : false,
            items : [flxld]
        },
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 800,
            height      : 400,
            x           : 700,
            y           : 80,
            border      : false,
            items : [flxAdjustments]
        },
        {
            xtype       : 'fieldset',
            x           : 180,
            y           : 300,
            labelWidth  : 120,
            border      : false,
            width       :250,
            items : [txtLtotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 420,
            y           : 300,
            border      : false,
            labelWidth  : 100,
            width       :250,
            items : [txtLtotcredit]
        },


        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 340,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtVoucherAmount]
        },

        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 380,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txttotAjusted]
        },


        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 420,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtBalanceAmount]
        },


        {
            xtype       : 'fieldset',
            width       : 700,
            labelWidth  : 100,
            x           : 0,
            y           : 375,
            border      : false,
            items : [txtnarration]
        },

        {
            xtype       : 'fieldset',
            title       : '',
            x           : 550,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
            items : [btnview]
        },

        ]
    }
, {
//Panel 3
        xtype: 'panel',
        title: 'Billwise Due',
        id   : 'tab4', 
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 500,
			     y       : 0,
                             items: [lblParty3]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 400,
			layout  : 'absolute',
			x       : 920,
			y       : -10,
			items:[optRepOpt],
		},


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             width       : 210,
                             border  : false,
		             x       : 15,
			     y       : 20,
                             items: [monthstartdate2]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
                             width       : 200,
		             x       : 250,
			     y       : 20,
                             items: [monthenddate2]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 150,
                             border  : false,
		             x       : 450,
			     y       : 15,
                             items: [btnProcessBills]
                        },






		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 850,
		    height      : 500,
		    x           : 10,
		    y           : 50,
		    border      : false,
		    items : [flxBillsDetails]
		},
        {
            xtype       : 'fieldset',
            title       : '',
            width       : 600,
            height      : 400,
            x           : 850,
            y           : 50,
            border      : false,
            items : [flxAdjustments2]
        },
		{
		    xtype       : 'fieldset',
		    x           : 20,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 140,
		    items : [txtTotalDebitAmount]
		},

		{
		    xtype       : 'fieldset',
		    x           : 310,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 150,
		    items : [txtTotalCreditAmount]
		},


		{
		    xtype       : 'fieldset',
		    x           : 610,
		    y           : 500,
		    border      : false,
		    width       :500,
                    labelWidth  : 140,
		    items : [txtTotalBalAmt]
		},
        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 310,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtVoucherAmount2]
        },

        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 340,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txttotAjusted2]
        },


        {
            xtype       : 'fieldset',
            x           : 920,
            y           : 370,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtBalanceAmount2]
        },
		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 410,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnOnlyBillsPrint]
		},
		{
		    xtype       : 'fieldset',
		    x           : 1150,
		    y           : 450,
		    border      : false,
		    width       : 200,
                    labelWidth  : 50,
		    items : [btnAllVoucherPrint]
		},


        ]
   },
{

//Panel 4
        xtype: 'panel',
        title: 'Collections',
        id   : 'tab5', 
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 600,
			     y       : 0,
                             items: [lblParty4]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             width       : 210,
                             border  : false,
		             x       : 15,
			     y       : 20,
                             items: [monthstartdate3]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
                             width   : 220,
		             x       : 250,
			     y       : 20,
                             items: [monthenddate3]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 160,
                             border  : false,
		             x       : 550,
			     y       : 15,
                             items: [btnProcessCollections]
                        },


		{
		    xtype       : 'fieldset',
		    x           : 700,
		    y           : 15,
		    border      : false,
		    width       : 200,
                    labelWidth  : 15,
		    items : [btnCollectionPrint]
		},




		{
		    xtype       : 'fieldset',
		    title       : '',
		    width       : 900,
		    height      : 500,
		    x           : 10,
		    y           : 50,
		    border      : false,
		    items : [flxCollections]
		},


        {
            xtype       : 'fieldset',
            title       : '',
 	   labelWidth  : 130,
            width       : 300,
            x           : 500,
            y           : 490,
            border      : false,
            items : [txttotCollection]
        },


        ]
   },


{
//Panel 5
        xtype: 'panel',
        title: 'Payment Performance',
        id   : 'tab6', 
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 100,
			     y       : 20,
                             items: [lblParty5]
                        },
            tabPerf,

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 300,
                border: false,
                items: [txtClosing]
            },

            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 340,
                border: false,
                items: [txtSales]
            },



            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 380,
                border: false,
                items: [txtAvg_NoofDays]
            },


            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 250,
                width: 450,
                x: 10,
                y: 420,
                border: false,
                items: [txtAvg_NoofDays_Duedate]
            },



		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 80,
                     border  : false,
	             x       : 500,
		     y       : 10,
                     items: [monthstartdate4]
                },
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     border  : false,
	             x       : 700,
		     y       : 10,
                     items: [monthenddate4]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 900,
		     y       : 10,
                     items: [btnProcessPayment]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1100,
		     y       : 10,
                     items: [btnViewPayment]
                },


        ]
   },


   {
//Panel 6
//Annadurai
        xtype: 'panel',
        title: 'COLUMNAR',
        id  : 'ColumnAr', 
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        hidden : true,
        items: [
            {
                xtype       : 'fieldset',
                x           : 10,
                y           : 10,
                border      : false,
                width       :500,
                items : [lblLedgerName]
            },        
            { 
            xtype   : 'fieldset',
            title   : '',
            labelWidth  : 80,
            border  : false,
            x       : 600,
            y       : 10,
            items: [monthstartdate3]
            },
            { 
            xtype   : 'fieldset',
            title   : '',
            labelWidth  : 70,
            border  : false,
            x       : 800,
            y       : 10,
            items: [monthenddate3]
            },        

            { 
            xtype   : 'fieldset',
            title   : '',
            labelWidth  : 70,
            border  : false,
            x       : 10,
            y       : 40,
            items: [columnGrid]
            },    

        ]
    } ,
     


//ANNADURAI


    ]
});





var myWin = new Ext.Window({
    id     : 'myWin',
    height : 600,
    width  : 1340,
    bodyStyle: {"background-color": "#ffffdb"},
    x:10,
    y:36,
    maximized:false,
    items  : [tabOverall],

onEsc:function(){
},
    listeners:{
      
     


        show:function(){

        flxLedger.hide();
        Ext.getCmp('btnLedgerPrint').setDisabled(true);  


    var tabPanel = Ext.getCmp('tabOverall');

    tabPanel.hideTabStripItem(6); 

     tabPanel.setActiveTab(0);
    monthstartdate2.setValue(finstdate);
    monthstartdate3.setValue(finstdate);
    monthstartdate4.setValue(finstdate); 


        txtFinYear.setRawValue(yearfin);
        monthstartdate.setValue(finstdate);
        monthenddate.setValue(fineddate);
    	ledgerDataStore.load({
		url: '/SHVPM/Accounts/clsRepFinancials.php',  
		params:
		{
		    task:"ledgerNameNEW",
		    fcompcode:compcode	,
		    finid:finid	
		},
               callback:function(){
                   txtAccountName.focus();
               }
                   
        });	



                   


        Ext.getCmp('lblcompany').setText(millname);

        }
    }
});
myWin.show();
    });






