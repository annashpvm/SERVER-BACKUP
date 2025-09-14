Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var gstFlag = "Add";
   var ratebf14,ratebf16,ratebf18,ratebf20,ratebf22,ratebf24,ratebf26,ratebf28,ratebf30,ratebf32 = 0;
   var colname;




 var custcode = 0;
 var custname = 0;


 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref'
 

      ]),
    });

 var loadOldPriceListDatastore = new Ext.data.Store({
      id: 'loadOldPriceListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllPriceList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'rate_comp_code', 'rate_fincode', 'rate_code', 'rate_type', 'rate_appr_date', 'rate_wef', 'rate_cust', 'rate_vartype', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_rate', 'rate_bitreel', 'rate_crdays', 'rate_cashdisc_per', 'rate_cashdisc_days', 'rate_gst_per', 'rate1_gsmfrom', 'rate1_gsmto', 'rate2_gsmfrom', 'rate2_gsmto', 'rate2_extraamt', 'rate3_gsmfrom', 'rate3_gsmto', 'rate3_extraamt', 'rate4_gsmfrom', 'rate4_gsmto', 'rate4_extraamt', 'rate_othershades', 'rate_approved', 'rate_close', 'rate_bf14_bit', 'rate_bf16_bit', 'rate_bf18_bit', 'rate_bf20_bit', 'rate_bf22_bit', 'rate_bf24_bit', 'rate_bf26_bit', 'rate_bf28_bit', 'rate_bf30_bit', 'rate_bf32_bit', 'rate_payterm_30days_cdamt', 'rate_payterm_60days_cdamt1', 'rate_payterm_60days_cdamt2', 'vargrp_type_code', 'vargrp_type_name', 'vargrp_type_short_code', 'vargrp_type_hsncode','rateapprdate'

      ]),
    });


function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: '/SHVPM/SALES/ClsSalesMain.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}

var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();


             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
          },
	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
		  flxParty.getEl().setStyle('z-index','10000');
		  flxParty.show();
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });


   var flxPrice = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 300,
        width: 1200,
        id : 'flxPrice',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Appr No.", dataIndex: 'rate_code',sortable:true,width:80,align:'center'},   
		{header: "Appr Date", dataIndex: 'rateapprdate',sortable:true,width:130,align:'center'},
		{header: "Quality", dataIndex: 'vargrp_type_name',sortable:true,width:130,align:'left'},
		{header: "14 BF", dataIndex: 'rate_bf14',sortable:true,width:80,align:'right'},
		{header: "16 BF", dataIndex: 'rate_bf16',sortable:true,width:110,align:'right'},
		{header: "18 BF", dataIndex: 'rate_bf18',sortable:true,width:80,align:'right'},
		{header: "20 BF", dataIndex: 'rate_bf20',sortable:true,width:80,align:'right'},
		{header: "22 BF", dataIndex: 'rate_bf22',sortable:true,width:80,align:'right'},
		{header: "24 BF", dataIndex: 'rate_bf24',sortable:true,width:80,align:'right'},
		{header: "26 BF", dataIndex: 'rate_bf26',sortable:true,width:80,align:'right'},
		{header: "28 BF", dataIndex: 'rate_bf28',sortable:true,width:80,align:'right'},
		{header: "30 BF", dataIndex: 'rate_bf30',sortable:true,width:80,align:'right'},

        ],
        store:loadOldPriceListDatastore,

    listeners:{	
        'cellclick' : function(flxPrice, rowIndex, cellIndex, e){
		var sm = flxPrice.getSelectionModel();
		var selrow = sm.getSelected();
		if ((selrow != null)){
			gridedit = "true";
			editrow = selrow;
			apprno = selrow.get('rate_code');
			loadPriceListDetailDatastore .load({
				url: 'ClsMasSalesRate.php',
				params: {
				    task     : 'loadPriceList',
				    party    : custcode,
				    compcode : Gincompcode,
				    finid    : GinFinid,
                                    apprno   : apprno 
				},
		 	        callback:function()
				{ 

                                   var cnt=loadPriceListDetailDatastore.getCount();
	                           if(cnt>0)
		                   {    
                                        txtOldApprovalNo.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_code'));           
                                        dtpOldApproval.setRawValue(Ext.util.Format.date(loadPriceListDetailDatastore.getAt(0).get('rate_appr_date'),"d-m-Y"));   
					txtBF14rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf14'));
					txtBF16rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf16'));
					txtBF18rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf18'));
					txtBF20rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf20'));
					txtBF22rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf22'));
					txtBF24rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf24'));
					txtBF26rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf26'));
					txtBF28rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf28'));
					txtBF30rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf30'));
					txtGSMrate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_rate'));

                                   }     
				}
			});

		}


		}
 
    
   }
   });


