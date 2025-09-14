Ext.onReady(function(){
   Ext.QuickTips.init();
   var yearfin  = localStorage.getItem('gstyear'); 
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var pino = "";

   var txtApprNo = new Ext.form.NumberField({
        fieldLabel  : 'Approval No.',
        id          : 'txtApprNo',
        name        : 'txtApprNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


    var dptApprNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptApprNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

    var txtPINo = new Ext.form.NumberField({
        fieldLabel  : 'Proforma Invoice No.',
        id          : 'txtPINo',
        name        : 'txtPINo',
        width       :  220,
	readOnly : true,
        tabindex : 2
    });


    var dptPINo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptPINo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

    
    var txtContact = new Ext.form.TextField({
        fieldLabel  : 'Contact',
        id          : 'txtContact',
        name        : 'txtContact',
        width       :  180,
	readOnly : false,
        tabindex : 2
    });

    var txtExRate = new Ext.form.NumberField({
        fieldLabel  : 'Ex. Rate',
        id          : 'txtExRate',
        name        : 'txtExRate',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

 
    var txtCustRefNo= new Ext.form.TextField({
        fieldLabel  : 'Customer Ref.No.',
        id          : 'txtCustRefNo',
        name        : 'txtCustRefNo',
        width       :  300,
	readOnly : false,
        tabindex : 2
    });

    var dptCustRef= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptCustRef',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });



  var txtEstimateShipment = new Ext.form.NumberField({
        fieldLabel  : 'Transshipment',
        id          : 'txtEstimateShipment',
        name        : 'txtEstimateShipment',
        width       :  300,
	readOnly : true,
        tabindex : 2
    });

  var txtShippingMarks = new Ext.form.NumberField({
        fieldLabel  : 'Shipping Marks',
        id          : 'txtShippingMarks',
        name        : 'txtShippingMarks',
        width       :  300,
	readOnly : true,
        tabindex : 2
    });
  var txtPriority = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPriority',
        name        : 'txtPriority',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


   var dptdesp= new Ext.form.DateField({
        fieldLabel: '',
        id: 'dptdesp',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

   var txtQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQty',
        name        : 'txtQty',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtNoSheets = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Sheets',
        id          : 'txtNoSheets',
        name        : 'txtNoSheets',
        width       :  60,
	readOnly : false,
        tabindex : 2
    });

   var txtReamWt = new Ext.form.NumberField({
        fieldLabel  : 'Ream.Wt',
        id          : 'txtReamWt',
        name        : 'txtReamWt',
        width       :  40,
	readOnly : false,
        tabindex : 2
    });

   var txtNoReams = new Ext.form.NumberField({
        fieldLabel  : 'No.of.Reams',
        id          : 'txtNoReams',
        name        : 'txtNoReams',
        width       :  40,
	readOnly : false,
        tabindex : 2
    });


    var dptRefNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptRefNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });




    var dptSOCNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSOCNo',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });


   var txtInvType = new Ext.form.TextField({
        fieldLabel  : 'Invoice Type',
        id          : 'txtInvType',
        name        : 'txtInvType',
        width       :  200,
	readOnly : true,
        tabindex : 2
    });

   var txtTotWt = new Ext.form.NumberField({
        fieldLabel  : 'Total Weight',
        id          : 'txtTotWt',
        name        : 'txtTotWt',
        width       :  100,
        tabindex : 2
    });


   var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  100,
        tabindex : 2
    });

   var txtTotTaxValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Taxable Value',
        id          : 'txtTotTaxValue',
        name        : 'txtTotTaxValue',
        width       :  140,
        tabindex : 2
    });



   var txtCgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCgstPer',
        name        : 'txtCgstPer',
        width       :  50,
        tabindex : 2
    });
   var txtSgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstPer',
        name        : 'txtSgstPer',
        width       :  50,
        tabindex : 2
    });
   var txtIgstPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstPer',
        name        : 'txtIgstPer',
        width       :  50,
        tabindex : 2
    });


   var txtCgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCgstAmt',
        name        : 'txtCgstAmt',
        width       :  100,
        tabindex : 2
    });
   var txtSgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtSgstAmt',
        name        : 'txtSgstAmt',
        width       :  100,
        tabindex : 2
    });
   var txtIgstAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIgstAmt',
        name        : 'txtIgstAmt',
        width       :  100,
        tabindex : 2
    });

   var txtInsPer = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsPer',
        name        : 'txtInsPer',
        width       :  70,
        tabindex : 2
    });
   var txtFrt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrt',
        name        : 'txtFrt',
        width       :  70,
        tabindex : 2
    });

   var txtInsAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtInsAmt',
        name        : 'txtInsAmt',
        width       :  100,
        tabindex : 2
    });
   var txtFrtAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtAmt',
        name        : 'txtFrtAmt',
        width       :  100,
        tabindex : 2
    });

   var txtOthAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtOthAmt',
        name        : 'txtOthAmt',
        width       :  100,
        tabindex : 2
    });
   var txtNetAmt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtNetAmt',
        name        : 'txtNetAmt',
        width       :  120,
        tabindex : 2
    });
   var txtUnit = new Ext.form.NumberField({
        fieldLabel  : 'Unit',
        id          : 'txtUnit',
        name        : 'txtUnit',
        width       :  100,
        tabindex : 2
    });


   var txtDestination = new Ext.form.TextField({
        fieldLabel  : 'Destination',
        id          : 'txtDestination',
        name        : 'txtDestination',
        width       :  250,
        tabindex : 2
    });

   var txtVechicle = new Ext.form.TextField({
        fieldLabel  : 'Vechicle No',
        id          : 'txtVechicle',
        name        : 'txtVechicle',
        width       :  150,
        tabindex : 2
    });

   var txtLrno = new Ext.form.TextField({
        fieldLabel  : 'LR No.',
        id          : 'txtLrno',
        name        : 'txtLrno',
        width       :  140,
        tabindex : 2
    });

    var dptLrno= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptLrno',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });



   var txtLCno = new Ext.form.TextField({
        fieldLabel  : 'LC No.',
        id          : 'txtLCno',
        name        : 'txtLCno',
        width       :  250,
        tabindex : 2
    });

    var dptLCno= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptLCno',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });



   var txtCustIns = new Ext.form.TextField({
        fieldLabel  : 'Customer Ins.',
        id          : 'txtCustIns',
        name        : 'txtCustIns',
        width       :  800,
        tabindex : 2
    });

   var txtOurIns = new Ext.form.TextField({
        fieldLabel  : 'Our Ins.',
        id          : 'txtOurIns',
        name        : 'txtOurIns',
        width       :  800,
        tabindex : 2
    });



   var txtCreditDays = new Ext.form.NumberField({
        fieldLabel  : 'Credit Days',
        id          : 'txtCreditDays',
        name        : 'txtCreditDays',
        width       :  60,
        tabindex : 2
    });


   var txtGraceDays = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGraceDays',
        name        : 'txtGraceDays',
        width       :  60,
        tabindex : 2
    });



   var txtAddr1 = new Ext.form.TextField({
        fieldLabel  : 'Address1.',
        id          : 'txtAddr1',
        name        : 'txtAddr1',
        width       :  500,
        tabindex : 2
    });

   var txtAddr2 = new Ext.form.TextField({
        fieldLabel  : 'Address2.',
        id          : 'txtAddr2',
        name        : 'txtAddr2',
        width       :  500,
        tabindex : 2
    });
   var txtAddr3 = new Ext.form.TextField({
        fieldLabel  : 'Address3.',
        id          : 'txtAddr3',
        name        : 'txtAddr3',
        width       :  500,
        tabindex : 2
    });

   var txtAddr4 = new Ext.form.TextField({
        fieldLabel  : 'Address4.',
        id          : 'txtAddr4',
        name        : 'txtAddr4',
        width       :  500,
        tabindex : 2
    });


   var txtPin = new Ext.form.TextField({
        fieldLabel  : 'Pin.',
        id          : 'txtPin',
        name        : 'txtPin',
        width       :  80,
        tabindex : 2
    });


   var txtGstNo = new Ext.form.TextField({
        fieldLabel  : 'GST.',
        id          : 'txtGstNo',
        name        : 'txtGstNo',
        width       :  200,
        tabindex : 2
    });
