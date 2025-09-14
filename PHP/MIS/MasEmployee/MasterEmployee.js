Ext.onReady(function(){
   Ext.QuickTips.init();
   var fm = Ext.form;
   var txtEmpcode = new Ext.form.TextField({
   	fieldLabel  :'Employee Code',
   	id	    :'txtEmpcode',
   	name	    :'txtEmpcode',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ff33f3",
   	tabindex    :1,
   	});
   	
   	 var txtEmpname = new Ext.form.TextField({
   	fieldLabel  :'Employee Name',
   	id	    :'txtEmpname',
   	name	    :'txtEmpname',
   	width	    :200,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ff33f3",
   	tabindex    :2,
   	});
   	
    var txtAAdhaar = new Ext.form.TextField({
   	fieldLabel  :'AADHAARNumber',
   	id	    :'txtAAdhaar',
   	name	    :'txtAAdhaar',
   	width	    :400,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ff33f3",
   	tabindex    :3,
   	});
   	
      var txtEmploc = new Ext.form.TextField({
   	fieldLabel  :'EmployeeLocation',
   	id	    :'txtEmploc',
   	name	    :'txtEmploc',
   	width	    :400,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ff33f3",
   	tabindex    :4,
   	});
   	
   	   var txtScode = new Ext.form.TextField({
   	fieldLabel  :'Search Code',
   	id	    :'txtScode',
   	name	    :'txtScode',
   	width	    :400,
   	readonly    :true,
   	labelStyle : "font-size:14px;font-weight:bold;color:#ff33f3",
   	tabindex    :5,
   	});
  
  var optEmpstatus = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    title:'Select Type',
    layout : 'hbox',
    width:270,
    height:60,
    x:650,
    y:10,
    border: true,
    
    items: [
        {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optEmpstatus',
        items: [
            {boxLabel: 'ACTIVE', name: 'optEmpstatus', id:'optACTIVE', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     shade = "AC";
                     
                  }
               }
              }
            },
            {boxLabel: 'ALL', name: 'optEmpstatus', id:'optALL', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "A";
                   
               }
              }
             }},
             {boxLabel: 'RESIGNED', name: 'optEmpstatus', id:'optRESIGNED', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "R";
                   
               }
              }
             }},
            ]
             }
             ]
             });
 var txtPfamount = new Ext.form.NumberField({
        fieldLabel  : 'PF AMOUNT',
        id          : 'txtPfamount',
        name        : 'txtPfamount',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 1
    });
   
var txtEsi = new Ext.form.NumberField({
        fieldLabel  : 'ESI AMOUNT',
        id          : 'txtEsi',
        name        : 'txtEsi',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 3
    });
    
     var txtIt = new Ext.form.NumberField({
        fieldLabel  : 'IT DEDUCTION',
        id          : 'txtIt',
        name        : 'txtIt',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 2
    });


var txtLic = new Ext.form.NumberField({
        fieldLabel  : 'L.I.C',
        id          : 'txtLic',
        name        : 'txtLic',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 4
    });

var txtRd = new Ext.form.NumberField({
        fieldLabel  : 'RD',
        id          : 'txtRd',
        name        : 'txtRd',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });

var txtInterview = new Ext.form.NumberField({
        fieldLabel  : 'interviewed by',
        id          : 'txtInterview',
        name        : 'txtInterview',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });

var txtPre = new Ext.form.NumberField({
        fieldLabel  : 'Preliminary interviewed by',
        id          : 'txtPre',
        name        : 'txtPre',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtAppoint = new Ext.form.NumberField({
        fieldLabel  : 'Appointed by',
        id          : 'txtAppoint',
        name        : 'txtAppoint',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  var txtPrevious = new Ext.form.NumberField({
        fieldLabel  : 'Previous Experience(in OE Years)',
        id          : 'txtPrevious',
        name        : 'txtPrevious',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
var txtIe = new Ext.form.NumberField({
        fieldLabel  : 'IE',
        id          : 'txtIe',
        name        : 'txtIe',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 var cmbOt = new Ext.form.ComboBox({
        fieldLabel      : 'OT Hours Eligible ',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbOt',
        typeAhead       : true,
        mode            : 'local',
        store           :['YES','NO'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
 var cmbWorking = new Ext.form.ComboBox({
        fieldLabel      : 'Working Hrs(8 to 16) ',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbWorking',
        typeAhead       : true,
        mode            : 'local',
        store           :['8','9','10','11','12','13','14','15','16'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
          
          var cmbBankname = new Ext.form.ComboBox({
        fieldLabel      : 'Bank Name',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbBankname',
        typeAhead       : true,
        mode            : 'local',
        store           :['CASH','CITY UNION BANK'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
var txtBankacc = new Ext.form.NumberField({
        fieldLabel  : 'Bank A/C No',
        id          : 'txtBankacc',
        name        : 'txtBankacc',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
var txtBankifsc = new Ext.form.NumberField({
        fieldLabel  : 'Bank IFSC',
        id          : 'txtBankifsc',
        name        : 'txtBankifsc',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  
var txtBankmail = new Ext.form.NumberField({
        fieldLabel  : 'E-Mail',
        id          : 'txtBankmail',
        name        : 'txtBankmail',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    
         var cmbEmpwork = new Ext.form.ComboBox({
        fieldLabel      : 'Employee Work Status',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbEmpwork',
        typeAhead       : true,
        mode            : 'local',
        store           :['CURRENT EMPLOYEE','RESIGNED','WORKING AS RETAINER','WORKING AS TEMPORARY'],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 

 
 var txtGross = new Ext.form.NumberField({
        fieldLabel  : 'Gross Pay',
        id          : 'txtGross',
        name        : 'txtGross',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 var txtPfsal = new Ext.form.NumberField({
        fieldLabel  : 'PF Salary',
        id          : 'txtPfsal',
        name        : 'txtPfsal',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    
 var txtEsisal = new Ext.form.NumberField({
        fieldLabel  : 'ESI Salary',
        id          : 'txtEsisal',
        name        : 'txtEsisal',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 
 var txtBasicpay = new Ext.form.NumberField({
        fieldLabel  : 'Basic Pay',
        id          : 'txtBasicpay',
        name        : 'txtBasicpay',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
     var txtDa = new Ext.form.NumberField({
        fieldLabel  : 'DA',
        id          : 'txtDa',
        name        : 'txtDa',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  var txtHra = new Ext.form.NumberField({
        fieldLabel  : 'HRA',
        id          : 'txtHra',
        name        : 'txtHra',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 
  var txtTa = new Ext.form.NumberField({
        fieldLabel  : 'T.A',
        id          : 'txtTa',
        name        : 'txtTa',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  var txtMedical = new Ext.form.NumberField({
        fieldLabel  : 'Medical Allow',
        id          : 'txtMedical',
        name        : 'txtMedical',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  var txtOther = new Ext.form.NumberField({
        fieldLabel  : 'Other',
        id          : 'txtOther',
        name        : 'txtOther',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
   var txtGrossrs = new Ext.form.NumberField({
        fieldLabel  : 'Gross Pay(Rs.)',
        id          : 'txtGrossrs',
        name        : 'txtGrossrs',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    
 var loadqualificationdatastore = new Ext.data.Store({
      id: 'loadqualificationdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadQualification"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'qualification_code','qualification_name'
      ]),
    });	

   
      var cmbQualification = new Ext.form.ComboBox({
        fieldLabel      : 'QUALIFICATION',
        width           : 200,
        displayField    : 'qualification_name', 
        valueField      : 'qualification_code',
        hiddenName      : '',
        id              : 'cmbQualification',
        typeAhead       : true,
        mode            : 'local',
        store           :loadqualificationdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          listeners:{
        select: function(){
	}
	}
          }); 
          var loaddepartmentdatastore = new Ext.data.Store({
      id: 'loaddepartmentdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDepartment"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'department_code','department_name'

      ]),
    });

          
         
              var cmbDept = new Ext.form.ComboBox({
        fieldLabel      : 'DEPARTMENT',
        width           : 200,
        displayField    : 'department_name', 
        valueField      : 'department_code',
        hiddenName      : '',
        id              : 'cmbDept',
        typeAhead       : true,
        mode            : 'local',
        store           :loaddepartmentdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
            listeners:{
        select: function(){
	}
	}
          }); 
          
          
      var loaddesignationdatastore = new Ext.data.Store({
      id: 'loaddesignationdatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadDesignation"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'design_code','design_name'

      ]),
    });
          
        var cmbDesign = new Ext.form.ComboBox({
        fieldLabel      : 'DESIGNATION',
        width           : 200,
        displayField    : 'design_name', 
        valueField      : 'design_code',
        hiddenName      : '',
        id              : 'cmbDesign',
        typeAhead       : true,
        mode            : 'local',
        store           :loaddesignationdatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
               listeners:{
        select: function(){
	}
	}

          }); 

      var cmbWorkplace = new Ext.form.ComboBox({
        fieldLabel      : 'WORK PLACE',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbWorkplace',
        typeAhead       : true,
        mode            : 'local',
        store           :['MILL','OTHER AREA',],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
   var cmbEmptype = new Ext.form.ComboBox({
        fieldLabel      : 'EMPLOYEE TYPE',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbEmptype',
        typeAhead       : true,
        mode            : 'local',
        store           :['STAFF','WORKER',],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 

 var cmbWeek = new Ext.form.ComboBox({
        fieldLabel      : 'WEEK HOLIDAY',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbWeek',
        typeAhead       : true,
        mode            : 'local',
        store           :['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY',],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
          var cmbPfeligible = new Ext.form.ComboBox({
        fieldLabel      : 'PF ELIGIBLE(Y/N)',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbPfeligible',
        typeAhead       : true,
        mode            : 'local',
        store           :['YES','NO',],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
               var cmbEsieligible = new Ext.form.ComboBox({
        fieldLabel      : 'ESI ELIGIBLE(Y/N)',
        width           : 200,
        displayField    : 'var_desc', 
        valueField      : 'var_code',
        hiddenName      : '',
        id              : 'cmbEsieligible',
        typeAhead       : true,
        mode            : 'local',
        store           :['YES','NO',],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          }); 
var txtPf = new Ext.form.NumberField({
        fieldLabel  : 'PF(%)',
        id          : 'txtPf',
        name        : 'txtPf',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
   var empDOJ = new Ext.form.DateField({
    	fieldLabel:'PF join Date',
    	id	  :'empDOJ',
    	name	  :'empDOJ',
    	format	  :'d-m-y',
    	labelStyle:"font-size:14px;font-weight:bold;color:#ab28ab",
    	value	  :new Date()
    	}); 	
   var txtPfno = new Ext.form.NumberField({
        fieldLabel  : 'PF Number',
        id          : 'txtPfno',
        name        : 'txtPfno',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 var txtUan = new Ext.form.NumberField({
        fieldLabel  : 'UAN',
        id          : 'txtUan',
        name        : 'txtUan',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 var txtEsino = new Ext.form.NumberField({
        fieldLabel  : 'ESI Number',
        id          : 'txtEsino',
        name        : 'txtEsino',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
  
 var optRelation = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    title:'Relationship',
    layout : 'hbox',
    width:600,
    height:100,
    x:10,
    y:5,
    border: true,
    
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optRelation',
        items: [
            {boxLabel: 'FATHER', name: 'optRelation', id:'optFATHER', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     shade = "F";
              
                  }
               }
              }
            },
            {boxLabel: 'HUSBAND', name: 'optRelation', id:'opthusband', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "H";
                   
               }
              }
             }},
             
            ]
             }
             ]
             });
             
    var optSex = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    title:'SEX',
    layout : 'hbox',
    width:200,
    height:100,
    x:650,
    y:5,
    border: true,
    
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 2,
        id: 'optSex',
        items: [
            {boxLabel: 'MALE', name: 'optSex', id:'optmale', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     shade = "M";
              
                  }
               }
              }
            },
            {boxLabel: 'FEMALE', name: 'optSex', id:'optfemale', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "fe";
                   
               }
              }
             }},
             
            ]
             }
             ]
             });
 
         var txtFather = new Ext.form.NumberField({
        fieldLabel  : 'Father/husband Name',
        id          : 'txtFather',
        name        : 'txtFather',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 var loadreligiondatastore = new Ext.data.Store({
      id: 'loadreligiondatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadReligion"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'religion_code','religion_name'
      ]),
    });	
 
          var cmbReligion = new Ext.form.ComboBox({
        fieldLabel      : 'Religion',
        width           : 200,
        displayField    : 'religion_name', 
        valueField      : 'religion_code',
        hiddenName      : '',
        id              : 'cmbReligion',
        typeAhead       : true,
        mode            : 'local',
        store           :loadreligiondatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          });

  var loadcommunitydatastore = new Ext.data.Store({
      id: 'loadcommunitydatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadCommunity"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'comm_code','comm_name'
      ]),
    });	        
        var cmbCommunity = new Ext.form.ComboBox({
        fieldLabel      : 'Community',
        width           : 200,
        displayField    : 'comm_name', 
        valueField      : 'comm_code',
        hiddenName      : '',
        id              : 'cmbCommunity',
        typeAhead       : true,
        mode            : 'local',
        store           :loadcommunitydatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          });

 var loadcastedatastore = new Ext.data.Store({
      id: 'loadcastedatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasterEmployee.php',      // File to connect toClsMasProdType
                method: 'POST'
            }),
            baseParams:{task:"loadCaste"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'caste_code','caste_name'
      ]),
    });	
          
        var cmbCaste = new Ext.form.ComboBox({
        fieldLabel      : 'Caste',
        width           : 200,
        displayField    : 'caste_name', 
        valueField      : 'caste_code',
        hiddenName      : '',
        id              : 'cmbCaste',
        typeAhead       : true,
        mode            : 'local',
        store           :loadcastedatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
      labelStyle : "font-size:14px;font-weight:bold;color:#ab28ab",
          enableKeyEvents: true,
          });


var personalDOB = new Ext.form.DateField({
    	fieldLabel:'Birth',
    	id	  :'personalDOB',
    	name	  :'personalDOB',
    	format	  :'d-m-y',
    	labelStyle:"font-size:14px;font-weight:bold;color:#ab28ab",
    	value	  :new Date()
    	});
    	
    	var personalDOJ = new Ext.form.DateField({
    	fieldLabel:'Joining',
    	id	  :'personalDOJ',
    	name	  :'personalDOJ',
    	format	  :'d-m-y',
    	labelStyle:"font-size:14px;font-weight:bold;color:#ab28ab",
    	value	  :new Date()
    	});
    	
    	var optMarital = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    title:'Marital Status',
    layout : 'hbox',
    width:250,
    height:60,
    x:610,
    y:175,
    border: true,
    
    items: [
        {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'optMarital',
        items: [
            {boxLabel: 'Yes', name: 'optMarital', id:'optYes', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     shade = "Y";
                     
                  }
               }
              }
            },
            {boxLabel: 'No', name: 'optMarital', id:'optNo', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   shade = "N";
                   
               }
              }
             }},
            
            ]
             }
             ]
             });
             
        var txtAddress1 = new Ext.form.NumberField({
        fieldLabel  : 'Address1',
        id          : 'txtAddress1',
        name        : 'txtAddress1',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
      var txtAddress2 = new Ext.form.NumberField({
        fieldLabel  : 'Address2',
        id          : 'txtAddress2',
        name        : 'txtAddress2',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
      var txtAddress3 = new Ext.form.NumberField({
        fieldLabel  : 'Address3',
        id          : 'txtAddress3',
        name        : 'txtAddress3',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtPincode = new Ext.form.NumberField({
        fieldLabel  : 'Pincode',
        id          : 'txtPincode',
        name        : 'txtPincode',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtContactno = new Ext.form.NumberField({
        fieldLabel  : 'Contact No',
        id          : 'txtContactno',
        name        : 'txtContactno',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtPeraddress1 = new Ext.form.NumberField({
        fieldLabel  : 'Address1',
        id          : 'txtPeraddress1',
        name        : 'txtPeraddress1',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
      var txtPeraddress2 = new Ext.form.NumberField({
        fieldLabel  : 'Address2',
        id          : 'txtPeraddress2',
        name        : 'txtPeraddress2',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
      var txtPeraddress3 = new Ext.form.NumberField({
        fieldLabel  : 'Address3',
        id          : 'txtPeraddress3',
        name        : 'txtPeraddress3',
        width       :  480,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtPerpincode = new Ext.form.NumberField({
        fieldLabel  : 'Pincode',
        id          : 'txtPerpincode',
        name        : 'txtPerpincode',
        width       :  100,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
    var txtPercontactno = new Ext.form.NumberField({
        fieldLabel  : 'Contact No',
        id          : 'txtPercontactno',
        name        : 'txtPercontactno',
        width       :  250,
        labelStyle      : "font-size:14px;font-weight:bold;color:#ab28ab",
        tabindex : 5
    });
 
 
 
 var tabPersonaldetails = new Ext.TabPanel({
    id          : 'PersonalDetails',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 600,
    width       : 1000,
    x           :10,
    y		:250,
 
           
     items       : [
                   {
                     xtype: 'panel',
                     title: 'PRESENT ADDRESS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items: [
                     			  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 30,
                                             border      : false,
                                             items: [txtAddress1]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 70,
                                             border      : false,
                                             items: [txtAddress2]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 110,
                                             border      : false,
                                             items: [txtAddress3]
                                        },
                                              { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 360,
                                             x           : 10,
                                             y           : 150,
                                             border      : false,
                                             items: [txtPincode]
                                        },
                                            { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 500,
                                             x           : 220,
                                             y           : 150,
                                             border      : false,
                                             items: [txtContactno]
                                        },
                                ],
 		},
 		 {
                     xtype: 'panel',
                     title: 'PERMENANT ADDRESS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                        items: [
                     			  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 30,
                                             border      : false,
                                             items: [txtPeraddress1]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 70,
                                             border      : false,
                                             items: [txtPeraddress2]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 110,
                                             border      : false,
                                             items: [txtPeraddress3]
                                        },
                                              { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 360,
                                             x           : 10,
                                             y           : 150,
                                             border      : false,
                                             items: [txtPerpincode]
                                        },
                                            { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 500,
                                             x           : 220,
                                             y           : 150,
                                             border      : false,
                                             items: [txtPercontactno]
                                        },
                                ],

 		},
		 ],
		     
 	});


var tabEmpdetails = new Ext.TabPanel({
    id          : 'EmployeeDetails',
    xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 600,
    width       : 1000,
    x           :10,
    y		:170,
    
     items       : [
                   {
                     xtype: 'panel',
                     title: 'Personal Details',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                    
                   			  items:[
                    			  { 
                                             xtype       : 'fieldset',
                                             title       : 'Date of',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 10,
                                             y           : 180,
                                             border      : true,
                                             items: [personalDOB]
                                        },
                                  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 560,
                                             x           : 250,
                                             y           : 190,
                                             border      : false,
                                             items: [personalDOJ]
                                        },
                                 
                     
                    		  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 180,
                                             width       : 560,
                                             x           : 110,
                                             y           : 30,
                                             border      : false,
                                             items: [txtFather]
                                        },
                                        
                                            { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  :80,
                                             width       : 560,
                                             x           : 10,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbReligion]
                                        },
                                              { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 560,
                                             x           : 320,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbCommunity]
                                        },
                                        
                                               { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 50,
                                             width       : 560,
                                             x           : 620,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbCaste]
                                        },
                                      
                     optRelation,
                     optSex,
                     optMarital,
                      tabPersonaldetails,
                     ],
                 },
                      {
                     xtype: 'panel',
                     title: 'PF and DEPT Details',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                       items:[
    					 
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 40,
                                             border      : false,
                                             items: [cmbQualification]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 80,
                                             border      : false,
                                             items: [cmbDept]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbDesign]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 160,
                                             border      : false,
                                             items: [cmbWorkplace]
                                        },
                                         { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 200,
                                             border      : false,
                                             items: [cmbEmptype]
                                        },
                                         { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 240,
                                             border      : false,
                                             items: [cmbWeek]
                                        },
                                        
                              
  					  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 80,
                                             border      : false,
                                             items: [cmbPfeligible]
                                        },
                                         { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 120,
                                             border      : false,
                                             items: [cmbEsieligible]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 160,
                                             border      : false,
                                             items: [txtPf]
                                        },
                                           { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 240,
                                             border      : false,
                                             items: [txtPfno]
                                        },
					   { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 280,
                                             border      : false,
                                             items: [txtUan]
                                        },
                                           { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 400,
                                             y           : 320,
                                             border      : false,
                                             items: [txtEsino]
                                        },
	              {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:150,
	    		width	:5600,
	    		x	:400,
	    		y	:200,
	    		border	:false,
	    		items:[empDOJ]
	    		},            
                           
  ],
                    },
                                      
  
                 		
			 {
                     xtype: 'panel',
                     title: 'EARNINGS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                       items:[
      
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 0,
                                             y           : 0,
                                             border      : false,
                                             items: [txtGross]
                                        },
                                        
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 0,
                                             y           : 50,
                                             border      : false,
                                             items: [txtPfsal]
                                        },
                                        
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 0,
                                             y           : 100,
                                             border      : false,
                                             items: [txtEsisal]
                                        },
                                        
                                             { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 0,
                                             border      : false,
                                             items: [txtBasicpay]
                                        },
                                                { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 50,
                                             border      : false,
                                             items: [txtDa]
                                        },
                                                { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 100,
                                             border      : false,
                                             items: [txtHra]
                                        },
                                                { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 150,
                                             border      : false,
                                             items: [txtTa]
                                        },
                                        
                                             { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 200,
                                             border      : false,
                                             items: [txtMedical]
                                        },
                                             { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 100,
                                             width       : 250,
                                             x           : 300,
                                             y           : 250,
                                             border      : false,
                                             items: [txtOther]
                                        },
                                             { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 250,
                                             x           : 550,
                                             y           : 290,
                                             border      : false,
                                             items: [txtGrossrs]
                                        },
 
                     ],
			},
			 {
                     xtype: 'panel',
                     title: 'STANDARD DEDUCTIONS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                      items:[
      
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 75,
                                             border      : false,
                                             items: [txtPfamount]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 175,
                                             border      : false,
                                             items: [txtIt]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 120,
                                             border      : false,
                                             items: [txtEsi]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 225,
                                             border      : false,
                                             items: [txtLic]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 285,
                                             border      : false,
                                             items: [txtRd]
                                        },
            ]
			},
			 {
                     xtype: 'panel',
                     title: 'BANK ACCOUNT DETAILS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     items:[
      
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 75,
                                             border      : false,
                                             items: [cmbBankname]
                                        },
                                        
                                         { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 125,
                                             border      : false,
                                             items: [txtBankacc]
                                        },
 					  { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 175,
                                             border      : false,
                                             items: [txtBankifsc]
                                        },
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 150,
                                             width       : 560,
                                             x           : 0,
                                             y           : 225,
                                             border      : false,
                                             items: [txtBankmail]
                                        },
                       ],
			},
			 {
                     xtype: 'panel',
                     title: 'EMPLOYEE STATUS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                      items:[
      
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 200,
                                             width       : 600,
                                             x           : 0,
                                             y           : 40,
                                             border      : false,
                                             items: [cmbEmpwork]
                                        },
                                        ],
                      
			},
			 {
                     xtype: 'panel',
                     title: 'OTHERS',bodyStyle:{"background-color":"#ebebdf"},
                     layout: 'absolute',
                     
                      items:[
      
					{ 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 230,
                                             width       : 400,
                                             x           : 0,
                                             y           : 40,
                                             border      : false,
                                             items: [txtInterview]
                                        },
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 230,
                                             width       : 400,
                                             x           : 0,
                                             y           : 80,
                                             border      : false,
                                             items: [txtPre]
                                        },
                                         { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 230,
                                             width       : 400,
                                             x           : 0,
                                             y           : 120,
                                             border      : false,
                                             items: [txtAppoint]
                                        },
                                        
                                        { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 230,
                                             width       : 400,
                                             x           : 0,
                                             y           : 160,
                                             border      : false,
                                             items: [txtPrevious]
                                        },
                                        
                                          { 
                                             xtype       : 'fieldset',
                                             title       : '',
                                             labelWidth  : 80,
                                             width       : 250,
                                             x           : 400,
                                             y           : 160,
                                             border      : false,
                                             items: [txtIe]
                                        },
                       {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:230,
	    		width	:600,
	    		x	:0,
	    		y	:210,
	    		border	:false,
	    		items:[cmbOt]
	    		},
	    		
	    	  {
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:230,
	    		width	:530,
	    		x	:0,
	    		y	:270,
	    		border	:false,
	    		items:[cmbWorking]
	    		},
	    		
                                       
                                        
                                        ],
                      
			},
			
			
                      ],  
                      
                      
                       
                                        
                      

 	});
                	
    var EmpPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'EMPLOYEE DETAILS ENTRY',
    header      : true,
    width       :500,
    height      : 60,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : true,
    id          : 'EmpPanel',
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
                    handler: function(){	
                            Empwindow.hide();
                        }
   

                    
                }]
        },
               
                
    		items:[
    		{
    		xtype	:'fieldset',
    		title	:'',
    		width	:1000,
    		height	:150,
    		x	:10,
    		y	:10,
    		border	:true,
    		layout	:'absolute',
    		
    		items:[
    		
    		

    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:300,
	    		x	:10,
	    		y	:20,
	    		border	:false,
	    		items:[txtEmpcode]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:450,
	    		x	:10,
	    		y	:60,
	    		border	:false,
	    		items:[txtEmpname]
	    		},
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:450,
	    		x	:10,
	    		y	:100,
	    		border	:false,
	    		items:[txtAAdhaar]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:300,
	    		x	:350,
	    		y	:60,
	    		border	:false,
	    		items:[txtEmploc]
	    		},
	    		
	    		{
	    		xtype	:'fieldset',
	    		title	:'',
	    		labelWidth:130,
	    		width	:300,
	    		x	:350,
	    		y	:20,
	    		border	:false,
	    		items:[txtScode]
	    		},optEmpstatus,  
	    		
	    	
	    	],
	    	},
	  
	    	tabEmpdetails,	
	    		],
 });
 var Empwindow = new Ext.Window({
	height      : 800,
        width       : 1200,
        x	     :0,
        y           : 0,
        title       :'EMPLOYEE MASTER',
        items       : 'EmpPanel',
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
             
            Empwindow.show();  
             


        });      
  
