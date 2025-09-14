Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('tfinid');
   var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var sizetype = 'I';
   var shade = 'NS';
   var hsn = '';
   var qlyshortcode  = '';
   var qlycode = 0;
   var grpcode = 0;
   var RBtype = "1";
   var saveflag = 'New';
   var seqno = 0;
   var txtBF = new Ext.form.NumberField({
        fieldLabel  : 'BF',
        id          : 'txtBF',
        name        : 'txtBF',
        width       :  100,
        style       :  {textTransform: "uppercase"},
	readOnly    :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2
    });


   var txtGSM = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtGSM',
        name        : 'txtGSM',
        width       :  100,
    	readOnly    :  true,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 2
    });

   var txtLength = new Ext.form.NumberField({
        fieldLabel  : 'Length',
        id          : 'txtLength',
        name        : 'txtLength',
        width       :  100,
     	//	disabled : true,
		tabindex : 2,
        style      : "border-radius:10px;",
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff", 
      autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                setsizedesc();
            },
        }    
    });	

   var txtBreadth = new Ext.form.NumberField({
        fieldLabel  : 'Size(Breadth)',
        id          : 'txtBreadth',
        name        : 'txtBreadth',
        width       :  100,
     	//	disabled : true,
		tabindex : 2,
        style      : "border-radius:10px;",
      autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff", 
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                setsizedesc();
            },
        }    
    });	

   var txtSheets = new Ext.form.NumberField({
        fieldLabel  : 'Sheets/Ream',
        id          : 'txtSheets',
        name        : 'txtSheets',
        width       :  100,
     	//	disabled : true,
		tabindex : 2,
        style      : "border-radius:10px;",
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff", 
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
          //      setsizedesc();
            },
        }    
    });	

   var txtReams = new Ext.form.NumberField({
        fieldLabel  : 'Reams/Bund',
        id          : 'txtReams',
        name        : 'txtReams',
        width       :  100,
     	//	disabled : true,
		tabindex : 2,
        style      : "border-radius:10px;",
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff", 
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
     //           setsizedesc();
            },
        }    
    });	



function SizeSearch()
{
        flxQly.show();
        if (txtSizeSearch.getRawValue().length > 3)
        {  
		loadsearchSizeDataStore.removeAll();
		loadsearchSizeDataStore.load({
			url: 'ClsMasSize.php',
			params:
			{
				task:"loadSearchSizelist",
				size : txtSizeSearch.getRawValue(),
			},
		});
        } 
}

 
 var txtSizeSearch = new Ext.form.TextField({
        fieldLabel  : 'Search',
        id          : 'txtSizeSearch',
        name        : 'txtSizeSearch',
        width       :  200,
        style       :  {textTransform: "uppercase"},
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        allowBlank  :  true,
	tabindex : 1,
        readOnly : false,
        store       : loadallSizeDataStore,
    	enableKeyEvents: true,
          	style: 'background-color: #00FF00;border-radius:5px;',
    	listeners : {
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxchk = 1;
                     

//                   flxQly.hide();
           
             }
             if (e.getKey() == e.DOWN)
             {
 
             flxQly.getSelectionModel().selectRow(0)
             flxQly.focus;
             flxQly.getView().focusRow(0);
             }
          },

	    keyup: function () {
                loadsearchSizeDataStore.removeAll();
                  if (txtSizeSearch.getRawValue() != '')
                     SizeSearch();
            }
        }
    });

   var txtSizeCode = new Ext.form.NumberField({
        fieldLabel  : 'Size Code',
        id          : 'txtSizeCode',
        name        : 'txtSizeCode',
        width       :  230,
        readOnly    :  true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//	disabled : true,
		tabindex : 2
    });	

     var lbldisplay = new Ext.form.Label({
       fieldLabel  : 'SIZE DETAILS',
       id          : 'lbldisplay',
       width       : 60,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;  textTransform: uppercase ", 
       
    });

 var loadProdnVariety = new Ext.data.Store({
      id: 'loadProdnVariety',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSize.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_groupcode', type: 'int',mapping:'var_groupcode'},
	{name:'var_desc', type: 'string',mapping:'var_desc'}
      ]),
    });


 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSize.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });


  var getShadeCodeDataStore = new Ext.data.Store({
       id: 'getShadeCodeDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSize.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findShadecode"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['shade_shortname','shade_code','shade_shortcode'])
    });


  var getVarietyDataStore = new Ext.data.Store({
       id: 'getVarietyDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSize.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "findvarietydetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_groupcode', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm', 'vargrp_type_short_code', 'vargrp_type_hsncode'])
    });



 var loadallSizeDataStore = new Ext.data.Store({
      id: 'loadallSizeDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSize.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadallSizeDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code', 'var_name' ,'var_bf',  'var_gsm' ,  'var_size1', 'var_size2', 'var_desc', 'var_grpcode', 'var_inchcm', 'sizein', 'var_shade', 'shade','vargrp_type_hsncode','var_typecode', 'var_sheets', 'var_reams'
      ]),
    });

 var loadsearchSizeDataStore = new Ext.data.Store({
      id: 'loadsearchSizeDataStore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSize.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchSizelist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code', 'var_name' ,'var_bf',  'var_gsm' ,  'var_size1', 'var_size2', 'var_desc', 'var_grpcode', 'var_inchcm', 'sizein', 'var_shade', 'shade','vargrp_type_hsncode','var_typecode', 'var_sheets', 'var_reams'
      ]),
    });


