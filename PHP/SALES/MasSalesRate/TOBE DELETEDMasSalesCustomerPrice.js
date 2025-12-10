Ext.onReady(function(){
   Ext.QuickTips.init();
   var GinFinid = localStorage.getItem('ginfinid');
   var Gincompcode = localStorage.getItem('gincompcode');
var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


   var gstFlag = "Add";
   var ratebf14,ratebf16,ratebf18,ratebf20,ratebf22,ratebf24,ratebf26,ratebf28,ratebf30,ratebf32 = 0;
   var colname;



 var areacode = 0;
 var custcode = 0;
 var custname = 0;


   var gstadd ="true";
var GetVarietylistDatastore = new Ext.data.Store({
        id: 'GetVarietylistDatastore',
       autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "LoadVarietydetails"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_groupcode', 'var_desc', 'var_typecode', 'var_bf', 'var_gsm','rate_price_terms'])
    });


var cmbvarietylist = new Ext.form.ComboBox({
        fieldLabel      : 'QUALITY',
        width           : 130,
        displayField    : 'var_desc', 
        valueField      : 'var_groupcode',
        hiddenName      : '',
        id              : 'cmbvarietylist',
        typeAhead       : true,
        mode            : 'local',
        store           : 'GetVarietylistDatastore',
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
	enableKeyEvents: true,
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                  varietycode = cmbvarietylist.getValue();

             }
          },

        select: function(){
                varietycode = cmbvarietylist.getValue();

                     }

		   }

});


var gridedit = "false";
var editrow = 0;
var dgrecord = Ext.data.Record.create([]);


var flxRateDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    height: 120,
 
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Product", dataIndex:'product', width:140,align:'left',sortable:false, menuDisabled: true},
       {header: "Product", dataIndex:'prodcode', width:40,align:'center',sortable:false, menuDisabled: true},
       {header: "Shade", dataIndex:'shade', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM FROM", dataIndex:'gsmfrom', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM TO", dataIndex:'gsmto', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "F/R GSM", dataIndex:'gsmfrrate', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "B/R GSM", dataIndex:'gsmbrrate', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 12BF", dataIndex:'fr12bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 14BF", dataIndex:'fr14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 16BF", dataIndex:'fr16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 18BF", dataIndex:'fr18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 20BF", dataIndex:'fr20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 22BF", dataIndex:'fr22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 24BF", dataIndex:'fr24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 26BF", dataIndex:'fr26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 28BF", dataIndex:'fr28bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "FR 30BF", dataIndex:'fr30bf', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "BR 12BF", dataIndex:'br12bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 14BF", dataIndex:'br14bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 16BF", dataIndex:'br16bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 18BF", dataIndex:'br18bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 20BF", dataIndex:'br20bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 22BF", dataIndex:'br22bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 24BF", dataIndex:'br24bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 26BF", dataIndex:'br26bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 28BF", dataIndex:'br28bf', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "BR 30BF", dataIndex:'br30bf', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "AP.G1.FROM", dataIndex:'ar1gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G1.TO", dataIndex:'ar1gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G1.Rate", dataIndex:'ar1rate', width:95,align:'center',sortable:false, menuDisabled: true},

       {header: "AP.G2.FROM", dataIndex:'ar2gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G2.TO", dataIndex:'ar2gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G2.Rate", dataIndex:'ar2rate', width:95,align:'center',sortable:false, menuDisabled: true},

       {header: "AP.G3.FROM", dataIndex:'ar3gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G3.TO", dataIndex:'ar3gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G3.Rate", dataIndex:'ar3rate', width:95,align:'center',sortable:false, menuDisabled: true},


       {header: "AP.G4.FROM", dataIndex:'ar4gsmfrom', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G4.TO", dataIndex:'ar4gsmto', width:95,align:'center',sortable:false, menuDisabled: true},
       {header: "AP.G4.Rate", dataIndex:'ar4rate', width:95,align:'center',sortable:false, menuDisabled: true},


       {header: "O.SHADE", dataIndex:'othshade', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "SHEET +", dataIndex:'sheet', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "QUALITY", dataIndex:'quality', width:120,align:'center',sortable:false, menuDisabled: true},
       {header: "QUALITY", dataIndex:'qlycode', width:120,align:'center',sortable:false, menuDisabled: true},
       {header: "PB Rate", dataIndex:'pbrate', width:120,align:'center',sortable:false, menuDisabled: true},

/*
       {header: "18-120GSM", dataIndex:'bf18_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-100GSM", dataIndex:'bf18_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-90GSM", dataIndex:'bf18_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-80GSM", dataIndex:'bf18_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-70GSM", dataIndex:'bf18_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-60GSM", dataIndex:'bf18_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "18-50GSM", dataIndex:'bf18_50', width:80,align:'center',sortable:false, menuDisabled: true},



       {header: "20-120GSM", dataIndex:'bf20_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-100GSM", dataIndex:'bf20_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-90GSM", dataIndex:'bf20_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-80GSM", dataIndex:'bf20_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-70GSM", dataIndex:'bf20_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-60GSM", dataIndex:'bf20_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "20-50GSM", dataIndex:'bf20_50', width:80,align:'center',sortable:false, menuDisabled: true},



       {header: "22-120GSM", dataIndex:'bf22_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-100GSM", dataIndex:'bf22_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-90GSM", dataIndex:'bf22_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-80GSM", dataIndex:'bf22_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-70GSM", dataIndex:'bf22_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-60GSM", dataIndex:'bf22_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "22-50GSM", dataIndex:'bf22_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "24-120GSM", dataIndex:'bf24_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-100GSM", dataIndex:'bf24_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-90GSM", dataIndex:'bf24_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-80GSM", dataIndex:'bf24_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-70GSM", dataIndex:'bf24_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-60GSM", dataIndex:'bf24_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "24-50GSM", dataIndex:'bf24_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "26-120GSM", dataIndex:'bf26_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-100GSM", dataIndex:'bf26_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-90GSM", dataIndex:'bf26_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-80GSM", dataIndex:'bf26_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-70GSM", dataIndex:'bf26_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-60GSM", dataIndex:'bf26_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "26-50GSM", dataIndex:'bf26_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "28-120GSM", dataIndex:'bf28_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-100GSM", dataIndex:'bf28_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-90GSM", dataIndex:'bf28_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-80GSM", dataIndex:'bf28_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-70GSM", dataIndex:'bf28_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-60GSM", dataIndex:'bf28_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "28-50GSM", dataIndex:'bf28_50', width:80,align:'center',sortable:false, menuDisabled: true},


       {header: "30-120GSM", dataIndex:'bf30_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-100GSM", dataIndex:'bf30_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-90GSM", dataIndex:'bf30_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-80GSM", dataIndex:'bf30_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-70GSM", dataIndex:'bf30_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-60GSM", dataIndex:'bf30_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "30-50GSM", dataIndex:'bf30_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "32-120GSM", dataIndex:'bf32_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-100GSM", dataIndex:'bf32_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-90GSM", dataIndex:'bf32_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-80GSM", dataIndex:'bf32_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-70GSM", dataIndex:'bf32_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-60GSM", dataIndex:'bf32_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "32-50GSM", dataIndex:'bf32_50', width:80,align:'center',sortable:false, menuDisabled: true},

       {header: "34-120GSM", dataIndex:'bf34_120', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-100GSM", dataIndex:'bf34_100', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-90GSM", dataIndex:'bf34_90', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-80GSM", dataIndex:'bf34_80', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-70GSM", dataIndex:'bf34_70', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-60GSM", dataIndex:'bf34_60', width:80,align:'center',sortable:false, menuDisabled: true},
       {header: "34-50GSM", dataIndex:'bf34_50', width:80,align:'center',sortable:false, menuDisabled: true},
*/
    ],
    store: [], //BFDataStore,
    listeners:{	
 

            'cellDblclick': function (flxRateDetail, rowIndex, cellIndex, e) {
             Ext.Msg.show({
             title: 'PRICE LIST PREPARATION',
             icon: Ext.Msg.QUESTION,
             buttons: Ext.MessageBox.YESNOCANCEL,
             msg: 'Press YES to Modify   -  NO to Delete - CANCEL to EXIT',
             fn: function(btn){
		     if (btn === 'yes')
                     {
				var sm = flxRateDetail.getSelectionModel();
				var selrow = sm.getSelected();
		 		gridedit = "true";
				editrow = selrow;
				flxRateDetail.getSelectionModel().clearSelections();

		                cmbProductType.setRawValue(selrow.get('product'));
		                cmbProductType.setValue(selrow.get('prodcode'));

          	                cmbShade.setValue(selrow.get('shade'));

                                if (selrow.get('prodcode') == 1)
                                   cmbShade.show();                                 


                                if (selrow.get('prodcode') == 14)
                                {

          	                  cmbPBShade.setValue(selrow.get('shade'));
                                  cmbvarietylist.setValue(selrow.get('qlycode'));
                                  txtPBRate.setValue(selrow.get('pbrate'));


                /*
                                bf18120 = selrow.get('bf18_120');
                                bf18100 = selrow.get('bf18_100');
                                bf1890  = selrow.get('bf18_90');
                                bf1880  = selrow.get('bf18_80');
                                bf1870  = selrow.get('bf18_70');
                                bf1860  = selrow.get('bf18_60');
                                bf1850  = selrow.get('bf18_50');
              
                                bf20120 = selrow.get('bf20_120');
                                bf20100 = selrow.get('bf20_100');
                                bf2090  = selrow.get('bf20_90');
                                bf2080  = selrow.get('bf20_80');
                                bf2070  = selrow.get('bf20_70');
                                bf2060  = selrow.get('bf20_60');
                                bf2050  = selrow.get('bf20_50');

                                bf22120 = selrow.get('bf22_120');
                                bf22100 = selrow.get('bf22_100');
                                bf2290  = selrow.get('bf22_90');
                                bf2280  = selrow.get('bf22_80');
                                bf2270  = selrow.get('bf22_70');
                                bf2260  = selrow.get('bf22_60');
                                bf2250  = selrow.get('bf22_50');

        
                                bf24120 = selrow.get('bf24_120');
                                bf24100 = selrow.get('bf24_100');
                                bf2490  = selrow.get('bf24_90');
                                bf2480  = selrow.get('bf24_80');
                                bf2470  = selrow.get('bf24_70');
                                bf2460  = selrow.get('bf24_60');
                                bf2450  = selrow.get('bf24_50');

                                bf26120 = selrow.get('bf26_120');
                                bf26100 = selrow.get('bf26_100');
                                bf2690  = selrow.get('bf26_90');
                                bf2680  = selrow.get('bf26_80');
                                bf2670  = selrow.get('bf26_70');
                                bf2660  = selrow.get('bf26_60');
                                bf2650  = selrow.get('bf26_50');

                                bf28120 = selrow.get('bf28_120');
                                bf28100 = selrow.get('bf28_100');
                                bf2890  = selrow.get('bf28_90');
                                bf2880  = selrow.get('bf28_80');
                                bf2870  = selrow.get('bf28_70');
                                bf2860  = selrow.get('bf28_60');
                                bf2850  = selrow.get('bf28_50');

                                bf30120 = selrow.get('bf30_120');
                                bf30100 = selrow.get('bf30_100');
                                bf3090  = selrow.get('bf30_90');
                                bf3080  = selrow.get('bf30_80');
                                bf3070  = selrow.get('bf30_70');
                                bf3060  = selrow.get('bf30_60');
                                bf3050  = selrow.get('bf30_50');

                                bf32120 = selrow.get('bf32_120');
                                bf32100 = selrow.get('bf32_100');
                                bf3290  = selrow.get('bf32_90');
                                bf3280  = selrow.get('bf32_80');
                                bf3270  = selrow.get('bf32_70');
                                bf3260  = selrow.get('bf32_60');
                                bf3250  = selrow.get('bf32_50');

                                bf34120 = selrow.get('bf34_120');
                                bf34100 = selrow.get('bf34_100');
                                bf3490  = selrow.get('bf34_90');
                                bf3480  = selrow.get('bf34_80');
                                bf3470  = selrow.get('bf34_70');
                                bf3460  = selrow.get('bf34_60');
                                bf3450  = selrow.get('bf34_50');
*/
                                txtIncRate1.setValue(selrow.get('ar1rate'));

                                }
                                else
                                {


                                txtGSMFrom1.setValue(selrow.get('gsmfrom'));
                                txtGSMFrom2.setValue(selrow.get('ar1gsmfrom'));
                                txtGSMFrom3.setValue(selrow.get('ar2gsmfrom'));
                                txtGSMFrom4.setValue(selrow.get('ar3gsmfrom'));
                                txtGSMFrom5.setValue(selrow.get('ar4gsmfrom'));

                                txtGSMTo1.setValue(selrow.get('gsmto'));
                                txtGSMTo2.setValue(selrow.get('ar1gsmto'));
                                txtGSMTo3.setValue(selrow.get('ar2gsmto'));
                                txtGSMTo4.setValue(selrow.get('ar3gsmto'));
                                txtGSMTo5.setValue(selrow.get('ar4gsmto'));


                                txtIncRate1.setValue(selrow.get('ar1rate'));
                                txtIncRate2.setValue(selrow.get('ar2rate'));
                                txtIncRate3.setValue(selrow.get('ar3rate'));
                                txtIncRate4.setValue(selrow.get('ar4rate'));

                                txtothershades.setValue(selrow.get('othshade'));
                                txtSheetRate.setValue(selrow.get('sheet'));

                                gsmfrrate = selrow.get('gsmfrrate');
                                frbf12 = selrow.get('fr12bf');
                                frbf14 = selrow.get('fr14bf');

                                frbf16 = selrow.get('fr16bf');
                                frbf18 = selrow.get('fr18bf');
                                frbf20 = selrow.get('fr20bf');
                                frbf22 = selrow.get('fr22bf');
                                frbf24 = selrow.get('fr24bf');
                                frbf26 = selrow.get('fr26bf');
                                frbf28 = selrow.get('fr28bf');
                                frbf30 = selrow.get('fr30bf');
                                gsmbrrate = selrow.get('gsmbrrate');
                                brbf12 = selrow.get('br12bf');

                                brbf14 = selrow.get('br14bf');
                                brbf16 = selrow.get('br16bf');
                                brbf18 = selrow.get('br18bf');
                                brbf20 = selrow.get('br20bf');
                                brbf22 = selrow.get('br22bf');
                                brbf24 = selrow.get('br24bf');
                                brbf26 = selrow.get('br26bf');
                                brbf28 = selrow.get('br28bf');
                                brbf30 = selrow.get('br30bf');
        


				var record = flxDetail.getSelectionModel().getSelected();
				var models = flxDetail.getStore().getRange();
				models[0].set('gsmrate', gsmfrrate);
				models[0].set('bf12', frbf12);
				models[0].set('bf14', frbf14);
				models[0].set('bf16', frbf16);
				models[0].set('bf18', frbf18);
				models[0].set('bf20', frbf20);
				models[0].set('bf22', frbf22);
				models[0].set('bf24', frbf24);
				models[0].set('bf26', frbf26);
				models[0].set('bf28', frbf28);
				models[0].set('bf30', frbf30);


				models[1].set('gsmrate', gsmbrrate);
				models[1].set('bf12', brbf12);
				models[1].set('bf14', brbf14);
				models[1].set('bf16', brbf16);
				models[1].set('bf18', brbf18);
				models[1].set('bf20', brbf20);
				models[1].set('bf22', brbf22);
				models[1].set('bf24', brbf24);
				models[1].set('bf26', brbf26);
				models[1].set('bf28', brbf28);
				models[1].set('bf30', brbf30);
                                }

	              }
		      else if (btn === 'no')
                      {
		           var sm = flxRateDetail.getSelectionModel();
		           var selrow = sm.getSelected();
                           flxRateDetail.getStore().remove(selrow);
		           flxRateDetail.getSelectionModel().selectAll();
		     
		      }


             } 
        });
   }
   }

});


function add_btn_click()
{


            var dataadd="true";
 



	    if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
	    {
		alert("Select Product Type..");
                dataadd="false";
                cmbProductType.setFocus();
	    }

        if ( dataadd === "true")
        {  

       	if(gridedit === "true")
        {


			gridedit = "false";

	var Row= flxDetail.getStore().getCount();
        for(var i=0;i<Row;i++)
        {
            var rec = flxDetail.getStore().getAt(i);
            if (rec.get('reel') == 'Full')
            { 
               frgsmrate = Number(rec.get('gsmrate'));
               frbf12    = Number(rec.get('bf12'));
               frbf14    = Number(rec.get('bf14'));
               frbf16    = Number(rec.get('bf16'));
               frbf18    = Number(rec.get('bf18'));
               frbf20    = Number(rec.get('bf20'));
               frbf22    = Number(rec.get('bf22'));
               frbf24    = Number(rec.get('bf24'));
               frbf26    = Number(rec.get('bf26'));
               frbf28    = Number(rec.get('bf28'));
               frbf30    = Number(rec.get('bf30'));
         }
         else
        {
               brgsmrate = Number(rec.get('gsmrate'));
               brbf12    = Number(rec.get('bf12'));
               brbf14    = Number(rec.get('bf14'));
               brbf16    = Number(rec.get('bf16'));
               brbf18    = Number(rec.get('bf18'));
               brbf20    = Number(rec.get('bf20'));
               brbf22    = Number(rec.get('bf22'));
               brbf24    = Number(rec.get('bf24'));
               brbf26    = Number(rec.get('bf26'));
               brbf28    = Number(rec.get('bf28'));
               brbf30    = Number(rec.get('bf30'));
         }
      }




                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();

        var idx = flxRateDetail.getStore().indexOf(editrow);

	sel[idx].set('product' , cmbProductType.getRawValue());
	sel[idx].set('prodcode' , cmbProductType.getValue());
	sel[idx].set('shade' , cmbShade.getRawValue());
	sel[idx].set('gsmfrom' , Number(txtGSMFrom1.getRawValue()));
	sel[idx].set('gsmto' , Number(txtGSMTo1.getValue()));
	sel[idx].set('gsmfrrate' , Number(frgsmrate));
	sel[idx].set('gsmbrrate' , Number(brgsmrate));

	sel[idx].set('fr12bf' , Number(frbf12));
	sel[idx].set('fr14bf' , Number(frbf14));
	sel[idx].set('fr16bf' , Number(frbf16));
	sel[idx].set('fr18bf' , Number(frbf18));
	sel[idx].set('fr20bf' , Number(frbf20));
	sel[idx].set('fr22bf' , Number(frbf22));
	sel[idx].set('fr24bf' , Number(frbf24));
	sel[idx].set('fr26bf' , Number(frbf26));
	sel[idx].set('fr28bf' , Number(frbf28));
	sel[idx].set('fr30bf' , Number(frbf30));

	sel[idx].set('br12bf' , Number(brbf12));
	sel[idx].set('br14bf' , Number(brbf14));
	sel[idx].set('br16bf' , Number(brbf16));
	sel[idx].set('br18bf' , Number(brbf18));
	sel[idx].set('br20bf' , Number(brbf20));
	sel[idx].set('br22bf' , Number(brbf22));
	sel[idx].set('br24bf' , Number(brbf24));
	sel[idx].set('br26bf' , Number(brbf26));
	sel[idx].set('br28bf' , Number(brbf28));
	sel[idx].set('br30bf' , Number(brbf30));


	sel[idx].set('ar1gsmfrom' , Number(txtGSMFrom2.getValue()));
	sel[idx].set('ar1gsmto' , Number(txtGSMTo2.getValue()));
	sel[idx].set('ar1rate' , Number(txtIncRate1.getValue()));

	sel[idx].set('ar2gsmfrom' , Number(txtGSMFrom3.getValue()));
	sel[idx].set('ar2gsmto' , Number(txtGSMTo3.getValue()));
	sel[idx].set('ar2rate' , Number(txtIncRate2.getValue()));

	sel[idx].set('ar3gsmfrom' , Number(txtGSMFrom4.getValue()));
	sel[idx].set('ar3gsmto' , Number(txtGSMTo4.getValue()));
	sel[idx].set('ar3rate' , Number(txtIncRate3.getValue()));

	sel[idx].set('ar4gsmfrom' , Number(txtGSMFrom5.getValue()));
	sel[idx].set('ar4gsmto' , Number(txtGSMTo5.getValue()));
	sel[idx].set('ar4rate' , Number(txtIncRate4.getValue()));


	sel[idx].set('othshade' , Number(txtothershades.getValue()));
	sel[idx].set('sheet' , Number(txtSheetRate.getValue()));

				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 
                                   gsmrate      : '',
		                   bf14         : '',
		                   bf16         : '',
		                   bf18         : '',
		                   bf20         : '',
		                   bf22         : '',
		                   bf24         : '',
		                   bf26         : '',
		                   bf28         : '',
		                   bf30         : '',

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
                                   gsmrate      : 0,
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,
                                })
                                ); 
        }
        else
        {
	var Row= flxDetail.getStore().getCount();
        for(var i=0;i<Row;i++)
        {
            var rec = flxDetail.getStore().getAt(i);
            if (rec.get('reel') == 'Full')
            { 
               frgsmrate = Number(rec.get('gsmrate'));
               frbf12    = Number(rec.get('bf12'));
               frbf14    = Number(rec.get('bf14'));
               frbf16    = Number(rec.get('bf16'));
               frbf18    = Number(rec.get('bf18'));
               frbf20    = Number(rec.get('bf20'));
               frbf22    = Number(rec.get('bf22'));
               frbf24    = Number(rec.get('bf24'));
               frbf26    = Number(rec.get('bf26'));
               frbf28    = Number(rec.get('bf28'));
               frbf30    = Number(rec.get('bf30'));
         }
         else
        {
               brgsmrate = Number(rec.get('gsmrate'));
               brbf12    = Number(rec.get('bf12'));
               brbf14    = Number(rec.get('bf14'));
               brbf16    = Number(rec.get('bf16'));
               brbf18    = Number(rec.get('bf18'));
               brbf20    = Number(rec.get('bf20'));
               brbf22    = Number(rec.get('bf22'));
               brbf24    = Number(rec.get('bf24'));
               brbf26    = Number(rec.get('bf26'));
               brbf28    = Number(rec.get('bf28'));
               brbf30    = Number(rec.get('bf30'));
         }
      }





                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){
                    if (sel[i].data.prodcode === cmbProductType.getValue()  && sel[i].data.shade === cmbShade.getValue() )
		    {
                        cnt = cnt + 1;
                    }
                }
                if (cnt == 0)
                {
                        var RowCnt = flxRateDetail.getStore().getCount() + 1;
                    	flxRateDetail.getStore().insert(
                        flxRateDetail.getStore().getCount(),
                        new dgrecord({
  
                           product   : cmbProductType.getRawValue(),
        		   prodcode  : cmbProductType.getValue(),
                           shade     : cmbShade.getRawValue(),
			   gsmfrom   : Number(txtGSMFrom1.getRawValue()), 
			   gsmto     : Number(txtGSMTo1.getValue()), 
			   gsmfrrate : Number(frgsmrate),
			   gsmbrrate : Number(brgsmrate),
			   fr14bf    : Number(frbf14),
			   fr16bf    : Number(frbf16),
			   fr18bf    : Number(frbf18),
			   fr20bf    : Number(frbf20),
			   fr22bf    : Number(frbf22),
			   fr24bf    : Number(frbf24),
			   fr26bf    : Number(frbf26),
			   fr28bf    : Number(frbf28),
			   fr30bf    : Number(frbf30),
			   br14bf    : Number(brbf14),
			   br16bf    : Number(brbf16),
			   br18bf    : Number(brbf18),
			   br20bf    : Number(brbf20),
			   br22bf    : Number(brbf22),
			   br24bf    : Number(brbf24),
			   br26bf    : Number(brbf26),
			   br28bf    : Number(brbf28),
			   br30bf    : Number(brbf30),

			   ar1gsmfrom  : Number(txtGSMFrom2.getValue()),
			   ar1gsmto    : Number(txtGSMTo2.getValue()),
			   ar1rate     : Number(txtIncRate1.getValue()),
			   ar2gsmfrom  : Number(txtGSMFrom3.getValue()),
			   ar2gsmto    : Number(txtGSMTo3.getValue()),
			   ar2rate     : Number(txtIncRate2.getValue()),

			   ar3gsmfrom  : Number(txtGSMFrom4.getValue()),
			   ar3gsmto    : Number(txtGSMTo4.getValue()),
			   ar3rate     : Number(txtIncRate3.getValue()),

			   ar4gsmfrom  : Number(txtGSMFrom5.getValue()),
			   ar4gsmto    : Number(txtGSMTo5.getValue()),
			   ar4rate     : Number(txtIncRate4.getValue()),


                           othshade    : Number(txtothershades.getValue()),
                           sheet       : Number(txtSheetRate.getValue()),
                        }) 
                    );

				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 

                                   gsmrate      : '',
		                   bf12         : '',
		                   bf14         : '',
		                   bf16         : '',
		                   bf18         : '',
		                   bf20         : '',
		                   bf22         : '',
		                   bf24         : '',
		                   bf26         : '',
		                   bf28         : '',
		                   bf30         : '',

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
                                   gsmrate      : 0,
		                   bf12         : 0,
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,
                                })
                                ); 

               }
               else
               {
                          alert("Already the same product is Entered ...");
               }     
           } 
         }
         flxRateDetail.getSelectionModel().clearSelections();
 
}


 var btnAddKraft = new Ext.Button({
	text: 'ADD',
	width: 60,
	height: 40,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
		click: function(){  
                 get_bit_reelRate();
                 var dataok = 1;
                 if (Number(txtGSMFrom2.getValue()) >  Number(txtGSMTo2.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom2.focus();
                      dataok = 0;
                 }        
                 if (Number(txtGSMFrom3.getValue()) >  Number(txtGSMTo3.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom3.focus();
                      dataok = 0;
                 }        
                 if (Number(txtGSMFrom4.getValue()) >  Number(txtGSMTo4.getValue()))
                 {
                      alert( "FROM GSM is greater than TO GSM..");
                      txtGSMFrom4.focus();
                      dataok = 0;
                 }        
                 if (dataok == 1)                                                   
                     add_btn_click();
          }
       }
  })


 var loadAreaApprovalDetail = new Ext.data.Store({
      id: 'loadAreaApprovalDetail',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findAreaRate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

   'arearate_comp_code','arearate_fincode','arearate_sno','arearate_appr_date','arearate_wef','arearate_area', 'arearate_vartype','arearate_gst_per','arearate_gsmfrom','arearate_gsmto','arearate_gsm_fr_rate','arearate_gsm_br_rate',
'arearate_bf14','arearate_bf16','arearate_bf18','arearate_bf20','arearate_bf22','arearate_bf24','arearate_bf26',
'arearate_bf28','arearate_bf30','arearate_bf32','arearate_bf14_bit','arearate_bf16_bit','arearate_bf18_bit',
'arearate_bf20_bit','arearate_bf22_bit','arearate_bf24_bit','arearate_bf26_bit','arearate_bf28_bit','arearate_bf30_bit',
'arearate_bf32_bit','arearate_gsmfrom2','arearate_gsmto2','arearate_extraamt2','arearate_gsmfrom3','arearate_gsmto3',
'arearate_extraamt3','arearate_gsmfrom4','arearate_gsmto4','arearate_extraamt4','arearate_othershades',
'rate_bf18gsm120', 'rate_bf18gsm100', 'rate_bf18gsm90', 'rate_bf18gsm80', 'rate_bf18gsm70', 'rate_bf18gsm60', 'rate_bf18gsm50', 'rate_bf20gsm120', 'rate_bf20gsm100', 'rate_bf20gsm90', 'rate_bf20gsm80', 'rate_bf20gsm70', 'rate_bf20gsm60', 'rate_bf20gsm50', 'rate_bf22gsm120', 'rate_bf22gsm100', 'rate_bf22gsm90', 'rate_bf22gsm80', 'rate_bf22gsm70', 'rate_bf22gsm60', 'rate_bf22gsm50', 'rate_bf24gsm120', 'rate_bf24gsm100', 'rate_bf24gsm90', 'rate_bf24gsm80', 'rate_bf24gsm70', 'rate_bf24gsm60', 'rate_bf24gsm50', 'rate_bf26gsm120', 'rate_bf26gsm100', 'rate_bf26gsm90', 'rate_bf26gsm80', 'rate_bf26gsm70', 'rate_bf26gsm60', 'rate_bf26gsm50', 'rate_bf28gsm120', 'rate_bf28gsm100', 'rate_bf28gsm90', 'rate_bf28gsm80', 'rate_bf28gsm70', 'rate_bf28gsm60', 'rate_bf28gsm50', 'rate_bf30gsm120', 'rate_bf30gsm100', 'rate_bf30gsm90', 'rate_bf30gsm80', 'rate_bf30gsm70', 'rate_bf30gsm60', 'rate_bf30gsm50', 'rate_bf32gsm120', 'rate_bf32gsm100', 'rate_bf32gsm90', 'rate_bf32gsm80', 'rate_bf32gsm70', 'rate_bf32gsm60', 'rate_bf32gsm50', 'rate_bf34gsm120', 'rate_bf34gsm100', 'rate_bf34gsm90', 'rate_bf34gsm80', 'rate_bf34gsm70', 'rate_bf34gsm60', 'rate_bf34gsm50', 'rate_approved', 'rate_close'
,'area_code','area_name','vargrp_type_code','vargrp_type_name','vargrp_type_short_code','vargrp_type_hsncode',
'tn_sales_ledcode','os_sales_ledcode','sez_sales_ledcode','arearate_shade'

      ]),
    });



 var loadeditApprovalNo = new Ext.data.Store({
      id: 'loadeditApprovalNo',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"EditApprovalNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

   'rate_comp_code','rate_fincode','rate_code','rate_appr_date','rate_wef','rate_area','rate_cust', 'rate_vartype','rate_gst_per','rate_gsmfrom','rate_gsmto','rate_rate','rate_bitreel',
'rate_bf14','rate_bf16','rate_bf18','rate_bf20','rate_bf22','rate_bf24','rate_bf26',
'rate_bf28','rate_bf30','rate_bf32','rate_bf14_bit','rate_bf16_bit','rate_bf18_bit',
'rate_bf20_bit','rate_bf22_bit','rate_bf24_bit','rate_bf26_bit','rate_bf28_bit','rate_bf30_bit',
'rate_bf32_bit','rate2_gsmfrom','rate2_gsmto','rate2_extraamt','rate3_gsmfrom','rate3_gsmto',
'rate3_extraamt','rate4_gsmfrom','rate4_gsmto','rate4_extraamt','rate5_gsmfrom','rate5_gsmto','rate5_extraamt','rate_othershades','rate_sheet_extraamt',
'rate_bf18gsm120', 'rate_bf18gsm100', 'rate_bf18gsm90', 'rate_bf18gsm80', 'rate_bf18gsm70', 'rate_bf18gsm60', 'rate_bf18gsm50', 'rate_bf20gsm120', 'rate_bf20gsm100', 'rate_bf20gsm90', 'rate_bf20gsm80', 'rate_bf20gsm70', 'rate_bf20gsm60', 'rate_bf20gsm50', 'rate_bf22gsm120', 'rate_bf22gsm100', 'rate_bf22gsm90', 'rate_bf22gsm80', 'rate_bf22gsm70', 'rate_bf22gsm60', 'rate_bf22gsm50', 'rate_bf24gsm120', 'rate_bf24gsm100', 'rate_bf24gsm90', 'rate_bf24gsm80', 'rate_bf24gsm70', 'rate_bf24gsm60', 'rate_bf24gsm50', 'rate_bf26gsm120', 'rate_bf26gsm100', 'rate_bf26gsm90', 'rate_bf26gsm80', 'rate_bf26gsm70', 'rate_bf26gsm60', 'rate_bf26gsm50', 'rate_bf28gsm120', 'rate_bf28gsm100', 'rate_bf28gsm90', 'rate_bf28gsm80', 'rate_bf28gsm70', 'rate_bf28gsm60', 'rate_bf28gsm50', 'rate_bf30gsm120', 'rate_bf30gsm100', 'rate_bf30gsm90', 'rate_bf30gsm80', 'rate_bf30gsm70', 'rate_bf30gsm60', 'rate_bf30gsm50', 'rate_bf32gsm120', 'rate_bf32gsm100', 'rate_bf32gsm90', 'rate_bf32gsm80', 'rate_bf32gsm70', 'rate_bf32gsm60', 'rate_bf32gsm50', 'rate_bf34gsm120', 'rate_bf34gsm100', 'rate_bf34gsm90', 'rate_bf34gsm80', 'rate_bf34gsm70', 'rate_bf34gsm60', 'rate_bf34gsm50', 'rate_approved', 'rate_close'
,'area_code','area_name','vargrp_type_code','vargrp_type_name','vargrp_type_short_code','vargrp_type_hsncode',
'tn_sales_ledcode','os_sales_ledcode','sez_sales_ledcode','cust_ref','cust_code','rate_shade','rate_price_terms',
'rate_bf12','rate_bf12_bit','rate_grace_days','var_groupcode','var_desc','rate_pb_rate','rate_pb_variety','rate_rate_difference',
'rate_bitreel_inch','rate_bitreel_cm'



      ]),
    });


 var loadPriceListDetailDatastore = new Ext.data.Store({
      id: 'loadPriceListDetailDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findAreaRateEdit"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[

 'rate_code', 'rate_appr_date', 'rate_wef', 'rate_cust', 'rate_vartype', 'rate_bf14', 'rate_bf16', 'rate_bf18', 'rate_bf20', 'rate_bf22', 'rate_bf24', 'rate_bf26', 'rate_bf28', 'rate_bf30', 'rate_bf32', 'rate_rate',

      ]),
    });



 var loadSearchPartyListDatastore = new Ext.data.Store({
      id: 'loadSearchPartyListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchPartylist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[


          'cust_code', 'cust_ref', 'cust_area','area_rategrp','cust_cr_days','cust_grace_days'
 

      ]),
    });



