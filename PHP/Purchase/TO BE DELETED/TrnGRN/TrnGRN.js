Ext.onReady(function(){
Ext.QuickTips.init();
       var GinFinid =localStorage.getItem('tfinid');
   var Gincompcode = localStorage.getItem('tcompcode');

  var loadgrnnodatastore = new Ext.data.Store({
      id: 'loadgrnnodatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadgrnno"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['grnno'
      ]),
    });


  var loadponoDatastore = new Ext.data.Store({
      id: 'loadponoDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadpono"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['ind_no'
      ]),
    });

  var loadvendorDatastore = new Ext.data.Store({
      id: 'loadvendorDatastore',
      proxy: new Ext.data.HttpProxy({
                url: 'ClsGrn.php',      // File to connect to
                method: 'POST'
            }),
            baseParams:{task:"loadsupplier"}, // this parameter asks for listing
      reader: new Ext.data.JsonReader({
                  // we tell the datastore where to get his data from
        root: 'results',
        totalProperty: 'total',
        id: 'id'
      },['sup_refname','sup_code'
      ]),
    });



var txtinvqty = new Ext.form.NumberField({
        fieldLabel  : 'Invoice Qty',
        id          : 'txtinvqt',
        width       : 75,
        name        : 'txtinvqt'
   }); 
  var txtrecqty = new Ext.form.NumberField({
        fieldLabel  : 'Rcvd Qty',
        id          : 'txtqty',
        width       : 75,
        name        : 'txtqt'
   });  
  var txtgrnno = new Ext.form.NumberField({
        fieldLabel  : 'Grn No',
        id          : 'txtgrnno',
        width       : 73,
	labelwidth :60,
        name        : 'txtgrnno'
   });  
   
   var txtunitrate = new Ext.form.NumberField({
        fieldLabel  : 'Unit Rate',
        id          : 'txtunit',
        width       : 75,
        name        : 'txtunit'
   }); 
     var txtdis = new Ext.form.NumberField({
        fieldLabel  : 'Dis (%)',
        id          : 'txtdis',
        width       : 75,
        name        : 'txtdis'
   }); 
   
      var txtpf = new Ext.form.NumberField({
        fieldLabel  : 'PF (%)',
        id          : 'txtpf',
        width       : 75,
        name        : 'txtpf'
   }); 
     var txtcgst = new Ext.form.NumberField({
        fieldLabel  : 'CGST (%)',
        id          : 'txtcgst',
        width       : 75,
        name        : 'txtcgst'
   }); 
   
        var txtsgst = new Ext.form.NumberField({
        fieldLabel  : 'SGST (%)',
        id          : 'txtsgst',
        width       : 75,
        name        : 'txtsgst'
   }); 
        var txtigst = new Ext.form.NumberField({
        fieldLabel  : 'IGST (%)',
        id          : 'txtigst',
        width       : 75,
        name        : 'txtigst'
   }); 
   
        var txtoth = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtoth',
        width       : 75,
        name        : 'txtoth'
   }); 


  var txtdisval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtdisv',
        width       : 75,
        name        : 'txtdisv'
   }); 
   
      var txtpfval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtpfv',
        width       : 75,
        name        : 'txtpfv'
   }); 
     var txtcgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtcgstv',
        width       : 75,
        name        : 'txtcgstv'
   }); 
   
        var txtsgstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtsgstv',
        width       : 75,
        name        : 'txtsgstv'
   }); 
        var txtigstval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtigstv',
        width       : 75,
        name        : 'txtigstv'
   }); 
   
   var txtothval = new Ext.form.NumberField({
        fieldLabel  : '',
        id          : 'txtothv',
        width       : 75,
        name        : 'txtothv'
   });
   
   var txtordqty = new Ext.form.NumberField({
        fieldLabel  : 'Order Qty',
        id          : 'txtordqty',
        width       : 75,
        name        : 'txtordqty'
   });
   
   var txttolerance = new Ext.form.NumberField({
        fieldLabel  : 'Tolerance',
        id          : 'txtoler',
        width       : 75,
        name        : 'txtoler'
   });
   
    var txtfornp = new Ext.form.NumberField({
        fieldLabel  : 'For NP',
        id          : 'txtnp',
        width       : 75,
        name        : 'txtnp'
   });
   
   var txtforoth = new Ext.form.NumberField({
        fieldLabel  : 'For Others',
        id          : 'txtothers',
        width       : 75,
        name        : 'txtothers'
   });
   
    var txtfreight = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreight',
        width       : 75,
        name        : 'txtfreight'
   });
   
    var txtinward = new Ext.form.NumberField({
        fieldLabel  : 'Inward',
        id          : 'txtinw',
        width       : 75,
        name        : 'txtinw'
   });
   
   var txtqc = new Ext.form.NumberField({
        fieldLabel  : 'QC Dev (+/-)',
        id          : 'txtqc',
        width       : 75,
        name        : 'txtqc'
   });
   
     var txtfright1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfre1',
        width       : 75,
        name        : 'txtfre1'
   });
   
      var txtfrightparty = new Ext.form.TextField({
        fieldLabel  : 'Freight Party',
        id          : 'txtfrep1',
        width       : 175,
        name        : 'txtfrep1'
   });
   
   var txtcarrier = new Ext.form.TextField({
        fieldLabel  : 'Carrier',
        id          : 'txtcar1',
        width       : 250,
        name        : 'txtcar1'
   });
   
   var txtRemark = new Ext.form.TextArea({
        fieldLabel  : 'Remark',
        id          : 'txtremar1',
        width       : 250,
        name        : 'txtremar1'
   });
   
   
   var txtlrnumber  = new Ext.form.TextField({
        fieldLabel  : 'LR Number',
        id          : 'txtlrnumber',
        width       : 80,
        name        : 'txtlrnumber'
   });
   
     var txtgrossval = new Ext.form.NumberField({
        fieldLabel  : 'Gross Value',
        id          : 'txtgrsval',
        width       : 75,
        name        : 'txtgrsval'
   }); 
   
      var txtdiscnt1 = new Ext.form.NumberField({
        fieldLabel  : 'Discount',
        id          : 'txtdiscnt1',
        width       : 75,
        name        : 'txtdiscnt1'
   }); 
     var txtpf1 = new Ext.form.NumberField({
        fieldLabel  : 'PF',
        id          : 'txtpf1',
        width       : 75,
        name        : 'txtpf1'
   }); 
   
        var txtfreight1 = new Ext.form.NumberField({
        fieldLabel  : 'Freight',
        id          : 'txtfreigth1',
        width       : 75,
        name        : 'txtfreigth1'
   }); 
        var txtothval1 = new Ext.form.NumberField({
        fieldLabel  : 'Others',
        id          : 'txtothval1',
        width       : 75,
        name        : 'txtothval1'
   }); 
   
   
     var txtcgst1 = new Ext.form.NumberField({
        fieldLabel  : 'CGST',
        id          : 'txtcgst1',
        width       : 75,
        name        : 'txtcgst1'
   }); 
   
      var txtsgst1 = new Ext.form.NumberField({
        fieldLabel  : 'SGST',
        id          : 'txtsgst1',
        width       : 75,
        name        : 'txtsgst1'
   }); 
     var txtigst1 = new Ext.form.NumberField({
        fieldLabel  : 'IGST',
        id          : 'txtigst1',
        width       : 75,
        name        : 'txtigst1'
   }); 
   
        var txtqcdev1 = new Ext.form.NumberField({
        fieldLabel  : 'Qc Dev',
        id          : 'txtqcdev1',
        width       : 75,
        name        : 'txtqcdev1'
   }); 
        var txtinward1 = new Ext.form.NumberField({
        fieldLabel  : 'Inward Charges',
        id          : 'txtinw1',
        width       : 75,
        name        : 'txtinw1'
   }); 
   
     var txttaxfri2 = new Ext.form.NumberField({
        fieldLabel  : 'Tax Freight 1',
        id          : 'txtaxfre2',
        width       : 75,
        name        : 'txtaxfre2'
   }); 
     var txtaxgst1 = new Ext.form.NumberField({
        fieldLabel  : 'GST for Tax Freight1',
        id          : 'txtgstfre1',
        width       : 75,
        name        : 'txtgstfre1'
   }); 
   
        var txttaxfri3 = new Ext.form.NumberField({
        fieldLabel  : 'Tax Freight 2',
        id          : 'txtaxfre3',
        width       : 75,
        name        : 'txtaxfre3'
   }); 
        var txtaxgst2 = new Ext.form.NumberField({
        fieldLabel  : 'GST for Tax Freight 2',
        id          : 'txtgstfre2',
        width       : 75,
        name        : 'txtgstfre2'
   }); 
   
  
   
   var txtroundoff = new Ext.form.NumberField({
        fieldLabel  : 'Roundoff',
        id          : 'txtrnd1',
        width       : 75,
        name        : 'txtrnd1'
   }); 
        var txtlandvalue = new Ext.form.NumberField({
        fieldLabel  : 'GRN / Landing Value',
        id          : 'txtlanval',
        width       : 75,
        name        : 'txtlanval'
   }); 
   
      var txtinvalue = new Ext.form.NumberField({
        fieldLabel  : 'Invoice Value',
        id          : 'txtinvalue',
        width       : 75,
        name        : 'txtinvalue'
   }); 
   
        var addbtn = new Ext.Button({
                text: '',
                width: 30,
                tooltip:'Click To Update',
                icon:'../GRN/icons/download.gif',
             
        })
 
 