var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 320,
        x: 148,
        y: 60,
        id : 'flxParty',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
		var sm = flxParty.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('cust_code'));
                custcode = 0;
		if ((selrow != null)){
			gridedit = "true";
			editrow = selrow;
			custcode = selrow.get('cust_code');
			custname = selrow.get('cust_ref');
                        txtCustomer.setRawValue(selrow.get('cust_ref'));
                        flxParty.hide();  
//                        FlxReel.getStore().removeAll();
			loadOldPriceListDatastore .load({
				url: 'ClsMasSalesRate.php',
				params: {
				    task: 'loadAllPriceList',
				    party: custcode,
				    compcode : Gincompcode,
				    finid    : GinFinid
				},
		 	        callback:function()
				{ 
 
                                        txtOldApprovalNo.setValue('');           
					txtBF14rate.setValue('');
					txtBF16rate.setValue('');
					txtBF18rate.setValue('');
					txtBF20rate.setValue('');
					txtBF22rate.setValue('');
					txtBF24rate.setValue('');
					txtBF26rate.setValue('');
					txtBF28rate.setValue('');
					txtBF30rate.setValue('');

   
				}


			});

		}

                        }
                     });
             },
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
		var sm = flxParty.getSelectionModel();
		var selrow = sm.getSelected();
		var chkitem = (selrow.get('cust_code'));
                custcode = 0;
		if ((selrow != null)){
			gridedit = "true";
			editrow = selrow;
			custcode = selrow.get('cust_code');
			custname = selrow.get('cust_ref');
                        txtCustomer.setRawValue(selrow.get('cust_ref'));
                        flxParty.hide();  
//                        FlxReel.getStore().removeAll();
			loadOldPriceListDatastore .load({
				url: 'ClsMasSalesRate.php',
				params: {
				    task: 'loadAllPriceList',
				    party: custcode,
				    compcode : Gincompcode,
				    finid    : GinFinid
				},
		 	        callback:function()
				{ 
 
                                        txtOldApprovalNo.setValue('');           
					txtBF14rate.setValue('');
					txtBF16rate.setValue('');
					txtBF18rate.setValue('');
					txtBF20rate.setValue('');
					txtBF22rate.setValue('');
					txtBF24rate.setValue('');
					txtBF26rate.setValue('');
					txtBF28rate.setValue('');
					txtBF30rate.setValue('');

   
				}


			});

		}


		}
 
    
   }
   });



   var MasSalesRatePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesRatePanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
            items: [
		   {
			    text: ' VIEW',
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
                                    RefreshData();
				}
			    }
		   },'-',
              ] 
            },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 1310,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 0,	
                items:[

                     { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 600,
                           x           : 0,
                           y           : 30,
                           border      : false,
                           items: [txtCustomer]
                   },	 flxParty,

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 150,
                             width       : 1350,
                             x           : 10,
                             y           : 80,
                             border      : false,      
         
                             items: [flxPrice]
                      },

                ]
            }
        ]    
    });

      function RefreshData(){
         flxParty.hide();
      }   


    var MasSalesRateWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//        x           : 50,
        y           : 35,
        title       : 'SALES - PRICE MASTER VIEW',
        items       : MasSalesRatePanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDRD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
           show:function(){
                       RefreshData();
//alert(Gincompcode);
//alert(GinFinid);
/*
			findRateEntryNodatastore.removeAll();
			findRateEntryNodatastore.load({
			 url: 'ClsMasSalesRate.php',
		                params: {
                	    	   task: 'findRateEntryNo',
                                   compcode:Gincompcode,
                                   finid:GinFinid   
                	         },
				 callback:function()
   	               		   {

                     	               txtApprovalNo.setValue(findRateEntryNodatastore.getAt(0).get('rateno'));
                                   } 
  			  });
*/
                 }

      }
    });
    MasSalesRateWindow.show();  
});
