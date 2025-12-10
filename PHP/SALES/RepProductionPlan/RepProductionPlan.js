Ext.onReady(function(){
   Ext.QuickTips.init();

   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

 var loadPPNoDatastore = new Ext.data.Store({
      id: 'loadPPNoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsProductionPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPPno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'pp_advno'

      ]),
    });


 var cmbPPNo = new Ext.form.ComboBox({
        fieldLabel      : 'PP No.',
        width           : 100,
        displayField    : 'pp_advno',
        valueField      : 'pp_advno',
        hiddenName      : '',
        id              : 'cmbPPNo',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadPPNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });


   
 var Rpttype="";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:200,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'PP - Printing', name: 'optRpttype', id:'optPPPrint', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="PP - Printing";
						
					}
				}
			}
		},

            
        ],
    }



    ]
});

   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
        method      : 'POS7T',
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
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                       click: function () {
		         	 if ((cmbPPNo.getValue()==="" && cmbPPNo.getValue()==0) ) 
                                 {
		                     Ext.MessageBox.alert("Alert", "Select " + Ext.getCmp('cmbPPNo').fieldLabel );
				 }
				 else
				 {
				     var ppno=Ext.getCmp('cmbPPNo').getRawValue();
		                     var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
				     var p2 = "&ppno=" + encodeURIComponent(ppno);
				     var param = (p1+p2);                         
		                     window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptProductionPlan.rptdesign' + param, '_blank'); 
				  }
			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
                    ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 200,
                width   : 560,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[
                       optRpttype,
			{ 
			  xtype       : 'fieldset',
			  title       : '',
			  labelWidth  : 75,
			  width       : 200,
			  x           : 50,
			  y           : 80,
			  border      : false,
			  items: [cmbPPNo]
			},		
                ]

            },
            
        ],
    });
    
   
    var ReppreprintWindow = new Ext.Window({
	height      : 350,
        width       : 650,
	x	    : 200,
        y           : 35,
        title       : 'Sales Production Plan Reports',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){

			loadPPNoDatastore.removeAll();
			loadPPNoDatastore.load({
			 url: 'ClsProductionPlan.php',
		                params: {
                                   task: 'loadPPNo',
		                   compcode:GinCompcode,
                                   finid:GinFinid ,  
                		   },
				   scope:this,
				   callback:function()
	               	 	{
                        	}
			  });
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
