Ext.onReady(function(){
    Ext.QuickTips.init();
    var GinFinid = localStorage.getItem('ginfinid');
    var Gincompcode = localStorage.getItem('gincompcode');
    var finstartdate = localStorage.getItem('gfinstdate');
    var finenddate = localStorage.getItem('gfineddate');
 
     //	localStorage.setItem("gfinstdate",finstdate);
 
     var gstfinyear = localStorage.getItem('gstyear');
    var userid = localStorage.getItem('ginuserid');
    var usertype = localStorage.getItem('ginuser');
 
 
    usertype = 1
    var  gsttype = localStorage.getItem('GSTTYPE');
    var  invfin = localStorage.getItem('invfin');
 
    var  fromyear = localStorage.getItem('fromyear');
    var  toyear = localStorage.getItem('toyear');



    var frtpartycode =0;
    var printtype = "PDF";
    var loadSearchFrtPartyListDatastore = new Ext.data.Store({
        id: 'loadSearchFrtPartyListDatastore',
  //      autoLoad : true,
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsTrnSalesInvoice.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task:"loadSearchFrtPartylist"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
   
            'cust_code', 'cust_ref','cust_led_code','cust_cr_days' , 'cust_grace_days','area_code', 'rate_areacode','area_rategrp','cust_partygroup','cust_destination_enable_yn'
   
        ]),
      });


      var loadFreightDetailsDataStore = new Ext.data.Store({
        id: 'loadFreightDetailsDataStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsTrnSalesInvoice.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task:"loadFreightPartyDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
   
            {name: 'invh_date',            type       : 'date',
                dateFormat : 'Y-m-d H:i:s'},   // ✅ IMPORTANT},
            {name: 'cust_ref'},
            {name: 'invh_invrefno'},
            {
                name: 'invh_totwt',
                type: 'float',
                convert: function (v) {
                    return (parseFloat(v) || 0) / 1000;
                }
            }
   
        ]),
      });      
  
    var dtpstdate = new Ext.form.DateField({
        fieldLabel : 'From Date',
        id         : 'dtpstdate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
        labelStyle	: "font-size:12px;font-weight:bold;",

        width : 110,
                  enableKeyEvents: true,
        listeners:{
                change:function(){
                 
                },
               blur:function(){
                 
               },
               keyup:function(){
                 
                },
        }
    });
    
    var dtpeddate = new Ext.form.DateField({
        fieldLabel : 'To Date',
        id         : 'dtpeddate',
        name       : 'date',
        format     : 'd-m-Y',
        value      : new Date(),
        labelStyle	: "font-size:12px;font-weight:bold;",

        width : 110,
               enableKeyEvents: true,   
        listeners:{
                change:function(){
                 
                },
               blur:function(){
                 
               },
               keyup:function(){
                 
                },
        }
    });



    function grid_tot(){

        var wt = 0;	
        var fwt = 0;	
        var iwt = 0;	

        var Row= flxData.getStore().getCount();
        flxData.getSelectionModel().selectAll();
        var sel=flxData.getSelectionModel().getSelections();
        for(var i=0;i<Row;i++)

        {
              wt=wt+Number(sel[i].data.invh_totwt);
         }
         txtQtyTotal.setValue(Ext.util.Format.number(wt,'0.000'));
         txtFrtTotal.setValue(Ext.util.Format.number(wt*Number(txtFrtMT.getValue()),'0.00'));

}

    

