Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var gstStatus = "N";

var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var gstFlag = "Add";
var FinyearDataStore = new Ext.data.Store({
      id: 'FinyearDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadfinyear"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({   
                  // we tell the datastore where to get his data from
        root: 'results',
        id: 'id'
      },[ 
        {name: 'fin_code', type: 'int', mapping: 'fin_code'},
        {name: 'fin_year', type: 'string', mapping: 'fin_year'}
      ]),
      sortInfo:{field: 'fin_year', direction: "DESC"}
    });

 var loadentrynodatastore = new Ext.data.Store({
      id: 'loadentrynodatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentryno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['r_entno'
 
      ]),
    });

var loadsizedatastore = new Ext.data.Store({
      id: 'loadvarietydatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsizedetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'var_code','var_name'
 
      ]),
    });

 var loadstockdetailsdatastore = new Ext.data.Store({
      id: 'loadstockdetailsdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadstockdetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'stk_var_code','var_name','stk_sr_no','stk_wt','stk_units','stk_mill'
 
      ]),
    });


 var loadsalesdespadnodatastore = new Ext.data.Store({
      id: 'loadsalesdespadnodatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesRepulpStockEntry.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsalesdespadno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'da_no','da_date'
 
      ]),
    });



//var gstGroup;
//OUT SIDE


var dtdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    readOnly   : true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var txtentryno = new Ext.form.TextField({
	fieldLabel  : 'Entry No',
	id          : 'txtentryno',
	name        : 'txtentryno',
	width       :  80,
	//readOnly    : true,
	//disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtfinyear = new Ext.form.ComboBox({
        fieldLabel      : 'Finyear',
        width           : 100,
        displayField    : 'fin_year',
        valueField      : 'fin_code',
        hiddenName      : 'fin_year',
        id              : 'txtfinyear',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;", 
        allowblank      : false,
        store           : FinyearDataStore,
	listeners:{
          select: function(){
                         loadsizedatastore.removeAll();
			 loadsizedatastore.load({
        		 url: 'ClsTrnSalesRepulpStockEntry.php', 
                	 params:
               		 {
                 	  task:"loadsizedetails",
			  compcode : Gincompcode,
			  finid    : txtfinyear.getValue(),

                	 },
      			callback : function(){
            		}

			 });
         
	  }
	}

});


function grid_tot(){
        var bundles = 0;
        var reels = 0;
        var reelwt = 0;	
        var bundwt = 0;	
        var totreelwt = 0;	
        var totbundwt = 0;	

        var Row= flxreels.getStore().getCount();
        flxreels.getSelectionModel().selectAll();
        var sel=flxreels.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {

           totreelwt=totreelwt+Number(sel[i].data.weight);	
           if (sel[i].data.tag=="T") {
              reels=reels+1;
              reelwt=reelwt+Number(sel[i].data.weight);
           }
         }


        var Row= flxbundles.getStore().getCount();
        flxbundles.getSelectionModel().selectAll();
        var sel=flxbundles.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)
        {
           totbundwt=totbundwt+Number(sel[i].data.weight);
           if (sel[i].data.tag=="T") {
              bundles=bundles+1;
              bundwt=bundwt+Number(sel[i].data.weight);
           }
         }
 
         txtselectbundles.setValue(bundles);
         txtselectreels.setValue(reels);
         txtselectbundlewt.setValue( Ext.util.Format.number(bundwt,'0.00')); 
         txtselectreelwt.setValue( Ext.util.Format.number(reelwt,'0.00'));
         txttotbundlewt.setValue( Ext.util.Format.number(totbundwt,'0.00'));
         txttotreelwt.setValue( Ext.util.Format.number(totreelwt,'0.00'));
}



