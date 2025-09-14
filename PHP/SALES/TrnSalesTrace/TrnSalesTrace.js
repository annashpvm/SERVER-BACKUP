Ext.onReady(function(){
Ext.QuickTips.init();

   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

var stktype  = "STOCK";
var stksize  = "SELECTIVE";
var findno = 0;
var rbunit = 1;
var destag = 'N';

var loadsizedatastore = new Ext.data.Store({
      id: 'loadsizedatastore',
      //autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesTrace.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsize"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
         'var_code','var_name'
      ]),
    });

 var loadFinYearDataStore = new Ext.data.Store({
     id: 'loadFinYearDataStore',
     autoLoad : true,
     proxy: new Ext.data.HttpProxy({
                url: '/DPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),

            baseParams:{task:"loadFinYear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'fin_code', type: 'int',mapping:'fin_code'},
	{name:'fin_year', type: 'string',mapping:'fin_year'}
      ]),
    });


var loadstartendnodatastore = new Ext.data.Store({
      id: 'loadstartendnodatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesTrace.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsrno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reelno','bundleno','stk_units'
      ]),
    });



var loadnodatastore = new Ext.data.Store({
      id: 'loadnodatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesTrace.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_name','var_unit','var_size1','var_size2','stk_var_code','stk_sr_no','stk_wt','stk_ent_no','stk_ent_date','stk_slipno','stk_desdt','stk_destag','stk_retno','stk_retdt','stk_rettag','stk_deltag','stk_deldate'
      ]),
    });

var loadpackslipdetdatastore = new Ext.data.Store({
      id: 'loadpackslipdetdatastore',
   //   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesTrace.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpackslipdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
         'pckh_invdt','pckh_invno','cust_ref','pckh_no','pckh_date'
      ]),
    });


var cmbFinYear = new Ext.form.ComboBox({
        fieldLabel      : 'Fin Year',
        width           : 180,
        displayField    : 'fin_year', 
        valueField      : 'fin_code',
        hiddenName      : '',
        id              : 'cmbFinYear',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFinYearDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {
//alert(Gincompcode);
//alert(GinFinid);
loadsizedetails();
  		   }
                }
		
   });

function loadsizedetails()
{
        flxreelno.getStore().removeAll();
	flxbundleno.getStore().removeAll();
        loadsizedatastore.removeAll();
	loadsizedatastore.load({
		url: 'ClsTrnSalesTrace.php',
		params: {
		    task: 'loadsize',
		    finid:cmbFinYear.getValue(),
		    compcode:Gincompcode,
		    stkopt:stktype,
		},
		callback:function()
		{

	   //alert(loadsizedatastore.getCount());


		}


	});
}


///-------------Start


var txtrbno = new Ext.form.NumberField({
	fieldLabel  : 'No.',
	id          : 'txtrbno',
	name        : 'txtrbno',
	width       :  150,
	readOnly : true,
	tabindex : 2
});

var txtunit = new Ext.form.TextField({
	fieldLabel  : 'Unit',
	id          : 'txtunit',
	name        : 'txtunit',
	width       :  80,
	readOnly : true,
	tabindex : 2
});


var txtvarty = new Ext.form.TextField({
	fieldLabel  : 'Variety',
	id          : 'txtvarty',
	name        : 'txtvarty',
	readOnly : true,
	width       :  350,
	tabindex : 2
});

var txtsize = new Ext.form.TextField({
	fieldLabel  : 'Size',
	id          : 'txtsize',
	name        : 'txtsize',
	readOnly : true,
	width       :  150,
	tabindex : 2
});

var txtweight = new Ext.form.NumberField({
	fieldLabel  : 'Weight',
	id          : 'txtweight',
	name        : 'txtweight',
	width       :  90,
	readOnly : true,
	tabindex : 2
});


