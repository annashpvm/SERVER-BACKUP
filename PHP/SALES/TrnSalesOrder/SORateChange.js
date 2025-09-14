Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
   var fm = Ext.form;
   var userid   = localStorage.getItem('ginuser');
   var usertype = localStorage.getItem('ginusertype');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var finStartDate = localStorage.getItem('gfinstdate');
   var finEndDate = localStorage.getItem('gfineddate');

   
   var fincode_approval = 0;

   var gstFlag = "Add";
   var dealercode = 0;
   var repcode = 0;
   var custtype = 0;
   var taxcode = 0;
   var ins = "N";
   var insper = 0;
   var gstadd ="true";
   var viewopt = 0;

   var editrow = 0;
   var gridedit = "false";
   var sotype = localStorage.getItem('SOTYPE');
   var fwt = 0;
   var iwt = 0;    
   var reelnolist = '';

   var shade = 'NAT';

   var displaysize = ""; 

 var custcode = 0;
 var custname = 0;
 var custledcode = 0;

 var areacode    = 0;
 var areagrpcode = 0;

 var cust_area_price = 'cust';
 var cust_area_priceType = 'C';

var ExtraAmt_PT = 0;
var pricearea = 0;
var pricearea = 0;
var gnos = 0;

var varietycode = 0;
var vargrpcode = 0;



 var loadPassword = new Ext.data.Store({
      id: 'loadPassword',
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/clsuser.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findSubjectPassword"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
           'nos', 'pw_password'
      ]),
    });

/*
   function check_password()
   {



		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: 'ClsTrnSalesOrder.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'SALES',
		       subject  : 'REVISION',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
                            Ext.getCmp('save').setDisabled(false);
                          }
                          else     
                          {   
                               Ext.getCmp('save').setDisabled(true);
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                               Ext.getCmp('save').setDisabled(true);
                      }           

                    }

                });   
              }

                   }   
      if (txtPassword.getRawValue() == "changeratenew")
      {
          Ext.getCmp('save').setDisabled(false);
      }
      else
      {
          Ext.getCmp('save').setDisabled(true);
      }    


   }   


   var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'PassWord',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType   : 'password',
        fieldStyle  : 'text-transform:uppercase',
        width       :  110,
 //	readOnly    : true,
    	labelStyle  : "font-size:12px;font-weight:bold;",
    	style       :"border-radius: 5px;",
 	enableKeyEvents: true,
        listeners   :{

          change: function (obj, newValue) {
//            console.log(newValue);
//            obj.setRawValue(newValue.toUpperCase());
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

*/

    var txtPassword = new Ext.form.TextField({
        fieldLabel  : 'Password',
        id          : 'txtPassword',
        name        : 'txtPassword',
        inputType: 'password',
        width       :  150,
        border      : false,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
		    if (txtPassword.getValue() == "")
		       alert("Enter Password ...");
                    else
                    {
                    loadPassword.removeAll();
                    loadPassword.load({
	            url: '/SHVPM/clsuser.php',
                    params: {
		       task: 'findSubjectPassword',
		       dept     : 'SALES',
		       subject  : 'SO RATE REVISION',
                    },
                    callback: function () 
    	           {
                      if (loadPassword.getAt(0).get('nos') > 0)
                      {
                          if(loadPassword.getAt(0).get('pw_password')== txtPassword.getRawValue())
                          {
                              Ext.getCmp('save').setDisabled(false);
                              Ext.getCmp('save').focus(false, 200);
                          }
                          else     
                          {   
                             alert("Password is Error. Please check ...");
                              Ext.getCmp('save').setDisabled(true);
                          }    
                      }
                      else
                      {
                        alert("Password is Error. Please check ...");
                      }           

                    }

                });   


                    }           

             }
          },

        } 
    });


new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                save_click();       

            }
        }]);



