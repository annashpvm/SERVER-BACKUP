Ext.onReady(function(){
Ext.QuickTips.init();

var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var Finid = localStorage.getItem('ginfinid');

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

var oldsizecode = 0;
var newsizecode = 0;
var oldsizename = "";
var newsizename ="";

var gstFlag = "Add";
 var loaddocnodatastore = new Ext.data.Store({
      id: 'loaddocnodatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelVarietyChange.php',      // File to connect to
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
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelVarietyChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNoDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'stk_sr_no','stk_finyear', 'stk_wt'       
      ]),
    });



 var loadFinYearDataStore = new Ext.data.Store({


     id: 'loadFinYearDataStore',
      autoLoad : true,
     proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
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


 var loaddocnolist = new Ext.data.Store({
      id: 'loaddocnolist',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelVarietyChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentrynolist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'ent_no'
      ]),
    });


 var loaddocnodetailstore = new Ext.data.Store({
      id: 'loaddocnodetailstore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelVarietyChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentrynodetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'old_name', 'old_code', 'number', 'new_name', 'new_code', 'weight', 'ent_date'

      ]),
    });





//var gstGroup;
//OUT SIDE



var cmbdocno = new Ext.form.ComboBox({
        fieldLabel      : 'Document No',
        width           : 80,
        displayField    : 'ent_no', 
        valueField      : 'ent_no',
        hiddenName      : '',
        id              : 'cmbdocno',
        typeAhead       : true,
        mode            : 'local',
        store           : loaddocnolist,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        hidden          : true,
	tabIndex	: 0,
        allowblank      : true,
        listeners:{
                select: function () {
                    flxDetail.getStore().removeAll();
                	loaddocnodetailstore.load({
			url: 'ClsTrnSalesDespatchAdvice.php',
			params: {
			        task: 'loadentrynodetails',
				docno:cmbdocno.getValue(),
				compcode :Gincompcode,
                                finid:GinFinid
			},
                      	callback:function()
                  	{

                                var cnt=loaddocnodetailstore.getCount();
                                txtdocno.setValue(cmbdocno.getValue());
                                dtdocdate.setRawValue(Ext.util.Format.date(loaddocnodetailstore.getAt(0).get('ent_date'),"d-m-Y"));   
                              
                                if(cnt>0)
		                {                        
		                    for(var j=0; j<cnt; j++)
	 	                    { 
                                flxDetail.getStore().insert(
	                               flxDetail.getStore().getCount(),
			                       new dgrecord({
							oldname   : loaddocnodetailstore.getAt(j).get('old_name'),
							oldcode   : loaddocnodetailstore.getAt(j).get('old_code'),
							number    : loaddocnodetailstore.getAt(j).get('number'),
							newname   : loaddocnodetailstore.getAt(j).get('new_name'),
							newcode   : loaddocnodetailstore.getAt(j).get('new_code'),
							weight    : loaddocnodetailstore.getAt(j).get('weight'),
		                               })
		                      	);
                                    }
                                }  
         grid_tot();
                         }
                        }); 
                        grid_tot();
                        Ext.getCmp('save').setDisabled(true);

                }
        }
}); 

var txtdocno = new Ext.form.TextField({
	fieldLabel  : 'Document No',
	id          : 'txtdocno',
	name        : 'txtdocno',
	width       :  80,
	readOnly    : true,
	disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});
var dtdocdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdocdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly   : true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});



var cmbfinyear = new Ext.form.ComboBox({
        fieldLabel      : 'Financial Year',
        width       	 :  90,
        displayField    : 'fin_year', 
        valueField      : 'fin_code',
        hiddenName      : '',
        id              : 'cmbfinyear',
        typeAhead       : true,
        mode            : 'local',
        store           : loadFinYearDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

	             		loadSalesItem.removeAll();
				loadSalesItem.load({
					url: 'ClsTrnSalesReelVarietyChange.php',
					params: {
		                          task: 'loadSizeDetails',
					  compcode  :Gincompcode,
					  finid : cmbfinyear.getValue(),
		 			},
					callback : function(){
		                 	},    
                                });      
	}
	}
});

 var loadProdnVariety = new Ext.data.Store({
      id: 'loadVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_groupcode', type: 'int',mapping:'var_groupcode'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
    });

 var loadSalesItem = new Ext.data.Store({
      id: 'loadSalesItem',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesReelVarietyChange.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });


 var loadSalesItemofVariety = new Ext.data.Store({
      id: 'loadSalesItemofVariety',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetailsOfVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });



var cmbvariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety to Change',
        width       	 :  270,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbvariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdnVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
alert(cmbvariety.getValue());
                        loadSalesItemofVariety.removeAll();
	                loadSalesItemofVariety.load({
			url: '/SHVPM/SALES/ClsSalesMain.php',
			params: {
               			    task: 'loadSizeDetailsOfVariety',
				    grpcode :cmbvariety.getValue(),
				},
			callback:function()

               			{
				}
				
	      	       });
         
	}
	}
});



var lbloldsize = new Ext.form.Label({
	fieldLabel  : 'Old Size',
	id          : 'lbloldsize',
	name        : 'lbloldsize',
	width       :  100,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
});

var txtoldsize = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtoldsize',
	name        : 'txtoldsize',
	width       :  170,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxoldsizeData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 140,
        width: 170,
        x: 25,
        y: 160,        
        columns: [   
            {header: "", dataIndex: 'var_name',sortable:true,width:165,align:'left'}, //hidden:'true'},
            {header: "", dataIndex: 'var_code',sortable:true,width:55,align:'left'}, //hidden:'true'},              
        ],
        store:'loadSalesItem', 
	listeners:{
           'cellclick' : function(flxDesc, rowIndex, cellIndex, e){                 
		var sm = flxoldsizeData.getSelectionModel();
		var selrow = sm.getSelected();
                oldsizecode = selrow.get('var_code');
                newsizecode = 0;
                oldsizename = selrow.get('var_name');
                newsizename = 0;

     		loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnSalesReelVarietyChange.php',
			params: {
		          task: 'loadReelNoDetails',
			  compcode  :Gincompcode,
			  finid : cmbfinyear.getValue(),
		          sizecode :  selrow.get('var_code'),  
			},
			callback : function(){
		 	},    
                });      
             }
        } 
   });

var lblnewvar = new Ext.form.Label({
	fieldLabel  : 'New Variety',
	id          : 'lblnewvar',
	name        : 'lblnewvar',
	width       :  100,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
});

var txtnewvar = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtnewvar',
	name        : 'txtnewvar',
	width       :  170,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);

var flxnewvarData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 140,
        width: 170,
        x: 230,
        y: 160,        
        columns: [   
            {header: "", dataIndex: 'var_name',sortable:true,width:165,align:'left'}, //hidden:'true'},       
            {header: "", dataIndex: 'var_code',sortable:true,width:165,align:'left'}, //hidden:'true'},              

        ],
        store: 'loadSalesItemofVariety', //loadsalledgerlistdatastore,
	listeners:{
           'cellclick' : function(flxDesc, rowIndex, cellIndex, e){                 
		var sm = flxnewvarData.getSelectionModel();
		var selrow = sm.getSelected();
                newsizecode = selrow.get('var_code');
                newsizename = selrow.get('var_name');

             }
        }
    

   });
   
var lblreelno = new Ext.form.Label({
	fieldLabel  : 'Reel Number',
	id          : 'lblreelno',
	name        : 'lblreelno',
	width       :  100,
    	enableKeyEvents: true,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
});

var txtreelno = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtreelno',
	name        : 'txtreelno',
	width       :  170,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var totnos = 0;
var totwt  = 0;

function grid_tot(){
        totnos = 0;
        totwt  = 0;

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
            totnos=totnos+1;
            totwt=Number(totwt)+Number(sel[i].data.weight);

        }

        txtnoofreels.setValue(totnos);
        txttotweight.setValue(totwt);

}



