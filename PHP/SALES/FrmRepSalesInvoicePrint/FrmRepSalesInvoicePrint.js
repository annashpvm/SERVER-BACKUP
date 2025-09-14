Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
 var invprttype = "1";

var invtype = "N";

var invstate = "TN";
var fm = Ext.form;
var salrep = "TNinv";	
var sno =1, upd = 0, seqno1, varty1, sno1, sno2, party, wt1, wt2, n1, g1, n2, g2, rsize1, rsize2, chk, slipno, invno1, vcode,
rg1size, s1, s2, r1 = 0, r2 =0, invdt, d1, d2;

 var loadCHKEinvoicegenerated = new Ext.data.Store({
      id: 'loadCHKEinvoicegenerated',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoicePrint.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['U_TCSStatus','E_inv_confirm'
      ]),
    });


 var loadInvoiceNolistDataStore = new Ext.data.Store({
      id: 'loadInvoiceNolistDataStore',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesInvoicePrint.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadInvoiceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invhdate', 'invh_seqno','invh_invrefno', 'cust_ref'
      ]),
    });



 var loadinvoiceprint = new Ext.data.Store({
      id: 'loadinvoiceprint',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvoiceno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invh_invrefno','invh_seqno'
      ]),
    });

 var loadpackslipbundledatastore = new Ext.data.Store({
      id: 'loadpackslipbundledatastore',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpackslipBundle"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['pckh_no', 'pckh_date', 'pckh_invno', 'pckh_invdt', 'pckt_var', 'pckt_sr_no', 'pckt_unit', 'pckt_wt'
      ]),
    });
    
 var loadpackinvoiceprint = new Ext.data.Store({
      id: 'loadpackinvoiceprint',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpackinginvoice"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invh_comp_code', 'invh_fincode', 'invh_no', 'invh_date', 'invh_time', 'invh_type', 'invh_party_ordno', 'invh_party_orddt', 'invh_our_ordno', 'invh_our_orddt', 'invh_party', 'invh_agent', 'invh_our_bank', 'invh_docu', 'invh_crd_days', 'invh_grace_days', 'invh_odiper', 'invh_taxtag', 'invh_insper', 'invh_insamt', 'invh_comm', 'invh_frt_rate', 'invh_frt_amt', 'invh_roff', 'invh_netamt', 'invh_noofbun', 'invh_noofreels', 'invh_totwt', 'invh_cum_wt', 'invh_slipno', 'invh_slipdt', 'invh_pla_no', 'invh_rg23no', 'invh_vehi_no', 'invh_formno', 'invh_formdt', 'invh_formtag', 'invh_trans', 'invh_lrno', 'invh_lrdate', 'invh_dest', 'invh_loca', 'invh_desptag', 'invh_paytag', 'invh_deposaltag', 'invh_vouno', 'invh_vouyear', 'invh_taxableamt', 'invh_lcno', 'invh_lcdate', 'invh_exno', 'invh_exdate', 'invh_party_bank', 'invh_desp_location', 'invh_others', 'invh_sgst_per', 'invh_sgst_amt', 'invh_cgst_per', 'invh_cgst_amt', 'invh_igst_per', 'invh_igst_amt', 'invh_A4inv', 'invh_tax_rev_yn', 'invh_frt_type', 'pckh_comp_code', 'pckh_fincode', 'pckh_no', 'pckh_date', 'pckh_invtype', 'pckh_ordno', 'pckh_orddate', 'pckh_ackno', 'pckh_ackdt', 'pckh_dano', 'pckh_dadt', 'pckh_party', 'pckh_type', 'pckh_repr', 'pckh_noofbun', 'pckh_noofreels', 'pckh_totwt', 'pckh_invno', 'pckh_invdt', 'pckh_invstat', 'pckh_closing_status',  'pckt_comp_code', 'pckt_fincode', 'pckt_no','pckt_var', 'pckt_sr_no', 'pckt_unit', 'pckt_wt', 'pckt_rettag', 'pckt_deposal', 'pckt_srno_fincode', 'stk_comp_code', 'stk_finyear', 'stk_ent_no', 'stk_ent_date', 'stk_var_code', 'stk_units', 'stk_sr_no', 'stk_wt', 'stk_loca', 'stk_slipno', 'stk_desdt', 'stk_destag', 'stk_retno', 'stk_retdt', 'stk_rettag', 'stk_deltag', 'stk_deldate', 'stk_tariffno', 'stk_Party', 'stk_Grade', 'stk_from', 'stk_refno', 'stk_brightness', 'stk_dcno', 'stk_dcdate', 'stk_mill',  'cust_code', 'cust_led_code', 'cust_ref','cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_fax', 'cust_email', 'cust_web', 'cust_cont', 'cust_tngst', 'cust_tngstdt', 'cust_cst', 'cust_cstdate', 'cust_taxtag', 'cust_cr_days', 'cust_gr_days', 'cust_cr_limit', 'cust_agent', 'cust_repr', 'cust_group', 'cust_dest', 'cust_rep', 'cust_range', 'cust_division', 'cust_eccno', 'cust_type', 'cust_rnino', 'cust_agtgrp', 'cust_panno', 'cust_tinno', 'cust_shortname', 'cust_gstin'
      ]),
    });    




