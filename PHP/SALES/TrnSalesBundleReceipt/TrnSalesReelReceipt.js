Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var usertype = localStorage.getItem('ginuser');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate')


   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;   
   var gstFlag = "Add";
  var printtype='PDF';

   var editrow = 0;
   var gridedit = "false";

   var bundle_found = 0;

   var updchk = 0;

   var DCSeqNo = 0;

   var checkreel = 0;
    
var btnTransfer = new Ext.Button({
    style   : 'text-align:center;',
    id      : 'btnTransfer',
    text    : "Stock Transer for Invoice",
    width   : 120,
    height  : 30,
    x       : 0,
    y       : 00,
    border  : 1,
    style   : {
              borderColor: 'blue',
              borderStyle: 'solid',
    },
    bodyStyle:{"background-color":"#ebebdf"},
    labelStyle	: "font-size:12px;font-weight:bold;",
    listeners:{
        click: function(){  

	   Ext.MessageBox.show({
           title: 'Confirmation',
           icon: Ext.Msg.QUESTION,
	   buttons: Ext.MessageBox.YESNO,
           msg: "Do You Want to Transfer the Stock",
    	   fn: function(btn)
	   {         
	      if (btn == 'yes')
              {   
               var finData = flxDetails.getStore().getRange();                                        
	       var finupdData = new Array();
               Ext.each(finData, function (record) {
               finupdData.push(record.data);
               });  


               Ext.Ajax.request({
               url: 'TrnSalesReelStockTransfer.php',
               params:
		{
                savetype:gstFlag,
                cnt: finData.length,
                griddet: Ext.util.JSON.encode(finupdData),
		compcode :Gincompcode,
		fincode :GinFinid,  
    
                receiptno : txtReelRecptNo.getRawValue(),
                receiptdate :Ext.util.Format.date(dptReelRecpt.getValue(),"Y-m-d"),	
		cutter : cmbConverter.getValue(),
                seqno : cmbDCNo.getValue(),	
                dcno : cmbDCNo.getRawValue(),
                dcdate :Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),	
//sodate provision 
      

        	},
                callback: function(options, success, response)
                {
		         var obj = Ext.decode(response.responseText);
			if (obj['success']==="true")
			{                                
			    Ext.MessageBox.alert("Stock Transferred -" + obj['dcno']);
			    ReelReceiptPanel.getForm().reset();
			    flxDetails.getStore().removeAll();
			    RefreshData(); 
		        }
                }  
              })
	     }
           }
              })
	     }
           }    
});

function check_finstk_reelno()
{
 alert(txtBundNoFrom.getValue());
 alert(txtBundNoTo.getValue());


            for (var  i= txtBundNoFrom.getValue() ;i<txtBundNoTo.getValue() ;i++){
            checkfinishedstockstore.removeAll();
	    checkfinishedstockstore.load({
	    url: 'ClsTrnSalesBundleReceipt.php', // File to connect to
	    params:
		    {
		        task      : "CheckNumber_finished",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        rbno      : i,
		        rbunit    : 2, 
		    },
	    scope:this,
	    callback: function () {

                   if (checkfinishedstockstore.getAt(0).get('nos') > 0) {
		   alert("The Number " + i + " Alerady entered in the Entry No. " + checkfinishedstockstore.getAt(0).get('stk_ent_no') +  " in the Date of " + checkfinishedstockstore.getAt(0).get('stk_ent_date') ) ;
bundle_found = 1;
alert(bunde_found);
                   }
            }
            });
            }
}



var loadfindReelNodatastore = new Ext.data.Store({
      id: 'loadfindReelNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findReelNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos'
      ]),
    });


var loadfindReelNodatastore2 = new Ext.data.Store({
      id: 'loadfindReelNodatastore2',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findReelNo2"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'nos'
      ]),
    });

var loadReceiptNodatastore = new Ext.data.Store({
      id: 'loadReceiptNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelRecptNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'recptno'
      ]),
    });



