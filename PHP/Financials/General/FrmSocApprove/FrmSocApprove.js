Ext.onReady(function() {
Ext.QuickTips.init();

   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var GinYear = localStorage.getItem('gstyear');
   var userid = localStorage.getItem('ginuser');
var gstFlag;


var SOCDatastore = new Ext.data.Store({
	id: 'SOCDatastore',
	proxy: new Ext.data.HttpProxy({
		  url: 'clsSOCApprove.php',      // File to connect to
		  method: 'POST'
	      }),
	      baseParams:{task: "loadSOCdet"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		    // we tell the datastore where to get his data from
	  root: 'results',
	  totalProperty: 'total',
	  id: 'id'
	},[
	  'ordh_comp_code', 'ordh_fincode', 'ordh_ackno', 'ordh_ackdate', 'ordh_ref', 'ordh_refdt', 'ordh_party', 'ordh_type', 'ordh_trans', 'ordh_rep', 'ordh_tax', 'ordh_odiper', 'ordh_docu', 'ordh_bank', 'ordh_dest', 'ordh_can_stat', 'ordh_can_reason', 'ordh_cust_rem', 'ordh_our_rem', 'ordh_ins_yn', 'ordh_insper', 'ordh_agent', 'ordh_delivery_add1', 'ordh_delivery_add2', 'ordh_delivery_add3', 'ordh_delivery_city', 'ordh_delivery_pin', 'ordh_delivery_gst', 'ordh_gracedays', 'ordh_cashdisdays1', 'ordh_cashdisdays2', 'ordh_cashdisdays3', 'ordh_cashdisdays4', 'ordh_cashdisper1', 'ordh_cashdisper2', 'ordh_cashdisper3', 'ordh_cashdisper4', 'ordh_cashdisamt1', 'ordh_cashdisamt2', 'ordh_cashdisamt3', 'ordh_cashdisamt4', 'ordh_cgst', 'ordh_sgst', 'ordh_igst', 'ordh_frt', 'ordh_bedper', 'cancelflag', 'ordt_comp_code', 'ordt_fincode', 'ordt_ackno', 'ordt_var_code', 'ordt_qty', 'ordt_adv_qty', 'ordt_units', 'ordt_rappr_no', 'ordt_rate', 'ordt_cappr_no', 'ordt_comm', 'ordt_dappr_no', 'ordt_cash_dis', 'ordt_cashtag', 'ordt_dealer_dis', 'ordt_dealertag', 'ordt_reel_dis', 'ordt_reeltag', 'ordt_reg_dis', 'ordt_regtag', 'ordt_addnl_dis', 'ordt_addnltag', 'ordt_qcdev_yn', 'ordt_loss_pmt', 'ordt_despdt', 'ordt_crdays', 'ordt_clo_stat', 'ordt_clo_reason', 'ordt_adv_tag', 'ordt_des_tag', 'ordt_approved', 'ordt_ma_tag', 'cancelflag', 'cust_code', 'cust_led_code', 'cust_ref', 'cust_name', 'cust_add1', 'cust_add2', 'cust_add3', 'cust_city', 'cust_state', 'cust_country', 'cust_zip', 'cust_phone', 'cust_fax', 'cust_email', 'cust_web', 'cust_cont', 'cust_tngst', 'cust_tngstdt', 'cust_cst', 'cust_cstdate', 'cust_taxtag', 'cust_cr_days', 'cust_gr_days', 'cust_cr_limit', 'cust_agent', 'cust_repr', 'cust_group', 'cust_dest', 'cust_rep', 'cust_range', 'cust_division', 'cust_eccno', 'cust_type', 'cust_rnino', 'cust_agtgrp', 'cust_panno', 'cust_tinno', 'cust_shortname', 'cust_gstin', 'cancelflag', 'tax_code', 'tax_name', 'tax_shortname', 'tax_invtype', 'tax_type', 'tax_sal_led_code', 'tax_sgst_ledcode', 'tax_cgst_ledcode', 'tax_igst_ledcode', 'tax_sgst', 'tax_cgst', 'tax_igst', 'cancelflag', 'agentname', 'var_code', 'var_name', 'var_grpcode', 'var_unit', 'var_size1', 'var_size2', 'var_reams', 'var_sheets', 'var_tariffno', 'cancelflag', 'var_desc'
	]),
	//sortInfo:{field: 'led_name', direction: "ASC"}
});

var dgrecord = Ext.data.Record.create([]);
var flxsocData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 1040,
        x: 0,
        y: 0,        
  
        columns: [   
            {header: "SOC NO", dataIndex: 'socno',sortable:true,width:80,align:'left'}, 
            {header: "DATE", dataIndex: 'socdate',sortable:true,width:80,align:'left'},  
            {header: "CUSTOMER", dataIndex: 'customer',sortable:true,width:200,align:'left'},
            {header: "VARIETY", dataIndex: 'variety',sortable:true,width:150,align:'left'}, 
            {header: "Size Code", dataIndex: 'size_code',sortable:true,width:70,align:'left'}, 
            {header: "Size", dataIndex: 'size',sortable:true,width:100,align:'left'},
            {header: "Quantity", dataIndex: 'qty',sortable:true,width:60,align:'left'},
            {header: "Rate", dataIndex: 'rate',sortable:true,width:50,align:'left'},
            {header: "Cash. Disc", dataIndex: 'cash_disc',sortable:true,width:70,align:'left'},
            {header: "Inv. Upd.", dataIndex: 'cash_inv_upd',sortable:true,width:40,align:'left'},
            {header: "Dealer. Disc", dataIndex: 'dealer_disc',sortable:true,width:70,align:'left'},
            {header: "Inv. Upd.", dataIndex: 'dealer_inv_upd',sortable:true,width:40,align:'left'},
            {header: "Reel Rebate", dataIndex: 'reel_rebate',sortable:true,width:70,align:'left'},
            {header: "Inv. Upd.", dataIndex: 'reelreb_inv_upd',sortable:true,width:40,align:'left'},
            {header: "Region Disc", dataIndex: 'reg_disc',sortable:true,width:70,align:'left'},       
            {header: "Inv. Upd.", dataIndex: 'reg_inv_upd',sortable:true,width:40,align:'left'},
            {header: "Addnl. Disc", dataIndex: 'addnl_disc',sortable:true,width:70,align:'left'},
            {header: "Inv. Upd.", dataIndex: 'addnl_inv_upd',sortable:true,width:40,align:'left'},
            {header: "Commiss", dataIndex: 'commiss',sortable:true,width:70,align:'left'},
            {header: "CR. Days", dataIndex: 'cr_days',sortable:true,width:70,align:'left'},
            {header: "NMR", dataIndex: 'nmr',sortable:true,width:50,align:'left'},
            {header: "Ins %", dataIndex: 'ins',sortable:true,width:50,align:'left'},
            {header: "CGST %", dataIndex: 'cgst',sortable:true,width:60,align:'left'},
            {header: "SGST %", dataIndex: 'sgst',sortable:true,width:60,align:'left'},
            {header: "IGST %", dataIndex: 'igst',sortable:true,width:50,align:'left'},
            {header: "QC.D(y/n)", dataIndex: 'qc_dev',sortable:true,width:70,align:'left'},
            {header: "Approved", dataIndex: 'approve',sortable:true,width:70,align:'left'},
            {header: "LOP RATE", dataIndex: 'lop_rate',sortable:true,width:70,align:'left'},            

        ],
store:[],//SOCDatastore,
listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){

		var sm = flxsocData.getSelectionModel();
		var selrow = sm.getSelected();
		var qcdev = (selrow.get('qc_dev'));
		var apprv = (selrow.get('approve'));
		
		if (selrow != null){
			editrow = selrow;
			
			flxsocData.getSelectionModel().selectAll();
		        var selrows = flxsocData.getSelectionModel().getCount();
		        var sel = flxsocData.getSelectionModel().getSelections();
		        var idx = flxsocData.getStore().indexOf(editrow);

			if (qcdev == "Y"){
				sel[idx].set('qc_dev', "N");
			}
			else {
				sel[idx].set('qc_dev', "Y");			
			}
			
			if (apprv == "Y"){
				sel[idx].set('approve', "N");
			}
			else {
				sel[idx].set('approve', "Y");			
			}			
			
		}
    	}
}
});
	

