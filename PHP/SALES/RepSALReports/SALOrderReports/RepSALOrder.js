Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var printtype='PDF';

   var usertype = localStorage.getItem('ginuser');
   var UserName = localStorage.getItem('ginusername');
   var UserId   = localStorage.getItem('ginuserid');


   var soopt = 0;

 var repoption = 1;

var stkprint = 'A';  

var optStockPrtOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:100,

    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 1,
        rows : 3,
        id: 'optStockPrtOption',
        items: [
           {boxLabel: 'All Reels', name: 'optStockPrtOption', id:'optStockAllReels', inputValue: 1,checked:true, 
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     stkprint = 'A';  
                    
                  }
               }
              }
            },
            {boxLabel: 'Full Reels', name: 'optStockPrtOption', id:'optStockFullReels', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stkprint = 'F';  
                
               }
              }
             }},

            {boxLabel: 'Bit Reels', name: 'optStockPrtOption', id:'optStockBitReels', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stkprint = 'B';                  
               }
              }
             }},            
            ]
             }
             ]
             });


 var loadRepListDatastore = new Ext.data.Store({
      id: 'loadRepListDatastore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/TrnSalesDespTarget/ClsTrnSalesDespatchTarget.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRepresentative"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'repr_code', 'repr_name'
 
      ]),
    });



var cmbRepresentative = new Ext.form.ComboBox({
        fieldLabel      : 'REPRESENTATIVE',
        width           :  220,
        displayField    : 'repr_name', 
        valueField      : 'repr_code',
        hiddenName      : '',
        id              : 'cmbRepresentative',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRepListDatastore,
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
        select: function(){
                        
	}
	}
});


 var loadOrderDespatch = new Ext.data.Store({
      id: 'loadOrderDespatch',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsOrderStatement.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"dataload"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
      ]),
    });


 var loadgeneral = new Ext.data.Store({
      id: 'loadgeneral',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadrepno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 'seqno','repno'

      ]),
    });

 var cmbstrepno = new Ext.form.ComboBox({
        fieldLabel      : 'No.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbstrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadgeneral,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });

 var cmbedrepno = new Ext.form.ComboBox({
        fieldLabel      : 'To.',
        width           : 100,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbedrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadgeneral,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });

var dtpstdate = new Ext.form.DateField({
    fieldLabel : 'From',
    id         : 'dtpstdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});

var dtpeddate = new Ext.form.DateField({
    fieldLabel : 'To',
    id         : 'dtpeddate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
   
    listeners:{
            change:function(){

            }
    }
});


var optprinttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    border: false,
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

 var Rpttype="Datewise";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:800,
    height:250,
    x:20,
    y:10,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
 //       rows : 12,
        id: 'optRpttype',
        items: [
		{boxLabel: 'Datewise Pending Order Details', name: 'optRpttype', id:'optorder8', inputValue: 8,checked:true, inputValue: 1,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Datewise";
                                         	repoption = 13;			 						

					}
				}
			}
		},
		{boxLabel: 'Partywise Order /Finished/Despatch Details', name: 'optRpttype', id:'optorder1', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="Partywise1";
                                         	repoption = 1;			 						

					}
				}
			}
		},
		{boxLabel: 'Partywise Order /Finished/Despatch/Pending Order', name: 'optRpttype', id:'optorder2', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="RepPendingOrder";			 						
                                         	repoption = 2;
					}
				}
			}
		},
		{boxLabel: 'Area Order /Finished/Despatch/Pending Order', name: 'optRpttype', id:'optorder3', inputValue: 4,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AreawiseOrder";			 						
                                         	repoption = 3;
					}
				}
			}
		},
		{boxLabel: 'Qualitywise Order /Finished/Despatch/Pending Order', name: 'optRpttype', id:'optorder4', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="QlywiseOrder";			 						
                                         	repoption = 4;
					}
				}
			}
		},
