Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var gstStatus = "N";
//var Hdeptname = 'IT DEPARTMENT';
var mcode;
var tbistk;
var actstk;
var actqty;
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
var truck = "T";
var trans = 0;
var gstFlag = "Add";
var invnos = "";
 var loadfindgpnodatastore = new Ext.data.Store({
      id: 'loadfindgpnodatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadfindgpNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'gp_no' 
      ]),
    });

var loadvechiledatastore = new Ext.data.Store({
      id: 'loadvechiledatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvehicleno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'invh_vehi_no'
 
      ]),
    });

var loadvechilenodetaildatastore = new Ext.data.Store({
      id: 'loadvechilenodetaildatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvehiclenodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'invh_no', 'invh_party','invh_noofbun', 'invh_noofreels', 'invh_totwt', 'invh_vehi_no', 'invh_dest', 'invh_trans','cust_ref'
 
      ]),
    });

var loadinvoicenodetaildatastore = new Ext.data.Store({
      id: 'loadinvoicenodetaildatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadvehiclenodetailsinvoice"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'invh_no', 'invh_party','invh_noofbun', 'invh_noofreels', 'invh_totwt', 'invh_vehi_no', 'invh_dest', 'invh_trans','cust_ref'
 
      ]),
    });

var loadgatepassnodatastore = new Ext.data.Store({
      id: 'loadgatepassnodatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"checkgatepassno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos',
 
      ]),
    });


var loadpartydetailsdatastore = new Ext.data.Store({
      id: 'loadpartydetailsdatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesGatePass.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpartydetailsinvoice"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos',
 
      ]),
    });

//var gstGroup;
//OUT SIDE


var txtgpno = new Ext.form.TextField({
	fieldLabel  : 'Gatepass No',
	id          : 'txtgpno',
	name        : 'txtgpno',
	width       :  80,
        readOnly    : true,
	//disabled    : true,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var cmbgpno = new Ext.form.ComboBox({
        fieldLabel      : 'Gatepass No ',
        width       	 :  80,
        displayField    : 'cmbgpno', 
        valueField      : 'cmbgpno',
        hiddenName      : '',
        id              : 'cmbgpno',
        typeAhead       : true,
        mode            : 'local',
        store           : [],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        hidden          : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
           select: function(){
               loadtruckdetails();
         } 
	}
});

var dtgpdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtgpdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    readOnly   : true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
    listeners:{
         select : function(){  
             RefreshData();
             //loadvechiles();         
         }
    }
    
});


var opttruckinv = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:400,
    height:40,
    x:125,
    y:50,
    border: false,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'opttruckinv',
        items: [
            {boxLabel: 'TRUCKWISE', name: 'opttruckinv', id:'opttruck', inputValue: 'A',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		truck = "T";
            			Ext.getCmp('txtinvnofrom').hide();
				Ext.getCmp('txtinvnoto').hide();
				Ext.getCmp('cmbtrucknumber').show();
                                RefreshData();    
                           
               }
              }
             }
            },
            {boxLabel: 'INVOICE NO. WISE', name: 'opttruckinv', id:'optinvwise', inputValue: 'B',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		truck = "I";
            			Ext.getCmp('txtinvnofrom').show();
				Ext.getCmp('txtinvnoto').show();
			 	Ext.getCmp('cmbtrucknumber').hide();
                                RefreshData();
               }
              }
             }
            },
        ]
    }
    ]
});   

function grid_tot(){
        var tnos = 0;
        var wt = 0;	

        var Row= flxDetail.getStore().getCount();
        flxDetail.getSelectionModel().selectAll();
        var sel=flxDetail.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.invwt);
              tnos=tnos+Number(sel[i].data.nos);
         }
 
         txttottruckwt.setValue(wt);
         txtnoofreelbund.setValue(tnos);
}

var cmbtrucknumber = new Ext.form.ComboBox({
        fieldLabel      : 'Truck Number ',
        width       	 :  270,
        displayField    : 'invh_vehi_no', 
        valueField      : 'invh_vehi_no',
        hiddenName      : '',
        id              : 'cmbtrucknumber',
        typeAhead       : true,
        mode            : 'local',
        store           : loadvechiledatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
           select: function(){
               loadtruckdetails();
         } 
	}
});


