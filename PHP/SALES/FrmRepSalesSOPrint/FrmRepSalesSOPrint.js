Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
 var invprttype = "1";
var invstate = "TN";
var fm = Ext.form;
var salrep = "soprint";	
var sno =1, upd = 0, seqno1, varty1, sno1, sno2, party, wt1, wt2, n1, g1, n2, g2, rsize1, rsize2, chk, slipno, invno1, vcode,
rg1size, s1, s2, r1 = 0, r2 =0, invdt, d1, d2;

 var loadinvoiceprint = new Ext.data.Store({
      id: 'loadinvoiceprint',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSONOlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['ordh_sono',
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



function savedata()
{

}

 var cmbSONOFrom = new Ext.form.ComboBox({
        fieldLabel      : 'SO No ',
        width           : 150,
        displayField    : 'ordh_sono',
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONOFrom',
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

        }
        }
   });
   
var cmbSONOTo = new Ext.form.ComboBox({
        fieldLabel      : 'SO No To',
        width           : 150,
        displayField    : 'ordh_sono',
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONOTo',
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

        }
        }
   });

var dgrecord = Ext.data.Record.create([]);


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
            {boxLabel: 'Sales Order Printing ' , name: 'optrep', id:'optinvTN', inputValue: 7,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){

                     
                     		loadinvoiceprint.removeAll();
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadSONOlist",
    
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });	
				 salrep = "soprint";	
	   			                      
                     }
                 }
               }
            },
          

                                
        ]


    },
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

 
   
   var RepInvoicePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SALES ORDER Print',
        header      : false,
        width       : 827,	
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


                               if ( salrep == "soprint") {

				if(cmbSONOFrom.getValue()==0) 
				{
				Ext.MessageBox.alert("Alert", "Select SO No");
				}
//				if(cmbSONOFrom.getValue() > cmbSONOTo.getValue())
			       //{
//				Ext.MessageBox.alert("Alert", "End Number Should be Greater than From Number");	
//			       }

				else
				{
				var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				var p2 = "&fincode=" + encodeURIComponent(GinFinid);
				var p3 = "&fromno=" + encodeURIComponent(cmbSONOFrom.getRawValue());  
				var p4 = "&tono=" + encodeURIComponent(cmbSONOFrom.getRawValue());  
                                      
                                var param = (p1 + p2 + p3 + p4 );  
				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_so_printing.rptdesign&__format=pdf'+ param);                                
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
                title   : 'SALES ORDER Print',
                layout  : 'hbox',
                border  : true,
                height  : 300,
                width   : 400,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,

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
                                	labelWidth  : 130,
                                	width       : 350,
                                	x           : 30,
                                	y           : 90,
                                    	border      : false,
                                	items: [cmbSONOFrom]
                            		},
/*
					{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 350,
                                	x           : 30,
                                	y           : 130,
                                    	border      : false,
                                	items: [cmbSONOTo]
                            		},
*/
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

            }, //flxBundle
            
        ],
    });
    
   
    var RepInvoiceprintWindow = new Ext.Window({
	height      : 400,
        width       : 440,
        y           : 35,
        title       : 'SALES ORDER Print',
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
                                 Ext.getCmp('dtpgpdate').hide(true);
				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadSONOlist",
                                // invstate  : "TN",
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });		
	   			 }
			
		}
    });
    RepInvoiceprintWindow.show();  
});
