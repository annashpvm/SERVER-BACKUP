Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var GinYear = localStorage.getItem('gstyear');
var GinFinst = localStorage.getItem('gfinstdate');
var GinFined = localStorage.getItem('gfineddate');
var usertype = localStorage.getItem('ginuser');
var gstStatus = "N";
//var Hdeptname = 'IT DEPARTMENT';
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var reelstr2="",j=0;

var reel = 0;
var varcode = 0;
var fyear = 0;

var itemcode =0,wt=0;

var gstFlag ="Add";
var st_no,end_no,i,stfyr;
var bundle = 0, reel = 0, wt = 0, no_reels = 0, tfwt =0;
var firstno = 0;
var lastno = 0;
var csr="";

 var loadsalcustomerdatastore = new Ext.data.Store({
      id: 'loadsalcustomerdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalcustomer"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_ref'
 
      ]),
    });


 var loadsalchkstnoDS = new Ext.data.Store({
      id: 'loadsalchkstnoDS',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalchkctno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'cust_code', 'cust_ref'
 
      ]),
    });

 var loadsaladvicestore = new Ext.data.Store({
      id: 'loadsaladvicestore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsaladvice"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'stk_comp_code', 'stk_finyear', 'stk_ent_no', 'stk_ent_date', 'stk_var_code', 'stk_units', 'stk_sr_no', 'stk_wt', 'stk_loca', 'stk_slipno', 'stk_desdt', 'stk_destag', 'stk_retno', 'stk_retdt', 'stk_rettag', 'stk_deltag', 'stk_deldate', 'stk_tariffno', 'stk_Party', 'stk_Grade', 'stk_from', 'stk_refno', 'stk_brightness', 'stk_dcno', 'stk_dcdate', 'stk_mill', 'var_code', 'var_name', 'var_grpcode', 'var_unit', 'var_size1', 'var_size2', 'var_reams', 'var_sheets', 'var_tariffno'
 
      ]),
    });


 var loadsalDatastore = new Ext.data.Store({
      id: 'loadsalDatastore',
      //autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsaldata"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'var_name','stk_var_code','stk_units','var_desc','stk_sr_no','stk_wt','var_code'
 
      ]),
    });

var loadsaldelslipdatastore = new Ext.data.Store({
      id: 'loadsaldelslipdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsaldelslip"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'wpckh_no'
 
      ]),
    });

 var loadsalessocnodatastore = new Ext.data.Store({
      id: 'loadsalessocnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalessocno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'da_ackno'
 
      ]),
    });


 var loadsalesdespadnodatastore = new Ext.data.Store({
      id: 'loadsalesdespadnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesdespadno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'da_no','da_date'
 
      ]),
    });


 var loadsocdatastore = new Ext.data.Store({
      id: 'loadsocdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsocdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'ordh_dest','ordh_ackdate','var_code','var_name','var_desc','var_gsm','var_unit','var_size1','var_size2','da_desqty','da_slipqty'
 
      ]),
    });



 var loadreelnodatastore = new Ext.data.Store({
      id: 'loadreelnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadreelno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
         'stk_var_code', 'stk_units', 'stk_sr_no', 'stk_wt', 'stk_slipno', 'stk_desdt', 'stk_destag','stk_refno', 'stk_finyear'
      ]),
    });




 var loadwarehousereelsdatastore = new Ext.data.Store({
      id: 'loadwarehousereelsdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadwarehousepackslipreelno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where select da_date,da_ackno from trnsal_desp_advice where da_fincode = '21' and (da_desqty - da_slipqty) > 0  and da_close <> 'Y' and da_comp_code = '1' and da_no = '231' group by da_date,da_ackno order by da_date,da_ackno;to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'wpckt_fincode', 'wpckt_var', 'wpckt_sr_no','wpckt_wt','wpckt_srno_fincode'
 
      ]),
    });

/*
 var loadsalespartygrpdatastore = new Ext.data.Store({
      id: 'loadsalespartygrpdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalespartygrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'grp_code', 'grp_name', 'grp_agent'
 
      ]),
    });

 var loadsalesagentgrpdatastore = new Ext.data.Store({
      id: 'loadsalesagentgrpdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackslipPrepare.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesagentgrp"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'cust_code', 'cust_ref'
 
      ]),
    });*/


//var gstGroup;
//OUT SIDE


var txtdelslipno = new Ext.form.TextField({
	fieldLabel  : 'DELIVERY SLIP No',
	id          : 'txtdelslipno',
	name        : 'txtdelslipno',
	width       :  80,
	readOnly    : true,
	disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var dtslipdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtslipdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width      : 100,
    readOnly   : true,
});
var dtsocdate = new Ext.form.DateField({
    fieldLabel : 'SOC Date',
    id         : 'dtsocdate',
    displayField : 'da_date',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
    readOnly   : true,
});