var store = new Ext.data.Store({
     
    });

     var rcm_combo = new Ext.form.ComboBox({
        id: 'rcmCombo',
        store: store,
         
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'RCM (Y /N)',
        editable:false,
        
        width: 60
        
    });
    
       var gate_combo = new Ext.form.ComboBox({
        id: 'gentryCombo',
        store: store,
         
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus: false,
        fieldLabel:'Gate Entry No',
        editable:false,
        
        width: 80
        
    });

var store3 = new Ext.data.Store({
      
    });
    
    

var name_combo = new Ext.form.ComboBox({
        id: 'dept',
        store: loadvendorDatastore,
        displayField: 'sup_refname',
        valueField: 'sup_code',
        hiddenName : 'sup_refname',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Name ',
        editable:false,
        width: 250
  });
  
  var credit_combo = new Ext.form.ComboBox({
        id: 'credit',
        store: store3,
   
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Credit Days ',
        editable:false,
        width: 70
  });

var criteria;
 var doc_combo = new Ext.form.ComboBox({
        id: 'othCombo',
        store: store3,
    
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Transport clearance doc. No',
        editable:false,
        width: 80
     
      });
      
      
      /* ====================== Radio Button =========================*/

var regular = new Ext.form.Radio({id : 'r1' ,boxLabel: 'Regular', name: 'rbtag', inputValue: 'b',x:0, y:0,checked:true
})
var cash = new Ext.form.Radio({id : 'r2' ,boxLabel: 'Cash', name: 'rbtag', inputValue: 'c',x:80,y:0,
listeners:{
		change: function () 
		{
			criteria = 'C';
			alert(criteria);
			loadponoDatastore.load(
                        {
                         url:'TrnFrmEnquiryCls.php',
                        params:
                         {
                            task:"loadpono",
			    finid : 27,
			    compcode : 1,
			    supcode : name_combo.getValue(),
			    flag : criteria
			    
                        }
                    	});
		}
	  }
})