var txtentryno = new Ext.form.NumberField({
	fieldLabel  : 'Entry No',
	id          : 'txtentryno',
	name        : 'txtentryno',
	width       :  90,
	readOnly : true,
	tabindex : 2
});

var dtentry= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dtentry',
	name: 'Date',
	format: 'd-m-Y',
	readOnly : true,
	value: new Date()
});

var txtparty = new Ext.form.TextField({
	fieldLabel  : 'Party',
	id          : 'txtparty',
	name        : 'txtparty',
	width       :  350,
	readOnly : true,
	tabindex : 2
});

var txtinvno = new Ext.form.TextField({
	fieldLabel  : 'Inv',
	id          : 'txtinvno',
	name        : 'txtinvno',
	width       :  100,
	readOnly : true,
	tabindex : 2
});

var dptInv= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dptInv',
	name: 'Date',
	format: 'd-m-Y',
	readOnly : true,
	value: new Date()
});

var txtSlipNo = new Ext.form.NumberField({
	fieldLabel  : 'Slip No.',
	id          : 'txtSlipNo',
	name        : 'txtSlipNo',
	width       :  100,
	readOnly : true,
	tabindex : 2
});

var dptSlip= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dptSlip',
	name: 'Date',
	format: 'd-m-Y',
	readOnly : true,
	value: new Date()
});

var txtsrno = new Ext.form.NumberField({
	fieldLabel  : 'Return No.',
	id          : 'txtsrno',
	name        : 'txtsrno',
	width       :  100,
	readOnly : true,
	tabindex : 2
});

var dptsrno= new Ext.form.DateField({
	fieldLabel: 'Date',
	id: 'dptsrno',
	name: 'Date',
	format: 'd-m-Y',
	readOnly : true,
	value: new Date()
});

///------------ End

var cmbSize = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 200,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbSize',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
           select: function () {
           
                 getstocklist();
           }
        }
});

function getstocklist()
{
          refresh();
	  flxreelno.getStore().removeAll();
	  flxbundleno.getStore().removeAll();
          loadstartendnodatastore.removeAll();
          loadstartendnodatastore.load({
		url: 'ClsTrnSalesTrace.php',
		params: {
		    task: 'loadsrno',
		    size:cmbSize.getValue(),
		    compcode :Gincompcode,
		    finid:cmbFinYear.getValue(),
                    stkopt:stktype,
                    stksize:stksize,   

		},
	callback:function()
	{
           rbunit =  loadstartendnodatastore.getAt(0).get('stk_units') 
	 
/*
//             flxreelno.getStore().removeAll();
//alert("Hello");

///alert(loadstartendnodatastore.getCount());

//               var cnt=loadstartendnodatastore.getCount();

//		           for(var j=0; j<cnt; j++)
		           {
alert(loadstartendnodatastore.getAt(j).get('stk_sr_no'));
                            var RowCnt = flxreelno.getStore().getCount() + 1;  
                               flxreelno.getStore().insert(
                               flxreelno.getStore().getCount(),
                                  new dgrecord({
	                                reelno : loadstartendnodatastore.getAt(j).get('stk_sr_no') ,
                                  })
                                );
 
                           }   
*/

	}

		
	    });
}


/*
Ext.define('comboSelectedCount', {
        alias: 'plugin.selectedCount',
        init: function (combo) {

            var fl = combo.getFieldLabel();

            combo.on({
                select: function (me, records) {

                    var len = records.length,
                        store = combo.getStore();
                    
                    // toggle all selections
                    Ext.each(records, function (obj, i, recordsItself) {
                        if (records[i].data.abbreviation === 'ALL') {
                            len = store.getCount();
                            combo.select(store.getRange());
                        }
                    });

                    me.setFieldLabel(fl + ' (' + len + ' selected)');
                },
                beforedeselect: function (me, record, index) {
                    me.setFieldLabel(fl);
                }
            })
        }
    });

*/

