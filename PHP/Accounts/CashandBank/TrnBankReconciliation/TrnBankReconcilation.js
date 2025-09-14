/*global Ext*/
Ext.onReady(function () {
    Ext.QuickTips.init();
     var GinUser = localStorage.getItem('ginusername');
    var GinFinid = localStorage.getItem('ginfinid');

    var gstfinyear = localStorage.getItem('gstyear');
    var GinCompcode = localStorage.getItem('gincompcode');

   var GinUserid = localStorage.getItem('ginuserid');
   var GinUserType = localStorage.getItem('ginusertype');



   var finstartdate = localStorage.getItem('gfinstdate');
   var finenddate  = localStorage.getItem('gfineddate');


   var GinNewDays = Number(localStorage.getItem('newdays'));
   var GinEditDays = Number(localStorage.getItem('editdays'));

  var printtype='PDF';


    var txtUserName = new Ext.form.TextField({
        fieldLabel: 'Login User',
        id: 'txtUserName',
        width: 100,
        name: 'txtUserName',
        enableKeyEvents: true,
        listeners: {
        }
    });



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
            
		{boxLabel: 'Others', name: 'optprinttype', id:'optOTH', inputValue: 3,
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



new Ext.KeyMap( Ext.getBody(), [{
            key: "s",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                if (gstFlag == "Edit")
                {

		Ext.Msg.prompt('Reason for Modification', '', function(btn, text){
		    if (btn == 'ok'){
			txtReason.setRawValue(text)
 
		    }
		});
                } 

                save_click();       

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "e",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
             edit_click();

            }
        }]);


new Ext.KeyMap( Ext.getBody(), [{
            key: "x",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  CashReceiptEntryWindow.hide();

            }
        }]);

new Ext.KeyMap( Ext.getBody(), [{
            key: "a",
            ctrl:true,
            fn: function( e, ele ){
                ele.preventDefault();
                  add_btn_click();
            }
        }]);



  var LoadBankClosingDataStore = new Ext.data.Store({
        id: 'LoadBankClosingDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsBankReconciliation.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadLedgerOpening_Closing"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['cur_led_code', 'trnobclosing' ])
    });




function save_click() 
{
	    Ext.Msg.show({
		title: 'RECONCILIATION',
		icon: Ext.Msg.QUESTION,
		buttons: Ext.MessageBox.YESNO,
		msg: 'Are You Sure to Save?',
		fn: function (btn) {
		    if (btn == 'yes') {
		        var accData = flxDetails.getStore().getRange();
		        var accupdData = new Array();
		        Ext.each(accData, function (record) {
		            accupdData.push(record.data);
		        });

		        Ext.Ajax.request({
		            url: 'FrmReconciliationSave.php',
		            params: {
		                griddet: Ext.util.JSON.encode(accupdData),
		                cnt: accData.length,
		                finid: GinFinid,
		                compcode: GinCompcode,
	                     },
		            callback: function (options, success, response)
		            {
		                var obj = Ext.decode(response.responseText);
		                if (obj['success'] === "true") {
		                    Ext.MessageBox.alert("Bank Reconcilations are Saved " );
                                    BankReconciliationPanel.getForm().reset();
                                    flxDetails.getStore().removeAll();
		                    RefreshData();
                                }
		                 else {
                               	Ext.MessageBox.alert("Bank Reconcilations are Not Saved! Pls Check! ");  
		                }
		            }
		        });//msg2
		    }
		}
	    });//msg1

}



    var HeadAccountNameDataStore = new Ext.data.Store({
        id: 'HeadAccountNameDataStore',
        proxy: new Ext.data.HttpProxy({
            url: '/SHVPM/Accounts/clsAccounts.php', // File to connect to
            method: 'POST'
        }),
        baseParams: {
            task: "cmbbankacct"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        }, [
            {name: 'cust_code', type: 'int', mapping: 'cust_code'},
            {name: 'cust_name', type: 'string', mapping: 'cust_name'}
        ])
    });


    var cmbBankName = new Ext.form.ComboBox({
        fieldLabel: 'Select Bank ',
        width: 300,
        store: HeadAccountNameDataStore,
        displayField: 'cust_name',
        valueField: 'cust_code',
        hiddenName: 'cust_name',
        id: 'cmbBankName',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        selectOnFocus: true,
        editable: true,
        allowblank: false,
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        listeners: {
            select: function () {
            }          
        }
    });


    var monthstartdate = new Ext.form.DateField({
	fieldLabel: 'From Date',
        id: 'monthfirstdate',
	format: 'd-m-Y',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        value: new Date()  ,
       	enableKeyEvents: true,

        listeners:{
           blur:function(){
              process_data();
           },
           keyup:function(){
              process_data();
            },
           change:function(){
             process_data();
            },
        }   

    });
    var monthenddate = new Ext.form.DateField({
	fieldLabel: 'As on  Date',
        id: 'monthenddate',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
	format: 'd-m-Y',
        value: new Date(),
       	enableKeyEvents: true,
        listeners:{
           blur:function(){
              process_data();
           },
           keyup:function(){
              process_data();
            },
           change:function(){
             process_data();
            },
        }    
    });



  var MonthClickVocDataStore = new Ext.data.Store({
        id: 'MonthClickVocDataStore',
        proxy: new Ext.data.HttpProxy({
            url: 'ClsBankReconciliation.php',  // File to connect to
            method: 'POST'
        }),
        baseParams:{
                     task:"loadBankReconcilation"
        }, // this parameter asks for listing
        reader: new Ext.data.JsonReader({
            // we tell the datastore where to get his data from
            root: 'results',
            totalProperty: 'total',
            id: 'id'
        },['accref_seqno', 'accref_vouno','accref_voudate','accref_narration','actran_led_code',
'acctran_dbamt' ,'acctran_cramt','accref_payref_no','accref_payref_date', 'ledcode2','yropdebit', 
 'yropcredit', 'trnobdebit', 'trnobcreit','cust_name','rec_date' ,'accref_paymode'])
    });