var cmbsize= new Ext.form.ComboBox({
        fieldLabel      : 'Size ',
        width       	 :  270,
        displayField    : 'var_name', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbvar',
        typeAhead       : true,
        mode            : 'local',
        store           : loadsizedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
                 txttotreels.setValue(0);  
                 txttotbundles.setValue(0);
                 flxreels.getStore().removeAll();
                 flxbundles.getStore().removeAll();

                 loadstockdetailsdatastore.removeAll();
		 loadstockdetailsdatastore.load({
		 url: 'ClsTrnSalesRepulpStockEntry.php', 
        	 params:
       		 {
         	  task:"loadstockdetails",
		  compcode : Gincompcode,
		  finid    : txtfinyear.getValue(),
                  sizecode : cmbsize.getValue()

        	 },
		callback : function(){

                      var cnt=loadstockdetailsdatastore.getCount();
                      if (cnt >0) {
                         if (loadstockdetailsdatastore.getAt(0).get('stk_units') == 1) {
                                txttotreels.setValue(cnt);  
	                   	for(var j=0; j<cnt; j++)
				{ 
				   var RowCnt = flxreels.getStore().getCount() + 1;  
	                           flxreels.getStore().insert(
                                      flxreels.getStore().getCount(),
	                              new dgrecord({
					  sizecode : loadstockdetailsdatastore.getAt(j).get('stk_var_code'),
					  sizename : loadstockdetailsdatastore.getAt(j).get('var_name'),
					  rbno     : loadstockdetailsdatastore.getAt(j).get('stk_sr_no'),
					  weight   : loadstockdetailsdatastore.getAt(j).get('stk_wt'),						
					  tag      : '',
					  mill     : loadstockdetailsdatastore.getAt(j).get('stk_mill'),
		    
                           	      })
                                   );
                                }
                         } 
                         else {
                                txttotbundles.setValue(cnt);
	                   	for(var j=0; j<cnt; j++)
				{ 
				   var RowCnt = flxreels.getStore().getCount() + 1;  
	                           flxbundles.getStore().insert(
                                      flxbundles.getStore().getCount(),
	                              new dgrecord({
					  sizecode : loadstockdetailsdatastore.getAt(j).get('stk_var_code'),
					  sizename : loadstockdetailsdatastore.getAt(j).get('var_name'),
					  rbno     : loadstockdetailsdatastore.getAt(j).get('stk_sr_no'),
					  weight   : loadstockdetailsdatastore.getAt(j).get('stk_wt'),						
					  tag      : '',
					  mill     : loadstockdetailsdatastore.getAt(j).get('stk_mill'),
		    
                           	      })
                                   );
//                                   }						
                                 }
                         }     
		   grid_tot();	

                      }
                      else {
                         alert("Details Not Available..");
                      }  


    		}

		 });
	}
	}
});


var dgrecord = Ext.data.Record.create([]);
var flxreels = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 220,
        width: 380,
        x: 0,
        y: 10,        
        columns: [   
            {header: "Sizecode", dataIndex: 'sizecode',sortable:true,width:50,align:'left',hidden:'true'},       
            {header: "Size", dataIndex: 'sizename',sortable:true,width:120,align:'left'},  //hidden:'true'},
            {header: "ReelNo", dataIndex: 'rbno',sortable:true,width:120,align:'left'},  //hidden:'true'},
            {header: "Weight", dataIndex: 'weight',sortable:true,width:50,align:'left'},
            {header: "Tag", dataIndex: 'tag',sortable:true,width:30,align:'left'}, //hidden:'true'},
            {header: "Mill", dataIndex: 'mill',sortable:true,width:50,align:'left'}, //hidden:'true'},

            
        ],
store:[''], //loadsalledgerlistdatastore,
       listeners:{	
            'cellclick': function (flxreels, rowIndex, cellIndex, e) {
		if (cellIndex==4) {		{
                   var selected_rows = flxreels.getSelectionModel().getSelections();
                   for (var i = 0; i < selected_rows.length; i++)
                   {
			if(cellIndex==4)
			{
                        colname = 'tag';
			var flag = selected_rows[i].data.tag;
			}
                        if (flag == '')
                        {
                            selected_rows[i].set(colname, 'T');
                        } else if (flag == 'T')
                        {
                           selected_rows[i].set(colname, '');
                        }
                        grid_tot();
                   }
               }
           }
        }  
        }
    

   });



