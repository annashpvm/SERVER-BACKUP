Ext.onReady(function() {
Ext.QuickTips.init();
    var gincompcode = localStorage.getItem('gincompcode');
    var ginfinid= localStorage.getItem('ginfinid');
    //var gincurfinid= localStorage.getItem('acccurfinid');

    var outtype = "P";

    var loadtrailseqno = new Ext.data.Store({
      id: 'loadtrailseqno',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadtrailseqno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['acctrail_accref_seqno']),
     });




    var findSeqnoDataStore = new Ext.data.Store({
      id: 'findSeqnoDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loadtrailseqnodetail"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['acctrail_inv_no', 'acctrail_inv_value', 'acctrail_adj_value']),
  
 });
 

      var LedCodeLedgerDataStore = new Ext.data.Store({
      id: 'LedCodeLedgerDataStore',
   autoLoad : true,
      proxy: new Ext.data.HttpProxy({
                url: '/SHVPM/Financials/clsFinancials2A.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task: "loaddrcrledgers"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['led_code','led_name'])
    });


var cmbseqno = new Ext.form.ComboBox({
        id         : 'cmbseqno',
        name	   : 'cmbseqno',
        fieldLabel : 'Seq.No.',
        store:loadtrailseqno,
        width      : 150,
        displayField:'acctrail_accref_seqno',
        valueField:'acctrail_accref_seqno',
        hiddenName:'grp_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){
                   findSeqnoDataStore.removeAll();
			findSeqnoDataStore.load({
                        url: '/SHVPM/Financials/clsFinancials2A.php',
                        params:
                            {
                                task:"loadtrailseqnodetail",
                                ledcode:cmbLedgerName.getValue(),  
                                seqno  :cmbseqno.getValue()                      
                            },
                            callback:function()
   		            {
			    txtbillno.setValue(findSeqnoDataStore.getAt(0).get('acctrail_inv_no'));
			    txtbillamt.setValue(findSeqnoDataStore.getAt(0).get('acctrail_inv_value'));
			    txtadjamt.setValue(findSeqnoDataStore.getAt(0).get('acctrail_adj_value'));

         		    }
                        });  


          }
       }
    });


var btnSubmit = new Ext.Button({
    style   : 'text-align:center;',
    text    : "SET",
    width   : 100,
    height  : 25,
    x       : 300,
    y       : 180,
    bodyStyle:{"background-color":"#ebebdf"},
    listeners:{
        click: function(){       
              txtadjamt.setValue(txtbillamt.getValue());

         }
    }
});


var txtbillno = new Ext.form.TextField({
        fieldLabel  : 'Bill No.',
        id          : 'txtbillno',
        name        : 'txtbillno',
        readOnly    : true,
        width       :  150,
        tabindex : 2
});


var txtbillamt = new Ext.form.NumberField({
        fieldLabel  : 'Bill Amt.',
        id          : 'txtbillamt',
        name        : 'txtbillamt',
        width       :  150,
        tabindex : 2
});

var txtadjamt = new Ext.form.NumberField({
        fieldLabel  : 'Adjusted Amt.',
        id          : 'txtadjamt',
        name        : 'txtadjamt',
        width       :  150,
        tabindex : 2
});



var opttype = new Ext.form.FieldSet({
    xtype: 'fieldset',
    title: '',
    fieldLabel: '',
    layout : 'hbox',
    width:200,
    height:45,
    x:0,
    y:0,
    border: true,
    items: [
    {
        xtype: 'radiogroup',
        columns: 2,
        rows : 1,
        id: 'opttype',
        items: [
            {boxLabel: 'Pending', name: 'opttype', id:'optpending', inputValue: 1,checked:true,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                   outtype = "P";
               }
              }
             }
            },
            {boxLabel: 'All', name: 'opttype', id:'optall', inputValue: 2,
            listeners:{
            check:function(rb,checked){
            if(checked==true){
                  outtype = "A";
               }
              }
             }}
        ]
    }
    ]
});


var cmbLedgerName = new Ext.form.ComboBox({
        id         : 'cmbLedgerName',
        name	   : 'cmbLedgerName',
        fieldLabel : 'Ledger Name ',
        store:LedCodeLedgerDataStore,
        width      : 350,
        displayField:'led_name',
        valueField:'led_code',
        hiddenName:'led_name',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus:true,
        editable: true,
        listeners:{
            select :function(){

//alert(outtype);
        txtbillno.setValue('');
       	txtbillamt.setValue('');
        txtadjamt.setValue('');

                   loadtrailseqno.removeAll();
			loadtrailseqno.load({
                        url: '/SHVPM/Financials/clsFinancials2A.php',
                        params:
                            {
                                task:"loadtrailseqno",
                                ledcode:cmbLedgerName.getValue(),
                                outtype:outtype,                     
                            },
                            callback:function()
   		            {
//alert(loadtrailseqno.getCount());
//			    cmbseqno.setValue(loadtrailseqno.getAt(0).get('acctrail_accref_seqno'));
				    
			    }
                        });  

          }
       }
    });

   
