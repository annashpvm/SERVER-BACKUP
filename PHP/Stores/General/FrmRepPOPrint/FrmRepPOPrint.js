Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 var loadpoprint = new Ext.data.Store({
      id: 'loadpoprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Fuel/ClsFuRep.php',      // File to connect to
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

 var cmbpono = new Ext.form.ComboBox({
        fieldLabel      : 'PO No',
        width           : 100,
        displayField    : 'ordh_no',
        valueField      : 'ordh_seqno',
        hiddenName      : '',
        id              : 'cmbpono',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : 'PO No',
        mode            : 'local',
        store           : loadpoprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });
  
   var RepPOPrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PO Print',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 510,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPOPrintFormPannel',
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
			if(cmbpono.getValue()==0) 
			{
			Ext.MessageBox.alert("Alert", "Select GRN No");
			}
			else
			{
			var pono=Ext.getCmp('cmbpono').getRawValue();
			var d2='M';

			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&finid=" + encodeURIComponent(GinFinid);
			var p3 = "&ordfrom=" + encodeURIComponent(d2);
			var p4 = "&pono=" + encodeURIComponent(pono);
			var param = (p1+p2+p3+p4) ;                         
window.open('http://192.168.11.14:8080/birt/frameset?__report=Fuel/RepGSPO.rptdesign' + param); 
          
                           
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
RepPOprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'PO Print',
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
                                	items: [cmbpono]
                            		}
					
                ]

            },
            
        ],
    });
    
   
    var RepPOprintWindow = new Ext.Window({
	height      : 200,
        width       : 440,
        y           : 35,
        title       : 'PO Print',
        items       : RepPOPrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
				 loadpoprint.load({
                		 url: '/SHVPM/Fuel/ClsFuRep.php', 
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
    RepPOprintWindow.show();  
});
