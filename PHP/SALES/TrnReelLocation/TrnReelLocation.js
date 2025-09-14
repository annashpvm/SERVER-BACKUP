Ext.onReady(function(){
Ext.QuickTips.init();
var Gincompcode = localStorage.getItem('gincompcode');
var GinFinid = localStorage.getItem('ginfinid');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


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
var itemcode = 0;
var fincode =0;
var varcode = 0;
var newsize = 0;
var newsono = 0;

   var yymm = '';
   var mm = 0;
   var yy = 0;

  var printtype='PDF';

var rep = "Date-Reel No wise";


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optprinttype',
        items: [
		{boxLabel: 'PDF', name: 'optprinttype', id:'prtPDF', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					    printtype="PDF";

					}
				}
			}
		},
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="OTHERS";


					}
				}
			}
		},
            
        ],
    }



    ]
});








var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });


var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'prd_rollno'
      ]),
    });

      var txtProdMonth = new Ext.form.NumberField({
   	fieldLabel  :'Production YYMM',
   	id	    :'txtProdMonth',
   	name	    :'txtProdMonth',
   	width	    : 80,
   	
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold;color:#f54242",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'4'},  
   	tabindex    :3,
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnReelLocation.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : GinFinid,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsReelWeight.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : GinFinid,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }   
             },
           change:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);   
               
                if (yymm != "")
                {
			loadRollNoDatastore.removeAll();
			loadRollNoDatastore.load({
			 url: 'ClsTrnReelLocation.php',
				params: {
			    	   task: 'loadRollNo',
				   compcode : Gincompcode,
				   finid    : GinFinid,   
				   yr       :  "20"+yymm.substring(0,2),   
				   mon      :  yymm.substring(2,4),   
				 },
				 callback:function()
				   {

				   } 
			  });
                 }   
                 else
                 {
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsReelWeight.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : GinFinid,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });

                 }  
             }
        }    
        

   	});


var cmbRollNo = new Ext.form.ComboBox({
        fieldLabel      : 'Roll No',
        width           : 90,
        displayField    : 'prd_rollno', 
        valueField      : 'prd_rollno',
        hiddenName      : '',
        id              : 'cmbRollNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRollNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
		select: function()
		{

                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4); 

        cmbReelNo.reset();


	loadreelnodatastore.removeAll();
	loadreelnodatastore.load({
	 url: 'ClsReelWeight.php',
		params: {
	    	   task: 'loadReelNoList',
                   compcode : Gincompcode,
                   finid    : GinFinid,
		   rollno   : cmbRollNo.getValue(),
	           mon      : mm,    
                   yr       : yy , 

	      
		 },
		 callback:function()
		   {

        //                   alert(loadreelnodatastore.getAt(0).get('rmonth'));


		   } 
	  });
	}
	}
   });



var loadAllVarietyDatastore = new Ext.data.Store({
      id: 'loadVarietyDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_desc','var_groupcode','prd_date','prd_seqno','prd_rollwt','prd_finprod','prd_shift','prd_rollno'
      ]),
    });

var loadOrderNoListDataStore = new Ext.data.Store({
	id: 'loadOrderNoListDataStore',
//	autoLoad : true,
	proxy: new Ext.data.HttpProxy({
		url: 'ClsTrnReelLocation.php',      // File to connect to
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
var loadSizeDatastore = new Ext.data.Store({
      id: 'loadSizeDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSOsizes"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'var_code','sizecode'
      ]),
    })


 var loaddocnodatastore = new Ext.data.Store({
      id: 'loaddocnodatastore',
//      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadentryno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'no'
      ]),
    });

 var loadreelnodatastore = new Ext.data.Store({
      id: 'loadreelnodatastore',
     // autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNoList"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['stk_sr_no' , 'stk_finyear','rmonth' ]),
    });

var loadreelnodetaildatastore = new Ext.data.Store({
      id: 'loadreelnodetaildatastore',
      autoLoad : true,      
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnReelLocation.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelDetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm','stk_finyear','stk_sono','var_grpcode','stk_location'
      ]),
    });





var cmbLocation = new Ext.form.ComboBox({
        fieldLabel      : 'Location' ,
        width       	 :  100,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbLocation',
        typeAhead       : true,
        mode            : 'local',
        store           : ['1','2','3','4','5','6','7','8','9','10','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
'J(OPP)','A1','A2','A3','A4','A5','A6','A7','A8','A9','A10','A11','A12','A13','A14','I POINT','IIPOINT', 'FINISH', 'A11', 'A15','A16','A13','L-POINT2','QLAB'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){

    
	}
	}
});

