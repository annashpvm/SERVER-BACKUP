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
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"ClsTrnSalesReelSalvage"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
 'ent_no', 'ent_date', 'oldreelno', 'oldweight', 'oldsono', 'oldsize', 'newreelno', 'newweight', 'newsono', 'newsize', 'newsizecode', 'newsizename', 'newvariety', 'oldsizecode', 'oldsizename'
      ]),
    });


var checkfinishedstockstore = new Ext.data.Store({
      id: 'checkfinishedstockstore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                      
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"CheckNumber"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['nos','stk_ent_no','stk_ent_date']),
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
        {header: "Variety"    , dataIndex: 'variery',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Size"       , dataIndex: 'size',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Size Code"  , dataIndex: 'sizecode',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "New SO NO"  , dataIndex: 'sono',sortable:false,width:90,align:'left', menuDisabled: true},
        {header: "New Reel No", dataIndex: 'newreelno',sortable:false,width:120,align:'left', menuDisabled: true},
        {header: "New Wt"     , dataIndex: 'newwt',sortable:false,width:70,align:'left', menuDisabled: true},

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
                                cmbReelNo.setValue(selrow.get('mainreelno'));
                		txtOldWt.setValue(selrow.get('oldwt'));  
		                cmbVariety.setRawValue(selrow.get('variery'));
                                cmbSONO.setRawValue(selrow.get('sono'));
		                cmbSize.setValue(selrow.get('sizecode'));
			        cmbSize.setRawValue(selrow.get('size'));
     

				txtNewReelNo.setValue(selrow.get('newreelno'));
				txtNewWt.setValue(selrow.get('newwt'));
			

	              }
		      else if (btn === 'no')
                      {
		                if (viewopt == 0)
		                { 
		                    var sm = flxDetail.getSelectionModel();
		                    var selrow = sm.getSelected();

                                       flxDetail.getStore().remove(selrow);
		                       flxDetail.getSelectionModel().selectAll();

		                }  
 
		     
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
              wt=wt+Number(sel[i].data.newwt);
         }

         txtTotalWt.setValue(Ext.util.Format.number(wt,'0.0'));
}



