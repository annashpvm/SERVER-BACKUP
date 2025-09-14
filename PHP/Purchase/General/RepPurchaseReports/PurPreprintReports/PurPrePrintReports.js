Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinCompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');

   var yr  = localStorage.getItem('gstyear');

   var yrfrom = yr.substr(0,4);  
   var yrto  = yr.substr(5,4); 



  var printtype='PDF';

  var purheadname = '';
 var loadMonthIndentData = new Ext.data.Store({
      id: 'loadMonthIndentData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthIndentDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'ind_no','ind_date','item_name','ind_qty','ind_value'

      ]),
    })

 var findPurchaseHeaddatastore = new Ext.data.Store({
      id: 'findPurchaseHeaddatastore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/TrnPurchaseOrder/ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPurchaseHead"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'dept_code', 'dept_name', 'dept_headname' 
 
      ]),
    });


 var loadIndentData = new Ext.data.Store({
      id: 'loadIndentData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthIndents"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadMonthPOData = new Ext.data.Store({
      id: 'loadMonthPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthPODetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'phd_pono', 'phd_podate', 'ptr_ind_no', 'cust_ref','item_name', 'ptr_ord_qty'

      ]),
    })



 var loadPOData = new Ext.data.Store({
      id: 'loadPOData',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMonthPOs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },[     'rmonth', 'nos', 'purvalue'

      ]),
    })


 var loadpreprint = new Ext.data.Store({
      id: 'loadpreprint',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/General/ClsPurRep.php',      // File to connect to
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
 var cmbReport = new Ext.form.ComboBox({
        fieldLabel      : 'Report Name',
        width           : 250,
        displayField    : 'field2',
        valueField      : 'field1',
        hiddenName      : '',
        id              : 'cmbReport',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select Report Type--',
        mode            : 'local',
        store           : [['1','PURCHASE INDENT'],['2','PURCHASE ORDER'],['3','PURCHASE ORDER - Annexure'],['4','WORK ORDER']],
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false, 
        editable        : false,
        allowblank      : false,
	listeners:{
               select : function(){
//alert(cmbReport.getValue());
                cmbstrepno.clearValue();
                flxMonth.getStore().removeAll();
                flxIndent.getStore().removeAll();
                flxPO.getStore().removeAll();
           Month_Add_inGrid();

			if (cmbReport.getValue() == "1") {

                 Ext.getCmp('flxPO').hide();  
                 Ext.getCmp('flxIndent').show(); 

				cmbstrepno.label.update('Indent No');
//				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "Indent"

					}

				});
			    loadIndentData.removeAll();
			    loadIndentData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadMonthIndents',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"),  
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadIndentData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadIndentData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadIndentData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadIndentData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
				}
			    });

			}
			else if (cmbReport.getValue() == "2") {

                 Ext.getCmp('flxPO').show();  
                 Ext.getCmp('flxIndent').hide(); 


				cmbstrepno.label.update('PO No');
	//			cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "PO"

					}

				});

			    loadPOData.removeAll();
			    loadPOData.load({
				url: '/SHVPM/Purchase/General/ClsPurRep.php',
				params: {
			    	task: 'loadMonthPOs',
				compcode:GinCompcode,
				finid:GinFinid,
				startdate: Ext.util.Format.date(finstartdate,"Y-m-d"),  
				},
				scope:this,
				callback:function()
				{
					   var cnt=loadPOData.getCount();
					   if(cnt>0)
					   {
					       flxMonth.getSelectionModel().selectAll();
					       var selrows = flxMonth.getSelectionModel().getCount();
					       var sel = flxMonth.getSelectionModel().getSelections();
					       for(var j=0; j<cnt; j++)
					       {  
			   		       for (var i=0;i<selrows;i++){    
				 
				    		    if (sel[i].data.rmonth === loadPOData.getAt(j).get('rmonth'))
				      		    {
							sel[i].set('nos', Ext.util.Format.number(loadPOData.getAt(j).get('nos'),'0'));
							sel[i].set('purvalue', Ext.util.Format.number(loadPOData.getAt(j).get('purvalue'),'0.00'));

						    }
						}
						}
			//                       grid_tot();

					   }   
				}
			    });

			}

			else if (cmbReport.getValue() == "3") {
				cmbstrepno.label.update('PO No');
//				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "GRN"

					}

				});

			}
			else if (cmbReport.getValue() == "5") {
				cmbstrepno.label.update('VOU No');
//				cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname	: "Clearing"

					}

				});

			}
			else if (cmbReport.getValue() == "6") {
				cmbstrepno.label.update('DC No');
				Ext.getCmp('cmbedrepno').hide(true);// cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname : "DCNo"

					}

				});

			}			
			else if (cmbReport.getValue() == "4") {
				cmbstrepno.label.update('WORK ORDER No');
				Ext.getCmp('cmbedrepno').hide(true);// cmbedrepno.label.update('To');
				loadpreprint.removeAll();
				loadpreprint.load({
					url:'/SHVPM/Purchase/General/ClsPurRep.php',
					params:
					{
					task:"loadrepno",
					finid : GinFinid,
					compcode : GinCompcode,
					repname : "WONo"

					}

				});

			}			

		}
	}
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
        store           : loadpreprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
   });

 var cmbedrepno = new Ext.form.ComboBox({
        fieldLabel      : 'To.',
        width           : 200,
        displayField    : 'repno',
        valueField      : 'seqno',
        hiddenName      : '',
        id              : 'cmbedrepno',
	labelStyle 	: 'font-weight:bold;',
        typeAhead       : true,
	emptyText       : '--Select No--',
        mode            : 'local',
        store           : loadpreprint,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
   });
 