function PartySearch()
{

        loadSearchPartyListDatastore.removeAll();
        loadSearchPartyListDatastore.load({
		url: 'ClsMasSalesRate.php',
		params:
		{
			task:"loadSearchPartylist",
			party : txtCustomer.getRawValue(),
		},
        });
}

var txtCustomer = new Ext.form.TextField({
        fieldLabel  : 'Customer',
        id          : 'txtCustomer',
        name        : 'txtCustomer',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxParty.hide();


             }
             if (e.getKey() == e.DOWN)
             {
 
             flxParty.getSelectionModel().selectRow(0)
             flxParty.focus;
             flxParty.getView().focusRow(0);
             }
          },
	    keyup: function () {
                loadSearchPartyListDatastore.removeAll();
		  flxParty.getEl().setStyle('z-index','10000');
		  flxParty.show();
                  if (txtCustomer.getRawValue() != '')
                     PartySearch();
            }
         }  
    });

function loadRateDetails()
{
	


			txtIncRate1.setValue("500");
			txtIncRate2.setValue("1000");
			txtIncRate3.setValue("1000");
			txtGSMFrom1.setValue("120");
			txtGSMFrom2.setValue("181");
			txtGSMFrom3.setValue("201");
			txtGSMFrom4.setValue("100");
			txtGSMTo1.setValue("180");
			txtGSMTo2.setValue("200");
			txtGSMTo3.setValue("250");
			txtGSMTo4.setValue("100");
			txtothershades.setValue("1000");
			txtSheetRate.setValue("500");


				var sm = flxParty.getSelectionModel();
				var selrow = sm.getSelected();
				var chkitem = (selrow.get('cust_code'));
				custcode = 0;
				areacode = 0;  

         		custcode = selrow.get('cust_code');
			custname = selrow.get('cust_ref');
			areacode = selrow.get('area_rategrp');
                        txtCustomer.setRawValue(selrow.get('cust_ref'));
                        txtPT.setRawValue(selrow.get('cust_cr_days'));                           
                        txtGD.setRawValue(selrow.get('cust_grace_days'));
                        flxParty.hide();  
                        txtPriceTerms.focus();
//                        FlxReel.getStore().removeAll();

/*
			loadAreaApprovalDetail.load({
				url: 'ClsMasSalesRate.php',
				params: {
				    task: 'findAreaRate',
				    areacode : areacode,
				    compcode : Gincompcode,
				    finid    : GinFinid
				},
		 	        callback:function()
				{ 

 				  flxRateDetail.getStore().removeAll();
   
                                  var cnt = loadAreaApprovalDetail.getCount();
  
                                  if (cnt > 0)
                                  {                              




                                  txtGSMFrom1.setValue(loadAreaApprovalDetail.getAt(0).get('arearate_gsmfrom'));     
                                  txtGSMTo1.setValue(loadAreaApprovalDetail.getAt(0).get('arearate_gsmto')); 



             
                                  cmbProductType.setValue(loadAreaApprovalDetail.getAt(0).get('arearate_vartype'));


                                  txtGSTper.setValue(loadAreaApprovalDetail.getAt(0).get('arearate_gst_per'));
                                  for(var j=0; j<cnt; j++)
                                  { 




                                  flxRateDetail.getSelectionModel().selectAll();
                                  var selrows = flxRateDetail.getSelectionModel().getCount();
                                  var sel = flxRateDetail.getSelectionModel().getSelections();
  
		                  var RowCnt = flxRateDetail.getStore().getCount() + 1;
		                  flxRateDetail.getStore().insert(
		                  flxRateDetail.getStore().getCount(),
		                  new dgrecord({
	  
				           product   : loadAreaApprovalDetail.getAt(j).get('vargrp_type_name'),
					   prodcode  : loadAreaApprovalDetail.getAt(j).get('arearate_vartype'),
					   shade  : loadAreaApprovalDetail.getAt(j).get('arearate_shade'),

					   gsmfrom   : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmfrom')), 
					   gsmto     : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmto')), 
					   gsmfrrate : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsm_fr_rate')), 
					   gsmbrrate : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsm_br_rate')), 
					   fr14bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf14')), 
					   fr16bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf16')), 
					   fr18bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf18')), 
					   fr20bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf20')), 
					   fr22bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf22')), 
					   fr24bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf24')), 
					   fr26bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf26')), 
					   fr28bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf28')), 
					   fr30bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf30')), 
					   br14bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf14_bit')), 
					   br16bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf16_bit')), 
					   br18bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf18_bit')), 
					   br20bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf20_bit')), 
					   br22bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf22_bit')), 
					   br24bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf24_bit')), 
					   br26bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf26_bit')), 
					   br28bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf28_bit')), 
					   br30bf    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_bf30_bit')), 

					   ar1gsmfrom  : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmfrom2')), 
					   ar1gsmto    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmto2')), 
					   ar1rate     : Number(loadAreaApprovalDetail.getAt(j).get('arearate_extraamt2')), 
					   ar2gsmfrom  : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmfrom3')), 
					   ar2gsmto    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmto3')), 
					   ar2rate     : Number(loadAreaApprovalDetail.getAt(j).get('arearate_extraamt3')), 
					   ar3gsmfrom  : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmfrom4')), 
					   ar3gsmto    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_gsmto4')), 
					   ar3rate     : Number(loadAreaApprovalDetail.getAt(j).get('arearate_extraamt4')), 
				           othshade    : Number(loadAreaApprovalDetail.getAt(j).get('arearate_othershades')), 


					   bf18_120    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm120')), 
					   bf18_100    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm100')), 
					   bf18_90     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm90')), 
					   bf18_80     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm80')), 
					   bf18_70     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm70')), 
					   bf18_60     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm60')), 
					   bf18_50     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf18gsm50')), 

					   bf20_120    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm120')), 
					   bf20_100    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm100')), 
					   bf20_90     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm90')), 
					   bf20_80     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm80')), 
					   bf20_70     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm70')), 
					   bf20_60     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm60')), 
					   bf20_50     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf20gsm50')), 
	
					   bf22_120    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm120')), 
					   bf22_100    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm100')),
					   bf22_90     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm90')),
					   bf22_80     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm80')),
					   bf22_70     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm70')),
					   bf22_60     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm60')),
					   bf22_50     : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf22gsm50')),


					   bf24_120   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm120')), 
					   bf24_100   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm100')), 
					   bf24_90    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm90')), 
					   bf24_80    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm80')), 
					   bf24_70    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm70')), 
					   bf24_60    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm60')), 
					   bf24_50    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf24gsm50')), 

					   bf26_120   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm120')), 
					   bf26_100   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm100')), 
					   bf26_90    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm90')), 
					   bf26_80    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm80')), 
					   bf26_70    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm70')), 
					   bf26_60    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm60')), 
					   bf26_50    : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf26gsm50')), 

					   bf28_120  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm120')), 
					   bf28_100  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm100')), 
					   bf28_90   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm90')), 
					   bf28_80   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm80')), 
					   bf28_70   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm70')), 
					   bf28_60   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm60')), 
					   bf28_50   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf28gsm50')), 


					   bf30_120  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm120')), 
					   bf30_100  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm100')), 
					   bf30_90   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm90')), 
					   bf30_80   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm80')), 
					   bf30_70   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm70')), 
					   bf30_60   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm60')), 
					   bf30_50   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf30gsm50')), 

					   bf32_120  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm120')), 
					   bf32_100  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm100')), 
					   bf32_90   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm90')), 
					   bf32_80   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm80')), 
					   bf32_70   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm70')), 
					   bf32_60   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm60')), 
					   bf32_50   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf32gsm50')),

					   bf34_120  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm120')), 
					   bf34_100  : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm100')), 
					   bf34_90   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm90')), 
					   bf34_80   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm80')), 
					   bf34_70   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm70')), 
					   bf34_60   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm60')), 
					   bf34_50   : Number(loadAreaApprovalDetail.getAt(j).get('rate_bf34gsm50')), 

		                     }) 
		                    );
		                  }


                                  } 


                                  }
                         });
*/


}

