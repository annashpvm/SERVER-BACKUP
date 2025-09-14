Ext.onReady(function(){
   Ext.QuickTips.init();
   var Gincompcode = localStorage.getItem('gincompcode');
   var GinFinid = localStorage.getItem('ginfinid');
   var gstStatus = "N";
var mcode;
var tbistk;
var actstk;
var actqty;
var SaveFlag ="Add";
var macname;
var gridedit = "false";
var editrow = 0;
var seqnoed;
//var gstGroup;
var chkitemcode = 0;


   var usertype = localStorage.getItem('ginuser');

    var gstfinyear = localStorage.getItem('gstyear');

   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate = localStorage.getItem('gfineddate');

var usertype = localStorage.getItem('ginuser');
var UserName = localStorage.getItem('ginusername');
var UserId   = localStorage.getItem('ginuserid');


	
var loadRatedatastore = new Ext.data.Store({
      id: 'loadRatedatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadRate"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'rect_costrate',
      ]),
    });


 var loadSearchItemListDatastore = new Ext.data.Store({
      id: 'loadSearchItemListDatastore',
//      autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadSearchItemlist"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
          'itmh_code', 'itmh_name','itmh_moisture_per'
      ]),
    });



var Issnodatastore = new Ext.data.Store({
  id: 'Issnodatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuIssue.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissno"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'issno','issh_no','issh_seqno',
  ])
});


var Issdetaildatastore = new Ext.data.Store({
  id: 'Issdetaildatastore',
  proxy: new Ext.data.HttpProxy({
            url: 'ClsFuIssue.php',      // File to connect to
            method: 'POST'
        }),
        baseParams:{task: "loadissdetail"}, // this parameter asks for listing
  reader: new Ext.data.JsonReader({
              // we tell the datastore where to get his data from

    root: 'results',
    totalProperty: 'total',
    id: 'id'
  },[
    'isst_hdseqno', 'isst_seqno', 'isst_itmcode',  'isst_qty', 'isst_rate',  'isst_values', 'issh_type', 'issh_date', 'issh_seqno', 'itmh_name', 'itmt_clqty','isst_varty','isst_itemtype'
  ])
});


	
 var loadbatchdatastore = new Ext.data.Store({
      id: 'loadbatchdatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadbatch"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'mis_batchcode','mis_batchvariety','t_variety','t_batch','d_compcode','d_fincode','d_variety','d_date'
      ]),
    });

	var ItemDataStore = new Ext.data.Store({
      id: 'ItemDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"LoadItem"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	{name:'itmh_code', type: 'string',mapping:'itmh_code'},
	{name:'itmh_name', type: 'string',mapping:'itmh_name'}
      ]),
    });
	
	var LotDataStore = new Ext.data.Store({
      id: 'LotDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadlot"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	'lot_refno','lot_code'
      ]),
    });

var loadItemStockDataStore = new Ext.data.Store({
      id: 'loadItemStockDataStore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsFuIssue.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadItemStock"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },[
	 'itmt_opqty', 'itmt_opvalue', 'itmt_clqty', 'itmt_clvalue', 'itmt_avgrate'
      ]),
    });

var txtissno = new Ext.form.NumberField({
	fieldLabel  : 'Issue No',
	id          : 'txtissno',
	name        : 'txtissno',
	width       :  100,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	//style       :  {textTransform: "uppercase"},
        //allowBlank  :  false,
    	enableKeyEvents: true,
	tabindex : 1,

});


