Ext.onReady(function(){
   Ext.QuickTips.init();
 
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4);  
   var repmonth = "";
   var repparty = "";

    var rmon ='';
    var mdays = 0;
    var yr=0;

var loadFundPaidDatasore = new Ext.data.Store({
  id: 'loadFundPaidDatasore',
  autoLoad:true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFundsPlan.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadFundPaidDetails"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
'fp_ilc_paid', 'fp_dpda_paid', 'fp_gst_paid', 'fp_salary_paid', 'fp_eb_paid', 'fp_wp_paid', 'fp_biomass_paid',
 'fp_duty_paid', 'fp_chemicals_paid', 'fp_coal_paid', 'fp_emi_paid', 'fp_spares_paid', 'fp_total_paid'
  ])
});



   var txtILC = new Ext.form.NumberField({
        fieldLabel  : 'ILC',
        id          : 'txtILC',
        name        : 'txtILC',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,

	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDP_DA.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
        } 

    });

   var txtDP_DA = new Ext.form.NumberField({
        fieldLabel  : 'DP_DA',
        id          : 'txtDP_DA',
        name        : 'txtDP_DA',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
     	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtGST.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtGST = new Ext.form.NumberField({
        fieldLabel  : 'GST',
        id          : 'txtGST',
        name        : 'txtGST',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
 	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSalary.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtSalary = new Ext.form.NumberField({
        fieldLabel  : 'SALARY',
        id          : 'txtSalary',
        name        : 'txtSalary',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtEB.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtEB = new Ext.form.NumberField({
        fieldLabel  : 'EB',
        id          : 'txtEB',
        name        : 'txtEB',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtWP.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtWP = new Ext.form.NumberField({
        fieldLabel  : 'WP',
        id          : 'txtWP',
        name        : 'txtWP',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtBioMass.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtBioMass = new Ext.form.NumberField({
        fieldLabel  : 'BIO MASS',
        id          : 'txtBioMass',
        name        : 'txtBioMass',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtDuty.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtDuty = new Ext.form.NumberField({
        fieldLabel  : 'DUTY',
        id          : 'txtDuty',
        name        : 'txtDuty',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtChemical.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });


   var txtChemical = new Ext.form.NumberField({
        fieldLabel  : 'CHEMICALS',
        id          : 'txtChemical',
        name        : 'txtChemical',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtCoal.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });

   var txtCoal = new Ext.form.NumberField({
        fieldLabel  : 'COAL',
        id          : 'txtCoal',
        name        : 'txtCoal',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtEMI.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });

   var txtEMI = new Ext.form.NumberField({
        fieldLabel  : 'EMI',
        id          : 'txtEMI',
        name        : 'txtEMI',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
         specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  txtSpares.focus();
             }
             },
	    keyup: function () {
                 grid_tot();
            }
         } 
    });

   var txtSpares = new Ext.form.NumberField({
        fieldLabel  : 'SPARES',
        id          : 'txtSpares',
        name        : 'txtSpares',
        width       :  80,
//	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '14px','font-weight':'bold'
		},
        decimalPrecision: 2,
        enableKeyEvents: true,
        listeners:{
	    keyup: function () {
                 grid_tot();
            }
         } 
    });

   var txtTotal = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtTotal',
        name        : 'txtTotal',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '15px','font-weight':'bold'
		},
        decimalPrecision: 2,
    });


var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});


function loaddata()
{

	loadFundPaidDatasore.removeAll();
	loadFundPaidDatasore.load({
		url:'ClsFundsPlan.php',
		params:
		{
			task:"loadFundPaidDetails",
			repdate : Ext.util.Format.date(dpt_Paid.getValue(),"Y-m-d"),

		},
		callback:function()
		{

                    txtILC.setRawValue();
                    txtDP_DA.setRawValue();
                    txtGST.setRawValue();
                    txtSalary.setRawValue();
                    txtEB.setRawValue();
                    txtWP.setRawValue();
                    txtBioMass.setRawValue();
                    txtDuty.setRawValue();
                    txtChemical.setRawValue();
                    txtCoal.setRawValue();
                    txtEMI.setRawValue();
                    txtSpares.setRawValue();
                    txtTotal.setRawValue();

                    var cnt=loadFundPaidDatasore.getCount();


	            if(cnt>0)
		    {    
     
                    if (loadFundPaidDatasore.getAt(0).get('fp_ilc_paid') > 0)
                    txtILC.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_ilc_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_dpda_paid') > 0)
                    txtDP_DA.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_dpda_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_salary_paid') > 0)
                    txtGST.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_gst_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_salary_paid') > 0)
                    txtSalary.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_salary_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_eb_paid') > 0)
                    txtEB.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_eb_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_wp_paid') > 0)
                    txtWP.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_wp_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_biomass_paid') > 0)
                    txtBioMass.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_biomass_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_duty_paid') > 0)
                    txtDuty.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_duty_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_ilc_paid') > 0)
                    txtChemical.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_chemicals_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_ilc_paid') > 0)
                    txtCoal.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_coal_paid')), '0.00');
                    if (loadFundPaidDatasore.getAt(0).get('fp_emi_paid') > 0)
                    txtEMI.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_emi_paid')), '0.00');
if (Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_spares_paid')) > 0)
                    txtSpares.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_spares_paid')), '0.00');
                    txtTotal.setRawValue(Ext.util.Format.number(loadFundPaidDatasore.getAt(0).get('fp_total_paid')), '0.00');


                    } 
                    else
                    {
                         alert("Data Not Available ...");
                    }    
		}
	});
}


    var dpt_Paid = new Ext.form.DateField({
	fieldLabel: ' Date',
        id: 'dpt_Paid',
	format: 'd-m-Y',
        width       : 140,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date() ,
	style: {
		    'color':'#900C3F ',readOnly:true,'text-align': 'left',
		    'style': 'Helvetica',
		    'font-size': '15px','font-weight':'bold'
		},
        enableKeyEvents: true,
        listeners:{
	    keyup: function () {
                 loaddata();
            },
	    change: function () {
                 loaddata();
            },
	    blur: function () {
                 loaddata();
            },

         }  
    });



 var loadFundPlanningDataStore = new Ext.data.Store({
      id: 'loadFundPlanningDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFundsPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadFundPlanDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[
'fp_date','fp_date2','fp_ilc','fp_dpda','fp_gst','fp_salary','fp_eb', 'fp_wp','fp_biomass','fp_duty','fp_chemicals',
'fp_coal','fp_emi', 'fp_spares','fp_total',
 ]),
    });
//save
var btnSave = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "SAVE",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
   		var gstSave;
                   gstSave="true";
        	   if (txtTotal.getValue()==0 )
        	   {
        	        Ext.Msg.alert('Funds Plan','Details Not Available.....');
        	        gstSave="false";
        	   }
      	           else
		   { 
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
                            url: 'TrnFundPaidSave.php',
                            params :
                             {
               			repdate   : Ext.util.Format.date(dpt_Paid.getValue(),"Y-m-d"),
                                ilc       : txtILC.getValue(),
                                dpda      : txtDP_DA.getValue(),
                                gst       : txtGST.getValue(),
                                salary    : txtSalary.getValue(),
                                eb        : txtEB.getValue(),
                                wp        : txtWP.getValue(),
                                biomass   : txtBioMass.getValue(),
                                duty      : txtDuty.getValue(),
                                chemical  : txtChemical.getValue(),
                                coal      : txtCoal.getValue(),
                                emi       : txtEMI.getValue(),
                                spares    : txtSpares.getValue(),
                                total1    : txtTotal.getValue(),
				},
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true")
					{                                
                                    Ext.MessageBox.alert("Funds Plan Saved -" + obj['msg']);
                           
                                    IndentFormPanel.getForm().reset();
                                    flxFundsPlan.getStore().removeAll();
                                    RefreshData();
                                    }else
					{
Ext.MessageBox.alert("Funds Plan Not Saved! Pls Check!- " + obj['msg']);                                                  
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
});






 var printtype = "PDF";

 var loadArrivalsDatastore = new Ext.data.Store({
      id: 'loadArrivalsDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFundsPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'rmonth' ,'grnqty',  'purvalue'


      ]),
    });


 var loadPartyPurchaseDataStore = new Ext.data.Store({
      id: 'loadPartyPurchaseDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFundsPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartywisePurchases"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['sup_code','sup_name', 'grnqty', 'purvalue']),
    });


 var loadGRNDataStore = new Ext.data.Store({
      id: 'loadGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFundsPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyMonthArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_sup_code','rect_item_code'
]),
    });


 var loadItemDataStore = new Ext.data.Store({
      id: 'loadItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFundsPlan.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPartyItemArrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['itmh_name','rect_item_code','rect_grnqty','rect_itemvalue'
]),
    });