var dgrecord = Ext.data.Record.create([]);
   var flxParty = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 320,
        x: 148,
        y: 60,
        id : 'flxParty',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "Customer Code", dataIndex: 'cust_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'cust_ref',sortable:true,width:330,align:'left'},
		{header: "Area Code", dataIndex: 'cust_area',sortable:true,width:60,align:'left'},   
		{header: "Grp Code", dataIndex: 'area_rategrp',sortable:true,width:60,align:'left'},
		{header: "", dataIndex: 'cust_cr_days',sortable:true,width:60,align:'left'}, 
		{header: "", dataIndex: 'cust_grace_days',sortable:true,width:60,align:'left'}, 
  
        ],
        store:loadSearchPartyListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
			   loadRateDetails();

                        }
                     });
             },
        'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                      loadRateDetails();

		}
 
    
   }
   });




   var flxPrice = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 150,
        width: 450,
        id : 'flxPrice',
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
		{header: "Appr No.", dataIndex: 'rate_code',sortable:true,width:100,align:'left'},   
		{header: "Appr Date", dataIndex: 'rateapprdate',sortable:true,width:130,align:'left'},
		{header: "Fin Year", dataIndex: 'rate_fincode',sortable:true,width:130,align:'left'},
        ],
        store:loadeditApprovalNo,

    listeners:{	
        'cellclick' : function(flxPrice, rowIndex, cellIndex, e){
		var sm = flxPrice.getSelectionModel();
		var selrow = sm.getSelected();
		if ((selrow != null)){
			gridedit = "true";
			editrow = selrow;
			apprno = selrow.get('rate_code');
			loadPriceListDetailDatastore .load({
				url: 'ClsMasSalesRate.php',
				params: {
				    task     : 'loadPriceList',
				    party    : custcode,
				    compcode : Gincompcode,
				    finid    : selrow.get('rate_fincode'),
                                    apprno   : apprno 
				},
		 	        callback:function()
				{ 

                                   var cnt=loadPriceListDetailDatastore.getCount();
	                           if(cnt>0)
		                   {    
                                        txtOldApprovalNo.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_code'));           
                                        dtpOldApproval.setRawValue(Ext.util.Format.date(loadPriceListDetailDatastore.getAt(0).get('rate_appr_date'),"d-m-Y"));   
					txtBF14rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf14'));
					txtBF16rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf16'));
					txtBF18rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf18'));
					txtBF20rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf20'));
					txtBF22rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf22'));
					txtBF24rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf24'));
					txtBF26rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf26'));
					txtBF28rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf28'));
					txtBF30rate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_bf30'));
					txtGSMrate.setValue(loadPriceListDetailDatastore.getAt(0).get('rate_rate'));

                                   }     
				}
			});

		}


		}
 
    
   }
   });