var loadMainReelNoListdatastore = new Ext.data.Store({
      id: 'loadMainReelNoListdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCReelNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dc_sr_no'
      ]),
    });



var txtTotalWt = new Ext.form.NumberField({
	fieldLabel  : 'Total Wt(Kgs)',
	id          : 'txtTotalWt',
	name        : 'txtTotalWt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});


 var loadreelnodatastore = new Ext.data.Store({
      id: 'loadreelnodatastore',
     // autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['stk_sr_no' , 'stk_finyear','rmonth' ]),
    });

var loadreelnodetaildatastore = new Ext.data.Store({
      id: 'loadreelnodetaildatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm','stk_finyear','stk_sono','var_grpcode'
      ]),
    });


var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOsizes"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name'
      ]),
    })


var loadAllVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode','prd_date','prd_seqno','prd_rollwt','prd_finprod','prd_shift','prd_rollno'
      ]),
    });


var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadReelSONoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_sono'
	]),
});
var loadDCSizeListDataStore = new Ext.data.Store({
      id: 'loadDCSizeListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDCNosSizeList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_name', 'var_code','dc_custcode','dc_date'
      ]),
    });


var loadDeliveryChallanList = new Ext.data.Store({
      id: 'loadDeliveryChallanList',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelDCNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dc_no','dc_seqno'
      ]),
    });



 var loadConverterDataStore = new Ext.data.Store({
      id: 'loadConverterDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadConverters"}, // this parameter asks for listing
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




var loadEditBundleRecept = new Ext.data.Store({
      id: 'loadEditDeliveryChallan',
//      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelRecptNoEdit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'br_no'
      ]),
    });




var loadEditReelReceptDetail = new Ext.data.Store({
      id: 'loadEditReelReceptDetail',
      autoLoad :true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesBundleReceipt.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelRecptNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 'dcrr_no', 'dcrr_date', 'dcrr_cutter', 'dcrr_seqno', 'dcrr_dcno', 'dcrr_dcdate', 'dccr_dcsize', 'dccr_mainreelno', 'dccr_sono', 'dccr_newsize', 'dccr_newreelno', 'dccr_wt', 'dccr_upd', 'dc_size1', 'finsize1', 'cust_ref'

	 ]),
    });


  var dptDC= new Ext.form.DateField({
        fieldLabel: ' DC Date',
        id: 'dptDC',
        name: 'Date',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });

var sizewt = 0;

var cmbDCSize = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbDCSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDCSizeListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
                    loadMainReelNoListdatastore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadDCReelNoList',
		            fincode  : GinFinid,
			    compcode : Gincompcode,
                            seqno    : cmbDCNo.getValue(),
                            sizecode : cmbDCSize.getValue(),
                        },
                       	callback:function()
			{
                             var cnt=loadMainReelNoListdatastore.getCount();
	     
 
                        }
                    });            


  
           }
        }
                       
});