new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                TrnSORATEChange.hide();
            }
        }]);




  var dptStartDate= new Ext.form.DateField({
        fieldLabel: 'Strat Date',
        id: 'dptStartDate',
        name: 'dptStartDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });

  var dptEndDate= new Ext.form.DateField({
        fieldLabel: 'End Date',
        id: 'dptEndDate',
        name: 'dptEndDate',
        format: 'd-m-Y',
    //    readOnly : true,
        value: new Date()
    });





var btnPrint = new Ext.Button({
          border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
    text    : "PRINT",
    width   : 80,
    height  : 35,
    listeners:{
        click: function(){    
		var p1 = "&compcode=" + encodeURIComponent(Gincompcode);
		var p2 = "&fromdate=" + encodeURIComponent(Ext.util.Format.date(dptStartDate.getValue(),"Y-m-d"));
		var p3 = "&todate=" + encodeURIComponent(Ext.util.Format.date(dptEndDate.getValue(),"Y-m-d"));

//alert(printtype);

                var param = (p1+p2+p3) ;
	    	window.open('http://10.0.0.251:8080/birt/frameset?__report=Sales/Rpt_RateRevision.rptdesign&__format=pdf&' + param, '_blank');
     }
   }
});         


 var loadOrderNoListDataStore = new Ext.data.Store({
      id: 'loadOrderNoListDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsTrnSalesOrder.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadOrderNoList_for_RateRevision"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'ordh_sono'
      ]),
    });



var LoadordernoItemDetailsDatastore = new Ext.data.Store({
        id: 'LoadordernoItemDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadorderdetailstrailer"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ordt_comp_code','ordt_fincode','ordt_sono','ordt_var_code','ordt_qty','ordt_adv_qty','ordt_apprno','ordt_rate','ordt_cappr_no', ,'ordt_qcdev_yn','ordt_loss_pmt', 'ordt_despdt', 'ordt_crdays', 'ordt_clo_stat', 'ordt_clo_reason', 'ordt_adv_tag', 'ordt_des_tag', 'ordt_approved', 'ordt_ma_tag', 'var_code', 'var_name', 'var_grpcode', 'var_unit', 'var_size1', 'var_size2', 'var_reams', 'var_sheets','shade_shortname','ordt_stk_wt','ordt_stk_reels', 'var_tariffno','var_desc','var_typecode','var_bf','var_gsm','var_shade','var_inchcm','ordt_no_of_reels','ordt_fin_wt','ordt_inv_wt'
])
    });


var LoadordernoDetailsDatastore = new Ext.data.Store({
        id: 'LoadordernoDetailsDatastore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsTrnSalesOrder.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadordernodetails1"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['ordh_comp_code','ordh_fincode','ordh_sono','ordh_sodate','ordh_ref','ordh_refdt','ordh_party','ordh_type','ordh_trans','ordh_rep','ordh_tax','ordh_odiper',
'ordh_docu','ordh_bank','ordh_dest','ordh_can_stat','ordh_can_reason','ordh_cust_rem','ordh_our_rem','ordh_ins_yn','ordh_insper','ordh_agent',
'ordh_delivery_add1','ordh_delivery_add2','ordh_delivery_add3','ordh_delivery_city','ordh_delivery_pin','ordh_delivery_gst','ordh_gracedays','ordh_cashdisdays1',
'ordh_cashdisdays2','ordh_cashdisdays3','ordh_cashdisdays4','ordh_cashdisper1','ordh_cashdisper2','ordh_cashdisper3','ordh_cashdisper4','ordh_cashdisamt1',
'ordh_cashdisamt2','ordh_cashdisamt3','ordh_cashdisamt4','ordh_cgst','ordh_sgst','ordh_igst','cancelflag','cust_ref','tax_name',
'tax_sgst','tax_cgst','tax_igst','sup_name','repr_name','type_name','agentname','ordh_creditdays','ordh_gracedays','ordh_comm','ordh_apprno','ordh_appr_type',
'ordh_destination'
])
    });