//Added by Jackuline on 04 Mar 2021
   var txtTerms = new Ext.form.TextField({
        fieldLabel  : 'Terms',
        id          : 'txtTerms',
        name        : 'txtTerms',
        width       :  300,
        tabindex : 2
    });

   var txtTolr = new Ext.form.TextField({
        fieldLabel  : 'Tolarance',
        id          : 'txtTolr',
        name        : 'txtTolr',
        width       :  300,
        tabindex : 2
    });
    var dtpPriVaild = new Ext.form.DateField({
        fieldLabel: 'Price Valid Upto ',
        id: 'dtpPriVaild',
        name: 'date',
        format: 'd-m-Y',
        value: new Date(),
        anchor: '100%'
    });
var cmbInsBy = new Ext.form.ComboBox({
        fieldLabel      : 'Insurance to be borne by ',
        width           : 300,
        displayField    : 'insby_name', 
        valueField      : 'insby_code',
        hiddenName      : '',
        id              : 'cmbInsBy',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Buyer','2.Shipper'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
var cmbInspBy = new Ext.form.ComboBox({
        fieldLabel      : 'Inspection Charges borne by ',
        width           : 300,
        displayField    : 'inspby_name', 
        valueField      : 'inspby_code',
        hiddenName      : '',
        id              : 'cmbInspBy',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Buyer','2.Shipper'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
   var lblAddr1 = new Ext.form.Label({
        fieldLabel: 'Address Line 1',
        id: 'lblAddr1',
        width: 100
    });
   var txtDelvyRmk1 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDelvyRmk1',
        name        : 'txtDelvyRmk1',
        width       :  360,
        tabindex : 2
    });
   var lblAddr2 = new Ext.form.Label({
        fieldLabel: 'Address Line 2',
        id: 'lblAddr2',
        width: 100
    });
   var txtDelvyRmk2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDelvyRmk2',
        name        : 'txtDelvyRmk2',
        width       :  360,
        tabindex : 2
    });
   var lblAddr3 = new Ext.form.Label({
        fieldLabel: 'Address Line 3',
        id: 'lblAddr3',
        width: 100
    });
   var txtDelvyRmk3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDelvyRmk3',
        name        : 'txtDelvyRmk3',
        width       :  360,
        tabindex : 2
    });
   var txtDelvyRmk4 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtDelvyRmk4',
        name        : 'txtDelvyRmk4',
        width       :  360,
        tabindex : 2
    });
   var txtNOC = new Ext.form.TextField({
        fieldLabel  : 'No of Containers',
        id          : 'txtNOC',
        name        : 'txtNOC',
        width       :  100,
        tabindex : 2
    });
var cmbConType = new Ext.form.ComboBox({
        fieldLabel      : 'Cont. Type ',
        width           : 50,
        displayField    : 'contype_name', 
        valueField      : 'contype_code',
        hiddenName      : '',
        id              : 'cmbConType',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.test','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

//Panel 2-- QUALITY / QUANTITY
//Added by Jackuline on 05 Mar 2021
   var txtDBK = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtDBK',
        name        : 'txtDBK',
        width       :  50,
        tabindex : 2
    });
   var txtRODTEP = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRODTEP',
        name        : 'txtRODTEP',
        width       :  50,
        tabindex : 2
    });
   var txtMEIS = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtMEIS',
        name        : 'txtMEIS',
        width       :  50,
        tabindex : 2
    });
   var txtCF = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCF',
        name        : 'txtCF',
        width       :  50,
        tabindex : 2
    });
   var txtIns = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIns',
        name        : 'txtIns',
        width       :  50,
        tabindex : 2
    });
   var txtOCName = new Ext.form.TextField({
        fieldLabel  : 'Name',
        id          : 'txtOCName',
        name        : 'txtOCName',
        width       :  150,
        tabindex : 2
    });
   var txtOCAmt = new Ext.form.NumberField({
        fieldLabel  : 'Amt',
        id          : 'txtOCAmt',
        name        : 'txtOCAmt',
        width       :  60,
        tabindex : 2
    });

