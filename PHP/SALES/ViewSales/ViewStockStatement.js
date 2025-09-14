Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

var printtype='PDF';

var shade = "A";

var optbfgsm = 'A';
var bf = 0;
var gsm = 0;

var optSelectShade = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optSelectShade',
        items: [
		{boxLabel: 'Selective Shade', name: 'optSelectShade', id:'optshade', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    shade = cmbShade.getRawValue();
                                            load_data();
					}
				}
			}
		},
		{boxLabel: 'All Shades', name: 'optSelectShade', id:'optAllShade', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
	                  			shade = "A";
                                                load_data();

					}
				}
			}
		},

        ],
    }



    ]
});


var optBFGSM = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optBFGSM',
        items: [
		{boxLabel: 'ALL ', name: 'optBFGSM', id:'optALLBF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   optbfgsm = 'A';
                                           txtBF.setDisabled(false);      
                                           txtGSM.setDisabled(false);  
                                           txtBF.setValue();      
                                           txtGSM.setValue();   
                                           bf =0;
                                           gsm =0;   
 
					}
				}
			}
		},
		{boxLabel: 'BF ', name: 'optBFGSM', id:'optBF', inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   optbfgsm = 'BF';
                                           txtBF.setDisabled(false);      
                                           txtGSM.setDisabled(true);  
                                           txtBF.setValue();      
                                           txtGSM.setValue();   
                                           bf =0;
                                           gsm =0;   
 
					}
				}
			}
		},
		{boxLabel: 'GSM', name: 'optBFGSM', id:'optGSM', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					   optbfgsm = 'GSM';
                                           txtBF.setDisabled(true);      
                                           txtGSM.setDisabled(false);  
                                           txtBF.setValue();      
                                           txtGSM.setValue();       
                                           bf =0;
                                           gsm =0;  
					}
				}
			}
		},

        ],
    }



    ]
});


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

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
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,checked:false,
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

 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'var_shade','shade_shortname','shade_code','shade_shortcode'
      ]),
    });


 var loadStockListDataStore = new Ext.data.Store({
      id: 'loadStockListDataStore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadStockList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'var_name', 'var_size2', 'var_shade', 'var_inchcm', 'var_code','stock_qty','reels','var_bf','var_gsm'
      ]),
    });


var loadReelNoDatastore = new Ext.data.Store({
      id: 'loadReelNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNos"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_sr_no','stk_wt'
      ]),
    })

function load_data()
{

   

                loadStockListDataStore.removeAll();      
                loadStockListDataStore.load({
                    url: 'ClsViewStatements.php', // File to connect to
                    params:
                            {
                                task: "loadStockList",
                    		compcode  : Gincompcode,
                                shadecode : shade,
                                optbfgsm  : optbfgsm,
                                bf        : Number(txtBF.getValue()),
                                gsm       : Number(txtGSM.getValue()),


                            },
                    callback: function () {
                        grid_tot();
                   }
                });

}

var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'Select Shade',
        width           : 80,
        displayField    : 'var_shade', 
        valueField      : 'var_shade',
        hiddenName      : '',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function ()  
            {
               shade = cmbShade.getRawValue();
               load_data();
            }
        } 
   });


   var txtBF = new Ext.form.NumberField({
        fieldLabel  : 'BF',
        id          : 'txtBF',
        name        : 'txtBF',
        width       :  80,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 0,
    	enableKeyEvents: true,
        style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  flxStock.getStore().filter('var_bf', txtBF.getValue());  
                  grid_tot();
            }
        }   

    });


   var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  80,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 0,
    	enableKeyEvents: true,
        style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {

                  flxStock.getStore().filter('var_gsm', txtGSM.getValue());  
                  grid_tot();
            }
        }   
    });


   var txtTotQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtTotQty',
        name        : 'txtTotQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtTotReels = new Ext.form.NumberField({
        fieldLabel  : 'Reels',
        id          : 'txtTotReels',
        name        : 'txtTotReels',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 0,
    });

var txtNoofReels = new Ext.form.TextField({
        fieldLabel  : 'Nos',
        id          : 'txtNoofReels',
        name        : 'txtNoofReels',
        width       : 50,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",
        readOnly   : true,     	
	tabindex : 1, 
    	listeners : {
        }          
});

var txtTotWt = new Ext.form.TextField({
        fieldLabel  : 'Tot Wt',
        id          : 'txtTotWt',
        name        : 'txtTotWt',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true, 
    	listeners : {
        }          
});


var btnView1 = new Ext.Button({
 	
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "Sizewie Stock",
    width   : 80,
    height  : 35,


 listeners:{
        click: function(){       

		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
                var p2 = "&shade=" + encodeURIComponent(shade);
                var p3 = "&bf=" + encodeURIComponent(Number(txtBF.getValue()));
                var p4 = "&gsm=" + encodeURIComponent(Number(txtGSM.getValue()));
                var p5 = "&optbfgsm=" + encodeURIComponent(optbfgsm);
		var param = (p1+p2+p3+p4+p5) ;

                if (printtype == "PDF") 
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_shadewise_stock.rptdesign&__format=pdf&' + param, '_blank');
                else if (printtype == "XLS") 
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_shadewise_stock.rptdesign&__format=XLS&' + param, '_blank');
                else
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_shadewise_stock.rptdesign' + param, '_blank');
       }

     }
});