var cmbcust = new Ext.form.ComboBox({
        fieldLabel      : 'CUSTOMER',
        width       	 :  370,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbcust',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalcustomerdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	
	flxDownloadlist.getStore().removeAll();
	flxpackslipraised.getStore().removeAll();
	flxpending.getStore().removeAll();
	flxstartno.getStore().removeAll();
	flxendno.getStore().removeAll();
	


        flxAdviceDetail.getStore().removeAll();
        cmbsocno.reset();
        cmbdespadno.reset();
        txtdestination.setValue('');
        //loadsalesdespadnodatastore.removeAll();

        loadsalessocnodatastore.removeAll();
        loadsalessocnodatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params:
		{
			task:"loadsalessocno",
			compcode: Gincompcode,
			finid: GinFinid,                        	 
			custno:cmbcust.getValue(),
			
			
		}
        });
        
	}
	}
});
var cmbsocno = new Ext.form.ComboBox({
        fieldLabel      : 'SOC No',
        width       	 :  150,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbsocno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalessocnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
        flxAdviceDetail.getStore().removeAll();
        loadsalesdespadnodatastore.removeAll();
        loadsalesdespadnodatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params:
		{
			task:"loadsalesdespadno",
			compcode: Gincompcode,
			finid: GinFinid,                        	 
			custno:cmbcust.getValue(),
			socno:cmbsocno.getValue()
			
			
		},
		callback : function() {
 		        var rb = "";
                        var sizename = "";
   		        dtsocdate.setRawValue(Ext.util.Format.date(loadsalesdespadnodatastore.getAt(0).get('da_date'),"d-m-Y"));
                        cmbdespadno.setRawValue(loadsalesdespadnodatastore.getAt(0).get('da_no'));
                        cmbdespadno.setValue(loadsalesdespadnodatastore.getAt(0).get('da_no'));

			loadsocdatastore.removeAll();
			loadsocdatastore.load({

			url: 'ClsTrnSalesPackslipPrepare.php', 
				params:
				{
					task:"loadsocdetails",
					compcode: Gincompcode,
					finid: GinFinid,                        	 
					custno:cmbcust.getValue(),
					socno:cmbsocno.getValue()
			
			
				},
				callback : function() {
                                     txtdestination.setRawValue(loadsocdatastore.getAt(0).get('ordh_dest'));
                                     var cnt=loadsocdatastore.getCount();
//alert(cnt);
                                     if(cnt>0)
		                     {                        
                                          for(var j=0; j<cnt; j++)
 		                          {    
//alert(j);        
                                             if (loadsocdatastore.getAt(j).get('var_unit') == 1)
                                             {
                                                  rb = "REELS";    
                                                  sizename =loadsocdatastore.getAt(j).get('var_size2');
                                             } 
                                             else
                                             {
                                                  rb = "BUNDLES";    
                                                  sizename =loadsocdatastore.getAt(j).get('var_size1')+" X "+  loadsocdatastore.getAt(j).get('var_size2');

                                             } 

                                             var RowCnt    = flxAdviceDetail.getStore().getCount()+1;   
                                             flxAdviceDetail.getStore().insert(
	                                     flxAdviceDetail.getStore().getCount(),
	                                       new dgrecord({

								item    : loadsocdatastore.getAt(j).get('var_code'),
								variety : loadsocdatastore.getAt(j).get('var_desc'), 
								unit    : rb,
								size    : sizename,   
								advqty  : loadsocdatastore.getAt(j).get('da_desqty'),
								despqty : loadsocdatastore.getAt(j).get('da_slipqty'),
								sizename: loadsocdatastore.getAt(j).get('var_name')

	                                              })
                               	            );

                                          }
                                     }

                                }
                        });         
                 } 
        });         



	}
	}
});