//LESS
   var txtCHAChr = new Ext.form.NumberField({
        fieldLabel  : 'CHA Charges (Rs.)',
        id          : 'txtCHAChr',
        name        : 'txtCHAChr',
        width       :  60,
        tabindex : 2
    });
   var txtECGCChr = new Ext.form.NumberField({
        fieldLabel  : 'ECGC Charges $',
        id          : 'txtECGCChr',
        name        : 'txtECGCChr',
        width       :  60,
        tabindex : 2
    });
   var txtCmms = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtCmms',
        name        : 'txtCmms',
        width       :  60,
        tabindex : 2
    });
   var txtPalletChr = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtPalletChr',
        name        : 'txtPalletChr',
        width       :  60,
        tabindex : 2
    });
   var txtExCmms = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtExCmms',
        name        : 'txtExCmms',
        width       :  60,
        tabindex : 2
    });
   var txtFrtChr = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtFrtChr',
        name        : 'txtFrtChr',
        width       :  60,
        tabindex : 2
    });
//var Cmmsopt = new Ext.form.Radio({id : 'CmmsoptP' ,boxLabel: '% or', name: 'Cmmsopt', inputValue: 'P',x:0, y:0})
var Cmmsopt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:40,
    x:-10,
    y:-15,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'Cmmsopt',
        items: [
            {boxLabel: '%', name: 'Cmmsopt', id:'CmmsoptP', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	Cmms="CmmsP";

               }
              }
             }
            },
            {boxLabel: '$', name: 'Cmmsopt', id:'CmmsoptD', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            Cmms="CmmsD";
               }
              }
             }
	    },
            {boxLabel: 'Rs.', name: 'Cmmsopt', id:'CmmsoptR', inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            Cmms="CmmsR";
               }
              }
             }
	    },
        ]
    }
    ]
});

var Paltchropt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:40,
    x:-10,
    y:-15,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'Paltchropt',
        items: [
            {boxLabel: '%', name: 'Paltchropt', id:'PaltchroptR', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	Palchr="PaltchrR";

               }
              }
             }
            },
            {boxLabel: '$', name: 'Paltchropt', id:'PaltchroptD', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            Palchr="PaltchrD";
               }
              }
             }
	    },

        ]
    }
    ]
});

var ExCmmsopt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:40,
    x:-10,
    y:-15,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'ExCmmsopt',
        items: [
            {boxLabel: '%', name: 'ExCmmsopt', id:'ExCmmsoptP', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	ExCmms="ExCmmsP";

               }
              }
             }
            },
            {boxLabel: '$', name: 'ExCmmsopt', id:'ExCmmsoptD', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            ExCmms="ExCmmsD";
               }
              }
             }
	    },
            {boxLabel: 'Rs.', name: 'ExCmmsopt', id:'ExCmmsoptR', inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            ExCmms="ExCmmsR";
               }
              }
             }
	    },
        ]
    }
    ]
});
var Frtchropt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:40,
    x:-10,
    y:-15,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'Frtchropt',
        items: [
            {boxLabel: '%', name: 'Frtchropt', id:'FrtchroptR', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	Frtchr="FrtchrR";

               }
              }
             }
            },
            {boxLabel: '$', name: 'Frtchropt', id:'FrtchroptD', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            Frtchr="FrtchrD";
               }
              }			
             }
	    },

        ]
    }
    ]
});

var cmbExpNorm = new Ext.form.ComboBox({
        fieldLabel      : 'Exp. Month ',
        width           : 250,
        displayField    : 'expmon_name', 
        valueField      : 'expmon_code',
        hiddenName      : '',
        id              : 'cmbExpNorm',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
var cmbSzCM = new Ext.form.ComboBox({
        fieldLabel      : 'Size (CM) ',
        width           : 250,
        displayField    : 'szcm_name', 
        valueField      : 'szcm_code',
        hiddenName      : '',
        id              : 'cmbSzCM',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
var cmbVarietyP2 = new Ext.form.ComboBox({
        fieldLabel      : 'Variety ',
        width           : 150,
        displayField    : 'variety_name', 
        valueField      : 'variety_code',
        hiddenName      : '',
        id              : 'cmbVarietyP2',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
   var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  50,
        tabindex : 2
    });
var cmbColr = new Ext.form.ComboBox({
        fieldLabel      : 'Color',
        width           : 150,
        displayField    : 'colr_name', 
        valueField      : 'colr_code',
        hiddenName      : '',
        id              : 'cmbColr',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
   var txtOurNom = new Ext.form.NumberField({
        fieldLabel  : 'Our Nomenclatrue',
        id          : 'txtOurNom',
        name        : 'txtOurNom',
        width       :  160,
        tabindex : 2
    });
   var txtExMillRt = new Ext.form.NumberField({
        fieldLabel  : 'Ex. Mill Rate',
        id          : 'txtExMillRt',
        name        : 'txtExMillRt',
        width       :  75,
        tabindex : 2
    });
   var txtEBillRt = new Ext.form.NumberField({
        fieldLabel  : 'Billing Rate(USD)',
        id          : 'txtEBillRt',
        name        : 'txtEBillRt',
        width       :  75,
        tabindex : 2
    });
   var txtQtyMT = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtQtyMT',
        name        : 'txtQtyMT',
        width       :  75,
        tabindex : 2
    });
   var txtBillRt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtBillRt',
        name        : 'txtBillRt',
        width       :  75,
        tabindex : 2
    });
var Rtopt = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:190,
    height:40,
    x:110,
    y:-15,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'Rtopt',
        items: [
            {boxLabel: 'Rate in INR', name: 'Rtopt', id:'RtoptR', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            	RT="RTR";

               }
              }
             }
            },
            {boxLabel: 'Rate in USD', name: 'Rtoptopt', id:'RtoptD', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            RT="RTD";
               }
              }			
             }
	    },

        ]
    }
    ]
});
var btnADD = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 20
,
    x       : 600,
    y       : 73,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){}
	}
});
    var SPInvgriddetail = new Ext.grid.EditorGridPanel({
        frame: false,
        store: '',
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows: true,
        scrollable: true,
        height: 20,
        width: 0,
        x: -10,
        y: -15,
	columns: [
            {header: "Sl No", dataIndex: 'slno', sortable: true,  align: 'left'},
            {header: "", dataIndex: 'month', sortable: true,  align: 'left'}
        ]
});
   var txtIGSTP1 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtIGSTP1',
        name        : 'txtIGSTP1',
        width       :  75,
        tabindex : 2
    });

   var txtTotQtyMT = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtTotQtyMT',
        name        : 'txtTotQtyMT',
        width       :  75,
        tabindex : 2
    });
   var txtOtrNote1 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOtrNote1',
        name        : 'txtOtrNote1',
        width       :  360,
        tabindex : 2
    });
   var txtOtrNote2 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOtrNote2',
        name        : 'txtOtrNote2',
        width       :  360,
        tabindex : 2
    });
   var txtOtrNote3 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOtrNote3',
        name        : 'txtOtrNote3',
        width       :  360,
        tabindex : 2
    });
   var txtOtrNote4 = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtOtrNote4',
        name        : 'txtOtrNote4',
        width       :  360,
        tabindex : 2
    });