var dgrecord = Ext.data.Record.create([]);
var flxInvoice = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 190,
    hidden:false,
    width: 620,
   // id: 'my-grid5',  

    columns:
    [ 	 	
      {header: "Date" , dataIndex: 'invhdate',sortable:false,width:120,align:'center', menuDisabled: true},
      {header: "Invoice No" , dataIndex: 'invh_seqno',sortable:false,width:140,align:'left', menuDisabled: true,},
      {header: "Invoice No" , dataIndex: 'invh_invrefno',sortable:false,width:140,align:'left', menuDisabled: true,},
      {header: "Customer" , dataIndex: 'cust_ref',sortable:false,width:350,align:'left', menuDisabled: true},

    ],
   store:loadInvoiceNolistDataStore,
    listeners :{

	
            'cellclick': function (flxInvoice, rowIndex, cellIndex, e) {
		var sm = flxInvoice.getSelectionModel();
		var selrow = sm.getSelected();

                var invseqno = selrow.get('invh_seqno')
                var invno = selrow.get('invh_invrefno')
		loadCHKEinvoicegenerated.load({
			 url: 'ClsTrnSalesInvoicePrint.php', 
			 params:
	       		 {
		 	 task     :"loadInvoiceNoDetails",
		         invno    : invseqno,
			 finid    : GinFinid,
			 compcode : GinCompcode
			 },
		         callback: function () {

			       var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			       var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			       var p3 = "&invno=" + encodeURIComponent(invno);


		               tcs = loadCHKEinvoicegenerated.getAt(0).get('U_TCSStatus');			
		               einv = loadCHKEinvoicegenerated.getAt(0).get('E_inv_confirm');	
                               if (invprttype == 1) {
		                      i1 = "ORIGINAL FOR BUYER";
		                      var p4 = "&displayword=" + encodeURIComponent(i1);
				      var param = (p1 + p2 + p3 + p4 );  
                                      if (tcs !='' && einv == "Y" )  
				      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf'+ param);
                                      else
		                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

                               }   
  			      else if (invprttype == 2) {
		                      i1 = "DUPLICATE FOR TRANSPORT";
		                      var p4 = "&displayword=" + encodeURIComponent(i1);
				      var param = (p1 + p2 + p3  + p4 ); 
                                        if (tcs !='' && einv == "Y" )     
				      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                       else
		                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

		              } 
			      else if (invprttype == 3) {
		                      i1 = "TRIPLICATE FOR ASSESSEE";
		                      var p4 = "&displayword=" + encodeURIComponent(i1);
				      var param = (p1 + p2 + p3  + p4 );    
                                      if (tcs !='' && einv == "Y" )  
				      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                       else
		                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

		               }
			      else if (invprttype == 4) {
		                      i1 = "EXTRA COPY";
		                      var p4 = "&displayword=" + encodeURIComponent(i1);
				      var param = (p1 + p2 + p3  + p4 );    
                                      if (tcs !='' && einv == "Y" )  
				      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                       else
		                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

		               }  

                         } 
                 });
             }
   }  

});


var dtpgpdate = new Ext.form.DateField({
    fieldLabel : 'Gate Pass Date',
    id         : 'dtpgpdate',
    name       : 'date',
    format     : 'd-m-Y',
    labelStyle 	: 'font-weight:bold;',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){
     		loadinvoiceprint.removeAll();
		loadinvoiceprint.load({
			url: '/SHVPM/SALES/ClsSalesRep.php', 
			params:{
				task:"loadgatepass",
				finid:GinFinid,
				compcode: GinCompcode,
				gpdt : Ext.util.Format.date(dtpgpdate.getValue(),"Y-m-d")
			}
		});
            }
    }
});

