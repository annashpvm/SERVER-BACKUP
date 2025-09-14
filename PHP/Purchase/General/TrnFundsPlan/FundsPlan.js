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

   var txtTotILC = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtTotILC',
        name        : 'txtTotILC',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotDP_DA = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotDP_DA',
        name        : 'txtTotDP_DA',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotGST = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotGST',
        name        : 'txtTotGST',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotSalary = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSalary',
        name        : 'txtTotSalary',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotEB = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotEB',
        name        : 'txtTotEB',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotWP = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotWP',
        name        : 'txtTotWP',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotBioMass = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotBioMass',
        name        : 'txtTotBioMass',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotDuty = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotDuty',
        name        : 'txtTotDuty',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


   var txtTotChemical = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotChemical',
        name        : 'txtTotChemical',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotCoal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotCoal',
        name        : 'txtTotCoal',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotEMI = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotEMI',
        name        : 'txtTotEMI',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotSpares = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotSpares',
        name        : 'txtTotSpares',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });

   var txtTotTotal = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtTotTotal',
        name        : 'txtTotTotal',
        width       :  80,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


var lblDetail1 = new Ext.form.Label({
    fieldLabel  : '',
    id          : 'lblDetail1',
    width       : 400,
    labelStyle  : "font-size:14px;font-weight:bold;color:#0080ff",
});

    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
    });

    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'To Date',
        id: 'monthenddate',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	format: 'd-m-Y',
        value: new Date()   
    });


    var dt = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'dt',
	format: 'd-m-Y',
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        value: new Date()   
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

function process_data()
{

    var fdate = monthstartdate.getValue();
    var edate = monthenddate.getValue();

    var dt = new Date();


	loadFundPlanningDataStore.removeAll();
	loadFundPlanningDataStore.load({
	 url: 'ClsFundsPlan.php',
                params: {
	    	task: 'loadFundPlanDetails',

                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
		},

		callback:function()
		{


                   var cnt=loadFundPlanningDataStore.getCount();
                   if(cnt == 00)
                   {

      var i =0;     
      while (i < mdays) {
           offset = i * 24 * 60 * 60 * 1000
           dt  = new Date(fdate.getTime() + offset)





                               var RowCnt = flxFundsPlan.getStore().getCount() + 1;  
                               flxFundsPlan.getStore().insert(
                               flxFundsPlan.getStore().getCount(),
                                  new dgrecord({


	                                  fp_date     : Ext.util.Format.date(dt,"Y-m-d"), 
	                                  fp_date2    : Ext.util.Format.date(dt,"d-m-Y"), 
			                  fp_ilc      : '' ,
					  fp_dpda    : '' ,
					  fp_gst      : '',
					  fp_salary   : '',
					  fp_eb       : '',
					  fp_wp       : '',
                                          fp_biomass  : '', 
					  fp_duty     : '',
	                                  fp_chemicals: '',
			                  fp_coal     : '',
					  fp_emi      : '',
                                          fp_spares   : '',
					  fp_total    : '0',

                                   })
                                );

           i = i +1;
                          
      }

                }loadFundPlanningDataStore
                   grid_tot();
		}
	    }); 

}

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
        	   if (txtTotTotal.getValue()==0 )
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

                           
                         
                           var fundData = flxFundsPlan.getStore().getRange();                                        
                           var fundupData = new Array();
                            Ext.each(fundData, function (record) {
                                fundupData.push(record.data);
                            });
                            Ext.Ajax.request({
                            url: 'TrnFundPlanSave.php',
                            params :
                             {
                             	griddet	  : Ext.util.JSON.encode(fundupData),                         
                                cnt       : fundData.length,   
               			stdate   : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"),
		         	eddate   : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
  //                              savetype  : gstFlag,                                
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





var btnPrint = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "FUND PLAN PRINT",
	width   : 90,
	height  : 35,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
              var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
              var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	

              var mmon = "&mmon=" + encodeURIComponent(cmbMonth.getRawValue() );	

	      var param =(fromdate+todate+mmon);
             window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFundPlan.rptdesign&__format=pdf&' + param, '_blank'); 


       	 }
        }   
});


var btnPrint2 = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "FUND PENDING PRINT",
	width   : 90,
	height  : 35,
