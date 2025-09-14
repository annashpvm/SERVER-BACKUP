Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
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
var itemcode = 0;
var fincode =0;
var varcode = 0;
var newsize = 0;
var newsono = 0;
var oldrollno = 0;
var oldyymm = 0;
var gstFlag = "Add";

var reelyear =0;
var reelfound = 0;
   var yymm = '';
   var mm = 0;
   var yy = 0;

  var printtype='PDF';

var rep = "Date-Reel No wise";


var colname;
var flag = '';

   
   var loadDocNodetaildatastore = new Ext.data.Store({
      id: 'loadDocNodetaildatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ClsTrnSalesReelSalvage"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 'r_compcode', 'r_finyear', 'r_entno', 'r_date', 'r_sono', 'r_sizecode', 'r_srno', 'r_wt', 'sizecode', 'sizename','r_reelfinyear'
      ]),
    });

 
   var loadDocNolistdatastore = new Ext.data.Store({
      id: 'loadDocNolistdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDocNolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ent_no'
      ]),
    });

var cmbDocNo = new Ext.form.ComboBox({
        fieldLabel      : 'Document No',
        width           : 80,
        displayField    : 'ent_no', 
        valueField      : 'ent_no',
        hiddenName      : '',
        id              : 'cmbDocNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadDocNolistdatastore, 
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
         select: function () {
		loadDocNodetaildatastore.removeAll();
		loadDocNodetaildatastore.load({
			url: 'ClsTrnSalesRepulpStockEntry.php',
			params: {
			task: 'loadDocNodetail',
			compcode :Gincompcode,
			finid:GinFinid,
			docno: cmbDocNo.getValue()
			},
			callback:function()
			{
//alert(loadDocNodetaildatastore.getAt(0).get('reth_invdate'));           
                           flxDetail.getStore().removeAll();
                           var cnt = loadDocNodetaildatastore.getCount();


                           txtDocNo.setValue(loadDocNodetaildatastore.getAt(0).get('r_entno'));
                           dtDocDate.setRawValue(Ext.util.Format.date(loadDocNodetaildatastore.getAt(0).get('r_date'),"d-m-Y"));


                           for(var j=0; j<cnt; j++)
			   {
                              var RowCnt = flxDetail.getStore().getCount() + 1;  
                              flxDetail.getStore().insert(
                                  flxDetail.getStore().getCount(),
                                  new dgrecord({
	 	
              				size       : loadDocNodetaildatastore.getAt(j).get('sizename'),
					sizecode   : loadDocNodetaildatastore.getAt(j).get('sizecode'),
					sono       : loadDocNodetaildatastore.getAt(j).get('r_sono'),
					reelno     : loadDocNodetaildatastore.getAt(j).get('r_srno'), 
					weight     : loadDocNodetaildatastore.getAt(j).get('r_wt'), 
                                        reelyear   :  loadDocNodetaildatastore.getAt(j).get('r_reelfinyear'), 
                                  })
                              );

                           }
                grid_tot();

			}
		});
                grid_tot();
   
	     }
       }
    });


var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 180,
    hidden:false,
    width: 820,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Size"      , dataIndex: 'size',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Size Code" , dataIndex: 'sizecode',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "SO NO"     , dataIndex: 'sono',sortable:false,width:90,align:'left', menuDisabled: true},
        {header: "Reel No"   , dataIndex: 'reelno',sortable:false,width:120,align:'left', menuDisabled: true},
        {header: "Reel year" , dataIndex: 'reelyear',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Weight"    , dataIndex: 'weight',sortable:false,width:70,align:'left', menuDisabled: true},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	

            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {


  
             }  ,
 

            'cellDblclick': function (flxDetail, rowIndex, cellIndex, e) {

             Ext.Msg.show({
             title: 'SO PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxDetail.getSelectionModel().clearSelections();
                                cmbReelNo.setValue(selrow.get('reelno'));
                		txtWt.setValue(selrow.get('weight'));  
                                txtSONo.setRawValue(selrow.get('sono'));
		                txtSizeName.setValue(selrow.get('sizecode'));
			

	              }
		      else if (btn === 'no')
                      {

		                    var sm = flxDetail.getSelectionModel();
		                    var selrow = sm.getSelected();

                                    flxDetail.getStore().remove(selrow);
                                    flxDetail.getSelectionModel().selectAll();

		     
		      }
                     grid_tot();

             } 
        });

   }
}
});