/*
function loadbundledetails()
{
var i=0;
var k=0;
var sumwt =0;
	loadpackslipbundledatastore.removeAll();
	loadpackslipbundledatastore.load({
		url: '/SHVPM/SALES/ClsSalesRep.php', 
		params:{
			task:"loadpackslipBundle",
			finid:GinFinid,
			compcode: GinCompcode,
			stinvno : Ext.getCmp('cmbinvno').getRawValue(),
			edinvno : Ext.getCmp('cmbinvno').getRawValue()
		
		},
		callback : function() {

//alert(loadpackslipbundledatastore.getCount());
			if (loadpackslipbundledatastore.getCount()>0) {
				while (i < loadpackslipbundledatastore.getCount()) { //While Loop

        		              invno = loadpackslipbundledatastore.getAt(i).get('pckh_invno');
		         	      slipno = loadpackslipbundledatastore.getAt(i).get('pckh_no');
                 		      vcode = loadpackslipbundledatastore.getAt(i).get('pckt_var');         
                                      var RowCnt = flxBundle.getStore().getCount() + 1;
                                      if (i == 0) {                                      
                                        flxBundle.getStore().insert(
                                        flxBundle.getStore().getCount(),
                                           new dgrecord({
		                               invno  : loadpackslipbundledatastore.getAt(i).get('pckh_invno'),
                                               size   : loadpackslipbundledatastore.getAt(i).get('pckt_var'),
			                       fromno : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),
                                               tono   : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),        
				               wt     : loadpackslipbundledatastore.getAt(i).get('pckt_wt'),
				               ok     : '',
                                          })
                                        );  
    				      }

                                      else
                                      {
                                          var RowCnt1 = flxBundle.getStore().getCount();
                                          flxBundle.getSelectionModel().selectAll();
                                          var sel1 = flxBundle.getSelectionModel().getSelections();
                                          for (k=0;k<RowCnt1;k++) {
                                                  if (sel1[k].data.ok != 'Y') {
                                                    if (Number(sel1[k].data.invno) == loadpackslipbundledatastore.getAt(i).get('pckh_invno') && Number(sel1[k].data.size) == loadpackslipbundledatastore.getAt(i).get('pckt_var')) 
                                                    {

                                                       if (loadpackslipbundledatastore.getAt(i).get('pckt_sr_no') != Number(sel1[k].data.tono) + 1 ){
                                                                sel1[k].set('ok', 'Y');
						                flxBundle.getStore().insert(
						                flxBundle.getStore().getCount(),
						                   new dgrecord({
								       invno  : loadpackslipbundledatastore.getAt(i).get('pckh_invno'),
						                       size   : loadpackslipbundledatastore.getAt(i).get('pckt_var'),
								       fromno : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),
						                       tono   : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),        
								       wt     : loadpackslipbundledatastore.getAt(i).get('pckt_wt'),
								       ok     : '',
						                  })
                                                                ); 
                                                       } 
                                                       else
                                                       {
					                    sumwt = Ext.util.Format.number(Number(loadpackslipbundledatastore.getAt(i).get('pckt_wt')) + Number(sel1[k].data.wt),'0.00');
					                    sel1[k].set('tono', loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'));
					                    sel1[k].set('wt', sumwt);

                                                       }

                                                    }
                                                    else
                                                    {
						                sel1[k].set('ok', 'Y');
						                flxBundle.getStore().insert(
						                flxBundle.getStore().getCount(),
						                   new dgrecord({
								       invno  : loadpackslipbundledatastore.getAt(i).get('pckh_invno'),
						                       size   : loadpackslipbundledatastore.getAt(i).get('pckt_var'),
								       fromno : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),
						                       tono   : loadpackslipbundledatastore.getAt(i).get('pckt_sr_no'),        
								       wt     : loadpackslipbundledatastore.getAt(i).get('pckt_wt'),
								       ok     : '',
						                  })
						                );  


                                                    }
                                                   
                                                  }     

                                          } //next

                                      } 
                                   


                                     i = i + 1;      
                                             


                                }
                       }
           savedata();  
                }


       });   


}
*/