function get_Stock()
{
	var sm = flxItem.getSelectionModel();
	var selrow = sm.getSelected();
	chkitemcode  = selrow.get('itmh_code');

//ert(chkitemcode);
        txtItemName.setValue(selrow.get('itmh_name'));
        flxItem.hide();
        txtissqty.focus();

        loadItemStockDataStore.removeAll();
        loadItemStockDataStore.load({
                url: 'ClsFuIssue.php',
                params:
                {
                    task:"loadItemStock",
		    compcode : Gincompcode,
		    finid    : GinFinid,
		    itemcode : chkitemcode,

                },
		callback:function()
		{

//			txtcostrate.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('itmt_avgrate'),"0.00000"));
			
 			txtstock.setValue(Ext.util.Format.number(loadItemStockDataStore.getAt(0).get('itmt_clqty'),"0.000"));
				

		}
            });

        loadRatedatastore.removeAll();
        loadRatedatastore.load({
                url: 'ClsFuIssue.php',
                params:
                {
                    task:"loadRate",
		    itemcode : chkitemcode,

                },
		callback:function()
		{
		}
            });

}

   var flxItem = new Ext.grid.EditorGridPanel({
        frame: false,
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        stripeRows : true,
        scrollable: true,
        height: 400,
        width: 420,
        id : flxItem,
        x: 80,
        y: 40,
    	labelStyle	: "font-size:12px;font-weight:bold;",
    	style      :"border-radius: 5px;textTransform: uppercase; ",  
        columns: [   
//            {header: "S.No  ", dataIndex: 'slno',sortable:true,width:30,align:'left'},    
		{header: "itmh_code", dataIndex: 'itmh_code',sortable:true,width:60,align:'left',hidden:true},   
		{header: "", dataIndex: 'itmh_name',sortable:true,width:330,align:'left'},
		{header: "", dataIndex: 'itmh_moisture_per',sortable:true,width:330,align:'left',hidden:true},
        ],
        store:loadSearchItemListDatastore,

    listeners:{	
             'render' : function(cmp) {
                    cmp.getEl().on('keypress', function(e) {
                        if (e.getKey() == e.ENTER) {
                            get_Stock();

                        }
                     });
             },
             'cellDblclick' : function(flxDesc, rowIndex, cellIndex, e){
                            get_Stock();

             }     
     
   }
   });

var cmbissno = new Ext.form.ComboBox({
        fieldLabel      : 'Issue No',
        width           : 100,
        displayField    : 'issh_no', 
        valueField      : 'issh_seqno',
        hiddenName      : '',
        id              : 'cmbissno',
        typeAhead       : true,
        mode            : 'local',
        store           : Issnodatastore,
        forceSelection  : true,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	disabled	: true,
	tabIndex	: 0,
        allowblank      : false,
     labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
       enableKeyEvents: true,
	listeners:{
        select: function(){
		flxdetail.getStore().removeAll();
		
		Issdetaildatastore.removeAll();
            	Issdetaildatastore.load({
                url: 'ClsFuIssue.php',
                params:
                {
                    task:"loadissdetail",
                    finid: GinFinid,
		    compcode: Gincompcode,
		    issno: cmbissno.getRawValue(),
		    AEDFlag : SaveFlag
                },
		scope : this,
		callback:function(){

			var RowCnt = Issdetaildatastore.getCount();
			seqnoed = cmbissno.getValue();
			for (var i=0;i<RowCnt;i++)
			{


                		txtissno.setValue(cmbissno.getRawValue());
				dtpissdate.setValue(Ext.util.Format.date(Issdetaildatastore.getAt(i).get('issh_date'),"Y-m-d"));

	
				flxdetail.getStore().insert(
				flxdetail.getStore().getCount(),
				new dgrecord({
					slno:i + 1,
                            itemname : Issdetaildatastore.getAt(i).get('itmh_name'),
                            itemtype : Issdetaildatastore.getAt(i).get('isst_itemtype'),
			    issqty : Issdetaildatastore.getAt(i).get('isst_qty'),
			    issval : Issdetaildatastore.getAt(i).get('isst_values'),
                            itemseq : Issdetaildatastore.getAt(i).get('isst_itmcode'),
                            varseq  : Issdetaildatastore.getAt(i).get('isst_varty'),
			    stock : (Number(Issdetaildatastore.getAt(i).get('itmt_clqty')) + Number(Issdetaildatastore.getAt(i).get('isst_qty'))),
			    avgrate : Issdetaildatastore.getAt(i).get('isst_rate'),


				}) 
				);


			}//For Loop
grid_tot();
		}
		});
		
	}
	}
   });



  function datecheck()
  {

        var dt_today = new Date();
        var dtgrn = dtpissdate.getValue();
        var diffdays = dt_today.getTime()-dtgrn.getTime();


        diffdays = Math.ceil(diffdays / (1000 * 60 * 60 * 24)); 
//alert(diffdays);
        if (diffdays > 13)
        {     
             alert("You are Not Allowed to Raise the ISSUE in the date of " +  Ext.util.Format.date(dtgrn,"d-m-Y"));
             dtpgrn.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }
        if (diffdays <= 0)
        {     
             alert("System will not allow to raise the ISSUE in Future date");
             dtpissdate.setRawValue(Ext.util.Format.date(dt_today,"d-m-Y"));

        }

        fromdate = "04/01/"+gstfinyear.substring(0,4);
        todate = "03/31/"+gstfinyear.substring(5,9);


    if(Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") < Ext.util.Format.date(fromdate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","ISSUE Date is not in current finance year. Please check");
    }

    else if(Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d") > Ext.util.Format.date(todate,"Y-m-d")){
            Ext.MessageBox.alert("Alert","ISSUE Date is not in current finance year. Please check");
    }

 }

