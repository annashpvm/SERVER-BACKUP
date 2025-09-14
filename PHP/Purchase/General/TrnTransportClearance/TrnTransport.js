Ext.onReady(function(){
   Ext.QuickTips.init();
  var GinFinid =localStorage.getItem('ginfinid');
  var Gincompcode =localStorage.getItem('gincompcode');
  var paymade = 'Y';
  var taxelg = 'N';
  var revcharg = 'Y';


var gstFlag = "Add";


var editrow = 0;
var gridedit = "false";
var viewopt = 0; 

var VendorDataStore = new Ext.data.Store({
  id: 'VendorDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadsupplier"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'sup_code','sup_refname'
  ])
});  

var TransportDataStore = new Ext.data.Store({
  id: 'TransportDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadtransport"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'sup_code','sup_refname'
  ])
}); 
  
var AreaDataStore = new Ext.data.Store({
  id: 'AreaDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadarea"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'p_areacode','p_areaname'
  ])
}); 

var DocNoDataStore = new Ext.data.Store({
  id: 'DocNoDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaddocno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'docno'
  ])
}); 

var DocNolistDataStore = new Ext.data.Store({
  id: 'DocNolistDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaddocnolist"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'docno'
  ])
}); 


var DocNoDetailDataStore = new Ext.data.Store({
  id: 'DocNoDetailDataStore',
  autoLoad : true,
  proxy: new Ext.data.HttpProxy({
            url: 'ClsTransport.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loaddocnodetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from
    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
   't_clr_date','t_clr_grn_party', 't_clr_item', 't_clr_qty', 't_clr_unit', 't_clr_slno', 't_clr_frt_party','t_clr_area', 't_clr_lrno', 't_clr_lrdt',
 't_clr_freight', 't_clr_lorry_frt', 't_clr_demurrage', 't_clr_coolie', 't_clr_others', 't_clr_minno', 't_clr_mindate', 't_clr_gst_yn',
't_clr_itc_yn', 't_clr_cgst_per', 't_clr_sgst_per', 't_clr_igst_per', 't_clr_paymode', 't_clr_acc_vouno', 't_clr_acc_voudate', 'sup_code', 'sup_refname'

  ])
}); 



   var txtDocno = new Ext.form.NumberField({
        fieldLabel  : 'Document No',
        id          : 'txtDocno',
        width       : 80,
        name        : 'Docno',
	readOnly : true
   });
   
   var dtpDate = new Ext.form.DateField({
        fieldLabel : 'Date',
        id         : 'dtpDate',
        name       : 'setdate',
        format     : 'd-m-Y',
        value      : new Date(),
        width :90
   });
   
   
      var cmbParty = new Ext.form.ComboBox({
        fieldLabel      : 'Party Name',
        width           : 250,
        displayField    : 'sup_refname',
        valueField      : 'sup_code',
        hiddenName      : 'sup_refname',
        id              : 'cmbParty',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        tabIndex	: 0,
	store:VendorDataStore
   });
   
        var txtItem =  new Ext.form.TextField({
        id          : 'txtItem',
        fieldLabel  : 'Item Name',
        width       : 250,
        name        : 'txtItem'
   });

   var cmbDocno = new Ext.form.ComboBox({
        fieldLabel      : 'Document No',
        width           : 80,
        id              : 'cmbDocno',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
	displayField    : 'docno',
        valueField      : 'docno',
        hiddenName      : '',
	store:DocNolistDataStore,
    listeners:{
       select:function(){

//alert(cmbDocno.getValue());
//alert(GinFinid);
//alert(Gincompcode);




            if (Number(cmbDocno.getValue()) > 0 )  
            { 
		DocNoDetailDataStore.load({
                url: 'ClsTransport.php',
                params:
                {
                    task:"loaddocnodetail",
	            docno:cmbDocno.getValue(),
		    finid:GinFinid,
        	    compcode:Gincompcode

                },
                callback: function () 
		{
                   flxDetail.getStore().removeAll();

                    var cnt=DocNoDetailDataStore.getCount();
                    txtDocno.setValue(cmbDocno.getValue());


	            if(cnt>0)
		    {                        

//      txtpartyrefdate.setValue(Ext.util.Format.date(POdetailsLoadDataStore.getAt(0).get('phd_party_refdate'),"d-m-Y"));
                           cmbParty.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_grn_party'));
                           txtItem.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_item'));
                           cmbArea.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_area'));
                           cmbTransport.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_frt_party'));
   
                           txtLR.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_lrno'));
                           txtQty.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_qty'));
                           cmbUnit.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_unit'));

                           dtplrdate.setValue(Ext.util.Format.date(DocNoDetailDataStore.getAt(0).get('t_clr_lrdt'),"d-m-Y"));

                           txtfreight.setValue(DocNoDetailDataStore.getAt(0).get('t_clr_freight'));

                           for(var j=0; j<cnt; j++)
		           { 
                               var slno1       = DocNoDetailDataStore.getAt(j).get('t_clr_slno');
                               var transcode1  = DocNoDetailDataStore.getAt(j).get('t_clr_frt_party');
                               var transname1  = DocNoDetailDataStore.getAt(j).get('sup_refname');  
                               var lrno1       = DocNoDetailDataStore.getAt(j).get('t_clr_lrno');
                               var lrdate1     = Ext.util.Format.date(DocNoDetailDataStore.getAt(0).get('t_clr_lrdt'),"Y-m-d");
                               var lrfreight1  = DocNoDetailDataStore.getAt(j).get('t_clr_freight');      
                               var demurrage1  = DocNoDetailDataStore.getAt(j).get('t_clr_demurrage');
                               var loading1    = DocNoDetailDataStore.getAt(j).get('t_clr_coolie');

                               var others1     = DocNoDetailDataStore.getAt(j).get('t_clr_others'); 
                               var total1      = Number(DocNoDetailDataStore.getAt(j).get('t_clr_freight'))+ Number(DocNoDetailDataStore.getAt(j).get('t_clr_demurrage'))+Number(DocNoDetailDataStore.getAt(j).get('t_clr_coolie'))+Number(DocNoDetailDataStore.getAt(j).get('t_clr_coolie'));


                               var cgst1       = DocNoDetailDataStore.getAt(j).get('t_clr_cgst_per');      
                               var sgst1       = DocNoDetailDataStore.getAt(j).get('t_clr_sgst_per');   
                               var igst1       = DocNoDetailDataStore.getAt(j).get('t_clr_igst_per');
                               var revtax      = DocNoDetailDataStore.getAt(j).get('t_clr_itc_yn');
                               var paymode     = DocNoDetailDataStore.getAt(j).get('t_clr_paymode');
                               var RowCnt1     = flxDetail.getStore().getCount() + 1;  
                               flxDetail.getStore().insert(
                               flxDetail.getStore().getCount(),
                                  new dgrecord({
                                      slno:slno1,
                                      transcode: transcode1,
                                      transname: transname1,
                                      lrno : lrno1,
                                      lrdate : Ext.util.Format.date(lrdate1,"Y-m-d"),
                                      lrfreight : lrfreight1,
                                      demurrage: demurrage1,
                                      loading: loading1,
                                      others: others1,
                                      total: total1,
                                      cgst: cgst1,
                                      sgst: sgst1,
                                      igst: igst1,
                         	      paymade:paymode,
			              revtax: revtax,	

                                   })
                                );
                             }
                    }  
                    else {  
                          alert("Detail not found..."); 
                    }    
//if end
                }
                }); 

            }   //if end

         }
}

   });

   
   var cmbArea = new Ext.form.ComboBox({
        fieldLabel      : 'Area Name',
        width           : 250,
        id              : 'cmbArea',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
	displayField    : 'p_areaname',
        valueField      : 'p_areacode',
        hiddenName      : 'p_areaname',
	store:AreaDataStore
   });
   
    var cmbUnit = new Ext.form.ComboBox({
        fieldLabel      : 'Unit',
        width           : 80,
        id              : 'cmbUnit',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : false,
        allowblank      : false,
	store : ['NOS','KGS','LOT','LTR','SET']
   });

    var txtBy = new Ext.form.TextField({
        id          : 'txtBy',
        width       : 30,
        y: 230,
        x:690,
        name        : 'txtBy'
   });
  
   var txtQty = new Ext.form.NumberField({
        fieldLabel  : 'Quantity',
        id          : 'txtQty',
        width       : 75,
        name        : 'txtQty'
   });
   
   var txtLR = new Ext.form.TextField({
        fieldLabel  : 'LR No',
        id          : 'txtLR',
        width       : 80,
        name        : 'txtLR'
   });