function find_dates(mmon)
{
    var rmon ='';
    var mdays = 0;
    var yr=0;
    
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
    monthstartdate = yr+"-"+rmon+"-01";
    monthenddate = yr+"-"+rmon+"-"+mdays;


    if (cmbReport.getValue() == "1") {
	    loadMonthIndentData.removeAll();
	    loadMonthIndentData.load({
		url: '/SHVPM/Stores/General/ClsPurRep.php',
		params: {
	    	task: 'loadMonthIndentDetails',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
		enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
		},
		scope:this,
		callback:function()
		{
	    //      grid_tot_party();
		}
	    });
          }
     else if (cmbReport.getValue() == "2") {      
    	    loadMonthPOData.removeAll();
	    loadMonthPOData.load({
		url: '/SHVPM/Stores/General/ClsPurRep.php',
		params: {
	    	task: 'loadMonthPODetails',
		compcode:GinCompcode,
		finid:GinFinid,
		startdate: Ext.util.Format.date(monthstartdate,"Y-m-d"),  
		enddate: Ext.util.Format.date(monthenddate,"Y-m-d"),  
		},
		scope:this,
		callback:function()
		{
	    //      grid_tot_party();
		}
	    });             
     }  
}

var dgrecord = Ext.data.Record.create([]);

var flxMonth = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:25,
    y:200,
    height: 290,
    hidden:false,
    width: 460,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "MonthCode" , dataIndex: 'moncode',sortable:false,width:50,align:'left', menuDisabled: true,hidden:true},
        {header: "Month" , dataIndex: 'rmonth',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Nos" , dataIndex: 'nos',sortable:false,width:130,align:'center', menuDisabled: true},
        {header: "Value"  , dataIndex: 'purvalue',sortable:false,width:150,align:'right', menuDisabled: true},
    ],
    store:[], // store: GetGridDetailsDatastore,
    listeners:{	

       'cellclick': function (flxMonth, rowIndex, cellIndex, e) {
		var sm = flxMonth.getSelectionModel();
		var selrow = sm.getSelected();
                repmonth = selrow.get('rmonth');
          	find_dates(selrow.get('moncode'));
        }      
	
   }
});

var flxIndent = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 700,
    id   : 'flxIndent',
