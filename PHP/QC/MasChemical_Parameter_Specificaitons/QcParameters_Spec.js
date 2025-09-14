Ext.onReady(function(){
   Ext.QuickTips.init();
   
    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var item_code = 0;



 var loadChemicalParameterDatastore = new Ext.data.Store({
      id: 'loadChemicalParameterDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadChemicalParameterDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'c_itemcode', 'c_paramcode', 'c_specification', 'qc_cd_param_code', 'qc_cd_param_name'
 
      ]),
    });


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchChemicalitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name','item_spec1', 'item_spec2', 'item_spec3', 'item_spec4', 'item_spec5', 'item_spec6', 'item_spec7', 'item_spec8', 'item_spec9', 'item_spec10'
 

      ]),
    });


var loadQCParameterListDatastore = new Ext.data.Store({
      id: 'loadQCParameterListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/QC/ClsQC.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadCDParameters"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'

      },[
	'qc_cd_param_code','qc_cd_param_name'
      ]),
    });	





function grid_chk_flxLedger() {
    var sm = flxItem.getSelectionModel();
    var selrow = sm.getSelected();

    if (selrow != null) {

        item_code = selrow.get('item_code');
        txtItemName.setValue(selrow.get('item_name'));

        loadChemicalParameterDatastore.removeAll();

        loadChemicalParameterDatastore.load({
            url: '/SHVPM/QC/ClsQC.php',
            params: {
                task: 'loadChemicalParameterDetails',
                item: item_code,
            },
            callback: function () {
                flxParameter.getStore().removeAll();
                var RowCnt = loadChemicalParameterDatastore.getCount();

                for (var i = 0; i < RowCnt; i++) {
                    flxParameter.getStore().insert(
                        flxParameter.getStore().getCount(),
                        new dgrecord({
                            slno: i + 1,
                            parameter: loadChemicalParameterDatastore.getAt(i).get('qc_cd_param_name'),
                            paracode: loadChemicalParameterDatastore.getAt(i).get('c_paramcode'),
                            specification: loadChemicalParameterDatastore.getAt(i).get('c_specification')
                        })
                    );
                }

                // Optional: Add empty row for new entry
                flxParameter.getStore().add(new dgrecord({
                    slno: RowCnt + 1,
                    parameter: '',
                    paracode: '',
                    specification: ''
                }));

                // Ensure view is rendered before focusing
                Ext.defer(function () {
                    var grid = flxParameter;
                    var store = grid.getStore();
                    var lastRowIndex = store.getCount() - 1;

                    if (lastRowIndex >= 0) {
                        grid.getSelectionModel().selectRow(lastRowIndex);
                        grid.getView().focusRow(lastRowIndex);

                        // Delay startEditing slightly to ensure editor is ready
                        Ext.defer(function () {
                            grid.startEditing(lastRowIndex, 0); // Focus PARAMETER
                        }, 100);
                    }
                }, 300);
            }
        });

        flxItem.hide();
    }
}


   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 450,
        width: 420,
        x: 0,
        y: 0,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Item Code", dataIndex: 'item_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'item_name',sortable:true,width:330,align:'left'},
		
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                           grid_chk_flxLedger();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     grid_chk_flxLedger();
             }
    
   }
   });



//var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);