//Ended

   var loadApprovalnodatastore = new Ext.data.Store({
      id: 'loadApprovalnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadApprovalNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'apprno'
      ]),
    });


  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });




 var loadExportCustomerList = new Ext.data.Store({
      id: 'loadExportCustomerList',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadExportCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });

 var loadExportDealerList = new Ext.data.Store({
      id: 'loadExportDealerList',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadExportDealerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'dealer_name','dealer_code' 
      ]),
    });

 var loadIncoTermsStore = new Ext.data.Store({
      id: 'loadIncoTermsStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadIncoTermsDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'incoterm_code' ,'incoterm_name'
      ]),
    });



 var loadPayTermsStore = new Ext.data.Store({
      id: 'loadPayTermsStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPayTermsDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'payterm_name' ,'payterm_code'
      ]),
    });



 var loadfinaldestinationdatastore = new Ext.data.Store({
      id: 'loadfinaldestinationdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfinalDestinationportDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'desti_port_name','desti_port_code'
      ]),
    });


 var loaddischargeportdatastore = new Ext.data.Store({
      id: 'loaddischargeportdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsExSales.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddischargeportDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'discharge_port_name','discharge_port_code'
      ]),
    });



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });

  var getSizeDataStore = new Ext.data.Store({
        id: 'getSizeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findSizeDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_size1','var_size2','var_desc','var_gsm','var_unit'])
    });


  var loadGSTDataStore = new Ext.data.Store({
        id: 'loadGSTDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadGSTDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_code','tax_name'])
    });
	
var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety ',
        width           : 350,
        displayField    : 'ref_name', 
        valueField      : 'rer_code',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadExportCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDealer = new Ext.form.ComboBox({
        fieldLabel      : 'Dealer ',
        width           : 350,
        displayField    : 'dealer_name', 
        valueField      : 'dealer_code',
        hiddenName      : '',
        id              : 'cmbDealer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadExportDealerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbIncoTerms = new Ext.form.ComboBox({
        fieldLabel      : 'Inco Terms ',
        width           : 300,
        displayField    : 'incoterm_name', 
        valueField      : 'incoterm_code',
        hiddenName      : '',
        id              : 'cmbIncoTerms',
        typeAhead       : true,
        mode            : 'local',
        store           : loadIncoTermsStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});
var cmbPayTerms = new Ext.form.ComboBox({
        fieldLabel      : 'Payment Terms',
        width           : 300,
        displayField    : 'payterm_name', 
        valueField      : 'payterm_code',
        hiddenName      : '',
        id              : 'cmbPayTerms',
        typeAhead       : true,
        mode            : 'local',
        store           : loadPayTermsStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});





var cmbCountryFinalDestination = new Ext.form.ComboBox({
        fieldLabel      : 'Country of Final Destination',
        width           : 300,
        displayField    : 'desti_port_name', 
        valueField      : 'desti_port_code',
        hiddenName      : '',
        id              : 'cmbCountryFinalDestination',
        typeAhead       : true,
        mode            : 'local',
        store           : loadfinaldestinationdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDischargePort = new Ext.form.ComboBox({
        fieldLabel      : 'Port of Discharge',
        width           : 300,
        displayField    : 'discharge_port_name', 
        valueField      : 'discharge_port_code',
        hiddenName      : '',
        id              : 'cmbDischargePort',
        typeAhead       : true,
        mode            : 'remote',
        store           : loaddischargeportdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbPartialShipment = new Ext.form.ComboBox({
        fieldLabel      : 'Partial Shipment',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbPartialShipment',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['Allowed','Not Allowed'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbPackingRemarks = new Ext.form.ComboBox({
        fieldLabel      : 'Packing Remarks',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbPackingRemarks',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['REAM WRAPPED WITH KRAFT & BUNDLE HDPE','REAM WRAPPED WITH KRAFT & PALLETIZATION','REAM WRAPPED WITH KRAFT', 'BUNDLE HDPE & PALLETIZATION',
'REEL WRAPPED WITH KRAFT & HDPE'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbOrderType = new Ext.form.ComboBox({
        fieldLabel      : 'Order Type ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbOrderType',
        typeAhead       : true,
        mode            : 'remote',
        store           : ['Stock Keeping','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbState = new Ext.form.ComboBox({
        fieldLabel      : 'State ',
        width           : 200,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbState',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadExportCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


  var getGSTDataStore = new Ext.data.Store({
        id: 'getGSTDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findGSTDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['tax_cgst_per','tax_sgst_per','tax_igst_per'])
    });


var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size ',
        width           : 250,
        displayField    : 'tax_name', 
        valueField      : 'tax_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadGSTDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners: {
            select: function ()                 {
                RefreshData();
                getGSTDataStore.removeAll();
        
                getGSTDataStore.load({
                    url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
                    params:
                            {
        
                                task: "findGSTDetails",
                                taxcode:cmbSize.getValue()
                            },
                    callback: function () {
                        var cnt = getGSTDataStore.getCount(); 
                        if (cnt > 0) {

                                   txtCgstPer.setRawValue(getGSTDataStore.getAt(0).get('tax_cgst_per'));
                                   txtSgstPer.setValue(getGSTDataStore.getAt(0).get('tax_sgst_per'));
                                   txtIgstPer.setValue(getGSTDataStore.getAt(0).get('tax_igst_per'));
                                   
                                    }

                         else {alert('not found');

                       } 
                   }
                });
              }
        }
});


var cmbDocuments = new Ext.form.ComboBox({
        fieldLabel      : 'Documents ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDocuments',
        typeAhead       : true,
        mode            : 'local',
        store           : ['DIRECT','THROUGH BANK','LC'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});


var cmbBankParty = new Ext.form.ComboBox({
        fieldLabel      : 'Party Bank ',
        width           : 350,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbBankParty',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadLedgerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbBankMill = new Ext.form.ComboBox({
        fieldLabel      : 'Our Bank ',
        width           : 350,
        displayField    : 'led_name', 
        valueField      : 'led_code',
        hiddenName      : '',
        id              : 'cmbBankMill',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadLedgerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

  var loadLedgerList = new Ext.data.Store({
        id: 'loadLedgerList',
        proxy: new Ext.data.HttpProxy({
            url: '/DPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadLedgers"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['led_code','led_name'])
    });
	



/*
 var loadLedgerList = new Ext.data.Store({
      id: 'loadLedgerList',
      proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadLedgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'led_code', type: 'int',mapping:'led_code'},
	{name:'led_name', type: 'string',mapping:'led_name'}
      ]),
    });
*/
var cmbTransport = new Ext.form.ComboBox({
        fieldLabel      : 'Transport ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbTransport',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});

var cmbDespLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Desp.Location ',
        width           : 350,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbDespLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1.Party Ref','2.Test','3.Test'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true
});




var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:200,
    height: 130,
    hidden:false,
    width: 850,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "QUALITY", dataIndex: 'varname',sortable:true,width:200,align:'left'},
        {header: "Varcode", dataIndex: 'varcode',sortable:true,width:30,align:'left'},
        {header: "GSM", dataIndex:'gsm',sortable:true,width:100,align:'left'},
        {header: "SIZE", dataIndex:'size',sortable:true,width:100,align:'left'},
        {header: "Item Code", dataIndex:'itemcode',sortable:true,width:100,align:'left'},
        {header: "Qty" , dataIndex:'qty',sortable:true,width:100,align:'left'},
        {header: "Ream Wt", dataIndex:'reamwt',sortable:true,width:100,align:'left'},       
        {header: "Reams", dataIndex:'reams',sortable:true,width:100,align:'left'},       
        {header: "Sheets", dataIndex:'sheets',sortable:true,width:100,align:'left'}       

  

    ],
    store: [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'FINISHED GOODS',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
        CalculatePOVal();
       }
      }
     });         
    }

   }
});




var opttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Discount Type',
    fieldLabel: '',
    layout : 'hbox',
    width:500,
    height:60,
    x:15,
    y:5,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 4,
        rows : 1,
        id: 'opttype',
        items: [
            {boxLabel: 'Export', name: 'opttype', id:'optexport', inputValue: 1,checked:false,},
            {boxLabel: 'Local', name: 'opttype', id:'optlocal', inputValue: 1,checked:true,},
            {boxLabel: 'With out Order', name: 'opttype', id:'optnoorder', inputValue: 1,checked:false,},
            {boxLabel: 'Agent', name: 'opttype', id:'optagent', inputValue: 2,checked:false,  }

         ]
    }
    ]
});



var lblcrdays = new Ext.form.Label({
    fieldLabel  : 'Credit Days',
    id          : 'lblcrdays',
    width       : 60
});

var lbldisc = new Ext.form.Label({
    fieldLabel  : 'Disc % / Amt',
    id          : 'lbldisc',
    width       : 60
});


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 40,
    x       : 780,
    y       : 150,
bodyStyle:{"background-color":"#ebebdf"},
 listeners:{
        click: function(){              
	    var gstadd="true";


            if(gstadd=="true")
            {
                var ginitemseq = cmbSize.getRawValue();
                flxDetail.getSelectionModel().selectAll();
//                var selrows = flxDetail.getSelectionModel().getCount();
  //              var sel = flxDetail.getSelectionModel().getSelections();
                var RowCnt = flxDetail.getStore().getCount() + 1;
                for (var i= txtStartNo.getValue();i<=txtEndNo.getValue();i++)
                {
                   var selrows = flxDetail.getSelectionModel().getCount();
                   var sel = flxDetail.getSelectionModel().getSelections();

                   var cnt = 0;
                   for (var j=0;j<selrows;j++)
	           {
            Ext.MessageBox.alert("Grid","Number " + sel[j].data.number + " Already Entered.");
                          if (sel[j].data.number === i)
		          {
                             cnt = cnt + 1;
                             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
                             exit;
                          }
                    }
	            if (cnt === 0)
	            {
            //             Ext.MessageBox.alert("Grid","Number " + i + " Already Entered.");
              //      }
                //    else
                  //  {
                      flxDetail.getStore().insert(
                      flxDetail.getStore().getCount(),
                      new dgrecord({
                            itemname: cmbSize.getRawValue(),
                            itemcode: cmbSize.getValue(),
                            number:i,
                            weight:txtWt.getRawValue(),
                            destag:'',
                            hsncode:''
                           })
                      );
                    }
                }
          }
  }
}
});




