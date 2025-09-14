Ext.onReady(function(){
   Ext.QuickTips.init();

var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');

var gstyear =localStorage.getItem('gstyear');



var gstFlag = "Add";

var seccode = 0;
var secname;
var editrow = 0;
var gridedit = "false";


var gstStatus = "N";
//var gstGroup;
var viewopt = 0; 

var strItemCode = 0;

new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  CashReceiptEntryWindow.hide();

            }
        }]);
  var loadItemStockDatastore = new Ext.data.Store({
      id: 'loadItemStockDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['uom_short_name','item_avg_rate','item_stock'
      ]),
    });


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchitemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'item_code', 'item_name'
 

      ]),
    });





var loadItemDatastore  = new Ext.data.Store({
      id: 'loadItemDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loaditem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'item_code', type: 'int',mapping:'item_code'},
	{name:'item_name', type: 'string',mapping:'item_name'}
      ]),
    });

var Issnodatastore = new Ext.data.Store({
  id: 'Issnodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsIssue.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issno'
  ])
});




var loadissuenoDatastore = new Ext.data.Store({
      id: 'loadissuenoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadissnodetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'iss_date', 'iss_dept_code', 'iss_cost_code', 'iss_item_code', 'uom_short_name', 'item_stock', 'item_avg_rate', 'iss_qty',
'iss_rate', 'iss_cat_code', 'iss_unit', 'iss_cr_status', 'iss_for', 'iss_indno', 'iss_ind_compcode','iss_section', 'iss_equip','item_name','section_name', 'equip_name', 'iss_machine', 'ind_bal_Qty', 'iss_slno', 'ind_fin_code'
 
      ]),
    });


 var loadindentDataStore = new Ext.data.Store({
      id: 'loadindentDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindent"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ind_no','iss_fin_code'
      ]),
    });
	
var DeptDataStore = new Ext.data.Store({
      id: 'DeptDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDept"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'dept_name','dept_code'
      ]),
    });

var loadindentdetDataStore = new Ext.data.Store({
      id: 'loadindentdetDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadindentdet"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'ind_no', 'ind_fin_code', 'ind_type', 'ind_option', 'ind_dept_code', 'ind_slno', 'ind_item_code', 'ind_qty', 'item_name','app_name','ind_machine', 'section_code', 'section_name', 'equip_code', 'equip_name','uom_code', 'uom_name', 'uom_short_name', 'item_avg_rate', 'item_stock','ind_bal_qty',
'iss_no', 'iss_date', 'iss_fin_code', 'iss_dept_code', 'iss_cost_code', 'iss_item_code', 'iss_qty', 'iss_rate', 'iss_cat_code', 'iss_unit', 'iss_ent_date', 'iss_cr_status', 
'iss_slno', 'iss_for', 'iss_indno', 'iss_ind_compcode', 'iss_machine', 'iss_section', 'iss_equip', 'item_group_code', 'item_code', 
'item_name', 'item_desc', 'item_uom', 'item_hsncode','section_part', 'equip_part','item_comp_code', 'item_code', 'item_avg_rate', 'item_stock','item_fin_code'

      ]),
    });

var sectionDataStore = new Ext.data.Store({
      id: 'sectionDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSection"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'section_name' , 'section_code','sectionname' , 'sectioncode'
      ]),
    });

var EquipmentDatastore = new Ext.data.Store({
      id: 'EquipmentDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadEquipment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'equip_name','equip_code','section_name','section_code'
      ]),
    });