var flxParameter = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden: false,
    stripeRows: true,
    scrollable: true,
    clicksToEdit: 1,
    x: 10,
    y: 120,
    height: 200,
    width: 600,
    store: new Ext.data.JsonStore({
        fields: ['parameter', 'paracode', 'specification'],
        data: []
    }),
    columns: [

  
        {
            dataIndex: 'parameter',
            header: "PARAMETER",
            width: 150,
            align: 'left',
            sortable: true,
            renderer: function (value) {
                var store = loadQCParameterListDatastore;
                var idx = store.find('qc_cd_param_code', value);
                if (idx !== -1) {
                    return store.getAt(idx).get('qc_cd_param_name');
                }
                return value;
            },
            editor: new Ext.form.ComboBox({
                displayField: 'qc_cd_param_name',
                valueField: 'qc_cd_param_code',
                store: loadQCParameterListDatastore,
                editable: true,
                mode: 'local',
                triggerAction: 'all',
                enableKeyEvents: true,
                selectOnFocus: true,
                listeners: {
                    select: function (combo, record) {
                        var editorGrid = flxParameter;
                        var editor = editorGrid.activeEditor;
                        var selectedCode = record.get('qc_cd_param_code');

                        if (editor) {
                            var rowIndex = editor.row;
                            var store = editorGrid.getStore();
                            var duplicate = false;

                            // Check for duplicates
                            store.each(function (rec, idx) {
                                if (idx !== rowIndex && rec.get('parameter') === selectedCode) {
                                    duplicate = true;
                                    return false;
                                }
                            });

			if (duplicate) {
				    Ext.Msg.alert("Duplicate Parameter", "This parameter is already selected in another row.", function () {
					combo.reset();

					editorGrid.getSelectionModel().selectRow(rowIndex);
					editorGrid.getView().focusRow(rowIndex);
					editorGrid.startEditing(rowIndex, 0); // Move back to PARAMETER column (index 0)
				    });
				    return;
				}

                            var currentRecord = store.getAt(rowIndex);
                            currentRecord.set('parameter', selectedCode);
                            currentRecord.set('paracode', selectedCode);

                            // Move to SPECIFICATION (index 2)
                            Ext.defer(function () {
                                editorGrid.getSelectionModel().selectRow(rowIndex);
                                editorGrid.getView().focusRow(rowIndex);
                                editorGrid.startEditing(rowIndex, 2);
                            }, 200);
                        }
                    }
                }
            })
        },
        {
            dataIndex: 'paracode',
            header: "PARAMETER CODE",
            width: 50,
            align: 'center',
            sortable: true , hidden : true,
        },
        {
            dataIndex: 'specification',
            header: "SPECIFICATION",
            width: 200,
            align: 'center',
            sortable: true,
            editor: new Ext.form.TextField({
                allowBlank: false, // ⛔ makes field mandatory
                enableKeyEvents: true,
                listeners: {



blur: function (field) {
    var grid = flxParameter;
    var store = grid.getStore();
    var selected = grid.getSelectionModel().getSelected();
    var currentRow = store.indexOf(selected);

    if (!selected) return;

    var val = selected.get('specification');
    var pcode = Number(selected.get('paracode'));
    var trimmed = val ? val.trim() : '';

    if (trimmed === '' && pcode > 0 ) {
        // 🔒 Error shown, and field focus resumes AFTER user clicks OK
        Ext.Msg.alert("Validation Error", "Specification cannot be empty.", function () {
            grid.getSelectionModel().selectRow(currentRow);
            grid.getView().focusRow(currentRow);
            grid.startEditing(currentRow, 2); // column 2 = SPECIFICATION
        });

        selected.set('specification', '');
        return; // ⛔ prevent any further actions
    }

    // ✅ Save cleaned value
    selected.set('specification', trimmed);

    // ➕ Add new row if this is the last row and has data
    if (currentRow === store.getCount() - 1) {
        if (selected.get('parameter') || trimmed !== '') {
            store.add(new store.recordType({
                parameter: '',
                paracode: '',
                specification: ''
            }));
        }
    }

    // 👉 Move to PARAMETER of next row
    Ext.defer(function () {
        var nextRow = currentRow + 1;
        if (nextRow < store.getCount()) {
            grid.getSelectionModel().selectRow(nextRow);
            grid.getView().focusRow(nextRow);
            grid.startEditing(nextRow, 0); // PARAMETER = column 0
        }
    }, 200);
}


                }
            })
        },

        {
            dataIndex: 'delete',
            header: "",
            width: 40,
            align: 'left',
            renderer: function () {
                return '<img src="images/delete.png" style="cursor:pointer;" title="Delete Row">';
            }

        },   
    ],
    listeners: {
validateedit: function (e) {
    if (e.field === 'specification') {
        var trimmedValue = e.value ? e.value.trim() : '';
        if (trimmedValue === '') {
            Ext.Msg.alert('Validation Error', 'Specification cannot be empty or spaces.');
            return false;
        }
    }
  // e.record.set('specification', trimmed);
},

        cellclick: function (grid, rowIndex, columnIndex, e) {
            var colModel = grid.getColumnModel();
            var dataIndex = colModel.getDataIndex(columnIndex);

            if (dataIndex === 'delete') {
                Ext.Msg.confirm('Confirm Delete', 'Are you sure you want to delete this row?', function (btn) {
                    if (btn === 'yes') {
                        var store = grid.getStore();
                        if (store.getCount() > 1) {
                            store.removeAt(rowIndex);
                        } else {
                            Ext.Msg.alert('Not Allowed', 'At least one row must remain.');
                        }
                    }
                });
            }
        }
    }
});
   

