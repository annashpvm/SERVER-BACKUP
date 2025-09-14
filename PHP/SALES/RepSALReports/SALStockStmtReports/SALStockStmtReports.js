Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');

var UserLogin = localStorage.getItem('ginuserlogin');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');


var btn = new Ext.Button({
    id      : 'btn',
    style   : 'text-align:center;',
    text    : "1",

    width   : 5,
    height  : 5,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

     tabindex : 1,
    listeners:{
       click: function(){
           window.location.href=('http://10.0.0.150/SHVPMB/SALES/TrnSalesDeliveryNote/TrnSalesDeliveryNote.php');   
       }
   }
});       


   var stockopt = 2;
   var stkprint = 'A';   

   var repoption= 'I';   

   var diffMonths = 0; 
   var printtype='PDF';
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


 var loadviewcreate = new Ext.data.Store({
      id: 'loadviewcreate',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"viewcreate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
      ]),
    });

 var loadOpeningClosingStock = new Ext.data.Store({
      id: 'loadOpeningClosingStock',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsStockStatement.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOpeningClosingStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[ 
'IBitOPStkNos','IFullOPStkNos','IIBitOPStkNos','IIFullOPStkNos','IBitOPStkWt',
'IFullOPStkWt','IIBitOPStkWt','IIFullOPStkWt','IBitCLOStkNos','IFullCLOStkNos',
'IIBitCLOStkNos','IIFullCLOStkNos','IBitCLOStkWt','IFullCLOStkWt','IIBitCLOStkWt',
'IIFullCLOStkWt','openingstock','openingnos','closingstock','closingnos'

      ]),
    });


   function check_password()
   {


        if ((UserLogin == 'annait' || UserLogin == 'suganyasal') && txtPassword.getRawValue() == "sales2"  )
        { 
            Ext.getCmp('stkid').setVisible(true);
            Ext.getCmp('btn').setVisible(true);
            Ext.getCmp('optDailyReport').setVisible(true);



        }
        else   
        { 
            Ext.getCmp('stkid').setVisible(false);
            Ext.getCmp('btn').setVisible(false);
            Ext.getCmp('optDailyReport').setVisible(false);
        }  

   }   




   var txtPassword = new Ext.form.TextField({
        fieldLabel  : '',
        id          : 'txtPassword',
        name        : 'txtPassword',
   //     inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  60,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {

            check_password();
          },


           blur:function(){
              check_password();
           },
           keyup:function(){
              check_password();
           },
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

var optStockOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
    id   : 'stkid' ,
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:50,
    x:100,
    y:200,
    border: true,
    items: [
        {
        xtype: 'radiogroup',
        columns: 3,
        rows : 1,
        id: 'optStockOption',
        items: [
           {boxLabel: 'All', name: 'optStockOption', id:'optStockAll', inputValue: 1,
              listeners:{
              check:function(rb,checked){
                  if(checked==true){
                     stockopt  = 1;
                     repoption= 'A';
                  }
               }
              }
            },
            {boxLabel: 'I', name: 'optStockOption', id:'optStock1', inputValue: 2,checked:true, 
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stockopt  = 2;
                     repoption= 'I';
                
               }
              }
             }},

            {boxLabel: 'II', name: 'optStockOption', id:'optStock2', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                     stockopt  = 3;
                     repoption= 'II';
                
               }
              }
             }},            
            ]
             }
             ]
             });