//    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "Ind.No" , dataIndex: 'ind_no',sortable:false,width:80,align:'center', menuDisabled: true},
        {header: "Date" , dataIndex: 'ind_date',sortable:false,width:110,align:'center', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:260,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'ind_qty',sortable:false,width:100,align:'right', menuDisabled: true},
        {header: "Value" , dataIndex: 'ind_value',sortable:false,width:120,align:'right', menuDisabled: true},
    ],
     store: loadMonthIndentData,
    listeners:{	

            'cellclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var indno = selrow.get('ind_no')
		  var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		  var p2 = "&finid=" + encodeURIComponent(GinFinid);
		  var p3 = "&indno=" + encodeURIComponent(indno);
                  var param = (p1+p2+p3) ;  
                  if (printtype == "PDF") 
		     window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
	             window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 


   }
}
});


var flxPO = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:500,
    y:60,
    height: 430,
    hidden:false,
    width: 700,
    //id: 'my-grid',  
    id   : 'flxPO',
    columns:
    [ 	 	
        {header: "PO.No" , dataIndex: 'phd_pono',sortable:false,width:60,align:'center', menuDisabled: true},
        {header: "Date" , dataIndex: 'phd_podate',sortable:false,width:80,align:'center', menuDisabled: true},
        {header: "Ind.No" , dataIndex: 'ptr_ind_no',sortable:false,width:60,align:'center', menuDisabled: true},
        {header: "Supplier" , dataIndex: 'cust_ref',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "Item" , dataIndex: 'item_name',sortable:false,width:200,align:'left', menuDisabled: true},
        {header: "Qty" , dataIndex: 'ptr_ord_qty',sortable:false,width:100,align:'right', menuDisabled: true},

    ],
     store: loadMonthPOData,
    listeners:{	

            'cellclick': function (flxIndent, rowIndex, cellIndex, e) {
                  var sm = flxIndent.getSelectionModel();
		  var selrow = sm.getSelected();
                  var pono = selrow.get('phd_pono')
  
	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&pono=" + encodeURIComponent(pono);
        	var p4 = "&purhead=" + encodeURIComponent(purheadname);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 



   }
}
});

