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

   var fitemcode = 0;
   var fitemname = "";

    var printtype = "PDF";



 var loadGRNDataStore = new Ext.data.Store({
      id: 'loadGRNDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadParty_Item_GRNwise_Arrivals"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['rech_date', 'rech_no', 'rech_billno', 'rech_billdate',  'rech_truckno', 'itmh_name','rect_itemrate','rect_grnqty','rect_itemvalue','rech_sup_code','rect_item_code'
]),
    });


var lblParty = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty',
        name        : 'lblParty',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });

var lblParty2 = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblParty2',
        name        : 'lblParty2',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });


var lblItem = new Ext.form.Label({
        fieldLabel  : '',
        id          : 'lblItem',
        name        : 'lblItem',
	style: {
            'color':'#ff0000',readOnly:true,
            'style': 'Helvetica',
            'font-size': '15px','font-weight':'bold'
        },
        width       : 550
    });
 var loadSupplierPODataStore = new Ext.data.Store({
      id: 'loadSupplierPODataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsViewStatements.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSupPOs"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['sup_name', 'sup_code','ordh_no', 'ordh_date' ]),
    });


//SHVPM\Purchase\RawMaterial\TrnRMPurchaseOrder\ClsPo.php

 var loadPODetailDataStore = new Ext.data.Store({
      id: 'loadPODetailDataStore',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Purchase/RawMaterial/TrnRMPurchaseOrder/ClsPo.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadPODetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id' 
      },['ordh_seqno', 'ordh_compcode', 'ordh_fincode', 'ordh_no', 'ordh_from', 'ordh_sup_code', 'ordh_date', 'ordh_terms', 'ordh_carriagetype', 'ordh_paymode', 'ordh_creditdays', 'ordh_overdueintper', 'ordh_payterms', 'ordh_terms', 'ordh_frttype', 'ordh_frtparty_code', 'ordh_stper', 'ordh_scper', 'ordh_tcsper', 'ordh_cgstper', 'ordh_sgstper', 'ordh_igstper', 'ordh_servicecharge', 'ordh_itemvalue', 'ordh_roundingoff', 'ordh_totalvalue', 'ordh_status', 'ordh_amndstatus', 'ordh_amndposeqno', 'ordh_usr_code', 'ordh_entry_date', 'ordh_wef_date', 'ordt_hdseqno', 'ordt_seqno', 'ordt_item_code', 'ordt_indh_seqno', 'ordt_enqh_seqno', 'ordt_qty', 'ordt_rec_qty', 'ordt_can_qty', 'ordt_pen_qty', 'ordt_unit_rate', 'ordt_item_value', 'ordt_edpercentage', 'ordt_moisper', 'ordt_tareper', 'ordt_status', 'ordt_educessper', 'sup_code', 'sup_name', 'sup_refname', 'sup_addr1', 'sup_addr2', 'sup_addr3', 'sup_city', 'sup_state', 'sup_cntry_code', 'sup_zip', 'sup_phone', 'sup_fax', 'sup_email', 'sup_web', 'sup_led_code', 'sup_grp_code', 'sup_type', 'tngst_code', 'tngst_date', 'cst_code', 'cst_date', 'sup_acc_group', 'sup_taxcode', 'sup_agentcode', 'sup_e1saleno', 'sup_area', 'sup_panno', 'sup_tinno', 'sup_sertax_rcno', 'sup_excise_rcno', 'sup_tds_type', 'sup_gstin', 'itmh_code', 'itmh_name', 'itmh_moisture_per', 'itmh_tare_per', 'itmh_convlossper', 'itmh_specification', 'itmh_type', 'itmh_ledcode', 'itmh_group', 'itmh_outthrough', 'itmh_prohiper', 'itmh_hsncode','ordt_outper' , 'ordh_refno','ordh_refdate','ordh_preparedby','ordh_tax',
'area_code','area_name','ordh_wef','ordt_amendno','ordt_wefdate' ]),
    });



function grid_tot(){

        var twt = 0;
        var tval = 0;

  


        var Row= loadPODetailSupwise.getStore().getCount();
        loadPODetailSupwise.getSelectionModel().selectAll();
        var sel=loadPODetailSupwise.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.grnqty) > 0)
              {
		      twt =twt+Number(sel[i].data.grnqty);
		      tval=tval+Number(sel[i].data.grnvalue);
              }
         }





}


