Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');


   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 

   var repname = '';
    var printtype='PDF';



 var loadPendinGRNDataStore = new Ext.data.Store({
      id: 'loadPendinGRNDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Stores/ClsGSRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPendingGRNS"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'minh_mindate','minh_minno','minh_type','cust_ref','item_name','uom_short_name','mint_inv_qty','mint_accept_qty',
 

      ]),
    });



    


var flxGRN = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 1100,
    id: 'my-grid',  
    columns:
    [ 	 

        {header: "Date" , dataIndex: 'minh_mindate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "GRN No" , dataIndex: 'minh_minno',sortable:false,width:130,align:'left', menuDisabled: true},

        {header: "Type" , dataIndex: 'minh_type',sortable:false,width:70,align:'left', hidden: false},
        {header: "Party" , dataIndex: 'cust_ref',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "ITEM NAME" , dataIndex: 'item_name',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "UOM" , dataIndex: 'uom_short_name',sortable:false,width:120,align:'right', menuDisabled: true},
        {header: "Accepted Qty" , dataIndex: 'mint_accept_qty',sortable:false,width:120,align:'right', menuDisabled: true},

    ],
     store: loadPendinGRNDataStore,
    listeners:{	

            'cellclick': function (flxGRN, rowIndex, cellIndex, e) {
                  var sm = flxGRN.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('minh_minno');
                  var purtype = selrow.get('minh_type');

		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&minno=" + encodeURIComponent(grnno);

		   var param = (p1+p2+p3) ;   

                  if ( purtype == "P")
                  { 
                   if (printtype == "PDF") 
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign&__format=pdf' + param); 
                   else
                       window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN.rptdesign' + param); 
  
                  }
                  if ( purtype == "I")
                  { 
                   if (printtype == "PDF") 
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign&__format=pdf' + param); 
                   else
		      window.open('http://10.0.0.251:8080/birt/frameset?__report=Stores/RepStoresGRN_Indent.rptdesign' + param); 

                 }
                    

   }
}
});




var RepPrePrintFormPannel = new Ext.form.FormPanel({
        width        :  1320, 
        title        : 'GRN PENDING LIST',
        style        : 'margin: 5px ',
        height       : 600,
        frame        : false,
        bodyStyle    : 'background: url(../GRN/icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'RepPrePrintFormPannel',
        layout       : 'absolute',
 
          reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                  
                    },[
                     {},
                       
                  ]),
        items        : [
                     {
                    xtype: 'fieldset',
                    border: false,
                    width: 1000,
                    labelWidth:60,
                    x: 10,  
                    y: 50,
	               items: [flxGRN]
                    },
        ]
}); 

 function RefreshData()
 {
    loadPendinGRNDataStore.removeAll();
    loadPendinGRNDataStore.load({
        url: '/SHVPM/Stores/ClsGSRep.php',
        params: {
    	task: 'loadPendingGRNS',
        compcode:GinCompcode,
        finid:GinFinid,
	},
	scope:this,
	callback:function()
	{
     //     grid_tot_party();
        //  alert(loadPendinGRNDataStore.getAt(0).get('purtype'));
        }
    });
}


 var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1200,
	x	    : 80,
        y           : 35,
        title       : 'Stores  Reports',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){

                RefreshData();
               }    
			
	}
    });
    ReppreprintWindow.show();  
});
