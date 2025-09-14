Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

   var partyname = "";
   var gsttype = 'b2b';

   var printtype='PDF';
   var hsnhead  = '';  
   var dgrecord1 = Ext.data.Record.create([]);
   var dgrecord2 = Ext.data.Record.create([]);




   var btnJSON = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GENERATE GSTR1-JSON",
        width   : 150,
        id      :'btnJSON',
        x       : 10,
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

		      Ext.Ajax.request({
		      url: 'ClsJSON.php',
		      params :
		      {
                          compcode  : Gincompcode,
	        	  fincode   : GinFinid,
		 	  fromdate  : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		 	  todate    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),


		      },
		      callback: function(options, success, response)
		      {
			 var redirectWindow = window.open('http://10.0.0.251/SHVPM/Report/gstr1.json', '_blank');
			 redirectWindow.location;
		      }
                      }); 



	    }
	}
	});




   var btnJSONB2CS = new Ext.Button({
        style   : 'text-align:center;',
        text    : "B2CS-JSON",
        width   : 150,
        id      :'btnJSONB2CS',
        x       : 100,
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){



var month = Ext.util.Format.date(monthstartdate.getValue(), 'M').toUpperCase();  
var year  = Ext.util.Format.date(monthstartdate.getValue(), 'Y');  

var filename = "/SHVPM/Report/B2CS_"+month+"_"+year+".json";



		      Ext.Ajax.request({
		      url: 'ClsJSONB2CS.php',
		      params :
		      {
                          compcode  : Gincompcode,
	        	  fincode   : GinFinid,
		 	  fromdate  : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		 	  todate    : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"),
                          fname     : filename,

		      },
		      callback: function(options, success, response)
		      {
                         var findUrl = 'http://10.0.0.251/' + filename;
			 var redirectWindow = window.open(findUrl, '_blank');
			 redirectWindow.location;

                      }

                      }); 



	    }
	}
	});

   var btnPrintGSTR1Abs = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-Abs",
        width   : 100,
        id      :'btnPrintGSTR1Abs',
        x       : 1200,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var param = (comp+fin+fd+td) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign&__format=XLSX' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1Abstract.rptdesign' + param, '_blank');



	    }
	}
	});




   var btnPrintGSTR1_Type_Abs = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-Sub-Abstract",
        width   : 100,
        id      :'btnPrintGSTR1_Type_Abs',
        x       : 800,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var gst = "&gsttype="+encodeURIComponent(gsttype);

                 var param = (comp+fin+fd+td+gst) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Abstract.rptdesign' + param, '_blank');



	    }
	}
	});


   var btnPrintGSTR1_Customer_Details = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-CustomerWise- Detail",
        width   : 100,
        id      :'btnPrintGSTR1_Customer_Details',
        x       : 950,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

            if (partyname != "" && gsttype != "")
            {  
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var party = "&party="+encodeURIComponent(partyname);
                 var gst = "&gsttype="+encodeURIComponent(gsttype);
                 var param = (comp+fin+fd+td+party+gst) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail.rptdesign' + param, '_blank');

              } 

	    }
	}
	});



   var btnPrintGSTR1_AllDocument_Details = new Ext.Button({
        style   : 'text-align:center;',
        text    : "GSTR1-All Document- Detail",
        width   : 100,
        id      :'btnPrintGSTR1_AllDocument_Details',
        x       : 950,
        y       : 20,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

            if (gsttype != "")
            {  
                 var fd = "&fromdate="+encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));
                 var td = "&todate="+encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
                 var comp = "&compcode="+encodeURIComponent(Gincompcode);
                 var fin = "&fincode="+encodeURIComponent(GinFinid);
                 var gst = "&gsttype="+encodeURIComponent(gsttype);
                 var param = (comp+fin+fd+td+gst) ;
if (printtype == "PDF") 
                    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail_AllDocuments.rptdesign&__format=pdf&'+param,  '_blank' );
		    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail_AllDocuments.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRepGSTR1_Type_Detail_AllDocuments.rptdesign' + param, '_blank');

              } 

	    }
	}
	});


  function grid_tot_trans(){
	pvr_dbamt="";
        pvr_cramt="";
        var Row= flxld.getStore().getCount();
        flxld.getSelectionModel().selectAll();
        var sel=flxld.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            pvr_dbamt=Number(pvr_dbamt)+Number(sel[i].data.debit);
            pvr_cramt=Number(pvr_cramt)+Number(sel[i].data.credit);
        }
        txtLtotdebit.setRawValue(Ext.util.Format.number(pvr_dbamt,"0.00"));
        txtLtotcredit.setRawValue(Ext.util.Format.number(pvr_cramt,"0.00"));
}


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
        },['accref_voudate','acctran_dbamt','acctran_cramt','cust_name','accref_payref_no','accref_payref_date' ,'accref_narration'])
    });
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


    var txtDocListCount = new Ext.form.NumberField({
        fieldLabel  : 'Records ',
        id          : 'txtDocListCount',
        name        : 'txtDocListCount',
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


    var txtDocListTaxable = new Ext.form.NumberField({
        fieldLabel  : 'Taxable ',
        id          : 'txtDocListTaxable',
        name        : 'txtDocListTaxable',
        width       : 110,
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



    var txtDocListCGST = new Ext.form.NumberField({
        fieldLabel  : 'CGST ',
        id          : 'txtDocListCGST',
        name        : 'txtDocListCGST',
        width       : 110,
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


    var txtDocListSGST = new Ext.form.NumberField({
        fieldLabel  : 'SGST ',
        id          : 'txtDocListSGST',
        name        : 'txtDocListSGST',
        width       : 110,
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


    var txtDocListTaxable = new Ext.form.NumberField({
        fieldLabel  : 'Taxable ',
        id          : 'txtDocListTaxable',
        name        : 'txtDocListTaxable',
        width       : 110,
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


    var txtDocListIGST = new Ext.form.NumberField({
        fieldLabel  : 'IGST ',
        id          : 'txtDocListIGST',
        name        : 'txtDocListIGST',
        width       : 110,
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



    var txtDocListGross = new Ext.form.NumberField({
        fieldLabel  : 'Gross Total ',
        id          : 'txtDocListGross',
        name        : 'txtDocListGross',
        width       : 110,
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

    var flxld = new Ext.grid.EditorGridPanel({
        frame: false,
        store: Ledger2DataStore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
	id:'my-grid3',
        scrollable: true,
        menuDisabled: true,
	stripeRows: true,
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
	columnLines: true,
        height: 220,
        width: 1000,
        border:false,
        x: 370,
        y: 40,
        columns: [
            {header: "Ledger Name", dataIndex: 'ledger',width:350,align:'left', sortable: false,defaultSortable: false,menuDisabled: true,
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
            {header: "Debit", dataIndex: 'debit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'
	    },
            {header: "Credit", dataIndex: 'credit',width:140,align:'left',sortable: false,defaultSortable: false,menuDisabled: true,align: 'right'}
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

    var txtnarration2 = new Ext.form.TextArea({
        fieldLabel  : 'Narration',
        id          : 'txtnarration2',
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
        name        : 'txtnarration2',
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        width       : 750
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
        y       : 200,
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function(){

                   var vno = cmbvoc.getRawValue().substring(0,3);                

                   var invno = txtvouref.getValue();
	           var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		   var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		   var p3 = "&invno=" + encodeURIComponent(invno);
                   i1 = "ORIGINAL FOR BUYER";
         	   var p4 = "&displayword=" + encodeURIComponent(i1);
 	 	   var param = (p1 + p2 + p3 + p4  );   
                   if (vno  == "GSI") 
		   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                   else
 		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RptOtherSalesInvoice.rptdesign&__format=pdf' + param); 




	    }
	}
	});

 var loadDayBookDatastore = new Ext.data.Store({
      id: 'loadDayBookDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDayBookDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      }, [ 'sno' ,'accref_voudate', 'cust_name', 'voutype', 'accref_payref_no', 'accref_vouno', 'acctran_dbamt', 'acctran_cramt', 'acctran_led_code', 'accref_seqno'

      ]),
    });



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
        store:loadDayBookDatastore,
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





   var loadGSTR1ListDataStore = new Ext.data.Store({
      id: 'loadGSTR1ListDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1Abstract"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'printorder','gtype' ,'vouchertype', 'voucount', 'salesvalue', 'igstamount', 'cgstamount', 'sgstamount', 'cessamt', 'taxamount', 'GrossTotal'
      ]),
    });


   var loadGSTR1DetailDataStore = new Ext.data.Store({
      id: 'loadGSTR1DetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1Detail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'gsttype','cust_name','gstin', 'voucount', 'salesvalue', 'igstamount', 'cgstamount', 'sgstamount', 'cessamt', 'taxamount', 'GrossTotal'
      ]),
    });


   var loadGSTR1PartyDetailDataStore = new Ext.data.Store({
      id: 'loadGSTR1PartyDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1PartyDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invh_vouno', 'saldate', 'invdate', 'voucherno', 'salesvalue', 'igstamount', 'cgstamount', 'sgstamount', 'invamount'
      ]),
    });



   var loadGSTR1DocumentDetailDataStore = new Ext.data.Store({
      id: 'loadGSTR1DocumentDetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url:'ClsViewStatements.php',    // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadGSTR1DocumentWise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'invh_vouno', 'saldate', 'invdate', 'voucherno', 'salesvalue', 'igstamount', 'cgstamount', 'sgstamount', 'invamount'
      ]),
    });




   var txtTotVouchers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotVouchers',
        name        : 'txtTotValue',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 0,
    });




   var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable',
        name        : 'txtTotTaxable',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST',
        name        : 'txtTotIGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST',
        name        : 'txtTotCGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST',
        name        : 'txtTotSGST',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCess = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCess',
        name        : 'txtTotCess',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotTaxAmount = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxAmount',
        name        : 'txtTotTaxAmount',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotValue1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue1',
        name        : 'txtTotValue1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable1',
        name        : 'txtTotTaxable1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST1',
        name        : 'txtTotIGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST1',
        name        : 'txtTotCGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST1',
        name        : 'txtTotSGST1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCess1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCess1',
        name        : 'txtTotCess1',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotTax1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTax1',
        name        : 'txtTotTax1',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotVocuhers = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotVocuhers',
        name        : 'txtTotVocuhers',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


var lblTaxValue = new Ext.form.Label({
    fieldLabel  : 'TOT TAX VAL',
    id          : 'lblTaxValue',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblIGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL IGST',
    id          : 'lblIGST',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblCGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL CGST',
    id          : 'lblCGST',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblSGST = new Ext.form.Label({
    fieldLabel  : 'TOTAL SGST',
    id          : 'lblSGST',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblCESS = new Ext.form.Label({
    fieldLabel  : 'TOTAL CESS',
    id          : 'lblCESS',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblTotalValue = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALIE',
    id          : 'lblTotalValue',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

   var txtTotValue2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotValue2',
        name        : 'txtTotValue2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",

        decimalPrecision: 2,
    });

   var txtTotTaxable2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTaxable2',
        name        : 'txtTotTaxable2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });

   var txtTotIGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotIGST2',
        name        : 'txtTotIGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCGST2',
        name        : 'txtTotCGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });



   var txtTotSGST2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSGST2',
        name        : 'txtTotSGST2',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


   var txtTotCess2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCess2',
        name        : 'txtTotCess2',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold;text-align: right",
        decimalPrecision: 2,
    });


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
  //  title: 'Report Format type',
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
        value: new Date()   
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



// mdays = Ext.util.Format.date(new Date(),"d");


//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
          
	flxld.getStore().removeAll();
	flxGSTR1_Detail.getStore().removeAll();
	flxGSTR1_Customer.getStore().removeAll();

	loadGSTR1ListDataStore.removeAll();
	loadGSTR1ListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadGSTR1Abstract',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

    
		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Main()
		}
	    });



     
}




     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        width : 150,
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
                  lblDetail1.setText('');
                  lblDetail2.setText('');
                  loadPartyListDataStore.removeAll();
                  loadGSTR1DetailDataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });
    




 var loadPartyListDataStore = new Ext.data.Store({
      id: 'loadPartyListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDespatchedPartywise"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['quality', 'vargrp_type_short_code', 'vargrp_type_code', 'cust_name', 'cust_code', 'invwt', 'invvalue' ]),
    });


var lblGSTTypeHeader = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTTypeHeader',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});

var lblGSTTypeHeader2 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTTypeHeader2',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});

var lblGSTPatyName = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblGSTPatyName',
    width       : 700,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
            'color':'#001a66',
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
});
var lblDetail1 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblDetail1 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


