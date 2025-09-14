Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var invtype = 1;
   var custtype = 1;
   var repcode = 0;
   var rbunit=0;
 
  var txtSlipNo = new Ext.form.NumberField({
        fieldLabel  : 'Slip No.',
        id          : 'txtSlipNo',
        name        : 'txtSlipNo',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });


  var txtPartyRef = new Ext.form.NumberField({
        fieldLabel  : 'Party Order.',
        id          : 'txtPartyRef',
        name        : 'txtPartyRef',
        width       :  200,
	readOnly : true,
        tabindex : 2
    });

  var txtAgent = new Ext.form.NumberField({
        fieldLabel  : 'Agent.',
        id          : 'txtagent',
        name        : 'txtAgent',
        width       :  300,
	readOnly : true,
        tabindex : 2
    });

  var dptSlip= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSlip',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

  var dptAdv= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptAdv',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

  var dptSoc= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSoc',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

  var dptPartyRef= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptPartyRef',
        name: 'Date',
        format: 'd-m-Y',
        value: new Date()
    });

 var loadAllCustomerStore = new Ext.data.Store({
      id: 'loadAllCustomerStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcustomer"}, // this parameter asks for listing
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


var loaditemstockdatastore = new Ext.data.Store({
      id: 'loaditemstockdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditemstockqty"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk','stk_units'
      ]),
    });

var loadinvoicetypedataStore = new Ext.data.Store({
      id: 'loadinvoicetypedataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvtype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'type_code','type_name'
      ]),
    });

var loadsizedataStore = new Ext.data.Store({
      id: 'loadsizedataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','var_name','cust_ref','da_date','ordh_ackno','ordh_ackdate','ordh_ref','ordh_refdt'
      ]),
    });

var loaddanodatastore = new Ext.data.Store({
      id: 'loaddanodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaddano"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_no'
      ]),
    });

var loadcusttypedatastore = new Ext.data.Store({
      id: 'loadcusttypedatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcusttype"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'cust_type','cust_repr'
      ]),
    });


var loadsocnodatastore = new Ext.data.Store({
      id: 'loadsocnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsocno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_ackno'
      ]),
    });

var loaddetailsdatastore= new Ext.data.Store({
      id: 'loaddetailsdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadqtydet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'da_urate','wt'
      ]),
    });

var loadfromtoboxDatastore= new Ext.data.Store({
      id: 'loadfromtoboxDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfromtobox"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rollno'
      ]),
    });

var loadgriddetailsDatastore = new Ext.data.Store({
      id: 'loadgriddetailsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgriddetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_finyear','stk_var_code','var_desc','var_unit','stk_sr_no','stk_wt','var_code','stk_units'
      ]),
    });






var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 300,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
				loaddanodatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loaddano',
				    custcode:this.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    invtype:cmbInvType.getValue()
		                  }
                   		});

				loadcusttypedatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadcusttype',
				    custcode:this.getValue(),
		                  },
                         	callback:function()
				{

//				alert(loadcusttypedatastore.getAt(0).get('cust_type'));
                                custtype = loadcusttypedatastore.getAt(0).get('cust_type');
                                repcode = loadcusttypedatastore.getAt(0).get('cust_repr');

				}
			    });


			   }
		     }
		});


var cmbAdvNo = new Ext.form.ComboBox({
        fieldLabel      : 'DA No.',
        width           : 110,
        displayField    : 'da_no', 
        valueField      : 'da_no',
        hiddenName      : '',
        id              : 'cmbAdvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loaddanodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
				loadsocnodatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadsocno',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode: Gincompcode,
				    dano : cmbAdvNo.getRawValue()
				}
			    });
			   }
		     }
		});