function grid_tot(){
	totdb=0;
        totcr=0;
        var cb = 0;
   
        var Row1= flxDetails.getStore().getCount();
        flxDetails.getSelectionModel().selectAll();
        var sele=flxDetails.getSelectionModel().getSelections();
        for(var i=0;i<Row1;i++)
        {


//           if (sele[i].data.accref_paymode == "CHQ" && sele[i].data.rec_date == '')
           {
            totdb=Number(totdb)+Number(sele[i].data.acctran_dbamt);
            totcr=Number(totcr)+Number(sele[i].data.acctran_cramt);
           } 
        }

        cb = Number(txtOurBankBalance.getValue())-totcr+totdb;    

        txtTotDebit.setRawValue(Ext.util.Format.number(totdb,"0.00"));
        txtTotCredit.setRawValue(Ext.util.Format.number(totcr,"0.00"));
        txtBankBalance.setRawValue(Ext.util.Format.number(cb,"0.00"));


        if (cb > 0)
        {    
              txtBankBalance.setRawValue(Ext.util.Format.number(cb,"0.00"));
        }  
        else
        {    
              txtBankBalance.setRawValue(Ext.util.Format.number(Math.abs(cb),"0.00"));
        }   
}

  function process_data()
  {

        txtTotDebit.setRawValue('');
        txtTotCredit.setRawValue('');
        txtBankBalance.setRawValue('');


              flxDetails.getStore().removeAll();

              MonthClickVocDataStore.removeAll();
              MonthClickVocDataStore.load({
                    url: 'ClsBankReconciliation.php',
                    params:{
                        task:'loadBankReconcilation',
                         compcode    : GinCompcode,
                         finid       : GinFinid,
                         ledcode     : cmbBankName.getValue(),
                         startdate   : Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate     : Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=MonthClickVocDataStore.getCount();
                        if(cnt>0){


                            for(var i=0;i<cnt;i++){
//alert(Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('rec_date'),"d-m-Y"));

                               flxDetails.getStore().insert(
                                flxDetails.getStore().getCount(),
                                new dgrecord({
                                    sno          : i+1,
                                    accref_voudate : Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('accref_voudate'),"d-m-Y"),
                                    cust_name      : MonthClickVocDataStore.getAt(i).get('cust_name'),
                                    acctran_dbamt : MonthClickVocDataStore.getAt(i).get('acctran_dbamt'),
                                    acctran_cramt : MonthClickVocDataStore.getAt(i).get('acctran_cramt'),
                                    accref_vouno  : MonthClickVocDataStore.getAt(i).get('accref_vouno'),
                                    accref_seqno  : MonthClickVocDataStore.getAt(i).get('accref_seqno'),
                                    led_code      : MonthClickVocDataStore.getAt(i).get('actran_led_code'),
                                    accref_paymode : MonthClickVocDataStore.getAt(i).get('accref_paymode'),
                                    accref_narration: MonthClickVocDataStore.getAt(i).get('accref_narration'),
                                    accref_payref_no: MonthClickVocDataStore.getAt(i).get('accref_payref_no'),
                                    accref_payref_date: Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('accref_payref_date'),"d-m-Y"),
                        rec_date: Ext.util.Format.date(MonthClickVocDataStore.getAt(i).get('rec_date'),"Y-m-d"),
                                })
                                );
                             grid_tot();
                            }
                        }
             LoadBankClosingDataStore.removeAll();
              LoadBankClosingDataStore.load({
                    url: 'ClsViewStatementss.php',
                    params:{
                        task:'loadLedgerOpening_Closing',
                         compcode    : GinCompcode,
                         finid       : GinFinid,
                         ledcode:cmbBankName.getValue(),
                         startdate: Ext.util.Format.date(monthstartdate.getValue(),"Y-m-d"), 
                         enddate: Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"), 
                         finfirstdate: Ext.util.Format.date(finstartdate,"Y-m-d"), 

                    },
                    callback:function(){
                        var cnt=LoadBankClosingDataStore.getCount();

                        if(cnt>0){


                          if (LoadBankClosingDataStore.getAt(0).get('trnobclosing') > 0)
                          {    
                              txtOurBankBalance.setRawValue(LoadBankClosingDataStore.getAt(0).get('trnobclosing'));
                          }  
                          else
                          {    
                              txtOurBankBalance.setRawValue(Math.abs(LoadBankClosingDataStore.getAt(0).get('trnobclosing')));

                          }   
                             grid_tot();

                        }
                    }   
              });

                    }
         });



  }



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
                 process_data();
             }
          }

});