var dgrecord = Ext.data.Record.create([]);
var flxbundreelnoData = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 140,
        width: 170,
        x: 435,
        y: 160,        
        columns: [   
            {header: "", dataIndex: 'stk_sr_no',sortable:true,width:165,align:'left'}, //hidden:'true'},       
            {header: "", dataIndex: 'stk_finyear',sortable:true,width:55,align:'left'}, //hidden:'true'},  
            {header: "", dataIndex: 'stk_wt',sortable:true,width:55,align:'left'}, //hidden:'true'},  

        ],
        store   : 'loadreelnodatastore',
	listeners:{ 
       'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
		var sm = flxbundreelnoData.getSelectionModel();
		var selrow = sm.getSelected();
                reelno  = selrow.get('stk_sr_no');
                finyear = selrow.get('stk_finyear');
                weight  = selrow.get('stk_wt');
                
                flxDetail.getSelectionModel().selectAll();
		var selrows = flxDetail.getSelectionModel().getCount();
		var sel = flxDetail.getSelectionModel().getSelections();
		var cnt = 0;
                for (var i=0;i<selrows;i++)
                {
                      if (sel[i].data.number == reelno)
                      {
                        cnt = cnt + 1;
                      }
                }
                if (cnt > 0)
                {
                  alert("Reel Number already selected..");
                }
                else if ( oldsizecode > 0 && newsizecode > 0) {
                    var RowCnt1 = flxDetail.getStore().getCount() + 1;
		    flxDetail.getStore().insert(
		            flxDetail.getStore().getCount(),
		            new dgrecord({
			     oldname  : oldsizename,
			     oldcode  : oldsizecode,
			     number   : reelno,
			     newname  : newsizename,
			     newcode  : newsizecode,
			     weight   : weight,
                            }) 
                   );                         
               }
grid_tot();
        }
        }
    

   });



var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 130,
        width: 580,
        x: 25,
        y: 310,        
        columns: [   
            {header: "Old Name", dataIndex: 'oldname',sortable:true,width:120,align:'left'}, //hidden:'true'},       
            {header: "Old Code", dataIndex: 'oldcode',sortable:true,width:50,align:'left'},  //hidden:'true'},
            {header: "Number"  , dataIndex: 'number',sortable:true,width:100,align:'left'},
            {header: "New Name", dataIndex: 'newname',sortable:true,width:120,align:'left'}, //hidden:'true'},
            {header: "New Code", dataIndex: 'newcode',sortable:true,width:50,align:'left'}, //hidden:'true'},
            {header: "Weight"  , dataIndex: 'weight',sortable:true,width:60,align:'left'},
            
        ],
        store:[], //loadsalledgerlistdatastore,

    

   });
   
