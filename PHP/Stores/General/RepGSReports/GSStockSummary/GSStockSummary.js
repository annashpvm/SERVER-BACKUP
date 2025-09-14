Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode  = localStorage.getItem('gincompcode');
   var GinFinid     = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate   = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var fitemcode = 0;
   var fitemname = "";
   var printtype = "PDF";
   var grpcode = 0;
   var grpname = '';
   var subgrpcode = 0;
   var subgrpname = '';
   var itemcode =0;
   var itemname ='';
   var reptype = "WP";
   var dt_today = new Date();   


   var btnProcess = new Ext.Button({
        style: 'text-align:center;',
        text: "Procss",
        width: 100,
        id: 'btnProcess',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
                  processdata();
            }
        }
    });




var lblQtyRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblQtyRM',
        name        : 'lblQtyRM',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblValueRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblValueRM',
        name        : 'lblValueRM',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });




   var txtItemOpeningQtyRM = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtItemOpeningQtyRM',
        name        : 'txtItemOpeningQtyRM',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemOpeningValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemOpeningValueRM',
        name        : 'txtItemOpeningValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtItemRecptQtyRM = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txtItemRecptQtyRM',
        name        : 'txtItemRecptQtyRM',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemRecptValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemRecptValueRM',
        name        : 'txtItemRecptValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemIssueQtyRM = new Ext.form.NumberField({
        fieldLabel  : 'Issues',
        id          : 'txtItemIssueQtyRM',
        name        : 'txtItemIssueQtyRM',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemIssueValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemIssueValueRM',
        name        : 'txtItemIssueValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemClosingQtyRM = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtItemClosingQtyRM',
        name        : 'txtItemClosingQtyRM',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });



var lblQtyFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblQtyFU',
        name        : 'lblQtyFU',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblValueFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblValueFU',
        name        : 'lblValueFU',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


   var txtItemOpeningQtyFU = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtItemOpeningQtyFU',
        name        : 'txtItemOpeningQtyFU',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemOpeningValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemOpeningValueFU',
        name        : 'txtItemOpeningValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtItemRecptQtyFU = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txtItemRecptQtyFU',
        name        : 'txtItemRecptQtyFU',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemRecptValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemRecptValueFU',
        name        : 'txtItemRecptValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemIssueQtyFU = new Ext.form.NumberField({
        fieldLabel  : 'Issues',
        id          : 'txtItemIssueQtyFU',
        name        : 'txtItemIssueQtyFU',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemIssueValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemIssueValueFU',
        name        : 'txtItemIssueValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemClosingQtyFU = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtItemClosingQtyFU',
        name        : 'txtItemClosingQtyFU',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });



var lblOpeningFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblOpeningFU',
        name        : 'lblOpeningFU',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblReceiptFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblReceiptFU',
        name        : 'lblReceiptFU',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblIssueFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblIssueFU',
        name        : 'lblIssueFU',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblClosingFU = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblClosingFU',
        name        : 'lblClosingFU',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



   var txttotOpeningQtyFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningQtyFU',
        name        : 'txttotOpeningQtyFU',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotOpeningValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningValueFU',
        name        : 'txttotOpeningValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txttotRecptQtyFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptQtyFU',
        name        : 'txttotRecptQtyFU',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotRecptValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptValueFU',
        name        : 'txttotRecptValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotIssueQtyFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueQtyFU',
        name        : 'txttotIssueQtyFU',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotIssueValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueValueFU',
        name        : 'txttotIssueValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotClosingQtyFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingQtyFU',
        name        : 'txttotClosingQtyFU',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotClosingValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingValueFU',
        name        : 'txttotClosingValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });




   var txtItemClosingValueFU = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemClosingValueFU',
        name        : 'txtItemClosingValueFU',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



var lblOpeningRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblOpeningRM',
        name        : 'lblOpeningRM',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblReceiptRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblReceiptRM',
        name        : 'lblReceiptRM',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblIssueRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblIssueRM',
        name        : 'lblIssueRM',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblClosingRM = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblClosingRM',
        name        : 'lblClosingRM',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



   var txttotOpeningQtyRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningQtyRM',
        name        : 'txttotOpeningQtyRM',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotOpeningValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningValueRM',
        name        : 'txttotOpeningValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txttotRecptQtyRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptQtyRM',
        name        : 'txttotRecptQtyRM',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotRecptValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptValueRM',
        name        : 'txttotRecptValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotIssueQtyRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueQtyRM',
        name        : 'txttotIssueQtyRM',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotIssueValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueValueRM',
        name        : 'txttotIssueValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotClosingQtyRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingQtyRM',
        name        : 'txttotClosingQtyRM',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotClosingValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingValueRM',
        name        : 'txttotClosingValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });




   var txtItemClosingValueRM = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemClosingValueRM',
        name        : 'txtItemClosingValueRM',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var btnItemLedgerRM = new Ext.Button({
        style: 'text-align:center;',
        text: "Ledger Print",
        width: 100,
        id: 'btnItemLedgerRM',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
               if (reptype == "WP")
               {
		var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
                var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&itemcode=" + encodeURIComponent(fitemcode);
		var p5 = "&opqty=" + encodeURIComponent(txtItemOpeningQtyRM.getRawValue());
		var p6 = "&opvalue=" + encodeURIComponent(txtItemOpeningValueRM.getRawValue());

	    	var param =(p1+p2+p3+p4+p5+p6);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&' + param, '_blank');
                }
                else
                {    
		var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
                var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&itemcode=" + encodeURIComponent(fitemcode);
		var p5 = "&opqty=" + encodeURIComponent(txtItemOpeningQty.getRawValue());
		var p6 = "&opvalue=" + encodeURIComponent(txtItemOpeningValue.getRawValue());

	    	var param =(p1+p2+p3+p4+p5+p6);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&' + param, '_blank'); 
                }
            }
        }
    });


   var btnItemLedgerFU = new Ext.Button({
        style: 'text-align:center;',
        text: "Ledger Print",
        width: 100,
        id: 'btnItemLedgerFU',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
               if (reptype == "WP")
               {
		var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
                var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&itemcode=" + encodeURIComponent(fitemcode);
		var p5 = "&opqty=" + encodeURIComponent(txtItemOpeningQtyFU.getRawValue());
		var p6 = "&opvalue=" + encodeURIComponent(txtItemOpeningValueFU.getRawValue());

	    	var param =(p1+p2+p3+p4+p5+p6);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMItemLedger.rptdesign&' + param, '_blank');
                }
                else
                {    
		var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
                var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var p4 = "&itemcode=" + encodeURIComponent(fitemcode);
		var p5 = "&opqty=" + encodeURIComponent(txtItemOpeningQty.getRawValue());
		var p6 = "&opvalue=" + encodeURIComponent(txtItemOpeningValue.getRawValue());

	    	var param =(p1+p2+p3+p4+p5+p6);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUItemLedger.rptdesign&' + param, '_blank'); 
                }
            }
        }
    });


   var txtItemOpeningQty = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txtItemOpeningQty',
        name        : 'txtItemOpeningQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemOpeningValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemOpeningValue',
        name        : 'txtItemOpeningValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txtItemRecptQty = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txtItemRecptQty',
        name        : 'txtItemRecptQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemRecptValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemRecptValue',
        name        : 'txtItemRecptValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemIssueQty = new Ext.form.NumberField({
        fieldLabel  : 'Issues',
        id          : 'txtItemIssueQty',
        name        : 'txtItemIssueQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemIssueValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemIssueValue',
        name        : 'txtItemIssueValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txtItemClosingQty = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txtItemClosingQty',
        name        : 'txtItemClosingQty',
        width       :  90,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtItemClosingValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtItemClosingValue',
        name        : 'txtItemClosingValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


 var loadItem_LedgerDataStore = new Ext.data.Store({
      id: 'loadItem_LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItem_PartywiseArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['trntype', 'docdate','docdate2', 'docno', 'cust_name', 'itemname', 'itmh_code', 'qty', 'itemvalue', 'rate' ]),
    });


 var loadRMItem_LedgerDataStore = new Ext.data.Store({
      id: 'loadRMItem_LedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItem_ledger_trans"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['trntype', 'docdate','docdate2', 'docno', 'supname', 'itemname', 'itmh_code', 'qty', 'itemvalue', 'rate' ]),
    });




    var btnGroup = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Group Summary View ",
	width   : 120,
	height  : 35,
        id:'btnGroup',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){


		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary.rptdesign&__format=XLS&' + param, '_blank');

                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary.rptdesign' + param, '_blank');	



	    }
	}
	});


    var btnGroupValue = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Group Value View ",
	width   : 120,
	height  : 35,
        id:'btnGroup',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary_ValueOnly.rptdesign&__format=pdf&' + param, '_blank');	
                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary_ValueOnly.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroupSummary_ValueOnly.rptdesign' + param, '_blank');	



	    }
	}
	});