var dtpissdate = new Ext.form.DateField({
    fieldLabel : 'Date',
    id         : 'dtpissdate',
    name       : 'date',
    format     : 'd-m-Y',
    value      : new Date(),
//    anchor     : '100%',
    width : 100,
labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
//	readOnly : true,
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
            }
        }
});


function ItemSearch()
{

        loadSearchItemListDatastore.removeAll();
        loadSearchItemListDatastore.load({
		url: 'ClsFuIssue.php',
		params:
		{
			task:"loadSearchItemlist",
			itemname : txtItemName.getRawValue(),
		},
        });


}

var txtItemType = new Ext.form.TextField({
        fieldLabel  : 'Type',
        id          : 'txtItemType',
        name        : 'txtItemType',
        width       :  100,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   txtissqty.focus();

             }
           } 
         }
});   

var txtItemName = new Ext.form.TextField({
        fieldLabel  : 'Item Name',
        id          : 'txtItemName',
        name        : 'txtItemName',
        width       :  350,
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
    	style      :"border-radius: 5px;textTransform: uppercase; ", 
	enableKeyEvents: true,
	listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   flxItem.hide();
                   txtItemType.focus();

             }
             if (e.getKey() == e.DOWN)
             {
 
             flxItem.getSelectionModel().selectRow(0)
             flxItem.focus;
             flxItem.getView().focusRow(0);
             }
          },
	    keyup: function () {

	        flxItem.getEl().setStyle('z-index','10000');
	        flxItem.show();
	        loadSearchItemListDatastore.removeAll();
  	        ItemSearch();
            }
         }  
    });



function find_Issue_Value()
{
	var issval = Number(txtissqty.getValue())*Number(cmbRate.getValue());
	txtissval.setValue(issval);

	if (Number(actstk) > 0 && Number(txtstock.getValue()) > 0)
	{
		actqty = (Number(actstk) / Number(txtstock.getValue())) * Number(txtissqty.getValue());
	}
	else { actqty = 0; }

}

 var txtissqty = new Ext.form.TextField({
        fieldLabel  : 'Issue Qty',
        id          : 'txtissqty',
        name        : 'txtissqty',
        width       :  100,
        allowBlank  :  false,
    enableKeyEvents: true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   cmbRate.focus();

             }
          },

          keyup   : find_Issue_Value,
          keydown : find_Issue_Value, 
          blur    : find_Issue_Value, 
          change  : find_Issue_Value
    }
    });

var txtissval = new Ext.form.NumberField({
        fieldLabel  : 'Issue Value',
        id          : 'txtissval',
        name        : 'txtissval',
        width       :  100,
        allowBlank  :  false,
	readOnly:true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });


var cmbRate = new Ext.form.ComboBox({
        fieldLabel      : 'Cost Rate',
        style      :"border-radius: 5px; ",
        labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",

        width           : 100,
        displayField    : 'rect_costrate', 
        valueField      : 'rect_costrate',
        hiddenName      : '',
        id              : 'cmbRate',
        typeAhead       : true,
        mode            : 'local',
        store           : loadRatedatastore,
        forceSelection  : false,
        triggerAction   : 'all',
        selectOnFocus   : false,
        editable        : true,
	//tabindex	: 0,
        allowblank      : true,        
        listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   btnSubmit.focus();

             }
          },
          select  : find_Issue_Value,
          keyup   : find_Issue_Value,
          keydown : find_Issue_Value, 
          blur    : find_Issue_Value, 
          change  : find_Issue_Value
        }
   });

/*
var txtcostrate = new Ext.form.TextField({
        fieldLabel  : 'Cost Rate',
        id          : 'txtcostrate',
        name        : 'txtcostrate',
        width       :  100,
        allowBlank  :  false,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	 
	tabindex : 1,
    enableKeyEvents: true,
    listeners:{
          specialkey:function(f,e){
             if (e.getKey() == e.ENTER)
             {
                   btnSubmit.focus();

             }
          },

 keyup: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
 keydown: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
        blur: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
},
 change: function(){
	var issval = Number(txtissqty.getValue())*Number(txtcostrate.getValue());
	txtissval.setValue(issval);
}
}
    });


 var txtremarks = new Ext.form.TextArea({
        fieldLabel  : 'Remarks',
        id          : 'txtremarks',
        name        : 'txtremarks',
        width       :  450,
        style       :  {textTransform: "uppercase"},
        allowBlank  :  false,
	tabindex : 1
    });
*/


var txtstock = new Ext.form.TextField({
        fieldLabel  : 'Stock',
        id          : 'txtstock',
        name        : 'txtstock',
        width       :  130,
        height       :  50,
        allowBlank  :  false,
        readOnly    : true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	style:{'background':'#e8badf','height':'auto','font-size': '24px','font-weight':'bold','font-color':'red'},
	tabindex : 1
    });
 
var txtvalue = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtvalue',
        name        : 'txtvalue',
        width       :  80,
        allowBlank  :  false,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
        readOnly    : true,
	tabindex : 1
    });

var txtqty = new Ext.form.TextField({
        fieldLabel  : 'Total',
        id          : 'txtqty',
        name        : 'txtqty',
        width       :  80,
        allowBlank  :  false, 
        readOnly    : true,
         labelStyle : "font-size:14px;font-weight:bold;color:#0080ff",
	tabindex : 1
    });

var fdbl_totalqty,fdbl_totalvalue;
function grid_tot(){
	fdbl_totalqty=0;
	fdbl_totalvalue=0;
	

	var Row= flxdetail.getStore().getCount();
	flxdetail.getSelectionModel().selectAll();
		var sel=flxdetail.getSelectionModel().getSelections();
		for(var i=0;i<Row;i++)
		{
		    fdbl_totalqty=Number(fdbl_totalqty)+Number(sel[i].data.issqty);
		    fdbl_totalvalue=Number(fdbl_totalvalue)+Number(sel[i].data.issval);
		}

		   
		txtqty.setValue(Ext.util.Format.number(fdbl_totalqty,"0.000"));
		txtvalue.setValue(Ext.util.Format.number(fdbl_totalvalue,"0.00"));
}