var dgrecord = Ext.data.Record.create([]);
var flxDetails = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 180,
    hidden:false,
    width: 1100,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "DC SIZE"    , dataIndex: 'dcsizename',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "DC Size Code"  , dataIndex: 'dcsizecode',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Main Reel No", dataIndex: 'mainreelno',sortable:false,width:120,align:'left', menuDisabled: true},
        {header: "New SO NO"  , dataIndex: 'sono',sortable:false,width:90,align:'left', menuDisabled: true},
        {header: "New Size"   , dataIndex: 'size',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "NewSize Code"  , dataIndex: 'sizecode',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "New Reel No", dataIndex: 'newreelno',sortable:false,width:120,align:'left', menuDisabled: true},
        {header: "Reel Wt"     , dataIndex: 'newwt',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Update"     , dataIndex: 'update',sortable:false,width:70,align:'left', menuDisabled: true},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	

            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {


  
             }  ,
 

            'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {

             Ext.Msg.show({
             title: 'SO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Press YES to Delete   -  NO to Exit ',
             fn: function(btn){
		     if (btn === 'no')
                     {
/*
				var sm = flxDetails.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetails.getSelectionModel().clearSelections();
                                cmbReelNo.setValue(selrow.get('mainreelno'));
//                		txtOldWt.setValue(selrow.get('oldwt'));  
		                cmbVariety.setRawValue(selrow.get('variery'));
                                cmbSONO.setRawValue(selrow.get('sono'));
		                cmbNewSize.setValue(selrow.get('sizecode'));
			        cmbNewSize.setRawValue(selrow.get('size'));
     

				txtNewReelNo.setValue(selrow.get('newreelno'));
				txtNewWt.setValue(selrow.get('newwt'));
			
*/
	              }
		      else if (btn === 'yes')
                      {
		                    var sm = flxDetails.getSelectionModel();
		                    var selrow = sm.getSelected();
                                    if (selrow.get('update') == "N")                               
                                        flxDetails.getStore().remove(selrow);
                                    else
                                        alert("Reel Already tranfer to Stock.. Can't Delete .");
    

		                       flxDetails.getSelectionModel().selectAll();

 
		     
		      }
                     grid_tot();

             } 
        });

   }
}
});



function grid_tot(){

        var wt = 0;	
        var Row= flxDetails.getStore().getCount();
        flxDetails.getSelectionModel().selectAll();
        var sel=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.newwt);
         }

         txtTotalWt.setValue(Ext.util.Format.number(wt,'0.0'));
}


var btnAdd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 80,
    height  : 30,
    id      : 'btnAdd',
    x       : 0,
    y       : 00,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },

bodyStyle:{"background-color":"#ebebdf"},
    	labelStyle	: "font-size:12px;font-weight:bold;",
    //	style      :"border-radius: 5px;  textTransform: uppercase ", 
 listeners:{
        click: function(){              
	    var gstadd="true";



                    loadfindReelNodatastore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'findReelNo',
		            fincode  : GinFinid,
			    compcode : Gincompcode,
                            reelno    : txtNewReelNo.getValue(),
                        },
                       	callback:function()
			{


                             var cnt=loadfindReelNodatastore.getCount();

                             if (loadfindReelNodatastore.getAt(0).get('nos') == 0)
                             {                        


                    loadfindReelNodatastore2.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'findReelNo2',
		            fincode  : GinFinid,
			    compcode : Gincompcode,
                            reelno    : txtNewReelNo.getValue(),
                        },
                       	callback:function()
			{
                            var cnt=loadfindReelNodatastore2.getCount();

                             checkreel = loadfindReelNodatastore2.getAt(0).get('nos') ;
                        } 
                        });                  
                             gstadd ="true";
                       //      alert("Reel Number already entered ");



          //  check_finstk_reelno();

	    if(Number(cmbNewSize.getValue())== 0 )
	    {
		alert("Select SIZE..");
                gstadd="false";
                cmbNewSize.setFocus();
	    }

	    if(Number(txtNewReelNo.getValue())== 0 )
	    {
		alert("Enter Reel No.");
                gstadd="false";
                txtNewReelNo.setFocus();
	    }
	    if(Number(txtNewWt.getValue())== 0 )
	    {
		alert("Reel Weight is Zero..");
txtNewWt.setFocus();
                gstadd="false";

	    }

            if(gstadd=="true")
            { 
                flxDetails.getSelectionModel().selectAll();
                var selrows = flxDetails.getSelectionModel().getCount();
                var sel = flxDetails.getSelectionModel().getSelections();
                var cnt = 0;

               for (var i=0;i<selrows;i++){
                    if (sel[i].data.newreelno === txtNewReelNo.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }




        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetails.getStore().indexOf(editrow);
			sel[idx].set('dcsizename' , cmbDCSize.getRawValue());
			sel[idx].set('dcsizecode' , cmbDCSize.getValue());
			sel[idx].set('mainreelno' , cmbMainReelNo.getRawValue());
			sel[idx].set('sono' , cmbSONO.getValue());
			sel[idx].set('size' , cmbNewSize.getRawValue());
			sel[idx].set('sizecode' , cmbNewSize.getValue());
			sel[idx].set('newreelno' , txtNewReelNo.getValue());
			sel[idx].set('newwt' , txtNewWt.getValue());
			sel[idx].set('update' , 'N');


			flxDetails.getSelectionModel().clearSelections();
                } else
                {      

                        if (cnt == 0 && checkreel == 0)  
                        { 
                        var RowCnt = flxDetails.getStore().getCount() + 1;
                        flxDetails.getStore().insert(
                        flxDetails.getStore().getCount(),
                        new dgrecord({
                                   dcsizename : cmbDCSize.getRawValue(),
                                   dcsizecode : cmbDCSize.getValue(),
     		                   mainreelno : cmbMainReelNo.getValue(),
		                   sono       : cmbSONO.getValue(),
			           size       : cmbNewSize.getRawValue(),
                                   sizecode   : cmbNewSize.getValue(),
                                   newreelno  : txtNewReelNo.getValue(),
                                   newwt      : txtNewWt.getValue(),
                                   update     : 'N',
                              }) 
                        );

                        txtNewReelNo.setValue('');  
                        txtNewWt.setValue(''); 
                        txtNewReelNo.focus();   
                        grid_tot();
                        }
                        else
                        {
                           alert("Reel Number Already Added ... ")
                        txtNewReelNo.focus();
                        }    
                }

             }
 grid_tot();
                    
                      }
                      else
                        {
                           alert("Reel Number Entered ... ")
                        txtNewReelNo.focus();
                        }                    
                        }
                    });


        }
  }
});