var txttab1openingval = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txttab1openingval',
        name        : 'txttab1openingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab1Recptval = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txttab1Recptval',
        name        : 'txttab1Recptval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab1Issueval = new Ext.form.NumberField({
        fieldLabel  : 'Issue',
        id          : 'txttab1Issueval',
        name        : 'txttab1Issueval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab1Closingval = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txttab1Closingval',
        name        : 'txttab1Closingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

    var btnAllGroup = new Ext.Button({
        style   : 'text-align:center;',
        text    : "All Items View ",
	width   : 120,
	height  : 35,
        id:'btnAllGroup',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

 		    var param = (p1+p2+p3+p4) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroup_All_ItemDetails.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 	
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroup_All_ItemDetails.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockGroup_All_ItemDetails.rptdesign' + param, '_blank');	



	    }
	}
	});


 var loadItemClosingStockDataStore = new Ext.data.Store({
      id: 'loadItemClosingStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemwiseStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['itmh_type', 'itmh_name', 'itemcode', 'opstk', 'opval', 'recpt_qty', 'recpt_val', 'iss_qty', 'iss_val', 'sal_qty', 'sal_val', 'ret_qty', 'ret_val', 'company_name', 'itmh_name', 'itmh_code', 'itmt_opqty', 'itmt_opvalue', 'op_rect_qty', 'op_rect_val', 'op_recret_qty', 'op_recret_val', 'op_is_qty', 'op_is_value', 'op_ir_qty', 'op_ir_value', 'op_sale_qty', 'op_sale_value', 'rect_qty', 'rect_val', 'recret_qty', 'recret_val', 'is_qty', 'is_value', 'ir_qty','ir_value', 'sale_qty', 'sale_value']),
    });


function tab1grid_tot(){

        var oval = 0;
	var rval=0;
	var ival=0;
	var cval=0;
        txttab1openingval.setValue('');
        txttab1Recptval.setValue('');
	txttab1Issueval.setValue('');
	txttab1Closingval.setValue('');
       var Row= flxDetail.getStore().getCount();
       flxDetail.getSelectionModel().selectAll();
       var sel=flxDetail.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.clo_val) > 0)
              {
		      oval =oval+Number(sel[i].data.op_value);
                      rval =rval+Number(sel[i].data.rec_val);
 		      ival =ival+Number(sel[i].data.iss_val);
  		      cval =cval+Number(sel[i].data.clo_val);

              }
         }
   
         txttab1openingval.setValue(oval);
	txttab1Recptval.setValue(rval);
	txttab1Issueval.setValue(ival);
	txttab1Closingval.setValue(cval);
}

function tab2grid_tot(){

        var t2oval = 0;
	var t2rval=0;
	var t2ival=0;
	var t2cval=0;
        txttab2openingval.setValue('');
        txttab2Recptval.setValue('');
	txttab2Issueval.setValue('');
	txttab2Closingval.setValue('');
       var Row= flxSubGroup.getStore().getCount();
       flxSubGroup.getSelectionModel().selectAll();
       var sel=flxSubGroup.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
              if (Number(sel[i].data.clo_val) > 0)
              {
		      t2oval =t2oval+Number(sel[i].data.op_value);
                      t2rval =t2rval+Number(sel[i].data.rec_val);
 		      t2ival =t2ival+Number(sel[i].data.iss_val);
  		      t2cval =t2cval+Number(sel[i].data.clo_val);

              }
         }
   
         txttab2openingval.setValue(t2oval);
	txttab2Recptval.setValue(t2rval);
	txttab2Issueval.setValue(t2ival);
	txttab2Closingval.setValue(t2cval);
}

function tab3grid_tot(){

        var t3oval = 0;
	var t3rval=0;
	var t3ival=0;
	var t3cval=0;
        txttab3openingval.setValue('');
        txttab3Recptval.setValue('');
	txttab3Issueval.setValue('');
	txttab3Closingval.setValue('');
       var Row= flxSubGrpItem.getStore().getCount();
       flxSubGrpItem.getSelectionModel().selectAll();
       var sel=flxSubGrpItem.getSelectionModel().getSelections();
       for(var i=0;i<Row;i++)
       {
//              if (Number(sel[i].data.clo_val) > 0)
//              {
		      t3oval =t3oval+Number(sel[i].data.op_value);
                      t3rval =t3rval+Number(sel[i].data.rec_val);
 		      t3ival =t3ival+Number(sel[i].data.iss_val);
  		      t3cval =t3cval+Number(sel[i].data.clo_val);

//              }
         }
   
         txttab3openingval.setValue(t3oval);
	txttab3Recptval.setValue(t3rval);
	txttab3Issueval.setValue(t3ival);
	txttab3Closingval.setValue(t3cval);
}


function tab4grid_tot(){

        var topwt = 0;
        var topval = 0;

        var trecptwt = 0;
        var trecptval = 0;

        var tissuewt = 0;
        var tissueval = 0;

        var tclosewt = 0;
        var tcloseval = 0;

         txttotRecptQty.setValue('');
         txttotRecptValue.setValue('');
         txttotIssueQty.setValue('');
         txttotIssueValue.setValue('');

        var Row= flxLedger.getStore().getCount();
        flxLedger.getSelectionModel().selectAll();
        var sel=flxLedger.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {


	      trecptwt =trecptwt+Number(sel[i].data.rec_qty);
	      trecptval=trecptval+Number(sel[i].data.rec_val);
	      tissuewt =tissuewt+Number(sel[i].data.iss_qty);
	      tissueval=tissueval+Number(sel[i].data.iss_val);
         }




         txttotRecptQty.setValue(trecptwt);
         txttotRecptValue.setValue(trecptval);
         txttotIssueQty.setValue(tissuewt);
         txttotIssueValue.setValue(tissueval);




}


function RMgrid_tot(){

        var topwt = 0;
        var topval = 0;

        var trecptwt = 0;
        var trecptval = 0;

        var tissuewt = 0;
        var tissueval = 0;

        var tclosewt = 0;
        var tcloseval = 0;

         txttotRecptQtyRM.setValue('');
         txttotRecptValueRM.setValue('');
         txttotIssueQtyRM.setValue('');
         txttotIssueValueRM.setValue('');
         txttotOpeningQtyRM.setValue('');
         txttotOpeningValueRM.setValue('');

         txttotClosingQtyRM.setValue('');
         txttotClosingValueRM.setValue('');

        var Row= flxItemsRM.getStore().getCount();
        flxItemsRM.getSelectionModel().selectAll();
        var sel=flxItemsRM.getSelectionModel().getSelections();





       for(var i=0;i<Row;i++)

        {


	      trecptwt =trecptwt+Number(sel[i].data.recptqty);
	      trecptval=trecptval+Number(sel[i].data.recptvalue);
	      tissuewt =tissuewt+Number(sel[i].data.issueqty);
	      tissueval=tissueval+Number(sel[i].data.issuevalue);

	      topwt     = topwt+Number(sel[i].data.opqty);
	      topval    = topval+Number(sel[i].data.opvalue);
	      tclosewt  = tclosewt+Number(sel[i].data.cloqty);
	      tcloseval = tcloseval+Number(sel[i].data.clovalue);

         }




         txttotRecptQtyRM.setValue(trecptwt);
         txttotRecptValueRM.setValue(trecptval);
         txttotIssueQtyRM.setValue(tissuewt);
         txttotIssueValueRM.setValue(tissueval);

         txttotOpeningQtyRM.setValue(topwt);
         txttotOpeningValueRM.setValue(topval);
         txttotClosingQtyRM.setValue(tclosewt);
         txttotClosingValueRM.setValue(tcloseval);

}