var dgrecord = Ext.data.Record.create([]);
var flxData = new Ext.grid.EditorGridPanel({
     frame: false,
     sm: new Ext.grid.RowSelectionModel(),
     autoShow: true,
     stripeRows : true,
     scrollable: true,
     height: 250,
     width: 550,
     labelStyle	: "font-size:12px;font-weight:bold;",
     style      :"border-radius: 5px;textTransform: uppercase; ",  
     columns: [   
     {header: "Date", dataIndex: 'invh_date',sortable:true,width:100,align:'left',hidden:false,   renderer  : Ext.util.Format.dateRenderer('d-m-Y')},   
     {header: "Customer ", dataIndex: 'cust_ref',sortable:true,width:250,align:'left',hidden:false},   
     {header: "Inv No.", dataIndex: 'invh_invrefno',sortable:true,width:100,align:'left'},     
     {header: "Inv Wt", dataIndex: 'invh_totwt',sortable:true,width:70,align:'right',hidden:false,
        renderer  : function (v) {
            return Ext.util.Format.number(v, '0.000');
        }        
     },   
     ],
     store  : loadFreightDetailsDataStore,

 listeners:{	


         }



});


     
 var btnView = new Ext.Button({
    id      : 'btnView',
    style   : 'text-align:center;',
    text    : "VIEW",
    tooltip : 'VIEW',
    width   : 100,
    height  : 30,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){


        if (txtFreightParty.getRawValue() == '')
            frtpartycode = 0;
        loadFreightDetailsDataStore.load({
            url: 'ClsTrnSalesInvoice.php',
            params: {
                task: 'loadFreightPartyDetails',
                frtpary  : frtpartycode,
                compcode : Gincompcode,
                finid    : GinFinid,
                fromdate : Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"), 
                todate   : Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"),                 
            },
            callback:function()
            {
                grid_tot();
            }
        });    
        
        
       }
    }
});    


     
var btnPrint = new Ext.Button({
    id      : 'btnPrint',
    style   : 'text-align:center;',
    text    : "PRINT",
    tooltip : 'PRINT',
    width   : 100,
    height  : 30,
  
    labelStyle : "font-size:12px;font-weight:bold;color:#b8309f",

    border: 1,
    style: {
           borderColor: 'blue',
           borderStyle: 'solid',

    },
     tabindex : 1,
    listeners:{
       click: function(){
        if (txtFreightParty.getRawValue() == '')
            frtpartycode = 0;

              var p1 = "&compcode="+encodeURIComponent(Gincompcode);      
              var p2 = "&finid=" + encodeURIComponent(GinFinid);
              var p3 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dtpstdate.getValue(),"Y-m-d"));	
              var p4 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dtpeddate.getValue(),"Y-m-d"));	
              var p5 = "&party=" + encodeURIComponent(frtpartycode);
              var p6 = "&frtamt=" + encodeURIComponent(Number(txtFrtMT.getValue()));
              var param = (p1+p2+p3+p4+p5+p6) ;
              if (printtype == "PDF") 
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesFreightDetails.rptdesign&__format=pdf&' + param, '_blank');
              else if (printtype == "XLS") 
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesFreightDetails.rptdesign&__format=XLS' + param, '_blank');
              else
                  window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/RepSalesFreightDetails.rptdesign' + param, '_blank');	


       }
    }
});    



    function flx_change()
    {
    
                var sm = flxParty.getSelectionModel();
                var selrow = sm.getSelected();
                var chkitem = (selrow.get('cust_code'));
                frtpartycode  = 0;
                custledcode = 0;
                if ((selrow != null)){
    
                    gridedit = "false";
                    editrow = selrow;
                    frtpartycode = selrow.get('cust_code');
                    custledcode = selrow.get('cust_led_code');
    
                    custname = selrow.get('cust_ref');
                    txtFreightParty.setRawValue(selrow.get('cust_ref'));
                    flxParty.hide();
                    }
      }
                           
    
    


  
      
var dgrecord = Ext.data.Record.create([]);
var flxParty = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    autoShow: true,
    stripeRows : true,
    scrollable: true,
    height: 280,
    width: 400,
//        header : false,
    x: 130,
    y: 230,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;textTransform: uppercase; ",  
    columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
    {header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
    {header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
    {header: "Customer Code", dataIndex: 'cust_led_code',sortable:true,width:60,align:'left',hidden:true},   


    ],
    store:loadSearchFrtPartyListDatastore,

listeners:{	

         'render' : function(cmp) {
                cmp.getEl().on('keypress', function(e) {
                    if (e.getKey() == e.ENTER) {
                       flx_change();
                    }
                 });
         },

    'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
                       flx_change();
    
     }

        }



});