var lblDetail2 = new Ext.form.Label({
    fieldLabel  : 'TOTAL TAXABLE',
    id          : 'lblDetail2',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail3 = new Ext.form.Label({
    fieldLabel  : 'IGST AMOUNT',
    id          : 'lblDetail3',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail4 = new Ext.form.Label({
    fieldLabel  : 'CGST AMOUNT',
    id          : 'lblDetail4',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail5 = new Ext.form.Label({
    fieldLabel  : 'SGST AMOUNT',
    id          : 'lblDetail5',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail6 = new Ext.form.Label({
    fieldLabel  : 'CESS AMT',
    id          : 'lblDetail6',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail7 = new Ext.form.Label({
    fieldLabel  : 'TOT TAX AMOUNT',
    id          : 'lblDetail7',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail8 = new Ext.form.Label({
    fieldLabel  : 'TOT VOUCHERS',
    id          : 'lblDetail8',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail11 = new Ext.form.Label({
    fieldLabel  : 'TOTAL VALUE',
    id          : 'lblDetail11',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblDetail21 = new Ext.form.Label({
    fieldLabel  : 'TOTAL TAXABLE',
    id          : 'lblDetail21',
    width       : 250,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});


var lblDetail31 = new Ext.form.Label({
    fieldLabel  : 'IGST AMOUNT',
    id          : 'lblDetail31',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail41 = new Ext.form.Label({
    fieldLabel  : 'CGST AMOUNT',
    id          : 'lblDetail41',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail51 = new Ext.form.Label({
    fieldLabel  : 'SGST AMOUNT',
    id          : 'lblDetail51',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});

var lblDetail61 = new Ext.form.Label({
    fieldLabel  : 'CESS AMT',
    id          : 'lblDetail61',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail71 = new Ext.form.Label({
    fieldLabel  : 'TOT Vouchers',
    id          : 'lblDetail71',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
});
var lblDetail81 = new Ext.form.Label({
    fieldLabel  : 'TOT TAX AMT',
    id          : 'lblDetail81',
    width       : 300,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",      
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
	loadGSTR1ListDataStore.removeAll();
	loadGSTR1ListDataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadGSTR1Abstract',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot_Main();
		}
	    });
     
       	 }
        }   
});




function grid_tot_customer(){
        var nos = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var tottax = 0;
        var totinvamt = 0;
        var Row= flxGSTR1_Customer.getStore().getCount();
        flxGSTR1_Customer.getSelectionModel().selectAll();
        var sel=flxGSTR1_Customer.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
	      taxable=Number(taxable)+Number(sel[i].data.salesvalue);
	      igst=Number(igst)+Number(sel[i].data.igstamount);
	      cgst=Number(cgst)+Number(sel[i].data.cgstamount);
	      sgst=Number(sgst)+Number(sel[i].data.sgstamount);
	      cess=Number(cess)+Number(sel[i].data.cessamt);
	      tottax=Number(tottax)+Number(sel[i].data.taxamount);
	      totinvamt=Number(totinvamt)+Number(sel[i].data.invamount);
        }


        txtTotTaxable2.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST2.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST2.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST2.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotCess2.setRawValue(Ext.util.Format.number(cess,"0.00"));
        txtTotValue2.setRawValue(Ext.util.Format.number(totinvamt,"0.00"));


}


function grid_tot_gsttype(){
        var nos = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var tottax = 0;
        var totinvamt = 0;
        var Row= flxGSTR1_Detail.getStore().getCount();
        flxGSTR1_Detail.getSelectionModel().selectAll();
        var sel=flxGSTR1_Detail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
	      nos=Number(nos)+Number(sel[i].data.voucount);
	      taxable=Number(taxable)+Number(sel[i].data.salesvalue);
	      igst=Number(igst)+Number(sel[i].data.igstamount);
	      cgst=Number(cgst)+Number(sel[i].data.cgstamount);
	      sgst=Number(sgst)+Number(sel[i].data.sgstamount);
	      cess=Number(cess)+Number(sel[i].data.cessamt);
	      tottax=Number(tottax)+Number(sel[i].data.taxamount);
	      totinvamt=Number(totinvamt)+Number(sel[i].data.GrossTotal);
        }


        txtTotVocuhers.setRawValue(Ext.util.Format.number(nos,"0"));
        txtTotTaxable1.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST1.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST1.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST1.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotCess1.setRawValue(Ext.util.Format.number(cess,"0.00"));
        txtTotTax1.setRawValue(Ext.util.Format.number(tottax,"0.00"));
        txtTotValue1.setRawValue(Ext.util.Format.number(totinvamt,"0.00"));

}



function grid_tot_Document(){
    var nos = 0,
        taxable = 0,
        igst = 0,
        cgst = 0,
        sgst = 0,
        cess = 0,
        tottax = 0,
        totinvamt = 0;

        var selrows = flxGSTR1_DocumentList.getStore().getCount();

        for (var i = 0; i < selrows; i++) {

            var rec = flxGSTR1_DocumentList.getStore().getAt(i);


        taxable   += Number(rec.get('salesvalue'));
        cgst      += Number(rec.get('cgstamount'));
        sgst      += Number(rec.get('sgstamount'));
        igst      += Number(rec.get('igstamount'));
        totinvamt += Number(rec.get('invamount'));



//        cgst      += Number(row.cgstamount || 0);
//        sgst      += Number(row.sgstamount || 0);
//        cess      += Number(row.cessamt || 0);
//        tottax    += Number(row.taxamount || 0);
//        totinvamt += Number(row.GrossTotal || 0);




        }

    txtDocListCount.setRawValue(Ext.util.Format.number(selrows, "0"));
    txtDocListTaxable.setRawValue(Ext.util.Format.number(taxable, "0.00"));
    txtDocListIGST.setRawValue(Ext.util.Format.number(igst, "0.00"));
    txtDocListCGST.setRawValue(Ext.util.Format.number(cgst, "0.00"));
    txtDocListSGST.setRawValue(Ext.util.Format.number(sgst, "0.00"));
    txtDocListGross.setRawValue(Ext.util.Format.number(totinvamt, "0.00"));

}


/*
function grid_tot_Document() {
    var nos = 0,
        taxable = 0,
        igst = 0,
        cgst = 0,
        sgst = 0,
        cess = 0,
        tottax = 0,
        totinvamt = 0;

    var store = flxGSTR1_DocumentList.getStore();
    var rowCount = store.getCount();

    // Select all rows before processing
    flxGSTR1_DocumentList.getSelectionModel().selectAll();
    var selected = flxGSTR1_DocumentList.getSelectionModel().getSelections();

    for (var i = 0; i < rowCount; i++) {
        var row = selected[i].data;

   //     nos       += Number(row.voucount || 0);
        taxable   += Number(row.salesvalue || 0);
        igst      += Number(row.igstamount || 0);
        cgst      += Number(row.cgstamount || 0);
        sgst      += Number(row.sgstamount || 0);
        cess      += Number(row.cessamt || 0);
        tottax    += Number(row.taxamount || 0);
        totinvamt += Number(row.GrossTotal || 0);
    }

    txtDocListCount.setRawValue(Ext.util.Format.number(nos, "0"));
    txtDocListTaxable.setRawValue(Ext.util.Format.number(taxable, "0.00"));
    txtDocListIGST.setRawValue(Ext.util.Format.number(igst, "0.00"));
    txtDocListCGST.setRawValue(Ext.util.Format.number(cgst, "0.00"));
    txtDocListSGST.setRawValue(Ext.util.Format.number(sgst, "0.00"));

    // Optional: Uncomment if fields are needed
    // txtTotCess1.setRawValue(Ext.util.Format.number(cess, "0.00"));
    // txtTotTax1.setRawValue(Ext.util.Format.number(tottax, "0.00"));

    txtDocListGross.setRawValue(Ext.util.Format.number(totinvamt, "0.00"));
}
*/


function grid_tot_Main(){
        var vounos  = 0;
        var taxable = 0;
        var igst = 0;
        var cgst = 0;
        var sgst = 0;
        var cess = 0;
        var invvalue = 0;
        var tottax = 0;

        var Row= flxGSTR1.getStore().getCount();
        flxGSTR1.getSelectionModel().selectAll();
        var sel=flxGSTR1.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
	      vounos =Number(vounos)+Number(sel[i].data.voucount	);

	      taxable=Number(taxable)+Number(sel[i].data.salesvalue);
	      igst=Number(igst)+Number(sel[i].data.igstamount);
	      cgst=Number(cgst)+Number(sel[i].data.cgstamount);
	      sgst=Number(sgst)+Number(sel[i].data.sgstamount);
	      cess=Number(cess)+Number(sel[i].data.cessamt);
	      tottax=Number(tottax)+Number(sel[i].data.taxamount);
	      invvalue=Number(invvalue)+Number(sel[i].data.GrossTotal);

        }
        txtTotVouchers.setRawValue(Ext.util.Format.number(vounos,"0"));
        txtTotTaxable.setRawValue(Ext.util.Format.number(taxable,"0.00"));
        txtTotIGST.setRawValue(Ext.util.Format.number(igst,"0.00"));
        txtTotCGST.setRawValue(Ext.util.Format.number(cgst,"0.00"));
        txtTotSGST.setRawValue(Ext.util.Format.number(sgst,"0.00"));
        txtTotCess.setRawValue(Ext.util.Format.number(cess,"0.00"));
        txtTotTaxAmount.setRawValue(Ext.util.Format.number(tottax,"0.00"));
        txtTotValue.setRawValue(Ext.util.Format.number(invvalue,"0.00"));

}


var dgrecord = Ext.data.Record.create([]);

var fm1 = Ext.form;



var flxGSTR1 = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 350,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 



        {header: "printorder", dataIndex: 'printorder',sortable:true,width:40,align:'left',hidden:true},
        {header: "type", dataIndex: 'gtype',sortable:true,width:50,align:'left',hidden:true},
        {header: "Particulars", dataIndex: 'vouchertype',sortable:true,width:250,align:'left',hidden:false},
        {header: "Vou.Count", dataIndex: 'voucount',sortable:true,width:90,align:'center'},	
        {header: "Taxable Amount"  ,  dataIndex: 'salesvalue',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "IGST Amount", dataIndex: 'igstamount',sortable:true,width:130,align:'right'},	
        {header: "CGST Amount", dataIndex: 'cgstamount',sortable:true,width:130,align:'right'},	

        {header: "SGST Amount" , dataIndex: 'sgstamount',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "CESS Amt" , dataIndex: 'cessamt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "TAX  Amount" , dataIndex: 'taxamount',sortable:false,width:130,align:'right', menuDisabled: true},
        {header: "Invoice Amount" , dataIndex: 'GrossTotal',sortable:false,width:130,align:'right', menuDisabled: true},
    ],

    store:loadGSTR1ListDataStore,
    listeners:{	

            'cellDblclick': function (flxGSTR1, rowIndex, cellIndex, e) {
		var sm = flxGSTR1.getSelectionModel();
		var selrow = sm.getSelected();

            tabOverall.setActiveTab(1);

            lblGSTTypeHeader.setText("GSTR -1 Voucher List for : " + selrow.get('vouchertype')  );
            lblGSTTypeHeader2.setText("GSTR -1 Voucher List for : " + selrow.get('vouchertype')  );
                gsttype =  selrow.get('gtype');
		flxld.getStore().removeAll();
		flxGSTR1_Detail.getStore().removeAll();
		flxGSTR1_Customer.getStore().removeAll();
		flxGSTR1_DocumentList.getStore().removeAll();


	    loadGSTR1DetailDataStore.removeAll();
	    loadGSTR1DetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1Detail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                gsttype  : gsttype,
		},
		scope:this,
		callback:function()
		{
                  grid_tot_gsttype();
   
		}
	    });

	    loadGSTR1DocumentDetailDataStore.removeAll();
	    loadGSTR1DocumentDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1DocumentWise',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                gsttype  : gsttype,
		},
		scope:this,
		callback:function()
		{
                 grid_tot_Document();
   
		}
	    });
     
    }
 }
});

  function VoucherClick(){

//alert("HELLO");
//alert(cmbvoc.getRawValue());

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
               txtnarration2.setRawValue('');
               txtnarration.setRawValue('');
                VouNoClickLoadDataStore.load({
                    url: '/SHVPM/Accounts/clsRepFinancials.php',
                    params:{
                        task:'VouNoClickLoad',
                        fcompcode:Gincompcode,
                        ffinid:GinFinid,
                        vouno:cmbvoc.getValue()
                    },
                    callback:function(){
                        var cnt=VouNoClickLoadDataStore.getCount();
                        if(cnt>0){
//alert(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));

                                txtvouref.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_payref_no'));
                                txtVouDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtRefDate.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_voudate'));
                                txtVouDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");
                                txtRefDate.setRawValue(Ext.util.Format.date(VouNoClickLoadDataStore.getAt(0).get('accref_voudate')),"d-m-Y");                         
                                txtnarration2.setRawValue(VouNoClickLoadDataStore.getAt(0).get('accref_narration'));
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
                                    credit:acctcramt
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
//                                        txtnarration2.setRawValue(VouNoClickDetailsDataStore.getAt(0).get('accref_narration'));
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
                        }
                    }
                });
  }



var flxGSTR1_Detail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 410,
    hidden:false,
    width: 1300,
  //  id: 'my-grid',  

    columns:
    [ 	 
        {header: "GST type", dataIndex: 'gsttype',sortable:true,width:30,align:'left',hidden:true},
        {header: "Particulars", dataIndex: 'cust_name',sortable:true,width:200,align:'left',hidden:false},
        {header: "GST IN", dataIndex: 'gstin',sortable:true,width:115,align:'left'},
        {header: "Vou Count", dataIndex: 'voucount',sortable:true,width:80,align:'center'},	
        {header: "TAXABLE AMOUNT"    ,  dataIndex: 'salesvalue',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "IGST AMOUNT", dataIndex: 'igstamount',sortable:true,width:120,align:'right'},	
        {header: "CGST AMOUNT", dataIndex: 'cgstamount',sortable:true,width:120,align:'right'},	
        {header: "SGST AMOUNT", dataIndex: 'sgstamount',sortable:true,width:120,align:'right'},	
        {header: "CESS AMT" , dataIndex: 'cessamt',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "TAX AMOUNT" , dataIndex: 'taxamount',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "GROSS TOTAL" , dataIndex: 'GrossTotal',sortable:false,width:130,align:'right', menuDisabled: true},

    ],

    store:loadGSTR1DetailDataStore,
    listeners:{	


            'rowDblClick': function (flxGSTR1, rowIndex, cellIndex, e) {
		var sm = flxGSTR1.getSelectionModel();
		var selrow = sm.getSelected();

//          	find_dates(selrow.get('cust_code'));


   	flxld.getStore().removeAll();
	flxGSTR1_Customer.getStore().removeAll();


            tabOverall.setActiveTab(2);

            lblGSTPatyName.setText("Document List for : " + selrow.get('cust_name')  );
            partyname =  selrow.get('cust_name'); 
	    loadGSTR1PartyDetailDataStore.removeAll();
	    loadGSTR1PartyDetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadGSTR1PartyDetail',
                compcode:Gincompcode,
                finid   :GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                party  : selrow.get('cust_name') ,
                gsttype  : gsttype,
		},
		scope:this,
		callback:function()
		{
                   grid_tot_customer();
                   qlylist = "";
		}
	    });

     
    }


}
});




var flxGSTR1_Customer = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 410,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 


        {header: "invh_vouno", dataIndex: 'invh_vouno',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'saldate',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'invdate',sortable:true,width:105,align:'center',hidden:false},

        {header: "Voucher No", dataIndex: 'voucherno',sortable:true,width:130,align:'center'},
        {header: "TAXABLE AMOUNT"    ,  dataIndex: 'salesvalue',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "IGST AMOUNT", dataIndex: 'igstamount',sortable:true,width:140,align:'right'},	
        {header: "CGST AMOUNT", dataIndex: 'cgstamount',sortable:true,width:140,align:'right'},	
        {header: "SGST AMOUNT", dataIndex: 'sgstamount',sortable:true,width:140,align:'right'},	
        {header: "CESS AMT" , dataIndex: 'cessamt',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "GROSS TOTAL" , dataIndex: 'invamount',sortable:false,width:140,align:'right', menuDisabled: true},
        {header: "SeqNo" , dataIndex: 'seqno',sortable:false,width:140,align:'right', menuDisabled: true},

    ],

    store:loadGSTR1PartyDetailDataStore,
    listeners:{	


            'rowDblClick' : function(flxGSTR1_Customer,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);

                var selerow =flxGSTR1_Customer.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('voucherno');
                }

	       flxld.getStore().removeAll();