var CategoryDatastore = new Ext.data.Store({
      id: 'CategoryDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadcategory"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'cat_code','cat_name' 
      ]),
    });



	
  var txtissno = new Ext.form.NumberField({
        fieldLabel  : 'Iss Ret No',
        id          : 'txtissno',
        name        : 'txtissno',
        width       :  90,
        style       :  {textTransform: "uppercase"},
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	readOnly : true,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
	    keyup:function(){
//alert(viewopt);
//alert(Gincompcode);
//alert(GinFinid);
//alert(txtissno.getValue());
//alert("IS");
               if (viewopt == 1 && Number(txtissno.getValue()) > 0 )  
               {
			loadissuenoDatastore.removeAll(); 
			loadissuenoDatastore.load({
			url: 'ClsIssue.php',
			params:
			{
				task     :"loadissnodetails",
				issno    : txtissno.getValue(),
				finid    : GinFinid,
				compcode : Gincompcode,
				isstype  : "IR",
			},  
			callback: function () 
			{
				flxDetail.getStore().removeAll();
				var cnt=loadissuenoDatastore.getCount();
				
				if(cnt>0)
				{

		                     cmbDept.setValue(loadissuenoDatastore.getAt(0).get('iss_dept_code'));
		
		                     dtpissdate.setRawValue(Ext.util.Format.date(loadissuenoDatastore.getAt(0).get('iss_date'),"d-m-Y"));
				     for(var j=0; j<cnt; j++)
				     {
				         var RowCnt = flxDetail.getStore().getCount() + 1;  
				         flxDetail.getStore().insert(
				            flxDetail.getStore().getCount(),
				            new dgrecord({
					    sno         : loadissuenoDatastore.getAt(j).get('iss_slno'),
				            machine     : loadissuenoDatastore.getAt(j).get('iss_machine'),
					    section     : loadissuenoDatastore.getAt(j).get('section_name'),
					    sectioncode : loadissuenoDatastore.getAt(j).get('iss_section'),
					    equipment   : loadissuenoDatastore.getAt(j).get('equip_name'),
					    equipcode   : loadissuenoDatastore.getAt(j).get('iss_equip'), 	
					    item        : loadissuenoDatastore.getAt(j).get('item_name'),
				            itemcode    : loadissuenoDatastore.getAt(j).get('iss_item_code'),
				            uom         : loadissuenoDatastore.getAt(j).get('uom_short_name'),
				            rate        : loadissuenoDatastore.getAt(j).get('item_avg_rate'),

					    issqty      : loadissuenoDatastore.getAt(j).get('iss_qty'),   
                                 	    oldqty      : loadissuenoDatastore.getAt(j).get('iss_qty'),   
					    issval      : Number(loadissuenoDatastore.getAt(j).get('iss_rate')) * Number(loadissuenoDatastore.getAt(j).get('iss_qty')) ,
				            })
				         );
				     }

				}
			} 
		});
              }
	    }
        } 
    });

    var dtpissdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpissdate',
    name       : 'date',
    format     : 'd-m-Y',
   labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    value      : new Date(),
//    anchor     : '100%',
    width : 90,
	readOnly : false,
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbDept.focus();

             }
          }  
        }       
});


var lblItem = new Ext.form.Label({
    fieldLabel  : 'Item',
    id          : 'lblItem',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblstock = new Ext.form.Label({
    fieldLabel  : 'Stock',
    id          : 'lblstock',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblRate = new Ext.form.Label({
    fieldLabel  : 'Rate',
    id          : 'lblRate',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});


var lblUOM = new Ext.form.Label({
    fieldLabel  : 'UOM',
    id          : 'lblUOM',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});

var lblIssVal = new Ext.form.Label({
    fieldLabel  : 'Iss Ret Value',
    id          : 'lblIssVal',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



var lblIssQty = new Ext.form.Label({
    fieldLabel  : 'Iss Ret Qty',
    id          : 'lblIssQty',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



function itemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsIssue.php',
		params:
		{
			task:"loadSearchitemlist",
			item    : txtItemName.getRawValue(),
                        compcode:Gincompcode,
                        finid:GinFinid,
		},
        });
}





var txtItemName = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  400,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();

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

  function flx_click()
  {

			var sm = flxItem.getSelectionModel();
			var selrow = sm.getSelected();
			var chkitem = (selrow.get('item_code'));
			if ((selrow != null)){

				gridedit = "true";
		
				strItemCode = selrow.get('item_code');
				txtItemName.setValue(selrow.get('item_name'));
                                flxItem.hide();
                        loadItemStockDatastore.removeAll();
			loadItemStockDatastore.load({
                        url: 'ClsIssue.php',
                        params:
                            {
                                task:"loadItemStock",
                                itemcode:strItemCode,
                                compcode:Gincompcode,
                                finid:GinFinid,
                            },
                           callback: function () {
                               var cnt = loadItemStockDatastore.getCount(); 
                               if (cnt > 0) {
                                       txtUOM.setRawValue(loadItemStockDatastore.getAt(0).get('uom_short_name'));                        
                                       txtAvgCost.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStock.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));

                                       txtIssRetQty.focus();

                                    } else {
                                      alert('not found'); 
                                    } 
                           } 


                         });               
	     

			}
  }


   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        x: 0,
        y: 87,
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
                           flx_click();
                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                     flx_click();
             }
     
    
   }
   });

