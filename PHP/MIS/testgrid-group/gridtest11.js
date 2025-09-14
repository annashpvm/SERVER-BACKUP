Ext.onReady(function(){
   Ext.QuickTips.init();

//Ext.ns('Ext.ux.grid');

    var GinFinid = localStorage.getItem('tfinid');

var gridedit = "false";
var editrow  = 0;
var saveflag = "Add";
var dcode = 0;

var usrcode = 0;
var accounts = "N";
var production = "N";
var sales = "N";
var purchase = "N";
var stores = "N";
var rawmaterial = "N";
var fuel = "N";
var imports = "N";
var payroll = "N";


   

var GetModuleListDatastore = new Ext.data.GroupingStore({
      id: 'GetModuleListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'Clsgridtest.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
     
   {name:'cust_ref',type:'string'},
      {name:'invh_no',type:'int'},
      {name:'invh_date' },
      {name:'invh_totwt',type:'float'},
      {name:'invh_netamt',type:'float'}   


      ]
      
      
      ),
      sortInfo: {field: 'cust_ref', direction: 'ASC'},
            groupField: 'cust_ref'
});


//

/* {name:'cust_ref',type:'string'},
      {name:'invh_no',type:'int'},
      {name:'invh_date',type:'date', dateFormat:'d/m/Y'},
      {name:'invh_totwt',type:'float'},
      {name:'invh_netamt',type:'float'},*/


//'cust_ref','invh_no','invh_date','invh_totwt','invh_netamt'	

   var fm = Ext.form;
var dgrecord = Ext.data.Record.create([]);

var summary = new Ext.ux.grid.GroupSummary();

var flxSystem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 405	,
        width: 	950,
        style:"font-size:24px;padding:10px 0px 0 15px",
        id: 'my-grid',  
         
        columns: [    
            {header: "party"       , dataIndex: 'cust_ref', sortable:true,width:250,align:'left', menuDisabled: true},       
            {header: "invoice no " ,  dataIndex: 'invno', sortable:true,width:50,align:'left', menuDisabled: true},
            {header: "invoice date ",  dataIndex: 'invh_date', sortable:true,width:100,align:'left', menuDisabled: true},
            {header: "wt " , dataIndex: 'invh_totwt', sortable:true,width:100,summaryType: 'sum'
                 },
            {header: "Amt " ,  dataIndex: 'invh_netamt',sortable:true,width:100,align:'left',summaryType: 'sum'},


                  
           ],
            

store:GetModuleListDatastore,
view: new Ext.grid.GroupingView({
            forceFit: true,
            showGroupName: false,
            enableNoGroups: false,
	   enableGroupingMenu: false,
            hideGroupedColumn: true
        }),

         plugins: summary,
        
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxSystem.getSelectionModel();
			var selrow = sm.getSelected();

			flxSystem.getSelectionModel().clearSelections();
			}

                   //CalculatePOVal();
   }
   });



   function RefreshData(){
      UserMasPanel.getForm().reset();


	GetModuleListDatastore.load({
        	 url: 'Clsgridtest.php', 
              	 params:
        	 {
                	 task:"loadDetails"
               	 }
	});


};

var fm = Ext.form;

   var UserMasPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    //title       : 'SECTION MASTER',
    header      : true,
    width       : 280,
    height      : 50 ,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'UserMasPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
        		
        	 {
                    text: 'Add',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
           	 {
                    text: 'Edit',
                    style  : 'text-align:center;',
                    tooltip: 'Edit Details...', height: 40, fontSize:70,width:70,

                    listeners:{
                        click: function () {
                               edit_click();
                        }
                     }    

                  
                },'-',             
                  {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

                        }
                    }
                },'-',                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                    listeners:{
                        click: function () {
                               RefreshData();
                        }
                    }       
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                         handler: function(){	
                            UsrMasWindow.hide();
                        }              
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 600,
                width   : 850,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
		    			{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 1000,
						x           : 0,
						y           : 0,
					    	border      : false,
						items: [flxSystem]
				          }, 

       ]
       
       }
       ]
       
 
});


 var UsrMasWindow = new Ext.Window({
	height      : 540,
        width       : 900,
        y           : 30,
        title       :'USER MASTER',
        items       : 'UserMasPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
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
             
            UsrMasWindow.show();  
        });      
   