var lblPrice = new Ext.form.Label({
    fieldLabel  : 'PAYMENT TERMS : 7 DAYS & 30 DAYS  ONLY',
    id          : 'lblPrice',
    width       : 600,
	style: {
            'color':'#FFDEAD',readOnly:true,
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",

});




var lblPrevious = new Ext.form.Label({
    fieldLabel  : 'Previouse Price Lists.',
    id          : 'lblPrevious',
    width       : 120,
    labelStyle      : "font-size:14px;font-weight:bold;color:#ff0000",
});

var lblrate = new Ext.form.Label({
    fieldLabel  : 'Extra Rs.',
    id          : 'lblrate',
    width       : 120,
    labelStyle      : "font-size:12px;font-weight:bold;color:#0080ff",
});


   var txtPriceTerms = new Ext.form.NumberField({
        fieldLabel  : 'Price for the Payment Terms',
        id          : 'txtPriceTerms',
        name        : 'txtPriceTerms',
        width       :  50,
        Value       : 30, 
        labelStyle : "font-size:14px;font-weight:bold;color:#0080gg",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2,
	enableKeyEvents: true,
        readOnly  : true,
	listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                        cmbProductType.focus();
		     }
		  }  
        }  
    });

   var txtPT = new Ext.form.NumberField({
        fieldLabel  : 'Payment Terms',
        id          : 'txtPT',
        name        : 'txtPT',
        width       :  50,
        Value       : 30, 
        labelStyle : "font-size:14px;font-weight:bold;color:#0080gg",
        style : "font-size:12px;font-weight:bold",
        readOnly : true,
        tabindex : 2,
	enableKeyEvents: true,
	listeners:{

        }  
    });


   var txtGD = new Ext.form.NumberField({
        fieldLabel  : 'Grace Days',
        id          : 'txtGD',
        name        : 'txtGD',
        width       :  50,
        Value       : 30, 
        readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080gg",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2,
	enableKeyEvents: true,
	listeners:{

        }  
    });


   var txtApprovalNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtApprovalNo',
        name        : 'txtApprovalNo',
        width       :  100,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2 /* ,
        listeners:{
                  select:function(){
                         url: MasSalesRate.php',
                         callback: function () 
		           {
                                txtApprovalNo.setValue(ItemDetailsDataStore.getAt(0).get('rateseq'));
                            }
                         };         
        }  */
    });

   function getOldEntryNo()
   {

				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 
                                   gsmrate      : '',
		                   bf14         : '',
		                   bf16         : '',
		                   bf18         : '',
		                   bf20         : '',
		                   bf22         : '',
		                   bf24         : '',
		                   bf26         : '',
		                   bf28         : '',
		                   bf30         : '',

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
                                   gsmrate      : '',
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,
                                })
                                ); 

        		loadeditApprovalNo.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'EditApprovalNo',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    apprno:txtOldEntryNo.getValue()
                                },
                       	callback:function()
				{


	  flxRateDetail.getStore().removeAll();
   
                                  var cnt = loadeditApprovalNo.getCount();
  
                                  if (cnt > 0)
                                  {    


//                                  txtPT.setValue(loadeditApprovalNo.getAt(0).get('rate_price_terms'));
//                                  txtGD.setValue(loadeditApprovalNo.getAt(0).get('rate_grace_days'));

                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('rate_vartype'));
//                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_appr_date'),"d-m-Y"));     
//                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_wef'),"d-m-Y"));              

                                  for(var j=0; j<cnt; j++)
                                  { 




                                  flxRateDetail.getSelectionModel().selectAll();
                                  var selrows = flxRateDetail.getSelectionModel().getCount();
                                  var sel = flxRateDetail.getSelectionModel().getSelections();
  
		                  var RowCnt = flxRateDetail.getStore().getCount() + 1;
		                  flxRateDetail.getStore().insert(
		                  flxRateDetail.getStore().getCount(),
		                  new dgrecord({
	  
				           product   : loadeditApprovalNo.getAt(j).get('vargrp_type_name'),
					   prodcode  : loadeditApprovalNo.getAt(j).get('rate_vartype'),
					   shade     : loadeditApprovalNo.getAt(j).get('rate_shade'),
					   gsmfrom   : Number(loadeditApprovalNo.getAt(j).get('rate_gsmfrom')), 
					   gsmto     : Number(loadeditApprovalNo.getAt(j).get('rate_gsmto')), 
					   gsmfrrate : Number(loadeditApprovalNo.getAt(j).get('rate_rate')), 
					   gsmbrrate : Number(loadeditApprovalNo.getAt(j).get('rate_bitreel')), 
					   fr14bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf14')), 
					   fr16bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf16')), 
					   fr18bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18')), 
					   fr20bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20')), 
					   fr22bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22')), 
					   fr24bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24')), 
					   fr26bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26')), 
					   fr28bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf28')), 
					   fr30bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf30')), 
					   br14bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf14_bit')), 
					   br16bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf16_bit')), 
					   br18bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18_bit')), 
					   br20bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20_bit')), 
					   br22bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22_bit')), 
					   br24bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24_bit')), 
					   br26bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26_bit')), 
					   br28bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf28_bit')), 
					   br30bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf30_bit')), 

					   ar1gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate2_gsmfrom')), 
					   ar1gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate2_gsmto')), 
					   ar1rate     : Number(loadeditApprovalNo.getAt(j).get('rate2_extraamt')), 
					   ar2gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate3_gsmfrom')), 
					   ar2gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate3_gsmto')), 
					   ar2rate     : Number(loadeditApprovalNo.getAt(j).get('rate3_extraamt')), 
					   ar3gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate4_gsmfrom')), 
					   ar3gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate4_gsmto')), 
					   ar3rate     : Number(loadeditApprovalNo.getAt(j).get('rate4_extraamt')), 
					   ar4gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate5_gsmfrom')), 
					   ar4gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate5_gsmto')), 
					   ar4rate     : Number(loadeditApprovalNo.getAt(j).get('rate5_extraamt')), 

				           othshade    : Number(loadeditApprovalNo.getAt(j).get('rate_othershades')), 
				           sheet       : Number(loadeditApprovalNo.getAt(j).get('rate_sheet_extraamt')), 
                                           

					   bf18_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm120')), 
					   bf18_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm100')), 
					   bf18_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm90')), 
					   bf18_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm80')), 
					   bf18_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm70')), 
					   bf18_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm60')), 
					   bf18_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm50')), 

					   bf20_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm120')), 
					   bf20_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm100')), 
					   bf20_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm90')), 
					   bf20_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm80')), 
					   bf20_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm70')), 
					   bf20_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm60')), 
					   bf20_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm50')), 
	
					   bf22_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm120')), 
					   bf22_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm100')),
					   bf22_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm90')),
					   bf22_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm80')),
					   bf22_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm70')),
					   bf22_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm60')),
					   bf22_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm50')),


					   bf24_120   : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm120')), 
					   bf24_100   : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm100')), 
					   bf24_90    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm90')), 
					   bf24_80    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm80')), 
					   bf24_70    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm70')), 
					   bf24_60    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm60')), 
					   bf24_50    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm50')), 

					   bf26_120   : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm120')), 
					   bf26_100   : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm100')), 
					   bf26_90    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm90')), 
					   bf26_80    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm80')), 
					   bf26_70    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm70')), 
					   bf26_60    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm60')), 
					   bf26_50    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm50')), 

					   bf28_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm120')), 
					   bf28_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm100')), 
					   bf28_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm90')), 
					   bf28_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm80')), 
					   bf28_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm70')), 
					   bf28_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm60')), 
					   bf28_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm50')), 


					   bf30_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm120')), 
					   bf30_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm100')), 
					   bf30_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm90')), 
					   bf30_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm80')), 
					   bf30_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm70')), 
					   bf30_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm60')), 
					   bf30_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm50')), 

					   bf32_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm120')), 
					   bf32_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm100')), 
					   bf32_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm90')), 
					   bf32_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm80')), 
					   bf32_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm70')), 
					   bf32_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm60')), 
					   bf32_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm50')),

					   bf34_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm120')), 
					   bf34_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm100')), 
					   bf34_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm90')), 
					   bf34_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm80')), 
					   bf34_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm70')), 
					   bf34_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm60')), 
					   bf34_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm50')), 

		                     }) 
		                    );
		                  }


                                  }
                       }
                       });



   }

   var txtOldEntryNo = new Ext.form.NumberField({
        fieldLabel  : 'Old Entry No.',
        id          : 'txtOldEntryNo',
        name        : 'txtOldEntryNo',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
	enableKeyEvents: true,
        tabindex : 2  ,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          getOldEntryNo();
		     }
		  },

        }  
    });


   var txtFullReelRate = new Ext.form.NumberField({
        fieldLabel  : 'Full Reel Rate',
        id          : 'txtFullReelRate',
        name        : 'txtFullReelRate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBitReelRate = new Ext.form.NumberField({
        fieldLabel  : 'Bit Reel Rate',
        id          : 'txtBitReelRate',
        name        : 'txtBitReelRate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF14rate = new Ext.form.NumberField({
        fieldLabel  : '14 BF RATE',
        id          : 'txtBF14rate',
        name        : 'txtBF14rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });

   var txtBF16rate = new Ext.form.NumberField({
        fieldLabel  : '16 BF RATE',
        id          : 'txtBF16rate',
        name        : 'txtBF16rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF18rate = new Ext.form.NumberField({
        fieldLabel  : '18 BF RATE',
        id          : 'txtBF18rate',
        name        : 'txtBF18rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });

   var txtBF20rate = new Ext.form.NumberField({
        fieldLabel  : '20 BF RATE',
        id          : 'txtBF20rate',
        name        : 'txtBF20rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF22rate = new Ext.form.NumberField({
        fieldLabel  : '22 BF RATE',
        id          : 'txtBF22rate',
        name        : 'txtBF22rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });

   var txtBF24rate = new Ext.form.NumberField({
        fieldLabel  : '24 BF RATE',
        id          : 'txtBF24rate',
        name        : 'txtBF24rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF26rate = new Ext.form.NumberField({
        fieldLabel  : '26 BF RATE',
        id          : 'txtBF26rate',
        name        : 'txtBF26rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF28rate = new Ext.form.NumberField({
        fieldLabel  : '28 BF RATE',
        id          : 'txtBF28rate',
        name        : 'txtBF28rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });


   var txtBF30rate = new Ext.form.NumberField({
        fieldLabel  : '30 BF RATE',
        id          : 'txtBF30rate',
        name        : 'txtBF30rate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });

   var txtPBRate = new Ext.form.NumberField({
        fieldLabel  : 'RATE',
        id          : 'txtPBRate',
        name        : 'txtPBRate',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });



   var txtGSMrate = new Ext.form.NumberField({
        fieldLabel  : 'GSM RATE',
        id          : 'txtGSMrate',
        name        : 'txtGSMrate',
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        tabindex : 2  ,

    });

   var txtGSMFrom1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom1',
        name        : 'txtGSMfrom1',
        value       : 120,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo1 = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO  ',
        id          : 'txtGSMTo1',
        name        : 'txtGSMTo1',
        value       : 180,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });


   var txtGSMFrom1_gsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMFrom1_gsm',
        name        : 'txtGSMFrom1_gsm',
        value       : 110,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo1_gsm = new Ext.form.NumberField({
        fieldLabel  : 'GSM TO  ',
        id          : 'txtGSMTo1_gsm',
        name        : 'txtGSMTo1_gsm',
        value       : 180,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMFrom2 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom2',
        name        : 'txtGSMfrom2',
        value       : 181,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo2 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo2',
        name        : 'txtGSMTo2',
        value       : 200,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate1 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate1',
        name        : 'txtIncRate1',
        value       : 500,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtGSMFrom3 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom3',
        name        : 'txtGSMfrom3',
        value       : 201,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo3 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo3',
        name        : 'txtGSMTo3',
        value       : 250,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate2 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate2',
        name        : 'txtIncRate2',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });



   var txtGSMFrom4 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom4',
        name        : 'txtGSMfrom4',
        value       : 100,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo4 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo4',
        name        : 'txtGSMTo4',
        value       : 100,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate3 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate3',
        name        : 'txtIncRate3',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


  var txtGSMFrom5 = new Ext.form.NumberField({
        fieldLabel  : 'GSM FROM ',
        id          : 'txtGSMfrom5',
        name        : 'txtGSMfrom5',
        value       : 101,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtGSMTo5 = new Ext.form.NumberField({
        fieldLabel  : 'TO',
        id          : 'txtGSMTo5',
        name        : 'txtGSMTo5',
        value       : 110,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'3'},
        tabindex : 2  ,

    });

   var txtIncRate4 = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtIncRate4',
        name        : 'txtIncRate4',
        value       : 1000,
        width       :  70,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });



   var txtothershades= new Ext.form.NumberField({
        fieldLabel  : 'OTHER SHADES',
        id          : 'txtothershades',
        name        : 'txtothershades',
        width       :  70,
        value       : 1000,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtRateDifference= new Ext.form.NumberField({
        fieldLabel  : 'Rate Difference',
        id          : 'txtRateDifference',
        name        : 'txtRateDifference',
        width       :  70,
    //    value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#b72bc0",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtBitReelInch = new Ext.form.NumberField({
        fieldLabel  : 'Consider Bit Reel upto Inch',
        id          : 'txtBitReelInch',
        name        : 'txtBitReelInch',
        width       :  50,
    //    value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        tabindex : 2  ,

    });



   var txtBitReelCM = new Ext.form.NumberField({
        fieldLabel  : 'CM',
        id          : 'txtBitReelCM',
        name        : 'txtBitReelCM',
        width       :  50,
    //    value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:14px;font-weight:bold",
        tabindex : 2  ,

    });


   var txtSheetRate= new Ext.form.NumberField({
        fieldLabel  : 'Sheet Rate',
        id          : 'txtSheetRate',
        name        : 'txtSheetRate',
        width       :  70,
        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#ff00ff',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });

   var txtGSTper= new Ext.form.NumberField({
        fieldLabel  : 'GST % ',
        id          : 'txtGSTper',
        name        : 'txtGSTper',
        width       :  70,
        value       : 12,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,	

    });



   var txtCashDiscdays= new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc - Days',
        id          : 'txtCashDiscdays',
        name        : 'txtCashDiscdays',
        width       :  70,
        value       : 7,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,

    });

   var txtCashDiscper = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc % for Advance',
        id          : 'txtCashDiscper',
        name        : 'txtCashDiscper',
        width       :  40,
        value       : 2,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2  ,

    });

   var txtCashDiscMT_7Days = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 7 Days',
        id          : 'txtCashDiscMT_7Days',
        name        : 'txtCashDiscMT_7Days',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_30Days = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 30 Days',
        id          : 'txtCashDiscMT_30Days',
        name        : 'txtCashDiscMT_30Days',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


   var txtCashDiscMT_45Days = new Ext.form.NumberField({
        fieldLabel  : 'Cash Disc/MT. If Receipt with in 45 Days',
        id          : 'txtCashDiscMT_45Days',
        name        : 'txtCashDiscMT_45Days',
        width       :  70,
//        value       : 500,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style: {
		    'color':'#7d0835',readOnly:true,'text-align': 'right',
		    'style': 'Helvetica',
		    'font-size': '13px','font-weight':'bold'
		},
        tabindex : 2  ,

    });


  function datecheck()
  {
        dt_today = new Date();
        var dt_today = new Date();
        var dt_Approval = dtpApproval.getValue();
        var diffdays = (dt_today.getTime()-dt_Approval.getTime());
//alert(diffdays);
        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays >2)
        {     
             alert("You are Not Allowed to Raise the Price in the date of " +  Ext.util.Format.date(dt_Approval,"d-m-Y"));
             dtpApproval.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));
             dtpApproval.focus();

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the Price in future date");
             dtpApproval.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }


 }


    var dtpApproval = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpApproval',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
       	enableKeyEvents: true,
        listeners:{
		  specialkey:function(f,e){
		     if (e.getKey() == e.ENTER)
		     {
                          datecheck();
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



   var txtOldApprovalNo = new Ext.form.NumberField({
        fieldLabel  : 'Entry No.',
        id          : 'txtOldApprovalNo',
        name        : 'txtOldApprovalNo',
        width       :  100,
	readOnly : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        style : "font-size:12px;font-weight:bold",
        tabindex : 2 /* ,
        listeners:{
                  select:function(){
                         url: MasSalesRate.php',
                         callback: function () 
		           {
                                txtApprovalNo.setValue(ItemDetailsDataStore.getAt(0).get('rateseq'));
                            }
                         };         
        }  */
    });


    var dtpOldApproval = new Ext.form.DateField({
        fieldLabel: 'Date',
        id: 'dtpOldApproval',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });


    var dtpWEF = new Ext.form.DateField({
        fieldLabel: 'W.E.F Date',
        id: 'dtpWEF',
        name: 'Date',
        format: 'd-m-Y',
//	readOnly : true,   
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",      
        value: new Date(),
        style : "font-size:12px;font-weight:bold",
    });



 var loadAllCustomerList = new Ext.data.Store({
      id: 'loadAllCustomerList',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadAllCustomerDetails"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'cust_code', type: 'int',mapping:'cust_code'},
	{name:'cust_ref', type: 'string',mapping:'cust_ref'}
      ]),
    });



 var BFDataStore = new Ext.data.Store({
      id: 'BFDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadBF"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'bf14', 'bf16', 'bf18', 'bf20', 'bf22', 'bf24', 'bf26', 'bf28,'
      ]),
    });


 var loadProdType = new Ext.data.Store({
      id: 'loadProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadMainVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });

 var findProdType = new Ext.data.Store({
      id: 'findProdType',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findProductType"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
            'vargrp_type_code', 'vargrp_type_name'
      ]),
    });



  var loadSalesVariety = new Ext.data.Store({
      id: 'loadSalesVariety',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/SALES/ClsSalesMain.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSizeDetailsOfVariety"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'var_code', type: 'int',mapping:'var_code'},
	{name:'var_name', type: 'string',mapping:'var_name'}
      ]),
    });



  var loadSalesVarietyStore = new Ext.data.Store({
        id: 'loadSalesVarietyStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/SALES/ClsSalesMain.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadSizeDetailsOfVariety"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['var_code','var_name','var_grpcode'])
    });


  var loadapprovallistStore = new Ext.data.Store({
        id: 'loadapprovallistStore',
        autoLoad : true,
        proxy: new Ext.data.HttpProxy({
            url: 'ClsMasSalesRate.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {task: "loadRateEntryNo"}, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, ['rate_code'])
    });



var cmbApprovalNo = new Ext.form.ComboBox({
        fieldLabel      : 'Entry No.',
        width           : 100,
        displayField    : 'rate_code', 
        valueField      : 'rate_code',
        hiddenName      : '',
        id              : 'cmbApprovalNo',
        typeAhead       : true,
        mode            : 'local',
        store           : loadapprovallistStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        hidden          : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
            listeners:{
                select: function () {
             		loadeditApprovalNo.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'EditApprovalNo',
			            finid: GinFinid,
				    compcode:Gincompcode,
                                    apprno:cmbApprovalNo.getValue()
                                },
                       	callback:function()
				{


                                 txtCustomer.setDisabled(false);      



        		custcode = loadeditApprovalNo.getAt(0).get('rate_cust');

                        txtCustomer.setRawValue(loadeditApprovalNo.getAt(0).get('cust_ref'));



	  flxRateDetail.getStore().removeAll();
   
                                  var cnt = loadeditApprovalNo.getCount();
  
                                  if (cnt > 0)
                                  {    

                                  Ext.getCmp('save').setDisabled(false);
                                  if (loadeditApprovalNo.getAt(0).get('rate_approved') == "Y")
                                  {
                                      alert("Price Approved. You Can't Modify...");
                                      Ext.getCmp('save').setDisabled(true);
                                      txtCustomer.setDisabled(true);      
                                  }    

                          
//                                  txtGSMFrom1.setValue(loadeditApprovalNo.getAt(0).get('rate_gsmfrom'));     
 //                                 txtGSMTo1.setValue(loadeditApprovalNo.getAt(0).get('rate_gsmto')); 

                                   txtApprovalNo.setValue(cmbApprovalNo.getValue());

                                  txtPT.setValue(loadeditApprovalNo.getAt(0).get('rate_price_terms'));
                                  txtGD.setValue(loadeditApprovalNo.getAt(0).get('rate_grace_days'));
                                  txtRateDifference.setValue(loadeditApprovalNo.getAt(0).get('rate_rate_difference'));

                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('rate_vartype'));
                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_appr_date'),"d-m-Y"));     
                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_wef'),"d-m-Y"));              


                                  txtBitReelInch.setValue(loadeditApprovalNo.getAt(0).get('rate_bitreel_inch'));
                                  txtBitReelCM.setValue(loadeditApprovalNo.getAt(0).get('rate_bitreel_cm'));


/*    
                                  txtGSMFrom2.setValue(loadeditApprovalNo.getAt(0).get('rate2_gsmfrom'));     
                                  txtGSMTo2.setValue(loadeditApprovalNo.getAt(0).get('rate2_gsmto'));     
                                  txtGSMFrom3.setValue(loadeditApprovalNo.getAt(0).get('rate3_gsmfrom'));     
                                  txtGSMTo3.setValue(loadeditApprovalNo.getAt(0).get('rate3_gsmto'));     
                                  txtGSMFrom4.setValue(loadeditApprovalNo.getAt(0).get('rate4_gsmfrom'));     
                                  txtGSMTo4.setValue(loadeditApprovalNo.getAt(0).get('rate4_gsmto'));     
                                  txtIncRate1.setValue(loadeditApprovalNo.getAt(0).get('rate2_extraamt'));
                                  txtIncRate2.setValue(loadeditApprovalNo.getAt(0).get('rate3_extraamt'));

                                  txtIncRate3.setValue(loadeditApprovalNo.getAt(0).get('rate4_extraamt'));
                                  txtothershades.setValue(loadeditApprovalNo.getAt(0).get('rate_othershades'));
                                  txtSheetRate.setValue(loadeditApprovalNo.getAt(0).get('rate_sheet_extraamt'));
                                  txtGSTper.setValue(loadeditApprovalNo.getAt(0).get('rate_gst_per'));
*/

                                  for(var j=0; j<cnt; j++)
                                  { 




                                  flxRateDetail.getSelectionModel().selectAll();
                                  var selrows = flxRateDetail.getSelectionModel().getCount();
                                  var sel = flxRateDetail.getSelectionModel().getSelections();
  
		                  var RowCnt = flxRateDetail.getStore().getCount() + 1;
		                  flxRateDetail.getStore().insert(
		                  flxRateDetail.getStore().getCount(),
		                  new dgrecord({
	  
				           product   : loadeditApprovalNo.getAt(j).get('vargrp_type_name'),
					   prodcode  : loadeditApprovalNo.getAt(j).get('rate_vartype'),
					   shade     : loadeditApprovalNo.getAt(j).get('rate_shade'),
					   gsmfrom   : Number(loadeditApprovalNo.getAt(j).get('rate_gsmfrom')), 
					   gsmto     : Number(loadeditApprovalNo.getAt(j).get('rate_gsmto')), 
					   gsmfrrate : Number(loadeditApprovalNo.getAt(j).get('rate_rate')), 
					   gsmbrrate : Number(loadeditApprovalNo.getAt(j).get('rate_bitreel')), 
					   fr12bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf12')), 
					   fr14bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf14')), 
					   fr16bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf16')), 
					   fr18bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18')), 
					   fr20bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20')), 
					   fr22bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22')), 
					   fr24bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24')), 
					   fr26bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26')), 
					   fr28bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf28')), 
					   fr30bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf30')), 
					   br12bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf12_bit')), 
					   br14bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf14_bit')), 
					   br16bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf16_bit')), 
					   br18bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18_bit')), 
					   br20bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20_bit')), 
					   br22bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22_bit')), 
					   br24bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24_bit')), 
					   br26bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26_bit')), 
					   br28bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf28_bit')), 
					   br30bf    : Number(loadeditApprovalNo.getAt(j).get('rate_bf30_bit')), 

					   ar1gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate2_gsmfrom')), 
					   ar1gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate2_gsmto')), 
					   ar1rate     : Number(loadeditApprovalNo.getAt(j).get('rate2_extraamt')), 
					   ar2gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate3_gsmfrom')), 
					   ar2gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate3_gsmto')), 
					   ar2rate     : Number(loadeditApprovalNo.getAt(j).get('rate3_extraamt')), 
					   ar3gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate4_gsmfrom')), 
					   ar3gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate4_gsmto')), 
					   ar3rate     : Number(loadeditApprovalNo.getAt(j).get('rate4_extraamt')), 
					   ar4gsmfrom  : Number(loadeditApprovalNo.getAt(j).get('rate5_gsmfrom')), 
					   ar4gsmto    : Number(loadeditApprovalNo.getAt(j).get('rate5_gsmto')), 
					   ar4rate     : Number(loadeditApprovalNo.getAt(j).get('rate5_extraamt')), 

				           othshade    : Number(loadeditApprovalNo.getAt(j).get('rate_othershades')), 
				           sheet       : Number(loadeditApprovalNo.getAt(j).get('rate_sheet_extraamt')), 
                                           

					   bf18_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm120')), 
					   bf18_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm100')), 
					   bf18_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm90')), 
					   bf18_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm80')), 
					   bf18_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm70')), 
					   bf18_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm60')), 
					   bf18_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf18gsm50')), 

					   bf20_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm120')), 
					   bf20_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm100')), 
					   bf20_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm90')), 
					   bf20_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm80')), 
					   bf20_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm70')), 
					   bf20_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm60')), 
					   bf20_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf20gsm50')), 
	
					   bf22_120    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm120')), 
					   bf22_100    : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm100')),
					   bf22_90     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm90')),
					   bf22_80     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm80')),
					   bf22_70     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm70')),
					   bf22_60     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm60')),
					   bf22_50     : Number(loadeditApprovalNo.getAt(j).get('rate_bf22gsm50')),


					   bf24_120   : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm120')), 
					   bf24_100   : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm100')), 
					   bf24_90    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm90')), 
					   bf24_80    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm80')), 
					   bf24_70    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm70')), 
					   bf24_60    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm60')), 
					   bf24_50    : Number(loadeditApprovalNo.getAt(j).get('rate_bf24gsm50')), 

					   bf26_120   : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm120')), 
					   bf26_100   : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm100')), 
					   bf26_90    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm90')), 
					   bf26_80    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm80')), 
					   bf26_70    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm70')), 
					   bf26_60    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm60')), 
					   bf26_50    : Number(loadeditApprovalNo.getAt(j).get('rate_bf26gsm50')), 

					   bf28_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm120')), 
					   bf28_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm100')), 
					   bf28_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm90')), 
					   bf28_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm80')), 
					   bf28_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm70')), 
					   bf28_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm60')), 
					   bf28_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf28gsm50')), 


					   bf30_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm120')), 
					   bf30_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm100')), 
					   bf30_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm90')), 
					   bf30_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm80')), 
					   bf30_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm70')), 
					   bf30_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm60')), 
					   bf30_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf30gsm50')), 

					   bf32_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm120')), 
					   bf32_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm100')), 
					   bf32_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm90')), 
					   bf32_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm80')), 
					   bf32_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm70')), 
					   bf32_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm60')), 
					   bf32_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf32gsm50')),

					   bf34_120  : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm120')), 
					   bf34_100  : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm100')), 
					   bf34_90   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm90')), 
					   bf34_80   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm80')), 
					   bf34_70   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm70')), 
					   bf34_60   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm60')), 
					   bf34_50   : Number(loadeditApprovalNo.getAt(j).get('rate_bf34gsm50')), 

					   quality   : loadeditApprovalNo.getAt(j).get('var_desc'), 
					   qlycode   : Number(loadeditApprovalNo.getAt(j).get('rate_pb_variety')), 
					   pbrate    : Number(loadeditApprovalNo.getAt(j).get('rate_pb_rate')), 

		                     }) 
		                    );
		                  }


                                  }		

/*


                                  txtGSMFrom1_gsm.setValue(loadeditApprovalNo.getAt(0).get('rate_gsmfrom'));     
                                  txtGSMTo1_gsm.setValue(loadeditApprovalNo.getAt(0).get('rate_gsmto')); 
                                  txtFullReelRate.setValue(loadeditApprovalNo.getAt(0).get('rate_rate')); 
                                  txtBitReelRate.setValue(loadeditApprovalNo.getAt(0).get('rate_bitreel')); 





                                  custcode = loadeditApprovalNo.getAt(0).get('cust_code');
                                  txtApprovalNo.setValue(cmbApprovalNo.getValue());
                                  txtCustomer.setRawValue(loadeditApprovalNo.getAt(0).get('cust_ref'));
                                  cmbProductType.setValue(loadeditApprovalNo.getAt(0).get('rate_vartype'));
                                  dtpApproval.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_appr_date'),"d-m-Y"));     
                                  dtpWEF.setRawValue(Ext.util.Format.date(loadeditApprovalNo.getAt(0).get('rate_wef'),"d-m-Y"));              
    
                                  txtGSMFrom2.setValue(loadeditApprovalNo.getAt(0).get('rate2_gsmfrom'));     
                                  txtGSMTo2.setValue(loadeditApprovalNo.getAt(0).get('rate2_gsmto'));     
                                  txtGSMFrom3.setValue(loadeditApprovalNo.getAt(0).get('rate3_gsmfrom'));     
                                  txtGSMTo3.setValue(loadeditApprovalNo.getAt(0).get('rate3_gsmto'));     
                                  txtGSMFrom4.setValue(loadeditApprovalNo.getAt(0).get('rate4_gsmfrom'));     
                                  txtGSMTo4.setValue(loadeditApprovalNo.getAt(0).get('rate4_gsmto'));     
                                  txtIncRate1.setValue(loadeditApprovalNo.getAt(0).get('rate2_extraamt'));
                                  txtIncRate2.setValue(loadeditApprovalNo.getAt(0).get('rate3_extraamt'));

                                  txtIncRate3.setValue(loadeditApprovalNo.getAt(0).get('rate4_extraamt'));


                                  txtothershades.setValue(loadeditApprovalNo.getAt(0).get('rate_othershades'));
                                  txtGSTper.setValue(loadeditApprovalNo.getAt(0).get('rate_gst_per'));
                                  txtPayTerms1.setValue(loadeditApprovalNo.getAt(0).get('rate_crdays'));
                                  txtCashDiscdays.setValue(loadeditApprovalNo.getAt(0).get('rate_cashdisc_days'));
                                  txtCashDiscper.setValue(loadeditApprovalNo.getAt(0).get('rate_cashdisc_per'));


				txtCashDiscMT_7Days.setValue(loadeditApprovalNo.getAt(0).get('rate_payterm_30days_cdamt'));
				txtCashDiscMT_30Days.setValue(loadeditApprovalNo.getAt(0).get('rate_payterm_60days_cdamt1'));
				txtCashDiscMT_45Days.setValue(loadeditApprovalNo.getAt(0).get('rate_payterm_60days_cdamt2'));


				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full',
                                   gsmrate      : loadeditApprovalNo.getAt(0).get('rate_rate'),
		                   bf14         : loadeditApprovalNo.getAt(0).get('rate_bf14'),
		                   bf16         : loadeditApprovalNo.getAt(0).get('rate_bf16'),
		                   bf18         : loadeditApprovalNo.getAt(0).get('rate_bf18'),
		                   bf20         : loadeditApprovalNo.getAt(0).get('rate_bf20'),
		                   bf22         : loadeditApprovalNo.getAt(0).get('rate_bf22'),
		                   bf24         : loadeditApprovalNo.getAt(0).get('rate_bf24'),
		                   bf26         : loadeditApprovalNo.getAt(0).get('rate_bf26'),
		                   bf28         : loadeditApprovalNo.getAt(0).get('rate_bf28'),
		                   bf30         : loadeditApprovalNo.getAt(0).get('rate_bf30'),
                                })
                                ); 
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit',
                                   gsmrate      : loadeditApprovalNo.getAt(0).get('rate_bitreel'),
		                   bf14         : loadeditApprovalNo.getAt(0).get('rate_bf14_bit'),
		                   bf16         : loadeditApprovalNo.getAt(0).get('rate_bf16_bit'),
		                   bf18         : loadeditApprovalNo.getAt(0).get('rate_bf18_bit'),
		                   bf20         : loadeditApprovalNo.getAt(0).get('rate_bf20_bit'),
		                   bf22         : loadeditApprovalNo.getAt(0).get('rate_bf22_bit'),
		                   bf24         : loadeditApprovalNo.getAt(0).get('rate_bf24_bit'),
		                   bf26         : loadeditApprovalNo.getAt(0).get('rate_bf26_bit'),
		                   bf28         : loadeditApprovalNo.getAt(0).get('rate_bf28_bit'),
		                   bf30         : loadeditApprovalNo.getAt(0).get('rate_bf30_bit'),
                                })
                                ); 

*/
      				} 
                         });

			}
                      }    
});





