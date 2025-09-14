Ext.onReady(function(){
   Ext.QuickTips.init();

var GinFinid =localStorage.getItem('ginfinid');
var Gincompcode = localStorage.getItem('gincompcode');

var gstyear =localStorage.getItem('gstyear');

    var gstfinyear = localStorage.getItem('gstyear');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

var gstFlag = "Add";

var seccode = 0;
var secname;
var editrow = 0;
var gridedit = "false";



var NewDays = localStorage.getItem('newdays');
var EditDays   = localStorage.getItem('editdays');



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
'iss_rate', 'iss_cat_code', 'iss_unit', 'iss_cr_status', 'iss_for', 'iss_indno', 'iss_ind_compcode','iss_section', 'iss_equip','item_name','section_name', 'equip_name', 'iss_machine', 'ind_bal_Qty', 'iss_slno', 'ind_fin_code','iss_vou_refno'
 
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



	
  var txtIssueNo = new Ext.form.NumberField({
        fieldLabel  : 'Issue No',
        id          : 'txtIssueNo',
        name        : 'txtIssueNo',
        width       :  90,

        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
	readOnly : true,
        tabindex : 2,
        enableKeyEvents: true,
        listeners:{
	    keyup:function(){
//alert(viewopt);
//alert(Gincompcode);
//alert(GinFinid);
//alert(txtIssueNo.getValue());
//alert("IS");
               if (viewopt == 1 && Number(txtIssueNo.getValue()) > 0 )  
               {
			loadissuenoDatastore.removeAll(); 
			loadissuenoDatastore.load({
			url: 'ClsIssue.php',
			params:
			{
				task     :"loadissnodetails",
				issno    : txtIssueNo.getValue(),
				finid    : GinFinid,
				compcode : Gincompcode,
				isstype  : "IS",
			},  
			callback: function () 
			{
				flxDetail.getStore().removeAll();
				var cnt=loadissuenoDatastore.getCount();
				
				if(cnt>0)
				{

		                     cmbDept.setValue(loadissuenoDatastore.getAt(0).get('iss_dept_code'));
		
		                     dtpissdate.setRawValue(Ext.util.Format.date(loadissuenoDatastore.getAt(0).get('iss_date'),"d-m-Y"));

		                     txtVouList.setRawValue(loadissuenoDatastore.getAt(0).get('iss_vou_refno'));

				     for(var j=0; j<cnt; j++)
				     {

                                         var isval = Number(loadissuenoDatastore.getAt(j).get('iss_rate')) * Number(loadissuenoDatastore.getAt(j).get('iss_qty'));
 
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
				            rate        : loadissuenoDatastore.getAt(j).get('iss_rate'),
				            stock       : Number(loadissuenoDatastore.getAt(j).get('item_stock'))+Number(loadissuenoDatastore.getAt(j).get('iss_qty')),
					    issqty      : loadissuenoDatastore.getAt(j).get('iss_qty'),   
                                 	    oldqty      : loadissuenoDatastore.getAt(j).get('iss_qty'),   
					    issval      : Ext.util.Format.number(isval, "0.00"),
				            })
				         );
				     }

				}
                                grid_tot();
			} 
		});
              }
	    }
        } 
    });



  function datecheck()
  {

        var dt_today = new Date();
        var dtgrn = dtpissdate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays > 30)
        {     
             alert("You are Not Allowed to Raise the ISSUE in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the ISSUE in Future date");
             dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);


    if(Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","ISSUE Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","ISSUE Date is not in current finance year. Please check");
    }

 }

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
          }  ,
           change:function(){
              datecheck();
           },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
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
    fieldLabel  : 'Issue Value',
    id          : 'lblIssVal',
    width       : 60,
    labelStyle  : "font-size:14px;font-weight:bold;color:#fc03db",
});