var grpcode;
var cmbVariety = new Ext.form.ComboBox({
        fieldLabel      : 'Variety ',
        width           : 250,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbVariety',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdnVariety,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function ()                 {
           //     RefreshData();
                getVarietyDataStore.removeAll();
        
                getVarietyDataStore.load({
                    url: 'ClsMasSize.php', // File to connect to
                    params:
                            {
                                task: "findvarietydetails",
                                grpcode:cmbVariety.getValue()
                            },
                    callback: function () {
                        var cnt = getVarietyDataStore.getCount(); 
                        if (cnt > 0) {

                                   
                                   txtGSM.setValue(Number(getVarietyDataStore.getAt(0).get('var_gsm')));
                                   hsn = getVarietyDataStore.getAt(0).get('vargrp_type_hsncode');
                                   qlyshortcode = getVarietyDataStore.getAt(0).get('vargrp_type_short_code');
                                   grpcode  = getVarietyDataStore.getAt(0).get('var_typecode');
                                   qlycode = getVarietyDataStore.getAt(0).get('var_groupcode');
                                   if (getVarietyDataStore.getAt(0).get('var_bf') > 0)
                                   { 
                                      txtBF.setRawValue(getVarietyDataStore.getAt(0).get('var_bf'));
                                   }
                                   else    
                                   { 
                                      txtBF.setRawValue("00");
                                   }
				

                                   setsizedesc();
                                  }

                         else {alert('not found');

                       } 
                   }
                });
              }
        } 
   });



var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'Shade ',
        width           : 150,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        hiddenName      : '',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
          enableKeyEvents: true,
        listeners: {
            select: function ()                 {
           //     RefreshData();
                getShadeCodeDataStore.removeAll();
        
                getShadeCodeDataStore.load({
                    url: 'ClsMasSize.php', // File to connect to
                    params:
                            {
                                task: "findShadecode",
                                shadecode :cmbShade.getValue()
                            },
                    callback: function () {
                        var cnt = getShadeCodeDataStore.getCount(); 
                        if (cnt > 0) 
                        {
                            shade  = getShadeCodeDataStore.getAt(0).get('shade_shortcode');
                    setsizedesc();
                        }  
                        else 
                        {
                           alert('not found');
                        }

                   }
                });
              }
        } 
   });

function countlength(str)
{
alert(str);
alert(str.getValue().length);

}

