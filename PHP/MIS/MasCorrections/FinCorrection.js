Ext.onReady(function(){
   Ext.QuickTips.init();
 var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var yymm = '';
   var mm = 0;
   var yy = 0;
var loadRollNoDatastore = new Ext.data.Store({
      id: '`',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFinStkCorrection.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRollNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'stk_rollno'
      ]),
    });
var loadReelNoDatastore = new Ext.data.Store({
      id: 'loadReelNoDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFinStkCorrection.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadReelNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'reelno'
      ]),
    })
function RefreshData()
{
 
}
var dtProdDate = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtProdDate',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
        listeners:{
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
           select: function(){
              datecheck();
           }
        }    

    });


  function datecheck()
  {
        var dt_today = new Date();
        var dt_invoice = dtProdDate.getValue();

                cmbRollNo.clearValue();
                cmbReelNo.clearValue();



//        var diffdays = (dt_today.getDate()-dt_invoice.getDate());
        var diffdays = dt_today.getTime()-dt_invoice.getTime();
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays <3)
        {

                loadRollNoDatastore.removeAll();
		loadRollNoDatastore.load({
		 url: 'ClsFinStkCorrection.php',
			params: {
		    	   task: 'loadRollNo',
			   compcode : Gincompcode,
			   finid    : GinFinid,   
		           rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
			 },
                     callback:function()
			   {

			   } 
		  });
        }
        if (diffdays >2)
        {     
             alert("You are Not Allowed to Modify in the date of " +  Ext.util.Format.date(dt_invoice,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to change in Future date");


        }

 }

  
   var cmbRollNo = new Ext.form.ComboBox({
        fieldLabel      : 'Roll No',
        width           : 90,
        displayField    : 'stk_rollno', 
        valueField      : 'stk_rollno',
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
style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	   
	listeners:{
		select: function()
		{

              loadReelNoDatastore.removeAll();
	        cmbReelNo.clearValue();
		loadReelNoDatastore.load({
		 url: 'ClsFinStkCorrection.php',
			params: {
		    	   task: 'loadReelNo',
			   compcode : Gincompcode,
			   finid    : GinFinid,   
  	          rdate    : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),   
            	

               rollno : cmbRollNo.getValue(),
  
                 
	}
	})
}
}
   });


 var cmbReelNo = new Ext.form.ComboBox({
        fieldLabel      : 'Reel No ',
        width           : 200,
        displayField    : 'reelno', 
        valueField      : 'reelno',
        hiddenName      : '',
        id              : 'cmbReelNo',
        typeAhead       : true,
        mode            : 'local',
      store           : loadReelNoDatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        style : "font-size:14px;font-weight:bold;color:#f54242",
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        enableKeyEvents: true,
        listeners:{

		

		
}

          }); 	
var btnDelete = new Ext.Button({
border: 1,
style: {

    borderColor: 'blue',
    borderStyle: 'solid',
},
    text    : "DELETE",
    width   : 80,
    height  : 30,
    x       : 70,
    y       : 200,    
  
   tabindex : 1,
   listeners:{
       click: function(){ 

		      Ext.Ajax.request({
		      url: 'ReelDelete_in_Stock.php',
		      params :
		      {
                         	compcode  : Gincompcode,
	        		fincode   : GinFinid,
		                rollno    : cmbRollNo.getValue(),
		         	reelno    : cmbReelNo.getValue(),
                                proddate  : Ext.util.Format.date(dtProdDate.getValue(),"Y-m-d"),  

		      },
		      callback: function(options, success, response)
		      {
		         Ext.MessageBox.alert("Reel No. Deleted.."); 
                         FinSTKCorrectionPanel.getForm().reset();
                         RefreshData();

		      }
                      }); 

}
}
});
var btnExit = new Ext.Button({
border: 1,
style: {

    borderColor: 'blue',
    borderStyle: 'solid',
},
    text    : "EXIT",
    width   : 80,
    height  : 30,
    x       : 200,
    y       : 200,    
  
   tabindex : 1,
   listeners:{
       click: function(){ 
         FinSTKCorrectionWindow.hide();  
}
}
});

   var FinSTKCorrectionPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 500,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'FinSTKCorrectionPanel',
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
            fontSize:25,
            items: [
		   
		  

                   {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                      
		            
                    
            },'-',
               {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                   
                },'-',

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    
        },]
},
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 300,
                width   : 500,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 10,	
                items:[
                     {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 0,
                            y           : 0,
                            labelWidth  : 70,
                            border      : false,
                            items : [dtProdDate]
   
                   },
                      {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:70,
	    		width	:350,
	    		x	:0,
	    		y	:60,
	    		border	:false,
	    		items:[cmbRollNo]
	    		},
			{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:70,
	    		width	:350,
	    		x	:0,
	    		y	:120,
	    		border	:false,
	    		items:[cmbReelNo]
	    		},btnDelete,btnExit,
]
}
]
});
var FinSTKCorrectionWindow = new Ext.Window({
	height      : 400,
        width       : 600,
        y           : 50,
      //  title       :'',
        items       : 'FinSTKCorrectionPanel',
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
             
             FinSTKCorrectionWindow.show();  
        });      
   