var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        readOnly    : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{

         }  
    });


   var txtPriceIncrease = new Ext.form.NumberField({
        fieldLabel  : 'Price Increase',
        id          : 'txtPriceIncrease',
        name        : 'txtPriceIncrease',
        width       :  80,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });




function save_click()
{
        var gstSave = "true";
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
            var SalesData = flxDetail.getStore().getRange();                                        
            var SalesupData = new Array();
            Ext.each(SalesData, function (record) {
                SalesupData.push(record.data);
            });


            Ext.Ajax.request({
            url: 'TrnSalesOrderRateRevisionSave.php',
            params :
             {
		cnt: SalesData.length,
               	griddet: Ext.util.JSON.encode(SalesupData),    
                savetype     : gstFlag,
             	ordhcompcode : Gincompcode,
		ordhfincode: GinFinid,
                ordhackno    : Number(cmbSONo.getValue()),
		ordhackdate  : Ext.util.Format.date(dptSONo.getValue(),"Y-m-d"),
		ordhparty    : custcode,
                userid       : UserId,
		},
              callback: function(options, success, response)
              {
                var obj = Ext.decode(response.responseText);
		
                 if (obj['success']==="true")
			{                                
                    Ext.MessageBox.alert("Sales Order Rate  Modified -" + obj['msg']);
                    TrnSORATEPanel.getForm().reset();
                    flxDetail.getStore().removeAll();
       //             RefreshData();
                  }else
			{
Ext.MessageBox.alert("Sales Order Rate Not Saved! Pls Check!- " + obj['msg']);                                                  
                    }
                }
           });         

          	}
		}
            }
        });

}


 var dptSONo= new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dptSONo',
        name: 'Date',
        format: 'd-m-Y',
        width       :  120,
        readOnly : true,
        value: new Date(),
         	labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
       	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          datecheck();
		          cmbPO.focus();
		     }
		  },
 
           blur:function(){
              datecheck();
           },
           keyup:function(){
              datecheck();
            },
        }  

 });

var dptPO= new Ext.form.DateField({
     fieldLabel: 'PO.Date',
     id: 'dptPO',
     name: 'Date',
     format: 'd-m-Y',
     value: new Date(),
        readOnly    : true,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          POdatecheck();
		          txtCustomer.focus();
		     }
		  } ,
           blur:function(){
              POdatecheck();
           },
           keyup:function(){
              POdatecheck();
            }, 
        }  

 });

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:10,
    y:240,
    height: 250,
    hidden:false,
    width: 950,
    id: 'my-grid',  

    columns:
    [ 	 
        {header: "S.No"    , dataIndex: 'sno',sortable:false,width:40,align:'left', menuDisabled: true},	
        {header: "Variety" , dataIndex: 'varname',sortable:false,width:160,align:'left', menuDisabled: true},
        {header: "VarCode" , dataIndex: 'varcode',sortable:false,width:70,align:'left', menuDisabled: true,hidden:true},
        {header: "Shade "  , dataIndex: 'shade',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "BF"      , dataIndex: 'bf',sortable:false,width:50,align:'left', menuDisabled: true},
        {header: "GSM "    , dataIndex: 'gsm',sortable:false,width:60,align:'left', menuDisabled: true},

        {header: "Size In" , dataIndex: 'sizein',sortable:false,width:70,align:'left', menuDisabled: true},
        {header: "Size "   , dataIndex: 'size',sortable:false,width:110,align:'left', menuDisabled: true},
        {header: "Sizecode"  , dataIndex: 'sizecode',sortable:false,width:60,align:'left', menuDisabled: true,hidden:true},
        {header: "Qty"         , dataIndex: 'qty',sortable:false,width:80,align:'left', menuDisabled: true},
        {header: "Old Rate"    , dataIndex: 'oldrate',sortable:false,width:80,align:'center', menuDisabled: true},
        {header: "Revise"    , dataIndex: 'revise',sortable:false,width:80,align:'center', menuDisabled: true},
        {header: "New Rate"    , dataIndex: 'newrate',sortable:false,width:80,align:'center', menuDisabled: true},

    ],
     store:[], // store: GetGridDetailsDatastore,
    listeners:{	

            'cellclick': function (flxDetail, rowIndex, cellIndex, e) {

                if (cellIndex == 11)
                {    

                        var selected_rows = flxDetail.getSelectionModel().getSelections();
		        for (var i = 0; i < selected_rows.length; i++)
			{
				if (selected_rows[i].data.revise == '')

                                    flag = 'Y';
                                else                                   
                                    flag = selected_rows[i].data.revise;
                                             

                                rate1 = Number(selected_rows[i].data.oldrate) + Number(txtPriceIncrease.getValue());
                                rate2 = Number(selected_rows[i].data.oldrate) ;


                               	colname = 'revise';
                            	colname2 = 'newrate';
				if (flag == 'N')
				{
				    selected_rows[i].set(colname, 'Y');
				    selected_rows[i].set(colname2, rate1);


				} else 
				{
				   selected_rows[i].set(colname, 'N');
				    selected_rows[i].set(colname2, rate2);

				}
                       }   
                }
  
             }  ,
 

      
}
});