var btnPrint = new Ext.Button({

	border: 1,
	style: {
	borderColor: 'blue',
	borderStyle: 'solid',

	},
	text    : "Print",
	width   : 90,
	height  : 35,
        icon    : 'BACK.JPG',   
	listeners:{
          click: function(){  

		    var p1  = "&compcode="+encodeURIComponent(GinCompcode);
                    var p2  = "&fincode=" + encodeURIComponent(GinFinid);
                    var p3  = "&ledcode="+encodeURIComponent(cmbBankName.getValue());
             	    var p4  = "&todate=" + encodeURIComponent(Ext.util.Format.date(monthenddate.getValue(),"Y-m-d"));

// alert(fin);

		    var param = (p1+ p2 + p3 + p4) ;
//alert(param);

                if (printtype == "PDF") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BRS.rptdesign&__format=PDF&' + param, '_blank');
                else if (printtype == "XLS") 
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BRS.rptdesign&__format=XLS&' + param, '_blank');
                else
                window.open('http://10.0.0.251:8080/birt/frameset?__report=Accounts/AccRep_BRS.rptdesign' + param, '_blank');
                
             }
          }

});

/*

function autoFillAndValidateDate(field) {
    var raw = field.getRawValue().trim();

    // Check for dd-MM or d-M pattern only (no year)
    var pattern = /^(\d{1,2})-(\d{1,2})$/;
    var match = raw.match(pattern);

    if (match) {
        var day = parseInt(match[1], 10);
        var month = parseInt(match[2], 10);
        var year = new Date().getFullYear();

        // Construct full date string dd-MM-yyyy
        var fullDateStr = day.toString().padStart(2, '0') + '-' + month.toString().padStart(2, '0') + '-' + year;

        // Parse with Ext.Date.parse, fallback if Ext.Date.parse is not available
        var parsedDate = Ext.Date.parse(fullDateStr, 'd-m-Y');

        if (parsedDate) {
            var today = new Date();
            today.setHours(0,0,0,0);
            parsedDate.setHours(0,0,0,0);

            if (parsedDate > today) {
                Ext.Msg.alert('Invalid Date', 'Date cannot be in the future.');
                field.setValue('');
    field.setRawValue(''); 
   field.focus();
            } else {
                field.setValue(parsedDate);
            }
        } else {
            // Parsing failed - clear or leave as is
            field.setValue('');
        }
    } else {
        // If user typed a full date (with year), validate if it's not future
        var enteredDate = field.getValue();
        if (enteredDate) {
            var today = new Date();
            today.setHours(0,0,0,0);
            enteredDate.setHours(0,0,0,0);

            if (enteredDate > today) {
                Ext.Msg.alert('Invalid Date', 'Date cannot be in the future.');
                field.setValue('');
    field.setRawValue(''); 
   field.focus();
            }
        }
    }
}


*/