function savedata()
{
/*
                            var invData = flxBundle.getStore().getRange();                                        
                            var poupdData = new Array();
                            Ext.each(invData, function (record) {
                                poupdData.push(record.data);
                            });
                            Ext.Ajax.request({
                            url: 'TrnSalRepBundleSave.php',
                            params :
                             {
				griddet: Ext.util.JSON.encode(poupdData),     
			        cnt: invData.length ,
                                compcode : GinCompcode,                    	
	                     },

                              
                           }); 
*/
}



 var cmbinvno = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 150,
        displayField    : 'invh_invrefno',
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbinvno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '',
        mode            : 'local',
        store           : loadinvoiceprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
        listeners : {

        select : function() {
/*
   if (salrep === "pckslp1" ) {
		loadpackinvoiceprint.removeAll();
		loadpackinvoiceprint.load({
			url: '/SHVPM/SALES/ClsSalesRep.php', 
			params:{
				task:"loadpackinginvoice",
				finid:GinFinid,
				compcode: GinCompcode,
				stinvno : cmbinvno.getValue(), //Ext.getCmp('cmbinvno').getRawValue(),
				edinvno : cmbinvno.getValue(),//Ext.getCmp('cmbinvno').getRawValue()
				
			},
			callback : function() {

var i=0;
sno =1;
if (loadpackinvoiceprint.getCount()>0) {
invno1 = loadpackinvoiceprint.getAt(0).get('invh_no');
invdt = Ext.util.Format.date(loadpackinvoiceprint.getAt(0).get('invh_date'),'Y-m-d');
slipno = loadpackinvoiceprint.getAt(0).get('invh_slipno');
vcode = loadpackinvoiceprint.getAt(0).get('stk_var_code');
	while (i < loadpackinvoiceprint.getCount()) { //While Loop
	party = loadpackinvoiceprint.getAt(i).get('invh_party');
	if (invno1 === loadpackinvoiceprint.getAt(i).get('invh_no')) { //if invno 
                if (slipno === loadpackinvoiceprint.getAt(i).get('invh_slipno')) {//if slipno 
                   if (vcode === loadpackinvoiceprint.getAt(i).get('stk_var_code')) { //if vcode 
                       if (upd == 0) {
				s1 = sno;
				rsize1 = loadpackinvoiceprint.getAt(i).get('stk_var_code');
				r1 = loadpackinvoiceprint.getAt(i).get('stk_sr_no');
				wt1 = loadpackinvoiceprint.getAt(i).get('stk_wt');
				d1 = Ext.util.Format.date(loadpackinvoiceprint.getAt(i).get('stk_ent_date'), "Y-m-d");
				sno = sno + 1;
				upd = 1;  
				             
                       } //if upd end
                       else {
                           s2 = sno;
                           rsize2 = loadpackinvoiceprint.getAt(i).get('stk_var_code');
                           r2 = loadpackinvoiceprint.getAt(i).get('stk_sr_no');
                           wt2 = loadpackinvoiceprint.getAt(i).get('stk_wt');

                           d2 = Ext.util.Format.date(loadpackinvoiceprint.getAt(i).get('stk_ent_date'), "Y-m-d");
                           sno = sno + 1;
                           upd = 0;
                           oddeven = 1;
                           addquery();
                           seqno1 = 0;
                           varty1 = "";
                           s1 = 0;
                           rsize1 = "";
                           r1 = 0;
                           wt1 = 0;
                           d1 = '';
                           s2 = 0;
                           rsize2 = "";
                           r2 = 0;
                           wt2 = 0;
                           d1 = '';                       
                       
                       }
                      i = i + 1;
                   } //if vcode end
                   else {
                       if (upd == 1) {
                       oddeven = 1;
                          addquery();
                          upd = 0;
                           seqno1 = 0;
                           varty1 = "";
                           s1 = 0;
                           rsize1 = "";
                           r1 = 0;
                           wt1 = 0;
                           d1 = '';
                           s2 = 0;
                           rsize2 = "";
                           r2 = 0;
                           wt2 = 0;
                           d2 = '';
                       }
                       vcode = loadpackinvoiceprint.getAt(i).get('stk_var_code');
                   } //else if vcode end
		} //if slipno end
		else {
                   if (upd == 1){
                   oddeven = 1;
			addquery();
                      upd = 0;
                      seqno1 = 0;
                      varty1 = "";
                      s1 = 0;
                      rsize1 = "";
                      r1 = 0;
                      wt1 = 0;
                      d1 = '';
                      s2 = 0;
                      rsize2 = "";
                      r2 = 0;
                      wt2 = 0;
                      d2 = '';
                   }
                   vcode = loadpackinvoiceprint.getAt(i).get('stk_var_code');
                   slipno = loadpackinvoiceprint.getAt(i).get('pckt_no');
                	
		}//else if slipno end
	}//if invno end
	else {
                if (upd == 1) {
                oddeven = 1;
			addquery();
                   upd = 0;
                   seqno1 = 0;
                   varty1 = "";
                   s1 = 0;
                   rsize1 = "";
                   r1 = 0;
                   wt1 = 0;
                   d1 = '';
                   s2 = 0;
                   rsize2 = "";
                   r2 = 0;
                   wt2 = 0;
                   d2 = '';
                }
                vcode = loadpackinvoiceprint.getAt(i).get('stk_var_code');
                slipno = loadpackinvoiceprint.getAt(i).get('pckt_no');
                invno1 = loadpackinvoiceprint.getAt(i).get('invh_no');
            	
	}
				

	}//While Loop end
        if (upd == 1) {
			addquery();
           upd = 0;
           seqno1 = 0;
           varty1 = "";
           s1 = 0;
           rsize1 = "";
           r1 = 0;
           wt1 = 0;
           d1 = '';
           s2 = 0;
           rsize2 = "";
           r2 = 0;
           wt2 = 0;
           d2 = '';
        }	
        
}
else {
alert("No Details");
}        				
						}
						
					});        
        }
*/
        }
        }
   });
   