function calculateValue(){
//alert("Hai");
//alert(txtfreight.getValue());

     txtTotal.setValue(Number(txtfreight.getValue())+Number(txtdemurrage.getValue())+Number(txtloading.getValue())+Number(txtothexpense.getValue()));
//+Number(txtdemurrage.getValue())+Number(txtloading.getValue())+Number(txtothexpense.getValue()));

}

   
   var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Lorry Freight & GST',
        id          : 'txtfreight',
        width       : 80,
        name        : 'txtfreight',
       enableKeyEvents: true,
       listeners:{
           change:function(){
                calculateValue();
               }, 
          keyup:function(){
                calculateValue();
            },
       }    
   });
      var txtCgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txtCgst',
        width       : 50,
        name        : 'txtCgst'
   });
      var txtSgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txtSgst',
        width       : 50,
        name        : 'txtSgst'
   });
      var txtIgst = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txtIgst',
        width       : 50,
        name        : 'txtIgst'
   });
   
   var txtdemurrage = new Ext.form.NumberField({
        fieldLabel  : 'DEMURRAGE',
        id          : 'txtdemurrage',
        width       : 80,
        name        : 'txtdemurrage',
        enableKeyEvents: true,
       listeners:{
          change:function(){
                calculateValue();
               }, 
          keyup:function(){
                calculateValue();
            },
       } 
   });
      var txtloading = new Ext.form.NumberField({
        fieldLabel  : 'Loading Coolie',
        id          : 'txtloading',
        width       : 80,
        name        : 'txtloading',
        enableKeyEvents: true,
       listeners:{
           change:function(){
                calculateValue();
               }, 
          keyup:function(){
                calculateValue();
            },
       } 
   });
      var txtothexpense = new Ext.form.NumberField({
        fieldLabel  : 'Other Expenses',
        id          : 'txtothexpense',
        width       : 80,
        name        : 'txtothexpense',       
         enableKeyEvents: true,
        listeners:{
           change:function(){
                calculateValue();
               }, 
          keyup:function(){
                calculateValue();
            },
         }
   });
   
     var txtTotal = new Ext.form.NumberField({
        fieldLabel  : 'Total',
        id          : 'txtTotal',
        width       : 100,
        x	    :380,
        y	    :450,
        readOnly    : true,
        name        : 'txtTotal'
   });
   
   var cmbTransport = new Ext.form.ComboBox({
        fieldLabel      : 'Transport',
        width           : 250,
        id              : 'cmbTransport',
        typeAhead       : true,
        mode            : 'local',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        allowblank      : false,
        displayField    : 'sup_refname',
        valueField      : 'sup_code',
        hiddenName      : 'sup_refname',
	tabIndex	: 0,
	store : TransportDataStore
   });

      var btnAdd = new Ext.Button({
        icon:'../icons/download.gif',
        style   : 'text-align:center;',
        text    : "ADD",
        width   : 35,
        x       : 660,
        y       : 50,
    listeners:{
        click: function(){              
            flxDetail.show();
	    var gstadd="true";
            
            if (txtLR.getValue()===0 || txtLR.getRawValue()==""){
                Ext.MessageBox.alert("Transport", "Enter LR No..");
                gstadd="false";
            }  else if (cmbTransport.getValue()===0 || cmbTransport.getRawValue()=="" ){
                Ext.MessageBox.alert("Transport", "Select Transport..");  
                 gstadd="false";
            }else if (txtfreight.getRawValue()===0 || txtfreight.getRawValue()===""){
                Ext.MessageBox.alert("Transport", "Enter Lorry & Freight Charges..");
                 gstadd="false";
            }else if (txtdemurrage.getRawValue()===0 || txtdemurrage.getRawValue()===""){
                Ext.MessageBox.alert("Transport", "Enter Demurrage Charges..");
                 gstadd="false";
            }
            else if (txtloading.getRawValue()===0 || txtloading.getRawValue()===""){
                 Ext.MessageBox.alert("Transport", "Enter Loading Charges..");
                 gstadd="false";
            }
            else if (txtothexpense.getRawValue()===0 || txtothexpense.getRawValue()===""){
                Ext.MessageBox.alert("Transport", "Enter Other Expenses Charges..");
                gstadd="false";
            }
            else if (txtCgst.getRawValue()===0 || txtCgst.getRawValue()===""){
                 Ext.MessageBox.alert("Transport", "Enter CGST..");
                 gstadd="false";
            }
            else if (txtSgst.getRawValue()===0 || txtSgst.getRawValue()===""){
                 Ext.MessageBox.alert("Transport", "Enter SGST..");
                 gstadd="false";
            }
           else if (txtIgst.getRawValue()===0 || txtIgst.getRawValue()===""){
                Ext.MessageBox.alert("Transport", "Enter IGST..");
                gstadd="false";
            }
            else 
            {            
                   if (gstadd=="true")
                   {
                         flxDetail.getSelectionModel().selectAll();
                         var selrows = flxDetail.getSelectionModel().getCount();
                         var sel = flxDetail.getSelectionModel().getSelections();
                         var cnt = 0;
                         for (var i=0;i<selrows;i++){
                         if (sel[i].data.lrno === txtLR.getValue())
                         {
                            cnt = cnt + 1;
                         }
                   }
                   if (gridedit === "true")
                   {
		             gridedit = "false";
                             var idx = flxDetail.getStore().indexOf(editrow);
                             if (Ext.getCmp('opt_selectpaymade').checked === true) 
                             {   
                                paymode = 'Y'; 
                             }
                             else 
                             { 
                                paymode = 'N'; 
                             }
                             if (Ext.getCmp('opt_selectrevcharge').checked === true) 
                             {   
                                revcharg = 'Y'; 
                             }
                             else 
                             { 
                                 revcharg = 'N';  
                             }

                             sel[idx].set('transcode' , cmbTransport.getValue());
		             sel[idx].set('transname' , cmbTransport.getRawValue());
                             sel[idx].set('lrno'      , txtLR.getRawValue());
			     sel[idx].set('lrdate'    , Ext.util.Format.date(dtplrdate.getValue(),"Y-m-d"));
	                     sel[idx].set('lrfreight' , txtfreight.getRawValue());
			     sel[idx].set('demurrage' , txtdemurrage.getRawValue());
			     sel[idx].set('loading'   , txtloading.getRawValue());
			     sel[idx].set('others'    , txtothexpense.getRawValue());
		             sel[idx].set('total'     , txtTotal.getRawValue());
			     sel[idx].set('cgst'      , txtCgst.getRawValue());
			     sel[idx].set('sgst'      , txtCgst.getRawValue());
			     sel[idx].set('igst'      , txtCgst.getRawValue());

                             flxDetail.getSelectionModel().clearSelections();
         	   } //if(gridedit === "true")
           
                   else if (cnt > 0)
                   {
                             Ext.MessageBox.alert("Grid","Same Item  already Entered.");
                   }
                   else
                   {
                             var RowCnt = flxDetail.getStore().getCount() + 1;
                             flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                    slno:RowCnt,
                                    transcode: cmbTransport.getValue(),
                                    transname: cmbTransport.getRawValue(),
                                    lrno : txtLR.getRawValue(),
                                    lrdate : Ext.util.Format.date(dtplrdate.getValue(),"Y-m-d"),
                                    lrfreight : txtfreight.getRawValue(),
                                    demurrage: txtdemurrage.getRawValue(),
                                    loading: txtloading.getRawValue(),
                                    others: txtothexpense.getRawValue(),
                                    total: txtTotal.getRawValue(),
                                    cgst: txtCgst.getRawValue(),
                                    sgst: txtSgst.getRawValue(),
                                    igst: txtIgst.getRawValue(),
	                            paymade:paymade,
                                    revtax: revcharg,	
                                 }) 
                             );
                             txtLR.setValue('');  
                             txtfreight.setValue('');
                             txtdemurrage.setValue('');  
                             txtloading.setValue('');  
                             txtothexpense.setValue('');  
                             txtCgst.setValue('');  
                             txtSgst.setValue('');  
                             txtIgst.setValue('');  
                   }

            }
     } }
   }     
});
   
   
var dgrecord = Ext.data.Record.create([]);
   var flxDetail = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 740,
        x: 0,
        y: 300,
        columns: [
            {header: "S.No", dataIndex: 'slno',sortable:true,width:40,align:'left'},          
            {header: "Transport  ", dataIndex: 'transname',sortable:true,width:200,align:'left'},
            {header: "Trans_code", dataIndex: 'transcode',sortable:true,width:50,align:'right'},
            {header: "LR No", dataIndex: 'lrno',sortable:true,width:100,align:'right'},
            {header: "LR Date", dataIndex: 'lrdate',sortable:true,width:100,align:'left'},
            {header: "FRT-Lorry", dataIndex: 'lrfreight',sortable:true,width:100,align:'left'},
            {header: "Demurrage", dataIndex: 'demurrage',sortable:true,width:100,align:'left'},
            {header: "Loading", dataIndex: 'loading',sortable:true,width:100,align:'left'},
            {header: "Others", dataIndex: 'others',sortable:true,width:100,align:'left'},
            {header: "Total", dataIndex: 'total',sortable:true,width:100,align:'left'},
            {header: "CFRT.CGST", dataIndex: 'cgst',sortable:true,width:100,align:'left'},
            {header: "CFRT.SGST", dataIndex: 'sgst',sortable:true,width:100,align:'left'},
            {header: "CFRT.IGST", dataIndex: 'igst',sortable:true,width:100,align:'left'},
            {header: "Rever.Charge", dataIndex: 'revtax',sortable:true,width:100,align:'left'},
            {header: "Pay Mode", dataIndex: 'paymade',sortable:true,width:100,align:'left'}
        ],
        store:[],
        listeners:{	
          'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
           Ext.Msg.show({
              title: 'TRANSPORT CLEARANCE',
              icon: Ext.Msg.QUESTION,
              buttons: Ext.MessageBox.YESNOCANCEL,
              msg: 'Press YES to Modify   -  NO to Delete',
              fn: function(btn){
        	if (btn === 'yes'){
                   var sm = flxDetail.getSelectionModel();
  		   var selrow = sm.getSelected();
         	   gridedit = "true";
 		   editrow = selrow;
//                   slno:RowCnt,
                        cmbTransport.setValue(selrow.get('transcode'));  
                        cmbTransport.setRawValue(selrow.get('transname'));  
			txtLR.setValue(selrow.get('lrno'));
			dtplrdate.setValue(selrow.get('lrdate'));
			txtfreight.setValue(selrow.get('lrfreight'));
			txtdemurrage.setValue(selrow.get('demurrage'));
			txtloading.setValue(selrow.get('loading'));
			txtothexpense.setValue(selrow.get('others'));	
                        txtTotal.setValue(selrow.get('total'));
  	        	txtCgst.setValue(selrow.get('cgst'));
			txtSgst.setRawValue(selrow.get('sgst'));	
                        txtIgst.setValue(selrow.get('igst'));
                        if (selrow.get('paymade') == "Y")
                        {
                            Ext.getCmp('opt_selectpaymade').setValue(1);
                        }
                        else
                        {
                            Ext.getCmp('opt_selectpaymade').setValue(2);
                        }

                        if (selrow.get('revtax') == "Y")
                        {
                            Ext.getCmp('opt_selectrevcharge').setValue(1);
                        }
                        else
                        {
                            Ext.getCmp('opt_selectrevcharge').setValue(2);
                        }

                }
             }
          });
          }
       }  
   });
   
   var dtplrdate = new Ext.form.DateField({
        fieldLabel : 'LR Date',
        id         : 'dtplrdate',
        name       : 'fromdate',
        format     : 'd-m-Y',
        value      : new Date(),
        width:90
   });
   

	





 /*  var radrevyes = new Ext.form.Radio({id : 'radgen' ,boxLabel: 'Yes',  name: 'rbtag1', inputValue: 'e',x:410, y:260
})

var radrevno = new Ext.form.Radio({id : 'readpro' ,boxLabel: 'No', name: 'rbtag1', inputValue: 'f',x:500,y:260

})*/
   
