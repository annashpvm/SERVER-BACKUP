Ext.onReady(function(){
   Ext.QuickTips.init();
   
// Assume Grid1 and Grid2 exist

// Grid 1's store
var store1 = new Ext.data.JsonStore({
    fields: ['id', 'name'],
    data: [
        { id: 1, name: 'Item A' },
        { id: 2, name: 'Item B' },
        { id: 3, name: 'Item C' },
        { id: 4, name: 'Item D' },
        { id: 5, name: 'Item E' },
    ]
});

// Grid 2's store
var store2 = new Ext.data.JsonStore({
    fields: ['id', 'name'],
    data: []
});

// Grid 1
var grid1 = new Ext.grid.GridPanel({
    title: 'Source Grid',
    store: store1,
    columns: [
        { header: 'ID', dataIndex: 'id' },
        { header: 'Name', dataIndex: 'name' }
    ],
    listeners: {
        rowclick: function(grid, rowIndex, e) {
            var rec = store1.getAt(rowIndex);
            // Check if the record already exists in store2 (optional)
            var exists = store2.find('id', rec.get('id')) !== -1;
            if (!exists) {
                store2.add(rec.copy()); // Use .copy() to avoid shared reference
            }
        }
    },
    height: 200,
    width: 300,
    renderTo: Ext.getBody()
});

// Grid 2
var grid2 = new Ext.grid.GridPanel({
    title: 'Target Grid',
    store: store2,
    columns: [
        { header: 'ID', dataIndex: 'id' },
        { header: 'Name', dataIndex: 'name' }
    ],
    height: 200,
    width: 300,
    renderTo: Ext.getBody()
});

 
  var ReelWeightPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'REEL WEIGHT',
    header      : true,
    width       :500,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'ReelWeightPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
            items: [
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                     icon: '/Pictures/refresh.png',
	            listeners:{
	                click: function () {

	                }
	            }

                  
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    icon: '/Pictures/exit.png',
			listeners:{
			click: function(){

			   }
			}
                  }
                  ],
        },
        items:[
	    	       
	    	       
	    		],

	    		
	    	
        });
  
var ProdReelWindow = new Ext.Window({
	height      : 800,
        width       : 1000,
        y           : 50,
        title       :'REEL WEIGHT',
  //      items       : 'ReelWeightPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){
         //      RefreshData();
             }
             }
            });
             
//             ProdReelWindow.show();

        });      
   