function refresh()
{
	txtIssRetQty.setValue('');
	txtIssRetVal.setValue('');
        txtStock.setValue('');
        txtAvgCost.setValue('');

}

function add_btn_click()
{
      var addok;
      addok ="true";
      if (cmbDept.getValue()==0 || cmbDept.getRawValue()=="")
         {
                Ext.Msg.alert('Issue Entry','Select Dept.....');
                addok="false";
         }
         else if (cmbMachine.getRawValue()=="")
         {
                Ext.Msg.alert('Issue Entry','Select machine..');
                addok="false";
         }

         else if (cmbSection.getValue()==0 || cmbSection.getRawValue()=="")
         {
                Ext.Msg.alert('Issue Entry','Select Group / Section..');
                addok="false";
         }

         else if (txtIssRetQty.getValue()=="" || txtIssRetQty.getValue==0)
         {
                Ext.Msg.alert('Issue Entry','Enter Qty..');
                addok="false";
         }                    


         else if (cmbEquipment.getValue()==0 || cmbEquipment.getRawValue()=="")
         {
                Ext.Msg.alert('Issue Entry','Select Equipment Name..');
                addok="false";
         }

         else 
         {

          
           flxDetail.getSelectionModel().selectAll();
           var selrows = flxDetail.getSelectionModel().getCount();
           var sel = flxDetail.getSelectionModel().getSelections();
	   var cnt = 0;
           for (var i=0;i<selrows;i++)
           {

              if (sel[i].data.item == txtItemName.getRawValue())
              {
                cnt = cnt + 1;

              }
           }
           if(gridedit === "true")

           {

		gridedit = "false";
        	var idx = flxDetail.getStore().indexOf(editrow);
                sel[idx].set('machine'   , cmbMachine.getRawValue()); 
		sel[idx].set('sectioncode', cmbSection.getValue());
		sel[idx].set('section'  , cmbSection.getRawValue());
		sel[idx].set('equipcode', cmbEquipment.getValue());
		sel[idx].set('equipment', cmbEquipment.getRawValue());
                sel[idx].set('uom'      ,  txtUOM.getRawValue()); 
        	sel[idx].set('item'     , txtItemName.getRawValue());
        	sel[idx].set('itemcode' , strItemCode);
		sel[idx].set('issqty'   , txtIssRetQty.getValue());
 		sel[idx].set('issval'   , txtIssRetVal.getValue());
		sel[idx].set('stock'    , txtStock.getValue());
		sel[idx].set('rate'     , txtAvgCost.getValue());

		flxDetail.getSelectionModel().clearSelections();
              

            }//if(gridedit === "true")

            else
            if (cnt ==0)
            { 
               var RowCnt = flxDetail.getStore().getCount() + 1;
               flxDetail.getStore().insert(
                 flxDetail.getStore().getCount(),
                 new dgrecord({
                   sno:RowCnt,
                   machine:cmbMachine.getRawValue(),
		   sectioncode:cmbSection.getValue(),
		   section:cmbSection.getRawValue(),
		   equipcode:cmbEquipment.getValue(),
		   equipment:cmbEquipment.getRawValue(),
                   item: txtItemName.getRawValue(),
   		   itemcode:strItemCode,
            	   uom:txtUOM.getRawValue(),
	    	   issqty:txtIssRetQty.getValue(),
	           issval:txtIssRetVal.getValue(),
                   stock : txtStock.getValue(),
                   rate : txtAvgCost.getValue(),
                 }) 
               );

            }
            else
            {
         	alert("Same Item Already Exist");
            } 
               grid_tot();
  	       refresh();

}
}