var indent = new Ext.form.Radio({id : 'n1' ,boxLabel: 'Indnet', name: 'rbtag', inputValue: 'b',x:0, y:30
})

var po = new Ext.form.Radio({id : 'z2' ,boxLabel: 'P O', name: 'rbtag', inputValue: 'c',x:80,y:30,
listeners:{
		change: function () 
		{
			criteria = 'P';
			alert(criteria);
			loadponoDatastore.load(
                        {
                         url:'TrnFrmEnquiryCls.php',
                        params:
                         {
                            task:"loadpono",
			    finid : 27,
			    compcode : 1,
			    supcode : name_combo.getValue(),
			    flag : criteria
			    
                        }
                    	});
		}
	  }

})

var roundyes1 = new Ext.form.Radio({id : 'r11' ,boxLabel: 'Yes', name: 'rbtag', inputValue: 'b',x:680,y:370
})

var roundno1 = new Ext.form.Radio({id : 'r12' ,boxLabel: 'NO', name: 'rbtag', inputValue: 'c',x:580,y:370

})

var withchk = new Ext.form.Checkbox({id : 'r1chk' ,boxLabel: 'Checked', name: 'rbtagchk', inputValue: 'c'

})


      var po_combo = new Ext.form.ComboBox({
        id: 'poCombo',
        store: loadponoDatastore,
        displayField: 'ind_no',
        valueField: 'ind_no',
        hiddenName : 'ind_no',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'PO No',
        editable:false,
        labelWidth:30,
        width: 100
       
      });

      
       var item_combo = new Ext.form.ComboBox({
        id: 'itemCombo',
        store: store3,
        displayField: 'mih_inwno',
        valueField: 'mih_seqno',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Item',
        editable:false,
        labelWidth:30,
        width: 200
       
      });
      
      var machine_combo = new Ext.form.ComboBox({
        id: 'machCombo',
        store: store3,
        displayField: 'mih_inwno',
        valueField: 'mih_seqno',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Machine',
        editable:false,
        labelWidth:30,
        width: 150
       
      });
      
      
        var type_combo = new Ext.form.ComboBox({
        id: 'typeCombo',
        store: store3,
        displayField: 'mih_inwno',
        valueField: 'mih_seqno',
        hiddenName : 'mih_inwno',
        typeAhead: true,
        mode: 'local',
        forceSeltypeAhead: true,
        triggerAction: 'all',
        selectOnFocus:false,
        fieldLabel:'Type',
        editable:false,
        labelWidth:30,
        width: 75
       
      });