var txtnoofreels = new Ext.form.TextField({
	fieldLabel  : 'No.of Reels',
	id          : 'txtnoofreels',
	name        : 'txtnoofreels',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txttotweight = new Ext.form.TextField({
	fieldLabel  : 'Total Weight',
	id          : 'txttotweight',
	name        : 'txttotweight',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});   
   
               
var TrnSalesReelVarietyChangeFormpanel = new Ext.FormPanel({
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
        id          : 'TrnSalesReelVarietyChangeFormpanel',
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
                                gstFlag = "Add";
 				TrnSalesReelVarietyChangeFormpanel.getForm().reset();
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
                            Ext.getCmp('cmbdocno').show();
                            gstFlag = "Edit";
	                    loaddocnolist.removeAll();
                            loaddocnolist.load({
	     			url: 'ClsTrnSalesReelVarietyChange.php',
				params: {
				    task: 'loadentrynolist',
				    finid: GinFinid,
				    compcode:Gincompcode
				},
		              	callback:function()
		                {
//				   alert(loaddocnolist.getCount());	

		                }
		     	    });
		        }
		    }
		},'-',                
		{
	            text: 'Save',
                    id  : 'save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
			var gstSave;
	                    gstSave="true";
        	            if (txttotweight.getValue() == 0)
        	            {
        	                Ext.Msg.alert('Sales','Numbers not selected.....');
        	                gstSave="false";
        	            }
        	            else
				{
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
                           var finData = flxDetail.getStore().getRange();                                        
                           var indupdData = new Array();
                            Ext.each(finData, function (record) {
                                indupdData.push(record.data);
                            });

  
                          Ext.Ajax.request({
                            url: 'TrnSalesReelVarietyChangeSave.php',
                            params :
                             {
                             	griddet	  : Ext.util.JSON.encode(indupdData),                        
                                cnt       : finData.length,    
                                savetype  : gstFlag,                                
				compcode  : Gincompcode,                                 
                                finid     : cmbfinyear.getValue(),
                                docno     : txtdocno.getValue(),
				docdate   : Ext.util.Format.date(dtdocdate.getValue(),"Y-m-d"),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);alert(obj['docno']);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Variety Changes Saved -" + obj['docno']);
                           
                                    TrnSalesReelVarietyChangeFormpanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else
				   {
                                    Ext.MessageBox.alert("Variety Changes Not Saved! Pls Check!- " + obj['docno']);                                                  
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
				TrnSalesReelVarietyChange.hide();
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
		        height  : 470,
		        width   : 650,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
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
				items: [txtdocno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 190,
				x           : 10,
				y           : 10,
				border      : false,
				items: [cmbdocno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 220,
				y           : 10,
			    	border      : false,
				items: [dtdocdate]
			}, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 200,
				x           : 10,
				y           : 60,
				border      : false,
				items: [cmbfinyear]
		        }, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 400,
				x           : 220,
				y           : 60,
				border      : false,
				items: [cmbvariety]
		        },		        	 
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 100,
				x           : 15,
				y           : 90,
				border      : false,
				items: [lbloldsize]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 200,
				x           : 10,
				y           : 120,
				border      : false,
				items: [txtoldsize]
			},flxoldsizeData,		        	 
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 100,
				x           : 220,
				y           : 90,
				border      : false,
				items: [lblnewvar]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 200,
				x           : 215,
				y           : 120,
				border      : false,
				items: [txtnewvar]
			},flxnewvarData,		        	 
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 150,
				width       : 160,
				x           : 425,
				y           : 90,
				border      : false,
				items: [lblreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 200,
				x           : 420,
				y           : 120,
				border      : false,
				items: [txtreelno]
			},flxbundreelnoData,flxDetail,		        			
                 ], 
             },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 240,
				y           : 480,
				border      : false,
				items: [txtnoofreels]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 450,
				y           : 480,
				border      : false,
				items: [txttotweight]
			},                 
          ],
                 
    });



   function RefreshData(){
        Ext.getCmp('cmbdocno').hide();
        Ext.getCmp('save').setDisabled(false);
        flxDetail.getStore().removeAll();
	flxoldsizeData.getStore().removeAll(); 
	flxnewvarData.getStore().removeAll();
	flxbundreelnoData.getStore().removeAll();
	loaddocnodatastore.removeAll();
	loaddocnodatastore.load({
		url: 'ClsTrnSalesReelVarietyChange.php',
		params: {
		task: 'loadentryno',
		compcode: Gincompcode,
		finid: GinFinid
		},
		callback : function(){
                    txtdocno.setValue(loaddocnodatastore.getAt(0).get('no'));
	        }
	});
       }; 


   
    var TrnSalesReelVarietyChange = new Ext.Window({
	height      : 600,
        width       : 700,
        x	     : 200,
        y           : 30,
        title       : 'REEL VARIETY CHANGE',
        items       : TrnSalesReelVarietyChangeFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

				loaddocnodatastore.removeAll();
				loaddocnodatastore.load({
					url: 'ClsTrnSalesReelVarietyChange.php',
					params: {
					task: 'loadentryno',
					compcode: Gincompcode,
					finid: GinFinid
					},
					callback : function(){
					txtdocno.setValue(loaddocnodatastore.getAt(0).get('no'));
				        }
				});
				
				loadProdnVariety.removeAll();
				loadProdnVariety.load({
					url: '/SHVPM/SALES/ClsSalesMain.php',
					params: {
		                         task: 'loadVariety',
					},
					callback : function(){
		                 	}

				});

	             		loadFinYearDataStore.removeAll();
				loadFinYearDataStore.load({
					url: '/SHVPM/SALES/ClsSalesMain.php',
					params: {
		                          task: 'loadFinYear',
		 			},
					callback : function(){
		                 	},

                            	});

        } 
}
         
    });
    TrnSalesReelVarietyChange.show();  
});
