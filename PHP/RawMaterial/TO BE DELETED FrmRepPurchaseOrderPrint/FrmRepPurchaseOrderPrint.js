Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 var loadpurchaseorderprint = new Ext.data.Store({
      id: 'loadpurchaseorderprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/RawMaterial/ClsRMRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
	{name:'ordh_seqno', type: 'int',mapping:'ordh_seqno'},
	{name:'ordh_no', type: 'int',mapping:'ordh_no'},
      ]),
    });

 var cmbpurorderno = new Ext.form.ComboBox({
        fieldLabel      : 'Purchase Order No',
        width           : 100,
        displayField    : 'ordh_no',
        valueField      : 'ordh_seqno',
        hiddenName      : '',
        id              : 'cmbpurorderno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : 'PO No',
        mode            : 'local',
        store           : loadpurchaseorderprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });


 
   
   var RepPurchaseOrderPrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Purchase Order Print',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPurchaseOrderPrintFormPannel',
        method      : 'POST',
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
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
			if(cmbpurorderno.getValue()==0) 
			{
			Ext.MessageBox.alert("Alert", "Select PO No");
			}
			else
			{
			var d1=Ext.getCmp('cmbpurorderno').getRawValue();
			var d2='M';

			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&ordfrom=" + encodeURIComponent(d2);
			var p4 = "&ordno=" + encodeURIComponent(d1);
			var param = (p1+p2+p3+p4) ;                         
window.open('http://192.168.11.14:8080/birt/frameset?__report=Rawmaterial/RepRmPurchaseOrder.rptdesign' + param, '_blank');
//window.open('http://192.168.11.14:8080/birt/frameset?__report=Rawmaterial/RepRMDailyArrivals.rptdesign' , '_blank');  
//window.open('http://192.168.11.14:8080/birt/frameset?__report=Sales/RepSalesInvoice.rptdesign' + param, '_blank');

          
                           
                        }
			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                    icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
RepPurchaseOrderprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'Purchase Order Print',
                layout  : 'hbox',
                border  : true,
                height  : 100,
                width   : 400,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,

                items:[
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 350,
                                	x           : 30,
                                	y           : 10,
                                    	border      : false,
                                	items: [cmbpurorderno]
                            		}
					
                ]

            },
            
        ],
    });
    
   
    var RepPurchaseOrderprintWindow = new Ext.Window({
	height      : 200,
        width       : 440,
        y           : 35,
        title       : 'Purchase Order Print',
        items       : RepPurchaseOrderPrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
				 loadpurchaseorderprint.load({
                		 url: '/SHVPM/RawMaterial/ClsRMRep.php', 
                        	 params:
                       		 {
                         	 task:"loadpono",
				 finid:GinFinid,
				compcode: GinCompcode

                        	 }
				 });		
	   			 }
			
		}
    });
    RepPurchaseOrderprintWindow.show();  
});
