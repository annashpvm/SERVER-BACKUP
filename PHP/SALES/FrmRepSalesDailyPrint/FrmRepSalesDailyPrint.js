Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 var loadinvoiceprint = new Ext.data.Store({
      id: 'loadinvoiceprint',
      autoload :true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadinvoiceno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['invh_no'
      ]),
    });

 var cmbinvno = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 100,
        displayField    : 'invh_no',
        valueField      : 'invh_no',
        hiddenName      : '',
        id              : 'cmbinvno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : 'Invoice No',
        mode            : 'local',
        store           : loadinvoiceprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });

 var RepInvoicePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Sales Daily Print',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepInvoicePrintFormPannel',
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
			if(cmbinvno.getValue()==0) 
			{
			Ext.MessageBox.alert("Alert", "Select Invoice No");
			}
			else
			{
			var invno=Ext.getCmp('cmbinvno').getRawValue();
			var p1 = "&invno=" + encodeURIComponent(invno);

//			var p2 = "&finid=" + encodeURIComponent(GinFinid);
//			/var p3 = "&ordfrom=" + encodeURIComponent(d2);
//			var p4 = "&grnno=" + encodeURIComponent(grnno);
			var param = (p1);                         
                        window.open('http://192.168.11.14:8080/birt/frameset?__report=Sales/RepDailySales.rptdesign' + param); 
          
                           
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
                    RepInvoiceprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'Invoice Print',
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
                         items: [cmbinvno]
                       }
					
                ]

            },
            
        ],
    });
    
   
 var RepInvoiceprintWindow = new Ext.Window({
	height      : 200,
        width       : 440,
        y           : 35,
        title       : 'Invoice Print',
        items       : RepInvoicePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){

				 loadinvoiceprint.load({
                		 url: '/SHVPM/SALES/ClsSalesRep.php', 
                        	 params:
                       		 {
                         	 task:"loadinvoiceno",
				 finid:GinFinid,
				 compcode: GinCompcode

                        	 }
				 });		
	   			 }
			
		}
    });
    RepInvoiceprintWindow.show();  
});