var cmbSocNo = new Ext.form.ComboBox({
        fieldLabel      : 'SOC No.',
        width           : 110,
        displayField    : 'da_ackno', 
        valueField      : 'da_ackno',
        hiddenName      : '',
        id              : 'cmbSocNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsocnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{

                select: function () {

				loadsizedataStore.load({


				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadsize',
				    customer:cmbCustomer.getValue(),
				    fincode: GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    socno : this.getRawValue()
				},
				callback:function()
				{
//alert(loadsizedataStore.getCount());
				txtAgent.setRawValue(loadsizedataStore.getAt(0).get('cust_ref'));
                                txtPartyRef.setRawValue(loadsizedataStore.getAt(0).get('ordh_ref'));
				}
			    });
			   }
		     }
		});


var cmbInvType = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice Type',
        width           : 250,
        displayField    : 'type_name', 
        valueField      : 'type_code',
        hiddenName      : '',
        id              : 'cmbInvType',
        typeAhead       : true,
        mode            : 'remote',
        store           : loadinvoicetypedataStore,
        value           :'NORMAL SALES',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
            listeners:{
                select: function () {
				loadAllCustomerStore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadcustomer',
				    invtype:this.getValue(),
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				}
			    });
			   }
		     }
});


var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : 'Size',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
//alert(cmbCustomer.getValue());
//alert(cmbAdvNo.getRawValue());
//alert(cmbSocNo.getRawValue());
//alert(cmbSize.getValue());
//alert(Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"));

				loaddetailsdatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadqtydet',
				    custcode:cmbCustomer.getValue(),
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    dano : cmbAdvNo.getRawValue(),
				    socno : cmbSocNo.getRawValue(),
				    sizecode : cmbSize.getValue()
				},
				callback:function()
				{
				txtdabalqty.setValue(loaddetailsdatastore.getAt(0).get('wt'));
				var rate = loaddetailsdatastore.getAt(0).get('da_urate');
				}
				});



				loaditemstockdatastore.load({

				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loaditemstockqty',
				    fincode:GinFinid,
				    compcode:Gincompcode,
				    sizecode : cmbSize.getValue(),
                                    slipdate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
				},
				callback:function()
				{

				txtstock.setValue(loaditemstockdatastore.getAt(0).get('stk'));
                  		rbunit = loaditemstockdatastore.getAt(0).get('stk_units');
				}
				});


				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : dptSlip
				}
				
				});
				txtStartNo.focus();
				txtEndNo.focus();
			   }
		     }
});

 var txtdabalqty = new Ext.form.NumberField({
        fieldLabel  : 'DA.Bal Qty',
        id          : 'txtdabalqty',
        name        : 'txtdabalqty',
        width       :  100,
	readOnly : true,
        tabindex : 2

    });


  var txtstock = new Ext.form.NumberField({
        fieldLabel  : 'Stock.',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  100,
	readOnly : true,
        tabindex : 2
    });

var txtStartNo = new Ext.form.ComboBox({
        fieldLabel  : 'StartNo.',
        id          : 'txtStartNo',
        name        : 'txtStartNo',
        width       :  200,
        tabindex : 2,
        displayField    : 'rollno', 
        valueField      : 'rollno',
        hiddenName      : '',
        id              : 'txtStartNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadfromtoboxDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	multiSelect : true
    });

/*   var tot_mtr, fin_tot;
    var startnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (strartnodet) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
                
            }
        }
    });


var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;
    var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        selModel: startnodet,
        columns: [startnodet,
            {header: "Start No", dataIndex: 'rollno', sortable: true, width: 70, align: 'left'}

        ]
    });*/

var st_no=0;

var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;

    var flxstartno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 150,
        width: 120,
        x: 0,
        y: 120,
        columns: [
            {header: "Start No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

        ],
        listeners: {
            cellclick: function (flxstartno, rowIndex, cellIndex, e) {
                var selected_rows = flxstartno.getSelectionModel().getSelections();
		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     st_no = selected_rows[i].data.rollno;
		     txtStartNo.setRawValue(st_no);
                }
            }
        }
    });