var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No',
        width       	 :  200,
        displayField    : 'stk_sr_no', 
        valueField      : 'stk_sr_no',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadreelnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",         
	listeners:{
        select : function(){


     		loadreelnodetaildatastore.removeAll();
		loadreelnodetaildatastore.load({
			url: 'ClsTrnSalesReelVarietyChange.php',
			params: {
		          task: 'loadReelDetail',
			  compcode : Gincompcode,
//			  finid    : cmbReelNo.getValue(),
		          reelno   : cmbReelNo.getRawValue(),  
			},
			callback : function(){
//alert(loadreelnodetaildatastore.getCount());
//'var_name','stk_var_code','stk_wt','var_unit', 'var_size1', 'var_size2', 'var_desc','var_gsm'
                            txtvariety.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_desc'));
                            txtsizename.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_name'));
                            txtgsm.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_gsm'));
                            txtsize1.setRawValue(loadreelnodetaildatastore.getAt(0).get('var_size2'));
                            itemcode = loadreelnodetaildatastore.getAt(0).get('stk_var_code');
                            varcode = loadreelnodetaildatastore.getAt(0).get('var_grpcode');
                            fincode = loadreelnodetaildatastore.getAt(0).get('stk_finyear');
                            cmbLocation.setRawValue(loadreelnodetaildatastore.getAt(0).get('stk_location'));
                            txtRNo.setValue(cmbReelNo.getValue().substring(8) );

          		},    
                }); 
    
	}
	}
});

var txtvariety = new Ext.form.TextField({
	fieldLabel  : 'Variety',
	id          : 'txtvariety',
	name        : 'txtvariety',
	width       :  270,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",    
        readOnly   : true, 	
	tabindex : 1,

});


var txtgsm = new Ext.form.TextField({
	fieldLabel  : 'GSM',
	id          : 'txtgsm',
	name        : 'txtgsm',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
        readOnly   : true,
	tabindex : 1,

});

var txtsizename = new Ext.form.TextField({
	fieldLabel  : 'Size',
	id          : 'txtsizename',
	name        : 'txtsizename',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
        readOnly   : true,
	tabindex : 1,

});

   
var txtsize1 = new Ext.form.TextField({
	fieldLabel  : '',
	id          : 'txtsize1',
	name        : 'txtsize1',
	width       :  90,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,
});

var txtmano = new Ext.form.TextField({
	fieldLabel  : 'MA No',
	id          : 'txtmano',
	name        : 'txtmano',
	width       :  140,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,
});   

var txtSONO = new Ext.form.TextField({
	fieldLabel  : 'SO No',
	id          : 'txtSONO',
	name        : 'txtSONO',
	width       :  100,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        readOnly   : true,

});  

var txtRNo = new Ext.form.NumberField({
	fieldLabel  : 'Reel No',
	id          : 'txtRNo',
	name        : 'txtRNo',
	width       :  50,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
        labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      : "border-radius:5px;",     	
	tabindex : 1,
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'2'},
        enableKeyEvents: true,
        listeners:{
           keyup:function(){
                yymm = txtProdMonth.getRawValue();
                yy   = yymm.substring(0,2);   
		mm   = yymm.substring(2,4);  
                rno  = cmbReelNo.getRawValue().substring(8);

                rno2 = "0"+txtRNo.getValue();
         //       rno2 = rno2.substring(0,2);   
                rno2 = rno2.slice(-2);  

                
                rollno2 = "00"+txtNewRollNo.getValue();
                rollno2 = rollno2.slice(-3);  
          
                txtNewReelNo.setValue(yymm+"0"+ rollno2 +rno2);
 
          
//                txtNewReelNo.setValue(yymm+"0"+ txtNewRollNo.getValue()+rno2);
              
         
           }
        } 


});






function loadRollDetails()
{
	loadRollNoDatastore.removeAll();
	loadRollNoDatastore.load({
	 url: 'ClsTrnReelLocation.php',
		params: {
	    	   task: 'loadRollNo',
		   compcode : Gincompcode,
		   finid    : GinFinid,   
	           mon      : mm, //Ext.util.Format.date(dtProdDate.getValue(),"n"),   
                   yr       : yy, //Ext.util.Format.date(dtProdDate.getValue(),"Y"),     
		 },
		 callback:function()
		   {

		   } 
	  });
             
}
function RefreshData(){

	cmbReelNo.setRawValue('');
	txtvariety.setRawValue('');
	txtsizename.setRawValue('');
	txtsize1.setRawValue('');
    
}
       