function setsizedesc(){
        var gsmdisplay = "";
        var sizedisplay = "";
        var bfdisplay = "";
        var n = 0;

//alert(grpcode);
          
        gsmdisplay = ("00"+txtGSM.getValue()).slice(-3);
        bfdisplay = ("00"+txtBF.getValue()).slice(-2);

        if (RBtype == "1")
        {
		if ( sizetype == 'C') 
		{
		sizedisplay = "0"+Ext.util.Format.number(txtBreadth.getValue(),'000.0');
		n = String(sizedisplay).length;
		sizedisplay = sizedisplay.slice(-5);
		}
		else
		{

                    if (Number(txtBreadth.getValue()) < 100)
                    {
			sizedisplay = "0"+Ext.util.Format.number(txtBreadth.getValue(),'00.00');
			sizedisplay = sizedisplay.slice(-5);
                    }   
                    else
                    {
                        alert("Error in Size given. please check");
                        txtBreadth.setValue('');
                    }       

		}

		if (sizedisplay == "00")
		{
		  sizedisplay == "";
		}
		else
		{
		  sizedisplay = sizedisplay + sizetype;
		}
        }
        else
        {    
                reamdisplay = ("00"+txtReams.getValue()).slice(-2);
                sheetsdisplay = ("00"+txtSheets.getValue()).slice(-3);

		if ( sizetype == 'C') 
		{
		sizedisplayl = Ext.util.Format.number(txtLength.getValue(),'000.00');
		sizedisplayb = Ext.util.Format.number(txtBreadth.getValue(),'000.00');
		n = String(sizedisplay).length;

		sizedisplayl = sizedisplayl.slice(-6);
		sizedisplayb = sizedisplayb.slice(-6);
                sizedisplay = sizedisplayl + "X" + sizedisplayb+"C"; 
		}
                else
		{
		sizedisplayl = Ext.util.Format.number(txtLength.getValue(),'000.00');
		sizedisplayb = Ext.util.Format.number(txtBreadth.getValue(),'000.00');
		n = String(sizedisplay).length;

		sizedisplayl = sizedisplayl.slice(-6);
		sizedisplayb = sizedisplayb.slice(-6);
                sizedisplay = sizedisplayl + "X" + sizedisplayb+"I"; 
		}


        }
        txtSizeCode.setRawValue(qlyshortcode+bfdisplay+"-"+gsmdisplay+shade+"-"+sizedisplay);  

        loadsearchSizeDataStore.removeAll();
        loadsearchSizeDataStore.load({
		url: 'ClsMasSize.php',
		params:
		{
			task:"loadSearchSizelist",
			size : txtSizeCode.getRawValue(),
		},
        });
  

   }
	

   function RefreshData(){
 
      saveflag = 'New';
      seqno = 0;
//      txtBF.setRawValue("");  
//      txtGSM.setRawValue("");
       txtSizeCode.setRawValue("");
       txtBreadth.setRawValue("");
       Ext.getCmp('cmbVariety').setDisabled(false);    
/*
	 loadallSizeDataStore.load({
      		 url: 'ClsMasSize.php', 
		 params:
		 {
		   task:"loadallSizeDetails"
              	 }
	 });
*/
      	 loadProdnVariety.load({
      		 url: 'ClsMasSize.php', 
		 params:
		 {
		   task:"loadVariety"
              	 }
	 });   

                              

     };

   var dgrecord = Ext.data.Record.create([]);
   var flxQly = new Ext.grid.EditorGridPanel({
        frame: true,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 390,
        width: 750,
        x: 10,
        y: 10,
        style:"font-size:24px;padding:10px 0px 0 15px",
        fontSize:18,
          
        columns: [    
            {header: "Size code", Id: 'var_code', sortable:true,width:10,align:'left',hidden: true },       
            {header: "Size Code", Id: 'var_name', sortable:true,width:130,align:'left'},
            {header: "BF"       , Id: 'var_bf'  , sortable:true,width:70,align:'left'}, 
            {header: "GSM"      , Id: 'var_gsm' , sortable:true,width:70,align:'left'}, 
            {header: "length " , Id: 'var_size1' , sortable:true,width:70,align:'left'}, 
            {header: "SIZE"     , Id: 'var_size2' , sortable:true,width:70,align:'left'},     
            {header: "Quality " , Id: 'var_desc' , sortable:true,width:100,align:'left'},  
            {header: "Qlycode " , Id: 'var_grpcode' , sortable:true,width:70,align:'left'},  
            {header: "sizetype " , Id: 'var_inchcm' , sortable:true,width:70,align:'left'}, 
            {header: "Size In " , Id: 'sizein' , sortable:true,width:70,align:'left'}, 
            {header: "Shade " , Id: 'var_shade' , sortable:true,width:70,align:'left'}, 
            {header: "Shade " , Id: 'shade' , sortable:true,width:70,align:'left'}, 
            {header: "hsncode " , Id: 'vargrp_type_hsncode' , sortable:true,width:70,align:'left'},  
            {header: "code " , Id: 'var_typecode' , sortable:true,width:70,align:'left'},  
            {header: "sheets " , Id: 'var_sheets' , sortable:true,width:70,align:'left'}, 
            {header: "reams " , Id: 'var_reams' , sortable:true,width:70,align:'left'}, 


//	'var_code', 'var_name' ,'var_bf',  'var_gsm' ,  'var_size1', 'var_size2', 'var_desc', 'var_grpcode', 'var_inchcm', 'sizein', 'var_shade', 'shade','vargrp_type_hsncode','var_typecode', 'var_sheets', 'var_reams'
           ],
/*
viewConfig: {
getRowClass: function(record) {
    var red = record.get('var_name') // shows if a CPE is dead or not (HS = Dead)
    if (red == txtSizeCode.getRawValue()) {
    return 'var_name'
    }
}
},
*/
store:loadsearchSizeDataStore,
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
/*
             Ext.Msg.show({
             title: 'SIZE MASTER EDIT',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNO,
             msg: 'Are you sure to Modify YES to EDIT-  NO to  EXIT',
             fn: function(btn){
                 if (btn === 'yes')
                    {

			var sm = flxQly.getSelectionModel();
			var selrow = sm.getSelected();
	       		gridedit = "true";
			editrow = selrow;
	


                        saveflag = "Edit";
			seqno  = selrow.get('var_code');
			qlyshortcode = selrow.get('var_name').substring(0,2);

                  	qlycode = selrow.get('var_grpcode');

			txtBF.setValue(selrow.get('var_bf'));
			txtGSM.setValue(selrow.get('var_gsm'));
                        txtBreadth.setValue(selrow.get('var_size'));
                        cmbVariety.setRawValue(selrow.get('var_desc'));
                        cmbVariety.setValue(selrow.get('var_grpcode'));
                        grpcode = selrow.get('var_typecode');
                        txtSizeCode.setValue(selrow.get('var_name'));
                        hsn = selrow.get('vargrp_type_hsncode');

                        shade  = selrow.get('var_shade');
                        if (selrow.get('var_shade') == "NS"  )
                           cmbShade.setValue(1);
                        else if (selrow.get('var_shade') == "GY" )
                           cmbShade.setValue(2);
                        else if (selrow.get('var_shade') == "DP" )
                           cmbShade.setValue(3);
                        else if (selrow.get('var_shade') == "SY" )
                           cmbShade.setValue(4);
                        else if (selrow.get('var_shade') == "GB" )
                           cmbShade.setValue(5);
                        else if (selrow.get('var_shade') == "VV" )
                           cmbShade.setValue(6);
                        else if (selrow.get('var_shade') == "BB" )
                           cmbShade.setValue(7);

                        if (selrow.get('var_inchcm') == "I")
                           Ext.getCmp('optsizetype').setValue(1);
                        else
                           Ext.getCmp('optsizetype').setValue(2);

                        setsizedesc();
			flxQly.getSelectionModel().clearSelections();

                        Ext.getCmp('cmbVariety').setDisabled(true);    
		  }
             }
             });   
*/ 
   }

   }
 

   });