var txtselectreels = new Ext.form.TextField({
	fieldLabel  : 'Selected Reels',
	id          : 'txtselctreel',
	name        : 'txtselctreel',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtselectreelwt = new Ext.form.TextField({
	fieldLabel  : 'Selected Wt',
	id          : 'txtselctreelwt',
	name        : 'txtselctreelwt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txttotreels = new Ext.form.TextField({
	fieldLabel  : 'Total Reels',
	id          : 'txttotreels',
	name        : 'txttotreels',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
   
var txttotreelwt = new Ext.form.TextField({
	fieldLabel  : 'Total Wt',
	id          : 'txttotreelwt',
	name        : 'txttotreelwt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxbundles = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 220,
        width: 620,
        x: 0,
        y: 10,        
        columns: [   
            {header: "Sizecode", dataIndex: 'sizecode',sortable:true,width:50,align:'left',hidden:'true'},       
            {header: "Size", dataIndex: 'sizename',sortable:true,width:120,align:'left'},  //hidden:'true'},
            {header: "BundleNo", dataIndex: 'rbno',sortable:true,width:120,align:'left'},  //hidden:'true'},
            {header: "Weight", dataIndex: 'weight',sortable:true,width:50,align:'left'},
            {header: "Tag", dataIndex: 'tag',sortable:true,width:30,align:'left'}, //hidden:'true'},
            {header: "Mill", dataIndex: 'mill',sortable:true,width:50,align:'left'}, //hidden:'true'},
            
        ],
       store:[''], //loadsalledgerlistdatastore,
       listeners:{	
            'cellclick': function (flxbundles, rowIndex, cellIndex, e) {
		if (cellIndex==4) {		{
                   var selected_rows = flxbundles.getSelectionModel().getSelections();
                   for (var i = 0; i < selected_rows.length; i++)
                   {
			if(cellIndex==4)
			{
                        colname = 'tag';
			var flag = selected_rows[i].data.tag;
			}
                        if (flag == '')
                        {
                            selected_rows[i].set(colname, 'T');
                        } else if (flag == 'T')
                        {
                           selected_rows[i].set(colname, '');
                        }
                   }
               }
               grid_tot();
           }
        }  
        }
   });


var txtselectbundles = new Ext.form.TextField({
	fieldLabel  : 'Selected Bundles',
	id          : 'txtselectbundle',
	name        : 'txtselectbundle',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});   

var txtselectbundlewt = new Ext.form.TextField({
	fieldLabel  : 'Selected Wt',
	id          : 'txtselectbundlewt',
	name        : 'txtselectbundlewt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});  

var txttotbundles = new Ext.form.TextField({
	fieldLabel  : 'Total Bundles',
	id          : 'txttotbundles',
	name        : 'txttotbundles',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txttotbundlewt = new Ext.form.TextField({
	fieldLabel  : 'Total Wt',
	id          : 'txttotbundlewt',
	name        : 'txttotbundlewt',
	width       :  80,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtnumberfrom = new Ext.form.TextField({
	fieldLabel  : 'Number From',
	id          : 'txtnumberfrom',
	name        : 'txtnumberfrom',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtnumberto = new Ext.form.TextField({
	fieldLabel  : 'Number To',
	id          : 'txtnumberto',
	name        : 'txtnumberto',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "GO",
    width   : 50,
    height  : 30,
    x       : 50,
    y       : 200,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
	    var gstadd="true";
	
                if (reelsbundle == "C" )
                {  
			var Row= flxbundles.getStore().getCount();
			flxbundles.getSelectionModel().selectAll();
			var sel=flxbundles.getSelectionModel().getSelections();
			for(var i=0;i<Row;i++)
			{
		            
			   if (Number(sel[i].data.rbno) >= Number(txtnumberfrom.getValue()) &&  Number(sel[i].data.rbno) <= Number(txtnumberto.getValue()))
                           {
                              sel[i].set('tag', 'T');
			   }
			}
	       }  
               else if (reelsbundle == "B" )
                {  
			var Row= flxbundles.getStore().getCount();
			flxbundles.getSelectionModel().selectAll();
			var sel=flxbundles.getSelectionModel().getSelections();
			for(var i=0;i<Row;i++)
			{
                              sel[i].set('tag', 'T');
			}
	       } 
               else if (reelsbundle == "A" )
                {  
			var Row= flxreels.getStore().getCount();
			flxreels.getSelectionModel().selectAll();
			var sel=flxreels.getSelectionModel().getSelections();
			for(var i=0;i<Row;i++)
			{
                              sel[i].set('tag', 'T');
			}
	       } 
	

               grid_tot(); 

        }//click
    }//listener
}); 

var reelsbundle = "A";
var optdetails = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Select',
    fieldLabel: '',
    layout : 'hbox',
    width:210,
    height:300,
    x:870,
    y:100,
    border: false,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optdetails',
        items: [
            {boxLabel: 'ALL REELS', name: 'optdetails', id:'optalldetail', inputValue: 'A',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reelsbundle = "A";
            
               }
              }
             }
            },
            {boxLabel: 'ALL BUNDLES', name: 'optdetails', id:'optreels', inputValue: 'B',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reelsbundle = "B";
            
               }
              }
             }
            },
            {boxLabel: 'SELECTIVE RAGNGES', name: 'optdetails', id:'optbundles', inputValue: 'C',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reelsbundle = "C";
            
               }
              }
             }
            },
		{
			xtype	    : 'fieldset',
			title	    : '',
			labelWidth : 50,
			width	    : 180,
			x	    : 10,
			y	    : 80,
			border     : false,
			items: [txtnumberfrom]
		},
		{
			xtype	    : 'fieldset',
			title	    : '',
			labelWidth : 50,
			width	    : 180,
			x	    : 10,
			y	    : 80,
			border     : false,
			items: [txtnumberto]
		},btnadd,
            
        ]
    }
    ]
});   


              
var TrnSalesRepulpStockEntryFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 400,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 550,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnSalesRepulpStockEntryFormpanel',
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
				AEDFlag = "Add";
				TrnSalesRepulpStockEntryFormpanel.getForm().reset();
				RefreshData();
			
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
				AEDFlag = "Edit";

				RefreshData();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {

                    var gstSave;

//alert(flxDetail.getStore().getCount());		 
  
                    gstSave="true";
                    if (txtselectbundlewt.getValue()==0 && txtselectreelwt.getRawValue()=="")
                    {
                        Ext.Msg.alert('Repulp','Details Not available.....');
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

                            var reelsData = flxreels.getStore().getRange();                                        
                            var reelsupData = new Array();
                            Ext.each(reelsData, function (record) {
                                reelsupData.push(record.data);
                            });

                            var bundlesData = flxbundles.getStore().getRange();                                        
                            var bundlesupData = new Array();
                            Ext.each(bundlesData, function (record) {
                                bundlesupData.push(record.data);
                            });


                            Ext.Ajax.request({
                            url: 'TrnSalesRepulpStockEntrySave.php',
                            params :
                             {
				reelcnt: reelsupData.length,
                               	reelgriddet: Ext.util.JSON.encode(reelsupData),    
				bundlecnt: bundlesupData.length,
                               	bundlegriddet: Ext.util.JSON.encode(bundlesupData),    
                             	compcode : Gincompcode,
                                fincode  : GinFinid,
				stkyear  : txtfinyear.getValue(),
                                docno    : txtentryno.getValue(),
				docdate  : Ext.util.Format.date(dtdate.getValue(),"Y-m-d"),
                  
                                saveflag : gstFlag,
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
				
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Repulp Entry Saved -" + obj['msg']);
                                    TrnSalesRepulpStockEntryFormpanel.getForm().reset();
                                    RefreshData();
                                    flxreels.getStore().removeAll();
                                    flxbundles.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
Ext.MessageBox.alert("Repulp Entry Not Saved! Pls Check!- " + obj['msg']);                                                  
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
			listeners:{
			click: function(){
				TrnSalesRepulpStockEntry.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
                	{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 180,
				x           : 10,
				y           : 10,
			    	border      : false,
				items: [dtdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 190,
				x           : 300,
				y           : 10,
				border      : false,
				items: [txtentryno]
			},
			{
		                xtype	    : 'fieldset',
		                title	    : '',
		                labelWidth : 50,
		                width	    : 180,
		                x	    : 10,
		                y	    : 50,
		                border     : false,
		                items: [txtfinyear]
                      },
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 420,
				x           : 300,
				y           : 50,
				border      : false,
				items: [cmbsize]
		        },optdetails,
                { 
                	xtype   : 'fieldset',
		        title   : 'Stock Details',
		        layout  : 'hbox',
		        border  : false,
		        height  : 360,
		        width   : 850,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 10,
		        y       : 100,
		        items:[ 

			{ 
		        	xtype   : 'fieldset',
				title   : 'Reel Stock',
				layout  : 'hbox',
				border  : false,
				height  : 350,
				width   : 400,
				//style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 10,
				y       : 0,
				items:[ 
					flxreels,
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 160,
						x           : 0,
						y           : 240,
						border      : false,
						items: [txtselectreels]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 190,
						x           : 180,
						y           : 240,
						border      : false,
						items: [txtselectreelwt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 160,
						x           : 0,
						y           : 270,
						border      : false,
						items: [txttotreels]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 190,
						x           : 180,
						y           : 270,
						border      : false,
						items: [txttotreelwt]
					},
				
			   ],
			},
			
			{ 
		        	xtype   : 'fieldset',
				title   : 'Bundle Stock',
				layout  : 'hbox',
				border  : false,
				height  : 350,
				width   : 400,
				//style:{ border:'1px solid red',color:' #581845 '},
				layout  : 'absolute',
				x       : 420,
				y       : 0,
				items:[ 
					flxbundles,
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 170 ,
						x           : 0,
						y           : 240,
						border      : false,
						items: [txtselectbundles]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 180,
						x           : 180,
						y           : 240,
						border      : false,
						items: [txtselectbundlewt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 170,
						x           : 0,
						y           : 270,
						border      : false,
						items: [txttotbundles]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 180,
						x           : 180,
						y           : 270,
						border      : false,
						items: [txttotbundlewt]
					},
				
			   ],
			},		        		        			
                 ],
             },     
	                      
          ],
                 
    });

function RefreshData()
{

			 loadentrynodatastore.load({
        		 url: 'ClsTrnSalesRepulpStockEntry.php', 
                	 params:
               		 {
                 	 task:"loadentryno",
			  compcode : Gincompcode,
			  finid    : GinFinid,

                	 },
      			callback : function(){
				txtentryno.setValue(loadentrynodatastore.getAt(0).get('r_entno'));
				}

			 });
}

    

   
    var TrnSalesRepulpStockEntry = new Ext.Window({
	height      : 550,
        width       : 1100,
        x	     : 100,
        y           : 30,
        title       : 'REPULP STOCK ENTRY',
        items       : TrnSalesRepulpStockEntryFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
				
				FinyearDataStore.load({
				url:'ClsTrnSalesRepulpStockEntry.php',
				params:{
				task:'loadfinyear'
				}
			});
				
                        RefreshData();

/*

					loadvarietydatastore.removeAll();
					loadvarietydatastore.load({
					url: 'ClsTrnSalesRepulpStockEntry.php',
					params: {
					task: 'loadsaldelslip',
					compcode: Gincompcode,
					finid: GinFinid
					},
					callback : function(){
					txtdelslipno.setValue(loadvarietydatastore.getAt(0).get('wpckh_no'));
				}
				});
				

				 	
				 loadsalesdespadnodatastore.load({
                		 url: 'ClsTrnSalesRepulpStockEntry.php', 
                        	 params:
                       		 {
                         	 task:"loadsalesdespadno"


                        	 }
				 });*/ 			 
		}
	}	
    });
    TrnSalesRepulpStockEntry.show();  
});