var monthdisplay = '';
var monthcode = 0;
function Month_Add_inGrid()
{
   for (var i=1;i<13;i++)
   {   
        switch (i) {
           case 1 :
             monthdisplay = "APRIL";
             monthcode = 4;
             break;
           case 2 :
             monthdisplay = "MAY";
             monthcode = 5;
             break;
           case 3 :
             monthdisplay = "JUNE";
             monthcode = 6;
             break;
           case 4 :
             monthdisplay = "JULY";
             monthcode = 7;
             break;
           case 5 :
             monthdisplay = "AUGUST";
             monthcode = 8;
             break;
           case 6 :
             monthdisplay = "SEPTEMBER";
             monthcode = 9;
             break;
           case 7 :
             monthdisplay = "OCTOBER";
             monthcode = 10;
             break;
           case 8 :
             monthdisplay = "NOVEMBER";
             monthcode = 11;
             break;
           case 9 :
             monthdisplay = "DECEMBER";
             monthcode = 12;
             break;
           case 10 :
             monthdisplay = "JANUARY";
             monthcode = 1;
             break;
           case 11 :
             monthdisplay = "FEBRUARY";
             monthcode = 2;
             break;
           case 12 :
             monthdisplay = "MARCH";
             monthcode = 3;
             break;
        
        }  
        var RowCnt = flxMonth.getStore().getCount() + 1;
        flxMonth.getStore().insert(
        flxMonth.getStore().getCount(),
        new dgrecord({
           moncode : monthcode,
           rmonth  : monthdisplay,
       }) 
       );
   }
}
   
   var RepPrePrintFormPannel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'PrePrinted Reports',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'RepPrePrintFormPannel',
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
                    //icon: '/Hometexmadeups/Madeups/Pictures/view.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {

				if (cmbReport.getValue()==0)
				{
					Ext.MessageBox.alert("Alert", "Select Report Name" );
				}
				else if ((cmbstrepno.getValue()==="" && cmbstrepno.getValue()==0) ) {

					Ext.MessageBox.alert("Alert", "Select " + Ext.getCmp('cmbstrepno').fieldLabel );
				}
				else
				{

					var pono=Ext.getCmp('cmbstrepno').getRawValue();
					if(cmbReport.getValue() == "1"){
				

						var d2='P';  
						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);  
						var p3 = "&indno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;     
       if (printtype == "PDF") 
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign&__format=pdf&' + param , '_blank'); 
       else
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurIndent.rptdesign' + param , '_blank'); 

					}
					else if(cmbReport.getValue() == "2"){
				



	 	var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&pono=" + encodeURIComponent(pono);
        	var p4 = "&purhead=" + encodeURIComponent(purheadname);
		var param = (p1+p2+p3+p4) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign&__format=pdf&' + param , '_blank'); 
                else
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RptPurchaseOrder.rptdesign' + param , '_blank'); 


					}
					else if(cmbReport.getValue() == "5"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&clrno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurTransportClearance.rptdesign' + param , '_blank'); 

					}
					else if(cmbReport.getValue() == "6"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&gentno=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurDeliveryNoteReceipt.rptdesign' + param , '_blank'); 

					}
					else if(cmbReport.getValue() == "7"){
				


						var p1 = "&compcode=" + encodeURIComponent(GinCompcode);
						var p2 = "&finid=" + encodeURIComponent(GinFinid);
						var p3 = "&wono=" + encodeURIComponent(pono);
						var param = (p1+p2+p3) ;                         
						window.open('http://10.0.0.251:8080/birt/frameset?__report=Purchase/RepPurWorkOrder.rptdesign' + param , '_blank'); 

					}		                   
		                }
			}
                    }
                },'-',                
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    //icon: '/Hometexmadeups/Madeups/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                flxMonth.getStore().removeAll();
                flxIndent.getStore().removeAll();
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                   // icon: '/Hometexmadeups/Madeups/Pictures/exit.png',
                    handler: function(){	
ReppreprintWindow.hide();
                        }
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 150,
                width   : 460,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 30,
                y       : 30,

                items:[
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 450,
				x           : 10,
				y           : 10,
				border      : false,
				items: [cmbReport]
			},
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 130,
				width       : 300,
				x           : 10,
				y           : 80,
				border      : false,
				items: [cmbstrepno]
			},
/*
			{ 
				xtype       : 'fieldset',
				title       : '',
				labelWidth  : 30,
				width       : 200,
				x           : 240,
				y           : 80,
				border      : false,
				items: [cmbedrepno]
			},
*/
					
                ]

            }, 

            { 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 20,
			     y       : 180,
                             items: [flxMonth]	
            },     flxIndent, flxPO,

		{ 
			xtype   : 'fieldset',
			title   : 'PRINT TYPE',
			layout  : 'hbox',
			border  : true,
			height  : 70,
			width   : 220,
			layout  : 'absolute',
			x       : 650,
			y       : 0,
			items:[optprinttype],
		},
            
        ],
    });
    


   
    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1300,
	x	    : 10,
        y           : 35,
        title       : 'Purchase PrePrinted Reports',
        items       : RepPrePrintFormPannel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#eccbf2"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,

	listeners:{
               show:function(){
    

                 Ext.getCmp('flxPO').hide();  
                 Ext.getCmp('flxIndent').show();  
                 Month_Add_inGrid();

            findPurchaseHeaddatastore.load({
             url: '/SHVPM/Purchase/General/TrnPurchaseOrder/ClsPo.php',
               params:
                 {
                 task:"loadPurchaseHead"
                 },
		callback:function()
		{
		  purheadname = findPurchaseHeaddatastore.getAt(0).get('dept_headname');


		}
            });

			 /*loadgrnprint.load({
				 url: '/SHVPM/Purchase/General/ClsPurRep.php', 
		        	 params:
		       		 {
		         	 task:"loadgrnno",
				 finid:GinFinid,
				 compcode: GinCompcode

		        	 }
			 });	*/	
   		}
			
	}
    });
    ReppreprintWindow.show();  
});