var lblDCSize = new Ext.form.Label({
    fieldLabel  : 'DC Size',
    id          : 'lblDCSize',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});



var lblMainReelNo = new Ext.form.Label({
    fieldLabel  : 'Main Reel No',
    id          : 'lblMainReelNo',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblSize = new Ext.form.Label({
    fieldLabel  : 'Size',
    id          : 'lblsize',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblSONO = new Ext.form.Label({
    fieldLabel  : 'SO NO',
    id          : 'lblSONO',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
})
var lblReelNo = new Ext.form.Label({
    fieldLabel  : 'New Reel No',
    id          : 'lblReelNo',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lblWT = new Ext.form.Label({
    fieldLabel  : 'WT (Kgs)',
    id          : 'lblWT',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
})






var cmbSONO = new Ext.form.ComboBox({
        fieldLabel      : '' ,
        width       	 :  100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONO',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                newsono  = cmbSONO.getValue();
                loadSizeDatastore.removeAll();
     		loadSizeDatastore.load({
     		url: 'ClsTrnSalesBundleReceipt.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONO.getValue(),
         
                        },
               	callback:function()
			{
          
                        }
                });
    
	}
	}
});

var txtNewReelNo = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtNewReelNo',
	name        : 'txtNewReelNo',
	width       :  130,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'10'},
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtNewWt.focus();
             }
          }
        }


});


var txtNewWt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtNewWt',
	name        : 'txtNewWt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        enableKeyEvents: true,
        listeners:{
             specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  btnAdd.focus();
             }
          }
        }

});
 
var cmbNewSize = new Ext.form.ComboBox({
        fieldLabel      : '' ,
        width       	 :  200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbNewSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadSizeDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                newsize = cmbNewSize.getValue();
    
	}
	}
});

var cmbMainReelNo = new Ext.form.ComboBox({
        fieldLabel      : '' ,
        width       	 :  200,
        displayField    : 'dc_sr_no', 
        valueField      : 'dc_sr_no',
        hiddenName      : '',
        id              : 'cmbMainReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadMainReelNoListdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                newsize = cmbNewSize.getValue();
    
	}
	}
});

var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width       	:  130,
        displayField    : 'stk_sr_no', 
        valueField      : 'stk_sr_no',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadreelnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select : function(){

     
	}
	}
});