var cmbdespadno = new Ext.form.ComboBox({
        fieldLabel      : 'DESP ADVICE No',
        width       	 :  150,
        displayField    : 'da_no', 
        valueField      : 'da_no',
        hiddenName      : '',
        id              : 'cmbdespadno',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsalesdespadnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){



	}
	}
});
var dtdespaddate = new Ext.form.DateField({
    fieldLabel : 'ADV Date',
    id         : 'dtdespaddate',
    displayField : 'da_date',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    readOnly   : true,
    width : 100,
});
var txtdestination = new Ext.form.TextField({
	fieldLabel  : 'DESTINATION',
	id          : 'txtdestination',
	name        : 'txtdestination',
	width       :  370,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var txttruckno = new Ext.form.TextField({
	fieldLabel  : 'TRUCK No',
	id          : 'txttruckno',
	name        : 'txttruckno',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

   var dgrecord = Ext.data.Record.create([]);
   var flxAdviceDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 450,
        x: 20,
        y: 220,
             
        columns: [    
            {header: "Item", dataIndex: 'item', sortable:true,width:50,align:'left'}, //hidden:'true'}, 0      
            {header: "Variety", dataIndex: 'variety', sortable:true,width:200,align:'left'}, //hidden:'true'}, 1
            {header: "Unit",  dataIndex: 'unit', sortable:true,width:60,align:'left'}, //2
            {header: "Size",dataIndex: 'size', sortable:true,width:100,align:'left'},  //3                
            {header: "Adv Qty(T)",dataIndex: 'advqty', sortable:true,width:80,align:'left'},  //4
            {header: "Desp.Qty(T)",dataIndex : 'despqty', sortable:true,width:80,align:'left'}, //5
            {header: "Size Name",dataIndex : 'sizename', sortable:true,width:80,align:'left'}, //6

        ],
store:[], //loadsalcustlistdatastore,
    listeners:{	
        'dblclick' : function(flxDesc, rowIndex, cellIndex, e){


		var sm = flxAdviceDetail.getSelectionModel();
		var selrow = sm.getSelected();
 		gridedit = "true";
		editrow = selrow;
		var ad = 0;
		itemcode = selrow.get('item');

		despwt = (selrow.get('advqty') - selrow.get('despqty')) * 1000;
    		despwt = despwt + (despwt / 10);
		
		
	
		flxpending.getSelectionModel().selectAll();

		var selrows1 = flxpending.getSelectionModel().getCount();
		var sel1 = flxpending.getSelectionModel().getSelections();
flxstartno.getStore().removeAll();
flxendno.getStore().removeAll();
		flxstartno.getSelectionModel().selectAll();
		var stnoc = flxstartno.getSelectionModel().getCount();
		var stnod = flxstartno.getSelectionModel().getSelections();	
		var chkrc =0;
		for ( k=0;k<selrows1;k++){
			reel = sel1[k].data.reelpending;
			varcode = sel1[k].data.sizecode;
			fyear  = sel1[k].data.finyear;
			
			if (stnoc > 0){
			
				for (s=0;s<stnoc;s++){
				if ((sel1[k].data.sizecode == itemcode ) && ((varcode == stnod[s].data.sizecode) && (reel == stnod[s].data.startno))) {
					chkrc = 1;
				}

				}
				
				if (chkrc == 0){
					if (sel1[k].data.sizecode == itemcode ) {
						flxstartno.getStore().insert(
							flxstartno.getStore().getCount(),
							new dgrecord({
							    	startno  : reel, 
								sizecode : varcode,
								finyear  : fyear,  
							})
						);

							flxendno.getStore().insert(
							flxendno.getStore().getCount(),
							new dgrecord({
							    	endno: reel, 
								sizecode : varcode,
								finyear  : fyear,

							})
						);                    
					}
				}
				
			}
			else {
				if (sel1[k].data.sizecode == itemcode ) {
					flxstartno.getStore().insert(
						flxstartno.getStore().getCount(),
						new dgrecord({
						    	startno  : reel, 
							sizecode : varcode,
							finyear  : fyear,  
						})
					);

						flxendno.getStore().insert(
						flxendno.getStore().getCount(),
						new dgrecord({
						    	endno: reel, 
							sizecode : varcode,
							finyear  : fyear,

						})
					);                    
				}
			}
		}	


             	var Rowsr= flxstartno.getStore().getCount();
		flxstartno.getSelectionModel().selectAll();
csr = "";
		var selsr=flxstartno.getSelectionModel().getSelections();
		for(i=0;i<Rowsr;i++)
		{
             		 csr = csr + (selsr[i].data.startno) + ",";
             		 	
             	}
             	csr = csr.substring(0,(csr.length - 1));
             	
             	loadsalchkstnoDS.removeAll();
             	loadsalchkstnoDS.load({
             		url: 'ClsTrnSalesPackslipPrepare.php', 
				params:
				{
					task:"loadsalchkstno",
					compcode: Gincompcode,
					finid: GinFinid,
					sizecode : sizecode,
					reelno : reelno                     	 
			
				},
             	});
/*
		var selrows1 = flxpending.getSelectionModel().getCount();
		var sel1 = flxpending.getSelectionModel().getSelections();
		for ( k=0;k<selrows1;k++){
 		reel = sel1[k].data.reelpending;
		


		
        	fyear = 0;
        	var ad = 0;
        	if (reel > 0 && sizecode > 0) {
        		reelno = sel1[k].data.reelpending;
        		
			//loadsaladvicestore.removeAll();
			loadsaladvicestore.load({

			url: 'ClsTrnSalesPackslipPrepare.php', 
				params:
				{
					task:"loadsaladvice",
					compcode: Gincompcode,
					finid: GinFinid,
					sizecode : sizecode,
					reelno : reelno                     	 
			
				},
				callback : function() { 
				alert(loadsaladvicestore.getCount());
					while(ad < loadsaladvicestore.getCount()) {
						txtrefslipno.setValue(loadsaladvicestore.getAt(0).get('var_name'));
					} 
				}
			});      		
        		
        		
        	}
		

		reelstr2 = reelstr2 + "'" + reel +"'" + ",";	
		}

		reelstr2 = reelstr2.substring(0,(reelstr2.length - 1));			
*/
			
         }
     }
    

   });

var dgrecord = Ext.data.Record.create([]);
var flxData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 450,
        x: 20,
        y: 340,        
        columns: [   
            {header: "Item Ref", dataIndex: 'itemref',sortable:true,width:200,align:'left'}, //hidden:'true'},       
            {header: "Item Description", dataIndex: 'itemdesc',sortable:true,width:150,align:'left'},  //hidden:'true'},
            {header: "Units", dataIndex: 'unit',sortable:true,width:80,align:'left'},
            {header: "Number", dataIndex: 'num',sortable:true,width:140,align:'left'}, //hidden:'true'},
            {header: "Weight", dataIndex: 'weight',sortable:true,width:50,align:'left'}, //hidden:'true'},
            {header: "I.Code", dataIndex: 'icode',sortable:true,width:50,align:'left'},
            {header: "Unit Code", dataIndex: 'unitcode',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Prd Code", dataIndex: 'prdcode',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Fin.Year", dataIndex: 'finyear',sortable:true,width:80,align:'left',hidden:'true'},
            {header: "Fin.Code", dataIndex: 'fincode',sortable:true,width:50,align:'left',hidden:'true'},

        ],
store:[], //loadsalledgerlistdatastore,

    

   });
   