/*
var flxBundle = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:350,
    height: 130,
    hidden:false,
    width: 850,
    visible:false,
//    font-size:18px,
    columns:
    [
        {header: "InvoiceNo", dataIndex: 'invno',sortable:true,width:70,align:'left'},
        {header: "Size", dataIndex: 'size',sortable:true,width:100,align:'left'},
        {header: "From No", dataIndex: 'fromno',sortable:true,width:60,align:'left'},
        {header: "To No", dataIndex:'tono',sortable:true,width:60,align:'left'},
        {header: "Weight", dataIndex:'wt',sortable:true,width:60,align:'left'},
        {header: "ok", dataIndex:'ok',sortable:true,width:60,align:'left'},

    ],
    store: [],
    listeners:{	
    }
});

*/

 var cmbedinvno = new Ext.form.ComboBox({
        fieldLabel      : 'To Invoice No',
        width           : 100,
        displayField    : 'invh_no',
        valueField      : 'invh_no',
        hiddenName      : '',
        id              : 'cmbedinvno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : 'Invoice No',
        mode            : 'local',
        store           : loadinvoiceprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });   



var optInvoiceType = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:400,
    height:250,
    x:40,
    y:0,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optInvoieType',
        items: [
            {boxLabel: 'Normal Invoice ' , name: 'optInvoiceType', id:'normalinvoice', inputValue: 7,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                invtype = "N";  
               Ext.getCmp('optMill').hide(true);                    
                     }
                 }
               }
            },
            {boxLabel: 'E - Invoice ' , name: 'optInvoiceType', id:'einvoice', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                invtype = "E";      	
   		               Ext.getCmp('optMill').hide(true);	                      
                     }
                 }
               }
            },

            {boxLabel: 'Blank Invoice  Format' , name: 'optInvoiceType', id:'blankinvoice', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                invtype = "B";  
 	
                        Ext.getCmp('optMill').show(true);   			                      
                     }
                 }
               }
            },

                                
        ]


    },
    ]

});


var milltype = 'S';
var optMill = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:250,
    x:550,
    y:20,
    border: true,
        id: 'optMill',
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 10,

        items: [
            {boxLabel: 'SHVPM' , name: 'optMill', id:'shvpm', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'S';                      
                     }
                 }
               }
            },
            {boxLabel: 'Karishma' , name: 'optMill', id:'karishma', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'K';      	
   			                      
                     }
                 }
               }
            },
            {boxLabel: 'Karishma Textile' , name: 'optMill', id:'karishmat', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'KT';      	
   			                      
                     }
                 }
               }
            },
            {boxLabel: 'Andal' , name: 'optMill', id:'Andal', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'A';      	   			                      
                     }
                 }
               }
            },
            {boxLabel: 'Hari Krishna Mahal' , name: 'optMill', id:'mahal', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'HKM';      	   			                      
                     }
                 }
               }
             },                        
            {boxLabel: 'Jeyanth and Jeyanthi' , name: 'optMill', id:'jj', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'JJ';      	   			                      
                     }
                 }
               }
             },

            {boxLabel: 'XOOG Edlearn' , name: 'optMill', id:'xoog', inputValue: 8,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
	                milltype = 'XOOG';      	   			                      
                     }
                 }
               }
             },  
        ]


    },
    ]

});