var MasLedgerFormPanel = new Ext.form.FormPanel({
        renderTo    : Ext.getBody(),
        xtype       : 'form',
        title       : 'AP / AR BILLS MODIFICATIONS',
        width       : 700,
        height      : 500,
       bodyStyle:{"background-color":"#d7d5fa"},
        frame       : false,
        id          : 'MasLedgerFormPanel',
        method      : 'post',
        layout      : 'absolute',
        reader      : new Ext.data.JsonReader({
                    root:'results',
                    totalProperty: 'total',
                    id:'id'
                    },[]),
        tbar: {
            xtype: 'toolbar',
            height: 40,
            fontSize:25,
            items: [
                {
                    text: 'Edit',
                    fontSize :20,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...', height: 40,
                    icon: '/Pictures/edit.png'
                },'-',
               {
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40,
                    icon: '/Pictures/save.png',
                    listeners:{
                    click:function(){
                           if (cmbLedgerName.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Ledger Code should not be empty...!");
                             }
                           else if (cmbseqno.getRawValue()==""){
                                Ext.MessageBox.alert("ACCOUNTS", "Group name should not be empty...!");
                             }
                            else {

                           MasLedgerFormPanel.getForm().submit({
                                   url: '/SHVPM/Financials/General/MasLedger/FrmAPARcorrectionSave.php',
                                     params:
                                      {

                                          ledger_code   : cmbLedgerName.getValue(),
                                          ledger_seqno  : cmbseqno.getValue(),
                                          ledger_amount : txtbillamt.getValue(),
                                          ledger_adjust : txtadjamt.getValue(),
                                        },
                                  success:function()
                                       {
                                           Ext.MessageBox.alert("ACCOUNTS","Ledger Group Modified Successfully...");
                                           RefreshData();
                                       },
                                    failure:function()
                                       {
                                        Ext.MessageBox.alert("ACCOUNTS","Not Saved");
                                      }
                              });
                             }
                          }
                        }
                },'-',
                {
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40,
                    icon: '/Pictures/refresh.png',
                    listeners:{
                        click: function(){
                            RefreshData();
                        }
                    }
                },'-',
                {
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40,
                    icon: '/Pictures/exit.png',
                    listeners:{
                        click: function(){
                            MasLedgerWindow.hide();
                        }
                    }
                }
                ]

            },
         items:[
		{
                 xtype: 'fieldset',
                title: 'AR / AP Correction',
                layout : 'absolute',
                border:true,
                height:340,
                width:730,
                x: 10,
                y: 0,
                     items:[
opttype,
                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 50,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbLedgerName]
                       },


                       {
                        xtype       : 'fieldset',
                        title       : '',
                        width       : 600,
                        x           : 0,
                        y           : 80,
                        border      : false,
                        labelWidth  : 100,
                        items: [cmbseqno]
                       },
		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 100, 
		         x           : 0,
		         y           : 110,
		         border      : false,
		         items:[txtbillno],
		     },

		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 100, 
		         x           : 0,
		         y           : 150,
		         border      : false,
		         items:[txtbillamt],
		     },

		       {  xtype       : 'fieldset',
		         title       : '',
		         width       : 300,
                         labelWidth  : 100, 
		         x           : 0,
		         y           : 180,
		         border      : false,
		         items:[txtadjamt],
		     },


			 btnSubmit

               ]
             }
            ]
         });

    function RefreshData(){
        txtbillno.setValue('');
       	txtbillamt.setValue('');
        txtadjamt.setValue('');
    }

     var MasLedgerWindow = new Ext.Window({
        height      : 440,
        width       : 760,
        items       : MasLedgerFormPanel,
        closable    : true,
        minimizable : true,
        maximizable : true,
        resizable   : false,
        border      : false,
        draggable   : false,
        layout      : "fit",
        bodyStyle:{"background-color":"#d7d5fa"},
        y      : 120,
        listeners:{
            show:function(){
  
                LedCodeLedgerDataStore.load({
                    url:'/SHVPM/Financials/clsFinancials2A.php',
                    params:{
                        task:'loaddrcrledgers'
                    },
                    callback:function(){

                    }
                });
            }
        }
    });
       MasLedgerWindow.show();
});