var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SUBMIT",
    width   : 80,
    height  : 30,
    x       : 500,
    y       : 170,
 border: 1,
          style: {
              borderColor: 'blue',
              borderStyle: 'solid',

          },
	style:{'background':'#e8badf'},
    listeners:{
        click: function(){              
          //  flxDetail.show();
          //  flx_poDetails.hide();
	    var gstadd="true";
	
	if(chkitemcode ==0 || txtItemName.getRawValue()=="") 
	{
                Ext.MessageBox.alert("Issue", "Select Item");  	
	}            

	else if(txtissqty.getValue() == '' || txtissqty.getValue() == 0)
	{
                Ext.MessageBox.alert("Issue", "Enter IssQty");
                 gstadd="false";
        }
	else if((cmbRate.getValue() == '') || (cmbRate.getValue() == 0))
	    {
                Ext.MessageBox.alert("Issue", "Enter Cost Rate");
                 gstadd="false";
            }
	/*else if(txtnoofbags.getRawValue() == '')
	    {
                Ext.MessageBox.alert("Issue", "Enter No of Bags");
                 gstadd="false";
            }*/
	else if((txtissval.getValue()==0) || (txtissval.getValue()==0))
	{
                Ext.MessageBox.alert("Issue", "Enter Value");
                gstadd="false";
        }  
	else if(Number(txtissqty.getValue()) > Number(txtstock.getValue()))
	{
                Ext.MessageBox.alert("Issue", "Iss Qty should not be greater than Stock");
                gstadd="false";
        }  



	else
            {

                var ginitemseq = chkitemcode;
                flxdetail.getSelectionModel().selectAll();
                var selrows = flxdetail.getSelectionModel().getCount();
                var sel = flxdetail.getSelectionModel().getSelections();

                var cnt = 0;
                for (var i=0;i<selrows;i++)
		{
                    if (sel[i].data.itemseq == chkitemcode && sel[i].data.itemtype == txtItemType.getRawValue())
		    {
                        cnt = cnt + 1;
                    }
                }

		if(gridedit === "true")
		{
			gridedit = "false";
			//var sm = flxDetail.getSelectionModel();
			//var selrow = sm.getSelected();

			var idx = flxdetail.getStore().indexOf(editrow);


			sel[idx].set('itemname', txtItemName.getRawValue());
               		sel[idx].set('itemtype', txtItemType.getRawValue());
			sel[idx].set('issqty', parseFloat(txtissqty.getValue()));
			sel[idx].set('issval', txtissval.getValue());
			sel[idx].set('itemseq', chkitemcode);



			sel[idx].set('stock', parseFloat(txtstock.getValue()));
			sel[idx].set('avgrate', cmbRate.getValue());

			sel[idx].set('tbistk', tbistk);
			sel[idx].set('actstk' ,actstk);
			sel[idx].set('actiss', actqty);

			sel[idx].set('prvqty', txtstock.getValue());
			sel[idx].set('prvval', actstk);



		            grid_tot();
	
		                    txtItemName.setRawValue("");
		                    txtItemType.setRawValue("");
                                    chkitemcode = 0;
		                    txtissqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    cmbRate.setRawValue("");
		
		                    txtissval.setRawValue("");


			flxdetail.getSelectionModel().clearSelections();

			

		}//if(gridedit === "true")
		else
		{
               
			if (cnt > 0)
			{
		            Ext.MessageBox.alert("Grid","Same Item already Entered.");
		        } else
		        {

		            var RowCnt = flxdetail.getStore().getCount() + 1;
		            flxdetail.getStore().insert(
		                flxdetail.getStore().getCount(),
		                new dgrecord({
		                    slno:RowCnt,

		                    itemname : txtItemName.getRawValue(),
		                    itemtype : txtItemType.getRawValue(),
	
	
				    issqty : Ext.util.Format.number(txtissqty.getValue(),"0.000"),
				    issval : txtissval.getValue(),
	
		                    itemseq : chkitemcode,

				    stock :  Ext.util.Format.number(txtstock.getValue(),"0.000"),
				    avgrate : cmbRate.getValue(),
	
				    tbistk : tbistk,
				    actstk : actstk,
				    actiss : actqty,
				    prvqty : txtstock.getValue(),
				    prvval : actstk,

				    
		                }) 
		                );

		                    grid_tot();
		                  //  CalculatePOVal();

		                    txtItemName.setRawValue("");
                                    chkitemcode = 0;
		                    txtissqty.setRawValue("");
		                    txtstock.setRawValue("");
		                    cmbRate.setRawValue("");
		
		                    txtissval.setRawValue("");
                	}//else (cnt > 0)
		}// else //if(gridedit === "true")
		
            }//condition else


        }//click
    }//listener
});