function grid_tot(){

        var wt = 0;	
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.weight);
         }

         txtTotalWt.setValue(Ext.util.Format.number(wt,'0.0'));
}



function add_btn_click()
{
	    var gstadd="true";

            reelfound = 0;   

	    if(cmbReelNo.getRawValue()=="" || cmbReelNo.getValue()==0)
	    {
		alert("Select Reel NO..");
                gstadd="false";
                cmbReelNo.setFocus();
	    }




	    if(txtWt.getRawValue()=="" || txtWt.getValue()==0)
	    {
		alert("Enter Reel Weight ..");
                gstadd="false";
                txtNewWt.setFocus();
	    }

            if(gstadd=="true")
            { 
                flxDetail.getSelectionModel().selectAll();
                var selrows = flxDetail.getSelectionModel().getCount();
                var sel = flxDetail.getSelectionModel().getSelections();
                var cnt = 0;
               for (var i=0;i<selrows;i++){
                    if (sel[i].data.reelno === cmbReelNo.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('reelno'  , cmbReelNo.getRawValue());
			sel[idx].set('weight'  , txtWt.getValue());
			sel[idx].set('size'    , txtSizeName.getRawValue());
			sel[idx].set('sizecode', itemcode);
			sel[idx].set('sono'    , txtSONo.getValue());
                        sel[idx].set('reelyear', reelyear);

			flxDetail.getSelectionModel().clearSelections();

		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Reel Number already Entered.");
                } else
                {      
                        var RowCnt = flxDetail.getStore().getCount() + 1;
                        flxDetail.getStore().insert(
                        flxDetail.getStore().getCount(),
                        new dgrecord({
		                   reelno   : cmbReelNo.getRawValue(),
		                   weight   : txtWt.getValue(),
		                   size     : txtSizeName.getRawValue(),
				   sizecode : itemcode,
				   sono     : Number(txtSONo.getValue()),
                                   reelyear : reelyear, 

                               }) 
                               );

                }


             }

             grid_tot();


      }


var btnAdd = new Ext.Button({
 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "ADD",
    width   : 80,
    height  : 35,


 listeners:{
        click: function(){       
            add_btn_click();
       }

     }
});
var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
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



var optrep = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:150,
    border: false,
    items: [

    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optrep',
        items: [
            {boxLabel: 'Date-Reel No wise"' , name: 'optrep', id:'optDDN', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Date-Reel No wise";	
	
                    }                       
                     }
                 }
            },

            {boxLabel: 'Date-Size wise' , name: 'optrep', id:'optSize', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Date-Size wise";
	   	
                 } 
                 }
                 }  
            },
        ]


    },
    ]



});


var btnSubmit = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "PRINT",
    width   : 80,
    height  : 35,
    listeners:{
        click: function(){    
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fincode=" + encodeURIComponent(GinFinid);
		var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dptStartDate.getValue(),"Y-m-d"));
		var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dptEndDate.getValue(),"Y-m-d"));