//alert(b);
                tabOverall.setActiveTab(3);
                cmbvoc.setValue(b);

//alert(cmbvoc.getValue());
                VoucherClick();
	        flxld.getSelectionModel().selectAll();



            },
/*
            'cellclick': function (flxGSTR1_Detail, rowIndex, cellIndex, e) {
                tabOverall.setActiveTab(2);
                 var selected_rows =flxGSTR1_Detail.getSelectionModel().getSelections();
alert("2-1");
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.invh_vouno;
		         }
       alert("2-2");
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:Gincompcode,
                                    ffinid:GinFinid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
       //  tabOverall.setActiveTab(1);
                                     }
                                }
                            });

	   },
*/
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =flxGSTR1_Detail.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('voucherno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

 }
});



var flxGSTR1_DocumentList = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:60,
    height: 410,
    hidden:false,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 


        {header: "invh_vouno", dataIndex: 'invh_vouno',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'saldate',sortable:true,width:100,align:'left',hidden:true},
        {header: "Date", dataIndex: 'invdate',sortable:true,width:105,align:'center',hidden:false},

        {header: "Voucher No", dataIndex: 'voucherno',sortable:true,width:130,align:'center'},
        {header: "TAXABLE AMOUNT"    ,  dataIndex: 'salesvalue',sortable:false,width:150,align:'right', menuDisabled: true},
        {header: "IGST AMOUNT", dataIndex: 'igstamount',sortable:true,width:140,align:'right'},	
        {header: "CGST AMOUNT", dataIndex: 'cgstamount',sortable:true,width:140,align:'right'},	
        {header: "SGST AMOUNT", dataIndex: 'sgstamount',sortable:true,width:140,align:'right'},	
        {header: "CESS AMT" , dataIndex: 'cessamt',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "GROSS TOTAL" , dataIndex: 'invamount',sortable:false,width:140,align:'right', menuDisabled: true},
        {header: "SeqNo" , dataIndex: 'seqno',sortable:false,width:140,align:'right', menuDisabled: true},

    ],

    store:loadGSTR1DocumentDetailDataStore,
    listeners:{	


            'rowDblClick' : function(flxGSTR1_Customer,rowIndex,cellIndex,e){
                tabOverall.setActiveTab(2);

                var selerow =flxGSTR1_Customer.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('voucherno');
                }

	       flxld.getStore().removeAll();

//alert(b);
                tabOverall.setActiveTab(3);
                cmbvoc.setValue(b);

//alert(cmbvoc.getValue());
                VoucherClick();
	        flxld.getSelectionModel().selectAll();



            },