function autoFillAndValidateDate(field) {
    var raw = field.getRawValue().trim();
    var today = new Date();
    today.setHours(0, 0, 0, 0);

    function clearAndRefocus(f, msg) {
        f.setRawValue('');
        f.setValue('');
        Ext.Msg.alert('Invalid Date', msg, function () {
            setTimeout(function () {
                f.focus();
            }, 50);
        });
    }

    // Match typed format: "18-05" or "1-5"
    var m = raw.match(/^(\d{1,2})-(\d{1,2})$/);
    if (m) {
        var day = parseInt(m[1], 10),
            month = parseInt(m[2], 10),
            year = today.getFullYear();

        if (day < 1 || day > 31 || month < 1 || month > 12) {
            return clearAndRefocus(field, 'Day must be 1–31 and month 1–12.');
        }

        var parsed = new Date(year, month - 1, day);
        parsed.setHours(0, 0, 0, 0);

        if (parsed.getDate() !== day || parsed.getMonth() + 1 !== month) {
            return clearAndRefocus(field, 'Invalid day/month combination.');
        }

        if (parsed > today) {
            return clearAndRefocus(field, 'Date cannot be in the future.');
        }

        // Set correct date object to suppress "Invalid date"
        field.setValue(parsed);
        return;
    }

    // Handle full date like "18-05-2024"
    var full = raw.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
    if (full) {
        var day = parseInt(full[1], 10),
            month = parseInt(full[2], 10),
            year = parseInt(full[3], 10);

        var parsed = new Date(year, month - 1, day);
        parsed.setHours(0, 0, 0, 0);

        if (parsed.getDate() !== day || parsed.getMonth() + 1 !== month) {
            return clearAndRefocus(field, 'Invalid date.');
        }

        if (parsed > today) {
            return clearAndRefocus(field, 'Date cannot be in the future.');
        }

        field.setValue(parsed);
        return;
    }

    // Anything else – fallback to Ext date parsing
    var value = field.getValue();
    if (value instanceof Date) {
        value.setHours(0, 0, 0, 0);
        if (value > today) {
            return clearAndRefocus(field, 'Date cannot be in the future.');
        }
    } else {
        // Clear if unrecognized input
        field.setRawValue('');
        field.setValue('');
    }
}





    var dgrecord = Ext.data.Record.create([]);
    var flxDetails = new Ext.grid.EditorGridPanel({
        frame: false,
        store: [],
        sm: new Ext.grid.RowSelectionModel(),
        autoShow: true,
        scrollable: true,
	stripeRows: true,
    id: 'my-grid-font', 
style:{
             color: 'DarkBlue' ,
             backgroundColor:'White'
	     
        },
        columnLines: true,
        height: 360,
        width: 1280,
        border:false,
        x: 370,
        y: 40,

        enableKeyEvents: true,
        columns: [
            {header: "S.No", dataIndex: 'sno',width:50,align:'center', sortable: false,defaultSortable: false,menuDisabled: true,},
            {header: "Date ", dataIndex: 'accref_voudate',width:110,align:'center',sortable: true,defaultSortable: false,menuDisabled: false,},
            {header: "Account Name", dataIndex: 'cust_name',width:300,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,
		renderer : function(value, meta ,record) {
		    var vou=record.get('cust_name');
		    if(vou!=='') {
			meta.style = "background-color:#FFDEAD;";
		    }else{
			meta.style = "background-color:#FFFFE0;";
		    }
		    return value;
		  }
             },
            {header: "Vou. No.", dataIndex: 'accref_vouno',width:120,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},

            {header: "Trans Type", dataIndex: 'accref_paymode',width:100,align:'center',sortable: false,defaultSortable: false,menuDisabled: false},
            {header: "Chq/Ref", dataIndex: 'accref_payref_no',width:100,align:'center',sortable: false,defaultSortable: false,menuDisabled: false},
            {header: "Chq/Ref dt", dataIndex: 'accref_payref_date',width:110,align:'center',sortable: false,defaultSortable: false,menuDisabled: false},
            {header: "Debit", dataIndex: 'acctran_dbamt',width:120,sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Credit", dataIndex: 'acctran_cramt',width:120,sortable: false,defaultSortable: false,menuDisabled: false,align: 'right'},
            {header: "Rel. Date", dataIndex: 'rec_date',width:110,align:'center',sortable: false,defaultSortable: false,menuDisabled: false,
               editor: {
                    xtype: 'datefield',
                    allowBlank: true,
                    value: new Date(),
                    format: 'd-m-Y',
                    enableKeyEvents: true,
                    listeners: {
		specialkey: function(field, e) {
		    if (e.getKey() === Ext.EventObject.ENTER) {
		        var valid = autoFillAndValidateDate(field, true); // pass return flag
		        if (!valid) {
		            e.stopEvent(); // prevent moving to next row
		        }
		    }
		},
                     focus: function () {

//                            var sm = flxDetails.getSelectionModel();
//                            var selrow = sm.getSelected();
//                            this.setValue(Ext.util.Format.date(selrow.get('rec_date')),"d-m-Y");
                              grid_tot();
                        },
		    blur: function (field) {



             autoFillAndValidateDate(field);
		        grid_tot();  // Call your total calculation
		    },
                        keyup: function () {
             autoFillAndValidateDate(field);
//                           var sm = flxDetails.getSelectionModel();
//                            var selrow = sm.getSelected();
//                            this.setValue(Ext.util.Format.date( selrow.get('rec_date')),"d-m-Y");
                              grid_tot();
                       }
                    }
         } ,

            renderer: Ext.util.Format.dateRenderer('d-m-Y')    
         },
            {header: "Seq. No.", dataIndex: 'accref_seqno',width:80,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : true},
            {header: "Led Code", dataIndex: 'cust_code',width:100,align:'left',sortable: false,defaultSortable: false,menuDisabled: false,align: 'right',hidden : true},
        ],
         listeners :{

            specialkey: function(f,e){  
                if(e.getKey()==e.ENTER){  
                    alert("I hit enter!"); 
                }  
            },

            'rowDblClick' : function(flxDetails,rowIndex,cellIndex,e){


            },'cellclick': function (flxDetails, rowIndex, cellIndex, e) {

	   },
            'rowselect' : function(flxDetails,rowIndex,cellIndex,e){

            },

        }
    });


    var txtTotDebit = new Ext.form.NumberField({
        fieldLabel: 'Amount Not Reflected in Bank',
        id: 'txtTotDebit', readOnly: true,
        width: 120,
        name: 'TotDebit',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });

    var txtTotCredit = new Ext.form.NumberField({
        fieldLabel: '',
        id: 'txtTotCredit', readOnly: true,
        width: 120,
        name: 'TotCredit',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });


    var txtOurBankBalance = new Ext.form.NumberField({
        fieldLabel: 'Balance As per Our Book',
        id: 'txtOurBankBalance', readOnly: true,
        width: 120,
        name: 'txtOurBankBalance',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });

    var txtBankBalance = new Ext.form.NumberField({
        fieldLabel: 'Balance As per Bank',
        id: 'txtBankBalance', readOnly: true,
        width: 120,
        name: 'txtBankBalance',
        labelStyle  : "font-size:14px;font-weight:bold;color:#fc9403",
        style: {
            'color':'#873e72',readOnly:true,'text-align': 'right',
            'style': 'Helvetica',
            'font-size': '12px','font-weight':'bold'
        },
    });


    var BankReconciliationPanel = new Ext.FormPanel({
        renderTo: Ext.getBody(),
        xtype: 'form',
        title: 'BANK RECONCILIATION',
        header: false,
        bodyStyle: {"background-color": "#fff0ff"},
        style: {
            'color': 'blue',
            'style': 'Helvetica',
            'font-size': '15px', 'font-weight': 'bold'
        },
        width: 1100,
        height: 180,
        x: 10,
        y: 10,
        frame: false,
        id: 'BankReconciliationPanel',
        method: 'POST',
        layout: 'absolute',
        reader: new Ext.data.JsonReader({
            root: 'rows',
            totalProperty: 'results',
            id: 'id'
        }, ['general_name']),
        tbar: {
            xtype: 'toolbar',
            bodyStyle: "background: #d7d5fa;",
            height: 40,
            style: 'background-color:#d7d5fa',
            fontSize: 18,
            items: [
                {
                    text: 'Save',
                    id  : 'save',
                    style: 'text-align:center;',
                    tooltip: 'Save Details...', 
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/save.png',
                    listeners: {
                        click: function () {
   
                            save_click();


                        }
                    }
                }, '-',

//edit
                {
                    text: 'Edit',
                    style: 'text-align:center;',
                    tooltip: 'Edit Details...',
                    height: 40,
                    fontSize: 30, hidden: false,
                    width: 70,
                    icon: '/Pictures/view.png',
                    listeners: {
                        click: function () {
                              edit_click();
                        }
                    }
                }, '-',
                {
                    text: 'Refresh',
                    style: 'text-align:center;',
                    tooltip: 'Refresh Details...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/refresh.png',
                    listeners: {
                        click: function () {
                            RefreshData();
                        }
                    }
                }, '-',
                {
                    text: 'Exit',
                    style: 'text-align:center;',
                    tooltip: 'Close...',
                    height: 40,
                    fontSize: 30,
                    width: 70,
                    icon: '/Pictures/exit.png',
                    listeners: {
                        click: function () {
                            CashBankReconciliationWindow.hide();
                        }
                    }
                }]
        },
        items: [


            {
                xtype: 'fieldset',
                title: '',
                width: 1300,
                height: 60,
                x: 20,
                y: 0,
                border: true,
                layout: 'absolute',
                items: [

                            {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 1050,
                                x: 30,
                                y: 0,
                                border: false,
                                items: [cmbBankName]
                            },
/*
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 80,
                             border  : false,
		             x       : 550,
			     y       : 0,
                             items: [monthstartdate]
                        },
*/
			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 90,
                             border  : false,
		             x       : 450,
			     y       : 0,
                             items: [monthenddate]
                        },

			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 700,
			     y       : 0,
                             items: [btnProcess]
                        },

		{ 
			xtype   : 'fieldset',
			title   : '',
			layout  : 'hbox',
			border  : true,
			height  : 60,
			width   : 250,
			layout  : 'absolute',
			x       : 950,
			y       : -10,
			items:[optprinttype],
	},


                ]
            },
            {
                xtype: 'fieldset',
                title: '',
                width: 1300,
                height: 475,
                x: 20,
                y: 60,
                border: true,
                style: 'padding:0px',
                layout: 'absolute',
                items: [
                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 100,
                                width: 1270,
                                x: 5,
                                y: 10,
                                border: false,
                                items: [flxDetails]
                            },

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 360,
                                width: 550,
                                x: 650,
                                y: 380,
                                border: false,
                                items: [txtOurBankBalance]
                           },

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 235,
                                width: 550,
                                x: 650,
                                y: 405,
                                border: false,
                                items: [txtTotDebit]
                           },

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 0,
                                width: 550,
                                x: 910,
                                y: 405,
                                border: false,
                                items: [txtTotCredit]
                           },

                           {
                                xtype: 'fieldset',
                                title: '',
                                labelWidth: 360,
                                width: 550,
                                x: 650,
                                y: 430,
                                border: false,
                                items: [txtBankBalance]
                           },



			{ 
                             xtype   : 'fieldset',
                             title   : '',
                             labelWidth  : 70,
                             width       : 120,
                             border  : false,
		             x       : 1150,
			     y       : 410,
                             items: [btnPrint]
                        },


                ]
            },

       ]
    });

    function RefreshGridData() {

    }





    function RefreshData() {


        HeadAccountNameDataStore.load({
            url: '/SHVPM/Accounts/clsAccounts.php',
            params: {
                task: 'cmbbankacct',
                compcode: GinCompcode
            },
             callback : function() 
             { 
                HeadAccountNameDataStore.getCount(); 
                cmbBankName.setValue(1653);
          process_data();
             }
        });




 //       txtCredit.disable();
    }



    var CashBankReconciliationWindow = new Ext.Window({
        width: 1350,
        height: 610,
        y: 30,
        items: BankReconciliationPanel,
        bodyStyle: {"background-color": "#fff0ff"},
        title: 'BANK RECONCILIATION',
        layout: 'fit',
        closable: true,
        minimizable: true,
        maximizable: true,
        resizable: false,
        border: false,
        draggable: false,
  onEsc:function(){
},
        listeners:
                {
                    show: function () {
                        txtUserName.setRawValue(GinUser);   
                        RefreshData();

                    }
                }
    });
    CashBankReconciliationWindow.show();
});