var cmbDCNo = new Ext.form.ComboBox({
        fieldLabel      : 'DC No',
        width           : 100,
        displayField    : 'dc_no', 
        valueField      : 'dc_seqno',
        hiddenName      : '',
        id              : 'cmbDCNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDeliveryChallanList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {

                    DCSeqNo = cmbDCNo.getValue();
                    loadDCSizeListDataStore.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadDCNosSizeList',
		            fincode    : GinFinid,
			    compcode   : Gincompcode,
                            cuttercode : cmbConverter.getValue(),
                            dcseqno    : cmbDCNo.getValue(),
                        },
                       	callback:function()
			{
                        var cnt=loadDCSizeListDataStore.getCount();
                        if (cnt > 0 )
                           dptDC.setRawValue(Ext.util.Format.date(loadDCSizeListDataStore.getAt(0).get('dc_date'),"d-m-Y"));




                        }
                    });            


  
           }
        }
                       
});


   var txtSize = new Ext.form.NumberField({
        fieldLabel  : 'Size',
        id          : 'txtSize',
        name        : 'txtSize',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

var cmbConverter = new Ext.form.ComboBox({
        fieldLabel      : 'Converter',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbConverter',
        typeAhead       : true,
        mode            : 'local',
        store           : loadConverterDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
            select: function () {

                    loadDeliveryChallanList.load({
			url: 'ClsTrnSalesBundleReceipt.php',
			params: {
			    task: 'loadReelDCNoList',
		            fincode: GinFinid,
			    compcode:Gincompcode,
                            cuttercode : cmbConverter.getValue(),
                        }

                    });     

	   }
       }
});

var cmbReelRecptNo = new Ext.form.ComboBox({
        fieldLabel      : 'Recpt No',
        width           : 100,
        displayField    : 'br_no', 
        valueField      : 'br_no',
        hiddenName      : '',
        id              : 'cmbReelRecptNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadEditBundleRecept,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
                  flxDetails.getStore().removeAll();

                  Ext.getCmp('btnTransfer').show();
                  loadEditReelReceptDetail.removeAll();
		  loadEditReelReceptDetail.load({
		  url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadReelRecptNoDetails',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                    recptno:cmbReelRecptNo.getValue()
                                },
                           	callback:function()
				{
                                  cmbDCNo.setRawValue(loadEditReelReceptDetail.getAt(0).get('dcrr_dcno'));
                                  DCSeqNo = loadEditReelReceptDetail.getAt(0).get('dcrr_seqno');

                                  cmbDCSize.setValue(loadEditReelReceptDetail.getAt(0).get('dccr_dcsize'));
                                  cmbDCSize.setRawValue(loadEditReelReceptDetail.getAt(0).get('dc_size1'));

                                  dptReelRecpt.setRawValue(Ext.util.Format.date(loadEditReelReceptDetail.getAt(0).get('dcrr_date'),"d-m-Y"));
                                 
                                  dptDC.setRawValue(Ext.util.Format.date(loadEditReelReceptDetail.getAt(0).get('dcrr_dcdate'),"d-m-Y"));
                                  cmbSONO.setValue(loadEditReelReceptDetail.getAt(0).get('dcrr_sono'));


                                  cmbConverter.setValue(loadEditReelReceptDetail.getAt(0).get('dcrr_cutter'));

	          

				  txtReelRecptNo.setValue(cmbReelRecptNo.getValue());
//load data in flex - start
                                  var cnt=loadEditReelReceptDetail.getCount();
	                          if(cnt>0)
				  {                        
		                        for(var j=0; j<cnt; j++)
					{ 

                                            if (loadEditReelReceptDetail.getAt(j).get('br_upd') == "Y")
                                               updchk = 1;
                                            var RowCnt = flxDetails.getStore().getCount() + 1;  
                                            flxDetails.getStore().insert(
                                               flxDetails.getStore().getCount(),
                                               new dgrecord({
                                   dcsizename : loadEditReelReceptDetail.getAt(j).get('dc_size1'),
                                   dcsizecode  :loadEditReelReceptDetail.getAt(j).get('dccr_dcsize'),
     		                   mainreelno : loadEditReelReceptDetail.getAt(j).get('dccr_mainreelno'),
		                   sono       : loadEditReelReceptDetail.getAt(j).get('dccr_sono'),
			           size       : loadEditReelReceptDetail.getAt(j).get('finsize1'),
                                   sizecode   : loadEditReelReceptDetail.getAt(j).get('dccr_newsize'),
                                   newreelno  : loadEditReelReceptDetail.getAt(j).get('dccr_newreelno'),
                                   newwt      : loadEditReelReceptDetail.getAt(j).get('dccr_wt'),
                                   update     : loadEditReelReceptDetail.getAt(j).get('dccr_upd'),
	

                                               })
,
                                       	    );
					   grid_tot();
                                           if (updchk == 1)
                                               Ext.getCmp('btnTransfer').setDisabled(true);  




        				}

			            }
				}
  			    });

       //        txtReelRecptNo.setValue(cmbReelRecptNo.getValue());
           }
        }
  });  



   var txtReelRecptNo = new Ext.form.NumberField({
        fieldLabel  : 'Recpt No.',
        id          : 'txtReelRecptNo',
        name        : 'txtReelRecptNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });



  var dptReelRecpt = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptReelRecpt',
        name: 'dptReelRecpt',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });


   var txtDCWeight = new Ext.form.NumberField({
        fieldLabel  : 'DC. Wt(Kgs)',
        id          : 'txtDCWeight',
        name        : 'txtDCWeight',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });






var ReelReceiptPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES BUNDLE RECEIPT ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'ReelReceiptPanel',
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
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
                    gstFlag = "Edit";
                    Ext.getCmp('cmbReelRecptNo').show();

//EDIT
//                    flxDetails.getStore().removeAll();
                    loadEditBundleRecept.load({
				url: 'ClsTrnSalesBundleReceipt.php',
				params: {
				    task: 'loadReelRecptNoEdit',
			            fincode: GinFinid,
				    compcode:Gincompcode,
                                }

                    });     

                }
            }
        },'-',
          {
//SAVE
            text: 'Save',
            id:'save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {



                        if(cmbConverter.getRawValue()=="" || cmbConverter.getValue()==0)
			{
				alert("Select Customer..");
			}
         

                        else if(Ext.util.Format.date(dptReelRecpt.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){
                            Ext.MessageBox.alert("Alert","Receipt Date is not in current finance year. Please check");
                         } 
			else if (flxDetails.getStore().getCount() == 0)
                         {
	                        Ext.Msg.alert('Reel  Receipt','Grid should not be empty..');
	                        gstSave="false";
	                 } 
             		else
			{               


					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
                                           msg: "Do You Want to Save  the Record",
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetails.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  


//             Ext.getCmp('save').setDisabled(true);





                                               Ext.Ajax.request({
				               url: 'TrnSalesReelReceiptSave.php',
				               params:
						{
                                                savetype:gstFlag,
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode :GinFinid,  
                                    
 		                                receiptno : txtReelRecptNo.getRawValue(),
                                                receiptdate :Ext.util.Format.date(dptReelRecpt.getValue(),"Y-m-d"),	
						cutter : cmbConverter.getValue(),
 		                                seqno : DCSeqNo,	
 		                                dcno : cmbDCNo.getRawValue(),
                                                dcdate :Ext.util.Format.date(dptDC.getValue(),"Y-m-d"),	
                         

                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Reel Receipt No -" + obj['receiptno']);
	                                    ReelReceiptPanel.getForm().reset();
	                                    flxDetails.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
          Ext.MessageBox.alert("Reel Receipt Not Saved! Pls Check!- " + obj['receiptno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
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


		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&dcno=" + String(encodeURIComponent(txtDCNo.getValue()));
                var param = (p1+p2+p3) ;


alert(param);
                if (printtype == "PDF") 
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&__format=pdf&' + param, '_blank');
                else
  	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDCVoucherPrint.rptdesign&__format=pdf&' + param, '_blank');

;
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
                    ReelReceiptWindow.hide();
                }
            }
        }

        ]      
     } ,
    items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 1300,
           height      : 150,
           x           : 10,
           y           : 10,
           border      : true,
           layout      : 'absolute',
           items:[


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [txtReelRecptNo]
                   },
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbReelRecptNo]
                   },


               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptReelRecpt]
   		  },



                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 35,
                       border      : false,
                       items: [cmbConverter]
                   },



                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 70,
                       border      : false,
                       items: [cmbDCNo]
                   },

               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 70,
	               border      : false,
                       items: [dptDC]
   		  },




                  ] 
            },

           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 1300,
           height      : 350,
           x           : 10,
           y           : 150,
           border      : true,
           layout      : 'absolute',
           items:[


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 400,
				x           : 20,
				y           : -10,
				border      : false,
				items: [lblDCSize]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 300,
				y           : -10,
				border      : false,
				items: [lblMainReelNo]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 400,
				x           : 720,
				y           :  -10,
				border      : false,
				items: [lblSize]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 101,
				width       : 400,
				x           : 520,
				y           : -10,
				border      : false,
				items: [lblSONO]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 1050,
				y           : -10,
				border      : false,
				items: [lblWT]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 900,
				y           : -10,
				border      : false,
				items: [lblReelNo]
			},

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 10,
                       width       : 400,
                       x           : 0,
                       y           : 10,
                       border      : false,
                       items: [cmbDCSize]
                   },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 10,
                       width       : 300,
                       x           : 250,
                       y           : 10,
                       border      : false,
                       items: [cmbMainReelNo]
                   },

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 300,
				x           : 480,
				y           : 10,
				border      : false,
				items: [cmbSONO]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 300,
				x           : 630,
				y           : 10,
				border      : false,
				items: [cmbNewSize]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 870,
				y           : 10,
				border      : false,
				items: [txtNewReelNo]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 1040,
				y           : 10,
				border      : false,
				items: [txtNewWt]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 1150,
				y           : 8,
				border      : false,
				items: [btnAdd]
			},







			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 1000,
				x           : 10,
				y           : 50,
				border      : false,
				items: [flxDetails]
			},

                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 1100,
                       y           : 60,
                       border      : false,
                       items: [btnTransfer]
                   },


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 300,
				x           : 600,
				y           : 240,
				border      : false,
				items: [txtTotalWt]
			},


           ]
           }  


        ],  

});

   function RefreshData(){
            gstFlag = "Add";
            updchk = 0;
            Ext.getCmp('cmbReelRecptNo').hide();

         Ext.getCmp('btnTransfer').hide();

                  loadConverterDataStore.load({
                  url: 'ClsTrnSalesBundleReceipt.php',
                  params: {
                  task: 'loadConverters',
		  fincode:GinFinid,
		  compcode:Gincompcode,
                  }
               });

            loadReceiptNodatastore.load({
                url: 'ClsTrnSalesBundleReceipt.php',
                params: {
                    task: 'loadReelRecptNo',
                     fincode:GinFinid,
		     compcode:Gincompcode,
                },
		callback:function()
		{
		txtReelRecptNo.setValue(loadReceiptNodatastore.getAt(0).get('recptno'));
		}
            });


}


var ReelReceiptWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
        y           : 30,
        title       : 'SALES - REEL CONVERSION - REEL RECEIPT ENTRY',
        items       : ReelReceiptPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : true,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
            show:function(){

	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsTrnSalesBundleReceipt.php',
                params: {
	    	task     : 'loadReelSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
		},
		scope:this,
		callback:function()
       		{
		}
	});
    
               RefreshData();

        } 
        }
    });
	
       ReelReceiptWindow.show();  
});