function loadtruckdetails()
{
                flxDetail.getStore().removeAll();
                var j=0;
		loadvechilenodetaildatastore.removeAll();
		loadvechilenodetaildatastore.load({
		url: 'ClsTrnSalesGatePass.php',
		params: {
		            task: 'loadvehiclenodetail',
		            compcode:Gincompcode,
		            finid  : GinFinid ,  
		            gpdate : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                            vechileno : cmbtrucknumber.getRawValue(),
		        },
			callback:function()
	      		{
                                var cnt=loadvechilenodetaildatastore.getCount();
                                if(cnt>0)
		                {       
                                    trans = loadvechilenodetaildatastore.getAt(0).get('invh_trans');
                                    txtdest.setRawValue(loadvechilenodetaildatastore.getAt(0).get('invh_dest'));   
                                    invnos = "";  
		                    for(j=0; j<cnt; j++)
	 	                    { 
                                        if (j == 0) 
                                        {   
                                           invnos = loadvechilenodetaildatastore.getAt(j).get('invh_no');  
                                        }
                                        else   
                                        {   
                                           invnos = ","+loadvechilenodetaildatastore.getAt(j).get('invh_no');  
                                        }

	                                flxDetail.getStore().insert(
		                               flxDetail.getStore().getCount(),
		                               new dgrecord({
							custname : loadvechilenodetaildatastore.getAt(j).get('cust_ref'),
							custcode : loadvechilenodetaildatastore.getAt(j).get('invh_party') ,
							invno    : loadvechilenodetaildatastore.getAt(j).get('invh_no') ,
							invwt    : loadvechilenodetaildatastore.getAt(j).get('invh_totwt') ,
							nos      : Number(loadvechilenodetaildatastore.getAt(j).get('invh_noofbun'))+ Number(loadvechilenodetaildatastore.getAt(j).get('invh_noofreels')),
							truckno  : loadvechilenodetaildatastore.getAt(j).get('invh_vehi_no') ,
	                                       })
		                      	);
                                        

                                     }grid_tot();
                                }


 		        }
		  });



		loadgatepassnodatastore.removeAll();
		loadgatepassnodatastore.load({
		url: 'ClsTrnSalesGatePass.php',
		params: {
		            task: 'checkgatepassno',
		            compcode:Gincompcode,
		            finid  : GinFinid ,  
		            gpdate : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                            vechileno : cmbtrucknumber.getRawValue(),
		        },
			callback:function()
	      		{
                           var cnt1 = loadgatepassnodatastore.getCount();      
          
                           if (cnt1 > 0)
                           {
                              alert("Gate Pass Already saved..");
                              Ext.getCmp('save').setDisabled(true);
                           }
                           else 
                           {
                              Ext.getCmp('save').setDisabled(false);
                           }

                        }
                });
}
function loadinvoicedetails()
{

                flxDetail.getStore().removeAll();
		loadinvoicenodetaildatastore.removeAll();
		loadinvoicenodetaildatastore.load({
		url: 'ClsTrnSalesGatePass.php',
		params: {
		            task: 'loadvehiclenodetailsinvoice',
		            compcode: Gincompcode,
		            finid   : GinFinid ,  
		            gpdate  : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                            invfrom : txtinvnofrom.getRawValue(),
                            invto   : txtinvnoto.getRawValue(),

		        },
			callback:function()
	      		{

                                var cnt=loadinvoicenodetaildatastore.getCount();
				 var j=0;
                                if(cnt>0)
		                {                        
                                    trans = loadinvoicenodetaildatastore.getAt(0).get('invh_trans');
                                    txtdest.setRawValue(loadinvoicenodetaildatastore.getAt(0).get('invh_dest'));   

		                    for(j=0; j<cnt; j++)
	 	                    { 

                                        if (j == 0) 
                                        {   
                                           invnos = loadinvoicenodetaildatastore.getAt(j).get('invh_no');  
                                        }
                                        else   
                                        {   
                                           invnos = ","+loadinvoicenodetaildatastore.getAt(j).get('invh_no');  
                                        }


	                                flxDetail.getStore().insert(
		                               flxDetail.getStore().getCount(),
		                               new dgrecord({
							custname : loadinvoicenodetaildatastore.getAt(j).get('cust_ref'),
							custcode : loadinvoicenodetaildatastore.getAt(j).get('invh_party') ,
							invno    : loadinvoicenodetaildatastore.getAt(j).get('invh_no') ,
							invwt    : loadinvoicenodetaildatastore.getAt(j).get('invh_totwt') ,
							nos      : Number(loadinvoicenodetaildatastore.getAt(j).get('invh_noofbun'))+ Number(loadinvoicenodetaildatastore.getAt(j).get('invh_noofreels')),
							truckno  : loadinvoicenodetaildatastore.getAt(j).get('invh_vehi_no') ,
	                                       })
		                      	);
                                       

                                     } grid_tot();
                                }	
                           }
		  });
		 

            	loadpartydetailsdatastore.removeAll();
		loadpartydetailsdatastore.load({
		url: 'ClsTrnSalesGatePass.php',
		params: {
		            task: 'loadpartydetailsinvoice',
		            compcode: Gincompcode,
		            finid   : GinFinid ,  
		            gpdate  : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                            invfrom : txtinvnofrom.getRawValue(),
                            invto   : txtinvnoto.getRawValue(),

		        },
			callback:function()
	      		{

                                var cnt1 = loadpartydetailsdatastore.getAt(0).get('nos');
alert(cnt1);
                         }
	         }); 
}