function grid_tot()
{
    

        var qty = 0;
        var nos = 0;
        var Row= flxStock.getStore().getCount();
        flxStock.getSelectionModel().selectAll();
        var sel=flxStock.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
              if (Number(sel[i].data.stock_qty) > 0)
              {
		  qty = qty + Number(sel[i].data.stock_qty);
		  nos = nos + Number(sel[i].data.reels);
              }
         }
         txtTotQty.setValue(qty);
         txtTotReels.setValue(nos);

}

function grid_tot_size(){

        var wt = 0;
         txtTotWt.setRawValue('');
         txtNoofReels.setRawValue('');
        var Row= flxReelNo.getStore().getCount();
        flxReelNo.getSelectionModel().selectAll();
        var sel=flxReelNo.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.stk_wt);
         }

         txtTotWt.setRawValue(Ext.util.Format.number(wt,'0.0'));
         txtNoofReels.setRawValue(i); 
}


var flxStock  = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:40,
    height: 380,
    hidden:false,
    width: 600,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "SIZE"  , dataIndex: 'var_name',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "SIZE"  , dataIndex: 'var_size2',sortable:false,width:70,align:'center', menuDisabled: true},
        {header: "SHADE" , dataIndex: 'var_shade',sortable:false,width:70,align:'center', menuDisabled: true},
        {header: "I / C" , dataIndex: 'var_inchcm',sortable:false,width:70,align:'center', menuDisabled: true},
        {header: "code" , dataIndex: 'var_code',sortable:false,width:7,align:'center', menuDisabled: true},
        {header: "QTY"   , dataIndex: 'stock_qty',sortable:false,width:80,align:'right', menuDisabled: true},
        {header: "No.of.Reels"   , dataIndex: 'reels',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "BF"   , dataIndex: 'var_bf',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "GSM"   , dataIndex: 'var_gsm',sortable:false,width:100,align:'center', menuDisabled: true},
    ],
    store:loadStockListDataStore,
    listeners:{	

            'cellclick': function (flxStock, rowIndex, cellIndex, e) {
		var sm = flxStock.getSelectionModel();
		var selrow = sm.getSelected();


                vcode   = selrow.get('var_code')

                flxReelNo.getStore().removeAll();
                loadReelNoDatastore.removeAll();
     		loadReelNoDatastore.load({
     		url: 'ClsViewStatements.php',
		params: {
			    task: 'loadReelNos',
                            size     :  vcode,
                            compcode :  Gincompcode, 
      
                        },
               	callback:function()
			{
                         grid_tot_size();
                        }
                });


     
    }
 }
});


var flxReelNo = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 380,
        width: 300,
        x: 360,
        y: 115,        
        columns: [   
            {header: "Reel No", dataIndex: 'stk_sr_no',sortable:true,width:150,align:'left'}, //hidden:'true'},
            {header: "Weigt", dataIndex: 'stk_wt',sortable:true,width:105,align:'left'}, //hidden:'true'},
        ],
        store:loadReelNoDatastore,
        listeners: {
             cellclick: function (flxReelNo, rowIndex, cellIndex, e) {
		 var selected_rows = flxReelNo.getSelectionModel().getSelections();
		 txtReelNo.setValue(selected_rows[0].data.stk_sr_no); 
		 txtReelNoDisplay.setValue(selected_rows[0].data.stk_sr_no);
                 get_ReelNo_Details();
             },
            },


   });



   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POS7T',
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
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                           ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 490,
                width   : 1280,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 50,
			width   : 280,
			layout  : 'absolute',
			x       : 250,
			y       : -15,
			items:[optSelectShade],
             	},
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 1000,
			y       : -15,
			items:[optprinttype],
             	},

		{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : -10,
                             width   : 220,
                             border  : false, 
                             items: [cmbShade]
                 },

		 { 
                             xtype   : 'fieldset',
                             title   : '',
          
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [flxStock]
                 },

		{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 700,
			     y       : 30,
                             items: [flxReelNo]
                 },


		 { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 200,
			     y       : 430,
                             items: [txtTotQty]
                 },

		 { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 400,
			     y       : 430,
                             items: [txtTotReels]
                 },


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 215,
				x           : 730,
				y           : 430,
				border      : false,
				items       : [txtNoofReels]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 215,
				x           : 830,
				y           : 430,
				border      : false,
				items       : [txtTotWt]
			},

		       { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 200,
				x           : 610,
				y           : 350,
				border      : false,
				items       : [btnView1]
			},
           ]
            },

		    { xtype   : 'fieldset',
			title   : 'CRITERIA',
			layout  : 'hbox',
			border  : true,
			height  : 250,
			width   : 200,
			style:{ border:'1px solid red'},
			layout  : 'absolute',
			x       : 1080,
			y       : 130,

			items:[

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 100,
			width   : 280,
			layout  : 'absolute',
			x       : 10,
			y       : 5,
			items:[optBFGSM],
             	},

			 { 
		             xtype   : 'fieldset',
		             title   : '',
		             labelWidth  : 50,
		             border  : false,
			     x       : 10,
			     y       : 120,
		             items: [txtBF]
		         },

		 { 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 50,
                             border  : false,
		             x       : 10,
			     y       : 150,
                             items: [txtGSM]
                 },
			 ]
		     } ,
       ],

   });

function Refreshdata()
{

	shade = "A";
	load_data();
        txtBF.setDisabled(true);      
        txtGSM.setDisabled(true);      
}


    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'SO Details',
        items       : RepPrePrintFormPannel,
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

        if (UserName == 'annait'  || UserName == 'suganyasal' || UserName == 'jeyasal'   )
        { 
            soopt = 1;

        }
        else   
        { 
            soopt = 0;
        }



                   Refreshdata();
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