var dgrecord = Ext.data.Record.create([]);
var flxdetail = new Ext.grid.EditorGridPanel({
    frame: false,
    sm: new Ext.grid.RowSelectionModel(),
    stripeRows : true,
    scrollable: true,
    x:0,
    y:110,
    height: 130,
    hidden:false,
    width: 800,
    columns:
    [
        {header: "S No.", dataIndex: 'slno',sortable:true,width:40,align:'left'},
        {header: "Item Description", dataIndex: 'itemname',sortable:true,width:250,align:'left'},//1
        {header: "Item Type", dataIndex: 'itemtype',sortable:true,width:75,align:'left'},//1
        {header: "Issue Qty", dataIndex: 'issqty',sortable:true,width:100,align:'right'},//4
        {header: "Issue Value", dataIndex: 'issval',sortable:true,width:100,align:'right'},//5
        {header: "Stock", dataIndex: 'stock',sortable:true,width:100,align:'right'},//10
        {header: "Avg Rate", dataIndex: 'avgrate',sortable:true,width:100,align:'center'},//11



    ],
	store : [],
    listeners:{	
        'cellclick' : function(flxDesc, rowIndex, cellIndex, e){
         Ext.Msg.show({
		title: 'ISSUES GRN',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNOCANCEL,
		msg: 'Press YES to Modify   -  NO to Delete',
		fn: function(btn){
		if (btn === 'yes'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			if (selrow != null){
				gridedit = "true";
				editrow = selrow;



				txtItemName.setValue(selrow.get('itemname'));
				txtItemType.setValue(selrow.get('itemtype'));

			        chkitemcode = selrow.get('itemseq');



				txtissqty.setValue(selrow.get('issqty'));
				txtissval.setValue(selrow.get('issval'));
				txtstock.setValue(selrow.get('stock'));
				cmbRate.setValue(selrow.get('avgrate'));

           loadItemStockDataStore.removeAll();
            loadItemStockDataStore.load({
                url: 'ClsFuIssue.php',
                params:
                {
                    task:"loadItemStock",
		    compcode : Gincompcode,
		    finid : GinFinid,
		    itemcode : chkitemcode,

                },
		callback:function()
		{

              
                        var clostk = Number(loadItemStockDataStore.getAt(0).get('itmt_clqty'))+Number(selrow.get('issqty'));
                        var cloval = Number(loadItemStockDataStore.getAt(0).get('itmt_clvalue'))+Number(selrow.get('issval'));


	//		cmbRate.setValue(Ext.util.Format.number( Number(cloval)/Number(clostk) ,"0.00000"));
			
 			txtstock.setRawValue(Ext.util.Format.number( clostk,"0.000"));



			

		}
            });
				
				
flxdetail.getSelectionModel().clearSelections();
			}
		}
		else if (btn === 'no'){
			var sm = flxdetail.getSelectionModel();
			var selrow = sm.getSelected();
			flxdetail.getStore().remove(selrow);
			flxdetail.getSelectionModel().selectAll();
grid_tot();
		}
		}

     	});         
    	}
}
});


   var TrnIssueFormpanel = new Ext.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'ISSUE',
        header      : false,
        width       : 827,	
	bodyStyle   :{"background-color":"#F1F5EA"},
        height      : 650,
        x           : 0,
        y           : 0,
        frame       : false,
        id          : 'TrnIssueFormpanel',
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
            fontSize:18,
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
			SaveFlag = "Add";
			TrnIssueFormpanel.getForm().reset();
			flxdetail.getStore().removeAll();
			txtissno.focus();
			Ext.getCmp('txtissno').setDisabled(true);
			Ext.getCmp('txtissno').show();
			Ext.getCmp('cmbissno').setDisabled(true);
			Ext.getCmp('cmbissno').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsFuIssue.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});
			
			Issnodatastore.load({
			url: 'ClsFuIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode:GinFinid,
				AEDFlag : SaveFlag
			},
			callback:function()
			{
			txtissno.setValue(Issnodatastore.getAt(0).get('issno'));
			}
			});


			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsFuIssue.php',
			params:
			{
			    task:"loadbatch",
			    finid:GinFinid,
			    compcode:Gincompcode,
			    qrytype: "frmload"
			}
			});