var txtinvnofrom = new Ext.form.TextField({
	fieldLabel  : 'Invoice number From',
	id          : 'txtinvnofrom',
	name        : 'txtinvnofrom',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var txtinvnoto = new Ext.form.TextField({
	fieldLabel  : 'To',
	id          : 'txtinvnoto',
	name        : 'txtinvnoto',
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
    text    : "PROCESS",
    width   : 50,
    height  : 30,
    x       : 550,
    y       : 110,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){    
               if (truck == "T")
               {
                  loadtruckdetails();
               }      
               else                	
               {
                  loadinvoicedetails();
               }      
	

        }//click
    }//listener
}); 

var txtbundreelno = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtbundreelno',
	name        : 'txtbundreelno',
	width       :  170,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 130,
        width: 620,
        x: 25,
        y: 150,        
        columns: [   
            {header: "Customer Name", dataIndex: 'custname',sortable:true,width:200,align:'left'}, //hidden:'true'},       
            {header: "Code", dataIndex: 'custcode',sortable:true,width:50,align:'left'},  //hidden:'true'},
            {header: "Inv No", dataIndex: 'invno',sortable:true,width:100,align:'left'},
            {header: "Inv. Wt(Kgs)", dataIndex: 'invwt',sortable:true,width:80,align:'left'}, //hidden:'true'},
            {header: "Nos.(B/R)", dataIndex: 'nos',sortable:true,width:80,align:'left'}, //hidden:'true'},
            {header: "Truck No", dataIndex: 'truckno',sortable:true,width:100,align:'left'},
            
        ],
store:[''], //loadsalledgerlistdatastore,

   });
var txttottruckwt = new Ext.form.TextField({
	fieldLabel  : 'Total Truck Weight',
	id          : 'txttottruckwt',
	name        : 'txttottruckwt',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});   

var txtnoofreelbund = new Ext.form.TextField({
	fieldLabel  : 'No of Reel/Bundle',
	id          : 'txtnoofreelbund',
	name        : 'txtnoofreelbund',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});  