var cmbSONo = new Ext.form.ComboBox({
        fieldLabel      : 'S.O. No.',
        width           : 100,
        displayField    : 'ordh_sono', 
        valueField      : 'ordh_sono',
        hiddenName      : '',
        id              : 'cmbSONo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadOrderNoListDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
       style : "font-size:14px;font-weight:bold;color:#0080ff",
        listeners:{
             select: function () {

                         flxDetail.getStore().removeAll();

		         LoadordernoDetailsDatastore.load({

				url: 'ClsTrnSalesOrder.php',
				params: {
				    task: 'loadordernodetails1',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    ordno:cmbSONo.getValue()
                                },
                           	callback:function()
				{
//alert(LoadordernoDetailsDatastore.getAt(0).get('ordh_creditdays'));

            

  





                                  dptSONo.setRawValue(Ext.util.Format.date(LoadordernoDetailsDatastore.getAt(0).get('ordh_sodate'),"d-m-Y"));                  
                                  repcode = LoadordernoDetailsDatastore.getAt(0).get('ordh_rep');
                    
                                  taxcode = LoadordernoDetailsDatastore.getAt(0).get('ordh_tax');

                                  txtCustomer.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('cust_ref'));   
                           
                                  custcode  = LoadordernoDetailsDatastore.getAt(0).get('ordh_party'); 

                                  cmbPO.setRawValue(LoadordernoDetailsDatastore.getAt(0).get('ordh_ref'));  
                                  dptPO.setRawValue(Ext.util.Format.date(LoadordernoDetailsDatastore.getAt(0).get('ordh_refdt'),"d-m-Y"));

           
                   
                                } 
                             });

		             LoadordernoItemDetailsDatastore.load({

				url: 'ClsTrnSalesOrder.php',
				params: {
				    task: 'loadorderdetailstrailer',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    ordno:cmbSONo.getValue()
                                },
                           	callback:function()
				{

                                   var cnt=LoadordernoItemDetailsDatastore.getCount();
	                           if(cnt>0)
		                       {    





//                                          cmbPriceno.setValue(LoadordernoItemDetailsDatastore.getAt(0).get('ordt_apprno'));  
//                                          cmbPriceno.setRawValue(LoadordernoItemDetailsDatastore.getAt(0).get('ordt_apprno')); 
                           
                                          if (LoadordernoItemDetailsDatastore.getAt(0).get('ordt_adv_qty') > 0)
                                          {
                                                 alert("Despatch Advice Raised.  You cannot Modify...");
                                                  Ext.getCmp('save').setDisabled(false);
                                          } 

                                          for(var j=0; j<cnt; j++)
 		                          { 
                                            var RowCnt    = flxDetail.getStore().getCount() + 1;   
/*
                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "NS")
                                            {   
                                                ishade  = "NAT";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "DP")
                                            {   
                                                ishade  = "DP";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "GY")
                                            {   
                                                ishade  = "GYT";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "SY")
                                            {   
                                                ishade  = "SHYS";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "GB")
                                            {   
                                                ishade  = "GREY-BRD";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "VV")
                                            {   
                                                ishade  = "SHVV+";
                                            }
                                            else if (LoadordernoItemDetailsDatastore.getAt(j).get('var_shade') == "BB")
                                            {   
                                                ishade  = "BB";
                                            }
*/



                                            ishade  = LoadordernoItemDetailsDatastore.getAt(j).get('shade_shortname');

                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_inchcm') == "I")
                                            {   
                                                isize  = "Inch";
                                            }
                                            else
                                            {   
                                                isize  = "CM";
                                            }


                                            if (LoadordernoItemDetailsDatastore.getAt(j).get('var_unit') == "1")
                                               displaysize =  LoadordernoItemDetailsDatastore.getAt(j).get('var_size2') 
                                            else
    
                                               displaysize =  LoadordernoItemDetailsDatastore.getAt(j).get('var_size1') 
+"X"+ LoadordernoItemDetailsDatastore.getAt(j).get('var_size2')  
                                            flxDetail.getStore().insert(
	                                       flxDetail.getStore().getCount(),
                                                 
	                                       new dgrecord({
                                                   sno       : j+1,         
						   varname   : LoadordernoItemDetailsDatastore.getAt(j).get('var_desc'),
						   varcode   : LoadordernoItemDetailsDatastore.getAt(j).get('var_grpcode'),
						   shade     : ishade,
				                   bf        : LoadordernoItemDetailsDatastore.getAt(j).get('var_bf'),
						   gsm       : LoadordernoItemDetailsDatastore.getAt(j).get('var_gsm'),
						   oldrate   : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_rate'),
						   sizein    : isize,
//						   size      : LoadordernoItemDetailsDatastore.getAt(j).get('var_size2'),
						   size      : displaysize,
                                                   revise    : 'N',
						   sizecode  : LoadordernoItemDetailsDatastore.getAt(j).get('var_code'),
						   qty       : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_qty'),
                                                   reels     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_no_of_reels'),
						   despdate  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_despdt'),
						   finwt     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_fin_wt'),
						   invwt     : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_inv_wt'),
						   soclose   : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_clo_stat'),
						   closereason  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_clo_reason'),
						   gdstkwt   : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_stk_wt'),
						   gdstkreels  : LoadordernoItemDetailsDatastore.getAt(j).get('ordt_stk_reels'),
	                                       })
                               	            );


                                      }
                                  }

                                }
                             });
                    }
              }
                       

});
	
