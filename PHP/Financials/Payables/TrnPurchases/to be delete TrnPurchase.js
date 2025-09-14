/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
    var dgrecord = Ext.data.Record.create([]);

    var Finyear = localStorage.getItem('gstyear');

    var accuserid = localStorage.getItem('accuserid');
    var powerid = localStorage.getItem('powerid');

   var compcode = localStorage.getItem('gincompcode');
   var ginfinid = localStorage.getItem('ginfinid');
   var finstdate = localStorage.getItem('gfinstdate');   
    
   var GinUser = localStorage.getItem('gstuser');
   var GinUserid = localStorage.getItem('ginuser');
   var gstfinyear = localStorage.getItem('gstyear');
   var fineddate = localStorage.getItem('gfineddate');  
    
   var compname = localStorage.getItem('gstcompany');


    var prefix;
    var fdbl_vendorcode;
    var purinvfreightflag = '';
    var fdbl_ledcode = 0;
    var fst_dbcrtype = "";
    var billvaluefibre = 0;
    var pst_cr, i;
    var totvalueall;
    var passedamt;
    var lednewcode = 0;
    var name = "";
    var dbcr_value = 0;
    var dbcr_type = "";
    var prefix1;
    var gintotqty;
    var val;
    var values;
    var typeofval;
    var valuenew;
    var typeas;
    var dbcrvalue = 0;
    var dbcrno = 0;
    var fdbl_dbcrvalue = 0;
    var tdsinclude = 0;
    var fst_dbcrno;
    var fstdbtype = "";
    var pst_minno, fst_storeinvmintype, pdbl_purrettaxval;
    var fin_dbcrrow, fstdbcrtype, typeacc;
    var typeofdr, pdbl_purret;
    var type, disval;
    var cntrow = 0;
    var womidbcrstatus, woDiscount, wotngst, woCST, woexduty, woAddExdutyval,
            woother1, wofreight, valuetot, womaxdate, roundofftype, roundoffvalue, fst_invno;
    var pst_crvalue;
    var dbcrseqnoold = 0;
    var fm1 = Ext.form;
    var fm = Ext.form;
    var netvaluenew = 0;
    var purinv_dbcr_flag = "";
    var yarnFlag = "";
    var amtnewpass = 0;
    var cgstvalue = 0;
    var sgstvalue = 0;
    var igstvalue = 0;
    var woroundoff = 0;
    var roundnew = 0;
    var Wominacctflag = '';
    var cgstreal = 0;
    var sgstreal = 0;
    var igstreal = 0;

    function saveclear() {
        flxDetailsmin.getStore().removeAll();
        flxDetails.getStore().removeAll();
        flxDetails1.getStore().removeAll();
        flxBillDetail.getStore().removeAll();
        RefreshData();
        dbnoteclear();
        btnok.show();
        dtpInvoiceDate.setRawValue(new Date().format('Y-m-d'));
        dtpVocherDate.setRawValue(new Date().format('Y-m-d'));
    }

    function saveclear1() {
        flxDetailsmin.getStore().removeAll();
        flxDetails.getStore().removeAll();
        flxDetails1.getStore().removeAll();
        flxBillDetail.getStore().removeAll();
    }

    function Purchasevendor() {
        VendornameDataStore.removeAll();
        //Ext.Msg.alert(prefix + ginfinid,compcode);
        VendornameDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'VendorName',
                prefix: prefix,
                gincompany: compcode,
                finid: ginfinid
            }
        });
    }

    function PurchaseNo() {
        txtVocherNo.setRawValue("");
        PurchseNoDataStore.removeAll();
        cmbVendorname.setRawValue("");
        cmbInvoiceNo.setRawValue("");
        txtAmt.setRawValue('');
        txtSuphead.setRawValue('');
        txtAmtpass.setRawValue('');
        txtTotVal.setRawValue('');
        dtpInvoiceDate.setRawValue(new Date().format('Y-m-d'));
        PurchseNoDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'PurchaseNo',
                prefix: prefix,
                ginfinid: ginfinid,
                gincompany: compcode
            },
            callback: function () {
                txtVocherNo.setRawValue(PurchseNoDataStore.getAt(0).get('accref_vouno'));
            }
        });
    }

    function CalTotAmtstore()
    {
        gintotqty = "";
        flxDetails.getSelectionModel().selectAll();
        var RowCnt = flxDetails.getStore().getCount();
        var sel1 = flxDetails.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotqty = Number(gintotqty) + Number(sel1[j].data.DebitAmtt);
        }
        totvalueall = Ext.util.Format.number(gintotqty, "0.00");
        txtTotVal.setValue(totvalueall);
        if (dbcr_value > 0) {
            passedamt = Ext.util.Format.number(gintotqty, "0.00") - Number(dbcr_value);
            txtAmtpass.setValue(passedamt);
        } else {
            passedamt = Ext.util.Format.number(gintotqty, "0.00");
            txtAmtpass.setValue(passedamt);
        }
    }

    var gintotqtyactual = 0;
    var gintotqtyactualresult = 0;
    var gintotqtyactual2 = 0;
    var gintotqtyactualresult2 = 0;
    var finalerror = "N";

    function Checkactual()
    {
        gintotqtyactual = "";
        gintotqtyactual2 = "";
        finalerror = "N";
        flxDetails1.getSelectionModel().selectAll();
        var RowCnt = flxDetails1.getStore().getCount();
        var sel1 = flxDetails1.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotqtyactual = Number(gintotqtyactual) + Number(sel1[j].data.DebitAmtt);
        }
        gintotqtyactualresult = Ext.util.Format.number(gintotqtyactual, "0.00");

        flxDetails.getSelectionModel().selectAll();
        var RowCnt1 = flxDetails.getStore().getCount();
        var sel11 = flxDetails.getSelectionModel().getSelections();
        for (var k = 0; k < RowCnt1; k++)
        {
            gintotqtyactual2 = Number(gintotqtyactual2) + Number(sel11[k].data.DebitAmtt);
        }
        gintotqtyactualresult2 = Ext.util.Format.number(gintotqtyactual2, "0.00");

        if (Number(gintotqtyactualresult) !== Number(gintotqtyactualresult2)) {
            finalerror = "Y";
        } else {
            finalerror = "N";
        }
        //alert(Number(gintotqtyactualresult) + '/' + Number(gintotqtyactualresult2) +"/"+ finalerror);
    }

    function roundoff() {
        var validatevalue = Ext.util.Format.number(Number(netvaluenew) - Number(totvalueall), '0.00');
        if (Number(validatevalue) < Number(1) && validatevalue !== 0) {
            itemname = "Round Off";
            cntrow = cntrow + 1;
            flxDetails.getStore().insert(
                    flxDetails.getStore().getCount(),
                    new dgrecord({
                        Sno: cntrow,
                        itemname: itemname,
                        itemsubgroupname: '',
                        Value: Ext.util.Format.number(validatevalue, "0.00"),
                        AccountName: 'STORE PURCHASE',
                        DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                        ValueDef: valuedef
                    })
                    );
            CalTotAmtstore();
        }
    }

    function CalTotAmt11()
    {
        gintotqty = "";
        flxDetails.getSelectionModel().selectAll();
        var RowCnt = flxDetails.getStore().getCount();
        var sel1 = flxDetails.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotqty = Number(gintotqty) + Number(sel1[j].data.DebitAmtt);
        }
        txtTotVal.setValue(Ext.util.Format.number(gintotqty, "0.00"));
        txtAmtpass.setValue(Ext.util.Format.number(gintotqty, "0.00"));
    }

    function CalTotAmt()
    {
        gintotqty = 0;
        val = 0;
        flxDetails.getSelectionModel().selectAll();
        var RowCnt = flxDetails.getStore().getCount();
        var sel1 = flxDetails.getSelectionModel().getSelections();
        for (var j = 0; j < RowCnt; j++)
        {
            gintotqty = Number(gintotqty) + Number(sel1[j].data.DebitAmtt);
        }
        if (fstdbtype == "D") {
            val = Number(gintotqty) - Number(fdbl_dbcrvalue);
            txtAmtpass.setRawValue(Ext.util.Format.number(val, "0.00"));
        } else {
            val = Number(gintotqty) + Number(fdbl_dbcrvalue);
            txtAmtpass.setRawValue(Ext.util.Format.number(val, "0.00"));
        }
        txtTotVal.setRawValue(Ext.util.Format.number(gintotqty, "0.00"));
    }

 function Stores_Itemlistnew() {
        if (prefix == 'Q') {
            if (cmbInvoiceNo.getRawValue() == "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            }
            StorePurchaseMinDataStore.removeAll();
            StorePurchaseDataStore.removeAll();
            StorePurchaseDetailsMinDataStore.removeAll();
            StoreDetailsMinTrailDataStore.removeAll();
            purinv_dbcr_flag = '';
            purinvfreightflag = '';
            fst_storeinvmintype = '';
            StorePurchaseDataStore.load({
                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                params: {
                    task: 'StorePurchase',
                    invseqno: cmbInvoiceNo.getValue(),
                    flag: 'S'
                },
                callback: function () {
                    var cnt = StorePurchaseDataStore.getCount();
                    if (cnt > 0) {
                        pst_minno = "";
                        netvaluenew = StorePurchaseDataStore.getAt(0).get('purinv_netvalue');
                        txtAmt.setValue(netvaluenew);
                        dtpInvoiceDate.setRawValue(StorePurchaseDataStore.getAt(0).get('purinv_date1'));
                        fst_storeinvmintype = StorePurchaseDataStore.getAt(0).get('purinv_mintype');
                        purinv_dbcr_flag = StorePurchaseDataStore.getAt(0).get('purinv_dbcr_flag');
                        purinvfreightflag = StorePurchaseDataStore.getAt(0).get('purinv_freight_flag');
                        StorePurchaseMinDataStore.load({
                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                            params: {
                                task: 'StorePurchaseMin',
                                invseqno: cmbInvoiceNo.getValue(),
                                flag: 'S'
                            },
                            callback: function () {
                                var cnt = StorePurchaseMinDataStore.getCount();
                                if (cnt > 0) {
                                    for (var i = 0; i < cnt; i++) {
                                        var pst_minno1 = StorePurchaseMinDataStore.getAt(i).get('purinv_min_seqno');
                                        flxDetailsmin.getStore().insert(
                                                flxDetailsmin.getStore().getCount(),
                                                new dgrecord({
                                                    pst_mi: pst_minno1
                                                })
                                                );
                                    }
                                    flxDetailsmin.getSelectionModel().selectAll();
                                    var selrows = flxDetailsmin.getSelectionModel().getCount();
                                    var sel = flxDetailsmin.getSelectionModel().getSelections();
                                    var pst_minno3 = 0;
                                    for (var a = 0; a < selrows; a++) {
                                        if (a == 0) {
                                            pst_minno3 = sel[a].data.pst_mi;
                                        } else {
                                            pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                        }
                                    }
                                    if (fst_storeinvmintype === 'M') {
                                        StorePurchaseDetailsMinDataStore.load({
                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                            params: {
                                                task: 'StorePurchaseDetails',
                                                minseqno: pst_minno3,
                                                flag: 'S'
                                            },
                                            callback: function () {
                                                var cnt = StorePurchaseDetailsMinDataStore.getCount();
                                                if (cnt > 0) {
                                                    StoreDetailsMinTrailDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'StoreDetailsMinTrail',
                                                            minseqno: pst_minno3,
                                                            flag: 'S'
                                                        },
                                                        callback: function () {
                                                            var cnt = StoreDetailsMinTrailDataStore.getCount();
                                                            if (cnt > 0) {
                                                                for (var a = 0; a < cnt; a++) {
                                                                    pdbl_purrettaxval = "";
                                                                    pst_cr = "";
                                                                    var itemname = StoreDetailsMinTrailDataStore.getAt(a).get('item_name');
                                                                    var itemgroup = StoreDetailsMinTrailDataStore.getAt(a).get('itemsubgroup_name');
                                                                    var itemminqty = StoreDetailsMinTrailDataStore.getAt(a).get('min_qty');
                                                                    var itempurret = StoreDetailsMinTrailDataStore.getAt(a).get('min_purret_qty');
                                                                    var itemunitrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_unit_rate');
                                                                    var mincostrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_cost_rate');
                                                                    var minfreightrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_freight_rate');
                                                                    var repmin = StoreDetailsMinTrailDataStore.getAt(a).get('repmin_qty');
                                                                    var repminunit = StoreDetailsMinTrailDataStore.getAt(a).get('repmin_unitval');
                                                                    //var totvalue = Ext.util.Format.number((Number(itemminqty) - Number(itempurret)) * Number(itemunitrate), "0.00");
                                                                    var totvalue = Ext.util.Format.number((Number(itemminqty)) * Number(itemunitrate), "0.00");
                                                                    if (Number(itempurret) > 0) {
                                                                        if (purinvfreightflag === "Y") {
                                                                            StoreDetailsMinTrailDataStore123.removeAll();
                                                                            StoreDetailsMinTrailDataStore123.load({
                                                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                params: {
                                                                                    task: 'StoreDetailsMinTrail123',
                                                                                    minseqno: pst_minno3,
                                                                                    flag: 'S'
                                                                                },
                                                                                callback: function () {
                                                                                    var cnt3 = StoreDetailsMinTrailDataStore123.getCount();
                                                                                    if (cnt3 > 0) {
                                                                                        for (i = 0; i < cnt3; i++) {
                                                                                            pdbl_purrettaxval = Number(pdbl_purrettaxval) + Number(StoreDetailsMinTrailDataStore123.getAt(0).get('qty'));
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        } else {
                                                                            pdbl_purrettaxval = Number(pdbl_purrettaxval) + (Number(itempurret) * Number(mincostrate)) - Number(itemunitrate) - Number(minfreightrate);
                                                                        }
                                                                    }

  								   if (compcode == 1) {
                                                                        var valuedef = 1461;
                                                                        cgstreal = 33201;
                                                                        sgstreal = 33202;
                                                                        igstreal = 33200;
									tcsreal = 37718;
                                                                    } else if (compcode == 4) {
                                                                        valuedef = 12898;
                                                                        cgstreal = 33204;
                                                                        sgstreal = 33205;
                                                                        igstreal = 33203;
									tcsreal =37719;
                                                                    } else if (compcode == 11) {
                                                                        valuedef = 34178;
                                                                        cgstreal = 34192;
                                                                        sgstreal = 34193;
                                                                        igstreal = 34194;
                                                                    }
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: itemname,
                                                                                itemsubgroupname: itemgroup,
                                                                                Value: Ext.util.Format.number(totvalue, "0.00"),
                                                                                AccountName: 'STORE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(totvalue, "0.00"),
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                }
                                                                MinlenDataStore.load({
                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                    params: {
                                                                        task: 'Minlen',
                                                                        minno: pst_minno3,
                                                                        flag: 'S',
                                                                        frght: purinvfreightflag
                                                                    },
                                                                    callback: function () {
                                                                        var cnt = MinlenDataStore.getCount();
                                                                        if (cnt > 0) {
                                                                            var fdbl_discount = MinlenDataStore.getAt(0).get('discount');
                                                                            var tngst = MinlenDataStore.getAt(0).get('tngst');
                                                                            var CST = MinlenDataStore.getAt(0).get('cst');
                                                                            var exciseduty = MinlenDataStore.getAt(0).get('exciseduty');
                                                                            var AddExduty_val = MinlenDataStore.getAt(0).get('AddExduty_val');
                                                                            var other1 = MinlenDataStore.getAt(0).get('other1');
                                                                            var min_clearing = MinlenDataStore.getAt(0).get('min_clearing');
                                                                            var min_licence = MinlenDataStore.getAt(0).get('min_licence');
                                                                            var min_freight_acctflag = MinlenDataStore.getAt(0).get('min_freight_acctflag');
                                                                            var cgst = MinlenDataStore.getAt(0).get('min_cgstvalue');
                                                                            var sgst = MinlenDataStore.getAt(0).get('min_sgstvalue');
                                                                            var igst = MinlenDataStore.getAt(0).get('min_igstvalue');
									    var tcsnew = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                            var freight = MinlenDataStore.getAt(0).get('freight');
                                                                            roundnew = MinlenDataStore.getAt(0).get('min_roundoffvalue');
                                                                            if (fdbl_discount > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Discount";
                                                                                disval = MinlenDataStore.getAt(0).get('discount') * Number(-1);
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (tngst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "State Sales Tax";
                                                                                disval = MinlenDataStore.getAt(0).get('tngst');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (cgst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "CGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_cgstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: cgstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (sgst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "SGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_sgstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: sgstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (igst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "IGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_igstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: igstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                                                                                                
                                                                                                                                                                                                                            											if (tcsnew > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "TCS RECOVERABLE ON PURCHASE";
                                                                                disval = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            ValueDef: tcsreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (Number(roundnew) > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "ROUND VALUE";
                                                                                disval = MinlenDataStore.getAt(0).get('min_roundoffvalue') * -1;
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (CST > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Central Sales Tax";
                                                                                disval = MinlenDataStore.getAt(0).get('cst');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (exciseduty > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Basic Custom Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('exciseduty');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (AddExduty_val > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Additional Excise Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('AddExduty_val');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (other1 > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Other charge1";
                                                                                disval = MinlenDataStore.getAt(0).get('other1');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_clearing > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Clearing charges";
                                                                                disval = MinlenDataStore.getAt(0).get('min_clearing');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_licence > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Licence Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('min_licence');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_freight_acctflag == "Y") {
                                                                                if (freight > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Freight";
                                                                                    disval = MinlenDataStore.getAt(0).get('freight');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                AccountName: 'STORE PURCHASE',
                                                                                                DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                            }
                                                                            MaxdateDataStore.removeAll();
                                                                            MaxdateDataStore.load({
                                                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                params: {
                                                                                    task: 'Maxdate',
                                                                                    minno: pst_minno3
                                                                                },
                                                                                callback: function () {
                                                                                    var cnt = MaxdateDataStore.getCount();
                                                                                    if (cnt > 0) {
                                                                                        dtpVocherDate.setRawValue(MaxdateDataStore.getAt(0).get('max_mindate'));
                                                                                    }
                                                                                }
                                                                            });
                                                                            if (purinv_dbcr_flag === "D") {
                                                                                fdbl_dbcrvalue = 0;
                                                                                fst_dbcrno = "";
                                                                                dbcr_value = 0;
                                                                                dbcr_type = "";
                                                                                DbcrnoteDataStore.removeAll();
                                                                                DbcrnoteDataStore.load({
                                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                    params: {
                                                                                        task: 'Dbcrnote',
                                                                                        Invno: cmbInvoiceNo.getRawValue(),
                                                                                        ledcode: fdbl_ledcode,
                                                                                        finid: ginfinid,
                                                                                        compcode: compcode,
                                                                                        flag: 'S'
                                                                                    },
                                                                                    callback: function () {
                                                                                        var cnt = 0;
                                                                                        cnt = DbcrnoteDataStore.getCount();
                                                                                        if (cnt > 0) {
                                                                                            dbcr_type = DbcrnoteDataStore.getAt(0).get('dbcr_type');
                                                                                            dbcr_value = DbcrnoteDataStore.getAt(0).get('dbcr_value');
                                                                                            fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');
                                                                                            fstdbtype = "D";
                                                                                            typeacc = "Debit Note";
                                                                                            if (Number(pdbl_purrettaxval) > 0) {

                                                                                            } else {
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeacc,
                                                                                                            Value: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );

                                                                                              /* cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: 'Adj',
                                                                                                            Value: Ext.util.Format.number(Number(dbcr_value) * Number(-1), "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(Number(dbcr_value) * Number(-1), "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );*/
                                                                                            }
                                                                                            if (Number(pdbl_purrettaxval) > 0) {
                                                                                                typeofdr = "Purchase Return Tax Value";
                                                                                                pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                                                                //pdbl_purret='-56.58';
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeofdr,
                                                                                                            Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );

                                                                                            }
                                                                                            CalTotAmtstore();

                                                                                            var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                            if (validatevalue !== 0) {
                                                                                                if (Number(validatevalue) < Number(1) && Number(validatevalue) > Number(-1)) {
                                                                                                    itemname = "Round Off";
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: itemname,
                                                                                                                itemsubgroupname: '',
                                                                                                                Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                AccountName: 'STORE PURCHASE',
                                                                                                                DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                ValueDef: valuedef
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmtstore();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                CalTotAmtstore();
                                                                                var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                if (validatevalue !== 0) {
                                                                                    if (Number(validatevalue) < Number(1) && Number(validatevalue) > Number(-1)) {
                                                                                        itemname = "Round Off";
                                                                                        cntrow = cntrow + 1;
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: itemname,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    AccountName: 'STORE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                        CalTotAmtstore();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                    }
                }
            })
        }
    }


    function Stores_Itemlist() {
        if (prefix == 'S') {
            if (cmbInvoiceNo.getRawValue() == "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            }
            StorePurchaseMinDataStore.removeAll();
            StorePurchaseDataStore.removeAll();
            StorePurchaseDetailsMinDataStore.removeAll();
            StoreDetailsMinTrailDataStore.removeAll();
            purinv_dbcr_flag = '';
            purinvfreightflag = '';
            fst_storeinvmintype = '';
            StorePurchaseDataStore.load({
                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                params: {
                    task: 'StorePurchase',
                    invseqno: cmbInvoiceNo.getValue(),
                    flag: prefix
                },
                callback: function () {
                    var cnt = StorePurchaseDataStore.getCount();
                    if (cnt > 0) {
                        pst_minno = "";
                        netvaluenew = StorePurchaseDataStore.getAt(0).get('purinv_netvalue');
                        txtAmt.setValue(netvaluenew);
                        dtpInvoiceDate.setRawValue(StorePurchaseDataStore.getAt(0).get('purinv_date1'));
                        fst_storeinvmintype = StorePurchaseDataStore.getAt(0).get('purinv_mintype');
                        purinv_dbcr_flag = StorePurchaseDataStore.getAt(0).get('purinv_dbcr_flag');
                        purinvfreightflag = StorePurchaseDataStore.getAt(0).get('purinv_freight_flag');
                        StorePurchaseMinDataStore.load({
                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                            params: {
                                task: 'StorePurchaseMin',
                                invseqno: cmbInvoiceNo.getValue(),
                                flag: prefix
                            },
                            callback: function () {
                                var cnt = StorePurchaseMinDataStore.getCount();
                                if (cnt > 0) {
                                    for (var i = 0; i < cnt; i++) {
                                        var pst_minno1 = StorePurchaseMinDataStore.getAt(i).get('purinv_min_seqno');
                                        flxDetailsmin.getStore().insert(
                                                flxDetailsmin.getStore().getCount(),
                                                new dgrecord({
                                                    pst_mi: pst_minno1
                                                })
                                                );
                                    }
                                    flxDetailsmin.getSelectionModel().selectAll();
                                    var selrows = flxDetailsmin.getSelectionModel().getCount();
                                    var sel = flxDetailsmin.getSelectionModel().getSelections();
                                    var pst_minno3 = 0;
                                    for (var a = 0; a < selrows; a++) {
                                        if (a == 0) {
                                            pst_minno3 = sel[a].data.pst_mi;
                                        } else {
                                            pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                        }
                                    }
                                    if (fst_storeinvmintype === 'M') {
                                        StorePurchaseDetailsMinDataStore.load({
                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                            params: {
                                                task: 'StorePurchaseDetails',
                                                minseqno: pst_minno3,
                                                flag: prefix
                                            },
                                            callback: function () {
                                                var cnt = StorePurchaseDetailsMinDataStore.getCount();
                                                if (cnt > 0) {
                                                    StoreDetailsMinTrailDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'StoreDetailsMinTrail',
                                                            minseqno: pst_minno3,
                                                            flag: prefix
                                                        },
                                                        callback: function () {
                                                            var cnt = StoreDetailsMinTrailDataStore.getCount();
                                                            if (cnt > 0) {
                                                                for (var a = 0; a < cnt; a++) {
                                                                    pdbl_purrettaxval = "";
                                                                    pst_cr = "";
                                                                    var itemname = StoreDetailsMinTrailDataStore.getAt(a).get('item_name');
                                                                    var itemgroup = StoreDetailsMinTrailDataStore.getAt(a).get('itemsubgroup_name');
                                                                    var itemminqty = StoreDetailsMinTrailDataStore.getAt(a).get('min_qty');
                                                                    var itempurret = StoreDetailsMinTrailDataStore.getAt(a).get('min_purret_qty');
                                                                    var itemunitrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_unit_rate');
                                                                    var mincostrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_cost_rate');
                                                                    var minfreightrate = StoreDetailsMinTrailDataStore.getAt(a).get('min_freight_rate');
                                                                    var repmin = StoreDetailsMinTrailDataStore.getAt(a).get('repmin_qty');
                                                                    var repminunit = StoreDetailsMinTrailDataStore.getAt(a).get('repmin_unitval');
                                                                    //var totvalue = Ext.util.Format.number((Number(itemminqty) - Number(itempurret)) * Number(itemunitrate), "0.00");
                                                                    var totvalue = Ext.util.Format.number((Number(itemminqty)) * Number(itemunitrate), "0.00");
                                                                    if (Number(itempurret) > 0) {
                                                                        if (purinvfreightflag === "Y") {
                                                                            StoreDetailsMinTrailDataStore123.removeAll();
                                                                            StoreDetailsMinTrailDataStore123.load({
                                                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                params: {
                                                                                    task: 'StoreDetailsMinTrail123',
                                                                                    minseqno: pst_minno3,
                                                                                    flag: 'S'
                                                                                },
                                                                                callback: function () {
                                                                                    var cnt3 = StoreDetailsMinTrailDataStore123.getCount();
                                                                                    if (cnt3 > 0) {
                                                                                        for (i = 0; i < cnt3; i++) {
                                                                                            pdbl_purrettaxval = Number(pdbl_purrettaxval) + Number(StoreDetailsMinTrailDataStore123.getAt(0).get('qty'));
                                                                                        }
                                                                                    }
                                                                                }
                                                                            });
                                                                        } else {
                                                                            pdbl_purrettaxval = Number(pdbl_purrettaxval) + (Number(itempurret) * Number(mincostrate)) - Number(itemunitrate) - Number(minfreightrate);
                                                                        }
                                                                    }

                                                                    if (compcode == 1) {
                                                                        var valuedef = 1461;
                                                                        cgstreal = 33201;
                                                                        sgstreal = 33202;
                                                                        igstreal = 33200;
									tcsreal = 37718;
                                                                    } else if (compcode == 4) {
                                                                        valuedef = 12898;
                                                                        cgstreal = 33204;
                                                                        sgstreal = 33205;
                                                                        igstreal = 33203;
									tcsreal =37719;
                                                                    } else if (compcode == 11) {
                                                                        valuedef = 34178;
                                                                        cgstreal = 34192;
                                                                        sgstreal = 34193;
                                                                        igstreal = 34194;
                                                                    }
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: itemname,
                                                                                itemsubgroupname: itemgroup,
                                                                                Value: Ext.util.Format.number(totvalue, "0.00"),
                                                                                AccountName: 'STORE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(totvalue, "0.00"),
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                }
                                                                MinlenDataStore.load({
                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                    params: {
                                                                        task: 'Minlen',
                                                                        minno: pst_minno3,
                                                                        flag: prefix,
                                                                        frght: purinvfreightflag
                                                                    },
                                                                    callback: function () {
                                                                        var cnt = MinlenDataStore.getCount();
                                                                        if (cnt > 0) {
                                                                            var fdbl_discount = MinlenDataStore.getAt(0).get('discount');
                                                                            var tngst = MinlenDataStore.getAt(0).get('tngst');
                                                                            var CST = MinlenDataStore.getAt(0).get('cst');
                                                                            var exciseduty = MinlenDataStore.getAt(0).get('exciseduty');
                                                                            var AddExduty_val = MinlenDataStore.getAt(0).get('AddExduty_val');
                                                                            var other1 = MinlenDataStore.getAt(0).get('other1');
                                                                            var min_clearing = MinlenDataStore.getAt(0).get('min_clearing');
                                                                            var min_licence = MinlenDataStore.getAt(0).get('min_licence');
                                                                            var min_freight_acctflag = MinlenDataStore.getAt(0).get('min_freight_acctflag');
                                                                            var cgst = MinlenDataStore.getAt(0).get('min_cgstvalue');
                                                                            var sgst = MinlenDataStore.getAt(0).get('min_sgstvalue');
                                                                            var igst = MinlenDataStore.getAt(0).get('min_igstvalue');
                                                                            var tcsnew = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                            var freight = MinlenDataStore.getAt(0).get('freight');
                                                                            roundnew = MinlenDataStore.getAt(0).get('min_roundoffvalue');
                                                                            if (fdbl_discount > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Discount";
                                                                                disval = MinlenDataStore.getAt(0).get('discount') * Number(-1);
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (tngst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "State Sales Tax";
                                                                                disval = MinlenDataStore.getAt(0).get('tngst');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (cgst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "CGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_cgstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: cgstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (sgst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "SGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_sgstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: sgstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (igst > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "IGST INPUT";
                                                                                disval = MinlenDataStore.getAt(0).get('min_igstvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: igstreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (tcsnew > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "TCS RECOVERABLE ON PURCHASE";
                                                                                disval = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            ValueDef: tcsreal
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (Number(roundnew) > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "ROUND VALUE";
                                                                                disval = MinlenDataStore.getAt(0).get('min_roundoffvalue') * -1;
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (CST > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Central Sales Tax";
                                                                                disval = MinlenDataStore.getAt(0).get('cst');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (exciseduty > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Basic Custom Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('exciseduty');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (AddExduty_val > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Additional Excise Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('AddExduty_val');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (other1 > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Other charge1";
                                                                                disval = MinlenDataStore.getAt(0).get('other1');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_clearing > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Clearing charges";
                                                                                disval = MinlenDataStore.getAt(0).get('min_clearing');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_licence > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "Licence Duty";
                                                                                disval = MinlenDataStore.getAt(0).get('min_licence');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(disval, "0.00"),
                                                                                            AccountName: 'STORE PURCHASE',
                                                                                            DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                            ValueDef: valuedef
                                                                                        })
                                                                                        );
                                                                            }
                                                                            if (min_freight_acctflag == "Y") {
                                                                                if (freight > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Freight";
                                                                                    disval = MinlenDataStore.getAt(0).get('freight');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                AccountName: 'STORE PURCHASE',
                                                                                                DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                            }
                                                                            MaxdateDataStore.removeAll();
                                                                            MaxdateDataStore.load({
                                                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                params: {
                                                                                    task: 'Maxdate',
                                                                                    minno: pst_minno3
                                                                                },
                                                                                callback: function () {
                                                                                    var cnt = MaxdateDataStore.getCount();
                                                                                    if (cnt > 0) {
                                                                                        dtpVocherDate.setRawValue(MaxdateDataStore.getAt(0).get('max_mindate'));
                                                                                    }
                                                                                }
                                                                            });
                                                                            if (purinv_dbcr_flag === "D") {
                                                                                fdbl_dbcrvalue = 0;
                                                                                fst_dbcrno = "";
                                                                                dbcr_value = 0;
                                                                                dbcr_type = "";
                                                                                DbcrnoteDataStore.removeAll();
                                                                                DbcrnoteDataStore.load({
                                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                    params: {
                                                                                        task: 'Dbcrnote',
                                                                                        Invno: cmbInvoiceNo.getRawValue(),
                                                                                        ledcode: fdbl_ledcode,
                                                                                        finid: ginfinid,
                                                                                        compcode: compcode,
                                                                                        flag: 'S'
                                                                                    },
                                                                                    callback: function () {
                                                                                        var cnt = 0;
                                                                                        cnt = DbcrnoteDataStore.getCount();
                                                                                        if (cnt > 0) {
                                                                                            dbcr_type = DbcrnoteDataStore.getAt(0).get('dbcr_type');
                                                                                            dbcr_value = DbcrnoteDataStore.getAt(0).get('dbcr_value');
                                                                                            fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');
                                                                                            fstdbtype = "D";
                                                                                            typeacc = "Debit Note";
                                                                                            if (Number(pdbl_purrettaxval) > 0) {

                                                                                            } else {
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeacc,
                                                                                                            Value: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );

                                                                                              /* cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: 'Adj',
                                                                                                            Value: Ext.util.Format.number(Number(dbcr_value) * Number(-1), "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(Number(dbcr_value) * Number(-1), "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );*/
                                                                                            }
                                                                                            if (Number(pdbl_purrettaxval) > 0) {
                                                                                                typeofdr = "Purchase Return Tax Value";
                                                                                                pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                                                                //pdbl_purret='-56.58';
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeofdr,
                                                                                                            Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                            AccountName: 'STORE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );

                                                                                            }
                                                                                            CalTotAmtstore();

                                                                                            var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                            if (validatevalue !== 0) {
                                                                                                if (Number(validatevalue) < Number(1) && Number(validatevalue) > Number(-1)) {
                                                                                                    itemname = "Round Off";
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: itemname,
                                                                                                                itemsubgroupname: '',
                                                                                                                Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                AccountName: 'STORE PURCHASE',
                                                                                                                DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                ValueDef: valuedef
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmtstore();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                CalTotAmtstore();
                                                                                var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                if (validatevalue !== 0) {
                                                                                    if (Number(validatevalue) < Number(1) && Number(validatevalue) > Number(-1)) {
                                                                                        itemname = "Round Off";
                                                                                        cntrow = cntrow + 1;
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: itemname,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    AccountName: 'STORE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                        CalTotAmtstore();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                    }
                }
            })
        }
    }
var tcsreal=0;
    function Yarn_Itemlist() {
        YarnPurchaseDataStore.removeAll();
        YarnPurchaseTrailDataStore.removeAll();
        Dbcrnote1DataStore.removeAll();
        YarnPurchaseDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'YarnPurchase',
                invno: cmbInvoiceNo.getRawValue(),
                ledcode: fdbl_vendorcode,
                finid: ginfinid,
                compcode: compcode
            },
            callback: function () {
                var cnt2 = YarnPurchaseDataStore.getCount();
                if (cnt2 > 0) {
                    txtAmt.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_netvalue'));
                    dtpInvoiceDate.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Date1'));
                    dtpVocherDate.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inward_DC_date1'));
                    yarnFlag = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_freight_acctflag');
                    var inwardqty = YarnPurchaseDataStore.getAt(0).get('Yarn_Inward_grossvalue');
                    var accname = '';
                    YarnPurchaseTrailDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'YarnPurchaseTrail',
                            invno: cmbInvoiceNo.getRawValue(),
                            ledcode: fdbl_vendorcode,
                            finid: ginfinid,
                            compcode: compcode
                        },
                        callback: function () {
                            var cnt = YarnPurchaseTrailDataStore.getCount();
                            if (cnt > 0) {
                                for (var i = 0; i < cnt; i++) {
                                    var count_prefix = YarnPurchaseTrailDataStore.getAt(i).get('count_prefix');
                                    var Yarn_Inv_qty = YarnPurchaseTrailDataStore.getAt(i).get('Yarn_Inv_qty');
                                    var yarn_inv_rate = YarnPurchaseTrailDataStore.getAt(i).get('Yarn_Inv_rate');
                                    var Yarn_Inv_tngst_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_tngst_val');
                                    var Yarn_Inv_cst_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_cst_val');
                                    var Yarn_Inv_Tax_Flag = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Tax_Flag');
                                    var Yarn_Inv_Bed_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Bed_value');
                                    var Yarn_Inv_Aed_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Aed_value');
                                    var Yarn_Inv_Insurance_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Insurance_value');
                                    var Yarn_Inv_surcharge_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_surcharge_val');
                                    var Yarn_Inv_othercharges_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_othercharges_val');
                                    var Yarn_Inv_cess_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_cess_value');
                                    var Yarn_Inv_freight_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_freight_val');
                                    var Yarn_Inv_discount = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_discount');
                                    var Yarn_Inv_Cgst = YarnPurchaseDataStore.getAt(i).get('yarn_cgst');
                                    var Yarn_Inv_Igst = YarnPurchaseDataStore.getAt(i).get('yarn_igst');
                                    var Yarn_Inv_Sgst = YarnPurchaseDataStore.getAt(i).get('yarn_sgst');
                                    var Yarn_Inv_Round_amt = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Round_amt');
                                    var Yarn_Inv_TCS= YarnPurchaseDataStore.getAt(i).get('yarn_tcs');
                                    if (Yarn_Inv_Tax_Flag === "Y") {
                                        valuenew = Number(Yarn_Inv_qty) * Number(yarn_inv_rate);
                                        pst_cr = Number(pst_cr) + (Number(Yarn_Inv_qty) * Number(yarn_inv_rate));
                                    } else {
                                        valuenew = ((Number(Yarn_Inv_qty) * Number(yarn_inv_rate)) - ((Number(Yarn_Inv_tngst_val) + Number(Yarn_Inv_cst_val)) / Number(inwardqty)) * Number(Yarn_Inv_qty));
                                        pst_cr = (Number(pst_cr) + (Number(Yarn_Inv_qty) * Number(yarn_inv_rate)) - ((Number(Yarn_Inv_tngst_val) + Number(Yarn_Inv_cst_val)) / Number(inwardqty)) * Number(Yarn_Inv_qty));
                                    }
                                    accname = 'YARN PURCHASE LOCAL';
                                    if (compcode == 1) {
                                        accname = 'YARN PURCHASE LOCAL';
                                        var valuedef = 1456;
                                        cgstreal = 33201;
                                        sgstreal = 33202;
                                        igstreal = 33200;
                                        tcsreal = 37718;
                                    } else if (compcode == 4) {
                                        accname = 'YARN PURCHASES - LOCAL';
                                        valuedef = 13264;
                                        cgstreal = 33204;
                                        sgstreal = 33205;
                                        igstreal = 33203;
					tcsreal =37719;
                                    }

                                    var Value = Ext.util.Format.number(Number(valuenew), "0.000");
                                    cntrow = cntrow + 1;
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: count_prefix,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(Value), "0.00"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(Value), "0.00"),
                                                ValueDef: valuedef
                                            })
                                            );
                                    CalTotAmt();
                                }

                                if (Yarn_Inv_Cgst > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('yarn_cgst');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'CGST INPUT';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: 'CGST INPUT',
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: cgstreal
                                            })
                                            );
                                }
                                if (Yarn_Inv_Sgst > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('yarn_sgst');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'SGST INPUT';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: 'SGST INPUT',
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: sgstreal
                                            })
                                            );
                                }
                                if (Yarn_Inv_Igst > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('yarn_igst');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'IGST INPUT';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: 'IGST INPUT',
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: igstreal
                                            })
                                            );
                                }

                                if (Yarn_Inv_TCS > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('yarn_tcs');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'TCS RECOVERABLE ON PURCHASE';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: 'TCS RECOVERABLE ON PURCHASE',
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: tcsreal
                                            })
                                            );
                                }
                                if (Yarn_Inv_Bed_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Bed_value');
                                    pst_cr = Number(pst_cr) + Number(values);  
                                    typeofval = 'Basic Custom Duty';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_Aed_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Aed_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Additional Excise Duty';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_Insurance_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Insurance_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Insurance Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_cst_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_cst_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Cst Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_tngst_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_tngst_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'State Sales Tax';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_surcharge_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_surcharge_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Surharge Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_othercharges_val > 0 || Yarn_Inv_othercharges_val < 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_othercharges_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Other Charges';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_cess_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_cess_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Cess';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (yarnFlag === "Y") {
                                    if (Yarn_Inv_freight_val > 0) {
                                        cntrow = cntrow + 1;
                                        values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_freight_val');
                                        pst_cr = Number(pst_cr) + Number(values);
                                        typeofval = 'Freight';
                                        flxDetails.getStore().insert(
                                                flxDetails.getStore().getCount(),
                                                new dgrecord({
                                                    Sno: cntrow,
                                                    itemname: typeofval,
                                                    itemsubgroupname: '',
                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                    AccountName: accname,
                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                    ValueDef: valuedef
                                                })
                                                );
                                    }
                                }
                                if (Yarn_Inv_discount > 0 || Yarn_Inv_discount < 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_discount');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Discount';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }
                                if (Yarn_Inv_Round_amt !== 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Round_amt');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Round Off';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: Ext.util.Format.number(Number(values), "0.000"),
                                                AccountName: accname,
                                                DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                ValueDef: valuedef
                                            })
                                            );
                                }

                                CalTotAmt();
                                Dbcrnote1DataStore.load({
                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                    params: {
                                        task: 'Dbcrnote1',
                                        Invno: cmbInvoiceNo.getRawValue(),
                                        ledcode: fdbl_ledcode,
                                        finid: ginfinid,
                                        compcode: compcode
                                    },
                                    callback: function () {
                                        var cnt = Dbcrnote1DataStore.getCount();
                                        if (cnt > 0) {
                                            dbcr_type = Dbcrnote1DataStore.getAt(0).get('dbcr_type');
                                            dbcr_value = Dbcrnote1DataStore.getAt(0).get('dbcr_value');
                                            fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');
                                            if (dbcr_type == "DN") {
                                                typeas = "Debit note";
                                                fstdbtype = "D";
                                            } else {
                                                fstdbtype = "C";
                                                typeas = "Credit note";
                                            }
                                            cntrow = cntrow + 1;
                                            flxDetails.getStore().insert(
                                                    flxDetails.getStore().getCount(),
                                                    new dgrecord({
                                                        Sno: cntrow,
                                                        itemname: typeas,
                                                        itemsubgroupname: '',
                                                        Value: Ext.util.Format.number(Number(dbcr_value), "0.000"),
                                                        AccountName: accname,
                                                        DebitAmtt: Ext.util.Format.number(Number(dbcr_value), "0.000"),
                                                        ValueDef: valuedef
                                                    })
                                                    );
                                            CalTotAmt();
                                        }
                                    }
                                });
                            }
                        }
                    });
                    if (txtAmt.getRawValue() !== txtTotVal.getRawValue() && txtAmt.getRawValue() !== 0 && Number(txtAmt.getRawValue() - txtTotVal.getRawValue() > 1)) {
                        //   Ext.Msg.alert("Alert","Bill not entered correctly, Contact Purchase. You cannot account this bill");
                    }
                } else {
                    Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                }
            }
        })
    }

    function Cotton_Itemlist() {
        if (prefix === 'CT') {
            if (cmbInvoiceNo.getRawValue() === "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            } else {
                StorePurchaseMinDataStore.removeAll();
                StorePurchaseDataStore.removeAll();
                StorePurchaseDetailsMinDataStore.removeAll();
                StoreDetailsMinTrailDataStore.removeAll();
                StorePurchaseDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'StorePurchase',
                        invseqno: cmbInvoiceNo.getValue(),
                        flag: 'CT',
                        finid: Finyear,
                        ledcode: fdbl_vendorcode,
                        millname: cmbMillName.getValue()
                    },
                    callback: function () {
                        var cnt = StorePurchaseDataStore.getCount();
                        if (cnt > 0) {
                            dtpVocherDate.setRawValue(StorePurchaseDataStore.getAt(0).get('ldate'));
                            dtpInvoiceDate.setRawValue(StorePurchaseDataStore.getAt(0).get('lldate'));
                            var inv_h_netamt = StorePurchaseDataStore.getAt(0).get('inv_h_netamt');
                            var g_purinvno = StorePurchaseDataStore.getAt(0).get('g_purinvno');
                            var g_milid = StorePurchaseDataStore.getAt(0).get('g_milid');
                            if (inv_h_netamt == 0) {
                                txtAmt.setRawValue("0");
                            } else {
                                txtAmt.setRawValue(inv_h_netamt);
                            }
                            CottonTrailereDataStore.load({
                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                params: {
                                    task: 'CottonTrailere',
                                    invseqno: g_purinvno,
                                    finid: Finyear,
                                    millname: g_milid
                                },
                                callback: function () {
                                    var cnt = CottonTrailereDataStore.getCount();
                                    if (cnt > 0) {
                                        pst_cr = 0;
                                        for (i = 0; i < cnt; i++) {
                                            var var_desc = CottonTrailereDataStore.getAt(i).get("var_desc");
                                            var inv_h_grossamt = StorePurchaseDataStore.getAt(i).get("inv_h_grossamt");
                                            cntrow = cntrow + 1;
                                            flxDetails.getStore().insert(
                                                    flxDetails.getStore().getCount(),
                                                    new dgrecord({
                                                        Sno: cntrow,
                                                        itemname: var_desc,
                                                        itemsubgroupname: '',
                                                        Value: Ext.util.Format.number(inv_h_grossamt, "0.00"),
                                                        AccountName: 'COTTON PURCHASE (INTERSTATE)',
                                                        DebitAmtt: Ext.util.Format.number(inv_h_grossamt, "0.00"),
                                                        ValueDef: '1448'
                                                    })
                                                    );
                                            var inv_h_purcgst = StorePurchaseDataStore.getAt(i).get("purinv_cgst");
                                            var inv_h_pursgst = StorePurchaseDataStore.getAt(i).get("purinv_sgst");
                                            var inv_h_purigst = StorePurchaseDataStore.getAt(i).get("purinv_igst");
                                            var inv_h_purspot = StorePurchaseDataStore.getAt(i).get("purinv_spotvalue");
                                            var inv_h_purinsc = StorePurchaseDataStore.getAt(i).get("purinv_inc");
                                            var inv_h_roundoff = StorePurchaseDataStore.getAt(i).get("inv_h_roundoff");
                                            var inv_h_tcs = StorePurchaseDataStore.getAt(i).get("purinv_tcs");

                                            var type, newvalue;
                                            if (compcode == 1) {
                                                cgstreal = 33201;
                                                sgstreal = 33202;
                                                igstreal = 33200;
						tcsreal = 37718;
                                            } else if (compcode == 4) {
                                                cgstreal = 33204;
                                                sgstreal = 33205;
                                                igstreal = 33203;
						tcsreal =37719;
                                            } else if (compcode == 11) {
                                                cgstreal = 34192;
                                                sgstreal = 34193;
                                                igstreal = 34194;
                                            }
                                            if (inv_h_purcgst > 0) {
                                                cntrow = cntrow + 1;
                                                type = "CGST INPUT";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_cgst");
                                                pst_cr = Number(pst_cr) + Number(StorePurchaseDataStore.getAt(i).get("purinv_cgst"));
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: type,
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: cgstreal
                                                        })
                                                        );
                                            }
                                            if (inv_h_pursgst > 0) {
                                                cntrow = cntrow + 1;
                                                type = "SGST INPUT";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_sgst");
                                                pst_cr = Number(pst_cr) + Number(StorePurchaseDataStore.getAt(i).get("purinv_sgst"));
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: type,
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: sgstreal
                                                        })
                                                        );
                                            }
                                            if (inv_h_purigst > 0) {
                                                cntrow = cntrow + 1;
                                                type = "IGST INPUT";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_igst");
                                                pst_cr = Number(pst_cr) + Number(StorePurchaseDataStore.getAt(i).get("purinv_igst"));
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: type,
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: igstreal
                                                        })
                                                        );
                                            }
                                            if (inv_h_purspot > 0) {
                                                cntrow = cntrow + 1;
                                                type = "SPOT";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_spotvalue");
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: 'COTTON PURCHASE (INTERSTATE)',
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: '1448'
                                                        })
                                                        );
                                            }

                                            if (inv_h_tcs > 0) {
                                                cntrow = cntrow + 1;
                                                type = "TCS RECOVERABLE ON PURCHASE";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_tcs");
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: 'TCS RECOVERABLE ON PURCHASE',
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: tcsreal
                                                        })
                                                        );
                                            }
                                            if (inv_h_purinsc > 0) {
                                                cntrow = cntrow + 1;
                                                type = "INSC";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("purinv_inc");
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: 'COTTON PURCHASE (INTERSTATE)',
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: '1448'
                                                        })
                                                        );
                                            }
                                            if (inv_h_roundoff !== 0) {
                                                cntrow = cntrow + 1;
                                                type = "Round";
                                                newvalue = StorePurchaseDataStore.getAt(i).get("inv_h_roundoff");
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: type,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(newvalue, "0.00"),
                                                            AccountName: 'COTTON PURCHASE (INTERSTATE)',
                                                            DebitAmtt: Ext.util.Format.number(newvalue, "0.00"),
                                                            ValueDef: '1448'
                                                        })
                                                        );
                                            }
                                            gintotqty = "";
                                            flxDetails.getSelectionModel().selectAll();
                                            var RowCnt = flxDetails.getStore().getCount();
                                            var sel1 = flxDetails.getSelectionModel().getSelections();
                                            for (var j = 0; j < RowCnt; j++)
                                            {
                                                gintotqty = Number(gintotqty) + Number(sel1[j].data.DebitAmtt);
                                            }
                                            txtTotVal.setValue(Ext.util.Format.number(gintotqty, "0.00"));
                                            txtAmtpass.setValue(Ext.util.Format.number(gintotqty, "0.00"));
                                        }
                                    }
                                }
                            });
                        } else {
                            Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                        }
                    }
                });
            }
        }
    }

    function workorder_Itemlist() {
        if (cmbInvoiceNo.getRawValue() === "") {
            Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
        }
        WorkorderMinHeaderDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'WorkorderMinHeader',
                seqno: cmbInvoiceNo.getValue()
            },
            callback: function () {
                var cnt1 = WorkorderMinHeaderDataStore.getCount();
                if (cnt1 > 0) {
                    pst_minno = "";
                    txtAmt.setValue(WorkorderMinHeaderDataStore.getAt(0).get('Womin_netvalue'));
                    dtpInvoiceDate.setRawValue(WorkorderMinHeaderDataStore.getAt(0).get('date1'));
                    fst_storeinvmintype = "M";
                    womidbcrstatus = WorkorderMinHeaderDataStore.getAt(0).get('Womin_dbcrstatus');
                    WorkorderSeqnoDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'WorkorderSeqno',
                            seqno: cmbInvoiceNo.getValue()
                        },
                        callback: function () {
                            var cnt2 = WorkorderSeqnoDataStore.getCount();
                            if (cnt2 > 0) {
                                for (var i = 0; i < cnt2; i++) {
                                    var pst_minno1 = WorkorderSeqnoDataStore.getAt(i).get('Womin_seqno');
                                    flxDetailsmin.getStore().insert(
                                            flxDetailsmin.getStore().getCount(),
                                            new dgrecord({
                                                pst_mi: pst_minno1
                                            })
                                            );
                                }
                                flxDetailsmin.getSelectionModel().selectAll();
                                var selrows = flxDetailsmin.getSelectionModel().getCount();
                                var sel = flxDetailsmin.getSelectionModel().getSelections();
                                var pst_minno3 = 0;
                                for (var a = 0; a < selrows; a++) {
                                    if (a == 0) {
                                        pst_minno3 = sel[a].data.pst_mi;
                                    } else {
                                        pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                    }
                                }
                                if (compcode == 1) {
                                    var valuedef = 1461;
                                } else if (compcode == 4) {
                                    valuedef = 12898;
                                } else if (compcode == 11) {
                                    valuedef = 34178;
                                }
                                if (compcode == 1) {
                                    cgstreal = 33201;
                                    sgstreal = 33202;
                                    igstreal = 33200;
                                } else if (compcode == 4) {
                                    cgstreal = 33204;
                                    sgstreal = 33205;
                                    igstreal = 33203;
                                } else if (compcode == 11) {
                                    cgstreal = 34192;
                                    sgstreal = 34193;
                                    igstreal = 34194;
                                }
                                WorkorderDetailstrailDataStore.load({
                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                    params: {
                                        task: 'WorkorderDetailstrail',
                                        wominseqno: pst_minno3
                                    },
                                    callback: function () {
                                        var cnt3 = WorkorderDetailstrailDataStore.getCount();
                                        if (cnt3 > 0) {
                                            pst_cr = "";
                                            for (i = 0; i < cnt3; i++) {
                                                var Womin_remarks = WorkorderDetailstrailDataStore.getAt(i).get('Womin_remarks');
                                                var Womin_unit_rate = WorkorderDetailstrailDataStore.getAt(i).get('Womin_unit_rate');
                                                cntrow = cntrow + 1;
                                                flxDetails.getStore().insert(
                                                        flxDetails.getStore().getCount(),
                                                        new dgrecord({
                                                            Sno: cntrow,
                                                            itemname: Womin_remarks,
                                                            itemsubgroupname: '',
                                                            Value: Ext.util.Format.number(Womin_unit_rate, "0.00"),
                                                            AccountName: 'STORE PURCHASE',
                                                            DebitAmtt: Ext.util.Format.number(Womin_unit_rate, "0.00"),
                                                            ValueDef: valuedef
                                                        })
                                                        );
                                                CalTotAmt();
                                            }
                                            WorkorderDetailsRecDataStore.load({
                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                params: {
                                                    task: 'WorkorderDetailsRec',
                                                    seqno: pst_minno3
                                                },
                                                callback: function () {
                                                    var cnt4 = WorkorderDetailsRecDataStore.getCount();
                                                    if (cnt4 > 0) {
                                                        cgstvalue = 0;
                                                        sgstvalue = 0;
                                                        igstvalue = 0;
                                                        woDiscount = WorkorderDetailsRecDataStore.getAt(0).get('discount');
                                                        wotngst = WorkorderDetailsRecDataStore.getAt(0).get('tngst');
                                                        woCST = WorkorderDetailsRecDataStore.getAt(0).get('cst');
                                                        woexduty = WorkorderDetailsRecDataStore.getAt(0).get('exciseduty');
                                                        woAddExdutyval = WorkorderDetailsRecDataStore.getAt(0).get('AddExduty_val');
                                                        woother1 = WorkorderDetailsRecDataStore.getAt(0).get('other1');
                                                        wofreight = WorkorderDetailsRecDataStore.getAt(0).get('freight');
                                                        Wominacctflag = WorkorderDetailsRecDataStore.getAt(0).get('Womin_freight_acctflag');
                                                        cgstvalue = WorkorderDetailsRecDataStore.getAt(0).get('cgst');
                                                        sgstvalue = WorkorderDetailsRecDataStore.getAt(0).get('sgst');
                                                        igstvalue = WorkorderDetailsRecDataStore.getAt(0).get('igst');
                                                        woroundoff = WorkorderDetailsRecDataStore.getAt(0).get('Womin_roundoffvalue');
                                                        if (cgstvalue > 0) {
                                                            cntrow = cntrow + 1;
                                                            var Wtype = "CGST INPUT";
                                                            pst_cr = Number(pst_cr) - Number(cgstvalue);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('cgst');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: Wtype,
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: cgstreal
                                                                    }));
                                                        }
                                                        if (sgstvalue > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "SGST INPUT";
                                                            pst_cr = Number(pst_cr) - Number(sgstvalue);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('sgst');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: Wtype,
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: sgstreal
                                                                    }));
                                                        }
                                                        if (igstvalue > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "IGST INPUT";
                                                            pst_cr = Number(pst_cr) - Number(igstvalue);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('igst');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: Wtype,
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: igstreal
                                                                    }));
                                                        }
                                                        if (woroundoff !== 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Round Off";
                                                            pst_cr = Number(pst_cr) - Number(woroundoff);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('Womin_roundoffvalue');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (woDiscount > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Discount";
                                                            pst_cr = Number(pst_cr) - Number(woDiscount);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('discount') * Number(-1);
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (woexduty > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Basic Custom Duty";
                                                            pst_cr = Number(pst_cr) + Number(woexduty);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('exciseduty');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (wotngst > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "State Sales Tax";
                                                            pst_cr = Number(pst_cr) + Number(wotngst);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('tngst');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (woCST > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Central Sales Tax";
                                                            pst_cr = Number(pst_cr) + Number(woCST);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('cst');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (woother1 > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Other charge1";
                                                            pst_cr = Number(pst_cr) + Number(woother1);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('other1');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (woAddExdutyval > 0) {
                                                            cntrow = cntrow + 1;
                                                            Wtype = "Additional Excise Duty";
                                                            pst_cr = Number(pst_cr) + Number(woAddExdutyval);
                                                            valuetot = WorkorderDetailsRecDataStore.getAt(0).get('AddExduty_val');
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: Wtype,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                        ValueDef: valuedef
                                                                    }));
                                                        }
                                                        if (Wominacctflag === "Y") {
                                                            cntrow = cntrow + 1;
                                                            if (wofreight > 0) {
                                                                Wtype = "Freight";
                                                                pst_cr = Number(pst_cr) + Number(wofreight);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('freight');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: valuedef
                                                                        }));
                                                            }
                                                        }
                                                        CalTotAmt();
                                                    }
                                                }
                                            });
                                            if (fst_storeinvmintype === "M") {
                                                WorkOrderMaxDateDataStore.load({
                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                    params: {
                                                        task: 'WorkOrderMaxDate',
                                                        minno: pst_minno3
                                                    },
                                                    callback: function () {
                                                        var cnt = WorkOrderMaxDateDataStore.getCount();
                                                        if (cnt > 0) {
                                                            womaxdate = WorkOrderMaxDateDataStore.getAt(0).get('Womin_date');
                                                            dtpVocherDate.setRawValue(womaxdate);
                                                        }
                                                    }
                                                });
                                            } else {
                                                WorkOrderMaxDateDataStore.load({
                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                    params: {
                                                        task: 'WorkOrderMaxDate',
                                                        minno: pst_minno3
                                                    },
                                                    callback: function () {
                                                        var cnt = WorkOrderMaxDateDataStore.getCount();
                                                        if (cnt > 0) {
                                                            womaxdate = WorkOrderMaxDateDataStore.getAt(0).get('Womin_date');
                                                            dtpVocherDate.setRawValue(womaxdate);
                                                        }
                                                    }
                                                });
                                            }
                                            txtTotVal.setRawValue(pst_cr);
                                            fdbl_dbcrvalue = 0;
                                            fin_dbcrrow = 0;
                                            fst_dbcrno = "";
                                            fstdbcrtype = "";
                                            if (womidbcrstatus !== "N") {
                                                txtTotVal.setRawValue(pst_cr);
                                                DbcrnoteWorkOrderDataStore.load({
                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                    params: {
                                                        task: 'DbcrnoteWorkOrder',
                                                        Invno: cmbInvoiceNo.getRawValue(),
                                                        ledcode: fdbl_ledcode,
                                                        finid: ginfinid,
                                                        compcode: compcode
                                                    },
                                                    callback: function () {
                                                        var cnt = DbcrnoteWorkOrderDataStore.getCount();
                                                        if (cnt > 0) {
                                                            dbcr_type = DbcrnoteWorkOrderDataStore.getAt(0).get('dbcr_type');
                                                            fdbl_dbcrvalue = DbcrnoteWorkOrderDataStore.getAt(0).get('dbcr_value');
                                                            dbcrvalue = DbcrnoteWorkOrderDataStore.getAt(0).get('dbcr_value');
                                                            fst_dbcrno = dbcr_type + DbcrnoteWorkOrderDataStore.getAt(0).get('dbcr_no');
                                                            dbcrno = DbcrnoteWorkOrderDataStore.getAt(0).get('dbcr_no');
                                                            if (dbcr_type === "DN") {
                                                                fstdbcrtype = "D";
                                                                fstdbtype = "D";
                                                                typeacc = "Debit Note";
                                                            } else {
                                                                fstdbcrtype = "C";
                                                                typeacc = "Credit Note";
                                                                fstdbtype = "C";
                                                            }
                                                            // Ext.Msg.alert(dbcrvalue+"</br>"+dbcrno+"</br>"+fstdbcrtype)
                                                            cntrow = cntrow + 1;
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: typeacc,
                                                                        Value: Ext.util.Format.number(fdbl_dbcrvalue, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(fdbl_dbcrvalue, "0.00"),
                                                                        ValueDef: valuedef
                                                                    })
                                                                    );
                                                            cntrow = cntrow + 1;
                                                            typeacc = 'Adj';
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: typeacc,
                                                                        Value: Ext.util.Format.number(fdbl_dbcrvalue * -1, "0.00"),
                                                                        AccountName: 'STORE PURCHASE',
                                                                        DebitAmtt: Ext.util.Format.number(fdbl_dbcrvalue * -1, "0.00"),
                                                                        ValueDef: valuedef
                                                                    })
                                                                    );
                                                            CalTotAmt();
                                                            if (pdbl_purrettaxval !== 0) {
                                                                if (fstdbcrtype === "D") {

                                                                } else if (fstdbcrtype === "C") {
                                                                    pst_cr = Number(pst_cr) + Number(pdbl_purrettaxval);
                                                                    typeofdr = "Purchase Return Tax Value";
                                                                    pdbl_purret = Number(pdbl_purrettaxval) * Number(1);
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: typeofdr,
                                                                                Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                AccountName: 'STORE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                    CalTotAmt();
                                                                }

                                                                if (dbcr_type === "CN") {
                                                                }
                                                                if (dbcr_type === "DN") {
                                                                    pst_cr = Number(pst_cr) + Number(fdbl_dbcrvalue);
                                                                }
                                                                CalTotAmt();
                                                            } else {
                                                                if (pdbl_purrettaxval > 0) {
                                                                    pst_cr = Number(pst_cr) - Number(pdbl_purrettaxval);
                                                                    typeofdr = "Purchase Return Tax Value";
                                                                    pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: typeofdr,
                                                                                Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                AccountName: 'STORE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                    CalTotAmt();
                                                                }
                                                            }

                                                        }
                                                    }
                                                });
                                            } else {
                                                if (pdbl_purrettaxval > 0) {
                                                    pst_cr = Number(pst_cr) - Number(pdbl_purrettaxval);
                                                    typeofdr = "Purchase Return Tax Value";
                                                    pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                    cntrow = cntrow + 1;
                                                    flxDetails.getStore().insert(
                                                            flxDetails.getStore().getCount(),
                                                            new dgrecord({
                                                                Sno: cntrow,
                                                                itemname: typeofdr,
                                                                Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                AccountName: 'STORE PURCHASE',
                                                                DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                ValueDef: valuedef
                                                            })
                                                            );
                                                    CalTotAmt();
                                                }

                                            }
                                            fst_invno = cmbInvoiceNo.getRawValue();
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                }
            }
        });
    }

    function IFD_Itemlist() {
        if (prefix === 'M') {
            flxDetailsmin.getStore().removeAll();
            if (cmbInvoiceNo.getRawValue() === "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            }
            StorePurchaseMinDataStore.removeAll();
            StorePurchaseDataStore.removeAll();
            StorePurchaseDetailsMinDataStore.removeAll();
            StoreDetailsMinTrailDataStore.removeAll();
            StorePurchaseDataStore.load({
                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                params: {
                    task: 'StorePurchase',
                    invseqno: cmbInvoiceNo.getValue(),
                    flag: 'S'
                },
                callback: function () {
                    var cnt = StorePurchaseDataStore.getCount();
                    if (cnt > 0) {
                        pst_minno = "";
                        txtAmt.setValue(StorePurchaseDataStore.getAt(0).get('purinv_netvalue'));
                        netvaluenew = StorePurchaseDataStore.getAt(0).get('purinv_netvalue');
                        dtpInvoiceDate.setRawValue(StorePurchaseDataStore.getAt(0).get('purinv_date'));
                        fst_storeinvmintype = StorePurchaseDataStore.getAt(0).get('purinv_mintype');
                        purinv_dbcr_flag = StorePurchaseDataStore.getAt(0).get('purinv_dbcr_flag');
                        StorePurchaseMinDataStore.load({
                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                            params: {
                                task: 'StorePurchaseMin',
                                invseqno: cmbInvoiceNo.getValue(),
                                flag: 'S'
                            },
                            callback: function () {
                                var cnt = StorePurchaseMinDataStore.getCount();
                                if (cnt > 0) {
                                    for (var i = 0; i < cnt; i++) {
                                        var pst_minno1 = StorePurchaseMinDataStore.getAt(i).get('purinv_min_seqno');
                                        flxDetailsmin.getStore().insert(
                                                flxDetailsmin.getStore().getCount(),
                                                new dgrecord({
                                                    pst_mi: pst_minno1
                                                })
                                                );
                                    }
                                    flxDetailsmin.getSelectionModel().selectAll();
                                    var selrows = flxDetailsmin.getSelectionModel().getCount();
                                    var sel = flxDetailsmin.getSelectionModel().getSelections();
                                    var pst_minno3 = 0;
                                    for (var a = 0; a < selrows; a++) {
                                        if (a == 0) {
                                            pst_minno3 = sel[a].data.pst_mi;
                                        } else {
                                            pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                        }
                                    }
                                    if (fst_storeinvmintype == 'M') {
                                        StorePurchaseDetailsMinDataStore.load({
                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                            params: {
                                                task: 'StorePurchaseDetails',
                                                minseqno: pst_minno3,
                                                flag: 'S'
                                            },
                                            callback: function () {
                                                var cnt = StorePurchaseDetailsMinDataStore.getCount();
                                                if (cnt > 0) {
                                                    StoreDetailsMinTrailDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'StoreDetailsMinTrail',
                                                            minseqno: pst_minno3,
                                                            flag: 'S'
                                                        },
                                                        callback: function () {
                                                            var cnt1 = StoreDetailsMinTrailDataStore.getCount();
                                                            if (cnt1 > 0) {
                                                                for (i = 0; i < cnt1; i++) {
                                                                    pdbl_purrettaxval = "";
                                                                    var itemname = StoreDetailsMinTrailDataStore.getAt(i).get('item_name');
                                                                    var itemgroup = StoreDetailsMinTrailDataStore.getAt(i).get('itemsubgroup_name');
                                                                    var itemminqty = StoreDetailsMinTrailDataStore.getAt(i).get('min_qty');
                                                                    var itempurret = StoreDetailsMinTrailDataStore.getAt(i).get('min_purret_qty');
                                                                    var itemunitrate = StoreDetailsMinTrailDataStore.getAt(i).get('min_unit_rate');
                                                                    var purinvfreightflag = StorePurchaseDataStore.getAt(0).get('purinv_freight_flag');
                                                                    var mincostrate = StoreDetailsMinTrailDataStore.getAt(i).get('min_cost_rate');
                                                                    var minfreightrate = StoreDetailsMinTrailDataStore.getAt(i).get('min_freight_rate');
                                                                    // var totvalue = (Ext.util.Format.number((Number(itemminqty) - Number(itempurret)) * Number(itemunitrate), "0.00"));
                                                                    var totvalue = (Ext.util.Format.number((Number(itemminqty)) * Number(itemunitrate), "0.00"));
                                                                    if (Number(itempurret) > 0) {

                                                                        StoreDetailsMinTrailDataStore123.removeAll();
                                                                        StoreDetailsMinTrailDataStore123.load({
                                                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                            params: {
                                                                                task: 'StoreDetailsMinTrail123',
                                                                                minseqno: pst_minno3,
                                                                                flag: 'S'
                                                                            },
                                                                            callback: function () {
                                                                                var cnt3 = StoreDetailsMinTrailDataStore123.getCount();
                                                                                if (cnt3 > 0) {
                                                                                    for (i = 0; i < cnt3; i++) {
                                                                                        pdbl_purrettaxval = Number(pdbl_purrettaxval) + Number(StoreDetailsMinTrailDataStore123.getAt(0).get('qty'));
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                        )

                                                                    } else {
                                                                        pdbl_purrettaxval = Number(pdbl_purrettaxval) + (Number(itempurret) * (Number(mincostrate) - Number(itemunitrate) - Number(minfreightrate)));

                                                                    }
                                                                    if (compcode == 1) {
                                                                        var valuedef = 1461;
                                                                    } else {
                                                                        valuedef = 12898;
                                                                    }
                                                                    if (compcode == 1) {
                                                                        cgstreal = 33201;
                                                                        sgstreal = 33202;
                                                                        igstreal = 33200;
                                                                        tcsreal = 37718;
                                                                    } else if (compcode == 4) {
                                                                        cgstreal = 33204;
                                                                        sgstreal = 33205;
                                                                        igstreal = 33203;
                                                                        tcsreal =37719;
                                                                    } else if (compcode == 11) {
                                                                        cgstreal = 34192;
                                                                        sgstreal = 34193;
                                                                        igstreal = 34194;
                                                                    }
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: itemname,
                                                                                itemsubgroupname: itemgroup,
                                                                                Value: totvalue,
                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                DebitAmtt: totvalue,
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                }
                                                                MaxdateDataStore.load({
                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                    params: {
                                                                        task: 'Maxdate',
                                                                        minno: pst_minno3
                                                                    },
                                                                    callback: function () {
                                                                        var cnt = MaxdateDataStore.getCount();
                                                                        if (cnt > 0) {
                                                                            dtpVocherDate.setRawValue(MaxdateDataStore.getAt(0).get('max_mindate'));
                                                                        }
                                                                    }
                                                                });
                                                                MinlenDataStore.load({
                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                    params: {
                                                                        task: 'Minlen',
                                                                        minno: pst_minno3,
                                                                        flag: 'S'
                                                                    },
                                                                    callback: function () {
                                                                        cnt = MinlenDataStore.getCount();
                                                                        if (cnt > 0) {
                                                                            for (i = 0; i < cnt; i++) {
                                                                                var fdbl_discount = MinlenDataStore.getAt(i).get('discount');
                                                                                var tngst = MinlenDataStore.getAt(i).get('tngst');
                                                                                var CST = MinlenDataStore.getAt(i).get('cst');
                                                                                var exciseduty = MinlenDataStore.getAt(i).get('exciseduty');
                                                                                var AddExduty_val = MinlenDataStore.getAt(i).get('AddExduty_val');
                                                                                var other1 = MinlenDataStore.getAt(i).get('other1');
                                                                                var min_clearing = MinlenDataStore.getAt(i).get('min_clearing');
                                                                                var min_licence = MinlenDataStore.getAt(i).get('min_licence');
                                                                                var min_freight_acctflag = MinlenDataStore.getAt(i).get('min_freight_acctflag');
                                                                                var cgst = MinlenDataStore.getAt(i).get('min_cgstvalue');
                                                                                var sgst = MinlenDataStore.getAt(i).get('min_sgstvalue');
                                                                                var igst = MinlenDataStore.getAt(i).get('min_igstvalue');
                                                                                var tcsnew = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                                var freight = MinlenDataStore.getAt(i).get('freight');

                                                                                if (fdbl_discount > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Discount";
                                                                                    disval = MinlenDataStore.getAt(0).get('discount') * Number(-1);
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (tngst > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "State Sales Tax";
                                                                                    disval = MinlenDataStore.getAt(0).get('tngst');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (cgst > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "CGST INPUT";
                                                                                    disval = MinlenDataStore.getAt(0).get('min_cgstvalue');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: type,
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: cgstreal
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (sgst > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "SGST INPUT";
                                                                                    disval = MinlenDataStore.getAt(0).get('min_sgstvalue');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: type,
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: sgstreal
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (igst > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "IGST INPUT";
                                                                                    disval = MinlenDataStore.getAt(0).get('min_igstvalue');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: type,
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: igstreal
                                                                                            })
                                                                                            );
                                                                                }

                                                                                if (tcsnew > 0) {
                                                                                cntrow = cntrow + 1;
                                                                                type = "TCS RECOVERABLE ON PURCHASE";
                                                                                disval = MinlenDataStore.getAt(0).get('min_tcsvalue');
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: type,
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            AccountName: type,
                                                                                            DebitAmtt: Ext.util.Format.number(tcsnew, "0.00"),
                                                                                            ValueDef: tcsreal
                                                                                        })
                                                                                        );
                                                                               }
                                                                                if (CST > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Central Sales Tax";
                                                                                    disval = MinlenDataStore.getAt(0).get('cst');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (exciseduty > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Basic Custom Duty";
                                                                                    disval = MinlenDataStore.getAt(0).get('exciseduty');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (AddExduty_val > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Additional Excise Duty";
                                                                                    disval = MinlenDataStore.getAt(0).get('AddExduty_val');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (other1 > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Other charge1";
                                                                                    disval = MinlenDataStore.getAt(0).get('other1');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (min_clearing > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Clearing charges";
                                                                                    disval = MinlenDataStore.getAt(0).get('min_clearing');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (min_licence > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    type = "Licence Duty";
                                                                                    disval = MinlenDataStore.getAt(0).get('min_licence');
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: type,
                                                                                                itemsubgroupname: '',
                                                                                                Value: disval,
                                                                                                AccountName: 'PURCHASE IFDMCH',
                                                                                                DebitAmtt: disval,
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                }
                                                                                if (freight > 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    if (min_freight_acctflag === "Y") {
                                                                                        disval = MinlenDataStore.getAt(0).get('freight');
                                                                                        type = "Freight";
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: disval,
                                                                                                    AccountName: 'PURCHASE IFDMCH',
                                                                                                    DebitAmtt: disval,
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                }
                                                                            }
                                                                            if (purinv_dbcr_flag === 'D') {
                                                                                dbcr_value = 0;
                                                                                fstdbtype = "";
                                                                                dbcr_type = "";
                                                                                fst_dbcrno = "";
                                                                                DbcrnoteDataStore.load({
                                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                    params: {
                                                                                        task: 'Dbcrnote',
                                                                                        Invno: cmbInvoiceNo.getRawValue(),
                                                                                        ledcode: fdbl_ledcode,
                                                                                        finid: ginfinid,
                                                                                        compcode: compcode,
                                                                                        flag: 'S'
                                                                                    },
                                                                                    callback: function () {
                                                                                        var cnt = DbcrnoteDataStore.getCount();
                                                                                        if (cnt > 0) {
                                                                                            dbcr_type = DbcrnoteDataStore.getAt(0).get('dbcr_type');
                                                                                            dbcr_value = DbcrnoteDataStore.getAt(0).get('dbcr_value');
                                                                                            fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');

                                                                                            fstdbtype = "D";
                                                                                            typeacc = "Debit Note";
                                                                                            cntrow = cntrow + 1;
                                                                                            flxDetails.getStore().insert(
                                                                                                    flxDetails.getStore().getCount(),
                                                                                                    new dgrecord({
                                                                                                        Sno: cntrow,
                                                                                                        itemname: typeacc,
                                                                                                        Value: dbcr_value,
                                                                                                        AccountName: 'PURCHASE IFDMCH',
                                                                                                        DebitAmtt: dbcr_value,
                                                                                                        ValueDef: valuedef
                                                                                                    })
                                                                                                    );
											    if(fdbl_discount <=0){	
                                                                                            typeacc = "Adj";
  											    cntrow = cntrow + 1;
                                                                                            flxDetails.getStore().insert(
                                                                                                    flxDetails.getStore().getCount(),
                                                                                                    new dgrecord({
                                                                                                        Sno: cntrow,
                                                                                                        itemname: typeacc,
                                                                                                        Value: Number(dbcr_value)*Number(-1),
                                                                                                        AccountName: 'PURCHASE IFDMCH',
                                                                                                        DebitAmtt: Number(dbcr_value)*Number(-1),
                                                                                                        ValueDef: valuedef
                                                                                                    })
                                                                                                    );

											    }			
                                                                                            if (Number(pdbl_purrettaxval) > 0) {
                                                                                                typeofdr = "Purchase Return Tax Value";
                                                                                                pdbl_purret = (Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.00"));
                                                                                                //pdbl_purret='-3500';
                                                                                                /* cntrow = cntrow + 1;
                                                                                                 flxDetails.getStore().insert(
                                                                                                 flxDetails.getStore().getCount(),
                                                                                                 new dgrecord({
                                                                                                 Sno: cntrow,
                                                                                                 itemname: typeofdr,
                                                                                                 Value: pdbl_purret,
                                                                                                 AccountName: 'PURCHASE IFDMCH',
                                                                                                 DebitAmtt: pdbl_purret,
                                                                                                 ValueDef: valuedef
                                                                                                 })
                                                                                                 );*/

                                                                                                typeacc = "Adj";
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeacc,
                                                                                                            Value: Number(dbcr_value) * Number(-1),
                                                                                                            AccountName: 'PURCHASE IFDMCH',
                                                                                                            DebitAmtt: Number(dbcr_value) * Number(-1),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );
                                                                                            }
                                                                                            CalTotAmtstore();
                                                                                            var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                            if (validatevalue !== 0) {
                                                                                                if (Number(validatevalue) <= Number(1) && Number(validatevalue) >= Number(-1) && validatevalue !== '0') {
                                                                                                    itemname = "Round Off";
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: itemname,
                                                                                                                itemsubgroupname: '',
                                                                                                                Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                AccountName: 'STORE PURCHASE',
                                                                                                                DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                                ValueDef: valuedef
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmtstore();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                CalTotAmtstore();
                                                                                var validatevalue = Number(netvaluenew) - Number(totvalueall);
                                                                                if (validatevalue !== 0) {
                                                                                    if (Number(validatevalue) <= Number(1) && Number(validatevalue) >= Number(-1) && validatevalue !== '0') {
                                                                                        itemname = "Round Off";
                                                                                        cntrow = cntrow + 1;
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: itemname,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    AccountName: 'STORE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(validatevalue, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                        CalTotAmtstore();
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                    }
                }
            })
        }
    }

    function Madeups_Itemlist() {
        if (prefix === 'A') {
            flxDetailsmin.getStore().removeAll();
            pst_crvalue = 0;
            StorePurchaseMadupsDataStore.removeAll();
            StorePurchaseMinMadeupsDataStore.removeAll();
            StorePurchaseDetailsMinMadupsDataStore.removeAll();
            StoreDetailsMinTrailMadeupsDataStore.removeAll();
            StoreDetailsMinTrailDataStoreMadeups123.removeAll();
            MinlenMadeupsDataStore.removeAll();
            DbcrnoteMadeupsDataStore.removeAll();
            MaxdateMadeupsDataStore.removeAll();
            if (cmbInvoiceNo.getRawValue() === "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            }
            StorePurchaseMadupsDataStore.load({
                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                params: {
                    task: 'StorePurchaseMadups',
                    invno: cmbInvoiceNo.getValue()
                },
                callback: function () {
                    var cnt = StorePurchaseMadupsDataStore.getCount();
                    if (cnt > 0) {
                        pst_minno = "";
                        txtAmt.setValue(StorePurchaseMadupsDataStore.getAt(0).get('purinv_netvalue'));
                        dtpInvoiceDate.setRawValue(StorePurchaseMadupsDataStore.getAt(0).get('purinv_date'));
                        fst_storeinvmintype = StorePurchaseMadupsDataStore.getAt(0).get('purinv_mintype');
                        purinv_dbcr_flag = StorePurchaseMadupsDataStore.getAt(0).get('purinv_dbcr_flag');
//alert(cmbInvoiceNo.getValue()+fst_storeinvmintype)
                        StorePurchaseMinMadeupsDataStore.load({
                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                            params: {
                                task: 'StorePurchaseMinMadeups',
                                invseqno: cmbInvoiceNo.getValue()
                            },
                            callback: function () {
                                var cnt = StorePurchaseMinMadeupsDataStore.getCount();
                                if (cnt > 0) {
                                    for (var i = 0; i < cnt; i++) {
                                        var pst_minno1 = StorePurchaseMinMadeupsDataStore.getAt(i).get('purinv_min_seqno');
                                        flxDetailsmin.getStore().insert(
                                                flxDetailsmin.getStore().getCount(),
                                                new dgrecord({
                                                    pst_mi: pst_minno1
                                                })
                                                );
                                    }
                                    flxDetailsmin.getSelectionModel().selectAll();
                                    var selrows = flxDetailsmin.getSelectionModel().getCount();
                                    var sel = flxDetailsmin.getSelectionModel().getSelections();
                                    var pst_minno3 = 0;
                                    for (var a = 0; a < selrows; a++) {
                                        if (a == 0) {
                                            pst_minno3 = sel[a].data.pst_mi;
                                        } else {
                                            pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                        }
                                    }
                                    if (fst_storeinvmintype === 'M') {
                                        StorePurchaseDetailsMinMadupsDataStore.load({
                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                            params: {
                                                task: 'StorePurchaseDetailsMinMadups',
                                                minseqno: pst_minno3
                                            },
                                            callback: function () {
                                                var cnt = StorePurchaseDetailsMinMadupsDataStore.getCount();
                                                if (cnt > 0) {
                                                    StoreDetailsMinTrailMadeupsDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'StoreDetailsMinTrailMadeups',
                                                            minseqno: pst_minno3
                                                        },
                                                        callback: function () {
                                                            var cnt1 = StoreDetailsMinTrailMadeupsDataStore.getCount();
                                                            if (cnt1 > 0) {
                                                                for (i = 0; i < cnt1; i++) {
                                                                    pdbl_purrettaxval = "";
                                                                    var itemname = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('item_name');
                                                                    var itemgroup = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('itemsubgroup_name');
                                                                    var itemminqty = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('min_qty');
                                                                    var itempurret = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('min_purret_qty');
                                                                    var itemunitrate = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('min_unit_rate');
                                                                    var purinvfreightflag = StoreDetailsMinTrailMadeupsDataStore.getAt(0).get('purinv_freight_flag');
                                                                    var mincostrate = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('min_cost_rate');
                                                                    var minfreightrate = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('min_freight_rate');
                                                                    var repmin = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('repmin_qty');
                                                                    var repminunit = StoreDetailsMinTrailMadeupsDataStore.getAt(i).get('repmin_unitval');
                                                                    if (fst_storeinvmintype === 'M') {
                                                                        var totvalue = (Ext.util.Format.number((Number(itemminqty) - Number(itempurret)) * Number(itemunitrate), "0.00"));
                                                                        if (Number(itempurret) > 0) {
                                                                            if (purinvfreightflag === "Y") {
                                                                                StoreDetailsMinTrailDataStoreMadeups123.removeAll();
                                                                                StoreDetailsMinTrailDataStoreMadeups123.load({
                                                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                    params: {
                                                                                        task: 'StoreDetailsMinTrailDataStoreMadeups123',
                                                                                        minseqno: pst_minno3
                                                                                    },
                                                                                    callback: function () {
                                                                                        var cnt3 = StoreDetailsMinTrailDataStoreMadeups123.getCount();
                                                                                        if (cnt3 > 0) {
                                                                                            for (i = 0; i < cnt3; i++) {
                                                                                                pdbl_purrettaxval = Number(pdbl_purrettaxval) + Number(StoreDetailsMinTrailDataStoreMadeups123.getAt(0).get('qty'));
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                                )
                                                                            }
                                                                        } else {
                                                                            pdbl_purrettaxval = Number(pdbl_purrettaxval) + (Number(itempurret) * (Number(mincostrate) - Number(itemunitrate) - Number(minfreightrate)));

                                                                        }
                                                                        pst_crvalue = Number(pst_crvalue) + Number(totvalue);
                                                                    } else if (fst_storeinvmintype == "R") {
                                                                        totvalue = Number(repmin) * Number(repminunit);
                                                                        pdbl_purrettaxval = 0;
                                                                        pst_crvalue = Number(pst_crvalue) + Number(totvalue);
                                                                    }

                                                                    if (compcode == 1) {
                                                                        var valuedef = 1461;
                                                                    } else {
                                                                        valuedef = 12898;
                                                                    }
                                                                    if (compcode == 1) {
                                                                        cgstreal = 33201;
                                                                        sgstreal = 33202;
                                                                        igstreal = 33200;
                                                                    } else if (compcode == 4) {
                                                                        cgstreal = 33204;
                                                                        sgstreal = 33205;
                                                                        igstreal = 33203;
                                                                    } else if (compcode == 11) {
                                                                        cgstreal = 34192;
                                                                        sgstreal = 34193;
                                                                        igstreal = 34194;
                                                                    }
                                                                    cntrow = cntrow + 1;
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: itemname,
                                                                                itemsubgroupname: itemgroup,
                                                                                Value: Ext.util.Format.number(totvalue, "0.00"),
                                                                                AccountName: 'PURCHASE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(totvalue, "0.00"),
                                                                                ValueDef: valuedef
                                                                            })
                                                                            );
                                                                    CalTotAmt();
                                                                }

                                                                if (fst_storeinvmintype === 'M') {
                                                                    MinlenMadeupsDataStore.load({
                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                        params: {
                                                                            task: 'MinlenMadeups',
                                                                            minseqno: pst_minno3
                                                                        },
                                                                        callback: function () {
                                                                            cnt = MinlenMadeupsDataStore.getCount();
                                                                            if (cnt > 0) {
                                                                                for (i = 0; i < cnt; i++) {
                                                                                    var fdbl_discount = MinlenMadeupsDataStore.getAt(i).get('discount');
                                                                                    var tngst = MinlenMadeupsDataStore.getAt(i).get('tngst');
                                                                                    var CST = MinlenMadeupsDataStore.getAt(i).get('cst');
                                                                                    var exciseduty = MinlenMadeupsDataStore.getAt(i).get('exciseduty');
                                                                                    var AddExduty_val = MinlenMadeupsDataStore.getAt(i).get('AddExduty_val');
                                                                                    var other1 = MinlenMadeupsDataStore.getAt(i).get('other1');
                                                                                    var other2 = MinlenMadeupsDataStore.getAt(i).get('other2');
                                                                                    var min_clearing = MinlenMadeupsDataStore.getAt(i).get('min_clearing');
                                                                                    var min_licence = MinlenMadeupsDataStore.getAt(i).get('min_licence');
                                                                                    var min_freight_acctflag = MinlenMadeupsDataStore.getAt(i).get('min_freight_acctflag');
                                                                                    var freight = MinlenMadeupsDataStore.getAt(i).get('freight');
                                                                                    var cgstval = MinlenMadeupsDataStore.getAt(i).get('cgst');
                                                                                    var sgstval = MinlenMadeupsDataStore.getAt(i).get('sgst');
                                                                                    var igstval = MinlenMadeupsDataStore.getAt(i).get('igst');

                                                                                    if (fdbl_discount > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) - Number(MinlenMadeupsDataStore.getAt(0).get('discount'));
                                                                                        type = "Discount";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('discount') * Number(-1);
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (other2 > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('other2'));
                                                                                        type = "Other charge2";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('other2');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (tngst > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('tngst'));
                                                                                        type = "State Sales Tax";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('tngst');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (cgstval > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('cgst'));
                                                                                        type = "CGST INPUT";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('cgst');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: type,
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: cgstreal
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (sgstval > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('sgst'));
                                                                                        type = "SGST INPUT";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('sgst');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: type,
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: sgstreal
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (igstval > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('igst'));
                                                                                        type = "IGST INPUT";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('igst');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: type,
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: igstreal
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (CST > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('cst'));
                                                                                        type = "Central Sales Tax";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('cst');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (exciseduty > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('exciseduty'));
                                                                                        type = "Basic Custom Duty";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('exciseduty');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (AddExduty_val > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('AddExduty_val'));
                                                                                        type = "Additional Excise Duty";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('AddExduty_val');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (other1 > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('other1'));
                                                                                        type = "Other charge1";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('other1');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (min_clearing > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('min_clearing'));
                                                                                        type = "Clearing charges";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('min_clearing');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (min_licence > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('min_licence'));
                                                                                        type = "Licence Duty";
                                                                                        disval = MinlenMadeupsDataStore.getAt(0).get('min_licence');
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: type,
                                                                                                    itemsubgroupname: '',
                                                                                                    Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                    }
                                                                                    if (freight > 0) {
                                                                                        cntrow = cntrow + 1;
                                                                                        if (min_freight_acctflag == "Y") {
                                                                                            pst_crvalue = Number(pst_crvalue) + Number(MinlenMadeupsDataStore.getAt(0).get('freight'));
                                                                                            disval = MinlenMadeupsDataStore.getAt(0).get('freight');
                                                                                            type = "Freight";
                                                                                            flxDetails.getStore().insert(
                                                                                                    flxDetails.getStore().getCount(),
                                                                                                    new dgrecord({
                                                                                                        Sno: cntrow,
                                                                                                        itemname: type,
                                                                                                        itemsubgroupname: '',
                                                                                                        Value: Ext.util.Format.number(disval, "0.00"),
                                                                                                        AccountName: 'PURCHASE PURCHASE',
                                                                                                        DebitAmtt: Ext.util.Format.number(disval, "0.00"),
                                                                                                        ValueDef: valuedef
                                                                                                    })
                                                                                                    );
                                                                                        }
                                                                                    }
                                                                                    CalTotAmt();
                                                                                }
                                                                                var purinv_dbcr_flag = StorePurchaseMadupsDataStore.getAt(0).get('purinv_dbcr_flag');
                                                                                if (purinv_dbcr_flag !== 'N') {
                                                                                    fdbl_dbcrvalue = 0;
                                                                                    fin_dbcrrow = 0;
                                                                                    fst_dbcrno = "";
                                                                                    fstdbcrtype = "";
                                                                                    DbcrnoteMadeupsDataStore.load({
                                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                        params: {
                                                                                            task: 'DbcrnoteMadeups',
                                                                                            Invno: cmbInvoiceNo.getRawValue(),
                                                                                            ledcode: fdbl_ledcode,
                                                                                            finid: ginfinid,
                                                                                            compcode: compcode
                                                                                        },
                                                                                        callback: function () {
                                                                                            var cnt = DbcrnoteMadeupsDataStore.getCount();
                                                                                            if (cnt > 0) {
                                                                                                dbcr_type = DbcrnoteMadeupsDataStore.getAt(0).get('dbcr_type');
                                                                                                dbcr_value = DbcrnoteMadeupsDataStore.getAt(0).get('dbcr_value');
                                                                                                fst_dbcrno = dbcr_type + DbcrnoteMadeupsDataStore.getAt(0).get('dbcr_no');
                                                                                                if (dbcr_type == "DN") {
                                                                                                    fstdbtype = "D";
                                                                                                    typeacc = "Debit Note";
                                                                                                } else {
                                                                                                    fstdbtype = "C";
                                                                                                    typeacc = "Credit Note";
                                                                                                }
                                                                                                cntrow = cntrow + 1;
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeacc,
                                                                                                            Value: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            AccountName: 'PURCHASE PURCHASE',
                                                                                                            DebitAmtt: Ext.util.Format.number(dbcr_value, "0.00"),
                                                                                                            ValueDef: valuedef
                                                                                                        })
                                                                                                        );
                                                                                                CalTotAmt();
                                                                                                fdbl_dbcrvalue = DbcrnoteMadeupsDataStore.getAt(0).get('dbcr_value');
                                                                                                if (Number(pdbl_purrettaxval) !== 0) {
                                                                                                    if (fstdbtype == "D") {
                                                                                                        if (pst_crvalue !== 0) {
                                                                                                            pst_crvalue = Number(pst_crvalue) - Number(pdbl_purrettaxval);
                                                                                                            typeofdr = "Purchase Return Tax Value";
                                                                                                            pdbl_purret = (Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.00"));
                                                                                                        } else {
                                                                                                            pst_crvalue = Number(pst_crvalue) + Number(pdbl_purrettaxval);
                                                                                                        }
                                                                                                    } else if (fstdbtype == "C") {
                                                                                                        pst_crvalue = Number(pst_crvalue) + Number(pdbl_purrettaxval);
                                                                                                        typeofdr = "Purchase Return Tax Value";
                                                                                                        pdbl_purret = (Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(1), "0.00"));
                                                                                                    }

                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: typeofdr,
                                                                                                                Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                                AccountName: 'PURCHASE PURCHASE',
                                                                                                                DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                                ValueDef: valuedef
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmt();
                                                                                                }
                                                                                                if (dbcr_type == "DN") {
                                                                                                    pst_crvalue = Number(pst_crvalue) + Number(fdbl_dbcrvalue);
                                                                                                }

                                                                                            } else {
                                                                                                if (Number(pdbl_purrettaxval) > 0) {
                                                                                                    pst_crvalue = Number(pst_crvalue) - Number(pdbl_purrettaxval);
                                                                                                    typeofdr = "Purchase Return Tax Value";
                                                                                                    pdbl_purret = (Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.00"));
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: typeofdr,
                                                                                                                Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                                AccountName: 'PURCHASE PURCHASE',
                                                                                                                DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                                ValueDef: valuedef
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmt();
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    if (pdbl_purrettaxval > 0) {
                                                                                        pst_crvalue = Number(pst_crvalue) - Number(pdbl_purrettaxval);
                                                                                        typeofdr = "Purchase Return Tax Value";
                                                                                        pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                                                        cntrow = cntrow + 1;
                                                                                        flxDetails.getStore().insert(
                                                                                                flxDetails.getStore().getCount(),
                                                                                                new dgrecord({
                                                                                                    Sno: cntrow,
                                                                                                    itemname: typeofdr,
                                                                                                    Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                    AccountName: 'PURCHASE PURCHASE',
                                                                                                    DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                                    ValueDef: valuedef
                                                                                                })
                                                                                                );
                                                                                        CalTotAmt();
                                                                                    }
                                                                                }

                                                                                if ((Number(txtAmt.getRawValue()) - Number(txtTotVal.getRawValue())) < 1 && (Number(txtAmt.getRawValue()) - Number(txtTotVal.getRawValue() > 0))) {
                                                                                    typeofdr = "Round off";
                                                                                    var val = Number(txtAmt.getRawValue()) - Number(txtTotVal.getRawValue());
                                                                                    cntrow = cntrow + 1;
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: typeofdr,
                                                                                                Value: Ext.util.Format.number(val, "0.00"),
                                                                                                AccountName: 'PURCHASE PURCHASE',
                                                                                                DebitAmtt: Ext.util.Format.number(val, "0.00"),
                                                                                                ValueDef: valuedef
                                                                                            })
                                                                                            );
                                                                                    CalTotAmt();
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                    MaxdateMadeupsDataStore.load({
                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                        params: {
                                                                            task: 'MaxdateMadeups',
                                                                            minno: pst_minno3
                                                                        },
                                                                        callback: function () {
                                                                            var cnt = MaxdateMadeupsDataStore.getCount();
                                                                            if (cnt > 0) {
                                                                                dtpVocherDate.setRawValue(MaxdateMadeupsDataStore.getAt(0).get('max_mindate'));
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                    }
                }
            })
        }
    }

    function import_yarn() {
        YarnPurchaseDataStore.removeAll();
        YarnPurchaseTrailDataStore.removeAll();
        Dbcrnote1DataStore.removeAll();
        YarnPurchaseDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'YarnPurchase',
                invno: cmbInvoiceNo.getRawValue(),
                ledcode: fdbl_vendorcode,
                finid: ginfinid
            },
            callback: function () {
                var cnt2 = YarnPurchaseDataStore.getCount();
                if (cnt2 > 0) {
                    txtAmt.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_netvalue'));
                    dtpInvoiceDate.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Date1'));
                    dtpVocherDate.setRawValue(YarnPurchaseDataStore.getAt(0).get('Yarn_Inward_DC_date1'));
                    var inwardqty = YarnPurchaseDataStore.getAt(0).get('Yarn_Inward_grossvalue');
                    YarnPurchaseTrailDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'YarnPurchaseTrail',
                            invno: cmbInvoiceNo.getRawValue(),
                            ledcode: fdbl_vendorcode,
                            finid: ginfinid
                        },
                        callback: function () {
                            var cnt = YarnPurchaseTrailDataStore.getCount();
                            if (cnt > 0) {
                                for (var i = 0; i < cnt; i++) {
                                    var count_prefix = YarnPurchaseTrailDataStore.getAt(i).get('count_prefix');
                                    var Yarn_Inv_qty = YarnPurchaseTrailDataStore.getAt(i).get('Yarn_Inv_qty');
                                    var yarn_inv_rate = YarnPurchaseTrailDataStore.getAt(i).get('Yarn_Inv_rate');
                                    var Yarn_Inv_tngst_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_tngst_val');
                                    var Yarn_Inv_cst_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_cst_val');
                                    var Yarn_Inv_Tax_Flag = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Tax_Flag');
                                    var Yarn_Inv_Bed_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Bed_value');
                                    var Yarn_Inv_Aed_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Aed_value');
                                    var Yarn_Inv_Insurance_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Insurance_value');
                                    var Yarn_Inv_surcharge_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_surcharge_val');
                                    var Yarn_Inv_othercharges_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_othercharges_val');
                                    var Yarn_Inv_cess_value = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_cess_value');
                                    var Yarn_Inv_freight_val = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_freight_val');
                                    var Yarn_Inv_discount = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_discount');
                                    var Yarn_Inv_Round_amt = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_Round_amt');
                                    var Yarn_Inv_con_charges = YarnPurchaseDataStore.getAt(i).get('Yarn_Inv_con_charges');
                                    var Yarn_Inv_freight_acctflag = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_freight_acctflag');
                                    valuenew = Ext.util.Format.number(Number(Yarn_Inv_qty) * Number(yarn_inv_rate), "0.00") * Number(Yarn_Inv_con_charges);
                                    pst_cr = Number(pst_cr) + (Ext.util.Format.number(Number(Yarn_Inv_qty) * Number(yarn_inv_rate), "0.00") * Number(Yarn_Inv_con_charges));

                                    cntrow = cntrow + 1;
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: count_prefix,
                                                itemsubgroupname: '',
                                                Value: valuenew,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: valuenew,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_Bed_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Bed_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Basic Custom Duty';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_Aed_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Aed_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Additional Excise Duty';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_Insurance_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Insurance_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Insurance Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_cst_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_cst_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Cst Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_tngst_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_tngst_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'State Sales Tax';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_surcharge_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_surcharge_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Surharge Value';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_othercharges_val > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_othercharges_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Other Charges';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_cess_value > 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_cess_value');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Cess';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                if (Yarn_Inv_freight_acctflag == "Y") {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_freight_val');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Freight';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }

                                if (Yarn_Inv_Round_amt !== 0) {
                                    cntrow = cntrow + 1;
                                    values = YarnPurchaseDataStore.getAt(0).get('Yarn_Inv_Round_amt');
                                    pst_cr = Number(pst_cr) + Number(values);
                                    typeofval = 'Round Off';
                                    flxDetails.getStore().insert(
                                            flxDetails.getStore().getCount(),
                                            new dgrecord({
                                                Sno: cntrow,
                                                itemname: typeofval,
                                                itemsubgroupname: '',
                                                Value: values,
                                                AccountName: 'YARN PURCHASE LOCAL',
                                                DebitAmtt: values,
                                                ValueDef: 1456
                                            })
                                            );
                                }
                                Dbcrnote1DataStore.load({
                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                    params: {
                                        task: 'Dbcrnote1',
                                        Invno: cmbInvoiceNo.getRawValue(),
                                        ledcode: fdbl_ledcode,
                                        finid: ginfinid,
                                        compcode: compcode
                                    },
                                    callback: function () {
                                        var cnt = Dbcrnote1DataStore.getCount();
                                        if (cnt > 0) {
                                            dbcr_type = Dbcrnote1DataStore.getAt(0).get('dbcr_type');
                                            dbcr_value = Dbcrnote1DataStore.getAt(0).get('dbcr_value');
                                            fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');
                                            if (dbcr_type == "DN") {
                                                typeas = "Debit note";
                                                fstdbtype = "D";
                                            } else {
                                                fstdbtype = "C";
                                                typeas = "Credit note";
                                            }
                                            cntrow = cntrow + 1;
                                            flxDetails.getStore().insert(
                                                    flxDetails.getStore().getCount(),
                                                    new dgrecord({
                                                        Sno: cntrow,
                                                        itemname: typeas,
                                                        itemsubgroupname: '',
                                                        Value: dbcr_value,
                                                        AccountName: 'YARN PURCHASE LOCAL',
                                                        DebitAmtt: dbcr_value,
                                                        ValueDef: 1456
                                                    })
                                                    );
                                        }
                                    }
                                });
                                CalTotAmt();
                            }
                        }
                    });
                    if (txtAmt.getRawValue() !== txtTotVal.getRawValue() && txtAmt.getRawValue() !== 0 && Number(txtAmt.getRawValue() - txtTotVal.getRawValue() > 1)) {
                        Ext.Msg.alert("Alert", "Bill not entered correctly, Contact Purchase. You cannot account this bill");
                    }
                } else {
                    Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                }
            }
        })
    }

    function WorkorderIFD_Itemlist() {
        if (prefix == 'IM') {
            flxDetailsmin.getStore().removeAll();
            if (cmbInvoiceNo.getRawValue() == "") {
                Ext.Msg.alert("ACCOUNTS", "Invoice Not Properly Assigned");
            }
            WorkorderMinHeaderDataStore.load({
                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                params: {
                    task: 'WorkorderMinHeader',
                    seqno: cmbInvoiceNo.getValue()
                },
                callback: function () {
                    var cnt1 = WorkorderMinHeaderDataStore.getCount();
                    if (cnt1 > 0) {
                        pst_minno = "";
                        txtAmt.setValue(WorkorderMinHeaderDataStore.getAt(0).get('Womin_grossvalue'));
                        dtpInvoiceDate.setRawValue(WorkorderMinHeaderDataStore.getAt(0).get('Womin_billdate'));
                        fst_storeinvmintype = "M";
                        womidbcrstatus = WorkorderMinHeaderDataStore.getAt(0).get('Womin_dbcrstatus');
                        WorkorderSeqnoDataStore.load({
                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                            params: {
                                task: 'WorkorderSeqno',
                                seqno: cmbInvoiceNo.getValue()
                            },
                            callback: function () {
                                var cnt2 = WorkorderSeqnoDataStore.getCount();
                                if (cnt2 > 0) {
                                    for (var i = 0; i < cnt2; i++) {
                                        var pst_minno1 = WorkorderSeqnoDataStore.getAt(i).get('Womin_seqno');
                                        flxDetailsmin.getStore().insert(
                                                flxDetailsmin.getStore().getCount(),
                                                new dgrecord({
                                                    pst_mi: pst_minno1
                                                })
                                                );
                                    }
                                    flxDetailsmin.getSelectionModel().selectAll();
                                    var selrows = flxDetailsmin.getSelectionModel().getCount();
                                    var sel = flxDetailsmin.getSelectionModel().getSelections();
                                    var pst_minno3 = 0;
                                    for (var a = 0; a < selrows; a++) {
                                        if (a == 0) {
                                            pst_minno3 = sel[a].data.pst_mi;
                                        } else {
                                            pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                        }
                                    }
                                    WorkorderDetailstrailDataStore.load({
                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                        params: {
                                            task: 'WorkorderDetailstrail',
                                            wominseqno: pst_minno3
                                        },
                                        callback: function () {
                                            var cnt3 = WorkorderDetailstrailDataStore.getCount();
                                            if (cnt3 > 0) {
                                                pst_cr = "";
                                                for (i = 0; i < cnt3; i++) {
                                                    var Womin_remarks = WorkorderDetailstrailDataStore.getAt(i).get('Womin_remarks');
                                                    var Womin_unit_rate = WorkorderDetailstrailDataStore.getAt(i).get('Womin_unit_rate');
                                                    cntrow = cntrow + 1;
                                                    flxDetails.getStore().insert(
                                                            flxDetails.getStore().getCount(),
                                                            new dgrecord({
                                                                Sno: cntrow,
                                                                itemname: Womin_remarks,
                                                                itemsubgroupname: '',
                                                                Value: Ext.util.Format.number(Womin_unit_rate, "0.00"),
                                                                AccountName: 'STORE PURCHASE',
                                                                DebitAmtt: Ext.util.Format.number(Womin_unit_rate, "0.00"),
                                                                ValueDef: '1461'
                                                            })
                                                            );
                                                    CalTotAmt();
                                                }
                                                WorkorderDetailsRecDataStore.load({
                                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                    params: {
                                                        task: 'WorkorderDetailsRec',
                                                        seqno: pst_minno3
                                                    },
                                                    callback: function () {
                                                        var cnt4 = WorkorderDetailsRecDataStore.getCount();
                                                        if (cnt4 > 0) {
                                                            woDiscount = WorkorderDetailsRecDataStore.getAt(0).get('discount');
                                                            wotngst = WorkorderDetailsRecDataStore.getAt(0).get('tngst');
                                                            woCST = WorkorderDetailsRecDataStore.getAt(0).get('CST');
                                                            woexduty = WorkorderDetailsRecDataStore.getAt(0).get('exciseduty');
                                                            woAddExdutyval = WorkorderDetailsRecDataStore.getAt(0).get('AddExduty_val');
                                                            woother1 = WorkorderDetailsRecDataStore.getAt(0).get('other1');
                                                            wofreight = WorkorderDetailsRecDataStore.getAt(0).get('freight');
                                                            Wominacctflag = WorkorderDetailsRecDataStore.getAt(0).get('Womin_freight_acctflag');

                                                            if (woDiscount > 0) {
                                                                cntrow = cntrow + 1;
                                                                var Wtype = "Discount";
                                                                pst_cr = Number(pst_cr) - Number(woDiscount);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('discount') * Number(-1);
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (woexduty > 0) {
                                                                cntrow = cntrow + 1;
                                                                Wtype = "Basic Custom Duty";
                                                                pst_cr = Number(pst_cr) + Number(woexduty);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('exciseduty');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (wotngst > 0) {
                                                                cntrow = cntrow + 1;
                                                                Wtype = "State Sales Tax";
                                                                pst_cr = Number(pst_cr) + Number(wotngst);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('tngst');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (woCST > 0) {
                                                                cntrow = cntrow + 1;
                                                                Wtype = "Central Sales Tax";
                                                                pst_cr = Number(pst_cr) + Number(woCST);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('CST');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (woother1 > 0) {
                                                                cntrow = cntrow + 1;
                                                                Wtype = "Other charge1";
                                                                pst_cr = Number(pst_cr) + Number(woother1);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('other1');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (woAddExdutyval > 0) {
                                                                cntrow = cntrow + 1;
                                                                Wtype = "Additional Excise Duty";
                                                                pst_cr = Number(pst_cr) + Number(woAddExdutyval);
                                                                valuetot = WorkorderDetailsRecDataStore.getAt(0).get('AddExduty_val');
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: Wtype,
                                                                            itemsubgroupname: '',
                                                                            Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                            ValueDef: '1461'
                                                                        }));
                                                            }
                                                            if (Wominacctflag == "Y") {
                                                                cntrow = cntrow + 1;
                                                                if (wofreight > 0) {
                                                                    Wtype = "Freight";
                                                                    pst_cr = Number(pst_cr) + Number(wofreight);
                                                                    valuetot = WorkorderDetailsRecDataStore.getAt(0).get('freight');
                                                                    flxDetails.getStore().insert(
                                                                            flxDetails.getStore().getCount(),
                                                                            new dgrecord({
                                                                                Sno: cntrow,
                                                                                itemname: Wtype,
                                                                                itemsubgroupname: '',
                                                                                Value: Ext.util.Format.number(valuetot, "0.00"),
                                                                                AccountName: 'STORE PURCHASE',
                                                                                DebitAmtt: Ext.util.Format.number(valuetot, "0.00"),
                                                                                ValueDef: '1461'
                                                                            }));
                                                                }
                                                            }
                                                            CalTotAmt();
                                                        }
                                                    }
                                                });
                                                if (fst_storeinvmintype == "M") {
                                                    WorkOrderMaxDateDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'WorkOrderMaxDate',
                                                            minno: pst_minno3
                                                        },
                                                        callback: function () {
                                                            var cnt = WorkOrderMaxDateDataStore.getCount();
                                                            if (cnt > 0) {
                                                                womaxdate = WorkOrderMaxDateDataStore.getAt(0).get('Womin_date');
                                                                dtpVocherDate.setRawValue(womaxdate);
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    WorkOrderMaxDateDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'WorkOrderMaxDate',
                                                            minno: pst_minno3
                                                        },
                                                        callback: function () {
                                                            var cnt = WorkOrderMaxDateDataStore.getCount();
                                                            if (cnt > 0) {
                                                                womaxdate = WorkOrderMaxDateDataStore.getAt(0).get('Womin_date');
                                                                dtpVocherDate.setRawValue(womaxdate);
                                                            }
                                                        }
                                                    });
                                                }
                                                txtTotVal.setRawValue(pst_cr);
                                                fdbl_dbcrvalue = 0;
                                                fin_dbcrrow = 0;
                                                fst_dbcrno = "";
                                                fstdbcrtype = "";
                                                if (womidbcrstatus !== "N") {
                                                    txtTotVal.setRawValue(pst_cr);
                                                    DbcrnoteWorkOrderDataStore.load({
                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                        params: {
                                                            task: 'DbcrnoteWorkOrder',
                                                            Invno: cmbInvoiceNo.getRawValue(),
                                                            ledcode: fdbl_ledcode,
                                                            finid: ginfinid,
                                                            compcode: compcode
                                                        },
                                                        callback: function () {
                                                            var cnt = DbcrnoteDataStore.getCount();
                                                            if (cnt > 0) {
                                                                dbcr_type = DbcrnoteDataStore.getAt(0).get('dbcr_type');
                                                                fdbl_dbcrvalue = DbcrnoteDataStore.getAt(0).get('dbcr_value');
                                                                fst_dbcrno = dbcr_type + DbcrnoteDataStore.getAt(0).get('dbcr_no');
                                                                if (dbcr_type == "DN") {
                                                                    fstdbcrtype = "D";
                                                                    typeacc = "Debit Note";
                                                                } else {
                                                                    fstdbcrtype = "C";
                                                                    typeacc = "Credit Note";
                                                                }
                                                                cntrow = cntrow + 1;
                                                                flxDetails.getStore().insert(
                                                                        flxDetails.getStore().getCount(),
                                                                        new dgrecord({
                                                                            Sno: cntrow,
                                                                            itemname: typeacc,
                                                                            Value: Ext.util.Format.number(fdbl_dbcrvalue, "0.00"),
                                                                            AccountName: 'STORE PURCHASE',
                                                                            DebitAmtt: Ext.util.Format.number(fdbl_dbcrvalue, "0.00"),
                                                                            ValueDef: '1461'
                                                                        })
                                                                        );
                                                                CalTotAmt();
                                                                if (pdbl_purrettaxval !== 0) {
                                                                    if (fstdbcrtype == "D") {

                                                                    } else if (fstdbcrtype == "C") {
                                                                        pst_cr = Number(pst_cr) + Number(pdbl_purrettaxval);
                                                                        typeofdr = "Purchase Return Tax Value";
                                                                        pdbl_purret = Number(pdbl_purrettaxval) * Number(1);
                                                                        cntrow = cntrow + 1;
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofdr,
                                                                                    Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                    AccountName: 'STORE PURCHASE',
                                                                                    DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                    ValueDef: '1461'
                                                                                })
                                                                                );
                                                                        CalTotAmt();
                                                                    }

                                                                    if (dbcr_type == "CN") {
                                                                    }
                                                                    if (dbcr_type == "DN") {
                                                                        pst_cr = Number(pst_cr) + Number(fdbl_dbcrvalue);
                                                                    }
                                                                    CalTotAmt();
                                                                } else {
                                                                    if (pdbl_purrettaxval > 0) {
                                                                        pst_cr = Number(pst_cr) - Number(pdbl_purrettaxval);
                                                                        typeofdr = "Purchase Return Tax Value";
                                                                        pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                                        cntrow = cntrow + 1;
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofdr,
                                                                                    Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                    AccountName: 'STORE PURCHASE',
                                                                                    DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                                    ValueDef: '1461'
                                                                                })
                                                                                );
                                                                        CalTotAmt();
                                                                    }
                                                                }

                                                            }
                                                        }
                                                    });
                                                } else {
                                                    if (pdbl_purrettaxval > 0) {
                                                        pst_cr = Number(pst_cr) - Number(pdbl_purrettaxval);
                                                        typeofdr = "Purchase Return Tax Value";
                                                        pdbl_purret = Number(pdbl_purrettaxval) * Number(-1);
                                                        cntrow = cntrow + 1;
                                                        flxDetails.getStore().insert(
                                                                flxDetails.getStore().getCount(),
                                                                new dgrecord({
                                                                    Sno: cntrow,
                                                                    itemname: typeofdr,
                                                                    Value: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                    AccountName: 'STORE PURCHASE',
                                                                    DebitAmtt: Ext.util.Format.number(pdbl_purret, "0.00"),
                                                                    ValueDef: '1461'
                                                                })
                                                                );
                                                        CalTotAmt();
                                                    }

                                                }
                                                if ((txtAmt.getRawValue() - txtTotVal.getRawValue()) < 1 && (txtAmt.getRawValue() - txtTotVal.getRawValue()) > 0) {
                                                    roundofftype = "Round off";
                                                    roundoffvalue = Number(txtAmt.getRawValue()) - Number(txtTotVal.getRawValue());
                                                    cntrow = cntrow + 1;
                                                    flxDetails.getStore().insert(
                                                            flxDetails.getStore().getCount(),
                                                            new dgrecord({
                                                                Sno: cntrow,
                                                                itemname: roundofftype,
                                                                Value: Ext.util.Format.number(roundoffvalue, "0.00"),
                                                                AccountName: 'STORE PURCHASE',
                                                                DebitAmtt: Ext.util.Format.number(roundoffvalue, "0.00"),
                                                                ValueDef: '1461'
                                                            })
                                                            );
                                                    CalTotAmt();
                                                }
                                                fst_invno = cmbInvoiceNo.getRawValue();
//                                            if(Number(txtAmt.getRawValue())!==Number(txtTotVal.getRawValue())){
//                                                Ext.Msg.alert("Alert","Bill not entered correctly, Contact Purchase. You cannot account this bill");
//                                            }
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    } else {
                        Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                    }
                }
            });

        }
    }

    function Fibre_ItemList() {
        FibrePurchaseDataStore.removeAll();
        FibrePurchaseMinseqnoDataStore.removeAll();
        FibrePurchaseMinHeaderDataStore.removeAll();
        FibrePurchaseMinTrailerDataStore.removeAll();
        FibrePurchaseMinTrailerDetailsDataStore.removeAll();
        FibrePurchaseDdbcrNoteDataStore.removeAll();
        FibrePurchaseVouDateDetailsDataStore.removeAll();
        FibrePurchaseDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'FibrePurchase',
                invno: cmbInvoiceNo.getValue()
            },
            callback: function () {
                var cnt2 = FibrePurchaseDataStore.getCount();
                if (cnt2 > 0) {
                    txtAmt.setRawValue(FibrePurchaseDataStore.getAt(0).get('Netvalue'));
                    billvaluefibre = FibrePurchaseDataStore.getAt(0).get('Netvalue');
                    dtpInvoiceDate.setRawValue(FibrePurchaseDataStore.getAt(0).get('Date'));
                    var purinv_freight_flag = FibrePurchaseDataStore.getAt(0).get('purinv_freight_flag');
                    var PurinvDbcrFlag = FibrePurchaseDataStore.getAt(0).get('PurinvDbcrFlag');
                    FibrePurchaseMinseqnoDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'FibrePurchaseMinseqno',
                            invno: cmbInvoiceNo.getValue()
                        },
                        callback: function () {
                            var cnt = FibrePurchaseMinseqnoDataStore.getCount();
                            if (cnt > 0) {
                                for (var i = 0; i < cnt; i++) {
                                    var minseqno = FibrePurchaseMinseqnoDataStore.getAt(i).get('MinSeqno');
                                    flxDetailsmin.getStore().insert(
                                            flxDetailsmin.getStore().getCount(),
                                            new dgrecord({
                                                pst_mi: minseqno
                                            })
                                            );
                                }
                                flxDetailsmin.getSelectionModel().selectAll();
                                var selrows = flxDetailsmin.getSelectionModel().getCount();
                                var sel = flxDetailsmin.getSelectionModel().getSelections();
                                var pst_minno3 = 0;
                                for (var a = 0; a < selrows; a++) {
                                    if (a == 0) {
                                        pst_minno3 = sel[a].data.pst_mi;
                                    } else {
                                        pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                    }
                                }
                                FibrePurchaseMinHeaderDataStore.load({
                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                    params: {
                                        task: 'FibrePurchaseMinHeader',
                                        minseqno: pst_minno3
                                    },
                                    callback: function () {
                                        var cnt = FibrePurchaseMinHeaderDataStore.getCount();
                                        if (cnt > 0) {
                                            FibrePurchaseMinTrailerDataStore.load({
                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                params: {
                                                    task: 'FibrePurchaseMinTrailer',
                                                    minseqno: pst_minno3
                                                },
                                                callback: function () {
                                                    var cnt = FibrePurchaseMinTrailerDataStore.getCount();
                                                    if (cnt > 0) {
                                                        for (var i = 0; i < cnt; i++) {
                                                            var item_name = FibrePurchaseMinTrailerDataStore.getAt(i).get('prod_code');
                                                            var min_shortage_qty = FibrePurchaseMinTrailerDataStore.getAt(i).get('min_shortage_qty');
                                                            var min_qty = FibrePurchaseMinTrailerDataStore.getAt(i).get('Qty');
                                                            var min_purret_qty = FibrePurchaseMinTrailerDataStore.getAt(i).get('Purretqty');
                                                            var min_unit_rate = FibrePurchaseMinTrailerDataStore.getAt(i).get('Unitrate');
                                                            var min_cost_rate = FibrePurchaseMinTrailerDataStore.getAt(i).get('Costrate');
                                                            var Valuenew = Ext.util.Format.number((Number(min_qty) - Number(min_purret_qty) - Number(min_shortage_qty)) * Number(min_unit_rate), "0.00");
                                                            if (min_purret_qty > 0) {
                                                                if (purinv_freight_flag == "Y") {
                                                                    if (Number(min_cost_rate) > Number(min_unit_rate)) {
                                                                        pdbl_purrettaxval = pdbl_purrettaxval + (Number(min_purret_qty) * (Number(min_cost_rate) - Number(min_unit_rate)));
                                                                    } else {
                                                                        pdbl_purrettaxval = pdbl_purrettaxval + (Number(min_purret_qty) * (Number(min_cost_rate) - Number(min_unit_rate)));
                                                                    }
                                                                }
                                                            }
                                                            cntrow = cntrow + 1;
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: item_name,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(Number(Valuenew), "0.00"),
                                                                        AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                        DebitAmtt: Ext.util.Format.number(Number(Valuenew), "0.00"),
                                                                        ValueDef: 13730
                                                                    })
                                                                    );
                                                            CalTotAmt11();
                                                        }
                                                        FibrePurchaseMinTrailerDetailsDataStore.load({
                                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                            params: {
                                                                task: 'FibrePurchaseMinTrailerDetails',
                                                                minseqno: pst_minno3
                                                            },
                                                            callback: function () {
                                                                var cnt = FibrePurchaseMinTrailerDetailsDataStore.getCount();
                                                                if (cnt > 0) {
                                                                    var scval = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('scval');
                                                                    var sstval = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('sstval');
                                                                    var charity = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('charity');
                                                                    var handpack = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('handpack');
                                                                    var forwardcharg = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('forwardcharg');
                                                                    var aedval = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('aedval');
                                                                    var bedval = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('bedval');
                                                                    var educess = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('educess');
                                                                    var insurance = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('insurance');
                                                                    var discount = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('discount');
                                                                    var min_discount_reason = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('Discountreason');
                                                                    var exciseduty = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('exciseduty');
                                                                    var cess = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('cess');
                                                                    var other1 = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('other1');
                                                                    var freight = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('freight');
                                                                    var vatval = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('VAT');
                                                                    var cst = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('CST');
                                                                    var min_freight_acctflag = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('Freightacctflag');
                                                                    if (scval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('scval');
                                                                        typeofval = 'Central Sales Tax';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (charity > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('charity');
                                                                        typeofval = 'Charity';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (handpack > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('handpack');
                                                                        typeofval = 'Hand. & Packing Charges';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (forwardcharg > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('forwardcharg');
                                                                        typeofval = 'Forwarding Charges';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (aedval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('aedval');
                                                                        typeofval = 'AED Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (bedval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('bedval');
                                                                        typeofval = 'BED Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (educess > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('educess');
                                                                        typeofval = 'Education Cess';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (insurance > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('insurance');
                                                                        typeofval = 'Insurance';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (discount > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('discount');
                                                                        typeofval = 'Discount' + " " + "(" + min_discount_reason + ")";
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (sstval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('sstval');
                                                                        typeofval = 'State Sales Tax';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }

                                                                    if (exciseduty > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('exciseduty');
                                                                        typeofval = 'Basic Custom Duty';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (cess > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('cess');
                                                                        typeofval = 'Cess Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (other1 > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('other1');
                                                                        typeofval = 'Other charge1';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (vatval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('VAT');
                                                                        typeofval = 'VAT';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }
                                                                    if (cst > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('CST');
                                                                        typeofval = 'CST';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 13730
                                                                                })
                                                                                );
                                                                    }

                                                                    if (min_freight_acctflag == "Y") {
                                                                        if (freight > 0) {
                                                                            cntrow = cntrow + 1;
                                                                            values = FibrePurchaseMinTrailerDetailsDataStore.getAt(0).get('freight');
                                                                            typeofval = 'Freight';
                                                                            flxDetails.getStore().insert(
                                                                                    flxDetails.getStore().getCount(),
                                                                                    new dgrecord({
                                                                                        Sno: cntrow,
                                                                                        itemname: typeofval,
                                                                                        itemsubgroupname: '',
                                                                                        Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                        AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                        DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                        ValueDef: 13730
                                                                                    })
                                                                                    );
                                                                        }
                                                                    }
                                                                    CalTotAmt11();
                                                                    FibrePurchaseVouDateDetailsDataStore.load({
                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                        params: {
                                                                            task: 'FibrePurchaseVouDateDetails',
                                                                            minseqno: pst_minno3
                                                                        },
                                                                        callback: function () {
                                                                            var cnt = FibrePurchaseVouDateDetailsDataStore.getCount();
                                                                            if (cnt > 0) {
                                                                                dtpVocherDate.setRawValue(FibrePurchaseVouDateDetailsDataStore.getAt(0).get('max_mindate'));
                                                                                if (PurinvDbcrFlag !== "N") {
                                                                                    fdbl_dbcrvalue = 0;
                                                                                    fin_dbcrrow = 0;
                                                                                    fst_dbcrno = "";
                                                                                    fst_dbcrtype = "";
                                                                                    FibrePurchaseDdbcrNoteDataStore.load({
                                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                        params: {
                                                                                            task: 'FibrePurchaseDdbcrNote',
                                                                                            invno: cmbInvoiceNo.getRawValue(),
                                                                                            ledcode: fdbl_ledcode,
                                                                                            finid: ginfinid,
                                                                                            compcode: compcode
                                                                                        },
                                                                                        callback: function () {
                                                                                            var cnt = FibrePurchaseDdbcrNoteDataStore.getCount();
                                                                                            if (cnt > 0) {
                                                                                                fdbl_dbcrvalue = FibrePurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_value');
                                                                                                if (FibrePurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_type') == "DN") {
                                                                                                    fst_dbcrtype = "D";
                                                                                                    typeofval = "Debit note";
                                                                                                } else {
                                                                                                    fst_dbcrtype = "C";
                                                                                                    typeofval = "Credit note";
                                                                                                }
                                                                                                cntrow = cntrow + 1;
                                                                                                values = FibrePurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_value');
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeofval,
                                                                                                            itemsubgroupname: '',
                                                                                                            Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                                            AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                                            DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                                            ValueDef: 13730
                                                                                                        })
                                                                                                        );
                                                                                                CalTotAmt11();
                                                                                                if (pdbl_purrettaxval !== 0) {
                                                                                                    if (fst_dbcrtype == "C") {
                                                                                                        cntrow = cntrow + 1;
                                                                                                        flxDetails.getStore().insert(
                                                                                                                flxDetails.getStore().getCount(),
                                                                                                                new dgrecord({
                                                                                                                    Sno: cntrow,
                                                                                                                    itemname: 'Purchase Return Tax Value',
                                                                                                                    itemsubgroupname: '',
                                                                                                                    Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(1), "0.000"),
                                                                                                                    AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                                                    DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(1), "0.000"),
                                                                                                                    ValueDef: 13730
                                                                                                                })
                                                                                                                );
                                                                                                        CalTotAmt11();
                                                                                                    }
                                                                                                } else {
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: 'Purchase Return Tax Value',
                                                                                                                itemsubgroupname: '',
                                                                                                                Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                                AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                                                DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                                ValueDef: 13730
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmt11();

                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    cntrow = cntrow + 1;
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: 'Purchase Return Tax Value',
                                                                                                itemsubgroupname: '',
                                                                                                Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                                DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                ValueDef: 13730
                                                                                            })
                                                                                            );
                                                                                    CalTotAmt11();
                                                                                }
                                                                                CalTotAmt11();
//Ext.Msg.alert(newvalasign+"</br>"+gintotqty)
                                                                                // var newvalasign=Number(billvaluefibre)-Number(gintotqty);
                                                                                var newvalasign = 0;
                                                                                if (newvalasign > 0 || newvalasign < 0) {
                                                                                    cntrow = cntrow + 1;
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: 'Round off',
                                                                                                itemsubgroupname: '',
                                                                                                Value: Ext.util.Format.number(Number(newvalasign), "0.000"),
                                                                                                AccountName: 'FIBERS & FABRICS INTERNATIONAL',
                                                                                                DebitAmtt: Ext.util.Format.number(Number(newvalasign), "0.000"),
                                                                                                ValueDef: 13730
                                                                                            })
                                                                                            );
                                                                                }
                                                                                CalTotAmt11();

                                                                                if (fst_dbcrtype == "D") {
                                                                                    txtAmtpass.setRawValue(Ext.util.Format.number(Number(gintotqty), '0.00') - Number(fdbl_dbcrvalue));
                                                                                } else {
                                                                                    txtAmtpass.setRawValue(Ext.util.Format.number(Number(gintotqty), '0.00') + Number(fdbl_dbcrvalue));
                                                                                }
                                                                                if (Number(billvaluefibre) !== Number(gintotqty) && Number(billvaluefibre) !== 0 && (Number(billvaluefibre) - Number(gintotqty)) > 0) {
                                                                                    Ext.Msg.alert("Alert", "Bill not entered correctly, Contact Purchase. You cannot account this bill");
                                                                                }
                                                                            }
                                                                        }
                                                                    });

                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                }
            }
        })
    }

    function Terry_ItemList() {
        TerryPurchaseDataStore.removeAll();
        TerryPurchaseMinseqnoDataStore.removeAll();
        TerryPurchaseMinHeaderDataStore.removeAll();
        TerryPurchaseMinTrailerDataStore.removeAll();
        TerryPurchaseMinTrailerDetailsDataStore.removeAll();
        TerryPurchaseDdbcrNoteDataStore.removeAll();
        TerryPurchaseVouDateDetailsDataStore.removeAll();
        TerryPurchaseDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'TerryPurchase',
                invno: cmbInvoiceNo.getValue()
            },
            callback: function () {
                var cnt2 = TerryPurchaseDataStore.getCount();
                if (cnt2 > 0) {
                    txtAmt.setRawValue(TerryPurchaseDataStore.getAt(0).get('PurinvNetvalue'));
                    billvaluefibre = TerryPurchaseDataStore.getAt(0).get('PurinvNetvalue');
                    dtpInvoiceDate.setRawValue(TerryPurchaseDataStore.getAt(0).get('PurinvDate'));
                    var purinv_freight_flag = TerryPurchaseDataStore.getAt(0).get('PurinvFrightFlag');
                    var PurinvDbcrFlag = TerryPurchaseDataStore.getAt(0).get('PurinvDbcrFlag');
                    TerryPurchaseMinseqnoDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'TerryPurchaseMinseqno',
                            invno: cmbInvoiceNo.getValue()
                        },
                        callback: function () {
                            var cnt = TerryPurchaseMinseqnoDataStore.getCount();
                            if (cnt > 0) {
                                for (var i = 0; i < cnt; i++) {
                                    var minseqno = TerryPurchaseMinseqnoDataStore.getAt(i).get('purinvminseqno');
                                    flxDetailsmin.getStore().insert(
                                            flxDetailsmin.getStore().getCount(),
                                            new dgrecord({
                                                pst_mi: minseqno
                                            })
                                            );
                                }
                                flxDetailsmin.getSelectionModel().selectAll();
                                var selrows = flxDetailsmin.getSelectionModel().getCount();
                                var sel = flxDetailsmin.getSelectionModel().getSelections();
                                var pst_minno3 = 0;
                                for (var a = 0; a < selrows; a++) {
                                    if (a == 0) {
                                        pst_minno3 = sel[a].data.pst_mi;
                                    } else {
                                        pst_minno3 = pst_minno3 + "," + sel[a].data.pst_mi;
                                    }
                                }
                                TerryPurchaseMinHeaderDataStore.load({
                                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                    params: {
                                        task: 'TerryPurchaseMinHeader',
                                        minseqno: pst_minno3
                                    },
                                    callback: function () {
                                        var cnt = TerryPurchaseMinHeaderDataStore.getCount();
                                        if (cnt > 0) {
//Ext.Msg.alert(pst_minno3)
                                            TerryPurchaseMinTrailerDataStore.load({
                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                params: {
                                                    task: 'TerryPurchaseMinTrailer',
                                                    minseqno: pst_minno3
                                                },
                                                callback: function () {
                                                    var cnt = TerryPurchaseMinTrailerDataStore.getCount();
                                                    if (cnt > 0) {
                                                        for (var i = 0; i < cnt; i++) {
                                                            var item_name = TerryPurchaseMinTrailerDataStore.getAt(i).get('prod_code');
                                                            var min_qty = TerryPurchaseMinTrailerDataStore.getAt(i).get('MinKilos');
                                                            var min_purret_qty = TerryPurchaseMinTrailerDataStore.getAt(i).get('MinPurretQty');
                                                            var min_unit_rate = TerryPurchaseMinTrailerDataStore.getAt(i).get('MinUnitRate');
                                                            var min_cost_rate = TerryPurchaseMinTrailerDataStore.getAt(i).get('MinCostRate');
                                                            var Valuenew = Ext.util.Format.number(Number(min_qty) * Number(min_unit_rate), "0.00");
                                                            if (min_purret_qty > 0) {
                                                                if (purinv_freight_flag == "Y") {
                                                                    if (Number(min_cost_rate) > Number(min_unit_rate)) {
                                                                        pdbl_purrettaxval = pdbl_purrettaxval + (Number(min_purret_qty) * (Number(min_cost_rate) - Number(min_unit_rate)));
                                                                    } else {
                                                                        pdbl_purrettaxval = pdbl_purrettaxval + (Number(min_purret_qty) * (Number(min_cost_rate) - Number(min_unit_rate)));
                                                                    }
                                                                }
                                                            }
                                                            cntrow = cntrow + 1;
                                                            flxDetails.getStore().insert(
                                                                    flxDetails.getStore().getCount(),
                                                                    new dgrecord({
                                                                        Sno: cntrow,
                                                                        itemname: item_name,
                                                                        itemsubgroupname: '',
                                                                        Value: Ext.util.Format.number(Number(Valuenew), "0.00"),
                                                                        AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                        DebitAmtt: Ext.util.Format.number(Number(Valuenew), "0.00"),
                                                                        ValueDef: 23077
                                                                    })
                                                                    );
                                                            CalTotAmt11();
                                                        }
                                                        TerryPurchaseMinTrailerDetailsDataStore.load({
                                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                            params: {
                                                                task: 'TerryPurchaseMinTrailerDetails',
                                                                minseqno: pst_minno3
                                                            },
                                                            callback: function () {
                                                                var cnt = TerryPurchaseMinTrailerDetailsDataStore.getCount();
                                                                if (cnt > 0) {
                                                                    var scval = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('scval');
                                                                    var sstval = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('sstval');
                                                                    var charity = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('charity');
                                                                    var handpack = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('handpack');
                                                                    var forwardcharg = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('forwardcharg');
                                                                    var aedval = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('aedval');
                                                                    var bedval = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('bedval');
                                                                    var educess = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('educess');
                                                                    var insurance = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('insurance');
                                                                    var discount = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('discount');
                                                                    var min_discount_reason = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('Discountreason');
                                                                    var exciseduty = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('exciseduty');
                                                                    var cess = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('cess');
                                                                    var other1 = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('other1');
                                                                    var freight = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('freight');
                                                                    var min_freight_acctflag = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('Freightacctflag');
                                                                    if (scval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('scval');
                                                                        typeofval = 'Central Sales Tax';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (charity > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('charity');
                                                                        typeofval = 'Charity';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (handpack > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('handpack');
                                                                        typeofval = 'Hand. & Packing Charges';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (forwardcharg > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('forwardcharg');
                                                                        typeofval = 'Forwarding Charges';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (aedval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('aedval');
                                                                        typeofval = 'AED Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (bedval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('bedval');
                                                                        typeofval = 'BED Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (educess > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('educess');
                                                                        typeofval = 'Education Cess';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (insurance > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('insurance');
                                                                        typeofval = 'Insurance';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (discount > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('discount');
                                                                        typeofval = 'Discount' + " " + "(" + min_discount_reason + ")";
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (sstval > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('sstval');
                                                                        typeofval = 'State Sales Tax';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }

                                                                    if (exciseduty > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('exciseduty');
                                                                        typeofval = 'Basic Custom Duty';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (cess > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('cess');
                                                                        typeofval = 'Cess Value';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (other1 > 0) {
                                                                        cntrow = cntrow + 1;
                                                                        values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('other1');
                                                                        typeofval = 'Other charge1';
                                                                        flxDetails.getStore().insert(
                                                                                flxDetails.getStore().getCount(),
                                                                                new dgrecord({
                                                                                    Sno: cntrow,
                                                                                    itemname: typeofval,
                                                                                    itemsubgroupname: '',
                                                                                    Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                    DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                    ValueDef: 23077
                                                                                })
                                                                                );
                                                                    }
                                                                    if (min_freight_acctflag == "Y") {
                                                                        if (freight > 0) {
                                                                            cntrow = cntrow + 1;
                                                                            values = TerryPurchaseMinTrailerDetailsDataStore.getAt(0).get('freight');
                                                                            typeofval = 'Freight';
                                                                            flxDetails.getStore().insert(
                                                                                    flxDetails.getStore().getCount(),
                                                                                    new dgrecord({
                                                                                        Sno: cntrow,
                                                                                        itemname: typeofval,
                                                                                        itemsubgroupname: '',
                                                                                        Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                        AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                        DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                        ValueDef: 23077
                                                                                    })
                                                                                    );
                                                                        }
                                                                    }
                                                                    CalTotAmt11();
                                                                    TerryPurchaseVouDateDetailsDataStore.load({
                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                        params: {
                                                                            task: 'TerryPurchaseVouDateDetails',
                                                                            minseqno: pst_minno3
                                                                        },
                                                                        callback: function () {
                                                                            var cnt = TerryPurchaseVouDateDetailsDataStore.getCount();
                                                                            if (cnt > 0) {
                                                                                dtpVocherDate.setRawValue(TerryPurchaseVouDateDetailsDataStore.getAt(0).get('max_mindate'));
                                                                                if (PurinvDbcrFlag !== "N") {
                                                                                    fdbl_dbcrvalue = 0;
                                                                                    fin_dbcrrow = 0;
                                                                                    fst_dbcrno = "";
                                                                                    fst_dbcrtype = "";
                                                                                    TerryPurchaseDdbcrNoteDataStore.load({
                                                                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                                                        params: {
                                                                                            task: 'TerryPurchaseDdbcrNote',
                                                                                            invno: cmbInvoiceNo.getRawValue(),
                                                                                            ledcode: fdbl_ledcode,
                                                                                            finid: ginfinid,
                                                                                            compcode: compcode
                                                                                        },
                                                                                        callback: function () {
                                                                                            var cnt = TerryPurchaseDdbcrNoteDataStore.getCount();
                                                                                            if (cnt > 0) {
                                                                                                fdbl_dbcrvalue = TerryPurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_value');
                                                                                                if (TerryPurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_type') == "DN") {
                                                                                                    fst_dbcrtype = "D";
                                                                                                    typeofval = "Debit note";
                                                                                                } else {
                                                                                                    fst_dbcrtype = "C";
                                                                                                    typeofval = "Credit note";
                                                                                                }
                                                                                                cntrow = cntrow + 1;
                                                                                                values = TerryPurchaseDdbcrNoteDataStore.getAt(0).get('dbcr_value');
                                                                                                flxDetails.getStore().insert(
                                                                                                        flxDetails.getStore().getCount(),
                                                                                                        new dgrecord({
                                                                                                            Sno: cntrow,
                                                                                                            itemname: typeofval,
                                                                                                            itemsubgroupname: '',
                                                                                                            Value: Ext.util.Format.number(Number(values), "0.000"),
                                                                                                            AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                                            DebitAmtt: Ext.util.Format.number(Number(values), "0.000"),
                                                                                                            ValueDef: 23077
                                                                                                        })
                                                                                                        );
                                                                                                CalTotAmt11();
                                                                                                if (pdbl_purrettaxval !== 0) {
                                                                                                    if (fst_dbcrtype == "C") {
                                                                                                        cntrow = cntrow + 1;
                                                                                                        flxDetails.getStore().insert(
                                                                                                                flxDetails.getStore().getCount(),
                                                                                                                new dgrecord({
                                                                                                                    Sno: cntrow,
                                                                                                                    itemname: 'Purchase Return Tax Value',
                                                                                                                    itemsubgroupname: '',
                                                                                                                    Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(1), "0.000"),
                                                                                                                    AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                                                    DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(1), "0.000"),
                                                                                                                    ValueDef: 23077
                                                                                                                })
                                                                                                                );
                                                                                                        CalTotAmt11();
                                                                                                    }
                                                                                                } else {
                                                                                                    cntrow = cntrow + 1;
                                                                                                    flxDetails.getStore().insert(
                                                                                                            flxDetails.getStore().getCount(),
                                                                                                            new dgrecord({
                                                                                                                Sno: cntrow,
                                                                                                                itemname: 'Purchase Return Tax Value',
                                                                                                                itemsubgroupname: '',
                                                                                                                Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                                AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                                                DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                                ValueDef: 23077
                                                                                                            })
                                                                                                            );
                                                                                                    CalTotAmt11();

                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    });
                                                                                } else {
                                                                                    cntrow = cntrow + 1;
                                                                                    flxDetails.getStore().insert(
                                                                                            flxDetails.getStore().getCount(),
                                                                                            new dgrecord({
                                                                                                Sno: cntrow,
                                                                                                itemname: 'Purchase Return Tax Value',
                                                                                                itemsubgroupname: '',
                                                                                                Value: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                                DebitAmtt: Ext.util.Format.number(Number(pdbl_purrettaxval) * Number(-1), "0.000"),
                                                                                                ValueDef: 23077
                                                                                            })
                                                                                            );
                                                                                    CalTotAmt11();
                                                                                }
                                                                                CalTotAmt11();
                                                                                var newvalasign = Number(billvaluefibre) - Number(gintotqty);
                                                                                cntrow = cntrow + 1;
                                                                                flxDetails.getStore().insert(
                                                                                        flxDetails.getStore().getCount(),
                                                                                        new dgrecord({
                                                                                            Sno: cntrow,
                                                                                            itemname: 'Round off',
                                                                                            itemsubgroupname: '',
                                                                                            Value: Ext.util.Format.number(Number(newvalasign), "0.000"),
                                                                                            AccountName: 'STOCK TRANSFER TERRY TOWELS FROM HO',
                                                                                            DebitAmtt: Ext.util.Format.number(Number(newvalasign), "0.000"),
                                                                                            ValueDef: 23077
                                                                                        })
                                                                                        );
                                                                                CalTotAmt11();
                                                                                if (fst_dbcrtype == "D") {
                                                                                    txtAmtpass.setRawValue(Ext.util.Format.number(Number(gintotqty), '0.00') - Number(fdbl_dbcrvalue));
                                                                                } else {
                                                                                    txtAmtpass.setRawValue(Ext.util.Format.number(Number(gintotqty), '0.00') + Number(fdbl_dbcrvalue));
                                                                                }
                                                                                if (Number(billvaluefibre) !== Number(gintotqty) && Number(billvaluefibre) !== 0 && (Number(billvaluefibre) - Number(gintotqty)) > 0) {
                                                                                    //   Ext.Msg.alert("Alert","Bill not entered correctly, Contact Purchase. You cannot account this bill");
                                                                                }
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    });
                } else {
                    Ext.Msg.alert("Stores Invoice", "Invoice details not available");
                }
            }
        })
    }

//Madeups Function Stores//
    var StorePurchaseMadupsDataStore = new Ext.data.Store({
        id: 'StorePurchaseMadupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseMadups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_netvalue', 'purinv_date', 'purinv_mintype', 'purinv_dbcr_flag', ''
        ])
    });

    var StorePurchaseMinMadeupsDataStore = new Ext.data.Store({
        id: 'StorePurchaseMinMadeupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseMinMadeups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno'
        ])
    });

    var StorePurchaseDetailsMinMadupsDataStore = new Ext.data.Store({
        id: 'StorePurchaseDetailsMinMadupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseDetailsMinMadups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            '', '', '', '', ''
        ])
    });

    var StoreDetailsMinTrailMadeupsDataStore = new Ext.data.Store({
        id: 'StoreDetailsMinTrailMadeupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StoreDetailsMinTrailMadeups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'item_name', 'itemsubgroup_name', 'min_qty', 'min_purret_qty',
            'min_unit_rate', 'purinv_freight_flag',
            'min_cost_rate', 'min_freight_rate', 'repmin_qty', 'repmin_unitval'
        ])
    });

    var StoreDetailsMinTrailDataStoreMadeups123 = new Ext.data.Store({
        id: 'StoreDetailsMinTrailDataStoreMadeups123',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StoreDetailsMinTrailDataStoreMadeups123"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'qty'
        ])
    });

    var MinlenMadeupsDataStore = new Ext.data.Store({
        id: 'MinlenMadeupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "MinlenMadeups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'min_freight_acctflag', 'tngst', 'cst', 'exciseduty', 'freight', 'other1', 'other2', 'discount', 'AddExduty_val', 'sgst', 'cgst', 'igst'
        ])
    });

    var DbcrnoteMadeupsDataStore = new Ext.data.Store({
        id: 'DbcrnoteMadeupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DbcrnoteMadeups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'dbcr_type', 'dbcr_value', 'dbcr_no', 'dbcr_value'
        ])
    });

    var MaxdateMadeupsDataStore = new Ext.data.Store({
        id: 'MaxdateMadeupsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "MaxdateMadeups"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'max_mindate'
        ])
    });

//Madeups End//

//Cotton Function Stores//
    var CottonTrailereDataStore = new Ext.data.Store({
        id: 'CottonTrailereDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "CottonTrailere"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'var_desc', 'inv_h_grossamt', 'per_carcharg', 'val_spotcharge', 'val_insurance', 'val_others'
        ])
    });

    var cottondbcrDataStore = new Ext.data.Store({
        id: 'cottondbcrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cottondbcr"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'dbcr_type', 'dbcr_value', 'dbcr_no'
        ])
    });
//Cotton Function Store End//
//Workorder//
    var WorkorderMinHeaderDataStore = new Ext.data.Store({
        id: 'WorkorderMinHeaderDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "WorkorderMinHeader"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Womin_grossvalue', 'Womin_billdate', 'Womin_dbcrstatus', 'date1', 'Womin_netvalue'
        ])
    });

    var WorkorderSeqnoDataStore = new Ext.data.Store({
        id: 'WorkorderSeqnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "WorkorderSeqno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Womin_seqno'
        ])
    });

    var WorkorderDetailstrailDataStore = new Ext.data.Store({
        id: 'WorkorderDetailstrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "WorkorderDetailstrail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Womin_remarks', 'Womin_unit_rate'
        ])
    });

    var WorkOrderMaxDateDataStore = new Ext.data.Store({
        id: 'WorkOrderMaxDateDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "WorkOrderMaxDate"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Womin_date'
        ])
    });

    var WorkorderDetailsRecDataStore = new Ext.data.Store({
        id: 'WorkorderDetailsRecDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "WorkorderDetailsRec"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'discount', 'tngst', 'cst', 'exciseduty', 'AddExduty_val', 'other1', 'freight', 'Womin_freight_acctflag', 'cgst', 'sgst', 'igst', 'Womin_roundoffvalue'
        ])
    });

    var DbcrnoteWorkOrderDataStore = new Ext.data.Store({
        id: 'DbcrnoteWorkOrderDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "DbcrnoteWorkOrder"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['dbcr_type', 'dbcr_value', 'dbcr_no'])
    });

    var TdsLedgergetDataStore = new Ext.data.Store({
        id: 'TdsLedgergetDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/datechk.php',
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

//Workorder End//
//
//Stores//
    var StorePurchaseMinDataStore = new Ext.data.Store({
        id: 'StorePurchaseMinDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseMin"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno'
        ])
    });
    var StorePurchaseDataStore = new Ext.data.Store({
        id: 'StorePurchaseDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchase"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_netvalue', 'purinv_date', 'purinv_mintype', 'purinv_dbcr_flag', 'purinv_freight_flag', 'ldate', 'inv_h_netamt', 'purinv_date1', 'inv_h_roundoff',
            'lldate', 'g_purinvno', 'g_milid', 'inv_h_grossamt', 'inv_h_insurance', 'inv_h_purtax', 'inv_h_purcst', 'inv_h_others', 'inv_h_spotchrg', 'inv_h_freight',
            'purinv_inc',
            'purinv_spotvalue',
            'purinv_cgst',
            'purinv_sgst',
            'purinv_igst', 'purinv_freight_flag','purinv_tcs'
        ])
    });
    var StorePurchaseDetailsMinDataStore = new Ext.data.Store({
        id: 'StorePurchaseDetailsMinDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno'
        ])
    });

    var TempDataStore = new Ext.data.Store({
        id: 'TempDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Temp"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'itemname', 'itemsubgroupname', 'Value',
            'DebitAmtt', 'ValueDef'
        ])
    });

    var StoreDetailsMinTrailDataStore = new Ext.data.Store({
        id: 'StoreDetailsMinTrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StoreDetailsMinTrail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno', 'item_name', 'itemsubgroup_name', 'min_qty', 'min_shortage_qty', 'prod_code',
            'min_purret_qty', 'min_unit_rate', 'purinv_freight_flag', 'min_cost_rate', 'min_freight_rate'
        ])
    });
    var StoreDetailsMinTrailDataStore123 = new Ext.data.Store({
        id: 'StoreDetailsMinTrailDataStore123',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StoreDetailsMinTrail123"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'qty', 'item_name', 'itemsubgroup_name', 'min_qty', 'min_shortage_qty', 'prod_code',
            'min_purret_qty', 'min_unit_rate', 'purinv_freight_flag', 'min_cost_rate', 'min_freight_rate'
        ])
    });


    var InvoiceNoCheckDetailsDataStore = new Ext.data.Store({
        id: 'InvoiceNoCheckDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvoiceNoCheckDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['cnt'])
    });

    var MinlenDataStore = new Ext.data.Store({
        id: 'MinlenDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Minlen"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['discount', 'tngst', 'cst', 'exciseduty', 'AddExduty_val', 'other1', 'min_clearing', 'min_licence', 'min_freight_acctflag', 'freight', 'min_cgstvalue', 'min_sgstvalue', 'min_igstvalue', 'min_roundoffvalue','min_tcsvalue'])
    });
    var DbcrnoteDataStore = new Ext.data.Store({
        id: 'DbcrnoteDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Dbcrnote"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['dbcr_type', 'dbcr_value', 'dbcr_no'])
    });
    var Minlen2DataStore = new Ext.data.Store({
        id: 'Minlen2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Minlen2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['discount', 'tngst', 'CST', 'exciseduty', 'AddExduty_val', 'other1', 'min_clearing', 'min_licence', 'min_freight_acctflag', 'freight'])
    });
    var MaxdateDataStore = new Ext.data.Store({
        id: 'MaxdateDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Maxdate"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['max_mindate'])
    });

    var Maxdate2DataStore = new Ext.data.Store({
        id: 'Maxdate2DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Maxdate2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['max_mindate'])
    });
    var StorePurchaseDetailsMinrDataStore = new Ext.data.Store({
        id: 'StorePurchaseDetailsMinrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StorePurchaseDetailsr"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno'
        ])
    });

    var StoreDetailsMinTrailrDataStore = new Ext.data.Store({
        id: 'StoreDetailsMinTrailrDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "StoreDetailsMinTrailr"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinv_min_seqno', 'item_name', 'itemsubgroup_name', 'min_qty',
            'min_purret_qty', 'min_unit_rate'
        ])
    });
//StoresEnd//
//Fibre//

    var FibrePurchaseVouDateDetailsDataStore = new Ext.data.Store({
        id: 'FibrePurchaseVouDateDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseVouDateDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'max_mindate'
        ])
    });

    var FibrePurchaseDdbcrNoteDataStore = new Ext.data.Store({
        id: 'FibrePurchaseDdbcrNoteDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseDdbcrNote"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'dbcr_value', 'dbcr_type'
        ])
    });

    var FibrePurchaseMinTrailerDetailsDataStore = new Ext.data.Store({
        id: 'FibrePurchaseMinTrailerDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseMinTrailerDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'scval', 'charity', 'forwardcharg', 'aedval', 'bedval', 'educess', 'insurance', 'discount', 'Discountreason', 'exciseduty',
            'cess', 'other1', 'freight', 'vatval', 'handpack', 'min_freight_acctflag', 'VAT', 'CST', 'Freightacctflag', ''
        ])
    });

    var FibrePurchaseMinTrailerDataStore = new Ext.data.Store({
        id: 'FibrePurchaseMinTrailerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseMinTrailer"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'prod_code', 'itemsubgroup_name', 'min_qty', 'min_purret_qty', 'min_unit_rate', 'min_cost_rate', 'min_shortage_qty', 'Qty', 'Purretqty', 'Unitrate', 'Costrate'
        ])
    });

    var FibrePurchaseMinHeaderDataStore = new Ext.data.Store({
        id: 'FibrePurchaseMinHeaderDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseMinHeader"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'item_name', 'itemsubgroup_name', 'min_qty', 'min_purret_qty', 'min_unit_rate', 'min_cost_rate'
        ])
    });

    var FibrePurchaseMinseqnoDataStore = new Ext.data.Store({
        id: 'FibrePurchaseMinseqnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchaseMinseqno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'MinSeqno'
        ])
    });
    var FibrePurchaseDataStore = new Ext.data.Store({
        id: 'FibrePurchaseDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "FibrePurchase"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Netvalue', 'Date', 'purinv_freight_flag', 'PurinvDbcrFlag'
        ])
    });
//Fibre End//
//Terry//

    var TerryPurchaseVouDateDetailsDataStore = new Ext.data.Store({
        id: 'TerryPurchaseVouDateDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseVouDateDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'max_mindate'
        ])
    });

    var TerryPurchaseDdbcrNoteDataStore = new Ext.data.Store({
        id: 'TerryPurchaseDdbcrNoteDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseDdbcrNote"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'dbcr_value', 'dbcr_type'
        ])
    });

    var TerryPurchaseMinTrailerDetailsDataStore = new Ext.data.Store({
        id: 'TerryPurchaseMinTrailerDetailsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseMinTrailerDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'scval', 'charity', 'forwardcharg', 'aedval', 'bedval', 'educess', 'insurance', 'discount', 'Discountreason', 'exciseduty',
            'cess', 'other1', 'freight', 'vatval', 'handpack', 'min_freight_acctflag', 'VAT', 'CST', 'Freightacctflag', ''
        ])
    });

    var TerryPurchaseMinTrailerDataStore = new Ext.data.Store({
        id: 'TerryPurchaseMinTrailerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseMinTrailer"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'prod_code', 'itemsubgroup_name', 'MinKilos', 'MinPurretQty', 'MinUnitRate', 'MinCostRate'
        ])
    });

    var TerryPurchaseMinHeaderDataStore = new Ext.data.Store({
        id: 'TerryPurchaseMinHeaderDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseMinHeader"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'prod_code', 'itemsubgroup_name', 'MinKilos', 'MinPurretQty', 'MinUnitRate', 'MinCostRate'
        ])
    });

    var TerryPurchaseMinseqnoDataStore = new Ext.data.Store({
        id: 'TerryPurchaseMinseqnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchaseMinseqno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'purinvminseqno'
        ])
    });
    var TerryPurchaseDataStore = new Ext.data.Store({
        id: 'TerryPurchaseDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "TerryPurchase"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'PurinvNetvalue', 'PurinvDate', 'PurinvFrightFlag', 'PurinvDbcrFlag'
        ])
    });
//Terry End//
//Yarn//
    var YarnPurchaseDataStore = new Ext.data.Store({
        id: 'YarnPurchaseDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "YarnPurchase"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'Yarn_Inward_DC_date', 'Yarn_Inv_netvalue', 'Yarn_Inv_Date', 'Yarn_Inward_grossvalue', 'Yarn_Inv_tngst_val', 'Yarn_Inv_cst_val', 'Yarn_Inv_Tax_Flag', 'Yarn_Inv_Bed_value'
                    , 'Yarn_Inv_Aed_value', 'Yarn_Inv_tngst_val', 'Yarn_Inv_othercharges_val', 'Yarn_Inv_surcharge_val', 'Yarn_Inv_cess_value', 'Yarn_Inv_freight_val', 'Yarn_Inv_freight_acctflag',
            'Yarn_Inv_discount', 'Yarn_Inv_Round_amt', 'Yarn_Inv_Date1', 'Yarn_Inward_DC_date1', 'Yarn_Inv_con_charges', 'Yarn_Inv_freight_acctflag', 'Yarn_Inv_Insurance_value', 'yarn_igst', 'yarn_sgst', 'yarn_cgst','yarn_tcs'
        ])
    });

    var YarnPurchaseTrailDataStore = new Ext.data.Store({
        id: 'YarnPurchaseTrailDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "YarnPurchaseTrail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'count_prefix', 'Yarn_Inv_qty', 'Yarn_Inv_rate'
        ])
    });

    var GroupAgsDataStore = new Ext.data.Store({
        id: 'GroupAgsDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "GroupAgs"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_code', 'led_name'
        ])
    });

    var Dbcrnote1DataStore = new Ext.data.Store({
        id: 'Dbcrnote1DataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Dbcrnote1"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['dbcr_type', 'dbcr_value', 'dbcr_no'])
    });


    var PurchseSeqnoDataStore = new Ext.data.Store({
        id: 'PurchseSeqnoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "PurchseSeqno"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_seqno'])
    });

    var MillnameDataStore = new Ext.data.Store({
        id: 'MillnameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbMillName"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'mill_code', type: 'int', mapping: 'g_milid'},
            {name: 'mill_name', type: 'string', mapping: 'mil_name'}
        ])
    });

    var VendornameDataStore = new Ext.data.Store({
        id: 'VendornameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "VendorName"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'vendor_code'},
            {name: 'led_name', type: 'string', mapping: 'vendor_name'}
        ])
    });

    var PurchseNoDataStore = new Ext.data.Store({
        id: 'PurchseNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "PurchaseNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'accref_vouno'
        ])
    });

    var MonthDataStore = new Ext.data.Store({
        id: 'MonthDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbMonth"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'month_code', type: 'int', mapping: 'month_code'},
            {name: 'month_name', type: 'string', mapping: 'month_name'}
        ])
    });

    var InvoiceNoDataStore = new Ext.data.Store({
        id: 'InvoiceNoDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "InvoiceNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'seqno', type: 'int', mapping: 'purinv_seqno'},
            {name: 'Inv_no', type: 'string', mapping: 'purinv_party_invno'}
        ])
    });

    var partyledgerDataStore = new Ext.data.Store({
        id: 'partyledgerDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "partyledger"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'led_code', type: 'int', mapping: 'vendor_code'}, 'led_code',
            {name: 'led_name', type: 'string', mapping: 'vendor_name'}
        ])
    });

    var GroupDataStore = new Ext.data.Store({
        id: 'GroupDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbGroup"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Group_code', type: 'int', mapping: 'led_code'},
            {name: 'Group_name', type: 'string', mapping: 'led_name'}
        ])
    });

    var partyledgeravailbaleDataStore = new Ext.data.Store({
        id: 'partyledgeravailbaleDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "partyledgeravailbal"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'led_name', 'led_code'
        ])
    });

    var DbcrvalueDataStore = new Ext.data.Store({
        id: 'DbcrvalueDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Dbcrvalue"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            'dbcr_type', 'dbcr_no', 'dbcr_value', 'dbcr_seqno'
        ])
    });