function PartySearch()
{
       flxParty.show();
       loadSearchFrtPartyListDatastore.removeAll();
       loadSearchFrtPartyListDatastore.load({
       url: 'ClsTrnSalesInvoice.php',
       params:
       {
           task:"loadSearchFrtPartylist",
           party : txtFreightParty.getRawValue(),
       },
       });
}

    var txtFreightParty = new Ext.form.TextField({
       fieldLabel  : 'Freight Party',
       id          : 'txtFreightParty',
       name        : 'txtFreightParty',
       width       :  350,
    //   labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       style      :"border-radius: 5px;textTransform: uppercase; ", 
       labelStyle	: "font-size:12px;font-weight:bold;",
   enableKeyEvents: true,
   listeners:{
         specialkey:function(f,e){
            if (e.getKey() == e.ENTER)
            {
                  flxchk = 1;
                    

                  flxParty.hide();
//                   btnAdd.focus();
          
            }
            if (e.getKey() == e.DOWN)
            {

            flxParty.getSelectionModel().selectRow(0)
            flxParty.focus;
            flxParty.getView().focusRow(0);
            }
         },

       keyup: function () {
               loadSearchFrtPartyListDatastore.removeAll();
                 if (txtFreightParty.getRawValue() != '')
                    PartySearch();
           }
        }  
   });


    var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer.',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  400,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });
    
    var txtFreightPartyOld = new Ext.form.TextField({
        fieldLabel  : 'Old Freight Party',
        id          : 'txtFreightPartyOld',
        name        : 'txtFreightPartyOld',
        width       :  400,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });
    
 

    var txtFrtMT = new Ext.form.NumberField({
        fieldLabel  : 'Feight / Mt',
        id          : 'txtFrtMT',
        name        : 'txtFrtMT',
        width       :  100,
//	readOnly : true,
decimalPrecision : 2,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    enableKeyEvents: true,
    listeners:{ 

        
        blur   : grid_tot,
        change : grid_tot,
        keyup : grid_tot,
    }
    });

    var txtQtyTotal = new Ext.form.TextField({
        fieldLabel  : 'Total Qty ',
        id          : 'txtQtyTotal',
        name        : 'txtQtyTotal',
        width       :  100,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });
    
    var txtFrtTotal = new Ext.form.TextField({
        fieldLabel  : 'Total Feight ',
        id          : 'txtFrtTotal',
        name        : 'txtFrtTotal',
        width       :  100,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });    
    var txtInvWeight = new Ext.form.TextField({
        fieldLabel  : 'Inv. Weight(t)',
        id          : 'txtInvWeight',
        name        : 'txtInvWeight',
        width       :  100,
	readOnly : true,
    labelStyle	: "font-size:12px;font-weight:bold;",
    style      :"border-radius: 5px;", 
    });

    var dptInvNo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptInvNo',
        name: 'Date',
        format: 'd-m-Y',
        readOnly : true,

        value: new Date(),
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px;  textTransform: uppercase ", 
        enableKeyEvents: true,
        listeners:{
        }  	
        
    });

 
    var loadInvoicedetailsDataStore = new Ext.data.Store({
        id: 'loadInvoicedetailsDataStore',
        
        proxy: new Ext.data.HttpProxy({
                  url: 'ClsTrnSalesInvoice.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task:"loadInvoiceNoDetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
      'cust_code','cust_ref','cust_phone','invh_date','invh_party','invh_slipno','invh_agent','invh_docu','invh_our_bank','invh_crd_days','invh_grace_days',
  'invh_odiper','invh_vehi_no','invh_trans','invh_lrno','invh_lrdate','invh_dest','invh_desp_location','invh_lcno','invh_lcdate','invh_party_bank',
  'invh_delivery_add1','invh_delivery_add2','invh_delivery_add3','invh_delivery_city','invh_delivery_pin','invh_delivery_gst','invh_statecode','invh_taxtag',
  'invh_instruction','invh_instruction','invh_dest','invh_party_ordno','invh_party_orddt','invh_our_ordno','invh_our_orddt','invh_sgst_per','invh_cgst_per',
  'invh_igst_per','invh_insper','invh_comm','invh_frt_rate','invh_frt_amt','invh_party_bank','invh_noofbun','invh_noofreels','invh_type','type_name',
  'invh_vouno','invh_acc_refno','invh_seqno','invh_ewaybillno','U_TCSStatus','invh_tcs_per','invh_grace_days', 'invh_tcs_amt','SMSsent','invh_frtqty','invh_delivery_statecode' ,'invh_acc_refno','invh_distance','U_EWBStatus','E_inv_confirm',
  'invh_transportname' ,'invh_transportGST','U_ReUpload','U_AckNo','U_EWayBillNo','U_QR', 'U_irnno','invh_frtparty','freightParty','invh_totwt','cust_name'
   
        ]),
      });    

    var loadInvoicelistDataStore = new Ext.data.Store({
        id: 'loadInvoicelistDataStore',

        proxy: new Ext.data.HttpProxy({
                  url: 'ClsTrnSalesInvoice.php',      // File to connect to
                  method: 'POST'
              }),
              baseParams:{task:"loadInvoiceNoList2"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
                    // we tell the datastore where to get his data from
          root: 'results',
          totalProperty: 'total',
          id: 'id'
        },[
      'invh_invrefno','invh_seqno'
        ]),
      });
  
    var cmbInvNo = new Ext.form.ComboBox({
        fieldLabel      : 'Inv No.',
        width           : 130,
        displayField    : 'invh_invrefno', 
        valueField      : 'invh_seqno',
        hiddenName      : '',
        id              : 'cmbInvNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadInvoicelistDataStore ,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
        tabIndex	: 0,
        allowblank      : true  ,
        labelStyle	: "font-size:12px;font-weight:bold;",
        style      :"border-radius: 5px;  textTransform: uppercase ",         
        listeners:{
                select: function () {

                    txtInvWeight.setRawValue('');
                    txtCustomer.setRawValue('');
                    txtFreightPartyOld.setRawValue('');

                    loadInvoicedetailsDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params: {
                            task: 'loadInvoiceNoDetails',
                            invno:cmbInvNo.getValue(),
                            compcode :Gincompcode,
                            finid:GinFinid
                        },
                        callback:function()
                        {
                           partycode = loadInvoicedetailsDataStore.getAt(0).get('invh_party');
                           dptInvNo.setRawValue(Ext.util.Format.date(loadInvoicedetailsDataStore.getAt(0).get('invh_date'),"d-m-Y"));
                           txtInvWeight.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('invh_totwt')/1000);
                           txtCustomer.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('cust_name'));
                           txtFreightPartyOld.setRawValue(loadInvoicedetailsDataStore.getAt(0).get('freightParty'));
                           frtpartycode= loadInvoicedetailsDataStore.getAt(0).get('invh_frtparty');
                        }
                    });    

                }
            }                
        });

 
 var TrnSalesInvoicePanel = new Ext.FormPanel({
     renderTo    : Ext.getBody(),
     xtype       : 'form',
     title       : 'SALES INVOICE ENTRY',
     header      : false,
     width       : 1300,
     height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
     x           : 0,
     y           : 0,
     frame       : false,
     id          : 'TrnSalesInvoicePanel',
     method      : 'POST',
     layout      : 'absolute',
     tbar: {
         xtype: 'toolbar',
         height: 40,
         fontSize:18,
         items: [
            {
                text: 'Update',
                id  : 'save',
                style  : 'text-align:center;',
                tooltip: 'Save Details...',
                height: 40,
                fontSize:30,
                width:70,
                icon: '/Pictures/save.png',
                listeners:{
                    click:function()
                    {
   
                        Ext.Ajax.request({
                            url: 'TrnSalesInvoiceFrtPartyUpdate.php',
                            params :
                            {
                                invhcompcode  : Gincompcode,
                                invhfincode   : GinFinid,
                                invhrefno     : cmbInvNo.getRawValue(),
                                frtparty      : frtpartycode,
                                                               
                            },
                            callback: function(options, success, response)
                            {
                                Ext.MessageBox.alert("Freight Party Name  -Updated "); 
                                TrnSalesInvoicePanel.getForm().reset();
                                RefreshData();
              
                            }
                        }); 
                    }
                }
            },'-',
            {
                text: 'Exit',
                style  : 'text-align:center;',
                tooltip: 'Close...',
                height: 40,
                fontSize:30,
                width:70,
                icon: '/Pictures/exit.png',
                listeners:{
                    click: function(){
                        TrnSalesInvoiceWindow.hide();
                    }
                }
            }]
        },
         items: [ 
                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 120,
                    width       : 400,
                    x           : 20,
                    y           : 30,
                    border      : false,
                    items: [cmbInvNo]
                },

                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 50,
                    width       : 400,
                    x           : 300,
                    y           : 30,
                    border      : false,
                    items: [dptInvNo]
                },

                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 120,
                    width       : 400,
                    x           : 20,
                    y           : 70,
                    border      : false,
                    items: [txtInvWeight]
                },                

                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 120,
                    width       : 600,
                    x           : 20,
                    y           : 110,
                    border      : false,
                    items: [txtCustomer]
                },                
                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 120,
                    width       : 600,
                    x           : 20,
                    y           : 150,
                    border      : false,
                    items: [txtFreightPartyOld]
                },         
                { 
                    xtype       : 'fieldset',
                    title       : '',
                    labelWidth  : 120,
                    width       : 600,
                    x           : 20,
                    y           : 190,
                    border      : false,
                    items: [txtFreightParty]
                } , flxParty,
                {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        height      : 500,
                        x           : 600,
                        y           : 10,
                        border      : true,
                        layout      : 'absolute',
                        items:[
                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 80,
                                width       : 220,
                                x           : 0,
                                y           : 0,
                                border      : false,
                                items: [dtpstdate]
                            },
                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 80,
                                width       : 220,
                                x           : 230,
                                y           : 0,
                                border      : false,
                                items: [dtpeddate]
                            }, 


                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 80,
                                width       : 400,
                                x           : 0,
                                y           : 70,
                                border      : false,
                                items: [txtFrtMT]
                            },                
            
                            {
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 100,
                                width       : 400,
                                x           : 450,
                                y           : 70,	
                                border      : false,
                                items: [btnView] 
                            },  
                            
                            { 
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 1,
                                width       : 700,
                                height      : 350,                                
                                x           : 0,
                                y           : 110,
                                border      : false,
                                items: [flxData]
                            },    

                            {
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 100,
                                width       : 400,
                                x           : 330,
                                y           : 380,	
                                border      : false,
                                items: [txtQtyTotal] 
                            },   

                                        
                            {
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 100,
                                width       : 400,
                                x           : 330,
                                y           : 410,	
                                border      : false,
                                items: [txtFrtTotal] 
                            },   


                            {
                                xtype       : 'fieldset',
                                title       : '',
                                labelWidth  : 100,
                                width       : 400,
                                x           : 450,
                                y           : 440,	
                                border      : false,
                                items: [btnPrint] 
                            },                              
                                                        
                        ]
                },

         ]
    });            


    function RefreshData()
    {

    }
    var TrnSalesInvoiceWindow = new Ext.Window({
            height      : 600,
            width       : 1250,
            y           : 30,
            title       : 'SALES - FREIGHT PARTY MODIFICATIONS',
            items       : TrnSalesInvoicePanel,
            layout      : 'fit',
            closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
            minimizable : true,
            maximizable : true,
            resizable   : false,
            border      : false,
            draggable   : false,
            onEsc:function(){
            },
            listeners:{
                show:function(){
                    flxParty.hide();
                    loadInvoicelistDataStore.removeAll();
                    loadInvoicelistDataStore.load({
                        url: 'ClsTrnSalesInvoice.php',
                        params: {
                                    task: 'loadInvoiceNoList2',
                                    compcode:Gincompcode,
                                    finid:GinFinid ,
                                },
                        callback:function()
                        {
                            
                        }
                    });    

                }
            }    
            });         
    

    TrnSalesInvoiceWindow.show();  
});
    