var optrep = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:250,
    x:480,
    y:85,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optrep',
        items: [
            {boxLabel: 'Invoice - TamilNadu ' , name: 'optrep', id:'optinvTN', inputValue: 7,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     cmbinvno.setRawValue('');
                     Ext.getCmp('dtpgpdate').hide(true);
                      cmbinvno.label.update('Invoice No');
                     		loadinvoiceprint.removeAll();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
                                 invstate  : "TN",
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });	
				 salrep = "TNinv";	
	   			                      
                     }
                 }
               }
            },
            {boxLabel: 'Invoice - Other States' , name: 'optrep', id:'optinvOS', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     cmbinvno.setRawValue('');
                     Ext.getCmp('dtpgpdate').hide(true);
                      cmbinvno.label.update('Invoice No');
                     		loadinvoiceprint.removeAll();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
                                 invstate  : "OS",
				 finid:GinFinid,
				 compcode: GinCompcode,
                        	 }
				 });	
				 salrep = "OSinv";	
	   			                      
                     }
                 }
               }
            },

            {boxLabel: 'Invoice - SEZ' , name: 'optrep', id:'optinvSEZ', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     cmbinvno.setRawValue('');
                     Ext.getCmp('dtpgpdate').hide(true);
                      cmbinvno.label.update('Invoice No');
                     		loadinvoiceprint.removeAll();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
                                 invstate  : "SEZ",
				 finid:GinFinid,
				 compcode: GinCompcode,
                        	 }
				 });	
				 salrep = "SEZinv";	
	   			                      
                     }
                 }
               }
            },
  
            {boxLabel: 'Packing Slip - TamilNadu', name: 'optrep', id:'optpackslip', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').hide(true);
                     cmbinvno.label.update('Invoice No');
                     		salrep = "pckslp1";
                     		cmbinvno.reset();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode,
                                 invstate  : "TN",
                        	 }
				 });                     		
                   		
                     }

                 }
               }
             
            },
            {boxLabel: 'Packing Slip - OtherState', name: 'optrep', id:'optpackslip2', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').hide(true);
                     cmbinvno.label.update('Invoice No');
                     		salrep = "pckslp1";
                     		cmbinvno.reset();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode,
                                 invstate  : "OS",
                        	 }
				 });                     		
                   		
                     }

                 }
               }
             
            },

            {boxLabel: 'Packing Slip - SEZ ', name: 'optrep', id:'optpackslip3', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').hide(true);
                     cmbinvno.label.update('Invoice No');
                     		salrep = "pckslp1";
                     		 cmbinvno.reset();
                                 loadinvoiceprint.removeAll();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode,
                                 invstate  : "SEZ",
                        	 }
				 });                     		
                   		
                     }

                 }
               }
             
            },
            {boxLabel: 'Packing Slip - Bundle - TamilNadu', name: 'optrep', id:'optpackslipTNbund', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').hide(true);
                     cmbinvno.label.update('Invoice No');
                     		salrep = "packslipbundle";
                     		cmbinvno.reset();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode,
                                 invstate  : "TN",
                        	 }
				 });                     		
                   		
                     }

                 }
               }
             
            },
            {boxLabel: 'Packing Slip - Bundle - OtherState', name: 'optrep', id:'optpackslipOSbund', inputValue: 4,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').hide(true);
                     cmbinvno.label.update('Invoice No');
                     		salrep = "packslipbundle";
                     		cmbinvno.reset();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode,
                                 invstate  : "OS",
                        	 }
				 });                     		
                   		
                     }

                 }
               }
             
            },
/*
            {boxLabel: 'Gate Pass Printing', name: 'optrep', id:'optsalgatepass', inputValue: 6,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                     Ext.getCmp('dtpgpdate').show(true);
                     cmbinvno.label.update('Gate Pass No');
                   //  cmbinvno.emptyText.update('Gate Pass No');
                     		loadinvoiceprint.removeAll();
				loadinvoiceprint.load({
					url: '/SHVPM/SALES/ClsSalesRep.php', 
					params:{
						task:"loadgatepass",
						finid:GinFinid,
						compcode: GinCompcode,
						gpdt : Ext.util.Format.date(dtpgpdate.getValue(),"Y-m-d")
					}
				});
                     		salrep = "salgatepass";
                     }

                 }
               }
             
            },
            {boxLabel: 'Invoice Blank', name: 'optrep', id:'optinvblank', inputValue: 7,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){

                     		salrep = "salinvblank";
                     }

                 }
               }
             
            },
*/
                                
        ]


    },
    ]

});

var optinvprttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
//    width:250,
//    height:50,
//    x:500,
//    y:85,
    border: true,
    items: [


    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optinvprttype',
        items: [
/*
            {boxLabel: 'All' , name: 'optinvprttype', id:'optinvtype0', inputValue: 0,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "ORIGINAL FOR BUYER";
                         invprttype = "0";

                     }
                 }
               }
            },
*/
            {boxLabel: 'Original' , name: 'optinvprttype', id:'optinvtype1', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "ORIGINAL FOR BUYER";
                         invprttype = "1";

                     }
                 }
               }
            },


            {boxLabel: 'Duplicate' , name: 'optinvprttype', id:'optinvtype2', inputValue: 2,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "DUPLICATE FOR TRANSPORTER";

                         invprttype = "2";

                     }
                 }
               }
            },

            {boxLabel: 'Triplicate' , name: 'optinvprttype', id:'optinvtype4', inputValue: 4,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
//                         invprttype = "TRIPLICATE FOR SUPPLIER";
                         invprttype = "3";

                     }
                 }
               }
            }, 

            {boxLabel: 'Extra Copy' , name: 'optinvprttype', id:'optinvtype3', inputValue: 3,checked:false,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                         invprttype = "EXTRA COPY";
                         invprttype = "4";

                     }
                 }
               }
            },
           
       ]
      }   

    ]
});

                            function addquery() {
                            Ext.Ajax.request({
                            url: 'TrnSalRepSave.php',
                            params :
                             {
				oddeven	: oddeven,
				compcode	: GinCompcode,
                               finid		: GinFinid,
                               invno		: invno1,
                               invdt		: invdt,
                               party		: party,
                               slipno		: slipno,
                               rsize1		: rsize1,
                               s1		: s1,
                               r1		: r1,
                               wt1		: wt1,
                               d1		: d1,
                               s2		: s2,
                               r2		: r2,
                               wt2		: wt2,
                               d2		: d2,                             	
				},
                              
                           });         
}

   var tcs = '';
   var einv = 'N';

   var RepInvoicePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'INVOICE Print',
        header      : false,
        width       : 950,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 600,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepInvoicePrintFormPannel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