var txtdownloadnos = new Ext.form.TextField({
	fieldLabel  : 'DOWNLOAD LIST',
	id          : 'txtdownloadnos',
	name        : 'txtdownloadnos',
	width       :  60,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
  

var txtQRdownloadedlist = new Ext.form.TextArea({
	fieldLabel  : ' ',
	id          : 'txtQRdownloadedlist',
	name        : 'txtQRdownloadedlist',
	width       :  500,
        height      :  220,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:8px;font-weight:normal;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 



var txtpackslipraisednos = new Ext.form.TextField({
	fieldLabel  : 'SLIP RAISED',
	id          : 'txtpackslipraisednos',
	name        : 'txtpackslipraisednos',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});  
   
   
var txtpacklsraise = new Ext.form.TextField({
	fieldLabel  : 'PACKING SLIP ALREADY RAISED',
	id          : 'txtpacklsraise',
	name        : 'txtpacklsraise',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
/*
var dgrecord = Ext.data.Record.create([]);

var flxDownlsstData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 200,
        x: 20,
        y: 60,        
        columns: [   
            {header: "", dataIndex: 'itemref',sortable:true,width:195,align:'left'}, //hidden:'true'},       
        ],
store:[''], //loadsalledgerlistdatastore,

    

   }); 
      
*/
var dgrecord = Ext.data.Record.create([]);
var flxDownloadlist = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 140,
        x: 360,
        y: 30,        
        columns: [   
            {header: "Selected", dataIndex: 'itemreelno',sortable:true,width:195,align:'left'}, //hidden:'true'},      
            {header: "Size", dataIndex: 'sizecode',sortable:true,width:50,align:'left'}, //hidden:'true'},      
            {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      


        ],
store:[''], //loadsalledgerlistdatastore,

    

   });      

var dgrecord = Ext.data.Record.create([]);
var flxpackslipraised = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 250,
        width: 140,
        x: 520,
        y: 30,        
        columns: [   
            {header: "Slip -Raised", dataIndex: 'reelraised',sortable:true,width:195,align:'left'}, //hidden:'true'},       
            {header: "Size", dataIndex: 'sizecode',sortable:true,width:50,align:'left'}, //hidden:'true'},     
            {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      

        ],
store:[''], //loadsalledgerlistdatastore,
   });

var dgrecord = Ext.data.Record.create([]);
var flxpending = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 270,
        width: 200,
        x: 50,
        y: 30,        
        columns: [   
            {header: "Reels Balance", dataIndex: 'reelpending',sortable:true,width:195,align:'left'}, //hidden:'true'}, 
            {header: "Size", dataIndex: 'sizecode',sortable:true,width:50,align:'left'},
            {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      

        ],
store:[''], //loadsalledgerlistdatastore,
   });


var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "CHECK IN",
    width   : 50,
    height  : 30,
    x       : 20,
    y       : 265,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	    tabPackinglist.setActiveTab(1);tabPackinglist.setActiveTab(0);
		/*var stk = loadreelnodatastore.getCount();	
		for (i=0;i<dwldlen;i++){			
			if (loadreelnodatastore.getCount() > 0){			
				for(j=0;j<stk;j++){
					if (downloadlistval[i] == loadreelnodatastore.getAt(j).get('stk_refno')){
						flxDownloadlist.getStore().insert(
						flxDownloadlist.getStore().getCount(),
						new dgrecord({
						    	itemreelno: loadreelnodatastore.getAt(j).get('stk_sr_no'), 
						})
					);
						
					}
				}
			
			}
		
		}*/

            var reelrefno1 = '';
            var reelno = '';
            flxstartno.getStore().removeAll();
            flxendno.getStore().removeAll();
            flxDownloadlist.getStore().removeAll();
            flxpackslipraised.getStore().removeAll();
	    flxpending.getStore().removeAll();
		var downloadlistval =  txtQRdownloadedlist.getRawValue().split('\n');
		var dwldlen = txtQRdownloadedlist.getRawValue().split('\n').length - 1;
//		alert(downloadlistval);
		//var reelstr="";
		 var reelstr = new Array();
		
		var stk = loadreelnodatastore.getCount();	
		/*for (i=0;i<dwldlen;i++){			
		   reelstr = reelstr + "'" +downloadlistval[i] +"'" + ",";	
		}
		reelstr = reelstr.substring(0,(reelstr.length - 1));*/
		
		var pslip = 0;
		reelstr = downloadlistval;
		
		loadreelnodatastore.removeAll();
            	loadreelnodatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
			params:
			{
				task    :"loadreelno",
				compcode: Gincompcode,
				reelno : Ext.util.JSON.encode(downloadlistval),
	
			},
			callback : function(){
			
				var stk = loadreelnodatastore.getCount();
                                txtdownloadnos.setValue(stk);

				for(j=0;j<stk;j++){
					flxDownloadlist.getStore().insert(
					flxDownloadlist.getStore().getCount(),
					new dgrecord({
					    	itemreelno: loadreelnodatastore.getAt(j).get('stk_sr_no'), 
					    	sizecode: loadreelnodatastore.getAt(j).get('stk_var_code'), 
                                           	finyear : loadreelnodatastore.getAt(j).get('stk_finyear'), 

					})
					);
				}
				
				flxDownloadlist.getSelectionModel().selectAll();

				var selrows1 = flxDownloadlist.getSelectionModel().getCount();
				var sel1 = flxDownloadlist.getSelectionModel().getSelections();
				//var selrows1 = loadreelnodatastore.getCount();
				for ( k=0;k<selrows1;k++){
					reel = sel1[k].data.itemreelno;
				     reelstr2 = reelstr2 + "'" + reel +"'" + ",";	
				}
				
				reelstr2 = reelstr2.substring(0,(reelstr2.length - 1));
				
				loadwarehousereelsdatastore.removeAll();
				loadwarehousereelsdatastore.load({
				url: 'ClsTrnSalesPackslipPrepare.php', 
					params:
					{
						task    :"loadwarehousepackslipreelno",
						compcode: Gincompcode,
						reelno : reelstr2,
					},
					callback : function(){     
						
						for ( k=0;k<selrows1;k++){
						reel = sel1[k].data.itemreelno;
						varcode = sel1[k].data.sizecode;
                                                fyear = sel1[k].data.finyear;
						/*for (j=0;j<loadwarehousereelsdatastore.getCount();j++) {
							if (reel == loadwarehousereelsdatastore.getAt(j).get('wpckt_sr_no')){
								flxpackslipraised.getStore().insert(
								flxpackslipraised.getStore().getCount(),
								new dgrecord({
									reelraised: loadwarehousereelsdatastore.getAt(j).get('wpckt_sr_no'),
									sizecode: loadwarehousereelsdatastore.getAt(j).get('wpckt_var'),  
								})
								);
								reel =0;							
							}

						
						}*/

						if (reel>0) {
							flxpending.getStore().insert(
							flxpending.getStore().getCount(),
							new dgrecord({
								reelpending: reel,
                                                                sizecode   : varcode,
                                                                finyear    : fyear,
							})
							); 							
						
						}						
						}		 
					}
				}); 	

			}
		});

        }//click
    }//listener
});   