var store6 = new Ext.data.Store({
       
    });

var partyname = new Ext.form.ComboBox({
        id: 'taxvalueCombo',
        store: store6,
        displayField: 'taxty_val',
        valueField: 'taxty_val',
        hiddenName : 'tax_value',
        typeAhead: true,
        mode: 'remote',
        forceSeltypeAhead: true,
        
        triggerAction: 'all',
        selectOnFocus:false,
//      allowBlank: false,
        editable:false,
        emptyText:'Select Name',
        blankText:'Select Name',
        fieldLabel:'Party Name',
        width: 250
           
      });

  var date1 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
        
    });
    
    
  var date2 = new Ext.form.DateField
    ({
       fieldLabel : ' Date',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
       
    });
    
    
  var date3 = new Ext.form.DateField
    ({
       fieldLabel : '',
       name        : 'fdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,x:190,y:100,
       value: new Date().format('d-m-Y')
      
    });
    
  var date4 = new Ext.form.DateField
    ({
       fieldLabel : 'Expiry Date',
       name        : 'fdateex',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
       editable    : false
    });
    
    
    var gentrydate = new Ext.form.DateField
    ({
       fieldLabel : 'G-Entry Date',
       name        : 'fdatee',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       editable    : false,
       value: new Date().format('d-m-Y')
      
    });
    
  var LRdate = new Ext.form.DateField
    ({
       fieldLabel : 'LR Date',
       name        : 'lrdate',
       format      : 'd-m-Y',
       style       : 'text-align:left;',
       width       : 90,
       value: new Date().format('d-m-Y'),
       editable    : false
    });
    
    
    
    
    // End Of Combo Values

    var fieldset1 = {
        xtype        : 'fieldset',
        title        : '',
        width        :300,
        flex         : 1,
        border       : false,
        labelWidth : 60,
        defaultType : 'field',
        defaults     : {
           

        },
        items : [
        {
            xtype : 'textfield',
            fieldLabel : 'No',
            name       : 'wrw',
            readOnly   : false,
            width : 75
        },date1
     
        ]
    }

 
 

