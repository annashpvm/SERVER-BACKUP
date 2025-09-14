Ext.onReady(function(){
   Ext.QuickTips.init();
   
   var seqno = 0;
   var varcode = 0;
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');


var loadSOCustomerDataStore = new Ext.data.Store({
	id: 'loadSOCustomerDataStore',
	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnProdReelWeight.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadSOCustomer"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'cust_ref','cust_code'
	]),
});

var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnProdReelWeight.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadSONoList"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'ordh_sono'
	]),
});
var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : 'SO NO',
        width           : 100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
      labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
    //	labelStyle : "font-:10px;font-weight:bold;",
    	//style      : "border-radius:5px;",         
	listeners:{
        select: function(){

                loadSOCustomerDataStore.removeAll();
     		loadSOCustomerDataStore.load({
     		url: 'ClsTrnProdReelWeight.php',
		params: {
			    task: 'loadSOCustomer',
		            finid    : GinFinid,
			    compcode : Gincompcode,
                            sono     : cmbSONo.getValue()
                        },
               	callback:function()
			{
                         
                      cmbCustomerName.setValue(loadSOCustomerDataStore.getAt(0).get('cust_code'));        
                        }
               });
	}
	}
   });



var loadAllCustomerDataStore = new Ext.data.Store({
	id: 'loadAllCustomerDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnProdReelWeight.php',      // File to connect to
		method: 'POST'
	    }),
	    baseParams:{task:"loadAllCustomer"}, // this parameter asks for listing
	reader: new Ext.data.JsonReader({
		  // we tell the datastore where to get his data from
	root: 'results',
	totalProperty: 'total',
	id: 'id'
	},[
	'cust_ref','cust_code'
	]),
});

 var cmbCustomerName = new Ext.form.ComboBox({
        fieldLabel      : 'Customer Name ',
        width           : 200,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : '',
        id              : 'cmbCustomerName',
        typeAhead       : true,
        mode            : 'local',
        store           :loadAllCustomerDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
          enableKeyEvents: true,
	listeners:{
        select: function(){
	}
	}
});


 var txtSize = new Ext.form.TextField({
   	fieldLabel  :'Size',
   	id	    :'txtSize',
   	name	    :'txtSize',
   	width	    :200,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});

   var txtQuality = new Ext.form.TextField({
   	fieldLabel  :'Quality',
   	id	    :'txtQuality',
   	name	    :'txtQuality',
   	width	    :200,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :2,
   	});
   	
      var txtBF = new Ext.form.TextField({
   	fieldLabel  :'BF',
   	id	    :'txtBF',
   	name	    :'txtBF',
   	width	    :100,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :3,
   	});
   	
     var txtGSM = new Ext.form.TextField({
   	fieldLabel  :'GSM',
   	id	    :'txtGSM',
   	name	    :'txtGSM',
   	width	    :100,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :4,
   	});
   	
    var txtRollNo = new Ext.form.TextField({
   	fieldLabel  :'Roll No',
   	id	    :'txtRollNo',
   	name	    :'txtRollNo',
   	width	    :100,
   	readOnly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :5,
   	});
  
   var txtWeight = new Ext.form.TextField({
   	fieldLabel  :'Weight',
   	id	    :'txtWeight',
   	name	    :'txtWeight',
   	width	    :100,
   	readOnly    :false,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :6,
   	});
 
   var txtOldWeight = new Ext.form.TextField({
   	fieldLabel  :'Old Weight',
   	id	    :'txtOldWeight',
   	name	    :'txtOldWeight',
   	width	    :100,
   	labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
   	tabindex    :6,
   	});


 var loadReelWeightDatastore = new Ext.data.Store({
      id: 'loadReelWeightDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnProdReelWeight.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelWeight"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'r_reelno'

      ]),
    });
 
    var loadViewReelNo = new Ext.data.Store({
        id: 'loadViewReelNo',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnProdReelWeight.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadReelNumberDetail"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
	},['r_sono','cust_ref','var_desc','var_bf','var_gsm','r_rollno','r_size','r_reelwt','r_seqno','var_groupcode','r_custcode'])
});
   var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No ',
        width           : 200,
        displayField    : 'r_reelno', 
        valueField      : 'r_reelno',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           :loadReelWeightDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#b8309f",
          enableKeyEvents: true,
 listeners:{
                select: function () {
             		loadViewReelNo.load({
             		url: 'ClsTrnProdReelWeight.php',
			params: {
				    task: 'loadReelNumberDetail',
			           // finid: GinFinid,
				   // compcode:Gincompcode,
                                    reelno:cmbReelNo.getValue()
                                },
                       	callback:function()
				{
                                                                          
                                 seqno = loadViewReelNo.getAt(0).get('r_seqno');
                                 varcode = loadViewReelNo.getAt(0).get('var_groupcode');
                                 cmbSONo.setValue(loadViewReelNo.getAt(0).get('r_sono'));
                                 cmbCustomerName.setValue(loadViewReelNo.getAt(0).get('r_custcode'));
				 txtQuality.setValue(loadViewReelNo.getAt(0).get('var_desc'));
                                 txtBF.setValue(loadViewReelNo.getAt(0).get('var_bf'));
                                 txtGSM.setValue(loadViewReelNo.getAt(0).get('var_gsm'));
				 txtRollNo.setValue(loadViewReelNo.getAt(0).get('r_rollno'));
				 txtSize.setValue(loadViewReelNo.getAt(0).get('r_size'));
				 txtWeight.setValue(loadViewReelNo.getAt(0).get('r_reelwt'));
				 txtOldWeight.setValue(loadViewReelNo.getAt(0).get('r_reelwt'));
      				} 
                         });
			}
                      }    



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