//        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
              var fromdate = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"));	
              var todate = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));	

	              var mmon = "&mmon=" + encodeURIComponent(cmbMonth.getRawValue() );	

	      var param =(fromdate+todate+mmon);
             window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurFundPlan_paid.rptdesign&__format=pdf&' + param, '_blank'); 


       	 }
        }   
});


     var cmbMonth= new Ext.form.ComboBox({
        id: 'cmbMonth',
        typeAhead: true,
        mode: 'local',
        displayField: 'field2',
        valueField: 'field1',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'MONTH',
        editable:false,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        store: [[1,'JANUARY'],[2,'FEBRUARY'],[3,'MARCH'],[4,'APRIL'],['5','MAY'],['6','JUNE'],
['7','JULY'],['8','AUGUST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){

                  find_dates(cmbMonth.getValue());         
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


		flxFundsPlan.getSelectionModel().selectAll();
		var rows = flxFundsPlan.getSelectionModel().getCount();
		var plan = flxFundsPlan.getSelectionModel().getSelections();

                var  tILC = 0;
                var  tDPDA = 0;
                var  tGST = 0;
                var  tSALARY = 0;
                var  tEB = 0;
                var  tWP = 0;
                var  tBIOMASS = 0;
                var  tDUTY = 0;
                var  tCHEMICAL = 0;
                var  tCOAL = 0;
                var  tEMI = 0;
                var  tSPARE = 0;
                var  tTOTAL = 0;
                 

		for (var i = 0; i < rows ; i++) {

   	 	    ilc     =  Number(plan[i].data.fp_ilc);
                    dp_da   =  Number(plan[i].data.fp_dpda);
   	 	    gst     =  Number(plan[i].data.fp_gst);
                    salary  =  Number(plan[i].data.fp_salary);
   	 	    eb      =  Number(plan[i].data.fp_eb);
                    wp      =  Number(plan[i].data.fp_wp);
   	 	    biomass =  Number(plan[i].data.fp_biomass);
                    duty    =  Number(plan[i].data.fp_duty);
   	 	    chemicals=  Number(plan[i].data.fp_chemicals);
                    coal    =  Number(plan[i].data.fp_coal);
                    emi     =  Number(plan[i].data.fp_emi);
                    spares  =  Number(plan[i].data.fp_spares);


                      
      //              total1 = Number(ilc)+Number(dp_da)+Number(gst)+Number(salary)+Number(eb)+Number(wp)+Number(biomass)+Number(duty)+Number(chemicals)+Number(coal)+Number(emi)+Number(spares);

               total1 = Number(ilc)+Number(dp_da)+Number(gst)+Number(salary)+Number(eb)+Number(wp)+Number(biomass)+Number(duty)+Number(chemicals)+Number(coal)+Number(emi)+Number(spares);


                    plan[i].set('fp_total', Ext.util.Format.number(Number(total1), '0.00') );


                tILC = Number(tILC)+ Number(ilc) ;
                tDPDA = Number(tDPDA)+ Number(dp_da) ;
                tGST = Number(tGST)+ Number(gst) ;
                tSALARY = Number(tSALARY)+ Number(salary) ;
                tEB = Number(tEB)+ Number(eb) ;
                tWP = Number(tWP)+ Number(wp) ;
                tBIOMASS = Number(tBIOMASS)+ Number(biomass) ;
                tDUTY = Number(tDUTY)+ Number(duty) ;
                tCHEMICAL = Number(tCHEMICAL)+ Number(chemicals) ;
                tCOAL = Number(tCOAL)+ Number(coal) ;
                tEMI = Number(tEMI)+ Number(emi) ;
                tSPARE = Number(tSPARE)+ Number(spares) ;
                tTOTAL = Number(tTOTAL)+ Number(total1) ;
                 
                txtTotILC.setRawValue(Ext.util.Format.number(tILC ,'0.00')) ;  
                txtTotDP_DA.setRawValue(Ext.util.Format.number(tDPDA ,'0.00')) ;  
                txtTotGST.setRawValue(Ext.util.Format.number(tGST ,'0.00')) ;  
                txtTotSalary.setRawValue(Ext.util.Format.number(tSALARY ,'0.00')) ;  
                txtTotEB.setRawValue(Ext.util.Format.number(tEB ,'0.00')) ;  
                txtTotWP.setRawValue(Ext.util.Format.number(tWP ,'0.00')) ;  
                txtTotBioMass.setRawValue(Ext.util.Format.number(tBIOMASS ,'0.00')) ;  
                txtTotDuty.setRawValue(Ext.util.Format.number(tDUTY ,'0.00')) ;  
                txtTotChemical.setRawValue(Ext.util.Format.number(tCHEMICAL ,'0.00')) ;  
                txtTotCoal.setRawValue(Ext.util.Format.number(tCOAL ,'0.00')) ;  
                txtTotEMI.setRawValue(Ext.util.Format.number(tEMI ,'0.00')) ;  
                txtTotSpares.setRawValue(Ext.util.Format.number(tSPARE ,'0.00')) ;  
                txtTotTotal.setRawValue(Ext.util.Format.number(tTOTAL ,'0.00')) ;  
      

                }


}


var flxFundsPlan = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:50,
    y:50,
    height: 390,
    width: 1300,
    id: 'my-grid',  

    columns:
    [ 	 
	


        {header: "Date",  dataIndex: 'fp_date',sortable:false,width:100,align:'center',hidden : true , },
        {header: "Date",  dataIndex: 'fp_date2',sortable:false,width:100,align:'center'  },
        {header: "ILC"  , dataIndex: 'fp_ilc',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "DP/DA"  , dataIndex: 'fp_dpda',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                  blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "GST"  , dataIndex: 'fp_gst',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   

        },
        {header: "SALARY"  , dataIndex: 'fp_salary',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "EB"  , dataIndex: 'fp_eb',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "WP"  , dataIndex: 'fp_wp',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }

           }   
        },
        {header: "BIOMASS"  , dataIndex: 'fp_biomass',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "DUTY/LINEAR"  , dataIndex: 'fp_duty',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "CHEMICALS"  , dataIndex: 'fp_chemicals',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "COAL"  , dataIndex: 'fp_coal',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "EMI"  , dataIndex: 'fp_emi',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "SPARES"  , dataIndex: 'fp_spares',sortable:false,width:90,align:'right',
           editor:{
	       xtype:'numberfield',
               allowBlank: true,
               enableKeyEvents: true,
               decimalPrecision: 2,
	       listeners:{
                  keyup: function () {
		       grid_tot()
		   },
                    blur: function () {
		       grid_tot()
		   }  
                }
           }   
        },
        {header: "TOTAL"  , dataIndex: 'fp_total',sortable:false,width:90,align:'right'},

     
  
    ],

    store:loadFundPlanningDataStore,
    listeners:{	


     
    }

});
function find_dates(mmon)
{
    rmon ='';
    mdays = 0;
    yr=0;
    
    if (mmon < 4)
    {
       yr = yrto;
    }   
    else
    {
       yr = yrfrom;
    }   
 

    if (mmon == 1 ||  mmon == 3 || mmon == 5 || mmon == 7 || mmon == 8 || mmon == 10 || mmon == 12)
    {   
        mdays = 31;
    }
    else 
    {
       if (mmon ==  4 || mmon == 6 || mmon == 9 || mmon == 11 )
       { 
           mdays = 30;
       }
       else
       { 
          if (mmon == 2 && yr%4 == 0)
          {
              mdays = 29;
          } 
          else
          {   
              mdays = 28;
          } 
       }
    } 

    rmon = ("0"+mmon).slice(-2);
    monthstartdate.setValue(yr+"-"+rmon+"-01");


    var curday  = Ext.util.Format.date(new Date(),"d");
    var curmon  = Ext.util.Format.date(new Date(),"m");


   // if (Number(curmon) == Number(mmon))
//       mdays = curday;




    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);


 


   process_data();
    
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
        title: 'FUNS PLAN',
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
			x       : 1000,
			y       : 5,
			items:[optprinttype],
		},

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 10,
                             width   : 300,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 10,
                             width   : 300,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 10,
                             width   : 300,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 12,
                             items: [btnSave]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 200,
                             border  : false,
		             x       : 810,
			     y       : 12,
                             items: [btnPrint]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 200,
                             border  : false,
		             x       : 810,
			     y       : 42,
                             items: [btnPrint2]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
                             width   : 1300,
			     y       : 80,
                             items: [flxFundsPlan]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
                             width   : 300,
			     y       : 500,
                             items: [txtTotILC]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 197,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotDP_DA]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 290,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotGST]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 385,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotSalary]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 473,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotEB]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 564,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotWP]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 653,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotBioMass]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 743,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotDuty]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 830,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotChemical]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 923,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotCoal]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 1011,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotEMI]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 1103,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotSpares]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 1200,
                             width   : 300,
			     y       : 500,
                             labelWidth  : 1,

                             items: [txtTotTotal]
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
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        m1 = parseInt(m1);
        cmbMonth.setValue(m1);
        find_dates(m1);

    }  
   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
        title       : 'FUNDS PLANNING',
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
