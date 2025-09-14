Ext.onReady(function(){
   Ext.QuickTips.init();
   


    var GinFinid = localStorage.getItem('ginfinid');
    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');

    var GinUser = localStorage.getItem('gstuser');

    var GinUserid = localStorage.getItem('ginuserid');
    var GinUserType = localStorage.getItem('ginusertype');


var gridedit = "false";
var editrow  = 0;

var saveflag = "Add";
var seqno = 0;
var targetmins = 0;
var loadTargetdatastore = new Ext.data.Store({
      id: 'loadTargetdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'clsTarget.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadTargetDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'tseqno', 'tgsm',  'tdeckle', 'tspeed', 'tprdn_hr', 'tprdn_min','tpower_ton', 'tsteam_ton'
      ]),
    });	

   function RefreshData(){
        txtGSM.setRawValue("");	
        saveflag = "Add";
        seqno = 0;
        loadTargetdatastore.removeAll();
	loadTargetdatastore.load({
        	 url: 'clsTarget.php', 
              	 params:
        	 {
                	 task:"loadTargetDetails"
               	 }
	});

   };

  
   var fm = Ext.form;
    
   var dgrecord = Ext.data.Record.create([]);
   var flxTraget = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 200,
        width: 800,
        x: 20,
        y: 200,
       // style:"font-size:60px;padding:10px 0px 0 15px",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        id: 'my-grid', 
 
          
        columns: [
         {header: "Seq.No "    , Id: 'tseqno', sortable:true,width:100,align:'left', menuDisabled: true},  
         {header: "GSM  "  ,   Id: 'tgsm', sortable:true,width:100,align:'left', menuDisabled: true},      
         {header: "DeckleWidth", Id: 'tdeckle', sortable:true,width:100,align:'left', menuDisabled: true},       
         {header: "MachineSpeed",Id: 'tspeed', sortable:true,width:100,align:'left', menuDisabled: true},
         {header: "Prodn /hr"   ,Id: 'tprdn_hr', sortable:true,width:100,align:'left', menuDisabled: true},
         {header: "Prodn /min"   ,Id: 'tprdn_min', sortable:true,width:100,align:'left', menuDisabled: true},
         {header: "Power /t"    ,Id: 'tpower_ton', sortable:true,width:100,align:'left', menuDisabled: true},
         {header: "Steam /t"    ,Id: 'tsteam_ton', sortable:true,width:100,align:'left', menuDisabled: true},
          ],



store:loadTargetdatastore ,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){


			var sm = flxTraget.getSelectionModel();
			var selrow = sm.getSelected();
			
         		gridedit = "true";
			editrow = selrow;
                   	saveflag = "Edit";
                        seqno = selrow.get('tseqno')
//alert(seqno);
			txtGSM.setValue(selrow.get('tgsm'));
			txtDeckleWidth.setValue(selrow.get('tdeckle'));
			txtSpeed.setValue(selrow.get('tspeed'));
			txtProdHr.setValue(selrow.get('tprdn_hr'));
			targetmins = selrow.get('tprdn_min');

                        txtPowerTon.setValue(selrow.get('tpower_ton'));
			txtSteamTon.setValue(selrow.get('tsteam_ton'));
                        calculate_Prodn();
         	        flxTraget .getSelectionModel().clearSelections();
			}

                 
   }
    

   });
   
 
 function calculate_Prodn()
 {
  
//   var prod = Number(txtGSM.getValue()) * Number(txtSpeed.getValue())*2.7*60/1000000;
    targetmins = Number(txtGSM.getValue()) * Number(txtSpeed.getValue())*2.7/1000000;      

   var prod = Number(txtGSM.getValue()) * Number(txtSpeed.getValue())*2.7*60/1000000;
   txtProdHr.setRawValue(Ext.util.Format.number(prod,'0.0'));
   targetmins = Ext.util.Format.number(targetmins,'0.0000000');
//alert(targetmins);
 } 

 var txtGSM = new Ext.form.TextField({
        fieldLabel  : 'GSM  ',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
	tabindex : 2,
    	enableKeyEvents: true,
        listeners   :{
           blur:function(){
              calculate_Prodn();
           },
           keyup:function(){
              calculate_Prodn();
           },
        }	

  });

 var txtProdHr = new Ext.form.TextField({
        fieldLabel  : 'Prodn/Hr',
        id          : 'txtProdHr',
        name        : 'txtProdHr',
        width       :  80,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex    : 2,
        readOnly    : true,
	

  });

   