var optReelBundle = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: 'Reel / Bunlde',
    layout : 'hbox',
    width:200,
    height:45,
    x:150,
    y:-10,
    border: false,
    items: [
        {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optReelBundle',
        items: [
            {boxLabel: 'Reel', name: 'optReelBundle', id:'optReel', inputValue: 1,checked:true,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     RBtype = "1";
                        Ext.getCmp('txtLength').setReadOnly(true);  
                        Ext.getCmp('txtSheets').setReadOnly(true);  
                        Ext.getCmp('txtReams').setReadOnly(true);  
                     setsizedesc();
                  }
               }
              }
            },
            {boxLabel: 'Bundle', name: 'optReelBundle', id:'optBundle', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   Ext.getCmp('txtLength').setReadOnly(false);  
                        Ext.getCmp('txtSheets').setReadOnly(false);  
                        Ext.getCmp('txtReams').setReadOnly(false);  
                   RBtype = "2";
                   setsizedesc();
               }
              }
             }}
        ]
    }
    ]
});
 
var optsizetype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: 'Size in',
    layout : 'hbox',
    width:200,
    height:45,
    x:250,
    y:130,
    border: false,
    items: [
        {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optsizetype',
        items: [
            {boxLabel: 'Inch', name: 'optsizetype', id:'optinch', inputValue: 1,checked:true,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     sizetype = "I";
                     setsizedesc();
                  }
               }
              }
            },
            {boxLabel: 'CMS', name: 'optsizetype', id:'optcm', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   sizetype = "C";
                   setsizedesc();
               }
              }
             }}
        ]
    }
    ]
});