var btnAdd = new Ext.Button({
        icon:'/WorkOrder/icons/download.gif',
 //       style   : 'text-align:center;',
        width   : 70,
        height  : 30, 
        text    : "ADD  ",
        x       : 890,
        y       : 52,
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',
              fontSize  : '14px',

          },
    	listeners:{
        click: function(){    
          add_btn_click();
         }
        }
});
var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'Dept',
        width           : 280,
        displayField    : 'dept_name', 
        valueField      : 'dept_code',
        hiddenName      : '',
        id              : 'cmbDept',
        typeAhead       : true,
        mode            : 'local',
        store           : DeptDataStore,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : false,
    	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtItemName.focus();

             }
          },  
        select: function(){
        }    

}
   });

 



var txtAvgCost = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAvgCost',
        name        : 'txtAvgCost',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
        readOnly   : true,
    });

var txtStock = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtStock',
        name        : 'txtStock',
        width       :  80,
        allowBlank  :  false,
        readOnly   : true,
	tabindex : 1
    });

var txtUOM = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtUOM',
        width       : 50,
        readOnly   : true,
        name        : 'txtUOM',
    
        enableKeyEvents: true,
});


function checkqty()
{

//	 if (Number(txtIssRetQty.getValue()) > Number(txtStock.getValue()))
//	 {
	     //alert("Issue Quantity should not higher then Stock Quantity..");
//	     txtIssRetQty.setValue(txtStock.getValue()); 
//	 }  

         txtIssRetVal.setValue(txtIssRetQty.getValue()*txtAvgCost.getValue());

         
}


var txtIssRetQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssRetQty',
        width       : 80,
        name        : 'txtIssRetQty',    
        enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                 add_btn_click();
             }  
             },
           change:function(){
                  checkqty();
            }, 
           keyup:function(){
                checkqty();
            },
            keydown:function(){ 
                checkqty();
            },
            blur:function(){
               checkqty();
            },   
        }      
});

var txtIssRetVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssRetVal',
        width       : 80,
        readOnly   : true,
        name        : 'txtIssRetVal',    
        enableKeyEvents: true,
});

      var cmbMachine = new Ext.form.ComboBox({
        fieldLabel      : 'Machine',
        width           : 170,
        displayField    : 'machine',
        valueField      : 'machine',
        hiddenName      : 'machine',
        id              : 'cmbMachine',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
	store		: ['PAPER MACHINE','POWER PLANT','GENERAL'],
        listeners:{
        select:function(){


        }
    }
});



    var cmbSection = new Ext.form.ComboBox({
        fieldLabel      : 'Seciton',
        width           : 190,
        id              : 'cmbSection',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        displayField    : 'section_name',
        valueField      : 'section_code',
        hiddenName      : 'section_name',
	store		: sectionDataStore,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    listeners:{
        select:function(){

        }
    }
});


  
     var cmbEquipment = new Ext.form.ComboBox({
        fieldLabel      : 'Equipment',
        width           : 200,
        id              : 'cmbEquipment',
        typeAhead       : true,
	displayField    : 'equip_name',
        valueField      : 'equip_code',
        hiddenName      : 'equip_name',
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
	store		: EquipmentDatastore ,
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
        select: function(){

       }
    } 

   });

var fdbl_totalqty,fdbl_totalvalue;
function grid_tot(){
			fdbl_totalqty=0;
			fdbl_totalvalue=0;
			

        		var Row= flxDetail.getStore().getCount();
        		flxDetail.getSelectionModel().selectAll();
        			var sel=flxDetail.getSelectionModel().getSelections();
        			for(var i=0;i<Row;i++)
        			{
        			    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.issqty);
				    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.issval);
        			}
//				    txtqty.setValue(fdbl_totalqty);
				    //txtvalue.setValue(fdbl_totalvalue);
				   
		 }








 var fm = Ext.form;