//save

         height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/save.png',
            listeners:{
                click:function() {

//alert(gstFlag);
                        if(cmbReelNo.getRawValue()=="" || cmbReelNo.getValue()==0)
			{
				alert("Select ReelNO..");
	                        gstSave="false";
			}
			else if ( txtWeight.getValue() == 0)
	                    {
	                        Ext.Msg.alert('Reel Weight','Weight is empty..');
	                        gstSave="false";
	                    } 
             		else
			{               
			   Ext.MessageBox.show({
				   title: 'Confirmation',
				   icon: Ext.Msg.QUESTION,
				   buttons: Ext.MessageBox.YESNO,
		                   msg: "Do You Want to Save  the Record",
		            	   fn: function(btn)
				   {         
				      if (btn == 'yes')
                                      { 
				               Ext.Ajax.request({
					       url: 'TrnWeightEntrySave.php',
					       params:
						{
  						compcode:Gincompcode,
						fincode :GinFinid, 
                                                seqno   : seqno,                                     
				                reelno  : cmbReelNo.getValue(),
						weight  : txtWeight.getValue(),
                                                sono    : cmbSONo.getValue(),
                                                custcode: cmbCustomerName.getValue(), 
                                                qlycode : varcode,
                                                rollno  : txtRollNo.getValue(),
                                                oldweight  : txtOldWeight.getValue(),
				        	},
				                callback: function(options, success, response)
				                {
						    var obj = Ext.decode(response.responseText);
						    if (obj['success']==="true")
						    {                                
							   Ext.MessageBox.alert("Weight Saved -" + obj['reelno']);
		                                           ReelWeightPanel.getForm().reset();
		                                           RefreshData();
		                                     }else
						     {
		                                         Ext.MessageBox.alert("Weight Not Saved! Pls Check!- " + obj['reelno']);                                                 
		                                     }
                                               }
		         //-- loop Z end           
                                               });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
   
                  
                },'-',
                
        		
        	 {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
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
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				ProdReelWindow.hide();
			   }
			}
                  }
                  ],
        },
        items:[
    		{
    		xtype	:'fieldset',
    		title	:'',
    		width	:800,
    		height	:600,
    		x	:10,
    		y	:10,
    		border	:true,
    		layout	:'absolute',
    		
    		items:[
    		
    			

    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:10,
	    		border	:false,
	    		items:[cmbReelNo]
	    		},
			
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:50,
	    		border	:false,
	    		items:[cmbSONo]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:90,
	    		border	:false,
	    		items:[cmbCustomerName]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:130,
	    		border	:false,
	    		items:[txtQuality]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:170,
	    		border	:false,
	    		items:[txtBF]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:210,
	    		border	:false,
	    		items:[txtGSM]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:250,
	    		border	:false,
	    		items:[txtRollNo]
	    		},
	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:290,
	    		border	:false,
	    		items:[txtSize]
	    		},
	    	       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:380,
	    		x	:0,
	    		y	:330,
	    		border	:false,
	    		items:[txtWeight]
	    		},
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:100,
	    		width	:380,
	    		x	:300,
	    		y	:330,
	    		border	:false,
	    		items:[txtOldWeight]
	    		},
	    	       
	    	       
	    		],
	    		},
	    		],
	    		
	    	
        });

function RefreshData()
{

	loadAllCustomerDataStore.removeAll();
	loadAllCustomerDataStore.load({
	        url: 'ClsTrnProdReelWeight.php',
                params: {
	    	task     : 'loadAllCustomer',
 		
		},
		scope:this,
		callback:function()
       		{
		}
	  });

	loadOrderNoListDataStore.removeAll();
	loadOrderNoListDataStore.load({
	        url: 'ClsTrnProdReelWeight.php',
                params: {
	    	task     : 'loadSONoList',
                compcode : Gincompcode,
                finid    : GinFinid,
		},
		scope:this,
		callback:function()
       		{
		}
	  });
}

  
var ProdReelWindow = new Ext.Window({
	height      : 550,
        width       : 800,
        y           : 50,
        title       :'REEL WEIGHT',
        items       : 'ReelWeightPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
 	listeners:{
               show:function(){
                txtOldWeight.hide();
               RefreshData();
             }
             }
            });
             
             ProdReelWindow.show();  
        });      
   