var optshade = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'SHADE',
    fieldLabel: '',
    layout : 'hbox',
    width: 425,
    height:80,
    x:0,
    y:380,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 4,
        rows : 2,
        id: 'optshade',
        items: [
            {boxLabel: 'NAT', name: 'optshade', id:'optNAT', inputValue: 1,checked:true,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     shade = "N";
                     setsizedesc();
                  }
               }
              }
            },
            {boxLabel: 'GYT', name: 'optshade', id:'optGYT', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "G";
                   setsizedesc();
               }
              }
             }},
            {boxLabel: 'DP', name: 'optshade', id:'optDP', inputValue: 3,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "D";
                   setsizedesc();
               }
              }
             }},

            {boxLabel: 'SHYS', name: 'optshade', id:'optSHYS', inputValue: 4,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "Y";
                   setsizedesc();
               }
              }
             }},
            {boxLabel: 'GREY-BRD', name: 'optshade', id:'optGB', inputValue: 5,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "B";
                   setsizedesc();
               }
              }
             }},
            {boxLabel: 'SHVV+', name: 'optshade', id:'optVV', inputValue: 6,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "V";
                   setsizedesc();
               }
              }
             }},
        ]
    }
    ]
});
   var MasSizePanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSizePanel',
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
//save                
         {
                    text: 'Save',
                    id  : 'save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

                                if(txtBreadth.getRawValue()=="" || txtBreadth.getRawValue()==0)
				{
					alert("Enter Size");
					txtBreadth.setFocus();
				}
               

                         	else if(cmbVariety.getRawValue()=="" || cmbVariety.getValue()==0)
				{
					alert("Select Variety..");
					cmbVariety.setFocus();
				}
                         	else if( RBtype == "1" && (txtSizeCode.getRawValue().length != 17 && txtSizeCode.getRawValue().length != 19))
				{
					alert("Error in Size ");
			
				}
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{
						Ext.Ajax.request({
		                            	url: 'FrmMasSizeSave.php',
		                                params:
						{
                                                savetype   : saveflag,
                                                seqno      : seqno,  
                                                vargrpcode : qlycode, 
                                                vunit      : RBtype,  
				        	length     : txtLength.getValue(),		 
				        	breadth    : txtBreadth.getValue(),		
				        	sheets     : txtSheets.getValue(),		
				        	reams      : txtReams.getValue(),		
					        hsncode    : hsn, 
                                                sizecode   : txtSizeCode.getRawValue(),
                                                sizetype   : sizetype,
                                                shade      : shade,
           
 	
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
						var obj2 = Ext.decode(response.responseText);
                                            	if (obj['success'] === "true") 
						{
   
 						Ext.MessageBox.alert("Alert","Size Saved ");
//						    MasSizePanel.getForm().reset();
//							RefreshData();
                                                        txtBF.foucs();
                                                }
                                             	else 
						{
  
						if (obj['cnt']>0)
							{
                                             Ext.MessageBox.alert("Alert","Size Already exists.. ");
							}
							else
							{
                                             Ext.MessageBox.alert("Alert","Not Saved.. ");
							}
                                                     
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
                    handler: function(){	
                            MasSizeWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 450,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[     
                            optReelBundle,
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 20,
                                    	border      : false,
                                	items: [txtSizeSearch]
                           },	
                  
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 70,
                                    	border      : false,
                                	items: [cmbVariety]
                           },	
                           { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0 ,
                                	y           : 110,
                                    	border      : false,
                                	items: [txtBF]
                           },	
                            { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 420,
                                	x           : 0,
                                	y           : 140,
                                    	border      : false,
                                	items: [txtGSM]
                         },

			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 170,
                                    	border      : false,
                                	items: [cmbShade]
                            },

			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 200,
                                    	border      : false,
                                	items: [txtLength]
                            },


			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 230,
                                    	border      : false,
                                	items: [txtBreadth]
                            },


			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 260,
                                    	border      : false,
                                	items: [txtSheets]
                            },


			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 290,
                                    	border      : false,
                                	items: [txtReams]
                            },



                           optsizetype, //optshade,
			 { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 130,
                                	width       : 400,
                                	x           : 0,
                                	y           : 340,
                                    	border      : false,
                                	items: [txtSizeCode]
                            },
                ]
            },
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 450,
                width   : 800,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 475,
                y       : 10,	
                items:[ 
                      {
                           xtype       : 'fieldset',
                           title       : '',
                           width       : 120,
                           x           : 5,
                           y           : -10,
                           defaultType : 'Label',
                           border      : false,
                           items: [lbldisplay]
                     },
                     flxQly]
            },


        ],
    });
    
   
    var MasSizeWindow = new Ext.Window({
	height      : 580,
        width       : 1300,
        y           : 35,
        title       : 'SIZE MASTER',
        items       : MasSizePanel,
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
                        Ext.getCmp('txtLength').setReadOnly(true);  
                        Ext.getCmp('txtSheets').setReadOnly(true);  
                        Ext.getCmp('txtReams').setReadOnly(true);  
                        RefreshData();
//			cmbVariety.focus();


	                      }
			
		}
    });
    //Ext.getCmp('save').setDisabled(true);
    MasSizeWindow.show();  
});