/*
		{boxLabel: 'REP-Partywise Production Pending ', name: 'optRpttype', id:'optorder5', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="PartywiseProdnPending";			 				               	repoption = 5;
					}
				}
			}
		},


		{boxLabel: 'Area-Partywise Production Pending ', name: 'optRpttype', id:'optorder12', inputValue: 7,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AreawiseProdnPending";			 				               	repoption = 12;
					}
				}
			}
		},
*/
		{boxLabel: 'Datewise Production Pending ', name: 'optRpttype', id:'optorder6', inputValue: 8,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="DatewiseProdnPending";			 				               	repoption = 6;
					}
				}
			}
		},

		{boxLabel: 'Order and Despatch Date ', name: 'optRpttype', id:'optorder7', inputValue: 9,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="OrderDespDate";			 				               	repoption = 7;
					}
				}
			}
		},

                        
    		{boxLabel: 'Godown to SO Auto Moved List ', name: 'optRpttype', id:'optorder9', inputValue: 10,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					Rpttype="GodowntoSO";			 				               	repoption = 9;
					}
				}
			}
		},  

    		{boxLabel: 'Monthwise Order Abstract ', name: 'optRpttype', id:'optorder10', inputValue: 11,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					Rpttype="monthwiseorder";			 				               	repoption = 10;
					}
				}
			}
		},  
        	{boxLabel: 'Repwise Order & Average Rate', name: 'optRpttype', id:'optorder11', inputValue: 12,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
					Rpttype="avgrate";			 				               	repoption = 11;
					}
				}
			}
		},     



		{boxLabel: 'REP-Partywise Production Pending', name: 'optRpttype', id:'optorder15', inputValue: 6,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="PartywiseProdnPendingNew";			 				               	repoption = 15;
					}
				}
			}
		},



		{boxLabel: 'Area-Partywise Production Pending', name: 'optRpttype', id:'optorder16', inputValue: 7,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="AreawiseProdnPendingNew";			 				               	repoption = 16;
					}
				}
			}
		},

           
        ],
    }



    ]
});
 
var tabsalstmt = new Ext.TabPanel({
    	id          : 'SALSTMT',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 275,
	width       : 900,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            title: 'Order Reports',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype ,


		]
	},


	]
});

   
var RepGeneralFormPannel = new Ext.FormPanel({
	renderTo    : Ext.getBody(),
	xtype       : 'form',
	title       : 'Order Reports',
	header      : false,
	width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
	height      : 650,
	x           : 0,
	y           : 0,
	frame       : false,
	id          : 'RepGeneralFormPannel',
	method      : 'POST',
	layout      : 'absolute',
	reader: new Ext.data.JsonReader({
		    root:'rows',
		    totalProperty: 'results',
		    id:'id'
		    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #F1F5EA;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [
                 {
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/view.png',
                    listeners:{
                      click: function () {


//alert(Rpttype);
			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&fincode=" + encodeURIComponent(GinFinid);
			var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));

			var p6 = "&reelopt=" + encodeURIComponent(stkprint);


			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
			else
			{
			    if (Rpttype == "Partywise1" || Rpttype == "RepPendingOrder" ) {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);
 		                var param = (p1+p2+p3+p4+p5+p6) ;				
		                if (printtype == "PDF") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartywiseOrderStatus.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartywiseOrderStatus.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartywiseOrderStatus.rptdesign' + param, '_blank');

			    }
			    else if (Rpttype == "Datewise" ) {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);
 		                var param = (p1+p2+p3+p4) ;	
//alert(param)			
		                if (printtype == "PDF") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseOrderStatus.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseOrderStatus.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseOrderStatus.rptdesign' + param, '_blank');

			    }
                            else  if (Rpttype == "AreawiseOrder") 
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

 		                var param = (p1+p2+p3+p4+p5+p6) ;
		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreawiseOrderStatus.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreawiseOrderStatus.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreawiseOrderStatus.rptdesign' + param, '_blank');
                            }
                            else  if (Rpttype == "QlywiseOrder" )
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

 		                var param = (p1+p2+p3+p4+p5+p6) ;
		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepQualitywiseOrderStatus.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepQualitywiseOrderStatus.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepQualitywiseOrderStatus.rptdesign' + param, '_blank');
                            }

                            else  if (Rpttype == "PartywiseProdnPending" )
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5+p6+p7) ;


 

		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartyQualitywiseProductionPending.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartyQualitywiseProductionPending.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepPartyQualitywiseProductionPending.rptdesign' + param, '_blank');
                            }
                            else  if (Rpttype == "PartywiseProdnPendingNew" )
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);


                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(rcode);
                            var param = (p1+p2+p3+p4+p5+p6+p7) ;


 
	
		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwisePartywiseProductionPending.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwisePartywiseProductionPending.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwisePartywiseProductionPending.rptdesign' + param, '_blank');
                            }

                      else  if (Rpttype == "AreawiseProdnPending" )
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(0);
                            var param = (p1+p2+p3+p4+p5+p6+p7) ;


 


		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending25022025.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending25022025.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending25022025.rptdesign' + param, '_blank');
                            }

                      else  if (Rpttype == "AreawiseProdnPendingNew" )
                            {
	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(0);
                            var param = (p1+p2+p3+p4+p5+p6+p7) ;


 


		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepAreaPartywiseProductionPending.rptdesign' + param, '_blank');
                            }

                            else  if (Rpttype == "DatewiseProdnPending" )

                            {


                     		var p5 = "&repopt=" + encodeURIComponent(repoption);   	
 		                var param = (p1+p2+p3+p4+p5+p6) ;
		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseProductionPending.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseProductionPending.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepDatewiseProductionPending.rptdesign' + param, '_blank');
                            }

                            else  if (Rpttype == "GodowntoSO" )

                            {

			var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
			var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
			var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));

 		                var param = (p1+p2+p3) ;
		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGodowntoSOlist.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGodowntoSOlist.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepGodowntoSOlist.rptdesign' + param, '_blank');
                            }


                            else  if (Rpttype == "OrderDespDate" )
                            {


				loadOrderDespatch.load({
				url: 'ClsOrderStatement.php',
				params: {
				     task: 'dataload',
				     finid    : GinFinid,
				     compcode : GinCompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
 				},
				callback:function()
				{
	//			     alert(loadOrderDespatch.getCount());
                                        var param = (p3+p4) ;
//alert(param);
			
		                 if (printtype == "PDF") 
	   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderVSdespatch.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderVSdespatch.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepOrderVSdespatch.rptdesign' + param, '_blank');
				}
			    });




	    			var p5 = "&repopt=" + encodeURIComponent(repoption);

 		     

                            }