//alert(invprttype);

                        
                        if ( salrep == "TNinv" || salrep == "OSinv" || salrep == "SEZinv") {

				if(cmbinvno.getValue()==0) 

				{
				Ext.MessageBox.alert("Alert", "Select Invoice No");
				}
			     else
				{

				 loadCHKEinvoicegenerated.load({
		        		 url: 'ClsTrnSalesInvoicePrint.php', 
		                	 params:
		               		 {
		                 	 task:"loadInvoiceNoDetails",
		                         invno  : cmbinvno.getValue(),
					 finid   :GinFinid,
					 compcode: GinCompcode
		                	 },
		                         callback: function () {
	                                       tcs = loadCHKEinvoicegenerated.getAt(0).get('U_TCSStatus');			
                                               einv = loadCHKEinvoicegenerated.getAt(0).get('E_inv_confirm');	

//alert(einv);
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&fincode=" + encodeURIComponent(GinFinid);
						var p3 = "&invno=" + encodeURIComponent(cmbinvno.getRawValue());
		                                if (invprttype == 0) {
				                  for (i=1;i<=3;i++){
				                       if ( i == 1 ) {i1 = "ORIGINAL FOR BUYER";}
				                       else if ( i == 2 ) {i1 = "DUPLICATE FOR TRANSPORT";}
				                       else if ( i == 3 ) {i1 = "TRIPLICATE FOR ASSESSEE";}
		//                                       else  {i1 = "EXTRA COPY";}                                   
                                                       var p4 = "&displayword=" + encodeURIComponent(i1);
						       var param = (p1 + p2 + p3 + p4  );  

                                                       if (invtype == "B") {  
//alert(milltype);
                                                          if (milltype == "S")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlank.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "K")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankKarishma.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "A")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankAndal.rptdesign&__format=pdf'+ param); 


                                                       }
                                                       else 
                                                       if (invtype == "N") {  
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                                                       }
                                                       else { 
                                                       if (tcs !='' && einv == "Y" )  
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf'+ param); 
                                                       else
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
                                                      }   
                                                 }
                                      
                                              } 
					      else if (invprttype == 1) {
				                      i1 = "ORIGINAL FOR BUYER";
				                      var p4 = "&displayword=" + encodeURIComponent(i1);
						      var param = (p1 + p2 + p3 + p4 );  

                                                       if (invtype == "B") {  
                            
                                                          if (milltype == "S")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlank.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "K")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankKarishma.rptdesign&__format=pdf'+ param); 
                                                         else if (milltype == "KT")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankKarishmaTexttiles.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "A")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankAndal.rptdesign&__format=pdf'+ param); 
                                                         else if (milltype == "HKM")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankHariKrishnaMahal.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "JJ")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankJeyanthandJeyanthi.rptdesign&__format=pdf'+ param); 
                                                          else if (milltype == "XOOG")
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoiceBlankXOOG.rptdesign&__format=pdf'+ param); 

                                                       }
                                                       else
                                                       {        
                                                      if (tcs !='' && einv == "Y" )  
						      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf'+ param);
                                                      else
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 
  
                                                      }   
				              }     
					      else if (invprttype == 2) {
				                      i1 = "DUPLICATE FOR TRANSPORT";
				                      var p4 = "&displayword=" + encodeURIComponent(i1);
						      var param = (p1 + p2 + p3  + p4 ); 
                                                        if (tcs !='' && einv == "Y" )     
						      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                                       else
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

				              } 
					      else if (invprttype == 3) {
				                      i1 = "TRIPLICATE FOR ASSESSEE";
				                      var p4 = "&displayword=" + encodeURIComponent(i1);
						      var param = (p1 + p2 + p3  + p4 );    
                                                      if (tcs !='' && einv == "Y" )  
						      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                                       else
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

				               }
					      else if (invprttype == 4) {
				                      i1 = "EXTRA COPY";
				                      var p4 = "&displayword=" + encodeURIComponent(i1);
						      var param = (p1 + p2 + p3  + p4 );    
                                                      if (tcs !='' && einv == "Y" )  
						      window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvQRCODE.rptdesign&__format=pdf&__format=pdf'+ param); 
                                                       else
				                          window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesInvoice.rptdesign&__format=pdf'+ param); 

				               }  
                                        } 
				 });	
                               }

                    	}
		         else if (salrep == "pckslp1") {
				if(cmbinvno.getValue()==0) 
				{
				Ext.MessageBox.alert("Alert", "Select Invoice No");
				}
				else
				{
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&invno=" + encodeURIComponent(cmbinvno.getRawValue());                                
                                var param = (p1 + p2 + p3 );  
//				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_packingslip.rptdesign&__format=pdf'+ param);                                
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_packingslip.rptdesign&__format=pdf'+ param);                                
	
		                }		         
		         }
		         else if (salrep == "packslipbundle") {
				if(cmbinvno.getValue()==0) 
				{
				Ext.MessageBox.alert("Alert", "Select Invoice No");
				}
				else
				{
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&invno=" + encodeURIComponent(cmbinvno.getRawValue());                                
                                var param = (p1 + p2 + p3 );  
//				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_packingslip.rptdesign&__format=pdf'+ param);                                
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_packingslip_bundle.rptdesign&__format=pdf'+ param);                                
	
		                }		         
		         }


			}


                    }

                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                    RepInvoiceprintWindow.hide();
                        }
                }]
        },
        items: [



            { xtype   : 'fieldset',
                title   : 'Print Type',
                layout  : 'hbox',
                border  : true,
                height  : 70,
                width   : 500,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,

                items:[optInvoiceType]
            },   

            { xtype   : 'fieldset',
                title   : 'Invoice Print',
                layout  : 'hbox',
                border  : true,
                height  : 320,
                width   : 500,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 90,

                items:[
                                      { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 350,
                                	x           : 1,
                                	y           : 1,
                                    	border      : false,
                                	items: [optrep]
                            		},

                                      { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 10,
                                	width       : 200,
                                	x           : 250,
                                	y           : 1,
                                    	border      : false,
                                	items: [optinvprttype]
                            		},

                                      { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 350,
                                	x           : 30,
                                	y           : 220,
                                    	border      : false,
                                	items: [cmbinvno]
                            		},
                                      { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 255,
                                	x           : 30,
                                	y           : 210,
                                    	border      : false,
                                	items: [dtpgpdate]
                            		} ,                     		
					
					
                ]

            }, optMill ,


            { xtype   : 'fieldset',

                layout  : 'hbox',
                border  : true,
                height  : 230,
                width   : 650,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 550,
                y       : 280,
               items:[flxInvoice]  
            },   

        ],
    });
    
   
    var RepInvoiceprintWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'Invoice Print',
        items       : RepInvoicePrintFormPannel,
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

//alert("Hello");
               Ext.getCmp('optMill').hide(true);
               Ext.getCmp('dtpgpdate').hide(true);
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
                                 invstate  : "TN",
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });	


				 loadInvoiceNolistDataStore.load({
                		 url: 'ClsTrnSalesInvoicePrint.php', 
                        	 params:
                       		 {
                         	 task:"loadInvoiceList",
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });	


	
	   			 }
			
		}
    });
    RepInvoiceprintWindow.show();  
});