//alert(printtype);

                var param = (p1+p2+p3+p4) ;

                if (rep == "Date-Reel No wise")
                {
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpReelNowise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpReelNowise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpReelNowise.rptdesign' + param, '_blank');	
                 }  
                 else
                {
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpSizewise.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpSizewise.rptdesign&__format=XLS' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepulpSizewise.rptdesign' + param, '_blank');	
                 }  

  
        }
    }
});  

  var dptStartDate= new Ext.form.DateField({
        fieldLabel: 'S.Date',
        id: 'dptStartDate',
        name: 'dptStartDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });

  var dptEndDate= new Ext.form.DateField({
        fieldLabel: 'E.Date',
        id: 'dptEndDate',
        name: 'dptEndDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });


var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });


var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });

      var txtProdMonth = new Ext.form.NumberField({
   	fieldLabel  :'Production YYMM',
   	id	    :'txtProdMonth',
   	name	    :'txtProdMonth',
   	width	    : 80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold;color:#f54242",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},  
   	tabindex    :3,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnSalesRepulpStockEntry.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : GinFinid,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsTrnSalesRepulpStockEntry.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : GinFinid,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }   
             },
           change:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
               
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnSalesRepulpStockEntry.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : GinFinid,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsTrnSalesRepulpStockEntry.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : GinFinid,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }  
             }
        }    
        

   	});


var cmbRollNo = new Ext.form.ComboBox({
        fieldLabel      : 'Roll No',
        width           : 90,
        displayField    : 'prd_rollno', 
        valueField      : 'prd_rollno',
        hiddenName      : '',
        id              : 'cmbRollNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRollNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
		select: function()
		{

                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4); 

        cmbReelNo.reset();


	loadreelnodatastore.removeAll();
	loadreelnodatastore.load({
	 url: 'ClsTrnSalesRepulpStockEntry.php',
		params: {
	    	   task: 'loadReelNoList',
                   compcode : Gincompcode,
                   finid    : GinFinid,
		   rollno   : cmbRollNo.getValue(),
	           mon      : mm,    
                   yr       : yy , 

	      
		 },
		 callback:function()
		   {

        //                   alert(loadreelnodatastore.getAt(0).get('rmonth'));


		   } 
	  });
	}
	}
   });


var loadAllVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
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
		url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadSONoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_sono'
	]),
});
var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOsizes"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','sizecode'
      ]),
    })


 var loaddocnodatastore = new Ext.data.Store({
      id: 'loaddocnodatastore',
//      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentryno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'no'
      ]),
    });

 var loadreelnodatastore = new Ext.data.Store({
      id: 'loadreelnodatastore',
     // autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
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
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
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


var txtDocNo = new Ext.form.TextField({
	fieldLabel  : 'Document No',
	id          : 'txtDocNo',
	name        : 'txtDocNo',
	width       :  80,
	readOnly    : true,
	//disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var dtDocDate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtDocDate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly    : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    style      : "border-radius:5px;",
    width : 100,
});

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
     		url: 'ClsTrnWinderEntry.php',
		params: {
			    task: 'loadSOsizes',
   		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONO.getValue(),
                            varietycode : cmbVariety.getValue(),

                        },
               	callback:function()
			{
          
                        }
                });
    
	}
	}
});

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : '' ,
        width       	 :  200,
        displayField    : 'sizecode', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
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
                newsize = cmbSize.getValue();
    
	}
	}
});

var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : '' ,
        width       	 :  150,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllVarietyDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsTrnSalesRepulpStockEntry.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
                varty    : cmbVariety.getValue(),
		},
		scope:this,
		callback:function()
       		{
		}
	})
    
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

     

     		loadreelnodetaildatastore.removeAll();
		loadreelnodetaildatastore.load({
			url: 'ClsTrnSalesRepulpStockEntry.php',
			params: {
		          task: 'loadReelDetail',
			  compcode : Gincompcode,
//			  finid    : cmbReelNo.getValue(),
		          reelno   : cmbReelNo.getRawValue(),  
			},
			callback : function(){
//alert(loadreelnodetaildatastore.getCount());
//'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm'
                            txtWt.setRawValue(loadreelnodetaildatastore.getAt(0).get('stk_wt'));
                            txtSONo.setValue(loadreelnodetaildatastore.getAt(0).get('stk_sono'));
                            txtSizeName.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_name'));
                            itemcode = loadreelnodetaildatastore.getAt(0).get('stk_var_code');
                            reelyear = loadreelnodetaildatastore.getAt(0).get('stk_finyear');


          		},    
                }); 
    
	}
	}
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

