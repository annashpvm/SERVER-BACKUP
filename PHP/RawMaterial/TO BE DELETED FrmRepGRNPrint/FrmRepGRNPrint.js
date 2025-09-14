Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 var loadgrnprint = new Ext.data.Store({
      id: 'loadgrnprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/RawMaterial/ClsRMRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
	{name:'rech_seqno', type: 'int',mapping:'rech_seqno'},
	{name:'rech_no', type: 'int',mapping:'rech_no'},
      ]),
    });

 var cmbgrnno = new Ext.form.ComboBox({
        fieldLabel      : 'GRN No',
        width           : 100,
        displayField    : 'rech_no',
        valueField      : 'rech_seqno',
        hiddenName      : '',
        id              : 'cmbgrnno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : 'GRN No',
        mode            : 'local',
        store           : loadgrnprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });


 
   
   var RepGRNPrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN Print',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepGRNPrintFormPannel',
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
			if(cmbgrnno.getValue()==0) 
			{
			Ext.MessageBox.alert("Alert", "Select GRN No");
			}
			else
			{
			var d1=Ext.getCmp('cmbgrnno').getRawValue();
			var d2='M';

			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&ordfrom=" + encodeURIComponent(d2);
			var p4 = "&grnno=" + encodeURIComponent(d1);
			var param = (p1+p2+p3+p4) ;                         
window.open('http://192.168.11.14:8080/birt/frameset?__report=Rawmaterial/RepRmGRN.rptdesign' + param, '_blank');
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
                title   : 'GRN Print',
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
                                	items: [cmbgrnno]
                            		}
					
                ]

            },
            
        ],
    });
    
   
    var RepPurchaseOrderprintWindow = new Ext.Window({
	height      : 200,
        width       : 440,
        y           : 35,
        title       : 'GRN Print',
        items       : RepGRNPrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
				 loadgrnprint.load({
                		 url: '/SHVPM/RawMaterial/ClsRMRep.php', 
                        	 params:
                       		 {
                         	 task:"loadgrnno",
				 finid:GinFinid,
				compcode: GinCompcode

                        	 }
				 });		
	   			 }
			
		}
    });
    RepPurchaseOrderprintWindow.show();  
});