var fieldset3 = {
        xtype        : 'fieldset',
        title        : '',
        flex         : 1,
        border       : false,
        labelWidth : 90,
        defaultType : 'field',
        defaults     : {
 
        },
        items : [
      partyname,
        {
            xtype : 'textfield',
            fieldLabel : 'Quote Ref',
            name       : 'indent',
            readOnly   : true,
            width : 200
        },date2
         
    
        ]
    }




    var gridstore2 = new Ext.data.JsonStore({
       
    });

    

var sm = new Ext.grid.RowSelectionModel({
   listeners : {
       rowselect : {
           fn : function(sm, index, record){
               
           }
       }
   }
})
/*-------------------- Second grid panel ---------------------- */
      var grid2 = new Ext.grid.EditorGridPanel({
        ddGroup          : 'firstGridDDGroup',
        store            : gridstore2,
        frame            : false,
        title            : '',
        autoShow         : true,
        loadMask         : true,
        enableDragDrop   : true,
        stripeRows       : true,
        autoHeight       : false,
        sm               : sm,

        tbar:{ xtype: 'toolbar',
                width: 500,
                height: 25,
                item:[

        ]},
        columns: [
        {
            id:'sno',
            header: "PO No",
            width: 40,
            align: 'center',
            sortable: true,
            hidden: false
            
        },
        {
            id:'itemname',
            header: "Item Name",
            width: 285,
            align: 'center',
            sortable: true
            
        },
        {
            id:'uon',
            header: "UOM",
            width: 100,
            align: 'center',
            sortable: true
            
        },
        {
            id:'balqty',
            header: " Balance",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'invqty',
            header: "Invo. Qty",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'redqty',
            header: "Recd. Qty",
            width: 100,
            align: 'center',
            sortable: true
            
        },
        {
            id:'unitrate',
            header: "Unit rate",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'othpl',
            header: "Others(+)",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'dev',
            header: "Qc dev(-)",
            width: 60,
            align: 'center',
            sortable: true
            
        },
        {
            id:'dis',
            header: "Dis (%)",
            width: 60,
            align: 'center',
            sortable: true
            
        }
       
        ],
        stripeRows: true,
        height:200,
        width:900
     });



 