var lblIssQty = new Ext.form.Label({
    fieldLabel  : 'Issue Qty',
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
                                       txtAvgRate.setValue(loadItemStockDatastore.getAt(0).get('item_avg_rate'));
                                       txtStock.setValue(loadItemStockDatastore.getAt(0).get('item_stock'));

                                       txtIssQty.focus();

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
	txtIssQty.setValue('');
	txtIssVal.setValue('');
        txtStock.setValue('');
        txtAvgRate.setValue('');

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

         else if (txtIssQty.getValue()=="" || txtIssQty.getValue==0)
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
/* 
	   var cnt = 0;
           for (var i=0;i<selrows;i++)
           {

              if (sel[i].data.item == txtItemName.getRawValue())
              {
                cnt = cnt + 1;

              }
           }
*/

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
		sel[idx].set('issqty'   , txtIssQty.getRawValue());
 		sel[idx].set('issval'   , txtIssVal.getRawValue());
		sel[idx].set('stock'    , txtStock.getRawValue());
		sel[idx].set('rate'     , txtAvgRate.getRawValue());

		flxDetail.getSelectionModel().clearSelections();
              

            }//if(gridedit === "true")

            else
            if (addok == "true")
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
	    	   issqty:txtIssQty.getRawValue(),
	           issval:txtIssVal.getRawValue(),
                   stock : txtStock.getRawValue(),
                   rate : txtAvgRate.getRawValue(),
                 }) 
               );

            }
            else
            {
         	alert("Same Item Already Exist");
            } 
               grid_tot();
  	       refresh();
         txtItemName.setRawValue('');
         txtItemName.focus();

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
                   txtVouList.focus();

             }
          },  
        select: function(){
        }    

}
   });

 



var txtAvgRate = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtAvgRate',
        name        : 'txtAvgRate',
        width       :  80,
        allowBlank  :  false,
	tabindex : 1,
        decimalPrecision: 5,
   //     readOnly   : true,
    });

var txtTotValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value ',
        id          : 'txtTotValue',
        name        : 'txtTotValue',
        width       :  120,
        allowBlank  :  false,
	tabindex : 1,
style: {
            'color':'#0C5DA9',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
       labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly   : true,
    });


var txtVouList = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtVouList',
        name        : 'txtVouList',
        width       :  120,
        allowBlank  :  false,
	tabindex : 1,
        enableKeyEvents: true,
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
	 if (Number(txtIssQty.getValue()) > Number(txtStock.getValue()))
	 {
	     alert("Issue Quantity should not higher then Stock Quantity..");
               txtIssQty.focus(); 
	     txtIssQty.setValue(txtStock.getValue()); 
	 }  
    
         var IssVal = Number(txtIssQty.getValue())*Number(txtAvgRate.getValue());


         txtIssVal.setRawValue(Ext.util.Format.number(IssVal, "0.00"));
         
}


var txtIssQty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssQty',
        width       : 80,
        name        : 'txtIssQty',    
        enableKeyEvents: true,
        decimalPrecision: 3,
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

var txtIssVal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIssVal',
        width       : 80,
        readOnly   : true,
        name        : 'txtIssVal',    
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