var txtreelbalance = new Ext.form.TextField({
	fieldLabel  : 'BALANCE TO BE RAISED',
	id          : 'txtreelbalance',
	name        : 'txtreelbalance',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

}); 
  
var txtrefslipno = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtrefslipno',
	name        : 'txtrefslipno',
	width       :  315,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});  

var dgrecord = Ext.data.Record.create([]);
var flxpackslipbalraisedData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 240,
        x: 20,
        y: 60,        
        columns: [   
            {header: "", Id: '',sortable:true,width:235,align:'left'}, //hidden:'true'}, 
            {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      
      
        ],
store:[''], //loadsalledgerlistdatastore,

    

   });
   
   
   
var dgrecord = Ext.data.Record.create([]);

var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 150,
        x: 320,
        y: 60,        
        columns: [   
           {header: "START NO", dataIndex: 'startno',sortable:true,width:145,align:'left'}, //hidden:'true'},  
           {header: "Size", dataIndex: 'sizecode',sortable:true,width:50,align:'left'}, //hidden:'true'}, 
           {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      
     
        ],
store:[], //loadsalledgerlistdatastore,
    listeners:{	

            dblclick :function () {
             loadsalDatastore.removeAll();
             //flxData.getStore().removeAll();
                var selected_rows = flxstartno.getSelectionModel().getSelections();

		
                for (i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.startno;
                     stfyr = selected_rows[i].data.finyear;
                     firstno = selected_rows[i].data.startno;
		    // txtStartNo.setRawValue(st_no);
                    // end_no = selected_rows[i].data.endno;
		    // txtEndNo.setRawValue(end_no);		     
                }  
                             
		
             /*	var Row= flxData.getStore().getCount();
		flxData.getSelectionModel().selectAll();

		var sel=flxData.getSelectionModel().getSelections();
		for(i=0;i<Row;i++)
		{
             		 wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
             	}
             
		loadsalDatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params: {
			task: 'loadsaldata',
			itemcode : itemcode,
			fincode  : GinFinid,
			compcode : Gincompcode,
			stno	 : st_no,
			stnoqry  : "chk1"
			
		},
		callback : function () {
			if (loadsalDatastore.getCount() == 0){
				alert ("Reel / Bundle No. does not exists for the selected variety in the Stock");
				st_no = 0;
				end_no = 0;
			}
		}
		
		});             
        



lastno = end_no;

		for(i=0;i<Row;i++)
		{
			if (sel[i].data.num == st_no && sel[i].data.unitcode == 1 && sel[i].data.fincode == stfyr ){
				alert("No. already exists");
				st_no = 0;
				return false;
			}
             	}

             	loadsalDatastore.removeAll();
		loadsalDatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params: {
			task: 'loadsaldata',
			itemcode : itemcode,
			fincode  : GinFinid,
			compcode : Gincompcode,
			stno	 : st_no,
			stfyr	 : stfyr,
			stnoqry  : "chk2"
			
		},
		callback : function () {
			if (loadsalDatastore.getCount() > 0){
			
			wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((loadsalDatastore.getAt(0).get('stk_wt')),"0.000"));
			
				if (gstFlag === "Add") {
		        		if( (wt) > despwt) {
						bundle = 0
						reel = 0
						wt = 0
						for(i=0;i<Row;i++) {
						if (sel[i].data.unitcode == 1){
							reel = reel + 1
						}
						else if (sel[i].data.unitcode  == 2){
							bundle = bundle + 1
						}
						wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
						}
					   alert ("Quantity greater than allowed quantity");
					   
		        		}
		    		}

            		
            			flxData.getStore().insert(
				flxData.getStore().getCount(),
					new dgrecord({

						itemref:loadsalDatastore.getAt(0).get('var_name'),
						itemdesc:loadsalDatastore.getAt(0).get('var_desc'),
						unit:"REELS",
						num : firstno,
						weight : Ext.util.Format.number(loadsalDatastore.getAt(0).get('stk_wt') , "0.000"),
						icode : loadsalDatastore.getAt(0).get('stk_var_code'),
						unitcode: 1,
						prdcode : loadsalDatastore.getAt(0).get('var_code'),
						finyear : GinYear,
						fincode : stfyr,

					}) 
				);   flxData.getSelectionModel().selectAll();
						bundle = 0;
						reel = 0;
						wt = 0;
						for(i=0;i<Row;i++) {
						if (sel[i].data.unitcode == 1){
							reel = reel + 1;
						}
						else if (sel[i].data.unitcode  == 2){
							bundle = bundle + 1;
						}
						wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
						}		
						
						flxpackslipabstractData.getStore().removeAll();
             	var Rowab= flxpackslipabstractData.getStore().getCount();
		flxpackslipabstractData.getSelectionModel().selectAll();

		var selab=flxpackslipabstractData.getSelectionModel().getSelections();
				
             	var Row= flxData.getStore().getCount();
		flxData.getSelectionModel().selectAll();

		var sel=flxData.getSelectionModel().getSelections();
    for(i=0;i<Row;i++) {
        fvar = sel[i].data.itemref;
        fwt = sel[i].data.weight;
        funit = sel[i].data.unit;
        k = 0;
        for(j=0;j<Rowab;j++) {
            if (selab[j].data.itemref == fvar && selab[j].data.unit == funit){
                selab[j].set('nos',(selab[j].data.nos +1));
                selab[j].set('weight',Ext.util.Format.number(Number(selab[j].data.weight) + Number(fwt),"0.0")); 
                k = 1;
                break;
            }
        }
        if (k == 0) {
		flxpackslipabstractData.getStore().insert(
		flxpackslipabstractData.getStore().getCount(),
		new dgrecord({
			itemref : fvar,
			nos: 1,
			unit : funit,
			weight :Ext.util.Format.number(fwt, "0.0"),
           	})
           	);
           	var Rowab= flxpackslipabstractData.getStore().getCount();
		flxpackslipabstractData.getSelectionModel().selectAll();

		var selab=flxpackslipabstractData.getSelectionModel().getSelections();           	
        }
    }
    
    fwt = 0;
    no_bundles = 0;
    no_reels = 0;
    
    for(j=0;j<Rowab;j++) {
        
           no_reels = Number(no_reels) + Number(selab[j].data.nos);
        
        tfwt = Number(Ext.util.Format.number(tfwt,"0.000")) + Number(Ext.util.Format.number(selab[j].data.weight,"0.000"));
    }								         		

			}
		}
		
		});  
		
		
       st_no=0;
end_no=0; 
*/
    

            }
            
        }

    });
   
