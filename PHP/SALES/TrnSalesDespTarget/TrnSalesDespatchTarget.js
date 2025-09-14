Ext.onReady(function(){
   Ext.QuickTips.init();
   var gstadd;
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');

   var mamachine = localStorage.getItem('ma_machine');
   var mamachinename = localStorage.getItem('ma_machinename');

   var editrow = 0;
   var gridedit = "false";

   var Validatechk = "true";
   var lsize;
   var bsize;
   var gsm;
   var ordtype = "L";
   var varcodelist = "(";
   var sizecodelist = "("  
   var gstFlag = "Add";
   var vartycode = 0;

 var loadRepListDatastore = new Ext.data.Store({
      id: 'loadRepListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchTarget.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRepresentative"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'repr_code', 'repr_name'
 
      ]),
    });


 var loadCustomerDatastore = new Ext.data.Store({
      id: 'loadCustomerDatastore',
  //    autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesDespatchTarget.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadCustomerList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'sno','cust_ref','cust_code','cust_cr_days','cust_desp_target','cust_noof_visits','cust_payperf'
 
      ]),
    });

var cmbRepresentative = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbRepresentative',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRepListDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                 txtTotQty.setValue('');
                 flxTarget.getStore().removeAll();
	         loadCustomerDatastore.load({

			url: 'ClsTrnSalesDespatchTarget.php',
			params: {
			    task: 'loadCustomerList',
                            repcode:cmbRepresentative.getValue()
                        },
                   	callback:function()
			{
        grid_tot(); 
                         }
                 });
                 grid_tot();                           
	}
	}
});


var lblDescription = new Ext.form.Label({
    fieldLabel  : 'SALES TARGET ENTRY',
    id          : 'lblDescription',
    width       : 200,
    labelStyle  : "font-size:20px;font-weight:bold;color:#0080ff",
});

 var txtCustSearch = new Ext.form.TextField({
        fieldLabel  : 'SEARCH',
        id          : 'txtQlySearch',
        name        : 'txtQlySearch',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  true,
	tabindex : 1,
        readOnly : false,
        store       : loadCustomerDatastore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
            keyup: function () {


                  flxTarget.getStore().filter('cust_ref', txtCustSearch.getValue());  
            }
        }
    });
function grid_tot(){

        var wt = 0;	
        var Row= flxTarget.getStore().getCount();
        flxTarget.getSelectionModel().selectAll();

        var sel=flxTarget.getSelectionModel().getSelections();

        for(var i=0;i<Row;i++)
        {
              wt=wt+Number(sel[i].data.cust_desp_target);
        }

        txtTotQty.setValue(Ext.util.Format.number(wt,'0.000'));
     //   flxTarget.getSelectionModel().DeselectAll();
}

var txtTotQty = new Ext.form.NumberField({
	fieldLabel  : 'Total Qty(t)',
	id          : 'txtTotQty',
	name        : 'txtTotQty',
	width       :  80,
	readOnly : true,
	labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2,
	style : "font-size:14px;font-weight:bold",
});

var dgrecord = Ext.data.Record.create([]);
var flxTarget = new Ext.grid.EditorGridPanel({
    frame: true,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:450,
    y:60,
    height: 420,
    hidden:false,
    width: 800,
//    font-size:18px,
    columns:
    [
        {header: "S.No", dataIndex: 'sno',sortable:true,width:40,align:'left'},
        {header: "Party Name" , dataIndex: 'cust_ref',sortable:true,width:280,align:'left'},
        {header: "Party code" , dataIndex: 'cust_code',sortable:true,width:5,align:'left'},
        {header: "Pay Terms", dataIndex: 'cust_cr_days',sortable:true,width:100,align:'left',
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { 
	}}}},
        {header: "Target(t)"    , dataIndex:'cust_desp_target',sortable:true,width:100,align:'left',
   	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { grid_tot();
	}}}},
        {header: "No.of.Visits"    , dataIndex:'cust_noof_visits',sortable:true,width:100,align:'left',
   	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { grid_tot();
	}}}},
        {header: "Pay Perf"    , dataIndex:'cust_payperf',sortable:true,width:100,align:'left',
   	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
	     	    listeners:{
             	    keyup: function () { grid_tot();
	}}}},
    ],
//   grid_tot();
    store: loadCustomerDatastore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         
    }

   }
});

var TrnSalesTargetPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'PRODUCTION PLAN ENTRY',
    header      : false,
    width       : 600,
    height      : 190,
   bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSalesTargetPanel',
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
//EDIT
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//alert(GinFinid);
//alert(Gincompcode);
                    gstFlag = "Edit";
           
                }
            }
        },'-',
          {
//SAVE
            text: 'Save',
            id  : 'Save',
            style  : 'text-align:center;',
            tooltip: 'Save Details...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function()
                {

                    var gstSave;
                    gstSave="true";
                    if (txtTotQty.getRawValue()==0 || txtTotQty.getRawValue()=="")
                    {
                        Ext.Msg.alert('Sales Target','Total qty is Empty.....');
                        gstSave="false";
                    }

		    else if (flxTarget.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Sales Target','Grid should not be empty..');
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
                            var SalesData = flxTarget.getStore().getRange();                                        
                            var SalesupData = new Array();
                            Ext.each(SalesData, function (record) {
                                SalesupData.push(record.data);
                            });

//alert(cmbPO.getRawValue());

                            Ext.Ajax.request({
                            url: 'TrnSalesDespatchTargetSave.php',
                            params :
                             {
				cnt: SalesData.length,
                               	griddet: Ext.util.JSON.encode(SalesupData),    
                                savetype:gstFlag,

                             	repcode : cmbRepresentative.getValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Sales Target Saved -" + obj['msg']);
                                    TrnSalesTargetPanel.getForm().reset();
                                 //   flxTarget.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Sales Target Not Saved! Pls Check!- " + obj['msg']);                                                  
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
                    TrnSalesTargetWindow.hide();
                }
            }
        	}]
    },

    items: [
              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 300,
                width       : 700,
                x           : 200,
                y           : 10,
                border      : false,
                items: [lblDescription]
               },
		       
              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 170,
                width       : 500,
                x           : 20,
                y           : 60,
                border      : false,
                items: [cmbRepresentative]
               },
               flxTarget,
              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 100,
                width       : 500,
                x           : 850,
                y           : 480,
                border      : false,
                items: [txtTotQty]
               },
 		{ 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 170,
                    width       : 500,
                    x           : 20,
                    y           : 100,
                    border      : false,
                    items: [txtCustSearch]
                   
                },

    ], 
   });
   function RefreshData()
{

}

 var TrnSalesTargetWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
        y           : 30,
        title       : 'SALES - DESPATCH TARGET ENTRY',
        items       : TrnSalesTargetPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false  ,
	listeners:{
               show:function(){
//RefreshData();
//alert(mamachine);
     

/*
			GetVarietyNameDatastore.removeAll();
			GetVarietyNameDatastore.load({
			 url: 'ClsTrnSalesPP.php',
		                params: {
                	    	task: 'verietyname',
                		}
			  });
*/

                    }
        } 
    });
TrnSalesTargetWindow.show();  


});