function grid_tot()
{
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
                txtTotValue.setRawValue(Ext.util.Format.number(fdbl_totalvalue, "0.00"));
				   
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
    width: 1050,
    columns:
    [
        {header: "SNo", dataIndex: 'sno',sortable:true,width:50,align:'left'},
        {header: "Machine", dataIndex: 'machine',sortable:true,width:100,align:'left'},
        {header: "Section", dataIndex: 'section',sortable:true,width:250,align:'left'},
        {header: "Equipment", dataIndex: 'equipment',sortable:true,width:250,align:'left'},
        {header: "Item Name", dataIndex: 'item',sortable:true,width:270,align:'left'},
        {header: "ItemCode", dataIndex: 'itemcode',sortable:true,width:50,align:'left'},
        {header: "Unit", dataIndex: 'uom',sortable:true,width:100,align:'left'},
        {header: "AvgRate", dataIndex: 'rate',sortable:true,width:100,align:'right'},
        {header: "Stock Qty", dataIndex: 'stock',sortable:true,width:100,align:'right'},
        {header: "Issue Qty", dataIndex: 'issqty',sortable:true,width:50,align:'right'},
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:70,align:'right'},
        {header: "Sec.Code", dataIndex: 'sectioncode',sortable:true,width:100,align:'left'},
        {header: "EquipCode", dataIndex: 'equipcode',sortable:true,width:100,align:'left'},
        {header: "Old Qty", dataIndex: 'oldqty',sortable:true,width:50,align:'left'},
    ],
	store : [],
    listeners:{	
        'celldblclick' : function(flxDetail, rowIndex, cellIndex, e){
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
	
		    	txtAvgRate.setValue(selrow.get('rate'));
		    	txtIssQty.setValue(selrow.get('issqty'));
		    	txtStock.setValue(selrow.get('stock'));
		    	txtIssQty.setRawValue(selrow.get('issqty'));
		    	txtIssVal.setRawValue(selrow.get('issval'));
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
       Ext.getCmp('txtIssueNo').setReadOnly(true);
       txtVouList.setRawValue('');
       txtTotValue.setRawValue(''); 	

       viewopt =0 ;
       
       flxDetail.getStore().removeAll();

		Issnodatastore.load({
                url: 'ClsIssue.php',
                params: {
                    task: 'loadissno',
			compcode:Gincompcode,
			fincode:GinFinid,
                        isstype:"IS"

                },
		callback:function()
		{
//alert(Issnodatastore.getCount());
		txtIssueNo.setValue(Issnodatastore.getAt(0).get('issno'));
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
    		msg: 'Do u want to save',
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
     				isshno      : txtIssueNo.getValue(),
				isscompcode : Gincompcode,
				issfincode  : GinFinid,
                                dept        : cmbDept.getValue(),
				issdate     : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
                                isstype     : "IS",
                                issentdate  : Ext.util.Format.date(new Date(),"Y-m-d"), 
                                vounolist   : txtVouList.getRawValue(),
    
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
                            msg: 'Issue No Is: ' + obj['IssNo'],
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
                            msg: 'Failed to save Issue No. '+ obj['IssNo'],
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
        title       : 'ISSUE',
        header      : false,
        width       : 920,	
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
                           Ext.getCmp('txtIssueNo').setReadOnly(false);
                           txtIssueNo.setValue();   
                           txtIssueNo.focus();   

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
//View
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

  		  var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&fromno=" + encodeURIComponent(txtIssueNo.getRawValue());
		  var p4 = "&tono=" + encodeURIComponent(txtIssueNo.getRawValue());
            	  var p5 = "&voutype=" + encodeURIComponent('IS');
                  var param = (p1+p2+p3+p4+p5) ;  

		  window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresIssuePrint.rptdesign&__format=pdf' + param); 
                        }                    }
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
                title   : 'ISSUE',
                layout  : 'hbox',
                border  : true,
                height  : 515,
                width   : 1150,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 60,
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
                                       items: [txtIssueNo]
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
                               items: [cmbDept]
                          },

                         {
                                xtype: 'fieldset',
                                title: 'Vou Ref List',
                                border: true,
                                height: 60,
                                width: 170,
                               labelWidth:1,
                               x:950,  
                               y:10,
                               items: [txtVouList]
                          },

		{ xtype   : 'fieldset',
                title   : 'ISSUE Details',
                layout  : 'hbox',
                border  : true,
                height  : 380,
                width   : 1100,
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
                                	x           : 500,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblstock]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 70,
                                	width       : 400,
                                	x           : 600,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblRate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 670,
                                	y           : 25,
                                    	border      : false,
                                	items: [lblIssQty]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 770,
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
                                	x           : 480,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtStock]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 570,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtAvgRate]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 660,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtIssQty]
                            },

				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 1,
                                	width       : 400,
                                	x           : 760,
                                	y           : 50,
                                    	border      : false,
                                	items: [txtIssVal]
                            },btnAdd,

			flxDetail,

			    { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 100,
                                	width       : 400,
                                	x           : 760,
                                	y           : 310,
                                    	border      : false,
                                	items: [txtTotValue]
                            },



                         ]},
				//btnSubmit
                ]

            }
            
        ]
    });
    
   
    var TrnIssueWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 35,
        title       : 'ISSUE ENTRY',
        items       : TrnIssueFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":" #b3ffd7"},
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
			txtIssueNo.focus();
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
				Ext.getCmp('dtpissdate').focus(false, 0);	
				const input = document.getElementById('dtpissdate');
				const end = input.value.length;
				input.setSelectionRange(0,0);
				input.focus();	
	   	
	   			 }
			
		}
    });
    TrnIssueWindow.show();  
});