var txtdest = new Ext.form.TextField({
	fieldLabel  : 'Destination',
	id          : 'txtdest',
	name        : 'txtdest',
	width       :  260,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,

});
var details = "A";
var optdetails = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:300,
    height:70,
    x:740,
    y:10,
    border: false,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 2,
        id: 'optdetails',
        items: [
            {boxLabel: 'ALL DETAILS', name: 'optdetails', id:'optalldetail', inputValue: 'A',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		details = "A";
            
               }
              }
             }
            },
            {boxLabel: 'ONLY REELS', name: 'optdetails', id:'optreels', inputValue: 'B',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		reels = "B";
            
               }
              }
             }
            },
            {boxLabel: 'ONLY BUNDLES', name: 'optdetails', id:'optbundles', inputValue: 'C',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		bundles = "C";
            
               }
              }
             }
            },
        ]
    }
    ]
});   


var weightrep = "A";
var optweightrep = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:250,
    height:60,
    x:10,
    y:0,
    border: false,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",    
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optweightrep',
        items: [
            {boxLabel: 'ALL', name: 'optweightrep', id:'opt_all', inputValue: 'A',checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		weightrep = "A";
            			
               }
              }
             }
            },
            {boxLabel: 'Ex WT > 100Kgs', name: 'optweightrep', id:'opt_exweight', inputValue: 'B',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		weightrep = "B";
            			
               }
              }
             }
            },
        ]
    }
    ]
});

var txtexwt = new Ext.form.TextField({
    fieldLabel  : 'Weight  +',
    id          : 'txtexwt',
    name        : 'txtexwt',
    width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    enableKeyEvents: true,
    labelStyle : "font-size:10px;font-weight:bold;",
    style      : "border-radius:5px;",     	
    tabindex : 1,

});   

var dtwtfrdate = new Ext.form.DateField({
    fieldLabel : 'From Date',
    id         : 'dtwtfrdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var dtwttodate = new Ext.form.DateField({
    fieldLabel : 'To Date',
    id         : 'dtwttodate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border-radius:5px;",
    width : 100,
});

var btnwtrep = new Ext.Button({
    style   : 'text-align:center;',
    text    : "Report",
    width   : 60,
    height  : 40,
    x       : 210,
    y       : 220,
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	
	

        }//click
    }//listener
}); 
               