/*
            'cellclick': function (flxGSTR1_Detail, rowIndex, cellIndex, e) {
                tabOverall.setActiveTab(2);
                 var selected_rows =flxGSTR1_Detail.getSelectionModel().getSelections();
alert("2-1");
		        for(var i=0; i<selected_rows.length; i++)
		        {
		          var voouno=selected_rows[i].data.invh_vouno;
		         }
       alert("2-2");
			   VouNoClickDetailsNewDataStore.removeAll();
                           VouNoClickDetailsNewDataStore.load({
                                url: '/SHVPM/Accounts/clsRepFinancials.php',
                                params:{
                                    task:'VouNoClickDetailsNew',
                                    fcompcode:Gincompcode,
                                    ffinid:GinFinid,
                                    vouno:voouno
                                },
                                callback:function(){
                                    var cnt=VouNoClickDetailsNewDataStore.getCount();

                                    if(cnt>0){
       //  tabOverall.setActiveTab(1);
                                     }
                                }
                            });

	   },
*/
            'rowselect' : function(flxdetails,rowIndex,cellIndex,e){

                tabOverall.setActiveTab(2);
                var selerow =flxGSTR1_Detail.getSelectionModel().getSelections();
                for(var i=0; i<selerow.length; i++)
                {
                     b =selerow[i].get('voucherno');
                }
                cmbvoc.setRawValue(b);
                VoucherClick();
	        flxld.getSelectionModel().selectAll();
            },

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
    width       : 1300,