var optStockPrtOption = new Ext.form.FieldSet({
    xtype: 'fieldset',
   
    fieldLabel: '',
    layout : 'hbox',
    width:150,
    height:100,
    x:450,
    y:20,
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

  function datecheck()
  {

     
        var dt_today = new Date();
        var dt_start = dtpstdate.getValue();
        var dt_end   = dtpeddate.getValue();

        diffMonths = dt_end.getMonth() - dt_start.getMonth();

//alert(dt_start.getMonth()+1);
//alert(dt_end.getMonth()+1);

//        if (dt_end.getDate() >=1 )
         diffMonths +=1;


/*

    if(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
alert("1");
            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");

             dtpstdate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));

    }

    if(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") >  Ext.util.Format.date(finenddate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");

             dtpstdate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));

    }


    if(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");
             dtpeddate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));

    }

    if(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") > Ext.util.Format.date(finenddate,"Y-m-d")){

            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");
             dtpeddate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));

    }



    if(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") < Ext.util.Format.date(finstartdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");
             dtpstdate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));
    }



    if(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d") > Ext.util.Format.date(finstartdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","Date is not in current finance year. Please check");
             dtpeddate.setValue(Ext.util.Format.date(dt_today,"d-m-Y"));
    }

*/
      if (Rpttype == "optDailyReport")
         dtpeddate.setValue(dtpstdate.getValue()); 


 }


var dtpstdate = new Ext.form.DateField({
    fieldLabel : 'From',
    id         : 'dtpstdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
    anchor     : '100%',
    width : 100,
          	enableKeyEvents: true,
    listeners:{
            change:function(){
              datecheck();
            },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
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
       	enableKeyEvents: true,   
    listeners:{
            change:function(){
              datecheck();
            },
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
    }
});

 var Rpttype="stkItem";
var optRpttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:350,
    height:220,
    x:20,
    y:20,
    border: false,
    items: [
    {
        xtype: 'radiogroup',
        columns: 1,
        rows : 1,
        id: 'optRpttype',
        items: [
		{boxLabel: 'Size-wise Stock', name: 'optRpttype', id:'optrecDS', inputValue: 1,checked:true,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkItem";

//alert(Rpttype);

					}
				}
			}
		},
		{boxLabel: 'GSM-wise Closing Stock', name: 'optRpttype', id:'optrecSD', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkVarty";

					}
				}
			}
		},
		{boxLabel: 'BF-wise Closing Stock', name: 'optRpttype', id:'optstkbf', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkBF";

					}
				}
			}
		},
		{boxLabel: 'Reel No-wise Closing Stock', name: 'optRpttype', id:'optReelStock', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkReel";

					}
				}
			}
		},
		{boxLabel: 'Reel No-wise Closing Stock - Godown Stock', name: 'optRpttype', id:'optReelStockGodown', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkReelGodown";

					}
				}
			}
		},


		{boxLabel: 'Size - Monthwise Sales', name: 'optRpttype', id:'optReelSales', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optReelSales";

					}
				}
			}
		},

		{boxLabel: 'Stock Pending - Production period', name: 'optRpttype', id:'optStockPending', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optStockPending";

					}
				}
			}
		},

		{boxLabel: 'GSM-Size-Monthwise Sales', name: 'optRpttype', id:'optStockPending', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optGSMSales";

					}
				}
			}
		},
		{boxLabel: 'Daily Report', name: 'optRpttype', id:'optDailyReport', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="optDailyReport";

					}
				}
			}
		},
/*

		{boxLabel: 'TEMP - VARIETY -wise Closing Stock', name: 'optRpttype', id:'optstk1', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="tmpstkVarty";

					}
				}
			}
		},

		{boxLabel: 'TEMP - Partywise Closing Stock', name: 'optRpttype', id:'optstk2', inputValue: 2,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="tmpstkParty";

					}
				}
			}
		},




/
		{boxLabel: 'Varietygroupwise Closing Stock', name: 'optRpttype', id:'optrecvgrp', inputValue: 5,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="stkVartyGrp";

					}
				}
			}
		},


		{boxLabel: 'Group-Sizewise Stock Statement', name: 'optRpttype', id:'optrecGSSS', inputValue: 3,
			listeners:{
				check:function(rb,checked){
					if(checked==true){
						Rpttype="GSstkstmt";

					}
				}
			}
		},		
  */         
        ],
    }



    ]
});
 
