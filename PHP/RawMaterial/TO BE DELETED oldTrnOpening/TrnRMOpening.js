Ext.onReady(function(){
   Ext.QuickTips.init();


var tabRMopening = new Ext.TabPanel({
    id          : 'tabRMopening',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 220,
    width       : 700,
    x           : 20,
    y           : 20,
    items       : [
        {
            xtype: 'panel',
            title: '',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [{ }
            ]
        }
    ]
});     


   var TrnRMOPpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GRN',
        header      : false,
        width       : 80,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 50,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnRMOPpanel',
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
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
	    //disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
			gstFlag = "Edit";


                }
            }
        },'-',
                {
//SAVE
                    text: 'Save',
                    id	:  'save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
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
TrnRMOPpanel.getForm().reset();
//                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            TrnGrnWindow.hide();
                        }
                },


          


 ],
   
     
  },
      items: [tabRMopening]
    });


    var TrnRMOPWindow = new Ext.Window({
	height      : 400,
        width       : 860,
        y           : 200,
        title       : 'OPENING',
        items       : TrnRMOPpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
              show:function(){
              }
        }       
             
    });
    TrnRMOPWindow.show();
});