function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: '/SHVPM/QC/ClsQC.php',
		params:
		{
			task :"loadSearchChemicalitemlist",
			item : txtItemName.getRawValue(),
		},
        });
}



var txtItemName = new Ext.form.TextField({
	fieldLabel  : 'Item Name',
	id          : 'txtItemName',
	name        : 'txtItemName',
	width       :  355,
    	 labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 	
	enableKeyEvents: true,
	listeners:{

          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {
                loadSearchItemListDatastore.removeAll();
                  if (txtItemName.getRawValue() != '')
                  {
                     flxItem.getEl().setStyle('z-index','10000');
                     flxItem.show();
                     itemSearch();
                  }
                  else
                  {
                     flxItem.hide();
                  }   
            }
	}
	});



   var ParameterPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'ParameterPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
                  {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtItemName.getRawValue() == '' ) 
				{

					alert("Enter Item Name");
					txtItemName.setFocus();
				}
				else
				{

			     var grnData = flxParameter.getStore().getRange();                                        
				      var grnupdData = new Array();
				      Ext.each(grnData, function (record) {
						grnupdData.push(record.data);
				      });



					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'QCTestParameter_SpecSave.php',
                		       	        params:
						{

						     griddet : Ext.util.JSON.encode(grnupdData),
						     cnt     : grnData.length,

						     savetype : saveflag,
						     ItemName  : txtItemName.getRawValue(),
						     ItemCode  : item_code,
						     
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
                                                    flxParameter.getStore().removeAll();
						    ParameterPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
                                              
							if(obj['cnt']>0)
							{
                                                            Ext.MessageBox.alert("Alert","Already exists.. ");
							}
							else
							{
                                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
		 					}
                                                    
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                    handler: function(){
                       RefreshData();
                    }
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    handler: function(){	
                            ParameterWindow.hide();
                    }      
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : 'Chemical Parameter',
                layout  : 'hbox',
                border  : true,
                height  : 420,
                width   : 800,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 160,
                y       : 25,	
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 140,
                                	width       : 650,
                                	x           : 0,
                                	y           : 40,
                                    	border      : false,
                                	items: [txtItemName]
                          },
                          



                                          
                       flxParameter,


			{ 
                        	xtype       : 'fieldset',
                        	title       : '',
                        	labelWidth  : 110,
                        	width       : 450,
                        	x           : 100,
                        	y           : 65,
                            	border      : false,
                        	items: [flxItem]
                         },


       ]
       
       }
       ]
       
 
});
   
    function RefreshData(){
        txtItemName.setRawValue("");
        flxParameter.getStore().removeAll();
        flxItem.hide();
        saveflag = "Add";	

	flxParameter.getStore().insert(
	flxParameter.getStore().getCount(),
	new dgrecord({
        parameter: '',
        paracode : '',
        specification: '',
	})
	);
	
};


 var ParameterWindow = new Ext.Window({
	height      : 560,
        width       : 1200,
        y           : 50,
        title       :'CHEMICAL PARAMETER MASTER',
        items       : 'ParameterPanel',
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
             }
             }
            });
             
            ParameterWindow.show();  
        });      
   