/*var tot_mtr, fin_tot;
    var endnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            click: function (endnodet) {
                   var selected_rows = flxendno.getSelectionModel().getSelections();
		var cnt = flxendno.getSelectionModel().getCount();

		var stcnt = flxstartno.getSelectionModel().getCount();
                var strows = flxstartno.getSelectionModel().getSelections();
		for(var a=0;i<stcnt;a++)
		{
		 stno = strows[a].data.rollno;
		alert(stno);
		for(var i=0;i<cnt;i++)
		{
		 endno = selected_rows[i].data.rollno;
                loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:stno,
				stnoto:endno,
				compcode:1
				    
				}
				
				});
		}
}
            }
        }
    });*/

var end_no = 0;


var firstno = 0;
var lastno = 0;


function grid_tot(){
        var bundles = 0;
        var reels = 0;
        var wt = 0;	
	fdbl_totalvalue=0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
           if (sel[i].data.var_unit==1) {
              bundles=bundles+1;
           }
           else
           {
              reels=reels+1;
           }   
              wt=wt+Number(sel[i].data.stkwt);
         }
 
         txttotbundles.setRawValue(bundles);
         txttotreels.setRawValue(reels);
         txttotwt.setRawValue(wt);
}




    var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;

    var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 150,
        width: 120,
        x: 150,
        y: 120,
        columns: [
            {header: "End No", dataIndex: 'rollno', sortable: true, width: 117, align: 'left'}

        ],
        listeners: {

            cellclick: function (flxendno, rowIndex, cellIndex, e) {
                loadgriddetailsDatastore.removeAll();
                var selected_rows = flxendno.getSelectionModel().getSelections();

		
                for (var i = 0; i < selected_rows.length; i++)
                {
                     end_no = selected_rows[i].data.rollno;
		     txtEndNo.setRawValue(end_no);
                }
                
//alert(st_no);

//alert(end_no);

var firstno = st_no;
var lastno = end_no;
/*alert(cmbSize.getValue());
alert(st_no);
alert(end_no);
alert(rbunit);
alert(Gincompcode);*/
			 loadgriddetailsDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				task: 'loadgriddetails',
				varitycode:cmbSize.getValue(),
				stnofrom:st_no,
				stnoto:end_no,
                                unit:rbunit,
				compcode:Gincompcode
				
			},
			 callback: function () {
//alert(rbunit);
//alert(cmbSize.getValue());
				flxDetail.getSelectionModel().selectAll();
			        var selrows = flxDetail.getSelectionModel().getCount();
			        var sel = flxDetail.getSelectionModel().getSelections();
				var stkcnt  = 0;
			//	alert(selrows);
/*
       				for (var i=0;i<selrows;i++)
				{
       				 if (sel[i].data.stksrno == st_no || sel[i].data.stksrno == end_no)
				{
       				 stkcnt = stkcnt + 1;
       				 }
       				 }

*/
//alert(firstno);       	
//alert(lastno);
                        stkcnt  = 0;
			for (var i=st_no;i<=end_no;i++)
                                {
          
                                    for (var k=0;k<selrows;k++)
                                    { 
                                       if (sel[k].data.stksrno == i)
                                       {
                                          stkcnt = stkcnt + 1;
                                       }

                                    } 

                                }                                
             			if (stkcnt > 0)
				{
				        Ext.MessageBox.alert("Alert Msg","Same Number Already exists");
			        }
				else
				{
	   			  	var cnt=loadgriddetailsDatastore.getCount();
				//	alert(cnt);
				   	if(cnt>0)
					{                        
		                   	for(var j=0; j<cnt; j++)
						{ 
				   		var stk_finyear    = loadgriddetailsDatastore.getAt(j).get('stk_finyear');
                                   		var stk_var_code   = loadgriddetailsDatastore.getAt(j).get('stk_var_code');
	                           		var var_desc       = loadgriddetailsDatastore.getAt(j).get('var_desc');
         	                   		var var_unit       = loadgriddetailsDatastore.getAt(j).get('var_unit');
                  	           		var stk_sr_no      = loadgriddetailsDatastore.getAt(j).get('stk_sr_no');
                            	   		var stk_wt         = loadgriddetailsDatastore.getAt(j).get('stk_wt');
                                   		var var_code       = loadgriddetailsDatastore.getAt(j).get('var_code');
                                   		var stk_units      = loadgriddetailsDatastore.getAt(j).get('stk_units');


				   var RowCnt = flxDetail.getStore().getCount() + 1;  
                                   flxDetail.getStore().insert(
                                   flxDetail.getStore().getCount(),
                                    new dgrecord({
						  vardesc     : var_desc,
						  varunit     : var_unit,
						  stksrno     : stk_sr_no,
						  stkwt       : stk_wt,
						  varcode     : stk_var_code,
						  varunit     : var_unit,
						  stkvarcode  : stk_var_code,
						  stkfinyear  : stk_finyear,
						  stkfincode  : stk_finyear	    
                                   		})

                               			);
						grid_tot();
						}
					}		
			    
			
            			}
}
});
loadfromtoboxDatastore.removeAll();

				loadfromtoboxDatastore.load({
				url: 'ClsTrnSalesPackSlip.php',
				params: {
				    task: 'loadfromtobox',
                                    sizecode : cmbSize.getValue(),
				    fincode  : GinFinid,
				    compcode : Gincompcode,
				    slipdate : dptSlip
				}
				
				});