var dgrecord = Ext.data.Record.create([]);
var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 230,
        width: 150,
        x: 480,
        y: 60,        
        columns: [   
            {header: "END NO", dataIndex: 'endno',sortable:true,width:145,align:'left'}, //hidden:'true'},       
            {header: "Size", dataIndex: 'sizecode',sortable:true,width:50,align:'left'}, //hidden:'true'}, 
            {header: "Finyear", dataIndex: 'finyear',sortable:true,width:50,align:'left'}, //hidden:'true'},      

        ],
store:[''], //loadsalledgerlistdatastore,
    listeners:{	

            dblclick :function () {
            
//alert(firstno);
            
             loadsalDatastore.removeAll();
             //flxData.getStore().removeAll();
            // flxpackslipabstractData.getStore.removeAll();
                var selected_rows = flxendno.getSelectionModel().getSelections();
		
                for (i = 0; i < selected_rows.length; i++)
                {
                     //st_no = selected_rows[i].data.startno;
                     stfyr = selected_rows[i].data.finyear;
		    // txtStartNo.setRawValue(st_no);
                     end_no = selected_rows[i].data.endno;
		    // txtEndNo.setRawValue(end_no);		     
                }  
            if (end_no < firstno) {
        alert ("Ending No. cannot be less than Starting No.");
        return false;
    }                
if (firstno == ""){
    alert ("Invalid Start No.");
    return false;
    }
else if (end_no == ""){
    alert ("Invalid End No.");
    return false;
    }
else if (firstno > end_no) {
    alert("Start No. Cannot be greater than end No.");
    return false;
}              
else {  

		
             	var Row= flxData.getStore().getCount();
		flxData.getSelectionModel().selectAll();

		var sel=flxData.getSelectionModel().getSelections();
		for(i=0;i<Row;i++)
		{
             		Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
             	}


             
		loadsalDatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params: {
			task: 'loadsaldata',
			itemcode : itemcode,
			fincode  : GinFinid,
			compcode : Gincompcode,
			stno	 : end_no,
			stnoqry  : "chk1"
			
		},
		callback : function () {
			if (loadsalDatastore.getCount() == 0){
				alert ("Reel / Bundle No. does not exists for the selected variety in the Stock");
				st_no = 0;
				end_no = 0;
			}
		}
		
		});             
        


//var firstno = st_no;
//var lastno = end_no;

		for(i=0;i<Row;i++)
		{
			if (sel[i].data.num == end_no && sel[i].data.unitcode == 1 && sel[i].data.fincode == stfyr ){
				alert("No. already exists");
				end_no = 0;
				return false;
			}
             	}



             	loadsalDatastore.removeAll();
		loadsalDatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
		params: {
			task: 'loadsaldata',
			itemcode : itemcode,
			fincode  : GinFinid,
			compcode : Gincompcode,
			stno	 : firstno,
			edno	 : end_no,
			ssrno    : csr,
			stfyr	 : stfyr,
			stnoqry  : "chk3"
			
		},
		callback : function () {
			if (loadsalDatastore.getCount() > 0){

			wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((loadsalDatastore.getAt(0).get('stk_wt')),"0.000"));
			
				if (gstFlag === "Add") {
		        		if( (wt) > despwt) {
						bundle = 0
						reel = 0
						wt = 0
						for(i=0;i<Row;i++) {
						if (sel[i].data.unitcode == 1){
							reel = reel + 1
						}
						else if (sel[i].data.unitcode  == 2){
							bundle = bundle + 1
						}

						wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
						}
					   alert ("Quantity greater than allowed quantity");
					   
		        		}
		    		}

            		
            			flxData.getStore().insert(
				flxData.getStore().getCount(),
					new dgrecord({

						itemref:loadsalDatastore.getAt(0).get('var_name'),
						itemdesc:loadsalDatastore.getAt(0).get('var_desc'),
						unit:"REELS",
						num : end_no,
						weight : Ext.util.Format.number(loadsalDatastore.getAt(0).get('stk_wt') , "0.000"),
						icode : loadsalDatastore.getAt(0).get('stk_var_code'),
						unitcode: 1,
						prdcode : loadsalDatastore.getAt(0).get('var_code'),
						finyear : GinYear,
						fincode : stfyr,

					}) 
				);   flxData.getSelectionModel().selectAll();
						bundle = 0;
						reel = 0;
						wt = 0;
						for(i=0;i<Row;i++) {
						if (sel[i].data.unitcode == 1){
							reel = reel + 1;
						}
						else if (sel[i].data.unitcode  == 2){
							bundle = bundle + 1;
						}
						wt = Number(Ext.util.Format.number(wt,"0.000")) + Number(Ext.util.Format.number((sel[i].data.weight),"0.000"));
						}		
						
				flxpackslipabstractData.getStore().removeAll();		
             	var Rowab= flxpackslipabstractData.getStore().getCount();
		flxpackslipabstractData.getSelectionModel().selectAll();

		var selab=flxpackslipabstractData.getSelectionModel().getSelections();
				
             	var Row= flxData.getStore().getCount();
		flxData.getSelectionModel().selectAll();

		var sel=flxData.getSelectionModel().getSelections();
    for(i=0;i<Row;i++) {
        fvar = sel[i].data.itemref;
        fwt = sel[i].data.weight;
        funit = sel[i].data.unit;
        k = 0;
        for(j=0;j<Rowab;j++) {
            if (selab[j].data.itemref == fvar ){
                selab[j].set('nos',(selab[j].data.nos +1));
		 selab[j].set('weight',Ext.util.Format.number(Number(selab[j].data.weight) + Number(fwt),"0.0")); 
                k = 1;
                break;
            }
        }
        if (k == 0) {
		flxpackslipabstractData.getStore().insert(
		flxpackslipabstractData.getStore().getCount(),
		new dgrecord({
			itemref : fvar,
			nos: 1,
			unit : funit,
			weight :Ext.util.Format.number(fwt, "0.0"),
           	})
           	);
           	var Rowab= flxpackslipabstractData.getStore().getCount();
		flxpackslipabstractData.getSelectionModel().selectAll();

		var selab=flxpackslipabstractData.getSelectionModel().getSelections();
        }
    }
    
    fwt = 0;
    no_bundles = 0;
    no_reels = 0;
    
    for(j=0;j<Rowab;j++) {
        
           no_reels = no_reels + selab[j].data.nos;
        
        fwt = Number(Ext.util.Format.number(fwt,"0.000")) + Number(selab[j].data.weight);
    }								         		

			}
		}
		
		});  
		
		

    }

            }
        }
        
    });   
   
