Ext.onReady(function() {
Ext.QuickTips.init();

var gstFlag;

var btnview = new Ext.Button({
    style   : 'text-align:center;',
    text    : "View Back Date",
    width   : 70,
    height  : 30,
    x       : 30,
    y       : 0,
   labelStyle : "font-:10px;font-weight:bold;",
   style      : "border-radius:10px;",
   style      :{'background':'#e8badf'},

});

var dtdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    labelStyle : "font-:10px;font-weight:bold;",
    style      : "border-radius:5px;",    
    width : 100,
});


var txtentryno = new Ext.form.NumberField({
        fieldLabel  : 'Entry no',
        id          : 'txtentryno',
        name        : 'txtentryno',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var cmbshift = new Ext.form.ComboBox({
        fieldLabel      : 'Shift',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbshift',
        typeAhead       : true,
        mode            : 'local',
        store           : ['A','B','C'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });
   
var btntemp = new Ext.Button({
    style   : 'text-align:center;',
    text    : "TEMP",
    width   : 70,
    height  : 30,
    x       : 700,
    y       : 0,
   labelStyle : "font-:10px;font-weight:bold;",
   style      : "border-radius:10px;",
   style      :{'background':'#e8badf'},

});   

var lblwinderno = new Ext.form.Label({
	fieldLabel  : 'Winder No',
	id          : 'lblwinderno',
	name        : 'lblwinderno',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblparentrollno = new Ext.form.Label({
	fieldLabel  : 'Parent Roll No',
	id          : 'lblparentrollno',
	name        : 'lblparentrollno',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblset = new Ext.form.Label({
	fieldLabel  : 'Set',
	id          : 'lblset',
	name        : 'lblset',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblbatchno = new Ext.form.Label({
	fieldLabel  : 'Batch No',
	id          : 'lblbatchno',
	name        : 'lblbatchno',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblmcshift = new Ext.form.Label({
	fieldLabel  : 'M/C Shift',
	id          : 'lblmcshift',
	name        : 'lblmcshift',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblRollWt = new Ext.form.Label({
	fieldLabel  : 'Wt',
	id          : 'lblRollWt',
	name        : 'lblRollWt',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblwinderdeckle = new Ext.form.Label({
	fieldLabel  : 'Winder Deckle',
	id          : 'lblwinderdeckle',
	name        : 'lblwinderdeckle',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var lblrolldia = new Ext.form.Label({
	fieldLabel  : 'Roll Dia',
	id          : 'lblrolldia',
	name        : 'lblrolldia',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});
 

var cmbwinderno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbwinderno',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbparentrollno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbparentrollno',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbset = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbset',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbbatchno = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 90,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbbatchno',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbmcshift = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmcshift',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var txtRollWt = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtRollWt',
        name        : 'txtRollWt',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtwinderdeck = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtwinderdeck',
        name        : 'txtwinderdeck',
        width       : 90,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtrolldia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtrolldia',
        name        : 'txtrolldia',
        width       : 50,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtvar = new Ext.form.NumberField({
        fieldLabel  : 'Variety',
        id          : 'txtvar',
        name        : 'txtvar',
        width       : 200,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtgsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM',
        id          : 'txtgsm',
        name        : 'txtgsm',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var cmbmano = new Ext.form.ComboBox({
        fieldLabel      : 'MA No',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbmano',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var cmbordno = new Ext.form.ComboBox({
        fieldLabel      : 'Ord No',
        width           : 140,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbordno',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var lblruntype = new Ext.form.Label({
	fieldLabel  : 'Running Type',
	id          : 'lblruntype',
	name        : 'lblruntype',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var cmbruntype = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbruntype',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var lblposition = new Ext.form.Label({
	fieldLabel  : 'Position',
	id          : 'lblposition',
	name        : 'lblposition',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});
var cmbposition = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 70,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbposition',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var lblsize = new Ext.form.Label({
	fieldLabel  : 'Size',
	id          : 'lblsize',
	name        : 'lblsize',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:8px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtsize = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsize',
        name        : 'txtsize',
        width       : 100,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxsizedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 80,
        width: 100,
        x: 240,
        y: 50,        
        columns: [   
            {header: "", dataIndex: '',sortable:true,width:90,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lblsizecode = new Ext.form.Label({
	fieldLabel  : 'Size code',
	id          : 'lblsizecode',
	name        : 'lblsizecode',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:8px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtsizecode = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsizecode',
        name        : 'txtsizecode',
        width       : 150,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxsizecodedetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 80,
        width: 150,
        x: 370,
        y: 50,        
        columns: [   
            {header: "", dataIndex: '',sortable:true,width:140,align:'left'},                                               
        ],
store:[''], //loadsalledgerlistdatastore,
   });

var lbljoints = new Ext.form.Label({
	fieldLabel  : 'Joints',
	id          : 'lbljoints',
	name        : 'lbljoints',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var cmbjoints = new Ext.form.ComboBox({
        fieldLabel      : '',
        width           : 50,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbjoints',
        typeAhead       : true,
        mode            : 'local',
        store           : [''],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
//	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",         
	listeners:{
        select: function(){
	}
	}
   });

var lblreeldia = new Ext.form.Label({
	fieldLabel  : 'Reel DIA',
	id          : 'lblreeldia',
	name        : 'lblreeldia',
	width       :  5,
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",        
    	enableKeyEvents: true,
	tabindex : 1,

});

var txtreeldia = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtreeldia',
        name        : 'txtreeldia',
        width       : 70,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txtreelno = new Ext.form.NumberField({
        fieldLabel  : 'Reel No',
        id          : 'txtreelno',
        name        : 'txtreelno',
        width       : 150,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var btnadd = new Ext.Button({
    style   : 'text-align:center;',
    text    : "ADD",
    width   : 40,
    height  : 40,
    x       : 720,
    y       : 90,
   labelStyle : "font-:10px;font-weight:bold;",
   style      : "border-radius:10px;",
   style      :{'background':'#e8badf'},

}); 

var dgrecord = Ext.data.Record.create([]);
var flxwinderdetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 780,
        x: 0,
        y: 135,        
        columns: [   
            {header: "Quality", dataIndex: 'quality',sortable:true,width:140,align:'left'},   
            {header: "Variety Code", dataIndex: 'var_code',sortable:true,width:100,align:'left'}, 
            {header: "GSM", dataIndex: 'gsm',sortable:true,width:70,align:'left'}, 
            {header: "SET", dataIndex: 'set',sortable:true,width:70,align:'left'}, 
            {header: "SIZE", dataIndex: 'size',sortable:true,width:100,align:'left'}, 
            {header: "Reel No", dataIndex: 'reel_no',sortable:true,width:140,align:'left'}, 
            {header: "Joints", dataIndex: 'joints',sortable:true,width:70,align:'left'}, 
            {header: "Status", dataIndex: 'status_j',sortable:true,width:70,align:'left'}, 
            {header: "QC Remarks", dataIndex: 'qc_remarks',sortable:true,width:140,align:'left'}, 
            {header: "Reason", dataIndex: 'reason',sortable:true,width:180,align:'left'}, 
            {header: "Status", dataIndex: 'status_r',sortable:true,width:70,align:'left'}, 
            {header: "QC_Code", dataIndex: 'qc_code',sortable:true,width:70,align:'left'}, 
            {header: "R.Wt", dataIndex: 'r_wt',sortable:true,width:70,align:'left'}, 
            {header: "OLD.ST", dataIndex: 'old_st',sortable:true,width:70,align:'left'}, 
            {header: "LOT", dataIndex: 'lot',sortable:true,width:70,align:'left'}, 
            {header: " 	Wt", dataIndex: 'roll_wt',sortable:true,width:80,align:'left'}, 
            {header: "Deckle", dataIndex: 'deckle',sortable:true,width:70,align:'left'}, 
            {header: "DIA", dataIndex: 'dia',sortable:true,width:70,align:'left'}, 
            {header: "New Quality", dataIndex: 'new_quality',sortable:true,width:120,align:'left'}, 
            {header: "New Variety Code", dataIndex: 'new_variety_code',sortable:true,width:140,align:'left'}, 
            {header: "M/C Shift", dataIndex: 'mc_shift',sortable:true,width:70,align:'left'}, 
            {header: "WT-OLD", dataIndex: 'wt_old',sortable:true,width:70,align:'left'}, 
            {header: "MA No", dataIndex: 'ma_no',sortable:true,width:70,align:'left'}, 
            {header: "Reeltype", dataIndex: 'reel_type',sortable:true,width:80,align:'left'},
            {header: "Order Ref.No", dataIndex: 'order_ref_no',sortable:true,width:140,align:'left'}, 
            {header: "Sizecode", dataIndex: 'size_code',sortable:true,width:120,align:'left'}, 
            {header: "Run Type", dataIndex: 'run_type',sortable:true,width:70,align:'left'}, 
            {header: "Wind.No", dataIndex: 'wind_no',sortable:true,width:70,align:'left'}, 
            {header: "Posi.No", dataIndex: 'posi_no',sortable:true,width:70,align:'left'}, 
            {header: "Reel Ref No", dataIndex: 'reel_ref_no',sortable:true,width:150,align:'left'},  
                                                        
        ],
store:[''],
   });
   
var txttotnoreelno = new Ext.form.NumberField({
        fieldLabel  : 'Total No.of Reels',
        id          : 'txttotnoreelno',
        name        : 'txttotnoreelno',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var txttotwt = new Ext.form.NumberField({
        fieldLabel  : 'WT',
        id          : 'txttotwt',
        name        : 'txttotwt',
        width       : 80,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});   

var txtuptorewind = new Ext.form.NumberField({
        fieldLabel  : 'Upto Rewinded',
        id          : 'txtuptorewind',
        name        : 'txtuptorewind',
        width       : 60,
        enableKeyEvents: true,
    	labelStyle : "font-:10px;font-weight:bold;",
    	style      : "border-radius:5px;",     	
	tabindex : 1,        
});

var dgrecord = Ext.data.Record.create([]);
var flxmadetails = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 120,
        width: 200,
        x: 835,
        y: 135,        
        columns: [   
            {header: "MANO", dataIndex: 'mano',sortable:true,width:70,align:'left'},   
            {header: "ORDNO", dataIndex: 'ordno',sortable:true,width:70,align:'left'}, 
            {header: "SIZE", dataIndex: 'size',sortable:true,width:70,align:'left'}, 
            {header: "Wt(Kg)", dataIndex: 'wt_kg',sortable:true,width:70,align:'left'}, 
            {header: "Recd(Kg)", dataIndex: 'recd_kg',sortable:true,width:70,align:'left'}, 
        ],
store:[''],
   });

   
var TrnWinderEntryFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'WINDER ENTRY',
        width       : 630,
        height      : 460,
        //bodyStyle   : {"background-color":"#d7d5fa"},
	bodyStyle   :{"background-color":"#E9EEDD"},
	labelStyle : "font-:12px;font-weight:bold;",
   	style      : "border-radius:5px;", 	
        frame       : false,
        id          : 'TrnWinderEntryFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            font:25,
            items: [
		    {
                    text: 'New',
                    font :20,
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
                    font :20,
                    style  : 'text-align:center;',
                    icon: '/Pictures/edit.png',
                    tooltip: 'Modify Details...', 
                    height: 40,
                    listeners:{
                        click: function () {
                            gstFlag = "Edit";
                        }
                    }
                },'-',
//save
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                 var gstSave;

//alert(flxDetail.getStore().getCount());		 
  
                    gstSave="true";
		    if (flxproduction.getStore().getCount()==0)
        	            {
        	                Ext.Msg.alert('Production','Grid should not be empty..');
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

                            var WinderData = flxwinderdetails.getStore().getRange();                                        
                            var WinderupData = new Array();
                            Ext.each(WinderData, function (record) {
                                WinderupData.push(record.data);
                            });
			      Ext.Ajax.request({
                            url: 'TrnProdnEntrySave.php',
                            params :
                             {
				cntWinder: WinderData.length,
                               	griddet_Winder: Ext.util.JSON.encode(WinderupData),    
                     
				cnt: ProdData.length,
                               	griddet: Ext.util.JSON.encode(ProdupData),    

				cntRoll: RollData.length,
                               	griddet_roll : Ext.util.JSON.encode(RollupData),    

                                savetype:gstFlag,

                             	rcompcode   : Gincompcode,
				rfincode    : GinFinid,
				rentryno    : txtentryno.getValue(),
				rdate       : Ext.util.Format.date(dtdate.getValue(),"Y-m-d"),
				r_shift     : cmbshift.getRawValue(),
		                r_w_date    :  Ext.util.Format.date(dtdate.getValue(),"Y-m-d"),
			        r_operator  : cmbOperator.getValue(),
                                r_rollno     : Number(cmbparentrollno.getValue()),
				r_varietycode   : Number(txtvar.getValue()),
	 	 		r_mcshift    : Number(cmbmcshift.getValue()),
				r_rollwt   : Number(txtShiftrunmins.getRawValue()),
				

				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                    
                                    Ext.MessageBox.alert("Production Entry Saved -" + obj['msg']);
                                    TrnProdnFormpanel.getForm().reset();
                                    flxproduction.getStore().removeAll();
                                    flxRollProductionDetailed.getStore().removeAll();
                                    flxwinderdetails.getStore().removeAll();
                                    RefreshData();
                                  }else
					{
			Ext.MessageBox.alert("Production Entry Not Saved! Pls Check!- " + obj['msg']);                                                  
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
                    tooltip: 'Refresh Details...', 
                    height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                            TrnWinderEntryWindow.RefreshData();
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
                            TrnWinderEntryWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
             
		{
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:10px;font-weight:bold;",
   		style      	: "border:0.25px solid skyblue;border-radius:5px;",                
                height		:505,
                width		:825,
                layout 	: 'absolute',
                x		: 5,
                y		: 5,
             items:[
             		btnview,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 140,
				y           : -5,
				border      : false,
				items: [dtdate]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 60,
				width       : 180,
				x           : 320,
				y           : -5,
				border      : false,
				items       : [txtentryno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 160,
				x           : 520,
				y           : -5,
				border      : false,
				items	    : [cmbshift]
			},btntemp,			             		
             {
		 xtype  	: 'fieldset',
                title		: '',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid green;border-radius:5px;",              
                height		:100,
                width		:800,
                layout 	: 'absolute',
                x		: 0,
                y		: 35,
             items:[	
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 65,
				width       : 85,
				x           : -5,
				y           : -10,
				border      : false,
				items	    : [lblwinderno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 115,
				x           : 70,
				y           : -10,
				border      : false,
				items	    : [lblparentrollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 45,
				x           : 200,
				y           : -10,
				border      : false,
				items	    : [lblset]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 85,
				x           : 270,
				y           : -10,
				border      : false,
				items	    : [lblbatchno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 85,
				x           : 370,
				y           : -10,
				border      : false,
				items	    : [lblmcshift]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 105,
				x           : 470,
				y           : -10,
				border      : false,
				items	    : [lblRollWt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 110,
				width       : 110,
				x           : 570,
				y           : -10,
				border      : false,
				items	    : [lblwinderdeckle]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 75,
				width       : 75,
				x           : 700,
				y           : -10,
				border      : false,
				items	    : [lblrolldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : -5,
				y           : 10,
				border      : false,
				items	    : [cmbwinderno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 65,
				y           : 10,
				border      : false,
				items	    : [cmbparentrollno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 180,
				y           : 10,
				border      : false,
				items	    : [cmbset]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 250,
				y           : 10,
				border      : false,
				items	    : [cmbbatchno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 360,
				y           : 10,
				border      : false,
				items	    : [cmbmcshift]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 455,
				y           : 10,
				border      : false,
				items       : [txtRollWt]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 120,
				x           : 565,
				y           : 10,
				border      : false,
				items       : [txtwinderdeck]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 690,
				y           : 10,
				border      : false,
				items       : [txtrolldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 40,
				width       : 270,
				x           : 0,
				y           : 40,
				border      : false,
				items       : [txtvar]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 25,
				width       : 115,
				x           : 255,
				y           : 40,
				border      : false,
				items       : [txtgsm]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 150,
				x           : 360,
				y           : 40,
				border      : false,
				items	    : [cmbmano]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 220,
				x           : 520,
				y           : 40,
				border      : false,
				items	    : [cmbordno]
			},
								             
              	]
	  },
	  {
		 xtype  	: 'fieldset',
                title		: 'WINDER FINISHED',
                layout 	: 'hbox',
                border		:true,
		labelStyle 	: "font-:12px;font-weight:bold;",
   		style      	: "border:0.25px solid blue;border-radius:5px;",              
                height		:335,
                width		:800,
                layout 	: 'absolute',
                x		: 0,
                y		: 145,
             items:[
             		{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 90,
				width       : 110,
				x           : 0,
				y           : -10,
				border      : false,
				items	    : [lblruntype]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 5,
				width       : 140,
				x           : -10,
				y           : 15,
				border      : false,
				items	    : [cmbruntype]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 70,
				x           : 140,
				y           : -10,
				border      : false,
				items	    : [lblposition]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 130,
				y           : 15,
				border      : false,
				items	    : [cmbposition]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 50,
				x           : 260,
				y           : -10,
				border      : false,
				items	    : [lblsize]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 130,
				x           : 225,
				y           : 15,
				border      : false,
				items       : [txtsize]
			},flxsizedetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 80,
				width       : 90,
				x           : 380,
				y           : -10,
				border      : false,
				items	    : [lblsizecode]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 180,
				x           : 355,
				y           : 15,
				border      : false,
				items       : [txtsizecode]
			},flxsizecodedetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 65,
				x           : 540,
				y           : -10,
				border      : false,
				items	    : [lbljoints]
			},			                
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 80,
				x           : 530,
				y           : 15,
				border      : false,
				items	    : [cmbjoints]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 75,
				x           : 620,
				y           : -10,
				border      : false,
				items	    : [lblreeldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 1,
				width       : 100,
				x           : 610,
				y           : 15,
				border      : false,
				items       : [txtreeldia]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 50,
				width       : 230,
				x           : 0,
				y           : 95,
				border      : false,
				items       : [txtreelno]
			},btnadd,flxwinderdetails,
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 120,
				width       : 230,
				x           : 0,
				y           : 260,
				border      : false,
				items       : [txttotnoreelno]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 140,
				x           : 250,
				y           : 260,
				border      : false,
				items       : [txttotwt]
			},
             ]
             },	
	  			             
      	]
      },

			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 70,
				width       : 160,
				x           : 850,
				y           : 30,
				border      : true,
				style	    : "border:0.25px solid lightgreen;border-radius:5px;",
				items       : [txtuptorewind]
			},flxmadetails,     		
      ]
});

     var TrnWinderEntryWindow = new Ext.Window({
        height      : 615,
        width       : 1050,
        y           : 35,
        layout      : 'fit',
        items       : TrnWinderEntryFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        //bodyStyle:{"background-color":"#d7d5fa"},
	bodyStyle:{"background-color":"#E9EEDD"},
        listeners:
            {
                
            }
    });
       TrnWinderEntryWindow.show();
});