var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:100,
    height: 210,
    hidden:false,
    width: 950,
    columns:
    [
        {header: "SNo", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "Machine", dataIndex: 'machine',sortable:true,width:100,align:'left'},
        {header: "Section", dataIndex: 'section',sortable:true,width:250,align:'left'},
        {header: "Equipment", dataIndex: 'equipment',sortable:true,width:250,align:'left'},
        {header: "Item Name", dataIndex: 'item',sortable:true,width:150,align:'left'},
        {header: "ItemCode", dataIndex: 'itemcode',sortable:true,width:50,align:'left'},
        {header: "Unit", dataIndex: 'uom',sortable:true,width:100,align:'left'},
        {header: "AvgRate", dataIndex: 'rate',sortable:true,width:100,align:'left'},
        {header: "Issue Ret Qty", dataIndex: 'issqty',sortable:true,width:50,align:'left'},
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:70,align:'left'},
        {header: "Sec.Code", dataIndex: 'sectioncode',sortable:true,width:100,align:'left'},
        {header: "EquipCode", dataIndex: 'equipcode',sortable:true,width:100,align:'left'},
        {header: "Old Qty", dataIndex: 'oldqty',sortable:true,width:50,align:'left'},
    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDetail, rowIndex, cellIndex, e){
         Ext.Msg.show({
             title: 'STORES ISSUE ENTRY',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
        	if (btn === 'yes'){

			var sm = flxDetail.getSelectionModel();
			var selrow = sm.getSelected();
         		gridedit = "true";
			editrow = selrow;
                      	txtItemName.setRawValue(selrow.get('item'));
                       	strItemCode = selrow.get('itemcode');
	
		    	txtAvgCost.setValue(selrow.get('rate'));
		    	txtIssRetQty.setValue(selrow.get('issqty'));

		    	txtIssRetQty.setValue(selrow.get('issqty'));
		    	txtIssRetVal.setValue(selrow.get('issval'));
                        txtUOM.setRawValue(selrow.get('uom')); 
            		cmbMachine.setRawValue(selrow.get('machine'));

			cmbSection.setValue(selrow.get('sectioncode'));
			cmbEquipment.setValue(selrow.get('equipcode'));

			cmbSection.setRawValue(selrow.get('section'));
			cmbEquipment.setRawValue(selrow.get('equipment'));

			flxDetail.getSelectionModel().clearSelections();
			}
                   else if (btn === 'no'){
                        var sm = flxDetail.getSelectionModel();
                        var selrow = sm.getSelected();
                        flxDetail.getStore().remove(selrow);
                        flxDetail.getSelectionModel().selectAll();
                   }
//                   CalculatePOVal();
             }
        });         
    }
   }

});

/*
var optisstype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:100,
    height:93 ,
    x:0,
    y:0,
    border: true,
    readOnly: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optisstype',
        items: [
            {boxLabel: 'Issue', name: 'optisstype', id:'optiss', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  entrytype = "IS";
               }
              }
             }
            },
            {boxLabel: 'Return', name: 'optisstype', id:'optret', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  entrytype = "IR";            
               }
              }
             }}
        ]
    }
    ]
});
*/

function RefreshData(){


       dtpissdate.focus();
Ext.getCmp('dtpissdate').focus(false, 200);

//       TrnIssueFormpanel.getForm().reset();
       flxDetail.getStore().removeAll();
       cmbMachine.setValue('GENERAL');
       cmbMachine.setRawValue('GENERAL');
       cmbSection.setValue(33);
       cmbSection.setRawValue('GENERAL');	
       cmbEquipment.setValue(340);
       cmbEquipment.setRawValue('GENERAL');
       Ext.getCmp('txtissno').setReadOnly(true);


       viewopt =0 ;
       
       flxDetail.getStore().removeAll();

		Issnodatastore.load({
                url: 'ClsIssue.php',
                params: {
                    task: 'loadissno',
			compcode:Gincompcode,
			fincode:GinFinid,
                        isstype:"IR"

                },
		callback:function()
		{
//alert(Issnodatastore.getCount());
		txtissno.setValue(Issnodatastore.getAt(0).get('issno'));
		}
            });

//	alert(txtindyr.getValue());

};