//annadurai
                            else  if (Rpttype == "monthwiseorder" )
                            {

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(rcode);


                            var param = (p1+p3+p4+p7) ;


 


		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise_Order.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise_Order.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepCustMonthwise_Order.rptdesign' + param, '_blank');
                            }

                            else  if (Rpttype == "avgrate" )
                            {

                            if (cmbRepresentative.getRawValue() == '')
                                rcode = 0;
                            else
                                rcode =  cmbRepresentative.getValue();

          	            var p7 = "&repcode=" + encodeURIComponent(rcode);


                            var param = (p1+p3+p4) ;


 


		                 if (printtype == "PDF") 
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwiseOrderWithAvgRate.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
				   window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwiseOrderWithAvgRate.rptdesign&__format=XLS&' + param, '_blank');
		                  else
				   	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepRepwiseOrderWithAvgRate.rptdesign' + param, '_blank');
                            }
	                }
		     }  
                   }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
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
                    icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
RepgeneralWindow.hide();
                        }
                }]
        },
        items: [
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : false,
			height  : 150,
			width   : 200,
			layout  : 'absolute',
			x       : 900,
			y       : 100,
			items:[optStockPrtOption],

		},

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 350,
			layout  : 'absolute',
			x       : 180,
			y       : 10,
			items:[optprinttype],

		},
		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 300,
			width   : 850,
			layout  : 'absolute',
			x       : 30,
			y       : 70,

			items:[tabsalstmt],
		},

              {
                xtype       : 'fieldset',
                title       : '',
                labelWidth  : 150,
                width       : 500,
                x           : 700,
                y           : 370,
                border      : false,
                items: [cmbRepresentative]
               },


		{ 
			xtype       : 'fieldset',
			title       : '',
			labelWidth  : 50,
			width       : 500,
			x           : 95,
			y           : 390,
			layout  : 'absolute',
			height  : 70,
			style:{ border:'1px solid red'},
			border      : false,
			items: [
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 0,
					y           : 0,
					border      : false,
					items: [dtpstdate]
				},
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 250,
					y           : 0,
					border      : false,
					items: [dtpeddate]
				},
			]
		},
        ],
    });
    
   
    var RepgeneralWindow = new Ext.Window({
	height      : 550,
        width       : 1180,
        y           : 35,
        title       : 'Sales Order Reports',
        items       : RepGeneralFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
onEsc:function(){
},
	listeners:{
               show:function(){


        if (UserName == 'annait' || UserName == 'suganyasal' || UserName == 'jeyasal'   )
        { 
            soopt = 1;

        }
        else   
        { 
            soopt = 0;
        }


	
   		}
			
	}
    });
    RepgeneralWindow.show();  
});