var cmbProductType = new Ext.form.ComboBox({
        fieldLabel      : 'Product Type ',
        width           : 250,
        displayField    : 'vargrp_type_name', 
        valueField      : 'vargrp_type_code',
        hiddenName      : 'vargrp_type_code',
        id              : 'cmbProductType',
        typeAhead       : true,
        mode            : 'local',
        store           : loadProdType,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
                        if (cmbProductType.getValue() == 14)
                        {
                            tabRate.setActiveTab(1);
                            cmbPBShade.setRawValue('NAT');
                        } 
                        else    
                             tabRate.setActiveTab(0)


             		findProdType.load({
             		url: 'ClsMasSalesRate.php',
			params: {
				    task: 'findProductType',
                                    ptypecode:cmbProductType.getValue()
                                },
                       	callback:function()
				{
/*

                                  if (findProdType.getAt(0).get('vargrp_type_code') == 1)
                                  {
                                       Ext.getCmp('othervarty').hide();
                                       Ext.getCmp('bfrate').setDisabled(false);
                                  }
                                  else
                                  {
                                       Ext.getCmp('othervarty').show();
                                       Ext.getCmp('bfrate').setDisabled(true);
                                  }
*/

                                }
                         })
                 }
        }
 });


 var loadShadeDataStore = new Ext.data.Store({
      id: 'loadShadeDataStore',
      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadShade"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
             'shade_shortname','shade_code','shade_shortcode'
      ]),
    });


var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE ',
        width           : 100,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
//        store           : ['NAT','GREY-BRD','CR'],
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
        value           : 'NAT' ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
                if (cmbShade.getRawValue() == 'GREY-BRD')
                {
			txtIncRate1.setValue("0");
			txtIncRate2.setValue("0");
			txtIncRate3.setValue("0");
			txtIncRate4.setValue("0");
			txtGSMFrom1.setValue("0");
			txtGSMFrom2.setValue("0");
			txtGSMFrom3.setValue("0");
			txtGSMFrom4.setValue("0");
			txtGSMFrom5.setValue("0");

			txtGSMTo1.setValue("0");
			txtGSMTo2.setValue("0");
			txtGSMTo3.setValue("0");
			txtGSMTo4.setValue("0");
			txtGSMTo5.setValue("0");

			txtothershades.setValue("0");
			txtSheetRate.setValue("0");
                }        
                else 
                {
			txtIncRate1.setValue("500");
			txtIncRate2.setValue("1000");
			txtIncRate3.setValue("1000");
			txtIncRate4.setValue("1000");

			txtGSMFrom1.setValue("120");
			txtGSMFrom2.setValue("181");
			txtGSMFrom3.setValue("201");
			txtGSMFrom4.setValue("100");
			txtGSMFrom5.setValue("101");

			txtGSMTo1.setValue("180");
			txtGSMTo2.setValue("200");
			txtGSMTo3.setValue("250");
			txtGSMTo4.setValue("100");
			txtGSMTo5.setValue("110");

			txtothershades.setValue("1000");
			txtSheetRate.setValue("500");

                }        

                }
        }
});


var cmbPBShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE ',
        width           : 100,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        id              : 'cmbPBShade',
        typeAhead       : true,
        mode            : 'local',
//        store           : ['NAT','GREY-BRD','CR'],
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
        value           : 'NAT' ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {

                }
        }
});


var cmbShade = new Ext.form.ComboBox({
        fieldLabel      : 'SHADE ',
        width           : 100,
        displayField    : 'shade_shortname', 
        valueField      : 'shade_code',
        id              : 'cmbShade',
        typeAhead       : true,
        mode            : 'local',
//        store           : ['NAT','GREY-BRD','CR'],
        store           : loadShadeDataStore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : true,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true  ,
        value           : 'NAT' ,
       labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
        listeners: {
            select: function () 
                {
                if (cmbShade.getRawValue() == 'GREY-BRD')
                {
			txtIncRate1.setValue("0");
			txtIncRate2.setValue("0");
			txtIncRate3.setValue("0");
			txtIncRate4.setValue("0");
			txtGSMFrom1.setValue("0");
			txtGSMFrom2.setValue("0");
			txtGSMFrom3.setValue("0");
			txtGSMFrom4.setValue("0");
			txtGSMFrom5.setValue("0");

			txtGSMTo1.setValue("0");
			txtGSMTo2.setValue("0");
			txtGSMTo3.setValue("0");
			txtGSMTo4.setValue("0");
			txtGSMTo5.setValue("0");

			txtothershades.setValue("0");
			txtSheetRate.setValue("0");
                }        
                else 
                {
			txtIncRate1.setValue("500");
			txtIncRate2.setValue("1000");
			txtIncRate3.setValue("1000");
			txtIncRate4.setValue("1000");

			txtGSMFrom1.setValue("120");
			txtGSMFrom2.setValue("181");
			txtGSMFrom3.setValue("201");
			txtGSMFrom4.setValue("100");
			txtGSMFrom5.setValue("101");

			txtGSMTo1.setValue("180");
			txtGSMTo2.setValue("200");
			txtGSMTo3.setValue("250");
			txtGSMTo4.setValue("100");
			txtGSMTo5.setValue("110");

			txtothershades.setValue("1000");
			txtSheetRate.setValue("500");

                }        

                }
        }
});