var txtpasswd = new Ext.form.NumberField({
        fieldLabel  : 'Password',
        id          : 'txtpasswd',
        name        : 'txtpasswd',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	        
});

var txtoldpasswd = new Ext.form.NumberField({
        fieldLabel  : 'Enter Old Password',
        id          : 'txtoldpasswd',
        name        : 'txtoldpasswd',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	        
});

var txtnewpasswd = new Ext.form.NumberField({
        fieldLabel  : 'Enter New Password',
        id          : 'txtnewpasswd',
        name        : 'txtnewpasswd',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	        
});

var txtconfpasswd = new Ext.form.NumberField({
        fieldLabel  : 'Enter Confirm Password',
        id          : 'txtconfpasswd',
        name        : 'txtconfpasswd',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	        
});

var btnApprove = new Ext.Button({
        icon	:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 60,
        text    : "APPROVE",
        x       : 200,
        y       : 230,
    	listeners:{
        click: function(){    
		var addok;
		addok ="true";
		
            var socData = flxsocData.getStore().getRange();                                        
            var socupdData = new Array();
            Ext.each(socData, function (record) {
                socupdData.push(record.data);
            });

            Ext.Ajax.request({
            url: 'FrmSocApproveSave.php',
            params :
             {
             	griddet	: Ext.util.JSON.encode(socupdData),
		cnt		: socData.length,
		compcode	: Gincompcode,
		finid		: GinFinid,
		},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Financials Approved the SOC Successfully -" + obj['socno']);
                                    
                                    flxsocData.getStore().removeAll();
				     
                                   
                                  }else
				  {
			Ext.MessageBox.alert("GRN Not Saved! Pls Check!- " + obj['socno']);                                                  
                                    }
                                }
                           });		
		

            
  }
}
});