var dgrecord = Ext.data.Record.create([]);
var flxpackslipabstractData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 130,
        width: 680,
        x: 520,
        y: 360,        
        columns: [   
            {header: "Item Ref", dataIndex: 'itemref',sortable:true,width:350,align:'left'}, //hidden:'true'},
            {header: "Nos", dataIndex: 'nos',sortable:true,width:80,align:'left'}, //hidden:'true'},
            {header: "Unit", dataIndex: 'unit',sortable:true,width:120,align:'left'}, //hidden:'true'},
            {header: "Weight", dataIndex: 'weight',sortable:true,width:120,align:'left'}, //hidden:'true'},       
        ],
store:[], //loadsalledgerlistdatastore,

    

   });      

      
   
var tabPackinglist = new Ext.TabPanel({
    id          : 'Packing List',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#eaeded"},
    activeTab   : 0,
    height      : 330,
    width       : 680,
    x           : 520,
    y           : 10,
    items       : [
        {
            xtype: 'panel',
            title: 'DOWNLOADED LIST ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
	          
	          
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 120,
			width       : 220,
			x           : 280,
			y           : -5,
			border      : false,
			items: [txtdownloadnos]
		},

		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 80,
			width       : 160,
			x           : 500,
			y           : -5,
			border      : false,
			items: [txtpackslipraisednos]
		},
/*
		{ 

			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 120,
			width       : 230,
			x           : 440,
			y           : 10,
			border      : false,
			items: [txtpacklsraise]
		}, 

		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 120,
			width       : 230,
			x           : 440,
			y           : 10,
			border      : false,
			items: [txtpacklsraise]
		}, 


                    {
                    xtype: 'textarea',
                    fieldLabel: 'Specification',
                    labelWidth  :100,
                    width:250,
                    name: 'arearText',
                    x           : 600,
                    y           : 200,
                    id : 'txtspec'
                    }, 
*/

                { 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 10,
			width       : 340,
                        height      : 300,
			x           : 10,
                        y           : 30,
			border      : false,
			items: [txtQRdownloadedlist]
		}, 




flxDownloadlist,btnadd,flxpackslipraised, //,flxpending
	          
	             
	]
        },


        {
            xtype: 'panel',
            title: 'PROCESSED LIST ',bodyStyle:{"background-color":"#eaeded"},
            layout: 'absolute',
            items: [
		
		
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 260,
			x           : 10,
			y           : -10,
			border      : false,
			items: [txtreelbalance]
		},
		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 5,
			width       : 360,
			x           : 300,
			y           : 10,
			border      : false,
			items: [txtrefslipno]
		},flxpending,flxstartno,flxendno,
		
		
            ]
        }
     ]
});
   

       
var TrnPackslipPrepareFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 700,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnPackslipPrepareFormpanel',
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
				AEDFlag = "Add";
				TrnPackslipPrepareFormpanel.getForm().reset();
				RefreshData();
			
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
		//disabled : true,
		    icon: '/Pictures/edit.png',
		    listeners:{
		        click: function () {
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	            
	            listeners:{
	                click: function () {

				dasocno = cmbsocno.getValue();
				
				if (Ext.util.Format.date(dtslipdate.getValue(),"Y-m-d") < GinFinst || Ext.util.Format.date(dtslipdate.getValue(),"Y-m-d") > GinFined){
				    alert ("Slip Date out of Financial Year");
				    return false;
				}
				else if (txtdelslipno.getValue() == ""){
				    alert ("Enter Slip No");
				    txtdelslipno.focus();
				    return false;
				}
				else if (gstFlag == "Add" && flxData.getStore().getCount() < 1) {
				    alert ("No data's in the grid");
				    return false;
				}
				else {
					Ext.Msg.show({
					title: 'Confirmation',
					icon: Ext.Msg.QUESTION,
					buttons: Ext.MessageBox.YESNO,
					msg: 'Do You Want To Save...',
					fn: function(btn)
					{
						if (btn === 'yes')
						{
						    var PSlipData = flxData.getStore().getRange();                                        
						    var PSlipupdData = new Array();
						    Ext.each(PSlipData, function (record) {
						        PSlipupdData.push(record.data);

						    });	
                            Ext.Ajax.request({
                            url: 'TrnSalesPackslipPrepareSave.php',
                            params :
                             {
                             	gridPslip	: Ext.util.JSON.encode(PSlipupdData),                                
				cnt		: PSlipData.length,
				gstFlag	: gstFlag,
				compcode	: Gincompcode,
                               finid		: GinFinid,
                               slipno		: txtdelslipno.getValue(),
                               slipdt		: Ext.util.Format.date(dtslipdate.getValue(),"Y-m-d"),
                               socno		: cmbsocno.getValue(),
                               socdt		: Ext.util.Format.date(dtsocdate.getValue(),"Y-m-d"),
                               advno		: cmbdespadno.getValue(),
                               advdt		: Ext.util.Format.date(dtdespaddate.getValue(),"Y-m-d"),
                               nofreel	: no_reels,
                               totwt		: tfwt,
                               slipnow	: 0,
                               slipstat	: "N",
                               vehicleno	: txttruckno.getValue(),


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Packing Slip -" + obj['PSNo']);
                                    TrnGrnformpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
				     flxitem.getStore().removeAll();
                                    RefreshData();
                                  }else
				  {
			Ext.MessageBox.alert("PackingSlip Not Saved! Pls Check!- " + obj['PSNo']);                                                  
                                    }
                                }
                           });  						    						
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
	            tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
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
	            tooltip: 'Close...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				TrnPackslipPrepare.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
                { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 480,
		        width   : 500,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 10,
		        items:[ 


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 190,
				x           : 10,
				y           : 10,
				border      : false,
				items: [txtdelslipno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 330,
				y           : 10,
			    	border      : false,
				items: [dtslipdate]
			}, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 480,
				x           : 10,
				y           : 50,
				border      : false,
				items: [cmbcust]
		        }, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 260,
				x           : 10,
				y           : 80,
				border      : false,
				items: [cmbsocno]
		        },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 270,
				y           : 80,
			    	border      : false,
				items: [dtsocdate]
			}, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 260,
				x           : 10,
				y           : 110,
				border      : false,
				items: [cmbdespadno]
		        },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 270,
				y           : 110,
			    	border      : false,
				items: [dtdespaddate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 480,
				x           : 10,
				y           : 140,
				border      : false,
				items: [txtdestination]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 260,
				x           : 10,
				y           : 170,
				border      : false,
				items: [txttruckno]
			},flxAdviceDetail,flxData,			
                 ], 
             },tabPackinglist,flxpackslipabstractData,     
          ],       
    });



    function RefreshData(){

    } 
	                    

   
    var TrnPackslipPrepare = new Ext.Window({
	height      : 615,
        width       : 1230,
        x	     : 50,
        y           : 35,
        title       : 'PACKINGSLIP PREPARATION',
        items       : TrnPackslipPrepareFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
                
		/*loadreelnodatastore.removeAll();
            loadreelnodatastore.load({
		url: 'ClsTrnSalesPackslipPrepare.php', 
			params:
			{
				task    :"loadreelno",
				compcode: Gincompcode,
	
			},

               });*/

				 loadsalcustomerdatastore.load({
                		 url: 'ClsTrnSalesPackslipPrepare.php', 
                        	 params:
                       		 {
                         	 task:"loadsalcustomer",
				 compcode :  Gincompcode,
				 finid    :  GinFinid,

                        	 }
				 });

					loadsaldelslipdatastore.removeAll();
					loadsaldelslipdatastore.load({
					url: 'ClsTrnSalesPackslipPrepare.php',
					params: {
					task: 'loadsaldelslip',
					compcode: Gincompcode,
					finid: GinFinid
					},
					callback : function(){
					txtdelslipno.setValue(loadsaldelslipdatastore.getAt(0).get('wpckh_no'));
				}
				});
				

				 	
				 loadsalesdespadnodatastore.load({
                		 url: 'ClsTrnSalesPackslipPrepare.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesdespadno"


                        	 }
				 }); 			 


        

 
		}
	}	
    });
    TrnPackslipPrepare.show();  
});