RefreshData();
			
                }
            }
        },'-',
        {
            text: 'Edit',
            style  : 'text-align:center;',
            tooltip: 'Modify Details...',
            height: 40,
            fontSize:20,
            width:50,
//disabled : true,
            icon: '/Pictures/edit.png',
            listeners:{
                click: function () {
//edit

			SaveFlag = "Edit";
			flxdetail.getStore().removeAll();
			Ext.getCmp('txtissno').hide();
			Ext.getCmp('cmbissno').setDisabled(false);
			Ext.getCmp('cmbissno').show();

			Issnodatastore.load({
			url: 'ClsFuIssue.php',
			params: {
			    task: 'loadissno',
				compcode:Gincompcode,
				fincode :GinFinid,
				AEDFlag : SaveFlag
			}
			});



                }
            }
        },'-',                
		{
//save
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/save.png',
                     //fp.getForm().reset();
                    listeners:{
                        click: function () {
                        flxdetail.getSelectionModel().selectAll();
    				 if (flxdetail.getSelectionModel().getCount()==0)
                    		{
                        		Ext.Msg.alert('Issue','Grid Should not be empty..');
                    		} 
				else
				{
					Ext.MessageBox.show({
		                        title: 'Confirmation',
		                        icon: Ext.Msg.QUESTION,
                			buttons: Ext.MessageBox.YESNO,
                            		msg: 'Do You want to save Issue ',
                            		fn: function(btn)
					{
					if (btn == 'yes')
						{

						var fabricretdetails = flxdetail.getStore().getRange();
                    				var fabricupdetails = new Array();
                    				Ext.each(fabricretdetails, function (record){
                    				fabricupdetails.push(record.data);
                    				});
						
						Ext.Ajax.request({
		                            	url: 'TrnFuIssueSave.php',
                		       	        params:
						{
					                griddet:Ext.util.JSON.encode(fabricupdetails),	
							cnt:fabricretdetails.length,					
  							isscompcode : Gincompcode,
							issfincode : GinFinid,
							issdate : Ext.util.Format.date(dtpissdate.getValue(),"Y-m-d"),
							issval : txtvalue.getValue(),
							usrcode : UserId,
							AEDFlag : SaveFlag,
							isspno  : txtissno.getRawValue(),
							seqnoed : seqnoed
						},
						callback: function (options, success, response)
                                        	{
                                            	var obj = Ext.decode(response.responseText);
					  	
                                            	if (obj['success'] === "true") 
						{
                                                Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Issue No : ' + obj['IssNo'] + '  Saved',
                                                    fn: function (btn) {
						    if (btn === 'ok') 
							{
                                                  //  Ext.MessageBox.alert("Alert"," Saved ");
//						        TrnIssueFormpanel.getForm().reset();
							flxdetail.getStore().removeAll();
							RefreshData();

							}
							}
                                                	});
                                                }
                                             	else 
						{
                                                Ext.MessageBox.show({
                                                    title: 'Alert',
                                                    icon: Ext.Msg.QUESTION,
                                                    buttons: Ext.MessageBox.OK,
                                                    msg: 'Record Not Saved ...',
                                                    fn: function (btn) 
							{
                                                        if (btn === 'ok') 
							{
                                             		Ext.MessageBox.alert("Alert","Not Saved or Already exists.. ");
                                                        }
                                                    	}
                                                	});
                                            	}
                                      
					 	}   
			        		});
			    	
		         		}
                                }
 		    	});
				}
			//}
			//else {
			//	alert('Issue Date Should be current date');
			//}

                        }
                    }
                },'-',                
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
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '/Pictures/exit.png',
			listeners:{
			click: function(){
				TrnIssueWindow.hide();
			}
			}
                }]
        },
        items: [
            { xtype   : 'fieldset',
                title   : 'ISSUE',
                layout  : 'hbox',
                border  : true,
                height  : 480,
                width   : 930,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 10,
                items:[
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtissno]
                            },


			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmbissno]
                            },
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 80,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [dtpissdate]
                            },


		{ xtype   : 'fieldset',
                title   : 'Item Details',
                layout  : 'hbox',
                border  : true,
                height  : 280,
                width   : 890,
		style:{ border:'1px solid red',color:' #581845 '},
                layout  : 'absolute',
                x       : 10,
                y       : 80,
                items:[
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 0,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtItemName]
                            },
                          { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 500,
                                	x           : 500,
                                	y           : 0,
                                    	border      : false,
                                	items: [txtItemType]
                            },
 flxItem,