//YarnEnd//

    var optDepartment = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 900,
        height: 50,
        border: false,
        items: [{xtype: 'radiogroup', columns: 5, rows: 1, id: 'optDepartment',
                items: [
                    {boxLabel: 'Stores', name: 'optDept', inputValue: 1, id: 'idstores',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    flxDetails.getStore().removeAll();
                                    cmbMonth.hide();
                                    cmbMillName.hide();
                                    cmbGroup.show();
                                    prefix = 'S';
                                    Purchasevendor();
                                    PurchaseNo();
                                }
                            }
                        }},
                    {boxLabel: 'Coal', name: 'optDept', inputValue: 2, id: 'idcoal',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    flxDetails.getStore().removeAll();
                                    // dbnoteclear();
                                    cmbMonth.hide();
                                    cmbMillName.hide();
                                    cmbGroup.show();
                                    prefix = 'Y';
                                    Purchasevendor();
                                    PurchaseNo();
                                }
                            }
                        }},
                    {boxLabel: 'Fuel', name: 'optDept', inputValue: 3, id: 'idfuel',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    flxDetails.getStore().removeAll();
                                    dbnoteclear();
                                    cmbMonth.show();
                                    cmbMillName.show();
                                    cmbGroup.hide();
                                    prefix = 'CT';
                                    MillnameDataStore.load({
                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                        params: {
                                            task: 'cmbMillName'
                                        }
                                    });
                                    Purchasevendor();
                                    PurchaseNo();
                                }
                            }
                        }},
                    {boxLabel: 'Waster Paper-Indigeneous', name: 'optDept', inputValue: 4, hidden: false, id: 'idrmlocal',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    flxDetails.getStore().removeAll();
                                    dbnoteclear();
                                    cmbMonth.hide();
                                    cmbMillName.hide();
                                    cmbGroup.show();
                                    prefix = 'B';
                                    Purchasevendor();
                                    PurchaseNo();
                                }
                            }
                        }},
                    {boxLabel: 'Waster Import', name: 'optDept', inputValue: 5, hidden: false, id: 'idrmimport',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    flxDetails.getStore().removeAll();
                                    dbnoteclear();
                                    cmbMonth.hide();
                                    cmbMillName.hide();
                                    cmbGroup.show();
                                    prefix = 'B';
                                    Purchasevendor();
                                    PurchaseNo();
                                }
                            }
                        }},

                ]
            }
        ]
    });

    var cmbVendorname = new Ext.form.ComboBox({
        fieldLabel: 'Name',
        width: 440,
        store: VendornameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        hiddenName: 'led_name',
        id: 'cmbVendorname',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                fdbl_vendorcode = 0;
                fdbl_vendorcode = cmbVendorname.getValue();
            },
            blur: function () {
                flxDetails.getStore().removeAll();
                flxDetails1.getStore().removeAll();
                InvoiceNoDataStore.removeAll();
                partyledgerDataStore.removeAll();
                txtAmt.setRawValue('');
                txtSuphead.setRawValue('');
                txtAmtpass.setRawValue('');
                txtTotVal.setRawValue('');
                flxDetailsmin.getStore().removeAll();
                cmbInvoiceNo.setRawValue("");
                fdbl_vendorcode = cmbVendorname.getValue();
                txtSuphead.setRawValue("");
                InvoiceNoDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'InvoiceNo',
                        prefix: prefix,
                        prefix1: prefix1,
                        vendorcode: fdbl_vendorcode,
                        companycode: compcode,
                        finid: ginfinid,
                        finyear: Finyear,
                        millname: cmbMillName.getValue(),
                        month: cmbMonth.getValue()
                    },
                    callback: function () {
                        var cnt2 = InvoiceNoDataStore.getCount();
                        if (cnt2 > 0) {
                            partyledgerDataStore.load({
                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                params: {
                                    task: 'partyledger',
                                    prefix: prefix,
                                    gincompany: compcode,
                                    vendorcode: fdbl_vendorcode
                                },
                                callback: function () {
                                    var cnt1 = partyledgerDataStore.getCount();
                                    if (cnt1 > 0) {
                                        fdbl_ledcode = partyledgerDataStore.getAt(0).get('led_code');
                                        partyledgeravailbaleDataStore.load({
                                            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                            params: {
                                                task: 'partyledgeravailbal',
                                                compcode: compcode,
                                                ledcode: fdbl_ledcode
                                            },
                                            callback: function () {
                                                var cnt1 = partyledgeravailbaleDataStore.getCount();
                                                if (cnt1 > 0) {
                                                    var ledname = partyledgeravailbaleDataStore.getAt(0).get('led_name');
                                                    txtSuphead.setRawValue(ledname);
                                                } else {
                                                    Ext.Msg.alert("Alert", "No ledger Details Available for this party" + fdbl_ledcode);
                                                }
                                            }
                                        });
                                    } else {
                                        Ext.Msg.alert("Alert", "No Account Ledger found for this Party");
                                    }
                                }
                            });
                        } else {
                            if (cmbVendorname.getRawValue() !== "") {
                                Ext.Msg.alert("ACCOUNTS", "No Invoices Pending for the Vendor for the current Period" + fdbl_vendorcode);
                            }
                        }
                    }
                });
            }
        }
    });

    var cmbInvoiceNo = new Ext.form.ComboBox({
        fieldLabel: 'Invoice No',
        width: 150,
        displayField: 'Inv_no',
        valueField: 'seqno',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        hiddenName: 'Inv_no',
        id: 'cmbInvoiceNo',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        store: InvoiceNoDataStore,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            blur: function () {
                cntrow = 0;
                dtpInvoiceDate.setRawValue(new Date().format('Y-m-d'));
                dtpVocherDate.setRawValue(new Date().format('Y-m-d'));
                txtAmt.setRawValue('');
                txtAmtpass.setRawValue('');
                txtTotVal.setRawValue('');
                flxDetails.getStore().removeAll();
                flxDetailsmin.getStore().removeAll();
                flxDetails1.getStore().removeAll();
                DbcrvalueDataStore.removeAll();
                fst_dbcrtype = "";
                dbcrvalue = 0;
                dbcrno = '';
                fst_dbcrtype = '';
                dbcrseqnoold = 0;
                if (prefix == "S") {
                    Stores_Itemlist();
                } else if (prefix == "Q") {
                    Stores_Itemlistnew();
                } else if (prefix == "A") {
                    Madeups_Itemlist();
                } else if (prefix == "B") {
                    BWH_Itemlist();
                } else if (prefix == "M") {
                    IFD_Itemlist();
                } else if (prefix == "IM") {
                    WorkorderIFD_Itemlist();
                } else if (prefix == "Y") {
                    Yarn_Itemlist();
                } else if (prefix == "C") {
                    Yarn_Itemlist_Old();
                } else if (prefix == "CT") {
                    Cotton_Itemlist();
                } else if (prefix == "K") {
                    Fibre_ItemList();
                } else if (prefix == "D") {
                    Trigger_ItemList();
                } else if (prefix == "W") {
                    workorder_Itemlist();
                } else if (prefix == "Z") {
                    Madeupsworkorder_Itemlist();
                } else if (prefix1 == "X") {
                    IFD_workorder_Itemlist();
                } else if (prefix == "IY") {
                    import_yarn();
                } else if (prefix == "T") {
                    Terry_ItemList();
                }
                // alert(fdbl_ledcode)	
                DbcrvalueDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'Dbcrvalue',
                        invno: cmbInvoiceNo.getRawValue(),
                        ledcode: fdbl_ledcode,
                        ginfinid: ginfinid,
                        gincompany: compcode
                    },
                    callback: function () {
                        var cnt = 0;
                        cnt = DbcrvalueDataStore.getCount();
                        if (cnt > 0) {
                            dbcrvalue = DbcrvalueDataStore.getAt(0).get('dbcr_value');
                            dbcrno = DbcrvalueDataStore.getAt(0).get('dbcr_no');
                            fst_dbcrtype = DbcrvalueDataStore.getAt(0).get('dbcr_type');
                            dbcrseqnoold = DbcrvalueDataStore.getAt(0).get('dbcr_seqno');
                        } else {
                            dbcrvalue = 0;
                            dbcrno = "";
                            fst_dbcrtype = "";
                            dbcrseqnoold = 0;
                        }
                    }
                });
            }
        }
    });

    var dtpInvoiceDate = new Ext.form.DateField({
        fieldLabel: 'Invoice Date',
        id: 'dtpInvoiceDate',
        name: 'date',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '10px', 'font-weight': 'bold'
        },
        format: 'Y-m-d', readOnly: true,
        value: new Date(),
        editable: false,
        anchor: '100%'
    });

    var txtAmt = new Ext.form.NumberField({
        fieldLabel: 'Amount',
        id: 'txtAmt',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        width: 80, readOnly: true,
        name: 'Amount',
        listeners: {
            blur: function () {
                cmbGroup.focus();

            }
        }
    });

    var txtSuphead = new Ext.form.TextField({
        fieldLabel: 'Supp.head',
        id: 'txtSuphead',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        width: 275, readOnly: true,
        name: 'Supphead'
    });

    var txtAmtpass = new Ext.form.NumberField({
        fieldLabel: 'Amt Passed',
        id: 'txtAmtpass',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        width: 90, readOnly: true,
        name: 'Amtpass'
    });

    var dtpVocherDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpVocherDate',
        name: 'date',
        editable: false,
        format: 'Y-m-d', readOnly: true,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '10px', 'font-weight': 'bold'
        },
        value: new Date(),
        anchor: '100%'
    });

    var txtVocherNo = new Ext.form.TextField({
        fieldLabel: 'Vou.No',
        id: 'txtVocherNo',
        style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        width: 90, readOnly: true,
        name: 'VocherNo'
    });

    var cmbMillName = new Ext.form.ComboBox({
        fieldLabel: 'Mill Name',
        width: 200,
        hidden: true,
        store: MillnameDataStore,
        style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        displayField: 'mill_name',
        valueField: 'mill_code',
        hiddenName: 'mill_name',
        id: 'cmbMillName',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                VendornameDataStore.removeAll();
                VendornameDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'VendorNameMill'
                    },
                    callback: function () {
                        var cnt = VendornameDataStore.getCount();
                        if (cnt > 0) {
                        } else {
                            Ext.Msg.alert("Alert", "Party Master Not Available");
                        }
                    }
                });
            }
        }
    });

    var cmbMonth = new Ext.form.ComboBox({
        fieldLabel: 'Month',
        width: 150,
        store: MonthDataStore,
        hidden: true,
        style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        displayField: 'month_name',
        valueField: 'month_code',
        hiddenName: 'month_name',
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false
    });

    var cmbGroup = new Ext.form.ComboBox({
        fieldLabel: 'Group',
        width: 250,
        store: GroupDataStore,
        style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        displayField: 'Group_name',
        valueField: 'Group_code',
        hiddenName: 'Group_name',
        id: 'cmbGroup',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        listeners: {
            select: function () {
                GroupAgsDataStore.removeAll();
                name = cmbGroup.getRawValue();
                lednewcode = 0;
                var selected_rows = flxDetails.getSelectionModel().getSelections();
                for (var i = 0; i < selected_rows.length; i++) {
                    GroupAgsDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'GroupAgs',
                            name: name,
                            compcode: compcode
                        },
                        callback: function () {
                            lednewcode = GroupAgsDataStore.getAt(0).get('led_code');

                            flxDetails.getSelectionModel().selectAll();
                            var selected_rows = flxDetails.getSelectionModel().getSelections();
                            for (var i = 0; i < selected_rows.length; i++)
                            {
                                if (compcode === '1') {
                                    if (selected_rows[i].data.itemname !== 'CGST INPUT' && selected_rows[i].data.itemname !== 'SGST INPUT' && selected_rows[i].data.itemname !== 'IGST INPUT' && selected_rows[i].data.itemname !== 'TCS RECOVERABLE ON PURCHASE') {
                                        selected_rows[i].set('ValueDef', lednewcode);
                                        selected_rows[i].set('AccountName', name);
                                    }
                                } else if (compcode === '4') {
                                    if (selected_rows[i].data.itemname !== 'CGST INPUT' && selected_rows[i].data.itemname !== 'SGST INPUT' && selected_rows[i].data.itemname !== 'IGST INPUT' && selected_rows[i].data.itemname !== 'TCS RECOVERABLE ON PURCHASE') {
                                        selected_rows[i].set('ValueDef', lednewcode);
                                        selected_rows[i].set('AccountName', name);
                                    }
                                } else if (compcode === '11') {
                                    if (selected_rows[i].data.itemname !== 'CGST INPUT' && selected_rows[i].data.itemname !== 'SGST INPUT' && selected_rows[i].data.itemname !== 'IGST INPUT' && selected_rows[i].data.itemname !== 'TCS RECOVERABLE ON PURCHASE') {
                                        selected_rows[i].set('ValueDef', lednewcode);
                                        selected_rows[i].set('AccountName', name);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        }
    });

    var flxDetails1 = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 200,
        width: 500,
        columns: [
            {header: "Name", dataIndex: 'itemname', sortable: true, width: 100, align: 'left'},
            {header: "Group", dataIndex: 'itemsubgroupname', sortable: true, width: 100, align: 'left'},
            {header: "Value", dataIndex: 'Value', sortable: true, width: 100, align: 'left'},
            {header: "Debit Amt", dataIndex: 'DebitAmtt', sortable: true, width: 100, align: 'left'},
            {header: "ValueDef", dataIndex: 'ValueDef', sortable: true, width: 100, align: 'left'}
        ],
        store: TempDataStore
    });

    var cntgrid = Ext.data.Record.create([]);
    var btnCheck = new Ext.Button({
        style: 'text-align:center;',
        text: "Check",
        width: 60,
        x: 700,
        y: 300,
        listeners: {
            click: function () {

                flxDetails1.getStore().removeAll();
                flxDetails.getSelectionModel().selectAll();
                var selrows = flxDetails.getSelectionModel().getCount();
                var sel = flxDetails.getSelectionModel().getSelections();
                var ccnt = flxDetails.getStore().getCount();
                for (var i = 0; i < ccnt; i++) {
                    var itemnamenew = sel[i].data.itemname;
                    var itemsubgroupname = sel[i].data.itemsubgroupname;
                    var Value = sel[i].data.Value;
                    var DebitAmtt = sel[i].data.DebitAmtt;
                    var ValueDef = sel[i].data.ValueDef;

                    flxDetails1.getSelectionModel().selectAll();
                    var selrowsnew = flxDetails1.getSelectionModel().getCount();
                    var selnew = flxDetails1.getSelectionModel().getSelections();
                    var ccntnew = flxDetails1.getStore().getCount();
                    var cnt = 0;
                    //alert(ccntnew)
                    if (ccntnew == 0)
                    {
                        flxDetails1.getStore().insert(
                                flxDetails1.getStore().getCount(),
                                new cntgrid({
                                    itemname: itemnamenew,
                                    itemsubgroupname: itemsubgroupname,
                                    Value: Value,
                                    DebitAmtt: DebitAmtt,
                                    ValueDef: ValueDef
                                })
                                );
                    } else
                    {
                        var ccnt = flxDetails.getStore().getCount();

                        for (var j = 0; j < ccntnew; j++) {
                            if (selnew[j].data.ValueDef === ValueDef) {
                                cnt = Number(selnew[j].data.DebitAmtt) + Number(DebitAmtt);
                                selnew[j].set('DebitAmtt', cnt);

                            } else {

                                flxDetails1.getStore().insert(
                                        flxDetails1.getStore().getCount(),
                                        new cntgrid({
                                            itemname: itemnamenew,
                                            itemsubgroupname: itemsubgroupname,
                                            Value: Value,
                                            DebitAmtt: DebitAmtt,
                                            ValueDef: ValueDef
                                        })
                                        );
                            }
                        }

                    }
                }
            }
        }
    });

    var flxDetailsmin = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: 'Min Details',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        hidden: true,
        scrollable: true,
        height: 80,
        width: 103,
        x: 1150,
        y: 60,
        columns: [
            {header: "Min.No", dataIndex: 'pst_mi', sortable: true, width: 100, align: 'left'}
        ],
        store: []
    });

    var flxDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        fieldLabel: 'Bill Details',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 130,
        width: 688,
        x: 0,
        y: 0,
        columns: [
            {header: "Sno", dataIndex: 'Sno', sortable: true, width: 20, align: 'left'},
            {header: "Name", dataIndex: 'itemname', sortable: true, width: 180, align: 'left'},
            {header: "Group", dataIndex: 'itemsubgroupname', sortable: true, width: 100, align: 'left'},
            {header: "Value", dataIndex: 'Value', sortable: true, width: 100, align: 'left', hidden: true},
            {header: "", dataIndex: 'ValueDef', sortable: true, width: 100, align: 'left'},
            {header: "Account Name", dataIndex: 'AccountName', sortable: true, width: 200, align: 'left',
                editor: new fm.ComboBox({
                    allowBlank: false,
                    store: 'GroupDataStore',
                    displayField: 'Group_name',
                    valueField: 'Group_name',
                    hiddenName: 'Group_name',
                    id: 'cmbaccname',
                    typeAhead: true,
                    mode: 'local',
                    forceSelection: false,
                    triggerAction: 'all',
                    selectOnFocus: false,
                    editable: true,
                    allowblank: false,
                    listeners: {
                        select: function () {
                            name = this.getRawValue();
                            GroupAgsDataStore.load({
                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                params: {
                                    task: 'GroupAgs',
                                    name: name,
                                    compcode: compcode
                                },
                                callback: function () {
                                    lednewcode = GroupAgsDataStore.getAt(0).get('led_code');
                                    var selected_rows = flxDetails.getSelectionModel().getSelections();
                                    for (var i = 0; i < selected_rows.length; i++)
                                    {
                                        if (selected_rows[i].data.itemname !== 'CGST INPUT' && selected_rows[i].data.itemname !== 'SGST INPUT' && selected_rows[i].data.itemname !== 'IGST INPUT' && selected_rows[i].data.itemname !== 'TCS RECOVERABLE ON PURCHASE') {
                                            selected_rows[i].set('ValueDef', lednewcode);
                                        }
                                    }
                                }
                            });

                        }
                    }
                })},
            {header: "Debit Amt", dataIndex: 'DebitAmtt', sortable: true, width: 80, align: 'left'}
        ],
        store: []
    });

    var txtNarration = new Ext.form.TextArea({
        fieldLabel: 'Narration',
        id: 'txtNarration',
        width: 450,
        height: 50, style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        name: 'Narration'
    });

    var txtNarration1 = new Ext.form.TextArea({
        fieldLabel: 'Remark',
        id: 'txtNarration1',
        width: 180, hidden: true,
        style: {
            'color': '#3399CC', 'textTransform': 'uppercase',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        height: 50,
        name: 'txtNarration1'
    });


    var txtTotVal = new Ext.form.NumberField({
        fieldLabel: 'Total Debit Amount',
        id: 'txtTotVal', readOnly: true,
        width: 100,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        name: 'Debit'
    });

    var ControlmasterDataStore = new Ext.data.Store({
        id: 'ControlmasterDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "ControlDebitNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['accref_vouno'])
    });

    var optOption = new Ext.form.FieldSet({
        xtype: 'fieldset',
        title: '',
        layout: 'vbox',
        width: 150,
        height: 100,
        border: false,
        items: [{xtype: 'radiogroup', columns: 2, rows: 1, id: 'optOption',
                items: [
                    {
                        boxLabel: 'TDS', name: 'optTds', inputValue: 1, id: 'tdsadd',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    tdsinclude = 1;
                                    ControlmasterDataStore.load({
                                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                        params: {
                                            task: 'ControlDebitNo',
                                            ginfinid: ginfinid,
                                            gincompcode: compcode
                                        },
                                        callback: function () {
                                            txtDnNo.show();
                                            cmbReason.show();
                                            txtDebitVal.show();
                                            cmbCreditor.show();
                                            txtNarration1.show();
                                            dtpDate.show();
                                            btnAdd.show();
                                            txttdsper.hide();
                                            txttdsvalue.hide();
                                            flxBillDetail.show();
                                            txtDnNo.setRawValue("");
                                            cmbReason.setRawValue("");
                                            txttdsper.setValue('');
                                            txttdsvalue.setValue('');
                                            txtDebitVal.setRawValue("");
                                            txtNarration1.setRawValue("");
                                            cmbCreditor.setRawValue("");
                                            txtDnPer.setRawValue("");
                                            txtDnNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
                                            ReasonDataStore.load({
                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                params: {
                                                    task: 'cmbReason'
                                                }
                                            });
                                            PartynameDataStore.load({
                                                url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                                                params: {
                                                    task: 'Partyname',
                                                    gincompany: compcode,
                                                    ginfinid: ginfinid,
                                                    bill: 'O'
                                                }
                                            });
                                        }
                                    });
                                }
                            }
                        }
                    }, {
                        boxLabel: 'TDS No', name: 'optTds', inputValue: 2, checked: true, id: 'tdsno',
                        listeners: {
                            check: function (rb, checked) {
                                if (checked == true) {
                                    tdsinclude = 0;
                                    txtDnNo.setRawValue("");
                                    txtDebitVal.setRawValue("");
                                    cmbReason.setRawValue("");
                                    cmbCreditor.setRawValue("");
                                    txttdsper.setValue('');
                                    txttdsvalue.setValue('');
                                    txtNarration1.setRawValue("");
                                    txtDnPer.setRawValue("");
                                    txtDnNo.hide();
                                    txtDebitVal.hide();
                                    btnAdd.hide();
                                    txttdsper.hide();
                                    txttdsvalue.hide();
                                    txtDnPer.hide();
                                    txtNarration1.hide();
                                    dtpDate.hide();
                                    flxBillDetail.hide();
                                    flxBillDetail.getStore().removeAll();
                                    ReasonDataStore.removeAll();
                                    PartynameDataStore.removeAll();
                                    cmbReason.hide();
                                    cmbCreditor.hide();
                                }
                            }
                        }
                    },
                ]
            }]
    });

    var txtDnNo = new Ext.form.TextField({
        fieldLabel: 'DN.No',
        id: 'txtDnNo',
        width: 70,
        hidden: true,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        name: '',
        readOnly: true
    });

    var txtDnPer = new Ext.form.TextField({
        fieldLabel: '%',
        id: 'txtDnPer',
        width: 30,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        hidden: true,
        name: '', enableKeyEvents: true,
        listeners: {
            keyup: function () {
                txtDebitVal.setRawValue("0.00");
                var newpercal = Ext.util.Format.number(Number(txtAmtpass.getRawValue()) * Number(txtDnPer.getRawValue()) / Number(100), '0.00');
                txtDebitVal.setRawValue(newpercal);
            }
        }
    });

    var ReasonDataStore = new Ext.data.Store({
        id: 'ReasonDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "cmbReason"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'Reason_code', type: 'int', mapping: 'reason_code'},
            {name: 'Reason_name', type: 'string', mapping: 'reason_name'}
        ])
    });

    var dtpDate = new Ext.form.DateField({
        fieldLabel: '',
        id: 'dtpDate',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '10px', 'font-weight': 'bold'
        },
        name: 'date', hidden: true,
        format: 'Y-m-d',
        value: new Date(),
        anchor: '100%'
    });

    var txtDebitVal = new Ext.form.NumberField({
        fieldLabel: 'DN.Value',
        id: 'txtDebitVal',
        width: 70,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        hidden: true,
        name: 'DebitVal'
    });

    var flxBillDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true, hidden: true,
        scrollable: true,
        height: 130,
        width: 220,
        x: 5,
        y: 5,
        columns: [
            {
                header: "No",
                dataIndex: 'Inv_no',
                sortable: true,
                width: 45,
                align: 'left'
            },
            {
                header: "Date",
                dataIndex: 'Invoice_date',
                sortable: true,
                width: 90,
                align: 'left'
            },
            {
                header: "InvValue", hidden: true,
                dataIndex: 'Invoice_val',
                sortable: true,
                width: 45,
                align: 'left'
            },
            {
                header: "Value",
                dataIndex: 'Debit_val',
                sortable: true,
                width: 72,
                align: 'left'
            },
            {
                header: "",
                dataIndex: 'value',
                sortable: true, hidden: true,
                width: 80,
                align: 'left'
            }
        ],
        store: []
    });

    var btnAdd = new Ext.Button({
        style: 'text-align:center;',
        text: "Add",
        width: 60, hidden: true,
        x: 630,
        y: 430,
        listeners: {
            click: function () {
                if (cmbInvoiceNo.getRawValue() === "" || cmbInvoiceNo.getValue()  <= 0) {
                    Ext.Msg.alert("Alert", "Select Invoice No!")
                } else if (txtDebitVal.getRawValue() === "" || txtDebitVal.getValue() <= 0) {
                    Ext.Msg.alert("Alert", "Enter Debit Value!")
                } else if (txtAmt.getRawValue() === "" || txtAmt.getRawValue() <= 0) {
                    Ext.Msg.alert("Alert", "Enter Invoice Value!")
                } else if (Number(txtTotVal.getValue()) < Number(txtDebitVal.getValue())) {
                    Ext.Msg.alert("Alert", "Check Invoice Value and Debit Value!")
                } else {
                    flxBillDetail.getSelectionModel().selectAll();
                    var selro = flxBillDetail.getSelectionModel().getCount();
                    var sele = flxBillDetail.getSelectionModel().getSelections();
                    var cnt1 = 0;
                    for (var t = 0; t < selro; t++) {
                        if (sele[t].data.Inv_no == cmbInvoiceNo.getRawValue())
                        {
                            cnt1 = cnt1 + 1;
                        }
                    }
                    if (cnt1 > 0) {
                        Ext.MessageBox.alert("Bill", "Bill already entered");
                    } else {
                        var rowcnt = flxBillDetail.getStore().getCount() + 1;
                        flxBillDetail.getStore().insert(
                                flxBillDetail.getStore().getCount(),
                                new dgrecord({
                                    Sno: rowcnt,
                                    Inv_no: cmbInvoiceNo.getRawValue(),
                                    Invoice_date: dtpInvoiceDate.getRawValue(),
                                    Debit_val: txtDebitVal.getValue(),
                                    Invoice_val: txtAmt.getValue(),
                                    value: cmbInvoiceNo.getValue()
                                })
                                );
                    }
                }
            }
        }
    });

    var PartynameDataStore = new Ext.data.Store({
        id: 'PartynameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "Partyname"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code', 'led_name'])
    });

    var grpcodetds = 0;
    var cmbCreditor = new Ext.form.ComboBox({
        fieldLabel: 'Creditor',
        width: 160,
        hidden: true,
        store: PartynameDataStore,
        displayField: 'led_name',
        valueField: 'led_code',
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        hiddenName: 'led_name',
        id: 'cmbCreditor',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        style :{textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }, select: function () {
                grpcodetds = 0;
                txttdsper.setValue('');
                txttdsvalue.setValue('');
                TdsLedgergetDataStore.removeAll();
                TdsLedgergetDataStore.load({
                    url: '/DPM/Financials/datechk.php',
                    params: {
                        task: 'TdsLedgerget',
                        ledger: cmbCreditor.getValue()
                    },
                    callback: function () {
                        grpcodetds = TdsLedgergetDataStore.getAt(0).get('led_grp_code');
                        if (grpcodetds === '65') {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.show();
                            txttdsvalue.show();
                        } else {
                            txttdsper.setValue('');
                            txttdsvalue.setValue('');
                            txttdsper.hide();
                            txttdsvalue.hide();
                        }
                    }
                });
            }
        }
    });

    var txttdsper = new Ext.form.NumberField({
        fieldLabel: 'TDS%',
        id: 'txttdsper', hidden: true,
        width: 100,
        name: 'txttdsper'
    });

    var txttdsvalue = new Ext.form.NumberField({
        fieldLabel: 'TDS AMT',
        id: 'txttdsvalue', hidden: true,
        width: 100,
        name: 'txttdsvalue'
    });

    var cmbReason = new Ext.form.ComboBox({
        fieldLabel: 'Reason',
        width: 150,
        hidden: true,
        store: ReasonDataStore,
        style: {
            'color': '#3399CC',
            'style': 'Helvetica',
            'font-size': '12px', 'font-weight': 'bold'
        },
        displayField: 'Reason_name',
        valueField: 'Reason_code',
        hiddenName: 'Reason_name',
        id: 'cmbReason',
        typeAhead: true,
        mode: 'local',
        forceSelection: false,
        triggerAction: 'all',
        selectOnFocus: false,
        editable: true,
        allowblank: false,
        style :{textTransform: "uppercase"},
        listeners: {
            blur: function (field, newValue, oldValue) {
                field.setValue(newValue.toUpperCase());
            }
        }
    });

    var btnok = new Ext.Button({
        style: 'text-align:center;',
        text: "Save",
        width: 60,
        x: 630,
        y: 620,
        listeners: {
            click: function () {
                InvoiceNoCheckDetailsDataStore.removeAll();
                InvoiceNoCheckDetailsDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'InvoiceNoCheckDetails',
                        ledcode: fdbl_ledcode,
                        finid: ginfinid,
                        refno: cmbInvoiceNo.getRawValue()
                    },
                    callback: function () {
                        var ledcnt = InvoiceNoCheckDetailsDataStore.getAt(0).get('cnt');
                        if (ledcnt > 0) {
                            Ext.Msg.alert("Alert", cmbInvoiceNo.getRawValue() + " - Invoice No Already Exits this Party - so pls Check!");
                        } else {
                            btnok.hide();
                            flxDetails.getSelectionModel().selectAll();
                            var selrows = flxDetails.getSelectionModel().getCount();
                            var sel = flxDetails.getSelectionModel().getSelections();
                            var cnt = 0;
                            for (var i = 0; i < selrows; i++) {
                                if (sel[i].data.ValueDef <= 0) {
                                    cnt = cnt + 1;
                                }
                            }
                            if (cnt > 0) {
                                Ext.MessageBox.alert("Alert", "Check Ledger Refresh the Entry!");
                            } else if (Number(txtAmt.getRawValue()) !== Number(txtTotVal.getRawValue())) {
                                Ext.MessageBox.show({
                                    title: 'Alert',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.OK,
                                    msg: 'Bill not entered correctly, Contact Purchase. You cannot account this bill',
                                    fn: function (btn) {
                                        if (btn === 'ok') {
                                            btnok.show();
                                        } else {
                                            btnok.show();
                                        }
                                    }
                                });
                            } else if ((tdsinclude == 1) && (cmbCreditor.getValue() == 0 || cmbCreditor.getRawValue() === "")) {
                                Ext.MessageBox.show({
                                    title: 'Alert',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.OK,
                                    msg: 'Creditor Not Found! Pls Select Creditor!',
                                    fn: function (btn) {
                                        if (btn === 'ok') {
                                            btnok.show();
                                        }
                                    }
                                });
                            } else if (txtSuphead.getRawValue() === "") {
                                Ext.MessageBox.show({
                                    title: 'Alert',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.OK,
                                    msg: 'Ledger Problem!',
                                    fn: function (btn) {
                                        if (btn === 'ok') {
                                            btnok.show();
                                        }
                                    }
                                });
                            } else if (Number(txtAmt.getRawValue()) == Number(txtTotVal.getRawValue())) {
                                calculateData();
                                Ext.MessageBox.show({
                                    title: 'Confirmation',
                                    icon: Ext.Msg.QUESTION,
                                    buttons: Ext.MessageBox.YESNO,
                                    msg: 'Do u want to Save' + dbcrno,
                                    fn: function (btn) {
                                        if (btn === 'yes') {
                                            if (finalerror === "Y") {
                                                Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'System is slow please wait and retry again!'+Number(gintotqtyactualresult)+'/'+Number(gintotqtyactualresult2),
                                                    fn: function (btn) {
                                                        if (btn === 'ok') {
                                                            btnok.show();
                                                        }
                                                    }
                                                });
                                            } else {
                                                var accData = flxDetails1.getStore().getRange();
                                                var accupdData = new Array();
                                                Ext.each(accData, function (record) {
                                                    accupdData.push(record.data);
                                                });
                                                var accData1 = flxBillDetail.getStore().getRange();
                                                var accupdData1 = new Array();
                                                Ext.each(accData1, function (record) {
                                                    accupdData1.push(record.data);
                                                });
                                                var accDatatrigger = flxDetails.getStore().getRange();
                                                var accupdDatatrigger = new Array();
                                                Ext.each(accDatatrigger, function (record) {
                                                    accupdDatatrigger.push(record.data);
                                                });
                                                Ext.Ajax.request({
                                                    url: 'TrnPurchaseSave.php',
                                                    params: {
                                                        griddet: Ext.util.JSON.encode(accupdData),
                                                        griddet1: Ext.util.JSON.encode(accupdData1),
                                                        griddetrigger: Ext.util.JSON.encode(accupdDatatrigger),
                                                        fst_dbcrtype: fstdbtype,
                                                        partyledname: cmbVendorname.getRawValue(),
                                                        dbcrno: dbcr_type + dbcrno,
                                                        dbcrnonew: dbcrno,
                                                        ledcode: fdbl_ledcode,
                                                        dbcrvalue: dbcrvalue,
                                                        invseqno: cmbInvoiceNo.getValue(),
                                                        refno: cmbInvoiceNo.getRawValue(),
                                                        billvaltxt: txtAmt.getRawValue(),
                                                        invdate: dtpInvoiceDate.getRawValue(),
                                                        finid: ginfinid,
                                                        finyear: Finyear,
                                                        cottonled: fdbl_vendorcode,
                                                        gincompcode: compcode,
                                                        finid1: ginfinid,
                                                        finyear1: Finyear,
                                                        tdsflag: tdsinclude,
                                                        compcode1: compcode,
                                                        voudate1: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        refdate1: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        narration1: txtNarration1.getRawValue(),
                                                        paydate1: Ext.util.Format.date(dtpDate.getValue(), "Y-m-d"),
                                                        party1: fdbl_ledcode,
                                                        creditor1: cmbCreditor.getValue(),
                                                        tdsper: txttdsper.getValue(),
                                                        tdsvalue: txttdsvalue.getValue(),
                                                        totalval1: Number(txtDebitVal.getValue()),
                                                        reason1: cmbReason.getValue(),
                                                        dbcrseqno: dbcrseqnoold,
                                                        prefix: prefix,
                                                        acctrancramt: txtAmt.getRawValue(),
                                                        acctrantotamt: txtAmt.getRawValue(),
                                                        voudate: dtpVocherDate.getRawValue(),
                                                        narration: txtNarration.getRawValue(),
                                                        refdate: dtpInvoiceDate.getRawValue(),
                                                        recpayamount: dbcrvalue,
                                                        milid: cmbMillName.getValue(),
                                                        cnt1: accData1.length,
                                                        cnt: accData.length,
                                                        cnttrigger: accDatatrigger.length
                                                    },
                                                    callback: function (options, success, response)
                                                    {
                                                        var obj = Ext.decode(response.responseText);
                                                        if (obj['success'] === "true") {
                                                            if (tdsinclude == 1) {
                                                                saveclear1();
                                                                Ext.MessageBox.show({
                                                                    title: 'Saved ',
                                                                    icon: Ext.Msg.QUESTION,
                                                                    buttons: Ext.MessageBox.OK,
                                                                    msg: obj['msg'],
                                                                    fn: function (btn) {
                                                                        if (btn === 'ok') {
                                                                            saveclear();
                                                                        } else {
                                                                            saveclear();
                                                                        }
                                                                    }
                                                                });
                                                            } else {
                                                                saveclear1();
                                                                Ext.MessageBox.show({
                                                                    title: 'Saved',
                                                                    icon: Ext.Msg.QUESTION,
                                                                    buttons: Ext.MessageBox.OK,
                                                                    msg: obj['msg'],
                                                                    fn: function (btn) {
                                                                        if (btn === 'ok') {
                                                                            saveclear();
                                                                        } else {
                                                                            saveclear();
                                                                        }
                                                                    }
                                                                });
                                                            }
                                                        } else {
                                                            Ext.MessageBox.show({
                                                                title: 'Failed!',
                                                                icon: Ext.Msg.QUESTION,
                                                                buttons: Ext.MessageBox.OK,
                                                                msg: 'Contact MIS!' + obj['msg'] + accData.length,
                                                                fn: function (btn) {
                                                                    if (btn === 'ok') {
                                                                        btnok.show();
                                                                    } else {
                                                                        btnok.show();
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        } else {
                                            btnok.show();
                                        }
                                    }
                                });
                            }
                        }

                    }
                });
            }
        }
    });

    var PurchaseEntryFormPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'Purchase Entry',
//        bodyStyle: {"background-color": "#acbf95"},
        bodyStyle: {"background-color": "#FFFFE0"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        header: false,
        width: 450,
        height: 700,
        x: 10,
        y: 10,
        frame: false,
        id: 'PurchaseEntryFormPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
                        }
                    }
                }, '-',
                {
                    text: 'F5-Refresh',
                    style: 'text-align:center;',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    listeners: {
                        click: function () {
                            window.location.reload();
                            PurchaseEntryFormPanel.getForm().reset();
                        }
                    }
                },
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            PurchaseEntryFormPanel.getForm().reset();
                            PurchaseEntryWindow.hide();
                        }
                    }
                }, {
                    text: '',
                    style: 'text-align:center;',
                    height: 40, id: 'header2', style: 'background-color: white;',
                            fontSize: 50,
                    width: 300
                }, ]
        },
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 900,
                height: 60,
                x: 5,
                y: 10,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 80,
                        width: 900,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [optDepartment]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 530,
                height: 180,
                x: 255,
                y: 60,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 600,
                        x: 0,
                        y: 0,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbVendorname]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 250,
                        x: 0,
                        y: 50,
                        defaultType: 'textfield',
                        border: false,
                        items: [cmbInvoiceNo]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 75,
                        width: 175,
                        x: 230,
                        y: 50,
                        defaultType: 'textfield',
                        border: false,
                        items: [dtpInvoiceDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 300,
                        x: 390,
                        y: 50,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAmt]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 600,
                        x: 0,
                        y: 100,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtSuphead]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 500,
                        x: 350,
                        y: 100,
                        defaultType: 'textfield',
                        border: false,
                        items: [txtAmtpass]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 280,
                height: 80,
                x: 5,
                y: 195,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 30,
                        width: 140,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [dtpVocherDate]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 400,
                        x: 130,
                        y: 0,
                        border: false,
                        items: [txtVocherNo]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 492,
                height: 80,
                x: 290,
                y: 195,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 70,
                        width: 400,
                        x: 0,
                        y: 0,
                        border: false,
                        items: [cmbMillName]
                    },
                    {
                        xtype: 'fieldset',
                        title: '',
                        labelWidth: 40,
                        width: 400,
                        x: 280,
                        y: 0,
                        border: false,
                        items: [cmbMonth]
                    },
                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 290,
                y: 240,
                border: false,
                items: [cmbGroup]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 80,
                width: 1000,
                x: 0,
                y: 270,
                border: false,
                items: [flxDetails]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 600,
                height: 100,
                x: 0,
                y: 410,
                defaultType: 'textfield',
                border: false,
                items: [txtNarration]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 600,
                height: 100,
                x: 530,
                y: 410,
                defaultType: 'textfield',
                border: false,
                items: [txtTotVal]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 230,
                width: 600,
                x: 1000,
                y: 10,
                border: false,
                items: [optOption]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 65,
                width: 600,
                x: 780,
                y: 50,
                border: false,
                items: [txtDnNo]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 8,
                width: 600,
                x: 940,
                y: 50,
                border: false,
                items: [txtDnPer]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 65,
                width: 600,
                x: 780,
                y: 80,
                border: false,
                items: [txtDebitVal]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 600,
                x: 780,
                y: 110,
                border: false,
                items: [flxBillDetail]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 110,
                x: 910,
                y: 20,
                border: false,
                items: [dtpDate]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 90,
                width: 600,
                x: 925,
                y: 80,
                border: false,
                items: [btnAdd]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 45,
                width: 600,
                x: 780,
                y: 250,
                border: false,
                items: [cmbCreditor]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 780,
                y: 280,
                defaultType: 'textfield',
                border: false,
                items: [txttdsper]
            },
            {
                xtype: 'fieldset',
                title: '',
                labelWidth: 70,
                width: 400,
                x: 780,
                y: 310,
                defaultType: 'textfield',
                border: false,
                items: [txttdsvalue]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 45,
                width: 600,
                x: 780,
                y: 340,
                border: false,
                items: [cmbReason]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 40,
                width: 600,
                x: 780,
                y: 365,
                border: false,
                items: [txtNarration1]
            }, flxDetailsmin, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 1,
                width: 1000,
                height: 400,
                x: 830,
                y: 800,
                defaultType: 'textfield',
                border: false,
                items: [flxDetails1]
            }, {
                xtype: 'fieldset',
                title: '',
                x: 1200,
                y: 800,
                border: false,
                items: [btnCheck]
            }, {
                xtype: 'fieldset',
                title: '',
                labelWidth: 120,
                width: 600,
                x: 830,
                y:450,
                border: false,
                items: [btnok]
            },
        ]
    });
    function RefreshData() {
        cmbCreditor.setValue('');
        cmbReason.setValue('');
        txtDnNo.setValue('');
        txtDnPer.setValue('');
        txtDebitVal.setValue('');
        txtNarration.setValue('');
        fdbl_dbcrvalue = 0;
        fst_dbcrno = "";
        dbcr_value = 0;
        dbcr_type = "";
        fst_dbcrtype = "";
        dbcrvalue = 0;
        dbcrno = '';
        fst_dbcrtype = '';
        dbcrseqnoold = '';
        ControlmasterDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'ControlDebitNo',
                ginfinid: ginfinid,
                gincompcode: compcode
            },
            callback: function () {
                txtDnNo.setRawValue(ControlmasterDataStore.getAt(0).get('accref_vouno'));
            }
        });
        flxBillDetail.getStore().removeAll();
        txtTotVal.setRawValue("");
        txtNarration.setRawValue("");
        if (accuserid == 1) {
            flxDetails1.show();
            btnCheck.show();
        } else {
            flxDetails1.hide();
            btnCheck.hide();
        }
        cmbGroup.setRawValue("");
        cmbMonth.setRawValue("");
        cmbMillName.setRawValue("");
        txtVocherNo.setRawValue("");
        txtAmtpass.setRawValue("");
        txtSuphead.setRawValue("");
        txtAmt.setRawValue("");
        cmbInvoiceNo.setRawValue("");
        cmbVendorname.setRawValue("");
        MonthDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'cmbMonth'
            }
        });
        GroupDataStore.load({
            url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
            params: {
                task: 'cmbGroup',
                compcode: compcode
            }
        });
        Purchasevendor();
        PurchaseNo();
        fst_dbcrtype = "";
        if (Finyear.substring(5, 9) === '2018') {
            dtpDate.setRawValue(Finyear.substring(5, 9) + '-03' + '-31');
        }
       /* if (localStorage.getItem('acccompcode') == 1)
        {
            Ext.getCmp('header2').setText('KG DENIM LIMITED : Denim & Apparel Fabric' + '---' + Finyear);
            Ext.getCmp('idmadeupwo').setVisible(false);
            Ext.getCmp('idfabric').setVisible(false);
            Ext.getCmp('idfibre').setVisible(false);
            Ext.getCmp('idtrigger').setVisible(false);
            Ext.getCmp('idcoalfibre').setVisible(false);
            Ext.getCmp('idmadeups').setVisible(true);
            Ext.getCmp('idterry').setVisible(false);
            Ext.getCmp('Woifd').setVisible(false);
            Ext.getCmp('idvmwo').setVisible(false);
            Ext.getCmp('idwo').setVisible(true);
            Ext.getCmp('idimportyarn').setVisible(true);
            Ext.getCmp('idifd').setVisible(true);
            Ext.getCmp('idimpcoal').setVisible(false);
            Ext.getCmp('idfuel').setVisible(true);
            Ext.getCmp('idcoal').setVisible(true);
            Ext.getCmp('idstores').setVisible(true);
            Ext.getCmp('idchem').setVisible(true);
        } else if (localStorage.getItem('acccompcode') == 4)
        {
            Ext.getCmp('header2').setText('KG DENIM LIMITED : HOMETEXTILES' + '---' + Finyear);
            Ext.getCmp('idmadeupwo').setVisible(false);
            Ext.getCmp('idfabric').setVisible(false);
            Ext.getCmp('idfibre').setVisible(true);
            Ext.getCmp('idtrigger').setVisible(false);
            Ext.getCmp('idcoalfibre').setVisible(false);
            Ext.getCmp('idmadeups').setVisible(true);
            Ext.getCmp('idterry').setVisible(true);
            Ext.getCmp('Woifd').setVisible(false);
            Ext.getCmp('idvmwo').setVisible(false);
            Ext.getCmp('idwo').setVisible(true);
            Ext.getCmp('idimportyarn').setVisible(false);
            Ext.getCmp('idifd').setVisible(false);
            Ext.getCmp('idimpcoal').setVisible(false);
            Ext.getCmp('idfuel').setVisible(false);
            Ext.getCmp('idcoal').setVisible(false);
            Ext.getCmp('idstores').setVisible(true);
            Ext.getCmp('idchem').setVisible(false);
        } else if (localStorage.getItem('acccompcode') == 11)
        {
            Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - SRINIVASA AGRO' + '---' + Finyear);
            Ext.getCmp('idmadeupwo').setVisible(false);
            Ext.getCmp('idfabric').setVisible(false);
            Ext.getCmp('idfibre').setVisible(false);
            Ext.getCmp('idtrigger').setVisible(false);
            Ext.getCmp('idcoalfibre').setVisible(false);
            Ext.getCmp('idmadeups').setVisible(false);
            Ext.getCmp('idterry').setVisible(false);
            Ext.getCmp('Woifd').setVisible(false);
            Ext.getCmp('idvmwo').setVisible(false);
            Ext.getCmp('idwo').setVisible(true);
            Ext.getCmp('idimportyarn').setVisible(false);
            Ext.getCmp('idifd').setVisible(false);
            Ext.getCmp('idimpcoal').setVisible(false);
            Ext.getCmp('idfuel').setVisible(false);
            Ext.getCmp('idcoal').setVisible(false);
            Ext.getCmp('idstores').setVisible(true);
            Ext.getCmp('idchem').setVisible(false);
        } else if (localStorage.getItem('acccompcode') == 8)
        {
            Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - Power Plant' + '---' + Finyear);
            Ext.getCmp('idmadeupwo').setVisible(false);
            Ext.getCmp('idfabric').setVisible(false);
            Ext.getCmp('idfibre').setVisible(false);
            Ext.getCmp('idtrigger').setVisible(false);
            Ext.getCmp('idcoalfibre').setVisible(false);
            Ext.getCmp('idmadeups').setVisible(false);
            Ext.getCmp('idterry').setVisible(false);
            Ext.getCmp('Woifd').setVisible(false);
            Ext.getCmp('idvmwo').setVisible(false);
            Ext.getCmp('idwo').setVisible(false);
            Ext.getCmp('idimportyarn').setVisible(false);
            Ext.getCmp('idifd').setVisible(false);
            Ext.getCmp('idimpcoal').setVisible(false);
            Ext.getCmp('idfuel').setVisible(false);
            Ext.getCmp('idcoal').setVisible(false);
            Ext.getCmp('idstores').setVisible(false);
            Ext.getCmp('idchem').setVisible(false);
        } else {
            Ext.getCmp('header2').setText('Log Again!');
        }
        cmbVendorname.focus();*/
    }

    function calculateData() {
        flxDetails1.getStore().removeAll();
        var genData = flxDetails.getStore().getRange();
        var genupdData = new Array();
        Ext.each(genData, function (record) {
            genupdData.push(record.data);
        });
        Ext.Ajax.request({
            url: 'TrntempPurchasesave.php',
            params:
                    {
                        griddet: Ext.util.JSON.encode(genupdData),
                        flag: prefix,
                        comp: compcode,
                        cnt: genData.length
                    },
            callback: function (options, success, response)
            {
                var obj = Ext.decode(response.responseText);
                if (obj['success'] == "true") {
                    TempDataStore.load({
                        url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                        params: {
                            task: 'Temp',
                            flag: prefix,
                            comp: compcode
                        },
			callback:function(){
			  Checkactual();
			}
                    });
                } else {
                    flxDetails1.getStore().removeAll();
                }
            }
        });
    }

    function dbnoteclear() {
        tdsinclude = 0;
        txtDnNo.setRawValue("");
        txtDnPer.setRawValue("");
        txtDebitVal.setRawValue("");
        cmbReason.setRawValue("");
        cmbCreditor.setRawValue("");
        Ext.getCmp('tdsadd').setValue(false);
        Ext.getCmp('tdsno').setValue(true);
        Ext.getCmp('tdsadd').setVisible(true);
        Ext.getCmp('tdsno').setVisible(true);
        txtDnNo.hide();
        txtDnPer.hide();
        txtDebitVal.hide();
        btnAdd.hide();
        dtpDate.hide();
        txtNarration1.hide();
        flxBillDetail.hide();
        flxBillDetail.getStore().removeAll();
        ReasonDataStore.removeAll();
        PartynameDataStore.removeAll();
        cmbReason.hide();
        cmbCreditor.hide();
        if (Finyear.substring(5, 9) === '2019') {
            dtpDate.setRawValue(Finyear.substring(5, 9) + '-03' + '-31');
        }
    }

    var PurchaseEntryWindow = new Ext.Window({
        width: 800,
        height: 700,
        y: 60,
        maximized: true,
        items: PurchaseEntryFormPanel,
        bodyStyle: {
            "background-color": "#d7d5fa"
        },
        title: 'Purchases Accounts updation',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
        listeners: {
            show: function () {
                if (ginfinid < 27 && powerid === 'capitalacc') {
                    PurchaseEntryWindow.show();
                } else if (ginfinid > 26 && powerid === 'capital') {
                    PurchaseEntryWindow.show();
                } else if (ginfinid < 27 && powerid === 'capital') {
                    PurchaseEntryWindow.hide();
                }
                if (accuserid == 1) {
                    flxDetails1.show();
                    btnCheck.show();
                } else {
                    flxDetails1.hide();
                    btnCheck.hide();
                }
                MonthDataStore.load({
                    params: {
                        task: 'cmbMonth'
                    }
                });
                GroupDataStore.load({
                    url: '/DPM/Financials/Payables/TrnPurchases/clsFinancials2.php',
                    params: {
                        task: 'cmbGroup',
                        compcode: compcode
                    }
                });
                if (Finyear.substring(5, 9) === '2019') {
                    dtpDate.setRawValue(Finyear.substring(5, 9) + '-03' + '-31');
                }
                Purchasevendor();
                PurchaseNo();
                fst_dbcrtype = "";
                cmbVendorname.focus();
                Ext.getCmp('tdsadd').setValue(false);
                Ext.getCmp('tdsno').setValue(true);



              /*  if (localStorage.getItem('acccompcode') == 1)
                {
                    Ext.getCmp('header2').setText('KG DENIM LIMITED : Denim & Apparel Fabric' + '---' + Finyear);
                    Ext.getCmp('idmadeupwo').setVisible(false);
                    Ext.getCmp('idfabric').setVisible(false);
                    Ext.getCmp('idfibre').setVisible(false);
                    Ext.getCmp('idtrigger').setVisible(false);
                    Ext.getCmp('idcoalfibre').setVisible(false);
                    Ext.getCmp('idmadeups').setVisible(true);
                    Ext.getCmp('idterry').setVisible(false);
                    Ext.getCmp('Woifd').setVisible(false);
                    Ext.getCmp('idvmwo').setVisible(false);
                    Ext.getCmp('idwo').setVisible(true);
                    Ext.getCmp('idimportyarn').setVisible(true);
                    Ext.getCmp('idifd').setVisible(true);
                    Ext.getCmp('idimpcoal').setVisible(false);
                    Ext.getCmp('idfuel').setVisible(true);
                    Ext.getCmp('idcoal').setVisible(true);
                    Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(true);
                } else if (localStorage.getItem('acccompcode') == 4)
                {
                    Ext.getCmp('header2').setText('KG DENIM LIMITED : HOMETEXTILES' + '---' + Finyear);
                    Ext.getCmp('idmadeupwo').setVisible(false);
                    Ext.getCmp('idfabric').setVisible(false);
                    Ext.getCmp('idfibre').setVisible(true);
                    Ext.getCmp('idtrigger').setVisible(false);
                    Ext.getCmp('idcoalfibre').setVisible(false);
                    Ext.getCmp('idmadeups').setVisible(true);
                    Ext.getCmp('idterry').setVisible(true);
                    Ext.getCmp('Woifd').setVisible(false);
                    Ext.getCmp('idvmwo').setVisible(false);
                    Ext.getCmp('idwo').setVisible(true);
                    Ext.getCmp('idimportyarn').setVisible(false);
                    Ext.getCmp('idifd').setVisible(false);
                    Ext.getCmp('idimpcoal').setVisible(false);
                    Ext.getCmp('idfuel').setVisible(false);
                    Ext.getCmp('idcoal').setVisible(true);
                    Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(false);
                } else if (localStorage.getItem('acccompcode') == 11)
                {
                    Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - SRINIVASA AGRO' + '---' + Finyear);
                    Ext.getCmp('idmadeupwo').setVisible(false);
                    Ext.getCmp('idfabric').setVisible(false);
                    Ext.getCmp('idfibre').setVisible(false);
                    Ext.getCmp('idtrigger').setVisible(false);
                    Ext.getCmp('idcoalfibre').setVisible(false);
                    Ext.getCmp('idmadeups').setVisible(false);
                    Ext.getCmp('idterry').setVisible(false);
                    Ext.getCmp('Woifd').setVisible(false);
                    Ext.getCmp('idvmwo').setVisible(false);
                    Ext.getCmp('idwo').setVisible(true);
                    Ext.getCmp('idimportyarn').setVisible(false);
                    Ext.getCmp('idifd').setVisible(false);
                    Ext.getCmp('idimpcoal').setVisible(false);
                    Ext.getCmp('idfuel').setVisible(false);
                    Ext.getCmp('idcoal').setVisible(false);
                    Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(false);
                } else if (localStorage.getItem('acccompcode') == 8)
                {
                    Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - Power Plant' + '---' + Finyear);
                    Ext.getCmp('idmadeupwo').setVisible(false);
                    Ext.getCmp('idfabric').setVisible(false);
                    Ext.getCmp('idfibre').setVisible(false);
                    Ext.getCmp('idtrigger').setVisible(false);
                    Ext.getCmp('idcoalfibre').setVisible(false);
                    Ext.getCmp('idmadeups').setVisible(false);
                    Ext.getCmp('idterry').setVisible(false);
                    Ext.getCmp('Woifd').setVisible(false);
                    Ext.getCmp('idvmwo').setVisible(false);
                    Ext.getCmp('idwo').setVisible(false);
                    Ext.getCmp('idimportyarn').setVisible(false);
                    Ext.getCmp('idifd').setVisible(false);
                    Ext.getCmp('idimpcoal').setVisible(false);
                    Ext.getCmp('idfuel').setVisible(false);
                    Ext.getCmp('idcoal').setVisible(false);
                    Ext.getCmp('idstores').setVisible(false);
            		Ext.getCmp('idchem').setVisible(false);
                } else {
                    Ext.getCmp('header2').setText('Log Again!');
                }
                var timevar = 1000;
                setInterval(function () {
                    if (localStorage.getItem('acccompcode') == 1)
                    {
                        Ext.getCmp('header2').setText('KG DENIM LIMITED : Denim & Apparel Fabric' + '---' + Finyear);
                        Ext.getCmp('idmadeupwo').setVisible(false);
                        Ext.getCmp('idfabric').setVisible(false);
                        Ext.getCmp('idfibre').setVisible(false);
                        Ext.getCmp('idtrigger').setVisible(false);
                        Ext.getCmp('idcoalfibre').setVisible(false);
                        Ext.getCmp('idmadeups').setVisible(true);
                        Ext.getCmp('idterry').setVisible(false);
                        Ext.getCmp('Woifd').setVisible(false);
                        Ext.getCmp('idvmwo').setVisible(false);
                        Ext.getCmp('idwo').setVisible(true);
                        Ext.getCmp('idimportyarn').setVisible(true);
                        Ext.getCmp('idifd').setVisible(true);
                        Ext.getCmp('idimpcoal').setVisible(false);
                        Ext.getCmp('idfuel').setVisible(true);
                        Ext.getCmp('idcoal').setVisible(true);
                        Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(true);
                    } else if (localStorage.getItem('acccompcode') == 4)
                    {
                        Ext.getCmp('header2').setText('KG DENIM LIMITED : HOMETEXTILES' + '---' + Finyear);
                        Ext.getCmp('idmadeupwo').setVisible(false);
                        Ext.getCmp('idfabric').setVisible(false);
                        Ext.getCmp('idfibre').setVisible(true);
                        Ext.getCmp('idtrigger').setVisible(false);
                        Ext.getCmp('idcoalfibre').setVisible(false);
                        Ext.getCmp('idmadeups').setVisible(true);
                        Ext.getCmp('idterry').setVisible(true);
                        Ext.getCmp('Woifd').setVisible(false);
                        Ext.getCmp('idvmwo').setVisible(false);
                        Ext.getCmp('idwo').setVisible(true);
                        Ext.getCmp('idimportyarn').setVisible(false);
                        Ext.getCmp('idifd').setVisible(false);
                        Ext.getCmp('idimpcoal').setVisible(false);
                        Ext.getCmp('idfuel').setVisible(false);
                        Ext.getCmp('idcoal').setVisible(true);
                        Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(false);
                    } else if (localStorage.getItem('acccompcode') == 11)
                    {
                        Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - SRINIVASA AGRO' + '---' + Finyear);
                        Ext.getCmp('idmadeupwo').setVisible(false);
                        Ext.getCmp('idfabric').setVisible(false);
                        Ext.getCmp('idfibre').setVisible(false);
                        Ext.getCmp('idtrigger').setVisible(false);
                        Ext.getCmp('idcoalfibre').setVisible(false);
                        Ext.getCmp('idmadeups').setVisible(false);
                        Ext.getCmp('idterry').setVisible(false);
                        Ext.getCmp('Woifd').setVisible(false);
                        Ext.getCmp('idvmwo').setVisible(false);
                        Ext.getCmp('idwo').setVisible(true);
                        Ext.getCmp('idimportyarn').setVisible(false);
                        Ext.getCmp('idifd').setVisible(false);
                        Ext.getCmp('idimpcoal').setVisible(false);
                        Ext.getCmp('idfuel').setVisible(false);
                        Ext.getCmp('idcoal').setVisible(false);
                        Ext.getCmp('idstores').setVisible(true);
            		Ext.getCmp('idchem').setVisible(false);

                    } else if (localStorage.getItem('acccompcode') == 8)
                    {
                        Ext.getCmp('header2').setText('KG DENIM LIMITED : UNIT - Power Plant' + '---' + Finyear);
                        Ext.getCmp('idmadeupwo').setVisible(false);
                        Ext.getCmp('idfabric').setVisible(false);
                        Ext.getCmp('idfibre').setVisible(false);
                        Ext.getCmp('idtrigger').setVisible(false);
                        Ext.getCmp('idcoalfibre').setVisible(false);
                        Ext.getCmp('idmadeups').setVisible(false);
                        Ext.getCmp('idterry').setVisible(false);
                        Ext.getCmp('Woifd').setVisible(false);
                        Ext.getCmp('idvmwo').setVisible(false);
                        Ext.getCmp('idwo').setVisible(false);
                        Ext.getCmp('idimportyarn').setVisible(false);
                        Ext.getCmp('idifd').setVisible(false);
                        Ext.getCmp('idimpcoal').setVisible(false);
                        Ext.getCmp('idfuel').setVisible(false);
                        Ext.getCmp('idcoal').setVisible(false);
                        Ext.getCmp('idstores').setVisible(false);
            		Ext.getCmp('idchem').setVisible(false);

                    } else {
                        Ext.getCmp('header2').setText('Log Again!');
                        window.location.href = ('http://denimsoft.kgdenim.com/Financials/FinancialsLogin.php');
                    }
                }, timevar);*/
            }
        }
    });
    PurchaseEntryWindow.show();
});