var cmbPO = new Ext.form.ComboBox({
        fieldLabel      : 'PO No. ',
        width           : 200,
        displayField    : '', 
        valueField      : '',
        hiddenName      : '',
        id              : 'cmbPO',
        typeAhead       : true,
        mode            : 'local',
        store           : ['Phone Order','E-Mail ','Letter'],
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle      : "font-size:14px;font-weight:bold;color:#0080ff",
	enableKeyEvents: true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
			const input = document.getElementById('dptPO');
			const end = input.value.length;
			input.setSelectionRange(0,0);
			input.focus();
		     }
		  }  
        }  


});



var TrnSORATEPanel = new Ext.FormPanel({
    renderTo    : Ext.getBody(),
    xtype       : 'form',
    title       : 'SO-RATE CHANGE',
    header      : false,
    width       : 1300,
    height      : 650,bodyStyle:{"background-color":"#f7f7d7"},
    x           : 0,
    y           : 0,
    frame       : false,
    id          : 'TrnSORATEPanel',
    method      : 'POST',
    layout      : 'absolute',
    tbar: {
        xtype: 'toolbar',
        height: 40,
        fontSize:18,
        items: [


          {
//save
            text: 'Save',
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

                      save_click();

                }
            }
        },'-',


        {
            text: 'Refresh',
            style  : 'text-align:center;',
            tooltip: 'Refresh Details...',
            height: 40,
            fontSize:30,
            width:70,
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
            tooltip: 'Close...',
            height: 40,
            fontSize:30,
            width:70,
            icon: '/Pictures/exit.png',
            listeners:{
                click: function(){
                    TrnSORATEChange.hide();
                }
            }
        }]
    },
     items: [


                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 950,
                               height      : 200,
                               x           : 10,
                               y           : 10,
                               border      : true,
                               layout      : 'absolute',

                               items:[


                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 400,
                                       x           : 0,
                                       y           : 0,
                                       border      : false,
                                       items: [cmbSONo]
                                      },

               			      { 
	                               xtype       : 'fieldset',
           		               title       : '',
		                       labelWidth  : 80,
                		       width       : 500,
		                       x           : 0,
                		       y           : 35,
		                       border      : false,
                		       items: [dptSONo]
   		                     },
                   		     { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 80,
                                       width       : 360,
                                       x           : 0,
                                       y           : 70,
                                       border      : false,
                                       items: [cmbPO]
	                             },
                                     { 
                                       xtype       : 'fieldset',
	                               title       : '',
          	                       labelWidth  : 80,
                    		       width       : 400,
	                               x           : 0,
          		               y           : 105,
                        	       border      : false,
		                       items: [dptPO]
   		                    },



                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 120,
                                       width       : 600,
                                       x           : 350,
                                       y           : 0,
                                       border      : false,
                                       items: [txtCustomer]
                                      },

                                      { 
                                       xtype       : 'fieldset',
                                       title       : '',
                                       labelWidth  : 120,
                                       width       : 600,
                                       x           : 350,
                                       y           : 105,
                                       border      : false,
                                       items: [txtPriceIncrease]
                                      },



				    {
					xtype: 'fieldset',
					title: '',
					labelWidth: 100,
					width: 400,
					x: 600,
					y: 105,
					defaultType: 'textfield',
					border: false,
					items: [txtPassword]
				    }, 


		  	           ]	  