/*
var cmbCustomer = new Ext.form.ComboBox({
        fieldLabel      : 'Customer',
        width           : 100,
        displayField    : 'cust_ref', 
        valueField      : 'cust_code',
        hiddenName      : 'cust_code',
        id              : 'cmbCustomer',
        typeAhead       : true,
        mode            : 'local',
        store           : loadAllCustomerList,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	tabIndex	: 0,
        allowblank      : true,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",  
   });
*/

function get_bit_reelRate()
{


        flxDetail.getSelectionModel().selectAll();
        var selrows = flxDetail.getSelectionModel().getCount();
        var sel = flxDetail.getSelectionModel().getSelections();
/*

        if (sel[0].data.gsmrate.toString().length == 5 )
            sel[1].set('gsmrate', Number(sel[0].data.gsmrate));
        else
        {  
           if (sel[0].data.gsmrate.toString().length > 0 )
            alert("Error in Rate for gsmrate...");
        }

        if (sel[0].data.bf12.toString().length == 5 )
            sel[1].set('bf12', Number(sel[0].data.bf12));
        else
        {  
           if (sel[0].data.bf12.toString().length > 0 )
            alert("Error in Rate for BF12...");
        }
*/
        if (sel[0].data.bf14.toString().length == 5 )
            sel[1].set('bf14', Number(sel[0].data.bf14));
        else
        {  

           if (sel[0].data.bf14.toString().length > 0 && sel[0].data.bf14.toString().length < 5  )
            alert("Error in Rate for BF14...");
        }


        if (sel[0].data.bf16.toString().length == 5)
           sel[1].set('bf16', Number(sel[0].data.bf16));
        else
        {  
           if (sel[0].data.bf16.toString().length > 0 && sel[0].data.bf16.toString().length < 5  )
            alert("Error in Rate for BF16...");
        }

        if (sel[0].data.bf18.toString().length == 5)
           sel[1].set('bf18', Number(sel[0].data.bf18));
        else
        {  
           if ( sel[0].data.bf18.toString().length > 0 && sel[0].data.bf18.toString().length < 5  )
            alert("Error in Rate for BF18...");
        }

        if (sel[0].data.bf20.toString().length == 5)
           sel[1].set('bf20', Number(sel[0].data.bf20));
        else
        {  
           if (sel[0].data.bf20.toString().length > 0 && sel[0].data.bf20.toString().length < 5  )
            alert("Error in Rate for BF20...");
        }


        if (sel[0].data.bf22.toString().length == 5)
            sel[1].set('bf22', Number(sel[0].data.bf22));
        else
        {  
           if (sel[0].data.bf22.toString().length > 0 && sel[0].data.bf22.toString().length < 5  )
            alert("Error in Rate for BF22...");
        }

        if (sel[0].data.bf24.toString().length == 5)
           sel[1].set('bf24', Number(sel[0].data.bf24));
        else
        {  
           if (sel[0].data.bf24.toString().length > 0 && sel[0].data.bf24.toString().length < 5  )
            alert("Error in Rate for BF24...");
        }

        if (sel[0].data.bf26.toString().length == 5)
           sel[1].set('bf26', Number(sel[0].data.bf26));
        else
        {  
           if (sel[0].data.bf26.toString().length > 0 && sel[0].data.bf26.toString().length < 5 )
            alert("Error in Rate for BF26...");
        }

        if (sel[0].data.bf28.toString().length == 5)
            sel[1].set('bf28', Number(sel[0].data.bf28)); 
        else
        {  
           if (sel[0].data.bf28.toString().length > 0 && sel[0].data.bf28.toString().length < 5  )
            alert("Error in Rate for BF28...");
        }

        if (sel[0].data.bf30.toString().length == 5)
           sel[1].set('bf30', Number(sel[0].data.bf30));
     else
          {  
           if (sel[0].data.bf30.toString().length > 0 && sel[0].data.bf30.toString().length < 5   )
            alert("Error in Rate for BF30...");
        }

}

var dgrecord = Ext.data.Record.create([]);
var flxDetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:100,
    y:100,
    height: 90,
    hidden:false,
    width:850,
    id: 'my-grid',  
//    	labelStyle	: "font-size:12px;font-weight:bold;",
//    font-size:18px,
    columns:
    [
       {header: "Reel", dataIndex:'reel', width:70,align:'center',sortable:false, menuDisabled: true},
       {header: "GSM RATE", dataIndex:'gsmrate', width:78,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},

	     	    listeners:{
             	    keyup: function () {


	}}}},
       {header: "12", dataIndex:'bf12', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,

                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                           get_bit_reelRate();
	}}}},

       {header: "14", dataIndex:'bf14', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: false,
                    enableKeyEvents: true,

                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                           get_bit_reelRate();
	}}}},


       {header: "16", dataIndex:'bf16', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},

       {header: "18", dataIndex:'bf18', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},


       {header: "20", dataIndex:'bf20', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},


       {header: "22", dataIndex:'bf22', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},

       {header: "24", dataIndex:'bf24', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},
       {header: "26", dataIndex:'bf26', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},

       {header: "28", dataIndex:'bf28', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},
       {header: "30", dataIndex:'bf30', width:65,align:'center',sortable:false, menuDisabled: true,
  	editor:{
		    xtype:'numberfield',
                    allowBlank: true,
                    enableKeyEvents: true,
                    autoCreate:{tag:'input',type:'text',size:'20',autocomplete:'off',maxlength:'5'},
	     	    listeners:{
             	    blur: function () {
                         get_bit_reelRate();
	}}}},
    ],
    store: [], //BFDataStore,

});


 var btnAddPaperBag = new Ext.Button({
	text: 'ADD',
	width: 70,
	height: 40,
	tooltip:'Click To Add',
	icon:'../GRN/icons/download.gif',
	    border: 1,
	    style: {
	      borderColor: 'blue',
	      borderStyle: 'solid',

	    },

	listeners:{
	  click: function(){    

	        var gstadd="true";
                var pbshade = cmbPBShade.getRawValue();

                if (cmbvarietylist.getValue() == 0 )
		{
			alert("Select Variety List..");
		        gstadd="false";
		        cmbvarietylist.setFocus();
		}
                if (Number(txtPBRate.getValue()) == 0)
		{
			alert("Enter Rate ..");
		        gstadd="false";
		        txtPBRate.setFocus();
		}
                
                if(gstadd=="true")
                { 
                flxRateDetail.getSelectionModel().selectAll();
                var selrows = flxRateDetail.getSelectionModel().getCount();
                var sel = flxRateDetail.getSelectionModel().getSelections();
                var cnt = 0;
                for (var i=0;i<selrows;i++){

                    if (sel[i].data.qlycode === cmbvarietylist.getValue() && sel[i].data.shade === cmbPBShade.getRawValue() )
		    {
                        cnt = cnt + 1;
                    }
                }

        	if(gridedit === "true")
	          {
//alert(cmbitem.getRawValue());
			gridedit = "false";

	               	var idx = flxRateDetail.getStore().indexOf(editrow);
			sel[idx].set('product'  , cmbProductType.getRawValue());
			sel[idx].set('prodcode' , cmbProductType.getValue());
			sel[idx].set('shade'    , cmbPBShade.getRawValue());
			sel[idx].set('quality'  , cmbvarietylist.getRawValue());
			sel[idx].set('qlycode'  , cmbvarietylist.getValue());
			sel[idx].set('pbrate'   , Number(txtPBRate.getValue()));

		}//if(gridedit === "true")

                else if (cnt > 0){
                    Ext.MessageBox.alert("Grid","Same Quality already Entered.");
                } else
                {      
                        var RowCnt = flxRateDetail.getStore().getCount() + 1;
                        flxRateDetail.getStore().insert(
                        flxRateDetail.getStore().getCount(),
                        new dgrecord({
		           product  : cmbProductType.getRawValue(),
			   prodcode : cmbProductType.getValue(),
		           shade    : cmbPBShade.getRawValue(),
			   quality  : cmbvarietylist.getRawValue(),
			   qlycode  : cmbvarietylist.getValue(),
			   pbrate   : Number(txtPBRate.getValue()),
                        }));
                }



                txtPBRate.setValue('');
               }
               else
               {
                  alert("Error in Quality or Rate ... Select Quality / Rate");
               }          
          }
       }
  })


var tabRate = new Ext.TabPanel({
    id          : 'tabRate',
    xtype       : 'tabpanel',
    bodyStyle:{"background-color":"#ebebdf"},
    activeTab   : 0,
    height      : 260,
    width       : 1350,

        listeners: {
          'tabchange': function(tabPanel, tab) {
//           flxAccounts.getStore().removeAll();
        }},
 
         items       : [

           {
            xtype: 'panel',
            title: 'KRAFT & OTHERS',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 420,
                           x           : 10,
                           y           : 0,
                           border      : false,
                           items: [cmbProductType]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 80,
                           width       : 250,
                           x           : 400,
                           y           : 0,
                           border      : false,
                           items: [cmbShade]
                   },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 80,
                             width       : 420,
                             x           : 600,
                             y           : 0,
                             border      : false,      
         
                             items: [txtGSTper]
                      },

   	     { xtype   : 'fieldset',
                 title       : ' BF RATE',
                 id          : 'bfrate',
                 width       : 825,
                 height      : 190,
                 x           : 10,
                 y           : 35,
                 border      : true,
                 layout      : 'absolute',
                items:[

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 0,
                           y           : -10,
                           border      : false,
                           items: [txtGSMFrom1]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 80,
                           width       : 200,
                           x           : 200,
                           y           : -10,
                           border      : false,
                           items: [txtGSMTo1]
                   },

                { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 120,
                           width       : 300,
                           x           : 500,
                           y           : -10,
                           border      : false,
                           items: [txtRateDifference]
                   },


                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 820,
                           x           : 0,
                           y           : 25,
                           border      : false,
                           items: [flxDetail]
                   },


  
                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 200,
                           width       : 300,
                           x           : 10,
                           y           : 120,
                           border      : false,
                           items: [txtBitReelInch]
                   },

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 50,
                           width       : 300,
                           x           : 300,
                           y           : 120,
                           border      : false,
                           items: [txtBitReelCM]
                   },
                ] 
         },
	
   	     { xtype   : 'fieldset',
                title   : 'ADDITIONAL PRICE INCREASE FOR ',
                 width       : 378,
                 height      : 210,
                 x           : 900,
                 y           : 0,
                 border      : true,
                 layout      : 'absolute',
                 id          : 'addrate',
                items:[


                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 280,
                             y           : -16,
                             border      : false,      
         
                             items: [lblrate]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 0,
                             border      : false,      
         
                             items: [txtGSMFrom2]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 0,
                             border      : false,      
         
                             items: [txtGSMTo2]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 0,
                             border      : false,      
         
                             items: [txtIncRate1]
                      },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 25,
                             border      : false,      
         
                             items: [txtGSMFrom3]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 25,
                             border      : false,      
         
                             items: [txtGSMTo3]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 25,
                             border      : false,      
         
                             items: [txtIncRate2]
                      },
	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 50,
                             border      : false,      
         
                             items: [txtGSMFrom4]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 50,
                             border      : false,      
         
                             items: [txtGSMTo4]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 50,
                             border      : false,      
         
                             items: [txtIncRate3]
                      },



                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 100,
                             width       : 170,
                             x           : 0,
                             y           : 75,
                             border      : false,      
         
                             items: [txtGSMFrom5]
                      },
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 30,
                             width       : 200,
                             x           : 160,
                             y           : 75,
                             border      : false,      
         
                             items: [txtGSMTo5]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 1,
                             width       : 420,
                             x           : 270,
                             y           : 75,
                             border      : false,      
         
                             items: [txtIncRate4]
                      },




                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 110,
                             border      : false,      
         
                             items: [txtothershades]
                      },
                         { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 270,
                             width       : 420,
                             x           : 0,
                             y           : 140,
                             border      : false,      
         
                             items: [txtSheetRate]
                      },

