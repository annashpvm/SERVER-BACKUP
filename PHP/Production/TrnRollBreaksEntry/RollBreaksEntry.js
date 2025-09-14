Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');



var dtproddate = new Ext.form.DateField({
    fieldLabel : 'P.DATE	',
    id         : 'dtproddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    width : 100,
	listeners:{
        select: function(){
                  refresh();
	}
	}
});

var cmbShift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 60,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbShift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-size:12px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                 refresh();
	}
	}
   });

function refresh()
{
            flxProduction.getStore().removeAll();
}


 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnRollcardEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });

   var fm = Ext.form;
var dgrecord = Ext.data.Record.create([]);
var flxProduction = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:40,
    height: 350,
    hidden:false,
    width: 1100,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:35,align:'left'},          
        {header: "QUALITY", dataIndex: 'quality',sortable:true,width:150,align:'left'},
        {header: "QLYCODE", dataIndex: 'qlycode',sortable:true,width:10,align:'left',hidden:true},
        {header: "ROLL No", dataIndex: 'rollno',sortable:true,width:60,align:'left'},//0

        {header: "SHADE", dataIndex:'shade',sortable:true,width:100,align:'left',
		editor: new fm.ComboBox({
		allowBlank: false,
		store: loadShadeDataStore,
		displayField: 'shade_shortname',
		valueField: 'shade_shortname',
		hiddenName: 'shade_shortname',
	   	id: 'cmbShade',
	   	typeAhead: true,
	    	mode: 'remote',
	   	forceSelection: false,
	    	triggerAction: 'all',
	    	selectOnFocus: false,
	    	editable: true,
	    	allowblank: false,
	    	listeners: {
	             select: function () {
                     }
	    	}
              })
        },

        {header: "SPEED", dataIndex: 'speed',sortable:true,width:60,align:'left'},//14
        {header: "DECKLE", dataIndex: 'deckle',sortable:true,width:50,align:'left'},//14
        {header: "DRAW", dataIndex: 'draw',sortable:true,width:50,align:'left'},//14
        {header: "IN TIME", dataIndex: 'intime',sortable:true,width:60,align:'left'},//14
        {header: "OUT TIME", dataIndex: 'outtime',sortable:true,width:60,align:'left'},//14
        {header: "RUN MINS", dataIndex: 'runmins',sortable:true,width:60,align:'left'},//2
        {header: "BREAKS", dataIndex: 'breaks',sortable:true,width:90,align:'left',
              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    decimalPrecision: 0,
                    listeners: {
                        focus: function () {
                            var sm = flxProduction.getSelectionModel();
                            var selrow = sm.getSelected();
                        },
                        blur:function(){

                        },
                        keyup: function () {
                        }
                    }
                }},
        {header: "BRK(Mins)", dataIndex: 'breakmins',sortable:true,width:100,align:'left',
              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    decimalPrecision: 0,
                    listeners: {
                        focus: function () {
                            var sm = flxProduction.getSelectionModel();
                            var selrow = sm.getSelected();
                        },
                        blur:function(){

                        },
                        keyup: function () {
                        }
                    }
                }},
        {header: "RW Deck", dataIndex: 'rwdeck',sortable:true,width:100,align:'left',
              editor: {
                    xtype: 'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,
                    decimalPrecision: 1,
                    listeners: {
                        focus: function () {
                            var sm = flxProduction.getSelectionModel();
                            var selrow = sm.getSelected();
                        },
                        blur:function(){

                        },
                        keyup: function () {
                        }
                    }
                }},
        {header: "ROLL DIA", dataIndex: 'rolldia',sortable:true,width:60,align:'left'},//3
        {header: "ROLL WT(T)", dataIndex: 'rollwt',sortable:true,width:70,align:'left'},//1
        {header: "Set", dataIndex: 'set',sortable:true,width:70,align:'left'},//1
        {header: "Reason for Loss", dataIndex: 'reason',sortable:true,width:90,align:'left'},//1
	{header: "PP No", dataIndex: 'ppno',sortable:true,width:60,align:'left',hidden:false},//15,hidden:true
        {header: "FIN WT(MT)", dataIndex: 'finwt',sortable:true,width:90,align:'left'},//16,hidden:true
    ],
	store : [],
});


var loadShiftDatastore = new Ext.data.Store({
      id: 'loadShiftDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShiftDetails_1"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prdh_id', 'prdh_compcode', 'prdh_fincode', 'prdh_date', 'prdh_shift', 'prdh_spvrcode', 
'prdh_operator', 'prdh_ppno','prdh_avlmins', 'prdh_runmins', 'prdh_downmins', 'prdh_prodn',
'prd_seqno','prd_ppno','prd_slno', 'prd_rollno', 'prd_speed', 'prd_deckle', 'prd_draw', 'prd_roll_intime',
'prd_roll_outtime', 'prd_roll_dia', 'prd_runmins', 'prd_breaks','prd_breakmins' , 'prd_rollwt', 'prd_finprod', 
'prd_reason', 'prd_roll_status', 'prd_roll_refno','prd_rwdeck', 'prd_process_date','var_desc','prd_variety','prd_set','prd_shade'

      ]),
    });


var TrnRollBreaksEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ROLL BREAKS ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
        frame       : false,
        id          : 'TrnRollBreaksEntryFormPanel',
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
		    {
                    text: 'New',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Add Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
                {
//EDIT
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
			    Ext.getCmp('dtproddate').setDisabled(true);  
			    Ext.getCmp('cmbShift').setDisabled(true)

                            flxProduction.getStore().removeAll();
 
		            loadShiftDatastore.removeAll();
		            loadShiftDatastore.load({
	     			url: '/SHVPM/Production/TrnProdnEntry/ClsProdnEntry.php',
				params: {
				    task: 'loadShiftDetails_1',
				    finid    : GinFinid,
				    compcode : Gincompcode,
                                    shift1   : cmbShift.getValue(),
                                    edate    : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),

        
				},
		              	callback:function()
		                {
                                  var cnt=loadShiftDatastore.getCount(); 
                                  if (cnt >0)
                                  {    
                
                                        prodseqno = loadShiftDatastore.getAt(0).get('prdh_id')
//                                        cmbsupervisor.setValue(loadShiftDatastore.getAt(0).get('prdh_spvrcode'));
//                                        cmbShiftIncharge.setValue(loadShiftDatastore.getAt(0).get('prdh_operator'));
                                     
   					for(var j=0; j<cnt; j++)
 		                        { 
					        var RowCnt = flxProduction.getStore().getCount() + 1;
					        flxProduction.getStore().insert(
					        flxProduction.getStore().getCount(),
					        new dgrecord({
					           sno       : flxProduction.getStore().getCount()+1,
						   quality   : loadShiftDatastore.getAt(j).get('var_desc'),
 			                           qlycode   : loadShiftDatastore.getAt(j).get('prd_variety'),
 			                           shade     : loadShiftDatastore.getAt(j).get('prd_shade'),

                          			   rollno    : loadShiftDatastore.getAt(j).get('prd_rollno'),
						   speed     : loadShiftDatastore.getAt(j).get('prd_speed'),
						   deckle    : loadShiftDatastore.getAt(j).get('prd_deckle'),
					           draw      : loadShiftDatastore.getAt(j).get('prd_draw'),
					           intime    : loadShiftDatastore.getAt(j).get('prd_roll_intime'),
						   outtime   : loadShiftDatastore.getAt(j).get('prd_roll_outtime'),
						   runmins   : loadShiftDatastore.getAt(j).get('prd_runmins'),
						   breaks    : loadShiftDatastore.getAt(j).get('prd_breaks'),
						   breakmins  : loadShiftDatastore.getAt(j).get('prd_breakmins'),

                                                   set       : loadShiftDatastore.getAt(j).get('prd_set'),
					           rolldia   : loadShiftDatastore.getAt(j).get('prd_roll_dia'),
					           rollwt    : loadShiftDatastore.getAt(j).get('prd_rollwt'),
					           reason    : loadShiftDatastore.getAt(j).get('prd_reason'),  
						   ppno      : loadShiftDatastore.getAt(j).get('prd_ppno'),
						   finwt     : loadShiftDatastore.getAt(j).get('prd_finprod'),
						   rwdeck    : loadShiftDatastore.getAt(j).get('prd_rwdeck'),
					       }) 
					       );

                                        }
//                                        grid_tot();
					//grid_tot_downtime();
//					grid_tot_roll();
//                                        flxRollProduction.getSelectionModel().clearSelections();
                                     }
                                     else
                                     {
                                        alert("Data Not found...");
                                     }  
                        }
                  });
                } }
                },'-',
               {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                  var gstSave;

//alert(flxDetail.getStore().getCount());		 
  
                    gstSave="true";
		    if (flxProduction.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
        	                gstSave="false";
	                    }

		    else if(cmbShift.getRawValue()=="" )
		    {
			alert("Select Shift ..");
			gstSave="false";
			cmbShiftIncharge.setFocus();
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


                            var ProdData = flxProduction.getStore().getRange();                                        
                            var ProdupData = new Array();
                            Ext.each(ProdData, function (record) {
                                ProdupData.push(record.data);
                            });




//alert(cmbPO.getRawValue());

                            Ext.Ajax.request({
                            url: 'TrnRollBreaksEntrySave.php',
                            params :
                             {
                     
				cnt: ProdData.length,
                               	griddet: Ext.util.JSON.encode(ProdupData),    

                                savetype:gstFlag,
                                prdhseqno      : prodseqno,
                             	prdhcompcode   : Gincompcode,
				prdhfincode    : GinFinid,
				prdhdate       : Ext.util.Format.date(dtproddate.getValue(),"Y-m-d"),
				prdhshift      : cmbShift.getRawValue(),



				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                    
                                    Ext.MessageBox.alert("Breaks are updated -" + obj['msg']);
                                    TrnRollBreaksEntryFormPanel.getForm().reset();
                                    flxProduction.getStore().removeAll();
//                                    flxRollProductionDetailed.getStore().removeAll();
//                                    flxDownTime.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Breaks are Not updated! Pls Check!- " + obj['msg']);                                                  
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
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
  //                          TrnRollBreaksEntryWindow.RefreshData();
                            flxProduction.getStore().removeAll();
                            RefreshData();
                            cmbShift.setRawValue();
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
                            TrnRollBreaksEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 200,
                                	x           : 0,
                                	y           : 10,
                                  	border      : false,
                                	items: [dtproddate]
                                },
			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 30,
                                	width       : 140,
                                	x           : 230,
                                	y           : 10,
                                  	border      : false,
                                	items: [cmbShift]
                                 },

			        { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 1300,
                                	x           : 0,
                                	y           : 60,
                                  	border      : false,
                                	items: [flxProduction]
                                },
          ]
               });


function RefreshData()
{
 flxProduction.getStore().removeAll();

    Ext.getCmp('dtproddate').setDisabled(false);  
    Ext.getCmp('cmbShift').setDisabled(false)
    
}

     var TrnRollBreaksEntryWindow = new Ext.Window({
        height      : 550,
        width       : 1200,
        y           : 40,
        layout      : 'fit',
        items       : TrnRollBreaksEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
onEsc:function(){
},
        listeners:
            {
               show:function(){
                      RefreshData();	   	
	   	}
            }
    });
       TrnRollBreaksEntryWindow.show();
});