var tabsalstmt = new Ext.TabPanel({
    	id          : 'SALSTMT',
	xtype       : 'tabpanel',bodyStyle:{"background-color":"#ebebdf"},
	activeTab   : 0,
	height      : 290,
	width       : 645,	
	x           : 0,
	y           : 0,
    items       : [
	{
            xtype: 'panel',
            title: 'Stock Statement',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [optRpttype, optStockOption,optStockPrtOption,
		]
	},
/*
	{
            xtype: 'panel',
            title: 'Stock Statement - 1',bodyStyle:{"background-color":"#ebebdf"},
            layout: 'absolute',
            items: [
		]
	},
*/
	]
});

   
   var RepGeneralFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'General Reports',
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
                    id : 'view',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                    listeners:{
                        click: function () {

///alert(Rpttype);
				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&finid=" + encodeURIComponent(GinFinid);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));

				var param = (p1+p2+p3+p4) ;
			if (Rpttype ==="")
			{
				Ext.MessageBox.alert("Alert", "Select Report Name" );
			}
                        else
                        if (Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d")  <  Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d") ) 
                        {
                          alert("Error in the Data Selection...Plese check..");
                        }
			else
			{
			    if (Rpttype == "stkItem") {
//alert("HELLO2");
				loadviewcreate.load({
				url: 'ClsSalesRep.php',
				params: {
				     task: 'viewcreate',
				     finid    : GinFinid,
				     compcode : Gincompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
                                     stkopt   : stockopt,
				},
				callback:function()
				{
//				     alert(loadviewcreate.getCount());
//alert("Report");
		                var p5 = "&stkoption=" + encodeURIComponent(stkprint);
				var param = (p3+p4+p5) ;
//alert(param);
                               if (printtype == "PDF") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_itemwise.rptdesign&__format=pdf&' + param, '_blank');
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_itemwise.rptdesign&__format=XLS&' + param, '_blank');
                               else
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_itemwise.rptdesign' + param, '_blank');



				}
			    });



			    }
//			    else if (Rpttype == "recSD") {
//				window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesDetails.rptdesign' + param, '_blank');
//			   }
			    else if (Rpttype == "stkVarty") {
			    
				loadviewcreate.load({
				url: 'ClsSalesRep.php',
				params: {
				    task: 'viewcreate',
				     finid    : GinFinid,
				     compcode : Gincompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
                                     stkopt   : stockopt,
				},
				callback:function()
				{
//				     alert(loadviewcreate.getCount());
				    var p5 = "&stkoption=" + encodeURIComponent(stkprint);

			  	    param = (p1+p2+p3+p4+p5);

//alert(param);
                                    if (printtype == "PDF") 									   
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_GSMwise.rptdesign&__format=pdf&' + param, '_blank');		  
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_GSMwise.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_GSMwise.rptdesign' + param, '_blank');		
				}
			    });

  
             		                   		    
			    
			    }
			    else if (Rpttype == "stkBF") {
			    
				loadviewcreate.load({
				url: '/SHVPM/SALES/ClsSalesRep.php',
				params: {
				    task: 'viewcreate',
				     finid    : GinFinid,
				     compcode : Gincompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
                                     stkopt   : stockopt,
				},
				callback:function()
				{
//				     alert(loadviewcreate.getCount());
				    var p5 = "&stkoption=" + encodeURIComponent(stkprint);

			  	    param = (p1+p2+p3+p4+p5);

//alert(param);
                                    if (printtype == "PDF") 									   
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_BFwise.rptdesign&__format=pdf&' + param, '_blank');		  
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_BFwise.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSales_stock_BFwise.rptdesign' + param, '_blank');
				}
			    });

		  
             		                   		    
			    
			    }
			    else if (Rpttype == "tmpstkVarty") {
	
//					param = (p1+p2+p3+p4);
									   
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/temp_stock_report_varietywise.rptdesign', '_blank');		               		                   		    
			    
			    }
			    else if (Rpttype == "stkReel" || Rpttype == "stkReelGodown"   ) {


			    
				loadviewcreate.load({
				url: 'ClsSalesRep.php',
				params: {
				    task: 'viewcreate',
				     finid    : GinFinid,
				     compcode : Gincompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
                                     stkopt   : stockopt,
				},
				callback:function()
				{
//				     alert(loadviewcreate.getCount());
				    var p5 = "&stkoption=" + encodeURIComponent(stkprint);

                                    if (Rpttype == "stkReel")
                                    {     
                                       var p6 = "&custcode=" + encodeURIComponent(0);
                                    }  
                                    else                                       
                                    {
                                       var p6 = "&custcode="+ encodeURIComponent(2151);
                                    }
//   alert(p6);
			  	    param = (p1+p4+p5+p6);
//alert(param);	

                                    if (printtype == "PDF") 									   
	  

			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesReelwiseStockNew.rptdesign&__format=pdf&' + param, '_blank');	
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesReelwiseStockNew.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptSalesReelwiseStockNew.rptdesign' + param, '_blank');	
				}
			    });



	  
             		                   		    
			    
			    }


			    else if (Rpttype == "optGSMSales" ) {

                                    var p5 = "&stkoption="+ encodeURIComponent(stkprint);
                                    var p6 = "&repoption="+ encodeURIComponent(repoption);

			  	    param  = (p1+p2+p3+p4+p5+p6);

                                    if (printtype == "PDF") 									   
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepSizeMonthwiseSales.rptdesign&__format=pdf&' + param, '_blank');	
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepSizeMonthwiseSales.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RptRepSizeMonthwiseSales.rptdesign' + param, '_blank');	
			    }


			    else if (Rpttype == "tmpstkVarty") {
	
//					param = (p1+p2+p3+p4);
									   
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/temp_stock_report_varietywise.rptdesign', '_blank');		               		                   		    
			    
			    }
			    else if (Rpttype == "tmpstkParty") {
	
//					param = (p1+p2+p3+p4);
									   
					window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/temp_stock_report_partywise.rptdesign', '_blank');		               		                   		    
			    
			    }
			    else if (Rpttype == "GSstkstmt"){
			    
		                    Ext.Ajax.request({
		                    url: 'TrnSalRepStkStmtRPT.php',
		                    params :
		                     {
					compcode	: Gincompcode,
		                       finid		: GinFinid,
		                       fromdate	: Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
		                       todate		: Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
		                       RPT		: Rpttype
		                                                    	
					},
		                      
		                   });	
		                    param = (p1+p2+p3+p4);
		                   
window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGroupsizewiseStkStmt.rptdesign' + param, '_blank');		                   		    
			    
			    

			    }

			    else if (Rpttype == "GSstkstmt"){
			    
		                    Ext.Ajax.request({
		                    url: 'TrnSalRepStkStmtRPT.php',
		                    params :
		                     {
					compcode	: Gincompcode,
		                       finid		: GinFinid,
		                       fromdate	: Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
		                       todate		: Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),
		                       RPT		: Rpttype
		                                                    	
					},
		                      
		                   });	
		                    param = (p1+p2+p3+p4);
		                   
window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesGroupsizewiseStkStmt.rptdesign' + param, '_blank');		                   		    
			    
			    
			    }
			    else if (Rpttype == "optReelSales"){
                                var fb = 'F,B';
                                var st = 'A,B';

                                if (stkprint == 'A')
                                   fb = 'F,B';	
                                else if (stkprint == 'F')    
                                   fb = 'F';	
                                else
                                   fb = 'B';	

                                if (stockopt == 1)
                                   st= 'ALL';	
                                else if (stockopt == 2)    
                                   st = 'A';	
                                else
                                   st = 'B';	



				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&reeloption=" + encodeURIComponent(fb);
				var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				var p5 = "&salopt=" + encodeURIComponent(st);
                         	var p6 = "&NoofMonth=" + encodeURIComponent(diffMonths);

				var param = (p1+p2+p3+p4+p5+p6) ;

                                 if (printtype == "PDF") 
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rptsales_Sizewise_Monthwise_Sales.rptdesign&__format=pdf&' + param, '_blank');	
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rptsales_Sizewise_Monthwise_Sales.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rptsales_Sizewise_Monthwise_Sales.rptdesign' + param, '_blank');	
                            }


			    else if (Rpttype == "optStockPending"){


				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));
				var param = (p1+p2+p3) ;

                                 if (printtype == "PDF") 
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_sales_stock_from_prodn.rptdesign&__format=pdf&' + param, '_blank');	
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_sales_stock_from_prodn.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/rpt_sales_stock_from_prodn.rptdesign' + param, '_blank');	
                            }
			    else if (Rpttype == "optDailyReport"){
                                loadOpeningClosingStock.removeAll();
				loadOpeningClosingStock.load({
				url: 'ClsStockStatement.php',
				params: {
				    task: 'loadOpeningClosingStock',
				     finid    : GinFinid,
				     compcode : Gincompcode,
				     fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),
				     todate   :	Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"),

				},
				callback:function()
				{

                            var cnt  = loadOpeningClosingStock.getCount();
                            if (cnt > 0)
                            {    


                                var openingstock  = loadOpeningClosingStock.getAt(0).get('openingstock');
                                var openingnos  = loadOpeningClosingStock.getAt(0).get('openingnos');
                                var closingstock  = loadOpeningClosingStock.getAt(0).get('closingstock');
                                var closingnos  = loadOpeningClosingStock.getAt(0).get('closingnos');


                                var IBitOPStkNos  = loadOpeningClosingStock.getAt(0).get('IBitOPStkNos');
                                var IFullOPStkNos  = loadOpeningClosingStock.getAt(0).get('IFullOPStkNos');
                                var IIBitOPStkNos  = loadOpeningClosingStock.getAt(0).get('IIBitOPStkNos');
                                var IIFullOPStkNos  = loadOpeningClosingStock.getAt(0).get('IIFullOPStkNos');

                                var IBitOPStkWt  = loadOpeningClosingStock.getAt(0).get('IBitOPStkWt');
                                var IFullOPStkWt  = loadOpeningClosingStock.getAt(0).get('IFullOPStkWt');
                                var IIBitOPStkWt  = loadOpeningClosingStock.getAt(0).get('IIBitOPStkWt');
                                var IIFullOPStkWt  = loadOpeningClosingStock.getAt(0).get('IIFullOPStkWt');


                                var IBitCLOStkNos  = loadOpeningClosingStock.getAt(0).get('IBitCLOStkNos');
                                var IFullCLOStkNos  = loadOpeningClosingStock.getAt(0).get('IFullCLOStkNos');
                                var IIBitCLOStkNos  = loadOpeningClosingStock.getAt(0).get('IIBitCLOStkNos');
                                var IIFullCLOStkNos  = loadOpeningClosingStock.getAt(0).get('IIFullCLOStkNos');

                                var IBitCLOStkWt  = loadOpeningClosingStock.getAt(0).get('IBitCLOStkWt');
                                var IFullCLOStkWt  = loadOpeningClosingStock.getAt(0).get('IFullCLOStkWt');
                                var IIBitCLOStkWt  = loadOpeningClosingStock.getAt(0).get('IIBitCLOStkWt');
                                var IIFullCLOStkWt  = loadOpeningClosingStock.getAt(0).get('IIFullCLOStkWt');



				var s1  = "&IBitOPStkNos=" + encodeURIComponent(IBitOPStkNos);
				var s2  = "&IFullOPStkNos=" + encodeURIComponent(IFullOPStkNos);
				var s3  = "&IIBitOPStkNos=" + encodeURIComponent(IIBitOPStkNos);
				var s4  = "&IIFullOPStkNos=" + encodeURIComponent(IIFullOPStkNos);

				var s5  = "&IBitOPStkWt=" + encodeURIComponent(IBitOPStkWt);
				var s6  = "&IFullOPStkWt=" + encodeURIComponent(IFullOPStkWt);
				var s7  = "&IIBitOPStkWt=" + encodeURIComponent(IIBitOPStkWt);
				var s8  = "&IIFullOPStkWt=" + encodeURIComponent(IIFullOPStkWt);

				var s9  = "&IBitCLOStkNos=" + encodeURIComponent(IBitCLOStkNos);
				var s10 = "&IFullCLOStkNos=" + encodeURIComponent(IFullCLOStkNos);
				var s11 = "&IIBitCLOStkNos=" + encodeURIComponent(IIBitCLOStkNos);
				var s12 = "&IIFullCLOStkNos=" + encodeURIComponent(IIFullCLOStkNos);

				var s13 = "&IBitCLOStkWt=" + encodeURIComponent(IBitCLOStkWt);
				var s14 = "&IFullCLOStkWt=" + encodeURIComponent(IFullCLOStkWt);
				var s15 = "&IIBitCLOStkWt=" + encodeURIComponent(IIBitCLOStkWt);
				var s16 = "&IIFullCLOStkWt=" + encodeURIComponent(IIFullCLOStkWt);

				var s17 = "&openingstock=" + encodeURIComponent(openingstock);
				var s18 = "&openingnos=" + encodeURIComponent(openingnos);
				var s19 = "&closingstock=" + encodeURIComponent(closingstock);
				var s20  = "&closingnos=" + encodeURIComponent(closingnos);

				var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
				var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));
				var param = (p1+p2+p3+s1+s2+s3+s4+s5+s6+s7+s8+s9+s10+s11+s12+s13+s14+s15+s16+s17+s18+s19+s20) ;

                                 if (printtype == "PDF") 
			          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rep_Sal_DailyReport.rptdesign&__format=pdf&' + param, '_blank');	
                               else if (printtype == "XLS") 
                	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rep_Sal_DailyReport.rptdesign&__format=XLS&' + param, '_blank');

                                    else
		          	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rep_Sal_DailyReport.rptdesign' + param, '_blank');	
                             }
                             else
                             {
                                 alert("Data Not Available...");
                             }       

                            }

                               });


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
                                    Ext.getCmp('view').setDisabled(false);  
                                   window.location.reload();
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
			border  : true,
			height  : 350,
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 10,

			items:[optprinttype],
		},


	{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 320,
			width   : 670,
			layout  : 'absolute',
			x       : 30,
			y       : 60,

			items:[tabsalstmt],
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
				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 250,
					y           : 25,
					border      : false,
					items: [txtPassword]
				}, 

				{ 
					xtype       : 'fieldset',
					title       : '',
					labelWidth  : 50,
					width       : 200,
					x           : 380,
					y           : 25,
					border      : false,
					items: [btn]
				}, 



			]
		},
        ],
    });
    
   
    var RepgeneralWindow = new Ext.Window({
	height      : 550,
        width       : 750,
	x	    : 200,
        y           : 35,
        title       : 'Stock Statement Reports',
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



 Ext.getCmp('stkid').setVisible(false);
 Ext.getCmp('btn').setVisible(false);
 Ext.getCmp('optDailyReport').setVisible(false);

txtPassword.hide();

        if (UserLogin == 'annait' || UserLogin == 'suganyasal'  )
        { 
            txtPassword.show();

        }
        else   
        { 
           txtPassword.hide();
        }  


   		}
			
	}
    });

    RepgeneralWindow.show();  
});