/*
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 200,
                             y           : 110,
                             border      : false,      
         
                             items: [txtCashDiscdays]
                      },
*/

                ] 
         },



                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 830,
                           y           : 140,
                           border      : false,
                           items: [btnAddKraft]
                   },


            ]

            },

           {
            xtype: 'panel',
            title: 'PAPER BAG',bodyStyle:{"background-color":"#ffffcc"},
            layout: 'absolute',
            items: [

                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 450,
                           x           : 50,
                           y           : 50,
                           border      : false,
                           items: [cmbvarietylist]
                   },




                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 70,
                           width       : 450,
                           x           : 350,
                           y           : 50,
                           border      : false,
                           items: [cmbPBShade]
                   },


                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 70,
                           width       : 450,
                           x           : 580,
                           y           : 50,
                           border      : false,
                           items: [txtPBRate]
                   },



                   { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 200,
                           x           : 850,
                           y           : 40,
                           border      : false,
                           items: [btnAddPaperBag]
                   },
            ]

            },

         ]
   });


   var MasSalesRateCustomerPanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'GROUP NAME',
        header      : false,
        width       : 300,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 800,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'MasSalesRateCustomerPanel',
        method      : 'POST',
        layout      : 'absolute',
        reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                    },['fromdate']),
        tbar: { 
            xtype: 'toolbar',bodyStyle: "background: #d7d5fa;",
            height: 40,
            style   :'background-color:#d7d5fa',
            fontSize:25,
            items: [
		   {
			    text: ' Add',
			    style  : 'text-align:center;',
			    tooltip: 'Add Details...',
			    height: 40,
			    fontSize:20,
			    width:50,
			    align : 'right',
			    icon: '/Pictures/Add.png',
			    listeners:{
				click: function () {
				    gstFlag = "Add";
                                    RefreshData();
				}
			    }
		   },'-',
//edit data
		   {
			    text: 'Edit',
			    style  : 'text-align:center;',
			    tooltip: 'Modify Details...',
			    height: 40,
			    fontSize:20,
			    width:50,
			    icon: '/Pictures/edit.png',
			    listeners:{
				click: function () {

//alert(Gincompcode);
//alert(GinFinid);
				    gstFlag = "Edit";
//alert(gstFlag);


                                    Ext.getCmp('cmbApprovalNo').show();

                                    loadapprovallistStore.load({
		                    url: 'ClsMasSalesRate.php',
                                    params: {
				       task: 'loadRateEntryNo',
			               finid: GinFinid,
				       compcode:Gincompcode,
                                    },
                                    callback: function () 
	            	           {

//                                    alert(loadapprovallistStore.getCount());


                                    }


                                    });  

				}
			    }
		   },'-',

                   {
                    text: 'Save',
                    id: 'save',                     
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png' ,
                       listeners:{
		                click: function () {   //loop v start 
//alert(Gincompcode);
//alert(chkallsize.getValue());
//alert(Ext.getCmp("chkallsize").checked)
//save





           

		                       if(txtCustomer.getRawValue()=="" || custcode ==0)
					{
						alert("Select Customer Name..");
						txtCustomer.setFocus();
					}
	
		                 	else if(cmbProductType.getRawValue()=="" || cmbProductType.getValue()==0)
					{
						alert("Select Production Variety..");
						cmbProductType.setFocus();
					}
					else
					{            //loop w start   
						Ext.MessageBox.show({
				                title: 'Confirmation',
				                icon: Ext.Msg.QUESTION,
		        			buttons: Ext.MessageBox.YESNO,
		                    		msg: 'Do You Want to save the Record',
		                    		fn: function(btn)
						{          //loop x start   
						if (btn == 'yes')
						   {       //loop y start


            var rateData = flxRateDetail.getStore().getRange();                                        
            var rateupData = new Array();
            Ext.each(rateData, function (record) {
                rateupData.push(record.data);
            });



                                                        txtGSMFrom1.setValue(txtGSMFrom1_gsm.getValue());	
                                                        txtGSMTo1.setValue(txtGSMTo1_gsm.getValue());

	         //-- loop y Start     
							Ext.Ajax.request({
				                    	url: 'FrmMasSalesCustomerRateSaveNew.php',
				                        params:
							{
                                                        savetype:gstFlag,

		cnt: rateData.length,
               	griddet: Ext.util.JSON.encode(rateupData),   

                                                        compcode:Gincompcode,
                                                        finid:GinFinid,   
                                                        custcode     : custcode,
                   
		                                        vartypecode  : cmbProductType.getValue(), 

                                                        rate         : Number(txtFullReelRate.getValue()),
                                                        bitreelrate  : Number(txtBitReelRate.getValue()),

			                                gsmfrom1     : Number(txtGSMFrom1.getValue()),	
                                                        gsmto1       : Number(txtGSMTo1.getValue()),	
			                                gsmfrom2     : Number(txtGSMFrom2.getValue()),	
                                                        gsmto2       : Number(txtGSMTo2.getValue()),	
			                                gsmfrom3     : Number(txtGSMFrom3.getValue()),	
                                                        gsmto3       : Number(txtGSMTo3.getValue()),	
			                                gsmfrom4     : Number(txtGSMFrom4.getValue()),	
                                                        gsmto4       : Number(txtGSMTo4.getValue()),	
			                                gsmfrom5     : Number(txtGSMFrom5.getValue()),	
                                                        gsmto5       : Number(txtGSMTo5.getValue()),	

							rate2_examt  : Number(txtIncRate1.getValue()),		
							rate3_examt  : Number(txtIncRate2.getValue()),
						        rate4_examt  : Number(txtIncRate3.getValue()),	
						        rate5_examt  : Number(txtIncRate4.getValue()),	
	
                                                	othershades:Number(txtothershades.getValue()),						
							GSTper       : Number(txtGSTper.getValue()),
					                cashdiscdays : Number(txtCashDiscdays.getValue()),
				                      	cashdiscper  : Number(txtCashDiscper.getValue()),

				      cdamt1  : Number(txtCashDiscMT_7Days.getValue()),			             
				      cdamt2     : Number(txtCashDiscMT_30Days.getValue()),	
				      cdamt3     : Number(txtCashDiscMT_45Days.getValue()),	

                                      apprno     : txtApprovalNo.getValue(),                                        
                                      apprdate   : Ext.util.Format.date(dtpApproval.getValue(),"Y-m-d"),
	 	                      wefdate    : Ext.util.Format.date(dtpWEF.getValue(),"Y-m-d"),
                                      userid     : UserId,
//		                      priceterm  : Number(txtPriceTerms.getValue()),
   //                                   PTGD     : Number(txtPT.getValue())+Number(txtGD.getValue()),
		                      priceterm  : Number(txtPT.getValue()),
                                      PTGD       : Number(txtGD.getValue()),
                                      custextrarate  : Number(txtRateDifference.getValue()),

                                      bitreelinch : Number(txtBitReelInch.getValue()),
                                      bitreelCM   : Number(txtBitReelCM.getValue()),




							},
							callback: function (options, success, response)
		         //-- loop Z Start                       
                                                      	{     //loop z start
		                                    	var obj = Ext.decode(response.responseText);
							var obj2 = Ext.decode(response.responseText);
		                                    	if (obj['success'] === "true") 
					                   {
	          						Ext.MessageBox.alert("Alert","Saved ");
                          
		                                                MasSalesRateCustomerPanel.getForm().reset();




								RefreshData();
		                                           }
		                                     	else 
                                                           {
	                                                        if (obj['cnt']>0)
								{
		                                                  Ext.MessageBox.alert("Alert","Already exists.. ");
								}
								else
								{
		                                                  Ext.MessageBox.alert("Alert","Not Saved.. ");
								}
		                                             
		                                    	   }
		                                         }   //loop z end
		         //-- loop Z end           

                                                    });      //loop y end
                                                  }       //loop x start
                                                 } 
                                            });   

                                        }  //loop w start   
                         	} //loop v start 
                   } 
            },
               {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function () {
                           RefreshData();
                        }
                    }
                },

                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
                    handler: function(){	
                            MasSalesRateCustomerWindow.hide();
                        }
                } ]
        },
        items: [
            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 1350,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 10,
                y       : 0,	
                items:[
                       
                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [txtApprovalNo]

                    },	

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 0,
                             y           : 0,
                             border      : false,
                             items: [cmbApprovalNo]

                    },	




                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 300,
                            y           : 0,
                            labelWidth  : 40,
                            border      : false,
                            items : [dtpApproval]
   
                   },

                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 550,
                            y           : 0,
                            labelWidth  : 80,
                            border      : false,
                            items : [dtpWEF]
   
                   },
/*
                    {
			    xtype       : 'fieldset',
			    x           : 830,
			    y           : 0,
                            labelWidth  : 220,
			    border      : false,
			    width       :850,
                            items : [txtPriceTerms]
   
                   },
*/
                     { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 130,
                           width       : 600,
                           x           : 0,
                           y           : 30,
                           border      : false,
                           items: [txtCustomer]
                   },	

                     { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 120,
                           width       : 600,
                           x           : 830,
                           y           : 00,
                           border      : false,
                           items: [txtPT]
                   },	


                     { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 100,
                           width       : 600,
                           x           : 1020,
                           y           : 0,
                           border      : false,
                           items: [txtGD]
                   },	

                    {
			    xtype       : 'fieldset',
			    x           : 830,
			    y           : 30,
                            labelWidth  : 220,
			    border      : false,
			    width       :850,
                            items : [txtOldEntryNo]
   
                   },

 flxParty,
                   ]
       },

            { xtype   : 'fieldset',
                title   : '',
                layout  : 'hbox',
                border  : true,
                height  : 525,
                width   : 330,
		style:{ border:'1px solid red'},
                layout  : 'absolute',
                x       : 1450,
                y       : 0,	
                items:[
                        

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 150,
                             width       : 170,
                             x           : 10,
                             y           : 10,
                             border      : false,      
         
                             items: [lblPrevious]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 150,
                             width       : 250,
                             x           : 10,
                             y           : 30,
                             border      : false,      
         
                             items: [flxPrice]
                      },

                      { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 180,
                             border      : false,
                             items: [txtOldApprovalNo]

                    },	

    

                    {
                            xtype       : 'fieldset',
                            title       : '',
                            width       : 300,
                            x           : 10,
                            y           : 205,
                            labelWidth  : 130,
                            border      : false,
                            items : [dtpOldApproval]
   
                   },


                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 240,
                             border      : false,
                             items: [txtBF14rate]

                    },	



                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 265,
                             border      : false,
                             items: [txtBF16rate]

                    },	


                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 290,
                             border      : false,
                             items: [txtBF18rate]

                    },	


                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 315,
                             border      : false,
                             items: [txtBF20rate]

                    },	


                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 340,
                             border      : false,
                             items: [txtBF22rate]

                    },	

                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 365,
                             border      : false,
                             items: [txtBF24rate]

                    },	

                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 390,
                             border      : false,
                             items: [txtBF26rate]

                    },	

                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 415,
                             border      : false,
                             items: [txtBF28rate]

                    },	

                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 440,
                             border      : false,
                             items: [txtBF30rate]

                    },

                     { 
                        
                             xtype       : 'fieldset',
                             title       : '',
                             labelWidth  : 130,
                             width       : 420,
                             x           : 10,
                             y           : 475,
                             border      : false,
                             items: [txtGSMrate]

                    },		
                ]
             } ,        

	    {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 90,
                                width: 1350,
                                x: 5,
                                y: 65,
                                border: false,
                                items: [tabRate]
             },


   	     { xtype   : 'fieldset',
                 title       : '',
                 width       : 1290,
                 height      : 160,
                 x           : 25,
                 y           : 345,
                 border      : true,
                 layout      : 'absolute',
                 items:[
                  { 
                           xtype       : 'fieldset',
                           title       : '',
                           labelWidth  : 1,
                           width       : 1300,
                           x           : 0,
                           y           : 0,
                           border      : false,
                           items: [flxRateDetail]
                   },
                 ]
              }



       ] ,  
    });

      function RefreshData(){


    //    Ext.getCmp('bfrate').setDisabled(false);
//        Ext.getCmp('gsmrate').setDisabled(true);
	MasSalesRateCustomerPanel.getForm().reset();
        custcode = 0;
         flxParty.hide();
         Ext.getCmp('cmbApprovalNo').hide();
//         Ext.getCmp('othervarty').hide();

	txtCashDiscMT_7Days.setValue(500);
	txtCashDiscMT_30Days.setValue(1000);
	txtCashDiscMT_45Days.setValue(500);

               txtCustomer.setDisabled(false);     

Ext.getCmp('save').setDisabled(false);
flxRateDetail.getStore().removeAll();



				  flxDetail.getStore().removeAll();
				  var selrows = flxDetail.getSelectionModel().getCount();
			          var sel = flxDetail.getSelectionModel().getSelections();
                                var RowCnt = flxDetail.getStore().getCount() + 1;

                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Full', 
                                   gsmrate      : '',
		                   bf12         : 0,
		                   bf14         : '',
		                   bf16         : '',
		                   bf18         : '',
		                   bf20         : '',
		                   bf22         : '',
		                   bf24         : '',
		                   bf26         : '',
		                   bf28         : '',
		                   bf30         : '',

                                })
                              ); 
                var RowCnt = flxDetail.getStore().getCount() + 1;
                                flxDetail.getStore().insert(
                                flxDetail.getStore().getCount(),
                                new dgrecord({
                                   reel         : 'Bit', 
                                   gsmrate      : '',
		                   bf12         : 0,
		                   bf14         : 0,
		                   bf16         : 0,
		                   bf18         : 0,
		                   bf20         : 0,
		                   bf22         : 0,
		                   bf24         : 0,
		                   bf26         : 0,
		                   bf28         : 0,
		                   bf30         : 0,
                                })
                                ); 



        txtIncRate1.setValue("500");
        txtIncRate2.setValue("1000");
        txtIncRate3.setValue("1000");
        txtGSMFrom1.setValue("120");
	txtGSMFrom2.setValue("181");
	txtGSMFrom3.setValue("201");
	txtGSMFrom4.setValue("100");
	txtGSMFrom5.setValue("101");

        txtGSMTo1.setValue("180");
	txtGSMTo2.setValue("200");
	txtGSMTo3.setValue("250");
	txtGSMTo4.setValue("100");
	txtGSMTo5.setValue("110");
        txtPriceTerms.setValue(30);


        txtBitReelInch.setValue(16);
        txtBitReelCM.setValue(40);




        txtPT.setValue('');
        txtGD.setValue('');
	findRateEntryNodatastore.removeAll();
	findRateEntryNodatastore.load({
	 url: 'ClsMasSalesRate.php',
		params: {
	    	   task: 'findRateEntryNo',
		   compcode:Gincompcode,
		   finid:GinFinid   
		 },
		 callback:function()
		   {
		       txtApprovalNo.setValue(findRateEntryNodatastore.getAt(0).get('rateno'));
        //                txtPriceTerms.setValue(30);
                       txtCustomer.focus();
		   } 
         });


   };


   var findRateEntryNodatastore = new Ext.data.Store({
      id: 'findRateEntryNodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsMasSalesRate.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"findRateEntryNo"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rateno'
      ]),
    });
   
    var MasSalesRateCustomerWindow = new Ext.Window({
	height      : 600,
        width       : 1800,
        x           : 0,
        y           : 35,
        title       : 'SALES - PRICE MASTER',
        items       : MasSalesRateCustomerPanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDRD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false ,
 onEsc:function(){
},
	listeners:{
           show:function(){
                       RefreshData();
                            cmbPBShade.setRawValue('NAT');



//alert(Gincompcode);
//alert(GinFinid);
/*
			findRateEntryNodatastore.removeAll();
			findRateEntryNodatastore.load({
			 url: 'ClsMasSalesRate.php',
		                params: {
                	    	   task: 'findRateEntryNo',
                                   compcode:Gincompcode,
                                   finid:GinFinid   
                	         },
				 callback:function()
   	               		   {

                     	               txtApprovalNo.setValue(findRateEntryNodatastore.getAt(0).get('rateno'));
                                   } 
  			  });
*/
                 }

      }
    });
    MasSalesRateCustomerWindow.show();  
});