function save_click()
{

	if(cmbDept.getRawValue()=="" || cmbDept.getValue()==0)
	{
		alert("Select Department..");
		
	}
        else if ( flxDetail.getStore().getCount() ==0)
	{
		Ext.Msg.alert('Issue','Grid Should not be empty..');
	} 
	else
	{
		Ext.MessageBox.show({
                title: 'Confirmation',
                icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
    		msg: 'Do You want to save the Record ',
    		fn: function(btn)
		{
		if (btn == 'yes')
			{

			var issuedetails = flxDetail.getStore().getRange();
			var issuedata = new Array();
			Ext.each(issuedetails, function (record){
			issuedata.push(record.data);
			});
			
//alert(issuedetails.length);
			Ext.Ajax.request({
                    	url: 'TrnIssueSave.php',
	       	        params:
			{
		                griddet:Ext.util.JSON.encode(issuedata),	
				cnt         : issuedetails.length,
                                savetype    : gstFlag,                   
     				isshno      : txtissno.getValue(),
				isscompcode : Gincompcode,
				issfincode  : GinFinid,
                                dept        : cmbDept.getValue(),
				issdate     : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
                                isstype     : "IR",
                                issentdate  : Ext.util.Format.date(new Date(),"Y-m-d"), 
     
			},
			callback: function (options, success, response)
                	{
                    	var obj = Ext.decode(response.responseText);
		  	if (obj['success'] === "true") 
			{
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.OK,
                            msg: 'Issue Return No Is: ' + obj['IssNo'],
                            fn: function (btn) {
			    if (btn === 'ok') 
				{
               //             Ext.MessageBox.alert("Alert","Saved ");
			//    TrnIssueFormpanel.getForm().reset();
				RefreshData();
				}
				}
                        	});
                        }
                     	else 
			{
                        Ext.MessageBox.show({
                            title: 'Alert',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.OK,
                            msg: 'Failed to save Issue Return No. '+ obj['IssNo'],
                            fn: function (btn) 
				{
                                if (btn === 'ok') 
				{
                     		Ext.MessageBox.alert("Alert","Not Saved or Already exists.. ");
                                }
                            	}
                        	});
                    	}
              
		 	}   
        		});
    	
 		}
        }
});
	}

}

   var TrnIssueFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE RETURN',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnIssueFormpanel',
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
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
//EDIT
                       click: function () {
                           gstFlag = "Edit";
                           Ext.getCmp('txtissno').setReadOnly(false);
                           txtissno.setValue();   
                           txtissno.focus();   

                           viewopt = 1;
                           }
                    }
                    
                },'-',

                {  
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                              save_click();

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
                    handler: function(){	
                           TrnIssueWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ISSUE RETURN',
                layout  : 'hbox',
                border  : true,
                height  : 515,
                width   : 1050,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 120,
                y       : 10,
                items:[

                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 450,
                               height      : 60,
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
                                       items: [txtissno]
                                      },
                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 200,
                                       y           : 0,
                                       border      : false,
                                       items: [dtpissdate]
                                      },
                               ] 
                              },




                         {
                                xtype: 'fieldset',
                                title: 'Department',
                                border: true,
                                height: 60,
                                width: 400,
                               labelWidth:75,
                               x:500,  
                               y:10,
                               items: [
                                     cmbDept,
                               ]
                          },



		{ xtype   : 'fieldset',
                title   : 'ISSUE RETURN Details',
                layout  : 'hbox',
                border  : true,
                height  : 380,
                width   : 1010,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 100,
                items:[
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 430,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbMachine]
                            }, 
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 350,
                                	x           : 250,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbSection]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 75,
                                	width       : 400,
                                	x           : 560,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbEquipment]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 0,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblItem]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 430,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblUOM]
                            },




				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 550,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblRate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 650,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblIssQty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 760,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblIssVal]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 460,
                                	x           : -10,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtItemName]
                            },flxItem,

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 420,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtUOM]
                            },




				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 520,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtAvgCost]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 650,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtIssRetQty]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 760,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtIssRetVal]
                            },btnAdd,

			flxDetail]},
				//btnSubmit
                ]

            }
            
        ]
    });
    
   
    var TrnIssueWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'ISSUE RETURN ENTRY',
        items       : TrnIssueFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":" #b3ffd7"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){

 RefreshData();
			txtissno.focus();
			DeptDataStore.load({
               		 	url: 'ClsIssue.php',
                		params: {
                    		task: 'loadDept'
                		}
            		});
			sectionDataStore.load({
               		 	url: 'ClsIssue.php',
                		params: {
                    		task: 'loadSection'
                		}
            		});
			EquipmentDatastore.load({
               		 	url: 'ClsIssue.php',
                		params: {
                    		task: 'loadEquipment'
                		}
            		});
			CategoryDatastore.load({
               		 	url: 'ClsIssue.php',
                		params: {
                    		task: 'loadcategory'
                		}
            		});

   flxItem.hide();
		
	   	
	   			 }
			
		}
    });
    TrnIssueWindow.show();  
});