var txtWt = new Ext.form.NumberField({
	fieldLabel  : 'Wt (Kgs)',
	id          : 'txtWt',
	name        : 'txtWt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});
var txtSONo = new Ext.form.NumberField({
	fieldLabel  : 'SO NO',
	id          : 'txtSONo',
	name        : 'txtSONo',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});



var txtSizeName = new Ext.form.TextField({
	fieldLabel  : 'Size',
	id          : 'txtSizeName',
	name        : 'txtSizeName',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});



   function check_password()
   {
  //    if  (gstFlag == "Add")
//      { 
 
      if (txtPassword.getRawValue() == "REPULP")
      {
        Ext.getCmp('save').setDisabled(false);
      }
      else
      {
        Ext.getCmp('save').setDisabled(true);
      }  

//      }   

   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  200,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
            console.log(newValue);
            obj.setRawValue(newValue.toUpperCase());
            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
        }
 
    });






function loadRollDetails()
{
	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnSalesRepulpStockEntry.php',
		params: {
	    	   task: 'loadRollNo',
		   compcode : Gincompcode,
		   finid    : GinFinid,   
	           mon      : mm, //Ext.util.Format.date(dtProdDate.getValue(),"n"),   
                   yr       : yy, //Ext.util.Format.date(dtProdDate.getValue(),"Y"),     
		 },
		 callback:function()
		   {

		   } 
	  });
             
}
function RefreshData(){
       gstFlag = "Add";
        itemcode = 0;
        reelfound = 0;

        Ext.getCmp('save').setDisabled(true);

        Ext.getCmp('cmbDocNo').hide();

        var dt = dtDocDate.getValue();
        yymm= dt.format("y")+dt.format("m");

        yy =  "20"+yymm.substring(0,2);   
        mm  =  yymm.substring(2,4);   

         flxDetail.getStore().removeAll();
       txtProdMonth.setValue(yymm);

       loadRollDetails()

			loaddocnodatastore.removeAll();
			loaddocnodatastore.load({
				url: 'ClsTrnSalesRepulpStockEntry.php',
				params: {
				task: 'loadentryno',
				compcode: Gincompcode,
				finid: GinFinid
				},
				callback : function(){

				   txtDocNo.setValue(loaddocnodatastore.getAt(0).get('no'));
                                }
		        });    	    

}
       
               
var TrnSalesRepulpPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesRepulpPanel',
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
				TrnSalesRepulpPanel.getForm().reset();
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

		                           gstFlag = "Edit";
                     			   Ext.getCmp('cmbDocNo').show();
                                           Ext.getCmp('save').setDisabled(true);
					   loadDocNolistdatastore.removeAll();
					   loadDocNolistdatastore.load({
		      		              url: 'ClsTrnSalesRepulpStockEntry.php',
					      params: {
						  task: 'loadDocNolist',
						  finid: GinFinid,
						  compcode:Gincompcode,
					      },
					      callback:function()
					      { 
//					          alert(loadDocNolistdatastore.getCount());	
					      }
					   });

		        }
		    }
		},'-',                
		{
//save
	            text: 'Save',
	            id: 'save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
                     var gstSave;



                    gstSave="true";
                    if (txtDocNo.getRawValue() == 0)
                    {
                        Ext.Msg.alert('Sales ','Salvage Entry No..');
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

            var SalesData = flxDetail.getStore().getRange();                                        
            var SalesupData = new Array();
            Ext.each(SalesData, function (record) {
                SalesupData.push(record.data);
            });


                            Ext.Ajax.request({
                            url: 'TrnSalesRepulpStockEntrySave.php',
                            params :
                             {

				cnt: SalesData.length,
			       	griddet: Ext.util.JSON.encode(SalesupData), 
                                saveflag : gstFlag,   
				compcode : Gincompcode,
				fincode  : GinFinid,
				entno    : txtDocNo.getValue(),
				entdate  : Ext.util.Format.date(dtDocDate.getValue(),"Y-m-d"),


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Reel Repulp Entry Saved -" + obj['msg']);
                                    TrnSalesRepulpPanel.getForm().reset();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Reel Repulp Entry Not Saved! Pls Check!- " + obj['msg']);                                                  
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
				TrnSalesRepulpWindow.hide();
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
		        height  : 500,
		        width   : 1250,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 10,
		        items:[ 


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 250,
				x           : 10,
				y           : 0,
				border      : false,
				items: [txtDocNo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 250,
				x           : 10,
				y           : 0,
				border      : false,
				items: [cmbDocNo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 200,
				x           : 250,
				y           : 0,
			    	border      : false,
				items: [dtDocDate]
			},
                                               {
                                                xtype       : 'fieldset',
                                                title       : '',
                                                labelWidth  : 80,
                                                width       : 400,
                                                x           : 500,
                                                y           : 0,
                                                border      : false,
                                                items: [txtPassword] 
                                               },

    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 300,
			x           : 10,
			y           : 40,
			border      : false,
			items: [txtProdMonth]
			},

	
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:10,
	    		y	:80,
	    		border	:false,
	    		items:[cmbRollNo]
	    		},



                { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 320,
		        width   : 900,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 150,
		        items:[ 

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 400,
				x           : 10,
				y           : 10,
				border      : false,
				items: [cmbReelNo]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 240,
				x           : 240,
				y           : 10,
				border      : false,
				items: [txtWt]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 370,
				x           : 420,
				y           : 10,
				border      : false,
				items: [txtSONo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 370,
				x           : 580,
				y           : 10,
				border      : false,
				items: [txtSizeName]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 790,
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
				items: [flxDetail]
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



                    ],
                   },    	        		        			
                 ],
             },  
      {   
                xtype       : 'fieldset',
                title       : '',
                width       : 280,
                height      : 420,
                x           : 970,
                y           : 20,
                border      : true,
                layout      : 'absolute',
                items:[
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 0,
			y       : 10,

			items:[optprinttype],
		},


		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 60,
			       border      : false,
		               items: [optrep]
	   		  },
		       	   { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 240,
			       border      : false,
		               items: [dptStartDate]
	   		  },
       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 0,
	       		       y           : 270,
			       border      : false,
		               items: [dptEndDate]
	   		  },

       	                  { 
			       xtype       : 'fieldset',
		   	       title       : '',
			       labelWidth  : 50,
		               width       : 400,
		               x           : 40,
	       		       y           : 310,
			       border      : false,
		               items: [btnSubmit]
	   		  },
                      ]
            }  ,

        
          ],
                 
    });



    

   
    var TrnSalesRepulpWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        x	     : 30,
        y           : 30,
        title       : 'REPULP ENTRY',
        items       : TrnSalesRepulpPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
 onEsc:function(){
},
	listeners:{
               show:function(){

                RefreshData();
//                alert("Hai");
//                alert(Gincompcode);

     		/*loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnSalesRepulpStockEntry.php',
			params: {
		          task: 'loadentryno',
			  compcode : Gincompcode,
			  finid    : GinFinid,
			},
			callback : function(){

			alert(loadreelnodatastore.getCount());

		 	},    
                });   

     		loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnSalesRepulpStockEntry.php',
			params: {
		          task: 'loadReelNoList',
			  compcode : Gincompcode,
			  finid    : GinFinid
			},
			callback : function(){

		      	//alert(loadreelnodatastore.getCount());

		 	},    
                });   
*/
		}
	}	
    });
    TrnSalesRepulpWindow.show();  
});