/*

   var txtEndNo = new Ext.form.ComboBox({
        fieldLabel  : 'End No.',
        id          : 'txtEndNo',
        name        : 'txtEndNo',
        width       :  100,
        tabindex : 2,
	width           : 200,
        displayField    : 'no', 
        valueField      : 'fincode',
        hiddenName      : '',
        id              : 'txtEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	listeners:
		{
		blur:function()
			{
		}
	}
    });
*/
/*
var cmbStartNo = new Ext.form.ComboBox({
        fieldLabel      : 'StartNo',
        width           : 80,
	height : 150,
        displayField    : 'no', 
        valueField      : 'fincode',
        hiddenName      : '',
        id              : 'cmbStartNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,

	multiSelect : true
});
*/

var tot_mtr, fin_tot;
var st_no=0;
var end_no = 0;
var firstno = 0;
var lastno = 0;


/*
    var startnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (strartnodet) {
                var selected_rows = flxreelno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
                
            }
        }
    });
*/

var dgrecord = Ext.data.Record.create([]);
var fm = Ext.form;
    var flxreelno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadstartendnodatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 0,
      columns: [
      {header: "Reel No", id : 'reelno', sortable: true, width: 115, align: 'left'}

        ],
        listeners: {
            cellclick: function (flxreelno, rowIndex, cellIndex, e) {

 		var sm = flxreelno.getSelectionModel();
		var selrow = sm.getSelected();
                if  (selrow.get('reelno') != null) {
                   findno = selrow.get('reelno');
                   loadnumberdetails();
                }
                
	    }
        }
    });

function loadnumberdetails()
{
//alert(findno);
//alert(cmbSize.getValue());
//alert(rbunit);

          loadnodatastore.removeAll();
          loadnodatastore.load({
		url: 'ClsTrnSalesTrace.php',
		params: {
		    task: 'loadnodetail',
		    size:cmbSize.getValue(),
		    compcode :Gincompcode,
		    finid:cmbFinYear.getValue(),//GinFinid,
                    no:findno,
                    rbunit:rbunit,

		},
		callback:function()
		{
		  destag = loadnodatastore.getAt(0).get('stk_destag');
		  txtrbno.setValue(loadnodatastore.getAt(0).get('stk_sr_no')); 
		  txtvarty.setValue(loadnodatastore.getAt(0).get('var_desc')); 
		  txtsize.setValue(loadnodatastore.getAt(0).get('var_name'));
		  txtunit.setValue(loadnodatastore.getAt(0).get('var_unit'));
		  txtweight.setValue(loadnodatastore.getAt(0).get('stk_wt'));
          	  txtentryno.setValue(loadnodatastore.getAt(0).get('stk_ent_no')); 
 		  dtentry.setValue(Ext.util.Format.date(loadnodatastore.getAt(0).get('stk_ent_date'),"d-m-Y"));
		  dptsrno.setValue(Ext.util.Format.date(loadnodatastore.getAt(0).get('stk_ent_date'),"d-m-Y"));
                  txtSlipNo.setValue(loadnodatastore.getAt(0).get('stk_slipno'));
		  if (loadnodatastore.getAt(0).get('stk_destag') == "T")
		  { 
		     Ext.getCmp('optstockyn').setValue(2);
		  }
		  else
		  { 
		     Ext.getCmp('optstockyn').setValue(1);
		  }
		  if (loadnodatastore.getAt(0).get('stk_deltag') == "T")
		  { 
		     Ext.getCmp('optrepulpyn').setValue(1);
		  }
		  else
		  { 
		     Ext.getCmp('optrepulpyn').setValue(2);
		  }       
                  if (destag == "T")  
		  {
			  loadpackslipdetdatastore.removeAll();
			  loadpackslipdetdatastore.load({
				url: 'ClsTrnSalesTrace.php',
				params: {
				    task: 'loadpackslipdet',
				    size:cmbSize.getValue(),
				    compcode :Gincompcode,
				    finid:GinFinid,
				    no:findno,
				    slip:txtSlipNo.getValue(),

				},
				callback:function()
				{
		 		   txtinvno.setValue(loadpackslipdetdatastore.getAt(0).get('pckh_invno'));
				   txtparty.setValue(loadpackslipdetdatastore.getAt(0).get('cust_ref')); 
				   dptInv.setValue(Ext.util.Format.date(loadpackslipdetdatastore.getAt(0).get('pckh_invdt'),"d-m-Y"));
	       
				   dptSlip.setValue(Ext.util.Format.date(loadpackslipdetdatastore.getAt(0).get('pckh_date'),"d-m-Y"));
		     
			        }
			   }); 
		  }
                }
            });
}