function FUgrid_tot(){

        var topwt = 0;
        var topval = 0;

        var trecptwt = 0;
        var trecptval = 0;

        var tissuewt = 0;
        var tissueval = 0;

        var tclosewt = 0;
        var tcloseval = 0;

         txttotRecptQtyFU.setValue('');
         txttotRecptValueFU.setValue('');
         txttotIssueQtyFU.setValue('');
         txttotIssueValueFU.setValue('');

         txttotOpeningQtyRM.setValue('');
         txttotOpeningValueRM.setValue('');

         txttotClosingQtyRM.setValue('');
         txttotClosingValueRM.setValue('');

         var Row= flxItemsFU.getStore().getCount();
         flxItemsFU.getSelectionModel().selectAll();
         var sel=flxItemsFU.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {


	      trecptwt =trecptwt+Number(sel[i].data.recptqty);
	      trecptval=trecptval+Number(sel[i].data.recptvalue);
	      tissuewt =tissuewt+Number(sel[i].data.issueqty);
	      tissueval=tissueval+Number(sel[i].data.issuevalue);

	      topwt     = topwt+Number(sel[i].data.opqty);
	      topval    = topval+Number(sel[i].data.opvalue);
	      tclosewt  = tclosewt+Number(sel[i].data.cloqty);
	      tcloseval = tcloseval+Number(sel[i].data.clovalue);

         }




         txttotRecptQtyFU.setValue(trecptwt);
         txttotRecptValueFU.setValue(trecptval);
         txttotIssueQtyFU.setValue(tissuewt);
         txttotIssueValueFU.setValue(tissueval);

         txttotOpeningQtyFU.setValue(topwt);
         txttotOpeningValueFU.setValue(topval);
         txttotClosingQtyFU.setValue(tclosewt);
         txttotClosingValueFU.setValue(tcloseval);

}



    var btnSubGroup = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Sub Group View",
	width   : 90,
	height  : 35,
        id:'btnSubGroup',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(grpcode);
                    var p6 = "&grpname=" + encodeURIComponent(grpname);
                    var p7 = "&allitems=0";
 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummary.rptdesign&__format=pdf&' + param, '_blank');

                else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummary.rptdesign&__format=XLS&' + param, '_blank');

	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummary.rptdesign' + param, '_blank');	



	    }
	}
	});



    var btnAllSubGroup = new Ext.Button({
        style   : 'text-align:center;',
        text    : "All Sub Group view ",
	width   : 90,
	height  : 35,
        id:'btnSubGroup',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(grpcode);
                    var p6 = "&grpname=" + encodeURIComponent(grpname);
                    var p7 = "&allitems=1";
 		    var param = (p1+p2+p3+p4+p5+p6+p7) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummaryItemwise.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummaryItemwise.rptdesign&__format=XLS&' + param, '_blank');	
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupSummaryItemwise.rptdesign' + param, '_blank');	



	    }
	}
	});

    var btnSubGroupItems = new Ext.Button({
        style   : 'text-align:center;',
        text    : "View",
	width   : 90,
	height  : 35,
        id:'btnSubGroupItems',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&grpcode=" + encodeURIComponent(subgrpcode);
                    var p6 = "&grpname=" + encodeURIComponent(subgrpname);

 		    var param = (p1+p2+p3+p4+p5+p6) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupItemwise.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupItemwise.rptdesign&__format=xls&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStockSubGroupItemwise.rptdesign' + param, '_blank');	



	    }
	}
	});


    var btnLedger = new Ext.Button({
        style   : 'text-align:center;',
        text    : "Ledger View",
	width   : 90,
	height  : 35,
        id:'btnLedger',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	}, 
        listeners: {
            click: function(){
		    var p1 ="&compcode="+encodeURIComponent(GinCompcode);      
		    var p2 ="&finid="+encodeURIComponent(GinFinid);    
	            var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	
                    var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                    var p5 = "&itemcode=" + encodeURIComponent(itemcode);
//                    var p6 = "&maingroupname=" + enodeURIComponent(grpname);

 		    var param = (p1+p2+p3+p4+p5) ;
//alert(param);
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedgerItem.rptdesign&__format=pdf&' + param, '_blank');	
                    else if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedgerItem.rptdesign&__format=xls&' + param, '_blank');	

                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresStoreLedgerItem.rptdesign' + param, '_blank');	



	    }
	}
	})


var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
});


var lblDetail2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail2',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        }, 
});

var lblDetail3 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail3',
    width       : 150,
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",
    labelStyle : "font-size:12px;font-weight:bold;color:#ff6699",
    
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '13px','font-weight':'bold'
        }, 
});


 var loadItemLedgerDataStore = new Ext.data.Store({
      id: 'loadItemLedgerDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsViewRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemLedgerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
           'doctype','type', 'doc_no', 'doc_date', 'doc_date2','rec_qty', 'rec_val', 'iss_qty', 'iss_val', 'iss_cr_status', 'cust_name', 'cost_name', 'item_code', 'op_rec_qty', 'op_rec_val', 'op_ret_rec_qty', 'op_ret_rec_val', 'op_adjm_qty', 'op_adjm_val', 'op_iss_qty', 'op_iss_val', 'op_ret_iss_qty', 'op_ret_iss_val', 'op_adjp_qty', 'op_adjp_val', 'item_code', 'item_name', 'item_comp_code', 'item_avg_rate', 'item_stock', 'item_yr_opqty', 'item_yr_opval', 'item_fin_code', 'uom_short_name', 'subgrp_name', 'grp_name','op_qty','op_value'
      ]),
    });

   var txtOpeningStock = new Ext.form.NumberField({
        fieldLabel  : 'Opening Stock',
        id          : 'txtOpeningStock',
        name        : 'txtOpeningStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtOpeningValue = new Ext.form.NumberField({
        fieldLabel  : 'Opening Value',
        id          : 'txtOpeningValue',
        name        : 'txtOpeningValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



   var txtClosingStock = new Ext.form.NumberField({
        fieldLabel  : 'Closing Stock',
        id          : 'txtClosingStock',
        name        : 'txtClosingStock',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txtClosingValue = new Ext.form.NumberField({
        fieldLabel  : 'Closing Value',
        id          : 'txtClosingValue',
        name        : 'txtClosingValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

var txttab2openingval = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txttab2openingval',
        name        : 'txttab2openingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab2Recptval = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txttab2Recptval',
        name        : 'txttab2Recptval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab2Issueval = new Ext.form.NumberField({
        fieldLabel  : 'Issue',
        id          : 'txttab2Issueval',
        name        : 'txttab2Issueval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab2Closingval = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txttab2Closingval',
        name        : 'txttab2Closingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab3openingval = new Ext.form.NumberField({
        fieldLabel  : 'Opening',
        id          : 'txttab3openingval',
        name        : 'txttab3openingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab3Recptval = new Ext.form.NumberField({
        fieldLabel  : 'Receipt',
        id          : 'txttab3Recptval',
        name        : 'txttab3Recptval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab3Issueval = new Ext.form.NumberField({
        fieldLabel  : 'Issue',
        id          : 'txttab3Issueval',
        name        : 'txttab3Issueval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });
var txttab3Closingval = new Ext.form.NumberField({
        fieldLabel  : 'Closing',
        id          : 'txttab3Closingval',
        name        : 'txttab3Closingval',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
            'color':'darkgreen',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

var flxLedger = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:70,
    height: 380,
    hidden:false,
    width: 1200,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "DocType" , dataIndex: 'doctype',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Type" , dataIndex: 'type',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Item Code" , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Doc No" , dataIndex: 'doc_no',sortable:false,width:100,align:'left', menuDisabled: true},

        {header: "Doc. Date" , dataIndex: 'doc_date',sortable:false,width:100,align:'center', menuDisabled: true,hidden : true},
        {header: "Doc. Date" , dataIndex: 'doc_date2',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "Particulars"  , dataIndex: 'cust_name',sortable:false,width:300,align:'center', menuDisabled: true},
        {header: "Receipt Qty"  , dataIndex: 'rec_qty',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Receipt Value"  , dataIndex: 'rec_val',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Issue Qty"  , dataIndex: 'iss_qty',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Issue Value"  , dataIndex: 'iss_val',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Rate"  , dataIndex: 'item_avg_rate',sortable:false,width:110,align:'right', menuDisabled: true},

    ],
     store: [], // loadItemListDataStore,
    listeners:{	

            'rowDblClick' : function(flxLedger,rowIndex,cellIndex,e){
//                tabOverall.setActiveTab(2);

		var sm = flxLedger.getSelectionModel();
		var selrow   = sm.getSelected();
                var docno    = selrow.get('doc_no')
                var doctype    = selrow.get('type')
                var grntype    = selrow.get('doctype')


                if (doctype == "RE" &&  grntype == "P")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
                 }
                if (doctype == "RE" &&  grntype == "I")
                { 
         	   var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
	           var p2 = "&finid=" + encodeURIComponent(GinFinid);
		   var p3 = "&minno=" + encodeURIComponent(docno);
		   var param = (p1+p2+p3) ;   
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param); 
                 }

                if (doctype == "IS")
                { 
  		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&fromno=" + encodeURIComponent(docno);
		  var p4 = "&tono=" + encodeURIComponent(docno);
            	  var p5 = "&voutype=" + encodeURIComponent('IS');
                  var param = (p1+p2+p3+p4+p5) ;  

		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresIssuePrint.rptdesign&__format=pdf' + param); 
                 }


            }


}
});




var flxLedger2 = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 450,
    hidden:false,
    width: 1000,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Type"  ,  dataIndex: 'trntype',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "Date"  ,  dataIndex: 'docdate',sortable:false,width:110,align:'center', menuDisabled: true},
        {header: "Doc No."    , dataIndex: 'docno',sortable:false,width:85,align:'center', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'supname',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itemname',sortable:false,width:170,align:'left', menuDisabled: true},
        {header: "Item Code" , dataIndex: 'itmh_code',sortable:false,width:85,align:'right', menuDisabled: true,hidden:true},
        {header: "Qty (t)" , dataIndex: 'qty',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "Value " , dataIndex: 'itemvalue',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Rate"    , dataIndex: 'rate',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadItem_LedgerDataStore,
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

                  var grnno = selrow.get('docno')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param); 



     
    }
 }
});




var loadGroupStockDataStore = new Ext.data.Store({
      id: 'loadGroupStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMainGroupStockAbstract"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['grp_name', 'grp_code', 'op_qty', 'op_rate', 'op_value', 'rec_qty', 'rec_rate', 'rec_val', 'iss_qty', 'iss_rate', 'iss_val', 'clo_qty', 'clo_rate', 'clo_val' ]),
    });


var loadSubGroupStockDataStore = new Ext.data.Store({
      id: 'loadSubGroupStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroupStockAbstract"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['subgrp_name', 'subgrp_code', 'op_qty', 'op_rate', 'op_value', 'rec_qty', 'rec_rate', 'rec_val', 'iss_qty', 'iss_rate', 'iss_val', 'clo_qty', 'clo_rate', 'clo_val','item_name','item_code' ]),
    });




var loadSubGrp_ItemStockDataStore = new Ext.data.Store({
      id: 'loadSubGrp_ItemStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroupStockItemList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['item_name', 'item_code', 'op_qty', 'op_rate', 'op_value', 'rec_qty', 'rec_rate', 'rec_val', 'iss_qty', 'iss_rate', 'iss_val', 'clo_qty', 'clo_rate', 'clo_val' ]),
    });
       