function add_btn_click()
{
	    var gstadd="true";


            Ext.getCmp('cmbReelNo').setDisabled(true);
            reelfound = 0;   
            checkfinishedstockstore.removeAll();
	    checkfinishedstockstore.load({
	    url: 'ClsTrnSalesFinishedGoods.php', // File to connect to
	    params:
		    {
		        task: "CheckNumber",
		        compcode  : Gincompcode,
		        finid     : GinFinid,
		        rbno      : txtNewReelNo.getValue(),
		    },
	    scope:this,
	    callback: function () {


                   if (checkfinishedstockstore.getAt(0).get('nos') > 0) {

		   alert("The Number " + cmbReelNo.getValue() + " Alerady entered in the Entry No. " + checkfinishedstockstore.getAt(0).get('stk_ent_no') +  " in the Date of " + checkfinishedstockstore.getAt(0).get('stk_ent_date') ) ;
             gstadd="false";
                   }




//alert(cmbCustomer.getValue());
            else
            {

	    if(cmbReelNo.getRawValue()=="" || cmbReelNo.getValue()==0)
	    {
		alert("Select Reel NO..");
                gstadd="false";
                cmbReelNo.setFocus();
	    }


	    if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
	    {
		alert("Select Variety..");
                gstadd="false";
                cmbVariety.setFocus();
	    }
	    if(cmbSize.getRawValue()=="" || cmbSize.getValue()==0)
	    {
		alert("Select Size..");
                gstadd="false";
                cmbSize.setFocus();
	    }

	    if(cmbReelNo.getRawValue()=="" || txtNewReelNo.getValue()==0)
	    {
		alert("Enter Reel No..");
                gstadd="false";
                txtNewReelNo.setFocus();
	    }
	    if( Number(cmbReelNo.getValue()) == Number(txtNewReelNo.getValue()))
			{
			alert("Main Reel Number and Salvage Reel Numbers are Same..");
					gstadd="false";
					txtNewReelNo.setFocus();
			}
	    if(txtNewWt.getRawValue()=="" || txtNewWt.getValue()==0)
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
                    if (sel[i].data.newreelno === txtNewReelNo.getValue())
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

                       	var idx = flxDetail.getStore().indexOf(editrow);
			sel[idx].set('mainreelno', cmbReelNo.getRawValue());
			sel[idx].set('oldwt'     , txtOldWt.getValue());
			sel[idx].set('variery'   , cmbVariety.getRawValue());
			sel[idx].set('size'      , cmbSize.getRawValue());
			sel[idx].set('sizecode'  , cmbSize.getValue());
			sel[idx].set('sono'      , cmbSONO.getValue());
			sel[idx].set('newreelno' , txtNewReelNo.getValue());
			sel[idx].set('newwt'     , txtNewWt.getValue());

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
		                   mainreelno  : cmbReelNo.getRawValue(),
		                   oldwt       : txtOldWt.getValue(),
			           variery     : cmbVariety.getRawValue(),
                                   size        : cmbSize.getRawValue(),
				   sizecode    : Number(cmbSize.getValue()),
				   sono        : Number(cmbSONO.getValue()),
			           newreelno   : txtNewReelNo.getValue(),
				   newwt       : txtNewWt.getValue(),

                               }) 
                               );

                }


             }
             txtNewReelNo.setValue('');
	     txtNewWt.setValue('');
             grid_tot();
          }
           }   
         }); 


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
var lblvariety = new Ext.form.Label({
    fieldLabel  : 'Variety',
    id          : 'lblvariety',
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

var lbloldvariety = new Ext.form.Label({
    fieldLabel  : 'Old Variety',
    id          : 'lbloldvariety',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lblOldWT = new Ext.form.Label({
    fieldLabel  : 'Old Wt(k)',
    id          : 'lblOldWT',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
})

var lbloldSONO = new Ext.form.Label({
    fieldLabel  : 'Old SO NO',
    id          : 'lbloldSONO',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

var lbloldSize = new Ext.form.Label({
    fieldLabel  : 'Old Size',
    id          : 'lbloldSize',
    width       : 120,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
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
        columns: 2,
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
            {boxLabel: 'Date-Reel No wise' , name: 'optrep', id:'optDDN', inputValue: 1,checked:true,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){
            		 rep = "Date-Reel No wise";	
	
                    }                       
                     }
                 }
            },
/*
            {boxLabel: 'Size wise' , name: 'optrep', id:'optSize', inputValue: 2,
               listeners:{
                 check:function(rb,checked){
                    if(checked==true){

                      rep = "Size wise";
	   	
                 } 
                 }
                 }  
            },
*/
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
                if (printtype == "PDF") 
                {
                if (rep == "Date-Reel No wise")
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_salvage_details.rptdesign&__format=pdf&' + param, '_blank');
                else
                if (rep == "Size wise")
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/repDNDetails_datewise.rptdesign&__format=pdf&' + param, '_blank');	
              
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
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
			 url: 'ClsTrnSalesReelSalvage.php',
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
			 url: 'ClsTrnSalesReelSalvage.php',
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
			 url: 'ClsTrnSalesReelSalvage.php',
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
			 url: 'ClsTrnSalesReelSalvage.php',
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
	 url: 'ClsTrnSalesReelSalvage.php',
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
		url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
    readOnly    : true,
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
	        url: 'ClsTrnSalesReelSalvage.php',
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
			url: 'ClsTrnSalesReelSalvage.php',
			params: {
		          task: 'loadReelDetail',
			  compcode : Gincompcode,
//			  finid    : cmbReelNo.getValue(),
		          reelno   : cmbReelNo.getRawValue(),  
			},
			callback : function(){
//alert(loadreelnodetaildatastore.getCount());
//'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm'
                            txtVariety.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_desc'));
                            cmbVariety.setValue(loadreelnodetaildatastore.getAt(0).get('var_grpcode'));
                            txtOldWt.setRawValue(loadreelnodetaildatastore.getAt(0).get('stk_wt'));
                            txtOldSONo.setValue(loadreelnodetaildatastore.getAt(0).get('stk_sono'));
                            txtSizeName.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_name'));
                            itemcode = loadreelnodetaildatastore.getAt(0).get('stk_var_code');
                            varcode = loadreelnodetaildatastore.getAt(0).get('var_grpcode');
                            fincode = loadreelnodetaildatastore.getAt(0).get('stk_finyear');
                            oldrollno = loadreelnodetaildatastore.getAt(0).get('stk_rollno');
                            oldyymm   = loadreelnodetaildatastore.getAt(0).get('stk_yymm');

			    loadOrderNoListDataStore.removeAll();
			    loadOrderNoListDataStore.load({
				url: 'ClsTrnSalesReelSalvage.php',
				params: {
			    	task     : 'loadSONoList',
				compcode : Gincompcode,
				finid    : GinFinid,
				varty    : loadreelnodetaildatastore.getAt(0).get('var_grpcode'),
				},
				scope:this,
				callback:function()
		       		{
				cmbSONO.setValue(loadreelnodetaildatastore.getAt(0).get('stk_sono'));     

				loadSizeDatastore.removeAll();
		     		loadSizeDatastore.load({
		     		url: 'ClsTrnWinderEntry.php',
				params: {
					    task: 'loadSOsizes',
		   		            finid    : GinFinid,
					    compcode : Gincompcode,
					    sono     : loadreelnodetaildatastore.getAt(0).get('stk_sono'),
					    varietycode : loadreelnodetaildatastore.getAt(0).get('var_grpcode'),

					},
			       	callback:function()
					{
//			  	        cmbSize.setValue(loadreelnodetaildatastore.getAt(0).get('var_size2')); 
				 	}
				});

				}
			    });
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

var txtOldWt = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtOldWt',
	name        : 'txtOldWt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});
var txtOldSONo = new Ext.form.NumberField({
	fieldLabel  : '',
	id          : 'txtOldSONo',
	name        : 'txtOldSONo',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});
var txtVariety = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtVariety',
	name        : 'txtVariety',
	width       :  150,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});


var txtSizeName = new Ext.form.TextField({
	fieldLabel  : '',
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

   function check_password()
   {
      if  (gstFlag == "Add")
      {  
	      if (txtPassword.getRawValue() == "SALVAGE")
	      {
		Ext.getCmp('save').setDisabled(false);
	      }
	      else
	      {
		Ext.getCmp('save').setDisabled(true);
	      }
      }        

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


var txtReason = new Ext.form.TextField({
	fieldLabel  : 'Reason',
	id          : 'txtReason',
	name        : 'txtReason',
	width       :  450,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'50'},

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
 
function loadRollDetails()
{
	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnSalesReelSalvage.php',
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

        Ext.getCmp('cmbReelNo').setDisabled(false);
        flxDetail.getStore().removeAll();
        Ext.getCmp('cmbDocNo').hide();
        var dt = dtDocDate.getValue();
        yymm= dt.format("y")+dt.format("m");

        yy =  "20"+yymm.substring(0,2);   
        mm  =  yymm.substring(2,4);   


       txtProdMonth.setValue(yymm);

       loadRollDetails()

			loaddocnodatastore.removeAll();
			loaddocnodatastore.load({
				url: 'ClsTrnSalesReelSalvage.php',
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
   
 
   var loadDocNolistdatastore = new Ext.data.Store({
      id: 'loadDocNolistdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelSalvage.php',      // File to connect to
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
			url: 'ClsTrnSalesReelSalvage.php',
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


                           txtDocNo.setValue(loadDocNodetaildatastore.getAt(0).get('ent_no'));
                           dtDocDate.setRawValue(Ext.util.Format.date(loadDocNodetaildatastore.getAt(0).get('ent_date'),"d-m-Y"));

                           cmbReelNo.setValue(loadDocNodetaildatastore.getAt(0).get('oldreelno'));
                           cmbReelNo.setRawValue(loadDocNodetaildatastore.getAt(0).get('oldreelno'));
                           txtOldWt.setValue(loadDocNodetaildatastore.getAt(0).get('oldweight'));
		
		//	   txtVariety.setValue(loadDocNodetaildatastore.getAt(0).get('tax_name')); 
                           txtOldSONo.setValue(loadDocNodetaildatastore.getAt(0).get('oldsono')); 

			   txtSizeName.setRawValue(loadDocNodetaildatastore.getAt(0).get('oldsizename'));

                           for(var j=0; j<cnt; j++)
			   {
                              var RowCnt = flxDetail.getStore().getCount() + 1;  
                              flxDetail.getStore().insert(
                                  flxDetail.getStore().getCount(),
                                  new dgrecord({
	 	
					variery    : loadDocNodetaildatastore.getAt(0).get('newvariety'),
              				size       : loadDocNodetaildatastore.getAt(j).get('newsizename'),
					sizecode   : loadDocNodetaildatastore.getAt(j).get('newsizecode'),
					sono       : loadDocNodetaildatastore.getAt(j).get('newsono'),
					newreelno  : loadDocNodetaildatastore.getAt(j).get('newreelno'), 
					newwt      : loadDocNodetaildatastore.getAt(j).get('newweight'), 

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



var TrnSalesReelSalvagepanel = new Ext.FormPanel({
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
        id          : 'TrnSalesReelSalvagepanel',
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
				TrnSalesReelSalvagepanel.getForm().reset();
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
//edit

		                           gstFlag = "Edit";
                     			   Ext.getCmp('cmbDocNo').show();
                                           Ext.getCmp('save').setDisabled(true);
					   loadDocNolistdatastore.removeAll();
					   loadDocNolistdatastore.load({
		      		              url: 'ClsTrnSalesReelSalvage',
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

                    else if ( Number(txtNewReelNo.getValue())  >0 && txtNewReelNo.getRawValue().length != 10 ) 
                    {
                        Ext.Msg.alert('Sales ', 'Error in Reel Number format..');
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
                            url: 'TrnSalesReelSalvageSave.php',
                            params :
                             {

				cnt: SalesData.length,
			       	griddet: Ext.util.JSON.encode(SalesupData),    
				compcode : Gincompcode,
				fincode  : GinFinid,
				entno    : txtDocNo.getValue(),
				entdate  : Ext.util.Format.date(dtDocDate.getValue(),"Y-m-d"),
				oldsizecode : itemcode,
                                oldsono     : txtOldSONo.getValue(),
                                oldreelno   : cmbReelNo.getValue(),
                                oldwt       : txtOldWt.getValue(),
                                oldrollno   : oldrollno,
                                oldyymm     : oldyymm,


				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Reel Salvage Entry Saved -" + obj['entno']);
                                    TrnSalesReelSalvagepanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Reel Salvage Entry Not Saved! Pls Check!- " + obj['entno']);                                                  
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
				TrnSalesSalvageWindow.hide();
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
				width       : 160,
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
                                                x           : 450,
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

    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:310,
	    		y	:80,
	    		border	:false,
	    		items:[lblOldWT ]
	    		},


    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:420,
	    		y	:80,
	    		border	:false,
	    		items:[lbloldvariety]
	    		},
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:580,
	    		y	:80,
	    		border	:false,
	    		items:[lbloldSONO]
	    		},
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:700,
	    		y	:80,
	    		border	:false,
	    		items:[lbloldSize]
	    		},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 120,
				border      : false,
				items: [cmbReelNo]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 280,
				x           : 300,
				y           : 120,
				border      : false,
				items: [txtOldWt]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 370,
				x           : 390,
				y           : 120,
				border      : false,
				items: [txtVariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 370,
				x           : 570,
				y           : 120,
				border      : false,
				items: [txtOldSONo]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 370,
				x           : 670,
				y           : 120,
				border      : false,
				items: [txtSizeName]
			},

                { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 300,
		        width   : 900,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 170,
		        items:[ 









			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 400,
				x           : 10,
				y           : -10,
				border      : false,
				items: [lblvariety]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 400,
				x           : 420,
				y           :  -10,
				border      : false,
				items: [lblSize]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 101,
				width       : 400,
				x           : 200,
				y           : -10,
				border      : false,
				items: [lblSONO]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 700,
				y           : -10,
				border      : false,
				items: [lblWT]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 550,
				y           : -10,
				border      : false,
				items: [lblReelNo]
			},

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 200,
				x           : 0,
				y           : 10,
				border      : false,
				items: [cmbVariety]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 300,
				x           : 180,
				y           : 10,
				border      : false,
				items: [cmbSONO]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 10,
				width       : 300,
				x           : 310,
				y           : 10,
				border      : false,
				items: [cmbSize]
			},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 530,
				y           : 10,
				border      : false,
				items: [txtNewReelNo]
			},


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 300,
				x           : 690,
				y           : 10,
				border      : false,
				items: [txtNewWt]
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
			width   : 185,
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



    

   
    var TrnSalesSalvageWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        x	     : 30,
        y           : 30,
        title       : 'REEL SALVAGE ENTRY',
        items       : TrnSalesReelSalvagepanel,
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
			url: 'ClsTrnSalesReelSalvage.php',
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
			url: 'ClsTrnSalesReelSalvage.php',
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
    TrnSalesSalvageWindow.show();  
});