/*
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 230,
                                	x           : 370,
                                	y           : 0,
                                    	border      : false,
                                	items: [cmblotno]
                            },
*/
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtissqty]
                            },


                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 0,
                                	y           : 60,
                                    	border      : false,
                                	items: [cmbRate]
                            },
/*
                             { 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 400,
                                	x           : 230,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtcostrate]
                            },

*/
			{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 90,
                                	width       : 220,
                                	x           : 230	,
                                	y           : 60,
                                    	border      : false,
                                	items: [txtissval]
                            },


{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 650,
                                	y           : 30,
                                    	border      : false,
                                	items: [txtstock]
                            },flxdetail]},
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 50,
                                	width       : 320,
                                	x           : 550,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtqty]
                            },
{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 0,
                                	width       : 320,
                                	x           : 610,
                                	y           : 360,
                                    	border      : false,
                                	items: [txtvalue]
                            },
/*
				{ 
                                	xtype       : 'fieldset',
                                	title       : '',
                                	labelWidth  : 60,
                                	width       : 550,
                                	x           : 0,
                                	y           : 370,
                                    	border      : false,
                                	items: [txtremarks]
	                            },
*/
                             btnSubmit
                ]

            }
            
        ]
    });
   


   function RefreshData(){
        SaveFlag ="Add";  
        flxItem.hide();             
//	TrnIssueFormpanel.getForm().reset();
	flxdetail.getStore().removeAll();
	
	Issnodatastore.load({
	url: 'ClsFuIssue.php',
	params: {
	    task: 'loadissno',
		compcode:Gincompcode,
		fincode:GinFinid,
		AEDFlag : SaveFlag
	},
	callback:function()
	{

	txtissno.setValue(Issnodatastore.getAt(0).get('issno'));
	}
	});


	txtissno.focus();
	Ext.getCmp('txtissno').setDisabled(true);
	Ext.getCmp('txtissno').show();
	Ext.getCmp('cmbissno').setDisabled(true);
	Ext.getCmp('cmbissno').hide();

};
 
   
    var TrnIssueWindow = new Ext.Window({
	height      : 570,
        width       : 960,
        y           : 35,
        title       : 'ISSUE',
        items       : TrnIssueFormpanel,
        layout      : 'fit',
        closable    : true,bodyStyle:{"background-color":"#E9EEDD"},
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
	listeners:{
               show:function(){
      
		if (SaveFlag === "Add")
		{	
			txtissno.focus();
			Ext.getCmp('txtissno').setDisabled(true);
			
			Ext.getCmp('txtissno').show();
			Ext.getCmp('cmbissno').hide();
			ItemDataStore.removeAll();
			ItemDataStore.load({
	       		 	url: 'ClsFuIssue.php',
				params: {
		    		task: 'LoadItem',
				compcode:Gincompcode,
				fincode:GinFinid			
				}
	    		});


                        RefreshData();
/*
			loadbatchdatastore.removeAll();
			loadbatchdatastore.load({
			url: 'ClsFuIssue.php',
			params:
			{
			    task:"loadbatch",
			    finid:GinFinid,
			    compcode:Gincompcode,
			    qrytype: "frmload"
			}
			});
*/
       
		}

	   	
	   	}

		}
    });
    TrnIssueWindow.show();  
});