var tabExSalesPI = new Ext.TabPanel({
    id          : 'Proforma Invoice',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 560,
    width       : 1000,	
    x           : 0,
    y           : 0,
//item - 1 - start
    items       : [
                   {
                     xtype: 'panel',
                     title: 'DELIVERY TERMS AND CONDITIONS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                          
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 180,
                    		       width       : 550,
	                               x           : 0,
          		               y           : -5,
                        	       border      : false,
		                       items: [txtCustRefNo]
 		                   },


                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 60,
                    		       width       : 400,
	                               x           : 550,
          		               y           : -5,
                        	       border      : false,
		                       items: [dptCustRef]
   		                    },


                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 20,
                                       border      : false,
                                       items: [cmbIncoTerms]
                                    },
                                    { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 45,
                                       border      : false,
                                       items: [cmbPayTerms]
                                    },

                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 70,
                                       border      : false,
                                       items: [cmbCountryFinalDestination]
                                    },	           				     
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,	
                                       width       : 550,
                                       x           : 0,
                                       y           : 95,
                                       border      : false,
                                       items: [cmbDischargePort]
                                    },		     
                                   { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 180,
                    		       width       : 550,
	                               x           : 0,
          		               y           : 120,
                        	       border      : false,
		                       items: [txtEstimateShipment]
 		                   },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 145,
                                       border      : false,
                                       items: [cmbPartialShipment]
                                    },	
          
       			        
                                    { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 180,
                    		       width       : 550,
	                               x           : 0,
          		               y           : 170,
                        	       border      : false,
		                       items: [txtShippingMarks]
 		                   },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 195,
                                       border      : false,
                                       items: [cmbPackingRemarks]
                                    },	//Added by Jackuline on 04 Mar 2021
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 220,
                                       border      : false,
                                       items: [txtTerms]
                                    },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 245,
                                       border      : false,
                                       items: [txtTolr]
                                    },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 508,
                                       x           : 0,
                                       y           : 270,
                                       border      : false,
                                       items: [dtpPriVaild]
                                    },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 295,
                                       border      : false,
                                       items: [cmbInsBy]
                                    },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 180,
                                       width       : 550,
                                       x           : 0,
                                       y           : 320,
                                       border      : false,
                                       items: [cmbInspBy]
                                    },
                                   { 
                                       xtype       : 'fieldset',
	                               title       : 'If Buyer Other than Consignee',
          	                       labelWidth  : 0,
                    		       width       : 380,
	                               x           : 500,
          		               y           : 55,
                        	       border      : true,
					layout      : 'absolute',
					height  	: 130,
		                       items: [
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 500,
                                             x           : -10,
                                             y           : -10,
                                             border      : false,
					     height  	 : 45,
                                             items: [txtAddr1] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 500,
                                             x           : -10,
                                             y           : 15,	
                                             border      : false,

                                             items: [txtAddr2] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 500,
                                             x           : -10,
                                             y           : 40,
                                             border      : false,
                                             items: [txtAddr3] 
                                         },
                                         {
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 500,
                                             x           : -10,
                                             y           : 65,	
                                             border      : false,
                                             items: [txtAddr4] 
                                         },
					]
   		                    },
					{ 
                                       xtype       : 'fieldset',
	                               title       : 'Delivery Remarks',
          	                       labelWidth  : 0,
                    		       width       : 380,
	                               x           : 500,
          		               y           : 190,
                        	       border      : false,
					layout      : 'absolute',
					height  	: 5,
					},
					{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 590,
                                             x           : 435,
                                             y           : 195,	
                                             border      : false,
                                             items: [txtDelvyRmk1] 
                                         },
					{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 590,
                                             x           : 435,
                                             y           : 215,	
                                             border      : false,
                                             items: [txtDelvyRmk2] 
                                         },

					{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 590,
                                             x           : 435,
                                             y           : 235,	
                                             border      : false,
                                             items: [txtDelvyRmk3] 
                                         },

					{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 55,
                                             width       : 590,
                                             x           : 435,
                                             y           : 255,	
                                             border      : false,
                                             items: [txtDelvyRmk4] 
                                         },

					{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 180,
                                             x           : 500,
                                             y           : 300,	
                                             border      : false,
                                             items: [txtNOC] 
                                         },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 70,
                                       width       : 180,
                                       x           : 665,
                                       y           : 300,
                                       border      : false,
                                       items: [cmbConType]
                                    },
					/*{
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 50,
                                             width       : 150,
                                             x           : 700,
                                             y           : 300,	
                                             border      : false,
                                             items: [cmbConType] 
                                         },*/