var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
	style: {
            'color':'#001a66',readOnly:true,
            'style': 'Helvetica',
            'font-size': '14px','font-weight':'bold'
        },

    items: [
    {
        xtype: 'radiogroup',
        columns: 3,
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
		{boxLabel: 'Excel', name: 'optprinttype', id:'optExcel', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						printtype="XLS";


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



function grid_tot()
{
    var tot1 = 0;
    tot1 = Number(txtILC.getValue()) +
           Number(txtDP_DA.getValue()) + 
           Number(txtGST.getValue()) + 
           Number(txtSalary.getValue()) + 
           Number(txtEB.getValue()) + 
           Number(txtWP.getValue()) + 
           Number(txtBioMass.getValue()) + 
           Number(txtDuty.getValue()) + 
           Number(txtChemical.getValue()) + 
           Number(txtCoal.getValue()) + 
           Number(txtEMI.getValue()) + 
           Number(txtSpares.getValue()); 

;
      
    txtTotal.setRawValue(Ext.util.Format.number(Number(tot1), '0.00'));
}



var dgrecord = Ext.data.Record.create([]);


   var tabOverall = new Ext.TabPanel({
    id          : 'tabOverall',
    xtype       : 'tabpanel',
     bodyStyle: {"background-color": "#0C5DA9"},
        style: {
            'color': 'white',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
    activeTab   : 0,
    height      : 600,
    width       : 1500,
    items       : [
    {
        xtype: 'panel',
        title: 'FUNDS DATWISE PAID',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
{ 
			xtype   : 'fieldset',
//			title   : '',
//			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 250,
			layout  : 'absolute',
			x       : 920,
			y       : 5,
			items:[optprinttype],
		},


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
		             x       : 300,
			     y       : 50,
                             width   : 300,
                             items: [dpt_Paid]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 450,
			     y       : 12,
                             items: [btnSave]
                        },




			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 100,
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 90,
                             items: [txtILC]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 120,
                             labelWidth  : 100,

                             items: [txtDP_DA]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 150,
                             labelWidth  : 100,

                             items: [txtGST]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 180,
                             labelWidth  : 100,

                             items: [txtSalary]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 210,
                             labelWidth  :100,

                             items: [txtEB]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 240,
                             labelWidth  : 100,

                             items: [txtWP]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 270,
                             labelWidth  : 100,

                             items: [txtBioMass]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 300,
                             labelWidth  : 100,

                             items: [txtDuty]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 330,
                             labelWidth  : 100,

                             items: [txtChemical]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 360,
                             labelWidth  :100,

                             items: [txtCoal]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 390,
                             labelWidth  : 100,

                             items: [txtEMI]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 420,
                             labelWidth  : 100,

                             items: [txtSpares]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 300,
                             width   : 300,
			     y       : 460,
                             labelWidth  : 100,

                             items: [txtTotal]
                        },
        ],
    },
    {    
        xtype: 'panel',
        title: '',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
        ],
    }  ,

    ]  
});

    function Refreshdata()
    {

       


    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'FUNDS PAID',
        items       : tabOverall,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
                   Refreshdata();

   		}
			
	}
    });
    ReppreprintWindow.show();  
});