var loadSubGrp_ItemStockDataStore_WP = new Ext.data.Store({
      id: 'loadSubGrp_ItemStockDataStore_WP',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGSStockSummary.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroupStockItemList_WP"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['item_name', 'item_code', 'op_qty', 'op_rate', 'op_value', 'rec_qty', 'rec_rate', 'rec_val', 'iss_qty', 'iss_rate', 'iss_val', 'clo_qty', 'clo_rate', 'clo_val' ]),
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
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
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

  
 var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date(),
        width : 110   
    });



function processdata()
{


//    monthenddate.setValue(Ext.util.Format.date(dt_today,"Y-m-d"));
    
	loadGroupStockDataStore.removeAll();

		    Ext.Ajax.request({
//		    url: '/SHVPM/Stores/RepGSReports/GSGeneralReports/RepGSRPT.php',
		    url: '/SHVPM/Stores/General/RepGSReports/RepGSRPT.php',
		    params :
		     {
		       compcode     : GinCompcode,
		       finid	    : GinFinid,
		       fromdate	    : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		       todate	    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
		       finstartdate : finstartdate,
		       RPT	    : "STORELEDGER"
		                                    	
		    },
                    callback:function()
	            {
	loadGroupStockDataStore.removeAll();
	loadGroupStockDataStore.load({
	 url: 'ClsGSStockSummary.php',
                params: {
	    	task: 'loadMainGroupStockAbstract',
                compcode:GinCompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   tab1grid_tot();
		 //  tab2grid_tot();
                   
		}
	    });                    
                    }
                    });


}
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

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);


    processdata();



     
}


function ProcessMainData()
{


	flxItems.getStore().removeAll();
	flxItemsRM.getStore().removeAll();
	flxItemsFU.getStore().removeAll();
        flxLedger.getStore().removeAll();
	loadItemClosingStockDataStore.removeAll();
	loadItemClosingStockDataStore.load({
	 url: 'ClsGSStockSummary.php',
                params: {
	    	task: 'loadItemwiseStockSummary',
                compcode:GinCompcode,
                finid:GinFinid,
                finstartdate : Ext.util.Format.date(finstartdate,"Y-m-d"), 
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                reptype : reptype,
                
		},

       	scope:this,
		callback:function()
		{

                  var cnt=loadItemClosingStockDataStore.getCount();
                   if (reptype == "WP")
                   {      
 
                   if(cnt>0)
                   {    
                     for(var j=0; j<cnt; j++)
                     { 
                         opening_qty = Number(loadItemClosingStockDataStore.getAt(j).get('opstk')); 

                         opening_value = Number(loadItemClosingStockDataStore.getAt(j).get('opval'));

                         opening_rate = 0;
                         if (Number(opening_value) > 0 &&  Number(opening_qty) > 0)
                             opening_rate = Number(opening_value)/Number(opening_qty);



                         receipt_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('recpt_qty'));

                         receipt_value  = Number(loadItemClosingStockDataStore.getAt(j).get('recpt_val'));

                         receipt_rate = 0;
                         if (Number(receipt_value) > 0 &&  Number(receipt_qty) > 0)
                             receipt_rate = Number(receipt_value)/Number(receipt_qty);





                         issue_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('iss_qty'));

                         issue_value  = Number(loadItemClosingStockDataStore.getAt(j).get('iss_val'));

                         issue_rate = 0;
                         if (Number(issue_value) > 0 &&  Number(issue_qty) > 0)
                             issue_rate = Number(issue_value)/Number(issue_qty);




                         closing_qty   = Number(opening_qty) + Number(receipt_qty) - Number(issue_qty) ;
                         closing_value = Number(opening_value) + Number(receipt_value) - Number(issue_value) ;

                         closing_rate = 0;
                         if (Number(closing_value ) > 0 &&  Number(closing_qty) > 0)
                             closing_rate = Number(closing_value)/Number(closing_qty);





                        opening_qty  = Ext.util.Format.number(Number(opening_qty),"0.000");
                        receipt_qty  = Ext.util.Format.number(Number(receipt_qty),"0.000");
                        issue_qty    = Ext.util.Format.number(Number(issue_qty),"0.000");
                        closing_qty  = Ext.util.Format.number(Number(closing_qty),"0.000");

                        opening_value = Ext.util.Format.number(Number(opening_value),"0.00");
                        receipt_value = Ext.util.Format.number(Number(receipt_value),"0.00");
                        issue_value   = Ext.util.Format.number(Number(issue_value),"0.00");
                        closing_value = Ext.util.Format.number(Number(closing_value),"0.00");

                        opening_rate = Ext.util.Format.number(Number(opening_rate),"0.00");
                        receipt_rate = Ext.util.Format.number(Number(receipt_rate),"0.00");
                        issue_rate   = Ext.util.Format.number(Number(issue_rate),"0.00");
                        closing_rate = Ext.util.Format.number(Number(closing_rate),"0.00");

                         var RowCnt    = flxItems.getStore().getCount() + 1; 



                         flxItemsRM.getStore().insert(
	                    flxItemsRM.getStore().getCount(),
                            new dgrecord({
                                itmh_name   : loadItemClosingStockDataStore.getAt(j).get('itmh_name'),
                                itmh_code   : loadItemClosingStockDataStore.getAt(j).get('itemcode'),
                                opqty       : opening_qty,
                                opvalue     : opening_value,
                                oprate      : opening_rate,
                                recptqty    : receipt_qty,
                                recptvalue  : receipt_value,
                                recptrate   : receipt_rate,
                                issueqty    : issue_qty,
                                issuevalue  : issue_value,
                                issuerate   : issue_rate,
                                cloqty      : closing_qty,
                                clovalue    : closing_value,
                                clorate     : closing_rate,
                            })
                          );  




                     }
                   RMgrid_tot();
                   }     

                   }  

                   else
                   {
                   if(cnt>0)
                   {    
                     for(var j=0; j<cnt; j++)
                     { 
                         opening_qty = Number(loadItemClosingStockDataStore.getAt(j).get('itmt_opqty')) +
Number(loadItemClosingStockDataStore.getAt(j).get('op_rect_qty')) -  
Number(loadItemClosingStockDataStore.getAt(j).get('op_recret_qty')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_is_qty')) + 
Number(loadItemClosingStockDataStore.getAt(j).get('op_ir_qty')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_sale_qty'));

                         opening_value = Number(loadItemClosingStockDataStore.getAt(j).get('itmt_opvalue')) +
Number(loadItemClosingStockDataStore.getAt(j).get('op_rect_val')) -  
Number(loadItemClosingStockDataStore.getAt(j).get('op_recret_val')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_is_value')) + 
Number(loadItemClosingStockDataStore.getAt(j).get('op_ir_value')) - 
Number(loadItemClosingStockDataStore.getAt(j).get('op_sale_value'));

                         opening_rate = 0;
                         if (Number(opening_value) > 0 &&  Number(opening_qty) > 0)
                             opening_rate = Number(opening_value)/Number(opening_qty);

                         receipt_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('rect_qty')) -
Number(loadItemClosingStockDataStore.getAt(j).get('recret_qty'));

                         receipt_value  = Number(loadItemClosingStockDataStore.getAt(j).get('rect_val')) -
Number(loadItemClosingStockDataStore.getAt(j).get('recret_val'));

                         receipt_rate = 0;
                         if (Number(receipt_value) > 0 &&  Number(receipt_qty) > 0)
                             receipt_rate = Number(receipt_value)/Number(receipt_qty);





                         issue_qty  = Number(loadItemClosingStockDataStore.getAt(j).get('is_qty')) -
Number(loadItemClosingStockDataStore.getAt(j).get('ir_qty'));

                         issue_value  = Number(loadItemClosingStockDataStore.getAt(j).get('is_value')) -
Number(loadItemClosingStockDataStore.getAt(j).get('ir_value'));

                         issue_rate = 0;
                         if (Number(issue_value) > 0 &&  Number(issue_qty) > 0)
                             issue_rate = Number(issue_value)/Number(issue_qty);




                         closing_qty   = Number(opening_qty) + Number(receipt_qty) - Number(issue_qty) ;
                         closing_value = Number(opening_value) + Number(receipt_value) - Number(issue_value) ;

                         closing_rate = 0;
                         if (Number(closing_value ) > 0 &&  Number(closing_qty) > 0)
                             closing_rate = Number(closing_value)/Number(closing_qty);






                        opening_qty  = Ext.util.Format.number(Number(opening_qty),"0.000");
                        receipt_qty  = Ext.util.Format.number(Number(receipt_qty),"0.000");
                        issue_qty    = Ext.util.Format.number(Number(issue_qty),"0.000");
                        closing_qty  = Ext.util.Format.number(Number(closing_qty),"0.000");

                        opening_value = Ext.util.Format.number(Number(opening_value),"0.00");
                        receipt_value = Ext.util.Format.number(Number(receipt_value),"0.00");
                        issue_value   = Ext.util.Format.number(Number(issue_value),"0.00");
                        closing_value = Ext.util.Format.number(Number(closing_value),"0.00");

                        opening_rate = Ext.util.Format.number(Number(opening_rate),"0.00");
                        receipt_rate = Ext.util.Format.number(Number(receipt_rate),"0.00");
                        issue_rate   = Ext.util.Format.number(Number(issue_rate),"0.00");
                        closing_rate = Ext.util.Format.number(Number(closing_rate),"0.00");

                         var RowCnt    = flxItems.getStore().getCount() + 1; 
                         flxItemsFU.getStore().insert(
	                    flxItemsFU.getStore().getCount(),
                            new dgrecord({
                                itmh_name   : loadItemClosingStockDataStore.getAt(j).get('itmh_name'),
                                itmh_code   : loadItemClosingStockDataStore.getAt(j).get('itmh_code'),
                                opqty       : opening_qty,
                                opvalue     : opening_value,
                                oprate      : opening_rate,
                                recptqty    : receipt_qty,
                                recptvalue  : receipt_value,
                                recptrate   : receipt_rate,
                                issueqty    : issue_qty,
                                issuevalue  : issue_value,
                                issuerate   : issue_rate,
                                cloqty      : closing_qty,
                                clovalue    : closing_value,
                                clorate     : closing_rate,
                            })
                        );  

                     }
                   }     
                   FUgrid_tot();

                    }         
		}
	    });
}


