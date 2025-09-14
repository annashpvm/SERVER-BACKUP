Ext.onReady(function(){
   Ext.QuickTips.init();


   var GinFinid =localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var gstyear =localStorage.getItem('gstyear');



var stritemcode = 0;
function grid_tot(){

        var cvalue = 0;
        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();

       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.opvalue)  > 0)
              {
		      cvalue=Number(cvalue)+Number(sel[i].data.opvalue);

              }
         }

         txtTotStockValue.setValue(cvalue);

}

 var loadGroupListDatastore = new Ext.data.Store({
      id: 'loadGroupListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSubGroup"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
              'subgrp_code', 'subgrp_name', 'subgrp_grpcode'
      ]),
    });



 var loadGroupStockListDatastore = new Ext.data.Store({
      id: 'loadGroupStockListDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOpening.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOpeningitems"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
              'item_name','uom_short_name', 'item_code', 'item_stock',  'opvalue', 'item_avg_rate' 
      ]),
    });

  
var dgrecord = Ext.data.Record.create([]);

var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    hidden:false,
    stripeRows : true,
    scrollable: true,
    x:10,
    y:345,
    height: 400,
    width : 900,
    id: 'my-grid',  
    columns:
    [            
        {header: "Item Name" , dataIndex: 'item_name',sortable:false,width:350,align:'left', menuDisabled: true},
        {header: "UOM" , dataIndex: 'uom_short_name',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},

        {header: "Item Code" , dataIndex: 'item_code',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},

        {header: "Opening Stock" , dataIndex: 'item_stock',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Opening Value"  , dataIndex: 'opvalue',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Avg. Rate"  , dataIndex: 'item_avg_rate',sortable:false,width:120,align:'right', menuDisabled: true},
      
     ],
    store: loadGroupStockListDatastore,
    listeners:{	
       'cellclick': function (flxDetail, rowIndex, cellIndex, e) {
		var sm = flxDetail.getSelectionModel();
		var selrow = sm.getSelected();
                txtItemName.setRawValue(selrow.get('item_name'));
                txtUOM.setRawValue(selrow.get('uom_short_name'));
                txtOpeningQty.setRawValue(selrow.get('item_stock'));
                txtOpeningValue.setRawValue(selrow.get('opvalue'));
                txtAvgRate.setRawValue(selrow.get('item_avg_rate'));
                stritemcode = selrow.get('item_code');

        } 
      
    }
 
});


 var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName',
        width       :  320,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtItemName',
        readOnly    : true,
   }); 


 var txtUOM = new Ext.form.TextField({
        fieldLabel  : 'UOM',
        id          : 'txtUOM',
        width       : 120,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtUOM',
        readOnly    : true,
   }); 


 var txtTotStockValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtTotStockValue',
        width       : 120,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtTotStockValue'
   }); 


 var txtOpeningQty = new Ext.form.NumberField({
        fieldLabel  : 'Opening Qty',
        id          : 'txtOpeningQty',
        width       : 120,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtOpeningQty'
   }); 

 var txtOpeningValue = new Ext.form.NumberField({
        fieldLabel  : 'Opening Value',
        id          : 'txtOpeningValue',
        width       : 120,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtOpeningValue'
   });

 var txtAvgRate = new Ext.form.NumberField({
        fieldLabel  : 'Average Rate',
        id          : 'txtAvgRate',
        width       : 120,
        readOnly    : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        name        : 'txtAvgRate'
   });


var cmbItemGroup = new Ext.form.ComboBox({
    fieldLabel      : 'Item Group',
    width           :  300,
    displayField    : 'subgrp_name',
    valueField      : 'subgrp_code',
    hiddenName      : 'subgrp_name',
    id              : 'cmbItemGroup',
    typeAhead       : true,
    mode            : 'local',
    store           : loadGroupListDatastore,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
    forceSelection  : true,
    triggerAction   : 'all',
    selectOnFocus   : true,
    editable        : true,
    allowblank      : false,
        listeners:{
specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 // txtinvqty.focus();
             }
       },
        select: function () {
                flxDetail.getStore().removeAll();
                loadGroupStockListDatastore.removeAll();
		loadGroupStockListDatastore.load({
		url: 'ClsOpening.php',
		params: {
		    task: 'loadOpeningitems',
		    finid:GinFinid,
		    compcode:Gincompcode,
		    grpcode:cmbItemGroup.getValue()
		},
                callback:function() 
	  	 {
                   grid_tot();
                 }    
	    });
       }     


}
});

   
 var OpeningStockPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 200,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'OpeningStockPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),

   
        items: [
            {
                xtype: 'fieldset',
                title: '',
                width: 800,
                height: 540,
                x: 5,
                y: 5,
                border: true,
                layout: 'absolute',
                items: [

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 450,
                            x           : -10,
                            y           : -5,
                            border      : false,
                            items: [cmbItemGroup]
                        },

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 780,
                            x           : 10,
                            y           : 60,

                            border      : false,
                            items: [flxDetail]
                        },	

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 100,
                            width       : 700,
                            x           : 400,
                            y           : 480,
                            border      : false,
                            items: [txtTotStockValue]
                        },	
	
                ]
             },

            {
                xtype: 'fieldset',
                title: '',
                width: 500,
                height: 540,
                x: 800,
                y: 5,
                border: true,
                layout: 'absolute',
                items: [

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 700,
                            x           : 10,
                            y           : 100,
                            border      : false,
                            items: [txtItemName]
                        },	
	

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 700,
                            x           : 10,
                            y           : 140,
                            border      : false,
                            items: [txtUOM]
                        },	

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 700,
                            x           : 10,
                            y           : 180,
                            border      : false,
                            items: [txtOpeningQty]
                        },	
	

	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 700,
                            x           : 10,
                            y           : 220,
                            border      : false,
                            items: [txtOpeningValue]
                        },	
	               {
                            xtype       : 'fieldset',
                            title       : '',
                            labelWidth  : 110,
                            width       : 700,
                            x           : 10,
                            y           : 260,
                            border      : false,
                            items: [txtAvgRate ]
                        },	
	
	
                ]
            }      

        ]
});


    var OpeningStockWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
//	x	    : 150,
        y           : 25,
        title       : 'Stores Opening Stock',
        items       : OpeningStockPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
             //  monthstartdate.setValue(Ext.util.Format.date(finstartdate,"Y-m-d"));
             
             
               }    
			
	}
    });
    OpeningStockWindow.show();  
});