function refresh()
{
	txtrbno.setValue(); 
	txtvarty.setValue(); 
	txtsize.setValue();
	txtunit.setValue();
	txtweight.setValue();
	txtentryno.setValue(); 
	dtentry.setValue();
	dptsrno.setValue();
	txtSlipNo.setValue();
	txtinvno.setValue();
	txtparty.setValue(); 
	dptInv.setValue();
	dptSlip.setValue();
}

var tot_mtr, fin_tot;
/*
    var endnodet = new Ext.grid.CheckboxSelectionModel({
        listeners: {
            selectionchange: function (endnodet) {
                var selected_rows = flxbundleno.getSelectionModel().getSelections();
                tot_mtr = 0;
                fin_tot = 0;
loadpackslipdetdatastore.load({
					url: 'ClsTrnSalesTrace.php',
					params: {
					    task: 'loadsrno',
					    size:this.getValue(),
					    compcode :Gincompcode,
						finid:GinFinid,
						slipno : txtSlipNo.getValue(),
						startno : cmbStartNo.getRawValue(),
//						endno : cmbEndNo.getRawValue()
					}			
				    });
                
            }
        }
    });
*/

 var dgrecord = Ext.data.Record.create([]);
 var fm = Ext.form;

    var flxbundleno = new Ext.grid.EditorGridPanel({
        frame: false,
	sm: new Ext.grid.RowSelectionModel(),
        stripeRows: true,
        hideHeaders: false,
        scrollable: true,
        store: loadstartendnodatastore,
        height: 230,
        width: 280,
        x: 800,
        y: 20,
        outsideClickDeselects: true,
        disableSelection: false,
        columns: [
            {header: "Bundle No", dataIndex: 'bundleno', sortable: true, width: 115, align: 'left'}
        ],
        listeners: {
                cellclick: function (flxbundleno, rowIndex, cellIndex, e) {
 		var sm = flxbundleno.getSelectionModel();
		var selrow = sm.getSelected();

                if  (selrow.get('bundleno') != null) {
                   findno = selrow.get('bundleno');
                   loadnumberdetails();
                }
      
             } 
        }

   });


/*
var cmbEndNo = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 80,
        displayField    : 'no', 
        valueField      : 'no',
        hiddenName      : '',
        id              : 'cmbEndNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadstartendnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
            listeners:{
                select: function () {
					
					
				   }


		     }
	

});
*/
var optallstock = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:40,
    x:480,
    y:85,
    border: true,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optallstock',
        items: [
            {boxLabel: 'All Items' , name: 'optallstock', id:'optAllStock', inputValue: 1,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                        stktype = "ALL";
                        loadsizedetails();
                     }
                 }
               }
            },
            {boxLabel: 'Stocked Items', name: 'optallstock', id:'optStock', inputValue: 2,checked:true,
               listeners:{
                 check:function(rb,checked){
                     if(checked===true){
                        stktype = "STOCK";
                        loadsizedetails();
                     }

                 }
               }
             
            },


        ]


    },
    ]
});

var optstockyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Despatch Status',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:60,
    x:480,
    y:85,
    border: true,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optstockyn',
        items: [
            {boxLabel: 'Stock' , name: 'optstockyn', id:'optstocK', inputValue: 1,
               listeners:{
                 check:function(rb,checked){

                 }
               }
            },
            {boxLabel: 'Despatched', name: 'optstockyn', id:'optdespatched', inputValue: 2,checked:true,
               listeners:{
                 check:function(rb,checked){
                 }
               }
             
            },


        ]


    },
    ]

});

var optrepulpyn = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Repulp',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:60,
    x:480,
    y:85,
    border: true,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optrepulpyn',
        items: [
            {boxLabel: 'Yes' , name: 'optrepulpyn', id:'optrepulpyes', inputValue: 1,
               listeners:{
                 check:function(rb,checked){

                 }
               }
            },
            {boxLabel: 'No', name: 'optrepulpyn', id:'optrepulpno', inputValue: 2,checked:true,
               listeners:{
                 check:function(rb,checked){
                 }
               }
             
            },


        ]


    },
    ]

});

var optallvarty = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:40,
    x:480,
    y:85,
    border: true,
    items: [

    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optallvarty',
        items: [
            {boxLabel: 'All' , name: 'optallvarty', id:'optallvarty', inputValue: 1,
               listeners:{
                 check:function(rb,checked){
                     stksize   = "ALL";
                     getstocklist();
                 }
               }
            },
            {boxLabel: 'Selective', name: 'optallvarty', id:'optSelective', inputValue: 2,checked:true,
               listeners:{
                 check:function(rb,checked){
                      stksize   = "SELECTIVE";
                      getstocklist();
                 }
               }
             
            },


        ]


    },
    ]

});

var TrnSalReturnFormpanel = new Ext.FormPanel({
	renderTo    : Ext.getBody(),
	xtype       : 'form',
	title       : 'TRACE REEL / BUNDLE',
	header      : false,
	width       : 1300,
	height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
	x           : 0,
	y           : 0,
	frame       : false,
	id          : 'TrnSalReturnFormpanel',
	method      : 'POST',
	layout      : 'absolute',
	tbar: {
		xtype: 'toolbar',
		height: 40,
		fontSize:18,
		items: [
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
					
					var varcode=Ext.getCmp('cmbSize').getValue();
			
			var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
			var p2 = "&finid=" + encodeURIComponent(cmbFinYear.getValue());
			var p3 = "&varcode=" + encodeURIComponent(varcode);
			var p4 = "&headrpt=" + "Balance Reel / Bundle List for";
			var param = (p1+p2+p3+p4) ;                         
                        window.open('http://192.168.11.14:8080/birt/frameset?__report=Sales/RepSalesBalanceReelList.rptdesign' + param);

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
						TrnSalReturnWindow.hide();
					}
				}
			},
		]
	
	},

	items: [
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 300,
			height      : 220,
			x           : 25,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[
		
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 300,
					x           : -10,
					y           : 0,
					border      : false,
					items: [cmbFinYear]
				},

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 300,
					x           : -10,
					y           : 40,
					border      : false,
					items: [optallstock]
				},
				
					{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 85,
					width       : 300,
					x           : -10,
					y           : 90,
					border      : false,
					items: [optallvarty]
				},

                 		{ 
					xtype       : 'fieldset',
					title       : 'Size Details',
					labelWidth  : 1,
					width       : 350,
					x           : -10,
					y           : 150,
					border      : false,
					//layout      : 'vbox',
					height      : 120,
					items: [cmbSize]
				},
	
			]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 300,
			height      : 280,
			x           : 25,
			y           : 230,
			border      : true,
			layout      : 'absolute',
			items:[
	
				{ 
					xtype       : 'fieldset',
					title       : 'Reel No',
					labelWidth  : 1,
					width       : 150,
					x           : 1,
					y           : 0,
					border      : false,
					//layout      : 'vbox',
					height      : 600,
					items: [flxreelno]
				},
				{ 
					xtype       : 'fieldset',
					title       : 'Bundle No.',
					labelWidth  : 1,
					width       : 150,
					x           : 150,
					y           : 0,
					border      : false,
					//layout      : 'vbox',
					height      : 600,
					items: [flxbundleno]
				}	
			]
		},
		{
			xtype       : 'fieldset',
			title       : '',
			width       : 650,
			height      : 500,
			x           : 325,
			y           : 10,
			border      : true,
			layout      : 'absolute',
			items:[ 

				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 400,
					x           : 5,
					y           : 5,
					border      : false,
					items: [txtrbno]
				},
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 250,
					x           : 220,
					y           : 5,
					border      : false,
					items: [txtunit]
				},
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 450,
					x           : 5,
					y           : 35,
					border      : false,
					items: [txtvarty , txtsize,txtweight]
				},