function grid_tot(){

        var topwt = 0;
        var topval = 0;

        var trecptwt = 0;
        var trecptval = 0;

        var tissuewt = 0;
        var tissueval = 0;

        var tclosewt = 0;
        var tcloseval = 0;

         txttotOpeningQty.setValue('');
         txttotOpeningValue.setValue('');
         txttotRecptQty.setValue('');
         txttotRecptValue.setValue('');
         txttotIssueQty.setValue('');
         txttotIssueValue.setValue('');
         txttotClosingQty.setValue('');
         txttotClosingValue.setValue('');
        var Row= flxItems.getStore().getCount();
        flxItems.getSelectionModel().selectAll();
        var sel=flxItems.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.cloqty) > 0)
              {
		      topwt =topwt+Number(sel[i].data.opqty);
		      topval=topval+Number(sel[i].data.opvalue);
		      trecptwt =trecptwt+Number(sel[i].data.recptqty);
		      trecptval=trecptval+Number(sel[i].data.recptvalue);
		      tissuewt =tissuewt+Number(sel[i].data.issueqty);
		      tissueval=tissueval+Number(sel[i].data.issuevalue);
		      tclosewt =tclosewt+Number(sel[i].data.cloqty);
		      tcloseval=tcloseval+Number(sel[i].data.clovalue);

              }
         }




         txttotOpeningQty.setValue(topwt);
         txttotOpeningValue.setValue(topval);
         txttotRecptQty.setValue(trecptwt);
         txttotRecptValue.setValue(trecptval);
         txttotIssueQty.setValue(tissuewt);
         txttotIssueValue.setValue(tissueval);

         txttotClosingQty.setValue(tclosewt);
         txttotClosingValue.setValue(tcloseval);



}


  var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
   
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });


 
var dgrecord = Ext.data.Record.create([]);

   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
         hidden:false,
        stripeRows : true,
        scrollable: true,
        x: 0,
        y: 20,
        height: 400,
        width: 1320,
       //  id: 'my-grid',     
        columns: [   

            {header: "Particulars", dataIndex: 'grp_name',sortable:true,width:200,align:'left'},
            {header: "grpcode", dataIndex: 'grp_code',sortable:true,width:50,align:'left',hidden:true},
            {header: "OBQuantity", dataIndex: 'op_qty',sortable:true,width:100,align:'right'},
            {header: "OBRate", dataIndex: 'op_rate',sortable:true,width:80,align:'right'},
            {header: "OBValue", dataIndex: 'op_value',sortable:true,width:100,align:'right'},
            {header: "InQuantity", dataIndex: 'rec_qty',sortable:true,width:100,align:'right'},
	    {header: "InRate", dataIndex: 'rec_rate',sortable:true,width:80,align:'right'},
	    {header: "InValue", dataIndex: 'rec_val',sortable:true,width:100,align:'right'},
	    {header: "OutQuantity", dataIndex: 'iss_qty',sortable:true,width:100,align:'right'},
	    {header: "OutRate", dataIndex: 'iss_rate',sortable:true,width:80,align:'right'},
	    {header: "OutValue", dataIndex: 'iss_val',sortable:true,width:100,align:'right'},
	    {header: "CBQuantity", dataIndex: 'clo_qty',sortable:true,width:100,align:'right'},
	    {header: "CBRate", dataIndex: 'clo_rate',sortable:true,width:70,align:'right'},
	    {header: "CBValue", dataIndex: 'clo_val',sortable:true,width:100,align:'right'},

        ],
        store:loadGroupStockDataStore,
        listeners:{	
       'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                grpcode = selrow.get('grp_code');
                grpname = selrow.get('grp_name');
           
                if (grpcode < 1000)
                {   
			lblDetail1.setText("Detail for   : " + grpname  );
		        RepStockSummaryPannel.setActiveTab(1);
		        flxSubGroup.getStore().removeAll();
		        flxSubGrpItem.getStore().removeAll();
		        flxLedger.getStore().removeAll();
			loadSubGroupStockDataStore.removeAll();
			loadSubGroupStockDataStore.load({
			 url: 'ClsGSStockSummary.php',
				params: {
			    	task: 'loadSubGroupStockAbstract',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
				enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		                grpcode : grpcode,
		                allitems : 0 ,
				},

		       	scope:this,
				callback:function()
				{

			  tab2grid_tot();
				}
			    });
                 } 
                 else if (grpcode == 1000 || grpcode == 2000)
                 {
		    reptype = 'WP';
                    if (grpcode == 1000)
                    {
		       reptype = 'WP';               
                       RepStockSummaryPannel.setActiveTab(4);
                    }  
		    else
                    {
                       RepStockSummaryPannel.setActiveTab(6);
		       reptype = 'FU';
                    }  

                    ProcessMainData();
                 }
        
        }   
        }

   });


   var flxSubGroup = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
         hidden:false,
        stripeRows : true,
        scrollable: true,
        x: 10,
        y: 20,
        height: 400,
        width: 1320,
       //  id: 'my-grid',     
        columns: [   

            {header: "Particulars", dataIndex: 'subgrp_name',sortable:true,width:180,align:'left'},
            {header: "grpcode", dataIndex: 'subgrp_code',sortable:true,width:50,align:'left',hidden : true},
            {header: "OBQuantity", dataIndex: 'op_qty',sortable:true,width:100,align:'right'},
            {header: "OBRate", dataIndex: 'op_rate',sortable:true,width:75,align:'right'},
            {header: "OBValue", dataIndex: 'op_value',sortable:true,width:100,align:'right'},
            {header: "InQuantity", dataIndex: 'rec_qty',sortable:true,width:100,align:'right'},
	    {header: "InRate", dataIndex: 'rec_rate',sortable:true,width:75,align:'right'},
	    {header: "InValue", dataIndex: 'rec_val',sortable:true,width:100,align:'right'},
	    {header: "OutQuantity", dataIndex: 'iss_qty',sortable:true,width:100,align:'right'},
	    {header: "OutRate", dataIndex: 'iss_rate',sortable:true,width:75,align:'right'},
	    {header: "OutValue", dataIndex: 'iss_val',sortable:true,width:100,align:'right'},
	    {header: "CBQuantity", dataIndex: 'clo_qty',sortable:true,width:100,align:'right'},
	    {header: "CBRate", dataIndex: 'clo_rate',sortable:true,width:75,align:'right'},
	    {header: "CBValue", dataIndex: 'clo_val',sortable:true,width:100,align:'right'},

        ],
        store:loadSubGroupStockDataStore,
        listeners:{	
       'cellDblclick': function (flxSubGroup, rowIndex, cellIndex, e) {
		var sm = flxSubGroup.getSelectionModel();
		var selrow = sm.getSelected();
                subgrpcode = selrow.get('subgrp_code');
                subgrpname = selrow.get('subgrp_name');
                RepStockSummaryPannel.setActiveTab(2);         
		lblDetail2.setText("Detail for   : " + subgrpname  );
                flxSubGrpItem.getStore().removeAll();
                flxLedger.getStore().removeAll();
		loadSubGrp_ItemStockDataStore.removeAll();
		loadSubGrp_ItemStockDataStore.load({
		url: 'ClsGSStockSummary.php',
		        params: {
		    	task: 'loadSubGroupStockItemList',
		        compcode:GinCompcode,
		        finid:GinFinid,
		        startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
		        enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                        grpcode : subgrpcode,
                        rtype   : 'GS'
			},

	       	scope:this,
			callback:function()
			{

		          tab3grid_tot();
			}
                 });
            }
	}
       }); 

    
   var flxSubGrpItem  = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
         hidden:false,
        stripeRows : true,
        scrollable: true,
        x: 10,
        y: 20,
        height: 400,
        width: 1400,
       //  id: 'my-grid',     
        columns: [   

            {header: "Particulars", dataIndex: 'item_name',sortable:true,width:200,align:'left'},
            {header: "grpcode",     dataIndex: 'item_code',sortable:true,width:50,align:'left',hidden : true},
            {header: "OBQuantity",  dataIndex: 'op_qty',   sortable:true,width:100,align:'right'},
            {header: "OBRate",      dataIndex: 'op_rate',  sortable:true,width:75,align:'right'},
            {header: "OBValue",     dataIndex: 'op_value', sortable:true,width:100,align:'right'},
            {header: "InQuantity",  dataIndex: 'rec_qty',  sortable:true,width:100,align:'right'},
	    {header: "InRate",      dataIndex: 'rec_rate', sortable:true,width:75,align:'right'},
	    {header: "InValue",     dataIndex: 'rec_val',  sortable:true,width:100,align:'right'},
	    {header: "OutQuantity", dataIndex: 'iss_qty',  sortable:true,width:100,align:'right'},
	    {header: "OutRate",     dataIndex: 'iss_rate', sortable:true,width:75,align:'right'},
	    {header: "OutValue",    dataIndex: 'iss_val',  sortable:true,width:100,align:'right'},
	    {header: "CBQuantity",  dataIndex: 'clo_qty',  sortable:true,width:100,align:'right'},
	    {header: "CBRate",      dataIndex: 'clo_rate', sortable:true,width:75,align:'right'},
	    {header: "CBValue",     dataIndex: 'clo_val',  sortable:true,width:100,align:'right'},

        ],
        store:loadSubGrp_ItemStockDataStore,
        listeners:{	
       'cellDblclick': function (flxSubGrpItem, rowIndex, cellIndex, e) {
                var sm = flxSubGrpItem.getSelectionModel();
                var selrow = sm.getSelected();
                itemcode = selrow.get('item_code');
                itemname = selrow.get('item_name');
                lblDetail3.setText("Detail for the Item : " + itemname  );
/*
                txtClosingValue.setValue(selrow.get('clo_val'));
                txtClosingStock.setValue(selrow.get('clo_qty'));
                txtOpeningValue.setValue(selrow.get('op_value'));
		txtOpeningStock.setValue(selrow.get('op_qty'));
*/
                txttotClosingValue.setValue(selrow.get('clo_val'));
                txttotClosingQty.setValue(selrow.get('clo_qty'));
                txttotOpeningValue.setValue(selrow.get('op_value'));
		txttotOpeningQty.setValue(selrow.get('op_qty'));

//alert(selrow.get('op_value'));
                flxLedger.getStore().removeAll();
		        RepStockSummaryPannel.setActiveTab(3);
                        loadItemLedgerDataStore.removeAll();

			loadItemLedgerDataStore.load({
			url: '/SHVPM/Stores/ClsViewRep.php',
			params: {
		    	task: 'loadItemLedgerDetails',
			compcode:GinCompcode,
			finid:GinFinid,
	                itemcode : itemcode
			},

		       	scope:this,
			callback:function()
			{
                           var cnt=loadItemLedgerDataStore.getCount();
// alert(cnt);
	                   if(cnt>0)
		           {

                               for(var j=0; j<cnt; j++)
                               { 
                                  var RowCnt    = flxLedger.getStore().getCount() + 1;   
                                  flxLedger.getStore().insert(
                                  flxLedger.getStore().getCount(),
                                  new dgrecord({
          			   doctype       : loadItemLedgerDataStore.getAt(j).get('doctype'),
          			   type          : loadItemLedgerDataStore.getAt(j).get('type'),
              			   item_code     : loadItemLedgerDataStore.getAt(j).get('item_code'),
              			   doc_no        : loadItemLedgerDataStore.getAt(j).get('doc_no'),
              			   doc_date      : loadItemLedgerDataStore.getAt(j).get('doc_date'),
              			   doc_date2     : loadItemLedgerDataStore.getAt(j).get('doc_date2'),
              			   cust_name     : loadItemLedgerDataStore.getAt(j).get('cust_name'),
              			   rec_qty       : loadItemLedgerDataStore.getAt(j).get('rec_qty'),
              			   rec_val       : loadItemLedgerDataStore.getAt(j).get('rec_val'),
              			   iss_qty       : loadItemLedgerDataStore.getAt(j).get('iss_qty'),
              			   iss_val       : loadItemLedgerDataStore.getAt(j).get('iss_val'),
              			   item_avg_rate : loadItemLedgerDataStore.getAt(j).get('item_avg_rate'),
                                   })
                                 );
                               }  
			   tab4grid_tot();  
                           }   
                   

			}
		    });
           }
           }    
 });



   var txttotOpeningQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningQty',
        name        : 'txttotOpeningQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotOpeningValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotOpeningValue',
        name        : 'txttotOpeningValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });

   var txttotRecptQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptQty',
        name        : 'txttotRecptQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotRecptValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotRecptValue',
        name        : 'txttotRecptValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotIssueQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueQty',
        name        : 'txttotIssueQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotIssueValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotIssueValue',
        name        : 'txttotIssueValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });


   var txttotClosingQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingQty',
        name        : 'txttotClosingQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 3,
    });

   var txttotClosingValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txttotClosingValue',
        name        : 'txttotClosingValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