function grid_tot2(){

        var twt = 0;
        var tval = 0;

         txttotPartyQty.setValue('');
         txttotPartyValue.setValue('');

        var Row= flxPODetail.getStore().getCount();
        flxPODetail.getSelectionModel().selectAll();
        var sel=flxPODetail.getSelectionModel().getSelections();



       for(var i=0;i<Row;i++)

        {

              if (Number(sel[i].data.grnqty) > 0)
              {
		      twt =twt+Number(sel[i].data.grnqty);
		      tval=tval+Number(sel[i].data.grnvalue);
              }
         }
         txttotPartyQty.setValue(twt);
         txttotPartyValue.setValue(tval);



}
function grid_tot_grn(){
  
        var pqty   = 0;
        var pvalue = 0;
        var Row= flxGRN.getStore().getCount();
        flxGRN.getSelectionModel().selectAll();
        var sel=flxGRN.getSelectionModel().getSelections();


       for(var i=0;i<Row;i++)

        {
              if (Number(sel[i].data.rect_grnqty)  > 0)
              {
		      pqty=Number(pqty)+Number(sel[i].data.rect_grnqty);
		      pvalue=Number(pvalue)+Number(sel[i].data.rect_itemvalue);

              }
         }

         txtPartyPurchaseQty.setValue(pqty);
         txtPartyPurchaseValue.setValue(pvalue);


}


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




   var txtTotPOs = new Ext.form.NumberField({
        fieldLabel  : 'Total Number of POs',
        id          : 'txtTotPOs',
        name        : 'txtTotPOs',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });




   var txttotPartyQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty (t)',
        id          : 'txttotPartyQty',
        name        : 'txttotPartyQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txttotPartyValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txttotPartyValue',
        name        : 'txttotPartyValue',
        width       :  120,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
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
        value: new Date(),
        width : 110   
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





/*
        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(m1);
        find_dates(m1);


     mdays = Ext.util.Format.date(new Date(),"d");
*/

//    lblDetail1.setText("Detail for the Month of  : " + repmonth );
//    lblDetail.setlabelStyle("font-size:16px;font-weight:bold;color:#0080ff");
//    labelStyle  : "font-size:16px;font-weight:bold;color:#0080ff",

    rmon = ("0"+mmon).slice(-2);

    monthstartdate.setValue(yr+"-"+rmon+"-01");
    monthenddate.setValue(yr+"-"+rmon+"-"+mdays);

//    monthstartdate = yr+"-"+rmon+"-01";
//    monthenddate = yr+"-"+rmon+"-"+mdays;



//    alert(monthstartdate);  
//    alert(monthenddate);  
 //anna         
	loadSupplierPODataStore.removeAll();
	loadSupplierPODataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadSupPOs',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                    txtTotPOs.setValue(loadPODetailSupwise.getStore().getCount());
		}
	    });
     
}


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
['7','JULY'],['8','AUGUEST'],['9','SEPTEMBER'],[10,'OCTOBER'],['11','NOVEMBER'],['12','DECEMBER']],
        
        width: 150,
        listeners:{
           select: function(){
   //               lblDetail1.setText('');
//                  lblDetail2.setText('');
            loadPODetailDataStore.removeAll();
	    loadGRNDataStore.removeAll();
                  loadSupplierPODataStore.removeAll();
                  loadSupplierPODataStore.removeAll();
                  find_dates(cmbMonth.getValue());         
	   }
        }  
        
    });



var loadPODetailSupwise = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:30,
//    y:100,
    height: 400,
    hidden:false,
    width: 550,
    id: 'my-grid',  

    columns:
    [ 	 	
        {header: "Supplier Name"  ,  dataIndex: 'sup_name',sortable:false,width:250,align:'left', menuDisabled: true },
        {header: "Sup Code"  ,  dataIndex: 'sup_code',sortable:false,width:110,align:'left', menuDisabled: true,hidden:true},
        {header: "PO DATE"    , dataIndex: 'ordh_date',sortable:false,width:100,align:'center', menuDisabled: true},
        {header: "PO NO"    , dataIndex: 'ordh_no',sortable:false,width:100,align:'center', menuDisabled: true},


    ],
    store:loadSupplierPODataStore,
    listeners:{	

            'cellclick': function (loadPODetailSupwise, rowIndex, cellIndex, e) {
		var sm = loadPODetailSupwise.getSelectionModel();
		var selrow = sm.getSelected();
                txttotPartyQty.setValue('');
                txttotPartyValue.setValue('') 




            PONO = selrow.get('ordh_no')
//           lblDetail2.setText('');

//            lblDetail1.setText("Detail for the Date  : " + Ext.util.Format.date( selrow.get('invh_date'),"d-m-Y"));
//            lblDetail1.getEl().setStyle('color', 'red');
//            lblDetail1.getEl().setStyle('font-size', '18px');
//            lblDetail1.getEl().setStyle('font-weight', 'bold');     



            lblItem.setText("Detail for  Purchase Order No.  : " + PONO);

            loadPODetailDataStore.removeAll();
	    loadGRNDataStore.removeAll();
	    loadPODetailDataStore.load({
		url: 'ClsViewStatements.php',
		params: {
	    	task: 'loadPODetail',
		compcode:Gincompcode,
		finid:GinFinid,

                ordcode:selrow.get('ordh_no') ,  
		},
		scope:this,
		callback:function()
		{
                   grid_tot2();
		}
	    });

     
    }
 }
});





var flxPODetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
//    x:500,
//    y:100,
    height: 400,
    hidden:false,
    width: 700,
    id: 'my-grid',  
    columns:
    [ 	 	
        {header: "PO No.", dataIndex: 'ordh_no',sortable:true,width:50,align:'left'},
        {header: "Area Name", dataIndex: 'area_name',sortable:true,width:190,align:'left'},
        {header: "Area code", dataIndex: 'area_code',sortable:true,width:80,align:'left',hidden:true},
        {header: "Item Name", dataIndex: 'itmh_name',sortable:true,width:230,align:'left'},
        {header: "Item Code",  dataIndex: 'ordt_item_code',sortable:true,width:80,align:'left',hidden:true},
        {header: "Qty"     ,  dataIndex: 'ordt_qty',sortable:true,width:70,align:'right'},
        {header: "Unit Rate", dataIndex: 'ordt_unit_rate',sortable:true,width:80,align:'right'},
        {header: "Value"    , dataIndex:'ordt_item_value',sortable:true,width:90,align:'right'},
        {header: "Recd Qty", dataIndex: 'ordt_rec_qty',sortable:true,width:70,align:'right'},
        {header: "Pend Qty", dataIndex: 'ordt_pen_qty',sortable:true,width:70,align:'right'},
        {header: "Amend No.", dataIndex: 'ordt_amendno',sortable:true,width:60,align:'center'},
        {header: "WEF", dataIndex: 'ordt_wefdate',sortable:true,width:120,align:'left'},

    ],
    store:loadPODetailDataStore,
    listeners:{	
            'cellclick': function (flxInvoiceList, rowIndex, cellIndex, e) {
		var sm = flxInvoiceList.getSelectionModel();
		var selrow = sm.getSelected();

    

                  var pono = selrow.get('ordh_no')
//ANNA  
	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&ordno=" + encodeURIComponent(pono);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPurchaseOrder.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMPurchaseOrder.rptdesign' + param); 


     
    }
 }
});

var btnProcess = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "PROCESS",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){       
	loadSupplierPODataStore.removeAll();
	loadSupplierPODataStore.load({
	 url: 'ClsViewStatements.php',
                params: {
	    	task: 'loadSupPOs',
                compcode:Gincompcode,
                finid:GinFinid,
                startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 

		},

       	scope:this,
		callback:function()
		{

                   grid_tot();
		}
	    });
     
       	 }
        }   
});    



    var btnItemwisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Itemwise Print",
        width: 100,
        id: 'btnItemwisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
 

 		    var param = (p1+p2+p3) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItemwiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItemwiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItemwiseArrivals.rptdesign' + param, '_blank');	
                }
            }

    });


    var btnPartywisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "Parttwise Print",
        width: 100,
        id: 'btnPartywisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {

            if (fitemcode >0)
            { 

		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&itemcode="+encodeURIComponent(fitemcode);
		    var p5 = "&itemname="+encodeURIComponent(fitemname);
 		    var param = (p1+p2+p3+p4+p5) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_PartywiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_PartywiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_PartywiseArrivals.rptdesign' + param, '_blank');		
                }
            else
      
            {
                  alert("Select Item Name...");
            }
            }
      }
    });



    var btnGRNwisePrint = new Ext.Button({
        style: 'text-align:center;',
        text: "GRN wise Print",
        width: 100,
        id: 'btnGRNwisePrint',
	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
        listeners: {
            click: function () {



		    var p1 ="&compcode="+encodeURIComponent(Gincompcode);      
	            var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(monthstartdate.getValue(),"Y-m-  d"));	   
                    var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));
		    var p4 = "&itemcode="+encodeURIComponent(fitemcode);
		    var p5 = "&partycode="+encodeURIComponent(repparty);
 		    var param = (p1+p2+p3+p4+p5) ;
                    if (printtype == "PDF") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_Party_GRNwiseArrivals.rptdesign&__format=pdf&' + param, '_blank');
                    else if (printtype == "XLS") 
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_Party_GRNwiseArrivals.rptdesign&__format=XLS&' + param, '_blank');
                    else
		    window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/repRMItem_Party_GRNwiseArrivals.rptdesign' + param, '_blank');		
                }
            }

    });


   var txtPartyPurchaseQty = new Ext.form.NumberField({
        fieldLabel  : 'Total Qty',
        id          : 'txtPartyPurchaseQty',
        name        : 'txtPartyPurchaseQty',
        width       :  100,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 3,
    });

   var txtPartyPurchaseValue = new Ext.form.NumberField({
        fieldLabel  : 'Total Value',
        id          : 'txtPartyPurchaseValue',
        name        : 'txtPartyPurchaseValue',
        width       :  130,
	readOnly : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2,
        style : "font-size:14px;font-weight:bold",
        decimalPrecision: 2,
    });