function RefreshData(){
         flxDetail.getStore().removeAll();
         Ext.getCmp('cmbDocno').hide();
         Ext.getCmp('txtDocno').show();
         gstFlag = "Add";
         VendorDataStore.load({
                url: 'ClsTransport.php',
                params: {
                    task: 'loadsupplier'
                }
            	});

		AreaDataStore.load({
                url: 'ClsTransport.php',
                params: {
                    task: 'loadarea'
                }
	});

	TransportDataStore.load({
				url: 'ClsTransport.php',
				params: {
				    task: 'loadtransport'
				}
	});
        DocNoDataStore.load({
				url: 'ClsTransport.php',
				params: {
				    task: 'loaddocno',
				    compcode:Gincompcode,
				    finid:GinFinid
				},
				callback:function()
				{
				txtDocno.setValue(DocNoDataStore.getAt(0).get('docno'));
				}
	});
  
}

   
   var TransportFormPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : '',
        header      : false,
        width       : 945,
        height      : 650,
        bodyStyle:'background: url(../icons/img1.jpg)',
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TransportFormPanel',
        method      : 'POST',
        layout      : 'absolute',
        tbar: {
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:18,
            items: [{
//EDIT
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png',
                    listeners:{
                       click: function () {
                            gstFlag = "Edit";
                            Ext.getCmp('cmbDocno').show();
                            Ext.getCmp('txtDocno').hide();
                            DocNolistDataStore.load({
				url: 'ClsTransport.php',
				params: {
				    task: 'loaddocnolist',
				    compcode:Gincompcode,
				    finid:GinFinid
				},
				callback:function()
				{
		
				}
                          
                           });
                        }
                    }
                    
                },'-',
                {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png',
	            listeners:{
        	        click:function()
        	        {

        	            var gstSave;
        	            gstSave="true";
        	            if (cmbParty.getValue()===0)
        	            {
        	                Ext.Msg.alert('Pur-Ord','Select Party Name.....');
        	                gstSave="false";
        	            }
        	            
          

                    else{
                        Ext.Msg.show({
                            title: 'Confirmation',
                            icon: Ext.Msg.QUESTION,
                            buttons: Ext.MessageBox.YESNO,
                            msg: 'Do You Want To Save...',
                            fn: function(btn){
                            if (btn === 'yes'){
		   
                            if (gstSave === "true")
                            {  

                            flxDetail.getSelectionModel().selectAll();
                            var transData = flxDetail.getStore().getRange();                                        
                            var transupdData = new Array();
                            Ext.each(transData, function (record) {
                                transupdData.push(record.data);
                            });

                            Ext.Ajax.request({
                            url: 'TrnTransportSave.php',
                            params :
                             {
                                griddet: Ext.util.JSON.encode(transupdData),                                      
                                cnt:transData.length,
                                savetype : gstFlag,
                                docno    : txtDocno.getValue(),
                                compcode : Gincompcode,
				finid : GinFinid,
				transdate : Ext.util.Format.date(dtpDate.getValue(),"Y-m-d"),
				partyname : cmbParty.getValue(),
				itemname : txtItem.getRawValue(),
				qty : txtQty.getRawValue(),
				unit : cmbUnit.getRawValue(),
				area : cmbArea.getValue()
				                    
                              },
                              callback: function(options, success, response)
                              {
                                var obj = Ext.decode(response.responseText);
                                 if (obj['success']==="true"){
                                  
                                    Ext.MessageBox.alert("Document No -" + obj['docno']);
                                    TransportFormPanel.getForm().reset();
                                    flxDetail.getStore().removeAll();
                                    RefreshData();
                                  }else{
                                        Ext.MessageBox.alert("Not Saved! Pls Check!- " + obj['docno']);                                                  
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
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png',
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
                    icon: '../icons/exit.png',
                    listeners:{
                       click: function(){
                            TransportWindow.hide();
                       }
                    }
                    
                }]
        },
        items: [
            {   
                xtype       : 'fieldset',
                title       : '',
                width       : 770,
                height      : 480,
                x           : 8,
                y           : 4,
                border      : true,
                layout      : 'absolute',
                items: [

		    {
                xtype: 'fieldset',
                title: 'Pay Mode',
                layout      : 'absolute',
               	style       : 'padding:0px',
                height:50,
                width:170,
                x: 350,
                y:190,
              items: [
            		{
                	xtype	: 'radiogroup',
			border  :  false,
			
                	x       : 10,
                	y       : 10,
                	columns :  2,
                        id: 'opt_selectpaymade',
                	items: [
                    	{boxLabel: 'Yes', name: 'opt_selectpaymade', inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					paymade = 'Y';
					
					}
                                    }
                                }},
		    {boxLabel: 'No', name: 'opt_selectpaymade', inputValue: '2',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					paymade = 'N';
					
					}
                                    }
                                }},
		   
                ]
            },
 	  



        ]
            },
/*
    {
                xtype: 'fieldset',
                title: 'Tax ELIGIBLE (YES / NO)',
                layout      : 'absolute',
               	style       : 'padding:0px',
                height:50,
                width:170,
                x: 400,
                y:190,
              items: [
            		{
                	xtype	: 'radiogroup',
			border  :  false,
                	x       : 10,
                	y       : 10,
                	columns :  2,
                	items: [
                    	{boxLabel: 'Yes', name: 'opt_selecttaxelg', inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					taxelg = 'Y'
					
					}
                                    }
                                }},
		    {boxLabel: 'No', name: 'opt_selecttaxelg', inputValue: '2',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					taxelg = 'N'
					
					}
                                    }
                                }},
		   
                ]
            },
 	  



        ]
            },
*/

    {
                xtype: 'fieldset',
                title: 'Reverse Charges',
                layout      : 'absolute',
               	style       : 'padding:0px',
                height:50,
                width:170,
                x: 560,
                y:190,
              items: [
            		{
                	xtype	: 'radiogroup',
			border  :  false,
                	x       : 10,
                	y       : 10,
                	columns :  2,
                         id: 'opt_selectrevcharge',

                	items: [
                    	{boxLabel: 'Yes', name: 'opt_selectrevcharge', inputValue: '1',checked : true, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					revcharg  ='Y'
					
					}
                                    }
                                }},
		    {boxLabel: 'No', name: 'opt_selectrevcharge', inputValue: '2',checked : false, listeners: {
			check: function (rb,checked) {
                             	if(checked===true){
					revcharg  ='N'
					
					}
                                    }
                                }},
		   
                ]
            },
 	  



        ]
            },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 200,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [txtDocno]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 200,
                        x           : 0,
                        y           : 0,
                        defaultType : 'textfield',
                        border      : false,
                        items: [cmbDocno]
                    },
                    {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 150,
                        x           : 220,
                        y           : 0,
                        labelWidth  : 35,
                        border      : false,
                        items : [dtpDate]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 400,
                        x           : 380,
                        y           : 0,
                        border      : false,
                        items: [cmbParty,txtItem,cmbArea]
                    },
                   
                      { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 200,
                        height :45,
                        x           : 0,
                        y           : 45,
                        border      : false,
                        items: [txtQty]
                    },
{ 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 40,
                        width       : 200,
                        height :45,
                        x           : 220,
                        y           : 45,
                        border      : false,
                        items: [cmbUnit]
                    }, { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 400,
                        
                        x           : 0,
                        y           : 100,
                        border      : false,
                        items: [cmbTransport]
                    },
{ 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 170,
                        height :45,
                        x           : 380,
                        y           : 100,
                        border      : false,
                        items: [txtLR]
                    },{ 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 60,
                        width       : 170,
                        height :45,
                        x           : 540,
                        y           : 100,
                        border      : false,
                        items: [dtplrdate]
                    },
                   
                  /*  { 
                        xtype       : 'fieldset',
                        title       : 'Reverse Charges',
                        labelWidth  : 50,
                        width       : 170,
                        height :45,
                        x           : 400,
                        y           : 250,
                        border      : true,
                        items: [ ]
                    },radrevyes,radrevno,*/
                   /*  { 
                        xtype       : 'fieldset',
                        title       : 'Tax ELIGIBLE (YES / NO)',
                        labelWidth  : 50,
                        width       : 170,
                        height :45,
                        x           : 400,
                        y           : 190,
                        border      : true,
                        items: [ ]
                    },*/
                      { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 220,
                        height :55,
                        x           : 0,
                        y           : 140,
                        border      : false,
                        items: [ txtfreight]
                    },{ 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 130,
                        height :45,
                        x           : 220,
                        y           : 140,
                        border      : false,
                        items: [txtCgst ]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 130,
                        height :45,
                        x           : 350,
                        y           : 140,
                        border      : false,
                        items: [txtSgst ]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 130,
                        height :45,
                        x           : 500,
                        y           : 140,
                        border      : false,
                        items: [txtIgst ]
                    }, { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 205,
                        height :45,
                        x           : 0,
                        y           : 180,
                        border      : false,
                        items: [ txtdemurrage]
                    },{ 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 250,
                        height :55,
                        x           : 0,
                        y           : 220,
                        border      : false,
                        items: [txtloading]
                    },
                    { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 255,
                        height :55,
                        x           : 0,
                        y           : 255,
                        border      : false,
                        items: [txtothexpense]
                    },
                     { 
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 50,
                        width       : 180,
                        height :55,
                        x           : 220,
                        y           : 260,
                        border      : false,
                        items: [txtTotal]
                    },{
                        xtype       : 'fieldset',
                        title       : '',
                        labelWidth  : 90,
                        width       : 440,
                        x           : 600,
                        y           : 260,
                        
                        border      : false,
                        items: [btnAdd]
                    },flxDetail
                    
                   
                    
                ]
            }
        ]
    });
    
 
    
    var TransportWindow = new Ext.Window({
	height      : 560,
        width       : 800,
        y           : 35,
        title       : 'Transport & Clearance',
        items       : TransportFormPanel,
        layout      : 'absolute',
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
	border      : false,
        draggable   : false,
	listeners:
	{
          show:function(){
             RefreshData()
               }
        }
    });
    TransportWindow.show();  
});

