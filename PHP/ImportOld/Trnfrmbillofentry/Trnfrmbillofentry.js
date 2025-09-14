Ext.onReady(function(){
   Ext.QuickTips.init();
  // var GinCompcode = localStorage.getItem('stcompcode');
//   var GinFinid = localStorage.getItem('tfinid');
 var GinCompcode = 1;
 var GinFinid = 27;
//-----------Detail---------------
var txtdcno  = new Ext.form.TextField({
        name        : 'txtdcno',
        id          : 'txtdcno',
        fieldLabel  : 'DC No',
	width	    :  70,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    }); 

var dtdcdate = new Ext.form.DateField({
        fieldLabel : 'DC Date',
        id         : 'dtdcdate',
        name       : 'dtdcdate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var cmbinvoiceno = new Ext.form.ComboBox({
        fieldLabel      : 'Invoice No',
        width           : 200,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbinvoiceno',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });



var dtpinvoicedate = new Ext.form.DateField({
        fieldLabel : 'Invoice Date',
        id         : 'dtpinvoicedate',
        name       : 'dtpinvoicedate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var txtpartyname = new Ext.form.TextField({
        fieldLabel  : 'Party Name',
        name        : 'txtpartyname',
        id          : 'txtpartyname',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });

var txtvesselname  = new Ext.form.TextField({
        name        : 'txtvesselname',
        id          : 'txtvesselname',
        fieldLabel  : 'Vessel Name',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var txtshipmentport = new Ext.form.TextField({
        fieldLabel      : 'Shipment Port',
 	name        : 'txtshipmentport',
        id          : 'txtshipmentport',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });


var txtarrivalport = new Ext.form.TextField({
        fieldLabel      : 'Arrival Port',
        name        : 'txtarrivalport',
        id          : 'txtarrivalport',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });

var txtbankrefno  = new Ext.form.TextField({
        name        : 'txtbankrefno',
        id          : 'txtbankrefno',
        fieldLabel  : 'Bank Ref No',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
var txtpartybank = new Ext.form.TextField({
        fieldLabel      : 'Party Bank',
        name        : 'txtpartybank',
        id          : 'txtpartybank',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });


var txtlcbank = new Ext.form.TextField({
        fieldLabel      : 'LC Bank',
     	name        : 'txtlcbank',
        id          : 'txtlcbank',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });

var txtexchangerate  = new Ext.form.TextField({
        name        : 'txtexchangerate',
        id          : 'txtexchangerate',
        fieldLabel  : 'Exchange Rate',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var txtboeexchangerate  = new Ext.form.TextField({
        name        : 'txtboeexchangerate',
        id          : 'txtboeexchangerate',
        fieldLabel  : 'BOE Exchange Rate',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var txtcnfagent = new Ext.form.TextField({
        fieldLabel      : 'CNF Agent',
      	name        : 'txtcnfagent',
        id          : 'txtcnfagent',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });


var txtlinearagent = new Ext.form.TextField({
        fieldLabel      : 'Linear Agent',
        name        : 'txtlinearagent',
        id          : 'txtlinearagent',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });


var txtpono = new Ext.form.TextField({
        fieldLabel      : 'PO No',
      	name        : 'txtpono',
        id          : 'txtpono',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });

var dtppodate = new Ext.form.DateField({
        fieldLabel : 'Po Date',
        id         : 'dtppodate',
        name       : 'dtppodate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var txtlcno = new Ext.form.TextField({
        fieldLabel      : 'LC No',
    	name        : 'txtlcno',
        id          : 'txtlcno',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
   });


var dtplcdate = new Ext.form.DateField({
        fieldLabel : 'LC Date',
        id         : 'dtplcdate',
        name       : 'dtplcdate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var txtpaymentterms  = new Ext.form.TextField({
        name        : 'txtpaymentterms',
        id          : 'txtpaymentterms',
        fieldLabel  : 'Payment Terms',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var txtcreditdays  = new Ext.form.TextField({
        name        : 'txtcreditdays',
        id          : 'txtcreditdays',
        fieldLabel  : 'Credit Days',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });



var dtpdocumentcleareddate = new Ext.form.DateField({
        fieldLabel : 'Document Cleared Date',
        id         : 'dtpdocumentcleareddate',
        name       : 'dtpdocumentcleareddate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });


var dtpshipmentdate = new Ext.form.DateField({
        fieldLabel : 'Shipment Date',
        id         : 'dtpshipmentdate',
        name       : 'dtpshipmentdate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });





var txtbillofladingno  = new Ext.form.TextField({
        name        : 'txtbillofladingno',
        id          : 'txtbillofladingno',
        fieldLabel  : 'Bill of Lading No',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var dtpbilloflandingdate = new Ext.form.DateField({
        fieldLabel : 'Bill of Date',
        id         : 'dtpbilloflandingdate',
        name       : 'dtpbilloflandingdate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });




var txtinvoiceamountus  = new Ext.form.TextField({
        name        : 'txtinvoiceamountus',
        id          : 'txtinvoiceamountus',
        fieldLabel  : 'Invoice Amount US $',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var txtinvoiceamountinr  = new Ext.form.TextField({
        name        : 'txtinvoiceamountinr',
        id          : 'txtinvoiceamountinr',
        fieldLabel  : 'Invoice Amount INR',
	width	    :  200,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var txtbillofentryno  = new Ext.form.TextField({
        name        : 'txtbillofentryno',
        id          : 'txtbillofentryno',
        fieldLabel  : 'Bill of Entry No',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var dtpexpectedarrivaldate = new Ext.form.DateField({
        fieldLabel : 'Expected Arrival Date',
        id         : 'dtpexpectedarrivaldate',
        name       : 'dtpexpectedarrivaldate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var dtpbillofentrydate = new Ext.form.DateField({
        fieldLabel : 'Bill od Entry Date',
        id         : 'dtpbillofentrydate',
        name       : 'dtpbillofentrydate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var dtpcargoarrivaldate = new Ext.form.DateField({
        fieldLabel : 'Cargo Arrival Date',
        id         : 'dtpcargoarrivaldate',
        name       : 'dtpcargoarrivaldate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });


var txtinvqty  = new Ext.form.TextField({
        name        : 'txtinvqty',
        id          : 'txtinvqty',
        fieldLabel  : 'Inv Qty',
	width	    :  60,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
var txtrate  = new Ext.form.TextField({
        name        : 'txtrate',
        id          : 'txtrate',
        fieldLabel  : 'Rate',
	width	    :  60,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
//----------DUTY DETAILS----------

var dutytype = "1";
var optdutytype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Duty Type',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:55,
    x:0,
    y:0,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid blue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optdutytype',
        items: [
            {boxLabel: 'Direct Duty', name: 'optdutytype', id:'optdutytypedirecduty', inputValue: '1', //checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		dutytype = "1";
            
               }
              }
             }
            },
            {boxLabel: 'DEPB Used', name: 'optdutytype', id:'optdutytypedeptuse', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		dutytype = "2";
            
               }
              }
             }},
        ]
    }
    ]
});  
var dutypaidby = "1";
var optdutypaidby = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: 'Duty Paid by',
    fieldLabel: '',
    layout : 'hbox',
    width:120,
    height:55,
    x:0,
    y:60,
    border: true,
    labelStyle : "font-size:12px;font-weight:bold;",
    style      : "border:0.25px solid blue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optdutypaidby',
        items: [
            {boxLabel: 'Mill', name: 'optdutypaidby', id:'optdutypaidbymill', inputValue: '1', //checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		dutypaidby = "1";
            
               }
              }
             }
            },
            {boxLabel: 'Agent', name: 'optdutypaidby', id:'optdutypaidbyagent', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		dutypaidby = "2";
            
               }
              }
             }},
        ]
    }
    ]
});  

var lblrateboe = new Ext.form.Label({
	fieldLabel  : 'Rate in BOE',
	id          : 'lblrateboe',
	name        : 'lblrateboe',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtrateboe  = new Ext.form.TextField({
        name        : 'txtrateboe',
        id          : 'txtrateboe',
        fieldLabel  : '',
	width	    :  60,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var cmbagent = new Ext.form.ComboBox({
        fieldLabel      : 'Select Agent Name',
        width           : 270,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbagent',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        labelStyle 	 : "font-size:10px;font-weight:bold;",
    	style      	 : "border-radius:5px;", 
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   });
   
var cmbdepblics = new Ext.form.ComboBox({
        fieldLabel      : 'DEPB Licence',
        width           : 250,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbdepblics',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        labelStyle 	 : "font-size:10px;font-weight:bold;",
    	style      	 : "border-radius:5px;", 
        allowblank      : false,
	listeners:{
        select:function()
			{
				
				
			}
		}
   }); 
   
var txtbalvalue  = new Ext.form.TextField({
        name        : 'txtbalvalue',
        id          : 'txtbalvalue',
        fieldLabel  : 'DEPB Balance Value',
	width	    :  160,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     

var txtadjustvalue  = new Ext.form.TextField({
        name        : 'txtadjustvalue',
        id          : 'txtadjustvalue',
        fieldLabel  : 'DEPB Adjusted Value',
	width	    :  160,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var btnAdd = new Ext.Button({
       style   : 'text-align:center;',
        text    : "Add",
        width   : 70,
	height  : 50,
        x       : 300,
        y       : 40,  listeners:{

            click: function(){
                 
            }
          }
   });  
   
var dgrecord = Ext.data.Record.create([]);
var flxDEPBdetail = new Ext.grid.EditorGridPanel({
        frame: false,
	store: [''], //itemdetaildatastore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 100,
        width: 430,
        x: 0,
        y: 110,
        columns: [
            {header: "DEPB No", dataIndex: 'depbno',sortable:true,width:120,align:'left'},
            {header: "Balanced Value", dataIndex: 'balancedvalue',sortable:true,width:150,align:'left'},
            {header: "Adjusted Value", dataIndex: 'adjustedvalue',sortable:true,width:150,align:'left'},
          
        ]
      
   });     

var txttotvalue  = new Ext.form.TextField({
        name        : 'txttotvalue',
        id          : 'txttotvalue',
        fieldLabel  : '',
	width	    :  80,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });


var txtlandingcostper  = new Ext.form.TextField({
        name        : 'txtlandingcostper',
        id          : 'txtlandingcostper',
        fieldLabel  : 'Landing Cost Percentage',
	width	    :  70,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var txtigstper  = new Ext.form.TextField({
        name        : 'txtigstper',
        id          : 'txtigstper',
        fieldLabel  : 'IGST %',
	width	    :  70,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txtinterestamt  = new Ext.form.TextField({
        name        : 'txtinterestamt',
        id          : 'txtinterestamt',
        fieldLabel  : 'Interest Amount',
	width	    :  70,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    }); 
                   
var txtlandcost  = new Ext.form.TextField({
        name        : 'txtlandcost',
        id          : 'txtlandcost',
        fieldLabel  : 'Landing Cost',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });   
    
var txtigstamt  = new Ext.form.TextField({
        name        : 'txtigstamt',
        id          : 'txtigstamt',
        fieldLabel  : 'IGST Amount',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     

var txttotinvamt  = new Ext.form.TextField({
        name        : 'txttotinvamt',
        id          : 'txttotinvamt',
        fieldLabel  : 'Total Invoice Amount',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var txtbasicduper  = new Ext.form.TextField({
        name        : 'txtbasicduper',
        id          : 'txtbasicduper',
        fieldLabel  : 'Basic Duty Percentage',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txtspecduper  = new Ext.form.TextField({
        name        : 'txtspecduper',
        id          : 'txtspecduper',
        fieldLabel  : 'Special Duty Percentage',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    

var txteducessper  = new Ext.form.TextField({
        name        : 'txteducessper',
        id          : 'txteducessper',
        fieldLabel  : 'Edu Cess Percentage',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txtcvdper  = new Ext.form.TextField({
        name        : 'txtcvdper',
        id          : 'txtcvdper',
        fieldLabel  : 'CVD Percentage',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    

var txteducesspercvd  = new Ext.form.TextField({
        name        : 'txteducesspercvd',
        id          : 'txteducesspercvd',
        fieldLabel  : 'Edu Cess % on CVD',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    
    
var txtcvdvalue1  = new Ext.form.TextField({
        name        : 'txtcvdvalue1',
        id          : 'txtcvdvalue1',
        fieldLabel  : 'CVD Value',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });   
    
var txtcvdvalue2  = new Ext.form.TextField({
        name        : 'txtcvdvalue2',
        id          : 'txtcvdvalue2',
        fieldLabel  : '',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });      
    
    
var txteducessvalue1  = new Ext.form.TextField({
        name        : 'txteducessvalue1',
        id          : 'txteducessvalue1',
        fieldLabel  : 'Edu.Cess',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    
    
var txteducessvalue2  = new Ext.form.TextField({
        name        : 'txteducessvalue2',
        id          : 'txteducessvalue2',
        fieldLabel  : '',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    
    
    
var txttotduty  = new Ext.form.TextField({
        name        : 'txttotduty',
        id          : 'txttotduty',
        fieldLabel  : 'Total Duty',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     
    
var txtspduty  = new Ext.form.TextField({
        name        : 'txtspduty',
        id          : 'txtspduty',
        fieldLabel  : 'SP Duty',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     
    
var txtnetduty  = new Ext.form.TextField({
        name        : 'txtnetduty',
        id          : 'txtnetduty',
        fieldLabel  : 'Net Duty',
	width	    :  100,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    
//----------CNF Details-------------


var cmbhandparty = new Ext.form.ComboBox({
        fieldLabel      : 'Handling Party',
        width           : 250,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbhandparty',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
    	labelStyle 	 : "font-size:10px;font-weight:bold;",
    	style      	 : "border-radius:5px;",        
	listeners:{
        select:function()
			{
		}
	}
   });
   
var txtbilno  = new Ext.form.TextField({
        name        : 'txtbilno',
        id          : 'txtbilno',
        fieldLabel  : 'Bill Number',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var dtbilldate = new Ext.form.DateField({
        fieldLabel : 'Bill Date',
        id         : 'dtbilldate',
        name       : 'dtbilldate',
        format     : 'd-m-Y',
        value      : new Date(),
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	disabled    : false,
        anchor     : '100%' 
   });

var lblcfs = new Ext.form.Label({
	fieldLabel  : 'CFS',
	id          : 'lblcfs',
	name        : 'lblcfs',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtcfs  = new Ext.form.TextField({
        name        : 'txtcfs',
        id          : 'txtcfs',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var lblliner = new Ext.form.Label({
	fieldLabel  : 'Liner',
	id          : 'lblliner',
	name        : 'lblliner',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtliner  = new Ext.form.TextField({
        name        : 'txtliner',
        id          : 'txtliner',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });

var lblcha = new Ext.form.Label({
	fieldLabel  : 'CHA',
	id          : 'lblcha',
	name        : 'lblcha',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtcha  = new Ext.form.TextField({
        name        : 'txtcha',
        id          : 'txtcha',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var lbldemrage = new Ext.form.Label({
	fieldLabel  : 'Demurrage',
	id          : 'lbldemrage',
	name        : 'lbldemrage',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtdemrage  = new Ext.form.TextField({
        name        : 'txtdemrage',
        id          : 'txtdemrage',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });        

var lblsercharge = new Ext.form.Label({
	fieldLabel  : 'Service Charges',
	id          : 'lblsercharge',
	name        : 'lblsercharge',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtsercharge  = new Ext.form.TextField({
        name        : 'txtsercharge',
        id          : 'txtsercharge',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });   

var lblothers = new Ext.form.Label({
	fieldLabel  : 'Others',
	id          : 'lblothers',
	name        : 'lblothers',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtothers  = new Ext.form.TextField({
        name        : 'txtothers',
        id          : 'txtothers',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var lblvalue = new Ext.form.Label({
	fieldLabel  : 'Value',
	id          : 'lblvalue',
	name        : 'lblvalue',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});   

var txtvalue  = new Ext.form.TextField({
        name        : 'txtvalue',
        id          : 'txtvalue',
        fieldLabel  : '',
	width	    :  90,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
        
/*var lblcgst = new Ext.form.Label({
	fieldLabel  : 'CGST %',
	id          : 'lblcgst',
	name        : 'lblcgst',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
}); */  

var txtcgst  = new Ext.form.TextField({
        name        : 'txtcgst',
        id          : 'txtcgst',
        fieldLabel  : 'CGST %',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     
    
/*var lblsgst = new Ext.form.Label({
	fieldLabel  : 'SGST %',
	id          : 'lblsgst',
	name        : 'lblsgst',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
}); */  

var txtsgst  = new Ext.form.TextField({
        name        : 'txtsgst',
        id          : 'txtsgst',
        fieldLabel  : 'SGST %',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });          
 
/*var lbligst = new Ext.form.Label({
	fieldLabel  : 'IGST %',
	id          : 'lbligst',
	name        : 'lbligst',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});*/   

var txtigst  = new Ext.form.TextField({
        name        : 'txtigst',
        id          : 'txtigst',
        fieldLabel  : 'IGST %',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    }); 

/*var lblfreight = new Ext.form.Label({
	fieldLabel  : 'Freight',
	id          : 'lblfreight',
	name        : 'lblfreight',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,
});*/   

var txtfreight  = new Ext.form.TextField({
        name        : 'txtfreight',
        id          : 'txtfreight',
        fieldLabel  : 'Freight',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });    

var txtcgstamt  = new Ext.form.TextField({
        name        : 'txtcgstamt',
        id          : 'txtcgstamt',
        fieldLabel  : 'CGST Amount',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });   
    
var txtsgstamt  = new Ext.form.TextField({
        name        : 'txtsgstamt',
        id          : 'txtsgstamt',
        fieldLabel  : 'SGST Amount',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });     

var txtigstcustduty  = new Ext.form.TextField({
        name        : 'txtigstcustduty',
        id          : 'txtigstcustduty',
        fieldLabel  : 'IGST/Custom Duty',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txtbillamt  = new Ext.form.TextField({
        name        : 'txtbillamt',
        id          : 'txtbillamt',
        fieldLabel  : 'Bill Amount',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var linerchrg = "1";
var optlinerchrg = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:130,
    height:40,
    x:0,
    y:-5,
    border: false,
     id: 'optlinerchrg',
    labelStyle : "font-size:12px;font-weight:bold;",
    //style      : "border:0.25px solid blue;border-radius:5px;",
    //style:{ border:'1px solid red',color:' #581845 '},
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
       
        items: [
            {boxLabel: 'CHA', name: 'optlinerchrg', id:'optlinerchrgcha', inputValue: '1', //checked:'true',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		linerchrg = "1";
            
               }
              }
             }
            },
            {boxLabel: 'MILL', name: 'optlinerchrg', id:'optlinerchrgmill', inputValue: '2',
            listeners:{
            check:function(rb,checked){
            if(checked==true){
            		linerchrg = "2";
            
               }
              }
             }},
        ]
    }
    ]
});        
 
var cmbcha = new Ext.form.ComboBox({
        fieldLabel      : 'CHA',
        width           : 250,
        displayField    : '',
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbcha',
        typeAhead       : true,
        mode            : 'local',
       // store           : ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
        allowblank      : false,
    	labelStyle 	 : "font-size:10px;font-weight:bold;",
    	style      	 : "border-radius:5px;",        
	listeners:{
        select:function()
			{
		}
	}
   }); 
   
var btncnfAdd = new Ext.Button({
       style   : 'text-align:center;',
        text    : "Add",
        width   : 70,
	height  : 50,
        x       : 570,
        y       : 130,  
        listeners:{

            click: function(){
                 
            }
          }
   });
   
var txtcnftotvalue  = new Ext.form.TextField({
        name        : 'txtcnftotvalue',
        id          : 'txtcnftotvalue',
        fieldLabel  : 'Total Value',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txttotcgstamt  = new Ext.form.TextField({
        name        : 'txttotcgstamt',
        id          : 'txttotcgstamt',
        fieldLabel  : 'CGST Amount',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txttotsgstamt  = new Ext.form.TextField({
        name        : 'txttotsgstamt',
        id          : 'txttotsgstamt',
        fieldLabel  : 'SGST Amount',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txttotigstcudtduty  = new Ext.form.TextField({
        name        : 'txttotigstcudtduty',
        id          : 'txttotigstcudtduty',
        fieldLabel  : 'IGST/Custom Duty',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txttotfreight  = new Ext.form.TextField({
        name        : 'txttotfreight',
        id          : 'txttotfreight',
        fieldLabel  : 'Freight',
	width	    :  65,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });
    
var txttotbillamt  = new Ext.form.TextField({
        name        : 'txttotbillamt',
        id          : 'txttotbillamt',
        fieldLabel  : 'Total Bill Amount',
	width	    :  80,
	height      :  20,
	readOnly    : false,
    	labelStyle : "font-size:10px;font-weight:bold;",
    	style      : "border-radius:5px;",   
	hidden	    : false,
	disabled    : false
    });                       
      

var dgrecord = Ext.data.Record.create([]);
var flxcnfdetail = new Ext.grid.EditorGridPanel({
        frame: false,
	store: [''], //itemdetaildatastore,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 850,
        x: 10,
        y: 270,
        columns: [
            {header: "Party", dataIndex: 'party',sortable:true,width:120,align:'left'},
            {header: "Bill No", dataIndex: 'bill_no',sortable:true,width:80,align:'left'},
            {header: "Bill Date", dataIndex: 'bill_dt',sortable:true,width:90,align:'left'},
            {header: "CFS", dataIndex: 'cfs',sortable:true,width:50,align:'left'},
            {header: "Liner", dataIndex: 'liner',sortable:true,width:50,align:'left'},
            {header: "CHA", dataIndex: 'cha',sortable:true,width:70,align:'left'},
            {header: "Demurrage", dataIndex: 'demurrage',sortable:true,width:80,align:'left'},
            {header: "Service", dataIndex: 'service',sortable:true,width:60,align:'left'},
            {header: "Others", dataIndex: 'others',sortable:true,width:60,align:'left'},
            {header: "CGST %", dataIndex: 'cgst_per',sortable:true,width:60,align:'left'},
            {header: "SGST %", dataIndex: 'sgst_per',sortable:true,width:60,align:'left'},
            {header: "IGST %", dataIndex: 'igst_per',sortable:true,width:50,align:'left'},
            {header: "CGST Amt", dataIndex: 'cgst_amt',sortable:true,width:70,align:'left'},
            {header: "SGST Amt", dataIndex: 'sgst_amt',sortable:true,width:70,align:'left'},
            {header: "IGST Amt", dataIndex: 'igst_amt',sortable:true,width:70,align:'left'},
            {header: "Bill Amt", dataIndex: 'bill_amt',sortable:true,width:70,align:'left'},
            {header: "Liner By", dataIndex: 'liner_by',sortable:true,width:80,align:'left'},
            {header: "CHA", dataIndex: 'cha_by',sortable:true,width:80,align:'left'},
            {header: "CHA Code", dataIndex: 'cha_code',sortable:true,width:70,align:'left'},
            {header: "Freight Amt", dataIndex: 'frt_amt',sortable:true,width:70,align:'left'}, 
                                                                                           
        ]
      
   });
                
   var Trnbillofentryformpannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'Bill of Entry',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'Trnbillofentryformpannel',
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
                    text: 'New',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Add Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            
                        }
                    }
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
				
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
                    tooltip: 'Close...', 
                    height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            TrnbillofentryWindoe.hide();
                        }
                    }
                }
                ]
        },
        items: [   

					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 45,
						width       : 160,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtdcno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 45,
						width       : 160,
						x           : 0,
						y           : 40,
						defaultType : 'textfield',
						border:false,
						items: [dtdcdate]
					},                	
		{
		    xtype: 'tabpanel',
		    activeTab: 0,
		    height: 540,
		    width: 875,
		    x: 150,
		    y: 0,
		    items: [
			{
				xtype: 'panel',
				title: 'Details',
				width: 300,
				height: 390,
				layout: 'absolute',
				items: [
				{
					 xtype  	: 'fieldset',
					title		: '',
					layout 	: 'hbox',
					border		: true,
					labelStyle 	: "font-size:12px;font-weight:bold;",
			   		style      	: "border:0.25px solid skyblue;border-radius:5px;",              
					height		: 500,
					width		: 700,
					layout 	: 'absolute',
					x		: 80,
					y		: 5,
				     	items:[

					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [cmbinvoiceno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [dtpinvoicedate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtpartyname]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [txtvesselname]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtshipmentport]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtshipmentport]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [txtarrivalport]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 180,
						defaultType : 'textfield',
						border      : false,
						items: [txtbankrefno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 210,
						defaultType : 'textfield',
						border      : false,
						items: [txtpartybank]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 240,
						defaultType : 'textfield',
						border      : false,
						items: [txtlcbank]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 270,
						defaultType : 'textfield',
						border      : false,
						items: [txtexchangerate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 300,
						defaultType : 'textfield',
						border      : false,
						items: [txtboeexchangerate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 330,
						defaultType : 'textfield',
						border      : false,
						items: [txtcnfagent]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : 360,
						defaultType : 'textfield',
						border      : false,
						items: [txtlinearagent]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 0,
						defaultType : 'textfield',
						border      : false,
						items: [txtpono]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 335,
						y           : 30,
						defaultType : 'textfield',
						border      : false,
						items: [dtppodate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 60,
						defaultType : 'textfield',
						border      : false,
						items: [txtlcno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 335,
						y           : 90,
						defaultType : 'textfield',
						border      : false,
						items: [dtplcdate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 120,
						defaultType : 'textfield',
						border      : false,
						items: [txtpaymentterms]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 150,
						defaultType : 'textfield',
						border      : false,
						items: [txtcreditdays]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 335,
						y           : 180,
						defaultType : 'textfield',
						border      : false,
						items: [dtpdocumentcleareddate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 335,
						y           : 210,
						defaultType : 'textfield',
						border      : false,
						items: [dtpshipmentdate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 240,
						defaultType : 'textfield',
						border      : false,
						items: [txtbillofladingno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 335,
						x           : 335,
						y           : 270,
						defaultType : 'textfield',
						border      : false,
						items: [dtpbilloflandingdate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 300,
						defaultType : 'textfield',
						border      : false,
						items: [txtinvoiceamountus]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 335,
						y           : 330,
						defaultType : 'textfield',
						border      : false,
						items: [txtinvoiceamountinr]
					},
			{ 
				xtype       : 'fieldset',
				title       : '',
				layout  : 'absolute',
				labelWidth  : 110,
				width       : 500,
				height	    :80,
				x           : 10,
				y           : 395,
				defaultType : 'textfield',
				labelStyle 	: "font-size:12px;font-weight:bold;",
			   	style      	: "border:0.25px solid lightgreen;border-radius:5px;", 
				border      : true,
				items: [
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 400,
						x           : 0,
						y           : 0,

						defaultType : 'textfield',
						border      : false,
						items: [txtbillofentryno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 220,
						x           : 0,
						y           : 25,
						defaultType : 'textfield',
						border:false,
						items: [dtpexpectedarrivaldate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 120,
						width       : 250,
						x           : 210,
						y           : 0,
						defaultType : 'textfield',
						border:false,
						items: [dtpbillofentrydate]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 120,
						width       : 250,
						x           : 210,
						y           : 25,
						defaultType : 'textfield',
						border:false,
						items: [dtpcargoarrivaldate]
					}]
					},
			{ 
				xtype       : 'fieldset',
				title       : '',
				layout  : 'absolute',
				labelWidth  : 110,
				width       : 150,
				height	    :80,
				x           : 510,
				y           : 395,
				defaultType : 'textfield',
				labelStyle 	: "font-size:12px;font-weight:bold;",
			   	style      	: "border:0.25px solid lightblue;border-radius:5px;", 				
				border      : true,
				items: [
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 180,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border:false,
						items: [txtinvqty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 180,
						x           : 0,
						y           : 25,
						defaultType : 'textfield',
						border:false,
						items: [txtrate]
					}
					]
				},
			     ]
	     		   },						
			]
			
		},
			{
				xtype: 'panel',
				title: 'Duty Details',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [
					optdutytype,optdutypaidby,
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 85,
						x           : 120,
						y           : 45,
						border      : false,
						items	    : [lblrateboe]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 2,
						width       : 90,
						x           : 115,
						y           : 65,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtrateboe]
					},		                
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 100,
						width       : 400,
						x           : 200,
						y           : 5,
						border      : false,
						items	    : [cmbagent]
					},
				{
					 xtype  	: 'fieldset',
					title		: 'DEPB Details',
					layout 	: 'hbox',
					border		: true,
					labelStyle 	: "font-size:12px;font-weight:bold;",
			   		style      	: "border:0.25px solid skyblue;border-radius:5px;",              
					height		: 290,
					width		: 450,
					layout 	: 'absolute',
					x		: 200,
					y		: 55,
				     	items:[
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 400,
						x           : 0,
						y           : -5,
						border      : false,
						items	    : [cmbdepblics]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 300,
						x           : 0,
						y           : 30,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtbalvalue]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 300,
						x           : 0,
						y           : 65,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtadjustvalue]
					},btnAdd,flxDEPBdetail,
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 110,
						x           : 330,
						y           : 220,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txttotvalue]
					},				     	
				  ]
				},
				{
					xtype  	: 'fieldset',
					title		: 'DUTY Details',
					layout 	: 'hbox',
					border		: true,
					labelStyle 	: "font-size:12px;font-weight:bold;",
			   		style      	: "border:0.25px solid lightgreen;border-radius:5px;",              
					height		: 130,
					width		: 645,
					layout 	: 'absolute',
					x		: 5,
					y		: 350,
				     	items:[
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 0,
						y           : 0,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtlandcost]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 0,
						y           : 50,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtigstamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 110,
						width       : 240,
						x           : 200,
						y           : 0,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotinvamt]
					},								     		
				 	]
				 },
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 100,
						width       : 200,
						x           : 0,
						y           : 120,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtlandingcostper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 100,
						width       : 200,
						x           : 0,
						y           : 160,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtigstper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 100,
						width       : 200,
						x           : 0,
						y           : 200,
						defaultType : 'textfield',
						border	    :false,
						items	    : [txtinterestamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 0,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtbasicduper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 40,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtspecduper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 80,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txteducessper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 120,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcvdper]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 160,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txteducesspercvd]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 200,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcvdvalue1]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 225,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcvdvalue2]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 260,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txteducessvalue1]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 285,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txteducessvalue2]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 325,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotduty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 365,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtspduty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 665,
						y           : 405,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtnetduty]
					},									
					
					]

			},
			{
				xtype: 'panel',
				title: 'CNF Details',
				width: 200,
				height: 360,
				layout: 'absolute',
				items: [						
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 370,
						x           : 30,
						y           : -5,
						border      : false,
						items	    : [cmbhandparty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 60,
						width       : 180,
						x           : 420,
						y           : -5,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtbilno]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 200,
						x           : 650,
						y           : -5,
						defaultType : 'textfield',
						border	    :false,
						items: [dtbilldate]
					},
				{
					xtype  	: 'fieldset',
					title		: 'Handling Charges',
					layout 	: 'hbox',
					border		: true,
					labelStyle 	: "font-size:12px;font-weight:bold;",
			   		style      	: "border:0.25px solid lightgreen;border-radius:5px;",              
					height		: 220,
					width		: 850,
					layout 	: 'absolute',
					x		: 10,
					y		: 30,
				     	items:[
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 50,
						x           : 10,
						y           : -10,
						border      : false,
						items	    : [lblcfs]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : -10,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcfs]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 50,
						x           : 110,
						y           : -10,
						border      : false,
						items	    : [lblliner]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 95,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtliner]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 50,
						x           : 220,
						y           : -10,
						border      : false,
						items	    : [lblcha]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 205,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcha]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 80,
						x           : 325,
						y           : -10,
						border      : false,
						items	    : [lbldemrage]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 320,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtdemrage]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 105,
						x           : 440,
						y           : -10,
						border      : false,
						items	    : [lblsercharge]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 435,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtsercharge]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 60,
						x           : 575,
						y           : -10,
						border      : false,
						items	    : [lblothers]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 565,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtothers]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 60,
						x           : 705,
						y           : -10,
						border      : false,
						items	    : [lblvalue]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 1,
						width       : 120,
						x           : 695,
						y           : 20,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtvalue]
					},
					/*{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 50,
						x           : 605,
						y           : -10,
						border      : false,
						items	    : [lblcgst]
					},*/
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 145,
						x           : 45,
						y           : 50,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcgst]
					},
					/*{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 105,
						x           : 795,
						y           : -10,
						border      : false,
						items	    : [lblsgst]
					},*/
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 145,
						x           : 245,
						y           : 50,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtsgst]
					},
					/*{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 105,
						x           : 895,
						y           : -10,
						border      : false,
						items	    : [lbligst]
					},*/
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 145,
						x           : 460,
						y           : 50,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtigst]
					},
					/*{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 60,
						x           : 730,
						y           : -10,
						border      : false,
						items	    : [lblfreight]
					},*/
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 50,
						width       : 145,
						x           : 645,
						y           : 50,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtfreight]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 75,
						width       : 170,
						x           : 20,
						y           : 85,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcgstamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 80,
						width       : 175,
						x           : 215,
						y           : 85,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtsgstamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 100,
						width       : 195,
						x           : 410,
						y           : 85,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtigstcustduty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 70,
						width       : 165,
						x           : 625,
						y           : 85,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtbillamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : 'Liner Charges Paid By Debited CHA',
						width       : 500,
						x           : 50,
						y           : 120,
						height	    : 65,
						border	    : true,
						 layout      : 'absolute',
						style      : "border:0.25px solid blue;border-radius:5px;",
						items	    : [optlinerchrg,
								{
								    xtype       : 'fieldset',
								    title       : '',
								    width       : 310,
								    labelWidth  : 30,
								    x           : 130,
								    y           : -5,
								    border      : false,
								    items: [cmbcha]
								},												
						]
					},btncnfAdd,									     	
				   ]
				  },flxcnfdetail,
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 60,
						width       : 155,
						x           : 15,
						y           : 430,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txtcnftotvalue]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 75,
						width       : 170,
						x           : 165,
						y           : 430,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotcgstamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 75,
						width       : 170,
						x           : 330,
						y           : 430,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotsgstamt]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 95,
						width       : 190,
						x           : 500,
						y           : 430,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotigstcudtduty]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 45,
						width       : 140,
						x           : 700,
						y           : 430,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotfreight]
					},
					{ 
						xtype       : 'fieldset',
						title       : '',
						labelWidth  : 90,
						width       : 200,
						x           : 640,
						y           : 465,
						defaultType : 'textfield',
						border	    : false,
						items	    : [txttotbillamt]
					},

				]
			},

			
		]
	},			
                ]
    });
    
   
    var TrnbillofentryWindoe= new Ext.Window({
	height      : 615,
        width       : 1050,
        y           : 35,
        title       : 'Bill of Entry',
        items       : Trnbillofentryformpannel,
        layout      : 'fit',
        //closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        bodyStyle:{"background-color":"#E9EEDD"},
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
    TrnbillofentryWindoe.show();  
});