function save_click()
{

//alert(cmbReelNo.getValue());

                    gstSave="true";
                    if ( Number(cmbReelNo.getValue())  == 0  ) 
                    {
                        Ext.Msg.alert('Sales ', 'Select Reel Number ..');
                        gstSave="false";
                    } 
                    else if( cmbLocation.getRawValue()  == ''  ) 
                    {
                        Ext.Msg.alert('Sales ', 'Select Location ..');
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

                            Ext.Ajax.request({
                            url: 'TrnReelLocationSave.php',
                            params :
                             {

//comp_code, fin_code, ent_no, ent_date, itemcode, srno, oldweight, newweight, cancelflag

				compcode : Gincompcode,
				fincode  : GinFinid,
				reelno   : cmbReelNo.getRawValue(),
                                location : cmbLocation.getRawValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Reel Location Changed -" + obj['entno']);
//                                    TrnSalesReelWeightChangeFormpanel.getForm().reset();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("location Not changed! Pls Check!- " + obj['entno']);                                                  
                                    }
                                }
                           });         
   
                          	}
     				}
                            }
                        });
                    }

}              

 
var TrnSalesReelWeightChangeFormpanel = new Ext.FormPanel({
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
        id          : 'TrnSalesReelWeightChangeFormpanel',
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
				TrnSalesReelWeightChangeFormpanel.getForm().reset();
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
//SAVE
	            text: 'Save',
	            id: 'save',
	            style  : 'text-align:center;',
	            tooltip: 'View Details...', height: 40, fontSize:30,width:70,
	            icon: '/Pictures/save.png',
	             //fp.getForm().reset();
	            listeners:{
	                click: function () {
                              var gstSave;
                              save_click();





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
				TrnSalesReelWeightChange.hide();
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
		        height  : 500,
		        width   : 1250,
			style:{ border:'1px solid red',color:' #581845 '},
		        layout  : 'absolute',
		        x       : 20,
		        y       : 10,
		        items:[ 




    			{ 
            		xtype       : 'fieldset',
			title       : '',
			labelWidth  : 130,
			width       : 300,
			x           : 10,
			y           : 40,
			border      : false,
			items: [txtProdMonth]
			},

	
    			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:380,
	    		x	:10,
	    		y	:80,
	    		border	:false,
	    		items:[cmbRollNo]
	    		},



			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 130,
				border      : false,
				items: [cmbReelNo]
			},
		        { 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 400,
				x           : 10,
				y           : 180,
				border      : false,
				items: [txtvariety]
		        },

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 300,
				x           : 10,
				y           : 280,
				border      : false,
				items: [cmbLocation]
			},
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 100,
				width       : 270,
				x           : 10,
				y           : 120,
				border      : false,
				items: [txtgsm]
			},
*/

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 270,
				x           : 10,
				y           : 230,
				border      : false,
				items: [txtsizename]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 290,
				y           : 230,
				border      : false,
				items: [txtsize1]
			},
 			
                 ],
             },  


        
          ],
                 
    });



    

   
    var TrnSalesReelWeightChange = new Ext.Window({
	height      : 600,
        width       : 1300,
        x	     : 30,
        y           : 30,
        title       : 'REEL Location Etnry',
        items       : TrnSalesReelWeightChangeFormpanel,
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
			loadreelnodatastore.removeAll();
			loadreelnodatastore.load({
			 url: 'ClsReelWeight.php',
				params: {
			    	   task: 'loadReelNoList',
				   compcode : Gincompcode,
				   finid    : GinFinid,
				   rollno   : cmbRollNo.getValue(),
				   mon      : mm,    
				   yr       : yy , 

			      
				 },
 			 });



                RefreshData();
//                alert("Hai");
//                alert(Gincompcode);

     		/*loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnReelLocation.php',
			params: {
		          task: 'loadentryno',
			  compcode : Gincompcode,
			  finid    : GinFinid,
			},
			callback : function(){

			alert(loadreelnodatastore.getCount());

		 	},    
                });   

     		loadreelnodatastore.removeAll();
		loadreelnodatastore.load({
			url: 'ClsTrnReelLocation.php',
			params: {
		          task: 'loadReelNoList',
			  compcode : Gincompcode,
			  finid    : GinFinid
			},
			callback : function(){

		      	//alert(loadreelnodatastore.getCount());

		 	},    
                });   
*/
		}
	}	
    });
    TrnSalesReelWeightChange.show();  
});