var txtDeckleWidth = new Ext.form.TextField({
        fieldLabel  : 'Deckle (CM)',
        id          : 'txtDeckleWidth',
        name        : 'txtDeckleWidth',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        value   : '270', 

  });
  
  var txtPowerTon = new Ext.form.TextField({
        fieldLabel  : 'Power / ton',
        id          : 'txtPowerTon',
        name        : 'txtPowerTon',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
    
  var txtSpeed = new Ext.form.TextField({
        fieldLabel  : 'Machine Speed',
        id          : 'txtSpeed',
        name        : 'txtSpeed',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style       :  "font-size:14px;border-radius:10px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
	tabindex : 2,
    	enableKeyEvents: true,
        listeners   :{
           blur:function(){
              calculate_Prodn();
           },
           keyup:function(){
              calculate_Prodn();
           },
        }	
	

  });
  
   var txtSteamTon = new Ext.form.TextField({
        fieldLabel  : 'Steam / ton',
        id          : 'txtSteamTon',
        name        : 'txtSteamTon',
        width       :  80,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
         style       :  "font-size:14px;border-radius:10px;font-weight:bold",
	tabindex : 2,
	

  });
 
   var TargetPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    header      : true,
    width       :800,
    height      : 50,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'TargetPanel',
    method      : 'POST',
    layout      : 'absolute',
          tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 50,
            style   :'background-color:#d7d5fa',
            fontSize:50,
            items: [
                  {
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',

                    listeners:{
                        click: function () {

				if( txtGSM.getRawValue() == '' ) 
				{

					alert("Enter Varietyparameter Name");
					txtGSM.setFocus();
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do u want to save',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'ProductionTargetSave.php',
                		       	        params:
						{
					    	     savetype : saveflag,
                                                     seqno    : seqno,
						     gsm      : txtGSM.getRawValue(),
             					     deckle    : txtDeckleWidth.getRawValue(),
						     speed     : txtSpeed.getRawValue(),
                                                     prdn_hr   : txtProdHr.getRawValue(),
						     power_ton : txtPowerTon.getRawValue(),
						     steam_ton : txtSteamTon.getRawValue(),
                                                     targetmins: targetmins,
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
                                               
 						Ext.MessageBox.alert("Alert","Saved ");
						    TargetPanel.getForm().reset();
							RefreshData();
                                                }
                                             	else 
						{
                                             												
                                             Ext.MessageBox.alert("Alert","Not Saved / Already Available.. ");
					                                                    
                                            	}
                                      
					 	}   
			        		});
			    	
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:70,width:70,
                  
                },'-',
                
                 {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:70,width:70,
                    listeners:{
                    click: function(){
                         TargeWindow.hide();
                    }
                  }

                   
                }]
        },
                 items: [
            { 
            xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 440,
                width   : 900,
  
		style   : { border:'1px solid blue'},
                         style      : "border-radius:15px;",     
                layout  : 'absolute',
                x       : 200,
                y       : 10,	
                items:[
                
                	{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:360,
	    		x	:20,
	    		y	:5,
	    		border	:false,
	    		items:[txtGSM]
	    		},
	    	
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 35,
                                    	border      : false,
                                	items: [txtDeckleWidth]
                          },
                          
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 65,
                                    	border      : false,
                                	items: [txtSpeed]
                          },
                            
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 95,
                                    	border      : false,
                                	items: [txtProdHr]
                          },                        
                            
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 125,
                                    	border      : false,
                                	items: [txtPowerTon]
                          },
                          
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 360,
                                	x           : 20,
                                	y           : 155,
                                    	border      : false,
                                	items: [txtSteamTon]
                          },
                          

                          flxTraget,
                                        
                        ]
       
       }
       ]
       
 
});
   
 
 var TargeWindow = new Ext.Window({
	height      : 575,
        width       : 1200,
        y           : 50,
        title       :'PRODUCTON TARGET ENTRY',
        items       : 'TargetPanel',
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
         border      : false,
        draggable   : false,
onEsc:function(){
},
 	listeners:{
               show:function(){
       
             }
             }
            });
             
            TargeWindow.show();  
        });      
   