/*             			{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 150,
					x           : 5,
					y           : 65,
					border      : false,
					items: [txtweight]
				},*/
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 150,
					x           : 5,
					y           : 115,
					border      : false,
					items: [txtentryno]
				},
	
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 450,
					x           : 220,
					y           : 115,
					border      : false,
					items: [dtentry]
				},
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 450,
					x           : 5,
					y           : 145,
					border      : false,
					items: [optstockyn]
				},
				{ 
					xtype       : 'fieldset',
					labelWidth  : 40,
					width       : 450,
					x           : 260,
					y           : 145,
					border      : false,
					items: [optrepulpyn]
				},

                           	{
					xtype       : 'fieldset',
					title       : 'DESPATCH DETAILS',
					width       : 506,
					height      : 150,
					x           : 15,
					y           : 220,
					border      : true,
					layout      : 'absolute',
					items:[ 
						{ 
							xtype       : 'fieldset',
							labelWidth  : 70,
							width       : 450,
							x           : 5,
							y           : 0,
							border      : false,
							items: [txtparty]
						},
				 		{ 
							xtype       : 'fieldset',
							labelWidth  : 70,
							width       : 250,
							x           : 5,
							y           : 35,
							border      : false,
							items: [txtinvno]
						},
	
						{ 
							xtype       : 'fieldset',
							labelWidth  : 40,
							width       : 450,
							x           : 220,
							y           : 35,
							border      : false,
							items: [dptInv]
						},
				    		{ 
							xtype       : 'fieldset',
							labelWidth  : 70,
							width       : 250,
							x           : 5,
							y           : 65,
							border      : false,
							items: [txtSlipNo]
						},
	
						{ 
							xtype       : 'fieldset',
							labelWidth  : 40,
							width       : 450,
							x           : 220,
							y           : 65,
							border      : false,
							items: [dptSlip]
						},

                                        ]
                                } ,

                           	{
					xtype       : 'fieldset',
					title       : 'RETURN DETAILS',
					width       : 506,
					height      : 70,
					x           : 15,
					y           : 370,
					border      : true,
					layout      : 'absolute',
					items:[ 

				 		{ 
							xtype       : 'fieldset',
							labelWidth  : 70,
							width       : 250,
							x           : 0,
							y           : 0,
							border      : false,
							items: [txtsrno]
						},
	
						{ 
							xtype       : 'fieldset',
							labelWidth  : 40,
							width       : 450,
							x           : 220,
							y           : 0,
							border      : false,
							items: [dptsrno]
						},
			

                                        ]
                                } ,

                        ]
                }

	]
});

  function RefreshData(){
           TrnSalReturnFormpanel.getForm().reset();
           flxreelno.getStore().removeAll();
           flxbundleno.getStore().removeAll();
   };
   
 var TrnSalReturnWindow = new Ext.Window({
	height      : 600,
        width       : 1100,
        y           : 20,
        title       : 'TRACE REEL / BUNDLE NUMBERS',
        items       : TrnSalReturnFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,     
	listeners:{

              show:function(){
		     
	
                    }

        }
    });
   TrnSalReturnWindow.show();  


});