var btnsub = new Ext.Button({
        icon	:'/WorkOrder/icons/download.gif',
        style   : 'text-align:center;',
        width   : 60,
        text    : "SUBMIT",
        x       : 250,
        y       : 80,
    	listeners:{
        click: function(){    
          	var addok;
	              addok ="true";

	          	       refresh();

            
  }
}
});

var SocApproveFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'SOC APPROVAL',
        width       : 630,
        height      : 460,
        bodyStyle   : {"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'SocApproveFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                /*{
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                },'-',*/
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                   
                  }
                }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            FrmSocApproveWindow.hide();
                        }
                    }
                },'-',
                {
                    text: 'Forget Password',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            //FrmSocApproveWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
                
		{xtype	: 'fieldset',
                title	: '',
                layout : 'hbox',
                border	:true,
                height	:400,
                width	:1070,
                layout : 'absolute',
                x: 10,
                y: 0,
             items:[
             		flxsocData,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 190,
				x           : 10,
				y           : 220,
				border      : false,
				items       : [txtpasswd]
			},btnApprove,
			             
                	]
		  },
		{xtype	: 'fieldset',
                title	: 'Password Change',
                layout : 'hbox',
                border	:true,
                height	:160,
                width	:350,
                layout : 'absolute',
                x: 700,
                y: 210,
             	items:[
             		{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 240,
				x           : 0,
				y           : -10,
				border      : false,
				items       : [txtoldpasswd]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 240,
				x           : 0,
				y           : 30,
				border      : false,
				items       : [txtnewpasswd]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 240,
				x           : 0,
				y           : 70,
				border      : false,
				items       : [txtconfpasswd]
			},btnsub,
             	
            	   ]
            	 }
		]
               });

     var FrmSocApproveWindow = new Ext.Window({
        height      : 500,
        width       : 1100,
        y           : 60,
        layout      : 'fit',
        items       : SocApproveFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        bodyStyle:{"background-color":"#d7d5fa"},
        listeners:
	{
	show : function() {
		SOCDatastore.removeAll();
		SOCDatastore.load({
			url: 'clsSOCApprove.php',
			params:
			{
				task:"loadSOCdet",
				compcode:Gincompcode,
				finid : GinFinid
			},
			callback : function() {
				var RowCnt = SOCDatastore.getCount();
				var i;
				for (i=0;i<RowCnt;i++){
			
				flxsocData.getStore().insert(
				flxsocData.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
					socno : SOCDatastore.getAt(i).get('ordh_ackno'), 
					socdate : SOCDatastore.getAt(i).get('ordh_ackdate'),  
					customer : SOCDatastore.getAt(i).get('cust_ref'),
					variety : SOCDatastore.getAt(i).get('var_desc'), 
					size_code : SOCDatastore.getAt(i).get('ordt_var_code'), 
					size : SOCDatastore.getAt(i).get('var_name'),
					qty : Ext.util.Format.number(SOCDatastore.getAt(i).get('ordt_qty'),"0.0"),
					rate : SOCDatastore.getAt(i).get('ordt_rate'),
					cash_disc : SOCDatastore.getAt(i).get('ordt_cash_dis'),
					cash_inv_upd : SOCDatastore.getAt(i).get('ordt_cashtag'),
					dealer_disc : SOCDatastore.getAt(i).get('ordt_dealer_dis'),
					dealer_inv_upd : SOCDatastore.getAt(i).get('ordt_dealertag'),
					reel_rebate : SOCDatastore.getAt(i).get('ordt_reel_dis'),
					reelreb_inv_upd : SOCDatastore.getAt(i).get('ordt_reeltag'),
					reg_disc : SOCDatastore.getAt(i).get('ordt_reg_dis'),       
					reg_inv_upd : SOCDatastore.getAt(i).get('ordt_regtag'),
					addnl_disc : SOCDatastore.getAt(i).get('ordt_addnl_dis'),
					addnl_inv_upd : SOCDatastore.getAt(i).get('ordt_addnltag'),
					commiss : SOCDatastore.getAt(i).get('ordt_comm'),
					cr_days : SOCDatastore.getAt(i).get('ordt_crdays'),
					nmr : (SOCDatastore.getAt(i).get('ordt_rate') - SOCDatastore.getAt(i).get('ordt_cash_dis') - SOCDatastore.getAt(i).get('ordt_dealer_dis') - SOCDatastore.getAt(i).get('ordt_reel_dis') - SOCDatastore.getAt(i).get('ordt_reg_dis') - SOCDatastore.getAt(i).get('ordt_addnl_dis') - SOCDatastore.getAt(i).get('ordt_comm')),
					ins : SOCDatastore.getAt(i).get('ordh_insper'),
					cgst : SOCDatastore.getAt(i).get('tax_cgst'),
					sgst : SOCDatastore.getAt(i).get('tax_sgst'),
					igst : SOCDatastore.getAt(i).get('tax_igst'),
					qc_dev : SOCDatastore.getAt(i).get('ordt_qcdev_yn'),
					approve : SOCDatastore.getAt(i).get('ordt_approved'),
					lop_rate : SOCDatastore.getAt(i).get('ordt_loss_pmt'), 					

				    	})
				    	);
				}
			
			}
		});
	}                
	}
    });
       FrmSocApproveWindow.show();
});