style: {
            'color':'#0C5DA9',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        decimalPrecision: 2,
    });



function grid_tot2(){

        var twt = 0;
        var tval = 0;




}

var dgrecord = Ext.data.Record.create([]);
var flxItems = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 370,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Item Name"  ,  dataIndex: 'itmh_name',sortable:false,width:210,align:'left', menuDisabled: true },
        {header: "Item Code"  ,  dataIndex: 'itmh_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "OP Qty"    , dataIndex: 'opqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "OP VALUE" , dataIndex: 'opvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "OP RATE" , dataIndex: 'oprate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "RECPT Qty"    , dataIndex: 'recptqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "RECPT VALUE" , dataIndex: 'recptvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "RECPT RATE" , dataIndex: 'recptrate',sortable:false,width:80,align:'right', menuDisabled: true},


        {header: "ISS Qty"    , dataIndex: 'issueqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "ISS VALUE" , dataIndex: 'issuevalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "ISS RATE" , dataIndex: 'issuerate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "CLO Qty"    , dataIndex: 'cloqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "CLO VALUE" , dataIndex: 'clovalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "CLO RATE" , dataIndex: 'clorate',sortable:false,width:80,align:'right', menuDisabled: true},


    ],
    store:[],
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

            fitemcode  = selrow.get('itmh_code');    
            fitemname = selrow.get('itmh_name');
            itemname = selrow.get('itmh_name');

            txtItemOpeningQty.setValue(selrow.get('opqty')); 
            txtItemOpeningValue.setValue(selrow.get('opvalue')); 
            txtItemRecptQty.setValue(selrow.get('recptqty')); 
            txtItemRecptValue.setValue(selrow.get('recptvalue')); 
            txtItemIssueQty.setValue(selrow.get('issueqty')); 
            txtItemIssueValue.setValue(selrow.get('issuevalue')); 
            txtItemClosingQty.setValue(selrow.get('cloqty')); 
            txtItemClosingValue.setValue(selrow.get('clovalue')); 

                
            RepStockSummaryPannel.setActiveTab(5);
//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  : " + itemname);


            flxLedger.getStore().removeAll();

	    loadItem_LedgerDataStore.removeAll();
	    loadItem_LedgerDataStore.load({
		url: 'ClsGSStockSummary.php',
		params: {
	    	task: 'loadItem_ledger_trans',
		compcode:GinCompcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                itemcode:selrow.get('itmh_code') ,  
                reptype : reptype,
		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });

     
    }
 }
});


var flxItemsRM = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 370,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Item Name"  ,  dataIndex: 'itmh_name',sortable:false,width:210,align:'left', menuDisabled: true },
        {header: "Item Code"  ,  dataIndex: 'itmh_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "OP Qty"    , dataIndex: 'opqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "OP VALUE" , dataIndex: 'opvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "OP RATE" , dataIndex: 'oprate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "RECPT Qty"    , dataIndex: 'recptqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "RECPT VALUE" , dataIndex: 'recptvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "RECPT RATE" , dataIndex: 'recptrate',sortable:false,width:80,align:'right', menuDisabled: true},


        {header: "ISS Qty"    , dataIndex: 'issueqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "ISS VALUE" , dataIndex: 'issuevalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "ISS RATE" , dataIndex: 'issuerate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "CLO Qty"    , dataIndex: 'cloqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "CLO VALUE" , dataIndex: 'clovalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "CLO RATE" , dataIndex: 'clorate',sortable:false,width:80,align:'right', menuDisabled: true},


    ],
    store:[],
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

            fitemcode  = selrow.get('itmh_code');    
            fitemname = selrow.get('itmh_name');
            itemname = selrow.get('itmh_name');

            txtItemOpeningQtyRM.setValue(selrow.get('opqty')); 
            txtItemOpeningValueRM.setValue(selrow.get('opvalue')); 
            txtItemRecptQtyRM.setValue(selrow.get('recptqty')); 
            txtItemRecptValueRM.setValue(selrow.get('recptvalue')); 
            txtItemIssueQtyRM.setValue(selrow.get('issueqty')); 
            txtItemIssueValueRM.setValue(selrow.get('issuevalue')); 
            txtItemClosingQtyRM.setValue(selrow.get('cloqty')); 
            txtItemClosingValueRM.setValue(selrow.get('clovalue')); 

                
            RepStockSummaryPannel.setActiveTab(5);
//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  : " + itemname);


            flxLedgerRM.getStore().removeAll();

	    loadRMItem_LedgerDataStore.removeAll();
	    loadRMItem_LedgerDataStore.load({
		url: 'ClsGSStockSummary.php',
		params: {
	    	task: 'loadItem_ledger_trans',
		compcode:GinCompcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                itemcode:selrow.get('itmh_code') ,  
                reptype : reptype,
		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });

     
    }
 }
});