st_no=0;
end_no=0;


        }
}
    });


/*var dgrecord = Ext.data.Record.create([]);
    var fm = Ext.form;
    var flxendno = new Ext.grid.EditorGridPanel({
        frame: false,
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadfromtoboxDatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        selModel: endnodet,
        columns: [endnodet,
            {header: "End No", dataIndex: 'rollno', sortable: true, width: 70, align: 'left'}

        ]
    });*/

   var txtEndNo = new Ext.form.ComboBox({
        fieldLabel  : 'End No.',
        id          : 'txtEndNo',
        name        : 'txtEndNo',
        width       :  100,
        tabindex : 2,
	width           : 200,
        displayField    : 'rollno', 
        valueField      : 'rollno',
        hiddenName      : '',
        id              : 'txtEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadfromtoboxDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	listeners:
		{
		blur:function()
			{

				
			/*fabricstockdownloadDateStore.removeAll();
			loadwtlistdetstore.load({
         		url: 'ClsWtlist.php',
                 	params: 
			{
                        task: 'loadwtlistdet',
                        wtlistseqno:cmbwtlistno.getValue()
                       	},
			 callback: function () {
				var cnt=loadwtlistdetstore.getCount();
				if(cnt<=0)
					{  
                			Ext.Msg.alert("Alert","No Weight list Details Available");
					}
				else
	   			  	var cnt=loadwtlistdetstore.getCount();
				   	if(cnt>0){                        
		                   	for(var j=0; j<cnt; j++){ 
				   		var FabStkBaleNo    = loadwtlistdetstore.getAt(j).get('stkbaleno');
                                   		var prod_sortname   = loadwtlistdetstore.getAt(j).get('prodname');
	                           		var FabSTkShadeCode = loadwtlistdetstore.getAt(j).get('wtlistcolorcode');
         	                   		var FabStkLength    = loadwtlistdetstore.getAt(j).get('wtlistlength');
                  	           		var FabStkGrossWt   = loadwtlistdetstore.getAt(j).get('wtlistgrosswt');
                            	   		var FabStkNetWt     = loadwtlistdetstore.getAt(j).get('wtlistnetwt');
                                   		var FabStkWidth     = loadwtlistdetstore.getAt(j).get('wtlistwidth');
                                   		var FabStkShade     = loadwtlistdetstore.getAt(j).get('stkcolorcode');
                                   		var FabStkGrade     = loadwtlistdetstore.getAt(j).get('catalogname');
                                   		var JoHdseqno       = loadwtlistdetstore.getAt(j).get('wtlistseqno');
                                   		var styleid         = loadwtlistdetstore.getAt(j).get('wtliststyleid');
                                   		var baleid          = loadwtlistdetstore.getAt(j).get('wtlistbaleid');
                                   		var prodno          = loadwtlistdetstore.getAt(j).get('prodno');
                                   		var prodseqno          = loadwtlistdetstore.getAt(j).get('prodseqno');

				   var RowCnt = flxDetail.getStore().getCount() + 1;  
                                   flxDetail.getStore().insert(
                                   flxDetail.getStore().getCount(),
                                    new dgrecord({
						  FabStkBaleNo    : FabStkBaleNo,
						  prod_sortname   : prod_sortname,
						  FabSTkShadeCode : FabSTkShadeCode,
						  FabStkLength    : FabStkLength,
						  FabStkGrossWt   : FabStkGrossWt,
						  FabStkNetWt     : FabStkNetWt,
						  FabStkWidth     : FabStkWidth,
						  FabStkShade     : FabStkShade,
						  FabStkGrade     : FabStkGrade,
						  JoHdseqno       : JoHdseqno,
						  styleid         : styleid,
						  baleid          : baleid,
						  prodno	  : prodno,
						  prodseqno	  : prodseqno		    
                                   		})
                               			);
						grid_tot();
						}
					}		
				}    
			});*/
		}
	}
    });