//item - 3 - end
                             }, flxDetail,


                             {
                               xtype       : 'fieldset',
                               title       : '',
                               width       : 300,
                               height      : 480,
                               x           : 1000,
                               y           : 10,
                               border      : true,
                               layout      : 'absolute',

                               items:[

				       	   { 
					       xtype       : 'fieldset',
				   	       title       : '',
					       labelWidth  : 100,
					       width       : 400,
					       x           : 0,
			       		       y           : 340,
					       border      : false,
					       items: [dptStartDate]
			   		  },
		       	                  { 
					       xtype       : 'fieldset',
				   	       title       : '',
					       labelWidth  : 100,
					       width       : 400,
					       x           : 0,
			       		       y           : 370,
					       border      : false,
					       items: [dptEndDate]
			   		  },

		       	                  { 
					       xtype       : 'fieldset',
				   	       title       : '',
					       labelWidth  : 50,
					       width       : 400,
					       x           : 80,
			       		       y           : 410,
					       border      : false,
					       items: [btnPrint]
			   		  },
                               ]
                             }  

]
});




    var TrnSORATEChange = new Ext.Window({
	height      : 610,
        width       : 1350,
        y           : 30,
        title       : 'SO RATE MODIFICATIONS',
        items       : TrnSORATEPanel,
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
	    loadOrderNoListDataStore.removeAll();
	    loadOrderNoListDataStore.load({
		url: 'ClsTrnSalesOrder.php',
		params: {
		    task: 'loadOrderNoList_for_RateRevision',
		    finid: GinFinid,
		    compcode:Gincompcode,
		    ordtype : 'F',   
		},
	      	callback:function()
		{
		    //alert(loadOrderNoListDataStore.getCount());	
                                            
  Ext.getCmp('save').setDisabled(true);

		}
	    });  

                    }
        } 
    });
       TrnSORATEChange.show();  
});