listeners: {

     'tabchange': function(tabPanel, tab) {
           var activeTab = tabOverall.getActiveTab();
           grid_tot_Document();

        }
},

    items       : [
    {
        xtype: 'panel',
        title: 'GSTR-1 BREAKUP',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
      
                 { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : true,
		             x       : 900,
                             width   : 250,
                             height  : 50,
			     y       : 0,
                             items: [optprinttype]
                        },

                        btnPrintGSTR1Abs,
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                             width   : 300,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 290,
			     y       : 10,
                             width   : 220,

                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             width   : 200,

                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 12,
                             items: [btnProcess]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : true,
		             x       : 10,
			     y       : 60,
                             items: [flxGSTR1]
                        },


			{
			    xtype       : 'fieldset',
			    x           : 220,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail8]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 230,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotVouchers]
			},
			{
			    xtype       : 'fieldset',
			    x           : 345,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail2]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 335,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxable]
			},

			{
			    xtype       : 'fieldset',
			    x           : 490,
			    y           : 430,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail3]
			},

			{
			    xtype       : 'fieldset',
			    x           : 475,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotIGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 625,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail4]
			},
			{
			    xtype       : 'fieldset',
			    x           : 610,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 765,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail5]
			},

			{
			    xtype       : 'fieldset',
			    x           : 750,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotSGST]
			},

			{
			    xtype       : 'fieldset',
			    x           : 895,
			    y           : 425,
			    border      : false,
			    width       :300,
		            labelWidth  : 120,
			    items : [lblDetail6]
			},
	
			{
			    xtype       : 'fieldset',
			    x           : 875,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCess]
			},
			{
			    xtype       : 'fieldset',
			    x           : 980,
			    y           : 425,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblDetail7]
			},
			{
			    xtype       : 'fieldset',
			    x           : 970,
			    y           : 450,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxAmount]
			},


			{
			    xtype       : 'fieldset',
			    x           : 1130,
			    y           : 425,
			    border      : false,
			    width       :  500,
		            labelWidth  : 120,
			    items : [lblDetail1]
			},
			{
			    xtype       : 'fieldset',
			    x           : 1115,
			    y           : 450,
			    border      : false,
			    width       : 500,
		            labelWidth  : 10,
			    items : [txtTotValue]
			},


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 200,
                             border  : false,
		             x       : 30,
			     y       : 500,
                             items: [btnJSON]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 200,
                             border  : false,
		             x       : 430,
			     y       : 500,
                             items: [btnJSONB2CS]
                        },

        ]
     } ,
    {
        xtype: 'panel',
        title: 'CUSTOMERWISE BREAKUP',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


btnPrintGSTR1_Type_Abs,





			{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 20,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblGSTTypeHeader]
			},	

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 60,
                             items: [flxGSTR1_Detail]
                        },




			{
			    xtype       : 'fieldset',
			    x           : 60,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblDetail71]
			},	

			{
			    xtype       : 'fieldset',
			    x           : 50,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotVocuhers]
			},


			{
			    xtype       : 'fieldset',
			    x           : 240,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblDetail21]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 225,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxable1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 400,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail31]
			},

			{
			    xtype       : 'fieldset',
			    x           : 375,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotIGST1]
			},

			{
			    xtype       : 'fieldset',
			    x           : 550,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail41]
			},
			{
			    xtype       : 'fieldset',
			    x           : 525,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCGST1]
			},

			{
			    xtype       : 'fieldset',
			    x           : 705,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail51]
			},
			{
			    xtype       : 'fieldset',
			    x           : 680,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotSGST1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 840,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail61]
			},

			{
			    xtype       : 'fieldset',
			    x           : 825,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCess1]
			},
			{
			    xtype       : 'fieldset',
			    x           : 980,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail81]
			},

			{
			    xtype       : 'fieldset',
			    x           : 965,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTax1]
			},


			{
			    xtype       : 'fieldset',
			    x           : 1110,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblDetail11]
			},


			{
			    xtype       : 'fieldset',
			    x           : 1100,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotValue1]
			},



        ]
     } ,
    {
        xtype: 'panel',
        title: 'CUSTOMERWISE DETAILS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [

btnPrintGSTR1_Customer_Details,

			{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 10,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblGSTTypeHeader2]
			},	



			{
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 40,
			    border      : false,
			    width       :500,
		            labelWidth  : 140,
			    items : [lblGSTPatyName]
			},	


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 70,
                             items: [flxGSTR1_Customer]
                        },


			{
			    xtype       : 'fieldset',
			    x           : 240,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 130,
			    items : [lblTaxValue]
			},
	

			{
			    xtype       : 'fieldset',
			    x           : 225,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotTaxable2]
			},


			{
			    xtype       : 'fieldset',
			    x           : 400,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblIGST]
			},

			{
			    xtype       : 'fieldset',
			    x           : 375,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotIGST2]
			},

			{
			    xtype       : 'fieldset',
			    x           : 550,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblCGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 525,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCGST2]
			},

			{
			    xtype       : 'fieldset',
			    x           : 705,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblSGST]
			},
			{
			    xtype       : 'fieldset',
			    x           : 680,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotSGST2]
			},


			{
			    xtype       : 'fieldset',
			    x           : 840,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblCESS]
			},

			{
			    xtype       : 'fieldset',
			    x           : 825,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotCess2]
			},


			{
			    xtype       : 'fieldset',
			    x           : 960,
			    y           : 480,
			    border      : false,
			    width       :500,
		            labelWidth  : 120,
			    items : [lblTotalValue ]
			},


			{
			    xtype       : 'fieldset',
			    x           : 950,
			    y           : 500,
			    border      : false,
			    width       :500,
		            labelWidth  : 10,
			    items : [txtTotValue2]
			},

       ]
    }, 

    {
        xtype: 'panel',
        title: 'DOCUMENTWISE DETAILS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


btnPrintGSTR1_AllDocument_Details,


		{ 
                     xtype   : 'fieldset',
                     title   : '',
                     border  : false,
	             x       : 10,
		     y       : 70,
                     items: [flxGSTR1_DocumentList]
                },


		{
		    xtype       : 'fieldset',
		    x           : 10,
		    y           : 500,
		    border      : false,
		    width       :500,
	            labelWidth  : 100,
		    items : [txtDocListCount]
		},


		{
		    xtype       : 'fieldset',
		    x           : 210,
		    y           : 500,
		    border      : false,
		    width       :500,
	            labelWidth  : 100,
		    items : [txtDocListTaxable]
		},


		{
		    xtype       : 'fieldset',
		    x           : 450,
		    y           : 500,
		    border      : false,
		    width       : 500,
	            labelWidth  : 80,
		    items : [txtDocListCGST]
		},

		{
		    xtype       : 'fieldset',
		    x           : 650,
		    y           : 500,
		    border      : false,
		    width       : 500,
	            labelWidth  : 80,
		    items : [txtDocListSGST]
		},


		{
		    xtype       : 'fieldset',
		    x           : 880,
		    y           : 500,
		    border      : false,
		    width       : 500,
	            labelWidth  : 80,
		    items : [txtDocListIGST]
		},

		{
		    xtype       : 'fieldset',
		    x           : 1100,
		    y           : 500,
		    border      : false,
		    width       : 500,
	            labelWidth  : 100,
		    items : [txtDocListGross]
		},
        ]
    },        

    {
        xtype: 'panel',
        title: 'Voucher Detail',
        bodyStyle: {"background-color": "#e6f2ff"},
        layout: 'absolute',
        items: [
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
            x           : 550,
            y           : 10,
            height      : 100,
            labelWidth  : 100,
            border      : false,
  //          items : [btnview]
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
            height : 235,
            x           : 10,
            y           : 80,
            border      : false,
            items : [flxld]
        },
        {
            xtype       : 'fieldset',
            x           : 300,
            y           : 300,
            labelWidth  : 120,
            border      : false,
            width       :250,
            items : [txtLtotdebit]
        },
        {
            xtype       : 'fieldset',
            x           : 540,
            y           : 300,
            border      : false,
            labelWidth  : 120,
            width       :250,
            items : [txtLtotcredit]
        },
/*
        {
            xtype       : 'fieldset',
            title       : '',
            x           : 320,
            y           : 300,
            width       :400,
            labelWidth  : 120,
            border      : false,
            items : [lblTtot]
        },
*/
        {
            xtype       : 'fieldset',
            width       : 800,
            labelWidth  : 100,
            x           : 0,
            y           : 375,
            border      : false,
            items : [txtnarration2]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 70,
            border      : false,
            anchor: '100%',
            x           : 10,
            y           : 340,
            items : [txtmode]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 40,
            border      : false,
            anchor: '100%',
            x           : 315,
            y           : 340,
            items : [txtno]
        },
        {
            xtype       : 'fieldset',
            width       : 500,
            height : 100,
            labelWidth  : 40,
            border      : false,
            anchor: '100%',
            x           : 480,
            y           : 340,
            items : [txtdate]
        }
        ]
    },

   ]       
  });


    function Refreshdata()
    {
        qlylist = '';
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 

        cmbMonth.setValue(parseInt(m1));
        find_dates(parseInt(m1));



    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'HSN WISE Sales Details',
        items       : tabOverall,
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

                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