var txttotbundles = new Ext.form.NumberField({
        fieldLabel  : 'No of Bundles.',
        id          : 'txttotbundles',
        name        : 'txttotbundles',
        width       :  100,
        tabindex : 2
    });

   var txttotreels = new Ext.form.NumberField({
        fieldLabel  : 'No of Reels.',
        id          : 'txttotreels',
        name        : 'txttotreels',
        width       :  100,
        tabindex : 2
    });

var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'Tot Wt.',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       :  100,
        tabindex : 2
    });

var FlxBoxDetailDatastore = new Ext.data.Store({   
        reader: new Ext.data.JsonReader({
        root:'rows',
        totalProperty: 'results',
        id:'FlxBoxDetailDatastore'
        },[
           'vardesc','varunit','stksrno','stkwt','varcode','varunit','stkvarcode','stkfinyear','stkfincode'
        ])
    });
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:10,
    height: 230,
    hidden:false,
    width: 810,
//    font-size:18px,
    columns:
    [
	{header: "Item Ref.",dataIndex: 'vardesc',sortable:true,width:200,align:'left'},
	{header: "Units",    dataIndex: 'varunit',sortable:true,width:200,align:'left'},
	{header: "Number",   dataIndex: 'stksrno',sortable:true,width:200,align:'left'},
	{header: "Weight",   dataIndex: 'stkwt',sortable:true,width:200,align:'left'},
	{header: "ItemCode", dataIndex: 'varcode',sortable:true,width:200,align:'left'},
	{header: "UnitCode", dataIndex: 'varunit',sortable:true,width:200,align:'left'},
	{header: "Prd.Code", dataIndex: 'stkvarcode',sortable:true,width:200,align:'left'},
	{header: "Finyear", dataIndex: 'stkfinyear',sortable:true,width:200,align:'left'},
	{header: "Fincode", dataIndex: 'stkfincode',sortable:true,width:200,align:'left'}
    ],
    store: FlxBoxDetailDatastore,
    listeners:{	
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'Packing Slip',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Do You Want To Remove This Record!',
              fn: function(btn){
             if (btn === 'yes'){
           var sm = flxDetail.getSelectionModel();
        var selrow = sm.getSelected();
        flxDetail.getStore().remove(selrow);
        flxDetail.getSelectionModel().selectAll();
        grid_tot();
       // CalculatePOVal();
       }
      }
     });         
    }

   }
});


	
var TrnSalesPackSlipPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SALES PACKING SLIP ENTRY',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesPackSlipPanel',
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
                }
            }
        },'-',
          {
            text: 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {
                   	 if(cmbInvType.getRawValue()=="" || cmbInvType.getValue()==0)
			{
				alert("Select Invoice Type..");
			}
                   	 else if(cmbCustomer.getRawValue()=="" || cmbCustomer.getValue()==0)
			{
				alert("Select Customer..");
			}
                   	 else if(cmbAdvNo.getRawValue()=="" || cmbAdvNo.getValue()==0)
			{
				alert("Select DA No..");
			}
                   	else if(cmbSocNo.getRawValue()=="" || cmbSocNo.getValue()==0)
			{
				alert("Select SOC No..");
			}
                   	else if(cmbSize.getRawValue()=="" || cmbSize.getValue()==0)
			{
				alert("Select Size..");
			}
			else if (flxDetail.rows==0)
	                    {
	                        Ext.Msg.alert('PS','Grid should not be empty..');
	                        gstSave="false";
	                    } 
             		else
			{               
					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
		                           msg: 'Do You Want to save the Record',
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
                                               var finData = flxDetail.getStore().getRange();                                        
      					       var finupdData = new Array();
                                               Ext.each(finData, function (record) {
                                               finupdData.push(record.data);
                                               });  
                                         
                                               Ext.Ajax.request({
				               url: 'TrnSalesPackSlipSave.php',
				               params:
						{
	                                        cnt: finData.length,
                               	                griddet: Ext.util.JSON.encode(finupdData),
						compcode :Gincompcode,
						fincode :GinFinid,                                      
 		                                slipno : txtSlipNo.getValue(),
                                                slipdate :Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),	
						invtype : invtype,
						ordno : txtPartyRef.getRawValue(),
						orddate : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d"),
						socno: cmbSocNo.getRawValue(),
						socdt:Ext.util.Format.date(dptSoc.getValue(),"Y-m-d"),
						dano : cmbAdvNo.getRawValue(),
						dadate : Ext.util.Format.date(dptAdv.getValue(),"Y-m-d"),
						party : cmbCustomer.getValue(),
						type : custtype,
						repr : repcode,

						noofbundles:txttotbundles.getValue(),
						noofreels:txttotreels.getValue(),
						totwt:txttotwt.getValue(),
						invno:'',
						invdt:'',
						status:'',
						closests:'',
						cancelflag:'N'	
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
	                                    Ext.MessageBox.alert("Packing List No -" + obj['slipno']);
	                                    TrnSalesPackSlipPanel.getForm().reset();
	                                    flxDetail.getStore().removeAll();
	                                    RefreshData();
	                                  }else
						{
    Ext.MessageBox.alert("Packing List Not Saved! Pls Check!- " + obj['slipno']);                                                  
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
                    TrnSalesPackSlipWindow.hide();
                }
            }
        }]
    },

    items: [
           {   
           xtype       : 'fieldset',
           title       : '',
           width       : 450,
           height      : 130,
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
                       items: [txtSlipNo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptSlip]
   		  },
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 400,
                       x           : 0,
                       y           : 34,
                       border      : false,
                       items: [cmbInvType]
                   },
                  { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 68,
                       border      : false,
                       items: [cmbCustomer]
                   },

                  ] 
            },

            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 450,
                height      : 130,
                x           : 500,
                y           : 10,
                border      : true,
                layout      : 'absolute',
                items:[
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 220,
                       x           : 0,
                       y           : 0,
                       border      : false,
                       items: [cmbAdvNo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 0,
	               border      : false,
                       items: [dptAdv]
   		  },
      
                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 220,
                       x           : 0,
                       y           : 25,
                       border      : false,
                       items: [cmbSocNo]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 25,
	               border      : false,
                       items: [dptSoc]
   		  },


                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 240,
                       x           : 0,
                       y           : 50,
                       border      : false,
                       items: [txtPartyRef]
                   },
               	   { 
	               xtype       : 'fieldset',
           	       title       : '',
		       labelWidth  : 50,
                       width       : 400,
                       x           : 230,
       		       y           : 50,
	               border      : false,
                       items: [dptPartyRef]
   		  },



                   { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 80,
                       width       : 450,
                       x           : 0,
                       y           : 75,
                       border      : false,
                       items: [txtAgent]
                   },

                  ] 
            },

            {
                xtype       : 'fieldset',
                title       : '',
                width       : 940,
                height      : 350,
                x           : 10,
                y           : 150,
                border      : true,
                layout      : 'absolute',
                items:[  
                     { 
                         xtype       : 'fieldset',
                         title       : '',
                         width       : 320,
                         height      : 310,
                         x           : 10,
                         y           : 10,
                         border      : true,
                         layout      : 'absolute',
                         items:[ 
		                 { 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 0,
		                       y           : 0,
		                       border      : false,
		                       items: [cmbSize]
		                 },
{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 0,
		                       y           : 40,
		                       border      : false,
		                       items: [txtdabalqty]
		                 },
{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 0,
		                       y           : 80,
		                       border      : false,
		                       items: [txtstock]
		                 },
				{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 160,
		                       x           : 0,
		                       y           : 120,
		                       border      : false,
		                       items: [//txtStartNo
					flxstartno
]
		                 },
{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 160,
		                       x           : 150,
		                       y           : 120,
		                       border      : false,
		                       items: [//txtEndNo
				flxendno]
		                 },
                         ]
                      } ,

                     { 
                         xtype       : 'fieldset',
                         title       : '',
                         width       : 550,
                         height      : 310,
                         x           : 350,
                         y           : 10,
                         border      : true,
                         layout      : 'absolute',
                         items:[ flxDetail,
				{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 0,
		                       y           : 240,
		                       border      : false,
		                       items: [txttotbundles]
		                 },
				{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 180,
		                       y           : 240,
		                       border      : false,
		                       items: [txttotreels]
		                 },
				{ 
		                       xtype       : 'fieldset',
		                       title       : '',
			               labelWidth  : 50,
		                       width       : 280,
		                       x           : 350,
		                       y           : 240,
		                       border      : false,
		                       items: [txttotwt]
		                 }
                         ]
                      } ,


                ]

            },
   
    ],     

});

   function RefreshData(){
loadPackSlipnodatastore.load({
                url: 'ClsTrnSalesPackSlip.php',
                params: {
                    task: 'loadPackSlipNo'
                },
		callback:function()
		{
		txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
		}
            });

   };



   var loadPackSlipnodatastore = new Ext.data.Store({
      id: 'loadPackSlipnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesPackSlip.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPackSlipNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'packno'
      ]),
    });

 
var TrnSalesPackSlipWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 30,
        title       : 'SALES - PACKING SLIP ENTRY',
        items       : TrnSalesPackSlipPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : true,
        draggable   : false,
	listeners:{
            show:function(){
		loadPackSlipnodatastore.load({
                  url: 'ClsTrnSalesPackSlip.php',
                  params: {
                     task: 'loadPackSlipNo'
                  },
		  callback:function()
                 {
                    txtSlipNo.setValue(loadPackSlipnodatastore.getAt(0).get('packno'));
                 }
               });

               loadinvoicetypedataStore.load({
                  url: 'ClsTrnSalesPackSlip.php',
                  params: {
                      task: 'loadinvtype'
                  }
	       });

               loadAllCustomerStore.load({
                  url: 'ClsTrnSalesPackSlip.php',
                  params: {
                  task: 'loadcustomer',
                  invtype:1,
		  fincode:GinFinid,
		  compcode:Gincompcode,
		  despdt : Ext.util.Format.date(dptSlip.getValue(),"Y-m-d")
                  }
               });
             }
        } 
    });
	
       TrnSalesPackSlipWindow.show();  
});