var flxGRN = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 450,
    hidden:false,
    width: 1200,
    id: 'my-grid',  

    columns:
    [ 	 



        {header: "Date" , dataIndex: 'rech_date',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "GRN No" , dataIndex: 'rech_no',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Bill No" , dataIndex: 'rech_billno',sortable:false,width:150,align:'left', menuDisabled: true},
        {header: "Bill Date" , dataIndex: 'rech_billdate',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Truck"  , dataIndex: 'rech_truckno',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Item Name" , dataIndex: 'itmh_name',sortable:false,width:220,align:'left', menuDisabled: true},
        {header: "Rate/MT" , dataIndex: 'rect_itemrate',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Qty"   , dataIndex: 'rect_grnqty',sortable:false,width:100,align:'left', menuDisabled: true},
        {header: "Value" , dataIndex: 'rect_itemvalue',sortable:false,width:120,align:'left', menuDisabled: true},
    ],
     store:loadGRNDataStore,
    listeners:{	

            'cellclick': function (flxParty, rowIndex, cellIndex, e) {
                
                  var sm = flxGRN.getSelectionModel();
		  var selrow = sm.getSelected();
                  var grnno = selrow.get('rech_no')
//  alert(grnno);

	 	var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&finid=" + encodeURIComponent(GinFinid);
		var p3 = "&grnno=" + encodeURIComponent(grnno);
		var param = (p1+p2+p3) ;   
                if (printtype == "PDF")                       
		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign&__format=pdf&' + param); 
                else

		window.open('http://10.0.0.251:8080/birt/frameset?__report=Rawmaterial/RepRMGRN.rptdesign' + param); 



   }
}
});

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
        title: 'PO DETAILS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [
		{ 
			xtype   : 'fieldset',
//			title   : '',
//			layout  : 'hbox',
			border  : true,
			height  : 50,
			width   : 300,
			layout  : 'absolute',
			x       : 1000,
			y       : 10,
			items:[optprinttype],
		},


			{ 
			    xtype       : 'fieldset',
			    x           : 700,
			    y           : 60,
			    border      : false,
			    width       :500,
                             items: [lblItem]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 20,
                	     width   : 350,
                             items: [cmbMonth]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 300,
			     y       : 20,
                   	     width   : 250,
                             items: [monthstartdate]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 20,
                       	     width   : 250,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 22,
                             items: [btnProcess]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 80,
                             items: [loadPODetailSupwise]
                        },


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 600,
			     y       : 80,
                             items: [flxPODetail]
                        },
       
                 { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 150,
                       width       : 400,
                       x           : 150,
                       y           : 500,
                       border      : false,
                       items: [txtTotPOs]
                      },


                    { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 650,
                       y           : 500,
                       border      : false,
                       items: [txttotPartyQty]
                      },
                     { 
                       xtype       : 'fieldset',
                       title       : '',
                       labelWidth  : 110,
                       width       : 400,
                       x           : 900,
                       y           : 500,
                       border      : false,
                       items: [txttotPartyValue]
                      },

		{
		    xtype       : 'fieldset',
		    x           : 500,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnItemwisePrint]
		},


		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnPartywisePrint]
		},

     ]
    } ,

    {    
        xtype: 'panel',
        title: 'GRN DETAILS',
        bodyStyle: {"background-color": "#ffe6f7"},
        layout: 'absolute',
        items: [


			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             border  : false,
		             x       : 10,
			     y       : 30,
                             items: [flxGRN]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             border  : false,
		             x       : 500,
			     y       : 490,
                             items: [txtPartyPurchaseQty]
                        },
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 800,
			     y       : 490,
                             items: [txtPartyPurchaseValue]
                        },

			{ 
			    xtype       : 'fieldset',
			    x           : 10,
			    y           : 10,
			    border      : false,
			    width       :500,
                             items: [lblParty]
                        },

		{
		    xtype       : 'fieldset',
		    x           : 1170,
		    y           : 500,
		    border      : false,
		    width       : 120,
                    labelWidth  : 50,
		    items : [btnGRNwisePrint]
		},


        ],
    }  ,

    ],
    });
    function Refreshdata()
    {

        var dt_today = new Date();     
        var m1 = 0;
       
        m1 = Ext.util.Format.date(dt_today,"m"); 
        cmbMonth.setValue(m1);
        find_dates(m1);



    }  

    var ReppreprintWindow = new Ext.Window({
	height      : 600,
        width       : 1350,
	x	    : 0,
        y           : 30,
  //      title       : '',  //'Itemwise Purchase Details',
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