var TrnSalesGatePassFormpanel = new Ext.FormPanel({
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
        id          : 'TrnSalesGatePassFormpanel',
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
				TrnSalesGatePassFormpanel.getForm().reset();
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
//EDIT
		        click: function () {
				gstFlag = "Edit";
                                Ext.getCmp('cmbgpno').show();

		        }
		    }
		},'-',                
		{
	            text: 'Save',
                    id  : 'save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {

                       if (flxDetail.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('SALES','Grid should not be empty..');
        	                gstSave="false";
	                    }
                      else if (txtdest.getRawValue() == "")
   	                   {
        	                Ext.Msg.alert('SALES','Destination should not be empty..');
        	                gstSave="false";
	                    }
             		else
			{               
					   Ext.MessageBox.show({
				           title: 'Confirmation',
				           icon: Ext.Msg.QUESTION,
		        		   buttons: Ext.MessageBox.YESNO,
		                           msg: 'Do You Want to save the Record',
		                    	   fn: function(btn)
					   {         
					      if (btn == 'yes')
			                      {   
					       flxDetail.getSelectionModel().selectAll();
                                               var minDeta = flxDetail.getStore().getRange();                                
      					       var minupData = new Array();
                                               Ext.each(minDeta, function (record) {
                                               minupData.push(record.data);
                                               });  
                                               Ext.Ajax.request({
				               url: 'TrnSalesGatePassSave.php',
				               params:
						{       

						griddet: Ext.util.JSON.encode(minupData),                                      
                                		cnt:minDeta.length,

                                                savetype : gstFlag,
                                                compcode : Gincompcode,
						finid    : GinFinid,
                                                gpno     : txtgpno.getValue(),
			               		gpdate   : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                                                transport: trans,
                                                destination : txtdest.getRawValue(),
                                                invnos : invnos,
        
                                        	},
	                                        callback: function(options, success, response)
                                                {
                                                 var obj = Ext.decode(response.responseText);
						if (obj['success']==="true")
						{                                
                                                    Ext.MessageBox.alert("Gate Pass Saved -" + obj['gpno']);
       			                            TrnSalesGatePassFormpanel.getForm().reset();						
                                                    flxDetail.getStore().removeAll();
                                                    RefreshData();
                                              }else
						{
    Ext.MessageBox.alert("Gate Pass Not Saved! Pls Check!- " + obj['gpno']);                                                  
                                    }
                                }
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start  
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
				TrnSalesGatePass.hide();
			   }
			}
        	}   
            ],
	
        },
                items: [
                { xtype   : 'fieldset',
		        title   : '',
		        layout  : 'hbox',
		        border  : true,
		        height  : 400,
		        width   : 700,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 10,
		        items:[ 


			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 190,
				x           : 10,
				y           : 10,
				border      : false,
				items: [txtgpno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 190,
				x           : 10,
				y           : 10,
				border      : false,
				items: [cmbgpno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 530,
				y           : 10,
			    	border      : false,
				items: [dtgpdate]
			},opttruckinv, 
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 420,
				x           : 120,
				y           : 100,
				border      : false,
				items: [cmbtrucknumber]
		        },
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 250,
				x           : 120,
				y           : 100,
				border      : false,
				items: [txtinvnofrom]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 15,
				width       : 145,
				x           : 370,
				y           : 100,
				border      : false,
				items: [txtinvnoto]
			},btnadd,flxDetail,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 95,
				width       : 230,
				x           : 170,
				y           : 290,
				border      : false,
				items: [txttottruckwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 230,
				x           : 420,
				y           : 290,
				border      : false,
				items: [txtnoofreelbund]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 350,
				x           : 50,
				y           : 330,
				border      : false,
				items: [txtdest]
			},		        		        			
                 ],
             },optdetails,           
                 { 
                	xtype   : 'fieldset',
		        title   : 'Report Printing',
		        layout  : 'hbox',
		        border  : true,
		        height  : 320,
		        width   : 300,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 740,
		        y       : 90,
		        items:[ 		        
		        	optweightrep,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 10,
				y           : 60,
				border      : false,
				items: [txtexwt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 10,
				y           : 110,
			    	border      : false,
				items: [dtwtfrdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 200,
				x           : 10,
				y           : 170,
			    	border      : false,
				items: [dtwttodate]
			},btnwtrep,
		        
		        ],
	        },
	                      
          ],
                 
    });

function RefreshData(){
        flxDetail.getStore().removeAll();
        Ext.getCmp('save').setDisabled(false);

 	loadfindgpnodatastore.removeAll();
	loadfindgpnodatastore.load({
        url: 'ClsTrnSalesGatePass.php',
        params: {
                    task: 'loadfindgpNo',
                    compcode:Gincompcode,
                    finid:GinFinid  
                },
		callback:function()
      		{
                    txtgpno.setValue(loadfindgpnodatastore.getAt(0).get('gp_no'));
                }
	  });
          loadvechiles();
         // grid_tot();
   };
   

function loadvechiles()
{
	loadvechiledatastore.removeAll();
	loadvechiledatastore.load({
        url: 'ClsTrnSalesGatePass.php',
        params: {
                    task: 'loadvehicleno',
                    compcode:Gincompcode,
                    finid  : GinFinid ,  
                    gpdate : Ext.util.Format.date(dtgpdate.getValue(),"Y-m-d"),
                },
		callback:function()
      		{
                }
	  });
          grid_tot();


}
  
var TrnSalesGatePass = new Ext.Window({
     height      : 500,
     width       : 1070,
     x	     : 100,
     y           : 30,
     title       : 'GATE PASS',
     items       : TrnSalesGatePassFormpanel,
     layout      : 'fit',
     closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
     minimizable : true,
     maximizable : true,
     resizable   : false,
     border      : false,
     draggable   : false,
     listeners:{
               show:function(){
			if(truck=="T"){
			Ext.getCmp('txtinvnofrom').hide();
			Ext.getCmp('txtinvnoto').hide();
			}
			if(truck=="I"){
			Ext.getCmp('txtinvnofrom').show();
			Ext.getCmp('txtinvnoto').show();
			}
                       RefreshData();
		}
	}	
    });
    TrnSalesGatePass.show();  
});