var myFormPanel = new Ext.form.FormPanel({
        width        :  920, 
        title        : 'Goods Receipt Note',
        style        : 'margin: 5px ',
        height       : 650,
        frame        : false,
        bodyStyle    : 'background: url(../GRN/icons/img1.jpg)',
        renderTo     : document.body,
        id           : 'myFormPanel',
        layout       : 'absolute',
 
          reader: new Ext.data.JsonReader({
                    root:'rows',
                    totalProperty: 'results',
                    id:'id'
                  
                    },[
                     {},
                       
                  ]),
        items        : [
        
            {
            xtype: 'tabpanel',
            activeTab: 0,
            height: 520,
            width: 900,
            x: 0,
            y: 20,
            items: [
            {
                xtype: 'panel',
                title: 'GRN - Item Details',
                width: 200,
                height: 300,
                layout: 'absolute',
                items: [
                    {
                    xtype: 'fieldset',
                    title: 'GRN Details',
                    border: true,
                    height: 85,
                    width: 150,
                    labelWidth:50,
                    x: 0,  
                    y: 5,
                    items: [
                          txtgrnno,date1
                    ]
                    },
                     {
                    xtype: 'fieldset',
                    title: 'Criteria',
                    border: true,
                    height: 85,
                    width: 150,
                    labelWidth:0,
                    layout: 'absolute',
                    x: 150,  
                    y: 5,
                    items: [
                       regular,cash,indent,po   
                    ]
                    },
                     {
                    xtype: 'fieldset',
                    title: 'Supplier',
                    border: true,
                    height: 85,
                    width: 320,
                    labelWidth:40,
                    x: 300,  
                    y: 5,
                    items: [
                       name_combo
                    ]
                    }, {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 320,
                    labelWidth:180,
                    x: 300,  
                    y: 50,
                    items: [
                       doc_combo
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: 'Bill Details',
                    border: true,
                    height: 85,
                    width: 150,
                    labelWidth:50,
                    x: 620,  
                    y: 5,
                    items: [
                       {
                        xtype : 'textfield',
                        fieldLabel : 'Bill No',
                        name       : 'bno',
                        readOnly   : false,
                        width : 70
                    },date2
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 45,
                    width: 850,
                    labelWidth:50,
                    //layout: 'absolute',
                    x: 0,  
                    y: 88,
                    items: [
                        po_combo
                    ]
                    },date3,
                     {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 278,
                    labelWidth:50,
                    //layout: 'absolute',
                    x: 300,  
                    y: 88,
                    items: [
                       item_combo
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 45,
                    width: 278,
                    labelWidth:50,
                    //layout: 'absolute',
                    x: 578,  
                    y: 88,
                    items: [
                       machine_combo
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 200,
                    width: 900,
                    labelWidth:70,
                    //layout: 'absolute',
                    x:0,  
                    y:131,
                    items: [
                      txtinvqty,txtrecqty,txtunitrate,txtordqty,txttolerance,type_combo,txtfornp
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 200,
                    width: 270,
                    labelWidth:70,
                    x:170,  
                    y:131,
                    items: [
                      txtdis,txtpf,txtcgst,txtsgst,txtigst,txtoth,txtforoth
                    ]
                    },
                       {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 180,
                    width: 175,
                    labelWidth:1,
                    x:335,  
                    y:131,
                    items: [
                      txtdisval,txtpfval,txtcgstval,txtsgstval,txtigstval,txtothval
                    ]
                    },
                       {
                    xtype: 'fieldset',
                    title: 'Other Expenses',
                    border: true,
                    height: 110,
                    width: 180,
                    labelWidth:75,
                    x:450,  
                    y:131,
                    items: [
                      txtfreight,txtinward,txtqc
                    ]
                    },
                     {
                    xtype: 'fieldset',
                    title: 'Freight (Bill Raised / Tax Paid)',
                    border: true,
                    height: 110,
                    width: 280,
                    labelWidth:75,
                    x:630,  
                    y:130,
                    items: [
                      txtfright1,txtfrightparty,rcm_combo
                    ]
                    },
                    {
                    xtype: 'fieldset',
                    title: 'QC Check',
                    border: true,
                    height: 90,
                    width: 200,
                    labelWidth:75,
                    x:450,  
                    y:240,
                    items: [
                        withchk,
                      date4
                    ]
                    },
                      {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 50,
                    width: 60,
                    labelWidth:75,
                    x:750,  
                    y:260,
                    items: [
                        addbtn
                    ]
                    },{
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 190,
                    width: 950,
                    labelWidth:75,
                    x:0,  
                    y:340,
                    items: [
                      grid2
                    ]
                    }
                            
                ]
            },
            {
                xtype: 'panel',
                title: 'General / Overall Details',
                width: 383,
                height: 200,
                layout: 'absolute',
                items: [
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 855,
                    labelWidth:75,
                    x:0 ,  
                    y:0 ,
                    items: [
                       txtcarrier,txtRemark,credit_combo
                    ]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 500,
                    labelWidth:90,
                    x:355 ,  
                    y:0 ,
                    items: [
                       gate_combo,txtlrnumber
                    ]
                 },
                 {
                    xtype: 'fieldset',
                    title: ' ',
                    border: false,
                    height: 135,
                    width: 500,
                    labelWidth:90,
                    x:560 ,  
                    y:0 ,
                    items: [
                       gentrydate,LRdate
                    ]
                 },
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: true,
                    height: 150,
                    width: 855,
                    labelWidth:75,
                    x:0 ,  
                    y:150 ,
                    items: [
                   txtgrossval,txtdiscnt1,txtpf1,txtfreight1,txtothval1
                    ]
                 },{
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:90,
                    x:200 ,  
                    y:150 ,
                    items: [
                   txtcgst1,txtsgst1,txtigst1,txtqcdev1,txtinward1
                    ]
                 },
                 {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:400 ,  
                    y:150 ,
                    items: [
                   txttaxfri2,txtaxgst1,txttaxfri3,txtaxgst2
                    ]
                 },
                   {
                    xtype: 'fieldset',
                    title: '',
                    border: false,
                    height: 150,
                    width: 855,
                    labelWidth:120,
                    x:620 ,  
                    y:150 ,
                    items: [
                   txtroundoff,txtlandvalue,txtinvalue
                    ]
                 },
                 {
                    xtype: 'fieldset',
                    title: 'Tax Rounding Off',
                    border: true,
                    height: 45,
                    width: 200,
                    x:550 ,  
                    y:350 ,
                    items: [
                   
                    ]
                 },roundno1,roundyes1
                ]
            }
            
            ]
        } ,
    
        
        ],
 
        tbar: {
            xtype: 'toolbar',
            width: 539,
            height: 40,
            items: [
                {
                    xtype: 'button',
                    text: ' New',
                    style  : 'text-align:center;',
                    tooltip: 'Add Details...', height: 40, fontSize:20,width:50,
                    align : 'right',
                    icon: '../icons/Add.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Edit',
                    fontSize :18,
                    style  : 'text-align:center;',
                    tooltip: 'Modify Details...',  height: 40, fontSize:20,width:50,
                    icon: '../icons/edit.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Save',
                    style  : 'text-align:center;',
                    tooltip: 'Save Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/save.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'Refresh',
                    style  : 'text-align:center;',
                    tooltip: 'Refresh Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/refresh.png'
                    
                },'-',
                {
                    xtype: 'button',
                    text: 'View',
                    style  : 'text-align:center;',
                    tooltip: 'View Details...', height: 40, fontSize:30,width:70,
                    icon: '../icons/view.png'
                },'-',
                {
                    xtype: 'button',
                    text: 'Exit',
                    style  : 'text-align:center;',
                    tooltip: 'Close...', height: 40, fontSize:30,width:70,
                    icon: '../icons/exit.png'
                    
                }
            ]
        }
    });

var window_form = new Ext.Window({
                         width        : 945,         //1340,
                         height       : 650,
                         items        : myFormPanel,
                         closable:false,
                         resizable:false,
                         draggable:false,
//                         x:5,
                         y:35,
			listeners:{
	                 show:function(){
				criteria = 'R';
				loadgrnnodatastore.load({
                        	 url:'ClsGrn.php',
                        	 params:
                       		 {
                         	 task:"loadgrnno",
				 compcode : 1,
				 finid:27
                        	 },
				callback:function()
				{
				cnt = loadgrnnodatastore.getCount();
				
				txtgrnno.setRawValue(loadgrnnodatastore.getAt(0).get('grnno'));
				}
				 });

				loadvendorDatastore.load({
                        	 url:'ClsGrn.php',
                        	 params:
                       		 {
                         	 task:"loadsupplier"
				
                        	 }
				 });



	   			 }
			
		}
    });
  window_form.show();
  
});