//Ended

          ]
     },


	{
	xtype: 'panel',
	title: 'QUALITY/QUANTITY',bodyStyle:{"background-color":"#ebebdf"},
	layout: 'absolute',
	items: [
		{ //Added by Jackuline on 05 Mar 2021
			xtype       : 'fieldset',
			title       : 'ADD',
			labelWidth  : 1,
			width       : 350,
			x           : 1,
			y           : 1,
			border      : true,
			layout: 'absolute',
			height	   : 140,	
			items: [
				{ 
					xtype       : 'fieldset',
					title       : 'DBK %',
					labelWidth  : -10,
					width       : 75,
					x           : -5,
					y           : -2,
					border      : false,
					height	   : 55,
					layout: 'absolute',
					items: [txtDBK]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'RODTEP %',
					labelWidth  : 1,
					width       : 85,
					x           : 50,
					y           : -2,
					border      : false,
					height	   : 55,
					layout: 'absolute',
					items: [txtRODTEP]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'MEIS %',
					labelWidth  : -1,
					width       : 75,
					x           : 115,
					y           : -2,
					border      : false,
					height	   : 55,
					layout: 'absolute',
					items: [txtMEIS]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Cont. Frt $',
					labelWidth  : 1,
					width       : 100,
					x           : 180,
					y           : -2,
					border      : false,
					height	   : 55,
					layout: 'absolute',
					items: [txtCF]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Insurance',
					labelWidth  : -1,
					width       : 75,
					x           : 250,
					y           : -2,
					border      : false,
					height	   : 55,
					layout: 'absolute',
					items: [txtIns]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'OTHER CHARGES Name & Amt',
					labelWidth  : 100,
					width       : 320,
					x           : 1,
					y           : 50,
					border      : true,
					height	   : 55,
					layout: 'absolute',
					items: [
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 35,
							width       : 250,
							x           : -10,
							y           : -10,
							border      : false,
							items: [txtOCName]
						},
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 35,
							width       : 250,
							x           : 200,
							y           : -10,
							border      : false,
							items: [txtOCAmt]
						},

						]
				},
				]
		},
		{ 
			xtype       : 'fieldset',
			title       : 'DUTY',
			labelWidth  : 1,
			width       : 150,
			x           : 780,
			y           : 180,
			border      : true,
			layout: 'absolute',
			height	   : 110,	
			items: [
				{ 
					xtype       : 'fieldset',
					title       : 'IGST %',
					labelWidth  : 10,
					width       : 200,
					x           : -10,
					y           : 5,
					border      : false,
					items: [txtIGSTP1]
				},
				]
		},
		{ 
			xtype       : 'fieldset',
			title       : 'TOTAL QTY (MT)',
			labelWidth  : 5,
			width       : 200,
			x           : 780,
			y           : 300,
			border      : false,
			items: [txtTotQtyMT]
		},

		{ 
			xtype       : 'fieldset',
			title       : 'LESS',
			labelWidth  : 1,
			width       : 770,
			x           : 360,
			y           : 1,
			border      : true,
			layout: 'absolute',
			height	   : 140,	
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 115,
					width       : 200,
					x           : -10,
					y           : 1,
					border      : false,
					items: [txtCHAChr]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 115,
					width       : 200,
					x           : -10,
					y           : 30,
					border      : false,
					items: [txtECGCChr]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Commission in',
					labelWidth  : 1,
					width       : 150,
					x           : 190,
					y           : -3,
					border      : true,
					layout: 'absolute',
					height	   : 77,
					items: [Cmmsopt,
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 200,
							x           : 0,
							y           : 10,
							border      : false,
							items: [txtCmms]
						},
					]
				},

				{ 
					xtype       : 'fieldset',
					title       : 'Pallet Charges',
					labelWidth  : 1,
					width       : 120,
					x           : 345,
					y           : -2,
					border      : true,
					layout: 'absolute',
					height	   : 77,
					items: [Paltchropt,
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 200,
							x           : 0,
							y           : 10,
							border      : false,
							items: [txtPalletChr]
						},
					]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Ex. Commission in',
					labelWidth  : 1,
					width       : 150,
					x           : 470,
					y           : -2,
					border      : true,
					layout: 'absolute',
					height	   : 77,
					items: [ExCmmsopt,
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 200,
							x           : 0,
							y           : 10,
							border      : false,
							items: [txtExCmms]
						},
					]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Frt Charges',
					labelWidth  : 1,
					width       : 120,
					x           : 625,
					y           : -2,
					border      : true,
					layout: 'absolute',
					height	   : 77,
					items: [Frtchropt,
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 1,
							width       : 200,
							x           : 0,
							y           : 10,
							border      : false,
							items: [txtFrtChr]
						},
					]
				},
			]
		},
		{ 
			xtype       : 'fieldset',
			title       : 'Size(CM)',
			labelWidth  : 1,
			width       : 770,
			x           : 1,
			y           : 173,
			border      : true,
			layout: 'absolute',
			height	   : 148,	
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 350,
					x           : -10,
					y           : -10,
					border      : false,
					items: [cmbExpNorm]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 70,
					width       : 350,
					x           : 400,
					y           : -10,
					border      : false,
					items: [cmbSzCM]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 45,
					width       : 350,
					x           : -10,
					y           : 15,
					border      : false,
					items: [cmbVarietyP2]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 25,
					width       : 100,
					x           : 195,
					y           : 15,
					border      : false,
					items: [txtGSM]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 30,
					width       : 300,
					x           : 280,
					y           : 15,
					border      : false,
					items: [cmbColr]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 102,
					width       : 300,
					x           : 470,
					y           : 15,
					border      : false,
					items: [txtOurNom]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'RATE IN USD / INR',
					labelWidth  : 1,
					width       : 365,
					x           : 1,
					y           : 50,
					border      : true,
					layout: 'absolute',
					height	   : 70,
					items: [Rtopt,
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 75,
							width       : 200,
							x           : -10,
							y           : 3,
							border      : false,
							items: [txtExMillRt]
						},
						{ 
							xtype       : 'fieldset',
							title       : '',
							labelWidth  : 100,
							width       : 200,
							x           : 150,
							y           : 3,
							border      : false,
							items: [txtEBillRt]
						},
					]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Qty (MT)',
					labelWidth  : 1,
					width       : 200,
					x           : 370,
					y           : 50,
					border      : false,
					items: [txtQtyMT]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Billing Rate',
					labelWidth  : 1,
					width       : 200,
					x           : 480,
					y           : 50,
					border      : false,
					items: [txtBillRt]
				},btnADD

				]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 770,
				x           : 1,
				y           : 310,
				border      : true,
				layout: 'absolute',
				height	   : 200,
				items: [SPInvgriddetail]

			},
		]
		},	

		{
                     xtype: 'panel',
                     title: 'OTHERS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
				{ 
					xtype       : 'fieldset',
					title       : 'Notes',
					labelWidth  : 0,
					width       : 380,
					x           : 45,
					y           : 10,
					border      : false,
					//layout      : 'absolute',
					height  	: 5,
				},
				{
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 55,
					width       : 590,
					x           : 15,
					y           : 20,	
					border      : false,
					items: [txtOtrNote1] 
                                 },
				{
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 55,
					width       : 590,
					x           : 15,
					y           : 42,	
					border      : false,
					items: [txtOtrNote2] 
                                 },

				{
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 55,
					width       : 590,
					x           : 15,
					y           : 64,	
					border      : false,
					items: [txtOtrNote3] 
                                 },

				{
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 55,
					width       : 590,
					x           : 15,
					y           : 86,	
					border      : false,
					items: [txtOtrNote4] 
                                 },       				
		               				
			]
		},
 
		        
             ]



});



var TrnExSalesPIPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES INVOICE ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnExSalesPIPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [
        {
            text: ' Add',
            style  : 'text-align:center;',
            tooltip: 'Add Details...',
            height: 40,
            fontSize:20,
            width:50,
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
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
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
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {
                    var gstSave;
                    gstSave="true";
                    if (txtorderterms.getRawValue()==0 || txtorderterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Order Terms.....');
                        gstSave="false";
                    }
                    else if (txtpaymentterms.getRawValue()==0 || txtpaymentterms.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Payment Terms..');
                        gstSave="false";
                    }
                    else if (txtcreditdays.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Credit Days..');
                        gstSave="false";
                    }
                    else if (txtservicechrg.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Service Chrage/MT..');
                        gstSave="false";
                    }
                    else if (txtRemarks.getRawValue()==0 || txtRemarks.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Remarks..');
                        gstSave="false";
                    }
                    else if (cmbpaymode.getValue()==0 || cmbpaymode.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Payment Mode..');
                        gstSave="false";
                    }
                    else if (cmbcarriage.getValue()==0 || cmbcarriage.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Carriage..');
                        gstSave="false";
                    }
		   else if (cmbfreight.getValue()==0 || cmbfreight.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Type..');
                        gstSave="false";
                    } 
                    else if (cmbfrparty.getValue()==0 || cmbfrparty.getRawValue()=="")
                    {
                        Ext.Msg.alert('Pur-Ord','Select Freight Party..');
                        gstSave="false";
                    }                    
		    else if (flxdeldetail.rows==0)
                    {
                        Ext.Msg.alert('Pur-Ord','Enter Delivery Detail..');
                        gstSave="false";
                    } 
                    else{
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn)
				{
                            if (btn === 'yes')
				{
                            if (gstSave === "true")
	                        {  

                           
                            var poData = flxDetail.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(poData, function (record) {
                                poupdData.push(record.data);
                            });

						/*var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});*/

                            
                            var deliData = flxdeldetail.getStore().getRange();                                        
                            var deliupdData = new Array();
                            Ext.each(deliData, function (record) {
                                deliupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnPOPreparationSave.php',
                            params :
                             {
                             	griddet: Ext.util.JSON.encode(poupdData),                                      
				deligriddet : Ext.util.JSON.encode(deliupdData),                                                
                                po_company_code:Gincompcode,
                                po_finid:GinFinid,
                                po_date :Ext.util.Format.date(dtpPodate.getValue(),"Y-m-d"),
                                po_duedate:Ext.util.Format.date(dtpDuedate.getValue(),"Y-m-d"),
                                po_vendor_code :cmbPartyname.getValue(),
				remarks:txtRemarks.getRawValue(),
				cnt: poData.length,
				delicnt : deliData.length,
				ordtype : ordtype,
				orderterms : txtorderterms.getRawValue(),
				po_transport_mode : cmbcarriage.getValue(),
				po_paymode : cmbpaymode.getValue(),
				creditdays : txtcreditdays.getRawValue(),
				po_payterm : txtpaymentterms.getRawValue(),
				po_frighttype : cmbfreight.getValue(),
				po_frparty : cmbfrparty.getValue(),
				tcsper : txttcs.getValue(),
				cgstper :txtCGST.getValue(),
				sgstper :txtSGST.getValue(),
				igstper : txtIGST.getValue(),
				servchrg : txtservicechrg.getRawValue(),
				itemval : 0,
				roundoff : 0,
				totval : 0,
				wefdate : Ext.util.Format.date(dtpwefdate.getValue(),"Y-m-d")
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				alert(obj['pono']);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Purchase Order No -" + obj['pono']);
                                    TrnExSalesPIPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Purchase Order Not Completed! Pls Check!- " + obj['pono']);                                                  
                                    }
                                }
                           });         
   
                          	}
     				}
                            }
                        });
                    }

                }
            }
        },'-',
        {
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/refresh.png',
            listeners:{
                click: function () {
                    RefreshData();
                }
            }
        },'-',
        {
            text: 'View',
            style  : 'text-align:center;',
            tooltip: 'View Details...',
            height: 40,
            fontSize:30,
            width:70,
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
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnExSalesPIWindow.hide();
                }
            }
        }]
    },

     items: [
               {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1270,
                    height      : 95,
                    x           : 30,
                    y           : 10,
                    border      : true,
                    layout      : 'absolute',
                    items:[
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 400,
                                  x           : 0,
                                  y           : -10,
                                  border      : false,
                                  items: [txtApprNo]
                               },
  			       { 
	                          xtype       : 'fieldset',
           		          title       : '',
		                  labelWidth  : 50,
                		  width       : 400,
		                  x           : 400,
                		  y           : -10,
		                  border      : false,
                		  items: [dptApprNo]
   		               },
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 400,
                                  x           : 0,
                                  y           : 15,
                                  border      : false,
                                  items: [txtPINo]
                               },
  			       { 
	                          xtype       : 'fieldset',
           		          title       : '',
		                  labelWidth  : 50,
                		  width       : 400,
		                  x           : 400,
                		  y           : 15,
		                  border      : false,
                                  items: [dptPINo]
   		               },    
                               { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 550,
                                  x           : 600,
                                  y           : -10,
                                  border      : false,
                                  items: [cmbCustomer]
                              },
                               { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 550,
                                  x           : 600,
                                  y           : 15,
                                  border      : false,
                                  items: [cmbDealer]
                              },

                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 80,
                                  width       : 300,
                                  x           : 600,
                                  y           : 40,
                                  border      : false,
                                  items: [txtContact]
                               },
                              { 
                                  xtype       : 'fieldset',
                                  title       : '',
                                  labelWidth  : 130,
                                  width       : 400,
                                  x           : 0,
                                  y           : 40,
                                  border      : false,
                                  items: [txtExRate]
                               },
                         ] , 
                 },

                {
                    xtype       : 'fieldset',
                    title       : '',
                    width       : 1270,
                    height      : 500,
                    x           : 30,
                    y           : 120,
                    border      : true,
                    layout      : 'absolute',
                    items:[tabExSalesPI], 

                 },


            ],
	          
});


    

   function RefreshData(){

	loadExportCustomerList.removeAll();
	loadExportCustomerList.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadExportCustomerDetails",
        	 },
	  });

	loadExportDealerList.removeAll();
	loadExportDealerList.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadExportDealerDetails",

        	 },
	  });




	loadIncoTermsStore.removeAll();
	loadIncoTermsStore.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadIncoTermsDetails",

        	 },
	  });

	loadPayTermsStore.removeAll();
	loadPayTermsStore.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadPayTermsDetails",

        	 },
	  });

	loadfinaldestinationdatastore.removeAll();
	loadfinaldestinationdatastore.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadfinalDestinationportDetails",

        	 },
	  });

	loaddischargeportdatastore.removeAll();
	loaddischargeportdatastore.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loaddischargeportDetails",

        	 },
	  });



	loadApprovalnodatastore.removeAll();
	loadApprovalnodatastore.load({
        	 url:'ClsExSales.php',
        	 params:
        	 {
            	 task:"loadApprovalNo",
             	 finid:GinFinid,
		 compcode:Gincompcode

        	 },
		callback:function()
       		{
		txtApprNo.setValue(loadApprovalnodatastore.getAt(0).get('apprno'));
                pino = "PFI-"+loadApprovalnodatastore.getAt(0).get('apprno')+"/DPM/"+yearfin;
                txtPINo.setRawValue(pino);
		}
	  });
   };
   


   





 var TrnExSalesPIWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 30,
        title       : 'SALES - EXPORT PROFORMA INVOICE',
        items       : TrnExSalesPIPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false  ,
          
	listeners:{

              show:function(){
                    RefreshData();
                    }

        }
    });
   TrnExSalesPIWindow.show();  


});