var flxItemsFU = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 370,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Item Name"  ,  dataIndex: 'itmh_name',sortable:false,width:210,align:'left', menuDisabled: true },
        {header: "Item Code"  ,  dataIndex: 'itmh_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "OP Qty"    , dataIndex: 'opqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "OP VALUE" , dataIndex: 'opvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "OP RATE" , dataIndex: 'oprate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "RECPT Qty"    , dataIndex: 'recptqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "RECPT VALUE" , dataIndex: 'recptvalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "RECPT RATE" , dataIndex: 'recptrate',sortable:false,width:80,align:'right', menuDisabled: true},


        {header: "ISS Qty"    , dataIndex: 'issueqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "ISS VALUE" , dataIndex: 'issuevalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "ISS RATE" , dataIndex: 'issuerate',sortable:false,width:80,align:'right', menuDisabled: true},

        {header: "CLO Qty"    , dataIndex: 'cloqty',sortable:false,width:85,align:'right', menuDisabled: true},
        {header: "CLO VALUE" , dataIndex: 'clovalue',sortable:false,width:108,align:'right', menuDisabled: true},
        {header: "CLO RATE" , dataIndex: 'clorate',sortable:false,width:80,align:'right', menuDisabled: true},


    ],
    store:[],
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

            fitemcode  = selrow.get('itmh_code');    
            fitemname = selrow.get('itmh_name');
            itemname = selrow.get('itmh_name');

            txtItemOpeningQtyFU.setValue(selrow.get('opqty')); 
            txtItemOpeningValueFU.setValue(selrow.get('opvalue')); 
            txtItemRecptQtyFU.setValue(selrow.get('recptqty')); 
            txtItemRecptValueFU.setValue(selrow.get('recptvalue')); 
            txtItemIssueQtyFU.setValue(selrow.get('issueqty')); 
            txtItemIssueValueFU.setValue(selrow.get('issuevalue')); 
            txtItemClosingQtyFU.setValue(selrow.get('cloqty')); 
            txtItemClosingValueFU.setValue(selrow.get('clovalue')); 

                
            RepStockSummaryPannel.setActiveTab(7);
//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  : " + itemname);


            flxLedgerFU.getStore().removeAll();

	    loadRMItem_LedgerDataStore.removeAll();
	    loadRMItem_LedgerDataStore.load({
		url: 'ClsGSStockSummary.php',
		params: {
	    	task: 'loadItem_ledger_trans',
		compcode:GinCompcode,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                itemcode:selrow.get('itmh_code') ,  
                reptype : reptype,
		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });

     
    }
 }
});

var flxLedgerRM = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 450,
    hidden:false,
    width: 1000,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Type"  ,  dataIndex: 'trntype',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "Date"  ,  dataIndex: 'docdate',sortable:false,width:110,align:'center', menuDisabled: true},
        {header: "Doc No."    , dataIndex: 'docno',sortable:false,width:85,align:'center', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'supname',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itemname',sortable:false,width:170,align:'left', menuDisabled: true},
        {header: "Item Code" , dataIndex: 'itmh_code',sortable:false,width:85,align:'right', menuDisabled: true,hidden:true},
        {header: "Qty (t)" , dataIndex: 'qty',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "Value " , dataIndex: 'itemvalue',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Rate"    , dataIndex: 'rate',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadRMItem_LedgerDataStore,
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxLedgerRM.getSelectionModel();

	      var selrow = sm.getSelected();

                  var grnno = selrow.get('docno')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param); 



     
    }
 }
});



var flxLedgerFU = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 450,
    hidden:false,
    width: 1000,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Type"  ,  dataIndex: 'trntype',sortable:false,width:100,align:'left', menuDisabled: true },
        {header: "Date"  ,  dataIndex: 'docdate',sortable:false,width:110,align:'center', menuDisabled: true},
        {header: "Doc No."    , dataIndex: 'docno',sortable:false,width:85,align:'center', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'supname',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itemname',sortable:false,width:170,align:'left', menuDisabled: true},
        {header: "Item Code" , dataIndex: 'itmh_code',sortable:false,width:85,align:'right', menuDisabled: true,hidden:true},
        {header: "Qty (t)" , dataIndex: 'qty',sortable:false,width:90,align:'right', menuDisabled: true},
        {header: "Value " , dataIndex: 'itemvalue',sortable:false,width:110,align:'right', menuDisabled: true},
        {header: "Rate"    , dataIndex: 'rate',sortable:false,width:90,align:'right', menuDisabled: true},

    ],
    store:loadRMItem_LedgerDataStore,
    listeners:{	

            'cellclick': function (flxItems, rowIndex, cellIndex, e) {
		var sm = flxItems.getSelectionModel();

	      var selrow = sm.getSelected();

                  var grnno = selrow.get('docno')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var p4 = "&vouno=" + encodeURIComponent(grnno);
		var p5 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p6 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));


		var param = (p1+p2+p3+p4+p5+p6) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFuelGRN.rptdesign' + param); 




     
    }
 }
});

    var btnItemwisePrintRM = new Ext.Button({
        style: 'text-align:center;',
        text: "Stock List",
        width: 100,
        id: 'btnItemwisePrintRM',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {
  
			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
			var p5 = "&ptype=" + encodeURIComponent(1);
		        var param = (p1+p2+p3+p4+p5);
	//alert(param);
		        if (printtype == "PDF") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyValStockAbs.rptdesign&__format=pdf&' + param, '_blank'); 

		        else if (printtype == "XLS") 
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyValStockAbs.rptdesign&__format=XLS&' + param, '_blank'); 

		        else  
			window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMQtyValStockAbs.rptdesign&' + param, '_blank'); 


            }
        }
    });


    var btnItemwisePrintFU = new Ext.Button({
        style: 'text-align:center;',
        text: "Stock List",
        width: 100,
        id: 'btnItemwisePrintFU',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

		var compcode = "&compcode=" + encodeURIComponent(GinCompcode);
		var finid = "&finid=" + encodeURIComponent(GinFinid);
		var fstdate = "&fstdate=" + encodeURIComponent(finstartdate);
		var opdate = "&opdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
	        var p1 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
		var p2 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		var rtype = "&rtype=" + encodeURIComponent(1);
	    	var param =(compcode+finid+p1+p2);
                var param = (compcode+finid+fstdate+opdate+p1+p2+rtype);

                if (printtype == "PDF") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&__format=pdf&' + param, '_blank'); 

                else if (printtype == "XLS") 
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&__format=XLS&' + param, '_blank'); 

                else  
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Fuel/RepFUStockAbstract.rptdesign&' + param, '_blank'); 
                }

        }
    });


var lblItem = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblItem',
        name        : 'lblItem',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblQty = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblQty',
        name        : 'lblQty',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblValue = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblValue',
        name        : 'lblValue',
	style: {
            'color':'#f93005',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });




var lblOpening = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblOpening',
        name        : 'lblOpening',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });




var lblReceipt = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblReceipt',
        name        : 'lblReceipt',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblIssue = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblIssue',
        name        : 'lblIssue',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });



var lblClosing = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblClosing',
        name        : 'lblClosing',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });




 var RepStockSummaryPannel = new Ext.TabPanel({
    id          : 'RepStockSummaryPannel',
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
    items       : [
    {
        xtype: 'panel',
        title: 'GROUP WISE STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
               flxDetail,

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 150,
                     border  : false,
	             x       : 880,
		     y       : 435,
                     items: [btnGroup]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 150,
                     border  : false,
	             x       : 1020,
		     y       : 435,
                     items: [btnAllGroup]
                },

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 150,
                     border  : false,
	             x       : 1150,
		     y       : 435,
                     items: [btnGroupValue]
                },
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 30,
	y           : 440,
	border      : false,
	items: [txttab1openingval]
	},
      { 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 230,
	y           : 440,
	border      : false,
	items: [txttab1Recptval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 430,
	y           : 440,
	border      : false,
	items: [txttab1Issueval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 260,
	x           : 630,
	y           : 440,
	border      : false,
	items: [txttab1Closingval]
	},
	 
        ]
    } ,
    {
        xtype: 'panel',
        title: 'SUB GROUP WISE STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
	{
	    xtype       : 'fieldset',
	    title       : '',
	    width       : 700,
	    labelWidth  : 1,
	    x           : 500,
	    y           : -5,
	    defaultType : 'Label',
	    border      : false,
	    items: [lblDetail1]
	}, 

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 1320,
                            x           : 10,
                            y           : 20,

                            border      : false,
                            items: [flxSubGroup]
                        },
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 140,
                     border  : false,
	             x       : 950,
		     y       : 435,
                     items: [btnSubGroup]
                },
	
		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 130,
                     border  : false,
	             x       : 1100,
		     y       : 435,
                     items: [btnAllSubGroup]
                },
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 30,
	y           : 440,
	border      : false,
	items: [txttab2openingval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 230,
	y           : 440,
	border      : false,
	items: [txttab2Recptval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 430,
	y           : 440,
	border      : false,
	items: [txttab2Issueval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 300,
	x           : 630,
	y           : 440,
	border      : false,
	items: [txttab2Closingval]
	},
	 
        ]
    },
    {
        xtype: 'panel',
        title: 'ITEM WISE STOCK',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 700,
			labelWidth  : 1,
			x           : 500,
			y           : -5,
			defaultType : 'Label',
			border      : false,
			items: [lblDetail2]
		}, 

		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 1320,
			x           : 10,
			y           : 20,

			border      : false,
			items: [flxSubGrpItem]
		},

		{ 
			xtype   : 'fieldset',
			title   : '',
			labelWidth  : 70,
			width       : 120,
			border  : false,
			x       : 1000,
			y       : 435,
			items: [btnSubGroupItems]
		},

	{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 30,
	y           : 440,
	border      : false,
	items: [txttab3openingval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 230,
	y           : 440,
	border      : false,
	items: [txttab3Recptval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 400,
	x           : 430,
	y           : 440,
	border      : false,
	items: [txttab3Issueval]
	},
{ 
	xtype       : 'fieldset',
	title       : '',
	labelWidth  : 60,
	width       : 300,
	x           : 630,
	y           : 440,
	border      : false,
	items: [txttab3Closingval]
	},
	

        ]
    } ,
/*
    {
        xtype: 'panel',
        title: 'ITEM WISE STOCK*',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 45,
                             items: [flxItems]
                        },






		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 490,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemwisePrint]
		},


       ]
    }, 
*/    
    {
		xtype: 'panel',
		title: 'ITEM LEDGER',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [
			{
			    xtype       : 'fieldset',
			    title       : '',
			    width       : 700,
			    labelWidth  : 1,
			    x           : 30,
			    y           : 0,
			    defaultType : 'Label',
			    border      : false,
			    items: [lblDetail3]
			},
/*
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 500,
			y           : 0,
			border      : false,
			items: [txtOpeningStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 800,
			y           : 0,
			border      : false,
			items: [txtOpeningValue]
			},
*/
			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 30,
			     items: [flxLedger]	
			},

			{ 
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 420,
			    border      : false,
			    width       :500,
                             items: [lblOpening]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 370,
			    y           : 420,
			    border      : false,
			    width       :500,
                             items: [lblReceipt]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 420,
			    border      : false,
			    width       :500,
                             items: [lblIssue]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 420,
			    border      : false,
			    width       :500,
                             items: [lblClosing]
                        },



       

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 20,
                       y           : 440,
                       border      : false,
                       items: [txttotOpeningQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 140,
                       y           : 440,
                       border      : false,
                       items: [txttotOpeningValue]
                      },



                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 210,
                       y           : 440,
                       border      : false,
                       items: [txttotRecptQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 470,
                       y           : 440,
                       border      : false,
                       items: [txttotRecptValue]
                      },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 550,
                       y           : 440,
                       border      : false,
                       items: [txttotIssueQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 790,
                       y           : 440,
                       border      : false,
                       items: [txttotIssueValue]
                      },
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 440,
                       border      : false,
                       items: [txttotClosingQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 1010,
                       y           : 440,
                       border      : false,
                       items: [txttotClosingValue]
                      },
/*
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 500,
			y           : 495,
			border      : false,
			items: [txtClosingStock]
			},
			{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 140,
			width       : 400,
			x           : 800,
			y           : 495,
			border      : false,
			items: [txtClosingValue]
			},

*/

		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     labelWidth  : 70,
                     width       : 120,
                     border  : false,
	             x       : 1150,
		     y       : 0,
                     items: [btnLedger]
                },


		],
    }, 

    {
		xtype: 'panel',
		title: 'WASTE PAPER STOCK SUMMARY',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [

		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 1320,
			x           : 10,
			y           : 20,

			border      : false,
			items: [flxItemsRM]
		},


			{ 
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblOpeningRM]
                        },

			{ 
			    xtype       : 'fieldset',
			    x           : 370,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblReceiptRM]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblIssueRM]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblClosingRM]
                        },



       

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 20,
                       y           : 430,
                       border      : false,
                       items: [txttotOpeningQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 140,
                       y           : 430,
                       border      : false,
                       items: [txttotOpeningValueRM]
                      },



                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 210,
                       y           : 430,
                       border      : false,
                       items: [txttotRecptQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 470,
                       y           : 430,
                       border      : false,
                       items: [txttotRecptValueRM]
                      },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 550,
                       y           : 430,
                       border      : false,
                       items: [txttotIssueQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 790,
                       y           : 430,
                       border      : false,
                       items: [txttotIssueValueRM]
                      },
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 430,
                       border      : false,
                       items: [txttotClosingQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 1010,
                       y           : 430,
                       border      : false,
                       items: [txttotClosingValueRM]
                      },



		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 450,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemwisePrintRM]
		},


                ]
    },

    {
		xtype: 'panel',
		title: 'WASTE PAPER LEDGER',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [

			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 30,
			     items: [flxLedgerRM]	
			},


			{ 
			    xtype       : 'fieldset',
			    x           : 1110,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblQtyRM]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 1220,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblValueRM]
                        },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningValueRM]
                      },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptValueRM]
                     },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueValueRM]
                     },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingQtyRM]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingValueRM]
                     },



		{
		    xtype       : 'fieldset',
		    x           : 1020,
		    y           : 300,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemLedgerRM]
		},



                ]
    },

    {
		xtype: 'panel',
		title: 'FUEL STOCK SUMMARY',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [
		{
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 100,
			width       : 1320,
			x           : 10,
			y           : 20,

			border      : false,
			items: [flxItemsFU]
		},



			{ 
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblOpeningFU]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 370,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblReceiptFU]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblIssueFU]
                        },



			{ 
			    xtype       : 'fieldset',
			    x           : 1050,
			    y           : 410,
			    border      : false,
			    width       :500,
                             items: [lblClosingFU]
                        },



       

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 20,
                       y           : 430,
                       border      : false,
                       items: [txttotOpeningQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 140,
                       y           : 430,
                       border      : false,
                       items: [txttotOpeningValueFU]
                      },



                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 210,
                       y           : 430,
                       border      : false,
                       items: [txttotRecptQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 470,
                       y           : 430,
                       border      : false,
                       items: [txttotRecptValueFU]
                      },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 120,
                       width       : 400,
                       x           : 550,
                       y           : 430,
                       border      : false,
                       items: [txttotIssueQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 790,
                       y           : 430,
                       border      : false,
                       items: [txttotIssueValueFU]
                      },
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 430,
                       border      : false,
                       items: [txttotClosingQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 1010,
                       y           : 430,
                       border      : false,
                       items: [txttotClosingValueFU]
                      },



		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 450,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemwisePrintFU]
		},




                ]
    },

    {
		xtype: 'panel',
		title: 'FUEL LEDGER',
		bodyStyle: {"background-color": "#ffe6f7"},
		layout: 'absolute',
		items: [

			{ 
			     xtype   : 'fieldset',
			     title   : '',
			     border  : false,
			     x       : 20,
			     y       : 30,
			     items: [flxLedgerFU]	
			},

			{ 
			    xtype       : 'fieldset',
			    x           : 1110,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblQtyFU]
                        },


			{ 
			    xtype       : 'fieldset',
			    x           : 1220,
			    y           : 80,
			    border      : false,
			    width       :500,
                             items: [lblValueFU]
                        },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 100,
                       border      : false,
                       items: [txtItemOpeningValueFU]
                      },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 140,
                       border      : false,
                       items: [txtItemRecptValueFU]
                     },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 180,
                       border      : false,
                       items: [txtItemIssueValueFU]
                     },

                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 70,
                       width       : 400,
                       x           : 1020,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingQtyFU]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 1,
                       width       : 400,
                       x           : 1190,
                       y           : 220,
                       border      : false,
                       items: [txtItemClosingValueFU]
                     },



		{
		    xtype       : 'fieldset',
		    x           : 1020,
		    y           : 300,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemLedgerFU]
		},
                ]
    },
   

    
    ]       
});



   var TrnFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 100,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        items: [
                        { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 280,
			     y       : 10,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 480,
			     y       : 10,
                       	     width   : 250,
                             items: [monthenddate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 700,
			     y       : 10,
                       	     width   : 250,
                             items: [btnProcess]
                        },


                { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                	     width   : 350,
                             items: [cmbMonth]
                        
	}, 
               { 
			xtype   : 'fieldset',

			border  : true,
			height  : 50,
			width   : 300,
			layout  : 'absolute',
			x       : 900,
			y       : 10,
			items:[optprinttype],
		},


                { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 0,
			     y       : 50,
                	     width   : 1350,
                             items: [RepStockSummaryPannel]
                        
          	}, 

        ]
      
   });
function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(parseInt(m1));
        find_dates(m1);



    }  


    var STKSummaryWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	//x	    : 250,
        y           : 35,
        title       : 'Stores Stock List',
        items       : TrnFormPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){
                  lblOpening.setText("Opening Qty & Value" );
                  lblReceipt.setText("Receipt Qty & Value" );
                  lblIssue.setText("Issue Qty & Value" );
                  lblClosing.setText("Closing Qty & Value" );

                  lblOpeningRM.setText("Opening Qty & Value" );
                  lblReceiptRM.setText("Receipt Qty & Value" );
                  lblIssueRM.setText("Issue Qty & Value" );
                  lblClosingRM.setText("Closing Qty & Value" );

                  lblOpeningFU.setText("Opening Qty & Value" );
                  lblReceiptFU.setText("Receipt Qty & Value" );
                  lblIssueFU.setText("Issue Qty & Value" );
                  lblClosingFU.setText("Closing Qty & Value" );


                  lblQty.setText("Qty" );
                  lblValue.setText("Value" );
             
             Refreshdata();
             
               }    
			
	}
    });
    STKSummaryWindow.show();  
});
